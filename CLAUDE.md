# Claude Project Instructions

## Who I Am
I'm a product designer building tools, prototypes, and sites. My designs live in Figma. I work primarily on Legacy.com, a platform being updated in Next.js.

## Always Do This
- Use **Figma MCP** to pull designs before building anything
- Reference **design-system.md** (top-level) for tokens, components, and conventions
- Match designs with **pixel-perfect precision** — spacing, typography, color, everything
- Use **auto-layout** patterns (flexbox/grid) — never hardcode positions
- Use **design tokens** at all times — never use raw hex values or magic numbers
- If you make a mistake and are corrected, log it in **memory.md** (top-level) so you don't repeat it

## File Structure
```
/projects-root
├── CLAUDE.md          ← you are here
├── design-system.md   ← component and token reference
├── memory.md          ← learned corrections and preferences
└── [project-folders]/
```

## Design System
- Built on **Flowbite + Tailwind CSS**
- Figma library: https://www.figma.com/design/1yA73VSTJhQflAEaShc1Sl/Legacy-DS-%E2%80%A2-Core
- Always use existing components from the library — do not invent new ones unless explicitly asked
- Prefer **shadcn/ui** components when building in Next.js — our devs prefer this

## Tech Stack
- **Legacy.com projects**: Next.js (App Router preferred unless told otherwise)
- Use Next.js for all Legacy.com work unless a project specifies otherwise
- Use **TypeScript** by default in Next.js projects
- Tailwind CSS for styling — use tokens, not arbitrary values

## Responsive Design
- **Mobile-first** — over 70% of traffic is mobile
- Design and build for small screens first, then scale up
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) accordingly
- Test layouts at 375px, 768px, and 1280px breakpoints

## Accessibility
- Target **WCAG 2.1 AA** compliance minimum
- Our users skew older — prioritize:
  - Readable font sizes (16px+ body text)
  - High contrast ratios
  - Large tap targets (44×44px minimum)
  - Clear focus states
  - Descriptive alt text and ARIA labels

## What to Avoid
- Raw hex values — use tokens
- Hardcoded pixel positions — use auto-layout
- Building components that already exist in the design system
- Ignoring mobile layout in favor of desktop

## Memory
See **memory.md** for a running log of corrections and learned preferences. Check it at the start of each session.
