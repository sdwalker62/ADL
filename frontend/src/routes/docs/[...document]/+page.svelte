<script lang="ts">
	import { onMount } from 'svelte';
	import { rightPanelActive } from '$lib/data/shared.js';
	import _ from 'lodash';
	import OutlineElement from '$lib/components/Outline/OutlineElement.svelte';
	import stickybits from 'stickybits';
	import copyImg from '$lib/assets/images/copy-solid.svg';
	import downloadImg from '$lib/assets/images/file-code-regular.svg';
	import { copyCode } from '$lib/utilities/copy_code';
	import { addPrompt } from '$lib/utilities/prompt';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import PdfViewer from '$lib/components/PDFViewer.svelte';
	// import type { PageData } from './$types';

	export let data;
	const isPDF: boolean = data.isPDF;
	const htmlDocument: string = data.document;
	const htmlOutline = data.outline;
	const root = data.root!;
	let scrollPos = 0;
	let scrollDirecton = 'down';

	function wrapCode(doc: Document) {
		// in-line code blocks don't use pre
		const codeBlocks = doc.querySelectorAll('pre');
		for (const codeBlock of codeBlocks) {
			codeBlock.outerHTML = `
			<div class='document-code-block-container'>
				<div class='document-code-heading-container'>
					<img class='document-code-img copy-code-button' src=${copyImg} alt="copy-icon" />
					<img class='document-code-img save-code-as-file' src=${downloadImg} alt="download-icon" />
				</div>
				<div class="document-code">
					${codeBlock.outerHTML}
				</div>
			</div>
			`;
		}
	}

	function wrapMath(doc: Document) {
		// in-line code blocks don't use pre
		const codeBlocks = doc.querySelectorAll('span.katex-display');
		for (const codeBlock of codeBlocks) {
			codeBlock.outerHTML = `
			<div class='math-container'>
				${codeBlock.outerHTML}
			</div>
			`;
		}
	}

	function logoClassAdder(doc: Document) {
		const logos = doc.querySelectorAll('img');
		for (const logo of logos) {
			if (logo.src.includes('logo')) {
				logo.classList.add('img-logo');
			}
		}
	}

	onMount(async () => {
		const documentElement = document.getElementById('document');
		documentElement!.addEventListener('scroll', ()=>{
			let st = documentElement!.scrollTop;
			if (st > scrollPos) {
				scrollDirecton = 'down';
			} else {
				scrollDirecton = 'up';
			}
			scrollPos = st <= 0 ? 0 : st;
		})
		if (!isPDF) {
			stickybits('#outline-top-bar-sticky');
			wrapCode(document);
			wrapMath(document);
			logoClassAdder(document);
			let codeBlocks = document.getElementsByClassName('document-code');
			for (let i = 0; i < codeBlocks.length; i++) {
				const preBlockParent: Element | null = codeBlocks.item(i);
				if (preBlockParent) {
					const preBlock = preBlockParent.children[0];
					if (preBlock) {
						if (preBlock.classList.contains('language-shell')) {
							if (preBlock.children[0]) {
								addPrompt(preBlock.children[0] as HTMLElement);
							}
						}
					}
				}
			}

			let copyCodeButtons = document.getElementsByClassName('copy-code-button');
			for (let i = 0; i < copyCodeButtons.length; i++) {
				copyCodeButtons.item(i)!.addEventListener('click', copyCode, false);
			}

			// ======================= Intersection Observer =======================
			const sectionIntersectionCallback = (entries: IntersectionObserverEntry[]) => {
				const outlineElement = document.getElementById('outline-container');
				if (outlineElement) {
					const outlineAnchors = outlineElement.querySelectorAll('a');
					outlineAnchors.forEach((anchor) => {
						const interectingEntries = entries.filter((entry) => entry.isIntersecting);
						if (interectingEntries) {
							console.log(interectingEntries);
							let entry;
							if (scrollDirecton === 'down') {
								entry = interectingEntries[0];
							} else {
								entry = interectingEntries[interectingEntries.length - 1];
							}
							if (entry != undefined) {
								if (anchor.href.includes(entry.target.id)) {
									console.log(entry.target);
									anchor.classList.add('observed');
									// anchor.scrollIntoView({block: 'center'});
									// outlineElement.scrollBy({top: 15});
								} else {
									anchor.classList.remove('observed');
								}
							}
						}
					});
				}
			};
			let observer = new IntersectionObserver(
				sectionIntersectionCallback,
				{
					root: document.getElementById('document'),
					// threshold: _.range(0, 1, 0.75),
					rootMargin: `0px -15px 0px 0px`
				}
			);
			let sections = document.querySelectorAll('h2, h3, h4, h5, h6');
			sections.forEach((section) => {
				observer.observe(section);
			});
			// ====================== Intersection Observer =======================

			tippy('.copy-code-button', {
				content: 'Copy Code',
				theme: 'athena',
				delay: [400, 0]
			});

			tippy('.save-code-as-file', {
				content: 'Download Code As File (WIP)',
				theme: 'athena',
				delay: [400, 0]
			});
		}
	});
</script>

{#if !isPDF}
	<div id="page-canvas" class:rightPanelActive={$rightPanelActive}>
		<div id="document">
			<!--eslint-disable-next-line svelte/no-at-html-tags-->
			{@html htmlDocument}
		</div>
		{#if $rightPanelActive}
			<div id="outline-container">
				<OutlineElement children={htmlOutline} />
			</div>
		{/if}
	</div>
{:else}
	<div id="pdf-canvas">
		<PdfViewer doc={htmlDocument} {root} />
	</div>
{/if}

<style lang="scss">
	#page-canvas {
		display: grid;
		grid-template-rows: 1fr 320px;
		align-items: start;
		justify-content: center;
		background-color: var(--background-1);
		width: 100%;
		height: calc(100vh - 2.5rem - 4rem);
		max-height: calc(100vh - 2.5rem - 4rem);
		overflow: hidden;
	}

	/* ====================== DOC RENDER ====================== */
	#document {
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		overflow-x: hidden;
		padding: 1.5rem;
		width: 100%;
		height: 100%;
		max-height: calc(100vh - 2.5rem - 4rem);
	}

	.rightPanelActive {
		grid-template-columns: 1fr 320px;
	}

	#pdf-canvas {
		height: 100%;
		width: 100%;
		overflow: scroll;
	}

	:global([data-heading-rank='1']) {
		height: calc(100vh - 2.5rem - 4rem);
		max-height: calc(100vh - 2.5rem - 4rem);
	}

	:global(#document section) {
		width: 100%;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

  /*noinspection ALL*/
  :global(#document div.document-code-block-container) {
		display: grid;
		grid-template-rows: 3rem 1fr;
		background: var(--background-9);
		border-radius: 7px;
		padding: 10px;
		margin-top: 20px;
		margin-bottom: 20px;
		width: 100%;
	}

	:global(#document div.document-code) {
		max-width: calc(100vw - 640px);
		word-wrap: pre-wrap;
		overflow: hidden;
	}

	:global(#document .language-shell) {
		background: var(--background-2);
	}

	:global(#document code) {
		word-wrap: break-word;
		max-width: calc(100vw - 640px);
	}

  /*noinspection ALL*/
	:global(#document div.document-code-heading-container) {
		display: flex;
		flex-direction: row;
		gap: 17px;
		margin-left: 6px;
	}

	:global(#document span.document-code-prompt) {
		color: var(--font-5);
	}

	:global(.document-code-img) {
		height: 2rem !important;
		filter: invert(52%) sepia(6%) saturate(194%) hue-rotate(202deg)
			brightness(89%) contrast(84%);
	}

	:global(.document-code-img):hover {
		filter: var(--active-filter);
		/* transition: filter 0.2s ease-in-out; */
		cursor: pointer;
	}

	:global(#document a) {
		color: var(--highlight);
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.8rem;
		align-self: start;
		
	}

	#document {
		& :global(li::marker) {
			content: counters(item, ".", upper-roman)".";
			text-align: center;
   			display: inline-block;
		}

		& :global(li) {
			counter-increment: item;
			margin: 1.5rem 0;
			line-height: 1.5;
		}

		& :global(em) {
			font-style: italic;
		}

		& :global(ol) {
			list-style-position: outside;
			counter-reset: item;
			padding: 0 5rem;
		}

		& :global(code:not([class])) {
			color: var(--highlight);
		}

		& :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {
			color: var(--font-2);
			align-self: start;
		}

		& :global(p:has(img)) {
			display: flex;
			justify-content: center;
			padding: 1.5rem;
			width: 100%;
		}

		& :global(p:has(em)) {
			display: flex;
			justify-content: center;
			padding: 1.5rem;
			width: 100%;
		}

		& :global(img.img-logo) {
			width: 14rem;
			height: auto;
		}

	}

	:global(#document h1) {
		
		font-family: var(--f-ExtraBold), sans-serif;
		font-size: 4rem;
		font-weight: 100;
		padding: 3rem 0;
	}

	:global(#document h2) {
		font-family: var(--f-Bold), sans-serif;
		font-size: 3rem;
		opacity: 0.8;
		padding: 2rem 0;
	}

	:global(#document h3) {
		font-family: var(--f-Bold), sans-serif;
		font-size: 2.3rem;
		opacity: 0.8;
		padding: 1.3rem 0;
	}

	:global(#document h4) {
		font-family: var(--f-Bold), sans-serif;
		font-size: 2rem;
		opacity: 0.8;
		padding: 1rem 0;
	}

	:global(#document h5) {
		font-family: var(--f-Bold), sans-serif;
		font-size: 1.5rem;
		opacity: 0.8;
		padding: 1rem 0;
	}

	:global(#document h6) {
		font-family: var(--f-Bold), sans-serif;
		font-size: 1.3rem;
		opacity: 0.8;
		padding: 1rem 0;
	}

	:global(.katex) {
		overflow: auto hidden;
		position: relative;
	}

	// :global(.katex-display) {
	// 	margin: 0 !important;
	// }

	:global(.katex-display) {
		overflow: auto hidden;
	}

  	:global(.katex-display span) {
		color: var(--font-2);
		font-family: 'KaTeX_Main', serif;
		font-size: 2.5rem;
		line-height: 3;
		// text-overflow: ellipsis;
		text-align: start;
	}

	:global(p:has(.katex)) {
		text-align: center;
	
	}

	:global(#document p) {
		padding: 1rem 2rem;
		color: var(--font-2);
		line-height: 1.5;
		font-family: var(--f-Regular), sans-serif;
		font-size: 2rem;
		align-self: start;
	}

	:global(#document p:has( > span.katex)) {
		align-self: center;
	}

	:global(#document :is(th tr)) {
		color: var(--font-2);
	}

	:global(#document li) {
		padding: 0 2rem;
		font-size: 2rem;
		color: var(--font-2);
	}

	:global(#document ul),
	:global(#document ol) {
		color: var(--font-2);
		margin-left: 20px;
		font-family: var(--f-Regular), sans-serif;
		font-size: 2rem;
	}


// ====================== TABLE ======================

	:global(thead) {
		background-color: var(--background-2);
		font-family: var(--f-Medium), sans-serif;
		font-size: 2rem;
	}

	:global(th) {
		padding: 10px;
		color: var(--font-3);
		text-align: center;
	}

	:global(tr) {
		color: var(--font-2);
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.8rem;
	}

	:global(td) {
		border: solid 1px var(--background-2);
		color: var(--font-2);
		font-family: var(--f-Medium), sans-serif;
		font-size: 2rem;
		text-align: center;
	}

	:global(code .code-line span) {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: pre-wrap;
	}

	:global(code .code-line span) {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: pre-wrap;
	}

	:global(li > code),
	:global(p > code) {
		font-family: var(--f-Mono), monospace;
		font-size: 2rem;
		line-height: 1.5em;
		padding: 5px;
		border-radius: 10px;
		background-color: var(--background-2);
	}

	:global(*)::-webkit-scrollbar {
		display: none;
	}

	/* ====================== OUTLINE ====================== */
	#outline-container {
		background: var(--background-2);
		overflow-y: scroll;
		overflow-x: hidden;
		text-overflow: ellipsis;
		width: 320px;
		height: 100%;
		max-height: calc(100vh - 2.5rem - 4rem);
		min-height: calc(100vh - 2.5rem - 4rem);
		padding: 1.5rem;
	}

	:global(#outline-container *) {
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 320px;
	}

	:global(#outline-container .h1 span) {
		padding-bottom: 1.2rem;
	}
	:global(#outline-container .h2 span) {
		padding-bottom: 1.2rem;
	}
	:global(#outline-container .h3 span) {
		padding-bottom: 1.2rem;
	}
	:global(#outline-container .h4 span) {
		padding-bottom: 1.2rem;
	}
	:global(#outline-container .h5 span) {
		padding-bottom: 1.2rem;
	}
	:global(#outline-container .h6 span) {
		padding-bottom: 1.2rem;
	}

	:global(#outline-container .code-line) {
		font-size: 1.6rem;
	}

	:global(#document mark) {
		color: red;
	}

  /*noinspection ALL*/
	:global(.table-block) {
		display: flex;
		align-content: center;
		justify-content: center;
		padding: 2rem 2rem;
	}
</style>
