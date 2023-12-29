import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const colorModeCookie = cookies.get('colorMode');
	const colorMode = !colorModeCookie ? 'dark' : colorModeCookie;

	const showCodeOutlineCookie = cookies.get('showCodeOutlineElements');
	const showCodeOutlineElements = !showCodeOutlineCookie ? true : showCodeOutlineCookie === 'true';

	const showMathOutlineCookie = cookies.get('showMathOutlineElements');
	const showMathOutlineElements = !showMathOutlineCookie ? true : showMathOutlineCookie === 'true';

	const showTableOutlineCookie = cookies.get('showTableOutlineElements');
	const showTableOutlineElements = !showTableOutlineCookie
		? true
		: showTableOutlineCookie === 'true';

	return {
		colorMode: colorMode,
		showCodeOutlineElements: showCodeOutlineElements,
		showMathOutlineElements: showMathOutlineElements,
		showTableOutlineElements: showTableOutlineElements
	};
};
