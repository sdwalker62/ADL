<script lang="ts">
	export let renderModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && renderModal) {
		dialog.showModal();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (renderModal = false)}
	on:click|self={() => {
		dialog.close();
	}}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div id="modal-canvas" on:click|stopPropagation>
		<slot name="contents"></slot>
	</div>
</dialog>

<style>
	dialog {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		border: none;
		padding: 0;
		background-color: transparent;
	}

	dialog::backdrop {
		background: #0a0a0a80;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	#modal-canvas {
		border-radius: 10px;
		border: solid 1px var(--font-3);
		background-color: var(--background-2);
		height: fit-content;
		width: 60%;
		padding: 1px;
	}

	dialog[open] {
		animation: zoom 0s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
