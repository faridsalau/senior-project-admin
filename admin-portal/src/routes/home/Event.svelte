<script lang="ts">
	// import type { Event } from '../../types';
	import { authProvider } from '../../auth';
	export let event: any;
	let isVisible = false;
	let disabled = false;
	let initPoints = event.points;
	let points = event.points;
	const { updateEventPoints } = authProvider;
	const handleClick = () => {
		disabled = true;
		if (points === initPoints) {
			disabled = false;
			return;
		} else if (points > 10000) {
			alert('Maximum points for event = 10000');
			return;
		}
		updateEventPoints(event.id, points)
			.then((success) => {
				if (success) {
					initPoints = points;
					alert(`Points for event ${event.title} updated to ${points}`);
				} else {
					alert('Could not update event points, please try again');
				}
			})
			.catch(() => {
				alert('Something went wrong, please try again');
			});
		event = {
			...event,
			points
		};
		disabled = false;
		isVisible = false;
	};
</script>

<div class="flex-col bg-white shadow mt-2 p-1 rounded group cursor-pointer">
	<div class="flex justify-between">
		<a href={event.url} title={event.url}>{event.title}</a>
		<span
			on:click={() => {
				if (event.points === initPoints) {
					points = initPoints;
				}
				isVisible = !isVisible;
			}}
			class="bg-blue-400 cursor-pointer rounded-lg text-white"
			style="padding: 0 .5rem;"
			>{!isVisible ? 'Set Event Points' : 'Close'}
		</span>
	</div>
	{#if isVisible}
		<div class="mt-2 flex justify-between">
			<input
				bind:value={points}
				{disabled}
				class="focus:outline-none focus:border-b-2 focus:border-blue-500 w-10/12"
				type="number"
				placeholder={event.points}
			/>
			<button
				on:click={handleClick}
				{disabled}
				class="bg-blue-400 cursor-pointer p-1 rounded-lg text-white">Update</button
			>
		</div>
	{/if}
</div>
