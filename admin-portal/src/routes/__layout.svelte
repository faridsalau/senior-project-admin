<script lang="ts">
	import { page } from '$app/stores';
	import type { Route } from '../types';
	const routes: Route[] = [
		{ href: '/home', name: 'Home' },
		{ href: '/users', name: 'Users' }
	];
</script>

{#if $page.path !== '/'}
	<nav class="border-b border-gray-400 p-3 bg-white">
		{#each routes as route}
			<a
				href={route.href}
				class="underline px-2"
				class:text-blue-500={route.href === $page.path}
				class:text-gray-400={route.href !== $page.path}>{route.name}</a
			>
		{/each}
	</nav>
{/if}

<slot />

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
