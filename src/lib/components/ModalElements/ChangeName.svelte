<script lang="ts">
	import { gun } from '$lib/gun/gunStore';
	import { participants } from '$lib/store/pollStore';
	import type { Participant } from '$lib/store/types';
	import { pair } from '$lib/store/userStore';
	import { onMount } from 'svelte';

	export let show = false;
	export let pollId: string;
	let me: Participant;
	let name: string;

	onMount(() => {
		me = $participants.find((p) => p.id === $pair?.pub);
		name = me.name;
	});

	function cancel() {
		show = false;
	}

	const convertArrayToObject = (array, key) => {
		const initialValue = {};
		return array.reduce((obj, item) => {
			return {
				...obj,
				[item[key]]: item
			};
		}, initialValue);
	};

	function save() {
		if (name !== undefined) {
			me.name = name;
			$participants = $participants;
			// unset old value
			//gun.get('poll').get(pollId).get('participants').get($pair.pub).unset();
			// Set new value
			gun
				.get('poll')
				.get(pollId)
				.get('participants')
				.get(`~${$pair.pub}`)
				.put({ name: name, option: convertArrayToObject(me.option, 'name') });
			show = false;
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
					<div class="text-gray-900 font-medium text-lg">Change your name</div>
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
						class="w-full h-12 px-4 py-1 rounded-r-md border border-gray-300 text-gray-800 focus:outline-none"
						placeholder="Your name"
						bind:value={name}
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
