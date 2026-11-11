import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Calculators";

export default function Image() {
  return ogImage("Free online calculators", "Loans, compound interest, savings, percentages and tax.");
}
