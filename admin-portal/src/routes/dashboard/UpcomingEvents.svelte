<script lang="ts">
	import type { Event as EventType } from '../../types';
	import Event from './Event.svelte';
	export let events: EventType[];
</script>

{#if events.length > 0}
	<div class="m-12 p-4 bg-gray-200 rounded">
		<h1 class="text-3xl text-center">Upcoming Events</h1>
		{#each events as event}
			<Event {event} />
		{/each}
	</div>
{/if}
