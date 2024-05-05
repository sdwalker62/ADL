import * as server from '../entries/pages/docs/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/docs/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/docs/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.BvMkUpFg.js","_app/immutable/chunks/scheduler.lzfKnBrE.js","_app/immutable/chunks/index.DeixXWcd.js"];
export const stylesheets = ["_app/immutable/assets/7.FWw6kfce.css"];
export const fonts = [];
