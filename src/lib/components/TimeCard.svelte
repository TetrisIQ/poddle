<script lang="ts">
	import dayjs from 'dayjs';
	export let slot;

	function getTitleFromTimeSlot(slot: string) {
		//Option B | 1687957200 | 1687957200
		return slot.split(' | ')[0];
	}
	function getStartFromTimeSlot(slot: string) {
		return dayjs.unix(Number(slot.split(' | ')[1])).format('H:mm');
	}
	function getEndFromTimeSlot(slot: string) {
		return dayjs.unix(Number(slot.split(' | ')[2])).format('H:mm');
	}

	function getDateFromTimeSlot(slot: string) {
		return dayjs.unix(Number(slot.split(' | ')[1])).format('ddd DD.MM.YY');
	}
</script>

<div class="flex my-1 py-2 w-fit border-gray-600 border-solid rounded border-2">
	<div
		class="item w-16 flex text-centerOption text-center items-center justify-center border-r-2 border-gray-600"
	>
		{getTitleFromTimeSlot(slot)}
	</div>
	<div class="item mx-4">
		<div class="flex flex-col">
			<div class="item flex items-end">
				{getStartFromTimeSlot(slot)} - {getEndFromTimeSlot(slot)}
			</div>
			<div class="item flex items-start">{getDateFromTimeSlot(slot)}</div>
		</div>
	</div>
</div>
