<script>
import { onMount, onDestroy } from 'svelte';
import { Stack, Text, Progress, Card, Badge, Button, Group, ActionIcon } from '@svelteuidev/core';
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
    <Card class="results-card" shadow="xl" radius="lg">
      <div class="results-header">
        <div class="header-content">
          <h1 class="poll-question">{pollData.question}</h1>
          <div class="poll-stats">
            <Badge variant="gradient" gradient={{ from: 'green', to: 'teal' }} size="lg">
              📊 {totalVotes} total votes
            </Badge>
            <Badge variant="light" color="blue" size="md">
              Live Results
            </Badge>
          </div>
        </div>
        
        <Group class="header-actions">
          <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue' }}
            size="sm"
            radius="xl"
            on:click={sharePoll}
          >
            Share
          </Button>
          <Button
            variant="subtle"
            size="sm"
            on:click={goBackToPoll}
          >
            ← Back to Poll
          </Button>
        </Group>
      </div>

      {#if shareMessage}
        <div class="share-notification">
          <div class="notification-icon">✅</div>
          <Text size="sm" weight="500" color="teal">{shareMessage}</Text>
        </div>
      {/if}

      <div class="results-content">
        <div class="results-grid">
          {#each pollData.responses.sort((a, b) => b.votes - a.votes) as response, index (response.id)}
            <div class="result-item" class:winner={index === 0 && response.votes > 0}>
              <div class="result-header">
                <div class="result-ranking">
                  {#if index === 0 && response.votes > 0}
                    🏆
                  {:else if index === 1 && response.votes > 0}
                    🥈
                  {:else if index === 2 && response.votes > 0}
                    🥉
                  {:else}
                    #{index + 1}
                  {/if}
                </div>
                <div class="result-text">
                  <Text size="lg" weight="600" class="option-text">
                    {response.text}
                  </Text>
                  <div class="vote-count">
                    <Text size="sm" color="dimmed">
                      {response.votes} {response.votes === 1 ? 'vote' : 'votes'}
                    </Text>
                    <Text size="md" weight="700" class="percentage">
                      {totalVotes > 0 ? Math.round((response.votes / totalVotes) * 100) : 0}%
                    </Text>
                  </div>
                </div>
              </div>
              
              <div class="progress-container">
                <div 
                  class="progress-bar"
                  class:winner-bar={index === 0 && response.votes > 0}
                  style="width: {totalVotes > 0 ? (response.votes / totalVotes) * 100 : 0}%"
                >
                  <div class="progress-shimmer"></div>
                </div>
              </div>
            </div>
          {/each}
        </div>

        {#if totalVotes === 0}
          <div class="no-votes">
            <div class="no-votes-icon">🗳️</div>
            <Text size="xl" weight="500" color="dimmed">
              No votes yet!
            </Text>
            <Text size="md" color="dimmed">
              Be the first to vote on this poll.
            </Text>
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'purple' }}
              size="lg"
              on:click={goBackToPoll}
              class="vote-now-btn"
            >
              🗳️ Vote Now
            </Button>
          </div>
        {/if}

        <div class="results-footer">
          <Text size="xs" color="dimmed" align="center">
            Results update automatically every 5 seconds
          </Text>
        </div>
      </div>
    </Card>
  {:else}
    <Card class="loading-card" shadow="lg" radius="lg">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <Text size="xl" weight="500" color="dimmed">Loading poll results...</Text>
      </div>
    </Card>
  {/if}
</div>

<style>
  .results-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .results-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    overflow: hidden;
  }

  .loading-card {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    border: none;
  }

  .loading-content {
    text-align: center;
    padding: 4rem 2rem;
  }

  .loading-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 2rem auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem 2rem 1rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    gap: 1rem;
  }

  .header-content {
    flex-grow: 1;
  }

  .poll-question {
    margin: 0 0 1rem 0;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.3;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .poll-stats {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .header-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
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

  .results-content {
    padding: 2rem;
  }

  .results-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .result-item {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    animation: resultFadeIn 0.5s ease-out;
  }

  .result-item.winner {
    background: rgba(255, 215, 0, 0.2);
    border-color: rgba(255, 215, 0, 0.4);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  }

  @keyframes resultFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .result-item:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  .result-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .result-ranking {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .result-text {
    flex-grow: 1;
  }

  .option-text {
    color: white;
    margin-bottom: 0.25rem;
  }

  .vote-count {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .percentage {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    color: white;
    font-size: 0.9rem;
  }

  .progress-container {
    position: relative;
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
    border-radius: 4px;
    transition: width 1s ease-out;
    position: relative;
    overflow: hidden;
  }

  .progress-bar.winner-bar {
    background: linear-gradient(90deg, #ffd700 0%, #ffed4e 100%);
  }

  .progress-shimmer {
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.4), 
      transparent
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  .no-votes {
    text-align: center;
    padding: 4rem 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    margin-bottom: 2rem;
  }

  .no-votes-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .vote-now-btn {
    margin-top: 1.5rem;
  }

  .results-footer {
    text-align: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
  }

  @media (max-width: 640px) {
    .results-container {
      padding: 1rem 0.5rem;
    }
    
    .results-header {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
      padding: 1.5rem 1rem 1rem 1rem;
    }
    
    .header-actions {
      justify-content: center;
    }
    
    .poll-question {
      font-size: 1.5rem;
      text-align: center;
    }
    
    .results-content {
      padding: 1rem;
    }
    
    .result-item {
      padding: 1rem;
    }
    
    .result-header {
      flex-direction: column;
      text-align: center;
      gap: 0.75rem;
    }
    
    .result-ranking {
      align-self: center;
    }
    
    .vote-count {
      justify-content: center;
      gap: 1rem;
    }
    
    .poll-stats {
      justify-content: center;
    }
  }
</style>
