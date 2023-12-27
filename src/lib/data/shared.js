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
