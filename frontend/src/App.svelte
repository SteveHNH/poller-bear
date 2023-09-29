<script>
import { Container, SvelteUIProvider, AppShell, Header, Space } from '@svelteuidev/core';

import { Router, Route } from "svelte-routing";
import CreatePoll from "./CreatePoll.svelte";
import ViewPoll from "./ViewPoll.svelte";
import PollResults from "./PollResults.svelte";
import HeadContent from "./HeadContent.svelte";

</script>

<SvelteUIProvider withGlobalStyles themeObserver={"dark"}>
<AppShell>
<Header slot="header">
  <HeadContent />
</Header>
  
<Space h="lg" />

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
</AppShell>
</SvelteUIProvider>
