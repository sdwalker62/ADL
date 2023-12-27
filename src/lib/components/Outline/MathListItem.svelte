<script>
	export let innerHTML = '';
</script>

<div id="math-item-canvas">
	{@html innerHTML}
</div>

<style>
	#math-item-canvas {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--background-7);
		border-radius: 7px;
		padding: 10px;
	}

	:global(#math-item-canvas span) {
		color: var(--font-2);
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.8rem;
	}
</style>
