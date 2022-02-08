<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Notification from "./lib/Notification.svelte";
  import {page} from "./store";
  import Poll from './view/Poll.svelte'
  import {gun} from "./gun";

    if(window.location.search.includes("?k=")) {
        page.set(Poll)
    }

    console.log()

    gun.test();

</script>

<Header/>
<Notification/>
<main class="mx-auto text-center">
    <svelte:component this={$page}/>
</main>

