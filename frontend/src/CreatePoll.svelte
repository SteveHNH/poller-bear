<script>
import { navigate } from "svelte-routing";
import { Button, Input } from '@svelteuidev/core';

    let question = "";
    let responses = ["", ""];

    $: if (responses[responses.length - 1]) {
      responses = [...responses, ""];
    }

    async function handleSubmit() {
        const validOptions = responses.filter(response => Boolean(response.trim()));
        const response = await fetch("/api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question, responses: validOptions.map(text => ({ text }))})
        });

        const data = await response.json();

        navigate(`/polls/${data.id}`)
    }

</script>


<form on:submit|preventDefault={handleSubmit}>
<Input bind:value={question} placeholder="Enter your question" />
<ul>
    {#each responses as _, index (index)}
      <div class="response-container">
        <li>
        <Input bind:value={responses[index]} placeholder={`Option ${index + 1}`} />
        </li>
      </div>
    {/each}
</ul>
<Button type="submit">Create Poll</Button>
</form>
