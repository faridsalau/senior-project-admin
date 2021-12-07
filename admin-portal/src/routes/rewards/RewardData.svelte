<script lang="ts">
	import { text } from 'svelte/internal';
	import type { Status } from '../../types';
	import { authProvider } from '../../auth';
	import { isEqual } from 'lodash';
	export let reward: any;
	let isOpen = false;
	let deleted = false;

	let newReward = {
		...reward,
		name: reward.name,
		quantity: reward.quantity,
		points: reward.points
	};

	const rewardHasEmptyValues = () => {
		let ret = false;
		Object.values(newReward).forEach((value) => {
			if (!value || value.toString().trim() === '') {
				ret = true;
			}
		});
		return ret;
	};

	const { deleteReward, updateReward } = authProvider;
	const handleUpdate = () => {
		if (rewardHasEmptyValues()) {
			alert('No field can be empty');
			return;
		}
		if (isEqual(reward, newReward)) {
			return;
		}
		if (newReward.points <= 0) {
			alert(`Reward points must be a positive value`);
			return;
		}
		updateReward(reward.id, newReward)
			.then((success) => {
				if (success) {
					reward = newReward;
				} else {
					alert('Something went wrong, please try again');
				}
				isOpen = false;
			})
			.catch(() => {
				alert('Something went wrong, please try again');
				isOpen = false;
			});
	};
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
							bind:value={newReward.name}
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
							bind:value={newReward.quantity}
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
							bind:value={newReward.points}
							type="number"
							class="text-sm  text-gray-600"
							placeholder="Points needed"
						/>
					</div>
				</div>
			</td>
			<td>
				<button
					on:click={handleUpdate}
					type="button"
					class="text-sm font-medium text-gray-600 bg-gray-200 p-2 rounded-sm">Update</button
				>
			</td>
			<td />
		</tr>
	{/if}
{/if}
