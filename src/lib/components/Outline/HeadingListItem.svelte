<script>
	/** @type {string} */
	export let name;

	/** @type {number} */
	export let rank;

	/** @type {string} */
	export let html;

	const displayName = html.split('</a>')[1].split('</h')[0];
</script>

<a id="heading-wrapper" href={`#${name}`} class={`h${rank}`}>
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
		color: var(--font-2);
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 1.8rem;
		font-family: var(--f-Medium), sans-serif;
	}
</style>
