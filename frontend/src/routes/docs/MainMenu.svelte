<script lang="ts"> 
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

    $: renderMenu = $showMainMenu;

    let pageHome = false;
	let pageDocs = false;
	let pageBoard = false;
</script>

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