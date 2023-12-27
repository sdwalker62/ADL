<script>
	import { onMount } from 'svelte';

	let mountedFunction = () => {};

	/** @type {HTMLElement}*/
	let component;
	onMount(() => {
		component.addEventListener('click', mountedFunction);
	});
</script>

<label class="switch">
	<input type="checkbox" bind:this={component} />
	<span class="handle" />
</label>

<style>
	.switch {
		display: inline-block;
		position: relative;
		height: var(--height, 20px);
		width: calc(2 * var(--height, 20px));
		border-radius: calc(var(--height, 20px) / 2);
		padding: calc(var(--height, 20px) / 10);
	}

	/* Hide default HTML checkbox */
	.switch input {
		display: none;
	}

	/* The slider */
	.handle {
		position: absolute;
		cursor: pointer;
		inset: 0;
		border-radius: var(--height, 20px);
		background-color: var(--background-2);
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.handle::before {
		position: absolute;
		content: '';
		height: var(--height, 20px);
		left: calc(var(--height, 20px) / 10);
		bottom: calc(var(--height, 20px) / 10);
		aspect-ratio: 1/1;
		border-radius: 50%;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .handle {
		background-color: var(--highlight-2);
		transition: 0.4s;
	}

	input:checked + .handle::before {
		-webkit-transform: translateX(var(--height, 20px));
		-ms-transform: translateX(var(--height, 20px));
		transform: translateX(var(--height, 20px));
		box-shadow: -1px 1px 6px var(--background-2);
	}
</style>
