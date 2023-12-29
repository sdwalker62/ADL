import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async ({ cookies }) => {
	let colorMode = cookies.get('colorMode');
	if (!colorMode) {
		colorMode = 'dark';
	}

	return {
		colorMode: colorMode
	};
};
