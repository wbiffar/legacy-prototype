# Memory

A running log of corrections and learned preferences. Updated automatically when mistakes are made and corrected.

## Format
Each entry should include:
- **Date** of correction
- **What went wrong**
- **What to do instead**

---

## Session Start Checklist
- Read `memory.md` first
- Read `design-system.md` second
- Pull Figma node before writing any code
- Never use raw hex — always map through design-system.md tokens

---

## 2026-03-13 — 911 Memorial Prototype

### Wikimedia hotlinks break in local/prototype files
- **What went wrong:** Used a Wikimedia Commons URL for the American Red Cross logo. It rendered broken because Wikimedia blocks hotlinking from `file://` origins and unlisted domains.
- **What to do instead:** Always use inline SVGs or self-hosted assets for logos and icons in prototypes. Never rely on Wikimedia/Wikipedia image URLs.

---

### `position:sticky` requires `align-self:flex-start`
- **What went wrong:** Applied `position:sticky` to a sidebar without `align-self:flex-start`. The sidebar didn't stick because its height matched the parent flex container.
- **What to do instead:** Always pair `position:sticky` + `top:Npx` with `align-self:flex-start` on the sticky element so it doesn't stretch to fill the parent.

---

### Pull Figma before building — always
- **What went wrong:** Built filter sidebar and CTA section without first pulling the Figma node. Had to redo both to match exact tokens, copy, and layout.
- **What to do instead:** Always call `get_design_context` with the Figma node ID before writing any code. Tokens, copy, spacing, and component structure come from Figma — not assumptions.

---

### Don't use raw hex values — use design tokens
- **What went wrong:** Used `#afadaa` and `#ffffff` for text and borders instead of mapped tokens.
- **What to do instead:** Always reference the token map in `design-system.md`. e.g. `#b0c0d6` = `navy/300`, `#c49e54` = `gold/600`, `#e2ba60` = `gold/400`, `#262116` = `warmBlack/900`.

---

### Publishing workflow
- **Preference:** User says "publish" → run `git add`, `git commit` (with descriptive message), `git push origin main`. No need to ask for confirmation or open a terminal. Handle it fully.

---

### replace_all pitfall
- **What went wrong:** Used `replace_all: false` when a string appeared more than once in the file, causing an edit failure ("2 matches found").
- **What to do instead:** When the same string appears in multiple places (e.g. repeated sidebar blocks for Memorials and Memories tabs), use `replace_all: true`.

---

## 2026-03-19 — Newspaper Listing Page

### Always read CLAUDE.md, design-system.md, memory.md first — even in Cowork
- **What went wrong:** In a Cowork session, used arbitrary hex values (#E74C3C, #27AE60, #F39C12, #1B4F72) for a Word document instead of referencing the design system. Also scraped colors from the live site CSS instead of reading design-system.md.
- **What to do instead:** At the start of every session — including Cowork — mount the claude-code-projects folder and read CLAUDE.md → design-system.md → memory.md before doing any work. All colors must map to design tokens: navy/700, coral/600, seaFoam/500, gold/500, warmBlack/300, etc.

---

### Four breakpoints, not three
- **What went wrong:** Stated the design system uses 3 breakpoints (375px, 768px, 1280px). Confused the CLAUDE.md testing widths with the actual design system breakpoints.
- **What to do instead:** The design system defines **four** responsive breakpoints: Mobile (320–640px), Tablet Small (641–768px), Tablet Large (769–1024px), Desktop (1025–1536px). Reference frames are 640px, 768px, 1024px, and 1440px respectively. Always check design-system.md § Responsive Behavior, not CLAUDE.md, for the authoritative breakpoint spec.

---

### Newspaper partner pages use white background, not gold/50
- **What went wrong:** Used `bg-gold-50` for the main content section background on a newspaper partner page.
- **What to do instead:** Newspaper partner pages use `surface/page/newspaper` which is always `white` (#ffffff), not the warm `gold/50` (`#fbf7ef`) used on Legacy-branded pages. When building newspaper partner templates, use white backgrounds throughout. Filter cards need `border border-wb-200` for visual separation on white backgrounds.

---

## 2026-04-07 — 911 Memorial Prototype (continued)

### Dark mode link color is gold/500, not navy/400
- **What went wrong:** Used `navy/400` `#728ab0` for link text in the Recommended Memorials component on the dark-bg prototype, then fell back to `#42608f` (the light-mode link color).
- **What to do instead:** The `text/link` token is **mode-aware**. Light mode = `navy/500` `#42608f`. **Dark mode = `gold/500` `#dcb05e`**. Always check design-system.md § Color Tokens — Semantic before choosing a link color. On any dark surface (`navy/800`, `navy/900`), links must be gold.

---

## 2026-04-01 — Tree PDP Figma Capture

### Read design-system.md BEFORE every build — no exceptions
- **What went wrong:** Built 5 HTML files for Figma capture using wrong font (Georgia instead of DM Sans), wrong colors (arbitrary hex instead of DS tokens), wrong heading colors, wrong link colors, wrong page background, and wrong button colors. Had to be corrected twice.
- **What to do instead:** Before writing ANY code — HTML, CSS, components, prototypes, Figma Plugin API calls — read design-system.md FIRST. This is not optional. Map every color to a semantic token, use DM Sans, use the 4px spacing scale, use DS shadow values. If the task is "recreate a page," the recreation must use DS tokens, not values eyeballed from the live site.
