<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import tippy from 'tippy.js';

	export let active = false;
	export let tip = '';
	export let onClickFunction = () => {};
	const dispatch = createEventDispatcher();

	let component: HTMLElement;

	onMount(() => {
		tippy(component, {
			content: tip,
			theme: 'athena',
			delay: [200, 0],
			placement: 'bottom'
		});
		dispatch('activation', {
			active: active
		});
	});

	afterUpdate(() => {
		component.addEventListener('click', () => {
			onClickFunction();
			active = !active;
		});
	});
</script>

{#key active}
	<div bind:this={component} class="canvas" class:active>
		<slot {active} />
	</div>
{/key}

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
		background-color: #00000020;
	}

	.canvas.active {
		background-color: #00000020;
	}
</style>
