<script lang="ts">
	export let name: string;
	export let html: string;

	const displayName = html.split('</a>')[1]?.split('</h')[0];
</script>

<a id="heading-wrapper" href={`#${name}`} class={`h1`}>
	<div id="heading-item-canvas">
		<span>{displayName}</span>
	</div>
</a>

<style>
	#heading-wrapper {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
		width: 100%;
	}

	#heading-item-canvas {
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow-x: hidden;
		text-overflow: ellipsis;
	}

	a,
	span {
		text-decoration: none;
		color: var(--font-3);
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 2rem;
		font-family: var(--f-SemiBold), sans-serif;
		width: 100%;
		padding-left: 5px;
		border-radius: 5px;
	}

	:global(a.observed span) {
		border-radius: 5px;
		padding: 5px;
		color: var(--highlight-font);
		background: var(--gradient-1);
	}
</style>
