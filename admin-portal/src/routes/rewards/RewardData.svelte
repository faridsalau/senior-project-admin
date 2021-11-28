<script lang="ts">
	import { text } from 'svelte/internal';
	import type { Status } from '../../types';
	import { authProvider } from '../../auth';
	export let reward: any;
	let isOpen = false;
	let deleted = false;
	let name = reward.name;
	let quantity: number = reward.quantity;
	let points: number = reward.points;

	const { deleteReward } = authProvider;
</script>

{#if !deleted}
	<tr>
		<td class="px-6 py-4 whitespace-nowrap">
			<div class="flex items-center">
				<div class="ml-4">
					<div class="text-sm font-medium text-gray-900">{reward.name}</div>
				</div>
			</div>
		</td>

		<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> {reward.quantity} </td>
		<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> {reward.points} </td>

		<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
			<button
				on:click={() => {
					isOpen = !isOpen;
				}}
				type="button"
				class="text-gray-600 hover:text-gray-900">{isOpen ? 'Close' : 'Edit'}</button
			>
		</td>
		<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
			<button
				on:click={async () => {
					await deleteReward(reward.id);
					deleted = true;
				}}
				type="text"
				class="text-red-600 hover:text-red-900">Delete</button
			>
		</td>
	</tr>

	{#if isOpen}
		<tr>
			<td class="px-6 py-4 whitespace-nowrap">
				<div class="flex items-center">
					<div class="ml-4">
						<input
							bind:value={name}
							type="text"
							class="text-sm  text-gray-600"
							placeholder="Name"
						/>
					</div>
				</div>
			</td>
			<td class="px-6 py-4 whitespace-nowrap">
				<div class="flex items-center">
					<div class="ml-4">
						<input
							bind:value={quantity}
							type="number"
							class="text-sm  text-gray-600"
							placeholder="Quantity"
						/>
					</div>
				</div>
			</td>
			<td class="px-6 py-4 whitespace-nowrap">
				<div class="flex items-center">
					<div class="ml-4">
						<input
							bind:value={points}
							type="number"
							class="text-sm  text-gray-600"
							placeholder="Points needed"
						/>
					</div>
				</div>
			</td>
			<td>
				<button type="button" class="text-sm font-medium text-gray-600 bg-gray-200 p-2 rounded-sm"
					>Update</button
				>
			</td>
			<td />
		</tr>
	{/if}
{/if}
