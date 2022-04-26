<script lang="ts">

    import {lstore} from "../gun/LStore";
    import type {MyPoll} from "../gun/LStore";
    import dayjs from "dayjs";

    let myPolls: Array<MyPoll> = lstore.getMyPolls();

    function openPoll(poll: MyPoll) {
        window.open("?k=" + poll.id + poll.password, "_self")
    }



    function getStyle(poll: MyPoll) {
        if (poll.deadline === undefined) {
            return `background-color: rgb(165 180 252);`
        } else {
            const startDate = dayjs(poll.created).toDate();
            const endDate = dayjs(poll.deadline).toDate();
            const range = endDate - startDate;
            const diff = Math.max(0, endDate - dayjs().toDate());
            const color = "rgb(199 210 254)"

            let percent = 100 - 100 * diff / range
            if (percent < 5) {
                percent = 5;
            }
            percent = Math.round(percent)
            poll.percent = percent + "%"
            lstore.addPercentToPoll(poll)
            return `background-color: rgb(224 231 255); 70;width: ${percent}%;background-image: repeating-linear-gradient(315deg, transparent, transparent 35px,  ${color} 35px,  ${color} 70px);`

        }
    }

    function removePoll(poll) {
        if (window.confirm("You will remove the poll from your list. It will be visible for other with the link.")) {
            myPolls = lstore.removeMyPoll(poll)
        }

    }

</script>
<h1>My Polls:</h1>

<div class="main">
    <!-- Empty -->
    {#if myPolls !== undefined}
        {#each myPolls as poll}
            <div class="flex">
                <div on:click={() => openPoll(poll)}
                     class="relative h-12 my-4 w-full border-2 rounded border-indigo-300">
                    <div class="background" style="{getStyle(poll)}"></div>
                    <div class="background overlay my-auto flex dark:text-white">
                        <div class="mr-auto my-auto py-2 px-4">
                            {poll.title}
                        </div>
                        <div class="py-2 my-auto px-4 ml-auto">
                            {poll.percent === undefined ? '' : poll.percent + ' |'}  {poll.participants} Participants
                        </div>
                    </div>
                </div>
                <div on:click={() => removePoll(poll)} class="my-auto pl-3">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             class="m-2 fill-red-500" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        {/each}
    {/if}

</div>


<style>

    .background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .overlay {
        z-index: 9;
        background: transparent;
    }
</style>

