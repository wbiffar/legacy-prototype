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

**Follow modal** — Figma:
[capture](https://www.figma.com/design/djnZb62qRq3Y4W5HvQcGG1/des-2289-tukios-consumer-obit-adjustments?node-id=3626-41748)
→ [success](https://www.figma.com/design/djnZb62qRq3Y4W5HvQcGG1/des-2289-tukios-consumer-obit-adjustments?node-id=3626-41688).
"Never miss an update" takes an email, then "You're all set!" confirms it. Both
generic triggers show this same card. The success state repeats the full
account offer — same benefits, same buttons — which is what drives rule 1.

**Account prompt** — Figma:
[mobile](https://www.figma.com/design/djnZb62qRq3Y4W5HvQcGG1/des-2289-tukios-consumer-obit-adjustments?node-id=3653-59029)
/ [desktop](https://www.figma.com/design/djnZb62qRq3Y4W5HvQcGG1/des-2289-tukios-consumer-obit-adjustments?node-id=3657-64954).
The "Stay connected" card.

## Rules

Applied in this order.

1. **A completed follow ends all prompting** — it already made the account offer.
2. **Otherwise a post earns the prompt**, even after a dismissed modal.
3. **A post also stops the generic prompts** for that session.
4. **One generic prompt per session** — exit intent usually takes it.
5. **A scroll fires the prompt**, never a timer.

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
