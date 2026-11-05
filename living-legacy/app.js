/* Legacy Life Stories — shared app state and UI helpers.
   Loaded on every page. Pages add their own bindings at the bottom of
   their HTML, calling into LL.*.

   State lives in localStorage so a demo survives a reload. The signed-in
   switch is also stored, and the two seeded sample projects are rebuilt
   on first visit or when Reset is pressed.

   Everything is exposed on `window.LL` so a reviewer can inspect and
   drive the prototype from the console (memory.md, 2026-10-22). */

(function () {
  'use strict';

  // ============================== Keys ==============================
  const K_PROJECTS  = 'll:projects';
  const K_AUTH      = 'll:auth';           // "in" | "out"
  const K_NAME      = 'll:user-name';      // demo signed-in name
  const K_SEED      = 'll:seeded';         // bump to reseed
  const SEED_VERSION = 4;

  // ============================== Utils ==============================
  const uuid = () =>
    (crypto.randomUUID ? crypto.randomUUID()
      : (Date.now().toString(36) + Math.random().toString(36).slice(2, 10)));

  const read = (k, fallback) => {
    try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : fallback; }
    catch { return fallback; }
  };
  const write = (k, v) => {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  };

  const now = () => new Date().toISOString();

  const fmtRelative = (iso) => {
    try {
      const then = new Date(iso).getTime();
      const diff = Date.now() - then;
      const mins = Math.round(diff / 60000);
      if (mins < 1)  return 'Just now';
      if (mins < 60) return `${mins} min ago`;
      const hrs = Math.round(mins / 60);
      if (hrs < 24) return `${hrs} hr ago`;
      const days = Math.round(hrs / 24);
      if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch { return ''; }
  };

  const escapeHTML = (s = '') =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
     .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const nl2br = (s = '') => escapeHTML(s).replace(/\n/g, '<br>');

  const splitLines = (s = '') =>
    s.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // ============================== Seed ==============================
  function seedIfNeeded() {
    const seeded = read(K_SEED, 0);
    if (seeded >= SEED_VERSION) return;
    const projects = [
      {
        id: 'proj-family-recipes',
        title: 'Family Recipes',
        who: 'someone',
        personName: 'Maria',
        relationship: 'Grandmother',
        createdAt: '2026-10-19T14:12:00.000Z',
        contributors: [
          { id: 'u-wesley', name: 'Wesley', relationship: 'You', isYou: true },
          { id: 'u-wanda',  name: 'Wanda',  relationship: 'Aunt' },
          { id: 'u-leo',    name: 'Leo',    relationship: 'Grandson' },
        ],
        inviteMessage:
          "Could you write out (or talk through) your recipes for Sunday Sauce, the Easter bread, and Dad's favorite stew? We're gathering Mom's cooking so it's in one place forever.",
        memories: [
          {
            id: 'mem-lasagna',
            type: 'recipe',
            title: "Grandma's Lasagna",
            sharedBy: 'Maria',
            relationship: 'Grandmother',
            createdAt: '2026-10-21T18:04:00.000Z',
            recipe: {
              cardName: "Mom's All-Day Sunday Sauce",
              ingredients: [
                '1 lb pork ribs, 1 lb sweet Italian sausage, homemade meatballs',
                '3 cans (28 oz) San Marzano tomatoes crushed by hand, tomato paste',
                '6 cloves sliced garlic, 1 yellow onion, olive oil & fresh basil',
              ],
              directions: [
                'Brown meats in olive oil, then soften onion, garlic & paste.',
                'Add hand-crushed tomatoes, basil, and all browned meats.',
                'Simmer low for 3 hours. Dip warm Italian bread before dinner!',
              ],
              note: 'Memory saved to Family Recipes.',
            },
          },
          {
            id: 'mem-sunday-dinners',
            type: 'story',
            title: "Sunday dinners at Grandma's",
            sharedBy: 'Leo',
            relationship: 'Grandson',
            createdAt: '2026-10-24T09:30:00.000Z',
            body:
              'Every Sunday the whole family squeezed around her table. The sauce simmered from 8am and we were allowed one piece of bread to dip before dinner.',
          },
        ],
      },
      {
        id: 'proj-my-early-years',
        title: 'My Early Years',
        who: 'myself',
        personName: 'Wesley',
        relationship: 'Myself',
        createdAt: '2026-08-01T10:00:00.000Z',
        contributors: [
          { id: 'u-wesley', name: 'Wesley', relationship: 'You', isYou: true },
        ],
        memories: [
          {
            id: 'mem-early-1',
            type: 'story',
            title: 'The house on Maple Street',
            sharedBy: 'Wesley',
            relationship: 'Myself',
            createdAt: '2026-08-02T12:00:00.000Z',
            body:
              'We lived at 42 Maple from the time I was four. The elm in the front yard was so big that both of us could not get our arms around it.',
          },
          {
            id: 'mem-early-2',
            type: 'voice',
            title: 'Our first dog, Captain',
            sharedBy: 'Wesley',
            relationship: 'Myself',
            createdAt: '2026-08-04T13:00:00.000Z',
            body:
              'A quick story about how Captain found us at the shelter and never left my side for twelve years.',
            voice: { duration: 92 },
          },
          {
            id: 'mem-early-3',
            type: 'story',
            title: 'Summer at the lake',
            sharedBy: 'Wesley',
            relationship: 'Myself',
            createdAt: '2026-08-10T15:00:00.000Z',
            body:
              'Every August we drove up to Crystal Lake. Dad would wake us before dawn so the fish would still be biting.',
          },
        ],
      },
    ];
    write(K_PROJECTS, projects);
    write(K_SEED, SEED_VERSION);
  }

  // ============================== CRUD ==============================
  function allProjects() { return read(K_PROJECTS, []); }
  function getProject(id) { return allProjects().find(p => p.id === id); }
  function saveProject(project) {
    const list = allProjects();
    const i = list.findIndex(p => p.id === project.id);
    if (i === -1) list.unshift(project); else list[i] = project;
    write(K_PROJECTS, list);
  }
  function deleteProject(id) {
    const list = allProjects().filter(p => p.id !== id);
    write(K_PROJECTS, list);
  }

  function createProject(input) {
    const id = `proj-${uuid().slice(0, 8)}`;
    const project = {
      id,
      title: input.title,
      who: input.who,                           // 'myself' | 'someone' | 'group'
      personName: input.personName || '',
      relationship: input.relationship || '',
      createdAt: now(),
      contributors: [{
        id: 'u-you',
        name: input.yourName || getUserName() || 'You',
        relationship: 'You',
        isYou: true,
      }],
      memories: [],
    };
    saveProject(project);
    return project;
  }

  function addMemory(projectId, memory) {
    const p = getProject(projectId);
    if (!p) return null;
    const m = {
      id: `mem-${uuid().slice(0, 8)}`,
      createdAt: now(),
      ...memory,
    };
    p.memories = [m, ...(p.memories || [])];
    // Add the contributor if new
    if (m.sharedBy) {
      const exists = (p.contributors || []).some(c =>
        c.name.toLowerCase() === m.sharedBy.toLowerCase());
      if (!exists) {
        p.contributors = [...(p.contributors || []), {
          id: `u-${uuid().slice(0, 6)}`,
          name: m.sharedBy,
          relationship: m.relationship || 'Contributor',
        }];
      }
    }
    saveProject(p);
    return m;
  }

  // ============================== Auth demo ==============================
  function getAuth() { return read(K_AUTH, 'in'); }
  function setAuth(state) { write(K_AUTH, state); document.body.dataset.auth = state; }
  function getUserName() { return read(K_NAME, 'Wesley'); }
  function setUserName(name) { write(K_NAME, name); }

  // ============================== Modal engine ==============================
  // Modals are rendered once (inline on the page) then shown/hidden with
  // a shared scrim. Returning focus to the opener is handled here.
  const modalState = { stack: [], lastFocus: null, scrim: null };

  function ensureScrim() {
    if (modalState.scrim) return modalState.scrim;
    const s = document.createElement('div');
    s.className = 'll-scrim';
    s.hidden = true;
    s.addEventListener('click', () => {
      const top = modalState.stack[modalState.stack.length - 1];
      if (top && !top.dataset.lockBackdrop) closeModal(top.id);
    });
    document.body.appendChild(s);
    modalState.scrim = s;
    return s;
  }

  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    // The id lives on the wrapper (.ll-modal-wrap); the CSS transition
    // attaches to the inner .ll-modal, so flip data-open on both.
    const inner = el.classList.contains('ll-modal') ? el : el.querySelector('.ll-modal');
    modalState.lastFocus = document.activeElement;
    const scrim = ensureScrim();
    scrim.hidden = false;
    // Next frame so the transition runs
    requestAnimationFrame(() => {
      scrim.dataset.open = 'true';
      el.hidden = false;
      requestAnimationFrame(() => {
        el.dataset.open = 'true';
        if (inner && inner !== el) inner.dataset.open = 'true';
      });
    });
    modalState.stack.push(el);
    document.body.dataset.overlay = 'true';

    // Focus the first focusable element in the modal (header close, usually)
    setTimeout(() => {
      const focusable = el.querySelector('[data-autofocus], button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
      if (focusable) focusable.focus();
    }, 60);
  }

  function closeModal(id) {
    const el = id ? document.getElementById(id) : modalState.stack[modalState.stack.length - 1];
    if (!el) return;
    const inner = el.classList.contains('ll-modal') ? el : el.querySelector('.ll-modal');
    el.dataset.open = 'false';
    if (inner && inner !== el) inner.dataset.open = 'false';
    setTimeout(() => { el.hidden = true; }, 340);

    modalState.stack = modalState.stack.filter(e => e !== el);
    if (modalState.stack.length === 0) {
      const scrim = modalState.scrim;
      if (scrim) {
        scrim.dataset.open = 'false';
        setTimeout(() => { scrim.hidden = true; }, 320);
      }
      document.body.dataset.overlay = 'false';
    }
    if (modalState.lastFocus && modalState.lastFocus.focus) {
      try { modalState.lastFocus.focus(); } catch {}
    }
  }

  function closeTopModal() {
    const top = modalState.stack[modalState.stack.length - 1];
    if (top) closeModal(top.id);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalState.stack.length) closeTopModal();
  });

  // ============================== Toast ==============================
  let toastWrap;
  function toast(message, { icon = 'ph-check-circle', duration = 3200 } = {}) {
    if (!toastWrap) {
      toastWrap = document.createElement('div');
      toastWrap.className = 'll-toast-wrap';
      toastWrap.setAttribute('role', 'status');
      toastWrap.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastWrap);
    }
    const t = document.createElement('div');
    t.className = 'll-toast';
    t.innerHTML = `<i class="ph ${icon}" aria-hidden="true"></i>${escapeHTML(message)}`;
    toastWrap.appendChild(t);
    setTimeout(() => { t.remove(); }, duration + 600);
  }

  // ============================== QR SVG ==============================
  // Simulated QR — a stable pseudo-random 25x25 grid seeded on the input
  // string. Not a real QR; for the prototype's purposes it reads as one.
  function renderFakeQR(seedString) {
    const size = 25;
    let h = 2166136261;
    for (const c of seedString) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    const rand = () => { h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h >>> 0) % 1000) / 1000; };

    let rects = '';
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const corner =
          (x < 7 && y < 7) ||
          (x > size - 8 && y < 7) ||
          (x < 7 && y > size - 8);
        const edge =
          (x < 7 && y < 7 && ((x === 0 || x === 6 || y === 0 || y === 6) || (x > 1 && x < 5 && y > 1 && y < 5))) ||
          (x > size - 8 && y < 7 && ((x === size - 1 || x === size - 7 || y === 0 || y === 6) || (x > size - 6 && x < size - 2 && y > 1 && y < 5))) ||
          (x < 7 && y > size - 8 && ((x === 0 || x === 6 || y === size - 1 || y === size - 7) || (x > 1 && x < 5 && y > size - 6 && y < size - 2)));
        let filled = false;
        if (corner) filled = edge;
        else filled = rand() > 0.55;
        if (filled) {
          rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02" />`;
        }
      }
    }
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" fill="#262116" role="img" aria-label="QR code">
        <rect x="0" y="0" width="${size}" height="${size}" fill="#fff"/>
        ${rects}
      </svg>`;
  }

  // ============================== Sparks ==============================
  function burstSparks(host) {
    const sparks = document.createElement('div');
    sparks.className = 'll-sparks';
    const colors = ['#e2ba60', '#dcb05e', '#c49e54', '#5c9d94', '#f6e5b8'];
    for (let i = 0; i < 24; i++) {
      const s = document.createElement('span');
      s.className = 'll-spark';
      const angle = (i / 24) * Math.PI * 2 + Math.random() * 0.3;
      const dist = 80 + Math.random() * 60;
      s.style.setProperty('--x', `${Math.cos(angle) * dist}px`);
      s.style.setProperty('--y', `${Math.sin(angle) * dist}px`);
      s.style.setProperty('--r', `${Math.random() * 360}deg`);
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = `${(i % 6) * 20}ms`;
      sparks.appendChild(s);
    }
    host.style.position = host.style.position || 'relative';
    host.appendChild(sparks);
    setTimeout(() => sparks.remove(), 1400);
  }

  // ============================== Stagger ==============================
  function stagger(container) {
    const kids = container ? container.children : [];
    Array.from(kids).forEach((c, i) => c.style.setProperty('--i', i));
  }

  // ============================== Expose ==============================
  // Seed before any page script runs
  seedIfNeeded();

  // Reflect auth on <body> for scoped styling
  document.addEventListener('DOMContentLoaded', () => {
    document.body.dataset.auth = getAuth();
  });

  window.LL = {
    // data
    allProjects, getProject, saveProject, deleteProject,
    createProject, addMemory,
    getAuth, setAuth, getUserName, setUserName,
    // ui
    openModal, closeModal, closeTopModal,
    toast, renderFakeQR, burstSparks, stagger,
    // helpers
    escapeHTML, nl2br, splitLines, fmtRelative, uuid,
    // debug
    reseed: () => { localStorage.removeItem(K_SEED); seedIfNeeded(); },
    reset:  () => { [K_PROJECTS, K_SEED, K_AUTH, K_NAME].forEach(k => localStorage.removeItem(k)); seedIfNeeded(); location.reload(); },
  };
})();
