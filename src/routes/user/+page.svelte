<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	let selected = $page.url.pathname;
	console.log(selected);
	goto(`user/polls/`);
</script>
