<script lang="ts">
	import { options, tuiApi, events } from '$lib/store/createStore';
	//	import NotificationControl from '../../lib/NotificationControl';
	//	import WeekSelection from '../../lib/WeekSelection.svelte';
	import { onMount } from 'svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import { browser } from '$app/environment';
	import NotificationControl from '$lib/components/Notification/NotificationControl';
	import { goto } from '$app/navigation';
	import dayjs from 'dayjs';
	import type { Option } from '$lib/store/types';

	let selectedTab = 'text';
	let form;

	// Create local options
	let pollOptions = ['', ''];

	$: {
		// check if last option is filled, then add a new Option
		if (pollOptions === undefined || pollOptions[pollOptions.length - 1] !== '') {
			pollOptions.push('');
		}
	}

	function next() {
		if (selectedTab === 'text') {
			// Filter for empty elements
			pollOptions = pollOptions.filter((e) => e !== '').filter((e) => e !== ' ');
			//check if min. the first 2 options have content
			if (pollOptions.length >= 2) {
				let op = [];
				pollOptions.forEach((e) => op.push({ name: e }));
				options.set({
					options: op,
					type: 'text'
				});
				goto('/create/settings');
			} else {
				NotificationControl.error('Cannot continue', 'Please fill out at least two options.');
			}
		} else if (selectedTab === 'week') {
			let weekOptions = new Array();
			let counter = 1;
			// get all events and put them into a saveable format
			$events.forEach((o) => {
				if (o.title === '') {
					o.title = '' + counter++;
				}
				console.log(o.title);
				// @ts-ignore
				weekOptions.push(`${o.title} | ${dayjs(o.start).unix()} | ${dayjs(o.start).unix()}`);
			});
			// Filter for empty elements
			weekOptions = weekOptions.filter((e) => e !== '').filter((e) => e !== ' ');
			if (weekOptions.length >= 2) {
				const op = [];
				weekOptions.forEach((e) => {
					op.push({ name: e, state: 0 });
				});
				options.set({ options: op, type: 'week' });
				goto('/create/settings');
			} else {
				NotificationControl.error('Cannot continue', 'Please select at least tow options.');
			}
		} else {
			NotificationControl.error('Unexpected Error', '');
		}

		// if (selectedTab === 'text') {
		// 	//check if min. the first 2 options have content
		// 	if (pollOptions[0].option !== '' && pollOptions[1].option !== '') {
		// 		pollOptions = pollOptions.slice(0, -1);
		// 		$currentPoll.options = pollOptions;
		// 		page.set(CreatePoll3);
		// 	} else {
		// 		// if not create a notification
		// 		NotificationControl.error('Cannot continue', 'Please fill out at least two options.');
		// 	}
		// } else if (selectedTab === 'week') {
		// 	const weekOptions = new Array<Option>();
		// 	$events.forEach((o) =>
		// 		weekOptions.push(
		// 			new Option(Number(o.id), o.title + ' | ' + o.start + ' | ' + o.end, 'week')
		// 		)
		// 	);
		// 	//check if min. 2 options are given
		// 	if (weekOptions.length >= 2) {
		// 		$currentPoll.options = weekOptions;
		// 		page.set(CreatePoll3);
		// 	} else {
		// 		NotificationControl.error('Cannot continue', 'Please select at least tow options.');
		// 	}
		// 	console.log('Events: ', weekOptions);
		// }
	}

	onMount(() => {
		form.scrollIntoView();
	});
</script>

<form
	bind:this={form}
	on:submit|preventDefault
	class="mx-auto max-w-4xl rounded overflow-hidden shadow-lg min-h-screen md:min-h-0"
>
	<!--    <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains">-->
	<div class="px-6 py-4">
		<div class="font-bold text-xl mb-2">What are the options?</div>
		<nav class="flex justify-center flex-col sm:flex-row">
			<button
				type="button"
				on:click={() => (selectedTab = 'week')}
				class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none {selectedTab ===
				'week'
					? 'text-blue-500 border-b-2 font-medium border-blue-500'
					: ''}"
			>
				Week
			</button>
			<button
				type="button"
				on:click={() => (selectedTab = 'text')}
				class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none {selectedTab ===
				'text'
					? 'text-blue-500 border-b-2 font-medium border-blue-500'
					: ''}"
			>
				Text
			</button>
		</nav>
		{#if selectedTab === 'text'}
			{#each pollOptions as option, i}
				<div class="flex flex-wrap gap-3 w-full pb-8 px-5">
					<label class="relative w-full flex flex-col">
						<span class="font-bold mb-3 text-left">Option</span>
						<input
							bind:value={pollOptions[i]}
							class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
							type="text"
							name="title"
							placeholder="Enter option"
						/>
						<span
							class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
							>{i + 1}</span
						>
					</label>
				</div>
			{/each}
		{:else if selectedTab === 'week'}
			<!-- <WeekSelection /> -->
			{#if browser}
				<Calendar />
			{/if}
		{/if}
	</div>
	<div class="px-6 pt-4 pb-2">
		<button
			on:click={next}
			type="submit"
			class="hover:bg-gray-700 mb-5 bg-gray-900 text-white px-3 py-2 rounded-md ml-auto text-sm font-medium"
		>
			Continue
		</button>
	</div>
</form>
