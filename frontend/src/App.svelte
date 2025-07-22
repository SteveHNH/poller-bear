<script>
import { Container, SvelteUIProvider } from '@svelteuidev/core';

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

<SvelteUIProvider withGlobalStyles themeObserver={"dark"}>
  <div class="app-layout">
    <HeadContent />
    
    <main class="main-content">
      <Container>
        <Router>
          <Route path="/" component={CreatePoll} />
          <Route path="/polls/:id" let:params>
            <ViewPoll id={params.id} />
          </Route>
          <Route path="/polls/:id/r" let:params>
            <PollResults id={params.id} />
          </Route>
        </Router>
      </Container>
    </main>

    <Footer />
  </div>
</SvelteUIProvider>

<style>
  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  }

  .main-content {
    flex: 1;
    padding: 2rem 0;
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 1rem 0;
    }
  }
</style>
