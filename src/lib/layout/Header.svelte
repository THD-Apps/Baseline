<script>
	import { AppBar, getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
	import { LightSwitch } from '@skeletonlabs/skeleton';
	export let userEmail;
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<button on:click={() => drawerStore.open()} class="md:hidden mr-3 text-primary-500">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-menu-2"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				stroke-width="3"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M4 6l16 0" />
				<path d="M4 12l16 0" />
				<path d="M4 18l16 0" />
			</svg>
		</button>
		<div class="font-bold text-2xl">TUG Brands</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
		<form action="/login?/logout" method="POST">
			<button class="btn btn-primary">{userEmail} Logout</button>
		</form>
	</svelte:fragment>
	<!-- <svelte:fragment slot="headline">(headline)</svelte:fragment> -->
</AppBar>
