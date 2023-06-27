<script lang="ts">
	import { debugCB, defaultCB, gun } from '$lib/gun/gunStore';
	import { participants } from '$lib/store/pollStore';
	import type { Participant } from '$lib/store/types';
	import { pair, password, user, username } from '$lib/store/userStore';
	import SEA from 'gun/sea';
	import { onMount } from 'svelte';
	import NotificationControl from '../Notification/NotificationControl';
	import Eye from '../Eye.svelte';

	export let show = false;
	let newUsername = '';
	let newPassword = '';
	let newPasswordConfirm;
	let newHashedPassword;
	let passwordScore = 0;

	$: {
		if (newPassword === newPasswordConfirm && newPassword !== '') {
			passwordScore = 0;
			if (newPassword.length > 8) {
				passwordScore = passwordScore + 3;
			}
			if (/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword)) {
				passwordScore = passwordScore + 2;
			}
			if (/[0-9]/.test(newPassword)) {
				passwordScore = passwordScore + 1;
			}
			if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newPassword)) {
				passwordScore = passwordScore + 1;
			}
		}
	}

	function toggleShowPassword() {
		// @ts-ignore
		var pw: HTMLInputElement = document.getElementById('password');
		// @ts-ignore

		var pwConfirm: HTMLInputElement = document.getElementById('passwordConfirm');
		if (pw.type === 'password') {
			pw.type = 'text';
			pwConfirm.type = 'text';
		} else {
			pw.type = 'password';
			pwConfirm.type = 'password';
		}
	}

	function cancel() {
		show = false;
	}
	// qmwsGgV2peY9AW7Vm%
	async function save() {
		newHashedPassword = await SEA.work(newPassword, null, null, { name: 'SHA-256' });
		await user.create(newUsername, newHashedPassword, CB);
	}
	async function CB(ack) {
		console.log(ack);
		if (!ack.err) {
			NotificationControl.info('Success', 'registration was successfully');
			username.set(newUsername);
			password.set(newHashedPassword);
			await user.leave();
			await user.auth($username, $password);
			show = false;
		} else {
			NotificationControl.error('Cannot register', ack.err);
		}
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
					<div class="text-gray-900 font-medium text-lg">Register</div>
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
					<p>If you create a new account, you cannot edit your existing polls</p>
				</div>

				<div class="w-full p-5">
					<input
						type="text"
						class="w-full h-12 my-2 px-4 py-1 rounded-r-md border border-gray-300 text-gray-800 focus:outline-none"
						placeholder="New username"
						bind:value={newUsername}
					/>
					<div class="relative mb-2">
						<input
							type="password"
							id="password"
							class="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
							placeholder="Password"
							bind:value={newPassword}
						/>
						<button
							class="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors"
							on:click={() => toggleShowPassword()}
							><Eye />
						</button>
					</div>

					<input
						type="password"
						id="passwordConfirm"
						class="w-full h-12 my-2 px-4 py-1 rounded-r-md border border-gray-300 text-gray-800 focus:outline-none"
						placeholder="Confirm Password"
						bind:value={newPasswordConfirm}
					/>
					<div class="flex -mx-1">
						{#each [1, 2, 3, 4, 5] as i}
							<div class="w-1/5 px-1">
								<div
									class="h-2 rounded-xl transition-colors {i < passwordScore
										? passwordScore <= 3
											? 'bg-red-400'
											: passwordScore <= 5
											? 'bg-yellow-400'
											: 'bg-green-500'
										: 'bg-gray-200'}"
								/>
							</div>
						{/each}
					</div>
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
						disabled={!(newPassword === newPasswordConfirm && newPassword.length > 5)}
						on:click={() => save()}
						class="mx-5 bg-transparent ml-auto hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:border-gray-400 disabled:text-gray-400"
					>
						Register
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
