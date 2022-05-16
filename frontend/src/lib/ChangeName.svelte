<script lang="ts">
  import { onMount } from "svelte";

  import { currentPoll, modalData } from "../store";

  let value: string = $currentPoll.participants.find(
    (p) => p.randomKey === $modalData
  )?.name;

  $: {
    const participant = $currentPoll.participants.find(
      (p) => p.randomKey === $modalData
    );
    if (participant !== undefined) {
      participant.name = value;
      $currentPoll = $currentPoll;
    }
  }
</script>

<div class="w-full">
  <input
    type="text"
    class="w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
    placeholder="Your name"
    bind:value
  />
</div>
