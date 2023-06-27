<script lang="ts">
	import { participants } from '$lib/store/pollStore';
	import type { Participant, Option } from '$lib/store/types';
	import { pair } from '$lib/store/userStore';
	import { comment } from 'svelte/internal';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let indeterminate: boolean = false;
	let checked: boolean = false;

	export let twoOptions: boolean = false;
	export let disabled = false;
	export let option: string;
	export let value: number = 0;

	$: {
		switch (value) {
			case -1:
				indeterminate = true;
				checked = false;
				break;
			case 0:
				indeterminate = false;
				checked = false;
				break;
			case 1:
				indeterminate = false;
				checked = true;
				break;
			default:
				indeterminate = false;
				checked = false;
				break;
		}
	}

	function onclick() {
		if (!disabled) {
			if (!indeterminate && !checked) {
				// Nothing is checked
				indeterminate = false;
				checked = true;
			} else if (!indeterminate && checked) {
				// checked
				if (!twoOptions) {
					indeterminate = true;
				}
				checked = false;
			} else if (indeterminate && !checked) {
				// Indeterminate
				indeterminate = false;
				checked = false;
			}
			value = getValue();
			dispatch('test', {
				value: value
			});
			// const me = $participants.find((p) => p.id === $pair.pub);
			// console.log('me', me);
			// console.log('opt', option);
			// if (me.options === undefined) {
			// 	me.options = [];
			// }
			// const existingOption = me.options.find((o) => o.name === option);
			// if (existingOption) {
			// 	existingOption.state = getValue();
			// } else {
			// 	me.options.push({ name: option, state: getValue() });
			// }
			// $participants = $participants;
		}
	}

	function getValue() {
		if (!indeterminate && !checked) {
			return 0;
		} else if (!indeterminate && checked) {
			return 1;
		} else if (indeterminate && !checked) {
			return -1;
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="box my-auto" on:click={() => onclick()}>
	{#if !indeterminate && !checked}
		<div class="h-6 w-6 border rounded m-auto" />
	{:else if !indeterminate && checked}
		<div class="h-6 w-6 border rounded m-auto text-green-400 border-green-400">
			<span class="my-auto">✔</span>
		</div>
	{:else if indeterminate && !checked}
		<div class="h-6 w-6 border rounded border-yellow-400 text-yellow-400 m-auto">
			<span class="my-auto">✔</span>
		</div>
	{/if}
</div>
