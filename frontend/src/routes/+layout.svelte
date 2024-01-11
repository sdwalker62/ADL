<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import {
		colorTheme,
		showMainMenu,
		showCodeOutlineElements,
		showMathOutlineElements,
		showTableOutlineElements,
		leftPanelActive,
		rightPanelActive
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
	import { page } from '$app/stores';

	console.log($page.url.pathname);

	export let data: LayoutData;

	$colorTheme = data.colorMode;
	$showCodeOutlineElements = data.showCodeOutlineElements;
	$showMathOutlineElements = data.showMathOutlineElements;
	$showTableOutlineElements = data.showTableOutlineElements;
	$leftPanelActive = data.leftPanelActive;
	$rightPanelActive = data.rightPanelActive;

	let folderActive = true;
	let serverActive = false;

	let pageHome = false;
	let pageDocs = false;
	let pageBoard = false;
	let showOutLineButtons = true;

	if ($page.url.pathname.endsWith('.pdf')) {
		showOutLineButtons = false;
	}

	beforeUpdate(() => {
		document.documentElement.setAttribute('data-theme', $colorTheme);
	});

	$: renderMenu = $showMainMenu;
</script>

<main>
	<TopBar>
		<svelte:fragment slot="left-cluster">
			<ToggleMenuItem
				active={$leftPanelActive}
				onClickFunction={() => {
					$leftPanelActive = !$leftPanelActive;
					Cookies.set('leftPanelActive', $leftPanelActive ? 'true' : 'false');
				}}
			>
				<LeftPanelIcon active={$leftPanelActive} />
			</ToggleMenuItem>
			<ToggleMenuItem active={folderActive}>
				<DriveIcon active={folderActive} />
			</ToggleMenuItem>
			<!-- <ToggleMenuItem active={serverActive}>
				<ServerIcon active={serverActive} />
			</ToggleMenuItem> -->
		</svelte:fragment>

		<svelte:fragment slot="left-search">
			<ActionMenuItem
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
			link={'https://github.com/sigil-ml'}
			site={'github'}
			name={'GitHub'}
		/>
		<ExternalNavigationLink
			link={'https://hub.docker.com/'}
			site={'docker'}
			name={'Docker Hub'}
		/>
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
