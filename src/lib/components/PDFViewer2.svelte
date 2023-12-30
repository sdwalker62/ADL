<script lang="ts">
	import _ from 'lodash';
	import * as pdfjsLib from 'pdfjs-dist';
	import DownloadIcon from '$lib/assets/icons/DownloadIcon.svelte';
	import ZoomIcon from '$lib/assets/icons/ZoomIcon.svelte';
	import type { PDFPageProxy, PDFDocumentProxy } from 'pdfjs-dist';
	import stickybits from 'stickybits';
	import { pdfScale } from '$lib/data/shared';

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

	import { onMount, afterUpdate } from 'svelte';

	export let doc: string;
	export let root: string;
	let pdfDoc: PDFDocumentProxy;
	let observer: IntersectionObserver;

	$: pdfScaleFactor = $pdfScale;

	const thumbnailScale = 0.2,
		pageScale = 2;

	let mainCanvas: HTMLElement,
		pdf: any,
		pageCount = 0,
		curPage = 1,
		outline: HTMLElement;

	async function pageBuilder(
		pageNum: number,
		pdfDocument: PDFDocumentProxy,
		observer: IntersectionObserver
	) {
		const pdfPage = await pdfDocument.getPage(pageNum);
		const thumbnailCanvas = renderPage(pdfPage, thumbnailScale, true);
		const pageCanvas = renderPage(pdfPage, pageScale);

		// ================= PAGE =================
		let pageDiv = document.createElement('div');
		pageDiv.append(pageCanvas);
		pageDiv.classList.add('pdf-page');
		pageDiv.id = `${pageNum}`;
		observer.observe(pageDiv);

		// ================= THUMBNAIL =================
		// create division element for page number
		let pageIndicator = document.createElement('div');
		pageIndicator.classList.add('pdf-thumbnail-pageIndex');
		pageIndicator.innerHTML = `<span>${pageNum}</span>`;

		// create division element to hold thumbnail contents
		let thumbnailDiv = document.createElement('div');
		thumbnailDiv.appendChild(thumbnailCanvas);
		thumbnailDiv.appendChild(pageIndicator);

		// create an anchor element to link to page
		let aRef = document.createElement('a');
		aRef.href = `#${pageNum}`;
		aRef.id = `thumbnail-${pageNum}`;
		aRef.classList.add('pdf-thumbnail-link');
		aRef.appendChild(thumbnailDiv);

		aRef.addEventListener('click', (e: MouseEvent) => {
			e.preventDefault();
			pageDiv.scrollIntoView();
			if (pageNum === 1) {
				mainCanvas.scrollBy({ top: -55 });
			} else {
				mainCanvas.scrollBy({ top: -40 });
			}
		});

		return {
			aRef: aRef,
			pageDiv: pageDiv
		};
		// outline.appendChild(aRef);
		// mainCanvas.appendChild(pageDiv);
	}

	function renderPage(page: PDFPageProxy, scale: number, isThumbnail = false) {
		let viewport = page.getViewport({ scale: scale });
		let canvas = document.createElement('canvas');
		let outputScale = window.devicePixelRatio || 1;
		let scaleFactor = 2;
		outputScale *= scaleFactor;
		canvas.width = Math.floor(viewport.width * outputScale);
		canvas.height = Math.floor(viewport.height * outputScale);
		const renderWidth = mainCanvas!.offsetWidth - 30;

		const outline = document.getElementById('pdf-outline');
		const outlineWidth = outline!.offsetWidth;
		const outlineScaleCoefficient = outlineWidth / Math.floor(viewport.width);
		if (isThumbnail) {
			canvas.style.width = outlineScaleCoefficient * Math.floor(viewport.width) - 40 + 'px';
			canvas.style.height = outlineScaleCoefficient * Math.floor(viewport.height) - 40 + 'px';
		} else {
			const renderScaleCoefficient =
				renderWidth / Math.floor((viewport.width * outputScale) / scaleFactor);
			canvas.style.width =
				pdfScaleFactor *
					renderScaleCoefficient *
					Math.floor((viewport.width * outputScale) / scaleFactor) +
				'px';
			canvas.style.height =
				pdfScaleFactor *
					renderScaleCoefficient *
					Math.floor((viewport.height * outputScale) / scaleFactor) +
				'px';
		}
		var context = canvas.getContext('2d');
		let transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
		const renderParams = {
			canvasContext: context!,
			viewport: viewport,
			transform: transform!
		};
		// render page to canvas and return it to caller
		page.render(renderParams).promise;
		return canvas;
	}

	function renderPages(
		pdfDocument: PDFDocumentProxy,
		observer: IntersectionObserver,
		startingPage: number,
		endingPage: number | null = null
	) {
		// PDFs are 1-based
		let lastPage;
		if (endingPage) {
			lastPage = Math.min(endingPage, pdfDocument.numPages);
		} else {
			lastPage = pdfDocument.numPages;
		}
		let documentPages = _.range(startingPage, lastPage);
		documentPages.forEach(async (pageNum) => {
			const renderObjects = await pageBuilder(pageNum, pdfDocument, observer);
			outline.appendChild(renderObjects.aRef);
			mainCanvas.appendChild(renderObjects.pageDiv);
		});
	}

	afterUpdate(async () => {
		// Keep certain elements in view for interaction
		// stickybits('pdf-top-bar');

		// If the PDF is already rendered we do not need to re-render
		if (!pdf) {
			// ======================= Intersection Observer =======================
			const scannableElement = document.getElementById('pdf-container');
			const interceptHeight = 40 - 0.99 * scannableElement!.clientHeight;
			let options = {
				root: scannableElement,
				thresholds: _.range(0, 1, 0.1),
				rootMargin: `40px 0px ${interceptHeight}px 0px`
			};

			const sectionIntersectionCallback = (entries: IntersectionObserverEntry[]) => {
				let thumbnails = outline.querySelectorAll('a');
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const pageIndex = entry.target.id;
						curPage = Number(pageIndex);
						thumbnails.forEach((thumbnail: HTMLElement) => {
							const thumbnailIndex = thumbnail.id.split('-')[1];
							if (thumbnailIndex === pageIndex) {
								thumbnail.classList.add('active');
							} else {
								thumbnail.classList.remove('active');
							}
						});
					}
				});
			};
			observer = new IntersectionObserver(sectionIntersectionCallback, options);

			// Load PDF from base64 encoding
			const pdfData = window.atob(doc);

			// The workerSrc property shall be specified.
			pdfjsLib.GlobalWorkerOptions.workerSrc =
				root + '/node_modules/pdfjs-dist/build/pdf.worker.js';

			// Asynchronous download of PDF
			pdfDoc = await pdfjsLib.getDocument({
				data: pdfData
			}).promise;
			renderPages(pdfDoc, observer, 1);
			pageCount = pdfDoc.numPages;

			// page input event handler
			let pageNumInput = document.getElementById('pdf-cur-page-num-input')! as HTMLInputElement;
			pageNumInput.addEventListener('keypress', (event) => {
				if (event.key === 'Enter') {
					event.preventDefault(); // cancel default action if one exists
					const pageNumber = pageNumInput.value;
					const pdfPage = document.getElementById(pageNumber.toString()) as HTMLDivElement;
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
					if (pageNumber === '1') {
						mainCanvas.scrollBy({ top: -55 });
					} else {
						mainCanvas.scrollBy({ top: -40 });
					}
				}
			});
		}
	});
</script>

<div id="pdf-container">
	<!-- PDF Topbar -->
	<div id="pdf-top-bar">
		<!-- Download -->
		<div id="pdf-download-icon">
			<DownloadIcon />
		</div>
		<!-- Page Zoom -->
		<div class="zoom-row">
			<button
				class="zoom-button"
				on:click={() => {
					if (pdfScaleFactor > 0.2) {
						$pdfScale -= 0.1;
					}
				}}>-</button
			>
			<div class="zoom-level-row">
				<ZoomIcon />
				<span class="cur-zoom">{(100 * pdfScaleFactor).toFixed(1)}%</span>
			</div>
			<button
				class="zoom-button"
				on:click={() => {
					$pdfScale += 0.1;
				}}>+</button
			>
		</div>
		<div id="pdf-page-num-row">
			<input type="text" id="pdf-cur-page-num-input" value={curPage} />
			<span class="slash">/</span>
			<span class="total-page-num">{pageCount}</span>
		</div>
	</div>
	<div id="pdf-render-container">
		{#key $pdfScale}
			<div id="pdf-render" bind:this={mainCanvas} style="transform: scale(${pdfScaleFactor});" />
		{/key}
		<!-- <Outline  /> -->
		<div id="pdf-outline" bind:this={outline} />
	</div>
</div>

<style>
	#pdf-top-bar {
		/* Grid */
		display: grid;
		grid-template-columns: 60px calc(100% - 240px) 180px;

		/* Layout */
		position: fixed;
		width: calc(100% - 320px);
		/* height: 1.5em; */
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
		border-color: var(--font-1);
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

	#pdf-cur-page-num-input {
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
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
	}

	#pdf-render-container {
		display: grid;
		grid-template-columns: 1fr 180px;
		justify-content: space-between;
		align-items: start;
		height: 100%;
	}

	#pdf-render {
		display: flex;
		flex-direction: column;
		overflow: scroll;
		height: 100%;
		width: calc(100% - 30px);
		align-items: center;
		background-color: var(--background-1);
		padding-top: 55px;
		padding-right: 15px;
		padding-bottom: 15px;
		padding-left: 15px;
	}

	#pdf-outline {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: scroll;
		height: 100%;
		background-color: var(--background-2);
		padding: 15px;
		gap: 10px;
		margin-top: 40px;
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
		gap: 5px;
		margin-left: -60px;
	}

	.zoom-level-row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.cur-zoom {
		color: var(--font-2);
	}

	.zoom-button {
		width: 50px;
		font-size: 1.5em;
		font-family: var(--f-Medium);
		border: 0;
		color: var(--font-1);
		background-color: transparent;
		text-align: center;
		padding: 5px;
		border-radius: 10px;
	}

	.zoom-button:hover {
		cursor: pointer;
		background-color: var(--background-4);
	}
</style>
