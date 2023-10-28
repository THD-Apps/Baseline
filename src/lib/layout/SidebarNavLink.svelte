<script>
	import { page } from '$app/stores';
	import { AppBar, getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
	export let href, title;
	$: classesActive = (href) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<li><a on:click={() => drawerStore.close()} class={classesActive(href)} {href}>{title}</a></li>
