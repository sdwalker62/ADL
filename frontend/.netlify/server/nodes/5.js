

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.BBQfWNir.js","_app/immutable/chunks/scheduler.CdRDF1RV.js","_app/immutable/chunks/index.hQpODWVV.js","_app/immutable/chunks/VMAN.fWKnmZbt.js"];
export const stylesheets = ["_app/immutable/assets/5.BgRDMMtX.css"];
export const fonts = [];
