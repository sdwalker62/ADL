<script lang="ts">
	import { currentPage } from '$lib/data/shared.js';
	import { afterUpdate } from 'svelte';

	export let link: string;
	export let site: string;
	export let name: string;

	let component: HTMLElement;

	afterUpdate(() => {
		component.addEventListener('click', () => {
			$currentPage = name;
		});
		if ($currentPage === name) {
			component.classList.add('active');
		}
	});
</script>

<a href={link} bind:this={component}>
	<div id="link-canvas">
		<img src="http://www.google.com/s2/favicons?domain_url=www.{site}.com"  alt="nav-icon"/>
		<span>{name}</span>
	</div>
</a>

<style>
	#link-canvas {
		display: grid;
		justify-content: center;
		align-items: center;
		grid-template-columns: 2rem 10rem;
		gap: 10px;
		background-color: transparent;
		padding: 8px;
		border-radius: 10px;
		opacity: 0.5;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	#link-canvas:hover {
		background-color: #ffffff20;
	}

	span {
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: start;
		color: var(--font-2);
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.3rem;
	}

	img {
		width: 2rem;
		height: 2rem;
	}

	a {
		text-decoration: none;
	}

	:global(#link-canvas.active),
	#link-canvas:hover {
		transition: opacity 0s;
		opacity: 1 !important;
	}
</style>
