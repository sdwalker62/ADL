<script lang="ts">
	import SearchIcon from '$lib/assets/icons/SearchIcon.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
</script>

<button id="tmp-search-btn" on:click={()=>toast.error("Search will be implemented in a future update.", 	{
	duration: 2000,
	style: 'border-radius: 10px; background: #333; color: #fff; font-size: 1.7em; font-family: var(--f-Medium)'
})}>
	<div id="search-canvas">
		<div class="icon">
			<SearchIcon />
		</div>
		<input name="search" placeholder="Search documentation..." />
	</div>
</button>

<Toaster />

<style>
	#search-canvas {
		display: grid;
		grid-template-columns: 3rem 1fr;
		border-radius: 7px;
		width: 60rem;
		height: 3rem;
		gap: 5px;
		background: var(--background-2);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		justify-content: center;
		align-items: center;
	}

	#tmp-search-btn {
		background-color: transparent;
		border: none;
	}

	input {
		background-color: transparent;
		border: none;
		font-family: var(--f-Medium), sans-serif;
		align-self: center;
	}

	input::placeholder {
		color: var(--font-5);
		font-size: 1.5rem;
	}

	.icon {
		display: flex;
		height: calc(3rem - 10px);
		padding: 5px;
		justify-content: center;
		align-items: start;
		margin: 0;
		overflow: visible;
	}
</style>
