import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "PDF tools";

export default function Image() {
  return ogImage("Free online PDF tools", "Merge, split, compress, convert and edit PDFs.");
}
