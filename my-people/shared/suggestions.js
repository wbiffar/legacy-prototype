/* Shared "Suggested people" recommendations for the My People FUTURE prototype.
   A connection is only strong enough to suggest when people share a LAST NAME
   or a FAMILY RELATIONSHIP (from the LEGACY_FAMILY graph). Weaker coincidences
   — same hometown/state or same newspaper — are intentionally NOT used.
   Dismissed candidates drop out. Used by the dashboard and the person page.

   The "Possible Matches" carousels (DES-2304) always have POOL_SIZE candidates
   to draw on: the graph matches above come first, then the recommendation pool
   from people.js tops the list up. The carousel shows the first PAGE_SIZE and
   backfills from the rest as cards are added or dismissed. */
(function () {
  var STORE_KEY = 'legacyMyPeople.v0';
  function readStore(){ try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (_) { return {}; } }
  function writeStore(o){ try { localStorage.setItem(STORE_KEY, JSON.stringify(o)); } catch (_) {} }

  function readDismissed(){ var o = readStore(); return Array.isArray(o.dismissedSuggestions) ? o.dismissedSuggestions : []; }
  function dismiss(id){ var o = readStore(); var d = readDismissed(); if (d.indexOf(id) < 0) d.push(id); o.dismissedSuggestions = d; writeStore(o); }

  function cap(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  // The carousel keeps POOL_SIZE suggestions available and shows PAGE_SIZE of
  // them at a time; the rest are held back to fill the gaps left by cards the
  // user adds or dismisses.
  var POOL_SIZE = 30;
  var PAGE_SIZE = 15;

  // Recommendation-pool ids, in the order people.js declares them. They pad the
  // graph matches out to POOL_SIZE, and are kept out of the organic last-name /
  // relationship matching so the person and collection pages keep suggesting
  // only people with a real tie.
  function isPoolId(id){ return id.indexOf('rec') === 0; }
  function poolIds(){
    return Object.keys(window.LEGACY_PEOPLE || {}).filter(isPoolId);
  }
  // Top `out` up to POOL_SIZE with pool people, skipping anyone excluded,
  // already suggested, saved or dismissed.
  function topUp(out, skip){
    var dis = readDismissed();
    var have = {};
    out.forEach(function (s) { have[s.id] = true; });
    poolIds().forEach(function (id) {
      if (out.length >= POOL_SIZE) return;
      if (have[id] || dis.indexOf(id) >= 0 || skip.indexOf(id) >= 0) return;
      out.push({ id: id, reasonType: 'pool', icon: 'ph ph-user-circle-plus', reason: '' });
    });
    return out.slice(0, POOL_SIZE);
  }

  // User-level suggestions (dashboard "Possible matches"): every family-graph
  // person marked "possible" who has a page and a relationship to you — minus
  // anyone already saved/dismissed/current. Reason comes straight from the graph
  // ("Your grandfather's brother · Thomas family"). People with no last-name or
  // relationship tie (e.g. a same-city coincidence) are excluded by design.
  function list(savedIds, excludeId){
    var saved = savedIds || [];
    // Suggestions are built off the people you've saved, so with an empty My
    // People there is nothing to suggest — the carousel shows its empty state.
    if (!saved.length) return [];
    var dis = readDismissed();
    var fam = window.LEGACY_FAMILY;
    var people = window.LEGACY_PEOPLE || {};
    var out = !fam ? [] : fam.byState('possible').filter(function (id) {
      return people[id] && fam.reason(id) && id !== excludeId && saved.indexOf(id) < 0 && dis.indexOf(id) < 0;
    }).map(function (id) {
      return { id: id, reasonType: 'relationship', icon: 'ph ph-tree-structure', reason: fam.reason(id) };
    });
    return topUp(out, saved.concat(excludeId ? [excludeId] : []));
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
      if (id === pid || dis.indexOf(id) >= 0 || isPoolId(id)) return;
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
      if (members.indexOf(id) >= 0 || dis.indexOf(id) >= 0 || isPoolId(id)) return;
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
    return topUp(out, members);
  }

  window.LEGACY_SUGGEST = {
    POOL_SIZE: POOL_SIZE, PAGE_SIZE: PAGE_SIZE,
    readDismissed: readDismissed, dismiss: dismiss,
    list: list, forPerson: forPerson, forCollection: forCollection
  };
})();
