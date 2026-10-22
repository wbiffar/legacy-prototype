# Account prompt trigger logic — DES-2305

Decisions from DES-2295 / DES-2305, 19–22 Oct 2026. The prototype here
implements exactly this.

[DES-2305](https://legacycom.atlassian.net/browse/DES-2305) ·
[DES-2295](https://legacycom.atlassian.net/browse/DES-2295) ·
[Figma](https://www.figma.com/design/djnZb62qRq3Y4W5HvQcGG1/des-2289-tukios-consumer-obit-adjustments)

## Triggers

| Trigger | Fires on | Shows |
|---|---|---|
| Scroll threshold | 60% depth | Follow modal |
| Exit intent | Pointer leaves via top. Desktop only | Follow modal |
| Guestbook prompt | A post, then 80px scroll either direction | Account prompt |
| ~~Sign-in pop~~ | — | Removed — wrong page type for it |

**Follow modal** (`3626:41748` → `3626:41688`): email capture, then "You're all
set!". Both generic triggers show this same card. Its success state repeats the
full account offer — same benefits, same buttons — which drives rule 2.

**Account prompt** (`3653:59029` / `3657:64954`): the "Stay connected" card.

## Rules

1. **A post earns the prompt.** It is exempt from the allowance, and a generic
   prompt the visitor *dismissed* does not block it. Writing a tribute is when
   the offer makes sense — too valuable to lose to a modal they waved away on
   the way in. Rule 2 is the one thing that overrides this.
2. **Completing the follow ends all prompting**, the guestbook prompt included
   — so someone who followed the page before posting does **not** get the
   prompt afterwards. They are already getting updates and the success state
   made the offer; asking again is asking twice. *Submitting* suppresses —
   dismissing with the X does not.
3. **Posting makes the generic prompts stand down** for the session.
4. **The generic prompts share one allowance.** First eligible wins, so exit
   intent leads for someone who reads and leaves.
5. **Fired by interaction, never a timer.** The post arms, a scroll fires.
   Trade-off accepted at the 20 Oct review: misses anyone who posts and leaves
   without scrolling.

**Ceiling: two prompts per session**, and only for someone who dismissed a
generic one and then posted. Complete the follow and it is one. Never three.

## What a visitor sees

| Path | Sees |
|---|---|
| Reads, leaves | Exit intent (or scroll threshold, whichever is first) |
| Posts | Account prompt |
| Generic → dismissed → posts | Both (2) |
| Generic → email submitted → posts | Follow modal only (1) |
| Posts, then a generic would fire | Account prompt only |

## Settled details

- **80px, either direction.** Was 180px down-only — too far on a phone, and up
  is the likelier gesture there. Either direction also removes the dead end at
  the foot of a long obit, where there is nothing left to scroll down into.
- **Exit intent is desktop only** — `mouseleave` on the document element,
  `clientY <= 0`. A fast-upward-flick fallback for touch was removed: its
  threshold matched an ordinary wheel scroll, and it collided with rule 5. One
  gesture cannot mean both "leaving" and "show me the offer". Touch gets the
  same card at 60%.
- **The sign-in pop is deleted, not disabled**, so it cannot return via a flag.

## Still open

- "Your own space on Legacy." — Jamie asked whether Obituary.com visitors know
  what Legacy is. Unanswered; prototype ships the Figma wording.
- Figma's success frame still says "Want more?"; the prototype uses the
  approved "Stay connected" in both places. Fix in Figma.
- A Send Card offer is planned (Antonio) and will want a place in this
  sequence. Not on the page today.
- Nothing today edits or saves a guestbook post — no copy may suggest it does.

## In the code

`index.html`: `TRIGGERS` registry (`alwaysFires` = rule 1), `canFire()` holds
the arbitration in rule order, state flags `slot` / `reservedFor` / `posted` /
`seenAccountOffer`, constants `SCROLL_DEPTH_TRIGGER` and `SCROLL_AFTER_POST`.

The scenario panel shows every trigger's state live, with a rate-limiting
toggle for contrast, a reset, and Skip to posted. `window.__gp` exposes
`state`, `fire()` and `triggers` for the console.
