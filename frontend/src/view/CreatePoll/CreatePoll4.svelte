<script lang="ts">
  import { currentPoll, page } from '../../store';
  import { uuidv4 } from '../../lib/util';
  import Poll from '../Poll.svelte';
  import { Participant } from '../../model/PollParticipant';
  import { lstore } from '../../gun/LStore';
  import NotificationControl from '../../lib/NotificationControl';
  import { pollGun } from '../../gun/PollGun';

  function finish() {
    const uid = uuidv4();

    $currentPoll.id = uid.slice(0, 12);
    $currentPoll.password = uid.slice(12);
    $currentPoll.participants.push(new Participant($currentPoll.creatorName, true, $currentPoll.options));
    lstore.setMyName($currentPoll.creatorName);
    $currentPoll = $currentPoll;
    //save to DB

    pollGun.createPoll($currentPoll);
    page.set(Poll);
    NotificationControl.info('Poll Created', 'Leave your browser open so that the data can be synchronized');
  }
</script>

<form
  on:submit|preventDefault={() => finish()}
  class="mx-auto max-w-4xl rounded overflow-hidden min-h-screen md:min-h-0"
>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">Tell your participants who you are</div>
    <div class="flex flex-wrap gap-3 w-full p-5">
      <label class="relative w-full flex flex-col">
        <span class="font-bold mb-3 text-left">Name</span>
        <input
          bind:value={$currentPoll.creatorName}
          class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
          type="text"
          name="title"
          placeholder="Name"
          required
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
          />
        </svg>
      </label>
    </div>
  </div>
  <div class="px-6 pt-4 pb-2">
    <button
      type="submit"
      class="hover:bg-gray-700 mb-5 bg-gray-900 text-white px-3 py-2 rounded-md ml-auto text-sm font-medium"
      aria-current="page"
      >Finish
    </button>
  </div>
</form>
