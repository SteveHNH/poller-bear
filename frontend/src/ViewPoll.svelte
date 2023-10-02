<script>
import { onMount } from "svelte";
import { navigate } from "svelte-routing";
import { Stack, Button, RadioGroup } from "@svelteuidev/core";

export let id;

let pollData = null;
let selectedOption;
let responseData = [];


onMount(async () => {
  const response = await fetch(`/api/${id}`);
  pollData = await response.json();
  
  for (let i of pollData.responses) {
    responseData = [...responseData, {label: i.text, value: i.id}]
  }
});

async function submitVotes() {
  try {
    const response = await fetch(`/api/${id}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response_id: selectedOption }),
    });

    if (response.ok) {
      navigate(`/polls/${id}/r`);
    } else {
      console.error('Failed to submit votes');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

async function goToResults() {
  navigate(`/polls/${id}/r`)
}

</script>

{#if pollData}
<h2>{pollData.question}</h2>
<form on:submit|preventDefault={submitVotes}>
<Stack override={{ height: 200 }} >
<RadioGroup size='xl' bind:group={selectedOption} items={responseData} direction={'column'} labelDirection={'left'} checked={false} /> 
<Button type="submit">Vote</Button><Button type="button" on:click={goToResults}>Results</Button>
</Stack>
</form> 
{:else}
<p>Loading...</p>
{/if}
