<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import { authProvider } from '../../auth';
	const { fetchUser } = authProvider;
	let events = [];
	let user = {};
	let loading = true;
	let error = false;
	onMount(() => {
		const hash = $page.path.split('/')[2];
		fetchUser(hash)
			.then((data) => {
				if (data) {
					const val = data.data();
					user = val;
					events = val.fullEventsAttended;
					loading = false;
				} else {
					loading = false;
					error = true;
				}
			})
			.catch(() => {
				loading = false;
				error = true;
			});
	});

	let searchTerm = '';
	$: results = events.filter(
		(item) => item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
</script>

{#if loading}
	<div class="flex justify-center m-4">
		<Circle size="60" color="#c9dcfd" unit="px" />
	</div>
{:else if !loading && error}
	<div class="flex justify-center items-center m-10">
		<p class="text-red-500">Could not fetch user, please try again</p>
	</div>
{:else}
	<div class="flex justify-end w-full mt-2 ">
		<input
			bind:value={searchTerm}
			class="focus:outline-none"
			type="text"
			placeholder="Search by event title"
		/>
	</div>
	<h1 class="m-4 text-4xl font-bold">{`${user.firstName} ${user.lastName}'s Event History`}</h1>
	{#each results as event}
		<div class="bg-gray-200 w-11/12 m-4 p-4 border shadow flex-col">
			<p>Event Title: {event.title}</p>
			<p>Event Date: {event.month} {event.day}</p>
		</div>
	{/each}
{/if}
