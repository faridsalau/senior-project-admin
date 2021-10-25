<script lang="ts">
	import type { Event } from '../../types';
	export let event: Event;
	let isVisible = false;
</script>

<div class="flex-col bg-white shadow mt-2 p-1 rounded group">
	<div class="flex justify-between">
		<a href={event.url} title={event.url}>{event.title}</a>
		<span
			on:click={() => {
				isVisible = !isVisible;
			}}
			class="bg-blue-400 cursor-pointer p-1 rounded-lg text-white hidden group-hover:block"
			>{!isVisible ? 'Set Event Points' : 'Close'}
		</span>
	</div>
	{#if isVisible}
		<div class="mt-2 flex justify-between">
			<input
				class="focus:outline-none focus:border-b-2 focus:border-blue-500"
				type="number"
				placeholder="Points"
			/>
			<button class="bg-blue-400 cursor-pointer p-1 rounded-lg text-white">Update</button>
		</div>
	{/if}
</div>
