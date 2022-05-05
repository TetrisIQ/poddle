<script lang="ts">
  import { page, currentPoll } from '../../store';
  import Checkbox from '../../lib/Checkbox.svelte';
  import CreatePoll4 from './CreatePoll4.svelte';
  import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
  import dayjs from 'dayjs';
  import { Settings } from '../../model/PollSettings';

  //create local Settings
  let settings: Settings = new Settings();

  function next() {
    $currentPoll.settings = settings;
    page.set(CreatePoll4);
  }
</script>

<form on:submit|preventDefault={() => next()} class="mx-auto max-w-4xl rounded overflow-hidden min-h-screen md:min-h-0">
  <div class="font-bold text-xl mb-2">Poll settings</div>
  <div class="flex my-2">
    <Checkbox bind:checked={settings.treeOptions} class="ml-2 mb-auto" size="2rem" primaryColor="#f7be00" />
    <div>
      <div class="pl-2">
        <p class="font-bold text-left">Yes, no, if need be</p>
        <p class="font-light text-left">Participants can indicate if an option is not ideal for them.</p>
      </div>
    </div>
  </div>

  <div class="flex my-2">
    <Checkbox
      size="2rem"
      disabled={settings.treeOptions}
      bind:checked={settings.fcfs}
      primaryColor="#f7be00"
      class="ml-2 mb-auto"
    />
    <div>
      <div class="pl-2">
        <p class="font-bold text-left">Limit the number of votes per option</p>
        <p class="font-light text-left">
          First come, first served. Once the spots are filled, the option is no longer available.
        </p>
      </div>
    </div>
  </div>

  <div class="flex my-2">
    <Checkbox
      size="2rem"
      disabled={settings.treeOptions}
      bind:checked={settings.voteLimit}
      primaryColor="#f7be00"
      class="ml-2 mb-auto"
    />
    <div>
      <div class="pl-2">
        <p class="font-bold text-left">Limit the number of votes per option</p>
        <p class="font-light text-left">
          First come, first served. Once the spots are filled, the option is no longer available.
        </p>
      </div>
      <div class="text-left mt-1">
        {#if settings.voteLimit}
          <input
            bind:value={settings.voteLimitAmount}
            type="number"
            min="1"
            max={$currentPoll.options.length - 1}
            class="w-3/4 rounded-md mx-auto border-2 border-gray-200 placeholder-gray-300"
          />
        {/if}
      </div>
    </div>
  </div>

  <div class="flex my-2">
    <Checkbox size="2rem" bind:checked={settings.deadline} primaryColor="#f7be00" class="ml-2 mb-auto" />
    <div>
      <div class="pl-2">
        <p class="font-bold text-left">Set a deadline</p>
        <p class="font-light text-left">
          Set a deadline to receive votes in time. After the deadline, no more votes is allowed.
        </p>
      </div>
      <div class="text-left mt-1">
        {#if settings.deadline}
          <DatePicker start={dayjs().add(1, 'day')} bind:selected={$currentPoll.deadline} time={false} range={false} />
        {/if}
      </div>
    </div>
  </div>
  <button
    type="submit"
    class="hover:bg-gray-700 mb-5 bg-gray-900 text-white px-3 py-2 rounded-md ml-auto text-sm font-medium"
    aria-current="page"
    >Continue
  </button>
</form>
