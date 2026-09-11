/* Shared relationship taxonomy + store logic for the My People FUTURE prototype.
   DES-2265 — single source of truth for the selector on every surface that
   captures a relationship: the person page modal (future-index.html), the
   My People dashboard sheet (future-my-people.html), and the post-save flow.
   Collections don't capture a relationship — they render the resulting badge
   on person cards, so they inherit whatever this file produces.

   SHAPE (DES-2265):
     - Six top-level categories. Family is the ONLY one that drills in.
     - One second tier, under family only. There is NO third tier: the
       biological / step / adoptive / foster / guardian variants are an inline
       reveal *inside* the second tier, not another pane.
     - Non-blood is first class — social, adoptive, step, guardian and
       gender-neutral terms sit alongside the gendered ones, not behind them.
     - "Other" is an escape hatch with no free-text field. We accept learning
       nothing from it.

   Relationships persist in the same localStorage store as saved/following,
   under `relationships[id] = { category, relation, detail, badge }`.
   `detail` holds the qualifier id ('step', 'foster'…) or null. A legacy plain
   string is still read as a bare badge. */
(function () {
  var STORE_KEY = 'legacyMyPeople.v0';

  function readStore(){ try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (_) { return {}; } }
  function writeStore(o){ try { localStorage.setItem(STORE_KEY, JSON.stringify(o)); } catch (_) {} }
  function readRelationships(){ var o = readStore(); return (o.relationships && typeof o.relationships === 'object') ? o.relationships : {}; }
  function relBadge(v){ return v ? (typeof v === 'string' ? v : v.badge) : null; }
  function setRelationship(id, obj){ var o = readStore(); o.relationships = readRelationships(); o.relationships[id] = obj; writeStore(o); }
  function clearRelationship(id){ var o = readStore(); o.relationships = readRelationships(); delete o.relationships[id]; writeStore(o); }

  /* ------------------------------------------------------------------ *
   * Top level — six options, one tier deep except family.
   *   drills : family alone opens a second tier. The asymmetry is
   *            deliberate, so only family gets a caret.
   *   tone   : 'primary' = full pill. 'muted' = de-emphasized, so "other"
   *            and "I didn't know them" aren't the path of least resistance.
   *   badge  : the noun used in the "My ___" person-page label, or null when
   *            the category has no natural "My X" form and shows nothing.
   * ------------------------------------------------------------------ */
  var CATEGORIES = [
    { id: 'family',  label: 'Family',              drills: true,  tone: 'primary', badge: null      },
    { id: 'friends', label: 'Friend',              drills: false, tone: 'primary', badge: 'friend'  },
    { id: 'school',  label: 'School',              drills: false, tone: 'primary', badge: 'classmate' },
    { id: 'work',    label: 'Work',                drills: false, tone: 'primary', badge: 'colleague' },
    { id: 'other',   label: 'Other',               drills: false, tone: 'muted',   badge: null      },
    { id: 'unknown', label: 'I didn’t know them',  drills: false, tone: 'muted',   badge: null      },
  ];
  function category(id){ for (var i=0;i<CATEGORIES.length;i++) if (CATEGORIES[i].id === id) return CATEGORIES[i]; return null; }

  /* ------------------------------------------------------------------ *
   * Qualifier sets — the inline reveal under a chosen family relation.
   *   badge : the full display noun when this qualifier changes the word.
   *           null means "use the base relation", which is the point for
   *           adoptive: adoption makes you the mother, so it reads "My
   *           mother". Step and foster stay explicit because the distinction
   *           is the one people actually mean to draw.
   * ------------------------------------------------------------------ */
  var Q = {
    parent: [
      { id: 'bio',      label: 'Biological', badge: null },
      { id: 'step',     label: 'Step',       badge: 'step{base}' },
      { id: 'adoptive', label: 'Adoptive',   badge: null },
      { id: 'foster',   label: 'Foster',     badge: 'foster {base}' },
      { id: 'guardian', label: 'Guardian',   badge: 'guardian' },
    ],
    child: [
      { id: 'bio',      label: 'Biological', badge: null },
      { id: 'step',     label: 'Step',       badge: 'step{base}' },
      { id: 'adoptive', label: 'Adoptive',   badge: null },
      { id: 'foster',   label: 'Foster',     badge: 'foster {base}' },
    ],
    sibling: [
      { id: 'bio',      label: 'Biological', badge: null },
      { id: 'half',     label: 'Half',       badge: 'half-{base}' },
      { id: 'step',     label: 'Step',       badge: 'step{base}' },
      { id: 'adoptive', label: 'Adoptive',   badge: null },
      { id: 'foster',   label: 'Foster',     badge: 'foster {base}' },
    ],
    grand: [
      { id: 'bio',      label: 'Biological', badge: null },
      { id: 'step',     label: 'Step',       badge: 'step-{base}' },
      { id: 'adoptive', label: 'Adoptive',   badge: null },
      { id: 'great',    label: 'Great-',     badge: 'great-{base}' },
    ],
    extended: [
      { id: 'birth',    label: 'By birth',    badge: null },
      { id: 'marriage', label: 'By marriage', badge: null },
      { id: 'great',    label: 'Great-',      badge: 'great-{base}' },
    ],
    cousin: [
      { id: 'first',    label: 'First cousin',  badge: null },
      { id: 'second',   label: 'Second cousin', badge: 'second cousin' },
      { id: 'marriage', label: 'By marriage',   badge: null },
    ],
    // In-law is a catch-all, so its qualifier does real work: it's the
    // difference between a mother-in-law and a son-in-law. Keeping it as an
    // inline reveal avoids spending a dozen second-tier slots on in-laws.
    inlaw: [
      { id: 'parent',  label: 'Parent-in-law',  badge: 'parent-in-law'  },
      { id: 'child',   label: 'Child-in-law',   badge: 'child-in-law'   },
      { id: 'sibling', label: 'Sibling-in-law', badge: 'sibling-in-law' },
    ],
    // Spouses and partners take no qualifier — the term already says it.
    none: [],
  };

  /* ------------------------------------------------------------------ *
   * Family second tier. `more:true` sits behind "More family relationships"
   * so the collapsed state stays short; the ticket's default-vs-expanded
   * split. Gender-neutral terms sit inline with the gendered pair, never
   * demoted to the expanded set.
   * ------------------------------------------------------------------ */
  var FAMILY = [
    { id: 'mother',      label: 'Mother',      q: 'parent',   more: false },
    { id: 'father',      label: 'Father',      q: 'parent',   more: false },
    { id: 'parent',      label: 'Parent',      q: 'parent',   more: false },
    { id: 'daughter',    label: 'Daughter',    q: 'child',    more: false },
    { id: 'son',         label: 'Son',         q: 'child',    more: false },
    { id: 'child',       label: 'Child',       q: 'child',    more: false },
    { id: 'sister',      label: 'Sister',      q: 'sibling',  more: false },
    { id: 'brother',     label: 'Brother',     q: 'sibling',  more: false },
    { id: 'sibling',     label: 'Sibling',     q: 'sibling',  more: false },
    { id: 'grandmother', label: 'Grandmother', q: 'grand',    more: false },
    { id: 'grandfather', label: 'Grandfather', q: 'grand',    more: false },
    { id: 'grandparent', label: 'Grandparent', q: 'grand',    more: false },

    { id: 'wife',        label: 'Wife',        q: 'none',     more: true },
    { id: 'husband',     label: 'Husband',     q: 'none',     more: true },
    { id: 'spouse',      label: 'Spouse',      q: 'none',     more: true },
    { id: 'partner',     label: 'Partner',     q: 'none',     more: true },
    { id: 'granddaughter', label: 'Granddaughter', q: 'grand', more: true },
    { id: 'grandson',    label: 'Grandson',    q: 'grand',    more: true },
    { id: 'grandchild',  label: 'Grandchild',  q: 'grand',    more: true },
    { id: 'aunt',        label: 'Aunt',        q: 'extended', more: true },
    { id: 'uncle',       label: 'Uncle',       q: 'extended', more: true },
    { id: 'cousin',      label: 'Cousin',      q: 'cousin',   more: true },
    { id: 'niece',       label: 'Niece',       q: 'extended', more: true },
    { id: 'nephew',      label: 'Nephew',      q: 'extended', more: true },
    { id: 'inlaw',       label: 'In-law',      q: 'inlaw',    more: true },
    // Escape hatch inside family. "My other family" doesn't read, so it
    // displays as the one word that covers anyone: relative.
    { id: 'famother',    label: 'Other family', q: 'none',     more: true, badge: 'relative' },
  ];
  function familyRelation(id){ for (var i=0;i<FAMILY.length;i++) if (FAMILY[i].id === id) return FAMILY[i]; return null; }
  function familyDefaults(){ return FAMILY.filter(function (r) { return !r.more; }); }
  function familyMore(){ return FAMILY.filter(function (r) { return r.more; }); }
  function qualifiersFor(relId){ var r = familyRelation(relId); return r ? (Q[r.q] || []) : []; }
  function qualifier(relId, qId){ var list = qualifiersFor(relId); for (var i=0;i<list.length;i++) if (list[i].id === qId) return list[i]; return null; }

  /* ------------------------------------------------------------------ *
   * Value → display label. Every selectable value maps to exactly one
   * badge noun, or to null when nothing should display. Family labels come
   * from the second tier, never the bucket.
   * ------------------------------------------------------------------ */
  function computeBadge(catId, relId, qId) {
    var cat = category(catId);
    if (!cat) return null;
    if (cat.id !== 'family') return cat.badge;          // friend / classmate / colleague, or null
    var rel = familyRelation(relId);
    if (!rel) return null;
    var base = rel.badge || rel.label.toLowerCase();
    var q = qualifier(relId, qId);
    if (!q || !q.badge) return base;                     // biological / adoptive / by birth → the plain term
    return q.badge.replace('{base}', base);
  }

  // "My mother" / "My step-grandfather" — or null for the categories with no
  // natural possessive form (other, I didn't know them), which display nothing.
  function displayLabel(v) {
    var badge = relBadge(v);
    return badge ? 'My ' + String(badge).toLowerCase() : null;
  }

  // Badges are stored canonically lowercase so each surface can case them to
  // fit: "My great-aunt" inline on the person page, "Great-aunt" as a card
  // chip. Only the first letter moves — "great-aunt" must not become
  // "Great-Aunt".
  function sentenceCase(s){ s = String(s || ''); return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  // True when a stored value is a real selection that simply has no label to
  // show. Lets a surface tell "set, but silent" apart from "never asked".
  function isSilent(v) {
    if (!v || typeof v === 'string') return false;
    return (v.category === 'other' || v.category === 'unknown');
  }

  window.LEGACY_REL = {
    STORE_KEY: STORE_KEY,
    readStore: readStore, writeStore: writeStore,
    readRelationships: readRelationships, relBadge: relBadge,
    setRelationship: setRelationship, clearRelationship: clearRelationship,
    CATEGORIES: CATEGORIES, FAMILY: FAMILY, QUALIFIERS: Q,
    category: category, familyRelation: familyRelation,
    familyDefaults: familyDefaults, familyMore: familyMore,
    qualifiersFor: qualifiersFor, qualifier: qualifier,
    computeBadge: computeBadge, displayLabel: displayLabel, isSilent: isSilent,
    sentenceCase: sentenceCase,
  };
})();
