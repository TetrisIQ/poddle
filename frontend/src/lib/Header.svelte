<script lang="ts">
    import {page, resetPollStore} from "../store";
    import CreateNewPoll from "../view/CreatePoll/CreatePoll1.svelte";
    import Features from "../view/Features.svelte";
    import Integrations from "../view/Integrations.svelte";
    import Home from "../view/Home.svelte";
    import {SvelteComponent} from "svelte";
    import PoddleLogo from "./PoddleLogo.svelte";
    import UserList from "../view/UserList.svelte";

    function open(newPage: SvelteComponent, title: string = document.title, path: string = window.location.pathname) {
        page.set(newPage)
        window.history.pushState({}, title, path);
        resetPollStore()
    }

</script>
<header class="dark:text-gray-400 dark:bg-gray-700 bg-gray-300 text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <button on:click={() => open(Home)} class="flex title-font font-medium items-center dark:text-white text-gray-900 mb-4 md:mb-0">
            <PoddleLogo/>
            <span class="ml-3 text-xl">Poddle</span>
        </button>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
            <button on:click={() => open(Features)} class="mr-5 dark:hover:text-white hover:text-gray-900">Features</button>
            <button on:click={() => open(Integrations)} class="mr-5 dark:hover:text-white hover:text-gray-900">Integrations</button>
<!--            <button on:click={() => open(Resources)} class="mr-5 dark:hover:text-white hover:text-gray-900">Resources</button>-->
            <!--            <button on:click={() => open(Contact)} class="mr-5 dark:hover:text-white hover:text-gray-900">Contact</button>-->
            <button on:click={() => window.open("https://github.com/tetrisiq/poddle", "_blank")} class="flex mr-5 dark:hover:text-white hover:text-gray-900">GitHub
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="inline my-auto ml-1" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
            </button>
        </nav>
        <button on:click={() => open(UserList)} class="inline-flex items-center border-0 py-1 p-3 mx-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
        </button>
        <button on:click={() => open(CreateNewPoll)} class="inline-flex items-center dark:bg-gray-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-2 w-4 h-4 ml-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
            Create Poll
        </button>
    </div>
</header>
