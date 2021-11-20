<script lang="ts">
	import type { Event as EventType } from '../../types';
	import { Circle } from 'svelte-loading-spinners';
	import { fade } from 'svelte/transition';
	import Event from './Event.svelte';
	export let events: EventType[];
	export let loading: boolean;
</script>

{#if events.length > 0 && !loading}
	<div in:fade class="m-12 p-4 bg-gray-200 rounded">
		<h1 class="text-3xl text-center">Upcoming Events</h1>
		{#each events as event}
			<Event {event} />
		{/each}
	</div>
{:else if loading}
	<div class="flex justify-center m-4">
		<Circle size="60" color="#c9dcfd" unit="px" />
	</div>
{:else if !loading}
	<div class="flex justify-center mt-4 text-gray-600 shadow p-4 bg-gray-100">
		<p>No upcoming events :)</p>
	</div>
{/if}
