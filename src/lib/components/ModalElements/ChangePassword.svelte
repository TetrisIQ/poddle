<script lang="ts">
	import { debugCB, defaultCB, gun } from '$lib/gun/gunStore';
	import { participants } from '$lib/store/pollStore';
	import type { Participant } from '$lib/store/types';
	import { pair, password, user, username } from '$lib/store/userStore';
	import SEA from 'gun/sea';
	import { onMount } from 'svelte';
	import NotificationControl from '../Notification/NotificationControl';

	export let show = false;
	let newHashedPassword: string;
	let newPassword: string;
	let confirmNewPassword: string;
	let showError: boolean;
	let errorMessage: string;
	let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/;
	// qmwsGgV2peY9AW7Vm%
	onMount(() => {});

	function cancel() {
		show = false;
	}

	async function save() {
		showError = false;
		errorMessage = '';
		if (confirmNewPassword !== newPassword) {
			errorMessage = 'Check if the passwords are the same.';
			showError = true;
			return;
		}
		if (newPassword.length < 8) {
			errorMessage = 'Your password must have a Minimum of eight characters.';
			showError = true;
			return;
		}
		if (!/[A-Z]/.test(newPassword)) {
			errorMessage = 'Your password must have at least one uppercase letter.';
			showError = true;
			return;
		}
		if (!/[a-z]/.test(newPassword)) {
			errorMessage = 'Your password must have at least one lowercase letter.';
			showError = true;
			return;
		}
		if (!/[0-9]/.test(newPassword)) {
			errorMessage = 'Your password must have at least one number.';
			showError = true;
			return;
		}
		if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newPassword)) {
			errorMessage =
				'Your password must have at least one special character, like !@#$%^&*()_+-=[]{};\':"\\|,.<>/?~';
			showError = true;
			return;
		}
		// All checks OK!
		newHashedPassword = await SEA.work(newPassword, null, null, { name: 'SHA-256' });
		user.leave();
		console.log('Old pw', $password);
		await user.auth($username, $password, CB, { change: newHashedPassword });
		$password = newHashedPassword;
		show = false;
	}

	function CB(ack) {
		if (ack.ok) {
			$password = newHashedPassword;
			return;
		}
		console.error(ack);
		return NotificationControl.error('Error', ack.err);
	}
</script>

{#if show}
	<div
		style="background-color: #6b728080"
		class="flex items-center justify-center fixed left-0 bottom-0 w-full h-full z-50"
	>
		<div class="bg-white rounded-lg w-1/2">
			<div class="flex flex-col items-start p-4">
				<div class="flex items-center w-full">
					<div class="text-gray-900 font-medium text-lg">Change your password</div>
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
					{#if showError}
						<p>
							{errorMessage}
						</p>
					{/if}
					<input
						type="password"
						class="w-full h-12 my-2 px-4 py-1 rounded-r-md border border-gray-300 text-gray-800 focus:outline-none {showError
							? 'border-red-500'
							: ''}"
						placeholder="New password"
						bind:value={newPassword}
					/>
					<input
						type="password"
						class="w-full h-12 my-2 px-4 py-1 rounded-r-md border border-gray-300 text-gray-800 focus:outline-none {showError
							? 'border-red-500'
							: ''}"
						placeholder="Confirm new password"
						bind:value={confirmNewPassword}
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
