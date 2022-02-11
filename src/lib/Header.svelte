<script lang="ts">
    import logo from '../assets/svelte.png'
    import {page, resetPollStore, showNotification} from "../store";
    import CreateNewPoll from "../view/CreatePoll/CreatePoll1.svelte";
    import Features from "../view/Features.svelte";
    import Integrations from "../view/Integrations.svelte";
    import Resources from "../view/Resources.svelte";
    import Contact from "../view/Contact.svelte";
    import Home from "../view/Home.svelte";
    import {SvelteComponent} from "svelte";


    let openMenuOnMobile: boolean = false;

    function openMenu() {
        openMenuOnMobile = !openMenuOnMobile
    }

    function open(newPage: SvelteComponent, path: string = "/", title: string = document.title) {
        page.set(newPage)
        window.history.pushState({}, title, path);
        resetPollStore()
    }

</script>

<nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <!-- Mobile menu button-->
                <button on:click={openMenu} type="button"
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        aria-controls="mobile-menu" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <!--
                      Icon when menu is closed.

                      Heroicon name: outline/menu

                      Menu open: "hidden", Menu closed: "block"
                    -->
                    <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                    <!--
                      Icon when menu is open.

                      Heroicon name: outline/x

                      Menu open: "block", Menu closed: "hidden"
                    -->
                    <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <!--    Navigation        -->
            <div on:click={() => open(Home)} class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex-shrink-0 flex items-center">
                    <img class="block lg:hidden h-8 w-auto"
                         src="{logo}" alt="Workflow">
                    <img class="hidden lg:block h-8 w-auto"
                         src="{logo}"
                         alt="Workflow">
                    <button class="hidden lg:block h-8 w-auto text-white">Poll DAPP</button>
                </div>
                <div class="hidden sm:block sm:ml-6">
                    <div class="flex space-x-4">
                        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                        <button on:click={() => open(Features)}
                                class="hover:bg-gray-700 bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                aria-current="page">Features
                        </button>

                        <button on:click={() => open(Integrations)}
                                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Integrations
                        </button>

                        <button on:click={() => open(Resources)}
                                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Resources
                        </button>

                        <button on:click={() => open(Contact)}
                                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Contact
                        </button>
                    </div>
                </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button on:click={() => open(CreateNewPoll)}
                        class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                    <span class="ml-2">New Poll</span>
                </button>
                <button
                        on:click={() => showNotification.set(!$showNotification)}
                        type="button"
                        class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span class="sr-only">View notifications</span>
                    <!-- Heroicon name: outline/bell -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="{openMenuOnMobile ? '' : 'hidden'}" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <a href="#" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
               aria-current="page">Features</a>

            <a href="#"
               class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Integrations</a>

            <a href="#"
               class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Resources</a>

            <a href="#"
               class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>

        </div>
    </div>
</nav>
