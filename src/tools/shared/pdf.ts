import type { PDFDocumentProxy } from "pdfjs-dist";

export const PDF_MAX = 100 * 1024 * 1024;
const V = "/vendor/pdfjs";

/** pdf.js, loaded on demand with its worker and assets served from our own origin. */
export async function pdfjs() {
  const lib = await import("pdfjs-dist");
  lib.GlobalWorkerOptions.workerSrc = `${V}/pdf.worker.min.mjs`;
  return lib;
}

export async function openForRender(bytes: ArrayBuffer): Promise<PDFDocumentProxy> {
  const lib = await pdfjs();
  try {
    return await lib.getDocument({
      data: new Uint8Array(bytes.slice(0)),
      cMapUrl: `${V}/cmaps/`,
      standardFontDataUrl: `${V}/standard_fonts/`,
      wasmUrl: `${V}/wasm/`,
      iccUrl: `${V}/iccs/`,
    }).promise;
  } catch (e) {
    throw friendly(e);
  }
}

/** pdf-lib document, with a clear message for encrypted or broken files. */
export async function openForEdit(bytes: ArrayBuffer) {
  const { PDFDocument } = await import("pdf-lib");
  try {
    const doc = await PDFDocument.load(bytes);
    // pdf-lib parses broken files leniently and only fails later; touch the page tree now
    // so a damaged file gets the friendly message instead of a raw JS error.
    if (doc.getPageCount() < 1) throw new Error("no pages");
    return doc;
  } catch (e) {
    throw friendly(e);
  }
}

function friendly(e: unknown) {
  const msg = e instanceof Error ? `${e.name} ${e.message}` : String(e);
  if (/encrypt|password/i.test(msg)) return new Error("This PDF is password-protected. Remove the password first, then try again.");
  return new Error("This file couldn't be read as a PDF. It may be damaged.");
}

/** Renders one page to a canvas at the given scale (1 = 72 dpi). */
export async function renderPage(doc: PDFDocumentProxy, pageNo: number, scale: number, white = true) {
  const page = await doc.getPage(pageNo);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const ctx = canvas.getContext("2d")!;
  if (white) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  await page.render({ canvas, canvasContext: ctx, viewport }).promise;
  page.cleanup();
  return canvas;
}

export const canvasBlob = (c: HTMLCanvasElement, type = "image/jpeg", q = 0.8) =>
  new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("Rendering failed. Try a lower quality."))), type, q));

/**
 * Parses "1-3, 5, 8-" into groups of 0-based page indexes. Throws a readable error.
 * Each comma-separated part is one group.
 */
export function parseRanges(input: string, pageCount: number): number[][] {
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
  if (!parts.length) throw new Error("Enter at least one page or range, like 1-3, 5.");
  return parts.map((part) => {
    const m = /^(\d+)?\s*(-)?\s*(\d+)?$/.exec(part);
    if (!m || (!m[1] && !m[3])) throw new Error(`"${part}" isn't a valid page or range.`);
    const a = m[1] ? +m[1] : 1;
    const b = m[2] ? (m[3] ? +m[3] : pageCount) : a;
    if (a < 1 || b > pageCount || a > b) throw new Error(`"${part}" is outside pages 1–${pageCount}.`);
    return Array.from({ length: b - a + 1 }, (_, i) => a - 1 + i);
  });
}

export const pdfBlob = (bytes: Uint8Array) => new Blob([bytes as BlobPart], { type: "application/pdf" });
