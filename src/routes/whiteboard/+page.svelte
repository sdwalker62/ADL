<script>
	import ReactAdapter from '$lib/components/ReactAdapter.svelte';
</script>

{#await import('@excalidraw/excalidraw')}
	<p>Getting Board</p>
{:then e}
	<div id="whiteboard">
		<ReactAdapter el={e.Excalidraw} />
	</div>
{/await}

<style>
	:global(.excalidraw) {
		height: 100%;
		min-height: calc(100vh - 40px);
	}
</style>
