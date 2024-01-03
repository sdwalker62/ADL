<script lang="ts">
	// This component is responsible for loading, viewing, and controlling
	// pdfs in the browser. It uses Mozilla's pdf.js library for all of the
	// pdf parsing. More information on pdf.js can be found here:
	//
	// https://github.com/mozilla/pdf.js/blob/399475247feeffb3184d1c865530930a8638aa0e/src/display/api.js#L236
	//
	// A basic example can be found here and is the foundation on which this
	// component is built.
	//
	// https://github.com/mozilla/pdf.js/blob/master/examples/learning/prevnext.html
	//
	// How to make thumbnail preview is from this link:
	//
	// https://stackoverflow.com/questions/44547585/generating-thumbnail-of-a-pdf-using-pdf-js

	// #region Imports
	import _ from 'lodash';
	import * as pdfjsLib from 'pdfjs-dist';
	import DownloadIcon from '$lib/assets/icons/DownloadIcon.svelte';
	import ZoomIcon from '$lib/assets/icons/ZoomIcon.svelte';
	import ZoomMinus from '$lib/assets/icons/ZoomMinus.svelte';
	import ZoomPlus from '$lib/assets/icons/ZoomPlus.svelte';
	import type { PDFPageProxy, PDFDocumentProxy } from 'pdfjs-dist';
	import { pdfZoom } from '$lib/data/shared';
	import { onMount } from 'svelte';
	import ThemeSwitcherIcon from '$lib/assets/icons/ThemeSwitcherIcon.svelte';
	import { rightPanelActive } from '$lib/data/shared';
	// #endregion

	// #region Props
	export let doc: string;
	export let root: string;
	// #endregion

	// #region Reactive Declarations
	$: if ($rightPanelActive) {
		templateString = '1fr 180px';
	} else {
		templateString = '1fr 0';
	}
	// #endregion

	// #region Local Variables
	let pdfDoc: PDFDocumentProxy;
	let mainCanvas: HTMLElement;
	let outline: HTMLElement;
	let pageCount: number;
	let curPage = 1;
	let pdfContainer: HTMLDivElement;
	let pdfCurPageInput: HTMLInputElement;
	let pdfRenderer: PDFRenderer;
	let zoomInput: HTMLInputElement;
	let zoom = 100;
	let background3Color: string;
	let font1Color: string;
	let templateString: string;

	// #endregion

	class PDFRenderer {
		private pdfDocument: PDFDocumentProxy;
		private observer: IntersectionObserver;
		public numPages: number;
		private documentPageRange: number[];
		private highQualityScale: number = 1;
		private lowQualityScale: number = 0.01;
		private thumbnailScale: number = 0.2;
		private pageScale: number = 2;
		private pixelRatio: number;
		private rootElement: HTMLElement;
		private outlineElement: HTMLElement;
		private pdfPageRenderWidth: number;
		private outlineRenderWidth: number;
		private interceptHeight: number;
		private renderNeighborhoodRadius: number = 2;
		private isFirstPageLoad = true;
		private alreadyRenderedIndices: Set<number> = new Set();
		private outlinePadding: number;
		private rootPadding: number;
		private rootPaddingWidth: number;
		private outlinePaddingWidth: number;

		constructor(
			pdfDocument: PDFDocumentProxy,
			rootElement: HTMLElement,
			outlineElement: HTMLElement
		) {
			this.pdfDocument = pdfDocument;
			this.numPages = pdfDocument.numPages;
			this.documentPageRange = _.range(1, this.numPages);
			this.interceptHeight = 40 - 0.99 * pdfContainer.clientHeight;
			this.observer = new IntersectionObserver(this.pageVisibilityCallback, {
				root: pdfContainer,
				threshold: _.range(0, 1, 0.1),
				rootMargin: `40px 0px ${this.interceptHeight}px 0px`
			});
			this.pixelRatio = window.devicePixelRatio || 1;
			this.rootElement = rootElement;
			this.outlineElement = outlineElement;
			this.outlinePadding = Number(outlineElement.style.padding.slice(0, -2));
			this.rootPadding = Number(rootElement.style.padding.slice(0, -2));
			this.rootPaddingWidth = 10 * 2;
			this.outlinePaddingWidth = 10 * 2;
			this.pdfPageRenderWidth =
				this.rootElement.offsetWidth - this.rootPaddingWidth;
			this.outlineRenderWidth =
				this.outlineElement.offsetWidth - this.outlinePaddingWidth;
		}

		/**
		 * This function is responsible for rendering the main PDF page.
		 */
		private pdfPageHTMLFactory(pageNum: number): HTMLDivElement {
			let canvas = document.createElement('canvas');
			let pageDiv = document.createElement('div');
			pageDiv.append(canvas);
			pageDiv.classList.add('pdf-page');
			pageDiv.id = `${pageNum}`;
			this.observer.observe(pageDiv);

			return pageDiv;
		}

		/**
		 * This function is responsible for rendering the thumbnail preview of a PDF page.
		 */
		private thumbnailHTMLFactory(
			pageNum: number,
			pdfPageDiv: HTMLDivElement
		): HTMLAnchorElement {
			// const thumbnailCanvas = renderThumbnailCanvas(pdfPage, thumbnailScale);
			let canvas = document.createElement('canvas');

			// create a div to hold the page number
			let pageIndicatorDiv = document.createElement('div');
			pageIndicatorDiv.classList.add('pdf-thumbnail-pageIndex');
			pageIndicatorDiv.innerHTML = `<span>${pageNum}</span>`;

			// create a div to hold the canvas and page number
			let thumbnailDiv = document.createElement('div');
			thumbnailDiv.appendChild(canvas);
			thumbnailDiv.appendChild(pageIndicatorDiv);

			// create an anchor element to link to page
			let aRef = document.createElement('a');
			aRef.href = `#${pageNum}`;
			aRef.id = `thumbnail-${pageNum}`;
			aRef.classList.add('pdf-thumbnail-link');
			aRef.appendChild(thumbnailDiv);

			aRef.addEventListener('click', (e: MouseEvent) => {
				e.preventDefault();
				pdfPageDiv.scrollIntoView();
				// if (pageNum === 1) {
				// 	mainCanvas.scrollBy({ top: -55 });
				// } else {
				// 	mainCanvas.scrollBy({ top: -40 });
				// }
			});

			return aRef;
		}

		/**
		 * Renders all pages of the PDF document.
		 */
		public buildHTMLElements(): void {
			this.documentPageRange.forEach((pageNum) => {
				const pageDiv = this.pdfPageHTMLFactory(pageNum);
				const thumbnailDiv = this.thumbnailHTMLFactory(pageNum, pageDiv);
				outline.appendChild(thumbnailDiv);
				mainCanvas.appendChild(pageDiv);
			});
		}

		/**
		 * Renders the canvas element for a PDF page.
		 */
		private renderCanvas(
			canvas: HTMLCanvasElement,
			page: PDFPageProxy,
			scale: number = 1,
			scalingFactor: number = 0.1,
			rootWidth: number
		): void {
			const viewport = page.getViewport({ scale: scale });
			let context = canvas.getContext('2d')!;
			// context.filter = 'invert(1)';
			const outputScale = this.pixelRatio * scalingFactor;
			const renderScaleCoefficient = rootWidth / viewport.width;

			canvas.width = Math.floor(viewport.width * outputScale);
			canvas.height = Math.floor(viewport.height * outputScale);
			let styleWidth = (zoom * renderScaleCoefficient * viewport.width) / 100;
			let styleHeight = (zoom * renderScaleCoefficient * viewport.height) / 100;
			if (styleWidth > this.rootElement.offsetWidth) {
				styleWidth = this.rootElement.offsetWidth - 15;
				styleHeight = (styleWidth * viewport.height) / viewport.width;
			}
			canvas.style.width = Math.floor(styleWidth) + 'px';
			canvas.style.height = Math.floor(styleHeight) + 'px';

			let transform =
				outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
			const renderParams = {
				canvasContext: context!,
				viewport: viewport,
				transform: transform!,
				pageColors: {
					background: background3Color,
					foreground: font1Color
				}
			};
			page.render(renderParams).promise;
		}

		/**
		 * Renders all canvases for the PDF document.
		 */
		public renderAllCanvases(renderThumbnails = true): void {
			this.documentPageRange.forEach(async (pageNum) => {
				const page = await this.pdfDocument.getPage(pageNum);
				const pageDiv = document.getElementById(`${pageNum}`)!;
				const canvas = pageDiv.querySelector('canvas')!;
				this.renderCanvas(
					canvas,
					page,
					this.pageScale,
					1,
					this.pdfPageRenderWidth
				);
				if (renderThumbnails) {
					const thumbnail = document.getElementById(`thumbnail-${pageNum}`)!;
					const thumbnailCanvas = thumbnail.querySelector('canvas')!;
					this.renderCanvas(
						thumbnailCanvas,
						page,
						this.thumbnailScale,
						1,
						this.outlineRenderWidth
					);
				}
			});
		}

		/**
		 * Callback that is triggered whenever a new PDF page is scrolled into view.
		 */
		private pageVisibilityCallback = (entries: IntersectionObserverEntry[]) => {
			let thumbnails = outline.querySelectorAll('a');
			let pdfPages: NodeListOf<HTMLDivElement> =
				mainCanvas.querySelectorAll('.pdf-page');
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const pageIndex = entry.target.id;
					curPage = Number(pageIndex);
					/*
					To optimize rendering performance we will only render pages within a
					radius of the currently viewed page. This radius value can be changed
					at the top of this file (renderNeighborhoodRadius). All pages outside
					of this neighborhood will be rendered at a reduced scale. Without this
					optimization large PDFs will crash the browser. The scale at whic the
					in-focus pages are rendered can also be changed at the top of this file
					under the variable renderInFocusScale. Similarly, the scale at which
					out-of-focus pages are rendered can be changed under the variable
					renderOutOfFocusScale.
				*/
					const neighborHoodLB =
						Number(pageIndex) - this.renderNeighborhoodRadius;
					const neighborHoodUB =
						Number(pageIndex) + this.renderNeighborhoodRadius;
					if (this.isFirstPageLoad) {
						for (let i = 1; i <= neighborHoodUB; i++) {
							this.alreadyRenderedIndices.add(i);
						}
						this.isFirstPageLoad = false;
					} else {
						pdfPages.forEach(async (page: HTMLDivElement) => {
							const pageNum = Number(page.id);
							const checkIfInNeighborhood = (pageNum: number) => {
								if (pageNum >= neighborHoodLB && pageNum <= neighborHoodUB) {
									return true;
								} else {
									return false;
								}
							};
							const pdfPage = await this.pdfDocument.getPage(pageNum);
							if (checkIfInNeighborhood(pageNum)) {
								if (!this.alreadyRenderedIndices.has(pageNum)) {
									this.alreadyRenderedIndices.add(pageNum);
									let canvas = page.querySelector('canvas')!;
									this.renderCanvas(
										canvas,
										pdfPage,
										this.pageScale,
										this.highQualityScale,
										this.pdfPageRenderWidth
									);
								}
							} else {
								if (this.alreadyRenderedIndices.has(pageNum)) {
									let canvas = page.querySelector('canvas')!;
									this.renderCanvas(
										canvas,
										pdfPage,
										this.pageScale,
										this.lowQualityScale,
										this.pdfPageRenderWidth
									);
									this.alreadyRenderedIndices.delete(pageNum);
								}
							}
						});
					}

					if ($rightPanelActive) {
						thumbnails.forEach((thumbnail: HTMLElement) => {
							const thumbnailIndex = thumbnail.id.split('-')[1];
							if (thumbnailIndex === pageIndex) {
								thumbnail.classList.add('active');
								thumbnail.scrollIntoView(false);
								// outline.scrollBy({ top: -55 });
							} else {
								thumbnail.classList.remove('active');
							}
						});
					}
				}
			});
		};
	}

	onMount(async () => {
		// #region PDF Load and Render Logic
		const pdfData = window.atob(doc); // Load PDF from base64 encoding
		const pdfWorkerPath = '/node_modules/pdfjs-dist/build/pdf.worker.js';
		pdfjsLib.GlobalWorkerOptions.workerSrc = root + pdfWorkerPath;
		pdfDoc = await pdfjsLib.getDocument({
			data: pdfData
		}).promise;
		// #endregion

		// #region Page Input Keypress Handler
		pdfCurPageInput.addEventListener('keypress', (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				const pageNumber = pdfCurPageInput.value;
				const pdfPage = document.getElementById(
					pageNumber.toString()
				) as HTMLDivElement;
				pdfPage.scrollIntoView();
				/*
					I don't like this solution. There are numerous reasons this is a bad solution:
						1. We cannot always expect this value to be correct as it will change with other 
						changes to the geometry of the screen.
						2. The value should be based on the element of the DOM, not arbitrary pixel values

					For now this solution will stay, but we should come back and correct this!
					TODO: FIX
					THIS ALSO HAS TO BE DONE TO THE CLICK METHODS =(
					*/
				// if (pageNumber === '1') {
				// 	mainCanvas.scrollBy({ top: -55 });
				// } else {
				// 	mainCanvas.scrollBy({ top: -40 });
				// }
			}
		});
		// #endregion

		// #region Zoom Input Keypress Handler
		zoomInput.addEventListener('keypress', (event) => {
			const zoomInputValue = Number(zoomInput.value);
			if (event.key === 'Enter') {
				if (!isFinite(zoomInputValue)) {
					alert('Please enter a valid number');
				} else {
					zoom = Number(zoomInput.value);
					pdfRenderer.renderAllCanvases(false);
				}
			}
		});
		// #endregion

		font1Color = getComputedStyle(document.documentElement).getPropertyValue(
			'--font-2'
		);

		background3Color = getComputedStyle(
			document.documentElement
		).getPropertyValue('--background-3');

		pdfRenderer = new PDFRenderer(pdfDoc, mainCanvas, outline);
		pdfRenderer.buildHTMLElements();
		pdfRenderer.renderAllCanvases();
		pageCount = pdfRenderer.numPages;
	});
</script>

<div bind:this={pdfContainer} id="pdf-container">
	<!-- PDF Topbar -->
	<div id="pdf-top-bar">
		<!-- Download -->
		<div id="pdf-download-icon">
			<DownloadIcon />
		</div>
		<div id="pdf-theme-switcher">
			<ThemeSwitcherIcon />
		</div>
		<!-- Page Zoom -->
		<div class="zoom-row">
			<ZoomMinus
				on:click={() => {
					if ($pdfZoom > 0.2) {
						zoom -= 10;
						pdfRenderer.renderAllCanvases(false);
					}
				}}
			/>
			<div class="zoom-level-row">
				<input
					bind:this={zoomInput}
					type="text"
					class="curZoomInput"
					value={zoom}
				/>
				<span class="cur-zoom">%</span>
			</div>
			<ZoomPlus
				on:click={() => {
					zoom += 10;
					pdfRenderer.renderAllCanvases(false);
				}}
			/>
		</div>
		<div id="pdf-page-num-row">
			<input
				bind:this={pdfCurPageInput}
				type="text"
				id="pdfCurPageInput"
				value={curPage}
			/>
			<span class="slash">/</span>
			<span class="total-page-num">{pageCount}</span>
		</div>
	</div>

	<div id="pdf-render-container" style:grid-template-columns={templateString}>
		<div
			id="pdf-render"
			bind:this={mainCanvas}
			style="transform: scale(${pdfZoom});"
		/>
		<!-- <Outline  /> -->
		<div id="pdf-outline" bind:this={outline} />
	</div>
</div>

<style>
	#pdf-top-bar {
		/* Grid */
		display: grid;
		grid-template-columns: 60px 60px 1fr 180px;

		/* Layout */
		width: 100%;
		padding: 0px;
		justify-content: space-between;
		align-items: center;

		/* Text */
		font-family: var(--f-Medium);
		font-size: 1.5em;

		/* Appearance */
		background-color: var(--background-2);
		border-top: 0;
		border-left: 0;
		border-right: 0;
		border-bottom: 1px;
		border-color: var(--font-1-50);
		border-style: solid;
	}

	#pdf-download-icon {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	:global(.pdf-page canvas) {
		border-radius: 4px;
	}

	#pdfCurPageInput {
		width: 40px;
		background: transparent;
		color: var(--font-2);
		border: none;
		text-align: end;
		margin-left: -30px;
	}

	:global(.pdf-thumbnail-link) {
		padding: 10px;
		border-radius: 5px;
	}
	:global(.pdf-thumbnail-link:hover),
	:global(.pdf-thumbnail-link.active) {
		background: var(--gradient-1);
	}

	:global(.pdf-thumbnail-pageIndex) {
		display: flex;
		width: 100%;
		justify-content: center;
		margin: 5px;
		color: white;
		font-family: var(--f-Medium);
		font-size: 1.1rem;
	}

	#pdf-container {
		display: grid;
		grid-template-rows: 35px 1fr;
		height: 100%;
		overflow: hidden;
	}

	#pdf-render-container {
		display: grid;
		/* grid-template-columns: 1fr 180px; */
		justify-content: space-between;
		align-items: start;
		height: 100%;
		overflow: scroll;
	}

	#pdf-render {
		display: flex;
		flex-direction: column;
		overflow: scroll;
		height: 100%;
		width: calc(100% - 30px);
		align-items: center;
		background-color: var(--background-1);
		padding: 15px;
	}

	#pdf-outline {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-y: scroll;
		overflow-x: hidden;
		height: 100%;
		background-color: var(--background-2);
		padding: 15px;
		gap: 10px;
	}

	/* ============= PAGE NUMS ============= */
	#pdf-page-num-row {
		display: flex;
		flex-direction: row;
		gap: 10px;
		justify-content: center;
	}

	/* .cur-page-num {
		color: var(--font-2);
		width: 20px;
		border: 0;
	} */

	.slash {
		color: var(--font-2);
		opacity: 0.6;
	}

	.total-page-num {
		color: var(--font-2);
		opacity: 0.6;
	}

	/* ============= CUR ZOOM ============= */
	.zoom-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 15px;
		margin-left: -60px;
	}

	.zoom-level-row {
		display: grid;
		grid-template-columns: 25px 25px;
		align-items: center;
		gap: 5px;
		/* margin-left: -5px; */
	}

	.cur-zoom {
		color: var(--font-2);
	}

	.curZoomInput {
		width: 25px;
		background: transparent;
		color: var(--font-2);
		font-size: 1.5rem;
		border: none;
		text-align: end;
	}

	#pdf-theme-switcher {
		height: 35px;
		width: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
		scale: 0.8;
	}
</style>
