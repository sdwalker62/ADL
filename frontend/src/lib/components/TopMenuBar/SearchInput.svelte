<script lang="ts">
	import SearchIcon from '$lib/assets/icons/SearchIcon.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
</script>

<button id="tmp-search-btn" on:click={()=>toast.error("Search will be implemented in a future update.", 	{
	duration: 2000,
	style: 'border-radius: 10px; background: #333; color: #fff; font-size: 1.7em; font-family: var(--f-Medium)'
})}>
	<div id="search-canvas">
		<SearchIcon />
		<input name="search" placeholder="Search documentation..." />
	</div>
</button>

<Toaster />

<style lang="scss">
	#search-canvas {
		@media (min-width: 640px) {
			display: flex;
			border-radius: 7px;
			width: 100%;
			height: 3rem;
			gap: 5px;
			background: var(--background-2);
			justify-content: start;
			align-items: center;
			padding-left: 0.5rem;
		}
	}

	#tmp-search-btn {
		background-color: transparent;
		border: none;
		padding: 0;
		margin: 0;
		width: 100%;
	}

	input {
		background-color: transparent;
		border: none;
		font-family: var(--f-Medium), sans-serif;
		align-self: center;

		&::placeholder {
			color: var(--font-5);
			font-size: 1.5rem;
		}
	}
</style>
