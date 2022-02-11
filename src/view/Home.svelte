<script lang="ts">
    import {page} from "../store";
    import CreatePoll1 from "./CreatePoll/CreatePoll1.svelte";
    import imgSrc from "../assets/diversemeeting.png"


</script>


<div class="grid grid-cols-6 mx-auto w-9/12 gap-4">
    <div class="col-start-1 text-left col-end-5">
        <h1 class="text-black  mx-auto my-8 text-5xl">Meetings made simple</h1>
        <div class="text-2xl">Save time scheduling your day with the power of poll-dapp</div>
        <div class="text-xl mt-1">All your information are secured and encrypted, with the power of gun.js</div>
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
    <!-- Options -->
    <div class="text-2xl text-gray-700 mt-8 mb-4 font-bold">(Planned) Options</div>
    <div class="grid grid-cols-2">
        <div class="mt-4">
            <div class="text-left w-80 ml-auto pr-28">
                <div class="font-bold text-xl"><span class="text-gray-700">(Planned) </span> Only you will see the Results</div>
                <div class="">You can set the option, that only you will see the options. All Options from your
                    participants are encrypted so that only you can read them.
                </div>
            </div>
        </div>
        <div class="mt-4">
            <div class="text-left w-80 pl-28">
                <div class="font-bold text-xl">Yes, No, If needed be</div>
                <div class="">You can set the option, that your participants can choose between Yes, No and If needed
                    be.
                </div>
            </div>
        </div>

        <div class="mt-4">
            <div class="text-left w-80 ml-auto pr-28">
                <div class="font-bold text-xl"><span class="text-gray-700">(Planned) </span> Set a deadline</div>
                <div class="">You can set a deadline for your poll. After the deadline ends, no one can edit the poll.
                </div>
            </div>
        </div>
        <div class="mt-4">
            <div class="text-left w-80 pl-28">
                <div class="font-bold text-xl"><span class="text-gray-700">(Planned) </span>Limit the number of votes a participant has</div>
                <div class="">You can choose the number of "votes" every participant has.</div>
            </div>
        </div>

        <div class="mt-4">
            <div class="text-left w-80 ml-auto pr-28">
                <div class="font-bold text-xl"><span class="text-gray-700">(Planned) </span>First come, first served</div>
                <div class="">You can choose if the first one how takes the option keep it. No one else can get the
                    option.
                </div>
            </div>
        </div>
        <div class="mt-4">
            <div class="text-left w-80 pl-28">
                <div class="font-bold text-xl"><span class="text-gray-700">(Planned) </span>Allow anonymous comments</div>
                <div class="">You can allow anonymous comments on your poll, by default the name is linked with the
                    participant name in the poll
                </div>
            </div>
        </div>

        <div class="mt-4">
            <div class="text-left w-80 ml-auto pr-28">
                <div class="font-bold text-xl"><span class="text-gray-700">(Planned) </span>Everyone can add new Options</div>
                <div class="">Everyone with the link can add new Options to the Poll
                </div>
            </div>
        </div>
        <div class="mt-4">
            <div class="text-left w-80 pl-28">
                <div class="font-bold text-xl"><span class="text-gray-700">(Planned) </span>Edit only my option</div>
                <div class="">You can only edit your own options. By default everyone can edit every Participants
                    options.
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

</style>