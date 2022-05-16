<script lang="ts">
  import { lstore } from "../gun/LStore";
  import type { MyPoll } from "../gun/LStore";
  import dayjs from "dayjs";

  let myPolls: Array<MyPoll> = lstore.getMyPolls();

  function openPoll(poll: MyPoll) {
    window.open("?k=" + poll.id + poll.password, "_self");
  }

  function getStyle(poll: MyPoll) {
    if (poll.deadline === undefined) {
      return `background-color: rgb(165 180 252);`;
    } else {
      const startDate = dayjs(poll.created).toDate();
      const endDate = dayjs(poll.deadline).toDate();
      const range = endDate - startDate;
      const diff = Math.max(0, endDate - dayjs().toDate());
      const color = "rgb(199 210 254)";

      let percent = 100 - (100 * diff) / range;
      if (percent < 5) {
        percent = 5;
      }
      percent = Math.round(percent);
      poll.percent = percent + "%";
      lstore.addPercentToPoll(poll);
      return `background-color: rgb(224 231 255); 70;width: ${percent}%;background-image: repeating-linear-gradient(315deg, transparent, transparent 35px,  ${color} 35px,  ${color} 70px);`;
    }
  }

  function removePoll(poll) {
    if (
      window.confirm(
        "You will remove the poll from your list. It will be visible for other with the link."
      )
    ) {
      myPolls = lstore.removeMyPoll(poll);
    }
  }
</script>

<h1>My Polls:</h1>

<div class="main">
  <!-- Empty -->
  {#if myPolls !== undefined}
    {#if myPolls.length > 0}
      {#each myPolls as poll}
        <div class="flex">
          <div
            on:click={() => openPoll(poll)}
            class="relative h-12 my-4 w-full border-2 rounded border-indigo-300"
          >
            <div class="background" style={getStyle(poll)} />
            <div class="background overlay my-auto flex dark:text-white">
              <div class="mr-auto my-auto py-2 px-4">
                {poll.title}
              </div>
              <div class="py-2 my-auto px-4 ml-auto">
                {poll.percent === undefined ? "" : poll.percent + " |"}
                {poll.participants}
                Participants
              </div>
            </div>
          </div>
          <div on:click={() => removePoll(poll)} class="my-auto pl-3">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="m-2 fill-red-500"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
                />
              </svg>
            </button>
          </div>
        </div>
      {/each}
    {:else}
      <div class="w-full h-full flex">
        <div class="col-span-12 sm:col-span-6 md:col-span-3 mx-auto">
          <div class="flex flex-row bg-white shadow-sm rounded p-4">
            <div
              class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-balloon-heart"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721L8 2.42Zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063.045.041.089.084.132.129.043-.045.087-.088.132-.129 3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3.177 3.177 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398Z"
                />
              </svg>
            </div>
            <div class="flex flex-col flex-grow ml-4">
              <div class="font-bold text-lg">You have no polls</div>
              <div class="text-sm text-gray-500">
                Create a poll or participate to a poll to see a list here.
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
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
