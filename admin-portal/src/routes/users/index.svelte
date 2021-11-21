<script>
	import { onMount } from 'svelte';
	import { authProvider } from '../../auth';
	import User from './User.svelte';
	const { fetchUsers } = authProvider;
	let users = [];

	onMount(async () => {
		users = await fetchUsers();
	});

	let searchTerm = '';
	$: results = users.filter(
		(item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	const src =
		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60';
</script>

<div class="flex justify-end w-full mt-2 ">
	<input bind:value={searchTerm} class="focus:outline-none" type="text" placeholder="Search" />
</div>

{#each results as user}
	<User {src} name={user.name} email={user.email} />
{/each}
