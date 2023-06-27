<script lang="ts">
	import { goto } from '$app/navigation';

	//import { page, currentPoll } from '../../store';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import { debugCB, gun } from '$lib/gun/gunStore';
	import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte'; //TODO: remove this dependency
	import dayjs from 'dayjs';
	import SEA from 'gun/sea';
	import { v4 as uuidv4 } from 'uuid';
	import {
		treeOptions,
		voteLimit,
		voteLimitAmount,
		fcfs,
		options,
		deadline,
		deadlineValue,
		title,
		location,
		note,
		name
	} from '$lib/store/createStore';
	import { pair, user } from '$lib/store/userStore';
	import { dataset_dev } from 'svelte/internal';
	import NotificationControl from '$lib/components/Notification/NotificationControl';
	import { createdPolls } from '$lib/store/savedPollStore';

	async function submitPoll() {
		//Create poll object
		const pw = uuidv4().replaceAll('-', '');
		const id = uuidv4().replaceAll('-', '').slice(6);
		const contentNode = gun.get('poll').get(id).get(`~${$pair.pub}`);

		// encrypt and save title
		const encTitle = await SEA.encrypt($title, pw);

		// encrypt and save name
		const encName = await SEA.encrypt($name, pw);

		// encrypt and save location
		const encLocation = await SEA.encrypt($location, pw);

		// encrypt and save note
		const encNote = await SEA.encrypt($note, pw);

		// encrypt and save treeOptions
		const encTreeOptions = await SEA.encrypt($treeOptions, pw);

		// encrypt and save voteLimit
		const encVoteLimit = await SEA.encrypt($voteLimit, pw);

		// encrypt and save voteLimitAmount
		const encVoteLimitAmount = await SEA.encrypt($voteLimitAmount, pw);

		// encrypt and save fcfs
		const encFcfs = await SEA.encrypt($fcfs, pw);

		// encrypt and save deadline
		const encDeadline = await SEA.encrypt($deadline, pw);

		let encDeadlineValue;
		// encrypt and save deadlineValue
		if ($deadlineValue === undefined) {
			encDeadlineValue = await SEA.encrypt('undefined', pw);
		} else {
			encDeadlineValue = await SEA.encrypt($deadlineValue, pw);
		}

		// set created field
		const created = String(dayjs().valueOf());

		//const option = node.get('option');
		console.log($options);
		for (let index = 0; index < $options.options.length; index++) {
			const element = $options.options[index];
			let encName = await SEA.encrypt(element.name, pw);
			var hashOption = await SEA.work(encName, null, null, { name: 'SHA-256' });
			contentNode.get('option').get(index).get(`#${hashOption}`).put(encName);
		}
		contentNode.get('type').put($options.type);

		const data = {
			title: encTitle,
			location: encLocation,
			note: encNote,
			created: created,
			name: encName
		};

		const settings = {
			treeOptions: encTreeOptions,
			fcfs: encFcfs,
			voteLimit: encVoteLimit,
			voteLimitAmount: encVoteLimitAmount,
			deadline: encDeadline,
			deadlineValue: encDeadlineValue
		};

		// save to creators private space
		var hashSettings = await SEA.work(settings, null, null, { name: 'SHA-256' });

		contentNode.put(data);
		contentNode.get('settings').get(`#${hashSettings}`).put(settings);

		$createdPolls.push({ id, key: pw, created: dayjs(), title: $title, deadline: $deadlineValue });
		$createdPolls = $createdPolls;

		goto(`/poll?id=${id}&key=${pw}`);
	}
</script>

<form
	on:submit|preventDefault={submitPoll}
	class="mx-auto max-w-4xl rounded overflow-hidden"
	style="height: 65vh;"
>
	<div class="font-bold text-xl mb-2">Poll settings</div>
	<div class="flex my-2">
		<Checkbox bind:checked={$treeOptions} class="ml-2 mb-auto" size="2rem" primaryColor="#f7be00" />
		<div>
			<div class="pl-2">
				<p class="font-bold text-left">Yes, no, if need be</p>
				<p class="font-light text-left">
					Participants can indicate if an option is not ideal for them.
				</p>
			</div>
		</div>
	</div>

	<div class="flex my-2">
		<Checkbox
			size="2rem"
			disabled={$treeOptions}
			bind:checked={$fcfs}
			primaryColor="#f7be00"
			class="ml-2 mb-auto"
		/>
		<div>
			<div class="pl-2">
				<p class="font-bold text-left">Limit the number of votes per option</p>
				<p class="font-light text-left">
					First come, first served. Once the spots are filled, the option is no longer available.
				</p>
			</div>
		</div>
	</div>

	<div class="flex my-2">
		<Checkbox
			size="2rem"
			disabled={$treeOptions}
			bind:checked={$voteLimit}
			primaryColor="#f7be00"
			class="ml-2 mb-auto"
		/>
		<div>
			<div class="pl-2">
				<p class="font-bold text-left">Limit the number of votes per option</p>
				<p class="font-light text-left">
					First come, first served. Once the spots are filled, the option is no longer available.
				</p>
			</div>
			<div class="text-left mt-1">
				{#if $voteLimit}
					<input
						bind:value={$voteLimitAmount}
						type="number"
						min="1"
						max={$options.options.length - 1}
						class="w-3/4 rounded-md mx-auto border-2 border-gray-200 placeholder-gray-300"
					/>
				{/if}
			</div>
		</div>
	</div>

	<div class="flex my-2">
		<Checkbox size="2rem" bind:checked={$deadline} primaryColor="#f7be00" class="ml-2 mb-auto" />
		<div>
			<div class="pl-2">
				<p class="font-bold text-left">Set a deadline</p>
				<p class="font-light text-left">
					Set a deadline to receive votes in time. After the deadline, no more votes is allowed.
				</p>
			</div>
			<div class="text-left mt-1">
				{#if $deadline}
					<DatePicker
						start={dayjs().add(1, 'day')}
						bind:selected={$deadlineValue}
						time={false}
						range={false}
					/>
				{/if}
			</div>
		</div>
	</div>
	<button
		type="submit"
		class="hover:bg-gray-700 mb-5 bg-gray-900 text-white px-3 py-2 rounded-md ml-auto text-sm font-medium"
		aria-current="page"
		>Continue
	</button>
</form>
