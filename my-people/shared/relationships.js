/* Shared relationship data + store logic for the My People FUTURE prototype.
   Used by both the dashboard (future-my-people.html) and the person page
   (future-index.html) so the options and badge rules live in one place.
   Relationships persist in the same localStorage store as saved/following,
   under `relationships[id] = { category, relation, detail, badge }`. */
(function () {
  var STORE_KEY = 'legacyMyPeople.v0';

  function readStore(){ try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (_) { return {}; } }
  function writeStore(o){ try { localStorage.setItem(STORE_KEY, JSON.stringify(o)); } catch (_) {} }
  function readRelationships(){ var o = readStore(); return (o.relationships && typeof o.relationships === 'object') ? o.relationships : {}; }
  function relBadge(v){ return v ? (typeof v === 'string' ? v : v.badge) : null; }
  function setRelationship(id, obj){ var o = readStore(); o.relationships = readRelationships(); o.relationships[id] = obj; writeStore(o); }

  // Top-level categories shown on the first relationship pane.
  var CATEGORIES = ['Family', 'Friend/Acquaintance', 'School', 'Work'];

  // Every family relation drills into a connection-type step. Options are
  // relation-appropriate and inclusive of blended, adoptive, and chosen family.
  var FAM_DETAIL = {
    Father:      ['Biological father', 'Adoptive father', 'Stepfather', 'Foster father', 'Guardian', 'Skip This'],
    Mother:      ['Biological mother', 'Adoptive mother', 'Stepmother', 'Foster mother', 'Guardian', 'Skip This'],
    Brother:     ['Biological brother', 'Half-brother', 'Stepbrother', 'Adoptive brother', 'Foster brother', 'Skip This'],
    Sister:      ['Biological sister', 'Half-sister', 'Stepsister', 'Adoptive sister', 'Foster sister', 'Skip This'],
    Grandfather: ['Biological grandfather', 'Step-grandfather', 'Adoptive grandfather', 'Skip This'],
    Grandmother: ['Biological grandmother', 'Step-grandmother', 'Adoptive grandmother', 'Skip This'],
    Grandchild:  ['Biological grandchild', 'Step-grandchild', 'Adoptive grandchild', 'Skip This'],
    Aunt:        ['Aunt by birth', 'Aunt by marriage', 'Great-aunt', 'Skip This'],
    Uncle:       ['Uncle by birth', 'Uncle by marriage', 'Great-uncle', 'Skip This'],
    Cousin:      ['First cousin', 'Second cousin', 'Cousin by marriage', 'Skip This'],
    Niece:       ['Niece by birth', 'Niece by marriage', 'Great-niece', 'Skip This'],
    Nephew:      ['Nephew by birth', 'Nephew by marriage', 'Great-nephew', 'Skip This'],
  };
  // Family relations (first pane after Family), in display order.
  var FAMILY_RELATIONS = ['Father', 'Mother', 'Brother', 'Sister', 'Grandfather', 'Grandmother', 'Grandchild', 'Aunt', 'Uncle', 'Cousin', 'Niece', 'Nephew'];

  function isStep(detail){ return !!(detail && /^step/i.test(detail)); }
  // Badge = base relation, EXCEPT step-relations which stay explicit.
  function computeBadge(base, detail){ return isStep(detail) ? detail : base; }

  window.LEGACY_REL = {
    STORE_KEY: STORE_KEY,
    readStore: readStore, writeStore: writeStore,
    readRelationships: readRelationships, relBadge: relBadge, setRelationship: setRelationship,
    CATEGORIES: CATEGORIES, FAM_DETAIL: FAM_DETAIL, FAMILY_RELATIONS: FAMILY_RELATIONS,
    isStep: isStep, computeBadge: computeBadge,
  };
})();
