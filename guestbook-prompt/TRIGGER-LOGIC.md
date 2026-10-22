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

In the order `canFire()` applies them.

1. **A completed follow ends all prompting**, the guestbook prompt included.
   That success state already made the account offer; asking again is asking
   twice. *Submitting* suppresses — dismissing with the X does not.
2. **Otherwise a post earns the prompt** — exempt from the allowance, and from
   any generic prompt the visitor dismissed. A tribute is when the offer makes
   sense.
3. **A post also stands the generic prompts down** for the session.
4. **Generic prompts share one allowance.** First eligible wins, so exit intent
   leads for someone who reads and leaves.
5. **Interaction fires the prompt, never a timer**: the post arms, a scroll
   fires. Accepted 20 Oct — misses anyone who posts and leaves without
   scrolling.

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
