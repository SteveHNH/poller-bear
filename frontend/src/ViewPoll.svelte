<script>
import { onMount } from "svelte";
import { navigate } from "svelte-routing";
import { Stack, Button, RadioGroup, Text, Card, Badge, Group, ActionIcon } from "@svelteuidev/core";

export let id;

let pollData = null;
let selectedOption;
let responseData = [];
let hasVoted = false;
let errorMessage = "";
let loadingError = "";
let isLoading = true;
let shareMessage = "";


onMount(async () => {
  try {
    const response = await fetch(`/api/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        loadingError = "Poll not found. It may have been deleted or the link is incorrect.";
      } else {
        loadingError = "Failed to load poll. Please try again later.";
      }
      return;
    }
    
    const data = await response.json();
    
    // Handle new response format
    if (data.poll) {
      pollData = data.poll;
      hasVoted = data.has_voted || false;
    } else {
      // Handle old format for backwards compatibility
      pollData = data;
      hasVoted = false;
    }
    
    for (let i of pollData.responses) {
      responseData = [...responseData, {label: i.text, value: i.id}]
    }
  } catch (error) {
    loadingError = "Network error. Please check your connection and try again.";
    console.error("Error loading poll:", error);
  } finally {
    isLoading = false;
  }
});

async function submitVotes() {
  try {
    errorMessage = "";
    const response = await fetch(`/api/${id}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response_id: selectedOption }),
    });

    const data = await response.json();

    if (response.ok) {
      navigate(`/polls/${id}/r`);
    } else if (response.status === 409) {
      // User already voted
      errorMessage = data.error || "You have already voted on this poll";
      hasVoted = true;
    } else {
      errorMessage = data.error || "Failed to submit vote";
      console.error('Failed to submit votes:', data.error);
    }
  } catch (err) {
    errorMessage = "Network error occurred";
    console.error('Error:', err);
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
    <Card class="error-card" shadow="lg" radius="lg">
      <div class="card-content">
        <div class="error-icon">⚠️</div>
        <Text size="xl" weight="600" class="error-title">Oops! Something went wrong</Text>
        <Text size="md" color="dimmed" class="error-description">
          {loadingError}
        </Text>
        <Button variant="gradient" gradient={{ from: 'pink', to: 'red' }} size="md" on:click={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    </Card>
  {:else if isLoading}
    <Card class="loading-card" shadow="lg" radius="lg">
      <div class="card-content">
        <div class="loading-spinner"></div>
        <Text size="xl" weight="500" color="dimmed">Loading your poll...</Text>
      </div>
    </Card>
  {:else if pollData}
    <Card class="main-poll-card" shadow="xl" radius="lg">
      <div class="poll-header">
        <div class="poll-title-section">
          <h1 class="poll-question">{pollData.question}</h1>
          {#if pollData.limit_votes}
            <Badge variant="gradient" gradient={{ from: 'blue', to: 'purple' }} size="sm">
              One Vote Per Person
            </Badge>
          {/if}
        </div>
        
        <div class="poll-actions">
          <Button 
            variant="gradient" 
            gradient={{ from: 'teal', to: 'blue' }} 
            size="sm" 
            radius="xl"
            on:click={sharePoll}
            class="share-button"
          >
            Share
          </Button>
        </div>
      </div>
      
      {#if shareMessage}
        <div class="share-notification">
          <div class="notification-icon">✅</div>
          <Text size="sm" weight="500" color="teal">{shareMessage}</Text>
        </div>
      {/if}

      {#if pollData.limit_votes && hasVoted}
        <div class="voted-state">
          <div class="voted-icon">🗳️</div>
          <Text size="lg" weight="500" color="dimmed">
            Thanks for voting! Your response has been recorded.
          </Text>
          <Button 
            variant="gradient" 
            gradient={{ from: 'grape', to: 'pink' }}
            size="lg"
            radius="xl"
            on:click={goToResults}
          >
            🎯 View Results
          </Button>
        </div>
      {:else}
        <form on:submit|preventDefault={submitVotes} class="poll-form">
          <div class="options-container">
            {#each responseData as option, index (option.value)}
              <label class="poll-option" class:selected={selectedOption === option.value}>
                <input 
                  type="radio" 
                  bind:group={selectedOption} 
                  value={option.value}
                  class="hidden-radio"
                />
                <div class="option-content">
                  <div class="option-indicator"></div>
                  <span class="option-text">{option.label}</span>
                </div>
              </label>
            {/each}
          </div>
          
          {#if errorMessage}
            <div class="error-notification">
              <div class="notification-icon">❌</div>
              <Text weight="500" color="red">{errorMessage}</Text>
            </div>
          {/if}
          
          <Group class="action-buttons">
            <Button 
              type="submit" 
              disabled={!selectedOption || hasVoted}
              variant="gradient"
              gradient={{ from: 'blue', to: 'purple' }}
              size="lg"
              radius="xl"
              class="vote-button"
            >
              🗳️ Cast Your Vote
            </Button>
            <Button 
              type="button" 
              variant="subtle"
              size="lg"
              radius="xl"
              on:click={goToResults}
            >
              📊 View Results
            </Button>
          </Group>
        </form> 
      {/if}
    </Card>
  {:else}
    <Card class="error-card" shadow="lg" radius="lg">
      <div class="card-content">
        <div class="error-icon">💥</div>
        <Text size="xl" weight="600" class="error-title">
          Something went wrong loading this poll.
        </Text>
      </div>
    </Card>
  {/if}
</div>

<style>
  .poll-container {
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .card-content {
    text-align: center;
    padding: 3rem 2rem;
  }

  .error-icon, .voted-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .error-title {
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #e74c3c, #c0392b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .error-description {
    margin-bottom: 2rem;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1.5rem auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .main-poll-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-size: 200% 200%;
    animation: gradientShift 6s ease infinite;
    color: white;
    border: none;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .poll-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem 2rem 1rem 2rem;
    gap: 1rem;
  }

  .poll-title-section {
    flex-grow: 1;
  }

  .poll-question {
    margin: 0 0 1rem 0;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.3;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .poll-actions {
    flex-shrink: 0;
  }

  .share-button {
    transform: scale(1);
    transition: transform 0.2s ease;
  }

  .share-button:hover {
    transform: scale(1.1);
  }

  .share-notification {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 0 2rem 1rem 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .notification-icon {
    font-size: 1.2rem;
  }

  .voted-state {
    text-align: center;
    padding: 3rem 2rem;
  }

  .poll-form {
    padding: 0 2rem 2rem 2rem;
  }

  .options-container {
    margin-bottom: 2rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }

  .poll-option {
    display: block;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: translateX(0);
  }

  .poll-option:hover {
    transform: translateX(5px);
  }

  .hidden-radio {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .option-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .poll-option:hover .option-content {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  }

  .poll-option.selected .option-content {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }

  .option-indicator {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    transition: all 0.3s ease;
    position: relative;
  }

  .poll-option.selected .option-indicator {
    background: white;
    border-color: white;
  }

  .poll-option.selected .option-indicator::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: #667eea;
    border-radius: 50%;
  }

  .option-text {
    font-size: 1.1rem;
    font-weight: 500;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }

  .error-notification {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(231, 76, 60, 0.15);
    border: 1px solid rgba(231, 76, 60, 0.3);
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .vote-button {
    min-width: 180px;
  }

  @media (max-width: 640px) {
    .poll-container {
      padding: 1rem 0.5rem;
    }
    
    .poll-header {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }
    
    .poll-actions {
      align-self: center;
    }
    
    .poll-question {
      font-size: 1.5rem;
      text-align: center;
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
