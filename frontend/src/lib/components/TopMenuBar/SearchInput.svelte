<script lang="ts">
	import SearchIcon from '$lib/assets/icons/SearchIcon.svelte';
</script>

<div id="search-canvas">
	<div class="icon">
		<SearchIcon />
	</div>
	<input name="search" placeholder="Search documentation..." />
</div>

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
