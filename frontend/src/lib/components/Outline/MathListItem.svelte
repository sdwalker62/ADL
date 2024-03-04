<script lang="ts">
	export let innerHTMLString = '';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
		integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
		crossorigin="anonymous"
	/>
	<script
		defer
		src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"
		integrity="sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8"
		crossorigin="anonymous"
	></script>
	<script
		defer
		src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
		integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05"
		crossorigin="anonymous"
	></script>
</svelte:head>

<div class="math-item-canvas">
	<p>
		{@html innerHTMLString}
	</p>
</div>

<style>
	:global(.katex span) {
		overflow: visible!important;
	}

	.math-item-canvas {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--background-7);
		border-radius: 7px;
		padding: 10px;
	}

	:global(.math-item-canvas span) {
		color: var(--font-2);
		font-family: 'KaTeX_Main',serif;
		font-size: 2rem;
		line-height: 1.5;
	}
	p {
		width: 100%;
		font-family: 'KaTeX_Main',serif;
	}
</style>
