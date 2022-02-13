<script lang="ts">
    import {InfoType} from "./NotificationControl";
    import {createEventDispatcher} from "svelte";

    export let kind: InfoType;
    export let title;
    export let subtitle;
    const dispatch = createEventDispatcher();

</script>

<div on:click={() => dispatch('close')}
     class="flex flex-col p-8 dark:bg-gray-800 bg-white shadow-md hover:shodow-lg rounded-2xl">
    <div class="flex items-center justify-between">
        <div class="flex items-center">
            {#if kind === "info"}
                <svg xmlns="http://www.w3.org/2000/svg"
                     class="w-16 h-16 rounded-2xl p-3 border dark:border-gray-800 border-blue-100 text-blue-400 dark:bg-gray-900 bg-blue-50"
                     fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            {:else }
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="w-16 h-16 rounded-2xl p-3 border dark:border-gray-800 border-blue-100 text-red-500 dark:bg-gray-900 bg-blue-50"
                     viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            {/if}
            <div class="flex flex-col ml-3">
                <div class="font-medium leading-none dark:text-gray-100">{title}</div>
                <p class="text-sm dark:text-gray-500 text-gray-600 leading-none mt-1">{subtitle}</p>
            </div>
        </div>
    </div>
</div>