import React from "react";
import "@/app/globals.css";

export default function DriveIcon({ active = false }) {
  return (
    <svg
      className={active ? "icon active" : "icon"}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="4rem"
      height="4rem"
    >
      <g>
        <rect height="22.0785" opacity="0" width="21.2621" x="0" y="0" />
        <path
          d="M0 11.2666C0 13.7084 1.84336 15.4744 4.39628 15.4744L16.8676 15.4744C19.4187 15.4744 21.2621 13.7084 21.2621 11.2666C21.2621 10.5638 21.081 9.91092 20.815 9.30604L17.8176 2.26327C17.1957 0.798232 15.9596 0.00760853 14.2672 0.00760853L7.00018 0.00760853C5.31405 0.00760853 4.06367 0.794716 3.44179 2.26327L0.468162 9.27616C0.202928 9.88124 0 10.5367 0 11.2666ZM3.45096 7.13964L5.23143 2.74393C5.51756 2.02401 6.14042 1.64725 7.02909 1.64725L14.2463 1.64725C15.135 1.64725 15.7578 2.02401 16.0422 2.74393L17.8209 7.13964C17.5191 7.07519 17.1697 7.05253 16.7797 7.05253L4.48593 7.05253C4.09413 7.05253 3.74647 7.07519 3.45096 7.13964ZM1.87089 11.2666C1.87089 9.89256 2.90136 8.93142 4.39628 8.93142L16.8676 8.93142C18.3625 8.93142 19.393 9.89256 19.393 11.2666C19.393 12.7224 18.4443 13.6035 16.8676 13.6035L4.39628 13.6035C2.90136 13.6035 1.87089 12.6406 1.87089 11.2666ZM15.6236 11.2666C15.6236 11.9242 16.1588 12.4638 16.8209 12.4541C17.4687 12.4461 18.0119 11.9162 18.0119 11.2666C18.0119 10.624 17.4572 10.0773 16.8209 10.0773C16.1765 10.0773 15.6236 10.624 15.6236 11.2666ZM9.59843 19.781L11.3781 19.781L11.3781 14.4177L9.59843 14.4177ZM2.09746 20.5816L18.8808 20.5816C19.3685 20.5816 19.7738 20.1843 19.7738 19.6967C19.7738 19.209 19.3685 18.8019 18.8808 18.8019L2.09746 18.8019C1.60977 18.8019 1.2125 19.209 1.2125 19.6967C1.2125 20.1843 1.60977 20.5816 2.09746 20.5816ZM10.4914 22.0785C11.7896 22.0785 12.859 21.0092 12.859 19.7029C12.859 18.4047 11.7896 17.3353 10.4914 17.3353C9.18515 17.3353 8.11757 18.4047 8.11757 19.7029C8.11757 21.0092 9.18515 22.0785 10.4914 22.0785Z"
          fill="#ffffff"
          fill-opacity="1"
        />
      </g>
    </svg>
  );
}