import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.BkXCVZfu.js","_app/immutable/chunks/scheduler.sNPKVHOf.js","_app/immutable/chunks/index.DICNLz_7.js","_app/immutable/chunks/stickybits.es.DRtRahuw.js","_app/immutable/chunks/entry.Dqi3VyCl.js","_app/immutable/chunks/tippy.DDL0aeuD.js","_app/immutable/chunks/AthenaLogo.DbUeol-C.js","_app/immutable/chunks/stores.DFsIO73j.js"];
export const stylesheets = ["_app/immutable/assets/0.CbSjCG4U.css","_app/immutable/assets/tippy.QF-cw9E-.css"];
export const fonts = [];
