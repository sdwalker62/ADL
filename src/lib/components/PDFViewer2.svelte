<script>
	import _ from 'lodash';
	import * as pdfjsLib from 'pdfjs-dist';
	import DownloadIcon from '$lib/assets/icons/DownloadIcon.svelte';
	import ZoomIcon from '$lib/assets/icons/ZoomIcon.svelte';
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

	import { afterUpdate, beforeUpdate, onMount } from 'svelte';

	export let doc;
	export let root;

	const thumbnailScale = 0.2,
		pageScale = 1;

	let mainCanvas,
		pdf,
		pageCount = 0,
		curPage = 1,
		outline,
		curZoom = 100;

	async function pageBuilder(pageNum, pdfDocument, observer) {
		const pdfPage = await pdfDocument.getPage(pageNum);
		const thumbnailCanvas = await renderPage(pdfPage, thumbnailScale, true);
		const pageCanvas = await renderPage(pdfPage, pageScale);

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

		return {
			aRef: aRef,
			pageDiv: pageDiv
		};
		// outline.appendChild(aRef);
		// mainCanvas.appendChild(pageDiv);
	}

	/**
	 * @param {import('pdfjs-dist').PDFPageProxy} page
	 * @param {number} scale
	 * @param {boolean} [isThumbnail=false]
	 */
	function renderPage(page, scale, isThumbnail = false) {
		let viewport = page.getViewport({ scale: scale });
		let canvas = document.createElement('canvas');
		let outputScale = window.devicePixelRatio || 1;
		let scaleFactor = 2;
		outputScale *= scaleFactor;
		canvas.width = Math.floor(viewport.width * outputScale);
		canvas.height = Math.floor(viewport.height * outputScale);
		if (isThumbnail) {
			canvas.style.width = Math.floor(viewport.width) + 'px';
			canvas.style.height = Math.floor(viewport.height) + 'px';
		} else {
			canvas.style.width = Math.floor((viewport.width * outputScale) / scaleFactor - 20) + 'px';
			canvas.style.height = Math.floor((viewport.height * outputScale) / scaleFactor - 20) + 'px';
		}
		var context = canvas.getContext('2d');
		let transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
		const renderParams = {
			canvasContext: context,
			viewport: viewport,
			transform: transform
		};
		// render page to canvas and return it to caller
		page.render(renderParams).promise;
		return canvas;
	}

	/**
	 * @param {import('pdfjs-dist').PDFDocumentProxy} pdfDocument
	 * @param {IntersectionObserver} observer
	 * @param {number} startingPage
	 * @param {number} [endingPage=null]
	 * @returns null
	 */
	function renderPages(pdfDocument, observer, startingPage, endingPage = null) {
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

	onMount(async () => {
		// If the PDF is already rendered we do not need to re-render
		if (!pdf) {
			// ======================= Intersection Observer =======================
			const scannableElement = document.getElementById('pdf-container');
			const interceptHeight = 40 - 0.99 * scannableElement.clientHeight;
			let options = {
				root: scannableElement,
				thresholds: _.range(0, 1, 0.1),
				rootMargin: `40px 0px ${interceptHeight}px 0px`
			};
			/**
			 * @param {Array<IntersectionObserverEntry>} entries
			 */
			const sectionIntersectionCallback = (entries) => {
				let thumbnails = outline.querySelectorAll('a');
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const pageIndex = entry.target.id;
						curPage = Number(pageIndex);
						thumbnails.forEach(
							/**
							 * @param {HTMLElement} thumbnail
							 */
							(thumbnail) => {
								const thumbnailIndex = thumbnail.id.split('-')[1];
								if (thumbnailIndex === pageIndex) {
									thumbnail.classList.add('active');
								} else {
									thumbnail.classList.remove('active');
								}
							}
						);
					} else {
					}
				});
			};
			let observer = new IntersectionObserver(sectionIntersectionCallback, options);

			// Load PDF from base64 encoding
			const pdfData = window.atob(doc);

			// The workerSrc property shall be specified.
			pdfjsLib.GlobalWorkerOptions.workerSrc =
				root + '/node_modules/pdfjs-dist/build/pdf.worker.js';

			// Asynchronous download of PDF
			/**
			 * @type {import('pdfjs-dist').PDFDocumentProxy}
			 */
			// pdfjsLib.getDocument;
			let pdfDocument = await pdfjsLib.getDocument({
				data: pdfData
			}).promise;
			renderPages(pdfDocument, observer, 0);
			pageCount = pdfDocument.numPages;
		}
	});
</script>

<div id="pdf-container">
	<!-- PDF Topbar -->
	<div class="topbar">
		<!-- Download -->
		<DownloadIcon />
		<!-- Page Zoom -->
		<div class="zoom-row">
			<button class="zoom-button">-</button>
			<div class="zoom-level-row">
				<ZoomIcon />
				<span class="cur-zoom">{curZoom}%</span>
			</div>
			<button class="zoom-button">+</button>
		</div>

		<!-- Page Navigation -->
		<div class="page-num-row">
			<span class="cur-page-num">{curPage}</span>
			<span class="slash">/</span>
			<span class="total-page-num">{pageCount}</span>
		</div>
	</div>
	<div id="pdf-render-container">
		<div id="pdf-render" bind:this={mainCanvas} />
		<!-- <canvas  /> -->
		<div id="pdf-outline" bind:this={outline} />
	</div>
</div>

<style>
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
		width: 100%;
		align-items: center;
		background-color: var(--background-1);
	}

	#pdf-outline {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: scroll;
		height: 100%;
		background-color: var(--background-2);
	}

	.topbar {
		display: flex;
		flex-direction: row;
		width: calc(100%-10px);
		justify-content: space-between;
		align-items: center;
		font-family: var(--f-Medium);
		font-size: 1.5em;
		border-top: 0;
		border-left: 0;
		border-right: 0;
		border-bottom: 1px;
		border-color: var(--font-1);
		border-style: solid;
		padding: 10px;
		background-color: var(--background-2);
		height: 1.5em;
	}

	/* ============= PAGE NUMS ============= */
	.page-num-row {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.cur-page-num {
		color: var(--font-2);
	}

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
		gap: 5px;
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
