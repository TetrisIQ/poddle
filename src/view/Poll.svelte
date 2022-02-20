<script lang="ts">

    import {currentPoll, pollDTO} from "../store";
    import {gun} from "../gun";
    import {Participant} from "../model/PollParticipant";
    import YNINB from "../lib/YNINB.svelte";
    import {lstore} from "../gun/LStore";
    import {Comment} from "../model/Comment";
    import {onMount} from "svelte";
    import NotificationControl from "../lib/NotificationControl";
    import {PollDTOV1} from "../model/DTO/PollDTOV1";
    import RelativeTime from "dayjs/plugin/relativeTime"
    import dayjs from "dayjs";

    dayjs.extend(RelativeTime)

    let params = new URLSearchParams(document.location.search);
    let key = params.get("k");
    let newComment: Comment = new Comment(lstore.getMyName());
    let myName: string = lstore.getMyName();

    function formatCreated(date) {
        return dayjs(date).fromNow()
    }

    function formatDate(date: Date): string {
        if (deadlineIsNotReached()) {
            return "This poll is over since " + dayjs(date.toUTCString()).fromNow(true)
        }
        return "in " + dayjs(date.toUTCString()).toNow(false)
    }

    onMount(() => {
        console.log($currentPoll)
        if ($currentPoll.title !== "") {
            window.history.pushState("", `Poll ${$currentPoll.title}`, `${window.location.pathname}?k=${$currentPoll.id + $currentPoll.password}`);
        } else {
            gun.getPoll(key.slice(0, 12), key.slice(12))
            console.log("KEY", key)
        }
    })

    $:{
        if ($pollDTO !== undefined) {
            currentPoll.set(PollDTOV1.getPoll($pollDTO, key.slice(0, 12), key.slice(12)))
            $currentPoll = $currentPoll;
            pollDTO.set(undefined)
        }
    }

    function save() {
        let valid = true;
        if ($currentPoll.settings.voteLimit) {
            $currentPoll.participants.forEach(p => {
                let amount = p.chosenOptions.filter(o => o.value === "yes").length
                if (amount > $currentPoll.settings.voteLimitAmount) {
                    NotificationControl.error("Cannot save Poll", `${p.name} cannot select more than ${$currentPoll.settings.voteLimitAmount} option`);
                    valid = false;
                }
            })
        }
        if (valid) {
            closeEditOnAllParticipants();
            $currentPoll = $currentPoll;
            NotificationControl.info("Poll saved", "The Poll has been saved!");
            gun.updatePoll(new PollDTOV1($currentPoll), $currentPoll.id, $currentPoll.password);
        }
    }

    function closeEditOnAllParticipants() {
        $currentPoll.participants.forEach(p => p.edit = false);
        $currentPoll = $currentPoll;
    }


    function addNewParticipant() {
        $currentPoll.participants.push(new Participant(myName, true, $currentPoll.options));
        $currentPoll = $currentPoll;
    }

    function deadlineIsNotReached() {
        if ($currentPoll.settings.deadline) {
            return $currentPoll.deadline > new Date();
        }
        return true;
    }


    function addComment() {
        newComment.updateTime();
        $currentPoll.comments.push(newComment)
        newComment = new Comment(myName);
        $currentPoll = $currentPoll;
        save();
    }

    function nameEntered(participant: Participant) {
        $currentPoll.participants.find(p => p.name === participant.name).edit = !participant.edit;
        myName = participant.name;
        lstore.setMyName(participant.name);
        $currentPoll = $currentPoll;
    }


</script>
{#if $currentPoll !== undefined}
    <div class="mx-auto max-w-4xl rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
            <div class="font-bold text-xl">{$currentPoll.title}</div>
            <div class="font-normal mb-8">by {$currentPoll.creatorName} • {formatCreated($currentPoll.created)}</div>
            <div class="space-y-8">
                {#if $currentPoll.location !== ""}
                    <div class="grid grid-cols-3 gap-4">
                        <div class="text-right col-end-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="ml-auto h-full bi bi-geo-alt" viewBox="0 0 16 16">
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                        </div>
                        <span class="text-left">{$currentPoll.location}</span>
                    </div>
                {/if}
                {#if $currentPoll.note !== ""}
                    <div class="grid grid-cols-3 gap-4">
                        <div class="text-right col-end-2">
                            <svg class="ml-auto h-full bi bi-geo-alt" xmlns="http://www.w3.org/2000/svg" width="16"
                                 height="16"
                                 fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </div>
                        <span class="text-left">{$currentPoll.note}</span>
                    </div>
                {/if}

                {#if $currentPoll.settings.deadline}
                    <div class="grid grid-cols-3 gap-4">
                        <div class="text-right col-end-2">
                            <svg class="ml-auto h-full bi bi-geo-alt" xmlns="http://www.w3.org/2000/svg" width="16"
                                 height="16"
                                 fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
                            </svg>
                        </div>
                        <div class="text-left col-start-2 col-end-4">{formatDate($currentPoll.deadline)}</div>
                    </div>
                {/if}

                {#if $currentPoll.settings.voteLimit}
                    <div class="grid grid-cols-3 gap-4">
                        <div class="text-right col-end-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="ml-auto h-full" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="1.5"/>
                                <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/>
                            </svg>
                        </div>
                        <div class="text-left col-start-2 col-end-4">{`Everyone has ${$currentPoll.settings.voteLimitAmount} Vote(s)`}</div>
                    </div>
                {/if}
            </div>

            <table class="border-collapse border mx-auto mt-8 border-slate-400">
                <thead>
                <tr>
                    <th class="border border-slate-300 py-2 px-5"></th>
                    {#each $currentPoll.options as option}
                        {#if option.option !== ""}
                            <th class="border border-slate-300 py-2 px-5">{option.option}</th>
                        {/if}
                    {/each}
                </tr>
                </thead>
                <tbody>
                <tr>
                <tr>
                    <td class="border border-slate-300 py-2 px-5">
                        <div class="grid grid-cols-6">
                        <span class="col-start-1 my-auto col-end-6 text-left">{$currentPoll.participants.length}
                            participants</span>
                            {#if deadlineIsNotReached()}
                                <svg on:click={addNewParticipant} xmlns="http://www.w3.org/2000/svg" width="32"
                                     height="32"
                                     fill="currentColor"
                                     class="text-right hover:bg-gray-200 inline ml-auto" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            {/if}
                        </div>


                    </td>
                    {#each $currentPoll.options as option}
                        {#if option.option !== ""}
                            <td class="border border-slate-300 py-2 px-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                     fill="currentColor"
                                     class="inline text-blue-700 " viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                </svg>
                                <span class="ml-auto font-bold">{option.count}</span>
                            </td>
                        {/if}
                    {/each}
                </tr>
                {#each $currentPoll.participants as participant}
                    <tr>
                        <td class="border border-slate-300 px-5">
                            <div class="grid grid-cols-6 gap-4">
                                {#if participant.edit}
                                    <input bind:value={participant.name}
                                           on:keypress={(key) => key.key === "Enter" ? nameEntered(participant) : ''}
                                           style="height: 24px; width: 157px"
                                           class="rounded-md col-start-1 h-min col-end-6 peer w-min px-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                                           type="text" name="nameInput" placeholder="Enter your name"/>
                                {:else }
                                    <span class="w-full col-start-1 col-end-6 text-left ml-auto">{participant.name}</span>
                                {/if}
                            </div>
                        </td>
                        {#each $currentPoll.options as option, id}
                            {#if option.option !== ""}
                                <td class="border justify-center">
                                    {#if participant.edit && deadlineIsNotReached()}
                                        <YNINB twoOptions={!$currentPoll.settings.treeOptions}
                                               value={participant.chosenOptions.find(o => o.id === option.id)?.value}
                                               participant={participant} option={option}/>
                                    {:else }
                                        <YNINB twoOptions={!$currentPoll.settings.treeOptions}
                                               value={participant.chosenOptions.find(o => o.id === option.id)?.value}
                                               participant={participant} option={option} disabled/>
                                    {/if}
                                </td>
                            {/if}
                        {/each}
                        <td class="border-hidden pl-3" style="border-left-style: solid;">
                            {#if deadlineIsNotReached()}
                                {#if myName === participant.name || participant.edit}
                                    <div on:click={() => nameEntered(participant)}
                                         class="inline ml-auto hover:bg-gray-200"
                                         style="height: 32px; width: 32px">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="currentColor"
                                             class="m-auto h-full" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                        </svg>
                                    </div>
                                {:else }
                                    <div on:click={() => nameEntered(participant)}
                                         class="inline ml-auto text-white hover:text-black hover:bg-gray-200"
                                         style="height: 32px; width: 32px">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="currentColor"
                                             class="m-auto h-full" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                        </svg>
                                    </div>
                                {/if}
                            {/if}
                        </td>

                {/each}
                </tbody>
            </table>
            <button on:click={() => save()}
                    class="inline-flex mt-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Save
            </button>
            <h2 class="text-2xl mt-8">Comments</h2>
            {#if $currentPoll.comments !== undefined}
                {#each $currentPoll.comments as comment}
                    <div class="grid my-4 grid-cols-3 gap-4">
                        <div class="text-right col-end-2">
                                    <span class="text-gray-500">{comment.name}
                                        said on {comment.getPrintableDate()}</span>
                        </div>
                        <div class="text-left ml-2 col-start-2 col-end-4">
                            <span class="">{comment.comment}</span>
                        </div>
                    </div>
                {/each}
            {/if}

            <div class="flex mx-auto items-center justify-center shadow-lg mt-t max-w-lg">
                <form on:submit|preventDefault={addComment}
                      class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <span class="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment as</span>
                        <select bind:value={newComment.name}
                                class="bg-transparent my-auto h-min border-solid border-2  border rounded border-gray-400">
                            <option value={myName}
                                    class="bg-transparent border-solid border-2  border rounded border-gray-400">{myName}</option>
                            <option value="Anonymous"
                                    class="bg-transparent border-solid border-2  border rounded border-gray-400">
                                Anonymous
                            </option>
                        </select>
                        <div class="w-full md:w-full px-3 mb-2 mt-2">
                    <textarea
                            bind:value={newComment.comment}
                            class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                            name="body" placeholder='Type Your Comment' required></textarea>
                        </div>
                        <div class="w-full md:w-full flex items-start md:w-full px-3">
                            <!-- Maybe we support MD in future-->
                            <!--<div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                                <svg fill="none" class="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <p class="text-xs md:text-sm pt-px">Some HTML is okay.</p>
                            </div>-->
                            <div class="-mr-1">
                                <input type='submit'
                                       class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                       value='Post Comment'>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
{/if}