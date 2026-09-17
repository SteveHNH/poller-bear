<script>
import { onMount, onDestroy } from "svelte";
import { navigate } from "svelte-routing";
import VideoEmbed from "./VideoEmbed.svelte";
import { castVote, getOwnSubmission, hasVoted as didVote, phaseFor, subscribeChoices, subscribePoll, submitVideo as saveVideoSubmission } from './lib/polls';
import { titleForVideo, videoIdFromUrl } from './lib/youtube';

export let id;

let pollData = null;
let selectedOption;
let responseData = [];
let hasVoted = false;
let errorMessage = "";
let loadingError = "";
let isLoading = true;
let shareMessage = "";

let phase = "voting";
let hasSubmitted = false;
let submissionCount = 0;
let videoUrl = "";
let submitError = "";
let isSubmittingVideo = false;
let unsubscribePoll = () => {};
let unsubscribeChoices = () => {};
let phaseTimer;

$: isCollab = pollData && pollData.type === "video_collab";
$: ownSubmission = isCollab && responseData.length > 0 ? responseData[0] : null;

async function loadPoll() {
  try {
    hasVoted = await didVote(id);
    unsubscribePoll = subscribePoll(id, async (poll) => {
      if (!poll) {
        loadingError = "Poll not found. It may have been deleted or the link is incorrect.";
        isLoading = false;
        return;
      }
      pollData = poll;
      phase = phaseFor(poll);
      unsubscribeChoices();
      if (poll.type === 'video_collab' && phase === 'submission') {
        const own = await getOwnSubmission(id);
        hasSubmitted = Boolean(own);
        responseData = own ? [own] : [];
        // The count is deliberately not read: Rules keep others' submissions private.
        submissionCount = own ? 1 : 0;
      } else {
        const collection = poll.type === 'video_collab' ? 'submissions' : 'options';
        unsubscribeChoices = subscribeChoices(id, collection, (choices) => {
          responseData = choices;
          submissionCount = choices.length;
        }, fail);
      }
      isLoading = false;
    }, fail);
  } catch (error) {
    loadingError = error.message || "Unable to load this poll.";
    console.error("Error loading poll:", error);
  } finally {
    isLoading = false;
  }
}

function fail(error) {
  loadingError = error.message || "Unable to load this poll.";
  isLoading = false;
}

onMount(() => {
  loadPoll();
  // Time boundaries do not change the poll document, so refresh listeners when one passes.
  phaseTimer = window.setInterval(() => {
    if (pollData && phaseFor(pollData) !== phase) window.location.reload();
  }, 30000);
});
onDestroy(() => { unsubscribePoll(); unsubscribeChoices(); window.clearInterval(phaseTimer); });

async function submitVotes() {
  try {
    errorMessage = "";
    await castVote(id, isCollab ? 'submissions' : 'options', selectedOption);
    hasVoted = true;
    navigate(`/polls/${id}/r`);
  } catch (err) {
    errorMessage = err.message || "Unable to submit your vote.";
    console.error('Error:', err);
  }
}

async function submitVideo() {
  if (!videoUrl.trim()) {
    submitError = "Please paste a YouTube link.";
    return;
  }

  submitError = "";
  isSubmittingVideo = true;

  try {
    const videoId = videoIdFromUrl(videoUrl.trim());
    if (!videoId) throw new Error('Enter a supported HTTPS YouTube URL.');
    const title = await titleForVideo(videoId);
    await saveVideoSubmission(id, videoId, title);
    hasSubmitted = true;
    responseData = [{ id: videoId, videoId, title, votes: 0 }];
    videoUrl = "";
  } catch (err) {
    submitError = err.message || "Unable to submit this video.";
    console.error('Error:', err);
  } finally {
    isSubmittingVideo = false;
  }
}

async function goToResults() {
  navigate(`/polls/${id}/r`)
}

async function sharePoll() {
  try {
    const pollUrl = window.location.href;
    await navigator.clipboard.writeText(pollUrl);
    shareMessage = "Poll link copied to clipboard!";
    setTimeout(() => shareMessage = "", 3000);
  } catch (error) {
    shareMessage = "Failed to copy link. Please copy the URL manually.";
    setTimeout(() => shareMessage = "", 5000);
  }
}

</script>

<div class="poll-container">
  {#if loadingError}
    <div class="status-card">
      <div class="card-content">
        <p class="error-title">Something went wrong</p>
        <p class="error-description">{loadingError}</p>
        <button class="primary-button" on:click={() => window.location.reload()}>
          Try again
        </button>
      </div>
    </div>
  {:else if isLoading}
    <div class="status-card">
      <div class="card-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading your poll…</p>
      </div>
    </div>
  {:else if pollData}
    <div class="main-poll-card">
      <div class="poll-header">
        <div class="poll-title-section">
          <h1 class="poll-question">{pollData.question}</h1>
          {#if pollData.limitVotes}
            <span class="badge">One vote per person</span>
          {/if}
        </div>

        <div class="poll-actions">
          <button class="secondary-button" on:click={sharePoll}>
            Share
          </button>
        </div>
      </div>

      {#if shareMessage}
        <div class="share-notification">{shareMessage}</div>
      {/if}

      {#if isCollab && phase === "submission"}
        <div class="submission-phase">
          {#if hasSubmitted}
            <p class="voted-text">Thanks for your submission! Voting opens once the submission window closes.</p>
            {#if ownSubmission}
              <div class="own-submission">
                <VideoEmbed
                  videoId={ownSubmission.videoId}
                  title={ownSubmission.title}
                />
              </div>
            {/if}
          {:else}
            <form on:submit|preventDefault={submitVideo} class="submit-video-form">
              <label class="sub-label" for="video-url-input">Paste a YouTube link</label>
              <input
                id="video-url-input"
                type="text"
                bind:value={videoUrl}
                placeholder="https://www.youtube.com/watch?v=..."
                class="video-url-input"
              />
              {#if submitError}
                <div class="error-notification">{submitError}</div>
              {/if}
              <button type="submit" disabled={isSubmittingVideo} class="primary-button">
                {isSubmittingVideo ? 'Submitting…' : 'Submit video'}
              </button>
            </form>
          {/if}

          <p class="submission-count-text">
            {submissionCount} {submissionCount === 1 ? 'submission' : 'submissions'} so far — no peeking until voting opens!
          </p>
        </div>
      {:else if isCollab && phase === "closed"}
        <div class="voted-state">
          <p class="voted-text">Voting has closed for this poll.</p>
          <button class="primary-button" on:click={goToResults}>
            View results
          </button>
        </div>
      {:else if pollData.limitVotes && hasVoted}
        <div class="voted-state">
          <p class="voted-text">Thanks for voting! Your response has been recorded.</p>
          <button class="primary-button" on:click={goToResults}>
            View results
          </button>
        </div>
      {:else}
        <form on:submit|preventDefault={submitVotes} class="poll-form">
          <div class="options-container" class:video-options={isCollab}>
            {#each responseData as option, index (option.id)}
              <label class="poll-option" class:selected={selectedOption === option.id}>
                <input
                  type="radio"
                  bind:group={selectedOption}
                  value={option.id}
                  class="hidden-radio"
                />
                <div class="option-content">
                  <div class="option-indicator"></div>
                  {#if isCollab}
                    <div class="video-option-content">
                      <VideoEmbed
                        videoId={option.videoId}
                        title={option.title}
                      />
                    </div>
                  {:else}
                    <span class="option-text">{option.text}</span>
                  {/if}
                </div>
              </label>
            {/each}
          </div>

          {#if errorMessage}
            <div class="error-notification">{errorMessage}</div>
          {/if}

          <div class="action-buttons">
            <button
              type="submit"
              disabled={!selectedOption || hasVoted}
              class="primary-button vote-button"
            >
              Cast your vote
            </button>
            <button type="button" class="secondary-button" on:click={goToResults}>
              View results
            </button>
          </div>
        </form>
      {/if}
    </div>
  {:else}
    <div class="status-card">
      <div class="card-content">
        <p class="error-title">Something went wrong loading this poll.</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .poll-container {
    max-width: 640px;
    margin: 0 auto;
  }

  .status-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
  }

  .card-content {
    text-align: center;
    padding: 3.5rem 2rem;
  }

  .error-title {
    margin: 0 0 0.75rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text);
  }

  .error-description {
    margin: 0 0 1.75rem 0;
    color: var(--text-dim);
    font-size: 0.9rem;
  }

  .loading-text {
    color: var(--text-dim);
    font-size: 0.95rem;
    margin: 0;
  }

  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--border);
    border-top: 3px solid var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1.25rem auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .main-poll-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
  }

  .poll-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem 2rem 1.25rem 2rem;
    border-bottom: 1px solid var(--border);
    gap: 1rem;
  }

  .poll-title-section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .poll-question {
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.35;
  }

  .badge {
    display: inline-flex;
    align-self: flex-start;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent-fg);
    background: var(--accent-soft);
    border: 1px solid var(--accent-soft-border);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
  }

  .poll-actions {
    flex-shrink: 0;
  }

  .share-notification {
    margin: 1.25rem 2rem 0 2rem;
    padding: 0.75rem 1rem;
    background: var(--accent-soft);
    border: 1px solid var(--accent-soft-border);
    border-radius: var(--radius-md);
    color: var(--text);
    font-size: 0.85rem;
    font-weight: 500;
  }

  .voted-state {
    text-align: center;
    padding: 3rem 2rem;
  }

  .voted-text {
    color: var(--text-dim);
    font-size: 0.95rem;
    margin: 0 0 1.5rem 0;
  }

  .poll-form {
    padding: 1.75rem 2rem 2rem 2rem;
  }

  .submission-phase {
    padding: 1.75rem 2rem 2rem 2rem;
  }

  .submit-video-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .video-url-input {
    font-size: 0.95rem;
    padding: 0.85em 1em;
  }

  .own-submission {
    max-width: 360px;
    margin-top: 1rem;
  }

  .submission-count-text {
    margin: 1.5rem 0 0 0;
    color: var(--text-dim);
    font-size: 0.85rem;
    text-align: center;
  }

  .options-container {
    margin-bottom: 1.5rem;
    gap: 0.6rem;
    display: flex;
    flex-direction: column;
  }

  .options-container.video-options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }

  .video-option-content {
    flex: 1;
    min-width: 0;
  }

  .poll-option {
    display: block;
    cursor: pointer;
  }

  .hidden-radio {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .option-content {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 0.95rem 1.1rem;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    transition: border-color 0.15s ease, background-color 0.15s ease;
  }

  .poll-option:hover .option-content {
    border-color: var(--border-strong);
  }

  .poll-option.selected .option-content {
    background: var(--accent-soft);
    border-color: var(--accent);
  }

  .option-indicator {
    width: 18px;
    height: 18px;
    border: 2px solid var(--border-strong);
    border-radius: 50%;
    transition: all 0.15s ease;
    position: relative;
    flex-shrink: 0;
  }

  .poll-option.selected .option-indicator {
    border-color: var(--accent);
  }

  .poll-option.selected .option-indicator::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
  }

  .option-text {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text);
  }

  .error-notification {
    margin-bottom: 1.25rem;
    padding: 0.85rem 1rem;
    background: var(--danger-soft);
    border: 1px solid rgba(242, 85, 90, 0.3);
    border-radius: var(--radius-md);
    color: var(--danger);
    font-size: 0.9rem;
    font-weight: 500;
  }

  .action-buttons {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .primary-button {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--accent-text);
  }

  .primary-button:hover:not(:disabled) {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
  }

  .secondary-button {
    background: transparent;
  }

  .vote-button {
    flex: 1;
    min-width: 160px;
  }

  @media (max-width: 640px) {
    .poll-header {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
      padding: 1.5rem 1.25rem 1.1rem 1.25rem;
    }

    .poll-question {
      font-size: 1.3rem;
    }

    .poll-form {
      padding: 1.5rem 1.25rem 1.5rem 1.25rem;
    }

    .action-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .vote-button {
      min-width: auto;
    }
  }
</style>
