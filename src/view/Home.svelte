<script lang="ts">
    import {page} from "../store";
    import CreatePoll1 from "./CreatePoll/CreatePoll1.svelte";
    import imgSrc from "../assets/diversemeeting.png"


</script>


<div class="grid grid-cols-6 mx-auto w-9/12 gap-4">
    <div class="col-start-1 text-left col-end-5">
        <h1 class="text-black  mx-auto my-8 text-5xl">Meetings made simple</h1>
        <div class="text-2xl"> Save time scheduling your day with the power of Doodle</div>
        <button on:click={() => page.set(CreatePoll1)}
                class="bg-green-400 hover:bg-green-100 hover:text-black mt-8 text-white font-semibold px-6 py-3 rounded-md">
            Start for Free!
        </button>
    </div>
    <div class="col-start-5  col-end-7">
        <img src={imgSrc} alt="Meeting cartoon"/>
    </div>
</div>
<div class="grid grid-row-3 mx-auto w-screen bg-gray-200 pt-8 gap-4 pb-20">
    <div class="mx-auto w-max">
        <h2 class="text-4xl">Never send another “When can you meet?” email again</h2>
        <div class="text-2xl text-gray-700">Get the right people together. At the right time. In simple steps.</div>
    </div>
    <div class="grid grid-cols-2">
        <div class="text-left w-80 ml-auto pr-28">
            <div class="font-bold text-xl">Create encrypted polls</div>
            <div class="">Your data will be encrypted in your browser.</div>
        </div>
        <div class="text-left w-80 pl-28">
            <div class="font-bold text-xl">Decentralized data</div>
            <div class="">Your encrypted data get stored decentralized with <a class="underline decoration-2 decoration-blue-700" href="https://gun.eco" target="_blank">gun.js</a>
                <a href="https://github.com/amark/gun" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="inline"
                         viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                </a></div>
        </div>
       <!-- <div>
            <div class="text-left w-80 ml-auto pr-28">
                <div class="font-bold text-xl">Create encrypted polls</div>
                <div class="">Your data will be encrypted in your browser.</div>
            </div>
        </div>
        <div>1</div>-->

    </div>
<!--    <div>09</div>-->
</div>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

</style>