<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="flex justify-center items-center h-full">
	<div class="w-[90%] md:w-[25%] bg-white p-8 rounded-md shadow-xl">
		<img class="mb-3" src="/logo.png" alt="logo" />
		<div>
			{#if form?.missing}
				<aside class="alert variant-ghost-error mb-4">
					<div class="text-error-800">
						You must enter a valid ten digit phone number or email address...
					</div>
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
			{:else if form?.success}
				<aside class="alert variant-ghost-success mb-4">
					<div class="text-success-800">
						An email will be sent with a password reset link to your email address if it matches a
						valid user account.
					</div>
				</aside>
			{/if}
			{#if form?.success}
				<a href="/login" class="btn w-full variant-filled-primary">Continue to Login</a>
			{:else}
				<form method="POST" action="?/reset" use:enhance>
					<label class="mb-1 text-black" for="user">Email Address or Phone Number</label>
					<div>
						<input autofocus required class="mb-2 w-full rounded-md text-black" name="user" />
					</div>
					<button type="submit" class="btn w-full variant-filled-primary">Request Reset Link</button
					>
				</form>
			{/if}
		</div>
	</div>
</div>
