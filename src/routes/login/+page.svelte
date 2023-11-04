<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	let message;
	let redirectTo = null;
	$: message = $page.url.searchParams.get('message') ?? null;
	$: redirectTo = $page.url.searchParams.get('redirectTo') ?? null;
	export let form;
	export let data;
</script>

<div class="flex justify-center items-center h-full">
	<div class="w-[90%] md:w-[25%] bg-white p-8 rounded-md shadow-xl">
		<img class="mb-3" src="/logo.png" alt="logo" />
		<div>
			{#if form?.missing}
				<aside class="alert variant-ghost-error mb-4">
					<div class="text-error-800">Username and password are required...</div>
				</aside>
			{:else if form?.incorrect || data?.incorrect}
				<aside class="alert variant-ghost-error mb-4">
					<div class="text-error-800">Invalid credentials...</div>
				</aside>
			{:else if data?.error || form?.error}
				<aside class="alert variant-ghost-error mb-4">
					<div class="text-error-800">
						There was an error attempting to login. Please try again.
					</div>
				</aside>
			{:else if message}
				<aside class="alert variant-ghost-warning mb-4">
					<div class="text-warning-800">{message}</div>
				</aside>
			{/if}

			<form method="POST" action="?/loginUser" use:enhance>
				<div class="md:grid md:grid-cols-2 md:gap-3">
					<div>
						<label class="mb-1 text-black" for="user">Username</label>
						<div>
							<input
								autofocus
								id="user"
								class="mb-2 w-full rounded-md text-black"
								type="text"
								name="user"
							/>
						</div>
					</div>
					<div>
						<label class="mb-1 text-black" for="password">Password</label>
						<div>
							<input
								id="password"
								class="mb-3 w-full rounded-md text-black"
								type="password"
								name="password"
							/>
						</div>
					</div>
				</div>

				<input type="hidden" name="redirectTo" bind:value={redirectTo} />
				<button type="submit" class="btn w-full variant-filled-primary">Login</button>
			</form>
			<div class="flex items-center mt-3">
				<div class="flex-grow border-2 border-primary-500 mx-2" />
				<span class="text-primary-500 font-bold text-xl">OR</span>
				<div class="flex-grow border-2 border-primary-500 mx-2" />
			</div>
			<p class="text-center text-orange-300 mb-2">Login via Google, Apple, or Facebook</p>
			<div class="grid grid-cols-3 gap-3">
				<form method="POST" action="?/google" use:enhance>
					<button
						type="submit"
						class="btn w-full variant-outline-primary text-primary-600 font-bold"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler icon-tabler-brand-google-filled"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path
								d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z"
								stroke-width="0"
								fill="currentColor"
							/>
						</svg>
					</button>
				</form>
				<form method="POST" action="?/apple" use:enhance>
					<button
						type="submit"
						class="btn w-full variant-outline-primary text-primary-600 font-bold"
					>
						<svg
							fill="currentColor"
							height="24"
							width="24"
							version="1.1"
							id="Capa_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 22.773 22.773"
							xml:space="preserve"
							><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							/><g id="SVGRepo_iconCarrier">
								<g>
									<g>
										<path
											d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"
										/>
										<path
											d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"
										/>
									</g> <g /> <g /> <g /> <g /> <g /> <g /> <g /> <g /> <g /> <g /> <g /> <g /> <g />
									<g /> <g />
								</g>
							</g></svg
						>
					</button>
				</form>
				<form method="POST" action="?/facebook" use:enhance>
					<button
						type="submit"
						class="btn w-full variant-outline-primary text-primary-600 font-bold"
					>
						<svg
							fill="currentColor"
							width="24px"
							height="24px"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							/><g id="SVGRepo_iconCarrier">
								<title>facebook</title>
								<path
									d="M30.996 16.091c-0.001-8.281-6.714-14.994-14.996-14.994s-14.996 6.714-14.996 14.996c0 7.455 5.44 13.639 12.566 14.8l0.086 0.012v-10.478h-3.808v-4.336h3.808v-3.302c-0.019-0.167-0.029-0.361-0.029-0.557 0-2.923 2.37-5.293 5.293-5.293 0.141 0 0.281 0.006 0.42 0.016l-0.018-0.001c1.199 0.017 2.359 0.123 3.491 0.312l-0.134-0.019v3.69h-1.892c-0.086-0.012-0.185-0.019-0.285-0.019-1.197 0-2.168 0.97-2.168 2.168 0 0.068 0.003 0.135 0.009 0.202l-0.001-0.009v2.812h4.159l-0.665 4.336h-3.494v10.478c7.213-1.174 12.653-7.359 12.654-14.814v-0z"
								/>
							</g></svg
						>
					</button>
				</form>
			</div>
			<div class="flex items-center mt-3">
				<div class="flex-grow border-2 border-primary-500 mx-2" />
				<span class="text-primary-500 font-bold text-xl">OR</span>
				<div class="flex-grow border-2 border-primary-500 mx-2" />
			</div>
			<p class="text-center text-orange-300 mb-2">Send a one-time SMS verification code</p>
			<a
				href="login-otp"
				type="submit"
				class="btn w-full font-bold text-primary-600 variant-ghost-primary">Enter Phone Number</a
			>
			<div class="text-center mt-4 -mb-2">
				<a href="/password-reset" class="text-surface-800">Reset Password</a>
			</div>
		</div>
	</div>
</div>
