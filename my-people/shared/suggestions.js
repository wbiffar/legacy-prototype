/* Shared "Suggested people" recommendations for the My People FUTURE prototype.
   A connection is only strong enough to suggest when people share a LAST NAME
   or a FAMILY RELATIONSHIP (from the LEGACY_FAMILY graph). Weaker coincidences
   — same hometown/state or same newspaper — are intentionally NOT used.
   Dismissed candidates drop out. Used by the dashboard and the person page. */
(function () {
  var STORE_KEY = 'legacyMyPeople.v0';
  function readStore(){ try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (_) { return {}; } }
  function writeStore(o){ try { localStorage.setItem(STORE_KEY, JSON.stringify(o)); } catch (_) {} }

  function readDismissed(){ var o = readStore(); return Array.isArray(o.dismissedSuggestions) ? o.dismissedSuggestions : []; }
  function dismiss(id){ var o = readStore(); var d = readDismissed(); if (d.indexOf(id) < 0) d.push(id); o.dismissedSuggestions = d; writeStore(o); }

  function cap(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  // User-level suggestions (dashboard "Possible matches"): every family-graph
  // person marked "possible" who has a page and a relationship to you — minus
  // anyone already saved/dismissed/current. Reason comes straight from the graph
  // ("Your grandfather's brother · Thomas family"). People with no last-name or
  // relationship tie (e.g. a same-city coincidence) are excluded by design.
  function list(savedIds, excludeId){
    var saved = savedIds || [];
    var dis = readDismissed();
    var fam = window.LEGACY_FAMILY;
    var people = window.LEGACY_PEOPLE || {};
    if (!fam) return [];
    return fam.byState('possible').filter(function (id) {
      return people[id] && fam.reason(id) && id !== excludeId && saved.indexOf(id) < 0 && dis.indexOf(id) < 0;
    }).map(function (id) {
      return { id: id, reasonType: 'relationship', icon: 'ph ph-tree-structure', reason: fam.reason(id) };
    });
  }

  // Person-specific suggestions: other people connected to `pid` by a family
  // relationship (parent/child/spouse/sibling) or a shared last name. Reason is
  // phrased relative to the viewed person. Excludes current/dismissed.
  // Note: saved people are NOT excluded — a connection is worth surfacing even
  // if already in My People (the card reflects that state).
  function forPerson(pid){
    var P = window.LEGACY_PEOPLE || {};
    var fam = window.LEGACY_FAMILY;
    var me = P[pid]; if (!me) return [];
    var dis = readDismissed();
    var out = [];
    Object.keys(P).forEach(function (id) {
      if (id === pid || dis.indexOf(id) >= 0) return;
      var c = P[id];
      var rel = fam ? fam.relationBetween(pid, id) : null;
      var s = null;
      if (rel) {
        s = { reasonType: 'relationship', icon: 'ph ph-tree-structure', reason: me.first + '’s ' + rel };
      } else if (c.last && me.last && c.last === me.last) {
        s = { reasonType: 'relationship', icon: 'ph ph-tree-structure', reason: 'Possibly related · both named ' + me.last };
      }
      if (s) { s.id = id; out.push(s); }
    });
    return out;
  }

  // Collection-specific suggestions: people NOT already in the collection who
  // connect to a member by family relationship or a shared last name. Reason
  // names the specific member. Strongest connection wins (relationship > name).
  function forCollection(coll){
    var P = window.LEGACY_PEOPLE || {};
    var fam = window.LEGACY_FAMILY;
    var members = (coll && coll.people) || [];
    if (!members.length) return [];
    var dis = readDismissed();
    var out = [];
    Object.keys(P).forEach(function (id) {
      if (members.indexOf(id) >= 0 || dis.indexOf(id) >= 0) return;
      var c = P[id];
      var best = null;
      members.forEach(function (mid) {
        var m = P[mid]; if (!m) return;
        var rel = fam ? fam.relationBetween(mid, id) : null;
        var s = null;
        if (rel) s = { rank: 2, reasonType: 'relationship', icon: 'ph ph-tree-structure', reason: m.first + '’s ' + rel };
        else if (c.last && m.last && c.last === m.last) s = { rank: 1, reasonType: 'relationship', icon: 'ph ph-tree-structure', reason: 'Shares the ' + m.last + ' name with ' + m.first };
        if (s && (!best || s.rank > best.rank)) best = s;
      });
      if (best) { best.id = id; out.push(best); }
    });
    return out;
  }

  window.LEGACY_SUGGEST = { readDismissed: readDismissed, dismiss: dismiss, list: list, forPerson: forPerson, forCollection: forCollection };
})();
