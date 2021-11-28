<script lang="ts">
	import { page } from '$app/stores';

	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import User from '../../components/User.svelte';
	import { authProvider } from '../../auth';
	let attendees: any = [];
	let eventName: string = '';
	let loading = true;
	onMount(() => {
		const eventid = $page.path.split('/')[2];
		eventName = $page.query.get('eventName');
		const { fetchAttendees } = authProvider;
		fetchAttendees(eventid).then((data) => {
			if (data !== false) {
				data.forEach((user) => {
					const name = user.data().firstName + ' ' + user.data().lastName;
					attendees.push({ name, email: user.id, hash: user.data().hash });
				});
			}
			loading = false;
		});
	});
	const src =
		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60';
</script>

{#if attendees.length > 0 && !loading}
	<div class="m-12 p-4 bg-gray-200 rounded">
		<h2 class=" text-lg font-bold">Attendees for Event: {eventName}</h2>
		{#each attendees as user}
			<User {src} {user} />
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
