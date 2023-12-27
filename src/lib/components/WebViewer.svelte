<script>
	import { onMount, createEventDispatcher } from 'svelte';
	// import WebViewer from '@pdftron/pdfjs-express-viewer';

	let instance = null;
	const dispatch = createEventDispatcher();

	onMount(async () => {
		let WebViewer = (await import('@pdftron/pdfjs-express-viewer')).default;
		let ele = document.getElementById('viewer');
		await WebViewer(
			{
				path: '../SIGIL/docs/public/lib',
				initialDoc: 'https://arxiv.org/pdf/1706.03762.pdf',
				licenseKey: 'VMeLR5MsW5lX3X9YfqQF'
			},
			ele
		).then((instance) => {
			console.log('dispatch!');
			dispatch('ready', {
				instance
			});
		});
	});
</script>

<div id="viewer" />

<style>
	#viewer {
		width: 100vw;
		height: 100vh;
	}
</style>
