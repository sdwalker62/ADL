<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import {
		colorTheme,
		showMainMenu,
		showCodeOutlineElements,
		showMathOutlineElements,
		showTableOutlineElements
	} from '$lib/data/shared';
	import MainModalMenu from '$lib/components/MainModalMenu/MainModalMenu.svelte';
	import SiteNavigationLink from '$lib/components/MainModalMenu/SiteNavigationLink.svelte';
	import ExternalNavigationLink from '$lib/components/MainModalMenu/ExternalNavigationLink.svelte';
	import TopBar from '$lib/components/TopMenuBar/TopBar.svelte';
	import ToggleMenuItem from '$lib/components/TopMenuBar/ToggleMenuItem.svelte';
	import ActionMenuItem from '$lib/components/TopMenuBar/ActionMenuItem.svelte';
	import Cookies from 'js-cookie';
	import LeftPanelIcon from '$lib/assets/icons/LeftPanelIcon.svelte';
	import ServerIcon from '$lib/assets/icons/ServerIcon.svelte';
	import DriveIcon from '$lib/assets/icons/DriveIcon.svelte';
	import CodeIcon from '$lib/assets/icons/CodeIcon.svelte';
	import MathIcon from '$lib/assets/icons/MathIcon.svelte';
	import TableIcon from '$lib/assets/icons/TableIcon.svelte';
	import RightPanelIcon from '$lib/assets/icons/RightPanelIcon.svelte';
	import MenuIcon from '$lib/assets/icons/MenuIcon.svelte';
	import DecreaseFontIcon from '$lib/assets/icons/DecreaseFontIcon.svelte';
	import IncreaseFontIcon from '$lib/assets/icons/IncreaseFontIcon.svelte';
	import HomeIcon from '$lib/assets/icons/HomeIcon.svelte';
	import LibraryIcon from '$lib/assets/icons/LibraryIcon.svelte';
	import WhiteboardIcon from '$lib/assets/icons/WhiteboardIcon.svelte';
	import Cookie from 'js-cookie';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$colorTheme = data.colorMode;
	$showCodeOutlineElements = data.showCodeOutlineElements;
	$showMathOutlineElements = data.showMathOutlineElements;
	$showTableOutlineElements = data.showTableOutlineElements;

	let leftPanelActive = true;
	let folderActive = true;
	let serverActive = false;
	let codeActive = true;
	let mathActive = true;
	let tableActive = true;
	let rightPanelActive = true;

	let pageHome = false;
	let pageDocs = false;
	let pageBoard = false;

	beforeUpdate(() => {
		document.documentElement.setAttribute('data-theme', $colorTheme);
	});

	$: renderMenu = $showMainMenu;

	const toggleMainMenu = () => {
		$showMainMenu = true;
	};

	const toggleLeftPanel = () => {
		let leftPanel = document.getElementById('page-container');
		let cols = leftPanel!.style.gridTemplateColumns;
		if (cols === '320px 1fr' || cols === '') {
			leftPanel!.style.gridTemplateColumns = '0 1fr';
		} else {
			leftPanel!.style.gridTemplateColumns = '320px 1fr';
		}
		leftPanelActive = !leftPanelActive;
	};

	const toggleRightPanel = () => {
		let rightPanel = document.getElementById('page-canvas');
		let cols = rightPanel!.style.gridTemplateColumns;
		if (cols === '1fr 320px' || cols === '') {
			rightPanel!.style.gridTemplateColumns = '1fr 0';
		} else {
			rightPanel!.style.gridTemplateColumns = '1fr 320px';
		}
	};
</script>

<main>
	<TopBar>
		<svelte:fragment slot="left-cluster">
			<ToggleMenuItem active={leftPanelActive} onClickFunction={toggleLeftPanel}>
				<LeftPanelIcon active={leftPanelActive} />
			</ToggleMenuItem>
			<ToggleMenuItem active={folderActive}>
				<DriveIcon active={folderActive} />
			</ToggleMenuItem>
			<ToggleMenuItem active={serverActive}>
				<ServerIcon active={serverActive} />
			</ToggleMenuItem>
		</svelte:fragment>

		<svelte:fragment slot="left-search">
			<ActionMenuItem onClickFunction={toggleMainMenu}>
				<MenuIcon />
			</ActionMenuItem>
		</svelte:fragment>

		<svelte:fragment slot="right-search">
			<ActionMenuItem tip="Decrease Document Font Size">
				<DecreaseFontIcon />
			</ActionMenuItem>
			<ActionMenuItem tip="Increase Document Font Size">
				<IncreaseFontIcon />
			</ActionMenuItem>
		</svelte:fragment>

		<svelte:fragment slot="right-cluster">
			<ToggleMenuItem
				active={codeActive}
				on:click={() => {
					Cookie.set('showCodeOutlineElements', (!$showCodeOutlineElements).toString());
					$showCodeOutlineElements = !$showCodeOutlineElements;
					console.log($showCodeOutlineElements);
				}}
			>
				<CodeIcon active={$showCodeOutlineElements} />
			</ToggleMenuItem>
			<ToggleMenuItem active={mathActive}>
				<MathIcon
					active={$showMathOutlineElements}
					on:click={() => {
						Cookie.set('showMathOutlineElements', (!$showMathOutlineElements).toString());
						$showMathOutlineElements = !$showMathOutlineElements;
					}}
				/>
			</ToggleMenuItem>
			<ToggleMenuItem active={tableActive}>
				<TableIcon active={$showTableOutlineElements} />
			</ToggleMenuItem>
			<ToggleMenuItem active={rightPanelActive} onClickFunction={toggleRightPanel}>
				<RightPanelIcon active={rightPanelActive} />
			</ToggleMenuItem>
		</svelte:fragment>
	</TopBar>
	<slot />
</main>

<MainModalMenu bind:renderMenu>
	<svelte:fragment slot="site-navigation">
		<SiteNavigationLink bind:active={pageHome} link={'/'} name={'Home'}>
			<HomeIcon active={pageHome} />
		</SiteNavigationLink>
		<SiteNavigationLink bind:active={pageDocs} link={'/docs'} name={'Docs'}>
			<LibraryIcon active={pageDocs} />
		</SiteNavigationLink>
		<SiteNavigationLink bind:active={pageBoard} link={'/whiteboard'} name={'Board'}>
			<WhiteboardIcon active={pageBoard} />
		</SiteNavigationLink>
	</svelte:fragment>
	<svelte:fragment slot="links">
		<ExternalNavigationLink link={'https://github.com/sigil-ml'} site={'github'} name={'GitHub'} />
		<ExternalNavigationLink link={'https://hub.docker.com/'} site={'docker'} name={'Docker Hub'} />
	</svelte:fragment>
</MainModalMenu>

<style>
	main {
		background-color: var(--background-2);
		overflow: hidden;
		width: 100%;
		height: 100%;
		min-height: 100vh;
	}
</style>
