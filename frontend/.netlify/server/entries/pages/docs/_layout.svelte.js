import { c as create_ssr_component, a as add_attribute, h as add_styles, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/shared.js";
import "../../../chunks/client.js";
import "stickybits";
const css$1 = {
  code: "dialog.svelte-1llwlml{display:flex;justify-content:center;align-items:center;width:100vw;border:none;padding:0;background-color:transparent}dialog.svelte-1llwlml::backdrop{background:#0a0a0a80;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}#modal-canvas.svelte-1llwlml{border-radius:10px;border:solid 1px var(--font-3);background-color:var(--background-2);height:fit-content;width:60%;padding:1px}dialog[open].svelte-1llwlml{animation:svelte-1llwlml-zoom 0s cubic-bezier(0.34, 1.56, 0.64, 1)}@keyframes svelte-1llwlml-zoom{from{transform:scale(0.95)}to{transform:scale(1)}}dialog[open].svelte-1llwlml::backdrop{animation:svelte-1llwlml-fade 0.2s ease-out}@keyframes svelte-1llwlml-fade{from{opacity:0}to{opacity:1}}",
  map: '{"version":3,"file":"Modal.svelte","sources":["Modal.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let renderModal;\\nlet dialog;\\n$:\\n  if (dialog && renderModal) {\\n    dialog.showModal();\\n  }\\n<\/script>\\r\\n\\r\\n<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->\\r\\n<dialog\\r\\n\\tbind:this={dialog}\\r\\n\\ton:close={() => (renderModal = false)}\\r\\n\\ton:click|self={() => {\\r\\n\\t\\tdialog.close();\\r\\n\\t}}\\r\\n>\\r\\n\\t<!-- svelte-ignore a11y-no-static-element-interactions -->\\r\\n\\t<div id=\\"modal-canvas\\" on:click|stopPropagation>\\r\\n\\t\\t<slot name=\\"contents\\"></slot>\\r\\n\\t</div>\\r\\n</dialog>\\r\\n\\r\\n<style>\\r\\n\\tdialog {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\twidth: 100vw;\\r\\n\\t\\tborder: none;\\r\\n\\t\\tpadding: 0;\\r\\n\\t\\tbackground-color: transparent;\\r\\n\\t}\\r\\n\\r\\n\\tdialog::backdrop {\\r\\n\\t\\tbackground: #0a0a0a80;\\r\\n\\t\\tbackdrop-filter: blur(12px);\\r\\n\\t\\t-webkit-backdrop-filter: blur(12px);\\r\\n\\t}\\r\\n\\r\\n\\t#modal-canvas {\\r\\n\\t\\tborder-radius: 10px;\\r\\n\\t\\tborder: solid 1px var(--font-3);\\r\\n\\t\\tbackground-color: var(--background-2);\\r\\n\\t\\theight: fit-content;\\r\\n\\t\\twidth: 60%;\\r\\n\\t\\tpadding: 1px;\\r\\n\\t}\\r\\n\\r\\n\\tdialog[open] {\\r\\n\\t\\tanimation: zoom 0s cubic-bezier(0.34, 1.56, 0.64, 1);\\r\\n\\t}\\r\\n\\r\\n\\t@keyframes zoom {\\r\\n\\t\\tfrom {\\r\\n\\t\\t\\ttransform: scale(0.95);\\r\\n\\t\\t}\\r\\n\\t\\tto {\\r\\n\\t\\t\\ttransform: scale(1);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\tdialog[open]::backdrop {\\r\\n\\t\\tanimation: fade 0.2s ease-out;\\r\\n\\t}\\r\\n\\t@keyframes fade {\\r\\n\\t\\tfrom {\\r\\n\\t\\t\\topacity: 0;\\r\\n\\t\\t}\\r\\n\\t\\tto {\\r\\n\\t\\t\\topacity: 1;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAuBC,qBAAO,CACN,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,WACnB,CAEA,qBAAM,UAAW,CAChB,UAAU,CAAE,SAAS,CACrB,eAAe,CAAE,KAAK,IAAI,CAAC,CAC3B,uBAAuB,CAAE,KAAK,IAAI,CACnC,CAEA,4BAAc,CACb,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,KAAK,CAAC,GAAG,CAAC,IAAI,QAAQ,CAAC,CAC/B,gBAAgB,CAAE,IAAI,cAAc,CAAC,CACrC,MAAM,CAAE,WAAW,CACnB,KAAK,CAAE,GAAG,CACV,OAAO,CAAE,GACV,CAEA,MAAM,CAAC,IAAI,gBAAE,CACZ,SAAS,CAAE,mBAAI,CAAC,EAAE,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CACpD,CAEA,WAAW,mBAAK,CACf,IAAK,CACJ,SAAS,CAAE,MAAM,IAAI,CACtB,CACA,EAAG,CACF,SAAS,CAAE,MAAM,CAAC,CACnB,CACD,CACA,MAAM,CAAC,IAAI,gBAAC,UAAW,CACtB,SAAS,CAAE,mBAAI,CAAC,IAAI,CAAC,QACtB,CACA,WAAW,mBAAK,CACf,IAAK,CACJ,OAAO,CAAE,CACV,CACA,EAAG,CACF,OAAO,CAAE,CACV,CACD"}'
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { renderModal } = $$props;
  let dialog;
  if ($$props.renderModal === void 0 && $$bindings.renderModal && renderModal !== void 0)
    $$bindings.renderModal(renderModal);
  $$result.css.add(css$1);
  return ` <dialog class="svelte-1llwlml"${add_attribute("this", dialog, 0)}> <div id="modal-canvas" class="svelte-1llwlml">${slots.contents ? slots.contents({}) : ``}</div> </dialog>`;
});
const css = {
  code: "button.svelte-1rp09pp{height:30px;border:none;border-radius:5px;color:var(--font-3);font-family:var(--f-Regular), sans-serif;font-size:16px;background-color:var(--background-4)}button.svelte-1rp09pp:hover{background-color:var(--background-6);cursor:pointer;color:var(--font-1)}@media(max-width: 400px){}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { leftPanelActive, serverVisible, libraryVisible } from \\"$lib/data/shared.js\\";\\nimport Folder from \\"$lib/components/FileTree/Folder.svelte\\";\\nimport stickybits from \\"stickybits\\";\\nimport Modal from \\"$lib/components/modals/Modal.svelte\\";\\nexport let data;\\nlet showDigitalOceanSpaceModal = false;\\nlet tmp = \\"\\";\\nonMount(() => {\\n  stickybits(\\"#folder-top-bar-sticky\\");\\n});\\n<\/script>\\n\\n<div>\\n\\t<h1 style:color=\\"white\\">{data.path}</h1>\\n</div>\\n\\n<!--<div id=\\"page-container\\" class=\\"constrained-height\\" class:active={$leftPanelActive}>-->\\n<!--\\t{#if $leftPanelActive}-->\\n<!--\\t\\t<div id=\\"folder-canvas\\" class=\\"no-scroll-bar\\">-->\\n<!--\\t\\t\\t{#if $libraryVisible}-->\\n<!--\\t\\t\\t\\t<div class=\\"folder-container no-scroll-bar constrained-height\\">-->\\n<!--\\t\\t\\t\\t\\t<Folder {...props} />-->\\n<!--\\t\\t\\t\\t</div>-->\\n<!--\\t\\t\\t{:else}-->\\n<!--\\t\\t\\t\\t<div id=\\"button-panel\\">-->\\n<!--\\t\\t\\t\\t\\t&lt;!&ndash;\\t\\t\\t\\t\\t<span id=\\"url-label\\">URL:</span>&ndash;&gt;-->\\n<!--\\t\\t\\t\\t\\t&lt;!&ndash;\\t\\t\\t\\t\\t<span id=\\"url-text\\">{urlValue}</span>&ndash;&gt;-->\\n<!--\\t\\t\\t\\t\\t<button on:click={DigitalOceanSpaceModal}>Pull From Digital Oceans Space</button>-->\\n<!--\\t\\t\\t\\t\\t&lt;!&ndash;\\t\\t\\t\\t\\t<button on:click={openPasswordModal}>Enter Password</button>&ndash;&gt;-->\\n<!--\\t\\t\\t\\t\\t&lt;!&ndash;\\t\\t\\t\\t\\t<button id=\\"submit-button\\" on:click={()=>retrieveDocuments(urlValue, passwordValue)}>Retrieve Documents</button>&ndash;&gt;-->\\n<!--\\t\\t\\t\\t</div>-->\\n<!--\\t\\t\\t{/if}-->\\n<!--\\t\\t</div>-->\\n<!--\\t{/if}-->\\n<!--\\t<slot />-->\\n<!--</div>-->\\n\\n<!-- URL Entry Modal -->\\n<Modal bind:renderModal={showDigitalOceanSpaceModal}>\\n\\t<form slot=\\"contents\\" method=\\"POST\\">\\n\\t\\t<label>\\n\\t\\t\\tEndpoint\\n\\t\\t\\t<input name=\\"endpoint\\" type=\\"url\\" />\\n\\t\\t</label>\\n\\t\\t<label>\\n\\t\\t\\tRegion\\n\\t\\t\\t<input name=\\"region\\" />\\n\\t\\t</label>\\n\\t\\t<label>\\n\\t\\t\\tAccess Key Id\\n\\t\\t\\t<input name=\\"accessKeyId\\" />\\n\\t\\t</label>\\n\\t\\t<label>\\n\\t\\t\\tSecret Access Key\\n\\t\\t\\t<input name=\\"secretAccessKey\\" />\\n\\t\\t</label>\\n\\t\\t<label>\\n\\t\\t\\tPassword\\n\\t\\t\\t<input name=\\"password\\" />\\n\\t\\t</label>\\n\\t\\t<button>Pull Documents</button>\\n\\t</form>\\n\\t<!--\\t<input slot=\\"contents\\" id=\\"urlInputBox\\" type=\\"text\\" bind:value={tmp} />-->\\n</Modal>\\n\\n<style>\\n\\t#url-text {\\n\\t\\tcolor: var(--font-1);\\n\\t\\tfont-family: var(--f-Mono), sans-serif;\\n\\t\\tfont-size: 18px;\\n\\t}\\n\\n\\t#url-label {\\n\\t\\tcolor: var(--font-1);\\n\\t\\tfont-family: var(--f-Medium), sans-serif;\\n\\t\\tfont-size: 18px;\\n\\t}\\n\\n\\tbutton {\\n\\t\\theight: 30px;\\n\\t\\tborder: none;\\n\\t\\tborder-radius: 5px;\\n\\t\\tcolor: var(--font-3);\\n\\t\\tfont-family: var(--f-Regular), sans-serif;\\n\\t\\tfont-size: 16px;\\n\\t\\tbackground-color: var(--background-4);\\n\\t}\\n\\n\\tbutton:hover {\\n\\t\\tbackground-color: var(--background-6);\\n\\t\\tcursor: pointer;\\n\\t\\tcolor: var(--font-1);\\n\\t}\\n\\n\\t#submit-button {\\n\\t\\tfont-family: var(--f-SemiBold), sans-serif;\\n\\t\\tcolor: var(--background-1);\\n\\t\\tbackground: var(--white-purple-1);\\n\\t}\\n\\n\\t#button-panel {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tjustify-content: center;\\n\\t\\tbackground-color: var(--background-2);\\n\\t\\tpadding: 15px;\\n\\t\\twidth: 100%;\\n\\t\\tgap: 5px;\\n\\t}\\n\\n\\t#urlInputBox {\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tbackground: transparent;\\n\\t\\tborder: none;\\n\\t\\tcolor: var(--font-1);\\n\\t\\tfont-family: var(--f-Mono), sans-serif;\\n\\t\\tfont-size: 48px;\\n\\t\\tpadding-left: 20px;\\n\\t}\\n\\n\\t#urlInputBox:focus {\\n\\t\\tborder-radius: 10px;\\n\\t\\toutline: none;\\n\\t\\tborder: none;\\n\\t}\\n\\n\\t#server-panel {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tbackground-color: var(--background-2);\\n\\t\\tpadding: 15px;\\n\\t}\\n\\n\\t#page-container {\\n\\t\\tdisplay: grid;\\n\\t\\toverflow: hidden;\\n\\t}\\n\\n\\t.active {\\n\\t\\tgrid-template-columns: 320px 1fr;\\n\\t}\\n\\n\\t@media (max-width: 400px) {\\n\\t\\t#page-container {\\n\\t\\t\\tgrid-template-columns: none;\\n\\t\\t\\tgrid-template-rows: 0 3fr;\\n\\t\\t}\\n\\n\\t\\t.folder-container {\\n\\t\\t\\tmax-height: 400px;\\n\\t\\t\\toverflow: hidden;\\n\\t\\t}\\n\\t}\\n\\n\\t#folder-canvas {\\n\\t\\tdisplay: flex;\\n\\t\\tbackground-color: var(--background-2);\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tmax-width: 320px;\\n\\t\\talign-items: start;\\n\\t\\toverflow-y: scroll;\\n\\t\\toverflow-x: hidden;\\n\\t}\\n\\n\\t.folder-container {\\n\\t\\tbackground-color: var(--background-2);\\n\\t\\tpadding: 15px;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA+EC,qBAAO,CACN,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,WAAW,CAAE,IAAI,WAAW,CAAC,CAAC,CAAC,UAAU,CACzC,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,IAAI,cAAc,CACrC,CAEA,qBAAM,MAAO,CACZ,gBAAgB,CAAE,IAAI,cAAc,CAAC,CACrC,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,IAAI,QAAQ,CACpB,CAoDA,MAAO,YAAY,KAAK,CAAE,CAU1B"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let showDigitalOceanSpaceModal = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div><h1${add_styles({ "color": `white` })}>${escape(data.path)}</h1></div>                      ${validate_component(Modal, "Modal").$$render(
      $$result,
      { renderModal: showDigitalOceanSpaceModal },
      {
        renderModal: ($$value) => {
          showDigitalOceanSpaceModal = $$value;
          $$settled = false;
        }
      },
      {
        contents: () => {
          return `<form slot="contents" method="POST" data-svelte-h="svelte-19psoag"><label>Endpoint
			<input name="endpoint" type="url"></label> <label>Region
			<input name="region"></label> <label>Access Key Id
			<input name="accessKeyId"></label> <label>Secret Access Key
			<input name="secretAccessKey"></label> <label>Password
			<input name="password"></label> <button class="svelte-1rp09pp">Pull Documents</button></form>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Layout as default
};
