<script lang="ts">
	import SimpleTimePicker from '$lib/components/ModalElements/CalendarModal/SimpleTimePicker.svelte';
	import { tuiApi, events } from '$lib/store/createStore';
	import dayjs from 'dayjs';

	export let show = false;
	export let item;

	function cancel() {
		show = false;
	}

	function save() {
		$tuiApi.updateSchedule(item.id, item.calendarId, item);
		console.log(item);
		let event = $events.get(item.id);
		event.title = item.title;
		event.end = item.end;
		event.start = item.start;
		$events = $events;
		show = false;
	}

	function removeSchedule(): any {
		$tuiApi.deleteSchedule(item.id, item.calendarId);
		show = false;
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
					<div class="text-gray-900 font-medium text-lg">Change Event</div>
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
					<!-- Content -->
					<div class="grid grid-rows-3 grid-flow-col gap-4">
						<!-- Title  -->
						<div
							class="my-2 mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
						>
							<div>
								<button
									class="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-12 h-12 text-white"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 text-gray-900"
										fill="none"
										viewBox="0 0 16 16"
										stroke="currentColor"
									>
										<path
											d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z"
										/>
									</svg>
								</button>
							</div>

							<div class="  w-full">
								<input
									type="text"
									class="w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
									placeholder="Title"
									bind:value={item.title}
								/>
							</div>
						</div>
						<!-- Start/End Time -->
						<div class="grid grid-cols-2 gap-4">
							<div class="flex my-auto">
								<span class="text-xl mr-2 my-auto font-bold">Start Time:</span>
								<SimpleTimePicker bind:value={item.start} />
							</div>
							<div class="flex my-auto">
								<span class="text-xl mr-2 my-auto font-bold">End Time:</span>
								<SimpleTimePicker bind:value={item.end} />
							</div>
						</div>
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
						on:click={() => save()}
						class="mx-5 bg-transparent ml-auto hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
					>
						Save
					</button>
					<button
						on:click={() => removeSchedule()}
						class="mx-5 bg-transparent ml-auto hover:bg-gray-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
					>
						Remove
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
