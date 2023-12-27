<script>
	export let innerHTML = '';

	innerHTML = `<table>${innerHTML}</table>`;
</script>

<div id="table-item-canvas">
	{@html innerHTML}
</div>

<style>
	#table-item-canvas {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--background-7);
		border-radius: 7px;
		padding: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(#table-item-canvas th) {
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.8rem;
	}
</style>
