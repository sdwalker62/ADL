<script>
	export let showModal; // boolean
	export let name;

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>Close {name}</button>
	</div>
</dialog>

<style>
	dialog {
		max-width: 50%;
		border-radius: 10px;
		border: none;
		padding: 0;
		background-color: var(--background-2);
	}
	dialog::backdrop {
		background: #0a0a0a80;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
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
	button {
		display: block;
		background: var(--gradient-1);
		border: none;
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.5rem;
		padding: 5px;
		border-radius: 5px;
		font-weight: bold;
	}
</style>
