<script lang="ts">
	import type { Status } from '../../types';
	export let event: any;
	const isActive =
		new Date(`${event.month} ${event.day} ${new Date().getFullYear()}`) <= new Date();
	const status: Status = isActive ? 'Active' : 'Inactive';
</script>

<tr>
	<td class="px-6 py-4 whitespace-nowrap">
		<div class="flex items-center">
			<div class="ml-4">
				<div class="text-sm font-medium text-gray-900">{event.title}</div>
				<div class="text-sm text-gray-500">{`${event.month} ${event.day}`}</div>
			</div>
		</div>
	</td>
	<td class="px-6 py-4 whitespace-nowrap">
		<div class="text-sm text-gray-900">{event.attendance}</div>
	</td>
	<td class="px-6 py-4 whitespace-nowrap">
		<span
			class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
				isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
			}`}
		>
			{status}
		</span>
	</td>
	<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> {event.points} </td>
	<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
		<button type="text" class="text-red-600 hover:text-red-900">Delete</button>
	</td>
</tr>
