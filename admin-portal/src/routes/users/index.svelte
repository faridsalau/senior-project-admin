<script>
	import { onMount } from 'svelte';
	import { authProvider } from '../../auth';
	import User from './User.svelte';
	const { fetchUsers } = authProvider;
	let users = [];
	let searchBy = 1;

	onMount(async () => {
		users = await fetchUsers();
	});

	let searchTerm = '';
	$: results =
		searchBy === 1
			? users.filter((item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
			: users.filter((item) => item.email.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

	const src =
		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60';
</script>

<div class="flex justify-end w-full mt-2 ">
	<input
		bind:value={searchTerm}
		class="focus:outline-none"
		type="text"
		placeholder={`Search by user's ${searchBy === 1 ? 'name' : 'email'}`}
	/>
</div>
<div class="flex justify-end m-4">
	<p class="mr-2">Search By:</p>
	<label class="mr-2">
		<input type="radio" bind:group={searchBy} name="searchBy" value={1} />
		Name
	</label>
	<label>
		<input type="radio" bind:group={searchBy} name="searchBy" value={2} />
		Email
	</label>
</div>

{#each results as user, _ (user.hash)}
	<User {src} {user} />
{/each}
