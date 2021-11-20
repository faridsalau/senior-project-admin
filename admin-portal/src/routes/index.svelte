<script lang="ts">
	import { authProvider } from '../auth';

	const { sendSignInEmail } = authProvider;

	let email: string = '';
	let isValidEmail = true;
	let error;

	const validateEmail = () => {
		const match = email.match(/^[A-Za-z0-9._%+-]+@olemiss.edu$/);
		isValidEmail = match && match.length > 0;
	};

	const handleSubmit = async () => {
		validateEmail();
		if (!isValidEmail) {
			return;
		}
		try {
			const success = await sendSignInEmail(email);
			if (success) {
				alert(`Sign in email sent to ${email}`);
				email = '';
			} else {
				alert(`Email ${email} not recognized, please try again`);
			}
		} catch (err) {
			error = err;
		}
	};
</script>

<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Sign in to your account
			</h2>
		</div>
		<form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
			<div class="rounded-md shadow-sm -space-y-px">
				<div>
					<label for="email-address" class="sr-only">Email address</label>
					<input
						bind:value={email}
						on:blur={validateEmail}
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
						placeholder="Email address"
					/>
				</div>
			</div>

			{#if !isValidEmail}
				<p class="text-red-500">Must be valid olemiss.edu email</p>
			{/if}

			<div>
				<button
					type="submit"
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<span class="absolute left-0 inset-y-0 flex items-center pl-3">
						<!-- Heroicon name: solid/lock-closed -->
						<svg
							class="h-5 w-5 text-blue-500 group-hover:text-blue-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
					Sign in
				</button>
			</div>
		</form>
	</div>
</div>
