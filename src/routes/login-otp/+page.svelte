<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="flex justify-center items-center h-full">
	<div class="w-[80%] md:w-[25%] bg-white p-8 rounded-md shadow-xl">
		<img class="mb-3" src="/logo.png" alt="logo" />
		<div>
			{#if form?.missing}
				<aside class="alert variant-ghost-error mb-4">
					<div class="text-error-800">You must enter a valid ten digit phone number...</div>
				</aside>
			{:else if form?.incorrect}
				<aside class="alert variant-ghost-error mb-4">
					<div class="text-error-800">Invalid credentials...</div>
				</aside>
			{:else if form?.error}
				<aside class="alert variant-ghost-error mb-4">
					<div class="text-error-800">
						There was an error processing your request. Please try again...
					</div>
				</aside>
			{/if}
			<form method="POST" action="?/loginUser" use:enhance>
				<label class="mb-1 text-black" for="user">Phone Number</label>
				<div>
					<input
						autofocus
						type="number"
						min="2011000000"
						max="9999999999"
						class="mb-2 w-full rounded-md text-black"
						name="phone"
					/>
				</div>
				<button type="submit" class="btn w-full variant-filled-primary">Send Text Message</button>
			</form>
		</div>
	</div>
</div>
