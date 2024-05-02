import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	build: {
		target: 'es2022'
	},
	esbuild: {
		target: 'es2022'
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'es2022'
		}
	}
});
