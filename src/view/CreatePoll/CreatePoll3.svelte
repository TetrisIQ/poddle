<script lang="ts">
    import {page, pollSettings} from "../../store";
    import Checkbox from "../../lib/Checkbox.svelte";
    import CreatePoll4 from "./CreatePoll4.svelte";



</script>


<form on:submit|preventDefault={() => page.set(CreatePoll4)} class="mx-auto max-w-4xl rounded overflow-hidden shadow-lg">
    <!--    <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains">-->
    <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Poll settings</div>
        <div class="grid text-left grid-rows-4 grid-flow-col gap-4">
            <div class="grid justify-end grid-cols-3 gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                     class="ml-auto mr-5 my-auto" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                </svg>
                <div>
                    <h2 class="font-bold">Yes, no, if need be</h2>
                    <p>Participants can indicate if an option is not ideal for them.</p>
                </div>
                <Checkbox bind:checked={$pollSettings.treeOptions}
                          primaryColor="#f7be00" class="my-auto ml-5"/>
            </div>
            <div class="grid justify-end grid-cols-3 gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                     class="ml-auto mr-5 my-auto" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg>
                <div>
                    <h2 class="font-bold">Limit the number of votes per option</h2>
                    <p>First come, first served. Once the spots are filled, the option is no longer available.</p>
                </div>
                <Checkbox disabled={$pollSettings.treeOptions} bind:checked={$pollSettings.fcfs}
                          primaryColor="#f7be00" class="my-auto ml-5"/>
            </div>
            <div class="grid justify-end grid-cols-3 gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                     class="ml-auto mr-5 my-auto" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="1.5"/>
                    <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/>
                </svg>
                <div>
                    <h2 class="font-bold">Limit participants to a single vote</h2>
                    <p>Participants can only select one option.</p>
                </div>
                <Checkbox disabled={$pollSettings.treeOptions} bind:checked={$pollSettings.onlyOneOption}
                          primaryColor="#f7be00" class="my-auto ml-5"/>
            </div>
            <div class="grid justify-end grid-cols-3 gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                     class="ml-auto mr-5 my-auto" viewBox="0 0 16 16">
                    <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5zm2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2h-7z"/>
                </svg>
                <div>
                    <h2 class="font-bold">Set deadline</h2>
                    <p>Set a deadline to receive votes in time. After the deadline, no more votes is allowed.</p>
                </div>
                <Checkbox bind:checked={$pollSettings.deadline}
                          primaryColor="#f7be00" class="my-auto ml-5"/>
            </div>
        </div>
    </div>
    <div class="px-6 pt-4 pb-2">
        <button type="submit"
                class="hover:bg-gray-700 mb-5 bg-gray-900 text-white px-3 py-2 rounded-md ml-auto text-sm font-medium"
                aria-current="page">Continue
        </button>
    </div>
</form>
