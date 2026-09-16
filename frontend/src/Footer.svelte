<footer class="site-footer">
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-brand">
        <span class="footer-name">Poller Bear</span>
        <p class="footer-description">
          Create polls in seconds, get results instantly. Simple, fast polling for everyone.
        </p>
      </div>

      <div class="footer-links">
        <a
          class="footer-link"
          href="https://www.github.com/SteveHNH/poller-bear"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          class="footer-link"
          href="https://ko-fi.com/F1F61IKDJT"
          target="_blank"
          rel="noreferrer"
        >
          Buy me a coffee
        </a>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-divider"></div>
      <div class="bottom-content">
        <span class="footer-meta">© 2025 Poller Bear</span>
        <span class="footer-meta">Open source. Patches welcome.</span>
      </div>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background: var(--bg-elevated);
    border-top: 1px solid var(--border);
    color: var(--text);
    margin-top: auto;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 1.5rem 1.5rem;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }

  .footer-brand {
    max-width: 380px;
  }

  .footer-name {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text);
  }

  .footer-description {
    margin: 0.5rem 0 0 0;
    color: var(--text-dim);
    font-size: 0.85rem;
    line-height: 1.6;
  }

  .footer-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .footer-link {
    padding: 0.5rem 0.9rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    color: var(--text-dim);
    font-size: 0.85rem;
    font-weight: 500;
    transition: color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
  }

  .footer-link:hover {
    color: var(--text);
    border-color: var(--border-strong);
    background: var(--surface);
  }

  .footer-bottom {
    margin-top: 1.5rem;
  }

  .footer-divider {
    height: 1px;
    background: var(--border);
    margin-bottom: 1.25rem;
  }

  .bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .footer-meta {
    color: var(--text-faint);
    font-size: 0.75rem;
  }

  @media (max-width: 640px) {
    .footer-container {
      padding: 2rem 1rem 1rem 1rem;
    }

    .footer-content {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }

    .bottom-content {
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }
  }
</style>