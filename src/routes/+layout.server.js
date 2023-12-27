/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	let colorMode = cookies.get('colorMode');
	if (!colorMode) {
		colorMode = 'dark'
	}

	return {
		colorMode: colorMode
	};
}
