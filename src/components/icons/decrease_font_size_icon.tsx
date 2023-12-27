import React from "react";
import "@/app/globals.css";

export default function DecreaseFontSizeIcon({ active = false }) {
  return (
    <svg
      className={active ? "icon active" : "icon"}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="4rem"
      height="4rem"
    >
      <g>
        <rect height="24" opacity="0" width="24" x="0" y="0" />
        <path
          transform="translate(6, 4)"
          d="M0.996867 10.743C1.50096 10.743 1.81737 10.4799 2.0035 9.86425L2.70331 7.774L6.50233 7.774L7.20039 9.8748C7.38124 10.5012 7.69765 10.743 8.22733 10.743C8.8158 10.743 9.22517 10.3646 9.22517 9.81445C9.22517 9.58222 9.17107 9.36679 9.07713 9.1125L6.11912 1.19901C5.83475 0.432811 5.34022 0.0570321 4.59003 0.0570321C3.86718 0.0570321 3.37266 0.422068 3.0918 1.19901L0.137303 9.1125C0.0451165 9.34375 0 9.59003 0 9.81445C0 10.3849 0.381052 10.743 0.996867 10.743ZM3.17343 6.2496L4.48964 2.17734L4.69315 2.17734L6.01991 6.2496Z"
          fill="#ffffff"
          fill-opacity="1"
        />
      </g>
    </svg>
  );
}
