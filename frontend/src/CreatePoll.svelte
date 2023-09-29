<script>
import { navigate } from "svelte-routing";
import { Button, TextInput } from '@svelteuidev/core';

    let question = "";
    let responses = ["", ""];
    let canSubmit = false

    $: canSubmit = question.trim() && responses.filter(opt => opt.trim()).length >= 2;

    $: if (responses[responses.length - 1]) {
      responses = [...responses, ""];
    }

    async function handleSubmit() {
      if (!canSubmit) {
        alert("Please enter a question and at least two options.");
        return;
      }
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
<TextInput aria-label="Question Field" bind:value={question} placeholder="Enter your question" />
<ul>
    {#each responses as _, index (index)}
      <div class="response-container">
        <li>
        <TextInput aria-label="Response Option Field" bind:value={responses[index]} placeholder={`Option ${index + 1}`} />
        </li>
      </div>
    {/each}
</ul>
<Button type="submit" disabled={!canSubmit}>Create Poll</Button>
</form>
