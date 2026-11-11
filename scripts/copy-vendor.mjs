// Copies pdf.js and ONNX Runtime assets to public/ so they're served
// from our own origin (CSP 'self'). Runs on postinstall and before dev/build.
import { cpSync, mkdirSync } from "node:fs";

const src = "node_modules/pdfjs-dist";
const dest = "public/vendor/pdfjs";
mkdirSync(dest, { recursive: true });
cpSync(`${src}/build/pdf.worker.min.mjs`, `${dest}/pdf.worker.min.mjs`);
for (const dir of ["cmaps", "standard_fonts", "wasm", "iccs"]) {
  cpSync(`${src}/${dir}`, `${dest}/${dir}`, { recursive: true });
}
// ONNX Runtime (background remover), same-origin so the CSP doesn't need a CDN.
const ort = "public/vendor/ort";
mkdirSync(ort, { recursive: true });
for (const f of ["ort-wasm-simd-threaded.mjs", "ort-wasm-simd-threaded.wasm"]) {
  cpSync(`node_modules/onnxruntime-web/dist/${f}`, `${ort}/${f}`);
}
console.log("vendor assets copied to public/vendor");
