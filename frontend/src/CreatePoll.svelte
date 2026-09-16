<script>
import { navigate } from "svelte-routing";

    const MAX_OPTIONS = 10;

    let question = "";
    let responses = ["", ""];
    let limitVotes = false;
    let durationHours = null;
    let canSubmit = false;
    let errorMessage = "";
    let isSubmitting = false;

    $: canSubmit = question.trim() && responses.filter(opt => opt.trim()).length >= 2;

    $: if (responses[responses.length - 1] && responses.length < MAX_OPTIONS) {
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
        const requestBody = { 
            question, 
            limit_votes: limitVotes,
            responses: validOptions.map(text => ({ text }))
        };
        
        // Add duration_hours if specified
        if (durationHours && durationHours > 0) {
          requestBody.duration_hours = parseInt(durationHours);
        }
        
        const response = await fetch("/api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
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
  <div class="create-poll-card">
    <div class="card-header">
      <h1 class="page-title">Create a new poll</h1>
      <p class="page-subtitle">Ask a question, add some options, and share the link.</p>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="poll-form">

      <!-- Question Section -->
      <div class="form-section">
        <label class="section-label" for="question-input">Question</label>
        <input
          id="question-input"
          type="text"
          aria-label="Question Field"
          bind:value={question}
          placeholder="e.g., What's your favorite programming language?"
          class="question-input"
        />
      </div>

      <!-- Options Section -->
      <div class="form-section">
        <div class="options-header">
          <span class="section-label">Response options</span>
          <span class="options-count">{responses.filter(r => r.trim()).length} / {MAX_OPTIONS} options</span>
        </div>

        <div class="options-list">
          {#each responses as _, index (index)}
            <div class="option-row" class:is-last={index === responses.length - 1}>
              <div class="option-number">{index + 1}</div>
              <input
                type="text"
                name="response-option-{index}"
                aria-label="Response Option Field"
                bind:value={responses[index]}
                placeholder={index === 0 ? "First option..." : index === 1 ? "Second option..." : `Option ${index + 1}...`}
                class="option-input"
              />
              {#if responses.length > 2 && (index < responses.length - 1 || responses[index].trim() !== "")}
                <button
                  type="button"
                  class="remove-option"
                  on:click={() => removeOption(index)}
                  title="Remove this option"
                  aria-label="Remove option"
                >
                  &times;
                </button>
              {/if}
            </div>
          {/each}
        </div>
      </div>

      <!-- Settings Section -->
      <div class="form-section">
        <span class="section-label">Poll settings</span>
        <div class="settings-content">
          <label class="checkbox-row">
            <input type="checkbox" name="limit-votes" bind:checked={limitVotes} />
            <span class="checkbox-text">
              <span class="checkbox-title">Limit votes to one per user</span>
              <span class="checkbox-description">Prevents users from voting multiple times</span>
            </span>
          </label>

          <div class="duration-setting">
            <label class="sub-label" for="duration-input">Poll duration (optional)</label>
            <input
              id="duration-input"
              type="number"
              min="1"
              max="8760"
              bind:value={durationHours}
              placeholder="Duration in hours (e.g., 24 for 1 day)"
              class="duration-input"
            />
            <span class="checkbox-description">Leave empty for polls that never expire</span>
          </div>
        </div>
      </div>

      {#if errorMessage}
        <div class="error-notification">{errorMessage}</div>
      {/if}

      <!-- Submit Section -->
      <div class="submit-section">
        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          class="create-button"
        >
          {isSubmitting ? 'Creating poll…' : 'Create poll'}
        </button>
      </div>

    </form>
  </div>
</div>

<style>
  .create-poll-container {
    max-width: 640px;
    margin: 0 auto;
  }

  .create-poll-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  .card-header {
    padding: 2rem 2rem 1.25rem 2rem;
    border-bottom: 1px solid var(--border);
  }

  .page-title {
    margin: 0;
    font-size: 1.5rem;
  }

  .page-subtitle {
    margin: 0.4rem 0 0 0;
    color: var(--text-dim);
    font-size: 0.9rem;
  }

  .poll-form {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .section-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .sub-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text);
  }

  .question-input {
    font-size: 1rem;
    padding: 0.85em 1em;
  }

  .options-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .options-count {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent-fg);
    background: var(--accent-soft);
    border: 1px solid var(--accent-soft-border);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
  }

  .options-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .option-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .option-row.is-last {
    opacity: 0.6;
  }

  .option-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 50%;
    font-weight: 600;
    font-size: 0.8rem;
    color: var(--text-dim);
    flex-shrink: 0;
  }

  .option-input {
    flex: 1;
  }

  .remove-option {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: var(--radius-md);
    background: transparent;
    border: 1px solid transparent;
    color: var(--text-faint);
    font-size: 1.1rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .remove-option:hover {
    background: var(--danger-soft);
    border-color: rgba(242, 85, 90, 0.3);
    color: var(--danger);
  }

  .settings-content {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    padding: 1.1rem 1.25rem;
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .checkbox-row {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    cursor: pointer;
  }

  .checkbox-row input[type="checkbox"] {
    margin-top: 0.2rem;
    width: 16px;
    height: 16px;
    accent-color: var(--accent);
    flex-shrink: 0;
  }

  .checkbox-text {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .checkbox-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text);
  }

  .checkbox-description {
    font-size: 0.78rem;
    color: var(--text-faint);
  }

  .duration-setting {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .error-notification {
    padding: 0.85rem 1rem;
    background: var(--danger-soft);
    border: 1px solid rgba(242, 85, 90, 0.3);
    border-radius: var(--radius-md);
    color: var(--danger);
    font-size: 0.9rem;
    font-weight: 500;
  }

  .submit-section {
    padding-top: 0.25rem;
  }

  .create-button {
    width: 100%;
    background: var(--accent);
    border-color: var(--accent);
    color: var(--accent-text);
    padding: 0.85em 1.1em;
    font-size: 0.95rem;
  }

  .create-button:hover:not(:disabled) {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
  }

  @media (max-width: 640px) {
    .card-header {
      padding: 1.5rem 1.25rem 1rem 1.25rem;
    }

    .poll-form {
      padding: 1.25rem;
      gap: 1.5rem;
    }

    .option-row {
      gap: 0.5rem;
    }
  }
</style>
