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

  // User-level suggestions (dashboard "Possible matches"): every family-graph
  // person marked "possible" who has a page, plus any authored CANDIDATES —
  // minus anyone already saved/dismissed/current. Family members get a reason
  // straight from the graph ("Your grandfather's brother · Thomas family");
  // non-family candidates (e.g. Marcus by place) keep their authored reason.
  function list(savedIds, excludeId){
    var saved = savedIds || [];
    var dis = readDismissed();
    var fam = window.LEGACY_FAMILY;
    var people = window.LEGACY_PEOPLE || {};
    var authored = {}; CANDIDATES.forEach(function (c) { authored[c.id] = c; });

    // Candidate id pool: graph "possible" people with a page, then authored ids.
    var pool = [];
    if (fam) fam.byState('possible').forEach(function (id) { if (people[id] && pool.indexOf(id) < 0) pool.push(id); });
    CANDIDATES.forEach(function (c) { if (pool.indexOf(c.id) < 0) pool.push(c.id); });

    return pool.filter(function (id) {
      return id !== excludeId && saved.indexOf(id) < 0 && dis.indexOf(id) < 0;
    }).map(function (id) {
      if (fam && fam.reason(id)) return { id: id, reasonType: 'relationship', icon: 'ph ph-tree-structure', reason: fam.reason(id) };
      if (authored[id]) return authored[id];
      return { id: id, reasonType: 'people', icon: 'ph ph-users-three', reason: 'Suggested for you' };
    });
  }

  var STATES = { IL:'Illinois', CA:'California', MA:'Massachusetts', CO:'Colorado', NY:'New York', TX:'Texas', FL:'Florida' };
  function stateOf(loc){ var m = /,\s*([A-Z]{2})\b/.exec(loc || ''); return m ? m[1] : null; }

  // Person-specific suggestions: other people connected to `pid` by a shared
  // attribute (surname → family, funeral home, newspaper, or state), reason
  // phrased relative to the viewed person. Excludes current/saved/dismissed.
  // Note: saved people are NOT excluded — connections to the viewed person are
  // worth surfacing even if already in My People (the card reflects that state).
  function forPerson(pid){
    var P = window.LEGACY_PEOPLE || {};
    var me = P[pid]; if (!me) return [];
    var dis = readDismissed();
    var out = [];
    Object.keys(P).forEach(function (id) {
      if (id === pid || dis.indexOf(id) >= 0) return;
      var c = P[id];
      var s = null;
      if (c.last && me.last && c.last === me.last) {
        s = { reasonType: 'relationship', icon: 'ph ph-tree-structure', reason: 'Possibly related · both named ' + me.last };
      } else if (c.home && me.home && c.home === me.home) {
        s = { reasonType: 'place', icon: 'ph ph-buildings', reason: 'Also cared for by ' + me.home };
      } else if (c.source && me.source && c.source === me.source) {
        s = { reasonType: 'people', icon: 'ph ph-newspaper', reason: 'Also remembered in ' + me.source };
      } else if (stateOf(c.location) && stateOf(c.location) === stateOf(me.location)) {
        s = { reasonType: 'place', icon: 'ph ph-map-pin', reason: 'Also from ' + (STATES[stateOf(me.location)] || stateOf(me.location)) };
      }
      if (s) { s.id = id; out.push(s); }
    });
    return out;
  }

  // Collection-specific suggestions: people NOT already in the collection who
  // connect to any member (shared surname → family, funeral home, newspaper,
  // or state). Reason names the specific member. Strongest connection wins.
  function forCollection(coll){
    var P = window.LEGACY_PEOPLE || {};
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
        var s = null;
        if (c.last && m.last && c.last === m.last) s = { rank: 4, reasonType: 'relationship', icon: 'ph ph-tree-structure', reason: 'Shares the ' + m.last + ' name with ' + m.first };
        else if (c.home && m.home && c.home === m.home) s = { rank: 3, reasonType: 'place', icon: 'ph ph-buildings', reason: 'Also cared for by ' + m.home };
        else if (c.source && m.source && c.source === m.source) s = { rank: 2, reasonType: 'people', icon: 'ph ph-newspaper', reason: 'Also remembered in ' + m.source };
        else if (stateOf(c.location) && stateOf(c.location) === stateOf(m.location)) s = { rank: 1, reasonType: 'place', icon: 'ph ph-map-pin', reason: 'Also from ' + (STATES[stateOf(m.location)] || stateOf(m.location)) };
        if (s && (!best || s.rank > best.rank)) best = s;
      });
      if (best) { best.id = id; out.push(best); }
    });
    return out;
  }

  window.LEGACY_SUGGEST = { CANDIDATES: CANDIDATES, readDismissed: readDismissed, dismiss: dismiss, list: list, forPerson: forPerson, forCollection: forCollection };
})();
