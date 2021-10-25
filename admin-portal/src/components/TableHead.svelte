<script lang="ts">
	export let titles: string[];
</script>

<thead class="bg-gray-50">
	<tr>
		{#each titles as title}
			<th
				scope="col"
				class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
			>
				{title}
			</th>
		{/each}
	</tr>
</thead>
