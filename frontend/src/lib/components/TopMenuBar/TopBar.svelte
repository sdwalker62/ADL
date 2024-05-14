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
		<div id="bar-center__cluster--left">
			<slot name="left-search" />
		</div>
		<SearchInput />
		<div id="bar-center__cluster--right">
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
		grid-template-columns: 1fr 1fr;
		width: 100%;
		max-width: 100%;
		align-items: center;
		background: var(--background-6);
		height: 6rem;
		@media (min-width: 640px) {
			height: 4rem;
			width: 100%;
			min-width: 100%;
			grid-template-columns: 320px 1fr 320px;
		}
	}

	#bar-left__cluster {
		display: flex;
		flex-direction: row;
		gap: 0.2rem;
		justify-content: start;
		margin-left: 1rem;
		grid-area: "left-cluster";
		width: 100%;
		max-width: 320px;
		@media (min-width: 640px) {
			grid-area: "left-cluster";
		}
	}

	#bar-center__cluster {
		display: none;
		width: 100%;
		padding: 0 1.5rem;
		@media (min-width: 640px) {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			grid-area: "center-cluster";
		}
	}

	#bar-right__cluster {
		display: flex;
		flex-direction: row;
		gap: 0.2rem;
		justify-content: end;
		margin-right: 1rem;
		width: 100%;
		max-width: 320px;
		@media (min-width: 640px) {
			grid-area: "right-cluster";
		}
	}

	#bar-center__cluster--left {
		display: none;
		flex-direction: row;
		gap: 0;
		justify-content: end;
		margin-right: 1rem;
	}

	#bar-center__cluster--right {
		display: none;
		flex-direction: row;
		gap: 0;
		justify-content: start;
		margin-left: 1rem;
	}
</style>
