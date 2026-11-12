/* qpdf in a worker: unlock (decrypt), protect (encrypt) or flatten a PDF without blocking the page.
   Message in:  { id, bytes: ArrayBuffer, args: string[] }  (args use /in.pdf and /out.pdf)
   Message out: { id, bytes } or { id, error } */
importScripts("/vendor/qpdf/qpdf.js");

let log = [];
// A fresh instance per job: qpdf calls exit(), after which an Emscripten runtime can't be reused.
const load = () =>
  Module({
    locateFile: () => "/vendor/qpdf/qpdf.wasm",
    noInitialRun: true,
    print: (t) => log.push(t),
    printErr: (t) => log.push(t),
  });

self.onmessage = async ({ data: { id, bytes, args } }) => {
  try {
    log = [];
    const q = await load();
    q.FS.writeFile("/in.pdf", new Uint8Array(bytes));
    let code = 0;
    try {
      code = q.callMain(args);
    } catch (e) {
      // Emscripten throws on exit(); the status is on the exception.
      code = typeof e?.status === "number" ? e.status : 2;
    }
    // qpdf exit 3 = success with warnings.
    if (code !== 0 && code !== 3) return self.postMessage({ id, code, error: log.join("\n") || `qpdf exited with ${code}` });
    const out = q.FS.readFile("/out.pdf");
    self.postMessage({ id, bytes: out.buffer }, [out.buffer]);
  } catch (e) {
    self.postMessage({ id, error: String(e?.message ?? e) });
  }
};
