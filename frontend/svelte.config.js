// export default config;
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-node';

export default {
	preprocess: vitePreprocess(),
	kit: {
		// default options are shown
		adapter: adapter()
	}
};
