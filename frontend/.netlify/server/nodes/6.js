

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/docs/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.ByRDAF9p.js","_app/immutable/chunks/scheduler.sNPKVHOf.js","_app/immutable/chunks/index.DICNLz_7.js"];
export const stylesheets = ["_app/immutable/assets/6.FWw6kfce.css"];
export const fonts = [];
