<script>
import { Router, Route } from "svelte-routing";
import CreatePoll from "./CreatePoll.svelte";
import ViewPoll from "./ViewPoll.svelte";
import PollResults from "./PollResults.svelte";
import HeadContent from "./HeadContent.svelte";
import Footer from "./Footer.svelte";

</script>

<svelte:head>
  <title>Poller Bear</title>
</svelte:head>

<div class="app-layout">
  <HeadContent />

  <main class="main-content">
    <div class="container">
      <Router>
        <Route path="/" component={CreatePoll} />
        <Route path="/polls/:id" let:params>
          <ViewPoll id={params.id} />
        </Route>
        <Route path="/polls/:id/r" let:params>
          <PollResults id={params.id} />
        </Route>
      </Router>
    </div>
  </main>

  <Footer />
</div>

<style>
  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background:
      radial-gradient(circle at 15% 0%, rgba(110, 111, 245, 0.10), transparent 45%),
      var(--bg);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .main-content {
    flex: 1;
    padding: 3rem 0;
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 1.5rem 0;
    }

    .container {
      padding: 0 1rem;
    }
  }
</style>
