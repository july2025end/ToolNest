import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/site.config";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Privacy policy";

export default function Image() {
  return ogImage("Privacy policy".replace("ToolNest", site.name), "Free tools that run in your browser. Your files never leave your device.");
}
