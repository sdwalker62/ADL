import * as server from '../entries/pages/docs/_...document_/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/docs/_...document_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/docs/[...document]/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.CrgktVT4.js","_app/immutable/chunks/scheduler.sNPKVHOf.js","_app/immutable/chunks/index.DICNLz_7.js","_app/immutable/chunks/stickybits.es.DRtRahuw.js","_app/immutable/chunks/entry.Dqi3VyCl.js","_app/immutable/chunks/_commonjsHelpers.Cpj98o6Y.js","_app/immutable/chunks/tippy.DDL0aeuD.js","_app/immutable/chunks/preload-helper.Dch09mLN.js","_app/immutable/chunks/stores.DFsIO73j.js"];
export const stylesheets = ["_app/immutable/assets/7.JEWfHW2N.css","_app/immutable/assets/tippy.QF-cw9E-.css"];
export const fonts = [];
