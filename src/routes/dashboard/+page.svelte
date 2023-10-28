<script>
	export let data;
</script>

{#if data.error}
	<div>Ruh roh, there was an error loading the data...</div>
{:else}
	{#each data.results as item}
		<div>{item.message}</div>
	{/each}
{/if}
