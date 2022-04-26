<script>

    let hour = 12;
    let minute = 0;
    export let value;
    setValues();

    function setValues() {
        hour = value.split(":")[0];
        minute = value.split(":")[1];
    }

    function updateValue() {
        value = hour + ":" + minute;
    }

    $: {
        if (hour > 23) {
            hour = 0
        }
        if (minute > 59) {
            hour = hour + 1;
            minute = 0;
        }
        if (minute < 0) {
            hour = hour - 1;
            minute = 59;
        }
        if (hour < 0) {
            hour = 23;
        }
        updateValue();
    }
    //my-2 border mx-auto border-[2px] justify-center rounded-md shadow-md
</script>
<div class="mt-2 px-5 w-44 border border-[2px] my-auto h-12 rounded-md shadow-md">
    <div class="flex h-full">
        <input type="number" bind:value={hour} min="-1" max="24" name="hours"
               class="bg-transparent my-auto text-center text-xl appearance-none outline-none"/>
        <span class="text-xl my-auto mr-3">:</span>
        <input name="minutes" bind:value={minute} type="number" min="-1" max="60"
               class="bg-transparent my-auto text-xl appearance-none outline-none mr-4"/>
    </div>
</div>