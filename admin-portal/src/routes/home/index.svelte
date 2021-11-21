<script context="module">
	export const ssr = false;
</script>

<script lang="ts">
	import CreateReward from './CreateReward.svelte';
	import UpcomingEvents from './UpcomingEvents.svelte';
	// import type { Event } from '../../types';
	import { onMount } from 'svelte';
	import { authProvider } from '../../auth';

	const BASE_URL = 'https://senior-project-backed.herokuapp.com';
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

<UpcomingEvents {events} {loading} />
<CreateReward />
