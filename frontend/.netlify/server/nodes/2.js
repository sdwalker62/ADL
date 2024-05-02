import * as server from '../entries/pages/docs/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/docs/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/docs/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.DghHGHAY.js","_app/immutable/chunks/scheduler.sNPKVHOf.js","_app/immutable/chunks/index.DICNLz_7.js","_app/immutable/chunks/stickybits.es.DRtRahuw.js","_app/immutable/chunks/entry.Dqi3VyCl.js","_app/immutable/chunks/stores.DFsIO73j.js"];
export const stylesheets = ["_app/immutable/assets/2.Dp8TnkyD.css"];
export const fonts = [];
