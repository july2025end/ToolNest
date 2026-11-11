import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/site.config";

export const alt = `${site.name}: ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Free tools that never upload your files", "Images, PDFs, QR codes and calculators, all in your browser.");
}
