# ToolNest design system

Direction: Apple-inspired. Light grey canvas with white surfaces, near-black type, one blue accent, big confident headlines, generous space, soft shadows instead of borders on cards, frosted sticky header. Every tool page uses the same skeleton, so users learn it once.

## Colour (CSS variables in `src/app/globals.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f5f5f7` | `#000000` | Page background |
| `--surface` | `#ffffff` | `#1c1c1e` | Cards, tool panel, inputs |
| `--surface-2` | `#f0f0f3` | `#2c2c2e` | Subtle fills, drop zone, hover |
| `--border` | `#e3e3e8` | `#2f2f32` | Hairlines |
| `--border-strong` | `#c7c7cc` | `#48484a` | Input and chip borders |
| `--text` | `#1d1d1f` | `#f5f5f7` | Body and headings |
| `--muted` | `#6e6e73` | `#a1a1a6` | Secondary text (AA on bg and surface) |
| `--accent` | `#0071e3` | `#2997ff` | The one accent: primary buttons, links, focus, active states |
| `--accent-fg` | `#ffffff` | `#000000` | Text on accent |
| `--accent-soft` | `#e8f1fc` | `#0b2a4a` | Icon badges, selected chips, step numbers |
| `--danger` | `#d70015` | `#ff6961` | Errors |
| `--warn` | `#a35200` | `#ffb340` | Warnings |

Rules: exactly one accent colour. No gradients, no glows. Status colours appear only in messages.

## Type
System font stack (SF Pro on Apple devices, Segoe UI / Roboto elsewhere), letter-spacing -0.011em on body. No web font download. Tabular numbers on all figures.

| Step | Size / line-height | Weight | Use |
|---|---|---|---|
| display | 4rem / 1.06 (2.5rem mobile) | 600, tracking -0.03em | Home H1, centred |
| h1 | 2.75rem / 1.1 (2rem mobile) | 600, tracking -0.025em | Page H1 |
| h2 | 1.75rem / 1.25 | 600, tracking -0.02em | Section titles |
| h3 | 1.0625rem / 1.4 | 600 | Sub-sections, card titles |
| body | 1rem / 1.6 | 400 | Text; prose max 68ch |
| small | 0.875rem / 1.5 | 400–500 | Labels, meta, helper text |
| eyebrow | 0.8125rem | 600, sentence case, muted | Panel section labels. Never uppercase. |

## Spacing
4px base. Page gutter 16px mobile, 24px tablet, container max 1120px.

## Radius and depth
Radius: 10px (inputs), 14px (cards, tiles), 22px (tool panel, feature band), full pill (buttons, chips, search). Depth: `--shadow-card` on cards and panels, `--shadow-lift` on hover and popovers. Header and tools menu use `.glass` (translucent + 20px backdrop blur).

## Components
- **Button**: 44px min height, pill, 500 weight, presses to 98% scale. Primary = accent fill. Secondary = surface + border. Ghost = text only.
- **Input / select**: 44px, 10px radius, `--border-strong` border, accent border and focus ring on focus.
- **Search (home)**: 56px pill, white, shadow, no border.
- **Tool tile** (`.tile`): white card, icon in a 44px `.icon-badge` (accent-soft square), name, one line, chevron. Lifts 2px with `--shadow-lift` on hover.
- **Tool panel**: surface card, 22px radius. Order is always input → options → result → download.
- **Steps / FAQ**: white cards; step numbers in accent-soft circles.
- **Notes**: left 3px rule in accent (info) or warn colour.
- **Ad slots**: fixed-size empty boxes. Dashed border only in development.

## Icons
Custom inline SVG, 24×24 grid, 1.75px stroke, round caps and joins, `currentColor`, no fills. Defined in `src/components/icons.tsx`. No emoji.

## Motion
200ms ease transitions on colour, border, shadow and transform (tile lift, button press). No entrance animations. `prefers-reduced-motion: reduce` disables transitions and smooth scrolling.

## Avoid (no-AI-look)
Purple/blue gradient heroes, glowing blobs, "NEW"/"AI-powered" badges, emoji icons, italic serif words inside bold headlines, stock illustrations, identical three-card feature rows.
