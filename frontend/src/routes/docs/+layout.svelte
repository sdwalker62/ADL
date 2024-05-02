<script lang="ts">
	import { onMount } from 'svelte';
	import { leftPanelActive } from '$lib/data/shared.js';
	import Folder from '$lib/components/FileTree/Folder.svelte';
	import stickybits from 'stickybits';
	// import type { LayoutData } from './$types';

	export let data;

	const library = JSON.parse(data.tree);
	const props = {
		name: 'root',
		files: library.children,
		active: true
	};

	onMount(() => {
		stickybits('#folder-top-bar-sticky');
	});
</script>

<div id="page-container" class="constrained-height" class:active={$leftPanelActive}>
	{#if $leftPanelActive}
		<div id="folder-canvas" class="no-scroll-bar">
			<div class="folder-container no-scroll-bar constrained-height">
				<Folder {...props} />
			</div>
		</div>
	{/if}
	<slot />
</div>

<style>
	#page-container {
		display: grid;
		overflow: hidden;
	}

	.active {
		grid-template-columns: 320px 1fr;
	}

	@media (max-width: 400px) {
		#page-container {
			grid-template-columns: none;
			grid-template-rows: 0 3fr;
		}

		.folder-container {
			max-height: 400px;
			overflow: hidden;
		}
	}

	#folder-canvas {
		display: flex;
		background-color: var(--background-2);
		width: 100%;
		height: 100%;
		max-width: 320px;
		align-items: start;
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.folder-container {
		background-color: var(--background-2);
		padding: 15px;
	}
</style>
