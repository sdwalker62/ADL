import React from "react";
import styles from "./styles.module.css";
import LeftPanelIcon from "@/components/icons/left_panel_icon";
import DriveIcon from "@/components/icons/drive_icon";
import ServerIcon from "@/components/icons/server_icon";
import MenuIcon from "@/components/icons/menu_icon";
import DecreaseFontSizeIcon from "@/components/icons/decrease_font_size_icon";
import IncreaseFontSizeIcon from "@/components/icons/increase_font_size_icon";
import CodeIcon from "@/components/icons/code_icon";
import MathIcon from "@/components/icons/math_icon";
import TableIcon from "@/components/icons/table_icon";
import RightPanelIcon from "@/components/icons/right_panel_icon";

let leftPanelActive = true;
let folderActive = true;
let serverActive = false;
let codeActive = true;
let mathActive = true;
let tableActive = true;
let rightPanelActive = true;

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <div id="left-cluster">
        <LeftPanelIcon active={leftPanelActive} />
        <DriveIcon active={folderActive} />
        <ServerIcon active={serverActive} />
      </div>
      <div id="center-cluster">
        <div id="left-search">
          <MenuIcon />
        </div>
        <h1>Search Input</h1>
        <div id="right-search">
          <DecreaseFontSizeIcon />
          <IncreaseFontSizeIcon />
        </div>
      </div>
      <div id="right-cluster">
        <CodeIcon active={codeActive} />
        <MathIcon active={mathActive} />
        <TableIcon active={tableActive} />
        <RightPanelIcon active={rightPanelActive} />
      </div>
    </div>
  );
}
