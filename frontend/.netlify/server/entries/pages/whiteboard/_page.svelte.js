import { c as create_ssr_component, o as onDestroy, a as add_attribute, l as is_promise, i as noop, v as validate_component } from "../../../chunks/ssr.js";
import React from "react";
import ReactDOM from "react-dom";
const ReactAdapter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  React.createElement;
  let container;
  onDestroy(() => {
    try {
      ReactDOM.unmountComponentAtNode(container);
    } catch (err) {
      console.warn(`react-adapter failed to unmount.`, { err });
    }
  });
  return `<div${add_attribute("class", $$props.class, 0)}${add_attribute("this", container, 0)}></div>`;
});
const css = {
  code: ".excalidraw{height:100%;min-height:calc(100vh - 40px)}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n\\timport ReactAdapter from '$lib/components/ReactAdapter.svelte';\\r\\n<\/script>\\r\\n\\r\\n{#await import('@excalidraw/excalidraw')}\\r\\n\\t<p>Getting Board</p>\\r\\n{:then e}\\r\\n\\t<div id=\\"whiteboard\\">\\r\\n\\t\\t<ReactAdapter el={e.Excalidraw} />\\r\\n\\t</div>\\r\\n{/await}\\r\\n\\r\\n<style>\\r\\n\\t:global(.excalidraw) {\\r\\n\\t\\theight: 100%;\\r\\n\\t\\tmin-height: calc(100vh - 40px);\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAaS,WAAa,CACpB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAC9B"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <p data-svelte-h="svelte-8ioqls">Getting Board</p> `;
    }
    return function(e) {
      return ` <div id="whiteboard">${validate_component(ReactAdapter, "ReactAdapter").$$render($$result, { el: e.Excalidraw }, {}, {})}</div> `;
    }(__value);
  }(import("@excalidraw/excalidraw"))}`;
});
export {
  Page as default
};
