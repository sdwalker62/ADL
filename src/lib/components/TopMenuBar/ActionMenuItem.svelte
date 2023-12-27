<script>
	import { onMount } from 'svelte';
	import tippy from 'tippy.js';

	let component;
	export let tip = '';
	export let onClickFunction = () => {};

	onMount(() => {
		component.addEventListener('click', onClickFunction);
		tippy(component, {
			content: tip,
			theme: 'athena',
			delay: [200, 0],
			placement: 'bottom'
		});
	});
</script>

<div bind:this={component} class="canvas">
	<slot />
</div>

<style>
	.canvas {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 5px;
		padding-bottom: 5px;
		margin-top: 2px;
		margin-bottom: 2px;
		border-radius: 8px;
	}

	.canvas:hover {
		cursor: pointer;
		background-color: var(--grey-2);
		transition: background-color 0s;
	}
</style>
