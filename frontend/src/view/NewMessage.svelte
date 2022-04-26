<script lang="ts">

    import {releaseMessage} from "../store";
    import {onMount} from "svelte";
    import {ReleaseMessage} from "../model/ReleaseMessage";
    import {gun} from "../gun";
    import NotificationControl from "../lib/NotificationControl";

    let adminKey;

    function finish() {
        try {
            const adminKeyObj = JSON.parse(adminKey)
            $releaseMessage.createdOn = new Date().toUTCString()
            gun.createReleaseMessage(adminKeyObj, $releaseMessage)
            NotificationControl.info("New message created", "")
        } catch (e: SyntaxError) {
            NotificationControl.error("Cannot create new message", "You have not the right key.")
        }
    }

    onMount(() => {
        if ($releaseMessage === undefined) {
            releaseMessage.set(new ReleaseMessage())
        }
    })
</script>
{#if $releaseMessage !== undefined}
    <form on:submit|preventDefault={() => finish()} class="mx-auto max-w-4xl mt-6 rounded overflow-hidden shadow-lg">
        <!--    <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains">-->
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Create a new Release message</div>
            <div class="font-bold text-l mb-2">This is only for admins</div>
            <div class="flex flex-wrap gap-3 w-full p-5">
                <label class="relative w-full flex flex-col">
                    <span class="font-bold mb-3 text-left">Title</span>
                    <input bind:value={$releaseMessage.title}
                           class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                           type="text"
                           name="title" placeholder="Title" required/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                         viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                        <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"/>
                    </svg>
                </label>
            </div>
            <div class="flex flex-wrap gap-3 w-full p-5">
                <label class="relative w-full flex flex-col">
                    <span class="font-bold mb-3 text-left">Content</span>
                    <textarea bind:value={$releaseMessage.content}
                              class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                              type="text"
                              name="Content" placeholder="Content"></textarea>
                    <svg class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                         xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </label>
            </div>
            <div class="flex flex-wrap gap-3 w-full p-5">
                <label class="relative w-full flex flex-col">
                    <span class="font-bold mb-3 text-left">Kind</span>
                    <select bind:value={$releaseMessage.kind}
                            class="rounded-md bg-transparent peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300">
                        <option>release</option>
                        <option>celebrate</option>
                        <option>warning</option>
                    </select>
                    <svg class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                         xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         viewBox="0 0 16 16">
                        <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                        <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/>
                    </svg>
                </label>
            </div>
            <div class="flex flex-wrap gap-3 w-full p-5">
                <label class="relative w-full flex flex-col">
                    <span class="font-bold mb-3 text-left">TTL in days (ends 23:59 UTC)</span>
                    <input bind:value={$releaseMessage.ttl}
                           class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                           type="number"
                           min="0"
                           max="30"
                           name="Time to live" placeholder="Time to live" required/>
                    <svg class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                         xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         viewBox="0 0 16 16">
                        <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                        <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
                    </svg>
                </label>
            </div>
            <div class="flex flex-wrap gap-3 w-full p-5">
                <label class="relative w-full flex flex-col">
                    <span class="font-bold mb-3 text-left">Admin key</span>
                    <textarea bind:value={adminKey}
                              class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                              type="text"
                              name="Admin key" placeholder="Admin key" required></textarea>
                    <svg class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                         xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         viewBox="0 0 16 16">
                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                </label>
            </div>
        </div>
        <div class="px-6 pt-4 pb-2">
            <button type="submit"
                    class="hover:bg-gray-700 mb-5 bg-gray-900 text-white px-3 py-2 rounded-md ml-auto text-sm font-medium"
                    aria-current="page">
                Create / Update
            </button>
        </div>
    </form>
{/if}