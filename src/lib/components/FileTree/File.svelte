<script>
	import markdownLogo from '$lib/assets/images/markdown.svg';
	import fileLogo from '$lib/assets/icons/doc.richtext.fill.svg';
	import { page } from '$app/stores';

	// https://codepen.io/sosuke/pen/Pjoqqp
	export let filePath;
	export let name;
	const docPath = `${$page.url.origin}/docs/${filePath}`;
	let highlight = '';
	if (filePath == $page.params.document) {
		highlight = 'highlight';
	}

	/**
	 * @param {string} word
	 */
	function capitalizeFirstLetter(word) {
		const firstLetter = word.charAt(0);
		const firstLetterCap = firstLetter.toUpperCase();
		const restOfWord = word.slice(1);
		return firstLetterCap + restOfWord;
	}

	/**
	 * @param {string} inStr
	 */
	function formatName(inStr) {
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
	<img src={markdownLogo} alt="markdown" />
	<a data-sveltekit-reload data-sveltekit-preload-data href={docPath}
		>{formatName(name).slice(0, -3).replace('.', '')}</a
	>
</div>

<style>
	#file-selector-canvas {
		display: grid;
		grid-template-columns: 2rem 1fr;
		align-items: center;
		gap: 10px;
		border-radius: 5px;
		width: 95%;
		padding-left: 5px;
		padding-right: 5px;
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
		filter: invert(52%) sepia(6%) saturate(194%) hue-rotate(202deg) brightness(89%) contrast(84%);
	}

	a:hover {
		color: var(--font-1);
	}

	a {
		text-decoration: none;
		color: var(--font-2);
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.8rem;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	@media (max-width: 1300px) {
		a {
			font-size: 1.5em;
		}

		#file-selector-canvas {
			border-radius: 5px;
			width: 95%;
			padding-left: 5px;
			height: 35px;
		}
	}
</style>
