<script lang="ts">
    import {page} from "../store";
    import Home from "./Home.svelte";
    import Contact from "./Contact.svelte";

    function goTo(home: any) {
        window.history.pushState({}, document.title, "/");
        page.set(home)
    }


</script>

<div class="w-9/12 m-auto py-16 flex items-center justify-center">
    <div class="font-mono bg-white overflow-hidden sm:rounded-lg pb-8">
        <div class=" text-center pt-8">
            <h1 style="color: #f97316; text-shadow: 0 3px #1f2937, 0 5px #1f2937, 0 7px #1f2937;" class="text-9xl mt-9 mx-auto text-center text-black">
                404
            </h1>
            <h1 class="text-6xl text-gray-700 font-medium py-8">oops! Page not found</h1>
            <p class="text-2xl mb-12 text-gray-700 pb-8 px-12 font-medium">Oops! The page you are looking for does not exist. It might have
                been moved or deleted.</p>
            <button on:click={() => goTo(Home)}
                    class="font-sans bg-gray-900 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-md mr-6">
                HOME
            </button>
            <button on:click={() => page.set(Contact)}
                    class="font-sans bg-gray-900 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-md">
                Contact Us
            </button>
        </div>
    </div>
</div>