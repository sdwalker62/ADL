<script>
	import { showMainMenu } from '$lib/data/shared';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import logo from '$lib/assets/images/AthenaLogo.png';

	/** @type {boolean} */
	export let renderMenu; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && renderMenu) {
		dialog.showModal();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (renderMenu = false)}
	on:click|self={() => {
		$showMainMenu = false;
		dialog.close();
	}}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div id="main-menu-canvas" on:click|stopPropagation>
		<div id="main-menu-top">
			<ThemeSwitcher />
		</div>
		<div id="logo">
			<img src={logo} alt="logo" />
		</div>
		<hr />
		<div id="navigation-links-container">
			<slot name="site-navigation" />
		</div>
		<hr />
		<div id="external-links-container">
			<slot name="links" />
		</div>
	</div>
</dialog>

<style>
	dialog {
		max-width: 20vw;
		border-radius: 10px;
		border: none;
		padding: 0;
	}

	dialog::backdrop {
		background: transparent;
	}

	dialog #main-menu-canvas {
		display: block;
		position: fixed;
		left: 0;
		top: 0;
		height: calc(100% - 5rem);
		width: 300px;
		padding: 20px;
		margin: 5px;
		background: #0a0a0a80;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-radius: 10px;
	}

	dialog[open] {
		animation: zoom 0s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	hr {
		border-color: var(--font-3);
		margin-left: 30px;
		margin-right: 30px;
	}

	#main-menu-canvas {
		height: 100%;
		display: grid;
		grid-template-rows: 6rem 12rem 1fr;
	}

	#navigation-links-container {
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		place-items: center;
	}

	#external-links-container {
		display: grid;
		grid-template-rows: repeat(20, 1fr);
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		place-items: center;
		overflow: hidden;
	}

	#main-menu-top {
		display: flex;
		justify-content: end;
	}

	#logo {
		height: 12rem;
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
	}

	#logo img {
		height: 10rem;
		margin: 10px;
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
