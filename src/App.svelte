<script lang="ts">
    import Header from "./lib/Header.svelte";
    import {page, pollDTO, releaseMessage} from "./store";
    import Poll from './view/Poll.svelte'
    import Footer from "./lib/Footer.svelte";
    import NotificationArea from "./lib/NotificationArea.svelte";
    import {gun} from "./gun";
    import NewMessage from "./view/NewMessage.svelte";
    import dayjs from "dayjs";

    if (window.location.search.includes("?k=")) {
        page.set(Poll)
    }

    if (window.location.search.includes("?newMessage")) {
        page.set(NewMessage)
    }


    function showReviewHint(): boolean {
        return process.env.NODE_ENV === "review"
    }

    function showStagingHint(): boolean {
        return process.env.NODE_ENV === "staging"
    }

    gun.getReleaseMessage()


    function ttlIsOver() {
        if ($releaseMessage !== undefined) {
            const ttlInDays = +$releaseMessage.ttl;
            const isOver = dayjs().isAfter(dayjs($releaseMessage.createdOn).add(ttlInDays, 'day').endOf('day').toISOString())
            return isOver
        }
    }


</script>
<div class="flex flex-col min-h-screen">
    <Header/>
    {#if $releaseMessage !== undefined && !ttlIsOver()}
        {#if $releaseMessage.kind === "release"}
            <div on:click={() => releaseMessage.set(undefined)}
                 class="w-full h-auto dark:text-black dark:bg-yellow-600 mx-auto text-center h-9 bg-indigo-400 p-1 text-lg">
                <span>📦</span>
                <span class="font-bold pr-2">{$releaseMessage.title}</span>
                <span>{$releaseMessage.content}</span>
            </div>
        {:else if ($releaseMessage.kind === "celebrate")}
            <div on:click={() => releaseMessage.set(undefined)}
                 class="w-full h-auto dark:text-black dark:bg-yellow-600 mx-auto text-center h-9 bg-indigo-400 p-1 text-lg">
                <span>🎉</span>
                <span class="font-bold pr-2">{$releaseMessage.title}</span>
                <span>{$releaseMessage.content}</span>
            </div>
        {:else if ($releaseMessage.kind === "warning")}
            <div on:click={() => releaseMessage.set(undefined)}
                 class="w-full h-auto dark:text-black dark:bg-yellow-600 mx-auto text-center h-9 bg-gray-200 p-1 text-lg">
                <span>👷</span>
                <span class="font-bold pr-2">{$releaseMessage.title}</span>
                <span>{$releaseMessage.content}</span>
            </div>
        {/if}
    {/if}
    {#if showReviewHint()}
        <div class="w-full h-auto dark:text-black dark:bg-yellow-600 mx-auto text-center h-9 bg-yellow-400 p-1 text-lg">
            This
            instance is only for reviewing and
            tests. Polls are not synchronised with other browsers!<a
                class="text-blue-900 pl-3" href="https://tetrisiq.github.io/poll-dapp/">Use the Live instance</a>
        </div>
    {/if}
    {#if showStagingHint()}
        <div class="w-full h-auto dark:text-black dark:bg-yellow-600 mx-auto text-center h-9 bg-yellow-400 p-1 text-lg">
            You are
            on the staging instance. The Relay server loses all information after 15 minutes!<a
                class="text-blue-900 pl-3" href="https://tetrisiq.github.io/poll-dapp/">Use the Live instance</a>
        </div>
    {/if}
    <main class="mx-auto flex-grow w-full xl:px-40 l:px-14 text-center">
        <NotificationArea/>
        <svelte:component this={$page}/>
    </main>
    <Footer/>
</div>

