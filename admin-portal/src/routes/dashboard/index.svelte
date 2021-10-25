<script context="module">
	export const ssr = false;
</script>

<script lang="ts">
	import CreateReward from './CreateReward.svelte';
	import UpcomingEvents from './UpcomingEvents.svelte';
	import type { Event } from '../../types';
	import { onMount } from 'svelte';
	import { fetchData } from '../../utils';

	const BASE_URL = 'https://senior-project-backed.herokuapp.com';

	let events: Event[] = [];
	onMount(async () => {
		events = await fetchData(BASE_URL + '/api/v1/events');
	});
</script>

<UpcomingEvents {events} />
<CreateReward />
