# ToolNest

Free online tools (images, PDFs, QR codes, calculators, background removal) built with Next.js 16, TypeScript and Tailwind CSS 4. **All file processing happens in the visitor's browser**: nothing is uploaded.

Brand name, domain and tagline live in `src/site.config.ts`. Design rules are in `DESIGN.md`, decisions and licensing in `DECISIONS.md`, and build status in `PROGRESS.md`.

## Run locally

Requires Node.js 20.9+ (22 LTS recommended).

```bash
npm install          # also copies pdf.js + ONNX Runtime assets into public/vendor
npm run dev          # http://localhost:3000
npm run build && npm start   # production build
npm run typecheck && npm run lint
```

Supabase is optional. Without it, every tool works, the contact form shows a friendly "not connected yet" message, and usage counting is skipped.

## Connect Supabase (contact form + popular tools)

1. Create a project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run the files in `supabase/migrations/` **in order** (`…_init.sql`, then `…_harden.sql`). Or use the CLI: `supabase link` then `supabase db push`.
   - RLS is on for both tables. The public (anon) role can only insert feedback and call two functions: `track_tool_use(slug)` (increments today's count for a known tool) and `popular_tools()` (aggregated counts only). It can't read, update or delete rows.
   - If you add a tool, add its slug to the allowlist in `track_tool_use` (in a new migration).
3. Copy `.env.example` to `.env.local` and fill in **Project Settings → API**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
   Use the **anon** key only. Never put the `service_role` key in this project.
4. These variables must be set **at build time**: the Supabase URL is written into the Content-Security-Policy when you build.
5. Read feedback in the Supabase dashboard (Table editor → `feedback`).

## Deploy to Vercel

1. Push this repo to GitHub/GitLab and import it at [vercel.com/new](https://vercel.com/new). The framework (Next.js) is detected automatically.
2. Add the two `NEXT_PUBLIC_SUPABASE_*` variables in **Settings → Environment Variables** (optional), then deploy.
3. Set your real domain in `src/site.config.ts` (`url`). Canonicals, sitemap, robots, OG images and JSON-LD all derive from it. Redeploy.
4. After launch: submit `https://your-domain/sitemap.xml` in Google Search Console, then run PageSpeed Insights.

The build is fully static (plus hourly ISR for the home page's popular tools), so it fits the free Hobby tier.

## Adding AdSense later

Fixed-size empty slots are already reserved (`src/components/ad-slot.tsx`: a 728×90 / 320×100 banner below each tool and a 300×600 sticky sidebar on desktop), so ads won't shift the layout. When you add ad code, also extend the CSP in `next.config.ts` (`script-src`, `img-src`, `frame-src`, `connect-src`) for Google's domains, and add a consent banner where required.

## Project map

```
src/site.config.ts          brand + domain
src/lib/tools.ts            tool registry (slugs, categories, related links)
src/content/*.ts            page copy: guides, FAQs, legal text
src/app/[slug]/page.tsx     every tool and long-tail page (static)
src/tools/**                tool UIs (each its own lazily loaded chunk)
src/components/**           layout, page templates, JSON-LD, icons
supabase/migrations/        SQL with RLS
.claude/agents/             designer, seo, security review subagents
```
