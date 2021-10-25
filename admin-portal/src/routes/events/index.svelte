<!-- show previous events, how many people attended, how many points were redeemed -->
<script lang="ts">
	import EventData from './EventData.svelte';
	import Table from '../../components/Table.svelte';
	const titles: string[] = ['Name and Date', 'Attendance', 'Status', 'Points', ''];
</script>

<Table {titles}>
	<EventData
		name="Open Access + The Humanities"
		date="10/19"
		status="active"
		attendance={34}
		points={170000}
	/>
	<EventData
		name="Open Access + The Humanities"
		date="10/19"
		status="active"
		attendance={34}
		points={170000}
	/>
	<EventData
		name="Open Access + The Humanities"
		date="10/19"
		status="active"
		attendance={34}
		points={170000}
	/>
</Table>
