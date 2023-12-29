<script lang="ts">
	export let innerHTMLString = '';

	innerHTMLString = `<table>${innerHTMLString}</table>`;
</script>

<div id="table-item-canvas">
	{@html innerHTMLString}
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
