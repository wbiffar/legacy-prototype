# Account prompt trigger logic — DES-2305

How the Tukios consumer obit decides which account-related prompt a visitor
sees, and when. Written up from the decisions taken on DES-2295 and DES-2305
between 19 and 22 Oct 2026. The prototype in this folder implements exactly
what is below; `index.html` carries the same rules as comments at each
decision point.

Related: [DES-2305](https://legacycom.atlassian.net/browse/DES-2305) ·
[DES-2295](https://legacycom.atlassian.net/browse/DES-2295) ·
Figma [des-2289-tukios-consumer-obit-adjustments](https://www.figma.com/design/djnZb62qRq3Y4W5HvQcGG1/des-2289-tukios-consumer-obit-adjustments)

---

## The problem

The obit page already interrupts people. Before this work it carried a sign-in
pop, an exit-intent modal, a scroll-threshold modal and interstitial ads — up
to four interruptions in a single session, on a page where the visitor may not
have read anything yet.

Adding a guestbook account prompt on top of that was the thing to avoid. The
rules below exist so the new prompt earns its place rather than becoming a
fifth interruption.

---

## What can fire

| Trigger | Fires on | Shows |
|---|---|---|
| **Scroll threshold** | 60% scroll depth | Follow modal |
| **Exit intent** | Pointer leaves through the top of the window. Desktop only | Follow modal |
| **Guestbook account prompt** | A guestbook post, then 80px of scrolling in either direction | Account prompt |
| ~~Sign-in pop~~ | — | **Removed entirely** |

### The two modals

**Follow modal** — Figma `3626:41748` → `3626:41688`. One card in two states:
"Never miss an update" captures an email, then "You're all set!" confirms it.

The success state is the important one. It repeats the whole account offer —
the same three benefits and the same Create an Account / Sign In pair as the
guestbook prompt, just stacked. That is why reaching it has consequences for
everything else (rule 2).

Exit intent and the scroll threshold differ **only in when they fire**. They
show the same card, so the prototype has one shared element rather than two
copies.

**Account prompt** — Figma `3653:59029` (mobile) / `3657:64954` (desktop).
The "Stay connected" card shown after a guestbook post.

---

## The rules

### 1. The guestbook prompt always shows to someone who posted

It does not compete for the session allowance, and a generic prompt that fired
earlier does not block it.

*Why:* writing a tribute is the moment the account offer actually makes sense.
It is too valuable to lose because the visitor waved away an exit-intent modal
on their way in.

### 2. Completing the follow ends all prompting for the session

A visitor who submitted their email and reached "You're all set!" sees nothing
further — the guestbook prompt included.

*Why:* they are already getting the updates, and that success state made the
account offer itself. Anything after it is asking twice.

**The trigger is the success, not the appearance.** Dismissing the follow modal
with the X leaves every trigger armed exactly as it was. Only submitting
suppresses.

### 3. Posting makes the generic prompts stand down

Once someone posts, exit intent and the scroll threshold hold off for the rest
of the session, so neither piles on after the contextual prompt.

### 4. The generic prompts share one allowance

First eligible trigger takes it; the other is suppressed. In practice exit
intent leads for a visitor who reads and leaves without posting.

### 5. The prompt is fired by interaction, never a timer

The post **arms** it; a scroll **fires** it. Decided at the 20 Oct review: more
intent-driven than guessing at a delay in milliseconds. The acknowledged
trade-off is that it misses anyone who posts and leaves without scrolling.

---

## The ceiling

**Two prompts in a session, maximum** — and only for someone who dismissed a
generic prompt and then went on to post.

Complete the follow and it is **one**. Never three.

---

## Decision matrix

What a visitor sees, by path:

| Path | Sees |
|---|---|
| Reads, leaves without posting | Exit intent (or the scroll threshold, whichever fires first) |
| Posts, nothing else | Account prompt |
| Generic prompt → **dismissed** → posts | Generic prompt, then the account prompt (2) |
| Generic prompt → **email submitted** → posts | Follow modal + success only (1) |
| Posts → scrolls → generic trigger would fire | Account prompt only — the generic one stood down |

---

## Settled details

**Scroll distance: 80px, either direction.** Roughly one wheel notch, or the
start of a thumb swipe. It was 180px and downward-only; 180 felt like a hike
on an 812px phone, and up is the likelier gesture there, since the composer
sits below the entries the visitor was reading. Accepting both directions also
removed a special case — at the foot of a long obit there may be nothing left
to scroll down into, but there is always something to scroll back up to.

**Exit intent is desktop only.** It listens for `mouseleave` on the document
element with `clientY <= 0`: the pointer has genuinely left, and left upward.

There is no touch equivalent, deliberately. A fast-upward-flick heuristic was
tried and removed — its threshold was indistinguishable from an ordinary wheel
scroll, so it fired whenever anyone scrolled back up on a laptop, and it
collided with rule 5. One gesture cannot mean both "I am leaving" and "show me
the account offer." Touch visitors reach the same card through the 60%
threshold.

**The sign-in pop is removed, not rate-limited.** An obituary is not the page
type for it (22 Oct). Deleting it rather than disabling it means it cannot
return by someone flipping a flag.

---

## Still open

- **"Your own space on Legacy."** Jamie asked on DES-2295 whether Obituary.com
  visitors know what "Legacy" refers to here. Never answered; the prototype
  ships the Figma wording.
- **"Want more?" vs "Stay connected."** The follow success frame in Figma still
  carries the old eyebrow Jamie replaced on 19 Oct. The prototype uses the
  approved "Stay connected" in both places so one block does not carry two
  labels. Worth correcting in Figma.
- **Send Card.** Antonio flagged a planned Send Card offer as a revenue
  opportunity, and the end of the guestbook flow as a candidate for it. Not on
  the page today, so the prototype does not imply it — but it will want a place
  in this sequence if it lands.
- **Nothing today edits or saves a guestbook post.** Per Antonio, 22 Oct: no
  copy anywhere may suggest otherwise. Constrains the prompt's value
  proposition, not the trigger logic, but it is the easiest thing to get wrong.

---

## Implementation notes

All in `index.html`:

- `TRIGGERS` — the registry. `alwaysFires: true` marks the guestbook prompt as
  exempt from the allowance (rule 1).
- `canFire(id)` — the whole arbitration, in rule order.
- `fire(id)` — an exempt prompt sets `reservedFor` rather than spending `slot`,
  since it was never competing for it.
- State flags: `slot` (the generic allowance), `reservedFor` (rule 3),
  `posted`, `seenAccountOffer` (rule 2), `fired`, `openCount`.
- Constants: `SCROLL_DEPTH_TRIGGER = 0.60`, `SCROLL_AFTER_POST = 80`.

The scenario panel — top-right on desktop, collapsed to a pill at the foot of
the screen on phones — reports the allowance and every trigger's state live,
with a **Rate limiting** toggle to contrast against today's
behaviour, a **Reset session** button, and **Skip to posted** to reach the
prompt without typing a memory. `window.__gp` exposes `state`, `fire()` and
`triggers` for driving the flow from the console during a review.

Rate limiting off is a demo contrast, not a supported mode: it lets the generic
prompts stack so a reviewer can see what is being prevented. Rule 2 still
applies even then — it exists to avoid re-asking someone who already said yes,
which is true regardless.
