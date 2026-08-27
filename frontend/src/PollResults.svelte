<script>
import { onMount, onDestroy } from 'svelte';
import { navigate } from "svelte-routing";

export let id;

let pollData = null;
let totalVotes = 0;
let intervalId;
let shareMessage = "";

function goBackToPoll() {
  navigate(`/polls/${id}`);
}

async function sharePoll() {
  try {
    const pollUrl = window.location.origin + `/polls/${id}`;
    await navigator.clipboard.writeText(pollUrl);
    shareMessage = "Poll link copied to clipboard!";
    setTimeout(() => shareMessage = "", 3000);
  } catch (error) {
    shareMessage = "Failed to copy link. Please copy the URL manually.";
    setTimeout(() => shareMessage = "", 5000);
  }
}


const fetchPollResults = async () => {
  const response = await fetch(`/api/${id}`);
  const data = await response.json()
  pollData = data.poll

  let responseVotes = 0

  for (let response of pollData.responses) {
    responseVotes = responseVotes += response.votes
  };

  if(responseVotes > totalVotes) {
    totalVotes = responseVotes
  }
}

onMount(() => {
  fetchPollResults();
  intervalId = setInterval(fetchPollResults, 5000);
});


onDestroy(() => {
  clearInterval(intervalId);
});

</script>

<div class="results-container">
  {#if pollData}
    <div class="results-card">
      <div class="results-header">
        <div class="header-content">
          <h1 class="poll-question">{pollData.question}</h1>
          <div class="poll-stats">
            <span class="badge badge-accent">{totalVotes} total {totalVotes === 1 ? 'vote' : 'votes'}</span>
            <span class="badge">Live results</span>
          </div>
        </div>

        <div class="header-actions">
          <button class="secondary-button" on:click={sharePoll}>Share</button>
          <button class="secondary-button" on:click={goBackToPoll}>Back to poll</button>
        </div>
      </div>

      {#if shareMessage}
        <div class="share-notification">{shareMessage}</div>
      {/if}

      <div class="results-content">
        <div class="results-grid">
          {#each pollData.responses.sort((a, b) => b.votes - a.votes) as response, index (response.id)}
            <div class="result-item" class:winner={index === 0 && response.votes > 0}>
              <div class="result-header">
                <div class="result-ranking">#{index + 1}</div>
                <div class="result-text">
                  <p class="option-text">{response.text}</p>
                  <div class="vote-count">
                    <span class="vote-count-label">{response.votes} {response.votes === 1 ? 'vote' : 'votes'}</span>
                    <span class="percentage">
                      {totalVotes > 0 ? Math.round((response.votes / totalVotes) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>

              <div class="progress-container">
                <div
                  class="progress-bar"
                  class:winner-bar={index === 0 && response.votes > 0}
                  style="width: {totalVotes > 0 ? (response.votes / totalVotes) * 100 : 0}%"
                ></div>
              </div>
            </div>
          {/each}
        </div>

        {#if totalVotes === 0}
          <div class="no-votes">
            <p class="no-votes-title">No votes yet</p>
            <p class="no-votes-description">Be the first to vote on this poll.</p>
            <button class="primary-button" on:click={goBackToPoll}>
              Vote now
            </button>
          </div>
        {/if}

        <div class="results-footer">
          Results update automatically every 5 seconds
        </div>
      </div>
    </div>
  {:else}
    <div class="loading-card">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading poll results…</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .results-container {
    max-width: 720px;
    margin: 0 auto;
  }

  .results-card, .loading-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  .loading-content {
    text-align: center;
    padding: 4rem 2rem;
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

  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem 2rem 1.25rem 2rem;
    border-bottom: 1px solid var(--border);
    gap: 1rem;
  }

  .header-content {
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

  .poll-stats {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .badge {
    display: inline-flex;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-dim);
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
  }

  .badge-accent {
    color: var(--accent-fg);
    background: var(--accent-soft);
    border-color: var(--accent-soft-border);
  }

  .header-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
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

  .results-content {
    padding: 1.75rem 2rem 2rem 2rem;
  }

  .results-grid {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .result-item {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.1rem 1.25rem;
  }

  .result-item.winner {
    border-color: var(--accent-soft-border);
    background: var(--accent-soft);
  }

  .result-header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 0.75rem;
  }

  .result-ranking {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--text-dim);
    flex-shrink: 0;
  }

  .result-text {
    flex-grow: 1;
    min-width: 0;
  }

  .option-text {
    color: var(--text);
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
  }

  .vote-count {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .vote-count-label {
    color: var(--text-dim);
    font-size: 0.8rem;
  }

  .percentage {
    color: var(--text);
    font-size: 0.85rem;
    font-weight: 700;
  }

  .progress-container {
    position: relative;
    height: 6px;
    background: var(--border);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: var(--accent);
    border-radius: var(--radius-full);
    transition: width 0.6s ease-out;
  }

  .progress-bar.winner-bar {
    background: var(--accent);
  }

  .no-votes {
    text-align: center;
    padding: 3rem 2rem;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    margin-bottom: 1.5rem;
  }

  .no-votes-title {
    color: var(--text);
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0 0 0.35rem 0;
  }

  .no-votes-description {
    color: var(--text-dim);
    font-size: 0.9rem;
    margin: 0 0 1.5rem 0;
  }

  .results-footer {
    text-align: center;
    padding: 0.85rem;
    color: var(--text-faint);
    font-size: 0.75rem;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }

  @media (max-width: 640px) {
    .results-header {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
      padding: 1.5rem 1.25rem 1.1rem 1.25rem;
    }

    .header-actions {
      justify-content: stretch;
    }

    .header-actions .secondary-button {
      flex: 1;
    }

    .poll-question {
      font-size: 1.3rem;
    }

    .results-content {
      padding: 1.25rem;
    }

    .result-item {
      padding: 1rem;
    }
  }
</style>
