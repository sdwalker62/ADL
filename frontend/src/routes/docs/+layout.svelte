<script lang="ts">
	import { onMount } from 'svelte';
	import { leftPanelActive, libraryVisible, showDigitalOceanSpaceModal } from '$lib/data/shared.js';
	import Folder from '$lib/components/FileTree/Folder.svelte';
	import stickybits from 'stickybits';
	import {
		colorTheme,
		showCodeOutlineElements,
		showMathOutlineElements,
		showTableOutlineElements,
		rightPanelActive,
		serverVisible
	} from '$lib/data/shared.js';
	import TopBar from '$lib/components/TopMenuBar/TopBar.svelte';
	import ToggleMenuItem from '$lib/components/TopMenuBar/ToggleMenuItem.svelte';
	import Cookies from 'js-cookie';
	import LeftPanelIcon from '$lib/assets/icons/LeftPanelIcon.svelte';
	import DriveIcon from '$lib/assets/icons/DriveIcon.svelte';
	import CodeIcon from '$lib/assets/icons/CodeIcon.svelte';
	import MathIcon from '$lib/assets/icons/MathIcon.svelte';
	import TableIcon from '$lib/assets/icons/TableIcon.svelte';
	import RightPanelIcon from '$lib/assets/icons/RightPanelIcon.svelte';
	import LibraryIcon from '$lib/assets/icons/LibraryIcon.svelte';
	// import MainMenu from './MainMenu.svelte';

	export let data;
	import { page } from '$app/stores';

	const library = JSON.parse(data.tree);
	const props = {
		name: 'root',
		files: library.children,
		active: true
	};

	$colorTheme = data.colorMode;
	$showCodeOutlineElements = data.showCodeOutlineElements;
	$showMathOutlineElements = data.showMathOutlineElements;
	$showTableOutlineElements = data.showTableOutlineElements;
	$leftPanelActive = data.leftPanelActive;
	$rightPanelActive = data.rightPanelActive;
	
	let showOutLineButtons = true;

	if ($page.url.pathname.endsWith('.pdf')) {
		showOutLineButtons = false;
	}

	onMount(() => {
		stickybits('#folder-top-bar-sticky');
	});
</script>

<TopBar>
	<svelte:fragment slot="left-cluster">
		<ToggleMenuItem
			tip="Toggle Left Panel"
			active={$leftPanelActive}
			onClickFunction={() => {
				$leftPanelActive = !$leftPanelActive;
				Cookies.set('leftPanelActive', $leftPanelActive ? 'true' : 'false');
			}}
		>
			<LeftPanelIcon active={$leftPanelActive} />
		</ToggleMenuItem>
		<ToggleMenuItem 
			tip="Library" 
			active={$libraryVisible}
			onClickFunction={() => {
				$libraryVisible = !$libraryVisible;
				$serverVisible = !$serverVisible;
			}}
		>
			<LibraryIcon active={$libraryVisible} />
		</ToggleMenuItem>
		<ToggleMenuItem 
			tip="Remote Servers" 
			active={$serverVisible}
			onClickFunction={() => {
				$libraryVisible = !$libraryVisible;
				$serverVisible = !$serverVisible;
			}}
		>
			<DriveIcon  active={$serverVisible} />
		</ToggleMenuItem>
	</svelte:fragment>

	<svelte:fragment slot="right-cluster">
		{#if showOutLineButtons}
			<ToggleMenuItem
				tip="Toggle Code Blocks"
				active={$showCodeOutlineElements}
				onClickFunction={() => {
					$showCodeOutlineElements = !$showCodeOutlineElements;
					Cookies.set(
						'showCodeOutlineElements',
						$showCodeOutlineElements ? 'true' : 'false'
					);
				}}
			>
				<CodeIcon active={$showCodeOutlineElements} />
			</ToggleMenuItem>
			<ToggleMenuItem
				tip="Toggle Math"
				active={$showMathOutlineElements}
				onClickFunction={() => {
					$showMathOutlineElements = !$showMathOutlineElements;
					Cookies.set(
						'showMathOutlineElements',
						$showMathOutlineElements ? 'true' : 'false'
					);
				}}
			>
				<MathIcon active={$showMathOutlineElements} />
			</ToggleMenuItem>
			<ToggleMenuItem
				tip="Toggle Table Previews"
				active={$showTableOutlineElements}
				onClickFunction={() => {
					$showTableOutlineElements = !$showTableOutlineElements;
					Cookies.set(
						'showTableOutlineElements',
						$showTableOutlineElements ? 'true' : 'false'
					);
				}}
			>
				<TableIcon active={$showTableOutlineElements} />
			</ToggleMenuItem>
		{/if}
		<ToggleMenuItem
			tip="Toggle Right Panel"
			active={$rightPanelActive}
			onClickFunction={() => {
				$rightPanelActive = !$rightPanelActive;
				Cookies.set('rightPanelActive', $rightPanelActive ? 'true' : 'false');
			}}
		>
			<RightPanelIcon active={$rightPanelActive} />
		</ToggleMenuItem>
	</svelte:fragment>
</TopBar>

<!-- <MainMenu /> -->

<main class:active={$leftPanelActive}>
	{#if $leftPanelActive}
		<div id="docs-folder__canvas">
			{#if $libraryVisible}
				<Folder {...props} />
			{:else}
				<button on:click={() => {
						$showDigitalOceanSpaceModal = !$showDigitalOceanSpaceModal;
					}}>
					Pull From Digital Oceans Space
				</button>
			{/if}
		</div>
	{/if}
	<slot />
</main>

<style lang="scss">
	main {
		@media (min-width: 640px) {
			display: grid;
			height: 100%;
			width: 100%;
		}
	}

	#docs-folder__canvas {
		@media (min-width: 640px) {
			display: flex;
			background: var(--background-2);
			padding: 1.5rem;
			padding-top: calc(15px - 0.5rem);
			padding-left: 0;
			width: 100%;
			height: 100%;
			max-height: calc(100vh - 2.5rem - 4rem);
			align-items: start;
			overflow-x: clip;
			overflow-y: scroll;
		}

		&::-webkit-scrollbar {
			display: none;
		}
	}

	button {
		height: 30px;
		width: 100%;
		border: none;
		border-radius: 5px;
		color: var(--font-3);
		font-family: var(--f-Regular), sans-serif;
		font-size: 16px;
		background: var(--background-4);
		margin: 1.5rem;

		&:hover {
			background: var(--gradient-1);
			cursor: pointer;
			color: var(--font-1);
		}
	}

	.active {
		grid-template-columns: 320px 1fr;
		height: 100%;
	}

</style>
