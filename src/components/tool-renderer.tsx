import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { Tool, ToolKind } from "@/lib/tools";

export type ToolProps = { slug: string; preset?: Tool["preset"] };

// Each tool is its own client chunk, so a page only downloads the tool it shows.
// Heavy libraries (pdf.js, pdf-lib, heic-to, transformers.js) are imported inside the tools on demand.
const pdf = (mode: string) => {
  const C = dynamic(() => import("@/tools/pdf/pdf-tool"));
  const Wrapped = (p: ToolProps) => <C {...p} mode={mode} />;
  return Wrapped;
};

const qpdf = (mode: "unlock" | "protect" | "flatten") => {
  const C = dynamic(() => import("@/tools/pdf/qpdf-tool"));
  const Wrapped = (p: ToolProps) => <C {...p} mode={mode} />;
  return Wrapped;
};

const registry: Record<ToolKind, ComponentType<ToolProps>> = {
  image: dynamic(() => import("@/tools/image/image-tool")),
  "pdf-merge": dynamic(() => import("@/tools/pdf/merge-tool")),
  "pdf-split": pdf("split"),
  "pdf-extract": pdf("extract"),
  "pdf-delete": pdf("delete"),
  "pdf-organize": pdf("organize"),
  "pdf-rotate": pdf("rotate"),
  "pdf-compress": pdf("compress"),
  "pdf-page-numbers": pdf("page-numbers"),
  "pdf-watermark": pdf("watermark"),
  "pdf-to-images": pdf("to-images"),
  "pdf-from-images": dynamic(() => import("@/tools/pdf/images-to-pdf")),
  qr: dynamic(() => import("@/tools/qr/qr-tool")),
  "calc-loan": dynamic(() => import("@/tools/finance/loan")),
  "calc-compound": dynamic(() => import("@/tools/finance/compound")),
  "calc-sip": dynamic(() => import("@/tools/finance/sip")),
  "calc-percentage": dynamic(() => import("@/tools/finance/percentage")),
  "calc-discount": dynamic(() => import("@/tools/finance/discount")),
  "bg-remove": dynamic(() => import("@/tools/bg/bg-tool")),
  "image-crop": dynamic(() => import("@/tools/image/crop-tool")),
  "pdf-sign": dynamic(() => import("@/tools/pdf/sign-tool")),
  "calc-age": dynamic(() => import("@/tools/finance/age")),
  "calc-bmi": dynamic(() => import("@/tools/finance/bmi")),
  "text-count": dynamic(() => import("@/tools/text/word-counter")),
  "text-case": dynamic(() => import("@/tools/text/case-converter")),
  "text-password": dynamic(() => import("@/tools/text/password")),
  "image-passport": dynamic(() => import("@/tools/image/passport-tool")),
  "image-redact": dynamic(() => import("@/tools/image/redact-tool")),
  "image-ocr": dynamic(() => import("@/tools/image/ocr-tool")),
  "image-colors": dynamic(() => import("@/tools/image/color-tool")),
  "image-text": dynamic(() => import("@/tools/image/text-tool")),
  "pdf-unlock": qpdf("unlock"),
  "pdf-protect": qpdf("protect"),
  "pdf-flatten": qpdf("flatten"),
  "pdf-metadata": dynamic(() => import("@/tools/pdf/metadata-tool")),
  barcode: dynamic(() => import("@/tools/qr/barcode-tool")),
  "qr-scan": dynamic(() => import("@/tools/qr/scan-tool")),
  "calc-tip": dynamic(() => import("@/tools/finance/tip")),
  "calc-gpa": dynamic(() => import("@/tools/finance/gpa")),
  "calc-units": dynamic(() => import("@/tools/finance/unit")),
  "calc-timezone": dynamic(() => import("@/tools/finance/timezone")),
  "text-json": dynamic(() => import("@/tools/text/json")),
  "text-base64": dynamic(() => import("@/tools/text/base64")),
  "text-lorem": dynamic(() => import("@/tools/text/lorem")),
};

export function ToolRenderer({ tool }: { tool: Tool }) {
  const C = registry[tool.kind];
  return <C slug={tool.slug} preset={tool.preset} />;
}
