# Decisions

Choices made without asking, and why. Newest at the bottom of each section.

## Environment and process
- **Node**: the machine had no Node.js. Node 22 LTS was unpacked to `~/.local/node` (PATH set per command; shell profile not modified).
- **Next.js 16.4 (latest stable)** from `create-next-app`. The scaffold enabled `cacheComponents` and `partialPrefetching`; both were removed to keep the classic, fully static model (SSG + ISR on the home page), which is all this site needs.
- **Skills named in the brief** (ponytail, ui-ux-pro-max, frontend-design, web-design-guidelines, webapp-testing, vercel-optimize, react-best-practices) are **not installed** in this environment. Their intent was applied manually: lean code/no extra deps (ponytail), a written design system (DESIGN.md), WCAG/interface guidelines folded into the `designer` subagent's checklist, Playwright + Lighthouse run directly for testing/performance.
- **"Use muse for easy tasks"**: no model called "muse" exists. Interpreted as "use a cheaper model for easy work": the long-form SEO copy (guides, FAQs, legal text) was delegated to one Sonnet agent while the tools were built in parallel. The three review subagents use `model: sonnet` as specified.

## Architecture
- **One dynamic route** `src/app/[slug]/page.tsx` with `generateStaticParams` + `dynamicParams = false` renders every tool and long-tail page from the registry in `src/lib/tools.ts` and copy in `src/content/`. Each tool UI is a separate `next/dynamic` chunk, so a page loads only its own tool.
- **Long-tail PDF and calculator URLs are the tool pages themselves** (`/merge-pdf`, `/emi-calculator`, ...), with hubs at `/pdf-tools` and `/calculators`. This avoids two near-duplicate pages per tool.
- **Extra PDF pages**: `/extract-pdf-pages`, `/delete-pdf-pages`, `/organize-pdf`, `/add-page-numbers-to-pdf`, `/watermark-pdf` (one page per PDF tool, as required). Savings goal/SIP is `/sip-calculator`; discount and tax/GST is `/discount-calculator`.
- **Brand** lives in `src/site.config.ts`. Copy is written with "ToolNest" and replaced at build time if the name changes (`src/content/index.ts`).
- **No Supabase SDK**: two `fetch` calls to PostgREST replace `@supabase/supabase-js` (smaller bundle, nothing to configure).
- **Fonts**: one family (Figtree) via `next/font`.

## Tools
- **ZIP**: `fflate` (MIT, ~8 KB used) instead of JSZip.
- **HEIC**: native `createImageBitmap` first (Safari decodes HEIC natively); otherwise `heic-to/csp` (libheif compiled to wasm) loads on demand. `heic-to` is **LGPL-3.0**. It is shipped unmodified as a separate, lazily loaded chunk, which keeps it replaceable, and it is credited in the Terms. `heic2any` (MIT label) was rejected: it bundles the same LGPL libheif, is unmaintained since 2021, and needs `unsafe-eval`.
- **Image target-size mode**: binary search on quality (7 steps), then downscale and retry if even the lowest quality is too big. PNG can't hit a byte target (lossless), so that mode outputs JPG and says so.
- **EXIF**: every output is re-encoded via canvas, which drops all metadata (GPS included). Orientation is applied first.
- **PDF**: pdf-lib (MIT) edits; pdf.js (Apache-2.0) renders. pdf.js worker, fonts, cmaps and wasm are copied to `public/vendor/pdfjs` by `scripts/copy-vendor.mjs` so they're same-origin.
- **PDF to Word is skipped**: faithful layout reconstruction isn't feasible in the browser; a poor result would hurt trust and SEO.
- **Encrypted PDFs** are rejected with a clear message (pdf-lib can't decrypt).
- **Watermark/page numbers** use the built-in Helvetica (WinAnsi), so non-Latin watermark text is rejected with a message. Embedding a Unicode font would add fontkit plus a large font file.
- **Compress PDF "basic"** re-saves with object streams (often small gains). "Strong" re-renders pages as JPEG, with a clear warning that text stops being selectable.
- **QR**: `qrcode-generator` (MIT) gives the module matrix; SVG/PNG are drawn by our code. Input is UTF-8 encoded first (the library defaults to Latin-1). Uploaded logos are re-encoded through canvas to PNG before they're embedded, so no user SVG markup ends up in the output.
- **Charts**: hand-written SVG bars (no chart library).
- **Calculators**: SIP uses the common "invest at start of month, rate/12" convention. Compound interest simulates monthly with the effective monthly rate for the chosen compounding frequency; contributions are added at month end.

## Background remover: library and model licensing
| Option | License | Verdict |
|---|---|---|
| `@imgly/background-removal` | AGPL-3.0 | Rejected (AGPL) |
| briaai RMBG-1.4 / 2.0 | Bria non-commercial ("other") | Rejected |
| ISNet (onnx-community/ISNet-ONNX) | AGPL-3.0 | Rejected |
| Xenova/modnet | Apache-2.0 | Portrait-only, so weak on products/pets |
| BiRefNet_lite | MIT | Good, but 115 MB+ (fp16) |
| **onnx-community/ormbg-ONNX** | **Apache-2.0** | **Chosen**: general objects, 44 MB quantized (q8) |

- Library: `@huggingface/transformers` (Apache-2.0) with `onnxruntime-web` (MIT), run in a **Web Worker** so the UI stays responsive.
- The model downloads from huggingface.co on first use and is cached by the browser (huggingface.co is in `connect-src`). The ONNX Runtime wasm is **self-hosted** in `public/vendor/ort` (copied by `scripts/copy-vendor.mjs`), so no CDN is trusted in the CSP. The images themselves never leave the device.
- Runs on WASM (CPU) with the q8 model for broad compatibility. WebGPU would be faster but needs the larger fp16 weights and isn't available everywhere.
- Limits: fine hair and low-contrast edges can be imperfect; inputs are downscaled to 2048 px on the long side; slow on old phones.

## Supabase and security
- RLS on both tables. anon has `INSERT` only. Usage counts are incremented by a `SECURITY DEFINER` function (`track_tool_use`) that validates the slug and pins `search_path`, because an upsert would otherwise need `UPDATE`.
- **"Popular tools" needs to read counts** while the public must never read tables. The `popular_tools()` function returns only aggregated `(slug, total)` for the last 30 days; no row access is granted. The home page reads it server-side with ISR (hourly) and falls back to a static list.
- Usage is counted at most once per tool per browser session, and only after a successful result.
- **CSP without nonces**: pages are statically generated, and nonces would force dynamic rendering, so `script-src` allows `'unsafe-inline'` (the documented Next.js approach for static sites). `'wasm-unsafe-eval'` is allowed for WebAssembly; JS `eval` isn't (except in `next dev`).
- **Rate limiting** for the contact form is in-memory per server instance (3 per 10 minutes per IP), plus a honeypot and a minimum fill time. On serverless that's a speed bump only; a durable limiter (e.g. Upstash, or a Postgres check) is a later improvement.

## After reviews (milestone 7)
- **Review subagents**: the agents in `.claude/agents/` are only picked up when Claude Code starts in this project folder. This session started in the parent folder, so each review ran as a Sonnet agent following its definition file word for word.
- **Heading classes** were renamed from `h-1/h-2/h-3` to `type-h1/2/3`: the old names collided with Tailwind's height utilities and squashed headings (found in screenshot review, missed by automated checks).
- **Compact currency labels** on charts are formatted by hand: Intl `notation: "compact"` gives different output in Node and Chrome, which caused a hydration error.
- **Footer and tool lists use plain `<a>`** instead of `next/link`, to avoid hydrating ~80 link components on mobile (TBT). The "All tools" menu renders its links only when open.
- **Number inputs** in calculators are `type="text" inputMode="decimal"` (no scroll-wheel changes, still a numeric keyboard).
- **Usage counts**: direct inserts into `tool_usage` are revoked; only `track_tool_use()` with a slug allowlist can write. A trigger caps feedback at 30 per 10 minutes database-wide, as a flood backstop for direct PostgREST calls.
- **Rate-limit IP** comes from `x-vercel-forwarded-for` / `x-real-ip` (set by the host) rather than the spoofable left-most `x-forwarded-for`.
- Not done (with reasons): hash-based CSP via experimental SRI (experimental, risk of breaking hydration); a durable rate limiter (needs another service); an `/image-tools` hub (image tools share one component and `/image-compressor` acts as the hub); a raster Organization logo; a full ARIA combobox for the home search (it announces result counts and supports Enter/Escape).
