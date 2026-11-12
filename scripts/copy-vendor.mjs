// Copies pdf.js and ONNX Runtime assets to public/ so they're served
// from our own origin (CSP 'self'). Runs on postinstall and before dev/build.
import { cpSync, mkdirSync, readdirSync } from "node:fs";

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
// Tesseract OCR: worker, wasm cores and English data (fast/"best_int", ~3 MB), same-origin for the CSP.
const tess = "public/vendor/tesseract";
mkdirSync(tess, { recursive: true });
cpSync("node_modules/tesseract.js/dist/worker.min.js", `${tess}/worker.min.js`);
for (const f of readdirSync("node_modules/tesseract.js-core")) if (/^tesseract-core.*lstm\.wasm\.js$/.test(f)) cpSync(`node_modules/tesseract.js-core/${f}`, `${tess}/${f}`);
cpSync("node_modules/@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz", `${tess}/eng.traineddata.gz`);
// qpdf (unlock / protect / flatten PDF), loaded inside public/qpdf.worker.js.
const qpdf = "public/vendor/qpdf";
mkdirSync(qpdf, { recursive: true });
for (const f of ["qpdf.js", "qpdf.wasm"]) cpSync(`node_modules/@neslinesli93/qpdf-wasm/dist/${f}`, `${qpdf}/${f}`);
console.log("vendor assets copied to public/vendor");
