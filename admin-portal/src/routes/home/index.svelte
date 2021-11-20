<script context="module">
	export const ssr = false;
</script>

<script lang="ts">
	import CreateReward from './CreateReward.svelte';
	import UpcomingEvents from './UpcomingEvents.svelte';
	import type { Event } from '../../types';
	import { onMount } from 'svelte';
	import { fetchData } from '../../utils';
	import useAuthRedirect from '../../useAuthRedirect';

	const BASE_URL = 'https://senior-project-backed.herokuapp.com';
	let loading = true;
	let events: Event[] = [];

	onMount(async () => {
		events = await fetchData(BASE_URL + '/api/v1/events');
		loading = false;
	});
</script>

<UpcomingEvents {events} {loading} />
<CreateReward />
