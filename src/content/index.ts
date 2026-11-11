import { site } from "@/site.config";
import { bgContent } from "./bg";
import { financeContent } from "./finance";
import { hubContent as hubs } from "./hubs";
import { imageContent } from "./image";
import { legalContent as legal } from "./legal";
import { pdfContent } from "./pdf";
import { qrContent } from "./qr";
import type { PageContent } from "./types";

// Copy is written with the placeholder brand; swap in the configured name everywhere.
const brand = <T,>(x: T): T => (site.name === "ToolNest" ? x : JSON.parse(JSON.stringify(x).replaceAll("ToolNest", site.name)));

export const toolContent: Record<string, PageContent> = brand({
  ...imageContent,
  ...pdfContent,
  ...qrContent,
  ...financeContent,
  ...bgContent,
});

export const hubContent = brand(hubs);
export const legalContent = brand(legal);
