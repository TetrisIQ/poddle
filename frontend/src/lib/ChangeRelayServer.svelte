<script lang="ts">

    import {gun} from "../gun";
    import ToggleDarkMode from "./ToggleDarkMode.svelte";
    import {allRelays} from "../gun";

    getRelayServer();

    function getRelayServer() {
        if ($allRelays.length === 0) {
            gun.getAllRelays();
        }
    }

    $: {
        console.log($allRelays)
    }

    function deleteAllBrowserData() {
        if (confirm("You are going to delete all your Polls and saved settings. Are you sure?")) {
            localStorage.clear();
            sessionStorage.clear();
        }
    }

    function getRelayFlag(country): string {
        // get flags for most popular server locations
        switch (country) {
            case "Germany":
                return "🇩🇪";
            case "United States":
                return "🇺🇸";
            case "France":
                return "🇫🇷";
            case "United Kingdom":
                return "🇬🇧";
            case "Netherlands":
                return "🇳🇱";
            case "Russia":
                return "🇷🇺";
            case "Japan":
                return "🇯🇵";
            case "China":
                return "🇨🇳";
            case "Canada":
                return "🇨🇦";
            case "Italy":
                return "🇮🇹";
            default:
                return "🏳️‍🌈";
        }
    }

    function updateRelayServer() {
        const newRelays = $allRelays.filter(r => r.connected === true)
        gun.setCustomRelays(newRelays)
    }

</script>

<br>
<h1 class="text-2xl">Settings</h1>
<div class="mt-6 grid grid-flow-col justify-between auto-cols-max">
    <p class="text-xl py-4">Toggle dark mode</p>
    <ToggleDarkMode/>
</div>

<p class="text-xl mb-2 mt-6">Change your relay servers</p>
<table class="w-full">
    <tr class="w-1/2 bg-indigo-300">
        <th class="p-2 w-2/3">Relay Name</th>
        <th class="p-2 text-center">Status</th>
        <th class="p-2 text-center pr-4">Country</th>
        <th class="p-2 text-center pr-4">Connected</th>
    </tr>
    {#if $allRelays.length > 0}
        {#each $allRelays as relay , id}
            <tr class="{id % 2 === 0} bg-gray-100">
                <td class="p-2">{relay.name}</td>
                <td class="p-2 text-center {relay.status === 'UP' ? 'text-green-600' : 'text-red-600'}">{relay.status}</td>
                <td class="p-2 pr-4 flex justify-between"><span class="incident text-red-500"><!-- TODO: Display Warnings --></span><span
                        class="text-center">{relay.country}</span><span
                        class="pl-3">{getRelayFlag(relay.country)}</span></td>
                <td class="text-center">
                    <input class="my-auto" bind:checked={relay.connected} type="checkbox"/>
                </td>
            </tr>
        {/each}
    {:else }
        <tr class="">
            <td class="p-2">No Relays found</td>
            <td class="p-2 text-center text-red-600">Unknown</td>
            <td class="p-2 pr-4 flex justify-between"><span class="incident text-red-500">!</span><span
                    class="text-center">Unknown</span><span
                    class="pl-3">🏳️‍🌈</span></td>
            <td class="text-center">
                <input class="my-auto" type="checkbox"/>
            </td>
        </tr>

    {/if}
</table>
<div class="flex py-4">
    <button on:click={() => updateRelayServer()}
            class="inline-flex items-center dark:bg-gray-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base ml-auto mt-4 md:mt-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             class="mx-2 w-4 h-4 ml-1" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
        Update server list
    </button>
</div>

<div class="mt-6 grid grid-flow-col justify-between auto-cols-max">
    <p class="text-xl py-4">Delete browser data</p>
    <button on:click={() => deleteAllBrowserData()}
            class="text-white h-min my-auto bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Delete
    </button>
</div>
