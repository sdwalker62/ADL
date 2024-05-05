<script lang="ts">
	import { onMount } from 'svelte';
	import { leftPanelActive, serverVisible, libraryVisible } from '$lib/data/shared.js';
	import Folder from '$lib/components/FileTree/Folder.svelte';
	import stickybits from 'stickybits';
	import Modal from '$lib/components/modals/Modal.svelte';

	export let data;

	const library = JSON.parse(data.tree);
	const props = {
		name: 'root',
		files: library.children,
		active: true
	};

	let showDigitalOceanSpaceModal = false;

	function DigitalOceanSpaceModal() {
		showDigitalOceanSpaceModal = true;
	}

	let tmp = '';

	onMount(() => {
		stickybits('#folder-top-bar-sticky');
	});
</script>

<div id="page-container" class="constrained-height" class:active={$leftPanelActive}>
	{#if $leftPanelActive}
		<div id="folder-canvas" class="no-scroll-bar">
			{#if $libraryVisible}
				<div class="folder-container no-scroll-bar constrained-height">
					<Folder {...props} />
				</div>
			{:else}
				<div id="button-panel">
					<!--					<span id="url-label">URL:</span>-->
					<!--					<span id="url-text">{urlValue}</span>-->
					<button on:click={DigitalOceanSpaceModal}>Pull From Digital Oceans Space</button>
					<!--					<button on:click={openPasswordModal}>Enter Password</button>-->
					<!--					<button id="submit-button" on:click={()=>retrieveDocuments(urlValue, passwordValue)}>Retrieve Documents</button>-->
				</div>
			{/if}
		</div>
	{/if}
	<slot />
</div>

<!-- URL Entry Modal -->
<Modal bind:renderModal={showDigitalOceanSpaceModal}>
	<form slot="contents" method="POST">
		<label>
			Endpoint
			<input name="endpoint" type="url" />
		</label>
		<label>
			Region
			<input name="region" />
		</label>
		<label>
			Access Key Id
			<input name="accessKeyId" />
		</label>
		<label>
			Secret Access Key
			<input name="secretAccessKey" />
		</label>
		<label>
			Password
			<input name="password" />
		</label>
		<button>Pull Documents</button>
	</form>
	<!--	<input slot="contents" id="urlInputBox" type="text" bind:value={tmp} />-->
</Modal>

<style>
	#url-text {
		color: var(--font-1);
		font-family: var(--f-Mono), sans-serif;
		font-size: 18px;
	}

	#url-label {
		color: var(--font-1);
		font-family: var(--f-Medium), sans-serif;
		font-size: 18px;
	}

	button {
		height: 30px;
		border: none;
		border-radius: 5px;
		color: var(--font-3);
		font-family: var(--f-Regular), sans-serif;
		font-size: 16px;
		background-color: var(--background-4);
	}

	button:hover {
		background-color: var(--background-6);
		cursor: pointer;
		color: var(--font-1);
	}

	#submit-button {
		font-family: var(--f-SemiBold), sans-serif;
		color: var(--background-1);
		background: var(--white-purple-1);
	}

	#button-panel {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: var(--background-2);
		padding: 15px;
		width: 100%;
		gap: 5px;
	}

	#urlInputBox {
		width: 100%;
		height: 100%;
		background: transparent;
		border: none;
		color: var(--font-1);
		font-family: var(--f-Mono), sans-serif;
		font-size: 48px;
		padding-left: 20px;
	}

	#urlInputBox:focus {
		border-radius: 10px;
		outline: none;
		border: none;
	}

	#server-panel {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--background-2);
		padding: 15px;
	}

	#page-container {
		display: grid;
		overflow: hidden;
	}

	.active {
		grid-template-columns: 320px 1fr;
	}

	@media (max-width: 400px) {
		#page-container {
			grid-template-columns: none;
			grid-template-rows: 0 3fr;
		}

		.folder-container {
			max-height: 400px;
			overflow: hidden;
		}
	}

	#folder-canvas {
		display: flex;
		background-color: var(--background-2);
		width: 100%;
		height: 100%;
		max-width: 320px;
		align-items: start;
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.folder-container {
		background-color: var(--background-2);
		padding: 15px;
	}
</style>
