import { site } from "@/site.config";
import { bgContent } from "./bg";
import { extraImageContent } from "./extra-image";
import { extraOtherContent } from "./extra-other";
import { extraMoreA } from "./extra-more-a";
import { extraMoreB } from "./extra-more-b";
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
  ...extraImageContent,
  ...extraOtherContent,
  ...extraMoreA,
  ...extraMoreB,
});

export const hubContent = brand(hubs);
export const legalContent = brand(legal);
