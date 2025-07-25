<script>
import { Button, Group, Text } from '@svelteuidev/core';
import { GithubLogo } from 'radix-icons-svelte';
</script>

<footer class="modern-footer">
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-brand">
        <div class="footer-logo">
          <span class="footer-icon">🐻‍❄️</span>
          <span class="footer-name">Poller Bear</span>
        </div>
        <Text size="sm" color="dimmed" class="footer-description">
          Create polls in seconds, get results instantly. Simple, fast polling for everyone.
        </Text>
      </div>

      <div class="footer-links">
        <div class="links-section">
          <Button
            variant="subtle"
            size="sm"
            leftIcon={GithubLogo}
            component="a"
            href="https://www.github.com/SteveHNH/poller-bear"
            target="_blank"
            class="github-button"
          >
            GitHub
          </Button>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-divider"></div>
      <div class="bottom-content">
        <Text size="xs" color="dimmed">
          © 2025 Poller Bear
        </Text>
        <Text size="xs" color="dimmed">
          Open source. Patches welcome.
        </Text>
      </div>
    </div>
  </div>
</footer>

<style>
  .modern-footer {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    color: white;
    margin-top: auto;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem 1.5rem 2rem;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3rem;
    margin-bottom: 2rem;
  }

  .footer-brand {
    max-width: 400px;
  }

  .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .footer-icon {
    font-size: 2rem;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  }

  .footer-name {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(45deg, #ffffff, #e2e8f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .footer-description {
    color: rgba(255, 255, 255, 0.7) !important;
    line-height: 1.6;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .links-section {
    display: flex;
    align-items: center;
  }

  :global(.github-button) {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: 500 !important;
    backdrop-filter: blur(10px) !important;
    transition: all 0.3s ease !important;
    justify-self: flex-start !important;
  }

  :global(.github-button:hover) {
    background: rgba(255, 255, 255, 0.2) !important;
    border-color: rgba(255, 255, 255, 0.4) !important;
    color: white !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
  }


  .footer-bottom {
    margin-top: 2rem;
  }

  .footer-divider {
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent
    );
    margin-bottom: 1.5rem;
  }

  .bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 968px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }
    
    .footer-brand {
      max-width: none;
    }
  }

  @media (max-width: 640px) {
    .footer-container {
      padding: 2rem 1rem 1rem 1rem;
    }
    
    .bottom-content {
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }
    
    .footer-logo {
      justify-content: center;
    }
  }
</style>