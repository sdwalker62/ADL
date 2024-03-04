<script lang="ts">
	import updateImg from '$lib/assets/images/code-pull-request-solid.svg';
	import copyImg from '$lib/assets/images/copy-solid.svg';
	import downloadImg from '$lib/assets/images/file-code-regular.svg';

	export let innerHTMLString: string;
	export let shouldRender: boolean = true;
</script>

{#if shouldRender}
	<div id="code-item-canvas">
		<div id="code-heading-container">
			<img src={copyImg} alt="copy-icon" class="copy-code-button" />
			<img src={downloadImg} alt="download-icon" class="save-code-as-file" />
			<img src={updateImg} alt="update-icon" class="update-version" />
		</div>
		<div id="code">
			<!--eslint-disable-next-line svelte/no-at-html-tags-->
			{@html innerHTMLString}
		</div>
	</div>
{/if}

<style>
	#code-item-canvas {
		display: grid;
		grid-template-rows: 3rem 1fr;
		background-color: var(--background-7);
		border-radius: 7px;
		padding: 10px;
	}

	#code-heading-container {
		display: flex;
		flex-direction: row;
		gap: 17px;
		margin-left: 6px;
	}

	img {
		height: 2rem;
		filter: invert(52%) sepia(6%) saturate(194%) hue-rotate(202deg) brightness(89%) contrast(84%);
	}

	img:hover {
		filter: var(--active-filter);
		transition: filter 0.2s ease-in-out;
		cursor: pointer;
	}

	#code {
		display: flex;
		background-color: var(--background-2);
		padding: 7px;
		border-radius: 7px;
		word-wrap: break-word;
		white-space: nowrap;
		font-family: var(--f-Mono), monospace;
		font-size: 1.8rem;
	}

	:global(#code code) {
		max-width: 100%;
		background-color: transparent;
		word-wrap: break-word;
		white-space: nowrap;
	}

	:global(#code *) {
		max-width: 320px;
		background-color: transparent;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: nowrap;
	}
</style>
