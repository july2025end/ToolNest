import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Image tools";

export default function Image() {
  return ogImage("Free online image tools", "Compress, convert and resize photos.");
}
