<script>
import { onMount, onDestroy } from 'svelte';
import { Stack, Text, Progress } from '@svelteuidev/core';

export let id;

let pollData = null;
let totalVotes = 0;
let intervalId;


const fetchPollResults = async () => {
  const response = await fetch(`/api/${id}`);
  pollData = await response.json()

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

{#if pollData}
  <h2>{pollData.question}</h2>
  <Stack override={{ height: 200 }}>
    {#each pollData.responses as response (response.id)}
    <Text size='xl' weight='bold' color='blue'>
      {response.text}
    </Text>
    <Progress size={30} value={(response.votes / totalVotes) * 100 } label={response.votes } striped />
    {/each}
    </Stack>
{:else}
  <p>Loading...</p>
{/if}
