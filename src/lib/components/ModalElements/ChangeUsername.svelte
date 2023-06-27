<script lang="ts">
	import { debugCB, defaultCB, gun } from '$lib/gun/gunStore';
	import { participants } from '$lib/store/pollStore';
	import type { Participant } from '$lib/store/types';
	import { pair, password, user, username } from '$lib/store/userStore';
	import SEA from 'gun/sea';
	import { onMount } from 'svelte';
	import NotificationControl from '../Notification/NotificationControl';

	export let show = false;
	let newUsername;

	function cancel() {
		show = false;
	}
	// qmwsGgV2peY9AW7Vm%
	async function save() {
		user.is.alias = newUsername;

		await gun.get(`~@${newUsername}`).set(user, debugCB);

		// delete the old username
		await user.delete($username, $password);

		// Set new username in store
		$username = 'You should login now to verify everything works as expected';
	}

	function CB(ack) {}
</script>

{#if show}
	<div
		style="background-color: #6b728080"
		class="flex items-center justify-center fixed left-0 bottom-0 w-full h-full z-50"
	>
		<div class="bg-white rounded-lg w-1/2">
			<div class="flex flex-col items-start p-4">
				<div class="flex items-center w-full">
					<div class="text-gray-900 font-medium text-lg">Change your username</div>
					<button
						class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
						on:click={() => cancel()}
					>
						<svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
							<path
								d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
							/>
						</svg>
					</button>
				</div>
				<hr />
				<div class="w-full p-5">
					<input
						type="text"
						class="w-full h-12 my-2 px-4 py-1 rounded-r-md border border-gray-300 text-gray-800 focus:outline-none"
						placeholder="New username"
						bind:value={newUsername}
					/>
				</div>
				<hr />
				<div class="w-full">
					<button
						on:click={() => cancel()}
						class="mx-5 bg-transparent ml-auto hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
					>
						Close
					</button>
					<button
						on:click={() => save()}
						class="mx-5 bg-transparent ml-auto hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
