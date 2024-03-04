<script lang="ts">
	import File from './File.svelte';
	import FolderIcon from '$lib/assets/icons/FolderIcon.svelte';

	interface File {
		name: string;
		path: string;
		children?: Array<File>;
	}

	export let active = true;
	export let name: string;
	export let files: Array<File>;
	let hovering = false;

	function capitalizeFirstLetter(word: string) {
		const firstLetter = word.charAt(0);
		const firstLetterCap = firstLetter.toUpperCase();
		const restOfWord = word.slice(1);
		return firstLetterCap + restOfWord;
	}

	function formatName(inStr: string) {
		inStr = inStr.replace('_', ' ');
		const inStrSplit = inStr.split(' ');
		if (inStrSplit.length > 1) {
			return inStrSplit.reduce((acc, curWord) => {
				acc += capitalizeFirstLetter(curWord) + ' ';
				return acc;
			}, ' ');
		} else {
			return capitalizeFirstLetter(inStr);
		}
	}
</script>

<button
	on:click={() => {
		active = !active;
	}}
	on:mouseenter={() => {
		hovering = true;
	}}
	on:mouseleave={() => {
		hovering = false;
	}}
>
	<span id="left-cluster">
		{#key hovering}
			<FolderIcon {active} {hovering} />
		{/key}
		{formatName(name)}
	</span>
	<span id="count-container">
		<span>{files.length}</span>
	</span>
</button>

{#if active}
	<ul>
		{#each files as file}
			<li>
				{#if file.children}
					<svelte:self name={file.name} files={file.children} active />
				{:else}
					<File filePath={file.path} name={file.name} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	button {
		display: grid;
		grid-template-columns: 1fr 3rem;
		padding: 0 0 0 5px;
		background-color: transparent;
		cursor: pointer;
		border: none;
		margin: 0;
		max-width: 100%;
		color: var(--font-1);
		align-items: center;
		text-align: start;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	#left-cluster {
		display: grid;
		grid-template-columns: 3rem 1fr;
		padding: 0;
		background-color: transparent;
		cursor: pointer;
		border: none;
		margin: 0;
		max-width: 100%;
		color: var(--font-1);
		font-family: var(--f-SemiBold), sans-serif;
		font-size: 2rem;
		align-items: center;
		text-align: start;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	#count-container {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background-color: var(--background-4);
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.3rem;
		color: var(--font-2);
	}

	button:hover {
		color: var(--font-1);
		background: var(--gradient-2);
		border-radius: 5px;
	}

	button:hover #count-container {
		background-color: transparent;
		transition: background-color 0s;
		color: white;
	}

	@media (max-width: 1300px) {
		button {
			font-size: 1.6em;
		}
	}

	ul {
		padding: 5px 0 0 3rem;
		margin: 0 0 0 0.5rem;
		list-style: none;
	}

	li {
		padding: 2px 0;
	}
</style>
