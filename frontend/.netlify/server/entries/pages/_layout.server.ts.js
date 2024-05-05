const load = async ({ cookies }) => {
  const colorModeCookie = cookies.get("colorMode");
  const colorMode = !colorModeCookie ? "dark" : colorModeCookie;
  const showCodeOutlineCookie = cookies.get("showCodeOutlineElements");
  const showCodeOutlineElements = !showCodeOutlineCookie ? true : showCodeOutlineCookie === "true";
  const showMathOutlineCookie = cookies.get("showMathOutlineElements");
  const showMathOutlineElements = !showMathOutlineCookie ? true : showMathOutlineCookie === "true";
  const showTableOutlineCookie = cookies.get("showTableOutlineElements");
  const showTableOutlineElements = !showTableOutlineCookie ? true : showTableOutlineCookie === "true";
  const leftPanelActiveCookie = cookies.get("leftPanelActive");
  const leftPanelActive = !leftPanelActiveCookie ? true : leftPanelActiveCookie === "true";
  const rightPanelActiveCookie = cookies.get("rightPanelActive");
  const rightPanelActive = !rightPanelActiveCookie ? true : rightPanelActiveCookie === "true";
  return {
    colorMode,
    showCodeOutlineElements,
    showMathOutlineElements,
    showTableOutlineElements,
    leftPanelActive,
    rightPanelActive
  };
};
export {
  load
};
