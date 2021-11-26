<script lang="ts">
	export let src: string;
	export let user;
	const href = `/users/${user.hash}`;
	// import { authProvider } from '../../auth';
	// const { fetchUser } = authProvider;
</script>

<div class="bg-gray-100 flex m-4 p-4 rounded">
	<div class="flex-shrink-0 h-10 w-10">
		<img class="h-10 w-10 rounded-full" {src} alt="" />
	</div>
	<div class="ml-4">
		<div class="text-sm font-medium text-gray-900">{user.name}</div>
		<div class="text-sm text-gray-500">{user.email}</div>
	</div>
	<div class="flex justify-end w-full">
		<a {href} class="bg-gray-400 rounded text-white p-2 mr-2">View Details</a>
		<button type="button" class="bg-red-400 rounded text-white p-2">Delete</button>
	</div>
</div>
