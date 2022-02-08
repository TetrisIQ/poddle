<script lang="ts">

    import {currentPoll, pollDTO, pollOptions, pollParticipants, pollSettings} from "../store";
    import Checkbox from "../lib/Checkbox.svelte";
    import {gun} from "../gun";
    import {Poll} from "../model/Poll";
    import {Participant} from "../model/PollParticipant";
    import {Option} from "../model/Option";
    import {Settings} from "../model/PollSettings";
    import {PollDTO} from "../model/PollDTO";

    let params = new URLSearchParams(document.location.search);
    let key = params.get("k");

    function formatCreated(date) {
        return "Some time ago"
    }

    if ($currentPoll.title !== undefined) {
        window.history.pushState("", `Poll ${$currentPoll.title}`, `?k=${$currentPoll.id + $currentPoll.password}`);
    } else {
        gun.getPoll(key.slice(0, 12), key.slice(12))
    }

    $:{
        if ($pollDTO !== undefined) {
            currentPoll.set(
                new Poll(key.slice(0, 12), key.slice(12), $pollDTO.title, $pollDTO.creatorName, $pollDTO.creatorEmail, $pollDTO.location, $pollDTO.note, $pollDTO.created)
            )

            pollSettings.set(
                new Settings($pollDTO.settings.treeOptions, $pollDTO.settings.fcfs, $pollDTO.settings.onlyOneOption, $pollDTO.settings.deadline)
            )

            let arr: Array<Participant> = []
            $pollDTO.participant.forEach(p => arr.push(new Participant(p.name, p.chosenOptions)))
            pollParticipants.set(arr)

            let opt: Array<Option> = []
            $pollDTO.options.forEach(o => opt.push(new Option(o.id, o.option)))
            pollOptions.set(opt)

        }
    }


    function addNewParticipant() {
        $pollParticipants
            .push({
                chosenOptions: [],
                name: "",
                edit: true,
            });
        $pollParticipants = $pollParticipants;
    }


    function onChange() {
        $pollOptions.forEach(o => {
            let count = 0;
            $pollParticipants.forEach(p => {
                if (p.chosenOptions.includes(o.id)) {
                    count = count + 1;
                }
            })
            o.count = count
        })
        gun.updatePoll(new PollDTO($currentPoll, $pollSettings, $pollOptions, $pollParticipants), $currentPoll.id, $currentPoll.password);
        $pollOptions = $pollOptions;

    }

    function updateParticipant(participant, id) {
        if (participant.chosenOptions.includes(id + 1)) {
            //remove
            $pollParticipants.find(ps => ps.name === participant.name).chosenOptions = participant.chosenOptions.filter(o => o !== id + 1)
        } else {
            //add
            $pollParticipants.find(ps => ps.name === participant.name).chosenOptions.push(id + 1)
        }
        onChange();
        $pollParticipants = $pollParticipants;
    }

    document.querySelector('html').addEventListener('keypress', function (e: Event) {
        //@ts-ignore
        if (e.key === 'Enter') {
            $pollParticipants.forEach(p => p.edit = false)
            $pollParticipants = $pollParticipants;
        }
    });

</script>

<div class="mx-auto max-w-4xl rounded overflow-hidden shadow-lg">
    <!--    <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains">-->
        <div class="px-6 py-4">
            <div class="font-bold text-xl">{$currentPoll.title}</div>
            <div class="font-normal mb-8">by {$currentPoll.creatorName} • {formatCreated($currentPoll.created)}</div>
            <div class="space-y-8">
                <div class="grid grid-cols-3 gap-4">
                    <div class="text-right col-end-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             class="ml-auto h-full bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                    </div>
                    <div class="text-left col-start-2 col-end-4">{$currentPoll.location}</div>
                </div>
                <div class="grid grid-cols-3 gap-4">
                    <div class="text-right col-end-2">
                        <svg class="ml-auto h-full bi bi-geo-alt" xmlns="http://www.w3.org/2000/svg" width="16"
                             height="16"
                             fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5Zm0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"/>
                        </svg>
                    </div>
                    <div class="text-left col-start-2 col-end-4">{$currentPoll.note}</div>
                </div>
            </div>

            <table class="border-collapse border mx-auto mt-8 border-slate-400">
                <thead>
                <tr>
                    <th class="border border-slate-300 py-2 px-5"></th>
                    {#each $pollOptions as option}
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
                        <span class="col-start-1 col-end-6 text-left">{$pollParticipants.length}
                            participants</span>
                            <svg on:click={addNewParticipant} xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                 fill="currentColor"
                                 class="text-right hover:bg-gray-200 inline ml-auto" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </div>


                    </td>
                    {#each $pollOptions as option}
                        {#if option.option !== ""}
                            <td class="border border-slate-300 py-2 px-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                                     class="inline text-blue-700 " viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                </svg>
                                <span class="ml-auto font-bold">{option.count}</span>
                            </td>
                        {/if}
                    {/each}
                </tr>
                {#each $pollParticipants as participant}
                    <tr>
                        <td class="border border-slate-300 py-2 px-5">
                            <div class="grid grid-cols-6 gap-4">
                                {#if participant.edit}
                                    <input bind:value={participant.name}
                                           class="rounded-md col-start-1 h-min col-end-6 peer px-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                                           type="text" name="Add location" placeholder="Enter note"/>
                                {:else }
                                    <span class="w-full col-start-1 col-end-6 text-left ml-auto">{participant.name}</span>
                                {/if}
                                <div on:click={() => participant.edit = !participant.edit}
                                     class="inline ml-auto hover:bg-gray-200"
                                     style="height: 32px; width: 32px">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                         class="m-auto h-full" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                    </svg>
                                </div>

                            </div>


                        </td>
                        {#each $pollOptions as option, id}
                            {#if option.option !== ""}

                                {#if participant.edit}
                                    <td class="border {$pollParticipants.find(p => p.name === participant.name).chosenOptions.find(i => (i - 1) === id) ? 'bg-green-300' : ''} border-slate-300 py-2 px-5">
                                        <Checkbox
                                                size="49px"
                                                primaryColor="#166534"
                                                on:change={() => updateParticipant(participant, id)}
                                                checked={$pollParticipants.find(p => p.name === participant.name).chosenOptions.find(i => (i - 1) === id)}/>
                                    </td>
                                {:else }
                                    {#if (participant.chosenOptions.find(i => (i - 1) === id))}
                                        <td class="border bg-green-300 border-slate-300 py-2 px-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                 fill="currentColor"
                                                 class="m-auto text-green-800 " viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                            </svg>
                                        </td>
                                    {:else }
                                        <td class="border border-slate-300 py-2 px-5"></td>

                                    {/if}
                                {/if}
                            {/if}
                        {/each}
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
</div>