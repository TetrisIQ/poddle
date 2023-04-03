<script lang="ts">
	import { messages } from '$lib/gun/gunStore';
	import { onMount } from 'svelte';
	import { gun } from '../lib/gun/gunStore';

	import type { PageData } from './$types';

	// The pageDatas are server side rendered (ssr)
	export let data: PageData;
	messages.set(data.chats); // Set the ssr data to a svelte store (to make it updateable in the ui)

	onMount(async () => {
		// Call the data with .on, if datas are updated in the network we will get the updated data and can display them
		gun.get('chat').on((data) => {
			if (data === undefined) {
				return [];
			}
			$messages = JSON.parse(data.m);
		});
	});
	let message: string;
	function sendMessage() {
		if (message !== '') {
			$messages.push(message);
			gun.get('chat').put({ m: JSON.stringify($messages) });
			$messages = $messages;
			message = '';
		}
	}
</script>

<div class="flex flex-col justify-center items-center space-y-1">
	<div class="item h-32"><h1 class="text-3xl font-bold underline">SvelteKit / GUN example</h1></div>

	{#if $messages !== undefined}
		{#each $messages as comment}
			<div class="flex my-4 gap-4">
				<div class="text-right col-end-2">
					<span class="text-gray-500">Someone said </span>
				</div>
				<div class="text-left ml-2 col-start-2 col-end-4">
					<span class="">{comment}</span>
				</div>
			</div>
		{/each}
	{/if}

	<div class="flex mx-auto items-center justify-center mt-t max-w-lg">
		<form
			on:submit|preventDefault={sendMessage}
			class="w-full max-w-xl dark:bg-gray-700 bg-white rounded-lg px-4 pt-2"
		>
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full md:w-full px-3 mb-2 mt-2">
					<textarea
						bind:value={message}
						class="bg-gray-100 dark:bg-gray-200 dark:text-black rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
						name="body"
						placeholder="Type Your Comment"
						required
					/>
				</div>
				<div class="w-full flex items-start md:w-full px-3">
					<div class="-mr-1">
						<input
							type="submit"
							class="inline-flex items-center dark:bg-gray-800 bg-gray-300 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
							value="Post Comment"
						/>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
