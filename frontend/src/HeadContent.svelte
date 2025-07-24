<script>
import { Header, Group, Button } from '@svelteuidev/core';
import { useLocation } from 'svelte-routing';

const location = useLocation();

// Show Create Poll button only on poll pages (/polls/id or /polls/id/r)
$: showCreateButton = $location && $location.pathname ? $location.pathname.startsWith('/polls/') : false;
</script>

<div class="modern-header">
  <div class="header-container">
    <div class="brand-section">
      <a href="/" class="brand-link">
        <div class="brand-icon">🐻‍❄️</div>
        <div class="brand-text">
          <span class="brand-name">Poller Bear</span>
          <span class="brand-tagline">Quick Polls, Real Results</span>
        </div>
      </a>
    </div>
    
    <div class="header-actions">
      {#if showCreateButton}
        <Button 
          variant="subtle" 
          size="sm"
          radius="xl"
          component="a"
          href="/"
          class="nav-button"
        >
          Create Poll
        </Button>
      {/if}
    </div>
  </div>
</div>

<style>
  .modern-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand-section {
    display: flex;
    align-items: center;
  }

  .brand-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    transition: transform 0.2s ease;
  }

  .brand-link:hover {
    transform: translateY(-2px);
  }

  .brand-icon {
    font-size: 2.5rem;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .brand-name {
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    background: linear-gradient(45deg, #ffffff, #e3e8ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .brand-tagline {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }

  .header-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  :global(.nav-button) {
    background: rgba(255, 255, 255, 0.15) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: white !important;
    font-weight: 500 !important;
    backdrop-filter: blur(10px) !important;
    transition: all 0.3s ease !important;
  }

  :global(.nav-button:hover) {
    background: rgba(255, 255, 255, 0.25) !important;
    border-color: rgba(255, 255, 255, 0.4) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
  }

  @media (max-width: 768px) {
    .header-container {
      padding: 1rem;
      flex-direction: column;
      gap: 1rem;
    }
    
    .brand-icon {
      font-size: 2rem;
    }
    
    .brand-name {
      font-size: 1.5rem;
    }
    
    .brand-tagline {
      font-size: 0.8rem;
    }
    
    .header-actions {
      width: 100%;
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .brand-link {
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }
    
    .brand-text {
      align-items: center;
    }
  }
</style> 
