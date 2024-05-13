<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import {
		colorTheme
	} from '$lib/data/shared.js';
	import { page } from '$app/stores';

	export let data;

	let showOutLineButtons = true;

	if ($page.url.pathname.endsWith('.pdf')) {
		showOutLineButtons = false;
	}

	beforeUpdate(() => {
		document.documentElement.setAttribute('data-theme', $colorTheme);
	});

	
</script>

<main>
	<nav>
		<menu>
			<menuitem>Home</menuitem>
			<menuitem>Docs</menuitem>
			<menuitem>Board</menuitem>
		</menu>
	</nav>
	
	<slot />
</main>



<style lang="scss">
	main {
		background-color: var(--background-2);
		overflow: hidden;
		width: 100%;
		height: 100%;
		min-height: 100vh;
	}
</style>
