import { extOf } from "../shared/files";

export type OutFormat = "keep" | "image/jpeg" | "image/png" | "image/webp";

export type ImageOptions = {
  format: OutFormat;
  mode: "quality" | "target";
  quality: number; // 0.05–1
  targetKB: number;
  resize: "none" | "size" | "percent";
  width: number | null;
  height: number | null;
  lock: boolean;
  percent: number;
};

const isHeic = (f: File) => /^(heic|heif)$/.test(extOf(f.name)) || /heic|heif/.test(f.type);

/** Decodes any supported file to an ImageBitmap (EXIF orientation applied). HEIC falls back to a wasm decoder. */
export async function decode(file: File): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch (e) {
    if (!isHeic(file)) throw new Error("This image couldn't be read. It may be damaged or in an unsupported format.", { cause: e });
  }
  const { heicTo } = await import("heic-to/csp");
  return heicTo({ blob: file, type: "bitmap" });
}

export function outType(file: File, f: OutFormat, mode: ImageOptions["mode"]): "image/jpeg" | "image/png" | "image/webp" {
  if (f !== "keep") {
    // PNG is lossless, so a byte target needs a lossy format.
    return mode === "target" && f === "image/png" ? "image/jpeg" : f;
  }
  const t = file.type;
  if (t === "image/png") return mode === "target" ? "image/jpeg" : "image/png";
  if (t === "image/webp") return "image/webp";
  return "image/jpeg"; // jpg, heic and anything else
}

export function targetSize(w: number, h: number, o: ImageOptions) {
  if (o.resize === "percent") {
    const k = Math.max(1, Math.min(400, o.percent)) / 100;
    return { w: Math.max(1, Math.round(w * k)), h: Math.max(1, Math.round(h * k)) };
  }
  if (o.resize === "size" && (o.width || o.height)) {
    const W = o.width ?? 0;
    const H = o.height ?? 0;
    if (!o.lock && W && H) return { w: W, h: H };
    const k = Math.min(W ? W / w : Infinity, H ? H / h : Infinity);
    return { w: Math.max(1, Math.round(w * k)), h: Math.max(1, Math.round(h * k)) };
  }
  return { w, h };
}

function draw(img: ImageBitmap, w: number, h: number, type: string) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  if (type === "image/jpeg") {
    ctx.fillStyle = "#fff"; // JPEG has no transparency
    ctx.fillRect(0, 0, w, h);
  }
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, w, h);
  return c;
}

const encode = (c: HTMLCanvasElement, type: string, q?: number) =>
  new Promise<Blob>((res, rej) =>
    c.toBlob((b) => {
      if (!b) return rej(new Error("Encoding failed. The image may be too large for this device."));
      // Safari can't encode WebP and silently returns a PNG instead.
      if (b.type !== type) return rej(new Error("This browser can't save WebP images (Safari doesn't support it yet). Choose JPG or PNG, or use Chrome, Edge or Firefox."));
      res(b);
    }, type, q),
  );

/** Re-encodes the image. Re-encoding through canvas drops EXIF/GPS metadata. */
export async function processImage(file: File, o: ImageOptions) {
  const img = await decode(file);
  const type = outType(file, o.format, o.mode);
  let { w, h } = targetSize(img.width, img.height, o);
  if (w * h > 50e6) throw new Error("The output would be over 50 megapixels. Choose a smaller size.");

  if (o.mode === "quality") {
    const blob = await encode(draw(img, w, h, type), type, type === "image/png" ? undefined : o.quality);
    img.close();
    return { blob, type, w, h };
  }

  // Target size: binary-search quality; if even low quality is too big, scale down and retry.
  const target = o.targetKB * 1024;
  let best: Blob | null = null;
  for (let round = 0; round < 8; round++) {
    const canvas = draw(img, w, h, type);
    let lo = 0.05;
    let hi = 0.95;
    let fit: Blob | null = null;
    for (let i = 0; i < 7; i++) {
      const q = (lo + hi) / 2;
      const b = await encode(canvas, type, q);
      if (b.size <= target) {
        fit = b;
        lo = q;
      } else hi = q;
    }
    if (!fit) {
      const b = await encode(canvas, type, 0.05);
      if (b.size <= target) fit = b;
    }
    if (fit) {
      best = fit;
      break;
    }
    const smallest = await encode(canvas, type, 0.05);
    const k = Math.max(0.3, Math.min(0.9, Math.sqrt(target / smallest.size) * 0.95));
    w = Math.max(16, Math.round(w * k));
    h = Math.max(16, Math.round(h * k));
  }
  img.close();
  if (!best) throw new Error(`Couldn't reach ${o.targetKB} KB without making the image unusably small.`);
  return { blob: best, type, w, h };
}

export const extFor = (type: string) => (type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg");
