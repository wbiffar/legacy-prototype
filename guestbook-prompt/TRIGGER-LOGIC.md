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

**Follow modal** — one card, two states:
["Never miss an update"](https://www.figma.com/design/djnZb62qRq3Y4W5HvQcGG1/des-2289-tukios-consumer-obit-adjustments?node-id=3626-41748)
→ ["You're all set!"](https://www.figma.com/design/djnZb62qRq3Y4W5HvQcGG1/des-2289-tukios-consumer-obit-adjustments?node-id=3626-41688).
Both generic triggers show it. The success state repeats the account offer,
which is why rule 1 exists.

**Account prompt** — the "Stay connected" card:
[mobile](https://www.figma.com/design/djnZb62qRq3Y4W5HvQcGG1/des-2289-tukios-consumer-obit-adjustments?node-id=3653-59029)
/ [desktop](https://www.figma.com/design/djnZb62qRq3Y4W5HvQcGG1/des-2289-tukios-consumer-obit-adjustments?node-id=3657-64954).

## Rules

Applied in this order.

1. **A completed follow ends all prompting** — it already made the account offer.
2. **Otherwise a post earns the prompt**, even after a dismissed modal.
3. **A post also stops the generic prompts** for that session.
4. **One generic prompt per session** — exit intent usually takes it.
5. **A scroll fires the prompt**, never a timer.

## What a visitor sees

| Path | Sees |
|---|---|
| Reads, leaves | Exit intent (or scroll threshold, whichever is first) |
| Posts | Account prompt |
| Generic → dismissed → posts | Both (2) |
| Generic → email submitted → posts | Follow modal only (1) |
| Posts, then a generic would fire | Account prompt only |
