<script lang="ts">
	import Logo from './Logo.svelte';
</script>

<footer class="  bg-gray-300 text-gray-600 body-font {$$props.class}">
	<div
		class="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col"
	>
		<div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
			<a
				href="/"
				class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
			>
				<Logo size={40} />
				<span class="ml-3 text-xl">Poddle</span>
			</a>
			<p class="mt-2 text-sm text-gray-500">Meetings made simple!</p>
		</div>
		<div class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
			<div class="lg:w-1/4 md:w-1/2 w-full px-4">
				<a
					href="https://github.com/TetrisIQ/poddle"
					target="_blank"
					class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3"
				>
					GitHub <svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="inline"
						viewBox="0 0 16 16"
					>
						<path
							d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
						/>
					</svg></a
				>
				<nav class="list-none mb-10">
					<li>
						<a
							href="https://github.com/TetrisIQ/poddle/blob/main/CONTRIBUTING.md"
							target="_blank"
							class="  text-gray-600 hover:text-gray-800">How to Contribute</a
						>
					</li>
					<li>
						<a
							href="https://github.com/TetrisIQ/poddle/issues/new?assignees=&labels=bug,UI&template=bug_report.md&title="
							target="_blank"
							class="  text-gray-600 hover:text-gray-800">Report a bug</a
						>
					</li>
					<li>
						<a
							href="https://github.com/TetrisIQ/poddle/issues/new?assignees=&labels=UI&template=feature_request.md&title="
							target="_blank"
							class="  text-gray-600 hover:text-gray-800">Submit a new Feature</a
						>
					</li>
				</nav>
			</div>
			<div class="lg:w-1/4 md:w-1/2 w-full px-4">
				<h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Wiki's</h2>
				<nav class="list-none mb-10">
					<li>
						<a href="https://gun.eco" target="_blank" class="  text-gray-600 hover:text-gray-800"
							>About gun.js</a
						>
					</li>
					<li>
						<a
							href="https://github.com/TetrisIQ/poddle/wiki"
							target="_blank"
							class="  text-gray-600 hover:text-gray-800">Docs</a
						>
					</li>
					<li>
						<a
							href="https://github.com/TetrisIQ/poddle/discussions"
							target="_blank"
							class="  text-gray-600 hover:text-gray-800">Discussion</a
						>
					</li>
				</nav>
			</div>
		</div>
	</div>
</footer>
