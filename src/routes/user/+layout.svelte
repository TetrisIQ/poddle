<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let selected = $page.url.pathname.includes('account') ? 'account' : 'polls';

	function change(name: string) {
		selected = name;
		goto(`${name}`);
	}
</script>

<div class="flex">
	<!-- Start SideNav -->
	<div class="flex w-min ml-80 mt-12">
		<ul class="">
			<li class="">
				<button on:click={() => change('polls')} class="py-2 flex">
					{#if selected === 'polls'}
						<span class="my-auto bg-indigo-400 h-4 w-1" />
					{/if}
					<span class="flex ml-1 rounded-r-full pr-2 {selected === 'polls' ? 'bg-gray-200' : ''}">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="mx-2 my-auto"
							viewBox="0 0 16 16"
						>
							<path
								d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"
							/>
						</svg>
						MyPolls
					</span>
				</button>
			</li>
			<li class="">
				<button on:click={() => change('account')} class="py-2 flex">
					{#if selected === 'account'}
						<span class="my-auto bg-indigo-400 h-4 w-1" />
					{/if}
					<span class="flex ml-1 rounded-r-full pr-2 {selected === 'account' ? 'bg-gray-200' : ''}">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="mx-2 my-auto"
							viewBox="0 0 16 16"
						>
							<path
								fill-rule="evenodd"
								d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
							/>
							<path
								fill-rule="evenodd"
								d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
							/>
						</svg>
						Account
					</span>
				</button>
			</li>
		</ul>
	</div>
	<!-- Start Content area -->
	<div class="w-full ml-16 text-left mt-14">
		<slot />
	</div>
</div>
