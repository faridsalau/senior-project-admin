<!-- allow user to update reward, delete reward, pause reward?, see most redeemed rewards, view previous rewards -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import Table from '../../components/Table.svelte';
	import { authProvider } from '../../auth';

	import RewardData from './RewardData.svelte';
	let rewards: any[] = [];
	let loading = true;
	const titles: string[] = ['Reward Name', 'Quantity', 'Points Needed', '', ''];
	onMount(async () => {
		const { fetchRewards } = authProvider;
		try {
			const rewardData = await fetchRewards();
			rewardData.forEach((doc) => {
				rewards.push(doc.data());
			});
			loading = false;
		} catch {
			alert('Something went wrong, please reload and try again');
		}
	});
</script>

{#if rewards.length > 0 && !loading}
	<Table {titles}>
		{#each rewards as reward}
			<RewardData {reward} />
		{/each}
	</Table>
{:else if loading}
	<div class="flex justify-center m-4">
		<Circle size="60" color="#c9dcfd" unit="px" />
	</div>
{:else if !loading}
	<div class="flex justify-center mt-4 text-gray-600 shadow p-4 bg-gray-100">
		<p>No rewards found :)</p>
	</div>
{/if}
