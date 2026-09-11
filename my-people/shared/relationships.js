/* Shared relationship taxonomy + store logic for the My People FUTURE prototype.
   DES-2265. Single source of truth for every surface that captures a
   relationship: the person page modal (future-index.html), the My People
   dashboard sheet (future-my-people.html), and the post-save flow. Collections
   don't capture — they render the resulting badge on person cards.

   SOURCES
     Data model : Figma board "Relationships" 5:222 (the Type 0/1/2 table)
     Front end  : Figma "Saved Person Future Board Presentation" 6621:23844

   SHAPE
     - Seven flat top-level options. The board nests School / Work / Faith
       Community / Military Service under an "Other" bucket; the front end does
       NOT show that bucket, so they surface as peers of Family and Friend.
       There is no "Other" option in the UI.
     - Family is the only option that drills in, to six gender-neutral GROUPS
       (Grandparent, Parent, Sibling, Child, Spouse, Other relative).
     - The group IS a complete answer — we save there ("Saved. Douglas is my
       Parent."). The specific role (Father, Step-father, Father-in-law...) is
       an OPTIONAL refinement offered after the save. That's how the third tier
       exists without adding a required step to the flow.
     - Step / half / in-law variants are peers of the base term inside a group,
       not modifiers of it.

   STORE
     relationships[id] = { top, group, specific, badge }
     `group` and `specific` are null for non-family answers. A legacy plain
     string, or the earlier { category, relation, detail, badge } shape, is
     still read for its badge so older demo state doesn't break. */
(function () {
  var STORE_KEY = 'legacyMyPeople.v0';

  function readStore(){ try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (_) { return {}; } }
  function writeStore(o){ try { localStorage.setItem(STORE_KEY, JSON.stringify(o)); } catch (_) {} }
  function readRelationships(){ var o = readStore(); return (o.relationships && typeof o.relationships === 'object') ? o.relationships : {}; }
  function relBadge(v){ return v ? (typeof v === 'string' ? v : v.badge) : null; }
  function setRelationship(id, obj){ var o = readStore(); o.relationships = readRelationships(); o.relationships[id] = obj; writeStore(o); }
  function clearRelationship(id){ var o = readStore(); o.relationships = readRelationships(); delete o.relationships[id]; writeStore(o); }

  /* ------------------------------------------------------------------ *
   * Top level — seven options, shown flat and at equal weight.
   *   drills : Family alone opens the group tier.
   *   badge      : the label shown on the chip, or null to show nothing.
   *   possessive : false where "My ___" doesn't work. You can have a friend
   *                or a colleague, but not "my faith community" as a person —
   *                those chips read as a shared context, not a possessive.
   * ------------------------------------------------------------------ */
  var TOP = [
    { id: 'family',   label: 'Family',             drills: true,  badge: null },
    { id: 'friend',   label: 'Friend',             drills: false, badge: 'Friend',    possessive: true },
    // COPY TO CONFIRM: the board defines no display labels for the tier-less
    // categories. These are stand-ins — DES-2265 flags the same open question
    // ("school could be 'My classmate' or 'My schoolmate'").
    { id: 'school',   label: 'School',             drills: false, badge: 'Classmate', possessive: true },
    { id: 'work',     label: 'Work',               drills: false, badge: 'Colleague', possessive: true },
    // No person-noun works for these two without inventing one, so the chip
    // states the shared context instead of forcing an awkward possessive.
    { id: 'faith',    label: 'Faith Community',    drills: false, badge: 'Faith community',  possessive: false },
    { id: 'military', label: 'Military Service',   drills: false, badge: 'Military service', possessive: false },
    { id: 'unknown',  label: 'I didn’t know them', drills: false, badge: null },
  ];
  function top(id){ for (var i=0;i<TOP.length;i++) if (TOP[i].id === id) return TOP[i]; return null; }

  /* ------------------------------------------------------------------ *
   * Family groups, in the Figma grid's reading order (2 columns):
   *   Grandparent | Parent
   *   Sibling     | Child
   *   Spouse      | Other relative
   *
   * Board spellings "Grand father" / "Great-grand mother" are normalized to
   * the closed-up forms here — they read as spacing typos in the source table.
   * ------------------------------------------------------------------ */
  var GROUPS = [
    { id: 'grandparent', label: 'Grandparent',  specifics: ['Grandfather', 'Grandmother', 'Great-grandfather', 'Great-grandmother'] },
    { id: 'parent',      label: 'Parent',       specifics: ['Father', 'Mother', 'Step-father', 'Step-mother', 'Father-in-law', 'Mother-in-law'] },
    { id: 'sibling',     label: 'Sibling',      specifics: ['Brother', 'Sister', 'Step-brother', 'Step-sister', 'Brother-in-law', 'Sister-in-law', 'Half-brother', 'Half-sister'] },
    { id: 'child',       label: 'Child',        specifics: ['Son', 'Daughter', 'Step-son', 'Step-daughter', 'Son-in-law', 'Daughter-in-law'] },
    { id: 'spouse',      label: 'Spouse',       specifics: ['Husband', 'Wife', 'Partner'] },
    // Wes's wording, deliberately diverging from the board's "Other Family".
    // The chip still says Relative, since "My Other relative" isn't a phrase.
    { id: 'otherfamily', label: 'Other relative', badge: 'Relative', specifics: ['Uncle', 'Aunt', 'Cousin', 'Nephew', 'Niece'] },
  ];
  function group(id){ for (var i=0;i<GROUPS.length;i++) if (GROUPS[i].id === id) return GROUPS[i]; return null; }
  function specificsFor(groupId){ var g = group(groupId); return g ? g.specifics.slice() : []; }

  /* ------------------------------------------------------------------ *
   * Value -> display label. Every selectable value resolves to exactly one
   * badge noun, or to null when nothing should display.
   * ------------------------------------------------------------------ */
  function computeBadge(topId, groupId, specific) {
    var t = top(topId);
    if (!t) return null;
    if (!t.drills) return t.badge;              // Friend / Classmate / ... or null
    if (specific) return specific;              // the refined role wins
    var g = group(groupId);
    return g ? (g.badge || g.label) : null;     // the group is a complete answer
  }

  // "My Parent" / "My Step-father" for the possessive answers, the bare label
  // ("Faith community") for the ones that aren't, and null for "I didn't know
  // them", which displays nothing. Pass the whole stored object, not just the
  // badge — the possessive rule lives on the top-level option.
  function displayLabel(v) {
    var badge = relBadge(v);
    if (!badge) return null;
    var t = (v && typeof v === 'object') ? top(v.top || v.category) : null;
    if (t && t.possessive === false) return badge;
    return 'My ' + badge;
  }

  // True when a stored value is a real answer that simply has no label to
  // show. Lets a surface tell "answered, silent" apart from "never asked".
  function isSilent(v) {
    if (!v || typeof v === 'string') return false;
    var t = v.top || v.category;               // tolerate the earlier shape
    return t === 'unknown' || t === 'other';
  }

  // Only the first letter moves -- "Step-father" must not become "Step-Father".
  function sentenceCase(s){ s = String(s || ''); return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  window.LEGACY_REL = {
    STORE_KEY: STORE_KEY,
    readStore: readStore, writeStore: writeStore,
    readRelationships: readRelationships, relBadge: relBadge,
    setRelationship: setRelationship, clearRelationship: clearRelationship,
    TOP: TOP, GROUPS: GROUPS,
    top: top, group: group, specificsFor: specificsFor,
    computeBadge: computeBadge, displayLabel: displayLabel,
    isSilent: isSilent, sentenceCase: sentenceCase,
  };
})();
