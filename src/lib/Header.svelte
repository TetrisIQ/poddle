<script lang="ts">
    import {page, resetPollStore} from "../store";
    import CreateNewPoll from "../view/CreatePoll/CreatePoll1.svelte";
    import Features from "../view/Features.svelte";
    import Integrations from "../view/Integrations.svelte";
    import Resources from "../view/Resources.svelte";
    import Contact from "../view/Contact.svelte";
    import Home from "../view/Home.svelte";
    import {SvelteComponent} from "svelte";
    import ToggleDarkMode from "./ToggleDarkMode.svelte";


    let openMenuOnMobile: boolean = false;

    function open(newPage: SvelteComponent, title: string = document.title, path: string = "/poll-dapp/") {
        page.set(newPage)
        window.history.pushState({}, title, path);
        resetPollStore()
    }

</script>

<header class="dark:text-gray-400 dark:bg-gray-700 bg-gray-300 text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <button on:click={() => open(Home)} class="flex title-font font-medium items-center dark:text-white text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span class="ml-3 text-xl">Poll dApp</span>
        </button>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
            <button on:click={() => open(Features)} class="mr-5 dark:hover:text-white hover:text-gray-900">Features</button>
            <button on:click={() => open(Integrations)} class="mr-5 dark:hover:text-white hover:text-gray-900">Integrations</button>
            <button on:click={() => open(Resources)} class="mr-5 dark:hover:text-white hover:text-gray-900">Resources</button>
            <button on:click={() => open(Contact)} class="mr-5 dark:hover:text-white hover:text-gray-900">Contact</button>
        </nav>
        <ToggleDarkMode/>
        <button on:click={() => open(CreateNewPoll)} class="inline-flex items-center dark:bg-gray-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-2 w-4 h-4 ml-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
            Create Poll
        </button>
    </div>
</header>
