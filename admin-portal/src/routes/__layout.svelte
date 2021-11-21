<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { signOut } from 'firebase/auth';
	import { auth } from '../firebase';
	import type { Route } from '../types';

	const routes: Route[] = [
		{ href: '/home', name: 'Home' },
		{ href: '/users', name: 'Users' },
		{ href: '/events', name: 'Events' },
		{ href: '/rewards', name: 'Rewards' },
		{ href: '/create-admin', name: 'Create Admin' }
	];
	const signOutAndRedirect = () => {
		signOut(auth).then(() => {
			goto('/');
		});
	};
</script>

{#if $page.path !== '/'}
	<nav class="flex justify-between border-b border-gray-400 p-3 bg-white">
		<div>
			{#each routes as route}
				<a
					href={route.href}
					class="underline px-2"
					class:text-blue-500={route.href === $page.path}
					class:text-gray-400={route.href !== $page.path}>{route.name}</a
				>
			{/each}
		</div>
		<!-- svelte-ignore a11y-missing-attribute -->
		<a on:click={signOutAndRedirect} class="px-2 text-gray-400 cursor-pointer">Logout</a>
	</nav>
{/if}

<slot />

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
