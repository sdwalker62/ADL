import { c as create_ssr_component, b as subscribe, e as escape, n as null_to_empty, a as add_attribute, v as validate_component, f as each } from "../../../chunks/ssr.js";
import { l as leftPanelActive } from "../../../chunks/shared.js";
import { p as page } from "../../../chunks/stores.js";
import "stickybits";
const markdownLogo = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='%23000000'%20viewBox='0%200%20640%20512'%3e%3c!--!%20Font%20Awesome%20Pro%206.4.0%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license%20(Commercial%20License)%20Copyright%202023%20Fonticons,%20Inc.%20--%3e%3cpath%20d='M593.8%2059.1H46.2C20.7%2059.1%200%2079.8%200%20105.2v301.5c0%2025.5%2020.7%2046.2%2046.2%2046.2h547.7c25.5%200%2046.2-20.7%2046.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5%20360.6H277v-120l-61.5%2076.9-61.5-76.9v120H92.3V151.4h61.5l61.5%2076.9%2061.5-76.9h61.5v209.2zm135.3%203.1L381.5%20256H443V151.4h61.5V256H566z'/%3e%3c/svg%3e";
const css$3 = {
  code: "#file-selector-canvas.svelte-51ndjp.svelte-51ndjp{display:grid;grid-template-columns:2rem 1fr;align-items:center;gap:10px;border-radius:5px;width:95%;padding-left:5px;padding-right:5px}.highlight{background:var(--gradient-1)}.highlight>img.svelte-51ndjp.svelte-51ndjp{filter:invert(4%) sepia(5%) saturate(40%) hue-rotate(314deg) brightness(93%) contrast(90%)}.highlight>a.svelte-51ndjp.svelte-51ndjp{color:var(--highlight-font);font-family:var(--f-SemiBold), sans-serif;background:transparent}#file-selector-canvas.svelte-51ndjp.svelte-51ndjp:hover{background:var(--gradient-1)}#file-selector-canvas.svelte-51ndjp:hover>img.svelte-51ndjp{filter:invert(87%) sepia(88%) saturate(0%) hue-rotate(186deg) brightness(110%) contrast(97%)}img.svelte-51ndjp.svelte-51ndjp{filter:invert(52%) sepia(6%) saturate(194%) hue-rotate(202deg) brightness(89%) contrast(84%)}a.svelte-51ndjp.svelte-51ndjp:hover{color:var(--font-1)}a.svelte-51ndjp.svelte-51ndjp{text-decoration:none;color:var(--font-2);font-family:var(--f-Regular), sans-serif;font-size:18px;text-overflow:ellipsis;overflow:hidden}@media(max-width: 1300px){a.svelte-51ndjp.svelte-51ndjp{font-size:1.5em}#file-selector-canvas.svelte-51ndjp.svelte-51ndjp{border-radius:5px;width:95%;padding-left:5px;height:35px}}",
  map: '{"version":3,"file":"File.svelte","sources":["File.svelte"],"sourcesContent":["<script lang=\\"ts\\">import markdownLogo from \\"$lib/assets/images/markdown.svg\\";\\nimport { page } from \\"$app/stores\\";\\nexport let filePath;\\nexport let name;\\nconst docPath = `${$page.url.origin}/docs/${filePath}`;\\nlet highlight = \\"\\";\\nif (filePath == $page.params.document) {\\n  highlight = \\"highlight\\";\\n}\\nfunction capitalizeFirstLetter(word) {\\n  const firstLetter = word.charAt(0);\\n  const firstLetterCap = firstLetter.toUpperCase();\\n  const restOfWord = word.slice(1);\\n  return firstLetterCap + restOfWord;\\n}\\nfunction formatName(inStr) {\\n  inStr = inStr.replace(\\"_\\", \\" \\");\\n  const inStrSplit = inStr.split(\\" \\");\\n  if (inStrSplit.length > 1) {\\n    return inStrSplit.reduce((acc, curWord) => {\\n      acc += capitalizeFirstLetter(curWord) + \\" \\";\\n      return acc;\\n    }, \\" \\");\\n  } else {\\n    return capitalizeFirstLetter(inStr);\\n  }\\n}\\n<\/script>\\r\\n\\r\\n<div class={highlight} id=\\"file-selector-canvas\\">\\r\\n\\t<img src={markdownLogo} alt=\\"markdown\\" />\\r\\n\\t<a data-sveltekit-reload data-sveltekit-preload-data href={docPath}\\r\\n\\t\\t>{formatName(name).slice(0, -3).replace(\'.\', \'\')}</a\\r\\n\\t>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t#file-selector-canvas {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-columns: 2rem 1fr;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tgap: 10px;\\r\\n\\t\\tborder-radius: 5px;\\r\\n\\t\\twidth: 95%;\\r\\n\\t\\tpadding-left: 5px;\\r\\n\\t\\tpadding-right: 5px;\\r\\n\\t}\\r\\n\\r\\n\\t:global(.highlight) {\\r\\n\\t\\tbackground: var(--gradient-1);\\r\\n\\t}\\r\\n\\r\\n\\t:global(.highlight) > img {\\r\\n\\t\\tfilter: invert(4%) sepia(5%) saturate(40%) hue-rotate(314deg) brightness(93%) contrast(90%);\\r\\n\\t}\\r\\n\\r\\n\\t:global(.highlight) > a {\\r\\n\\t\\tcolor: var(--highlight-font);\\r\\n\\t\\tfont-family: var(--f-SemiBold), sans-serif;\\r\\n\\t\\tbackground: transparent;\\r\\n\\t}\\r\\n\\r\\n\\t#file-selector-canvas:hover {\\r\\n\\t\\tbackground: var(--gradient-1);\\r\\n\\t}\\r\\n\\r\\n\\t#file-selector-canvas:hover > img {\\r\\n\\t\\tfilter: invert(87%) sepia(88%) saturate(0%) hue-rotate(186deg) brightness(110%) contrast(97%);\\r\\n\\t}\\r\\n\\r\\n\\timg {\\r\\n\\t\\tfilter: invert(52%) sepia(6%) saturate(194%) hue-rotate(202deg) brightness(89%) contrast(84%);\\r\\n\\t}\\r\\n\\r\\n\\ta:hover {\\r\\n\\t\\tcolor: var(--font-1);\\r\\n\\t}\\r\\n\\r\\n\\ta {\\r\\n\\t\\ttext-decoration: none;\\r\\n\\t\\tcolor: var(--font-2);\\r\\n\\t\\tfont-family: var(--f-Regular), sans-serif;\\r\\n\\t\\tfont-size: 18px;\\r\\n\\t\\ttext-overflow: ellipsis;\\r\\n\\t\\toverflow: hidden;\\r\\n\\t}\\r\\n\\r\\n\\t@media (max-width: 1300px) {\\r\\n\\t\\ta {\\r\\n\\t\\t\\tfont-size: 1.5em;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t#file-selector-canvas {\\r\\n\\t\\t\\tborder-radius: 5px;\\r\\n\\t\\t\\twidth: 95%;\\r\\n\\t\\t\\tpadding-left: 5px;\\r\\n\\t\\t\\theight: 35px;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAqCC,iDAAsB,CACrB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,IAAI,CAAC,GAAG,CAC/B,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,CACT,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,GAAG,CACV,YAAY,CAAE,GAAG,CACjB,aAAa,CAAE,GAChB,CAEQ,UAAY,CACnB,UAAU,CAAE,IAAI,YAAY,CAC7B,CAEQ,UAAW,CAAG,+BAAI,CACzB,MAAM,CAAE,OAAO,EAAE,CAAC,CAAC,MAAM,EAAE,CAAC,CAAC,SAAS,GAAG,CAAC,CAAC,WAAW,MAAM,CAAC,CAAC,WAAW,GAAG,CAAC,CAAC,SAAS,GAAG,CAC3F,CAEQ,UAAW,CAAG,6BAAE,CACvB,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,WAAW,CAAE,IAAI,YAAY,CAAC,CAAC,CAAC,UAAU,CAC1C,UAAU,CAAE,WACb,CAEA,iDAAqB,MAAO,CAC3B,UAAU,CAAE,IAAI,YAAY,CAC7B,CAEA,mCAAqB,MAAM,CAAG,iBAAI,CACjC,MAAM,CAAE,OAAO,GAAG,CAAC,CAAC,MAAM,GAAG,CAAC,CAAC,SAAS,EAAE,CAAC,CAAC,WAAW,MAAM,CAAC,CAAC,WAAW,IAAI,CAAC,CAAC,SAAS,GAAG,CAC7F,CAEA,+BAAI,CACH,MAAM,CAAE,OAAO,GAAG,CAAC,CAAC,MAAM,EAAE,CAAC,CAAC,SAAS,IAAI,CAAC,CAAC,WAAW,MAAM,CAAC,CAAC,WAAW,GAAG,CAAC,CAAC,SAAS,GAAG,CAC7F,CAEA,6BAAC,MAAO,CACP,KAAK,CAAE,IAAI,QAAQ,CACpB,CAEA,6BAAE,CACD,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,WAAW,CAAE,IAAI,WAAW,CAAC,CAAC,CAAC,UAAU,CACzC,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,QAAQ,CACvB,QAAQ,CAAE,MACX,CAEA,MAAO,YAAY,MAAM,CAAE,CAC1B,6BAAE,CACD,SAAS,CAAE,KACZ,CAEA,iDAAsB,CACrB,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,GAAG,CACV,YAAY,CAAE,GAAG,CACjB,MAAM,CAAE,IACT,CACD"}'
};
function capitalizeFirstLetter$1(word) {
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const restOfWord = word.slice(1);
  return firstLetterCap + restOfWord;
}
function formatName$1(inStr) {
  inStr = inStr.replace("_", " ");
  const inStrSplit = inStr.split(" ");
  if (inStrSplit.length > 1) {
    return inStrSplit.reduce(
      (acc, curWord) => {
        acc += capitalizeFirstLetter$1(curWord) + " ";
        return acc;
      },
      " "
    );
  } else {
    return capitalizeFirstLetter$1(inStr);
  }
}
const File = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { filePath } = $$props;
  let { name } = $$props;
  const docPath = `${$page.url.origin}/docs/${filePath}`;
  let highlight = "";
  if (filePath == $page.params.document) {
    highlight = "highlight";
  }
  if ($$props.filePath === void 0 && $$bindings.filePath && filePath !== void 0)
    $$bindings.filePath(filePath);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$result.css.add(css$3);
  $$unsubscribe_page();
  return `<div class="${escape(null_to_empty(highlight), true) + " svelte-51ndjp"}" id="file-selector-canvas"><img${add_attribute("src", markdownLogo, 0)} alt="markdown" class="svelte-51ndjp"> <a data-sveltekit-reload data-sveltekit-preload-data${add_attribute("href", docPath, 0)} class="svelte-51ndjp">${escape(formatName$1(name).slice(0, -3).replace(".", ""))}</a> </div>`;
});
const css$2 = {
  code: "svg.svelte-svn8ep.svelte-svn8ep{scale:1}svg.svelte-svn8ep path.svelte-svn8ep{fill:var(--font-5)}svg.hovering.svelte-svn8ep path.svelte-svn8ep{fill:var(--font-1)}",
  map: '{"version":3,"file":"FolderIcon.svelte","sources":["FolderIcon.svelte"],"sourcesContent":["<script>\\r\\n\\texport let active;\\r\\n\\texport let hovering = false;\\r\\n<\/script>\\r\\n\\r\\n{#if active}\\r\\n\\t<svg\\r\\n\\t\\tclass:hovering\\r\\n\\t\\tversion=\\"1.1\\"\\r\\n\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\t\\txmlns:xlink=\\"http://www.w3.org/1999/xlink\\"\\r\\n\\t\\twidth=\\"22.3799\\"\\r\\n\\t\\theight=\\"18.3812\\"\\r\\n\\t>\\r\\n\\t\\t<g>\\r\\n\\t\\t\\t<rect height=\\"18.3812\\" opacity=\\"0\\" width=\\"22.3799\\" x=\\"0\\" y=\\"0\\" />\\r\\n\\t\\t\\t<path\\r\\n\\t\\t\\t\\td=\\"M3.20351 18.1875L19.4219 18.1875C21.2842 18.1875 22.3799 17.0998 22.3799 15.016L22.3799 4.97265C22.3799 2.88886 21.2762 1.80117 19.1764 1.80117L10.0896 1.80117C9.39217 1.80117 8.96893 1.63965 8.43495 1.19688L7.8744 0.743749C7.1912 0.181054 6.68612 0 5.66308 0L2.89921 0C1.07949 0 0 1.06269 0 3.11171L0 15.016C0 17.1078 1.0957 18.1875 3.20351 18.1875ZM3.31444 16.2742C2.40643 16.2742 1.91327 15.8059 1.91327 14.8553L1.91327 3.27694C1.91327 2.38046 2.40174 1.90526 3.27948 1.90526L5.1625 1.90526C5.84394 1.90526 6.2539 2.07303 6.79941 2.51756L7.3582 2.9787C8.03691 3.52713 8.558 3.7162 9.58104 3.7162L19.0574 3.7162C19.9574 3.7162 20.4666 4.19257 20.4666 5.1414L20.4666 14.8633C20.4666 15.8059 19.9574 16.2742 19.0574 16.2742ZM1.19433 7.39764L21.1934 7.39764L21.1934 5.71034L1.19433 5.71034Z\\"\\r\\n\\t\\t\\t\\tfill=\\"#79797d\\"\\r\\n\\t\\t\\t\\tfill-opacity=\\"1\\"\\r\\n\\t\\t\\t/>\\r\\n\\t\\t</g>\\r\\n\\t</svg>\\r\\n{:else}\\r\\n\\t<svg\\r\\n\\t\\tclass:hovering\\r\\n\\t\\tversion=\\"1.1\\"\\r\\n\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n\\t\\txmlns:xlink=\\"http://www.w3.org/1999/xlink\\"\\r\\n\\t\\twidth=\\"22.3799\\"\\r\\n\\t\\theight=\\"18.3812\\"\\r\\n\\t>\\r\\n\\t\\t<g>\\r\\n\\t\\t\\t<rect height=\\"18.3812\\" opacity=\\"0\\" width=\\"22.3799\\" x=\\"0\\" y=\\"0\\" />\\r\\n\\t\\t\\t<path\\r\\n\\t\\t\\t\\td=\\"M0 15.016C0 17.1078 1.0957 18.1875 3.20351 18.1875L19.4219 18.1875C21.2842 18.1875 22.3799 17.0998 22.3799 15.016L22.3799 7.23494L0 7.23494ZM0 5.83436L22.3799 5.83436L22.3799 4.97265C22.3799 2.88886 21.2762 1.80117 19.1764 1.80117L10.0896 1.80117C9.39217 1.80117 8.96893 1.63965 8.43495 1.19688L7.8744 0.743749C7.1912 0.181054 6.68612 0 5.66308 0L2.89921 0C1.07949 0 0 1.06269 0 3.11171Z\\"\\r\\n\\t\\t\\t\\tfill=\\"#79797d\\"\\r\\n\\t\\t\\t\\tfill-opacity=\\"1\\"\\r\\n\\t\\t\\t/>\\r\\n\\t\\t</g>\\r\\n\\t</svg>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n\\tsvg {\\r\\n\\t\\tscale: 1;\\r\\n\\t}\\r\\n\\r\\n\\tsvg path {\\r\\n\\t\\tfill: var(--font-5);\\r\\n\\t}\\r\\n\\r\\n\\tsvg.hovering path {\\r\\n\\t\\tfill: var(--font-1);\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA4CC,+BAAI,CACH,KAAK,CAAE,CACR,CAEA,iBAAG,CAAC,kBAAK,CACR,IAAI,CAAE,IAAI,QAAQ,CACnB,CAEA,GAAG,uBAAS,CAAC,kBAAK,CACjB,IAAI,CAAE,IAAI,QAAQ,CACnB"}'
};
const FolderIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active } = $$props;
  let { hovering = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.hovering === void 0 && $$bindings.hovering && hovering !== void 0)
    $$bindings.hovering(hovering);
  $$result.css.add(css$2);
  return `${active ? `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22.3799" height="18.3812" class="${["svelte-svn8ep", hovering ? "hovering" : ""].join(" ").trim()}"><g><rect height="18.3812" opacity="0" width="22.3799" x="0" y="0"></rect><path d="M3.20351 18.1875L19.4219 18.1875C21.2842 18.1875 22.3799 17.0998 22.3799 15.016L22.3799 4.97265C22.3799 2.88886 21.2762 1.80117 19.1764 1.80117L10.0896 1.80117C9.39217 1.80117 8.96893 1.63965 8.43495 1.19688L7.8744 0.743749C7.1912 0.181054 6.68612 0 5.66308 0L2.89921 0C1.07949 0 0 1.06269 0 3.11171L0 15.016C0 17.1078 1.0957 18.1875 3.20351 18.1875ZM3.31444 16.2742C2.40643 16.2742 1.91327 15.8059 1.91327 14.8553L1.91327 3.27694C1.91327 2.38046 2.40174 1.90526 3.27948 1.90526L5.1625 1.90526C5.84394 1.90526 6.2539 2.07303 6.79941 2.51756L7.3582 2.9787C8.03691 3.52713 8.558 3.7162 9.58104 3.7162L19.0574 3.7162C19.9574 3.7162 20.4666 4.19257 20.4666 5.1414L20.4666 14.8633C20.4666 15.8059 19.9574 16.2742 19.0574 16.2742ZM1.19433 7.39764L21.1934 7.39764L21.1934 5.71034L1.19433 5.71034Z" fill="#79797d" fill-opacity="1" class="svelte-svn8ep"></path></g></svg>` : `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22.3799" height="18.3812" class="${["svelte-svn8ep", hovering ? "hovering" : ""].join(" ").trim()}"><g><rect height="18.3812" opacity="0" width="22.3799" x="0" y="0"></rect><path d="M0 15.016C0 17.1078 1.0957 18.1875 3.20351 18.1875L19.4219 18.1875C21.2842 18.1875 22.3799 17.0998 22.3799 15.016L22.3799 7.23494L0 7.23494ZM0 5.83436L22.3799 5.83436L22.3799 4.97265C22.3799 2.88886 21.2762 1.80117 19.1764 1.80117L10.0896 1.80117C9.39217 1.80117 8.96893 1.63965 8.43495 1.19688L7.8744 0.743749C7.1912 0.181054 6.68612 0 5.66308 0L2.89921 0C1.07949 0 0 1.06269 0 3.11171Z" fill="#79797d" fill-opacity="1" class="svelte-svn8ep"></path></g></svg>`}`;
});
const css$1 = {
  code: "button.svelte-pg8ogm.svelte-pg8ogm{display:grid;grid-template-columns:1fr 3rem;padding:0 0 0 5px;background-color:transparent;cursor:pointer;border:none;margin:0;max-width:100%;color:var(--font-1);align-items:center;text-align:start;width:100%;text-overflow:ellipsis;overflow:hidden}#left-cluster.svelte-pg8ogm.svelte-pg8ogm{display:grid;grid-template-columns:3rem 1fr;padding:0;background-color:transparent;cursor:pointer;border:none;margin:0;max-width:100%;color:var(--font-1);font-family:var(--f-SemiBold), sans-serif;font-size:2rem;align-items:center;text-align:start;width:100%;text-overflow:ellipsis;overflow:hidden}#count-container.svelte-pg8ogm.svelte-pg8ogm{display:flex;align-items:center;justify-content:center;border-radius:8px;background-color:var(--background-4);font-family:var(--f-Regular), sans-serif;font-size:1.3rem;color:var(--font-2)}button.svelte-pg8ogm.svelte-pg8ogm:hover{color:var(--font-1);background:var(--gradient-2);border-radius:5px}button.svelte-pg8ogm:hover #count-container.svelte-pg8ogm{background-color:transparent;transition:background-color 0s;color:white}@media(max-width: 1300px){button.svelte-pg8ogm.svelte-pg8ogm{font-size:1.6em}}ul.svelte-pg8ogm.svelte-pg8ogm{padding:5px 0 0 3rem;margin:0 0 0 0.5rem;list-style:none}li.svelte-pg8ogm.svelte-pg8ogm{padding:2px 0}",
  map: '{"version":3,"file":"Folder.svelte","sources":["Folder.svelte"],"sourcesContent":["<script lang=\\"ts\\">import File from \\"./File.svelte\\";\\nimport FolderIcon from \\"$lib/assets/icons/FolderIcon.svelte\\";\\nexport let active = true;\\nexport let name;\\nexport let files;\\nlet hovering = false;\\nfunction capitalizeFirstLetter(word) {\\n  const firstLetter = word.charAt(0);\\n  const firstLetterCap = firstLetter.toUpperCase();\\n  const restOfWord = word.slice(1);\\n  return firstLetterCap + restOfWord;\\n}\\nfunction formatName(inStr) {\\n  inStr = inStr.replace(\\"_\\", \\" \\");\\n  const inStrSplit = inStr.split(\\" \\");\\n  if (inStrSplit.length > 1) {\\n    return inStrSplit.reduce((acc, curWord) => {\\n      acc += capitalizeFirstLetter(curWord) + \\" \\";\\n      return acc;\\n    }, \\" \\");\\n  } else {\\n    return capitalizeFirstLetter(inStr);\\n  }\\n}\\n<\/script>\\r\\n\\r\\n<button\\r\\n\\ton:click={() => {\\r\\n\\t\\tactive = !active;\\r\\n\\t}}\\r\\n\\ton:mouseenter={() => {\\r\\n\\t\\thovering = true;\\r\\n\\t}}\\r\\n\\ton:mouseleave={() => {\\r\\n\\t\\thovering = false;\\r\\n\\t}}\\r\\n>\\r\\n\\t<span id=\\"left-cluster\\">\\r\\n\\t\\t{#key hovering}\\r\\n\\t\\t\\t<FolderIcon {active} {hovering} />\\r\\n\\t\\t{/key}\\r\\n\\t\\t{formatName(name)}\\r\\n\\t</span>\\r\\n\\t<span id=\\"count-container\\">\\r\\n\\t\\t<span>{files.length}</span>\\r\\n\\t</span>\\r\\n</button>\\r\\n\\r\\n{#if active}\\r\\n\\t<ul>\\r\\n\\t\\t{#each files as file}\\r\\n\\t\\t\\t<li>\\r\\n\\t\\t\\t\\t{#if file.children}\\r\\n\\t\\t\\t\\t\\t<svelte:self name={file.name} files={file.children} active />\\r\\n\\t\\t\\t\\t{:else}\\r\\n\\t\\t\\t\\t\\t<File filePath={file.path} name={file.name} />\\r\\n\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t</li>\\r\\n\\t\\t{/each}\\r\\n\\t</ul>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n\\tbutton {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-columns: 1fr 3rem;\\r\\n\\t\\tpadding: 0 0 0 5px;\\r\\n\\t\\tbackground-color: transparent;\\r\\n\\t\\tcursor: pointer;\\r\\n\\t\\tborder: none;\\r\\n\\t\\tmargin: 0;\\r\\n\\t\\tmax-width: 100%;\\r\\n\\t\\tcolor: var(--font-1);\\r\\n\\t\\talign-items: center;\\r\\n\\t\\ttext-align: start;\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\ttext-overflow: ellipsis;\\r\\n\\t\\toverflow: hidden;\\r\\n\\t}\\r\\n\\r\\n\\t#left-cluster {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-columns: 3rem 1fr;\\r\\n\\t\\tpadding: 0;\\r\\n\\t\\tbackground-color: transparent;\\r\\n\\t\\tcursor: pointer;\\r\\n\\t\\tborder: none;\\r\\n\\t\\tmargin: 0;\\r\\n\\t\\tmax-width: 100%;\\r\\n\\t\\tcolor: var(--font-1);\\r\\n\\t\\tfont-family: var(--f-SemiBold), sans-serif;\\r\\n\\t\\tfont-size: 2rem;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\ttext-align: start;\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\ttext-overflow: ellipsis;\\r\\n\\t\\toverflow: hidden;\\r\\n\\t}\\r\\n\\r\\n\\t#count-container {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\tborder-radius: 8px;\\r\\n\\t\\tbackground-color: var(--background-4);\\r\\n\\t\\tfont-family: var(--f-Regular), sans-serif;\\r\\n\\t\\tfont-size: 1.3rem;\\r\\n\\t\\tcolor: var(--font-2);\\r\\n\\t}\\r\\n\\r\\n\\tbutton:hover {\\r\\n\\t\\tcolor: var(--font-1);\\r\\n\\t\\tbackground: var(--gradient-2);\\r\\n\\t\\tborder-radius: 5px;\\r\\n\\t}\\r\\n\\r\\n\\tbutton:hover #count-container {\\r\\n\\t\\tbackground-color: transparent;\\r\\n\\t\\ttransition: background-color 0s;\\r\\n\\t\\tcolor: white;\\r\\n\\t}\\r\\n\\r\\n\\t@media (max-width: 1300px) {\\r\\n\\t\\tbutton {\\r\\n\\t\\t\\tfont-size: 1.6em;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tul {\\r\\n\\t\\tpadding: 5px 0 0 3rem;\\r\\n\\t\\tmargin: 0 0 0 0.5rem;\\r\\n\\t\\tlist-style: none;\\r\\n\\t}\\r\\n\\r\\n\\tli {\\r\\n\\t\\tpadding: 2px 0;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA+DC,kCAAO,CACN,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,IAAI,CAC/B,OAAO,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAClB,gBAAgB,CAAE,WAAW,CAC7B,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,QAAQ,CACvB,QAAQ,CAAE,MACX,CAEA,yCAAc,CACb,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,IAAI,CAAC,GAAG,CAC/B,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,WAAW,CAC7B,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,WAAW,CAAE,IAAI,YAAY,CAAC,CAAC,CAAC,UAAU,CAC1C,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,QAAQ,CACvB,QAAQ,CAAE,MACX,CAEA,4CAAiB,CAChB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,aAAa,CAAE,GAAG,CAClB,gBAAgB,CAAE,IAAI,cAAc,CAAC,CACrC,WAAW,CAAE,IAAI,WAAW,CAAC,CAAC,CAAC,UAAU,CACzC,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,QAAQ,CACpB,CAEA,kCAAM,MAAO,CACZ,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,aAAa,CAAE,GAChB,CAEA,oBAAM,MAAM,CAAC,8BAAiB,CAC7B,gBAAgB,CAAE,WAAW,CAC7B,UAAU,CAAE,gBAAgB,CAAC,EAAE,CAC/B,KAAK,CAAE,KACR,CAEA,MAAO,YAAY,MAAM,CAAE,CAC1B,kCAAO,CACN,SAAS,CAAE,KACZ,CACD,CAEA,8BAAG,CACF,OAAO,CAAE,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CACrB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,CACpB,UAAU,CAAE,IACb,CAEA,8BAAG,CACF,OAAO,CAAE,GAAG,CAAC,CACd"}'
};
function capitalizeFirstLetter(word) {
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const restOfWord = word.slice(1);
  return firstLetterCap + restOfWord;
}
function formatName(inStr) {
  inStr = inStr.replace("_", " ");
  const inStrSplit = inStr.split(" ");
  if (inStrSplit.length > 1) {
    return inStrSplit.reduce(
      (acc, curWord) => {
        acc += capitalizeFirstLetter(curWord) + " ";
        return acc;
      },
      " "
    );
  } else {
    return capitalizeFirstLetter(inStr);
  }
}
const Folder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = true } = $$props;
  let { name } = $$props;
  let { files } = $$props;
  let hovering = false;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  $$result.css.add(css$1);
  return `<button class="svelte-pg8ogm"><span id="left-cluster" class="svelte-pg8ogm">${validate_component(FolderIcon, "FolderIcon").$$render($$result, { active, hovering }, {}, {})} ${escape(formatName(name))}</span> <span id="count-container" class="svelte-pg8ogm"><span>${escape(files.length)}</span></span></button> ${active ? `<ul class="svelte-pg8ogm">${each(files, (file) => {
    return `<li class="svelte-pg8ogm">${file.children ? `${validate_component(Folder, "svelte:self").$$render(
      $$result,
      {
        name: file.name,
        files: file.children,
        active: true
      },
      {},
      {}
    )}` : `${validate_component(File, "File").$$render($$result, { filePath: file.path, name: file.name }, {}, {})}`} </li>`;
  })}</ul>` : ``}`;
});
const css = {
  code: "#page-container.svelte-1ybb5h5{display:grid;overflow:hidden}.active.svelte-1ybb5h5{grid-template-columns:320px 1fr}@media(max-width: 400px){#page-container.svelte-1ybb5h5{grid-template-columns:none;grid-template-rows:0 3fr}.folder-container.svelte-1ybb5h5{max-height:400px;overflow:hidden}}#folder-canvas.svelte-1ybb5h5{display:grid;grid-template-rows:4rem 1fr;background-color:var(--background-2);width:100%;max-width:320px;align-items:start;overflow-y:scroll;overflow-x:hidden}.folder-container.svelte-1ybb5h5{background-color:var(--background-2);overflow:scroll;padding:15px}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { leftPanelActive } from \\"$lib/data/shared.js\\";\\nimport Folder from \\"$lib/components/FileTree/Folder.svelte\\";\\nimport stickybits from \\"stickybits\\";\\nexport let data;\\nconst library = JSON.parse(data.tree);\\nconst props = {\\n  name: \\"root\\",\\n  files: library.children,\\n  active: true\\n};\\nonMount(() => {\\n  stickybits(\\"#folder-top-bar-sticky\\");\\n});\\n<\/script>\\r\\n\\r\\n<div id=\\"page-container\\" class=\\"constrained-height\\" class:active={$leftPanelActive}>\\r\\n\\t{#if $leftPanelActive}\\r\\n\\t\\t<div id=\\"folder-canvas\\" class=\\"no-scroll-bar\\">\\r\\n\\t\\t\\t<div class=\\"folder-container no-scroll-bar constrained-height\\">\\r\\n\\t\\t\\t\\t<Folder {...props} />\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\\r\\n\\t{/if}\\r\\n\\t<slot />\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t#page-container {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\toverflow: hidden;\\r\\n\\t}\\r\\n\\r\\n\\t.active {\\r\\n\\t\\tgrid-template-columns: 320px 1fr;\\r\\n\\t}\\r\\n\\r\\n\\t@media (max-width: 400px) {\\r\\n\\t\\t#page-container {\\r\\n\\t\\t\\tgrid-template-columns: none;\\r\\n\\t\\t\\tgrid-template-rows: 0 3fr;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t.folder-container {\\r\\n\\t\\t\\tmax-height: 400px;\\r\\n\\t\\t\\toverflow: hidden;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\t#folder-canvas {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-rows: 4rem 1fr;\\r\\n\\t\\tbackground-color: var(--background-2);\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\tmax-width: 320px;\\r\\n\\t\\talign-items: start;\\r\\n\\t\\toverflow-y: scroll;\\r\\n\\t\\toverflow-x: hidden;\\r\\n\\t}\\r\\n\\r\\n\\t.folder-container {\\r\\n\\t\\tbackground-color: var(--background-2);\\r\\n\\t\\toverflow: scroll;\\r\\n\\t\\tpadding: 15px;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA4BC,8BAAgB,CACf,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,MACX,CAEA,sBAAQ,CACP,qBAAqB,CAAE,KAAK,CAAC,GAC9B,CAEA,MAAO,YAAY,KAAK,CAAE,CACzB,8BAAgB,CACf,qBAAqB,CAAE,IAAI,CAC3B,kBAAkB,CAAE,CAAC,CAAC,GACvB,CAEA,gCAAkB,CACjB,UAAU,CAAE,KAAK,CACjB,QAAQ,CAAE,MACX,CACD,CAEA,6BAAe,CACd,OAAO,CAAE,IAAI,CACb,kBAAkB,CAAE,IAAI,CAAC,GAAG,CAC5B,gBAAgB,CAAE,IAAI,cAAc,CAAC,CACrC,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,KAAK,CAClB,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,MACb,CAEA,gCAAkB,CACjB,gBAAgB,CAAE,IAAI,cAAc,CAAC,CACrC,QAAQ,CAAE,MAAM,CAChB,OAAO,CAAE,IACV"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $leftPanelActive, $$unsubscribe_leftPanelActive;
  $$unsubscribe_leftPanelActive = subscribe(leftPanelActive, (value) => $leftPanelActive = value);
  let { data } = $$props;
  const library = JSON.parse(data.tree);
  const props = {
    name: "root",
    files: library.children,
    active: true
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_leftPanelActive();
  return `<div id="page-container" class="${["constrained-height svelte-1ybb5h5", $leftPanelActive ? "active" : ""].join(" ").trim()}">${$leftPanelActive ? `<div id="folder-canvas" class="no-scroll-bar svelte-1ybb5h5"><div class="folder-container no-scroll-bar constrained-height svelte-1ybb5h5">${validate_component(Folder, "Folder").$$render($$result, Object.assign({}, props), {}, {})}</div></div>` : ``} ${slots.default ? slots.default({}) : ``} </div>`;
});
export {
  Layout as default
};
