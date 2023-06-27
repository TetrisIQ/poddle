<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import NotificationArea from '$lib/components/Notification/NotificationArea.svelte';
	import { generateNewUsername, password, username, loginAutomatic } from '$lib/store/userStore';
	import { onMount } from 'svelte';
	import '../app.css';
	onMount(async () => {
		if ($username === '') {
			await generateNewUsername();
		}
		loginAutomatic($username, $password);
	});
</script>

<div class="flex flex-col min-h-screen scroll-smooth">
	<Header />
	<main class="mx-auto flex-grow w-full xl:px-40 l:px-14 text-center">
		<NotificationArea />
		<slot />
	</main>
	<Footer />
</div>
