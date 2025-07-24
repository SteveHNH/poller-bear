<script>
import { navigate } from "svelte-routing";
import { Button, TextInput, Checkbox, Text, Card, Badge, ActionIcon, Stack, Group } from '@svelteuidev/core';

    let question = "";
    let responses = ["", ""];
    let limitVotes = false;
    let canSubmit = false;
    let errorMessage = "";
    let isSubmitting = false;

    $: canSubmit = question.trim() && responses.filter(opt => opt.trim()).length >= 2;

    $: if (responses[responses.length - 1]) {
      responses = [...responses, ""];
    }
    
    function removeOption(index) {
      if (responses.length > 2) {
        responses = responses.filter((_, i) => i !== index);
      }
    }

    async function handleSubmit() {
      if (!canSubmit) {
        errorMessage = "Please enter a question and at least two options.";
        return;
      }

      errorMessage = "";
      isSubmitting = true;

      try {
        const validOptions = responses.filter(response => Boolean(response.trim()));
        const response = await fetch("/api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                question, 
                limit_votes: limitVotes,
                responses: validOptions.map(text => ({ text }))
            })
        });

        const data = await response.json();

        if (response.ok) {
          // Success - navigate to the new poll
          navigate(`/polls/${data.id}`);
        } else {
          // Server validation error
          errorMessage = data.error || "Failed to create poll. Please try again.";
        }
      } catch (error) {
        // Network or other error
        errorMessage = "Network error. Please check your connection and try again.";
        console.error("Error creating poll:", error);
      } finally {
        isSubmitting = false;
      }
    }

</script>


<div class="create-poll-container">
  <Card class="create-poll-card" shadow="xl" radius="lg">
    <div class="card-header">
      <div class="header-content">
        <h1 class="page-title">
          <span class="title-icon">🗳️</span>
          <span class="title-text">Create a New Poll</span>
        </h1>
      </div>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="poll-form">
      <Stack spacing="xl">
        
        <!-- Question Section -->
        <div class="question-section">
          <TextInput
            size="lg"
            radius="md"
            aria-label="Question Field"
            bind:value={question}
            placeholder="e.g., What's your favorite programming language?"
            class="question-input"
          />
        </div>

        <!-- Options Section -->
        <div class="options-section">
          <div class="options-header">
            <Text size="lg" weight="600" class="section-title">
              ⚡ Response Options
            </Text>
            <Badge variant="light" color="blue" size="sm">
              {responses.filter(r => r.trim()).length} options
            </Badge>
          </div>
          
          <div class="options-list">
            {#each responses as _, index (index)}
              <div class="option-row" class:is-last={index === responses.length - 1}>
                <div class="option-number">{index + 1}</div>
                <TextInput
                  size="md"
                  radius="md"
                  aria-label="Response Option Field"
                  bind:value={responses[index]}
                  placeholder={index === 0 ? "First option..." : index === 1 ? "Second option..." : `Option ${index + 1}...`}
                  class="option-input"
                />
                {#if responses.length > 2 && index < responses.length - 1}
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    size="lg"
                    radius="xl"
                    on:click={() => removeOption(index)}
                    title="Remove this option"
                  >
                    ❌
                  </ActionIcon>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Settings Section -->
        <div class="settings-section">
          <Text size="lg" weight="600" class="section-title">
            ⚙️ Poll Settings
          </Text>
          <div class="settings-content">
            <Checkbox
              size="md"
              bind:checked={limitVotes}
              label="Limit votes to one per user"
              description="Prevents users from voting multiple times using cookies"
            />
          </div>
        </div>

        {#if errorMessage}
          <div class="error-notification">
            <div class="error-icon">⚠️</div>
            <Text weight="500" color="red">{errorMessage}</Text>
          </div>
        {/if}

        <!-- Submit Section -->
        <div class="submit-section">
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            size="xl"
            radius="xl"
            variant="gradient"
            gradient={{ from: 'purple', to: 'pink' }}
            loading={isSubmitting}
            class="create-button"
          >
            {isSubmitting ? '🚀 Creating Your Poll...' : '🎉 Create My Poll!'}
          </Button>
          
        </div>

      </Stack>
    </form>
  </Card>
</div>

<style>
  .create-poll-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .create-poll-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    overflow: hidden;
  }

  .card-header {
    background: rgba(255, 255, 255, 0.1);
    padding: 2rem 2rem 1rem 2rem;
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .header-content {
    text-align: center;
  }

  .page-title {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .title-icon {
    font-size: 2.5rem;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  }

  .title-text {
    background: linear-gradient(45deg, #ffffff, #e3e8ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .poll-form {
    padding: 2rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    color: white;
    font-size: 1.2rem;
  }

  .question-section {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .options-section {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .options-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .options-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .option-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .option-row:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .option-row.is-last {
    opacity: 0.7;
  }

  .option-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    font-weight: 600;
    font-size: 0.9rem;
    color: white;
    flex-shrink: 0;
  }

  .option-input {
    flex: 1;
  }

  .settings-section {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .settings-content {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.25rem;
    border-radius: 12px;
    margin-top: 0.5rem;
  }

  .error-notification {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(231, 76, 60, 0.15);
    border: 1px solid rgba(231, 76, 60, 0.3);
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }

  .error-icon {
    font-size: 1.2rem;
  }

  .submit-section {
    text-align: center;
    padding: 1.5rem 0 0.5rem 0;
  }

  .create-button {
    margin-bottom: 1rem;
    min-width: 250px;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: none;
    transition: transform 0.2s ease;
  }

  .create-button:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  .submit-help {
    opacity: 0.8;
  }

  /* Input Styling Overrides */
  :global(.question-input input) {
    background: rgba(255, 255, 255, 0.9) !important;
    border: 2px solid rgba(255, 255, 255, 0.3) !important;
    color: #333 !important;
    font-size: 1.1rem !important;
  }

  :global(.question-input input:focus) {
    border-color: rgba(255, 255, 255, 0.6) !important;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2) !important;
  }

  :global(.option-input input) {
    background: rgba(255, 255, 255, 0.85) !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    color: #333 !important;
  }

  :global(.option-input input:focus) {
    border-color: rgba(255, 255, 255, 0.6) !important;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2) !important;
  }

  @media (max-width: 640px) {
    .create-poll-container {
      padding: 1rem 0.5rem;
    }
    
    .card-header {
      padding: 1.5rem 1rem 0.5rem 1rem;
    }
    
    .page-title {
      font-size: 2rem;
    }

    .title-icon {
      font-size: 2rem;
    }
    
    .poll-form {
      padding: 1rem;
    }
    
    .option-row {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }
    
    .option-number {
      align-self: flex-start;
    }
    
    .create-button {
      min-width: auto;
      width: 100%;
    }

    .options-header {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }
  }
</style>
