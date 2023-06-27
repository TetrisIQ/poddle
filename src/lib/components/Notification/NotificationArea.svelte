<script lang="ts">
	import NotificationControl, { notificationStore } from './NotificationControl';
	import Notification from './Notification.svelte';
</script>

<div id="notificationArea" class="fixed right-0 z-50 flex-col m-12">
	{#each $notificationStore as notification (notification.id)}
		<Notification
			kind={notification.type}
			title={notification.title}
			subtitle={notification.text}
			info={notification}
			duration={notification.duration}
			on:close={() => NotificationControl.removeInfo(notification)}
		/>
	{/each}
</div>
