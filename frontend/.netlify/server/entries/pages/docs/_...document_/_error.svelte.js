import { c as create_ssr_component, a as add_attribute } from "../../../../chunks/ssr.js";
const errorImg = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='1em'%20fill='%23000000'%20viewBox='0%200%20512%20512'%3e%3c!--!%20Font%20Awesome%20Free%206.4.0%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license%20(Commercial%20License)%20Copyright%202023%20Fonticons,%20Inc.%20--%3e%3cpath%20d='M256%200c53%200%2096%2043%2096%2096v3.6c0%2015.7-12.7%2028.4-28.4%2028.4H188.4c-15.7%200-28.4-12.7-28.4-28.4V96c0-53%2043-96%2096-96zM41.4%20105.4c12.5-12.5%2032.8-12.5%2045.3%200l64%2064c.7%20.7%201.3%201.4%201.9%202.1c14.2-7.3%2030.4-11.4%2047.5-11.4H312c17.1%200%2033.2%204.1%2047.5%2011.4c.6-.7%201.2-1.4%201.9-2.1l64-64c12.5-12.5%2032.8-12.5%2045.3%200s12.5%2032.8%200%2045.3l-64%2064c-.7%20.7-1.4%201.3-2.1%201.9c6.2%2012%2010.1%2025.3%2011.1%2039.5H480c17.7%200%2032%2014.3%2032%2032s-14.3%2032-32%2032H416c0%2024.6-5.5%2047.8-15.4%2068.6c2.2%201.3%204.2%202.9%206%204.8l64%2064c12.5%2012.5%2012.5%2032.8%200%2045.3s-32.8%2012.5-45.3%200l-63.1-63.1c-24.5%2021.8-55.8%2036.2-90.3%2039.6V240c0-8.8-7.2-16-16-16s-16%207.2-16%2016V479.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6%20502.6c-12.5%2012.5-32.8%2012.5-45.3%200s-12.5-32.8%200-45.3l64-64c1.9-1.9%203.9-3.4%206-4.8C101.5%20367.8%2096%20344.6%2096%20320H32c-17.7%200-32-14.3-32-32s14.3-32%2032-32H96.3c1.1-14.1%205-27.5%2011.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8%200-45.3z'/%3e%3c/svg%3e";
const css = {
  code: "div.svelte-x9argb{display:flex;flex-direction:column;margin:20px}h1.svelte-x9argb{font-family:'EB Garamond',serif;font-size:3em;color:var(--font-2)}p.svelte-x9argb{font-family:'EB Garamond',serif;font-size:2em;color:var(--font-1)}li.svelte-x9argb{font-family:'EB Garamond',serif;font-size:1.5em;color:var(--font-1)}img.svelte-x9argb{height:6rem;filter:invert(63%) sepia(95%) saturate(6235%) hue-rotate(333deg) brightness(88%) contrast(91%)}",
  map: `{"version":3,"file":"+error.svelte","sources":["+error.svelte"],"sourcesContent":["<script lang=\\"ts\\">import errorImg from \\"$lib/assets/images/error.svg\\";\\n<\/script>\\r\\n\\r\\n<div>\\r\\n\\t<img src={errorImg} alt=\\"error\\" />\\r\\n\\t<h1>Something Has Caused An Error!</h1>\\r\\n\\r\\n\\t<p>\\r\\n\\t\\tApologies! An error has occured. There are a few known reasons for a document to render\\r\\n\\t\\timproperly:\\r\\n\\t</p>\\r\\n\\t<ol>\\r\\n\\t\\t<li>No H1 (#) tag in the markdown file (fix coming soon!)</li>\\r\\n\\t</ol>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\tdiv {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t\\tmargin: 20px;\\r\\n\\t}\\r\\n\\r\\n\\th1 {\\r\\n\\t\\tfont-family: 'EB Garamond',serif;\\r\\n\\t\\tfont-size: 3em;\\r\\n\\t\\tcolor: var(--font-2);\\r\\n\\t}\\r\\n\\tp {\\r\\n\\t\\tfont-family: 'EB Garamond',serif;\\r\\n\\t\\tfont-size: 2em;\\r\\n\\t\\tcolor: var(--font-1);\\r\\n\\t}\\r\\n\\r\\n\\tli {\\r\\n\\t\\tfont-family: 'EB Garamond',serif;\\r\\n\\t\\tfont-size: 1.5em;\\r\\n\\t\\tcolor: var(--font-1);\\r\\n\\t}\\r\\n\\r\\n\\timg {\\r\\n\\t\\theight: 6rem;\\r\\n\\t\\tfilter: invert(63%) sepia(95%) saturate(6235%) hue-rotate(333deg) brightness(88%) contrast(91%);\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAiBC,iBAAI,CACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,MAAM,CAAE,IACT,CAEA,gBAAG,CACF,WAAW,CAAE,aAAa,CAAC,KAAK,CAChC,SAAS,CAAE,GAAG,CACd,KAAK,CAAE,IAAI,QAAQ,CACpB,CACA,eAAE,CACD,WAAW,CAAE,aAAa,CAAC,KAAK,CAChC,SAAS,CAAE,GAAG,CACd,KAAK,CAAE,IAAI,QAAQ,CACpB,CAEA,gBAAG,CACF,WAAW,CAAE,aAAa,CAAC,KAAK,CAChC,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,QAAQ,CACpB,CAEA,iBAAI,CACH,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OAAO,GAAG,CAAC,CAAC,MAAM,GAAG,CAAC,CAAC,SAAS,KAAK,CAAC,CAAC,WAAW,MAAM,CAAC,CAAC,WAAW,GAAG,CAAC,CAAC,SAAS,GAAG,CAC/F"}`
};
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="svelte-x9argb" data-svelte-h="svelte-13n47ff"><img${add_attribute("src", errorImg, 0)} alt="error" class="svelte-x9argb"> <h1 class="svelte-x9argb">Something Has Caused An Error!</h1> <p class="svelte-x9argb">Apologies! An error has occured. There are a few known reasons for a document to render
		improperly:</p> <ol><li class="svelte-x9argb">No H1 (#) tag in the markdown file (fix coming soon!)</li></ol> </div>`;
});
export {
  Error as default
};
