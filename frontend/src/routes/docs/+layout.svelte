<script lang="ts">
	import { onMount } from 'svelte';
	import { leftPanelActive, serverVisible, libraryVisible } from '$lib/data/shared.js';
	import Folder from '$lib/components/FileTree/Folder.svelte';
	import stickybits from 'stickybits';
	import Modal from '$lib/components/modals/Modal.svelte';
	// import type { LayoutData } from './$types';

	export let data;

	const library = JSON.parse(data.tree);
	const props = {
		name: 'root',
		files: library.children,
		active: true
	};

	let showURLModal = false;

	function openURLModal() {
		showURLModal = true;
	}

	function closeURLModal() {
		showURLModal = false;
	}

	onMount(() => {
		stickybits('#folder-top-bar-sticky');
	});
</script>

<div id="page-container" class="constrained-height" class:active={$leftPanelActive}>
	{#if $leftPanelActive}
		<div id="folder-canvas" class="no-scroll-bar">
			{#if $libraryVisible}
				<div class="folder-container no-scroll-bar constrained-height">
					<Folder {...props} />
				</div>
			{:else}
				<div id="server-panel"> 
					<button on:click={openURLModal}>Open Modal</button>
				</div>
			{/if}
		</div>		
	{/if}
	<slot />
</div>

<Modal bind:renderModal={showURLModal}/>

<style>
	#server-panel {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--background-2);
		padding: 15px;
	}

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
