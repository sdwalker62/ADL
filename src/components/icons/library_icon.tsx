import React from "react";
import "@/app/globals.css";

export default function LibraryIcon({ active = false }) {
  return (
    <svg
      className={active ? "icon active" : "icon"}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="4rem"
      height="4rem"
    >
      <g>
        <rect height="4rem" opacity="0" width="4rem" x="0" y="0" />
        <path
          d="M1.37695 21.7027L3.19628 21.7027C4.07323 21.7027 4.57147 21.1947 4.57147 20.3258L4.57147 4.13925C4.57147 3.26054 4.07323 2.75429 3.19628 2.75429L1.37695 2.75429C0.490232 2.75429 0 3.26054 0 4.13925L0 20.3258C0 21.1947 0.490232 21.7027 1.37695 21.7027ZM7.11033 21.7027L10.8773 21.7027C11.7623 21.7027 12.2525 21.1947 12.2525 20.3258L12.2525 7.58885C12.2525 6.71815 11.7623 6.21191 10.8773 6.21191L7.11033 6.21191C6.22362 6.21191 5.72538 6.71815 5.72538 7.58885L5.72538 20.3258C5.72538 21.1947 6.22362 21.7027 7.11033 21.7027ZM7.98006 9.85116C7.60389 9.85116 7.31737 9.56639 7.31737 9.19999C7.31737 8.83808 7.60213 8.55331 7.98006 8.55331L10.0342 8.55331C10.4217 8.55331 10.6791 8.83808 10.6791 9.19999C10.6791 9.56639 10.4023 9.85116 10.0342 9.85116ZM7.98006 19.3693C7.60213 19.3693 7.31737 19.0846 7.31737 18.7164C7.31737 18.3563 7.60389 18.0697 7.98006 18.0697L10.0342 18.0697C10.4023 18.0697 10.6791 18.3563 10.6791 18.7164C10.6791 19.0846 10.4023 19.3693 10.0342 19.3693ZM14.7914 21.7027L17.0629 21.7027C17.9496 21.7027 18.4398 21.1947 18.4398 20.3258L18.4398 1.38495C18.4398 0.506247 17.9496 0 17.0629 0L14.7914 0C13.9047 0 13.4144 0.506247 13.4144 1.38495L13.4144 20.3258C13.4144 21.1947 13.9047 21.7027 14.7914 21.7027ZM21.5603 21.7551L23.0377 21.5533C23.9066 21.4504 24.3375 20.9008 24.2443 20.0238L22.4634 4.09511C22.3685 3.22441 21.8269 2.77129 20.9437 2.88047L19.4744 3.08398C18.5974 3.18691 18.1666 3.73652 18.2615 4.6037L20.0486 20.5342C20.1435 21.4031 20.6851 21.858 21.5603 21.7551Z"
          fill="#ffffff"
          fill-opacity="1"
        />
      </g>
    </svg>
  );
}