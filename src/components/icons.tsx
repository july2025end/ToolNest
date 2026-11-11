import type { SVGProps } from "react";

// One style: 24px grid, 1.75 stroke, round caps/joins, no fills. See DESIGN.md.
const paths = {
  compress: "M4 9h16M4 15h16M12 3v4m0 0-2-2m2 2 2-2M12 21v-4m0 0-2 2m2-2 2 2",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  "phone-photo": "M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm-2 12 3-3 3 3 2-2 4 4M14.5 8.5h.01",
  convert: "M4 8h13l-3-3M20 16H7l3 3",
  merge: "M6 3v5a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4v5M18 3v5a4 4 0 0 1-4 4M15 18l3 3 3-3",
  split: "M12 3v6m0 0-6 6v6m6-12 6 6v6M3 18l3 3 3-3m6 0 3 3 3-3",
  "image-to-doc": "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M8 17l3-3 2 2 1.5-1.5L17 17",
  "doc-to-image": "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6M9 17h4",
  grid: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z",
  rotate: "M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7",
  extract: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4M14 3l5 5M14 3v5h5m0 0v3M15 17h6m0 0-3-3m3 3-3 3",
  trash: "M4 7h16M10 11v6m4-6v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3",
  hash: "M5 9h15M4 15h15M10 3 8 21M16 3l-2 18",
  stamp: "M9 4h6l-1 7h3a2 2 0 0 1 2 2v2H5v-2a2 2 0 0 1 2-2h3L9 4ZM5 20h14",
  qr: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h2v2h-2v-2Zm4 0h2v2M14 18v2h2m2-2h2v2h-2",
  wifi: "M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0M12 19h.01",
  bank: "M3 10 12 4l9 6M5 10v8m4.5-8v8m5-8v8M19 10v8M3 21h18",
  growth: "M3 20h18M5 16l5-5 3 3 7-7m0 0h-5m5 0v5",
  percent: "M19 5 5 19M7.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm9 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  tag: "M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Zm5-4.5h.01",
  cutout: "M12 3a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V7a4 4 0 0 0-4-4ZM5 21c.5-4 3.5-6.5 7-6.5s6.5 2.5 7 6.5M3 3h2m14 0h2M3 21v-2m18 2v-2M3 7v2m18-2v2",
  upload: "M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
  download: "M12 4v12m0 0-4-4m4 4 4-4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 2-4-4",
  sun: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  moon: "M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  check: "m5 12 5 5L20 7",
  chevron: "m9 6 6 6-6 6",
  "chevron-down": "m6 9 6 6 6-6",
  grip: "M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01",
  lock: "M6 11h12v9H6v-9Zm2 0V8a4 4 0 1 1 8 0v3",
  device: "M4 5h16v11H4V5Zm4 15h8m-4-4v4",
  free: "M5 13l4 4L19 7M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9c.5-4 3.5-6 7-6s6.5 2 7 6",
  arrow: "M5 12h14m0 0-5-5m5 5-5 5",
  up: "M12 19V5m0 0-5 5m5-5 5 5",
  down: "M12 5v14m0 0-5-5m5 5 5-5",
  warn: "M12 9v4m0 4h.01M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z",
  file: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5",
  mail: "M4 6h16v12H4V6Zm0 0 8 7 8-7",
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  size = 20,
  ...rest
}: { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
