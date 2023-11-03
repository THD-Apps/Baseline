<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		setTimeout(() => {
			goto('/dashboard');
		}, 0);
	});
</script>

You are being redirected to the dashboard!
