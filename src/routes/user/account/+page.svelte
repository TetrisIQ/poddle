<script lang="ts">
	import ChangePassword from '$lib/components/ModalElements/ChangePassword.svelte';
	import ChangeUsername from '$lib/components/ModalElements/ChangeUsername.svelte';
	import Register from '$lib/components/ModalElements/Register.svelte';
	import NotificationControl from '$lib/components/Notification/NotificationControl';
	import { debugCB, defaultCB, gun } from '$lib/gun/gunStore';
	import { password, user, username, pair } from '$lib/store/userStore';
	import SEA from 'gun/sea';

	let loginPassword;
	let loginUsername;
	let newHashedPassword;

	let openChangePassword: boolean = false;
	let openChangeAlias: boolean = false;
	let openRegistration: boolean = false;

	// qmwsGgV2peY9AW7Vm%
	async function login() {
		console.log('is', user.is);
		await user.leave();
		newHashedPassword = await SEA.work(loginPassword, null, null, { name: 'SHA-256' });
		console.log('is', user.is);
		await user.auth(loginUsername, newHashedPassword, (ack) => {
			//@ts-ignore
			if (!ack.err) {
				//@ts-ignore
				pair.set(ack.sea);
				console.log('changing vars');
				username.set(loginUsername);
				$password = newHashedPassword;
			} else {
				defaultCB(ack);
			}
		});
	}
	function handleWindowKeyDown(event) {
		if (event.key === 'Escape') {
			openChangeAlias = false;
			openChangePassword = false;
			openRegistration = false;
		}
	}
</script>

<svelte:window on:keydown={handleWindowKeyDown} />

<div class="flex items-center justify-center">
	<div class="w-full max-w-md">
		<div class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">Poddle User</div>
		<ul class="">
			<li class="p-2">User-accounts are essentials for the app to work.</li>
			<li class="p-2">
				When you are visiting the page for the first time, an account will be created automatically
				for you. You can change the password or create a new account with your own username, if you
				want.
			</li>
			<li class="p-2">
				Your current username is <span class="font-bold italic">{$username}</span>
			</li>
		</ul>
		<div class="flex">
			<button
				on:click={() => (openChangePassword = true)}
				class="inline-block bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
				type="button"
				>Change password
			</button>
			<!-- <button
				on:click={() => (openChangeAlias = true)}
				class="ml-auto inline-flex items-center  bg-gray-100 border-0 py-1 px-3 focus:outline-none  hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
			>
				Change username
			</button> -->
			<!-- <button
				on:click={() => (openRegistration = true)}
				class="ml-auto inline-flex items-center  bg-gray-100 border-0 py-1 px-3 focus:outline-none  hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
			>
				Recovery option
			</button> -->
			<button
				on:click={() => (openRegistration = true)}
				class="ml-auto inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
			>
				Register
			</button>
		</div>
	</div>
</div>
<ChangePassword bind:show={openChangePassword} />
<ChangeUsername bind:show={openChangeAlias} />
<Register bind:show={openRegistration} />
<div class="flex items-center justify-center">
	<div class="w-full max-w-md">
		<form on:submit|preventDefault={login} class="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
			<div class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
				Login to another account
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-normal mb-2" for="username">
					username
				</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					name="username"
					type="text"
					id="username"
					required
					placeholder="username"
					bind:value={loginUsername}
				/>
			</div>
			<div class="mb-6">
				<label class="block text-gray-700 text-sm font-normal mb-2" for="password">
					Password
				</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					type="password"
					placeholder="Password"
					name="password"
					id="password"
					required
					bind:value={loginPassword}
				/>
			</div>
			<div class="flex items-center justify-between">
				<button
					class="px-4 py-2 rounded text-white inline-block shadow-lg bg-indigo-500 hover:bg-blue-600 focus:bg-blue-700"
					type="submit"
					>Sign In
				</button>
			</div>
		</form>
	</div>
</div>
