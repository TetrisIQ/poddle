<script lang="ts">
    import {currentPoll, page, pollOptions, pollParticipants, pollSettings, pollComments} from "../../store";
    import {uuidv4} from "../../lib/util";
    import Poll from "../Poll.svelte";
    import {Participant} from "../../model/PollParticipant";
    import {gun} from "../../gun";
    import {PollDTO} from "../../model/PollDTO";

    function finish() {
        const uid = uuidv4().replace(/-/g, "");
        $currentPoll.id = uid.slice(0, 12);
        $currentPoll.password = uid.slice(12);
        $pollParticipants.push(new Participant($currentPoll.creatorName, true, $pollOptions))
        //save to DB

        gun.createPoll(new PollDTO($currentPoll, $pollSettings, $pollOptions, $pollParticipants, $pollComments), $currentPoll.id, $currentPoll.password)
        page.set(Poll)
    }
</script>


<form on:submit|preventDefault={() => finish()} class="mx-auto max-w-4xl rounded overflow-hidden shadow-lg">
    <!--    <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains">-->
    <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Tell your participants who you are</div>
        <div class="flex flex-wrap gap-3 w-full p-5">
            <label class="relative w-full flex flex-col">
                <span class="font-bold mb-3 text-left">Name</span>
                <input bind:value={$currentPoll.creatorName}
                       class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text"
                       name="title" placeholder="Name" required/>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                     viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
            </label>
        </div>
        <div class="flex flex-wrap gap-3 w-full p-5">
            <label class="relative w-full flex flex-col">
                <span class="font-bold mb-3 text-left">Email</span>
                <input bind:value={$currentPoll.creatorEmail}
                       class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text"
                       name="Add location" placeholder="Email"/>
                <svg class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                     xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
            </label>
        </div>
    </div>
    <div class="px-6 pt-4 pb-2">
        <button type="submit"
                class="hover:bg-gray-700 mb-5 bg-gray-900 text-white px-3 py-2 rounded-md ml-auto text-sm font-medium"
                aria-current="page">Finish
        </button>
    </div>
</form>
