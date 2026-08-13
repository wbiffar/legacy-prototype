/* Shared relationship graph for the My People FUTURE prototype (DES-2251 §5).
   Single source of truth for how the demo people connect — anchored on the
   account holder ("you"). Two lineages meet through you: Thomas = paternal
   side, Whitfield = maternal side. Suggestions ("possible matches"), records,
   and a future tree view all read from this graph. See FAMILY-TREE.md.

   ids match LEGACY_PEOPLE / the saved store where a person already exists.
   Note: Anthony M. Thomas keeps the legacy store id 'mohammad'. */
(function () {
  var ANCHOR = 'you';

  //  line: 'thomas' | 'whitfield' | 'none'
  //  tier: 'greatgrand' | 'grand' | 'parent' | 'you' | 'circle'
  //  state: 'anchor' | 'saved' | 'possible' | 'known'
  //  children are DERIVED from `parents` — never list them here.
  var PEOPLE = {
    you:      { name:'You',               dates:'',          surname:'',          line:'none',      tier:'you',        relToYou:'You',                          state:'anchor',   parents:['dad','mom'],          spouse:[] },
    dad:      { name:'Your Father',       dates:'',          surname:'Thomas',    line:'thomas',    tier:'parent',     relToYou:'Your father',                  state:'known',    parents:['mohammad'],           spouse:['mom'] },
    mom:      { name:'Your Mother',       dates:'',          surname:'Whitfield', line:'whitfield', tier:'parent',     relToYou:'Your mother',                  state:'known',    parents:['george','margaret'], spouse:['dad'] },

    mohammad: { name:'Anthony M. Thomas', dates:'1940–2024', surname:'Thomas',    line:'thomas',    tier:'grand',      relToYou:'Your grandfather',             state:'saved',    parents:['robert','veronica'], spouse:[] },
    ralph:    { name:'Ralph Thomas',      dates:'1935–2023', surname:'Thomas',    line:'thomas',    tier:'grand',      relToYou:'Your grandfather’s brother',   state:'possible', parents:['robert','veronica'], spouse:['patricia'] },
    patricia: { name:'Patricia Ramirez',  dates:'1938–2019', surname:'Ramirez',   line:'thomas',    tier:'grand',      relToYou:'Your great-uncle’s wife',      state:'possible', parents:[],                    spouse:['ralph'] },
    robert:   { name:'Robert Thomas',     dates:'1904–1979', surname:'Thomas',    line:'thomas',    tier:'greatgrand', relToYou:'Your great-grandfather',       state:'possible', parents:[],                    spouse:['veronica'] },
    veronica: { name:'Veronica Delgado',  dates:'1908–1986', surname:'Delgado',   line:'thomas',    tier:'greatgrand', relToYou:'Your great-grandmother',       state:'possible', parents:[],                    spouse:['robert'] },

    george:   { name:'George Whitfield',  dates:'1912–1988', surname:'Whitfield', line:'whitfield', tier:'grand',      relToYou:'Your grandfather',             state:'possible', parents:[],                    spouse:['margaret'] },
    margaret: { name:'Margaret Whitfield',dates:'1916–1994', surname:'Whitfield', line:'whitfield', tier:'grand',      relToYou:'Your grandmother',             state:'possible', parents:[],                    spouse:['george'] },
    eleanor:  { name:'Eleanor Whitfield', dates:'1938–2024', surname:'Whitfield', line:'whitfield', tier:'parent',     relToYou:'Your aunt',                    state:'possible', parents:['george','margaret'], spouse:[] },
    douglas:  { name:'Douglas Whitfield', dates:'1948–2023', surname:'Whitfield', line:'whitfield', tier:'parent',     relToYou:'Your uncle',                   state:'saved',    parents:['george','margaret'], spouse:[] },

    jennifer: { name:'Jennifer Sanderson',dates:'1951–2024', surname:'Sanderson', line:'none',      tier:'circle',     relToYou:'Family friend',                state:'saved',    parents:[],                    spouse:[] },
    marcus:   { name:'Marcus Reed',       dates:'1955–2023', surname:'Reed',      line:'none',      tier:'circle',     relToYou:'',                             state:'possible', parents:[],                    spouse:[] }
  };

  function get(id){ return PEOPLE[id] || null; }
  function parentsOf(id){ var p = PEOPLE[id]; return p ? p.parents.slice() : []; }
  function spouseOf(id){ var p = PEOPLE[id]; return p ? p.spouse.slice() : []; }
  function childrenOf(id){ return Object.keys(PEOPLE).filter(function(k){ return PEOPLE[k].parents.indexOf(id) >= 0; }); }
  function siblingsOf(id){
    var ps = parentsOf(id); if (!ps.length) return [];
    return Object.keys(PEOPLE).filter(function(k){
      return k !== id && ps.some(function(par){ return PEOPLE[k].parents.indexOf(par) >= 0; });
    });
  }
  function relTo(id){ var p = PEOPLE[id]; return p ? p.relToYou : null; }
  function line(id){ var p = PEOPLE[id]; return p ? p.line : null; }
  function state(id){ var p = PEOPLE[id]; return p ? p.state : null; }
  function isBlood(id){ var p = PEOPLE[id]; return !!p && (p.line === 'thomas' || p.line === 'whitfield'); }
  function byState(s){ return Object.keys(PEOPLE).filter(function(k){ return PEOPLE[k].state === s; }); }
  function all(){ return Object.keys(PEOPLE); }

  // Human "possible match" reason, e.g. "Your grandfather’s brother · Thomas family".
  function reason(id){
    var p = PEOPLE[id]; if (!p || !p.relToYou) return null;
    var fam = (p.line === 'thomas' || p.line === 'whitfield')
      ? ' · ' + p.line.charAt(0).toUpperCase() + p.line.slice(1) + ' family'
      : '';
    return p.relToYou + fam;
  }

  window.LEGACY_FAMILY = {
    anchor: ANCHOR, PEOPLE: PEOPLE,
    get: get, parentsOf: parentsOf, spouseOf: spouseOf, childrenOf: childrenOf,
    siblingsOf: siblingsOf, relTo: relTo, line: line, state: state,
    isBlood: isBlood, byState: byState, all: all, reason: reason
  };
})();
