<script lang="ts">
    import {editSchedule, events, tuiApi} from "../store";
    import {modalStore} from "./ModalControl";
    import dayjs from "dayjs";
    import SimpleTimePicker from "./SimpleTimePicker.svelte";

    let title = $editSchedule.title
    let start = dayjs($editSchedule.start).format("HH:mm")
    let end = dayjs($editSchedule.end).format("HH:mm")

    function updateSchedule() {
        const event = $events.get($editSchedule.id)
        $tuiApi.updateSchedule($editSchedule.id, $editSchedule.calendarId, {title: title})
        let startAsDate = getTimeAsDay(start);
        let endAsDate = getTimeAsDay(end, false)
        if(startAsDate.isAfter(endAsDate)) {
            endAsDate = startAsDate.hour(startAsDate.hour() + 1)
        }
        $tuiApi.updateSchedule($editSchedule.id, $editSchedule.calendarId, {start: startAsDate.toDate()})
        $tuiApi.updateSchedule($editSchedule.id, $editSchedule.calendarId, {end: endAsDate.toDate()})

        event.title = $editSchedule.title;
        event.start = $editSchedule.start;
        event.end = $editSchedule.end;
        $events.set($editSchedule.id, event)
        $events = $events
        modalStore.set(undefined)
    }

    function getTimeAsDay(time: string, start: boolean = true) {
        if (start) {
            return dayjs($editSchedule.start).hour(Number(time.split(":")[0])).minute(Number(time.split(":")[1]))
        } else {
            return dayjs($editSchedule.end).hour(Number(time.split(":")[0])).minute(Number(time.split(":")[1]))
        }
    }

    function removeSchedule() {
        $events.delete($editSchedule.id)
        $tuiApi.deleteSchedule($editSchedule.id, $editSchedule.calendarId)
        $events = $events
        modalStore.set(undefined)
    }
</script>

<div class="grid grid-rows-3 grid-flow-col gap-4">
    <!-- Title  -->
    <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md">
        <div>
            <button
                    class="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-12 h-12 text-white "
                    :class="(search.length > 0) ? 'bg-purple-500' : 'bg-gray-500 cursor-not-allowed'"
                    :disabled="search.length == 0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-900" fill="none"
                     viewBox="0 0 16 16" stroke="currentColor">
                    <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z"/>
                </svg>
            </button>
        </div>

        <div class="  w-full">
            <input type="text"
                   class="w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                   placeholder="Title" bind:value={title}>
        </div>


    </div>
    <!-- Start/End Time -->
    <div class="grid grid-cols-2 gap-4">
        <div class="flex my-auto">
            <span class="text-xl mr-2 my-auto font-bold">Start Time:</span>
            <SimpleTimePicker bind:value={start}/>
        </div>
        <div class="flex my-auto">
            <span class="text-xl mr-2 my-auto font-bold">End Time:</span>
            <SimpleTimePicker bind:value={end}/>
        </div>
    </div>

    <div>
        <button on:click={() => updateSchedule()}
                class="inline-flex h-12 items-center dark:bg-gray-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                 class="mx-2 w-4 h-4 ml-1" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
            </svg>
            Update Event
        </button>
        <button on:click={() => removeSchedule()}
                class="inline-flex h-12 items-center dark:bg-gray-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                 class="mx-2 w-4 h-4 ml-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                <path fill-rule="evenodd"
                      d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
            </svg>
            Remove Event
        </button>
    </div>
</div>