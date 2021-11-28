<!-- show previous events, how many people attended, how many points were redeemed -->
<script lang="ts">
	import EventData from './EventData.svelte';
	import Table from '../../components/Table.svelte';
	import { onMount } from 'svelte';
	import { authProvider } from '../../auth';
	import { Circle } from 'svelte-loading-spinners';
	const titles: string[] = ['Name and Date', 'Attendance', 'Status', 'Points', ''];
	let loading = true;
	let events = [];

	//TODO: write cronjob that adds events based on hash
	onMount(async () => {
		const { fetchEvents } = authProvider;
		const eventData = await fetchEvents();
		eventData.forEach((doc) => {
			events.push(doc.data());
		});
		loading = false;
	});
</script>

{#if events.length > 0 && !loading}
	<Table {titles}>
		{#each events as event}
			<EventData {event} />
		{/each}
	</Table>
{:else if loading}
	<div class="flex justify-center m-4">
		<Circle size="60" color="#c9dcfd" unit="px" />
	</div>
{:else if !loading}
	<div class="flex justify-center mt-4 text-gray-600 shadow p-4 bg-gray-100">
		<p>No upcoming events :)</p>
	</div>
{/if}
