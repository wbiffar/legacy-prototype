# My People — Relationship Tree (DES-2251 §5)

The canonical map of how the demo people connect. It's the single source of
truth for the family graph so relationships, suggestions ("possible matches"),
historical records, and a future tree view all tell one consistent story.

Encoded in [`shared/family.js`](shared/family.js) as `window.LEGACY_FAMILY`.

## The spine

Everything hangs off **You (John)**. The two families meet *through you*:

- **Thomas = your father's side**
- **Whitfield = your mother's side**

Four tiers, described by relationship to you.

## The cast

| Person | id | Surname | Life | Relationship to You | State |
|---|---|---|---|---|---|
| You | `you` | — | — | anchor | anchor |
| Your Father | `dad` | Thomas | — | father | no page yet |
| Your Mother | `mom` | Whitfield | — | mother | no page yet |
| Anthony M. Thomas | `mohammad`¹ | Thomas | 1940–2024 | paternal **grandfather** | In My People |
| Ralph Thomas | `ralph` | Thomas | 1935–2023 | grandfather's brother → **great-uncle** | Possible |
| Patricia Ramirez | `patricia` | Ramirez | 1938–2019 | great-uncle's wife | Possible |
| Robert Thomas | `robert` | Thomas | 1904–1979 | paternal **great-grandfather** | Possible |
| Veronica Delgado | `veronica` | Delgado | 1908–1986 | paternal **great-grandmother** | Possible |
| George Whitfield | `george` | Whitfield | 1912–1988 | maternal **grandfather** | Possible |
| Margaret Whitfield | `margaret` | Whitfield | 1916–1994 | maternal **grandmother** | Possible |
| Eleanor Whitfield | `eleanor` | Whitfield | 1938–2024 | maternal **aunt** | Possible |
| Douglas Whitfield | `douglas` | Whitfield | 1948–2023 | maternal **uncle** | In My People |
| Jennifer Sanderson | `jennifer` | Sanderson | 1951–2024 | **family friend** (non-blood) | In My People |
| Marcus Reed | `marcus` | Reed | 1955–2023 | **no blood tie** — same-city match | Possible |

¹ `mohammad` is the existing store id that already holds Anthony M. Thomas — we keep the id; it reads as Anthony everywhere.

## The connections (edges)

**Marriages:** Robert × Veronica · Ralph × Patricia · George × Margaret · Dad × Mom

**Parent → children:**

- Robert & Veronica → **Anthony, Ralph** *(brothers)*
- Anthony → **Dad**
- George & Margaret → **Mom, Eleanor, Douglas** *(siblings)*
- Dad & Mom → **You**

Elena / Sofia (Ralph's daughters, from his obituary) are intentionally left off the core tree.

## Why these people

- **Both surnames anchored in you**, so it's one tree, not two disconnected clusters.
- **Ralph + Robert + Veronica** match the Historical Records feature — Ralph's 1940 census names Robert & Veronica, so the tree and the records reinforce each other.
- **Four non-Thomas/Whitfield surnames** as requested: Delgado, Ramirez (married/born into the lines) and Sanderson, Reed (in your circle but not blood).

## States (align with the store's default saved set)

- **Saved** (`saved = mohammad, douglas, jennifer`): Anthony, Douglas, Jennifer
- **Possible match**: Ralph, Patricia, Robert, Veronica, George, Margaret, Eleanor, Marcus
- **Known — no page yet**: Your Father, Your Mother
- **Anchor**: You

## Encoding

`shared/family.js` exposes `window.LEGACY_FAMILY`:

- `PEOPLE` — one entry per id: `{ name, dates, surname, line, tier, relToYou, state, parents[], spouse[] }`. Children are derived from `parents`.
- Helpers: `get(id)`, `parentsOf(id)`, `spouseOf(id)`, `childrenOf(id)`, `siblingsOf(id)`, `relTo(id)`, `reason(id)`, `byState(state)`, `all()`.
- `reason(id)` returns a human line like `"Your grandfather's brother · Thomas family"` — read by the "Possible matches" surface so reasons come from the graph, not hardcoded strings.

`line` is `thomas` | `whitfield` | `none`. `tier` is `greatgrand` | `grand` | `parent` | `you` | `circle`.
