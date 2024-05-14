<script lang="ts">
	import { onMount } from 'svelte';
	import { rightPanelActive } from '$lib/data/shared.js';
	import _ from 'lodash';
	import OutlineElement from '$lib/components/Outline/OutlineElement.svelte';
	import stickybits from 'stickybits';
	import updateImg from '$lib/assets/images/code-pull-request-solid.svg';
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

	function getH1Element(dom: HTMLElement, entry: IntersectionObserverEntry) {
		const target: Element = entry.target;
		let headingElement: HTMLElement | null = target.querySelector('h1');
		if (headingElement) {
			const headingID: string | null = headingElement.getAttribute('id');
			// noinspection LoopStatementThatDoesntLoopJS
			for (const child of dom.children) {
				const element = child.querySelector(`[href="#${headingID}"]`);
				return element ? element : null;
			}
		}
		return null;
	}

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

	onMount(async () => {
		if (!isPDF) {
			stickybits('#outline-top-bar-sticky');
			wrapCode(document);
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
			const doc = document.getElementById('document');
			let options = {};
			if (doc) {
				const interceptHeight = 40 - 0.99 * doc.clientHeight;
				options = {
					root: doc,
					thresholds: _.range(0, 1, 0.1),
					rootMargin: `40px 0px ${interceptHeight}px 0px`
				};
			}

			const sectionIntersectionCallback = (
				entries: IntersectionObserverEntry[]
			) => {
				let outline = document.getElementById('outline-container');
				if (outline) {
					if (!outline.hasChildNodes()) return;
					entries.forEach((entry) => {
						let e = getH1Element(outline!, entry);
						if (e) {
							if (entry.isIntersecting) {
								const otherHeadings = document.querySelectorAll('a.observed');
								if (otherHeadings) {
									otherHeadings.forEach((heading) => {
										heading.classList.remove('observed');
									});
								}
								e.classList.add('observed');
								e.classList.remove('non-observed');
							} else {
								e.classList.add('non-observed');
								e.classList.remove('observed');
							}
						}
					});
				}
			};
			let observer = new IntersectionObserver(
				sectionIntersectionCallback,
				options
			);
			let sections = document.querySelectorAll('[data-heading-rank="1"]');
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
	<div
		id="page-canvas"
		class="no-scroll-bar constrained-height"
		class:rightPanelActive={$rightPanelActive}
	>
		<div id="document" class="no-scroll-bar constrained-height flex-col">
			<!--eslint-disable-next-line svelte/no-at-html-tags-->
			{@html htmlDocument}
		</div>
		{#if $rightPanelActive}
			<!-- <div id="outline" class="no-scroll-bar constrained-height flex-col"> -->
			<div id="outline-container" class="no-scroll-bar">
				<OutlineElement children={htmlOutline} />
			</div>
			<!-- </div> -->
		{/if}
	</div>
{:else}
	<div id="pdf-canvas">
		<PdfViewer doc={htmlDocument} {root} />
	</div>
{/if}

<style lang="scss">
	.rightPanelActive {
		grid-template-columns: 1fr 320px;
	}

	#pdf-canvas {
		height: 100%;
		width: 100%;
		overflow: scroll;
	}

  /*noinspection ALL*/
  :global(#document div.document-code-block-container) {
		display: grid;
		grid-template-rows: 3rem 1fr;
		background-color: var(--background-7);
		border-radius: 7px;
		padding: 10px;
		margin-top: 20px;
		margin-bottom: 20px;
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

	#page-canvas {
		display: grid;
		grid-template-rows: 1fr 320px;
		align-items: start;
		justify-content: center;
		background-color: var(--background-1);
		overflow: hidden;
		width: 100%;
	}

	/* ====================== DOC RENDER ====================== */
	#document {
		display: flex;
		flex-direction: column;
		position: sticky;
		overflow: scroll;
		padding-left: 20px;
		padding-right: 20px;
	}

	:global(#document a) {
		color: var(--highlight);
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.8rem;
	}

	:global(#document h1) {
		color: var(--font-2);
		font-family: var(--f-ExtraBold), sans-serif;
		font-size: 4rem;
		opacity: 1;
		font-weight: 100;
	}

	:global(#document h2) {
		color: var(--font-2);
		font-family: var(--f-Bold), sans-serif;
		font-size: 3rem;
		opacity: 0.8;
	}

	:global(#document h3) {
		color: var(--font-2);
		font-family: var(--f-Bold), sans-serif;
		font-size: 2.3rem;
		opacity: 0.8;
	}

	:global(#document h4) {
		color: var(--font-2);
		font-family: var(--f-Bold), sans-serif;
		font-size: 3rem;
		opacity: 0.8;
	}

	:global(#document h5) {
		color: var(--font-2);
		font-family: var(--f-Bold), sans-serif;
		font-size: 3rem;
		opacity: 0.8;
	}

	:global(#document h6) {
		color: var(--font-2);
		font-family: var(--f-Bold), sans-serif;
		font-size: 3rem;
		opacity: 0.8;
	}

  :global(.katex-display span) {
		color: var(--font-2);
		font-family: 'KaTeX_Main', serif;
		font-size: 2.5rem;
		line-height: 3;
		text-overflow: ellipsis;
		text-align: start;
	}

	:global(p:has(.katex)) {
		text-align: center;
	
	}

	:global(#document p) {
		padding-left: 20px;
		padding-right: 20px;
		color: var(--font-2);
		line-height: 1.5;
		font-family: var(--f-Regular), sans-serif;
		font-size: 2rem;
	}

	:global(#document :is(th tr)) {
		color: var(--font-2);
	}

	:global(#document li) {
		padding-left: 20px;
		padding-right: 20px;
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
		max-height: calc(100vh - 2.5rem - 4rem);
		padding: 1.5rem;
	}

	:global(#outline-container *) {
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 320px;
	}

  /*noinspection ALL*/
	:global(.table-block) {
		display: flex;
		align-content: center;
		justify-content: center;
	}
</style>
