<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Password from '$lib/components/Password.svelte';
	export let form;
	let token = '';
	$: token = $page.url.searchParams.get('token') ?? null;
	let password = '';
</script>

<div class="flex justify-center items-center h-full">
	<div class="w-[90%] md:w-[25%] bg-white p-8 rounded-md shadow-xl">
		<img class="mb-3" src="/logo.png" alt="logo" />
		<div>
			{#if form?.invalidPassword}
				<aside class="alert variant-ghost-error mb-4">
					<div class="text-error-800">
						Please choose a new password that meets all of the criteria as layed out below
					</div>
				</aside>
			{:else if form?.incorrect}
				<aside class="alert variant-ghost-error mb-4">
					<div class="text-error-800">Invalid credentials...</div>
				</aside>
			{:else if form?.success}
				<aside class="alert variant-ghost-success mb-4">
					<div class="text-success-800">Your password has been successfully updated.</div>
				</aside>
			{:else if form?.error}
				<aside class="alert variant-ghost-error mb-4">
					<div class="text-error-800">
						There was an error processing your request. Please try again...
					</div>
				</aside>
			{/if}
			{#if form?.success}
				<a href="/login" class="btn w-full variant-filled-primary">Continue to Login</a>
			{:else}
				<!-- else content here -->

				<form method="POST" action="?/reset" use:enhance>
					<label class="mb-1 text-black" for="user">Enter New Password</label>
					<div>
						<input
							autofocus
							type="password"
							class="mb-2 w-full rounded-md text-black"
							name="password"
							bind:value={password}
						/>
						<input type="hidden" name="token" bind:value={token} />
					</div>
					<button
						disabled={!(
							/^[^\s]*$/.test(password) &&
							/[A-Z]/.test(password) &&
							/[a-z]/.test(password) &&
							/\d/.test(password) &&
							password.length >= 8
						)}
						type="submit"
						class="btn w-full variant-filled-primary">Change Password</button
					>
					<div class="text-black mt-5">
						{#if /^[^\s]*$/.test(password)}
							<p>✅ Password does not contain spaces</p>
						{:else}
							<p>❌ Spaces are not allowed</p>
						{/if}
						{#if /[A-Z]/.test(password)}
							<p>✅ Password contains at least one uppercase letter</p>
						{:else}
							<p>❌ At least one uppercase letter is required</p>
						{/if}
						{#if /[a-z]/.test(password)}
							<p>✅ Password contains at least one lowercase letter</p>
						{:else}
							<p>❌ At least one lowercase letter is required</p>
						{/if}
						{#if /\d/.test(password)}
							<p>✅ Password contains at least one number</p>
						{:else}
							<p>❌ At least one number is required</p>
						{/if}
						{#if password.length >= 8}
							<p>✅ Password contains 8 or more characters</p>
						{:else}
							<p>❌ At least 8 characters required</p>
						{/if}
						<div class="mt-4 mb-1">
							<Password pw={password} />
						</div>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>
