<script lang="ts">
	import { debugCB, gun } from '$lib/gun/gunStore';
	import SEA from 'gun/sea';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import dayjs, { type Dayjs } from 'dayjs';
	import RelativeTime from 'dayjs/plugin/relativeTime';
	import { pair, username } from '$lib/store/userStore';
	import { participants, pollOptions } from '$lib/store/pollStore';
	import NotificationControl from '$lib/components/Notification/NotificationControl';
	import CheckboxYNINB from '$lib/components/CheckboxYNINB.svelte';
	import { browser } from '$app/environment';
	import ChangeName from '$lib/components/ModalElements/ChangeName.svelte';
	import type { Participant, Option } from '$lib/store/types';
	import { createdPolls, participatedPolls } from '$lib/store/savedPollStore';
	import TimeCard from '$lib/components/TimeCard.svelte';
	dayjs.extend(RelativeTime);

	// The pageDatas are server side rendered (ssr)
	export let data: PageData;
	$: iParticipate = $participants
		? $participants.map((k) => k.id.includes($pair?.pub)).find((k) => k)
		: false;
	participants.set(data.poll?.participants);
	let selectedParticipant;
	let showChangeNameModal: boolean = false;
	let deadlineIsNotReachedValue: boolean;

	onMount(async () => {
		if (data.poll.settings !== undefined) {
			if (data.poll.settings.deadline) {
				deadlineIsNotReachedValue = dayjs(data.poll.settings.deadlineValue).isAfter(dayjs());
			} else {
				deadlineIsNotReachedValue = true;
			}
		} else {
			deadlineIsNotReachedValue = true;
		}

		// Set listener for participants
		await gun
			.get('poll')
			.get(data.id)
			.get('participants')
			.open(async (rawData) => {
				let p = new Array<Participant>();
				if (rawData) {
					Object.keys(rawData).forEach(async (k) => {
						const elem = rawData[k];
						const option = elem.option ? Object.values(elem.option) : [];
						//@ts-ignore
						p.push({ id: k.replace('~', ''), name: elem.name, option });
					});
				}
				$participants = p;
			});
		if (!$createdPolls.find((p) => p.id === data.id)) {
			if (!$participatedPolls.find((p) => p.id === data.id)) {
				$participatedPolls.push({
					id: data.id,
					key: data.key,
					title: data.poll.title,
					created: dayjs(Number(data.poll.created)),
					deadline: data.poll.settings?.deadlineValue
				});
				$participatedPolls = $participatedPolls;
			}
		}
	});
	const convertArrayToObject = (array, key) => {
		const initialValue = {};
		return array.reduce((obj, item) => {
			return {
				...obj,
				[item[key]]: item
			};
		}, initialValue);
	};
	async function save() {
		const me = $participants.find((p) => p.id === $pair.pub);
		// Vote Limit check
		if (data.poll.settings.voteLimit) {
			const myYesOptions = me.option.filter((o) => o.state != 0);
			if (myYesOptions.length > data.poll.settings.voteLimitAmount) {
				NotificationControl.error(
					`You have only ${data.poll.settings.voteLimitAmount} vote(s)`,
					''
				);
				return;
			}
			// fcfs check
			if (data.poll.settings.fcfs) {
				let foundOptionTaken;
				me.option.forEach((myOption) => {
					// check if myOption is already taken
					if (myOption.state != 0) {
						$participants.forEach((p) => {
							if (p.name != me.name) {
								const found = p.option.find((o) => o.name === myOption.name);
								if (found && found.state != 0) {
									foundOptionTaken = found;
									return;
								}
							}
						});
					}
					if (foundOptionTaken) {
						return; // break the loop
					}
				});

				if (foundOptionTaken) {
					const takenOptionName =
						data.poll.type === 'text' ? foundOptionTaken.name : foundOptionTaken.name.split('|')[0];
					NotificationControl.error(
						`Option ${takenOptionName} is already taken`,
						'Every option can only be selected by one participant'
					);
					return;
				}
			}
		}
		const myOptions = convertArrayToObject(me.option, 'name');
		gun
			.get('poll')
			.get(data.id)
			.get('participants')
			.get(`~${$pair.pub}`)
			.get('option')
			.put(myOptions, debugCB);

		selectedParticipant = 'default';
	}

	async function participate() {
		//TODO: encrypt name
		if (!$pair) {
			NotificationControl.error(
				'We have problems to save some important data.',
				'Reload the page and allow local storage for this page!'
			);
		}
		await gun
			.get('poll')
			.get(data.id)
			.get('participants')
			.get(`~${$pair.pub}`)
			.get('name')
			.put($username, debugCB);
		//@ts-ignore
		$participants.push({ name: $username, id: $pair.pub, options: [] });
	}

	function formatCreated(timestamp: string) {
		const date = dayjs(Number(timestamp));
		return dayjs(date).fromNow();
	}

	function formatDate(date: Dayjs): string {
		if (date === undefined) {
			return 'undefined';
		}
		if (dayjs(date).isAfter(dayjs())) {
			return 'Deadline ends in ' + dayjs(date).toNow(false).replace('ago', '');
		}
		return 'This poll is over since ' + dayjs(date).fromNow(true);
	}

	function getTitleFromTimeSlot(slot: string) {
		//Option 1 | 1649165400000 | 1649178000000
		console.log(slot);
		return slot.split(' | ')[0];
	}
	function getStartFromTimeSlot(slot: string) {
		//Option 1 | 1649165400000 | 1649178000000
		return dayjs(Number(slot.split(' | ')[1])).format('H:mm');
	}
	function getEndFromTimeSlot(slot: string) {
		//Option 1 | 1649165400000 | 1649178000000
		return dayjs(Number(slot.split(' | ')[2])).format('H:mm');
	}

	function getDateFromTimeSlot(slot: string) {
		return dayjs(Number(slot.split(' | ')[1])).format('DD.MM.YY');
	}

	onDestroy(() => {
		participants.set([]);
	});

	function getCheckboxValue(options: Option[]): number {
		if (options[0]) {
			return options[0].state;
		}
		return 0;
	}

	function setCheckboxValue(participant: Participant, option: string, newState: number) {
		const test = participant.option.find((o) => o.name === option);
		if (test === undefined) {
			participant.option.push({ name: option, state: newState });
		} else {
			test.state = newState;
		}
	}
</script>

{#if data.poll !== undefined}
	{#if data.poll.title === ''}
		<!-- <LoadingPoll /> -->
	{:else}
		<!-- <Share /> -->
		<div class="mx-auto max-w-4xl rounded overflow-hidden">
			<div class="px-6 py-4">
				<div class="font-bold text-xl">{data.poll.title}</div>
				<div class="font-normal mb-8">
					by {data.poll.name}
					• {formatCreated(data.poll.created)}
				</div>
				<div class="space-y-8 mb-8">
					{#if data.poll.location !== ''}
						<div class="flex gap-4">
							<div class="text-right col-end-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="ml-auto h-full bi bi-geo-alt"
									viewBox="0 0 16 16"
								>
									<path
										d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
									/>
									<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
							</div>
							<span class="text-left">{data.poll.location}</span>
						</div>
					{/if}
					{#if data.poll.note !== ''}
						<div class="flex gap-4">
							<div class="text-right col-end-2">
								<svg
									class="ml-auto h-full bi bi-geo-alt"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									viewBox="0 0 16 16"
								>
									<path
										fill-rule="evenodd"
										d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
									/>
								</svg>
							</div>
							<span class="text-left">{data.poll.note}</span>
						</div>
					{/if}

					{#if data.poll.settings.deadline}
						<div class="flex gap-4">
							<div class="text-right col-end-2">
								<svg
									class="ml-auto h-full bi bi-geo-alt"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									viewBox="0 0 16 16"
								>
									<path
										d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"
									/>
								</svg>
							</div>
							<div class="text-left col-start-2 col-end-4">
								{formatDate(data.poll.settings.deadlineValue)}
							</div>
						</div>
					{/if}

					{#if data.poll.settings.voteLimit}
						<div class="flex gap-4">
							<div class="text-right col-end-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="ml-auto h-full"
									viewBox="0 0 16 16"
								>
									<circle cx="8" cy="8" r="1.5" />
									<path
										d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"
									/>
								</svg>
							</div>
							<div class="text-left col-start-2 col-end-4">
								{`Everyone has ${data.poll.settings.voteLimitAmount} vote(s)`}
							</div>
						</div>
					{/if}
				</div>
				<!-- View for mobile -->
				<div class="flex">
					<select
						bind:value={selectedParticipant}
						class="{iParticipate
							? 'w-3/4'
							: 'w-full'} rounded-md mx-1 border-2 bg-transparent border-gray-200 placeholder-gray-300"
					>
						<option value="default">{$participants.length} participants</option>
						{#each $participants as participant}
							<option value={participant.id}>{participant.name}</option>
						{/each}
					</select>
					{#if deadlineIsNotReachedValue}
						{#if iParticipate}
							<button
								on:click={() => (showChangeNameModal = true)}
								class="w-1/4 bg-indigo-500 text-white mx-1 rounded"
								title="You can only edit your own choices">Edit</button
							>
							<ChangeName pollId={data.id} bind:show={showChangeNameModal} />
						{:else}
							<button
								on:click={() => participate()}
								class="inline-flex justify-center w-1/4 bg-indigo-500 mx-1 text-white rounded"
								>New
							</button>
						{/if}
					{/if}
				</div>
				<!-- List the Options -->
				<div class="divide-y mt-4">
					{#if browser}
						{#each data.poll.option as option}
							{#if option !== ''}
								<div class="flex">
									<div class="flex grow items-center">
										<div class="grow text-left my-auto py-2">
											{#if data.poll.optionType === 'week'}
												<TimeCard slot={option} />
											{:else if option !== ''}
												<p class="py-2 px-5">
													{option}
												</p>
											{/if}
										</div>

										<div class="flex flex-col items-end mr-2">
											<div class="mt-1 -mr-1">
												<div class="-space-x-1">
													{#each $participants as participant}
														{#if deadlineIsNotReachedValue && selectedParticipant === $pair?.pub && participant.id === $pair?.pub}
															<CheckboxYNINB
																value={getCheckboxValue(
																	participant.option?.filter((o) => o.name === option)
																)}
																on:test={(event) =>
																	setCheckboxValue(participant, option, event.detail.value)}
																twoOptions={!data.poll.settings.treeOptions}
																{option}
															/>
														{:else if selectedParticipant !== $pair?.pub}
															{#if participant.option
																?.filter((o) => o.name === option)
																.filter((o) => o.state === 1).length > 0}
																<span
																	title={participant.name}
																	class="inline-block h-5 w-5 shrink-0 rounded-full text-center text-gray-600 bg-green-400 text-xs leading-5 ring-1 ring-white font-bold"
																	>{String(participant.name).slice(0, 1).toLocaleUpperCase()}</span
																>
															{/if}
															{#if participant.option
																?.filter((o) => o.name === option)
																.filter((p) => p.state === -1).length > 0}
																<span
																	title={participant.name}
																	class="inline-block h-5 w-5 shrink-0 rounded-full text-center text-gray-600 bg-yellow-400 text-xs leading-5 ring-1 ring-white font-bold"
																	>{String(participant.name).slice(0, 1).toLocaleUpperCase()}</span
																>
															{/if}{/if}
													{/each}
												</div>
											</div>
										</div>
									</div>
								</div>
							{/if}
						{/each}
					{/if}
				</div>

				<button
					on:click={() => save()}
					class="inline-flex mt-5 bg-gray-300 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0"
					style="margin-top: 1rem"
				>
					Save
				</button><!--
				<h2 class="text-2xl mt-8">Comments</h2>
				{#if data.poll.comments !== undefined}
					{#each data.poll.comments as comment}
						<div class="flex my-4 gap-4">
							<div class="text-right col-end-2">
								<span class="text-gray-500"
									>{comment.name}
									said on {comment.getPrintableDate()}</span
								>
							</div>
							<div class="text-left ml-2 col-start-2 col-end-4">
								<span class="">{comment.comment}</span>
							</div>
						</div>
					{/each}
				{/if}

				 <div class="flex mx-auto items-center justify-center mt-t max-w-lg">
					<form
						on:submit|preventDefault={addComment}
						class="w-full max-w-xl  bg-white rounded-lg px-4 pt-2"
					>
						<div class="flex flex-wrap -mx-3 mb-6">
							<span class="px-4  pt-3 pb-2 text-gray-800 text-lg"
								>Add a new comment as</span
							>
							<select
								bind:value={newComment.name}
								class="bg-transparent my-auto h-min border-solid border-2 rounded border-gray-400"
							>
								<option
									value={$myName}
									class="bg-transparent border-solid border-2 rounded border-gray-400"
									>{$myName}</option
								>
								<option
									value="Anonymous"
									class="bg-transparent border-solid border-2 rounded border-gray-400"
								>
									Anonymous
								</option>
							</select>
							<div class="w-full md:w-full px-3 mb-2 mt-2">
								<textarea
									bind:value={newComment.comment}
									class="bg-gray-100   rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
									name="body"
									placeholder="Type Your Comment"
									required
								/>
							</div>
							<div class="w-full flex items-start md:w-full px-3">
								<div class="-mr-1">
									<input
										type="submit"
										class="inline-flex items-center  bg-gray-300 border-0 py-1 px-3 focus:outline-none  hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
										value="Post Comment"
									/>
								</div>
							</div>
						</div>
					</form>
				</div> -->
			</div>
		</div>
	{/if}
{/if}
