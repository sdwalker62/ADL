import dirTree from 'directory-tree';
import { DOCS_PATH } from '$env/static/private';
import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async () => {
	if (DOCS_PATH) {
		console.log(__dirname);
		// const fileNames = dirTree(DOCS_PATH, { exclude: /.git/ });
		return {
			dir: __dirname
		};
		// return {
		// 	tree: JSON.stringify(fileNames, null, 2)
		// };
	} else {
		throw new Error('No docs path found!');
	}
};
