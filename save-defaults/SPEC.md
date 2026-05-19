# Saved Defaults — Engineering Spec

> **Jira:** [DES-2186](https://legacycom.atlassian.net/browse/DES-2186) ·  **Epic:** LEGS-1465 Account Growth Tactics
> **Figma:** [Search - Listing Page Templates](https://www.figma.com/design/ITI3kQWgNgBClbqDArK1tc/Search---Listing-Page-Templates?node-id=9934-84138)
> **Live prototype:** [/save-defaults/](./index.html)
> **Status:** Design approved · ready for engineering scoping
> **Owner:** Wes Biffar (Design) · TBD (Eng)

---

## 1. Summary

**Saved Defaults** is a per-page bundle of filter, sort, and view-type preferences that automatically applies whenever a signed-in user lands on an obituary results page. It's distinct from Saved Search:

|  | **Saved Search** | **Saved Default** |
|---|---|---|
| Anchored to | A specific query | A page (e.g. `/obituaries/chicagoland`) |
| Returnable artifact | Yes — user comes back to it | No — applies automatically on visit |
| Mental model | "Take me back to this" | "Always start me from this" |

The verb choice ("Saved" vs. "Default") is intentional — they're peers in the account sidebar but signal different kinds of personalization.

**v1 scope:** Per-page defaults only. Global / cross-page defaults are a follow-up. **Gated behind sign-in** (this is also the value prop driving account creation).

---

## 2. Three-State Behavioral Model

Per Jira, the feature must support these three behavioral states for any signed-in user on a results page:

1. **Default applied** — User lands, the saved default loads automatically, current page state matches saved state. Status row reads *"Your saved default is applied."* with a Turn off action.
2. **Default modified** — Saved default is on, but the user has changed something this session (filter, sort, or view). Status row reads *"You've changed filters. Reset, or save as your default?"* with Reset and Save Changes actions.
3. **Default off** — User has temporarily suspended the saved default for this session. Status row reads *"Default is off. It will return next time you visit."* with a Turn on action.

These three states map onto five visual treatments in the prototype (see §4).

---

## 3. Trigger Rules

Any of the following user actions on a results page should surface the Save-as-Default invitation (or transition into the "Default modified" state if a default is already applied):

- Toggling any **filter** (date range, age range, school, custom search-within-results, etc.)
- Changing the **sort** dropdown
- Changing the **view type** (list ↔ grid)

The invitation appears in the same row directly above the result list. Signed-out users see a CTA that opens the sign-in modal; signed-in users see a CTA that saves immediately and surfaces a confirmation toast.

> **Out of scope for v1:** triggering on the search input *within* results, pagination, or scrolling. Only filter/sort/view changes.

---

## 4. Visual Specifications

All measurements assume a 4-pt base grid. Tokens reference [design-system.md](../design-system.md). Reference frame is 1440 px desktop unless noted; mobile/tablet behavior in §6.

### 4.1 Status row — common layout

| Property | Value |
|---|---|
| Width | 100% of results column |
| Height | 56 px (single-line) / 76 px (two-line) |
| Border radius | `8 px` |
| Inner padding | `16 px 32 px` (single-line) / `16 px` (two-line) |
| Icon gap | `8 px` |
| Icon size | `24 × 24 px` (no container) — except invitation state which uses a 32 × 32 gold/100 circle |
| Body text | DM Sans Regular 16 / 1.25 / `text/secondary` (#514d45) |
| Action text | DM Sans SemiBold 16 / 1.25 / underlined |
| Sits inside | Results column, directly above first result card |

### 4.2 State-by-state breakdown

| State | Figma node | Bg | Border | Icon | Body copy | Actions |
|---|---|---|---|---|---|---|
| **Save invitation** (signed-out → modal, signed-in → direct save) | `9934:85006` | transparent (page gold/50) | `1px solid gold/700` | 32×32 circle, bg `gold/100`, gold/700 sparkle, 20×20 inner | Title: **"Start every visit with these filters?"** (SemiBold, navy/700) · Subtitle: "Save as your default for Chicagoland Obituaries." (Regular, wb/700) | Primary navy/700 pill button "Save as Default" with star leading icon · h=40 px |
| **Applied** | `9936:110420` | transparent | `1px solid gold/700` | gold/700 star outline, 24×24 | "Your saved default is applied." | Text button **Turn off** — SemiBold, wb/700, underlined |
| **Default off** | `9934:105794` | white (`surface/card`) | `1px dashed gold/700` | gold/700 star outline, 24×24 | "Default is off. It will return next time you visit." | Text button **Turn on** — SemiBold, **navy/500**, underlined |
| **Changed** | `9936:110439` | `gold/100` (`surface/gold-container`) | none | gold/700 star outline, 24×24 | "You've changed filters. Reset, or save as your default?" | Text button **Reset** — SemiBold, navy/500, underlined · Primary navy/700 pill button **Save Changes** h=40 px |

> The dashed border on the *Default off* state is the only place dashed strokes appear in the listing page — use it deliberately as a visual cue that the saved state is "paused."

### 4.3 Sign-in modal · Figma node `9934:86090`

Shown when a **signed-out** user clicks "Save as Default" in the invitation row.

```
┌─────────────────────────────────────────────────────┐
│                  [ ★ Saved Defaults ]               │  ← gold/100 badge, rounded-6
│                                                     │
│              Save your default search               │  ← DM Serif Text 30/1.2 navy/700
│   Sign in to save your preferred filters, sort,     │  ← DM Sans 14/1.5 wb/700
│   and layout for this page. We'll apply them        │
│   automatically every time you return.              │
│                                                     │
│   ◯ Start every visit with the filters you …       │  ← gold/100 24×24 circle + gold/700 check
│   ◯ Different defaults per location, newspaper …   │     Body: DM Sans Bold 14 wb/700
│   ◯ Reset to your default anytime, or change it …  │
│                                                     │
│                  [ Maybe Later ]  [ Sign In … ]    │  ← right-aligned
└─────────────────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| Container | bg white, `1px solid border/default`, `rounded-[20px]`, drop-shadow `0 25px 50px -12px rgba(0,0,0,0.25)`, padding `32 px`, gap `32 px` between sections |
| Max width | 480–544 px content; modal card up to ~580 px |
| Badge | `bg-gold-100`, `rounded-[6px]`, padding `2 px 12 px`, gap 4 px, DM Sans Regular 14 / 1.5 / `text/on-pill` (#655b34), gold/700 14×14 star |
| Heading | DM Serif Text Regular **30 px** / 1.2 / `text/heading` (navy/700) |
| Subtitle | DM Sans Regular 14 / 1.5 / `text/secondary`, two lines via `<br>` per Figma |
| Bullets | 24×24 gold/100 circles, 12 px gold/700 check, body DM Sans **Bold** 14 / 1.5 / `text/secondary` |
| Primary CTA | **bg gold/400** (`#e2ba60`) — *not* navy — text wb/900 SemiBold 16 with `-0.32px` tracking, rounded-full, padding `12 px 20 px` |
| Secondary CTA | bg white, `1px solid navy/700`, text navy/700 SemiBold 16 with `-0.32px` tracking, same pill shape |
| Overlay | `rgba(21,27,36,0.55)` with 2 px backdrop blur |
| Close affordance | 36×36 wb/500 × icon in top-right; Esc and click-outside also close |
| Focus on open | "Sign In or Create Account" (primary CTA) |
| Mobile (≤640 px) | Becomes a bottom sheet — modal sticks to the bottom edge, `border-radius: 24px 24px 0 0`, full-width, CTAs stack |

### 4.4 Toast confirmations

After every save / turn-on / turn-off / reset / save-changes action, surface a transient toast (3 s auto-dismiss, role="status", aria-live="polite") at the bottom-center of the viewport (above the mobile keyboard inset):

| Action | Toast copy |
|---|---|
| Save as Default (signed-in direct) | "Default saved" |
| Sign in via modal → applied | "Welcome — default saved" |
| Turn off | "Default turned off" |
| Turn on | "Default turned on" |
| Reset (from Changed) | "Filters reset to your default" |
| Save Changes | "Default updated" |

Toast spec: bg `warmBlack/900` (#262116), white text, rounded-full pill, padding `12 px 20 px`, with a leading 18 px gold/500 check icon. Box-shadow `0 12px 32px rgba(0,0,0,0.2)`. Single line on desktop; wraps on mobile within `calc(100vw - 32px)`.

---

## 5. State Machine

```
                        ┌─────────────────┐
                        │   no-filters    │  signed-out OR signed-in,
                        │  (initial)      │  no saved default for this page
                        └────────┬────────┘
                user changes filter/sort/view
                                 ↓
                ┌────────────────┴────────────────┐
                │       save-triggered            │  invitation banner shown
                │  signed-out  │  signed-in       │  copy is identical;
                │              │                  │  CTA behavior differs
                └────┬─────────┴──────────┬───────┘
       click Save    │                    │  click Save as Default
                     ↓                    ↓
              ┌──────────────┐    ┌────────────────┐
              │ prompt-modal │    │    applied     │ ← toast "Default saved"
              └──────┬───────┘    └────┬───────┬───┘
        Sign In ─────┘                 │       │
        Maybe Later → save-triggered   │       │
                                       │       │ click Turn off
                user changes a control │       ↓
                                       │  ┌─────────────┐
                                       │  │ default-off │  ← toast
                                       │  └──────┬──────┘
                                       │         │ click Turn on
                                       │         ↓
                                       │     ┌───────┐
                                       │     │applied│
                                       │     └───┬───┘
                                       ↓         │
                                 ┌─────────┐     │
                                 │ changed │     │ click Reset → applied (toast)
                                 └────┬────┘     │ click Save Changes → applied (toast)
                                      └──────────┘
```

### 5.1 Transition table

| From | Action | To | Side effects |
|---|---|---|---|
| any | user changes filter/sort/view while not signed-in OR signed-in without a saved default | `save-triggered` | none yet (waiting on CTA) |
| `save-triggered` (signed-out) | click Save as Default | `prompt-modal` | — |
| `save-triggered` (signed-in) | click Save as Default | `applied` | POST current state · toast "Default saved" |
| `prompt-modal` | click Maybe Later / Esc / click-outside / X | `save-triggered` | — |
| `prompt-modal` | click Sign In or Create Account | sign-in/sign-up flow → on success: `applied` | POST current state · toast "Welcome — default saved" |
| `applied` | click Turn off | `default-off` | PATCH `{ active: false }` for session · toast |
| `default-off` | click Turn on | `applied` | PATCH `{ active: true }` · re-apply saved filters · toast |
| `applied` | user changes filter/sort/view | `changed` | none yet |
| `changed` | click Reset | `applied` | re-apply saved filters from server · toast |
| `changed` | click Save Changes | `applied` | PUT new state · toast "Default updated" |
| any | user signs out | `no-filters` | clear local applied state |

**Session-vs-persistent:** "Turn off" suspends the saved default *for the current session only*. The next visit re-applies the saved default. Permanent removal happens from the (future) account management page — out of scope for v1.

---

## 6. Responsive Behavior

Targets the four DS breakpoints from [design-system.md § Header & Navigation](../design-system.md#header--navigation):

| Breakpoint | Width | Filter sidebar | Status row | Modal |
|---|---|---|---|---|
| Desktop | 1025–1536 | Visible left rail, 260 px | Inline horizontal | Centered card, 544 px max |
| Tablet Large | 769–1024 | Visible left rail, narrower | Inline | Centered card |
| Tablet Small | 641–768 | **Collapses** into "Filter By" pill button (left of result count) that opens a left drawer | Inline; actions may wrap | Centered card, smaller padding |
| Mobile | 320–640 | Full-width drawer triggered by "Filter By" pill | Stacks: icon + copy column, action button below (full-width) | **Bottom sheet** w/ stacked CTAs (primary on top) |

All actionable elements maintain **≥ 44 × 44 px** tap targets. Body text never drops below 16 px (filter labels are 14 px exception, per existing DS).

---

## 7. Data Model

```ts
// per-user, per-page record
interface SavedDefault {
  id: string;                  // UUID
  userId: string;
  pageKey: string;             // page-keyed from day one — see §7.1
  filters: FilterState;        // page-specific filter snapshot
  sort: SortKey;               // e.g. 'recent' | 'relevant' | 'oldest'
  view: ViewType;              // 'list' | 'grid'
  active: boolean;             // session-level suspend (Turn off → false)
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

interface FilterState {
  // shape depends on page — example for location pages:
  publishDate?: 'all' | 'today' | 'last-week' | 'last-month' | { from: ISO8601, to: ISO8601 };
  ageRange?: 'all' | '50-69' | '71-80' | '81-90' | '91+';
  schools?: string[];          // school IDs
  searchWithinResults?: string;
}

type SortKey = 'recent' | 'relevant' | 'oldest';
type ViewType = 'list' | 'grid';
```

### 7.1 Page-keyed storage — critical for future extensibility

Even though v1 only supports per-page defaults, **the storage model must be page-keyed from day one**. This lets us add global / cross-page defaults later without a migration. Suggested keying scheme:

| Page type | Example `pageKey` |
|---|---|
| Location | `location:us:il:chicagoland` |
| Newspaper | `newspaper:chicago-sun-times` |
| Topic / search | `search:hash:<sha1-of-canonical-query>` |
| Global (future v2) | `global` |

Server-side lookup precedence (v2): `pageKey` exact match → `global` fallback → no default.

For v1, `pageKey = 'global'` should be rejected by the API.

### 7.2 Suspend behavior

`active: false` is set when the user clicks Turn off. The persisted record stays — what's "off" is the auto-apply on subsequent page loads. Two equivalent implementation paths; **prefer (a)**:

- (a) **Server-side toggle** on the record. Survives across devices ("turned off everywhere").
- (b) Client-side session storage. Simpler, but inconsistent across tabs/devices.

Open question for review: does Turn off persist across sessions until Turn on, or only for the current session? See §11 Open Questions.

---

## 8. API Surface (Suggested)

All endpoints require an authenticated user. 401 → redirect to sign-in.

```http
GET    /api/users/me/saved-defaults
       → 200 [{ ...SavedDefault }]

GET    /api/users/me/saved-defaults?pageKey=<key>
       → 200 { ...SavedDefault } | 404 if none

POST   /api/users/me/saved-defaults
       body: { pageKey, filters, sort, view }
       → 201 { ...SavedDefault, active: true }

PUT    /api/users/me/saved-defaults/:id
       body: { filters, sort, view }
       → 200 { ...SavedDefault, updatedAt: <new> }

PATCH  /api/users/me/saved-defaults/:id
       body: { active: boolean }
       → 200 { ...SavedDefault }

DELETE /api/users/me/saved-defaults/:id     // for the v2 management page only
       → 204
```

### 8.1 Page render flow

On every results-page request for a signed-in user:

1. Server computes the `pageKey` from the route.
2. Server checks `GET /saved-defaults?pageKey=<key>` (or a join in the page-render call).
3. **If a record exists with `active: true`** → apply its filters/sort/view to the initial query before rendering, set initial state to `applied`.
4. **If a record exists with `active: false`** → ignore the filters, set initial state to `default-off` (banner shown, no filters applied).
5. **No record** → set initial state to `no-filters`. No banner.

Hydration: the client gets the `SavedDefault` (if any) so it can hydrate the status row without an extra fetch.

### 8.2 Idempotency & race conditions

- Use the user's id + `pageKey` as a natural uniqueness key. POST when no record exists; PUT to update. Engineers may prefer an `upsert` shape — fine.
- Optimistic UI: flip the banner to the new state immediately, then call the API. On failure, revert and show an error toast ("Couldn't save — try again").
- Sign-up flow ([DES-2157](https://legacycom.atlassian.net/browse/DES-2157)) intersection: if a signed-out user is mid-Save flow, persist the pending `{ pageKey, filters, sort, view }` snapshot through the auth flow (URL param, session cookie, or pendingSignupAction store). After successful signup, POST it immediately so the user lands on `applied`.

---

## 9. Telemetry

Track these events with the existing analytics SDK (event name in `snake_case`, properties in `camelCase`):

| Event | When | Properties |
|---|---|---|
| `saved_default_invitation_shown` | First time the save-triggered banner appears in a session | `pageKey`, `triggeredBy: 'filter' \| 'sort' \| 'view'`, `signedIn: boolean` |
| `saved_default_cta_clicked` | User clicks Save as Default | `pageKey`, `signedIn`, `path: 'modal' \| 'direct'` |
| `saved_default_modal_dismissed` | Maybe Later / Esc / outside-click | `pageKey`, `via` |
| `saved_default_modal_signed_in` | User completes sign-in from modal | `pageKey`, `newAccount: boolean` |
| `saved_default_created` | POST succeeds | `pageKey`, `filterCount`, `sort`, `view` |
| `saved_default_applied_on_load` | Page renders with a saved default auto-applied | `pageKey`, `savedDefaultId` |
| `saved_default_turned_off` | User clicks Turn off | `pageKey`, `savedDefaultId` |
| `saved_default_turned_on` | User clicks Turn on | `pageKey`, `savedDefaultId` |
| `saved_default_reset` | User clicks Reset from Changed state | `pageKey`, `savedDefaultId` |
| `saved_default_updated` | PUT succeeds via Save Changes | `pageKey`, `savedDefaultId` |

Funnel of interest: `invitation_shown → cta_clicked → (modal_signed_in or created)` — this is the account-growth value prop we're measuring against.

---

## 10. Accessibility

| Requirement | Spec |
|---|---|
| Body text | ≥ 16 px |
| Tap targets | ≥ 44 × 44 px |
| Contrast | All copy/icons meet WCAG 2.1 AA. `gold/700` text on `gold/50` and on `white` passes (verified in DS). |
| Banner role | `role="region"` with `aria-label` describing the state ("Save defaults invitation", "Saved default applied", "Default off", "Default modified") |
| Toast | `role="status"`, `aria-live="polite"`, auto-dismiss; does not steal focus |
| Modal | `role="dialog"`, `aria-modal="true"`, labelled by the heading id; focus moves to the primary CTA on open; Esc closes; focus returns to the triggering button on close |
| Modal backdrop | Click-outside dismisses, but only via mousedown+mouseup on overlay (avoids accidental dismiss when a click starts inside) |
| Keyboard | All actions reachable via Tab; gold focus ring (2 px, 2 px offset) on all interactive controls; underlined text-buttons should have a clear focus state (border or background change) |
| Screen reader | When state changes (e.g. Turn off → Default off), the status row text is updated in place; announce the change via the toast's aria-live region rather than the banner itself to avoid double announcements |
| Reduced motion | Toast slide-in respects `prefers-reduced-motion: reduce` (fade only, no translate) |

---

## 11. Edge Cases & Open Questions

### Edge cases the implementation must handle

- **Concurrent sessions:** User saves a default in Tab A, then changes it in Tab B. Last write wins; the next page load in Tab A re-renders against the latest. No real-time sync required for v1.
- **User signs out from `applied` state:** Clear `active` in client state, drop back to `no-filters`. Server record stays for when they sign back in.
- **Saved default references a filter value that no longer exists** (e.g. a school was removed, or a sort key was deprecated): Silently drop the invalid field, apply the rest. Don't fail the whole apply.
- **Saved default produces 0 results:** Still apply it. Show the empty state. Do not auto-disable the default.
- **Mobile bottom-sheet modal + on-screen keyboard:** Subtitle and bullets should remain visible above the keyboard. If not feasible, sticky CTAs at top of the sheet.
- **Hard navigation between pages with the same pageKey** (e.g. paginating Chicagoland results): the default stays applied. Don't re-show the invitation banner.
- **First-visit signed-in user has no saved default:** State is `no-filters`. Invitation banner only appears after they change a filter/sort/view.

### Open questions for engineering / PM review

1. **Turn off persistence:** Should `active: false` survive across sessions, or reset to `true` on next visit? Current design assumes session-only via client state, but server-side toggle (option a in §7.2) is cleaner. **Recommend:** server-side toggle, but reset to `true` on a "next visit" timer (e.g. midnight UTC of save). To be decided with eng.
2. **Combined defaults vs. per-control:** If a user has *only* changed view-type from list → grid, do we offer to save *just* the view-type, or always the full snapshot (filters + sort + view)? **Recommend:** always full snapshot. Reduces conceptual surface area for v1.
3. **Cancellable sign-up flow:** If a user clicks Sign In via the modal, completes Step 1 of signup, then bails, do we preserve the pending Save snapshot? **Recommend:** yes — store in session/cookie until signup completes or the tab closes.
4. **Naming validation:** Per Jira AC, we should validate the "Saved searches" + "Saved defaults" labels in a first-click study. This is design-side, not blocking eng — flagging for tracking.
5. **Saved-default count cap:** Should there be a max number of per-page defaults a user can have? **Recommend:** no cap for v1; revisit if data shows abuse.

---

## 12. v1 vs. Future (v2)

| Capability | v1 (this ticket) | v2 (follow-up) |
|---|---|---|
| Per-page defaults | ✅ | ✅ |
| Listing-page status row + invitation | ✅ | ✅ |
| Sign-in modal CTA | ✅ | ✅ |
| Turn off (session-suspend) | ✅ | ✅ |
| Reset / Save Changes from Changed | ✅ | ✅ |
| Toast confirmations | ✅ | ✅ |
| Global / cross-page defaults | ❌ | ✅ |
| Account dashboard "Saved Defaults" nav item | ❌ (Jira AC, design TBD) | ✅ |
| Management page (list, remove, open) | ❌ | ✅ |
| Multiple named defaults per page | ❌ | maybe |
| Cross-tab session sync | ❌ | maybe |
| Saved Search + Saved Default unified UI | ❌ — keep distinct | undecided |

---

## 13. QA Checklist

- [ ] Signed-out: filter change shows invitation banner with copy from Figma `9934:85006`. CTA opens modal.
- [ ] Modal: closes on Esc / click-outside / X / Maybe Later. None of these advance auth state.
- [ ] Modal: Sign In or Create Account routes through real auth flow and returns to `applied` with the pending snapshot saved.
- [ ] Signed-in: filter change with no existing default shows invitation; CTA saves directly + toast.
- [ ] Applied state shows after every successful save and on every subsequent visit while `active: true`.
- [ ] Turn off: status row swaps to default-off; filters/sort/view all revert to the page's blank state; result count updates; cards reflect unfiltered set.
- [ ] Turn on: re-applies saved filters; cards / count / status row all update.
- [ ] Changed: any control mutation from applied surfaces Reset / Save Changes. Reset re-applies saved. Save Changes promotes current selections to the new default.
- [ ] All five status-row variants match Figma token spec (background, border, icon color).
- [ ] Modal matches Figma node `9934:86090` — primary CTA is **gold/400**, not navy.
- [ ] Responsive: filter sidebar collapses into drawer below `lg` (1024 px); modal becomes bottom sheet below `sm` (640 px); tap targets ≥ 44 px throughout.
- [ ] Keyboard: full Tab traversal; Esc dismisses modal and drawer; focus ring visible (gold, 2 px offset).
- [ ] Screen reader: banner state changes announce via toast (not double-announced).
- [ ] Telemetry: all events from §9 fire with the right properties.
- [ ] Sign-out from any applied / changed / default-off state returns the UI to `no-filters` and preserves the server record.

---

## 14. Reference

- **Prototype:** [save-defaults/index.html](./index.html) — exercises all six states. Use the floating demo switcher (bottom-right) to jump between states.
- **Figma frames** (all under [Search - Listing Page Templates](https://www.figma.com/design/ITI3kQWgNgBClbqDArK1tc/Search---Listing-Page-Templates)):
  - No filters applied — `9934:84139`
  - Filtered + Save invitation — `9934:84881`
  - Sign-in prompt modal — `9934:85790` (state) / `9934:86090` (modal node)
  - Saved default applied — `9934:85180`
  - Default off — `9934:84507`
  - Changed — `9934:85485`
- **Design system:** [design-system.md](../design-system.md) — tokens, breakpoints, header anatomy.
- **Jira:** [DES-2186](https://legacycom.atlassian.net/browse/DES-2186)
- **Related:** [DES-2157](https://legacycom.atlassian.net/browse/DES-2157) (signup follow flow — intersects auth handoff)

---

*Last updated: 2026-05-19 · Maintained by Design until eng kickoff.*
