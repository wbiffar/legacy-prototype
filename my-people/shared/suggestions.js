/* Shared "Suggested people" recommendations for the My People FUTURE prototype.
   Candidates are surfaced with a human reason drawn from one of three signals:
   people you've saved, places you follow, and family/relationships. (Reasons
   are authored for the demo — a real system would derive them.) Dismissed and
   already-saved candidates drop out. Used by the dashboard and the person page. */
(function () {
  var STORE_KEY = 'legacyMyPeople.v0';
  function readStore(){ try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (_) { return {}; } }
  function writeStore(o){ try { localStorage.setItem(STORE_KEY, JSON.stringify(o)); } catch (_) {} }

  function readDismissed(){ var o = readStore(); return Array.isArray(o.dismissedSuggestions) ? o.dismissedSuggestions : []; }
  function dismiss(id){ var o = readStore(); var d = readDismissed(); if (d.indexOf(id) < 0) d.push(id); o.dismissedSuggestions = d; writeStore(o); }

  // reasonType: 'relationship' | 'people' | 'place' — the signal behind the suggestion.
  var CANDIDATES = [
    { id: 'eleanor', reasonType: 'relationship', icon: 'ph ph-tree-structure', reason: 'Possible family match · shares the Whitfield name' },
    { id: 'ralph',   reasonType: 'people',       icon: 'ph ph-users-three',    reason: 'Because you saved Anthony Thomas' },
    { id: 'marcus',  reasonType: 'place',        icon: 'ph ph-map-pin',        reason: 'Followed by people near Los Angeles, CA' },
  ];

  // Suggestions = candidates not already saved, not dismissed, and not the current person.
  function list(savedIds, excludeId){
    var saved = savedIds || [];
    var dis = readDismissed();
    return CANDIDATES.filter(function (c) {
      return c.id !== excludeId && saved.indexOf(c.id) < 0 && dis.indexOf(c.id) < 0;
    });
  }

  window.LEGACY_SUGGEST = { CANDIDATES: CANDIDATES, readDismissed: readDismissed, dismiss: dismiss, list: list };
})();
