<script lang="ts">
	import { beforeUpdate, onMount } from 'svelte';
	import Modal from '../Modal.svelte';
	import { colorThemeOptions, colorTheme } from '$lib/data/shared';
	import Cookies from 'js-cookie';
	import ThemeSwitcherIcon from '$lib/assets/icons/ThemeSwitcherIcon.svelte';

	let themeMenu: HTMLElement;
	let themeGroup = $colorTheme;
	let showModal = false;
	let dark = true;

	$: {
		$colorTheme = themeGroup;
		Cookies.set('colorMode', themeGroup);
		if (themeGroup.includes('dark')) {
			dark = true;
		} else {
			dark = false;
		}
	}

	beforeUpdate(() => {
		themeGroup = $colorTheme;
		document.documentElement.setAttribute('data-theme', themeGroup);
	});

	onMount(() => {
		themeMenu.addEventListener('click', () => {
			showModal = true;
		});
	});
</script>

<div id="theme-canvas" bind:this={themeMenu}>
	<ThemeSwitcherIcon {dark} />
</div>

<Modal bind:showModal name={'Theme Menu'}>
	<h2 slot="header">Select Theme</h2>
	<fieldset>
		<div
			id="theme-options-container"
			style="grid-template-rows: repeat({$colorThemeOptions.length}, 1fr);"
		>
			{#each $colorThemeOptions as themeOption}
				<div class="theme-option">
					<input
						type="radio"
						bind:group={themeGroup}
						class="theme-option-label"
						name="theme-option-{themeOption.value}"
						value={themeOption.value}
						checked={true}
					/>
					<label for="theme-option-{themeOption.displayName}">{themeOption.displayName}</label>
				</div>
			{/each}
		</div>
	</fieldset>
</Modal>

<style>
	#theme-canvas {
		height: 4rem;
		width: 4rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		transition: background-color 0s;
		justify-self: center;
		margin-bottom: 20px;
	}

	#theme-options-container {
		display: grid;
	}

	fieldset {
		border: none;
	}

	h2 {
		font-family: var(--f-SemiBold), sans-serif;
		font-size: 2rem;
		color: var(--font-1);
	}

	label {
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.8rem;
		color: var(--font-1);
	}
	input[type='radio'] {
		/* appearance: none; */
		width: 16px;
		height: 16px;
		border-radius: 16px;
		background-color: var(--background-8);
		border: none;
	}

	#theme-canvas:hover {
		cursor: pointer;
		background: #ffffff20;
	}
</style>
