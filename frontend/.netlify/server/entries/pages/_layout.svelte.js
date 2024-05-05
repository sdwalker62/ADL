import { c as create_ssr_component, a as add_attribute, e as escape, b as subscribe, d as set_store_value, v as validate_component, f as each, g as createEventDispatcher } from "../../chunks/ssr.js";
import { c as colorTheme, a as colorThemeOptions, s as showMainMenu, b as currentPage, d as showCodeOutlineElements, e as showMathOutlineElements, f as showTableOutlineElements, l as leftPanelActive, r as rightPanelActive } from "../../chunks/shared.js";
import Cookies from "js-cookie";
import { T as ThemeSwitcherIcon } from "../../chunks/tippy.js";
import { a as athenaLogo } from "../../chunks/AthenaLogo.js";
import { p as page } from "../../chunks/stores.js";
import "stickybits";
const css$k = {
  code: "dialog.svelte-1og0l82.svelte-1og0l82{max-width:50%;border-radius:10px;border:none;padding:0;background-color:var(--background-2)}dialog.svelte-1og0l82.svelte-1og0l82::backdrop{background:#0a0a0a80;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}dialog.svelte-1og0l82>div.svelte-1og0l82{padding:1em}dialog[open].svelte-1og0l82.svelte-1og0l82{animation:svelte-1og0l82-zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)}@keyframes svelte-1og0l82-zoom{from{transform:scale(0.95)}to{transform:scale(1)}}dialog[open].svelte-1og0l82.svelte-1og0l82::backdrop{animation:svelte-1og0l82-fade 0.2s ease-out}@keyframes svelte-1og0l82-fade{from{opacity:0}to{opacity:1}}button.svelte-1og0l82.svelte-1og0l82{display:block;background:var(--gradient-1);border:none;font-family:var(--f-Regular), sans-serif;font-size:1.5rem;padding:5px;border-radius:5px;font-weight:bold}",
  map: '{"version":3,"file":"Modal.svelte","sources":["Modal.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let showModal;\\nexport let name;\\nlet dialog;\\n$:\\n  if (dialog && showModal)\\n    dialog.showModal();\\n<\/script>\\r\\n\\r\\n<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->\\r\\n<dialog\\r\\n\\tbind:this={dialog}\\r\\n\\ton:close={() => (showModal = false)}\\r\\n\\ton:click|self={() => dialog.close()}\\r\\n>\\r\\n\\t<!-- svelte-ignore a11y-no-static-element-interactions -->\\r\\n\\t<div on:click|stopPropagation>\\r\\n\\t\\t<slot name=\\"header\\" />\\r\\n\\t\\t<hr />\\r\\n\\t\\t<slot />\\r\\n\\t\\t<hr />\\r\\n\\t\\t<!-- svelte-ignore a11y-autofocus -->\\r\\n\\t\\t<button autofocus on:click={() => dialog.close()}>Close {name}</button>\\r\\n\\t</div>\\r\\n</dialog>\\r\\n\\r\\n<style>\\r\\n\\tdialog {\\r\\n\\t\\tmax-width: 50%;\\r\\n\\t\\tborder-radius: 10px;\\r\\n\\t\\tborder: none;\\r\\n\\t\\tpadding: 0;\\r\\n\\t\\tbackground-color: var(--background-2);\\r\\n\\t}\\r\\n\\tdialog::backdrop {\\r\\n\\t\\tbackground: #0a0a0a80;\\r\\n\\t\\tbackdrop-filter: blur(10px);\\r\\n\\t\\t-webkit-backdrop-filter: blur(10px);\\r\\n\\t}\\r\\n\\tdialog > div {\\r\\n\\t\\tpadding: 1em;\\r\\n\\t}\\r\\n\\tdialog[open] {\\r\\n\\t\\tanimation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\\r\\n\\t}\\r\\n\\t@keyframes zoom {\\r\\n\\t\\tfrom {\\r\\n\\t\\t\\ttransform: scale(0.95);\\r\\n\\t\\t}\\r\\n\\t\\tto {\\r\\n\\t\\t\\ttransform: scale(1);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\tdialog[open]::backdrop {\\r\\n\\t\\tanimation: fade 0.2s ease-out;\\r\\n\\t}\\r\\n\\t@keyframes fade {\\r\\n\\t\\tfrom {\\r\\n\\t\\t\\topacity: 0;\\r\\n\\t\\t}\\r\\n\\t\\tto {\\r\\n\\t\\t\\topacity: 1;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\tbutton {\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tbackground: var(--gradient-1);\\r\\n\\t\\tborder: none;\\r\\n\\t\\tfont-family: var(--f-Regular), sans-serif;\\r\\n\\t\\tfont-size: 1.5rem;\\r\\n\\t\\tpadding: 5px;\\r\\n\\t\\tborder-radius: 5px;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA0BC,oCAAO,CACN,SAAS,CAAE,GAAG,CACd,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,IAAI,cAAc,CACrC,CACA,oCAAM,UAAW,CAChB,UAAU,CAAE,SAAS,CACrB,eAAe,CAAE,KAAK,IAAI,CAAC,CAC3B,uBAAuB,CAAE,KAAK,IAAI,CACnC,CACA,qBAAM,CAAG,kBAAI,CACZ,OAAO,CAAE,GACV,CACA,MAAM,CAAC,IAAI,+BAAE,CACZ,SAAS,CAAE,mBAAI,CAAC,IAAI,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CACtD,CACA,WAAW,mBAAK,CACf,IAAK,CACJ,SAAS,CAAE,MAAM,IAAI,CACtB,CACA,EAAG,CACF,SAAS,CAAE,MAAM,CAAC,CACnB,CACD,CACA,MAAM,CAAC,IAAI,+BAAC,UAAW,CACtB,SAAS,CAAE,mBAAI,CAAC,IAAI,CAAC,QACtB,CACA,WAAW,mBAAK,CACf,IAAK,CACJ,OAAO,CAAE,CACV,CACA,EAAG,CACF,OAAO,CAAE,CACV,CACD,CACA,oCAAO,CACN,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,IAAI,WAAW,CAAC,CAAC,CAAC,UAAU,CACzC,SAAS,CAAE,MAAM,CACjB,OAAO,CAAE,GAAG,CACZ,aAAa,CAAE,GAAG,CAClB,WAAW,CAAE,IACd"}'
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal } = $$props;
  let { name } = $$props;
  let dialog;
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$result.css.add(css$k);
  return ` <dialog class="svelte-1og0l82"${add_attribute("this", dialog, 0)}> <div class="svelte-1og0l82">${slots.header ? slots.header({}) : ``} <hr> ${slots.default ? slots.default({}) : ``} <hr>  <button autofocus class="svelte-1og0l82">Close ${escape(name)}</button></div> </dialog>`;
});
const css$j = {
  code: "#theme-canvas.svelte-13ogdrb{height:4rem;width:4rem;display:flex;justify-content:center;align-items:center;border-radius:5px;transition:background-color 0s;justify-self:center;margin-bottom:20px}#theme-options-container.svelte-13ogdrb{display:grid}fieldset.svelte-13ogdrb{border:none}h2.svelte-13ogdrb{font-family:var(--f-SemiBold), sans-serif;font-size:2rem;color:var(--font-1)}label.svelte-13ogdrb{font-family:var(--f-Regular), sans-serif;font-size:1.8rem;color:var(--font-1)}input[type='radio'].svelte-13ogdrb{width:16px;height:16px;border-radius:16px;background-color:var(--background-8);border:none}#theme-canvas.svelte-13ogdrb:hover{cursor:pointer;background:#ffffff20}",
  map: `{"version":3,"file":"ThemeSwitcher.svelte","sources":["ThemeSwitcher.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { beforeUpdate, onMount } from \\"svelte\\";\\nimport Modal from \\"../Modal.svelte\\";\\nimport { colorThemeOptions, colorTheme } from \\"$lib/data/shared.js\\";\\nimport Cookies from \\"js-cookie\\";\\nimport ThemeSwitcherIcon from \\"$lib/assets/icons/ThemeSwitcherIcon.svelte\\";\\nlet themeMenu;\\nlet themeGroup = $colorTheme;\\nlet showModal = false;\\nlet dark = true;\\n$: {\\n  $colorTheme = themeGroup;\\n  Cookies.set(\\"colorMode\\", themeGroup);\\n  dark = themeGroup.includes(\\"dark\\");\\n}\\nbeforeUpdate(() => {\\n  themeGroup = $colorTheme;\\n  document.documentElement.setAttribute(\\"data-theme\\", themeGroup);\\n});\\nonMount(() => {\\n  themeMenu.addEventListener(\\"click\\", () => {\\n    showModal = true;\\n  });\\n});\\n<\/script>\\r\\n\\r\\n<div id=\\"theme-canvas\\" bind:this={themeMenu}>\\r\\n\\t<ThemeSwitcherIcon {dark} />\\r\\n</div>\\r\\n\\r\\n<Modal bind:showModal name={'Theme Menu'}>\\r\\n\\t<h2 slot=\\"header\\">Select Theme</h2>\\r\\n\\t<fieldset>\\r\\n\\t\\t<div\\r\\n\\t\\t\\tid=\\"theme-options-container\\"\\r\\n\\t\\t\\tstyle=\\"grid-template-rows: repeat({$colorThemeOptions.length}, 1fr);\\"\\r\\n\\t\\t>\\r\\n\\t\\t\\t{#each $colorThemeOptions as themeOption}\\r\\n\\t\\t\\t\\t<div class=\\"theme-option\\">\\r\\n\\t\\t\\t\\t\\t<input\\r\\n\\t\\t\\t\\t\\t\\ttype=\\"radio\\"\\r\\n\\t\\t\\t\\t\\t\\tbind:group={themeGroup}\\r\\n\\t\\t\\t\\t\\t\\tclass=\\"theme-option-label\\"\\r\\n\\t\\t\\t\\t\\t\\tname=\\"theme-option-{themeOption.value}\\"\\r\\n\\t\\t\\t\\t\\t\\tvalue={themeOption.value}\\r\\n\\t\\t\\t\\t\\t\\tchecked={true}\\r\\n\\t\\t\\t\\t\\t/>\\r\\n\\t\\t\\t\\t\\t<label for=\\"theme-option-{themeOption.displayName}\\">{themeOption.displayName}</label>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t{/each}\\r\\n\\t\\t</div>\\r\\n\\t</fieldset>\\r\\n</Modal>\\r\\n\\r\\n<style>\\r\\n\\t#theme-canvas {\\r\\n\\t\\theight: 4rem;\\r\\n\\t\\twidth: 4rem;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tborder-radius: 5px;\\r\\n\\t\\ttransition: background-color 0s;\\r\\n\\t\\tjustify-self: center;\\r\\n\\t\\tmargin-bottom: 20px;\\r\\n\\t}\\r\\n\\r\\n\\t#theme-options-container {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t}\\r\\n\\r\\n\\tfieldset {\\r\\n\\t\\tborder: none;\\r\\n\\t}\\r\\n\\r\\n\\th2 {\\r\\n\\t\\tfont-family: var(--f-SemiBold), sans-serif;\\r\\n\\t\\tfont-size: 2rem;\\r\\n\\t\\tcolor: var(--font-1);\\r\\n\\t}\\r\\n\\r\\n\\tlabel {\\r\\n\\t\\tfont-family: var(--f-Regular), sans-serif;\\r\\n\\t\\tfont-size: 1.8rem;\\r\\n\\t\\tcolor: var(--font-1);\\r\\n\\t}\\r\\n\\tinput[type='radio'] {\\r\\n\\t\\t/* appearance: none; */\\r\\n\\t\\twidth: 16px;\\r\\n\\t\\theight: 16px;\\r\\n\\t\\tborder-radius: 16px;\\r\\n\\t\\tbackground-color: var(--background-8);\\r\\n\\t\\tborder: none;\\r\\n\\t}\\r\\n\\r\\n\\t#theme-canvas:hover {\\r\\n\\t\\tcursor: pointer;\\r\\n\\t\\tbackground: #ffffff20;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAsDC,4BAAc,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,gBAAgB,CAAC,EAAE,CAC/B,YAAY,CAAE,MAAM,CACpB,aAAa,CAAE,IAChB,CAEA,uCAAyB,CACxB,OAAO,CAAE,IACV,CAEA,uBAAS,CACR,MAAM,CAAE,IACT,CAEA,iBAAG,CACF,WAAW,CAAE,IAAI,YAAY,CAAC,CAAC,CAAC,UAAU,CAC1C,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,QAAQ,CACpB,CAEA,oBAAM,CACL,WAAW,CAAE,IAAI,WAAW,CAAC,CAAC,CAAC,UAAU,CACzC,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,QAAQ,CACpB,CACA,KAAK,CAAC,IAAI,CAAC,OAAO,gBAAE,CAEnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,gBAAgB,CAAE,IAAI,cAAc,CAAC,CACrC,MAAM,CAAE,IACT,CAEA,4BAAa,MAAO,CACnB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,SACb"}`
};
const ThemeSwitcher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $colorTheme, $$unsubscribe_colorTheme;
  let $colorThemeOptions, $$unsubscribe_colorThemeOptions;
  $$unsubscribe_colorTheme = subscribe(colorTheme, (value) => $colorTheme = value);
  $$unsubscribe_colorThemeOptions = subscribe(colorThemeOptions, (value) => $colorThemeOptions = value);
  let themeMenu;
  let themeGroup = $colorTheme;
  let showModal = false;
  let dark = true;
  $$result.css.add(css$j);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        set_store_value(colorTheme, $colorTheme = themeGroup, $colorTheme);
        Cookies.set("colorMode", themeGroup);
        dark = themeGroup.includes("dark");
      }
    }
    $$rendered = `<div id="theme-canvas" class="svelte-13ogdrb"${add_attribute("this", themeMenu, 0)}>${validate_component(ThemeSwitcherIcon, "ThemeSwitcherIcon").$$render($$result, { dark }, {}, {})}</div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      { name: "Theme Menu", showModal },
      {
        showModal: ($$value) => {
          showModal = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<h2 slot="header" class="svelte-13ogdrb" data-svelte-h="svelte-18ss3cr">Select Theme</h2>`;
        },
        default: () => {
          return `<fieldset class="svelte-13ogdrb"><div id="theme-options-container" style="${"grid-template-rows: repeat(" + escape($colorThemeOptions.length, true) + ", 1fr);"}" class="svelte-13ogdrb">${each($colorThemeOptions, (themeOption) => {
            return `<div class="theme-option"><input type="radio" class="theme-option-label svelte-13ogdrb" name="${"theme-option-" + escape(themeOption.value, true)}"${add_attribute("value", themeOption.value, 0)} ${"checked"}${themeOption.value === themeGroup ? add_attribute("checked", true, 1) : ""}> <label for="${"theme-option-" + escape(themeOption.displayName, true)}" class="svelte-13ogdrb">${escape(themeOption.displayName)}</label> </div>`;
          })}</div></fieldset>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_colorTheme();
  $$unsubscribe_colorThemeOptions();
  return $$rendered;
});
const css$i = {
  code: "dialog.svelte-btrozx.svelte-btrozx{max-width:20vw;border-radius:10px;border:none;padding:0}dialog.svelte-btrozx.svelte-btrozx::backdrop{background:transparent}dialog.svelte-btrozx #main-menu-canvas.svelte-btrozx{display:block;position:fixed;left:0;top:0;height:calc(100% - 5rem);width:300px;padding:20px;margin:5px;background:#0a0a0a80;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:10px}dialog[open].svelte-btrozx.svelte-btrozx{animation:svelte-btrozx-zoom 0s cubic-bezier(0.34, 1.56, 0.64, 1)}hr.svelte-btrozx.svelte-btrozx{border-color:var(--font-3);margin-left:30px;margin-right:30px}#main-menu-canvas.svelte-btrozx.svelte-btrozx{height:100%;display:grid;grid-template-rows:6rem 12rem 1fr}#navigation-links-container.svelte-btrozx.svelte-btrozx{display:grid;grid-template-rows:repeat(2, 1fr);grid-template-columns:repeat(3, 1fr);gap:10px;place-items:center}#external-links-container.svelte-btrozx.svelte-btrozx{display:grid;grid-template-rows:repeat(20, 1fr);grid-template-columns:repeat(2, 1fr);gap:10px;place-items:center;overflow:hidden}#main-menu-top.svelte-btrozx.svelte-btrozx{display:flex;justify-content:end}#logo.svelte-btrozx.svelte-btrozx{height:12rem;display:flex;justify-content:center;margin-bottom:30px}#logo.svelte-btrozx img.svelte-btrozx{height:10rem;margin:10px}@keyframes svelte-btrozx-zoom{from{transform:scale(0.95)}to{transform:scale(1)}}dialog[open].svelte-btrozx.svelte-btrozx::backdrop{animation:svelte-btrozx-fade 0.2s ease-out}@keyframes svelte-btrozx-fade{from{opacity:0}to{opacity:1}}",
  map: '{"version":3,"file":"MainModalMenu.svelte","sources":["MainModalMenu.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { showMainMenu } from \\"$lib/data/shared.js\\";\\nimport ThemeSwitcher from \\"./ThemeSwitcher.svelte\\";\\nimport logo from \\"$lib/assets/images/AthenaLogo.png\\";\\nexport let renderMenu;\\nlet dialog;\\n$:\\n  if (dialog && renderMenu) {\\n    dialog.showModal();\\n  }\\n<\/script>\\r\\n\\r\\n<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->\\r\\n<dialog\\r\\n\\tbind:this={dialog}\\r\\n\\ton:close={() => (renderMenu = false)}\\r\\n\\ton:click|self={() => {\\r\\n\\t\\t$showMainMenu = false;\\r\\n\\t\\tdialog.close();\\r\\n\\t}}\\r\\n>\\r\\n\\t<!-- svelte-ignore a11y-no-static-element-interactions -->\\r\\n\\t<div id=\\"main-menu-canvas\\" on:click|stopPropagation>\\r\\n\\t\\t<div id=\\"main-menu-top\\">\\r\\n\\t\\t\\t<ThemeSwitcher />\\r\\n\\t\\t</div>\\r\\n\\t\\t<div id=\\"logo\\">\\r\\n\\t\\t\\t<img src={logo} alt=\\"logo\\" />\\r\\n\\t\\t</div>\\r\\n\\t\\t<hr />\\r\\n\\t\\t<div id=\\"navigation-links-container\\">\\r\\n\\t\\t\\t<slot name=\\"site-navigation\\" />\\r\\n\\t\\t</div>\\r\\n\\t\\t<hr />\\r\\n\\t\\t<div id=\\"external-links-container\\">\\r\\n\\t\\t\\t<slot name=\\"links\\" />\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n</dialog>\\r\\n\\r\\n<style>\\r\\n\\tdialog {\\r\\n\\t\\tmax-width: 20vw;\\r\\n\\t\\tborder-radius: 10px;\\r\\n\\t\\tborder: none;\\r\\n\\t\\tpadding: 0;\\r\\n\\t}\\r\\n\\r\\n\\tdialog::backdrop {\\r\\n\\t\\tbackground: transparent;\\r\\n\\t}\\r\\n\\r\\n\\tdialog #main-menu-canvas {\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tposition: fixed;\\r\\n\\t\\tleft: 0;\\r\\n\\t\\ttop: 0;\\r\\n\\t\\theight: calc(100% - 5rem);\\r\\n\\t\\twidth: 300px;\\r\\n\\t\\tpadding: 20px;\\r\\n\\t\\tmargin: 5px;\\r\\n\\t\\tbackground: #0a0a0a80;\\r\\n\\t\\tbackdrop-filter: blur(12px);\\r\\n\\t\\t-webkit-backdrop-filter: blur(12px);\\r\\n\\t\\tborder-radius: 10px;\\r\\n\\t}\\r\\n\\r\\n\\tdialog[open] {\\r\\n\\t\\tanimation: zoom 0s cubic-bezier(0.34, 1.56, 0.64, 1);\\r\\n\\t}\\r\\n\\r\\n\\thr {\\r\\n\\t\\tborder-color: var(--font-3);\\r\\n\\t\\tmargin-left: 30px;\\r\\n\\t\\tmargin-right: 30px;\\r\\n\\t}\\r\\n\\r\\n\\t#main-menu-canvas {\\r\\n\\t\\theight: 100%;\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-rows: 6rem 12rem 1fr;\\r\\n\\t}\\r\\n\\r\\n\\t#navigation-links-container {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-rows: repeat(2, 1fr);\\r\\n\\t\\tgrid-template-columns: repeat(3, 1fr);\\r\\n\\t\\tgap: 10px;\\r\\n\\t\\tplace-items: center;\\r\\n\\t}\\r\\n\\r\\n\\t#external-links-container {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-rows: repeat(20, 1fr);\\r\\n\\t\\tgrid-template-columns: repeat(2, 1fr);\\r\\n\\t\\tgap: 10px;\\r\\n\\t\\tplace-items: center;\\r\\n\\t\\toverflow: hidden;\\r\\n\\t}\\r\\n\\r\\n\\t#main-menu-top {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: end;\\r\\n\\t}\\r\\n\\r\\n\\t#logo {\\r\\n\\t\\theight: 12rem;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\tmargin-bottom: 30px;\\r\\n\\t}\\r\\n\\r\\n\\t#logo img {\\r\\n\\t\\theight: 10rem;\\r\\n\\t\\tmargin: 10px;\\r\\n\\t}\\r\\n\\r\\n\\t@keyframes zoom {\\r\\n\\t\\tfrom {\\r\\n\\t\\t\\ttransform: scale(0.95);\\r\\n\\t\\t}\\r\\n\\t\\tto {\\r\\n\\t\\t\\ttransform: scale(1);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\tdialog[open]::backdrop {\\r\\n\\t\\tanimation: fade 0.2s ease-out;\\r\\n\\t}\\r\\n\\t@keyframes fade {\\r\\n\\t\\tfrom {\\r\\n\\t\\t\\topacity: 0;\\r\\n\\t\\t}\\r\\n\\t\\tto {\\r\\n\\t\\t\\topacity: 1;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAwCC,kCAAO,CACN,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CACV,CAEA,kCAAM,UAAW,CAChB,UAAU,CAAE,WACb,CAEA,oBAAM,CAAC,+BAAkB,CACxB,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,KAAK,CACf,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CACzB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,SAAS,CACrB,eAAe,CAAE,KAAK,IAAI,CAAC,CAC3B,uBAAuB,CAAE,KAAK,IAAI,CAAC,CACnC,aAAa,CAAE,IAChB,CAEA,MAAM,CAAC,IAAI,6BAAE,CACZ,SAAS,CAAE,kBAAI,CAAC,EAAE,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CACpD,CAEA,8BAAG,CACF,YAAY,CAAE,IAAI,QAAQ,CAAC,CAC3B,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,IACf,CAEA,6CAAkB,CACjB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,kBAAkB,CAAE,IAAI,CAAC,KAAK,CAAC,GAChC,CAEA,uDAA4B,CAC3B,OAAO,CAAE,IAAI,CACb,kBAAkB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CAClC,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CACrC,GAAG,CAAE,IAAI,CACT,WAAW,CAAE,MACd,CAEA,qDAA0B,CACzB,OAAO,CAAE,IAAI,CACb,kBAAkB,CAAE,OAAO,EAAE,CAAC,CAAC,GAAG,CAAC,CACnC,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CACrC,GAAG,CAAE,IAAI,CACT,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,MACX,CAEA,0CAAe,CACd,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,GAClB,CAEA,iCAAM,CACL,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,aAAa,CAAE,IAChB,CAEA,mBAAK,CAAC,iBAAI,CACT,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,IACT,CAEA,WAAW,kBAAK,CACf,IAAK,CACJ,SAAS,CAAE,MAAM,IAAI,CACtB,CACA,EAAG,CACF,SAAS,CAAE,MAAM,CAAC,CACnB,CACD,CACA,MAAM,CAAC,IAAI,6BAAC,UAAW,CACtB,SAAS,CAAE,kBAAI,CAAC,IAAI,CAAC,QACtB,CACA,WAAW,kBAAK,CACf,IAAK,CACJ,OAAO,CAAE,CACV,CACA,EAAG,CACF,OAAO,CAAE,CACV,CACD"}'
};
const MainModalMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_showMainMenu;
  $$unsubscribe_showMainMenu = subscribe(showMainMenu, (value) => value);
  let { renderMenu } = $$props;
  let dialog;
  if ($$props.renderMenu === void 0 && $$bindings.renderMenu && renderMenu !== void 0)
    $$bindings.renderMenu(renderMenu);
  $$result.css.add(css$i);
  $$unsubscribe_showMainMenu();
  return ` <dialog class="svelte-btrozx"${add_attribute("this", dialog, 0)}> <div id="main-menu-canvas" class="svelte-btrozx"><div id="main-menu-top" class="svelte-btrozx">${validate_component(ThemeSwitcher, "ThemeSwitcher").$$render($$result, {}, {}, {})}</div> <div id="logo" class="svelte-btrozx" data-svelte-h="svelte-hasgmd"><img${add_attribute("src", athenaLogo, 0)} alt="logo" class="svelte-btrozx"></div> <hr class="svelte-btrozx"> <div id="navigation-links-container" class="svelte-btrozx">${slots["site-navigation"] ? slots["site-navigation"]({}) : ``}</div> <hr class="svelte-btrozx"> <div id="external-links-container" class="svelte-btrozx">${slots.links ? slots.links({}) : ``}</div></div> </dialog>`;
});
const css$h = {
  code: ".link-canvas.svelte-1nj1yc.svelte-1nj1yc{display:grid;justify-content:center;align-items:center;grid-template-rows:4rem auto;gap:5px;background-color:transparent;padding:20px;border-radius:10px}span.svelte-1nj1yc.svelte-1nj1yc{color:var(--font-2);font-family:var(--f-Medium), sans-serif;font-size:1.5rem}a.svelte-1nj1yc.svelte-1nj1yc{text-decoration:none}a.active.svelte-1nj1yc .link-canvas.svelte-1nj1yc,.link-canvas.svelte-1nj1yc.svelte-1nj1yc:hover{transition:opacity 0s;opacity:1 !important;background-color:#ffffff20}",
  map: '{"version":3,"file":"SiteNavigationLink.svelte","sources":["SiteNavigationLink.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { currentPage } from \\"$lib/data/shared.js\\";\\nimport { beforeUpdate, onMount } from \\"svelte\\";\\nimport { page } from \\"$app/stores\\";\\nexport let link;\\nexport let name;\\nexport let active;\\nlet component;\\nbeforeUpdate(() => {\\n  if (link === $page.url.pathname) {\\n    active = true;\\n  }\\n});\\nonMount(() => {\\n  component.addEventListener(\\"click\\", () => {\\n    $currentPage = name;\\n  });\\n});\\n<\/script>\\r\\n\\r\\n{#key active}\\r\\n\\t<a href={link} bind:this={component} class:active>\\r\\n\\t\\t<div class=\\"link-canvas\\">\\r\\n\\t\\t\\t<slot {active} />\\r\\n\\t\\t\\t<span>{name}</span>\\r\\n\\t\\t</div>\\r\\n\\t</a>\\r\\n{/key}\\r\\n\\r\\n<style>\\r\\n\\t.link-canvas {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tgrid-template-rows: 4rem auto;\\r\\n\\t\\tgap: 5px;\\r\\n\\t\\tbackground-color: transparent;\\r\\n\\t\\tpadding: 20px;\\r\\n\\t\\tborder-radius: 10px;\\r\\n\\t}\\r\\n\\r\\n\\tspan {\\r\\n\\t\\tcolor: var(--font-2);\\r\\n\\t\\tfont-family: var(--f-Medium), sans-serif;\\r\\n\\t\\tfont-size: 1.5rem;\\r\\n\\t}\\r\\n\\r\\n\\ta {\\r\\n\\t\\ttext-decoration: none;\\r\\n\\t}\\r\\n\\r\\n\\ta.active .link-canvas,\\r\\n\\t.link-canvas:hover {\\r\\n\\t\\ttransition: opacity 0s;\\r\\n\\t\\topacity: 1 !important;\\r\\n\\t\\tbackground-color: #ffffff20;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA6BC,wCAAa,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,kBAAkB,CAAE,IAAI,CAAC,IAAI,CAC7B,GAAG,CAAE,GAAG,CACR,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAChB,CAEA,gCAAK,CACJ,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,WAAW,CAAE,IAAI,UAAU,CAAC,CAAC,CAAC,UAAU,CACxC,SAAS,CAAE,MACZ,CAEA,6BAAE,CACD,eAAe,CAAE,IAClB,CAEA,CAAC,qBAAO,CAAC,0BAAY,CACrB,wCAAY,MAAO,CAClB,UAAU,CAAE,OAAO,CAAC,EAAE,CACtB,OAAO,CAAE,CAAC,CAAC,UAAU,CACrB,gBAAgB,CAAE,SACnB"}'
};
const SiteNavigationLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_currentPage;
  let $$unsubscribe_page;
  $$unsubscribe_currentPage = subscribe(currentPage, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { link } = $$props;
  let { name } = $$props;
  let { active } = $$props;
  let component;
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$h);
  $$unsubscribe_currentPage();
  $$unsubscribe_page();
  return `<a${add_attribute("href", link, 0)} class="${["svelte-1nj1yc", active ? "active" : ""].join(" ").trim()}"${add_attribute("this", component, 0)}><div class="link-canvas svelte-1nj1yc">${slots.default ? slots.default({ active }) : ``} <span class="svelte-1nj1yc">${escape(name)}</span></div></a>`;
});
const css$g = {
  code: "#link-canvas.svelte-1mts0gk{display:grid;justify-content:center;align-items:center;grid-template-columns:2rem 10rem;gap:10px;background-color:transparent;padding:8px;border-radius:10px;opacity:0.5;overflow:hidden;text-overflow:ellipsis}#link-canvas.svelte-1mts0gk:hover{background-color:#ffffff20}span.svelte-1mts0gk{overflow:hidden;text-overflow:ellipsis;text-align:start;color:var(--font-2);font-family:var(--f-Regular), sans-serif;font-size:1.3rem}img.svelte-1mts0gk{width:2rem;height:2rem}a.svelte-1mts0gk{text-decoration:none}#link-canvas.active,#link-canvas.svelte-1mts0gk:hover{transition:opacity 0s;opacity:1 !important}",
  map: '{"version":3,"file":"ExternalNavigationLink.svelte","sources":["ExternalNavigationLink.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { currentPage } from \\"$lib/data/shared.js\\";\\nimport { afterUpdate } from \\"svelte\\";\\nexport let link;\\nexport let site;\\nexport let name;\\nlet component;\\nafterUpdate(() => {\\n  component.addEventListener(\\"click\\", () => {\\n    $currentPage = name;\\n  });\\n  if ($currentPage === name) {\\n    component.classList.add(\\"active\\");\\n  }\\n});\\n<\/script>\\r\\n\\r\\n<a href={link} bind:this={component}>\\r\\n\\t<div id=\\"link-canvas\\">\\r\\n\\t\\t<img src=\\"http://www.google.com/s2/favicons?domain_url=www.{site}.com\\"  alt=\\"nav-icon\\"/>\\r\\n\\t\\t<span>{name}</span>\\r\\n\\t</div>\\r\\n</a>\\r\\n\\r\\n<style>\\r\\n\\t#link-canvas {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tgrid-template-columns: 2rem 10rem;\\r\\n\\t\\tgap: 10px;\\r\\n\\t\\tbackground-color: transparent;\\r\\n\\t\\tpadding: 8px;\\r\\n\\t\\tborder-radius: 10px;\\r\\n\\t\\topacity: 0.5;\\r\\n\\t\\toverflow: hidden;\\r\\n\\t\\ttext-overflow: ellipsis;\\r\\n\\t}\\r\\n\\r\\n\\t#link-canvas:hover {\\r\\n\\t\\tbackground-color: #ffffff20;\\r\\n\\t}\\r\\n\\r\\n\\tspan {\\r\\n\\t\\toverflow: hidden;\\r\\n\\t\\ttext-overflow: ellipsis;\\r\\n\\t\\ttext-align: start;\\r\\n\\t\\tcolor: var(--font-2);\\r\\n\\t\\tfont-family: var(--f-Regular), sans-serif;\\r\\n\\t\\tfont-size: 1.3rem;\\r\\n\\t}\\r\\n\\r\\n\\timg {\\r\\n\\t\\twidth: 2rem;\\r\\n\\t\\theight: 2rem;\\r\\n\\t}\\r\\n\\r\\n\\ta {\\r\\n\\t\\ttext-decoration: none;\\r\\n\\t}\\r\\n\\r\\n\\t:global(#link-canvas.active),\\r\\n\\t#link-canvas:hover {\\r\\n\\t\\ttransition: opacity 0s;\\r\\n\\t\\topacity: 1 !important;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAwBC,2BAAa,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,qBAAqB,CAAE,IAAI,CAAC,KAAK,CACjC,GAAG,CAAE,IAAI,CACT,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,GAAG,CACZ,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,GAAG,CACZ,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAChB,CAEA,2BAAY,MAAO,CAClB,gBAAgB,CAAE,SACnB,CAEA,mBAAK,CACJ,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,WAAW,CAAE,IAAI,WAAW,CAAC,CAAC,CAAC,UAAU,CACzC,SAAS,CAAE,MACZ,CAEA,kBAAI,CACH,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACT,CAEA,gBAAE,CACD,eAAe,CAAE,IAClB,CAEQ,mBAAoB,CAC5B,2BAAY,MAAO,CAClB,UAAU,CAAE,OAAO,CAAC,EAAE,CACtB,OAAO,CAAE,CAAC,CAAC,UACZ"}'
};
const ExternalNavigationLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_currentPage;
  $$unsubscribe_currentPage = subscribe(currentPage, (value) => value);
  let { link } = $$props;
  let { site } = $$props;
  let { name } = $$props;
  let component;
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  if ($$props.site === void 0 && $$bindings.site && site !== void 0)
    $$bindings.site(site);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$result.css.add(css$g);
  $$unsubscribe_currentPage();
  return `<a${add_attribute("href", link, 0)} class="svelte-1mts0gk"${add_attribute("this", component, 0)}><div id="link-canvas" class="svelte-1mts0gk"><img src="${"http://www.google.com/s2/favicons?domain_url=www." + escape(site, true) + ".com"}" alt="nav-icon" class="svelte-1mts0gk"> <span class="svelte-1mts0gk">${escape(name)}</span></div> </a>`;
});
const css$f = {
  code: ".background.svelte-6ua0{fill:var(--background-7)}.icon.svelte-6ua0{fill:var(--font-2)}",
  map: '{"version":3,"file":"SearchIcon.svelte","sources":["SearchIcon.svelte"],"sourcesContent":["<svg\\r\\n\\tversion=\\"1.1\\"\\r\\n\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\txmlns:xlink=\\"http://www.w3.org/1999/xlink\\"\\r\\n\\twidth=\\"24\\"\\r\\n\\theight=\\"24\\"\\r\\n>\\r\\n\\t<g>\\r\\n\\t\\t<rect opacity=\\"0\\" x=\\"0\\" y=\\"0\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\tclass=\\"background\\"\\r\\n\\t\\t\\td=\\"M10.0875 20.175C15.6141 20.175 20.1767 15.606 20.1767 10.0875C20.1767 4.56094 15.606 0 10.0795 0C4.56269 0 0 4.56094 0 10.0875C0 15.606 4.5707 20.175 10.0875 20.175Z\\"\\r\\n\\t\\t\\tfill=\\"#007aff\\"\\r\\n\\t\\t/>\\r\\n\\t\\t<path\\r\\n\\t\\t\\tclass=\\"icon\\"\\r\\n\\t\\t\\td=\\"M9.03867 13.2002C6.71992 13.2002 4.81582 11.2916 4.81582 8.97734C4.81582 6.65507 6.71992 4.74296 9.03867 4.74296C11.3609 4.74296 13.2633 6.64706 13.2633 8.97734C13.2633 9.80683 13.0074 10.5893 12.5863 11.2312L15.0371 13.698C15.2277 13.8949 15.3352 14.1361 15.3352 14.3871C15.3352 14.9529 14.9504 15.3617 14.4041 15.3617C14.0953 15.3617 13.8541 15.2553 13.6332 15.0281L11.1834 12.5898C10.5564 12.9674 9.82109 13.2002 9.03867 13.2002ZM9.03867 11.6914C10.5209 11.6914 11.7447 10.4613 11.7447 8.97734C11.7447 7.47733 10.5209 6.25526 9.03867 6.25526C7.55019 6.25526 6.3246 7.48534 6.3246 8.97734C6.3246 10.4613 7.55019 11.6914 9.03867 11.6914Z\\"\\r\\n\\t\\t\\tfill=\\"#ffffff\\"\\r\\n\\t\\t\\tfill-opacity=\\"0.5\\"\\r\\n\\t\\t/>\\r\\n\\t</g>\\r\\n</svg>\\r\\n\\r\\n<style>\\r\\n\\t.background {\\r\\n\\t\\tfill: var(--background-7);\\r\\n\\t}\\r\\n\\r\\n\\t.icon {\\r\\n\\t\\tfill: var(--font-2);\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAwBC,uBAAY,CACX,IAAI,CAAE,IAAI,cAAc,CACzB,CAEA,iBAAM,CACL,IAAI,CAAE,IAAI,QAAQ,CACnB"}'
};
const SearchIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$f);
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24"><g><rect opacity="0" x="0" y="0"></rect><path class="background svelte-6ua0" d="M10.0875 20.175C15.6141 20.175 20.1767 15.606 20.1767 10.0875C20.1767 4.56094 15.606 0 10.0795 0C4.56269 0 0 4.56094 0 10.0875C0 15.606 4.5707 20.175 10.0875 20.175Z" fill="#007aff"></path><path class="icon svelte-6ua0" d="M9.03867 13.2002C6.71992 13.2002 4.81582 11.2916 4.81582 8.97734C4.81582 6.65507 6.71992 4.74296 9.03867 4.74296C11.3609 4.74296 13.2633 6.64706 13.2633 8.97734C13.2633 9.80683 13.0074 10.5893 12.5863 11.2312L15.0371 13.698C15.2277 13.8949 15.3352 14.1361 15.3352 14.3871C15.3352 14.9529 14.9504 15.3617 14.4041 15.3617C14.0953 15.3617 13.8541 15.2553 13.6332 15.0281L11.1834 12.5898C10.5564 12.9674 9.82109 13.2002 9.03867 13.2002ZM9.03867 11.6914C10.5209 11.6914 11.7447 10.4613 11.7447 8.97734C11.7447 7.47733 10.5209 6.25526 9.03867 6.25526C7.55019 6.25526 6.3246 7.48534 6.3246 8.97734C6.3246 10.4613 7.55019 11.6914 9.03867 11.6914Z" fill="#ffffff" fill-opacity="0.5"></path></g></svg>`;
});
const css$e = {
  code: "#search-canvas.svelte-i9907d{display:grid;grid-template-columns:3rem 1fr;border-radius:7px;width:60rem;height:3rem;gap:5px;background:var(--background-2);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);justify-content:center;align-items:center}input.svelte-i9907d{background-color:transparent;border:none;font-family:var(--f-Medium), sans-serif;align-self:center}input.svelte-i9907d::placeholder{color:var(--font-5);font-size:1.5rem}.icon.svelte-i9907d{display:flex;height:calc(3rem - 10px);padding:5px;justify-content:center;align-items:start;margin:0;overflow:visible}",
  map: '{"version":3,"file":"SearchInput.svelte","sources":["SearchInput.svelte"],"sourcesContent":["<script lang=\\"ts\\">import SearchIcon from \\"$lib/assets/icons/SearchIcon.svelte\\";\\n<\/script>\\r\\n\\r\\n<div id=\\"search-canvas\\">\\r\\n\\t<div class=\\"icon\\">\\r\\n\\t\\t<SearchIcon />\\r\\n\\t</div>\\r\\n\\t<input name=\\"search\\" placeholder=\\"Search documentation...\\" />\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t#search-canvas {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-columns: 3rem 1fr;\\r\\n\\t\\tborder-radius: 7px;\\r\\n\\t\\twidth: 60rem;\\r\\n\\t\\theight: 3rem;\\r\\n\\t\\tgap: 5px;\\r\\n\\t\\tbackground: var(--background-2);\\r\\n\\t\\tbackdrop-filter: blur(5px);\\r\\n\\t\\t-webkit-backdrop-filter: blur(5px);\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: center;\\r\\n\\t}\\r\\n\\r\\n\\tinput {\\r\\n\\t\\tbackground-color: transparent;\\r\\n\\t\\tborder: none;\\r\\n\\t\\tfont-family: var(--f-Medium), sans-serif;\\r\\n\\t\\talign-self: center;\\r\\n\\t}\\r\\n\\r\\n\\tinput::placeholder {\\r\\n\\t\\tcolor: var(--font-5);\\r\\n\\t\\tfont-size: 1.5rem;\\r\\n\\t}\\r\\n\\r\\n\\t.icon {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\theight: calc(3rem - 10px);\\r\\n\\t\\tpadding: 5px;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: start;\\r\\n\\t\\tmargin: 0;\\r\\n\\t\\toverflow: visible;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAWC,4BAAe,CACd,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,IAAI,CAAC,GAAG,CAC/B,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,GAAG,CAAE,GAAG,CACR,UAAU,CAAE,IAAI,cAAc,CAAC,CAC/B,eAAe,CAAE,KAAK,GAAG,CAAC,CAC1B,uBAAuB,CAAE,KAAK,GAAG,CAAC,CAClC,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MACd,CAEA,mBAAM,CACL,gBAAgB,CAAE,WAAW,CAC7B,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,IAAI,UAAU,CAAC,CAAC,CAAC,UAAU,CACxC,UAAU,CAAE,MACb,CAEA,mBAAK,aAAc,CAClB,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,SAAS,CAAE,MACZ,CAEA,mBAAM,CACL,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CACzB,OAAO,CAAE,GAAG,CACZ,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,KAAK,CAClB,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,OACX"}'
};
const SearchInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$e);
  return `<div id="search-canvas" class="svelte-i9907d"><div class="icon svelte-i9907d">${validate_component(SearchIcon, "SearchIcon").$$render($$result, {}, {}, {})}</div> <input name="search" placeholder="Search documentation..." class="svelte-i9907d"> </div>`;
});
const css$d = {
  code: "#top-bar.svelte-1n0a45y{display:flex;flex-direction:row;justify-content:space-between;align-items:center;background:var(--background-6);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);margin:0;z-index:1000;min-height:4rem;max-height:4rem}#center-cluster.svelte-1n0a45y{display:flex;flex-direction:row;align-items:center}#left-cluster.svelte-1n0a45y,#left-search.svelte-1n0a45y,#right-cluster.svelte-1n0a45y,#right-search.svelte-1n0a45y{display:flex;flex-direction:row;gap:2px}#left-search.svelte-1n0a45y,#right-search.svelte-1n0a45y{gap:0}#left-cluster.svelte-1n0a45y,#right-search.svelte-1n0a45y{justify-content:start}#right-cluster.svelte-1n0a45y,#left-search.svelte-1n0a45y{justify-content:end}#left-cluster.svelte-1n0a45y,#right-search.svelte-1n0a45y{margin-left:10px}#right-cluster.svelte-1n0a45y,#left-search.svelte-1n0a45y{margin-right:10px}",
  map: '{"version":3,"file":"TopBar.svelte","sources":["TopBar.svelte"],"sourcesContent":["<script lang=\\"ts\\">import SearchInput from \\"./SearchInput.svelte\\";\\nimport stickybits from \\"stickybits\\";\\nimport { onMount } from \\"svelte\\";\\nimport tippy from \\"tippy.js\\";\\nimport \\"tippy.js/dist/tippy.css\\";\\nonMount(() => {\\n  stickybits(\\"#top-bar\\");\\n  tippy(\\"#toggle-left-panel\\", {\\n    content: \\"Show/Hide Left Panel\\",\\n    theme: \\"athena\\",\\n    delay: [400, 0]\\n  });\\n  tippy(\\"#toggle-right-panel\\", {\\n    content: \\"Show/Hide Right Panel\\",\\n    theme: \\"athena\\",\\n    delay: [400, 0]\\n  });\\n  tippy(\\"#increaseFont\\", {\\n    content: \\"Increase Font Size\\",\\n    theme: \\"athena\\",\\n    delay: [400, 0]\\n  });\\n  tippy(\\"#decreaseFont\\", {\\n    content: \\"Decrease Font Size\\",\\n    theme: \\"athena\\",\\n    delay: [400, 0]\\n  });\\n});\\n<\/script>\\r\\n\\r\\n<div id=\\"top-bar\\">\\r\\n\\t<div id=\\"left-cluster\\">\\r\\n\\t\\t<slot name=\\"left-cluster\\" />\\r\\n\\t</div>\\r\\n\\t<div id=\\"center-cluster\\">\\r\\n\\t\\t<div id=\\"left-search\\">\\r\\n\\t\\t\\t<slot name=\\"left-search\\" />\\r\\n\\t\\t</div>\\r\\n\\t\\t<SearchInput />\\r\\n\\t\\t<div id=\\"right-search\\">\\r\\n\\t\\t\\t<slot name=\\"right-search\\" />\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n\\t<div id=\\"right-cluster\\">\\r\\n\\t\\t<slot name=\\"right-cluster\\" />\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t#top-bar {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: row;\\r\\n\\r\\n\\t\\t/* grid-template-columns: 1fr 1fr auto 1fr 1fr; */\\r\\n\\t\\tjustify-content: space-between;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tbackground: var(--background-6);\\r\\n\\t\\tbackdrop-filter: blur(5px);\\r\\n\\t\\t-webkit-backdrop-filter: blur(5px);\\r\\n\\t\\tmargin: 0;\\r\\n\\t\\tz-index: 1000;\\r\\n\\t\\tmin-height: 4rem;\\r\\n\\t\\tmax-height: 4rem;\\r\\n\\t}\\r\\n\\r\\n\\t#center-cluster {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: row;\\r\\n\\t\\talign-items: center;\\r\\n\\t}\\r\\n\\r\\n\\t#left-cluster,\\r\\n\\t#left-search,\\r\\n\\t#right-cluster,\\r\\n\\t#right-search {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: row;\\r\\n\\t\\tgap: 2px;\\r\\n\\t}\\r\\n\\r\\n\\t#left-search,\\r\\n\\t#right-search {\\r\\n\\t\\tgap: 0;\\r\\n\\t}\\r\\n\\r\\n\\t#left-cluster,\\r\\n\\t#right-search {\\r\\n\\t\\tjustify-content: start;\\r\\n\\t}\\r\\n\\r\\n\\t#right-cluster,\\r\\n\\t#left-search {\\r\\n\\t\\tjustify-content: end;\\r\\n\\t}\\r\\n\\r\\n\\t#left-cluster,\\r\\n\\t#right-search {\\r\\n\\t\\tmargin-left: 10px;\\r\\n\\t}\\r\\n\\r\\n\\t#right-cluster,\\r\\n\\t#left-search {\\r\\n\\t\\tmargin-right: 10px;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAiDC,uBAAS,CACR,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CAGnB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,IAAI,cAAc,CAAC,CAC/B,eAAe,CAAE,KAAK,GAAG,CAAC,CAC1B,uBAAuB,CAAE,KAAK,GAAG,CAAC,CAClC,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,IACb,CAEA,8BAAgB,CACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MACd,CAEA,4BAAa,CACb,2BAAY,CACZ,6BAAc,CACd,4BAAc,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,GAAG,CAAE,GACN,CAEA,2BAAY,CACZ,4BAAc,CACb,GAAG,CAAE,CACN,CAEA,4BAAa,CACb,4BAAc,CACb,eAAe,CAAE,KAClB,CAEA,6BAAc,CACd,2BAAa,CACZ,eAAe,CAAE,GAClB,CAEA,4BAAa,CACb,4BAAc,CACb,WAAW,CAAE,IACd,CAEA,6BAAc,CACd,2BAAa,CACZ,YAAY,CAAE,IACf"}'
};
const TopBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$d);
  return `<div id="top-bar" class="svelte-1n0a45y"><div id="left-cluster" class="svelte-1n0a45y">${slots["left-cluster"] ? slots["left-cluster"]({}) : ``}</div> <div id="center-cluster" class="svelte-1n0a45y"><div id="left-search" class="svelte-1n0a45y">${slots["left-search"] ? slots["left-search"]({}) : ``}</div> ${validate_component(SearchInput, "SearchInput").$$render($$result, {}, {}, {})} <div id="right-search" class="svelte-1n0a45y">${slots["right-search"] ? slots["right-search"]({}) : ``}</div></div> <div id="right-cluster" class="svelte-1n0a45y">${slots["right-cluster"] ? slots["right-cluster"]({}) : ``}</div> </div>`;
});
const css$c = {
  code: ".canvas.svelte-qhh6r9{display:flex;justify-content:center;align-items:center;padding:5px 10px;margin-top:2px;margin-bottom:2px;border-radius:8px}.canvas.svelte-qhh6r9:hover{cursor:pointer;background-color:#00000020}.canvas.active.svelte-qhh6r9{background-color:#00000020}",
  map: '{"version":3,"file":"ToggleMenuItem.svelte","sources":["ToggleMenuItem.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { afterUpdate, onMount } from \\"svelte\\";\\nimport { createEventDispatcher } from \\"svelte\\";\\nimport tippy from \\"tippy.js\\";\\nexport let active = false;\\nexport let tip = \\"\\";\\nexport let onClickFunction = () => {\\n};\\nconst dispatch = createEventDispatcher();\\nlet component;\\nonMount(() => {\\n  tippy(component, {\\n    content: tip,\\n    theme: \\"athena\\",\\n    delay: [200, 0],\\n    placement: \\"bottom\\"\\n  });\\n  dispatch(\\"activation\\", {\\n    active\\n  });\\n});\\nafterUpdate(() => {\\n  component.addEventListener(\\"click\\", () => {\\n    onClickFunction();\\n    active = !active;\\n  });\\n});\\n<\/script>\\r\\n\\r\\n{#key active}\\r\\n\\t<div bind:this={component} class=\\"canvas\\" class:active>\\r\\n\\t\\t<slot {active} />\\r\\n\\t</div>\\r\\n{/key}\\r\\n\\r\\n<style>\\r\\n\\t.canvas {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tpadding: 5px 10px;\\r\\n\\t\\tmargin-top: 2px;\\r\\n\\t\\tmargin-bottom: 2px;\\r\\n\\t\\tborder-radius: 8px;\\r\\n\\t}\\r\\n\\r\\n\\t.canvas:hover {\\r\\n\\t\\tcursor: pointer;\\r\\n\\t\\tbackground-color: #00000020;\\r\\n\\t}\\r\\n\\r\\n\\t.canvas.active {\\r\\n\\t\\tbackground-color: #00000020;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAmCC,qBAAQ,CACP,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,UAAU,CAAE,GAAG,CACf,aAAa,CAAE,GAAG,CAClB,aAAa,CAAE,GAChB,CAEA,qBAAO,MAAO,CACb,MAAM,CAAE,OAAO,CACf,gBAAgB,CAAE,SACnB,CAEA,OAAO,qBAAQ,CACd,gBAAgB,CAAE,SACnB"}'
};
const ToggleMenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  let { tip = "" } = $$props;
  let { onClickFunction = () => {
  } } = $$props;
  createEventDispatcher();
  let component;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.tip === void 0 && $$bindings.tip && tip !== void 0)
    $$bindings.tip(tip);
  if ($$props.onClickFunction === void 0 && $$bindings.onClickFunction && onClickFunction !== void 0)
    $$bindings.onClickFunction(onClickFunction);
  $$result.css.add(css$c);
  return `<div class="${["canvas svelte-qhh6r9", active ? "active" : ""].join(" ").trim()}"${add_attribute("this", component, 0)}>${slots.default ? slots.default({ active }) : ``}</div>`;
});
const css$b = {
  code: ".canvas.svelte-4kgwc3{display:flex;justify-content:center;align-items:center;padding:5px 10px;margin-top:2px;margin-bottom:2px;border-radius:8px}.canvas.svelte-4kgwc3:hover{cursor:pointer;background-color:var(--grey-2);transition:background-color 0s}",
  map: '{"version":3,"file":"ActionMenuItem.svelte","sources":["ActionMenuItem.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport tippy from \\"tippy.js\\";\\nlet component;\\nexport let tip = \\"\\";\\nexport let onClickFunction = () => {\\n};\\nonMount(() => {\\n  component.addEventListener(\\"click\\", onClickFunction);\\n  tippy(component, {\\n    content: tip,\\n    theme: \\"athena\\",\\n    delay: [200, 0],\\n    placement: \\"bottom\\"\\n  });\\n});\\n<\/script>\\r\\n\\r\\n<div bind:this={component} class=\\"canvas\\">\\r\\n\\t<slot />\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t.canvas {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tpadding: 5px 10px;\\r\\n\\t\\tmargin-top: 2px;\\r\\n\\t\\tmargin-bottom: 2px;\\r\\n\\t\\tborder-radius: 8px;\\r\\n\\t}\\r\\n\\r\\n\\t.canvas:hover {\\r\\n\\t\\tcursor: pointer;\\r\\n\\t\\tbackground-color: var(--grey-2);\\r\\n\\t\\ttransition: background-color 0s;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAsBC,qBAAQ,CACP,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,UAAU,CAAE,GAAG,CACf,aAAa,CAAE,GAAG,CAClB,aAAa,CAAE,GAChB,CAEA,qBAAO,MAAO,CACb,MAAM,CAAE,OAAO,CACf,gBAAgB,CAAE,IAAI,QAAQ,CAAC,CAC/B,UAAU,CAAE,gBAAgB,CAAC,EAC9B"}'
};
const ActionMenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let component;
  let { tip = "" } = $$props;
  let { onClickFunction = () => {
  } } = $$props;
  if ($$props.tip === void 0 && $$bindings.tip && tip !== void 0)
    $$bindings.tip(tip);
  if ($$props.onClickFunction === void 0 && $$bindings.onClickFunction && onClickFunction !== void 0)
    $$bindings.onClickFunction(onClickFunction);
  $$result.css.add(css$b);
  return `<div class="canvas svelte-4kgwc3"${add_attribute("this", component, 0)}>${slots.default ? slots.default({}) : ``} </div>`;
});
const css$a = {
  code: "svg.svelte-clsyzt.svelte-clsyzt{scale:1}svg.svelte-clsyzt path.svelte-clsyzt{fill:var(--background-1);opacity:0.5}svg.svelte-clsyzt:hover path.svelte-clsyzt,svg.active.svelte-clsyzt path.svelte-clsyzt{fill:var(--background-1);opacity:1}",
  map: '{"version":3,"file":"LeftPanelIcon.svelte","sources":["LeftPanelIcon.svelte"],"sourcesContent":["<script>\\r\\n\\texport let active = false;\\r\\n<\/script>\\r\\n\\r\\n<svg\\r\\n\\tclass:active\\r\\n\\tversion=\\"1.1\\"\\r\\n\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\txmlns:xlink=\\"http://www.w3.org/1999/xlink\\"\\r\\n\\twidth=\\"23.1293\\"\\r\\n\\theight=\\"18.2476\\"\\r\\n>\\r\\n\\t<g>\\r\\n\\t\\t<rect height=\\"18.2316\\" opacity=\\"0\\" width=\\"23.1293\\" x=\\"0\\" y=\\"0\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M3.20351 18.2316L19.9258 18.2316C22.0416 18.2316 23.1293 17.1519 23.1293 15.0682L23.1293 3.17499C23.1293 1.08945 22.0416 0.00351548 19.9258 0.00351548L3.20351 0.00351548C1.0957 0.00351548 0 1.08945 0 3.17499L0 15.0682C0 17.1519 1.0957 18.2316 3.20351 18.2316ZM3.31444 16.3184C2.40643 16.3184 1.91327 15.8482 1.91327 14.8994L1.91327 3.34198C1.91327 2.39315 2.40643 1.91678 3.31444 1.91678L19.8148 1.91678C20.7149 1.91678 21.216 2.39315 21.216 3.34198L21.216 14.8994C21.216 15.8482 20.7149 16.3184 19.8148 16.3184Z\\"\\r\\n\\t\\t\\tfill=\\"#007aff\\"\\r\\n\\t\\t\\tfill-opacity=\\"1\\"\\r\\n\\t\\t/>\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M4.10428 14.8971L6.88202 14.8971C7.42596 14.8971 7.6455 14.6678 7.6455 14.1078L7.6455 4.13358C7.6455 3.57362 7.42596 3.34432 6.88202 3.34432L4.10428 3.34432C3.56034 3.34432 3.3408 3.57362 3.3408 4.13358L3.3408 14.1078C3.3408 14.6678 3.56034 14.8971 4.10428 14.8971Z\\"\\r\\n\\t\\t\\tfill=\\"#ffffff\\"\\r\\n\\t\\t\\tfill-opacity=\\"0.6\\"\\r\\n\\t\\t/>\\r\\n\\t</g>\\r\\n</svg>\\r\\n\\r\\n<style>\\r\\n\\tsvg {\\r\\n\\t\\tscale: 1;\\r\\n\\t}\\r\\n\\r\\n\\tsvg path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 0.5;\\r\\n\\t}\\r\\n\\r\\n\\tsvg:hover path,\\r\\n\\tsvg.active path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA4BC,+BAAI,CACH,KAAK,CAAE,CACR,CAEA,iBAAG,CAAC,kBAAK,CACR,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,GACV,CAEA,iBAAG,MAAM,CAAC,kBAAI,CACd,GAAG,qBAAO,CAAC,kBAAK,CACf,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,CACV"}'
};
const LeftPanelIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$a);
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="23.1293" height="18.2476" class="${["svelte-clsyzt", active ? "active" : ""].join(" ").trim()}"><g><rect height="18.2316" opacity="0" width="23.1293" x="0" y="0"></rect><path d="M3.20351 18.2316L19.9258 18.2316C22.0416 18.2316 23.1293 17.1519 23.1293 15.0682L23.1293 3.17499C23.1293 1.08945 22.0416 0.00351548 19.9258 0.00351548L3.20351 0.00351548C1.0957 0.00351548 0 1.08945 0 3.17499L0 15.0682C0 17.1519 1.0957 18.2316 3.20351 18.2316ZM3.31444 16.3184C2.40643 16.3184 1.91327 15.8482 1.91327 14.8994L1.91327 3.34198C1.91327 2.39315 2.40643 1.91678 3.31444 1.91678L19.8148 1.91678C20.7149 1.91678 21.216 2.39315 21.216 3.34198L21.216 14.8994C21.216 15.8482 20.7149 16.3184 19.8148 16.3184Z" fill="#007aff" fill-opacity="1" class="svelte-clsyzt"></path><path d="M4.10428 14.8971L6.88202 14.8971C7.42596 14.8971 7.6455 14.6678 7.6455 14.1078L7.6455 4.13358C7.6455 3.57362 7.42596 3.34432 6.88202 3.34432L4.10428 3.34432C3.56034 3.34432 3.3408 3.57362 3.3408 4.13358L3.3408 14.1078C3.3408 14.6678 3.56034 14.8971 4.10428 14.8971Z" fill="#ffffff" fill-opacity="0.6" class="svelte-clsyzt"></path></g></svg>`;
});
const css$9 = {
  code: "svg.svelte-clsyzt.svelte-clsyzt{scale:1}svg.svelte-clsyzt path.svelte-clsyzt{fill:var(--background-1);opacity:0.5}svg.svelte-clsyzt:hover path.svelte-clsyzt,svg.active.svelte-clsyzt path.svelte-clsyzt{fill:var(--background-1);opacity:1}",
  map: '{"version":3,"file":"DriveIcon.svelte","sources":["DriveIcon.svelte"],"sourcesContent":["<script>\\r\\n\\texport let active = false;\\r\\n<\/script>\\r\\n\\r\\n<svg\\r\\n\\tclass:active\\r\\n\\tversion=\\"1.1\\"\\r\\n\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\txmlns:xlink=\\"http://www.w3.org/1999/xlink\\"\\r\\n\\twidth=\\"20.5658\\"\\r\\n\\theight=\\"22.0785\\"\\r\\n>\\r\\n\\t<g>\\r\\n\\t\\t<rect height=\\"22.0785\\" opacity=\\"0\\" width=\\"21.2621\\" x=\\"0\\" y=\\"0\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M0 11.2666C0 13.7084 1.84336 15.4744 4.39628 15.4744L16.8676 15.4744C19.4187 15.4744 21.2621 13.7084 21.2621 11.2666C21.2621 10.5638 21.081 9.91092 20.815 9.30604L17.8176 2.26327C17.1957 0.798232 15.9596 0.00760853 14.2672 0.00760853L7.00018 0.00760853C5.31405 0.00760853 4.06367 0.794716 3.44179 2.26327L0.468162 9.27616C0.202928 9.88124 0 10.5367 0 11.2666ZM3.45096 7.13964L5.23143 2.74393C5.51756 2.02401 6.14042 1.64725 7.02909 1.64725L14.2463 1.64725C15.135 1.64725 15.7578 2.02401 16.0422 2.74393L17.8209 7.13964C17.5191 7.07519 17.1697 7.05253 16.7797 7.05253L4.48593 7.05253C4.09413 7.05253 3.74647 7.07519 3.45096 7.13964ZM1.87089 11.2666C1.87089 9.89256 2.90136 8.93142 4.39628 8.93142L16.8676 8.93142C18.3625 8.93142 19.393 9.89256 19.393 11.2666C19.393 12.7224 18.4443 13.6035 16.8676 13.6035L4.39628 13.6035C2.90136 13.6035 1.87089 12.6406 1.87089 11.2666ZM15.6236 11.2666C15.6236 11.9242 16.1588 12.4638 16.8209 12.4541C17.4687 12.4461 18.0119 11.9162 18.0119 11.2666C18.0119 10.624 17.4572 10.0773 16.8209 10.0773C16.1765 10.0773 15.6236 10.624 15.6236 11.2666ZM9.59843 19.781L11.3781 19.781L11.3781 14.4177L9.59843 14.4177ZM2.09746 20.5816L18.8808 20.5816C19.3685 20.5816 19.7738 20.1843 19.7738 19.6967C19.7738 19.209 19.3685 18.8019 18.8808 18.8019L2.09746 18.8019C1.60977 18.8019 1.2125 19.209 1.2125 19.6967C1.2125 20.1843 1.60977 20.5816 2.09746 20.5816ZM10.4914 22.0785C11.7896 22.0785 12.859 21.0092 12.859 19.7029C12.859 18.4047 11.7896 17.3353 10.4914 17.3353C9.18515 17.3353 8.11757 18.4047 8.11757 19.7029C8.11757 21.0092 9.18515 22.0785 10.4914 22.0785Z\\"\\r\\n\\t\\t\\tfill=\\"#ffffff\\"\\r\\n\\t\\t\\tfill-opacity=\\"1\\"\\r\\n\\t\\t/>\\r\\n\\t</g>\\r\\n</svg>\\r\\n\\r\\n<style>\\r\\n\\tsvg {\\r\\n\\t\\tscale: 1;\\r\\n\\t}\\r\\n\\r\\n\\tsvg path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 0.5;\\r\\n\\t}\\r\\n\\r\\n\\tsvg:hover path,\\r\\n\\tsvg.active path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAuBC,+BAAI,CACH,KAAK,CAAE,CACR,CAEA,iBAAG,CAAC,kBAAK,CACR,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,GACV,CAEA,iBAAG,MAAM,CAAC,kBAAI,CACd,GAAG,qBAAO,CAAC,kBAAK,CACf,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,CACV"}'
};
const DriveIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$9);
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20.5658" height="22.0785" class="${["svelte-clsyzt", active ? "active" : ""].join(" ").trim()}"><g><rect height="22.0785" opacity="0" width="21.2621" x="0" y="0"></rect><path d="M0 11.2666C0 13.7084 1.84336 15.4744 4.39628 15.4744L16.8676 15.4744C19.4187 15.4744 21.2621 13.7084 21.2621 11.2666C21.2621 10.5638 21.081 9.91092 20.815 9.30604L17.8176 2.26327C17.1957 0.798232 15.9596 0.00760853 14.2672 0.00760853L7.00018 0.00760853C5.31405 0.00760853 4.06367 0.794716 3.44179 2.26327L0.468162 9.27616C0.202928 9.88124 0 10.5367 0 11.2666ZM3.45096 7.13964L5.23143 2.74393C5.51756 2.02401 6.14042 1.64725 7.02909 1.64725L14.2463 1.64725C15.135 1.64725 15.7578 2.02401 16.0422 2.74393L17.8209 7.13964C17.5191 7.07519 17.1697 7.05253 16.7797 7.05253L4.48593 7.05253C4.09413 7.05253 3.74647 7.07519 3.45096 7.13964ZM1.87089 11.2666C1.87089 9.89256 2.90136 8.93142 4.39628 8.93142L16.8676 8.93142C18.3625 8.93142 19.393 9.89256 19.393 11.2666C19.393 12.7224 18.4443 13.6035 16.8676 13.6035L4.39628 13.6035C2.90136 13.6035 1.87089 12.6406 1.87089 11.2666ZM15.6236 11.2666C15.6236 11.9242 16.1588 12.4638 16.8209 12.4541C17.4687 12.4461 18.0119 11.9162 18.0119 11.2666C18.0119 10.624 17.4572 10.0773 16.8209 10.0773C16.1765 10.0773 15.6236 10.624 15.6236 11.2666ZM9.59843 19.781L11.3781 19.781L11.3781 14.4177L9.59843 14.4177ZM2.09746 20.5816L18.8808 20.5816C19.3685 20.5816 19.7738 20.1843 19.7738 19.6967C19.7738 19.209 19.3685 18.8019 18.8808 18.8019L2.09746 18.8019C1.60977 18.8019 1.2125 19.209 1.2125 19.6967C1.2125 20.1843 1.60977 20.5816 2.09746 20.5816ZM10.4914 22.0785C11.7896 22.0785 12.859 21.0092 12.859 19.7029C12.859 18.4047 11.7896 17.3353 10.4914 17.3353C9.18515 17.3353 8.11757 18.4047 8.11757 19.7029C8.11757 21.0092 9.18515 22.0785 10.4914 22.0785Z" fill="#ffffff" fill-opacity="1" class="svelte-clsyzt"></path></g></svg>`;
});
const css$8 = {
  code: "svg.svelte-clsyzt.svelte-clsyzt{scale:1}svg.svelte-clsyzt path.svelte-clsyzt{fill:var(--background-1);opacity:0.5}svg.svelte-clsyzt:hover path.svelte-clsyzt,svg.active.svelte-clsyzt path.svelte-clsyzt{fill:var(--background-1);opacity:1}",
  map: '{"version":3,"file":"CodeIcon.svelte","sources":["CodeIcon.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Cookie from \\"js-cookie\\";\\nexport let active = true;\\nCookie.set(\\"show-code-outline\\", active.toString());\\n<\/script>\\r\\n\\r\\n<svg\\r\\n\\tclass:active\\r\\n\\tversion=\\"1.1\\"\\r\\n\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\txmlns:xlink=\\"http://www.w3.org/1999/xlink\\"\\r\\n\\twidth=\\"24\\"\\r\\n\\theight=\\"18.2476\\"\\r\\n>\\r\\n\\t<g>\\r\\n\\t\\t<rect height=\\"24\\" opacity=\\"0\\" width=\\"24\\" x=\\"0\\" y=\\"0\\" scale=\\"0.8\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\ttransform=\\"scale(0.85)\\"\\r\\n\\t\\t\\td=\\"M11.3988 18.7589C12.0482 18.9378 12.6453 18.586 12.842 17.9296L17.6473 1.45653C17.8279 0.841883 17.5277 0.244817 16.8783 0.0659129C16.2369-0.112992 15.6639 0.166692 15.4512 0.895203L10.6699 17.2944C10.4733 17.9589 10.7254 18.5737 11.3988 18.7589Z\\"\\r\\n\\t\\t\\tfill=\\"#ffffff\\"\\r\\n\\t\\t\\tfill-opacity=\\"0.55\\"\\r\\n\\t\\t/>\\r\\n\\t\\t<path\\r\\n\\t\\t\\ttransform=\\"scale(0.85)\\"\\r\\n\\t\\t\\td=\\"M1.55724e-05 9.39774C-0.00174217 9.73094 0.145327 10.0649 0.429699 10.3182L6.74748 16.0206C7.26486 16.4866 7.95587 16.4761 8.39258 15.9897C8.8293 15.4936 8.77071 14.8026 8.26934 14.3526L2.80272 9.39774L8.26934 4.44285C8.77071 3.99109 8.8293 3.29207 8.39258 2.80575C7.95587 2.31943 7.26486 2.30888 6.74748 2.77489L0.429699 8.46923C0.145327 8.7288-0.00174217 9.06278 1.55724e-05 9.39774ZM28.2291 9.39774C28.2308 9.06278 28.0918 8.7288 27.8056 8.46923L21.4896 2.77489C20.9642 2.30888 20.2795 2.31943 19.8445 2.80575C19.4078 3.29207 19.4584 3.99109 19.958 4.44285L25.4344 9.39774L19.958 14.3526C19.4584 14.8026 19.4078 15.4936 19.8445 15.9897C20.2795 16.4761 20.9642 16.4866 21.4896 16.0206L27.8056 10.3182C28.0918 10.0649 28.2308 9.73094 28.2291 9.39774Z\\"\\r\\n\\t\\t\\tfill=\\"#ffffff\\"\\r\\n\\t\\t\\tfill-opacity=\\"1\\"\\r\\n\\t\\t/>\\r\\n\\t</g>\\r\\n</svg>\\r\\n\\r\\n<style>\\r\\n\\tsvg {\\r\\n\\t\\tscale: 1;\\r\\n\\t}\\r\\n\\r\\n\\tsvg path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 0.5;\\r\\n\\t}\\r\\n\\r\\n\\tsvg:hover path,\\r\\n\\tsvg.active path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA+BC,+BAAI,CACH,KAAK,CAAE,CACR,CAEA,iBAAG,CAAC,kBAAK,CACR,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,GACV,CAEA,iBAAG,MAAM,CAAC,kBAAI,CACd,GAAG,qBAAO,CAAC,kBAAK,CACf,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,CACV"}'
};
const CodeIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = true } = $$props;
  Cookies.set("show-code-outline", active.toString());
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$8);
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="18.2476" class="${["svelte-clsyzt", active ? "active" : ""].join(" ").trim()}"><g><rect height="24" opacity="0" width="24" x="0" y="0" scale="0.8"></rect><path transform="scale(0.85)" d="M11.3988 18.7589C12.0482 18.9378 12.6453 18.586 12.842 17.9296L17.6473 1.45653C17.8279 0.841883 17.5277 0.244817 16.8783 0.0659129C16.2369-0.112992 15.6639 0.166692 15.4512 0.895203L10.6699 17.2944C10.4733 17.9589 10.7254 18.5737 11.3988 18.7589Z" fill="#ffffff" fill-opacity="0.55" class="svelte-clsyzt"></path><path transform="scale(0.85)" d="M1.55724e-05 9.39774C-0.00174217 9.73094 0.145327 10.0649 0.429699 10.3182L6.74748 16.0206C7.26486 16.4866 7.95587 16.4761 8.39258 15.9897C8.8293 15.4936 8.77071 14.8026 8.26934 14.3526L2.80272 9.39774L8.26934 4.44285C8.77071 3.99109 8.8293 3.29207 8.39258 2.80575C7.95587 2.31943 7.26486 2.30888 6.74748 2.77489L0.429699 8.46923C0.145327 8.7288-0.00174217 9.06278 1.55724e-05 9.39774ZM28.2291 9.39774C28.2308 9.06278 28.0918 8.7288 27.8056 8.46923L21.4896 2.77489C20.9642 2.30888 20.2795 2.31943 19.8445 2.80575C19.4078 3.29207 19.4584 3.99109 19.958 4.44285L25.4344 9.39774L19.958 14.3526C19.4584 14.8026 19.4078 15.4936 19.8445 15.9897C20.2795 16.4761 20.9642 16.4866 21.4896 16.0206L27.8056 10.3182C28.0918 10.0649 28.2308 9.73094 28.2291 9.39774Z" fill="#ffffff" fill-opacity="1" class="svelte-clsyzt"></path></g></svg>`;
});
const css$7 = {
  code: "svg.svelte-clsyzt.svelte-clsyzt{scale:1}svg.svelte-clsyzt path.svelte-clsyzt{fill:var(--background-1);opacity:0.5}svg.svelte-clsyzt:hover path.svelte-clsyzt,svg.active.svelte-clsyzt path.svelte-clsyzt{fill:var(--background-1);opacity:1}",
  map: '{"version":3,"file":"MathIcon.svelte","sources":["MathIcon.svelte"],"sourcesContent":["<script>\\r\\n\\texport let active = false;\\r\\n<\/script>\\r\\n\\r\\n<svg\\r\\n\\tclass:active\\r\\n\\tversion=\\"1.1\\"\\r\\n\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\txmlns:xlink=\\"http://www.w3.org/1999/xlink\\"\\r\\n\\twidth=\\"23.1293\\"\\r\\n\\theight=\\"18.2476\\"\\r\\n>\\r\\n\\t<g>\\r\\n\\t\\t<rect height=\\"24\\" opacity=\\"0\\" width=\\"24\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\ttransform=\\"translate(6, 0)\\"\\r\\n\\t\\t\\td=\\"M1.5705 17.9785L10.476 17.9785C11.1269 17.9785 11.5764 17.5816 11.5764 16.9561C11.5764 16.3385 11.1269 15.9256 10.476 15.9256L2.674 15.9256L2.674 15.8289L7.65663 10.0695C7.99842 9.71308 8.18084 9.31796 8.18084 8.92109C8.18084 8.5127 7.99842 8.10958 7.64862 7.75938L2.68201 2.14959L2.68201 2.05291L10.476 2.05291C11.135 2.05291 11.5844 1.63827 11.5844 1.02245C11.5844 0.395114 11.135 0 10.476 0L1.57851 0C0.569918 0 0.00800788 0.702729 0.00800788 1.48261C0.00800788 1.91834 0.187693 2.3824 0.559368 2.74744L6.00781 8.85019L6.00781 8.96816L0.543352 15.2311C0.179685 15.5961 0 16.0602 0 16.4959C0 17.2758 0.56191 17.9785 1.5705 17.9785Z\\"\\r\\n\\t\\t\\tfill=\\"#ffffff\\"\\r\\n\\t\\t\\tfill-opacity=\\"1\\"\\r\\n\\t\\t/>\\r\\n\\t</g>\\r\\n</svg>\\r\\n\\r\\n<style>\\r\\n\\tsvg {\\r\\n\\t\\tscale: 1;\\r\\n\\t}\\r\\n\\r\\n\\tsvg path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 0.5;\\r\\n\\t}\\r\\n\\r\\n\\tsvg:hover path,\\r\\n\\tsvg.active path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAwBC,+BAAI,CACH,KAAK,CAAE,CACR,CAEA,iBAAG,CAAC,kBAAK,CACR,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,GACV,CAEA,iBAAG,MAAM,CAAC,kBAAI,CACd,GAAG,qBAAO,CAAC,kBAAK,CACf,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,CACV"}'
};
const MathIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$7);
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="23.1293" height="18.2476" class="${["svelte-clsyzt", active ? "active" : ""].join(" ").trim()}"><g><rect height="24" opacity="0" width="24"></rect><path transform="translate(6, 0)" d="M1.5705 17.9785L10.476 17.9785C11.1269 17.9785 11.5764 17.5816 11.5764 16.9561C11.5764 16.3385 11.1269 15.9256 10.476 15.9256L2.674 15.9256L2.674 15.8289L7.65663 10.0695C7.99842 9.71308 8.18084 9.31796 8.18084 8.92109C8.18084 8.5127 7.99842 8.10958 7.64862 7.75938L2.68201 2.14959L2.68201 2.05291L10.476 2.05291C11.135 2.05291 11.5844 1.63827 11.5844 1.02245C11.5844 0.395114 11.135 0 10.476 0L1.57851 0C0.569918 0 0.00800788 0.702729 0.00800788 1.48261C0.00800788 1.91834 0.187693 2.3824 0.559368 2.74744L6.00781 8.85019L6.00781 8.96816L0.543352 15.2311C0.179685 15.5961 0 16.0602 0 16.4959C0 17.2758 0.56191 17.9785 1.5705 17.9785Z" fill="#ffffff" fill-opacity="1" class="svelte-clsyzt"></path></g></svg>`;
});
const css$6 = {
  code: "svg.svelte-clsyzt.svelte-clsyzt{scale:1}svg.svelte-clsyzt path.svelte-clsyzt{fill:var(--background-1);opacity:0.5}svg.svelte-clsyzt:hover path.svelte-clsyzt,svg.active.svelte-clsyzt path.svelte-clsyzt{fill:var(--background-1);opacity:1}",
  map: '{"version":3,"file":"TableIcon.svelte","sources":["TableIcon.svelte"],"sourcesContent":["<script>\\r\\n\\texport let active = false;\\r\\n<\/script>\\r\\n\\r\\n<svg\\r\\n\\tclass:active\\r\\n\\tversion=\\"1.1\\"\\r\\n\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\txmlns:xlink=\\"http://www.w3.org/1999/xlink\\"\\r\\n\\twidth=\\"23.1293\\"\\r\\n\\theight=\\"18.2476\\"\\r\\n>\\r\\n\\t<g>\\r\\n\\t\\t<rect height=\\"18.2316\\" opacity=\\"0\\" width=\\"23.1293\\" x=\\"0\\" y=\\"0\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M0.718153 7.31874L22.501 7.31874L22.501 5.48809L0.718153 5.48809ZM0.718153 12.7516L22.501 12.7516L22.501 10.9209L0.718153 10.9209ZM10.6322 17.4529L12.5051 17.4529L12.5051 0.79022L10.6322 0.79022ZM3.20351 18.2316L19.9258 18.2316C22.0416 18.2316 23.1293 17.1519 23.1293 15.0682L23.1293 3.17499C23.1293 1.08945 22.0416 0.00351548 19.9258 0.00351548L3.20351 0.00351548C1.0957 0.00351548 0 1.08945 0 3.17499L0 15.0682C0 17.1519 1.0957 18.2316 3.20351 18.2316ZM3.31444 16.3184C2.40643 16.3184 1.91327 15.8482 1.91327 14.8994L1.91327 3.34198C1.91327 2.39315 2.40643 1.91678 3.31444 1.91678L19.8148 1.91678C20.7149 1.91678 21.216 2.39315 21.216 3.34198L21.216 14.8994C21.216 15.8482 20.7149 16.3184 19.8148 16.3184Z\\"\\r\\n\\t\\t\\tfill=\\"#ffffff\\"\\r\\n\\t\\t\\tfill-opacity=\\"1\\"\\r\\n\\t\\t/>\\r\\n\\t</g>\\r\\n</svg>\\r\\n\\r\\n<style>\\r\\n\\tsvg {\\r\\n\\t\\tscale: 1;\\r\\n\\t}\\r\\n\\r\\n\\tsvg path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 0.5;\\r\\n\\t}\\r\\n\\r\\n\\tsvg:hover path,\\r\\n\\tsvg.active path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAuBC,+BAAI,CACH,KAAK,CAAE,CACR,CAEA,iBAAG,CAAC,kBAAK,CACR,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,GACV,CAEA,iBAAG,MAAM,CAAC,kBAAI,CACd,GAAG,qBAAO,CAAC,kBAAK,CACf,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,CACV"}'
};
const TableIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$6);
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="23.1293" height="18.2476" class="${["svelte-clsyzt", active ? "active" : ""].join(" ").trim()}"><g><rect height="18.2316" opacity="0" width="23.1293" x="0" y="0"></rect><path d="M0.718153 7.31874L22.501 7.31874L22.501 5.48809L0.718153 5.48809ZM0.718153 12.7516L22.501 12.7516L22.501 10.9209L0.718153 10.9209ZM10.6322 17.4529L12.5051 17.4529L12.5051 0.79022L10.6322 0.79022ZM3.20351 18.2316L19.9258 18.2316C22.0416 18.2316 23.1293 17.1519 23.1293 15.0682L23.1293 3.17499C23.1293 1.08945 22.0416 0.00351548 19.9258 0.00351548L3.20351 0.00351548C1.0957 0.00351548 0 1.08945 0 3.17499L0 15.0682C0 17.1519 1.0957 18.2316 3.20351 18.2316ZM3.31444 16.3184C2.40643 16.3184 1.91327 15.8482 1.91327 14.8994L1.91327 3.34198C1.91327 2.39315 2.40643 1.91678 3.31444 1.91678L19.8148 1.91678C20.7149 1.91678 21.216 2.39315 21.216 3.34198L21.216 14.8994C21.216 15.8482 20.7149 16.3184 19.8148 16.3184Z" fill="#ffffff" fill-opacity="1" class="svelte-clsyzt"></path></g></svg>`;
});
const css$5 = {
  code: "svg.svelte-clsyzt.svelte-clsyzt{scale:1}svg.svelte-clsyzt path.svelte-clsyzt{fill:var(--background-1);opacity:0.5}svg.svelte-clsyzt:hover path.svelte-clsyzt,svg.active.svelte-clsyzt path.svelte-clsyzt{fill:var(--background-1);opacity:1}",
  map: '{"version":3,"file":"RightPanelIcon.svelte","sources":["RightPanelIcon.svelte"],"sourcesContent":["<script>\\r\\n\\texport let active = false;\\r\\n<\/script>\\r\\n\\r\\n<svg\\r\\n\\tclass:active\\r\\n\\tversion=\\"1.1\\"\\r\\n\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\txmlns:xlink=\\"http://www.w3.org/1999/xlink\\"\\r\\n\\twidth=\\"23.1293\\"\\r\\n\\theight=\\"18.2476\\"\\r\\n>\\r\\n\\t<g>\\r\\n\\t\\t<rect height=\\"18.2316\\" opacity=\\"0\\" width=\\"23.1293\\" x=\\"0\\" y=\\"0\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M3.20351 18.2316L19.9258 18.2316C22.0416 18.2316 23.1293 17.1519 23.1293 15.0682L23.1293 3.17499C23.1293 1.08945 22.0416 0.00351548 19.9258 0.00351548L3.20351 0.00351548C1.0957 0.00351548 0 1.08945 0 3.17499L0 15.0682C0 17.1519 1.0957 18.2316 3.20351 18.2316ZM3.31444 16.3184C2.40643 16.3184 1.91327 15.8482 1.91327 14.8994L1.91327 3.34198C1.91327 2.39315 2.40643 1.91678 3.31444 1.91678L19.8148 1.91678C20.7149 1.91678 21.216 2.39315 21.216 3.34198L21.216 14.8994C21.216 15.8482 20.7149 16.3184 19.8148 16.3184Z\\"\\r\\n\\t\\t\\tfill=\\"#007aff\\"\\r\\n\\t\\t\\tfill-opacity=\\"1\\"\\r\\n\\t\\t/>\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M16.2553 14.8971L19.025 14.8971C19.577 14.8971 19.7965 14.6678 19.7965 14.1078L19.7965 4.13358C19.7965 3.57362 19.577 3.34432 19.025 3.34432L16.2553 3.34432C15.7033 3.34432 15.4838 3.57362 15.4838 4.13358L15.4838 14.1078C15.4838 14.6678 15.7033 14.8971 16.2553 14.8971Z\\"\\r\\n\\t\\t\\tfill=\\"#ffffff\\"\\r\\n\\t\\t\\tfill-opacity=\\"0.6\\"\\r\\n\\t\\t/>\\r\\n\\t</g>\\r\\n</svg>\\r\\n\\r\\n<style>\\r\\n\\tsvg {\\r\\n\\t\\tscale: 1;\\r\\n\\t}\\r\\n\\r\\n\\tsvg path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 0.5;\\r\\n\\t}\\r\\n\\r\\n\\tsvg:hover path,\\r\\n\\tsvg.active path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA4BC,+BAAI,CACH,KAAK,CAAE,CACR,CAEA,iBAAG,CAAC,kBAAK,CACR,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,GACV,CAEA,iBAAG,MAAM,CAAC,kBAAI,CACd,GAAG,qBAAO,CAAC,kBAAK,CACf,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,CACV"}'
};
const RightPanelIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$5);
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="23.1293" height="18.2476" class="${["svelte-clsyzt", active ? "active" : ""].join(" ").trim()}"><g><rect height="18.2316" opacity="0" width="23.1293" x="0" y="0"></rect><path d="M3.20351 18.2316L19.9258 18.2316C22.0416 18.2316 23.1293 17.1519 23.1293 15.0682L23.1293 3.17499C23.1293 1.08945 22.0416 0.00351548 19.9258 0.00351548L3.20351 0.00351548C1.0957 0.00351548 0 1.08945 0 3.17499L0 15.0682C0 17.1519 1.0957 18.2316 3.20351 18.2316ZM3.31444 16.3184C2.40643 16.3184 1.91327 15.8482 1.91327 14.8994L1.91327 3.34198C1.91327 2.39315 2.40643 1.91678 3.31444 1.91678L19.8148 1.91678C20.7149 1.91678 21.216 2.39315 21.216 3.34198L21.216 14.8994C21.216 15.8482 20.7149 16.3184 19.8148 16.3184Z" fill="#007aff" fill-opacity="1" class="svelte-clsyzt"></path><path d="M16.2553 14.8971L19.025 14.8971C19.577 14.8971 19.7965 14.6678 19.7965 14.1078L19.7965 4.13358C19.7965 3.57362 19.577 3.34432 19.025 3.34432L16.2553 3.34432C15.7033 3.34432 15.4838 3.57362 15.4838 4.13358L15.4838 14.1078C15.4838 14.6678 15.7033 14.8971 16.2553 14.8971Z" fill="#ffffff" fill-opacity="0.6" class="svelte-clsyzt"></path></g></svg>`;
});
const css$4 = {
  code: "svg.svelte-1nyjhbf.svelte-1nyjhbf{scale:0.9}svg.svelte-1nyjhbf path.svelte-1nyjhbf{fill:var(--background-1);opacity:1}svg.svelte-1nyjhbf:hover path.svelte-1nyjhbf{fill:var(--background-1);opacity:1}",
  map: '{"version":3,"file":"MenuIcon.svelte","sources":["MenuIcon.svelte"],"sourcesContent":["<script>\\r\\n<\/script>\\r\\n\\r\\n<svg xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"#000000\\" height=\\"24\\" viewBox=\\"0 0 448 512\\"\\r\\n\\t><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path\\r\\n\\t\\td=\\"M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z\\"\\r\\n\\t/></svg\\r\\n>\\r\\n\\r\\n<style>\\r\\n\\tsvg {\\r\\n\\t\\tscale: 0.9;\\r\\n\\t}\\r\\n\\r\\n\\tsvg path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n\\tsvg:hover path {\\r\\n\\t\\tfill: var(--background-1);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAUC,iCAAI,CACH,KAAK,CAAE,GACR,CAEA,kBAAG,CAAC,mBAAK,CACR,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,CACV,CAEA,kBAAG,MAAM,CAAC,mBAAK,CACd,IAAI,CAAE,IAAI,cAAc,CAAC,CACzB,OAAO,CAAE,CACV"}'
};
const MenuIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 448 512" class="svelte-1nyjhbf"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" class="svelte-1nyjhbf"></path></svg>`;
});
const css$3 = {
  code: "path.svelte-19y03sz.svelte-19y03sz{scale:1.6}svg.svelte-19y03sz path.svelte-19y03sz{fill:var(--font-1);opacity:1}svg.svelte-19y03sz:hover path.svelte-19y03sz,svg.active.svelte-19y03sz path.svelte-19y03sz{fill:var(--highlight);opacity:1}",
  map: '{"version":3,"file":"HomeIcon.svelte","sources":["HomeIcon.svelte"],"sourcesContent":["<script>\\r\\n\\texport let active = false;\\r\\n<\/script>\\r\\n\\r\\n<svg\\r\\n\\tclass:active\\r\\n\\tversion=\\"1.1\\"\\r\\n\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\txmlns:xlink=\\"http://www.w3.org/1999/xlink\\"\\r\\n\\twidth=\\"4rem\\"\\r\\n\\theight=\\"4rem\\"\\r\\n>\\r\\n\\t<g>\\r\\n\\t\\t<rect height=\\"4rem\\" opacity=\\"0\\" width=\\"4rem\\" x=\\"0\\" y=\\"0\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\ttransform=\\"translate(0, 2)\\"\\r\\n\\t\\t\\td=\\"M14.474 18.9573L9.35233 18.9573L9.35233 12.6183C9.35233 12.162 9.65858 11.8655 10.1148 11.8655L13.7213 11.8655C14.1775 11.8655 14.474 12.162 14.474 12.6183ZM3.15761 18.6192C3.15761 20.0224 4.03945 20.8706 5.48495 20.8706L18.3637 20.8706C19.8092 20.8706 20.6812 20.0224 20.6812 18.6192L20.6812 11.1784L12.5238 4.33563C12.1439 4.0161 11.6922 4.0241 11.3203 4.33563L3.15761 11.1784ZM0 9.84501C0 10.3491 0.379294 10.7792 0.99804 10.7792C1.30136 10.7792 1.57167 10.6222 1.81015 10.4263L11.51 2.28817C11.7723 2.05594 12.0799 2.05594 12.3439 2.28817L22.0385 10.4263C22.2707 10.6222 22.541 10.7792 22.8443 10.7792C23.4053 10.7792 23.8344 10.4309 23.8344 9.86903C23.8344 9.53915 23.7068 9.28408 23.4596 9.07314L13.2953 0.529978C12.4601-0.176659 11.4018-0.176659 10.5586 0.529978L0.38281 9.0749C0.127538 9.28759 0 9.57294 0 9.84501ZM17.9559 5.11553L20.7146 7.4372L20.7146 2.72334C20.7146 2.28311 20.4342 2.00264 19.9939 2.00264L18.6783 2.00264C18.2461 2.00264 17.9559 2.28311 17.9559 2.72334Z\\"\\r\\n\\t\\t\\tfill=\\"#ffffff\\"\\r\\n\\t\\t\\tfill-opacity=\\"1\\"\\r\\n\\t\\t/>\\r\\n\\t</g>\\r\\n</svg>\\r\\n\\r\\n<style>\\r\\n\\tpath {\\r\\n\\t\\tscale: 1.6;\\r\\n\\t}\\r\\n\\r\\n\\tsvg path {\\r\\n\\t\\tfill: var(--font-1);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n\\tsvg:hover path,\\r\\n\\tsvg.active path {\\r\\n\\t\\tfill: var(--highlight);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAwBC,kCAAK,CACJ,KAAK,CAAE,GACR,CAEA,kBAAG,CAAC,mBAAK,CACR,IAAI,CAAE,IAAI,QAAQ,CAAC,CACnB,OAAO,CAAE,CACV,CAEA,kBAAG,MAAM,CAAC,mBAAI,CACd,GAAG,sBAAO,CAAC,mBAAK,CACf,IAAI,CAAE,IAAI,WAAW,CAAC,CACtB,OAAO,CAAE,CACV"}'
};
const HomeIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$3);
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="4rem" height="4rem" class="${["svelte-19y03sz", active ? "active" : ""].join(" ").trim()}"><g><rect height="4rem" opacity="0" width="4rem" x="0" y="0"></rect><path transform="translate(0, 2)" d="M14.474 18.9573L9.35233 18.9573L9.35233 12.6183C9.35233 12.162 9.65858 11.8655 10.1148 11.8655L13.7213 11.8655C14.1775 11.8655 14.474 12.162 14.474 12.6183ZM3.15761 18.6192C3.15761 20.0224 4.03945 20.8706 5.48495 20.8706L18.3637 20.8706C19.8092 20.8706 20.6812 20.0224 20.6812 18.6192L20.6812 11.1784L12.5238 4.33563C12.1439 4.0161 11.6922 4.0241 11.3203 4.33563L3.15761 11.1784ZM0 9.84501C0 10.3491 0.379294 10.7792 0.99804 10.7792C1.30136 10.7792 1.57167 10.6222 1.81015 10.4263L11.51 2.28817C11.7723 2.05594 12.0799 2.05594 12.3439 2.28817L22.0385 10.4263C22.2707 10.6222 22.541 10.7792 22.8443 10.7792C23.4053 10.7792 23.8344 10.4309 23.8344 9.86903C23.8344 9.53915 23.7068 9.28408 23.4596 9.07314L13.2953 0.529978C12.4601-0.176659 11.4018-0.176659 10.5586 0.529978L0.38281 9.0749C0.127538 9.28759 0 9.57294 0 9.84501ZM17.9559 5.11553L20.7146 7.4372L20.7146 2.72334C20.7146 2.28311 20.4342 2.00264 19.9939 2.00264L18.6783 2.00264C18.2461 2.00264 17.9559 2.28311 17.9559 2.72334Z" fill="#ffffff" fill-opacity="1" class="svelte-19y03sz"></path></g></svg>`;
});
const css$2 = {
  code: "path.svelte-19y03sz.svelte-19y03sz{scale:1.6}svg.svelte-19y03sz path.svelte-19y03sz{fill:var(--font-1);opacity:1}svg.svelte-19y03sz:hover path.svelte-19y03sz,svg.active.svelte-19y03sz path.svelte-19y03sz{fill:var(--highlight);opacity:1}",
  map: '{"version":3,"file":"LibraryIcon.svelte","sources":["LibraryIcon.svelte"],"sourcesContent":["<script>\\r\\n\\texport let active = false;\\r\\n<\/script>\\r\\n\\r\\n<svg\\r\\n\\tclass:active\\r\\n\\tversion=\\"1.1\\"\\r\\n\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\txmlns:xlink=\\"http://www.w3.org/1999/xlink\\"\\r\\n\\twidth=\\"4rem\\"\\r\\n\\theight=\\"4rem\\"\\r\\n>\\r\\n\\t<g>\\r\\n\\t\\t<rect height=\\"4rem\\" opacity=\\"0\\" width=\\"4rem\\" x=\\"0\\" y=\\"0\\" />\\r\\n\\t\\t<path\\r\\n\\t\\t\\td=\\"M1.37695 21.7027L3.19628 21.7027C4.07323 21.7027 4.57147 21.1947 4.57147 20.3258L4.57147 4.13925C4.57147 3.26054 4.07323 2.75429 3.19628 2.75429L1.37695 2.75429C0.490232 2.75429 0 3.26054 0 4.13925L0 20.3258C0 21.1947 0.490232 21.7027 1.37695 21.7027ZM7.11033 21.7027L10.8773 21.7027C11.7623 21.7027 12.2525 21.1947 12.2525 20.3258L12.2525 7.58885C12.2525 6.71815 11.7623 6.21191 10.8773 6.21191L7.11033 6.21191C6.22362 6.21191 5.72538 6.71815 5.72538 7.58885L5.72538 20.3258C5.72538 21.1947 6.22362 21.7027 7.11033 21.7027ZM7.98006 9.85116C7.60389 9.85116 7.31737 9.56639 7.31737 9.19999C7.31737 8.83808 7.60213 8.55331 7.98006 8.55331L10.0342 8.55331C10.4217 8.55331 10.6791 8.83808 10.6791 9.19999C10.6791 9.56639 10.4023 9.85116 10.0342 9.85116ZM7.98006 19.3693C7.60213 19.3693 7.31737 19.0846 7.31737 18.7164C7.31737 18.3563 7.60389 18.0697 7.98006 18.0697L10.0342 18.0697C10.4023 18.0697 10.6791 18.3563 10.6791 18.7164C10.6791 19.0846 10.4023 19.3693 10.0342 19.3693ZM14.7914 21.7027L17.0629 21.7027C17.9496 21.7027 18.4398 21.1947 18.4398 20.3258L18.4398 1.38495C18.4398 0.506247 17.9496 0 17.0629 0L14.7914 0C13.9047 0 13.4144 0.506247 13.4144 1.38495L13.4144 20.3258C13.4144 21.1947 13.9047 21.7027 14.7914 21.7027ZM21.5603 21.7551L23.0377 21.5533C23.9066 21.4504 24.3375 20.9008 24.2443 20.0238L22.4634 4.09511C22.3685 3.22441 21.8269 2.77129 20.9437 2.88047L19.4744 3.08398C18.5974 3.18691 18.1666 3.73652 18.2615 4.6037L20.0486 20.5342C20.1435 21.4031 20.6851 21.858 21.5603 21.7551Z\\"\\r\\n\\t\\t\\tfill=\\"#ffffff\\"\\r\\n\\t\\t\\tfill-opacity=\\"1\\"\\r\\n\\t\\t/>\\r\\n\\t</g>\\r\\n</svg>\\r\\n\\r\\n<style>\\r\\n\\tpath {\\r\\n\\t\\tscale: 1.6;\\r\\n\\t}\\r\\n\\r\\n\\tsvg path {\\r\\n\\t\\tfill: var(--font-1);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n\\tsvg:hover path,\\r\\n\\tsvg.active path {\\r\\n\\t\\tfill: var(--highlight);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAuBC,kCAAK,CACJ,KAAK,CAAE,GACR,CAEA,kBAAG,CAAC,mBAAK,CACR,IAAI,CAAE,IAAI,QAAQ,CAAC,CACnB,OAAO,CAAE,CACV,CAEA,kBAAG,MAAM,CAAC,mBAAI,CACd,GAAG,sBAAO,CAAC,mBAAK,CACf,IAAI,CAAE,IAAI,WAAW,CAAC,CACtB,OAAO,CAAE,CACV"}'
};
const LibraryIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$2);
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="4rem" height="4rem" class="${["svelte-19y03sz", active ? "active" : ""].join(" ").trim()}"><g><rect height="4rem" opacity="0" width="4rem" x="0" y="0"></rect><path d="M1.37695 21.7027L3.19628 21.7027C4.07323 21.7027 4.57147 21.1947 4.57147 20.3258L4.57147 4.13925C4.57147 3.26054 4.07323 2.75429 3.19628 2.75429L1.37695 2.75429C0.490232 2.75429 0 3.26054 0 4.13925L0 20.3258C0 21.1947 0.490232 21.7027 1.37695 21.7027ZM7.11033 21.7027L10.8773 21.7027C11.7623 21.7027 12.2525 21.1947 12.2525 20.3258L12.2525 7.58885C12.2525 6.71815 11.7623 6.21191 10.8773 6.21191L7.11033 6.21191C6.22362 6.21191 5.72538 6.71815 5.72538 7.58885L5.72538 20.3258C5.72538 21.1947 6.22362 21.7027 7.11033 21.7027ZM7.98006 9.85116C7.60389 9.85116 7.31737 9.56639 7.31737 9.19999C7.31737 8.83808 7.60213 8.55331 7.98006 8.55331L10.0342 8.55331C10.4217 8.55331 10.6791 8.83808 10.6791 9.19999C10.6791 9.56639 10.4023 9.85116 10.0342 9.85116ZM7.98006 19.3693C7.60213 19.3693 7.31737 19.0846 7.31737 18.7164C7.31737 18.3563 7.60389 18.0697 7.98006 18.0697L10.0342 18.0697C10.4023 18.0697 10.6791 18.3563 10.6791 18.7164C10.6791 19.0846 10.4023 19.3693 10.0342 19.3693ZM14.7914 21.7027L17.0629 21.7027C17.9496 21.7027 18.4398 21.1947 18.4398 20.3258L18.4398 1.38495C18.4398 0.506247 17.9496 0 17.0629 0L14.7914 0C13.9047 0 13.4144 0.506247 13.4144 1.38495L13.4144 20.3258C13.4144 21.1947 13.9047 21.7027 14.7914 21.7027ZM21.5603 21.7551L23.0377 21.5533C23.9066 21.4504 24.3375 20.9008 24.2443 20.0238L22.4634 4.09511C22.3685 3.22441 21.8269 2.77129 20.9437 2.88047L19.4744 3.08398C18.5974 3.18691 18.1666 3.73652 18.2615 4.6037L20.0486 20.5342C20.1435 21.4031 20.6851 21.858 21.5603 21.7551Z" fill="#ffffff" fill-opacity="1" class="svelte-19y03sz"></path></g></svg>`;
});
const css$1 = {
  code: "path.svelte-i7pkt7.svelte-i7pkt7{scale:1}svg.svelte-i7pkt7 path.svelte-i7pkt7{fill:var(--font-1);opacity:1}svg.svelte-i7pkt7:hover path.svelte-i7pkt7,svg.active.svelte-i7pkt7 path.svelte-i7pkt7{fill:var(--highlight);opacity:1}",
  map: '{"version":3,"file":"WhiteboardIcon.svelte","sources":["WhiteboardIcon.svelte"],"sourcesContent":["<script>\\r\\n\\texport let active = false;\\r\\n<\/script>\\r\\n\\r\\n<svg\\r\\n\\tclass:active\\r\\n\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\tfill=\\"#000000\\"\\r\\n\\theight=\\"4em\\"\\r\\n\\twidth=\\"4em\\"\\r\\n\\tviewBox=\\"0 0 576 512\\"\\r\\n\\t><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path\\r\\n\\t\\td=\\"M96 32C60.7 32 32 60.7 32 96V384H96V96l384 0V384h64V96c0-35.3-28.7-64-64-64H96zM224 384v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H416V384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32z\\"\\r\\n\\t/></svg\\r\\n>\\r\\n\\r\\n<style>\\r\\n\\tpath {\\r\\n\\t\\tscale: 1;\\r\\n\\t}\\r\\n\\r\\n\\tsvg path {\\r\\n\\t\\tfill: var(--font-1);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n\\tsvg:hover path,\\r\\n\\tsvg.active path {\\r\\n\\t\\tfill: var(--highlight);\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAiBC,gCAAK,CACJ,KAAK,CAAE,CACR,CAEA,iBAAG,CAAC,kBAAK,CACR,IAAI,CAAE,IAAI,QAAQ,CAAC,CACnB,OAAO,CAAE,CACV,CAEA,iBAAG,MAAM,CAAC,kBAAI,CACd,GAAG,qBAAO,CAAC,kBAAK,CACf,IAAI,CAAE,IAAI,WAAW,CAAC,CACtB,OAAO,CAAE,CACV"}'
};
const WhiteboardIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$1);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="4em" width="4em" viewBox="0 0 576 512" class="${["svelte-i7pkt7", active ? "active" : ""].join(" ").trim()}"><path d="M96 32C60.7 32 32 60.7 32 96V384H96V96l384 0V384h64V96c0-35.3-28.7-64-64-64H96zM224 384v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H416V384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32z" class="svelte-i7pkt7"></path></svg>`;
});
const css = {
  code: "main.svelte-exfowo{background-color:var(--background-2);overflow:hidden;width:100%;height:100%;min-height:100vh}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { beforeUpdate } from \\"svelte\\";\\nimport {\\n  colorTheme,\\n  showMainMenu,\\n  showCodeOutlineElements,\\n  showMathOutlineElements,\\n  showTableOutlineElements,\\n  leftPanelActive,\\n  rightPanelActive\\n} from \\"$lib/data/shared.js\\";\\nimport MainModalMenu from \\"$lib/components/MainModalMenu/MainModalMenu.svelte\\";\\nimport SiteNavigationLink from \\"$lib/components/MainModalMenu/SiteNavigationLink.svelte\\";\\nimport ExternalNavigationLink from \\"$lib/components/MainModalMenu/ExternalNavigationLink.svelte\\";\\nimport TopBar from \\"$lib/components/TopMenuBar/TopBar.svelte\\";\\nimport ToggleMenuItem from \\"$lib/components/TopMenuBar/ToggleMenuItem.svelte\\";\\nimport ActionMenuItem from \\"$lib/components/TopMenuBar/ActionMenuItem.svelte\\";\\nimport Cookies from \\"js-cookie\\";\\nimport LeftPanelIcon from \\"$lib/assets/icons/LeftPanelIcon.svelte\\";\\nimport DriveIcon from \\"$lib/assets/icons/DriveIcon.svelte\\";\\nimport CodeIcon from \\"$lib/assets/icons/CodeIcon.svelte\\";\\nimport MathIcon from \\"$lib/assets/icons/MathIcon.svelte\\";\\nimport TableIcon from \\"$lib/assets/icons/TableIcon.svelte\\";\\nimport RightPanelIcon from \\"$lib/assets/icons/RightPanelIcon.svelte\\";\\nimport MenuIcon from \\"$lib/assets/icons/MenuIcon.svelte\\";\\nimport HomeIcon from \\"$lib/assets/icons/HomeIcon.svelte\\";\\nimport LibraryIcon from \\"$lib/assets/icons/LibraryIcon.svelte\\";\\nimport WhiteboardIcon from \\"$lib/assets/icons/WhiteboardIcon.svelte\\";\\nimport { page } from \\"$app/stores\\";\\nconsole.log($page.url.pathname);\\nexport let data;\\n$colorTheme = data.colorMode;\\n$showCodeOutlineElements = data.showCodeOutlineElements;\\n$showMathOutlineElements = data.showMathOutlineElements;\\n$showTableOutlineElements = data.showTableOutlineElements;\\n$leftPanelActive = data.leftPanelActive;\\n$rightPanelActive = data.rightPanelActive;\\nlet folderActive = true;\\nlet pageHome = false;\\nlet pageDocs = false;\\nlet pageBoard = false;\\nlet showOutLineButtons = true;\\nif ($page.url.pathname.endsWith(\\".pdf\\")) {\\n  showOutLineButtons = false;\\n}\\nbeforeUpdate(() => {\\n  document.documentElement.setAttribute(\\"data-theme\\", $colorTheme);\\n});\\n$:\\n  renderMenu = $showMainMenu;\\n<\/script>\\r\\n\\r\\n<main>\\r\\n\\t<TopBar>\\r\\n\\t\\t<svelte:fragment slot=\\"left-cluster\\">\\r\\n\\t\\t\\t<ToggleMenuItem\\r\\n\\t\\t\\t\\ttip=\\"Toggle Left Panel\\"\\r\\n\\t\\t\\t\\tactive={$leftPanelActive}\\r\\n\\t\\t\\t\\tonClickFunction={() => {\\r\\n\\t\\t\\t\\t\\t$leftPanelActive = !$leftPanelActive;\\r\\n\\t\\t\\t\\t\\tCookies.set('leftPanelActive', $leftPanelActive ? 'true' : 'false');\\r\\n\\t\\t\\t\\t}}\\r\\n\\t\\t\\t>\\r\\n\\t\\t\\t\\t<LeftPanelIcon active={$leftPanelActive} />\\r\\n\\t\\t\\t</ToggleMenuItem>\\r\\n\\t\\t\\t<ToggleMenuItem tip=\\"Remote Servers\\" active={folderActive}>\\r\\n\\r\\n\\t\\t\\t\\t<DriveIcon  active={folderActive} />\\r\\n\\t\\t\\t</ToggleMenuItem>\\r\\n\\t\\t\\t<!-- <ToggleMenuItem active={serverActive}>\\r\\n\\t\\t\\t\\t<ServerIcon active={serverActive} />\\r\\n\\t\\t\\t</ToggleMenuItem> -->\\r\\n\\t\\t</svelte:fragment>\\r\\n\\r\\n\\t\\t<svelte:fragment slot=\\"left-search\\">\\r\\n\\t\\t\\t<ActionMenuItem\\r\\n\\t\\t\\t\\ttip=\\"Main Menu\\"\\r\\n\\t\\t\\t\\tonClickFunction={() => {\\r\\n\\t\\t\\t\\t\\t$showMainMenu = true;\\r\\n\\t\\t\\t\\t}}\\r\\n\\t\\t\\t>\\r\\n\\t\\t\\t\\t<MenuIcon />\\r\\n\\t\\t\\t</ActionMenuItem>\\r\\n\\t\\t</svelte:fragment>\\r\\n\\r\\n\\t\\t<svelte:fragment slot=\\"right-search\\">\\r\\n\\t\\t\\t<!-- <ActionMenuItem tip=\\"Decrease Document Font Size\\">\\r\\n\\t\\t\\t\\t<DecreaseFontIcon />\\r\\n\\t\\t\\t</ActionMenuItem>\\r\\n\\t\\t\\t<ActionMenuItem tip=\\"Increase Document Font Size\\">\\r\\n\\t\\t\\t\\t<IncreaseFontIcon />\\r\\n\\t\\t\\t</ActionMenuItem> -->\\r\\n\\t\\t</svelte:fragment>\\r\\n\\r\\n\\t\\t<svelte:fragment slot=\\"right-cluster\\">\\r\\n\\t\\t\\t{#if showOutLineButtons}\\r\\n\\t\\t\\t\\t<ToggleMenuItem\\r\\n\\t\\t\\t\\t\\ttip=\\"Toggle Code Blocks\\"\\r\\n\\t\\t\\t\\t\\tactive={$showCodeOutlineElements}\\r\\n\\t\\t\\t\\t\\tonClickFunction={() => {\\r\\n\\t\\t\\t\\t\\t\\t$showCodeOutlineElements = !$showCodeOutlineElements;\\r\\n\\t\\t\\t\\t\\t\\tCookies.set(\\r\\n\\t\\t\\t\\t\\t\\t\\t'showCodeOutlineElements',\\r\\n\\t\\t\\t\\t\\t\\t\\t$showCodeOutlineElements ? 'true' : 'false'\\r\\n\\t\\t\\t\\t\\t\\t);\\r\\n\\t\\t\\t\\t\\t}}\\r\\n\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t<CodeIcon active={$showCodeOutlineElements} />\\r\\n\\t\\t\\t\\t</ToggleMenuItem>\\r\\n\\t\\t\\t\\t<ToggleMenuItem\\r\\n\\t\\t\\t\\t\\ttip=\\"Toggle Math\\"\\r\\n\\t\\t\\t\\t\\tactive={$showMathOutlineElements}\\r\\n\\t\\t\\t\\t\\tonClickFunction={() => {\\r\\n\\t\\t\\t\\t\\t\\t$showMathOutlineElements = !$showMathOutlineElements;\\r\\n\\t\\t\\t\\t\\t\\tCookies.set(\\r\\n\\t\\t\\t\\t\\t\\t\\t'showMathOutlineElements',\\r\\n\\t\\t\\t\\t\\t\\t\\t$showMathOutlineElements ? 'true' : 'false'\\r\\n\\t\\t\\t\\t\\t\\t);\\r\\n\\t\\t\\t\\t\\t}}\\r\\n\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t<MathIcon active={$showMathOutlineElements} />\\r\\n\\t\\t\\t\\t</ToggleMenuItem>\\r\\n\\t\\t\\t\\t<ToggleMenuItem\\r\\n\\t\\t\\t\\t\\ttip=\\"Toggle Table Previews\\"\\r\\n\\t\\t\\t\\t\\tactive={$showTableOutlineElements}\\r\\n\\t\\t\\t\\t\\tonClickFunction={() => {\\r\\n\\t\\t\\t\\t\\t\\t$showTableOutlineElements = !$showTableOutlineElements;\\r\\n\\t\\t\\t\\t\\t\\tCookies.set(\\r\\n\\t\\t\\t\\t\\t\\t\\t'showTableOutlineElements',\\r\\n\\t\\t\\t\\t\\t\\t\\t$showTableOutlineElements ? 'true' : 'false'\\r\\n\\t\\t\\t\\t\\t\\t);\\r\\n\\t\\t\\t\\t\\t}}\\r\\n\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t<TableIcon active={$showTableOutlineElements} />\\r\\n\\t\\t\\t\\t</ToggleMenuItem>\\r\\n\\t\\t\\t{/if}\\r\\n\\t\\t\\t<ToggleMenuItem\\r\\n\\t\\t\\t\\ttip=\\"Toggle Right Panel\\"\\r\\n\\t\\t\\t\\tactive={$rightPanelActive}\\r\\n\\t\\t\\t\\tonClickFunction={() => {\\r\\n\\t\\t\\t\\t\\t$rightPanelActive = !$rightPanelActive;\\r\\n\\t\\t\\t\\t\\tCookies.set('rightPanelActive', $rightPanelActive ? 'true' : 'false');\\r\\n\\t\\t\\t\\t}}\\r\\n\\t\\t\\t>\\r\\n\\t\\t\\t\\t<RightPanelIcon active={$rightPanelActive} />\\r\\n\\t\\t\\t</ToggleMenuItem>\\r\\n\\t\\t</svelte:fragment>\\r\\n\\t</TopBar>\\r\\n\\t<slot />\\r\\n</main>\\r\\n\\r\\n<MainModalMenu bind:renderMenu>\\r\\n\\t<svelte:fragment slot=\\"site-navigation\\">\\r\\n\\t\\t<SiteNavigationLink bind:active={pageHome} link={'/'} name={'Home'}>\\r\\n\\t\\t\\t<HomeIcon active={pageHome} />\\r\\n\\t\\t</SiteNavigationLink>\\r\\n\\t\\t<SiteNavigationLink bind:active={pageDocs} link={'/docs'} name={'Docs'}>\\r\\n\\t\\t\\t<LibraryIcon active={pageDocs} />\\r\\n\\t\\t</SiteNavigationLink>\\r\\n\\t\\t<SiteNavigationLink\\r\\n\\t\\t\\tbind:active={pageBoard}\\r\\n\\t\\t\\tlink={'/whiteboard'}\\r\\n\\t\\t\\tname={'Board'}\\r\\n\\t\\t>\\r\\n\\t\\t\\t<WhiteboardIcon active={pageBoard} />\\r\\n\\t\\t</SiteNavigationLink>\\r\\n\\t</svelte:fragment>\\r\\n\\t<svelte:fragment slot=\\"links\\">\\r\\n\\t\\t<ExternalNavigationLink\\r\\n\\t\\t\\tlink={'https://github.com/sigil-ml'}\\r\\n\\t\\t\\tsite={'github'}\\r\\n\\t\\t\\tname={'GitHub'}\\r\\n\\t\\t/>\\r\\n\\t\\t<ExternalNavigationLink\\r\\n\\t\\t\\tlink={'https://hub.docker.com/'}\\r\\n\\t\\t\\tsite={'docker'}\\r\\n\\t\\t\\tname={'Docker Hub'}\\r\\n\\t\\t/>\\r\\n\\t</svelte:fragment>\\r\\n</MainModalMenu>\\r\\n\\r\\n<style>\\r\\n\\tmain {\\r\\n\\t\\tbackground-color: var(--background-2);\\r\\n\\t\\toverflow: hidden;\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\theight: 100%;\\r\\n\\t\\tmin-height: 100vh;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAqLC,kBAAK,CACJ,gBAAgB,CAAE,IAAI,cAAc,CAAC,CACrC,QAAQ,CAAE,MAAM,CAChB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KACb"}`
};
let folderActive = true;
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let renderMenu;
  let $showMainMenu, $$unsubscribe_showMainMenu;
  let $colorTheme, $$unsubscribe_colorTheme;
  let $page, $$unsubscribe_page;
  let $rightPanelActive, $$unsubscribe_rightPanelActive;
  let $leftPanelActive, $$unsubscribe_leftPanelActive;
  let $showTableOutlineElements, $$unsubscribe_showTableOutlineElements;
  let $showMathOutlineElements, $$unsubscribe_showMathOutlineElements;
  let $showCodeOutlineElements, $$unsubscribe_showCodeOutlineElements;
  $$unsubscribe_showMainMenu = subscribe(showMainMenu, (value) => $showMainMenu = value);
  $$unsubscribe_colorTheme = subscribe(colorTheme, (value) => $colorTheme = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_rightPanelActive = subscribe(rightPanelActive, (value) => $rightPanelActive = value);
  $$unsubscribe_leftPanelActive = subscribe(leftPanelActive, (value) => $leftPanelActive = value);
  $$unsubscribe_showTableOutlineElements = subscribe(showTableOutlineElements, (value) => $showTableOutlineElements = value);
  $$unsubscribe_showMathOutlineElements = subscribe(showMathOutlineElements, (value) => $showMathOutlineElements = value);
  $$unsubscribe_showCodeOutlineElements = subscribe(showCodeOutlineElements, (value) => $showCodeOutlineElements = value);
  console.log($page.url.pathname);
  let { data } = $$props;
  set_store_value(colorTheme, $colorTheme = data.colorMode, $colorTheme);
  set_store_value(showCodeOutlineElements, $showCodeOutlineElements = data.showCodeOutlineElements, $showCodeOutlineElements);
  set_store_value(showMathOutlineElements, $showMathOutlineElements = data.showMathOutlineElements, $showMathOutlineElements);
  set_store_value(showTableOutlineElements, $showTableOutlineElements = data.showTableOutlineElements, $showTableOutlineElements);
  set_store_value(leftPanelActive, $leftPanelActive = data.leftPanelActive, $leftPanelActive);
  set_store_value(rightPanelActive, $rightPanelActive = data.rightPanelActive, $rightPanelActive);
  let pageHome = false;
  let pageDocs = false;
  let pageBoard = false;
  let showOutLineButtons = true;
  if ($page.url.pathname.endsWith(".pdf")) {
    showOutLineButtons = false;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    renderMenu = $showMainMenu;
    $$rendered = `<main class="svelte-exfowo">${validate_component(TopBar, "TopBar").$$render($$result, {}, {}, {
      "right-cluster": () => {
        return `${showOutLineButtons ? `${validate_component(ToggleMenuItem, "ToggleMenuItem").$$render(
          $$result,
          {
            tip: "Toggle Code Blocks",
            active: $showCodeOutlineElements,
            onClickFunction: () => {
              $showCodeOutlineElements = !$showCodeOutlineElements;
              Cookies.set("showCodeOutlineElements", $showCodeOutlineElements ? "true" : "false");
            }
          },
          {},
          {
            default: () => {
              return `${validate_component(CodeIcon, "CodeIcon").$$render($$result, { active: $showCodeOutlineElements }, {}, {})}`;
            }
          }
        )} ${validate_component(ToggleMenuItem, "ToggleMenuItem").$$render(
          $$result,
          {
            tip: "Toggle Math",
            active: $showMathOutlineElements,
            onClickFunction: () => {
              $showMathOutlineElements = !$showMathOutlineElements;
              Cookies.set("showMathOutlineElements", $showMathOutlineElements ? "true" : "false");
            }
          },
          {},
          {
            default: () => {
              return `${validate_component(MathIcon, "MathIcon").$$render($$result, { active: $showMathOutlineElements }, {}, {})}`;
            }
          }
        )} ${validate_component(ToggleMenuItem, "ToggleMenuItem").$$render(
          $$result,
          {
            tip: "Toggle Table Previews",
            active: $showTableOutlineElements,
            onClickFunction: () => {
              $showTableOutlineElements = !$showTableOutlineElements;
              Cookies.set("showTableOutlineElements", $showTableOutlineElements ? "true" : "false");
            }
          },
          {},
          {
            default: () => {
              return `${validate_component(TableIcon, "TableIcon").$$render($$result, { active: $showTableOutlineElements }, {}, {})}`;
            }
          }
        )}` : ``} ${validate_component(ToggleMenuItem, "ToggleMenuItem").$$render(
          $$result,
          {
            tip: "Toggle Right Panel",
            active: $rightPanelActive,
            onClickFunction: () => {
              $rightPanelActive = !$rightPanelActive;
              Cookies.set("rightPanelActive", $rightPanelActive ? "true" : "false");
            }
          },
          {},
          {
            default: () => {
              return `${validate_component(RightPanelIcon, "RightPanelIcon").$$render($$result, { active: $rightPanelActive }, {}, {})}`;
            }
          }
        )} `;
      },
      "right-search": () => {
        return ` `;
      },
      "left-search": () => {
        return `${validate_component(ActionMenuItem, "ActionMenuItem").$$render(
          $$result,
          {
            tip: "Main Menu",
            onClickFunction: () => {
              $showMainMenu = true;
            }
          },
          {},
          {
            default: () => {
              return `${validate_component(MenuIcon, "MenuIcon").$$render($$result, {}, {}, {})}`;
            }
          }
        )} `;
      },
      "left-cluster": () => {
        return `${validate_component(ToggleMenuItem, "ToggleMenuItem").$$render(
          $$result,
          {
            tip: "Toggle Left Panel",
            active: $leftPanelActive,
            onClickFunction: () => {
              $leftPanelActive = !$leftPanelActive;
              Cookies.set("leftPanelActive", $leftPanelActive ? "true" : "false");
            }
          },
          {},
          {
            default: () => {
              return `${validate_component(LeftPanelIcon, "LeftPanelIcon").$$render($$result, { active: $leftPanelActive }, {}, {})}`;
            }
          }
        )} ${validate_component(ToggleMenuItem, "ToggleMenuItem").$$render(
          $$result,
          {
            tip: "Remote Servers",
            active: folderActive
          },
          {},
          {
            default: () => {
              return `${validate_component(DriveIcon, "DriveIcon").$$render($$result, { active: folderActive }, {}, {})}`;
            }
          }
        )} `;
      }
    })} ${slots.default ? slots.default({}) : ``}</main> ${validate_component(MainModalMenu, "MainModalMenu").$$render(
      $$result,
      { renderMenu },
      {
        renderMenu: ($$value) => {
          renderMenu = $$value;
          $$settled = false;
        }
      },
      {
        links: () => {
          return `${validate_component(ExternalNavigationLink, "ExternalNavigationLink").$$render(
            $$result,
            {
              link: "https://github.com/sigil-ml",
              site: "github",
              name: "GitHub"
            },
            {},
            {}
          )} ${validate_component(ExternalNavigationLink, "ExternalNavigationLink").$$render(
            $$result,
            {
              link: "https://hub.docker.com/",
              site: "docker",
              name: "Docker Hub"
            },
            {},
            {}
          )} `;
        },
        "site-navigation": () => {
          return `${validate_component(SiteNavigationLink, "SiteNavigationLink").$$render(
            $$result,
            {
              link: "/",
              name: "Home",
              active: pageHome
            },
            {
              active: ($$value) => {
                pageHome = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${validate_component(HomeIcon, "HomeIcon").$$render($$result, { active: pageHome }, {}, {})}`;
              }
            }
          )} ${validate_component(SiteNavigationLink, "SiteNavigationLink").$$render(
            $$result,
            {
              link: "/docs",
              name: "Docs",
              active: pageDocs
            },
            {
              active: ($$value) => {
                pageDocs = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${validate_component(LibraryIcon, "LibraryIcon").$$render($$result, { active: pageDocs }, {}, {})}`;
              }
            }
          )} ${validate_component(SiteNavigationLink, "SiteNavigationLink").$$render(
            $$result,
            {
              link: "/whiteboard",
              name: "Board",
              active: pageBoard
            },
            {
              active: ($$value) => {
                pageBoard = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${validate_component(WhiteboardIcon, "WhiteboardIcon").$$render($$result, { active: pageBoard }, {}, {})}`;
              }
            }
          )}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_showMainMenu();
  $$unsubscribe_colorTheme();
  $$unsubscribe_page();
  $$unsubscribe_rightPanelActive();
  $$unsubscribe_leftPanelActive();
  $$unsubscribe_showTableOutlineElements();
  $$unsubscribe_showMathOutlineElements();
  $$unsubscribe_showCodeOutlineElements();
  return $$rendered;
});
export {
  Layout as default
};
