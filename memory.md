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

---

## 2026-07-02 — Suggested Locations to Follow (DES-2175)

### Display headings use DM Serif Text — it IS a DS token
- **Clarification:** The earlier "Georgia instead of DM Sans" correction was about using a *random* serif. The design system's big display/hero headings (page titles, modal titles, the "You're following N locations" banner) legitimately use **DM Serif Text** — Figma exposes it as `font-serif-semibold` variants (e.g. `text-5xl/font-serif-semibold`, `text-2xl/font-serif-semibold`). DM Sans is for all body/UI text. So: serif = DM Serif Text (never Georgia), sans = DM Sans.

### Don't name a custom CSS class `.collapse` when loading Tailwind CDN
- **What went wrong:** Named the push-down animation class `.collapse`. Tailwind ships a `.collapse` utility (`visibility: collapse`) which won the cascade and set `visibility:collapse` on the container — it inherits to all descendants, so the widget expanded to full height but every child was invisible. Wasted a debug cycle.
- **What to do instead:** When using the Tailwind CDN build, never reuse a Tailwind utility name for a custom class (`collapse`, `container`, `hidden`, `block`, `grid`, etc.). Prefix custom classes (e.g. `.revealer`, `.js-collapse`). Symptom to recognize: element has layout height but content is invisible → check computed `visibility` for `collapse`.

### Edge-to-edge Figma sections must be built full-bleed, not as inset cards
- **What went wrong:** Built the suggested-follows widget and its success banner as inset, rounded, margin'd cards inside the constrained container. In Figma both are **full-bleed horizontal gold bands** — background spans the entire page width edge-to-edge, only the *content* is constrained to the container width.
- **What to do instead:** When a Figma frame's background/fill extends to the frame edges (check for a background shape/vector that spans the full frame, e.g. "Vector 1" at negative x offset wider than the content), build it full-bleed: put the background on a full-width wrapper and nest a `max-w-[...] mx-auto px-...` element inside for the content. Don't wrap it in a rounded card with side margins.

### The "suggested follows" feature appears after ANY successful follow — including soft-follow
- **What went wrong:** Only showed the nearby-locations widget in the authenticated flow. Assumed soft-follow (email capture) ended at the success modal.
- **What to do instead:** The suggested-locations-to-follow prompt is triggered by *successfully following the page*, regardless of auth method. In the soft-follow flow the frame order is Follow → email modal → "You're all set!" modal → **Suggested Follows widget** → Suggested Follows Success. After the soft-follow success modal is dismissed, animate the same widget in (the user is now following via email).

---

## 2026-09-11 — Relationship taxonomy + selector (DES-2265)

### Don't declare MCP connectors unavailable based on the session-start notice — try them
- **What went wrong:** The startup notice listed Figma and Atlassian as needing auth, so I told Wes they were unavailable and asked him to authorize them. He said "try again those connectors should be working" — and both worked immediately on the first call. I had burned a turn and asked him to do something he didn't need to do.
- **What to do instead:** The session-start auth/connection notice is a snapshot that can be stale. Before reporting any connector as unavailable, actually call it (`getAccessibleAtlassianResources`, Figma `whoami`) and let the *call* fail. Only report unavailability from a real error. This matters most for Figma and Jira, which nearly every task here depends on.

### Read the Jira ticket before asking the user what they want
- **What went wrong:** Asked Wes a three-part AskUserQuestion about which direction to take the taxonomy. He dismissed it. The branch name (`tune/des-2265-relationship-selector`) named the ticket, and DES-2265 already specified the answer to every question I asked — six top-level categories, second tier under family only, no third tier, no free-text on "Other".
- **What to do instead:** When the branch name, commit messages, or prototype comments reference a DES ticket, pull it with the Atlassian MCP *first*. Ask only about what the ticket leaves genuinely open, and make the routine calls yourself.

### `[hidden]` loses to Tailwind display utilities — add an explicit override
- **What went wrong:** Toggled the "More family relationships" grid with `el.hidden = true`. The element has `class="grid ..."`, and Tailwind's `.grid { display: grid }` has the same specificity as `[hidden] { display: none }` but loads later, so it won the cascade. The expanded set was permanently visible; the collapsed default state silently never existed. Cost several debug cycles because `el.hidden` read back as `true` while the element rendered.
- **What to do instead:** Any prototype loading the Tailwind CDN needs `[hidden] { display: none !important; }` in the base layer of shared/styles.css (it's there now). Symptom to recognize: `el.hidden === true` but `getBoundingClientRect().height > 0`. Related to the `.collapse` entry above — same root cause, Tailwind utilities outranking expected defaults.

### An animated-height pane needs both a ResizeObserver and a transitionend sync
- **What went wrong:** `.wiz-viewport` is `overflow:hidden` with an explicit animated height. Measuring the active pane's height on click landed mid-transition while the inline qualifier reveal was still expanding, so the pane clipped. A ResizeObserver alone converged, but a beat late — visible as a clipped sheet.
- **What to do instead:** For a sheet whose content animates open, sync the viewport height from three triggers: the ResizeObserver, `document.fonts.ready`, and the reveal's own `transitionend` (filtered to the animating property, e.g. `grid-template-rows`). Also cap `.sheet-card` with `max-height` + `overflow-y:auto` in `dvh` (not `vh`) so mobile browser chrome can't hide the submit button.

### The Jira ticket is the starting point, not the current design
- **What went wrong:** Built the whole DES-2265 taxonomy and picker from the ticket description. Wes then supplied two Figma links that had superseded it — the structure had moved on (seven flat top-level options instead of six with two de-emphasized; and the third tier isn't removed, it's relocated to an optional step *after* the save). The full build had to be redone.
- **What to do instead:** Read the ticket for intent and constraints, then get the current Figma before writing code — ask for it, or check the ticket's attachments and comments for anything added since it was filed. For relationships the sources are the "Relationships" FigJam board (data model, node 5:222) and "Saved Person Future Board Presentation" (front end, node 6621:23844).

### FigJam boards need get_figjam, not get_metadata/get_design_context
- **Note:** A `/board/` URL is FigJam and only `get_figjam` reads it; `get_metadata` and `get_design_context` are `/design/` only. For a `/design/` URL where the node is a *section*, `get_design_context` returns a sparse outline and tells you to call it again per child frame — `get_screenshot` on the section first is the cheapest way to see the whole flow and decide which frames are worth pulling in full.

## 2026-09-14 — Relationship selector, follow-up (DES-2265)

### Capping a sheet with max-height hides any control revealed below the fold
- **What went wrong:** Capping `.sheet-card` at `100dvh`/`88dvh` stopped the picker from clipping, but created the opposite failure: on a 667px-tall phone the top pane is 719px, so revealing the "Add Relationship" CTA pushed it 100px past the card's lower edge. `scrollTop` stayed 0, so the button was simply invisible — a dead end, with nothing on screen hinting a next step existed. Wes caught it; the reveal had only ever been checked at 812px, where it fits by ~4px.
- **What to do instead:** Any control that *appears* inside a capped, scrollable sheet has to be scrolled into view as it appears. Pin the card to its own bottom (`scrollTop = scrollHeight`) so the content above shifts up. **Snap the pane's height first, then pin in the same frame — never animate the pin.** Also reset the scroll on pane change: the *card* is the scroller, so `viewport.scrollTop = 0` resets the wrong element.
- **Don't chase an animation with a timer.** I built the pin twice against a moving target — first an rAF loop ended by a `transitionend` on `height`, then `scrollTo({behavior:'smooth'})` — and both stranded the button off-screen whenever the animation clock and the wall clock disagreed (a backgrounded or throttled tab pauses one and not the other). Both *looked* correct in a settled tab, which is why they survived a first round of testing. The fix was to remove the moving target: apply the final height with the transition suppressed, so `scrollHeight` is already final and one synchronous assignment lands exactly. When correctness depends on where an animation ended up, prefer making it not animate over adding another mechanism to track it.
- **Verify at 375×667, not just 375×812.** The shorter phone is where a capped sheet actually overflows.
