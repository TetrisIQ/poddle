<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<div class="flex flex-col min-h-screen scroll-smooth">
	<Header />
	<main class="mx-auto flex-grow w-full xl:px-40 l:px-14 text-center">
		<!-- <NotificationArea />
		<Modal /> -->
		<slot />
	</main>
	<Footer />
</div>
