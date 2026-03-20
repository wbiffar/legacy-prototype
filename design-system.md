# Legacy Design System — Core Reference

> **Base:** Flowbite (Tailwind CSS) with Legacy-specific overrides and additions.
> **Figma source:** `Legacy-DS • Core`
> **Typeface:** DM Sans
> **Status indicators:** 🟢 Active/recommended · 🚫 Deprecated · ⚠️ Secondary/use sparingly

---

## Table of Contents

1. [Semantic Tokens (Light & Dark)](#semantic-tokens-light--dark)
2. [Color Tokens](#color-tokens)
3. [Typography](#typography)
4. [Spacing Scale](#spacing-scale)
5. [Effects & Shadows](#effects--shadows)
6. [Component Inventory](#component-inventory)
7. [Header & Navigation](#header--navigation)
8. [Semantic Color Usage](#semantic-color-usage)
9. [Token Migration Guide](#token-migration-guide)
10. [Usage Rules](#usage-rules)

---

## Semantic Tokens (Light & Dark)

These are the **alias tokens** you should reference in component code. They map to primitives and automatically handle light/dark mode. Use these instead of raw primitive tokens wherever possible.

> Format: `group/name` · Values reference primitive tokens from the [Color Tokens](#color-tokens) section below.

### text

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `text/primary` | `black` → `warmBlack/900` `#262116` | `white` `#ffffff` | Default body text |
| `text/secondary` | `warmBlack/700` `#514d45` | `warmBlack/400` `#afadaa` | Supporting / muted text |
| `text/heading` | `navy/700` `#293548` | `white` `#ffffff` | All headings (h1–h4) |
| `text/link` | `navy/500` `#42608f` | `gold/500` `#dcb05e` | Hyperlinks |
| `text/on-pill` | `gold/900` `#655b34` | `gold/900` `#655b34` | Text sitting on a pill/tag surface |
| `text/on-accent` | `white` `#ffffff` | `black` → `warmBlack/900` `#262116` | Text on accent/highlighted backgrounds |
| `text/inverse` | `white` `#ffffff` | `white` `#ffffff` | Text on dark surfaces (always white) |

### surface

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `surface/page` | `gold/50` `#fbf7ef` | `navy/900` `#151b24` | Default page background |
| `surface/card` | `white` `#ffffff` | `navy/800` `#212a3a` | Card, panel, modal backgrounds |
| `surface/container` | `white` `#ffffff` | `white` `#ffffff` | Inner containers (always white) |
| `surface/gold container` | `gold/100` `#f6e5b8` | `navy/800` `#212a3a` | Warm-tinted container (e.g. callouts) |
| `surface/pill` | `gold/100` `#f6e5b8` | `gold/100` `#f6e5b8` | Pill / tag background |
| `surface/page/newspaper` | `white` `#ffffff` | `white` `#ffffff` | Newspaper-style content pages (always white) |

### border

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `border/default` | `warmBlack/300` `#dbdad7` | `warmBlack/800` `#373329` | Default dividers, input borders, card outlines |

### accent

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `accent/gold` | `gold/700` `#a48849` | `gold/500` `#dcb05e` | Gold accent elements (highlights, icons) |
| `accent/partner` | `#000000` | `#000000` | Partner / co-brand lockup (pure black, no warm shift) |

### Usage pattern

```css
/* Use semantic tokens in components, not raw primitives */

/* ✅ Correct */
color: var(--text-primary);
background: var(--surface-card);
border-color: var(--border-default);

/* ❌ Avoid in components — use semantic alias instead */
color: #262116;
background: #ffffff;
```

In Tailwind, these map to custom CSS variables or extended theme keys (check your `tailwind.config` for the exact utility names).

---

## Color Tokens

Colors are organized into **Primary**, **Secondary**, and **Tertiary** palettes. The variable token names follow the pattern `colorName/shade` (e.g. `navy/700`). Tailwind/Flowbite config keys map as `colors.navy`, `colors.warm_black`, etc.

### Primary Palette

These are the four brand-approved primary colors. Use these for all core UI.

#### Navy `colors.navy`
*fka "Legacy Blue" · fka Flowbite `primary` / `blue`*

| Token | Hex | Old Name | Notes |
|-------|-----|----------|-------|
| `navy/50` | `#f0f4fa` | — | |
| `navy/100` | `#e6ecf5` | Navy 10 | |
| `navy/200` | `#d3ddeb` | — | |
| `navy/300` | `#b0c0d6` | Navy 30 | |
| `navy/400` | `#728ab0` | Navy 50 | |
| `navy/500` | `#42608f` | — | |
| `navy/600` | `#3c4d69` | Navy 90 | |
| 🟢 `navy/700` | `#293548` | **Navy 100** | Most used · primary buttons · Share feature |
| `navy/800` | `#212a3a` | Navy 120 | |
| `navy/900` | `#151b24` | Navy 150 | |

#### Warm Black `colors.warm_black`
*fka "Gray" · fka Flowbite `grey`*

Derived from Gold (warm undertone). Use as neutral text and UI chrome instead of pure black.

| Token | Hex | Old Name | Notes |
|-------|-----|----------|-------|
| `warmBlack/50` | `#fbfbfb` | — | |
| `warmBlack/100` | `#f6f6f6` | — | |
| `warmBlack/200` | `#ebe9e9` | Warm Black 10 | |
| `warmBlack/300` | `#dbdad7` | — | |
| `warmBlack/400` | `#afadaa` | — | |
| `warmBlack/500` | `#807e7a` | Warm Black 60 | |
| `warmBlack/600` | `#63605b` | Warm Black 70 | |
| `warmBlack/700` | `#514d45` | Warm Black 80 | |
| `warmBlack/800` | `#373329` | Warm Black 90 | |
| 🟢 `warmBlack/900` | `#262116` | **Warm Black 100** | Most used · primary text · `black` alias |

#### Gold `colors.gold`
*fka "Yellow" · fka Flowbite `yellow`*

Warm inviting tone. Gold 50 is used extensively as a background tint. Also used for Flowers feature.

| Token | Hex | Old Name | Notes |
|-------|-----|----------|-------|
| 🟢 `gold/50` | `#fbf7ef` | Gold 10 / Off White | Most used background color for containers/pages |
| `gold/100` | `#f6e5b8` | Gold 30 | |
| `gold/200` | `#f0d78d` | Gold 50 | |
| `gold/300` | `#e9c86f` | — | |
| 🟢 `gold/400` | `#e2ba60` | Gold 100 (fka 90) | Most used accent |
| 🟢 `gold/500` | `#dcb05e` | **Gold 100** | Most used · featured accent |
| `gold/600` | `#c49e54` | Gold 120 | ADA contrast–passing shade |
| `gold/700` | `#a48849` | — | |
| `gold/800` | `#85713e` | Gold 150 | ADA Contrast |
| `gold/900` | `#655b34` | — | |

#### Sea Foam `colors.sea_foam`
*fka "Green" · fka Flowbite `teal` / `green`*

Memorial theme color. Also represents Success state.

| Token | Hex | Old Name | Notes |
|-------|-----|----------|-------|
| `seaFoam/50` | `#f3faf9` | Sea Foam 10 | |
| `seaFoam/100` | `#ebf2f1` | Sea Foam 30 | |
| `seaFoam/200` | `#cee2de` | Sea Foam 50 | |
| `seaFoam/300` | `#aecec9` | — | |
| 🟢 `seaFoam/400` | `#81b8ae` | Sea Foam 90 | Most used |
| 🟢 `seaFoam/500` | `#5c9d94` | **Sea Foam 100** | Most used · Success color |
| `seaFoam/600` | `#357d75` | Sea Foam 120 | |
| `seaFoam/700` | `#216e6a` | — | |
| `seaFoam/800` | `#165c58` | Sea Foam 150 | |
| `seaFoam/900` | `#014744` | — | |

#### Coral `colors.coral`
*fka "Red" · fka Flowbite `red`*

Companion to Brick. Represents "Show Support" feature and Error state.

| Token | Hex | Old Name | Notes |
|-------|-----|----------|-------|
| `coral/50` | `#fcf1f3` | Coral 10 | |
| `coral/100` | `#fce8ec` | — | |
| `coral/200` | `#f7d4da` | Coral 30 | |
| `coral/300` | `#eba9b5` | — | |
| 🟢 `coral/400` | `#e77d91` | **Coral 100** | Most used |
| `coral/500` | `#d6677c` | — | |
| 🟢 `coral/600` | `#c24c62` | Coral 120 | Error Red |
| `coral/700` | `#993b4d` | — | |
| `coral/800` | `#792f3d` | Coral 150 | |
| `coral/900` | `#662833` | — | |

---

### Base Tokens

```
white:  #ffffff
black:  #262116   (alias for warmBlack/900)
```

---

### Secondary Palette

Used for Memorial page themes and specific feature actions. Use sparingly in general UI.

| Color | 100 (base) | 90 | 50 | 30 | 10 | Feature / Notes |
|-------|-----------|----|----|----|----|-----------------|
| **Pine** | `#285F55` | `#3E6F67` | `#94AFAB` | `#BFCFCC` | `#EAEFEE` | Memorial theme · Trees feature |
| **Navy** | `#293548` | `#3E495A` | `#949AA4` | `#BFC2C8` | `#EAEBED` | Memorial theme · Share feature · Primary buttons |
| **Eggplant** | `#432948` | `#563E5A` | `#A194A4` | `#C7BFC8` | `#ECEAED` | Memorial theme |
| **Brick** | `#4F2727` | `#623D3D` | `#A89393` | `#CBBEBE` | `#EEE9E9` | Memorial theme · Follow feature |
| **Caramel** | `#C2904A` | `#C99C5C` | `#E1C8A5` | `#EDDEC9` | `#F9F4ED` | Memorial theme · Flowers feature |
| **Sea Foam** | `#5C9D92` | `#6CA79D` | `#AECEC9` | `#CEE2DE` | `#EBF2F1` | Memorial theme · Success |

---

### Tertiary Palette

Companion colors to secondary palette. Use only alongside their paired secondary color.

| Color | Paired with | 100 (base) | 90 | 50 | 30 | 10 |
|-------|------------|-----------|----|----|----|----|
| **Light Blue** | Navy | `#BBD5D4` | `#C2D9D8` | `#DDEAEA` | `#EBF2F2` | `#F8FBFB` |
| **Lavender** | Eggplant | `#D5BCD9` | `#D9C3DD` | `#EADEEC` | `#F2EBF4` | `#FBF8FB` |
| **Coral** | Brick | `#E46F85` | `#E77D91` | `#F2B7C2` | `#F7D4DA` | `#FCF1F3` |
| **Yellow** | Caramel | `#F2CC75` | `#F3D184` | `#F9E6BB` | `#FBF0D6` | `#FEFAF1` |

---

### UI / Semantic Colors

| Name | Hex | Token mapping | Usage |
|------|-----|---------------|-------|
| Success Green | `#5C9D92` | `seaFoam/500` | Success states, confirmations |
| Warning Yellow | `#F2CC75` | Yellow 100 | Warning states, alerts |
| Error Red | `#C24C62` | `coral/600` | Error states, destructive actions |
| Visited Link | `#B18EB8` | Lavender 120 | Visited hyperlinks |

---

## Typography

**Font family:** DM Sans (Google Fonts)
**Fallback stack:** `"DM Sans", ui-sans-serif, system-ui, sans-serif`

All typography uses Tailwind utility classes as a base. The design system has named a subset of styles as Figma variables. Only 🟢-marked styles have design token backing.

### Active Type Scale

| Token / Class | Size | Weight | Line Height | Letter Spacing | Usage |
|---------------|------|--------|-------------|----------------|-------|
| `text-xs` | 12px | — | 1.5 | — | Captions, helper text |
| `text-sm` | 14px | — | 1.5 | — | Labels, secondary text |
| 🟢 `text-base / font-semibold` | 16px | 600 (SemiBold) | 1.5 | −0.02em | UI labels, navigation, buttons |
| `text-base / font-normal` | 16px | 400 (Regular) | 1.5 | — | Body copy |
| 🟢 `text-lg / font-normal` | 18px | 400 (Regular) | 1.5 | — | Lead text, card body |
| 🟢 `text-xl / font-normal` | 20px | 400 (Regular) | 1.5 | — | Subheadings, section leads |
| `text-2xl` | 24px | varies | 1.25–1.5 | — | Headings |
| `text-3xl` | 30px | varies | 1.25 | — | Section titles |
| `text-4xl` | 36px | varies | 1.25 | — | Page titles |
| `text-5xl` | 48px | varies | 1 | — | Hero / display |

> ⚠️ The variable `🚫 text-2xl / 🚫 font-medium` (DM Sans Medium, 24px, weight 500) is **deprecated**. Use Tailwind `text-2xl` with `font-semibold` (600) or `font-bold` (700) instead.

### Font Weights in Use

| Tailwind class | Weight | DM Sans style |
|---------------|--------|---------------|
| `font-normal` | 400 | Regular |
| `font-medium` | 500 | Medium — 🚫 being phased out |
| `font-semibold` | 600 | SemiBold |
| `font-bold` | 700 | Bold |

### Recommended Heading Hierarchy

```html
<!-- Page title -->
<h1 class="text-3xl font-bold text-warmBlack-900">...</h1>

<!-- Section heading -->
<h2 class="text-2xl font-semibold text-warmBlack-900">...</h2>

<!-- Card / modal heading -->
<h3 class="text-xl font-semibold text-warmBlack-900">...</h3>

<!-- Subsection heading -->
<h4 class="text-lg font-semibold text-warmBlack-900">...</h4>

<!-- Body -->
<p class="text-base font-normal text-warmBlack-800">...</p>

<!-- Label / caption -->
<span class="text-sm font-semibold text-warmBlack-600">...</span>
```

---

## Spacing Scale

Based on Tailwind's default 4px base unit. No custom overrides detected.

| Token | px | rem | Common use |
|-------|----|-----|-----------|
| `0` | 0 | 0 | |
| `0.5` | 2px | 0.125rem | Fine gaps |
| `1` | 4px | 0.25rem | Tight padding |
| `1.5` | 6px | 0.375rem | |
| `2` | 8px | 0.5rem | Inner padding, icon gaps |
| `2.5` | 10px | 0.625rem | |
| `3` | 12px | 0.75rem | |
| `4` | 16px | 1rem | Base component padding |
| `5` | 20px | 1.25rem | |
| `6` | 24px | 1.5rem | Section padding, card padding |
| `8` | 32px | 2rem | Component gaps |
| `10` | 40px | 2.5rem | |
| `12` | 48px | 3rem | Section spacing |
| `16` | 64px | 4rem | Page section gaps |
| `20` | 80px | 5rem | Large section spacing |
| `24` | 96px | 6rem | Hero/page margins |

---

## Effects & Shadows

| Token | Type | Color | Offset | Blur | Spread | CSS equivalent |
|-------|------|-------|--------|------|--------|----------------|
| `shadow-sm` | Drop Shadow | `rgba(0,0,0,0.08)` | `0 1px` | 2px | 0 | `box-shadow: 0 1px 2px 0 rgba(0,0,0,0.08)` |

> Note: Additional shadow levels (`shadow`, `shadow-md`, `shadow-lg`) are inherited from Flowbite/Tailwind defaults.

### Border Radius

Inherited from Tailwind/Flowbite defaults. Common values:

| Class | Value | Usage |
|-------|-------|-------|
| `rounded` | 4px | Inputs, small elements |
| `rounded-md` | 6px | Buttons, cards |
| `rounded-lg` | 8px | Modals, large cards |
| `rounded-xl` | 12px | Feature panels |
| `rounded-full` | 9999px | Badges, avatars, pills |

---

## Component Inventory

This system extends Flowbite's component library. The following components are part of the base system; all color tokens above override the Flowbite defaults.

### Buttons

| Variant | Base class | Notes |
|---------|-----------|-------|
| Primary | `btn` + navy/700 bg | Used for main CTAs; maps to Flowbite `blue` |
| Secondary | Outlined navy/700 | |
| Danger | `btn` + coral/600 bg | Destructive actions |
| Success | `btn` + seaFoam/500 bg | |
| Light / Ghost | warmBlack/100 bg | |
| Link | Text-only, navy/700 | Visited state: Lavender 120 (`#B18EB8`) |

Sizes: `xs`, `sm`, `md` (default), `lg`, `xl`

### Form Elements

- **Text Input** — `border-warmBlack/300`, focus ring `navy/500`
- **Select** — same as Text Input
- **Checkbox** — checked state `navy/700`
- **Radio** — checked state `navy/700`
- **Toggle / Switch** — on state `navy/700`
- **Textarea** — same border treatment as Text Input
- **File Upload** — Flowbite default with navy accent

States: default · hover · focus · disabled · error (coral/600 border + coral/50 bg)

### Navigation

- **Navbar** — typically navy/900 or white background
- **Sidebar** — warmBlack/50 background, active item navy/700
- **Breadcrumb** — text warmBlack/500, separator warmBlack/300
- **Tabs** — active tab navy/700 underline or background
- **Pagination** — navy/700 active page, outlined variants

### Feedback & Overlays

- **Alert / Banner**
  - Info → navy/100 bg, navy/700 border/icon
  - Success → seaFoam/100 bg, seaFoam/600 border/icon
  - Warning → gold/100 bg, gold/600 border/icon
  - Danger → coral/100 bg, coral/600 border/icon
- **Toast** — same color logic as Alert, top-right by default
- **Modal** — white bg, shadow-lg, rounded-lg
- **Popover / Tooltip** — warmBlack/900 bg (#262116), white text

### Data Display

- **Table** — striped warmBlack/50, header warmBlack/100, border warmBlack/200
- **Badge**
  - Default: warmBlack/100 bg, warmBlack/700 text
  - Primary: navy/100 bg, navy/700 text
  - Success: seaFoam/100 bg, seaFoam/700 text
  - Warning: gold/100 bg, gold/800 text
  - Danger: coral/100 bg, coral/700 text
- **Avatar** — rounded-full; initials use secondary palette for Memorial themes
- **Card** — white bg, shadow-sm, rounded-lg, `p-6`
- **List Group** — border warmBlack/200

### Layout

- **Container** — max-width 1280px, horizontal padding `px-4` (mobile) → `px-6` (md+)
- **Grid** — standard Tailwind 12-column; common patterns: `grid-cols-1`, `grid-cols-2`, `grid-cols-3`, `grid-cols-4`
- **Divider / Separator** — warmBlack/200 (`#dbdad7`) at 1px
- **Page background** — gold/50 (`#fbf7ef`) is the most common page/container background (warm off-white)

### Memorial-Specific Components

Memorial pages use the Secondary/Tertiary color system. Each theme is a paired color:

| Theme Name | Primary | Companion |
|-----------|---------|-----------|
| Navy | navy/700 (`#293548`) | Light Blue 100 (`#BBD5D4`) |
| Pine | Pine 100 (`#285F55`) | *(standalone)* |
| Eggplant | Eggplant 100 (`#432948`) | Lavender 100 (`#D5BCD9`) |
| Brick | Brick 100 (`#4F2727`) | Coral 100 (`#E46F85`) |
| Caramel | Caramel 100 (`#C2904A`) | Yellow 100 (`#F2CC75`) |
| Sea Foam | Sea Foam 100 (`#5C9D92`) | *(standalone)* |

---

## Header & Navigation

> **Figma component:** `NavigationCustom 2.0` · [View in Figma](https://www.figma.com/design/1yA73VSTJhQflAEaShc1Sl/Legacy-DS-%E2%80%A2-Core?node-id=20004-4610&t=3xPKtNB3XSEMFUAo-4)

The Header & Navigation is a **required global component** used at the top of every Legacy.com page. It supports two brand contexts (Legacy and Newspaper partner), four responsive breakpoints, and several page-type variants.

### Anatomy

The header is composed of two regions stacked vertically:

**Top Bar** — Contains the brand logo (left), an optional search input (center), and user actions (right). On smaller breakpoints a hamburger menu icon appears alongside the actions.

**Navigation Bar** — Sits directly below the top bar and contains horizontal text links. Present on desktop and tablet breakpoints; collapses into the hamburger menu on mobile.

A `1px solid` bottom border using `border/default` (`warmBlack/300` `#dbdad7`) separates the header from page content on all variants.

### Component Structure

```
NavigationCustom 2.0
├── Top Bar
│   ├── Brand Area (left)
│   │   ├── Legacy logo (gold mark + serif wordmark)  — or —
│   │   └── Newspaper masthead (bold uppercase sans-serif)
│   ├── Search Area (center, optional)
│   │   └── Search input ("Find a loved one...") with magnifying glass icon
│   └── Actions Area (right)
│       ├── Sign In (person-outline icon + label)  — or —  "Hi, [Name]" (authenticated)
│       └── Hamburger menu icon (tablet-small / mobile only)
├── Navigation Bar (desktop + tablet only, optional)
│   └── Nav Links: Create & Publish · Browse Obituaries · Plan Ahead · Grief Resources · Send a Gift
└── Bottom Border (1px)
```

### Variants

The component is organized by **breakpoint** and **page type**.

#### Desktop (1025–1536 px) — `1440px` reference frame

| Variant | Height | Top Bar | Nav Bar | Search | Notes |
|---------|--------|---------|---------|--------|-------|
| **Default** | 117px | Legacy logo, search input, Sign In | Full nav links | Inline input | Full experience |
| **Search Results** | 117px | Legacy logo, magnifying-glass icon, Sign In | Full nav links | Icon only (collapsed) | Search input removed; icon triggers search |
| **Newspaper** | 72px | Newspaper masthead, search input, Sign In | None | Inline input | Single-row; no nav bar |
| **ObitWriter** | 72px | Legacy logo, "Hi, John", hamburger | None | None | Authenticated; simplified for obit creation |

#### Tablet Large (769–1024 px) — `1024px` reference frame

| Variant | Height | Top Bar | Nav Bar | Search | Notes |
|---------|--------|---------|---------|--------|-------|
| **Default** | 117px | Legacy logo, search input, Sign In | Full nav links | Inline input | Same layout as desktop, tighter spacing |
| **Search Results** | 117px | Legacy logo, magnifying-glass icon, Sign In | Full nav links | Icon only | Mirrors desktop search results |

#### Tablet Small (641–768 px) — `768px` reference frame

| Variant | Height | Top Bar | Nav Bar | Search | Notes |
|---------|--------|---------|---------|--------|-------|
| **Default** | 117px | Legacy logo, search input, Sign In | Shortened labels | Inline input | Nav labels abbreviated (Create, Browse, Plan…) |
| **Search Results** | 117px | Legacy logo, magnifying-glass icon, Sign In | Shortened labels | Icon only | Mirrors larger tablet search results |
| **Newspaper** | 72px | Masthead, search input, Sign In, hamburger | None | Inline input | Hamburger appears alongside Sign In |
| **Newspaper Search Results** | 72px | Masthead, magnifying-glass icon, Sign In, hamburger | None | Icon only | Collapsed search variant |

#### Mobile (320–640 px) — `640px` reference frame

| Variant | Height | Top Bar | Nav Bar | Search | Notes |
|---------|--------|---------|---------|--------|-------|
| **Default** | 124px | Legacy logo, Sign In, hamburger | None (links in hamburger) | Full-width row below top bar | Search sits on its own row |
| **Newspaper** | 124px | Masthead, Sign In, hamburger | None | Full-width row below top bar | Same two-row layout |
| **ObitWriter** | 64px | Legacy logo, Sign In, hamburger | None | None | Minimal header for obit flow |

### Brand Contexts

**Legacy (default)** — Gold concentric-circle logo mark (`accent/gold` · `gold/500` `#dcb05e`) paired with the "Legacy" wordmark in serif type. Navigation links are fully spelled out on desktop/tablet-large and abbreviated on tablet-small.

**Newspaper Partner** — Replaces the Legacy logo with the newspaper's masthead rendered in bold uppercase DM Sans (e.g., "CHICAGO SUN-TIMES") using `accent/partner` (`#000000`). The nav bar is removed entirely; only the search input and Sign In appear alongside the masthead.

### Logo Assets

All logo SVGs are hosted on `legacy.com/media/`. Use the appropriate variant based on background context.

**For Light Backgrounds** (`surface/page`, `surface/card`, white)

| Asset | URL | Usage |
|-------|-----|-------|
| Icon only (gold mark) | `https://www.legacy.com/media/icon.svg` | Favicon, compact spaces |
| Icon + wordmark (horizontal) | `https://www.legacy.com/media/legacy-icon.svg` | Header, navigation — **primary logo** |
| Icon + wordmark (stacked) | `https://www.legacy.com/media/legacy-icon-stacked.svg` | Footer, marketing, vertical layouts |

**For Dark Backgrounds** (`navy/800`, `navy/900`, dark surfaces)

| Asset | URL | Usage |
|-------|-----|-------|
| Icon only (white mark) | `https://www.legacy.com/media/icon-white.svg` | Favicon on dark, compact spaces |
| Icon + wordmark, dark variant (horizontal) | `https://www.legacy.com/media/legacy-icon-dark.svg` | Dark-mode header/navigation |
| Icon + wordmark, dark variant (stacked) | `https://www.legacy.com/media/legacy-icon-dark-stacked.svg` | Dark-mode footer, marketing |
| Icon + wordmark, white variant (horizontal) | `https://www.legacy.com/media/legacy-icon-white.svg` | Full-white logo on dark/photo backgrounds |
| Icon + wordmark, white variant (stacked) | `https://www.legacy.com/media/legacy-icon-white-stacked.svg` | Full-white stacked logo on dark/photo backgrounds |

> **Rule:** Always use the horizontal `legacy-icon.svg` (light) or `legacy-icon-dark.svg` / `legacy-icon-white.svg` (dark) in the header. Stacked variants are reserved for footers and marketing contexts. Never place a light-background logo on a dark surface or vice versa.

### Responsive Behavior

| Breakpoint | Width Range | Nav Links | Search | Menu |
|------------|------------|-----------|--------|------|
| Desktop | 1025–1536 px | Inline bar below top bar | Inline input in top bar | None |
| Tablet Large | 769–1024 px | Inline bar below top bar | Inline input in top bar | None |
| Tablet Small | 641–768 px | Inline bar (shortened labels) | Inline input in top bar | Hamburger (Newspaper only) |
| Mobile | 320–640 px | Hidden (in hamburger) | Full-width row below top bar | Hamburger |

### States

**Signed Out (default)** — Person-outline icon with "Sign In" label. Text uses `text/primary` (`warmBlack/900` `#262116`).

**Signed In / Authenticated** — Replaces Sign In with an avatar icon and greeting ("Hi, John"). Used in ObitWriter variants.

**Search Collapsed** — On Search Results pages (desktop/tablet), the search input is replaced by a standalone magnifying-glass icon to reclaim horizontal space.

### Design Tokens Used

| Element | Token | Value | Notes |
|---------|-------|-------|-------|
| Background | `surface/card` | `white` `#ffffff` | Header background |
| Bottom border | `border/default` | `warmBlack/300` `#dbdad7` | 1px solid separator |
| Logo mark | `accent/gold` | `gold/500` `#dcb05e` | Gold concentric-circle icon |
| Text (nav links, Sign In) | `text/primary` | `warmBlack/900` `#262116` | DM Sans, `text-base / font-semibold` |
| Newspaper masthead | `accent/partner` | `#000000` | Bold uppercase DM Sans |
| Search input border | `border/default` | `warmBlack/300` `#dbdad7` | Rounded, 1px solid |
| Search placeholder | — | `warmBlack/400` `#afadaa` | "Find a loved one…" |
| Wordmark | `text/primary` | `warmBlack/900` `#262116` | Serif typeface |

### Usage Guidelines

- Every Legacy.com page **must** include the Header & Navigation at the top of the viewport.
- Use the **Legacy** brand context for all first-party pages. Use **Newspaper** only for co-branded partner pages.
- On mobile, navigation links **must** remain accessible via the hamburger menu — never hide them without an alternative path.
- Search input placeholder text should always read **"Find a loved one…"**.
- On authenticated pages (e.g., ObitWriter), replace the Sign In element with the user's first-name greeting.
- Header background should always be `surface/card` (white), not `surface/page` (gold/50), so it stays visually distinct from the warm page background.

---

## Semantic Color Usage

### Feature Color Assignments

| Feature / Action | Color | Hex |
|----------------|-------|-----|
| Add a Memory (brand blue) | navy/700 | `#293548` |
| Share | Navy 90 / navy/600 | `#3c4d69` |
| Follow | Brick 90 | `#623D3D` |
| Flowers | Caramel 90 | `#C99C5C` |
| Trees | Pine 90 | `#3E6F67` |
| Show Support | Coral 100 / coral/400 | `#e77d91` |

### Status Colors

| State | Color | Token | Hex |
|-------|-------|-------|-----|
| Success | Sea Foam | `seaFoam/500` | `#5C9D92` |
| Warning | Yellow | Yellow 100 | `#F2CC75` |
| Error | Coral | `coral/600` | `#C24C62` |
| Info | Navy | `navy/400` | `#728ab0` |
| Visited Link | Lavender | Lavender 120 | `#B18EB8` |

### Text Colors

| Role | Token | Hex |
|------|-------|-----|
| Primary text | `warmBlack/900` | `#262116` |
| Secondary text | `warmBlack/600`–`warmBlack/700` | `#63605b`–`#514d45` |
| Placeholder / muted | `warmBlack/400`–`warmBlack/500` | `#afadaa`–`#807e7a` |
| Disabled | `warmBlack/300` | `#dbdad7` |
| Inverse (on dark bg) | `white` | `#ffffff` |
| Link (default) | `navy/700` | `#293548` |
| Link (visited) | Lavender 120 | `#B18EB8` |

### Background Colors

| Role | Token | Hex |
|------|-------|-----|
| Page / warm off-white | `gold/50` | `#fbf7ef` |
| Surface / card | `white` | `#ffffff` |
| Subtle / alternate row | `warmBlack/50` | `#fbfbfb` |
| Muted section | `warmBlack/100` | `#f6f6f6` |
| Dark surface | `navy/900` | `#151b24` |

---

## Token Migration Guide

The color system was renamed from Flowbite/Bootstrap defaults to semantic Legacy names.

| Flowbite / Old Name | New Token | Tailwind Key |
|--------------------|-----------|-------------|
| `blue` / `primary` | navy | `colors.navy` |
| `grey` / `gray` | warm_black | `colors.warm_black` |
| `green` | sea_foam | `colors.sea_foam` |
| `yellow` | gold | `colors.gold` |
| `red` | coral | `colors.coral` |
| `teal` (fka Sea Foam) | sea_foam | `colors.sea_foam` |
| Legacy Blue | navy | `colors.navy` |

### Old → New Shade Mapping (example: Navy)

| Old shade | New token |
|-----------|-----------|
| 10 | `/100` |
| 30 | `/300` |
| 50 | `/400` |
| 90 | `/600` |
| 100 | `/700` |
| 120 | `/800` |
| 150 | `/900` |

---

## Usage Rules

### Do
- Use `gold/50` (`#fbf7ef`) as the default warm background for pages and containers — it gives a warm, inviting tone.
- Use `navy/700` as the primary brand/action color (buttons, links, active states).
- Use `warmBlack/900` for primary text instead of pure `#000000`.
- Use `seaFoam/500` for success feedback; `coral/600` for errors; Yellow 100 for warnings.
- Use secondary and tertiary colors **only** for memorial page themes or their designated feature actions (Share, Follow, Flowers, Trees).
- Use the `shadow-sm` token (`0 1px 2px rgba(0,0,0,0.08)`) for default card/surface elevation.
- Apply `font-semibold` with negative letter-spacing (`-0.02em`) for 16px UI labels to improve readability.

### Don't
- Don't use pure `#000000` black — always use `warmBlack/900` (`#262116`) for its warm tone.
- Don't use Flowbite's default `blue-700` (`#1A56DB`) — it has been replaced by `navy/700` (`#293548`).
- Don't use `font-medium` (weight 500) for new work — the deprecated variable `🚫 text-2xl/🚫 font-medium` confirms this weight is being phased out.
- Don't use secondary/tertiary palette colors for general UI states — they are reserved for memorial themes and specific feature icons.
- Don't use `colors.indigo`, `colors.orange`, `colors.purple`, or `colors.pink` — these are Flowbite defaults marked as **"Secondary Colors • Do Not Use"** in the design file.
- Don't use the old shade numbering system (10/30/50/90/100/120/150) in new work — use the 50–900 token scale.

### Accessibility Notes
- `gold/800` (`#85713e`) on white passes AA contrast (Figma annotates it as "ADA Contrast").
- `navy/700` (`#293548`) on white passes AA/AAA contrast.
- `coral/600` (`#C24C62`) meets AA contrast for error indicators on white.
- `seaFoam/500` on white may not meet AA — pair with a dark text label for status messages.
- Lavender 120 (`#B18EB8`) is designated only for visited link states; do not use for primary actions due to low contrast.

---

*Last extracted: 2026-03-11 from Figma file `Legacy-DS • Core` (node `0:1`)*
