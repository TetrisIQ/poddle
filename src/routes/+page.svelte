<script lang="ts">
</script>

<section class="dark:text-gray-400 dark:bg-gray-900 min-h-full text-gray-600 body-font">
	<div class="container mx-auto flex px-5 pt-12 sm:pt-24 pb-16 md:flex-row flex-col items-center">
		<div
			class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center"
		>
			<h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium dark:text-white text-gray-900">
				Meetings made simple!
				<br class="hidden lg:inline-block" />With Poddle
			</h1>
			<p class="mb-8 leading-relaxed">
				Save time scheduling your day<br />
				All your information are encrypted. So only you decide who can view them!
			</p>
			<div class="flex justify-center">
				<button
					on:click={() => console.log('createPoll')}
					class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
				>
					Start now
				</button>
				<button
					on:click={() => window.open('https://github.com/tetrisiq/poddle', '_blank')}
					class="ml-4 inline-flex dark:text-gray-400 dark:bg-gray-800 text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-200 rounded text-lg"
				>
					Learn more
				</button>
			</div>
		</div>
		<div class="lg:max-w-lg hidden sm:block lg:w-full md:w-1/2 w-5/6">
			<img
				class="object-cover object-center rounded"
				alt="hero"
				height="920"
				width="800"
				src="Element1.png"
			/>
			<a href="https://www.freepik.com">Origin by pch.vector / Freepik</a>
		</div>
	</div>
</section>

<section class="container text-left mx-auto px-5 md:flex-row flex-col items-center">
	<h2 class="text-2xl text-left sm:text-3xl mb-8 font-medium dark:text-white text-gray-900">
		Everything you need to know
	</h2>
	<div class="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-12 mb-20">
		<div class="col-span-2 md:col-span-1">
			<div class="mb-4 inline-block rounded-2xl bg-indigo-100/50 p-3 text-indigo-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8"
					fill="none"
					viewBox="0 0 16 16"
					stroke="currentColor"
				>
					<path
						d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z"
					/>
				</svg>
			</div>
			<h3 class="heading-sm flex items-center">Week selection</h3>
			<p class="text">
				Poddle lets you pick your timeslots in a calendar and create a Poll out of these.
			</p>
		</div>
		<hr class="md:hidden" />
		<div class="col-span-2 md:col-span-1">
			<div class="mb-4 inline-block rounded-2xl bg-indigo-100/50 p-3 text-indigo-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 18h.01M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"
					/></svg
				>
			</div>
			<h3 class="heading-sm">Mobile friendly design</h3>
			<p class="text">Poddle is optimized for mobile devices so you can use it on the go.</p>
		</div>
		<hr class="md:hidden" />
		<div class="col-span-2 md:col-span-1">
			<div class="mb-4 inline-block rounded-2xl bg-indigo-100/50 p-3 text-indigo-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					class="h-8 w-8"
					viewBox="0 0 16 16"
				>
					<path
						d="M5.164 14H15c-.299-.199-.557-.553-.78-1-.9-1.8-1.22-5.12-1.22-6 0-.264-.02-.523-.06-.776l-.938.938c.02.708.157 2.154.457 3.58.161.767.377 1.566.663 2.258H6.164l-1 1zm5.581-9.91a3.986 3.986 0 0 0-1.948-1.01L8 2.917l-.797.161A4.002 4.002 0 0 0 4 7c0 .628-.134 2.197-.459 3.742-.05.238-.105.479-.166.718l-1.653 1.653c.02-.037.04-.074.059-.113C2.679 11.2 3 7.88 3 7c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0c.942.19 1.788.645 2.457 1.284l-.707.707zM10 15a2 2 0 1 1-4 0h4zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75L.625 15.625z"
					/>
				</svg>
			</div>
			<h3 class="heading-sm">No Emails</h3>
			<p class="text">
				Poddle don't need your email address. So you don't get Email Notification. Instead, you can
				leave the window open, and receive desktop notification.
			</p>
		</div>
		<hr class="md:hidden" />
		<div class="col-span-2 md:col-span-1">
			<div class="mb-4 inline-block rounded-2xl bg-indigo-100/50 p-3 text-indigo-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2v4l-4-4H9a1.994 1.994 0 0 1-1.414-.586m0 0L11 14h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2v4l.586-.586z"
					/></svg
				>
			</div>
			<h3 class="heading-sm">Comments</h3>
			<p class="text">
				Got a question or just have something to say? You can comment on polls to start a
				discussion.
			</p>
		</div>
		<hr class="md:hidden" />
		<div class="col-span-2 md:col-span-1">
			<div class="mb-4 inline-block rounded-2xl bg-indigo-100/50 p-3 text-indigo-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2v4l-4-4H9a1.994 1.994 0 0 1-1.414-.586m0 0L11 14h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2v4l.586-.586z"
					/></svg
				>
			</div>
			<h3 class="heading-sm">No login required</h3>
			<p class="text">
				No one wants to create an Account before answering a Poll. Here you don't even need an
				Account to create a Poll.
			</p>
		</div>
		<hr class="md:hidden" />
		<div class="col-span-2 md:col-span-1">
			<div class="mb-4 inline-block rounded-2xl bg-indigo-100/50 p-3 text-indigo-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					class="h-8 w-8"
					stroke-width="2"
					viewBox="0 0 16 16"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"
					/>
				</svg>
			</div>
			<h3 class="heading-sm">Open-source</h3>
			<p class="text">
				Every decentralised application should be fully open-source, so we are too. The codebas is
				available on github.
			</p>
		</div>
		<hr class="md:hidden" />
		<div class="col-span-2 md:col-span-1">
			<div class="mb-4 inline-block rounded-2xl bg-indigo-100/50 p-3 text-indigo-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					class="h-8 w-8"
					stroke-width="2"
					viewBox="0 0 16 16"
				>
					<path
						d="M14 10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h12zM2 9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2z"
					/>
					<path
						d="M5 11.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM14 3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
					/>
					<path d="M5 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
				</svg>
			</div>
			<h3 class="heading-sm">Self-hostable</h3>
			<p class="text">
				Again a decentralised application should be fully open-source, so we are too. The codebas is
				available on github.
			</p>
		</div>
		<hr class="md:hidden" />
		<div class="col-span-2 md:col-span-1">
			<div class="mb-4 inline-block rounded-2xl bg-indigo-100/50 p-3 text-indigo-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
					class="w-8 h-8"
					><path
						fill-rule="evenodd"
						d="M10 0a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm4.905 3.68A8 8 0 0 0 3.68 14.906l3.296-3.296-.007-.022H5.531l-.253.835H4L5.44 8.06h1.62l.86 2.606.64-.64V8.06h1.662c.1 0 .197.004.291.013l4.393-4.393zm-4.908 7.738 1.222-1.223v.046c0 .305-.04.542-.121.712a.703.703 0 0 1-.35.36 1.32 1.32 0 0 1-.551.105h-.2zM8.99 12.423h1.248c.443 0 .828-.086 1.153-.26.325-.174.577-.424.754-.75.178-.326.266-.717.266-1.171 0-.395-.067-.74-.202-1.038l4.11-4.11A8 8 0 0 1 5.095 16.32l3.896-3.897zm5.802-3.332a.46.46 0 0 1 .16.332h1.134a1.34 1.34 0 0 0-.214-.748 1.367 1.367 0 0 0-.594-.498A2.177 2.177 0 0 0 14.365 8c-.345 0-.651.058-.918.175a1.48 1.48 0 0 0-.625.488 1.2 1.2 0 0 0-.221.726c-.002.341.108.61.33.808.223.196.528.336.914.42l.435.093c.162.036.29.074.385.115a.51.51 0 0 1 .205.137.27.27 0 0 1 .066.174.307.307 0 0 1-.068.19.43.43 0 0 1-.194.13.931.931 0 0 1-.318.047.985.985 0 0 1-.39-.07.558.558 0 0 1-.251-.207.668.668 0 0 1-.1-.337H12.49c.001.365.08.665.234.9.156.232.375.405.656.517.283.112.614.168.993.168.37 0 .686-.051.949-.155.264-.104.467-.255.609-.454a1.23 1.23 0 0 0 .215-.729 1.337 1.337 0 0 0-.08-.46 1.055 1.055 0 0 0-.242-.38 1.475 1.475 0 0 0-.421-.295 2.691 2.691 0 0 0-.62-.203l-.358-.076a1.988 1.988 0 0 1-.269-.073.836.836 0 0 1-.185-.09.345.345 0 0 1-.107-.112.278.278 0 0 1-.028-.143.289.289 0 0 1 .058-.17.361.361 0 0 1 .17-.118.854.854 0 0 1 .3-.044c.193 0 .335.04.43.119zm-8.526.17.435 1.44h-.904l.435-1.44h.034z"
						clip-rule="evenodd"
					/></svg
				>
			</div>
			<h3 class="heading-sm">Add free</h3>
			<p class="text">Everyone hates Adds. So Poddle don't use them.</p>
		</div>
	</div>
</section>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
