import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.o0_4dpI5.js","_app/immutable/chunks/scheduler.lzfKnBrE.js","_app/immutable/chunks/index.DeixXWcd.js","_app/immutable/chunks/stickybits.es.Be4OSf3W.js","_app/immutable/chunks/index.BhEpZxVt.js","_app/immutable/chunks/spread.CafkiJtY.js","_app/immutable/chunks/tippy.J84zo3Rr.js","_app/immutable/chunks/VMAN.fWKnmZbt.js","_app/immutable/chunks/stores.ODp8D712.js","_app/immutable/chunks/entry.Q6uyMA78.js"];
export const stylesheets = ["_app/immutable/assets/0.pjx4Gp5J.css","_app/immutable/assets/tippy.QF-cw9E-.css"];
export const fonts = [];
