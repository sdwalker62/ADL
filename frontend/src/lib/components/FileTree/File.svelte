<script lang="ts">
	import markdownLogo from '$lib/assets/images/markdown.svg';
	import fileLogo from '$lib/assets/icons/doc.richtext.fill.svg';
	import { page } from '$app/stores';

	// https://codepen.io/sosuke/pen/Pjoqqp
	export let filePath: string;
	export let name: string;
	const docPath = `${$page.url.origin}/docs/${filePath}`;
	let highlight = '';
	if (filePath == $page.params.document) {
		highlight = 'highlight';
	}

	console.log(docPath.endsWith(".pdf"));

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

<div class={highlight} id="file-selector-canvas">
	{#if docPath.endsWith(".pdf")}
		<img id="pdf-icon" src={fileLogo} alt="pdf" />
	{:else}
		<img src={markdownLogo} alt="markdown" />
	{/if}
	<!-- <img src={markdownLogo} alt="markdown" /> -->
	<a data-sveltekit-reload data-sveltekit-preload-data href={docPath}
		>{formatName(name).slice(0, -3).replace('.', '')}</a
	>
</div>

<style lang="scss">
	#pdf-icon {
		scale: 0.8;
	}
	
	#file-selector-canvas {
		display: flex;
		align-items: center;
		border-radius: 5px;
		width: 100%;
		gap: 0.5rem;
		padding-left: 0.5rem;
	}

	:global(.highlight) {
		background: var(--gradient-1);
	}

	:global(.highlight) > img {
		filter: invert(4%) sepia(5%) saturate(40%) hue-rotate(314deg) brightness(93%) contrast(90%);
	}

	:global(.highlight) > a {
		color: var(--highlight-font);
		font-family: var(--f-SemiBold), sans-serif;
		background: transparent;
	}

	#file-selector-canvas:hover {
		background: var(--gradient-1);
	}

	#file-selector-canvas:hover > img {
		filter: invert(87%) sepia(88%) saturate(0%) hue-rotate(186deg) brightness(110%) contrast(97%);
	}

	img {
		width: 2.5rem;
		filter: invert(52%) sepia(6%) saturate(194%) hue-rotate(202deg) brightness(89%) contrast(84%);
	}

	a {
		text-decoration: none;
		color: var(--font-2);
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.8rem;
		text-overflow: ellipsis;
		overflow: hidden;
		text-wrap: nowrap;

		&:hover {
			color: var(--font-1);
		}
	}

</style>
