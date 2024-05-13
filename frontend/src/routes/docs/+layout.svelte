<script lang="ts">
	import { onMount } from 'svelte';
	import { leftPanelActive, libraryVisible, showDigitalOceanSpaceModal } from '$lib/data/shared.js';
	import Folder from '$lib/components/FileTree/Folder.svelte';
	import stickybits from 'stickybits';
	import {
		colorTheme,
		showMainMenu,
		showCodeOutlineElements,
		showMathOutlineElements,
		showTableOutlineElements,
		rightPanelActive,
		serverVisible
	} from '$lib/data/shared.js';
	import MainModalMenu from '$lib/components/MainModalMenu/MainModalMenu.svelte';
	import SiteNavigationLink from '$lib/components/MainModalMenu/SiteNavigationLink.svelte';
	import ExternalNavigationLink from '$lib/components/MainModalMenu/ExternalNavigationLink.svelte';
	import TopBar from '$lib/components/TopMenuBar/TopBar.svelte';
	import ToggleMenuItem from '$lib/components/TopMenuBar/ToggleMenuItem.svelte';
	import ActionMenuItem from '$lib/components/TopMenuBar/ActionMenuItem.svelte';
	import Cookies from 'js-cookie';
	import LeftPanelIcon from '$lib/assets/icons/LeftPanelIcon.svelte';
	// import ServerIcon from '$lib/assets/icons/ServerIcon.svelte';
	import DriveIcon from '$lib/assets/icons/DriveIcon.svelte';
	import CodeIcon from '$lib/assets/icons/CodeIcon.svelte';
	import MathIcon from '$lib/assets/icons/MathIcon.svelte';
	import TableIcon from '$lib/assets/icons/TableIcon.svelte';
	import RightPanelIcon from '$lib/assets/icons/RightPanelIcon.svelte';
	import MenuIcon from '$lib/assets/icons/MenuIcon.svelte';
	// import DecreaseFontIcon from '$lib/assets/icons/DecreaseFontIcon.svelte';
	// import IncreaseFontIcon from '$lib/assets/icons/IncreaseFontIcon.svelte';
	import HomeIcon from '$lib/assets/icons/HomeIcon.svelte';
	import LibraryIcon from '$lib/assets/icons/LibraryIcon.svelte';
	import LibraryIcon2 from '$lib/assets/icons/LibraryIcon2.svelte';
	import WhiteboardIcon from '$lib/assets/icons/WhiteboardIcon.svelte';

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
	$: renderMenu = $showMainMenu;

	let folderActive = true;
	// let serverActive = false;

	let pageHome = false;
	let pageDocs = false;
	let pageBoard = false;
	let showOutLineButtons = true;

	if ($page.url.pathname.endsWith('.pdf')) {
		showOutLineButtons = false;
	}

	// export let showDigitalOceanSpaceModal = false;
	//
	// function DigitalOceanSpaceModal() {
	// 	showDigitalOceanSpaceModal = true;
	// }

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
		<!-- <ToggleMenuItem active={serverActive}>
			<ServerIcon active={serverActive} />
		</ToggleMenuItem> -->
	</svelte:fragment>

	<svelte:fragment slot="left-search">
		<ActionMenuItem
			tip="Main Menu"
			onClickFunction={() => {
				$showMainMenu = true;
			}}
		>
			<MenuIcon />
		</ActionMenuItem>
	</svelte:fragment>

	<svelte:fragment slot="right-search">
		<!-- <ActionMenuItem tip="Decrease Document Font Size">
			<DecreaseFontIcon />
		</ActionMenuItem>
		<ActionMenuItem tip="Increase Document Font Size">
			<IncreaseFontIcon />
		</ActionMenuItem> -->
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

<MainModalMenu bind:renderMenu>
	<svelte:fragment slot="site-navigation">
		<SiteNavigationLink bind:active={pageHome} link={'/'} name={'Home'}>
			<HomeIcon active={pageHome} />
		</SiteNavigationLink>
		<SiteNavigationLink bind:active={pageDocs} link={'/docs'} name={'Docs'}>
			<LibraryIcon2 active={pageDocs} />
		</SiteNavigationLink>
		<SiteNavigationLink
			bind:active={pageBoard}
			link={'/whiteboard'}
			name={'Board'}
		>
			<WhiteboardIcon active={pageBoard} />
		</SiteNavigationLink>
	</svelte:fragment>
	<svelte:fragment slot="links">
		<ExternalNavigationLink
			link={'https://huggingface.co/'}
			site={'huggingface.co'}
			name={'HuggingFace'}
		/>
		<ExternalNavigationLink
			link={'https://hub.docker.com/'}
			site={'docker.com'}
			name={'Docker Hub'}
		/>
		<ExternalNavigationLink
			link={'https://pytorch.org/'}
			site={'pytorch.org'}
			name={'PyTorch'}
		/>
		<ExternalNavigationLink
			link={'https://www.tensorflow.org/'}
			site={'tensorflow.org'}
			name={'TensorFlow'}
		/>
		<ExternalNavigationLink
			link={'https://jax.readthedocs.io/en/latest/'}
			site={'jax.readthedocs.io'}
			name={'JAX'}
		/>
		<ExternalNavigationLink
			link={'https://numpy.org/'}
			site={'numpy.org'}
			name={'NumPy'}
		/>
		<ExternalNavigationLink
			link={'https://pandas.pydata.org/docs/index.html'}
			site={'pandas.pydata.org'}
			name={'Pandas'}
		/>
		<ExternalNavigationLink
			link={'https://unify.ai/'}
			site={'unify.ai'}
			name={'Unify'}
		/>
		<ExternalNavigationLink
			link={'https://www.ray.io/'}
			site={'ray.io'}
			name={'Ray'}
		/>
		<ExternalNavigationLink
			link={'https://www.ultralytics.com/'}
			site={'ultralytics.com'}
			name={'Ultralytics'}
		/>
		<ExternalNavigationLink
			link={'https://pola.rs/'}
			site={'pola.rs'}
			name={'Polars'}
		/>
		<ExternalNavigationLink
			link={'https://jupyter.org/'}
			site={'jupyter.org'}
			name={'Jupyter'}
		/>
		<ExternalNavigationLink
			link={'https://colab.research.google.com/'}
			site={'colab.research.google.com'}
			name={'Google Colab'}
		/>
		<ExternalNavigationLink
			link={'https://www.paperspace.com/'}
			site={'paperspace.com'}
			name={'Paperspace'}
		/>
		<ExternalNavigationLink
			link={'https://www.langchain.com/'}
			site={'langchain.com'}
			name={'LangChain'}
		/>
		<ExternalNavigationLink
			link={'https://milvus.io/'}
			site={'milvus.io'}
			name={'Milvus'}
		/>
	</svelte:fragment>
</MainModalMenu>

<div id="page-container" class="constrained-height" class:active={$leftPanelActive}>
	{#if $leftPanelActive}
		<div id="folder-canvas" class="no-scroll-bar">
			{#if $libraryVisible}
				<div class="folder-container no-scroll-bar constrained-height">
					<Folder {...props} />
				</div>
			{:else}
				<div id="button-panel">
					<button
						on:click={() => {
							$showDigitalOceanSpaceModal = !$showDigitalOceanSpaceModal;
						}}>Pull From Digital Oceans Space</button
					>
				</div>
			{/if}
		</div>
	{/if}
	<slot />
</div>

<style>
	#url-text {
		color: var(--font-1);
		font-family: var(--f-Mono), sans-serif;
		font-size: 18px;
	}

	#url-label {
		color: var(--font-1);
		font-family: var(--f-Medium), sans-serif;
		font-size: 18px;
	}

	button {
		height: 30px;
		border: none;
		border-radius: 5px;
		color: var(--font-3);
		font-family: var(--f-Regular), sans-serif;
		font-size: 16px;
		background-color: var(--background-4);
	}

	button:hover {
		background-color: var(--background-6);
		cursor: pointer;
		color: var(--font-1);
	}

	#submit-button {
		font-family: var(--f-SemiBold), sans-serif;
		color: var(--background-1);
		background: var(--white-purple-1);
	}

	#button-panel {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: var(--background-2);
		padding: 15px;
		width: 100%;
		gap: 5px;
	}

	#urlInputBox {
		width: 100%;
		height: 100%;
		background: transparent;
		border: none;
		color: var(--font-1);
		font-family: var(--f-Mono), sans-serif;
		font-size: 48px;
		padding-left: 20px;
	}

	#urlInputBox:focus {
		border-radius: 10px;
		outline: none;
		border: none;
	}

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
