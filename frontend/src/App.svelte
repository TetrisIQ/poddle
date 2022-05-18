<script lang="ts">
  import Header from "./lib/Header.svelte";
  import { page, releaseMessage } from "./store";
  import Poll from "./view/Poll.svelte";
  import Footer from "./lib/Footer.svelte";
  import NotificationArea from "./lib/NotificationArea.svelte";
  import { gun } from "./gun";
  import NewMessage from "./view/NewMessage.svelte";
  import dayjs from "dayjs";
  import Modal from "./lib/Modal.svelte";

  if (window.location.search.includes("?k=")) {
    page.set(Poll);
  }

  if (window.location.search.includes("?newMessage")) {
    page.set(NewMessage);
  }

  if (!localStorage.getItem("clientID").startsWith('"')) {
    // Migrate Localstorage to parsable JS Objects
    localStorage.setItem(
      "clientID",
      '"' + localStorage.getItem("clientID") + '"'
    );
    localStorage.setItem("name", '"' + localStorage.getItem("name") + '"');
  }

  gun.getReleaseMessage();

  function ttlIsOver() {
    if ($releaseMessage !== undefined) {
      const ttlInDays = +$releaseMessage.ttl;
      return dayjs().isAfter(
        dayjs($releaseMessage.createdOn)
          .add(ttlInDays, "day")
          .endOf("day")
          .toISOString()
      );
    }
  }
</script>

<div class="flex flex-col min-h-screen scroll-smooth">
  <Header />
  {#if $releaseMessage !== undefined && !ttlIsOver()}
    {#if $releaseMessage.kind === "release"}
      <div
        on:click={() => releaseMessage.set(undefined)}
        class="w-full h-auto dark:text-black mx-auto text-center h-9 bg-indigo-400 p-1 text-lg"
      >
        <span>📦</span>
        <span class="font-bold pr-2">{$releaseMessage.title}</span>
        <span>{$releaseMessage.content}</span>
      </div>
    {:else if $releaseMessage.kind === "celebrate"}
      <div
        on:click={() => releaseMessage.set(undefined)}
        class="w-full dark:text-black h-auto mx-auto text-center h-9 bg-indigo-400 p-1 text-lg"
      >
        <span>🎉</span>
        <span class="font-bold pr-2">{$releaseMessage.title}</span>
        <span>{$releaseMessage.content}</span>
      </div>
    {:else if $releaseMessage.kind === "warning"}
      <div
        on:click={() => releaseMessage.set(undefined)}
        class="w-full dark:bg-gray-500 dark:text-black h-auto mx-auto text-center h-9 bg-gray-200 p-1 text-lg"
      >
        <span>👷</span>
        <span class="font-bold pr-2">{$releaseMessage.title}</span>
        <span>{$releaseMessage.content}</span>
      </div>
    {/if}
  {/if}
  <main class="mx-auto flex-grow w-full xl:px-40 l:px-14 text-center">
    <NotificationArea />
    <Modal />
    <svelte:component this={$page} />
  </main>
  <Footer />
</div>
