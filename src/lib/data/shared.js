import { readable, writable } from 'svelte/store';

export let currentPage = writable('Home');

export let showMainMenu = writable(false);

export let colorTheme = writable('');

export let colorThemeOptions = readable([
	{ value: 'dark', displayName: 'Dark' },
	{ value: 'cb-dark', displayName: 'Dark (Colorblind)' },
	{ value: 'light', displayName: 'Light' },
	{ value: 'cb-light', displayName: 'Light (Colorblind)' }
]);

export let documentationPath = writable('../AthenaDocs');

// Toggles
export let leftPanelActive = writable(true);
export let rightPanelActive = writable(true);
export let showCodeOutlineElements = writable(true);
export let showMathOutlineElements = writable(true);
export let showTableOutlineElements = writable(true);

export let pdfScale = writable(1.0);
