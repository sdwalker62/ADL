import dirTree from 'directory-tree';
import dotenv from 'dotenv';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	dotenv.config();
	const docsPath = process.env.INIT_CWD + process.env.DOCS_PATH;
	const fileNames = dirTree(docsPath, { exclude: /.git/ });

	return {
		tree: JSON.stringify(fileNames, null, 2)
	};
}
