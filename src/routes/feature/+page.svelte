<script lang="ts">
	import dayjs from 'dayjs';
	import RelativeTime from 'dayjs/plugin/relativeTime';

	dayjs.extend(RelativeTime);

	let gitStars = -1;
	let lastUpdate = dayjs();
	let features = [
		'Vote with "maybe" option',
		'Set deadlines',
		'Limit the votes',
		'Vote only once per Option',
		'You can host it yourself',
		'Full end-to-end encryption (E2EE)',
		'No google analytics'
	];

	// Fetch github API
	fetch('https://api.github.com/repos/tetrisiq/poddle', { method: 'GET', redirect: 'follow' })
		.then((response) => response.json())
		.then((result) => {
			gitStars = result.stargazers_count;
			lastUpdate = dayjs(result.pushed_at);
		})
		.catch((error) => console.log('error', error));
</script>

<h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-600 pt-5">Features</h1>
<div class="flex gap-6 justify-center">
	<div class="mb-6 lg:mb-0 w-1/3">
		<div
			class="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
		>
			<div class="border-b-2 border-neutral-100 border-opacity-100 p-6 text-center">
				<p class="mb-4 text-sm uppercase">
					<strong>Poddle</strong>
				</p>
				<h3 class="mb-6 text-3xl">
					<strong>$ 0</strong>
					<small class="text-base text-neutral-500">/year</small>
				</h3>
			</div>
			<div class="p-6">
				<ol class="list-inside">
					{#each features as feature}
						<li class="mb-4 flex">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								class="mr-3 h-5 w-5 text-primary"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 12.75l6 6 9-13.5"
								/></svg
							>{feature}
						</li>
					{/each}
				</ol>
			</div>
		</div>
	</div>
</div>
<!-- Section: Design Block -->
<section class="  text-gray-600 body-font">
	<div class="container px-5 py-8 mx-auto">
		<div class="flex flex-col text-center w-full mb-5">
			<h2 class="sm:text-3xl text-2xl font-medium title-font mb-4">Statistics</h2>
		</div>
		<div class="flex flex-wrap -m-3 text-center justify-center">
			<div class="p-4 md:w-1/4 sm:w-1/2 w-full">
				<div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class=" text-indigo-500 w-12 h-12 mb-3 inline-block"
						viewBox="0 0 16 16"
						><path
							d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
						/></svg
					>
					<h2 class="title-font font-medium text-3xl text-gray-900">16</h2>
					<p class="leading-relaxed">GitHub Stars</p>
				</div>
			</div>
			<!-- <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
				<div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class=" text-indigo-500 w-12 h-12 mb-3 inline-block"
						viewBox="0 0 16 16"
						><path
							fill-rule="evenodd"
							d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
						/></svg
					>
					<a
						href="https://a.poddle.network"
						target="_blank"
						class="title-font font-medium text-3xl ext-gray-900">Analytics</a
					>
					<p class="leading-relaxed">
						by Plausible <a href="https://plausible.io/" target="_blank">learn more →</a>
					</p>
				</div>
			</div> -->
			<div class="p-4 md:w-1/4 sm:w-1/2 w-full">
				<div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class=" text-indigo-500 w-12 h-12 mb-3 inline-block"
						viewBox="0 0 16 16"
						><path
							fill-rule="evenodd"
							d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
						/><path
							d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
						/></svg
					>
					<h2 class="title-font font-medium text-3xl text-gray-900">4 months ago</h2>
					<p class="leading-relaxed">Last update</p>
				</div>
			</div>
		</div>
	</div>
</section>
