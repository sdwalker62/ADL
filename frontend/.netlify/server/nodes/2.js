import * as server from '../entries/pages/docs/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/docs/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/docs/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.B7fAXxlR.js","_app/immutable/chunks/scheduler.CdRDF1RV.js","_app/immutable/chunks/index.hQpODWVV.js","_app/immutable/chunks/stickybits.es.CT7pDpG2.js","_app/immutable/chunks/index.Cu_PLiq_.js","_app/immutable/chunks/entry.B3_U7_ps.js"];
export const stylesheets = ["_app/immutable/assets/2.D68_OC4G.css"];
export const fonts = [];
