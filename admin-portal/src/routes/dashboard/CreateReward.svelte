<script lang="ts">
	import type { Reward } from '../../types';
	import Dropzone from 'svelte-file-dropzone';
	const maxLength = 100;
	const accept = ['image/jpeg', 'image/png'];

	let files = {
		accepted: [],
		rejected: []
	};

	$: lastIdx = files.accepted.length - 1;
	$: fileUrl = files.accepted.length === 0 ? '' : URL.createObjectURL(files.accepted[lastIdx]);

	const handleFileSelect = (e) => {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	};

	let reward: Reward = {
		name: '',
		description: '',
		redemptionCode: '',
		points: '',
		quantity: ''
	};
</script>

<div class="flex-col justify-center m-12 p-6 shadow rounded">
	<h1 class="text-3xl text-center">Create Reward</h1>
	<form on:submit|preventDefault={() => console.log('submitted')}>
		<input
			bind:value={reward.name}
			type="text"
			placeholder="Name"
			class="focus:outline-none focus:border-b-2 focus:border-blue-500 w-full m-4"
		/>
		<input
			bind:value={reward.description}
			type="text"
			placeholder="Description (max length: {maxLength})"
			maxlength={maxLength}
			class="focus:outline-none focus:border-b-2 focus:border-blue-500 w-full m-4"
		/>
		{#if reward.description.length > 90}
			<p>{maxLength - reward.description.length} characters remaining</p>
		{/if}
		<input
			bind:value={reward.points}
			type="number"
			title="Points needed to redeem"
			placeholder="Points needed to redeem"
			class="focus:outline-none focus:border-b-2 focus:border-blue-500 m-4 w-full"
		/>
		<input
			bind:value={reward.quantity}
			type="number"
			title="Quantity"
			placeholder="Quantity"
			class="focus:outline-none focus:border-b-2 focus:border-blue-500 m-4 w-full"
		/>
		<input
			bind:value={reward.redemptionCode}
			type="text"
			title="Redemption Code"
			placeholder="Redemption Code"
			class="focus:outline-none focus:border-b-2 focus:border-blue-500 m-4 w-full"
		/>
		<Dropzone multiple={false} {accept} on:drop={handleFileSelect} />
		<div class="flex justify-end">
			<button type="submit" class="bg-blue-500 text-white p-2 rounded m-4 ">Create Reward</button>
		</div>
	</form>
</div>
