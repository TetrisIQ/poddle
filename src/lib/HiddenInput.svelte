<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    export let value;
    export let textarea = false;
    export let placeholder = "Enter some text"
    const dispatch = createEventDispatcher();

    function onChange() {
        showInput = !showInput;
        dispatch('change', value);
    }

    let showInput: boolean = false;

</script>


<div class="{$$props.class}">
    <span class="{!showInput ? '' : 'hidden'}" on:click={() => showInput = !showInput}>{value}
    </span>
    {#if textarea}
        <textarea on:focusout={() => onChange()}
                  placeholder={placeholder}
                  class="{showInput ? '' : 'hidden'} h-auto w-full rounded-md h-min px-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                  bind:value
                  type="text"></textarea>
    {:else }
        <input on:focusout={() => onChange()}
               placeholder={placeholder}
               class="{showInput ? '' : 'hidden'} h-auto w-full rounded-md h-min px-2 py-2 border-2 border-gray-200 placeholder-gray-300"
               bind:value type="text"/>

    {/if}

</div>