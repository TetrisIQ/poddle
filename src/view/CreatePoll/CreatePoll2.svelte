<script lang="ts">
    import {page, pollOptions} from "../../store";
    import CreatePoll3 from "./CreatePoll3.svelte";
    import {Option} from "../../model/Option";
    // import CreatePoll3 from "./CreatePoll3.svelte";
    let selectedTab = "text";

    let optionsIdCount = 1;
    let showHint = false;

    $pollOptions = [
        new Option(optionsIdCount++),
        new Option(optionsIdCount++)]

    $:{
        const options = $pollOptions
        if (options === undefined || options[options.length - 1].option !== "") {
            $pollOptions.push(new Option(optionsIdCount++));
        }
    }

    function next() {
        console.log($pollOptions[0].option !== "", $pollOptions[1].option !== "")
        if ($pollOptions[0].option !== "" && $pollOptions[1].option !== "") {
            $pollOptions = $pollOptions.slice(0, -1)
            page.set(CreatePoll3)
        } else {
            console.log("SHOW HINT")
            showHint = true;
        }
    }


</script>


<form on:submit|preventDefault={() => next()}
      class="mx-auto max-w-4xl rounded overflow-hidden shadow-lg">
    <!--    <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains">-->
    <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">What are the options?</div>
        <nav class="flex justify-center flex-col sm:flex-row">
            <button on:click={() => window.alert("Only Text is Supported for now")}
                    class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none {selectedTab === 'month' ? 'text-blue-500 border-b-2 font-medium border-blue-500' : ''}">
                Month
            </button>
            <button on:click={() => window.alert("Only Text is Supported for now")}
                    class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none {selectedTab === 'week' ? 'text-blue-500 border-b-2 font-medium border-blue-500' : ''}">
                Week
            </button>
            <button on:click={() => selectedTab = "text"}
                    class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none {selectedTab === 'text' ? 'text-blue-500 border-b-2 font-medium border-blue-500' : ''}">
                Text
            </button>
        </nav>
        <div class="{showHint ? '' : 'hidden'} mt-3">You must select at least 2 Options</div>
        {#each $pollOptions as option, i}
            <div class="flex flex-wrap gap-3 w-full pb-8 px-5">
                <label class="relative w-full flex flex-col">
                    <span class="font-bold mb-3 text-left">Option</span>
                    <input bind:value={option.option}
                           class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                           type="text"
                           name="title" placeholder="Enter option"/>
                    <span class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6">{i + 1}</span>
                </label>
            </div>

        {/each}

    </div>
    <div class="px-6 pt-4 pb-2">
        <button type="submit"
                class="hover:bg-gray-700 mb-5 bg-gray-900 text-white px-3 py-2 rounded-md ml-auto text-sm font-medium">
            Continue
        </button>
    </div>
</form>
