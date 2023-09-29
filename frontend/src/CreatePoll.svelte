<script>
import { navigate } from "svelte-routing";
import { Button, Input } from '@svelteuidev/core';

    let question = "";
    let responses = ["", ""];

    async function handleSubmit() {
        const response = await fetch("/api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question, responses: responses.map(text => ({ text }))})
        });

        const data = await response.json();

        navigate(`/polls/${data.id}`)
    }

    async function addOption() {
      responses = [...responses, ""];
      console.log(responses)
    }

    async function removeOption(indexToRemove) {
      responses = responses.filter((_, index) => index !== indexToRemove);
    }
</script>


<form on:submit|preventDefault={handleSubmit}>
<Input bind:value={question} placeholder="Enter your question" />
<ul>
    {#each responses as _, index (index)}
      <div class="response-container">
        <li><Input bind:value={responses[index]} placeholder={`Option ${index + 1}`} />{#if index === (responses.length - 1) && responses.length > 2}<Button type="button" on:click={() => removeOption(index)}>-</Button>{/if}</li>
      </div>
    {/each}
    <Button type="button" on:click={addOption}>+</Button>
</ul>
<Button type="submit">Create Poll</Button>
</form>
