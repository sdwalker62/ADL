<script lang="ts">
	import constructionImg from '$lib/assets/images/construction.svg';
	import toast, { Toaster } from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import { showDigitalOceanSpaceModal } from '$lib/data/shared.js';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { Ellipsis, Fingerprint } from 'lucide-svelte';
	import { Earth } from 'lucide-svelte';
	import { RectangleEllipsis } from 'lucide-svelte';
	import { KeyRound } from 'lucide-svelte';
	import { Braces } from 'lucide-svelte';
	import { CloudDownload } from 'lucide-svelte';

	const toastBorderRadius = 'border-radius: 10px;';
	const toastBackground = 'background: var(--menu-background);';
	const toastFontColor = 'color: var(--font-1);';
	const toastFontSize = 'font-size: 1.7em;';
	const toastFontFamily = 'font-family: var(--f-Medium)';
	const toastStyle = [
		toastBorderRadius,
		toastBackground,
		toastFontColor,
		toastFontSize,
		toastFontFamily
	];

	export let data;
	const { form, enhance } = superForm(data, {
		onUpdated({ form }) {
			if (form.message) {
				$showDigitalOceanSpaceModal = !$showDigitalOceanSpaceModal;
				if (form.message.status == 'success') {
					toast.success(form.message.files, {
						style: toastStyle.join(' ')
					});
				} else {
					toast.error(form.message.text, {
						style: toastStyle.join(' ')
					});
				}
			}
		}
	});
</script>

<div id="home-canvas">
	<h1>Documentation</h1>
	<img src={constructionImg} alt="construction" />
	<h1 id="construction-text">Under Construction</h1>
	<div id="current-prog">
		<div class="progress-item">
			<label for="file">Total Documentation Progress:</label>
			<progress max="100" value="80"> 40% </progress>
		</div>
		<div class="progress-item">
			<label for="file">Basic Documentation:</label>
			<progress max="100" value="95"> 80% </progress>
		</div>
		<div class="progress-item">
			<label for="file">Search:</label>
			<progress max="100" value="0"> 0% </progress>
		</div>
		<div class="progress-item">
			<label for="file">Random Bug Fixes:</label>
			<progress max="100" value="0"> 0% </progress>
		</div>
	</div>
</div>

<Toaster />

<!-- URL Entry Modal -->
{#if $showDigitalOceanSpaceModal}
	<Modal bind:renderModal={$showDigitalOceanSpaceModal}>
		<form slot="contents" method="POST" use:enhance>
			<div id="form-canvas">
				<div id="form-container">
					<div class="form-option">
						<Braces size={32} color="var(--highlight-font)" />
						<label class="form-label">
							Endpoint
							<input name="endpoint" type="url" class="form-input" />
						</label>
					</div>
					<div class="form-option">
						<Earth size={32} color="var(--highlight-font)" />
						<label class="form-label">
							Region
							<input name="region" class="form-input" />
						</label>
					</div>
					<div class="form-option">
						<Fingerprint size={32} color="var(--highlight-font)" />
						<label class="form-label">
							Access Key Id
							<input name="accessKeyId" class="form-input" />
						</label>
					</div>
					<div class="form-option">
						<KeyRound size={32} color="var(--highlight-font)" />
						<label class="form-label">
							Secret Access Key
							<input name="secretAccessKey" class="form-input" />
						</label>
					</div>
					<div class="form-option">
						<RectangleEllipsis size={32} color="var(--highlight-font)" />
						<label class="form-label">
							Password
							<input type="password" name="password" class="form-input" />
						</label>
					</div>
				</div>
				<button id="download-btn"> <CloudDownload size={48} /></button>
			</div>
		</form>
	</Modal>
{/if}

<style>
	#home-canvas {
		display: flex;
		flex-direction: column;
		background-color: var(--background-1);
		padding: 20px;
		gap: 40px;
	}

	#form-canvas {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20px;
		background-color: var(--menu-background);
		border-radius: 10px;
		gap: 20px;
		width: fit-content;
	}

	#form-container {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
	}

	.form-option {
		display: flex;
		gap: 7px;
		align-items: center;
		height: 30px;
		width: fit-content;
	}

	.form-label {
		display: grid;
		grid-template-columns: 1fr 6fr;
		align-items: center;
		gap: 8px;
		font-family: var(--f-Medium), sans-serif;
		font-size: 1.7em;
		color: var(--font-4);
	}

	.form-input {
		border-radius: 7px;
		font-size: 1.3em;
		font-family: var(--f-Mono), sans-serif;
		background-color: var(--highlight-font);
		color: var(--font-1);
		outline: none;
		border: 1px solid var(--font-3);
		width: 40vw;
		height: 32px;
		padding: 5px;
	}

	.form-input:focus {
		outline: 2px solid var(--highlight);
	}

	#download-btn {
		background-color: transparent;
		outline: none;
		border: none;
		height: 75px;
		width: 100px;
		border-radius: 7px;
	}

	#download-btn:hover {
		background-color: #00000020;
		cursor: pointer;
	}

	#current-prog {
		display: grid;
		grid-template-rows: 10rem;
		align-items: center;
	}

	.progress-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 20px;
		justify-content: end;
		margin-right: 40%;
		height: 8rem;
	}

	progress {
		border: 0;
		height: 40px;
		border-radius: 10px;
		width: 50%;
	}
	progress::-webkit-progress-bar {
		border: 0;
		height: 40px;
		border-radius: 10px;
		background-color: var(--background-4);
	}
	progress::-webkit-progress-value {
		border: 0;
		height: 40px;
		border-radius: 10px;
		background-color: var(--highlight);
	}
	progress::-moz-progress-bar {
		border: 0;
		height: 40px;
		border-radius: 10px;
		background-color: var(--background-4);
	}

	label {
		font-family: 'SF Pro', sans-serif;
		font-size: 1.4em;
		font-weight: 500;
		color: var(--font-1);
	}

	h1 {
		font-family: 'EB Garamond', serif;
		color: var(--font-2);
		font-weight: 300;
	}

	h1::first-letter {
		font-size: 1.5em;
		font-weight: 500;
	}

	img {
		height: 100px;
		filter: invert(59%) sepia(64%) saturate(3911%) hue-rotate(17deg) brightness(98%) contrast(97%);
	}

	#construction-text {
		display: flex;
		align-self: center;
	}
</style>
