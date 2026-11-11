/// <reference lib="webworker" />
// Runs the background-removal model off the main thread so the page stays responsive.
import { env, pipeline, RawImage } from "@huggingface/transformers";

// Model: onnx-community/ormbg-ONNX (Apache-2.0). See DECISIONS.md for licensing.
const MODEL = "onnx-community/ormbg-ONNX";
env.allowLocalModels = false;
// Self-hosted ONNX Runtime wasm (copied by scripts/copy-vendor.mjs).
const onnx = env.backends.onnx as { wasm?: { wasmPaths?: unknown } };
if (onnx.wasm) {
  onnx.wasm.wasmPaths = { mjs: "/vendor/ort/ort-wasm-simd-threaded.mjs", wasm: "/vendor/ort/ort-wasm-simd-threaded.wasm" };
}

type Segmenter = (img: RawImage) => Promise<RawImage>;
let seg: Promise<Segmenter> | null = null;

const load = () =>
  (seg ??= pipeline("background-removal", MODEL, {
    dtype: "q8",
    device: "wasm",
    progress_callback: (p: { status: string; progress?: number; loaded?: number; total?: number }) => {
      if (p.status === "progress_total") self.postMessage({ type: "progress", progress: (p.progress ?? 0) / 100, loaded: p.loaded, total: p.total });
    },
  }) as unknown as Promise<Segmenter>);

self.onmessage = async (e: MessageEvent<{ id: number; blob: Blob }>) => {
  const { id, blob } = e.data;
  try {
    const s = await load();
    self.postMessage({ type: "ready", id });
    const out = await s(await RawImage.fromBlob(blob));
    const rgba = out.rgba();
    const data = new Uint8ClampedArray(rgba.data);
    self.postMessage({ type: "result", id, width: out.width, height: out.height, data }, [data.buffer]);
  } catch (err) {
    seg = null;
    self.postMessage({ type: "error", id, message: err instanceof Error ? err.message : String(err) });
  }
};
