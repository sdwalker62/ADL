import * as PDFJS from 'pdfjs-dist';

export default async function loadPDF(node, data) {
	const loadingTask = PDFJS.getDocument(data.url);
	const pdf = await loadingTask.promise;
	const page = await pdf.getPage(1);
	const scale = 1;
	const viewport = page.getViewport({ scale });
	const canvas = node;
	const context = canvas.getContext('2d');
	canvas.height = viewport.height;
	canvas.width = viewport.width;
	const renderContext = {
		canvasContext: context,

		viewport: viewport
	};

	page.render(renderContext);
}
