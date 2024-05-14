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

	function formatName(inStr: string) {
		inStr = inStr.replace('_', ' ');
		const inStrSplit = inStr.split(' ');
		if (inStrSplit.length > 1) {
			return inStrSplit.reduce((acc, curWord) => {
				acc += curWord + ' ';
				return acc;
			}, ' ');
		} else {
			return inStr;
		}
	}
</script>

<button
	on:click={() => {
		active = !active;
	}}
>
	<div id="button-left__cluster">
		<FolderIcon active={active} />
		<span id="button-folder__name">
			{formatName(name)}
		</span>
	</div>
	<span id="button-folder__count">
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

<style lang="scss">
	button {
		display: flex;
		justify-content: space-between;
		background: transparent;
		cursor: pointer;
		border: none;
		color: var(--font-1);
		align-items: center;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		padding: 0;
		margin: 0;
		gap: 0.5rem;
		padding-left: 0.5rem;

		&:hover {
			color: var(--font-1);
			background: var(--gradient-2);
			border-radius: 5px;
		}

		&:hover #button-folder__count {
			background-color: transparent;
			transition: background-color 0s;
			color: white;
		}
	}

	#button-left__cluster {
		display: flex;
		align-items: center;
		justify-content: start;
		gap: 0.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	#button-folder__name {
		text-align: start;
		color: var(--font-1);
		font-family: var(--f-SemiBold), sans-serif;
		font-size: 2rem;
		text-overflow: ellipsis;
		text-transform: capitalize;
		overflow: hidden;
	}

	#button-folder__count {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 7px;
		background-color: var(--background-4);
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.3rem;
		color: var(--font-2);
		width: 3rem;
		min-width: 3rem;
	}

	ul {
		list-style: none;
		width: 100%;
		padding-left: 1.2rem;
		padding-top: 0.5rem;
	}

	li {
		width: 100%;
		padding: 0.2rem 0;
	}
</style>
