<script lang="ts">
	import SearchInput from './SearchInput.svelte';
	import stickybits from 'stickybits';
	import { onMount } from 'svelte';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';

	onMount(() => {
		stickybits('#top-bar');

		// Tippy
		tippy('#toggle-left-panel', {
			content: 'Show/Hide Left Panel',
			theme: 'athena',
			delay: [400, 0]
		});

		tippy('#toggle-right-panel', {
			content: 'Show/Hide Right Panel',
			theme: 'athena',
			delay: [400, 0]
		});

		tippy('#increaseFont', {
			content: 'Increase Font Size',
			theme: 'athena',
			delay: [400, 0]
		});

		tippy('#decreaseFont', {
			content: 'Decrease Font Size',
			theme: 'athena',
			delay: [400, 0]
		});
	});
</script>

<div id="top-bar">
	<div id="left-cluster">
		<slot name="left-cluster" />
	</div>
	<div id="center-cluster">
		<div id="left-search">
			<slot name="left-search" />
		</div>
		<SearchInput />
		<div id="right-search">
			<slot name="right-search" />
		</div>
	</div>
	<div id="right-cluster">
		<slot name="right-cluster" />
	</div>
</div>

<style>
	#top-bar {
		display: flex;
		flex-direction: row;

		/* grid-template-columns: 1fr 1fr auto 1fr 1fr; */
		justify-content: space-between;
		align-items: center;
		background: var(--background-6);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		margin: 0;
		z-index: 1000;
		min-height: 4rem;
		max-height: 4rem;
	}

	#center-cluster {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	#left-cluster,
	#left-search,
	#right-cluster,
	#right-search {
		display: flex;
		flex-direction: row;
		gap: 2px;
	}

	#left-search,
	#right-search {
		gap: 0;
	}

	#left-cluster,
	#right-search {
		justify-content: start;
	}

	#right-cluster,
	#left-search {
		justify-content: end;
	}

	#left-cluster,
	#right-search {
		margin-left: 10px;
	}

	#right-cluster,
	#left-search {
		margin-right: 10px;
	}
</style>
