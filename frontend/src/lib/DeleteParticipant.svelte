<script lang="ts">
  import { currentPoll, modalData } from "../store";
  import ModalControl from "./ModalControl";

  function removeParticipant() {
    const participant = $currentPoll.participants.find(
      (p) => p.randomKey === $modalData
    );

    const index = $currentPoll.participants.indexOf(participant);
    if (index > -1) {
      $currentPoll.participants.splice(index, 1); // 2nd parameter means remove one item only
    }
    $currentPoll = $currentPoll;
    ModalControl.close();
  }
</script>

<div class="w-full mt-4 mb-2">
  <button
    disabled
    on:click={() => removeParticipant()}
    class="px-2 py-1 bg-red-500 text-white mx-1 rounded">Delete</button
  >
</div>
