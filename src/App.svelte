<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Notification from "./lib/Notification.svelte";
  import {page, pollDTO} from "./store";
  import Poll from './view/Poll.svelte'
  import Footer from "./lib/Footer.svelte";

  $: { //TODO: find a better way to handle this
      if($pollDTO !== undefined) {
          page.set(Poll)
      }
  }

    if(window.location.search.includes("?k=")) {
        page.set(Poll)
    }

</script>
<div class="min-h-screen">
    <Header/>
    <Notification/>
    <main class="mx-auto h-full xl:px-40 l:px-14 text-center">
        <svelte:component this={$page}/>
    </main>
    <Footer class="mt-40"/>
</div>

