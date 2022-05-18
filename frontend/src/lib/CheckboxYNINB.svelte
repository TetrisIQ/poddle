<script lang="ts">
  import type { Participant } from "../model/PollParticipant";
  import type { Option } from "../model/Option";
  import { currentPoll } from "../store";
  import { onMount } from "svelte";

  let indeterminate: boolean = false;
  let checked: boolean = false;

  export let twoOptions: boolean = false;
  export let disabled = false;
  export let participant: Participant;
  export let option: Option;
  export let value: "yes" | "no" | "ifNeededBe" = "no";

  $: {
    switch (value) {
      case "ifNeededBe":
        indeterminate = true;
        checked = false;
        break;
      case "no":
        indeterminate = false;
        checked = false;
        break;
      case "yes":
        indeterminate = false;
        checked = true;
        break;
    }
  }

  function onclick() {
    if (!disabled) {
      if (!indeterminate && !checked) {
        // Nothing is checked
        indeterminate = false;
        checked = true;
      } else if (!indeterminate && checked) {
        // checked
        if (!twoOptions) {
          indeterminate = true;
        }
        checked = false;
      } else if (indeterminate && !checked) {
        // Indeterminate
        indeterminate = false;
        checked = false;
      }
      // Update option in Participant
      if (
        participant.chosenOptions.find((o) => o.id === option.id) === undefined
      ) {
        participant.chosenOptions.push({ id: option.id, value: getValue() });
      }
      participant.chosenOptions.find((o) => o.id === option.id).value =
        getValue();
      $currentPoll = $currentPoll;
    }
  }

  function getValue() {
    if (!indeterminate && !checked) {
      return "no";
    } else if (!indeterminate && checked) {
      return "yes";
    } else if (indeterminate && !checked) {
      return "ifNeededBe";
    }
  }
</script>

<div class="box my-auto" on:click={() => onclick()}>
  {#if !indeterminate && !checked}
    <div class="h-6 w-6 border rounded m-auto" />
  {:else if !indeterminate && checked}
    <div class="h-6 w-6 border rounded m-auto text-green-400 border-green-400">
      <span class="my-auto">✔</span>
    </div>
  {:else if indeterminate && !checked}
    <div
      class="h-6 w-6 border rounded border-yellow-400 text-yellow-400 m-auto"
    >
      <span class="my-auto">✔</span>
    </div>
  {/if}
</div>
