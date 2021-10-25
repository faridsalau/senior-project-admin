<script>
	import User from './User.svelte';
	const users = [
		{
			name: 'Jane Cooper',
			email: 'jane.cooper@email.com'
		},
		{
			name: 'John Doe',
			email: 'john.doe@email.com'
		},
		{
			name: 'Brue Lee',
			email: 'bruce.lee@email.com'
		}
	];

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
