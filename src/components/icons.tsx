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
  resize: "M4 14v6h6M20 10V4h-6M4 20l7-7M20 4l-7 7",
  crop: "M6 2v14a2 2 0 0 0 2 2h14M2 6h14a2 2 0 0 1 2 2v14",
  sign: "M3 17c3-1 4-8 6-8s0 7 2 7 3-4 4-4 1 3 3 3M3 21h18",
  calendar: "M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm-1 5h16M8 3v4m8-4v4",
  scale: "M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm3 6a6 6 0 0 1 8 0l-2.5 3a2 2 0 0 0-3 0L8 10Z",
  text: "M4 6h16M4 12h16M4 18h10",
  key: "M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-3 3v9m0-4h3m-3 2h2",
  case: "M3 18 7.5 6 12 18M4.7 14h5.6M17.5 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm3-6v6",
  unlock: "M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Zm2 0V7a4 4 0 0 1 7.5-2",
  shield: "M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4",
  info: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M12 12v5m0-8h.01",
  layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
  barcode: "M4 5v14M7 5v14M10 5v14M14 5v14M16 5v14M20 5v14",
  scan: "M4 8V5a1 1 0 0 1 1-1h3m8 0h3a1 1 0 0 1 1 1v3m0 8v3a1 1 0 0 1-1 1h-3m-8 0H5a1 1 0 0 1-1-1v-3M4 12h16",
  blur: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-4 9h.01M12 8h.01M12 12h.01M12 16h.01M16 12h.01",
  dropper: "m14 6 4 4M4 20l2-1 9.5-9.5-3-3L3 16l1 4Zm11.5-15.5 2-2a2.1 2.1 0 0 1 3 3l-2 2",
  type: "M5 6V4h14v2M12 4v16m-3 0h6",
  ocr: "M4 8V5a1 1 0 0 1 1-1h3m8 0h3a1 1 0 0 1 1 1v3m0 8v3a1 1 0 0 1-1 1h-3m-8 0H5a1 1 0 0 1-1-1v-3M8 9h8M8 12h8M8 15h5",
  tip: "M12 3v18M16 7.5C16 5.6 14.2 5 12 5s-4 .9-4 3 2 2.6 4 3 4 1 4 3-1.8 3-4 3-4-.6-4-2.5",
  cap: "m2 9 10-5 10 5-10 5L2 9Zm4 2v5c0 1.5 3 3 6 3s6-1.5 6-3v-5m4-2v6",
  ruler: "m3 17 14-14 4 4L7 21l-4-4Zm4-4 2 2m1-5 2 2m1-5 2 2",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z",
  braces: "M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1m8-18h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1",
  code: "m8 8-4 4 4 4m8-8 4 4-4 4m-6 2 4-12",
  paragraph: "M13 4v16m4-16v16M19 4H9.5a4.5 4.5 0 0 0 0 9H13",
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
