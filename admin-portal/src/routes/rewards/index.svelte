<!-- allow user to update reward, delete reward, pause reward?, see most redeemed rewards, view previous rewards -->
<script lang="ts">
	import Table from '../../components/Table.svelte';
	import RewardData from './RewardData.svelte';
	const titles: string[] = ['Reward Name', 'Amount of Redemptions', 'Quantity', 'Status', '', ''];
</script>

<Table {titles}>
	<RewardData name="Amazon giftcard" redemptions={24} quantity={5} status="Active" />
	<RewardData name="Walmart giftcard" redemptions={20} quantity={11} status="Active" />
	<RewardData name="Kroger giftcard" redemptions={8} quantity={1} status="Active" />
	<RewardData name="Louis Vuitton giftcard" redemptions={2} quantity={7} status="Active" />
</Table>
