<!-- show previous events, how many people attended, how many points were redeemed -->
<script lang="ts">
	import EventData from './EventData.svelte';
</script>

<div class="m-4 bg-gray-100">
	<div class="flex flex-col">
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Name and Date
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Attendance
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Status
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Points redeemed
								</th>
								<th scope="col" class="relative px-6 py-3">
									<span class="sr-only">Delete</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							<EventData
								name="Open Access + The Humanities"
								date="10/19"
								status="active"
								attendance={34}
								points={170000}
							/>
							<EventData
								name="Open Access + The Humanities"
								date="10/19"
								status="active"
								attendance={34}
								points={170000}
							/>
							<EventData
								name="Open Access + The Humanities"
								date="10/19"
								status="active"
								attendance={34}
								points={170000}
							/>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
