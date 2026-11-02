/* Listing Page Personalization — "Today for you"
   Figma: https://www.figma.com/design/I1ULXCzlbWCwOM7CPj4209/Listing-Page-Personalization

   The problem this is modelling: a page like Thousand Oaks can publish 500
   obituaries in a day. Most people never learn that, never paginate, and
   never find the one name they would have recognised. So the page keeps the
   full reverse-chronological list exactly as it is, and puts a small,
   dismissible "Today for you" block above it holding only the few names the
   reader has a stated reason to care about.

   Two states, one page:
     signed out — nothing is known, so the block starts as a one-line quick
                  setup. Two questions, one at a time, answers kept on the
                  device. Matches appear, and only then is an account offered,
                  framed as keeping what they already have.
     signed in  — the profile is already there, so the block is the matches.

   State is in localStorage so a reviewer can reload mid-flow. Everything is
   on `window.__lp` for console-driving during a walkthrough (memory.md,
   2026-10-22). */

(function () {
  'use strict';

  var STORE = 'lp-listing-personalization-v1';

  /* ================================================================
     Signals — the things a match can be made on.
     Each has the icon and the phrasing the match card uses as its reason.
     ================================================================ */
  var SIGNALS = {
    'place:fresno':        { icon: 'ph-map-pin',         chip: 'Grew up · Fresno, CA',      reason: 'Grew up in Fresno',         short: 'Fresno, CA',              group: 'places',  carry: 'Grew up in Fresno, CA' },
    'place:thousand-oaks': { icon: 'ph-map-pin',         chip: 'Thousand Oaks, CA',         reason: 'Lived in Thousand Oaks',    short: 'Thousand Oaks, CA',       group: 'places',  carry: 'Lives in Thousand Oaks, CA' },
    'place:newbury-park':  { icon: 'ph-map-pin',         chip: 'Newbury Park, CA',          reason: 'Lived in Newbury Park',     short: 'Newbury Park, CA',        group: 'places',  carry: 'Lived in Newbury Park, CA' },
    'school:tohs-88':      { icon: 'ph-graduation-cap',  chip: "Thousand Oaks High · '88",  reason: "Thousand Oaks High · '88",  short: "Thousand Oaks High '88",  group: 'schools', carry: "Thousand Oaks High · Class of '88" },
    'school:csun-92':      { icon: 'ph-graduation-cap',  chip: "CSUN · '92",                reason: "CSUN · '92",                short: "CSUN '92",                group: 'schools', carry: "CSUN · Class of '92" },
    'work:amgen':          { icon: 'ph-briefcase',       chip: 'Amgen',                     reason: 'Worked at Amgen',           short: 'Amgen',                   group: 'work',    carry: 'Worked at Amgen' },
    'work:navy':           { icon: 'ph-briefcase',       chip: 'U.S. Navy',                 reason: 'Served in the U.S. Navy',   short: 'U.S. Navy',               group: 'work',    carry: 'Served in the U.S. Navy' },
    'work:parish':         { icon: 'ph-briefcase',       chip: 'St. Paschal Baylon Parish', reason: 'St. Paschal Baylon Parish', short: 'St. Paschal Baylon',      group: 'work',    carry: 'St. Paschal Baylon Parish' }
  };

  /* The signed-in profile, as in the Tune panel comp (6:853): three places,
     two schools, three work/service entries. */
  var SIGNED_IN_SIGNALS = [
    'place:thousand-oaks', 'place:newbury-park', 'place:fresno',
    'school:tohs-88', 'school:csun-92',
    'work:amgen', 'work:navy', 'work:parish'
  ];

  /* ================================================================
     Today's obituaries.

     `signals` is what each person has in common with a reader; `strength`
     is how many of those details line up. "Only show strong matches" in the
     Tune panel keeps strength 'strong' — two or more details, like a school
     AND a class year — which is the difference between "someone you knew"
     and "someone from your town".
     ================================================================ */
  var PEOPLE = [
    { id:'reyes',    name:'Michael Reyes',   years:'1970 – 2026', initials:'MR', signals:['school:tohs-88'],                     strength:'strong' },
    { id:'okafor',   name:'Janet Okafor',    years:'1948 – 2026', initials:'JO', signals:['place:fresno'],                       strength:'strong' },
    { id:'lindqvist',name:'David Lindqvist', years:'1961 – 2026', initials:'DL', signals:['work:amgen'],                         strength:'strong' },
    { id:'benitez',  name:'Carol Benitez',   years:'1955 – 2026', initials:'CB', signals:['place:newbury-park'],                 strength:'weak'   },
    { id:'oyelaran', name:'Raymond Oyelaran',years:'1969 – 2026', initials:'RO', signals:['school:csun-92'],                     strength:'weak'   }
  ];

  /* Other things that happened today that aren't deaths — the "Also today"
     row (Feed/More today, 18:2813). It exists so the matches block stays a
     block about people, and anniversaries and follow activity have somewhere
     to go that isn't the obituary list. */
  var MORE_TODAY = [
    { icon:'ph-cake',       text:"Dorothy Hale's 90th birthday",            meta:'You left a note last year' },
    { icon:'ph-chat-circle',text:'2 new guest book entries for Paul Mackey',meta:'You follow this memorial' },
    { icon:'ph-flower-lotus',text:'Service details added for Ann Whitfield', meta:'You follow this memorial' }
  ];

  /* ================================================================
     The local feed. Reverse-chronological, as it is today — the
     personalization sits above it rather than replacing it.
     ================================================================ */
  var FEED_SOURCES = ['Ventura County Star', 'The Acorn', 'Pierce Brothers Valley Oaks'];

  /* Portraits are the five in assets/people, assigned by hand rather than
     cycled so the face on a card is at least plausible for the name on it.
     There are more rows than portraits, so some rows have none — which is
     true of the live listing too, and is why the card has to lay out
     correctly both ways. */
  var FEED = [
    { name:'Eleanor Vasquez',  years:'1938 – 2026', photo:'eleanor.png',  excerpt:'Eleanor Vasquez, 88, of Thousand Oaks, passed away peacefully on October 27, 2026. A founding member of the Conejo Valley Garden Club…' },
    { name:'Harold Brennan',   years:'1944 – 2026', photo:'ralph.jpg',    excerpt:'Harold Brennan, 82, of Westlake Village, died October 26, 2026. He served in the U.S. Army and later ran Brennan Hardware on Moorpark Road…' },
    { name:'Grace Liu',        years:'1952 – 2026', photo:'jennifer.png', excerpt:'Grace Liu, 74, of Newbury Park, passed away October 25, 2026, surrounded by family. A retired nurse at Los Robles Hospital…' },
    { name:'Michael Reyes',    years:'1970 – 2026', photo:'marcus.png',   excerpt:'Michael Reyes, 56, of Thousand Oaks, died October 27, 2026. A 1988 graduate of Thousand Oaks High School, he coached youth soccer for two decades…', person:'reyes' },
    { name:'Janet Okafor',     years:'1948 – 2026', photo:null,           excerpt:'Janet Okafor, 78, formerly of Fresno, passed away October 27, 2026 in Thousand Oaks. She taught third grade in the Fresno Unified district for 31 years…', person:'okafor' },
    { name:'David Lindqvist',  years:'1961 – 2026', photo:'anthony.png',  excerpt:'David Lindqvist, 65, of Newbury Park, died October 26, 2026. He spent 28 years as a process engineer at Amgen and was a fixture at the Sunday farmers market…', person:'lindqvist' },
    { name:'Carol Benitez',    years:'1955 – 2026', photo:null,           excerpt:'Carol Benitez, 71, of Newbury Park, passed away October 26, 2026. She volunteered at the Goebel Senior Center for more than fifteen years…', person:'benitez' },
    { name:'Raymond Oyelaran', years:'1969 – 2026', photo:null,           excerpt:'Raymond Oyelaran, 57, of Thousand Oaks, died October 25, 2026. He earned his degree from CSUN in 1992 and built a career in civil engineering…', person:'oyelaran' },
    { name:'Patricia Nolan',   years:'1933 – 2026', photo:'eleanor.png',  excerpt:'Patricia Nolan, 93, of Thousand Oaks, passed away October 25, 2026. She and her husband opened the first bookshop on Janss Road in 1964…' },
    { name:'Arthur Mbeki',     years:'1947 – 2026', photo:null,           excerpt:'Arthur Mbeki, 79, of Westlake Village, died October 24, 2026. A longtime deacon at St. Paschal Baylon Parish, he is survived by four children…' },
    { name:'Linda Rosetti',    years:'1958 – 2026', photo:'jennifer.png', excerpt:'Linda Rosetti, 68, of Thousand Oaks, passed away October 24, 2026 after a short illness. She was a court reporter for Ventura County for 30 years…' },
    { name:'Walter Kim',       years:'1941 – 2026', photo:'ralph.jpg',    excerpt:'Walter Kim, 85, of Newbury Park, died October 24, 2026. He emigrated from Busan in 1968 and ran Kim Family Cleaners until his retirement…' }
  ];

  /* ================================================================
     State
     ================================================================ */
  var defaults = {
    auth: 'out',
    setupStep: 'collapsed',   // collapsed | 1 | 2 | done
    deviceSignals: [],        // what the signed-out quick setup collected
    sort: 'newest',           // newest | foryou
    dismissed: [],            // match ids the reader said they don't know
    softGateDismissed: false,
    accountSaved: false,
    prefs: { relevance: false, strong: true, daily: true, weekly: false, push: true },
    feedPage: 1
  };

  var state = load();

  function load() {
    var base = JSON.parse(JSON.stringify(defaults));
    try {
      var raw = localStorage.getItem(STORE);
      if (!raw) return base;
      var saved = JSON.parse(raw);
      Object.keys(saved).forEach(function (k) {
        if (k === 'prefs') { Object.assign(base.prefs, saved.prefs || {}); }
        else if (k in base) { base[k] = saved[k]; }
      });
    } catch (e) { /* a blocked or corrupt store just means defaults */ }
    return base;
  }

  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {}
  }

  var GROUP_ORDER = ['places', 'schools', 'work'];

  /* The signals in play right now: the account's for a signed-in reader,
     whatever the quick setup collected for a signed-out one.

     Always sorted by group, so the order a reader sees never depends on the
     order they happened to answer in — editing the hometown after the school
     would otherwise reshuffle the "From …" line under the heading. */
  function activeSignals() {
    var raw = state.auth === 'in' ? SIGNED_IN_SIGNALS : state.deviceSignals;
    return raw.filter(function (k, i) { return SIGNALS[k] && raw.indexOf(k) === i; })
              .sort(function (a, b) {
                return GROUP_ORDER.indexOf(SIGNALS[a].group) - GROUP_ORDER.indexOf(SIGNALS[b].group);
              });
  }

  function matchesFor() {
    var active = activeSignals();
    return PEOPLE.filter(function (p) {
      if (state.dismissed.indexOf(p.id) !== -1) return false;
      if (state.prefs.strong && p.strength !== 'strong') return false;
      return p.signals.some(function (s) { return active.indexOf(s) !== -1; });
    }).map(function (p) {
      var hit = p.signals.find(function (s) { return active.indexOf(s) !== -1; });
      return { person: p, signal: SIGNALS[hit] };
    });
  }

  /* ================================================================
     Small DOM helpers
     ================================================================ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function on(sel, evt, fn) {
    document.addEventListener(evt, function (e) {
      if (!e.target || !e.target.closest) return;
      var el = e.target.closest(sel);
      if (el) fn(e, el);
    });
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
  }

  /* ================================================================
     Render: matches
     ================================================================ */
  function renderMatches() {
    var list = $('[data-matches]');
    var items = matchesFor();

    list.innerHTML = items.map(function (m) {
      var p = m.person;
      return '' +
      '<li class="lp-match bg-white border border-wb-300 rounded-lg p-3 flex flex-col gap-2" data-match="' + p.id + '">' +
        '<div class="flex items-center gap-2.5">' +
          '<span class="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center font-serif text-[15px] text-navy-700 shrink-0" aria-hidden="true">' + esc(p.initials) + '</span>' +
          '<a href="#" class="flex-1 min-w-0 no-underline">' +
            '<span class="block font-serif text-[17px] leading-[22px] text-navy-700 truncate">' + esc(p.name) + '</span>' +
            '<span class="block text-[13px] text-wb-700">' + esc(p.years) + '</span>' +
          '</a>' +
          '<button type="button" class="lp-tap shrink-0 text-wb-500 hover:text-wb-900" data-match-dismiss="' + p.id + '" ' +
            'aria-label="I don\'t know ' + esc(p.name) + ' — hide this match">' +
            '<i class="ph ph-x text-base" aria-hidden="true"></i></button>' +
        '</div>' +
        '<p class="flex items-center gap-1.5 min-w-0 text-[13px] font-medium text-wb-900">' +
          '<i class="ph ' + m.signal.icon + ' text-[14px] shrink-0" aria-hidden="true"></i>' +
          '<span class="truncate">' + esc(m.signal.reason) + '</span>' +
        '</p>' +
      '</li>';
    }).join('');

    return items;
  }

  /* ================================================================
     Render: "Today for you" block as a whole
     ================================================================ */
  function renderToday() {
    var block = $('#lp-today');
    var setupDone = state.auth === 'in' || state.setupStep === 'done';
    var items = setupDone ? renderMatches() : [];

    // Before the reader has told us anything there is nothing to match on,
    // so the block doesn't exist. Afterwards it always does — a day with no
    // matches is information too, and a module that vanishes on quiet days
    // teaches people to stop looking for it.
    block.hidden = !setupDone;
    if (block.hidden) return;

    $('[data-today-empty]').hidden = items.length > 0;
    $('[data-matches]').hidden = items.length === 0;

    $('[data-today-count]').textContent = items.length
      ? items.length + ' new'
      : 'Nothing new';

    // Signed in the block is dated; signed out it names the two details the
    // reader just gave, so the connection between answer and result is plain.
    var signalText;
    if (state.auth === 'in') {
      signalText = 'Fri, Oct 30';
    } else {
      signalText = 'From ' + activeSignals().map(function (k) {
        return SIGNALS[k].short;
      }).join(' · ');
    }
    $('[data-today-signals]').textContent = signalText;
    $('[data-today-signals-mobile]').textContent = signalText;

    var outTail = $('[data-today-tail="out"]');
    var inTail = $('[data-today-tail="in"]');
    outTail.hidden = !(state.auth === 'out' && !state.softGateDismissed && !state.accountSaved);
    inTail.hidden = state.auth !== 'in';

    if (!inTail.hidden) {
      $('[data-moretoday-list]').innerHTML = MORE_TODAY.map(function (m) {
        return '<li class="flex items-start gap-2.5 px-3 py-2 rounded-lg border border-wb-200">' +
          '<i class="ph ' + m.icon + ' text-base text-navy-700 mt-0.5 shrink-0" aria-hidden="true"></i>' +
          '<span class="min-w-0"><span class="block text-sm font-medium text-wb-900">' + esc(m.text) + '</span>' +
          '<span class="block text-[13px] text-wb-700">' + esc(m.meta) + '</span></span></li>';
      }).join('');
    }
  }

  /* ================================================================
     Render: the local feed
     ================================================================ */
  var PAGE = 6;
  var TOTAL_TODAY = 487; // the number this whole feature exists because of

  function feedOrder() {
    var rows = FEED.slice();
    if (state.sort !== 'foryou') return rows;

    // "For you" lifts the people the reader has a reason to recognise to the
    // top. It never removes anyone — the full list is still the full list,
    // which is the promise the Tune panel's helper text makes.
    var active = activeSignals();
    function score(row) {
      if (!row.person) return 0;
      var p = PEOPLE.find(function (x) { return x.id === row.person; });
      if (!p) return 0;
      return p.signals.some(function (s) { return active.indexOf(s) !== -1; }) ? 1 : 0;
    }
    return rows.sort(function (a, b) { return score(b) - score(a); });
  }

  function renderFeed() {
    var rows = feedOrder();
    var shown = Math.min(rows.length, PAGE * state.feedPage);

    $('[data-feed]').innerHTML = rows.slice(0, shown).map(function (row) {
      var active = activeSignals();
      var p = row.person ? PEOPLE.find(function (x) { return x.id === row.person; }) : null;
      var hit = p && p.signals.find(function (s) { return active.indexOf(s) !== -1; });
      var reason = hit ? SIGNALS[hit] : null;

      return '' +
      '<li class="bg-white border border-wb-300 rounded-2xl overflow-hidden flex flex-col sm:flex-row sm:items-center">' +
        '<div class="flex-1 min-w-0 flex flex-col gap-4 md:gap-6 px-5 md:px-8 py-5 md:py-6">' +
          (reason && state.sort === 'foryou'
            ? '<p class="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-100 text-[13px] font-semibold text-gold-900">' +
              '<i class="ph ' + reason.icon + ' text-[14px]" aria-hidden="true"></i>' + esc(reason.reason) + '</p>'
            : '') +
          '<div class="flex flex-col gap-2">' +
            '<h3 class="font-serif text-2xl md:text-[30px] md:leading-[1.2] text-wb-900"><a href="#" class="no-underline text-inherit">' + esc(row.name) + '</a></h3>' +
            // The comp sets the dates in gold/700, which is 3.39:1 on white —
            // under AA for 16px semibold, and this is a page whose readers
            // skew old. gold/800 is the next step down the same ramp and
            // measures 4.74:1. Deliberate divergence from the comp; if the
            // Figma is corrected, this comment is the thing to delete.
            '<p class="text-base font-semibold tracking-[-0.32px] text-gold-800">' + esc(row.years) + '</p>' +
          '</div>' +
          '<p class="font-body text-[17px] md:text-[18px] leading-[1.5] text-wb-900">' + esc(row.excerpt) + '</p>' +
          '<div class="flex flex-col gap-2">' +
            '<p class="text-sm text-wb-900">Read their obituaries:</p>' +
            '<div class="flex flex-wrap gap-2">' +
              '<a href="#" class="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-gold-100 text-sm text-gold-900 no-underline">Legacy</a>' +
              FEED_SOURCES.map(function (s) {
                return '<a href="#" class="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-gold-100 text-sm text-gold-900 no-underline">' + esc(s) +
                  '<i class="ph ph-arrow-square-out text-[14px]" aria-hidden="true"></i>' +
                  '<span class="sr-only">(opens in a new tab)</span></a>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</div>' +
        (row.photo
          ? '<div class="sm:w-[288px] sm:shrink-0 flex items-center justify-center px-5 pb-5 sm:p-6">' +
              '<img src="assets/people/' + row.photo + '" alt="" class="w-[180px] sm:w-[234px] h-auto max-h-[280px] object-contain rounded-lg" loading="lazy" />' +
            '</div>'
          : '') +
      '</li>';
    }).join('');

    $('[data-feed-count]').textContent =
      'Showing ' + shown + ' of ' + TOTAL_TODAY.toLocaleString() + ' obituaries published in the last 24 hours';

    $('[data-feed-more]').hidden = shown >= rows.length;
  }

  /* ================================================================
     Render: the Tune panel chips
     ================================================================ */
  function renderTune() {
    var active = activeSignals();
    ['places', 'schools', 'work'].forEach(function (group) {
      var host = $('[data-tune-group="' + group + '"]');
      var keys = active.filter(function (k) { return SIGNALS[k].group === group; });

      host.innerHTML = keys.map(function (k) {
        return '<span class="inline-flex items-center gap-1.5 pl-3 pr-2.5 py-1.5 rounded-full bg-white border border-wb-300 text-sm font-medium text-wb-900">' +
          '<i class="ph ' + SIGNALS[k].icon + ' text-base" aria-hidden="true"></i>' + esc(SIGNALS[k].chip) +
          '<button type="button" class="lp-tap text-wb-500 hover:text-wb-900" data-signal-remove="' + k + '" ' +
            'aria-label="Remove ' + esc(SIGNALS[k].chip) + '"><i class="ph ph-x text-[14px]" aria-hidden="true"></i></button>' +
        '</span>';
      }).join('') +
      '<button type="button" data-signal-add="' + group + '" class="lp-tap inline-flex items-center gap-1.5 pl-3 pr-3.5 py-1.5 rounded-full bg-white border border-wb-300 text-sm font-medium text-wb-900">' +
        '<i class="ph ph-plus text-base" aria-hidden="true"></i>' +
        (group === 'places' ? 'Add a place' : group === 'schools' ? 'Add a school' : 'Add') + '</button>';
    });

    Object.keys(state.prefs).forEach(function (k) {
      var input = $('[data-tune-pref="' + k + '"]');
      if (input) input.checked = state.prefs[k];
    });

    var muted = state.dismissed.length;
    $('[data-muted-count]').textContent = muted;
    $('[data-muted-noun]').textContent = muted === 1 ? "person won't" : "people won't";
  }

  /* ================================================================
     Render: everything that switches on auth state
     ================================================================ */
  function renderAuth() {
    // Every [data-auth] element carries a Tailwind display utility, which
    // outranks the bare [hidden] attribute; the `[hidden] { display: none
    // !important }` rule in styles.css is what makes this work at all
    // (memory.md, 2026-09-11).
    $$('[data-auth]').forEach(function (el) {
      el.hidden = el.getAttribute('data-auth') !== state.auth;
    });

    // Quick setup only exists for a signed-out reader who hasn't done it.
    $('#lp-quicksetup').hidden = !(state.auth === 'out' && state.setupStep !== 'done');

    // "For you" ordering is only offered once there is something to order by.
    var hasSignals = activeSignals().length > 0;
    $('[data-sort="foryou"]').hidden = !hasSignals;
    $('[data-sort-label]').textContent = state.auth === 'in' ? 'View:' : 'Order:';

    $$('[data-sort]').forEach(function (b) {
      var isOn = b.getAttribute('data-sort') === state.sort;
      b.setAttribute('aria-pressed', String(isOn));
      b.className = 'lp-tap h-8 px-3 rounded-full text-[13px] font-semibold border ' +
        (isOn ? 'border-navy-700 bg-navy-700 text-white' : 'border-wb-300 bg-white text-wb-900');
    });

    $$('[data-demo]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-demo') === state.auth));
    });
  }

  function renderQuickSetup() {
    $$('[data-qs-step]').forEach(function (pane) {
      pane.hidden = pane.getAttribute('data-qs-step') !== String(state.setupStep);
    });

    var placeKey = state.deviceSignals.find(function (k) { return SIGNALS[k].group === 'places'; });
    var answered = $('[data-qs-answered]');
    answered.hidden = !placeKey;
    if (placeKey) {
      $('[data-qs-answer-place]').textContent = SIGNALS[placeKey].short;
    }
  }

  function render() {
    renderAuth();
    renderQuickSetup();
    renderToday();
    renderTune();
    renderFeed();
    save();
  }

  /* ================================================================
     Overlays — scrim, focus trap, Escape, scroll lock
     ================================================================ */
  var lastFocus = null;

  function openOverlay(name) {
    // Only one dialog at a time. Without this the second one stacks on the
    // first, and closing it clears the scroll lock while the first is still
    // up — the page scrolls behind an open panel, and Escape only ever
    // reaches whichever one openOverlayName() happens to find first.
    var already = openOverlayName();
    if (already === name) return;
    if (already) closeOverlay(already, { keepFocus: true });

    var panel = name === 'tune' ? $('#lp-tune') : $('#lp-account');
    var scrim = $('[data-scrim="' + name + '"]');
    var wrap = name === 'account' ? $('[data-sheet-wrap]') : null;

    lastFocus = document.activeElement;
    scrim.hidden = false;
    if (wrap) wrap.hidden = false;
    panel.hidden = false;
    document.body.setAttribute('data-overlay', 'true');

    // The element has just come out of display:none, so the browser needs a
    // layout before it will transition the transform rather than jumping to
    // it. Reading offsetHeight forces that synchronously.
    //
    // Deliberately NOT a requestAnimationFrame: `data-open` is also what
    // openOverlayName() reads to decide which dialog is up, and a rAF can be
    // throttled for far longer than a frame in a background tab. That left a
    // window where an open panel reported itself closed, and opening a
    // second one stacked it on the first instead of replacing it.
    void panel.offsetHeight;
    scrim.setAttribute('data-open', 'true');
    panel.setAttribute('data-open', 'true');

    var first = panel.querySelector('button, [href], input, select, textarea');
    if (first) first.focus();
  }

  /* `keepFocus` is set when one dialog is closing only to make way for
     another: the replacement is about to take focus itself, and returning it
     to the trigger first would make the screen reader announce a trip back
     to the page that never happened. */
  function closeOverlay(name, opts) {
    opts = opts || {};
    var panel = name === 'tune' ? $('#lp-tune') : $('#lp-account');
    var scrim = $('[data-scrim="' + name + '"]');
    var wrap = name === 'account' ? $('[data-sheet-wrap]') : null;

    scrim.setAttribute('data-open', 'false');
    panel.setAttribute('data-open', 'false');
    if (!openOverlayName()) document.body.removeAttribute('data-overlay');

    window.setTimeout(function () {
      // Another dialog may have opened in the meantime; don't hide the
      // element out from under it.
      if (panel.getAttribute('data-open') === 'true') return;
      scrim.hidden = true;
      panel.hidden = true;
      if (wrap) wrap.hidden = true;
    }, 320);

    if (!opts.keepFocus && lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  function openOverlayName() {
    if ($('#lp-tune').getAttribute('data-open') === 'true') return 'tune';
    if ($('#lp-account').getAttribute('data-open') === 'true') return 'account';
    return null;
  }

  document.addEventListener('keydown', function (e) {
    var open = openOverlayName();
    if (!open) return;

    if (e.key === 'Escape') { closeOverlay(open); return; }
    if (e.key !== 'Tab') return;

    // Keep Tab inside the open dialog.
    var panel = open === 'tune' ? $('#lp-tune') : $('#lp-account');
    var items = $$('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])', panel)
      .filter(function (el) { return el.offsetParent !== null; });
    if (!items.length) return;

    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ================================================================
     Wiring
     ================================================================ */

  // ---- Quick setup ----
  on('[data-qs-start]', 'click', function () {
    state.setupStep = '1';
    render();
    window.setTimeout(function () { $('#lp-qs-place').focus(); }, 60);
  });

  on('[data-qs-close]', 'click', function () {
    // Closing is not the same as finishing: the reader keeps whatever they
    // already answered and the card folds back to its one-line self.
    state.setupStep = state.deviceSignals.length ? 'done' : 'collapsed';
    render();
  });

  on('[data-qs-back]', 'click', function () {
    state.setupStep = '1';
    render();
    window.setTimeout(function () { $('#lp-qs-place').focus(); }, 60);
  });

  on('[data-qs-next]', 'click', function (e, el) {
    var step = el.getAttribute('data-qs-next');

    if (step === '1') {
      var place = $('#lp-qs-place').value.trim();
      if (place) addDeviceSignal(matchPlace(place));
      state.setupStep = '2';
      render();
      window.setTimeout(function () { $('#lp-qs-school').focus(); }, 60);
      return;
    }

    var school = $('#lp-qs-school').value.trim();
    var year = $('#lp-qs-year').value;
    if (school) addDeviceSignal(matchSchool(school, year));
    finishSetup();
  });

  on('[data-qs-skip]', 'click', function (e, el) {
    if (el.getAttribute('data-qs-skip') === '1') {
      state.setupStep = '2';
      render();
      window.setTimeout(function () { $('#lp-qs-school').focus(); }, 60);
    } else {
      finishSetup();
    }
  });

  function finishSetup() {
    state.setupStep = 'done';
    // Answering is what makes "For you" meaningful, so turn it on — the
    // reader asked to see familiar names first, and the comp's result frame
    // shows the matches block, not an unchanged page.
    if (state.deviceSignals.length) state.sort = 'foryou';
    render();

    // Move the reader to the answer. 'instant', never smooth: chasing a
    // smooth scroll with anything else is what went wrong in DES-2305, and
    // the heading takes focus so a screen reader lands on the result rather
    // than back at the top of the page.
    var today = $('#lp-today');
    if (!today.hidden) {
      today.scrollIntoView({ block: 'center', behavior: 'instant' });
      var title = $('#lp-today-title');
      title.setAttribute('tabindex', '-1');
      title.focus();
    }
  }

  /* The quick setup asks for one hometown and one school, so an answer
     REPLACES whatever that group already held. Going Back and changing
     "Fresno" to "Bakersfield" has to change the hometown, not give the
     reader two of them — which is what appending would do, and what the
     Tune panel would then show as a second chip they never added. */
  function addDeviceSignal(key) {
    if (!key) return;
    var group = SIGNALS[key].group;
    state.deviceSignals = state.deviceSignals
      .filter(function (k) { return SIGNALS[k].group !== group; })
      .concat([key]);
  }

  /* The real thing resolves free text against a gazetteer. Here it maps onto
     the signals the seeded obituaries carry, falling back to Fresno so a
     reviewer typing anything at all still sees the flow. */
  function matchPlace(text) {
    var t = text.toLowerCase();
    if (t.indexOf('thousand oaks') === 0 || t.indexOf('thousand') === 0) return 'place:thousand-oaks';
    if (t.indexOf('newbury') === 0) return 'place:newbury-park';
    return 'place:fresno';
  }
  function matchSchool(text) {
    var t = text.toLowerCase();
    if (t.indexOf('csun') === 0 || t.indexOf('cal state') === 0) return 'school:csun-92';
    return 'school:tohs-88';
  }

  // ---- Matches ----
  on('[data-match-dismiss]', 'click', function (e, el) {
    var id = el.getAttribute('data-match-dismiss');
    var card = el.closest('[data-match]');
    card.setAttribute('data-dismissing', 'true');
    window.setTimeout(function () {
      if (state.dismissed.indexOf(id) === -1) state.dismissed.push(id);
      render();
    }, 200);
  });

  on('[data-moretoday]', 'click', function (e, el) {
    var panel = $('#lp-moretoday-panel');
    var open = panel.getAttribute('data-open') !== 'true';
    panel.setAttribute('data-open', String(open));
    el.setAttribute('aria-expanded', String(open));
    $('[data-moretoday-label]').textContent = open ? 'Hide' : 'Show';
    el.querySelector('.ph-caret-down, .ph-caret-up').className =
      'ph ' + (open ? 'ph-caret-up' : 'ph-caret-down');
  });

  // ---- Feed ----
  on('[data-sort]', 'click', function (e, el) {
    state.sort = el.getAttribute('data-sort');
    state.feedPage = 1;
    render();
  });

  on('[data-feed-more]', 'click', function () {
    state.feedPage += 1;
    render();
  });

  // ---- Tune panel ----
  on('[data-tune-open]', 'click', function () {
    if (state.auth === 'out' && state.setupStep !== 'done') {
      // Nothing to tune yet — send them into the quick setup instead.
      state.setupStep = '1';
      render();
      window.setTimeout(function () { $('#lp-qs-place').focus(); }, 60);
      return;
    }
    openOverlay('tune');
  });
  on('[data-tune-close]', 'click', function () { closeOverlay('tune'); });
  on('[data-scrim="tune"]', 'click', function () { closeOverlay('tune'); });

  on('[data-signal-remove]', 'click', function (e, el) {
    var key = el.getAttribute('data-signal-remove');
    if (state.auth === 'in') {
      SIGNED_IN_SIGNALS = SIGNED_IN_SIGNALS.filter(function (k) { return k !== key; });
    } else {
      state.deviceSignals = state.deviceSignals.filter(function (k) { return k !== key; });
    }
    render();
  });

  on('[data-signal-add]', 'click', function (e, el) {
    // Adding opens a typeahead in the real thing. Here it cycles in the next
    // unused signal of that group so the panel can be demonstrated end to end.
    var group = el.getAttribute('data-signal-add');
    var active = activeSignals();
    var next = Object.keys(SIGNALS).find(function (k) {
      return SIGNALS[k].group === group && active.indexOf(k) === -1;
    });
    if (!next) return;
    if (state.auth === 'in') SIGNED_IN_SIGNALS.push(next);
    else state.deviceSignals.push(next);
    render();
  });

  on('[data-tune-pref]', 'change', function (e, el) {
    state.prefs[el.getAttribute('data-tune-pref')] = el.checked;
    if (el.getAttribute('data-tune-pref') === 'relevance') {
      state.sort = el.checked ? 'foryou' : 'newest';
    }
    render();
  });

  on('[data-tune-reset]', 'click', function () {
    state.dismissed = [];
    state.prefs = JSON.parse(JSON.stringify(defaults.prefs));
    state.sort = 'newest';
    render();
  });

  on('[data-tune-save]', 'click', function () { closeOverlay('tune'); render(); });
  on('[data-muted-manage]', 'click', function () { state.dismissed = []; render(); });

  // ---- Account ----
  on('[data-account-open]', 'click', function () {
    var host = $('[data-account-carryover]');
    var keys = activeSignals();
    host.innerHTML = keys.length
      ? keys.map(function (k) {
          return '<li class="flex items-center gap-2 text-sm text-wb-900">' +
            '<i class="ph ' + SIGNALS[k].icon + ' text-base shrink-0" aria-hidden="true"></i>' +
            esc(SIGNALS[k].carry) + '</li>';
        }).join('')
      : '<li class="text-sm text-wb-700">Your feed settings on this device</li>';
    openOverlay('account');
  });

  on('[data-account-close]', 'click', function () { closeOverlay('account'); });
  on('[data-scrim="account"]', 'click', function () { closeOverlay('account'); });

  on('[data-account-social]', 'click', function () { completeSignUp(); });

  on('[data-account-submit]', 'click', function () {
    var input = $('#lp-account-email');
    var err = $('[data-account-error]');
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    err.hidden = ok;
    input.setAttribute('aria-invalid', String(!ok));
    if (!ok) { input.focus(); return; }
    completeSignUp();
  });

  function completeSignUp() {
    // The whole point of the soft gate: what the device already knows carries
    // over, so signing up never costs the reader the answers they just gave.
    state.deviceSignals.forEach(function (k) {
      if (SIGNED_IN_SIGNALS.indexOf(k) === -1) SIGNED_IN_SIGNALS.push(k);
    });
    state.accountSaved = true;
    state.auth = 'in';
    closeOverlay('account');
    render();
  }

  on('[data-softgate-dismiss]', 'click', function () {
    state.softGateDismissed = true;
    render();
  });

  on('[data-signin]', 'click', function () { state.auth = 'in'; render(); });

  // ---- Prototype-only controls ----
  on('[data-demo]', 'click', function (e, el) {
    state.auth = el.getAttribute('data-demo');
    state.feedPage = 1;
    state.sort = (state.auth === 'in') ? 'newest' : (state.deviceSignals.length ? 'foryou' : 'newest');
    render();
  });

  on('[data-demo-reset]', 'click', function () {
    try { localStorage.removeItem(STORE); } catch (e) {}
    state = JSON.parse(JSON.stringify(defaults));
    SIGNED_IN_SIGNALS = [
      'place:thousand-oaks', 'place:newbury-park', 'place:fresno',
      'school:tohs-88', 'school:csun-92',
      'work:amgen', 'work:navy', 'work:parish'
    ];
    render();
  });

  /* ================================================================
     Boot
     ================================================================ */
  (function fillClassYears() {
    var sel = $('#lp-qs-year');
    for (var y = 2012; y >= 1948; y--) {
      var o = document.createElement('option');
      o.value = String(y);
      o.textContent = "'" + String(y).slice(2);
      sel.appendChild(o);
    }
    sel.addEventListener('change', function () {
      sel.classList.toggle('text-wb-600', !sel.value);
      sel.classList.toggle('text-wb-900', !!sel.value);
    });
  })();

  render();

  // Console handle for walkthroughs: __lp.state, __lp.go('in'), __lp.reset().
  window.__lp = {
    get state() { return state; },
    get matches() { return matchesFor(); },
    go: function (auth) { state.auth = auth; render(); },
    step: function (s) { state.setupStep = String(s); render(); },
    reset: function () { $('[data-demo-reset]').click(); },
    render: render
  };
})();
