<script>
import { useLocation } from 'svelte-routing';

const location = useLocation();

// Show Create Poll button only on poll pages (/polls/id or /polls/id/r)
$: showCreateButton = $location && $location.pathname ? $location.pathname.startsWith('/polls/') : false;
</script>

<header class="site-header">
  <div class="header-container">
    <a href="/" class="brand-link">
      <span class="brand-mark">PB</span>
      <span class="brand-text">
        <span class="brand-name">Poller Bear</span>
        <span class="brand-tagline">Quick polls, real results</span>
      </span>
    </a>

    {#if showCreateButton}
      <a href="/" class="nav-button">New poll</a>
    {/if}
  </div>
</header>

<style>
  .site-header {
    background: rgba(11, 12, 16, 0.75);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(16px);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.9rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: inherit;
  }

  .brand-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    background: var(--accent);
    color: white;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    flex-shrink: 0;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  .brand-name {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text);
  }

  .brand-tagline {
    font-size: 0.75rem;
    color: var(--text-dim);
  }

  .nav-button {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    color: var(--text);
    font-size: 0.85rem;
    font-weight: 600;
    transition: background-color 0.15s ease, border-color 0.15s ease;
  }

  .nav-button:hover {
    background: var(--surface-hover);
    border-color: var(--border-strong);
  }

  @media (max-width: 480px) {
    .brand-tagline {
      display: none;
    }
  }
</style>

