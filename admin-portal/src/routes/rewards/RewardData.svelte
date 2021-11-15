<script lang="ts">
	import type { Status } from '../../types';
	export let name: string;
	export let redemptions: number;
	export let quantity: number;
	export let status: Status;
</script>

<tr>
	<td class="px-6 py-4 whitespace-nowrap">
		<div class="flex items-center">
			<div class="ml-4">
				<div class="text-sm font-medium text-gray-900">{name}</div>
			</div>
		</div>
	</td>
	<td class="px-6 py-4 whitespace-nowrap">
		<div class="text-sm text-gray-900">{redemptions}</div>
	</td>
	<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> {quantity} </td>
	<td class="px-6 py-4 whitespace-nowrap">
		<span
			class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
		>
			{status}
		</span>
	</td>
	<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
		<button type="text" class="text-gray-600 hover:text-gray-900">Edit</button>
	</td>
	<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
		<button type="text" class="text-red-600 hover:text-red-900">Delete</button>
	</td>
</tr>
