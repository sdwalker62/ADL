import * as server from '../entries/pages/docs/_...document_/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/docs/_...document_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/docs/[...document]/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.DegpwOhL.js","_app/immutable/chunks/scheduler.lzfKnBrE.js","_app/immutable/chunks/index.DeixXWcd.js","_app/immutable/chunks/stickybits.es.Be4OSf3W.js","_app/immutable/chunks/index.BhEpZxVt.js","_app/immutable/chunks/spread.CafkiJtY.js","_app/immutable/chunks/tippy.J84zo3Rr.js","_app/immutable/chunks/preload-helper.Dch09mLN.js","_app/immutable/chunks/stores.CoqAR7pn.js","_app/immutable/chunks/entry.B7ceuAfB.js"];
export const stylesheets = ["_app/immutable/assets/8.2Fv5WkFN.css","_app/immutable/assets/tippy.QF-cw9E-.css"];
export const fonts = [];
