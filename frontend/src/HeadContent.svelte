<script>
import { Center, Header, Flex, Tooltip, Button } from '@svelteuidev/core'; 
import { GithubLogo } from 'radix-icons-svelte';
</script>

<Header>
<Flex justify="space-between">
<a href="/" class="header-link"><h1>Poller Bear</h1></a>
<Center inline>
<Tooltip label="Github">
<Button href="https://www.github.com/SteveHNH/poller-bear"><GithubLogo /></Button>
</Tooltip>
</Center>
</Flex>
</Header> 
