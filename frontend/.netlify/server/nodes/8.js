import * as server from '../entries/pages/docs/_...document_/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/docs/_...document_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/docs/[...document]/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.BR-M9ae7.js","_app/immutable/chunks/scheduler.CdRDF1RV.js","_app/immutable/chunks/index.hQpODWVV.js","_app/immutable/chunks/stickybits.es.CT7pDpG2.js","_app/immutable/chunks/index.Cu_PLiq_.js","_app/immutable/chunks/spread.dx63D55Y.js","_app/immutable/chunks/tippy.BoX8GUOI.js","_app/immutable/chunks/preload-helper.Dch09mLN.js","_app/immutable/chunks/stores.BlP0qOiF.js","_app/immutable/chunks/entry.B3_U7_ps.js"];
export const stylesheets = ["_app/immutable/assets/8.2Fv5WkFN.css","_app/immutable/assets/tippy.QF-cw9E-.css"];
export const fonts = [];
