/* Shared "Historical records" data for the My People FUTURE prototype.
   Surfaces public-record matches (census, birth, marriage, death, military)
   that may belong to the person, derived from their name, dates, and places.
   Records are authored/derived for the demo — a real system would search an
   archive and score each hit. Used by the person page (future-index.html). */
(function () {
  var STATES = {
    IL:'Illinois', CA:'California', MA:'Massachusetts', CO:'Colorado',
    NY:'New York', TX:'Texas', FL:'Florida', PA:'Pennsylvania', OH:'Ohio'
  };

  // "1935 – 2023" -> { b:1935, d:2023 }
  function years(dates){
    var m = String(dates || '').match(/(\d{4})\D+(\d{4})/);
    return m ? { b: +m[1], d: +m[2] } : { b: null, d: null };
  }
  // "Dixon, IL" -> "Illinois"
  function stateName(location){
    var m = /,\s*([A-Z]{2})\b/.exec(location || '');
    return m ? (STATES[m[1]] || m[1]) : null;
  }

  // Hand-authored records for the hero person, tied to the obituary facts
  // (born Fresno CA 1935 to Robert & Veronica; wife Patricia Ramirez; Dixon IL).
  var AUTHORED = {
    ralph: [
      { type:'birth',    icon:'ph ph-certificate', title:'California Birth Index, 1935',                        meta:'Fresno, California · 1935',  match:'strong',   note:'Name, birth date, and parents align' },
      { type:'census',   icon:'ph ph-scroll',      title:'1940 United States Federal Census',                   meta:'Fresno, California · 1940',  match:'possible', note:'Listed in the Robert & Veronica Thomas household' },
      { type:'census',   icon:'ph ph-scroll',      title:'1950 United States Federal Census',                   meta:'California · 1950',          match:'possible', note:'Age and place match the enumeration' },
      { type:'marriage', icon:'ph ph-heart',       title:'Marriage Record — Ralph Thomas & Patricia Ramirez',   meta:'California · 1958',          match:'possible', note:'Spouse named in the obituary' },
      { type:'death',    icon:'ph ph-flower',      title:'Illinois Death Index, 2023',                          meta:'Dixon, Illinois · 2023',     match:'strong',   note:'Name, date, and place align' }
    ]
  };

  // Records that may belong to `pid`. Authored set if present, else derived
  // from the person's dates + location. Only decennial censuses that have been
  // publicly released (≤ 1950) and fall within the person's life are included.
  function forPerson(pid){
    var P = (window.LEGACY_PEOPLE || {})[pid];
    if (!P) return [];
    if (AUTHORED[pid]) return AUTHORED[pid];

    var y = years(P.dates), st = stateName(P.location), loc = P.location, out = [];

    if (y.b) out.push({ type:'birth', icon:'ph ph-certificate',
      title: st ? st + ' Birth Index, ' + y.b : 'Birth Record, ' + y.b,
      meta: (loc ? loc + ' · ' : '') + y.b, match:'possible', note:'Name and birth year align' });

    [1940, 1950].forEach(function (cy) {
      if (y.b && y.b <= cy && (!y.d || y.d >= cy)) out.push({ type:'census', icon:'ph ph-scroll',
        title: cy + ' United States Federal Census',
        meta: (st || 'United States') + ' · ' + cy, match:'possible', note:'Age and place match the household' });
    });

    if (y.b) { var my = y.b + 26; if (!y.d || my <= y.d) out.push({ type:'marriage', icon:'ph ph-heart',
      title:'Marriage Record', meta: (st ? st + ' · ' : '') + my, match:'possible', note:'Approximate date — worth confirming' }); }

    if (/\b(veteran|navy|army|air force|marine|marines|served|wwii|war)\b/i.test(P.obit || '')) out.push({ type:'military', icon:'ph ph-medal',
      title:'U.S. Military Service Record', meta: st || 'United States', match:'possible', note:'Military service mentioned in the obituary' });

    if (y.d) out.push({ type:'death', icon:'ph ph-flower',
      title: st ? st + ' Death Index, ' + y.d : 'Death Record, ' + y.d,
      meta: (loc ? loc + ' · ' : '') + y.d, match:'strong', note:'Name, date, and place align' });

    return out;
  }

  window.LEGACY_RECORDS = { forPerson: forPerson };
})();
