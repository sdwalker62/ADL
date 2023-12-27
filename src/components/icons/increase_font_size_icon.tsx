import React from "react";
import "@/app/globals.css";

export default function IncreaseFontSizeIcon({ active = false }) {
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
          transform="translate(4, 2)"
          d="M1.08046 14.6471C1.7369 14.6471 2.07518 14.3814 2.28709 13.6887L3.3746 10.6527L8.95175 10.6527L10.041 13.6887C10.2512 14.3814 10.5894 14.6471 11.2396 14.6471C11.9242 14.6471 12.3652 14.2361 12.3652 13.5984C12.3652 13.3639 12.3271 13.1602 12.2314 12.8971L7.90798 1.22186C7.61306 0.402926 7.05974 0 6.17108 0C5.32305 0 4.76524 0.396675 4.47657 1.21385L0.130273 12.9473C0.0398433 13.1981 0 13.4105 0 13.6188C0 14.2547 0.412691 14.6471 1.08046 14.6471ZM3.93397 8.83789L6.14354 2.49237L6.1994 2.49237L8.40722 8.83789Z"
          fill="#ffffff"
          fill-opacity="1"
        />
      </g>
    </svg>
  );
}
