import * as server from '../entries/pages/docs/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/docs/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/docs/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.BCSTXpzV.js","_app/immutable/chunks/scheduler.lzfKnBrE.js","_app/immutable/chunks/index.DeixXWcd.js","_app/immutable/chunks/spread.CafkiJtY.js","_app/immutable/chunks/stickybits.es.Be4OSf3W.js","_app/immutable/chunks/index.BhEpZxVt.js","_app/immutable/chunks/stores.ODp8D712.js","_app/immutable/chunks/entry.Q6uyMA78.js"];
export const stylesheets = ["_app/immutable/assets/2.OWFJ74xr.css"];
export const fonts = [];
