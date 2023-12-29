<script lang="ts">
	import CodeListItem from '$lib/components/Outline/CodeListItem.svelte';
	import HeadingListItem from '$lib/components/Outline/HeadingListItem.svelte';
	import MathListItem from '$lib/components/Outline/MathListItem.svelte';
	import TableListItem from '$lib/components/Outline/TableListItem.svelte';
	import H1ListItem from '$lib/components/Outline/H1ListItem.svelte';

	interface Node {
		name: string;
		tagName: string;
		sectionLevel: number;
		html: string;
		children: Array<object>;
	}

	export let children: Node[];
	export let name: string;
	export let innerHTML = '';
	export let sectionLevel = 0;
	let skip = name.includes('root') ? true : false;
</script>

{#if !skip}
	{#if sectionLevel == 1}
		<H1ListItem {name} html={innerHTML} />
	{:else}
		<HeadingListItem {name} rank={sectionLevel} html={innerHTML} />
	{/if}
	<ul>
		{#each children as child}
			<li>
				{#if child.children && child.children.length > 0}
					<svelte:self
						name={child.name}
						children={child.children}
						innerHTML={child.html}
						sectionLevel={child.sectionLevel}
					/>
				{:else if child.tagName === 'code'}
					<CodeListItem innerHTMLString={child.html} />
				{:else if child.tagName === 'math'}
					<MathListItem innerHTMLString={child.html} />
				{:else if child.tagName === 'table'}
					<TableListItem innerHTMLString={child.html} />
				{:else if child.tagName.startsWith('s')}
					<HeadingListItem name={child.name} rank={child.sectionLevel} html={child.html} />
				{/if}
			</li>
		{/each}
	</ul>
{:else}
	<ul class="no-left-pad">
		{#each children as child}
			<li>
				{#if child.children}
					<svelte:self
						name={child.name}
						children={child.children}
						innerHTML={child.html}
						sectionLevel={child.sectionLevel}
					/>
				{:else if child.tagName === 'code'}
					<CodeListItem innerHTMLString={child.html} />
				{:else if child.tagName === 'math'}
					<MathListItem innerHTMLString={child.html} />
				{:else if child.tagName === 'table'}
					<TableListItem innerHTMLString={child.html} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		padding: 5px 0 0 5px;
		margin: 0 0 0 5px;
		list-style: none;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	li {
		padding: 2px 0;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.no-left-pad {
		padding-left: 0;
		padding-top: 0;
		margin-left: 0;
	}
</style>
