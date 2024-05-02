

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.DGmDXCnl.js","_app/immutable/chunks/scheduler.sNPKVHOf.js","_app/immutable/chunks/index.DICNLz_7.js","_app/immutable/chunks/AthenaLogo.DbUeol-C.js"];
export const stylesheets = ["_app/immutable/assets/5.CnoWP4ik.css"];
export const fonts = [];
