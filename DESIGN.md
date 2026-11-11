# ToolNest design system

Direction: a calm, paper-like utility site. It should feel like a well-made instrument, not a landing page. Neutral warm greys, one green accent, strong type hierarchy, generous white space, borders instead of shadows. Every tool page uses the same skeleton, so users learn it once.

## Colour (CSS variables in `src/app/globals.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#fafaf7` | `#121311` | Page background |
| `--surface` | `#ffffff` | `#1a1b19` | Cards, tool panel, inputs |
| `--surface-2` | `#f2f2ed` | `#222320` | Subtle fills, table stripes, drop zone |
| `--border` | `#e2e1da` | `#30312d` | Hairlines, input borders |
| `--border-strong` | `#c9c8bf` | `#4a4b46` | Hover borders, dividers in tools |
| `--text` | `#1b1c1a` | `#ecece7` | Body and headings |
| `--muted` | `#5c5d56` | `#a6a69d` | Secondary text (AA on bg and surface) |
| `--accent` | `#24674a` | `#7cc9a0` | The one accent: primary buttons, links, focus, active states |
| `--accent-fg` | `#ffffff` | `#0f1a14` | Text on accent |
| `--accent-soft` | `#e6f0ea` | `#1d2c24` | Selected chips, info notes |
| `--danger` | `#a63a2b` | `#f08a7a` | Errors |
| `--warn` | `#8a5a00` | `#e7b75a` | Warnings |

Rules: exactly one accent colour. No gradients, no glows, no tinted hero backgrounds. Status colours appear only in messages.

## Type
One family: **Figtree** via `next/font` (variable). Tabular numbers (`font-variant-numeric: tabular-nums`) on all figures.

| Step | Size / line-height | Weight | Use |
|---|---|---|---|
| display | 2.5rem / 1.1 (mobile 2rem) | 700, tracking -0.02em | Home H1 |
| h1 | 2rem / 1.15 (mobile 1.625rem) | 700, tracking -0.015em | Page H1 |
| h2 | 1.375rem / 1.3 | 650 | Section titles |
| h3 | 1.0625rem / 1.4 | 600 | Sub-sections, card titles |
| body | 1rem / 1.65 | 400 | Text; prose max 68ch |
| small | 0.875rem / 1.5 | 400–500 | Labels, meta, helper text |
| micro | 0.75rem / 1.4 | 600, uppercase, tracking 0.06em | Eyebrows, category labels |

## Spacing
4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96. Section gaps 64px desktop / 48px mobile. Page gutter 16px mobile, 24px tablet, container max 1120px.

## Radius and depth
Radius: 6px (inputs, chips), 10px (buttons, cards), 14px (tool panel). Depth: 1px borders. One shadow only, for popovers/menus: `0 8px 24px -12px rgb(0 0 0 / .25)`.

## Components
- **Button**: 44px min height, 10px radius, 600 weight. Primary = accent fill. Secondary = surface + border. Ghost = text only. Disabled = 50% opacity.
- **Input / select**: 44px height, surface fill, 1px border, focus ring = 2px accent outline offset 2px.
- **Focus**: every interactive element shows `outline: 2px solid var(--accent); outline-offset: 2px` on `:focus-visible`.
- **Drop zone**: dashed 1.5px `--border-strong` on `--surface-2`, accent border while dragging. States: idle, drag-over, error.
- **Tool panel**: surface card, 14px radius. Order is always input → options → result → download.
- **Result row**: file name, before → after size, % saved in accent, download button on the right.
- **Category tile** (home): plain bordered rows with an icon, name and one-line description, grouped by category in columns. Not identical three-card rows.
- **Notes**: left 3px rule in accent (info) or warn colour, no background boxes.
- **Ad slots**: fixed-size empty boxes (`728×90` / `320×100` mobile below the tool, `300×600` sticky in the desktop sidebar). Dashed border only in development.

## Icons
Custom inline SVG, 24×24 grid, 1.75px stroke, round caps and joins, `currentColor`, no fills. Defined in `src/components/icons.tsx`. No emoji.

## Motion
150ms ease-out colour/border transitions only. No entrance animations. `prefers-reduced-motion: reduce` disables transitions and smooth scrolling.

## Avoid (no-AI-look)
Purple/blue gradient heroes, glowing blobs, "NEW"/"AI-powered" badges, emoji icons, italic serif words inside bold headlines, stock illustrations, identical three-card feature rows.
