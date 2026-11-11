# Progress and final report

How to resume: read this file, `DECISIONS.md` and `DESIGN.md`. On the original build machine Node is at `~/.local/node/bin` (`export PATH=$HOME/.local/node/bin:$PATH`).

## Milestones
- [x] 1. Setup, DESIGN.md, layout/header/footer, home, theme, site.config, Supabase client + migrations, 3 subagents
- [x] 2. Image compressor/converter + 7 long-tail pages
- [x] 3. PDF toolkit (11 tools) + hub
- [x] 4. QR code generator (+ Wi-Fi page)
- [x] 5. Finance calculators (5) + hub
- [x] 6. Background remover
- [x] 7. About/Contact/Privacy/Terms/404, sitemap, robots, JSON-LD, OG images; SEO + security + designer reviews applied
- [x] 8. Browser tests at 360/390/1440 px, Lighthouse, fixes

## What was built
- **27 tool pages** from one static route, plus 2 hubs, home, About, Contact, Privacy, Terms, 404: 73 statically generated routes including OG images. `npm run build` passes with no type or lint errors.
- **Image**: quality slider, target size (20/50/100 KB tested: 19.8/47.9/96.8 KB), JPG/PNG/WebP conversion, HEIC decode (native or lazy wasm), resize by px/percent with aspect lock, batch of 20, ZIP, EXIF stripped.
- **PDF**: merge (drag + arrow reorder), split (ranges / every page / every N), extract, delete, organize with thumbnails, rotate, JPG→PDF (A4/Letter/fit, margins, orientation), PDF→JPG/PNG (72/150/300 DPI, ZIP), compress (basic / strong with a non-selectable-text warning), page numbers, text watermark.
- **QR**: 8 types, colours, size, margin, error correction, centre logo (forces H), live preview, PNG + SVG, low-contrast and inverted warnings, static only.
- **Calculators**: EMI with monthly/yearly amortization, compound interest with SVG chart, SIP/savings goal (both directions), percentage (3 modes), discount + tax/GST (inclusive/exclusive), 12 currencies via `Intl.NumberFormat`.
- **Background remover**: ormbg (Apache-2.0) via transformers.js in a Web Worker, download progress, transparent / colour / image background, before-after slider.
- **Supabase**: feedback + usage counts with RLS; everything degrades gracefully when not configured.

## Lighthouse (mobile preset, local production build)
Run on a 2-core ARM VM (Lighthouse CPU benchmark ≈ 1080, so simulated mobile throttling is harsher than on typical hardware).

| Page | Perf | A11y | Best practices | SEO | CLS |
|---|---|---|---|---|---|
| / | 85 | 100 | 100 | 100 | 0 |
| /pdf-tools | 92 | 100 | 100 | 100 | 0 |
| /calculators | 88 | 100 | 100 | 100 | 0 |
| /image-compressor | 93 | 100 | 100 | 100 | 0 |
| /qr-code-generator | 87 | 100 | 100 | 100 | 0 |
| /background-remover | 86 | 100 | 100 | 100 | 0 |
| /emi-calculator | 84 | 100 | 100 | 100 | 0 |

Desktop preset: home = 100. **The 95+ mobile Performance target is not met on this machine.** The remaining cost is Total Blocking Time (300–600 ms) from React/Next.js framework hydration (~185 KB gzipped JS, of which ~120 KB is framework). Already done: tool chunks split per page, heavy libraries lazy-loaded, one font, zero CLS, fewer hydrated links (image-compressor went 72 → 93). Re-measure with PageSpeed Insights after deploying on Vercel; if mobile is still under 95, next steps are trimming client components on home (search could load on focus) and the React Compiler.

## Subagent findings and fixes
The review agents ran as Sonnet agents following `.claude/agents/*.md` (see DECISIONS.md for why).

**SEO** (12 items): missing OG/Twitter images on legal/contact pages → added OG images there and a `pageMeta()` helper that sets explicit OG/Twitter images and `summary_large_image` everywhere. H1s missing keywords (merge, compress, JPG to PDF, organize) → rewritten. "About ToolNest | ToolNest" → "About Us". Uniform sitemap lastmod/priority → removed. Not done: raster logo, `/image-tools` hub (see DECISIONS).

**Security** (no critical/high; 15 items): jsDelivr trusted in CSP → ONNX Runtime self-hosted, CDN removed. Usage counts could be inflated/poisoned → direct insert revoked, slug allowlist in `track_tool_use`. Spoofable rate-limit IP → host headers. Limiter map reset → evicts oldest. No DB-side flood guard → trigger added. vCard `\r` injection → escaped. Added COOP, `frame-src 'none'`, `manifest-src`. `npm audit --omit=dev`: 0 vulnerabilities (8 moderate, dev-only ESLint chain; fix requires a breaking `--force`). Licenses: all runtime deps permissive except `heic-to` (LGPL-3.0, lazily loaded separate chunk); model weights Apache-2.0.

**Designer** (30 items): chips and label-buttons had no focus ring → `:has(:focus-visible)` rings. Control borders 1.3:1 → new `--control-border` token (3.8:1 light, 3.3:1 dark). Grey filler cells in tool grids → bordered rows. Chart text ~5 px on mobile and a 1.7:1 data colour → larger labels, `--muted` series. 1000 px footer on mobile → category links only. 36 px buttons → 44 px. Rotated thumbnails clipped → scaled. Non-functional buttons in organize mode → `role="img"`. Focus lost after reorder → refocus (merge). Silent completion → `role="status"` announcements in every file tool. Search re-read the whole list on every keystroke → count-only announcement, Escape clears. Three-card "why us" row → prose block. Active nav state, outside-click menu close, checkerboard from tokens, swatch pressed state, slider `aria-valuetext` and captions, QR fields kept when switching type, PNG error handling, empty `<aside>` landmark hidden, skip-link target focusable. Not done: full ARIA combobox for search, per-type field state in QR beyond keeping shared keys.

## Test bugs found and fixed (Playwright, real files)
- **Headings overlapped the text below** on every page: the type classes `h-1/h-2/h-3` collided with Tailwind's height utilities. Renamed to `type-h1/2/3`. Found from screenshots; a heading-overlap check was added to the test script.
- **React hydration error #418 on SIP/compound pages**: Intl compact currency output differs between Node and Chrome. Replaced with a deterministic formatter.
- Final run: **36/36 checks pass with no console errors**. Covered: every tool with generated JPG/PNG/WebP/PDF files at 390 and 1440 px, downloads verified (PDF page counts, target sizes, ZIPs), invalid-file errors, all 8 QR types, calculator results checked against hand-computed values, background removal end to end, dark mode persistence, skip link, menu Escape, and no horizontal scroll and exactly one H1 on all 35 URLs at 360/390/1440 px.

## Left / limited
- Mobile Lighthouse Performance 84–93 locally (target 95); see above.
- HEIC decoding is only exercised through the native path in tests (no HEIC fixture could be generated here); the wasm fallback is wired but untested.
- PDF watermark/page numbers support Latin text only (standard fonts); no PDF-to-Word (by design).
- Contact form rate limiting is per server instance; a durable limiter needs another service.
- Second full "designer" pass after SEO/security fixes was skipped to save budget. Visual checks were done with screenshots instead.
- Supabase was not connected in this environment, so the SQL migrations were reviewed but not executed against a live database.

## Skills used per milestone
The named skills (ponytail, ui-ux-pro-max, frontend-design, web-design-guidelines, webapp-testing, vercel-optimize, react-best-practices) are not installed in this environment. Their practices were applied by hand: M1 design system in DESIGN.md (ui-ux/frontend-design), lean code with no SDKs or chart/QR rendering libs (ponytail), all milestones followed React/Next practices (server components by default, per-tool dynamic chunks, lazy heavy libs), M7 guideline checks in the designer agent, M8 Playwright tests (webapp-testing) and Lighthouse-driven fixes (vercel-optimize). One Sonnet agent wrote the page copy (the "cheaper model for easy tasks" instruction), and three Sonnet agents did the reviews.

## Test pass 2 (2026-11-10)
A 40-check Playwright suite was run against the production build, using real files: JPG/PNG/WebP, a JPG with EXIF rotation, two real HEIC photos, PDFs (normal, a rotated page, an offset crop box, encrypted, corrupt) and bad inputs. Outputs were verified by opening them: PDF text and positions were read with pdf.js, QR PNGs were decoded with jsQR, and image sizes and ZIP contents were checked. The HEIC wasm fallback now passes (first real test). **40/40 pass.**

Bugs found and fixed:
- `npm run lint` failed (5 errors) because it linted the generated `public/vendor` files; that folder is now ignored.
- Target-size (KB), font size, start number and pages-per-file inputs clamped on every keystroke, so values like 30 KB or 24 pt couldn't be typed. These now use a shared `IntInput`, which clamps when the field loses focus.
- Page numbers and watermarks ignored a page's `/Rotate` value and crop-box origin, so they landed sideways or off-centre on rotated or cropped pages. They're now placed in the page's visible orientation (`pageView()` in `pdf-tool.tsx`).
- Merge PDF showed a raw JS error ("Cannot read properties of undefined") for a damaged PDF, because pdf-lib loads broken files leniently. `openForEdit` now checks the page tree straight away.
- QR: SVG logos were accepted but always failed ("couldn't be read"), because Chrome can't `createImageBitmap` an SVG. They now load through an `<img>`.
- Background remover: choosing a new photo while one was processing showed the first photo's cutout. Worker replies are now matched by request id.
- Percentage calculator: an empty field showed "The starting value can't be 0." It now shows "–".
