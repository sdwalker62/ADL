<script>
	import { currentPage } from '$lib/data/shared';
	import { beforeUpdate, onMount } from 'svelte';
	import { page } from '$app/stores';

	export let link;
	export let name;
	export let active;

	let component;

	beforeUpdate(() => {
		if (link === $page.url.pathname) {
			active = true;
		}
	});

	onMount(() => {
		component.addEventListener('click', () => {
			$currentPage = name;
		});
	});
</script>

{#key active}
	<a href={link} bind:this={component} class:active>
		<div class="link-canvas">
			<slot {active} />
			<span>{name}</span>
		</div>
	</a>
{/key}

<style>
	.link-canvas {
		display: grid;
		justify-content: center;
		align-items: center;
		grid-template-rows: 4rem auto;
		gap: 5px;
		background-color: transparent;
		padding: 20px;
		border-radius: 10px;
	}

	span {
		color: var(--font-2);
		font-family: var(--f-Medium), sans-serif;
		font-size: 1.5rem;
	}

	a {
		text-decoration: none;
	}

	a.active .link-canvas,
	.link-canvas:hover {
		transition: opacity 0s;
		opacity: 1 !important;
		background-color: #ffffff20;
	}
</style>
