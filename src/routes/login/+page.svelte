<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	let message;
	let redirectTo = null;
	$: message = $page.url.searchParams.get('message') ?? null;
	$: redirectTo = $page.url.searchParams.get('redirectTo') ?? null;
	export let form;
</script>

<div class="flex justify-center items-center h-full">
	<div class="w-[80%] md:w-[20%]">
		{#if form?.missing}
			<aside class="alert variant-ghost-error mb-4">
				<div>Username and password are required...</div>
			</aside>
		{:else if form?.incorrect}
			<aside class="alert variant-ghost-error mb-4">
				<div>Invalid credentials...</div>
			</aside>
		{:else if message}
			<aside class="alert variant-ghost-warning mb-4">
				<div>{message}</div>
			</aside>
		{/if}

		<form method="POST" action="?/loginUser" use:enhance>
			<label class="mb-1" for="user">User</label>
			<div>
				<input id="user" class="mb-2 w-full rounded-md text-black" type="text" name="user" />
			</div>
			<label class="mb-1" for="password">Password</label>
			<div>
				<input
					id="password"
					class="mb-6 w-full rounded-md text-black"
					type="password"
					name="password"
				/>
			</div>
			<input type="hidden" name="redirectTo" bind:value={redirectTo} />
			<button type="submit" class="btn w-full variant-filled-primary">Login</button>
		</form>
	</div>
</div>
