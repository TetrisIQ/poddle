<script>
  import { modalStore } from "./ModalControl";

  function closeMe() {
    modalStore.set(undefined);
  }
</script>

{#if $modalStore !== undefined}
  <div
    style="background-color: #6b728080"
    class="flex items-center justify-center fixed left-0 bottom-0 w-full h-full z-50"
  >
    <div class="bg-white rounded-lg w-1/2">
      <div class="flex flex-col items-start p-4">
        <div class="flex items-center w-full">
          <div class="text-gray-900 font-medium text-lg">
            {$modalStore.title}
          </div>
          <svg
            on:click={() => closeMe()}
            class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
        </div>
        <hr />
        <div class="w-full">
          {#if $modalStore.customBody !== undefined}
            <svelte:component this={$modalStore.customBody} />
          {:else}
            {@html $modalStore.body}
          {/if}
        </div>
        <hr />
        <div class="w-full">
          {#if $modalStore.customButtonBar === undefined}
            <button
              on:click={() => closeMe()}
              class="bg-transparent ml-auto hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Close
            </button>
          {:else}
            <svelte:component this={$modalStore.customButtonBar} />
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
