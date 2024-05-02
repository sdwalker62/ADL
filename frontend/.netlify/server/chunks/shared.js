import { r as readable, w as writable } from "./index.js";
let currentPage = writable("Home");
let showMainMenu = writable(false);
let colorTheme = writable("");
let colorThemeOptions = readable([
  { value: "dark", displayName: "Dark" },
  { value: "cb-dark", displayName: "Dark (Colorblind)" },
  { value: "light", displayName: "Light" },
  { value: "cb-light", displayName: "Light (Colorblind)" }
]);
let leftPanelActive = writable(true);
let rightPanelActive = writable(true);
let showCodeOutlineElements = writable(true);
let showMathOutlineElements = writable(true);
let showTableOutlineElements = writable(true);
let pdfZoom = writable(100);
export {
  colorThemeOptions as a,
  currentPage as b,
  colorTheme as c,
  showCodeOutlineElements as d,
  showMathOutlineElements as e,
  showTableOutlineElements as f,
  leftPanelActive as l,
  pdfZoom as p,
  rightPanelActive as r,
  showMainMenu as s
};
