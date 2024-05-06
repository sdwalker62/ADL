import dirTree from 'directory-tree';
import { DOCS_PATH } from '$env/static/private';
import type { LayoutServerLoad } from './$types.js';
import path from 'path';

export const load: LayoutServerLoad = async () => {
	if (DOCS_PATH) {
		const repo_path = path.resolve('..');
		const fileNames = dirTree(repo_path + DOCS_PATH, { exclude: /.git/ });
		return {
			tree: JSON.stringify(fileNames, null, 2)
		};
	} else {
		throw new Error('No docs path found!');
	}
};
