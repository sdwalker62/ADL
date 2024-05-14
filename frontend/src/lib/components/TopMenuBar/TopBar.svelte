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

<div id="bar__container">
	<div id="bar-left__cluster">
		<slot name="left-cluster" />
	</div>
	<div id="bar-center__cluster">
		<div id="left-search">
			<slot name="left-search" />
		</div>
		<SearchInput />
		<div id="right-search">
			<slot name="right-search" />
		</div>
	</div>
	<div id="bar-right__cluster">
		<slot name="right-cluster" />
	</div>
</div>

<style lang="scss">
	#bar__container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		justify-content: space-between;
		align-items: center;
		background: var(--background-6);
		height: 4rem;
	}

	#bar-center__cluster {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	#bar-left__cluster,
	#left-search,
	#bar-right__cluster,
	#right-search {
		display: flex;
		flex-direction: row;
		gap: 0.2rem;
	}

	#left-search,
	#right-search {
		gap: 0;
	}

	#bar-left__cluster,
	#right-search {
		justify-content: start;
	}

	#bar-right__cluster,
	#left-search {
		justify-content: end;
	}

	#bar-left__cluster,
	#right-search {
		margin-left: 1rem;
	}

	#bar-right__cluster,
	#left-search {
		margin-right: 1rem;
	}
</style>
