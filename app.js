(() => {
  const D = window.PERU_2026;
  const PH = window.PERU_PHOTOS || { items: [], policy: '', offlineNote: '' };
  const APP_VERSION = 'v15';
  const APP_BUILD = 'Stability & iPhone Polish';
  const STORAGE_PREFIX = 'peru2026_';
  const PHOTO_CACHE = 'peru-2026-photo-pack';
  const PHOTO_STATE_KEY = 'peru2026_photo_pack';
  let deferredInstallPrompt = null;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);

  const icons = {
    dashboard: '⌂', plan: '◫', bookings: '✓', tasks: '□', machu: '△',
    payments: '↔', journal: '✎', pack: '⌁', emergency: '!', amazon: '⌬', wildlife: '◉', photos: '▣', cusco: '◈', ollanta: '◇', lima: '≈', guide: '▤', settings: '⚙'
  };
  const nav = [
    ['dashboard', 'Centrum dowodzenia'],
    ['plan', 'Plan dzień po dniu'],
    ['bookings', 'Rezerwacje i statusy'],
    ['tasks', 'Co jeszcze zrobić'],
    ['machu', 'Machu Picchu Complete'],
    ['payments', 'Płatności i rozliczenia'],
    ['journal', 'Expedition Journal'],
    ['pack', 'Expedition Pack'],
    ['emergency', 'Emergency'],
    ['amazon', 'Amazonia Field Module'],
    ['wildlife', 'Wildlife Tracker'],
    ['photos', 'Prawdziwe zdjęcia'],
    ['cusco', 'Cusco Field Module'],
    ['ollanta', 'Ollantaytambo Field Module'],
    ['lima', 'Lima City Module'],
    ['guide', 'Przewodnik terenowy'],
    ['settings', 'Offline, kopia i diagnostyka']
  ];

  let route = 'dashboard';
  let chapterId = null;
  let filter = 'all';
  let selectedDay = null;

  function parseHash() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    route = parts[0] || 'dashboard';
    chapterId = parts[1] || null;
    selectedDay = route === 'journal' ? (parts[1] || null) : null;
  }
  parseHash();

  function localDone() {
    try { return JSON.parse(localStorage.getItem('peru2026_tasks') || '{}'); }
    catch { return {}; }
  }
  const setDone = (value) => localStorage.setItem('peru2026_tasks', JSON.stringify(value));
  const status = (id) => {
    const item = D.status[id] || D.status.planned;
    return `<span class="status tone-${item.tone}">${esc(item.label)}</span>`;
  };
  const paymentLabel = (id) => id === 'paid'
    ? 'Zapłacone'
    : id === 'partial'
      ? 'Depozyt zapłacony / saldo otwarte'
      : 'Niezapłacone';

  function safeJSON(raw, fallback = {}) {
    try { const parsed = JSON.parse(raw); return parsed ?? fallback; }
    catch { return fallback; }
  }

  function downloadJSON(filename, value) {
    const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = filename; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 800);
  }

  function appStorageSnapshot() {
    const data = {};
    try {
      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (key?.startsWith(STORAGE_PREFIX)) data[key] = localStorage.getItem(key);
      }
    } catch {}
    return data;
  }

  function fullBackup() {
    return {
      kind: 'peru-2026-full-backup',
      schema: 15,
      exportedAt: new Date().toISOString(),
      appVersion: APP_VERSION,
      localStorage: appStorageSnapshot()
    };
  }

  function storageSize() {
    const values = Object.entries(appStorageSnapshot());
    const bytes = values.reduce((sum, [key, value]) => sum + new Blob([key, value || '']).size, 0);
    return { keys: values.length, bytes, label: bytes < 1024 ? `${bytes} B` : bytes < 1048576 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1048576).toFixed(2)} MB` };
  }

  function photoPackState() {
    return safeJSON(localStorage.getItem(PHOTO_STATE_KEY) || localStorage.getItem('peru2026_photo_pack_v14') || '{}', {});
  }

  function mediaIntegrity() {
    const allowed = new Set(['commons.wikimedia.org', 'curassowlodge.com']);
    const issues = [];
    const ids = new Set();
    for (const item of PH.items || []) {
      if (!item.id || ids.has(item.id)) issues.push(`Powtórzony lub pusty identyfikator: ${item.id || '(brak)'}`);
      ids.add(item.id);
      if (item.ai !== false || item.kind !== 'photograph') issues.push(`${item.title}: wpis nie jest oznaczony jako fotografia bez AI`);
      for (const field of ['image', 'source']) {
        try { if (!allowed.has(new URL(item[field]).hostname)) issues.push(`${item.title}: niedozwolona domena ${field}`); }
        catch { issues.push(`${item.title}: nieprawidłowy adres ${field}`); }
      }
      if (!Array.isArray(item.targets) || !item.targets.length) issues.push(`${item.title}: brak celu w aplikacji`);
    }
    return { ok: issues.length === 0, issues, total: PH.items?.length || 0 };
  }

  function showToast(message, tone = 'ok') {
    let toast = $('#appToast');
    if (!toast) {
      toast = document.createElement('div'); toast.id = 'appToast'; toast.className = 'app-toast';
      document.body.appendChild(toast);
    }
    toast.className = `app-toast show tone-${tone}`; toast.textContent = message;
    clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }


  function photoFor(category, target) {
    return PH.items.find((item) => item.category === category && item.targets?.includes(target));
  }

  function photoFigure(category, target, compact = false) {
    const item = photoFor(category, target);
    if (!item) return '';
    return `<figure class="reference-photo ${compact ? 'compact' : ''}">
      <a href="${esc(item.source)}" target="_blank" rel="noreferrer" aria-label="Źródło fotografii: ${esc(item.title)}">
        <img src="${esc(item.image)}" alt="${esc(item.title)} — fotografia dokumentalna" loading="lazy" decoding="async" onerror="this.closest('figure').classList.add('photo-failed')">
      </a>
      <div class="photo-placeholder"><strong>Zdjęcie chwilowo niedostępne</strong><span>Połącz się z internetem albo pobierz pakiet offline w ustawieniach.</span></div>
      <figcaption><strong>${esc(item.title)}</strong><span>${esc(item.caption)}</span><a href="${esc(item.source)}" target="_blank" rel="noreferrer">Autor i licencja ↗</a></figcaption>
    </figure>`;
  }

  function photoThumb(category, target, alt) {
    const item = photoFor(category, target);
    if (!item) return '';
    return `<a class="real-photo-thumb" href="${esc(item.source)}" target="_blank" rel="noreferrer" title="Źródło i licencja"><img src="${esc(item.image)}" alt="${esc(alt || item.title)} — fotografia dokumentalna" loading="lazy" decoding="async" onerror="this.parentElement.classList.add('photo-failed')"></a>`;
  }

  function countdown() {
    const ms = new Date(D.meta.startDate) - new Date();
    if (ms <= 0) return 'Wyprawa trwa lub już się odbyła';
    return `${Math.ceil(ms / 86400000)} dni`;
  }

  function stats() {
    const done = D.bookings.filter((x) => ['done', 'confirmed'].includes(x.status)).length;
    const open = D.bookings.filter((x) => ['buy', 'open'].includes(x.status)).length;
    const onsite = D.tasks.filter((x) => x.status === 'onsite').length;
    const settlements = D.payments.filter((x) => x.settlement.startsWith('Do rozliczenia')).length;
    return { done, open, onsite, settlements };
  }

  function shell(content) {
    const routeLabel = nav.find((x) => x[0] === route)?.[1] || 'Peru 2026';
    return `
      <div class="reading-progress" id="readingProgress"></div>
      <div class="app">
        <div class="mobile-overlay"></div>
        <aside class="sidebar">
          <div class="brand">
            <span class="brand-kicker">EXPEDITION COMMAND</span>
            <strong>PERU 2026</strong>
            <small>${esc(D.meta.travelers)} · ${esc(D.meta.dates)}</small>
          </div>
          <nav class="nav">
            ${nav.map(([id, label]) => `
              <button type="button" data-route="${id}" class="${route === id ? 'active' : ''}">
                <span class="nav-icon">${icons[id]}</span><span>${esc(label)}</span>
              </button>`).join('')}
          </nav>
          <div class="sidebar-foot">
            ${D.meta.notion ? `<a href="${esc(D.meta.notion)}" target="_blank" rel="noreferrer">🔐 Prywatny sejf Notion</a>` : ''}
            <div>Wersja ${APP_VERSION} · ${APP_BUILD}</div>
            <div>Expedition OS · offline-first</div>
          </div>
        </aside>
        <div class="main">
          <header class="topbar">
            <div>
              <div class="topbar-title">${esc(routeLabel)}</div>
              <div class="topbar-sub">Plan wyprawowy + przewodnik terenowy pod waszą trasę</div>
            </div>
            <div class="top-actions">
              <span class="connection-badge" id="connectionBadge" aria-live="polite">Sprawdzanie…</span>
              <button class="soft-btn" type="button" id="printBtn">Drukuj</button>
              <button class="icon-btn menu-btn" type="button" aria-label="Otwórz menu" aria-expanded="false">☰</button>
            </div>
          </header>
          ${content}
        </div>
        <nav class="mobile-dock" aria-label="Szybka nawigacja">
          ${[['dashboard','⌂','Start'],['plan','◫','Plan'],['machu','△','Machu'],['wildlife','◉','Fauna']].map(([id,icon,label]) => `<button type="button" data-route="${id}" class="${route === id ? 'active' : ''}"><span>${icon}</span><small>${label}</small></button>`).join('')}
          <button type="button" id="mobileMore" aria-label="Otwórz pełne menu"><span>☰</span><small>Więcej</small></button>
        </nav>
      </div>`;
  }

  function dashboard() {
    const s = stats();
    const urgent = D.tasks.filter((x) => ['buy', 'open'].includes(x.status)).slice(0, 6);
    const guideCount = D.guides?.length || 0;
    return `
      <main class="page">
        <section class="hero" style="--hero:url('${esc(D.meta.hero)}')">
          <div class="hero-content">
            <span class="eyebrow">Wasza wyprawa · nie ogólny przewodnik</span>
            <h1>Peru<br>2026</h1>
            <p>Kompletny plan operacyjny od pierwszego przylotu do ostatniego transferu, połączony z długimi rozdziałami terenowymi pod konkretne dni.</p>
            <div class="hero-actions">
              <button class="primary-btn" type="button" data-route="plan">Otwórz plan wyprawy</button>
              <button class="ghost-btn" type="button" data-route="guide">Czytaj przewodnik</button>
            </div>
          </div>
        </section>
        <section class="metrics">
          <div class="metric"><span>Do rozpoczęcia</span><strong>${countdown()}</strong><small>Start rezerwacji 04.09.2026</small></div>
          <div class="metric"><span>Potwierdzone elementy</span><strong>${s.done}</strong><small>loty, noclegi, Curassow, Machu i pociąg</small></div>
          <div class="metric"><span>Otwarte rezerwacje / decyzje</span><strong>${s.open}</strong><small>najważniejsze braki operacyjne</small></div>
          <div class="metric"><span>Duże rozdziały gotowe</span><strong>${guideCount}</strong><small>długie rozdziały terenowe</small></div>
        </section>
        <section class="section">
          <div class="section-head"><div><h2>Trasa wyprawy</h2><p>Od spokojnego startu w Limie, przez Amazonię i Andy, po odpoczynek przed powrotem.</p></div></div>
          <div class="panel"><div class="route-strip">
            ${D.route.map(([name, date]) => `<div class="route-stop"><div class="route-node"></div><strong>${esc(name)}</strong><small>${esc(date)}</small></div>`).join('')}
          </div></div>
        </section>
        <section class="section grid-2">
          <div class="panel">
            <h3>Najbliższe rzeczy do zamknięcia</h3>
            <div class="urgent-list">${urgent.map((task) => `
              <div class="urgent-item">
                <span class="dot" style="background:${task.status === 'open' ? 'var(--red)' : 'var(--amber)'}"></span>
                <div><strong>${esc(task.title)}</strong><div class="muted small">${esc(task.note)}</div></div>
                ${status(task.status)}
              </div>`).join('')}</div>
          </div>
          <div class="panel">
            <h3>Najważniejsze moduły gotowe</h3>
            <div class="simple-list">
              <div class="simple-item"><span>◉</span><div><strong>Amazonia i Curassow</strong><div class="muted small">Ekosystem, rytm dnia, łódź, trekking, camping i praca z przewodnikiem.</div></div></div>
              <div class="simple-item"><span>◉</span><div><strong>Iquitos i Cusco</strong><div class="muted small">Historia miejsc podpięta do dni regeneracji i aklimatyzacji.</div></div></div>
              <div class="simple-item"><span>◉</span><div><strong>Sacred Valley i Ollantaytambo</strong><div class="muted small">Przewodnik krok po kroku pod TaxiDatum i dwa spokojne dni w dolinie.</div></div></div>
              <div class="simple-item"><span>◉</span><div><strong>Machu Picchu</strong><div class="muted small">Duży rozdział łączący archeologię z waszą Rutą 3-A i próbą zakupu Ruty 2.</div></div></div>
            </div>
          </div>
        </section>
        <p class="privacy">${esc(D.meta.privacy)}</p>
      </main>`;
  }

  function plan() {
    const items = filter === 'all' ? D.itinerary : D.itinerary.filter((x) => x.status === filter);
    return `
      <main class="page">
        <h1 class="page-title">Plan dzień po dniu</h1>
        <p class="page-intro">Pełna oś wyprawy 04–26.09. Każdy dzień zawiera nocleg, transport, status i praktyczny opis. To jest rdzeń aplikacji.</p>
        <div class="filters">
          ${[['all', 'Wszystkie'], ['done', 'Zrobione'], ['confirmed', 'Potwierdzone'], ['buy', 'Do rezerwacji'], ['open', 'Decyzje'], ['onsite', 'Na miejscu'], ['planned', 'Plan ustalony']]
            .map(([id, label]) => `<button type="button" class="filter ${filter === id ? 'active' : ''}" data-filter="${id}">${label}</button>`).join('')}
        </div>
        <section class="day-list">
          ${items.map((day, index) => `
            <details class="day-card" ${index < 2 ? 'open' : ''}>
              <summary><div class="day-date">${esc(day.date)}</div><div><div class="day-place">${esc(day.place)}</div><div class="day-title">${esc(day.title)}</div></div>${status(day.status)}</summary>
              <div class="day-body"><p>${esc(day.body)}</p><div class="facts"><div class="fact"><b>Nocleg</b>${esc(day.sleep)}</div><div class="fact"><b>Transport</b>${esc(day.transport)}</div></div></div>
            </details>`).join('') || '<div class="empty">Brak dni w tym filtrze.</div>'}
        </section>
      </main>`;
  }

  function bookings() {
    const items = filter === 'all' ? D.bookings : D.bookings.filter((x) => x.status === filter);
    return `
      <main class="page">
        <h1 class="page-title">Rezerwacje i statusy</h1>
        <p class="page-intro">Co jest już zamknięte, czego nadal brakuje i które decyzje pozostają otwarte. Bez publicznych kodów, adresów i kwot.</p>
        <div class="filters">
          ${[['all', 'Wszystkie'], ['done', 'Kupione / zarezerwowane'], ['confirmed', 'Potwierdzone'], ['buy', 'Do rezerwacji'], ['open', 'Decyzja otwarta']]
            .map(([id, label]) => `<button type="button" class="filter ${filter === id ? 'active' : ''}" data-filter="${id}">${label}</button>`).join('')}
        </div>
        <section class="cards">${items.map((booking) => `
          <article class="booking">
            <div class="booking-top"><div><div class="booking-date">${esc(booking.date)}</div><h3>${esc(booking.name)}</h3></div>${status(booking.status)}</div>
            <p>${esc(booking.detail)}</p>
            <div class="booking-meta"><span class="tag">${esc(booking.supplier)}</span><span class="tag">${paymentLabel(booking.payment)}</span>${booking.settlement === 'pending' ? '<span class="tag">Do rozliczenia</span>' : ''}</div>
          </article>`).join('')}</section>
      </main>`;
  }

  function tasks() {
    const done = localDone();
    const count = Object.values(done).filter(Boolean).length;
    const pct = Math.round(count / D.tasks.length * 100);
    return `
      <main class="page">
        <h1 class="page-title">Co jeszcze trzeba zrobić</h1>
        <p class="page-intro">Kolejność działań pochodzi z planu wyprawowego. Odznaczenia są zapisywane tylko na tym urządzeniu.</p>
        <section class="task-layout section">
          <div class="tasks">${D.tasks.map((task) => `
            <label class="task ${done[task.id] ? 'done-local' : ''}">
              <input type="checkbox" data-task="${task.id}" ${done[task.id] ? 'checked' : ''}>
              <div><div class="task-title">${esc(task.title)}</div><div class="task-note">${esc(task.note)}</div></div>
              <div class="task-when">${esc(task.when)}</div>
            </label>`).join('')}</div>
          <aside>
            <div class="panel"><h3>Postęp checklisty</h3><div class="check-count">${count}/${D.tasks.length}</div><div class="progress-wrap"><div class="progress" style="width:${pct}%"></div></div><p class="muted small">Postęp lokalny: ${pct}%.</p></div>
            <div class="callout" style="margin-top:14px"><strong>Najpierw zamknąć</strong>Hotele Cusco/Ollantaytambo/Aguas, noc 20/21, TaxiDatum, lot Cusco–Lima i końcową Limę.</div>
          </aside>
        </section>
      </main>`;
  }

  function timeline(title, intro, items) {
    return `<section class="panel"><h3>${title}</h3><p class="muted timeline-intro">${intro}</p><div class="timeline">${items.map((item) => `
      <div class="timeline-item"><div class="timeline-time">${esc(item[0])}</div><div class="timeline-line"></div><div class="timeline-content"><h3>${esc(item[1])}</h3><p>${esc(item[2])}</p></div></div>`).join('')}</div></section>`;
  }

  function machuStorage() {
    const fallback = { checks:{}, route:{}, notes:'', route2Status:'not-tried', route2Choice:'', route2Progress:{}, route2Notes:'', actual:{} };
    try {
      const current = localStorage.getItem('peru2026_machu_v12');
      if (current) return { ...fallback, ...JSON.parse(current) };
      const legacy = localStorage.getItem('peru2026_machu_v11');
      if (legacy) {
        const migrated = { ...fallback, ...JSON.parse(legacy) };
        localStorage.setItem('peru2026_machu_v12', JSON.stringify(migrated));
        return migrated;
      }
      return fallback;
    } catch { return fallback; }
  }
  function saveMachuStorage(value) { localStorage.setItem('peru2026_machu_v12', JSON.stringify(value)); }

  function route2Detail(route, saved) {
    const completed = route.steps.filter(step => saved.route2Progress?.[`${route.id}:${step.id}`]).length;
    return `<details class="route2-detail" ${route.id === '2a' ? 'open' : ''}>
      <summary><div><span>${esc(route.badge)}</span><h3>${esc(route.name)}</h3><p>${esc(route.summary)}</p></div><strong>${completed}/${route.steps.length}</strong></summary>
      <div class="route2-detail-body">
        <div class="route2-quick-grid">${route.quick.map(([label,value])=>`<div><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join('')}</div>
        <a class="official-map-link" href="${esc(route.mapUrl)}" target="_blank" rel="noreferrer">Otwórz oficjalną mapę PDF ↗</a>
        <div class="route2-step-list">${route.steps.map(step=>{const key=`${route.id}:${step.id}`; const checked=!!saved.route2Progress?.[key]; return `<article class="route2-step ${checked?'complete':''}"><div class="route2-step-index">${esc(step.order)}</div><div><div class="route2-step-top"><div><span>${esc(step.time)} · orientacyjnie</span><h4>${esc(step.name)}</h4></div><label class="seen-toggle"><input type="checkbox" data-machu-route2-stop="${esc(key)}" ${checked?'checked':''}><span>${checked?'Zaliczone':'Odhacz'}</span></label></div>${photoFigure('Machu Picchu', step.id, true)}<p><strong>Na co patrzeć:</strong> ${esc(step.look)}</p><p class="muted"><strong>Zdjęcie:</strong> ${esc(step.photo)}</p></div></article>`}).join('')}</div>
      </div>
    </details>`;
  }

  function machu() {
    const M = window.PERU_MACHU;
    if (!M) return `<main class="page"><h1 class="page-title">Machu Picchu</h1><p>Moduł nie został załadowany.</p></main>`;
    const saved = machuStorage();
    const checkCount = M.rules.filter(x => saved.checks?.[x.id]).length;
    const routeCount = M.route3.filter(x => saved.route?.[x.id]).length;
    const route2Labels = { 'not-tried':'Jeszcze nie próbowano', queue:'W kolejce / procedura w toku', bought:'Bilet kupiony', unavailable:'Brak biletu' };
    return `<main class="page machu-page">
      <section class="machu-hero" style="--machu-hero:url('${esc(M.hero)}')"><div><span class="eyebrow">19–20.09 · najważniejsza operacja wyprawy</span><h1>Machu Picchu<br>Mission Complete</h1><p>Pełny moduł waszej Ruty 3-A z Waynapicchu oraz dokładny przewodnik po Rucie 2-A i 2-B: różnice, kolejność miejsc, oficjalne mapy i tracker przejścia.</p><div class="hero-actions"><button class="primary-btn" type="button" data-machu-scroll="mission">Plan dnia</button><button class="ghost-btn" type="button" data-machu-scroll="route">Ruta 3-A</button><button class="ghost-btn" type="button" data-machu-scroll="route2">Ruta 2-A / 2-B</button><button class="ghost-btn" type="button" data-machu-scroll="rules">Checklista</button></div></div></section>

      <section class="metrics compact-metrics"><div class="metric"><span>Bilet główny</span><strong>3-A</strong><small>${esc(M.ticket.entry)} · ${esc(M.ticket.date)}</small></div><div class="metric"><span>Przejście trasy</span><strong>${routeCount}/${M.route3.length}</strong><small>odhaczane na miejscu</small></div><div class="metric"><span>Checklista</span><strong>${checkCount}/${M.rules.length}</strong><small>przed wyjściem z hotelu</small></div><div class="metric"><span>Ruta 2</span><strong>${esc(route2Labels[saved.route2Status] || 'Otwarte')}</strong><small>${esc(saved.route2Choice || 'priorytet 13:00')}</small></div></section>

      <section class="section machu-ticket-grid"><article class="machu-ticket"><span>PEWNY BILET</span><h2>${esc(M.ticket.route)}</h2><dl><div><dt>Data</dt><dd>${esc(M.ticket.date)}</dd></div><div><dt>Wejście</dt><dd>${esc(M.ticket.entry)}</dd></div><div><dt>Uczestnicy</dt><dd>${esc(M.ticket.holder)}</dd></div><div><dt>Status</dt><dd>${esc(M.ticket.status)}</dd></div></dl></article><article class="machu-live"><span>ZWERYFIKOWANO ${esc(M.verified.date)}</span><h2>${esc(M.verified.headline)}</h2><p>${esc(M.verified.text)}</p><a href="${esc(M.verified.source)}" target="_blank" rel="noreferrer">Oficjalny komunikat ↗</a></article></section>

      <section class="section" id="machu-mission"><div class="section-head"><div><h2>20.09 — plan operacyjny</h2><p>To plan z marginesem, nie obietnica co do minuty. Rzeczywiste godziny wpiszcie po każdym kluczowym etapie.</p></div></div><div class="machu-mission-grid"><div class="panel"><div class="timeline">${M.mission.map(x=>`<div class="timeline-item"><div class="timeline-time">${esc(x.time)}</div><div class="timeline-line"></div><div class="timeline-content"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></div>`).join('')}</div></div><div class="panel machu-actual"><h3>Rzeczywiste godziny</h3><p class="muted small">Zapis lokalny. Dzięki temu po powrocie zostanie prawdziwy przebieg dnia.</p>${[['wake','Pobudka'],['bus','Autobus w górę'],['entry3','Wejście 3-A'],['gate','Bramka Waynapicchu'],['summit','Szczyt'],['exit3','Wyjście po 3-A'],['entry2','Wejście Ruta 2'],['exit2','Wyjście Ruta 2'],['station','Na stacji']].map(([id,label])=>`<label><span>${label}</span><input type="time" data-machu-actual="${id}" value="${esc(saved.actual?.[id] || '')}"></label>`).join('')}<label><span>Notatka operacyjna</span><textarea data-machu-field="notes" placeholder="Pogoda, kolejki, tempo grupy, decyzja o pociągu…">${esc(saved.notes || '')}</textarea></label></div></div></section>

      <section class="section" id="machu-route"><div class="section-head"><div><h2>Ruta 3-A krok po kroku</h2><p>Oficjalna trasa Waynapicchu ma 2,4 km. Dokładne barierki i kolejność przejścia wyznacza obsługa — aplikacja pokazuje logikę obserwacji, nie zastępuje oznaczeń na miejscu.</p></div><span class="machu-progress-pill">${routeCount}/${M.route3.length} etapów</span></div><div class="machu-route-line">${M.route3.map(x=>`<article class="machu-stop ${saved.route?.[x.id]?'complete':''}"><div class="machu-stop-index">${esc(x.order)}</div><div class="machu-stop-body"><div class="machu-stop-top"><div><span>${esc(x.type)} · ${esc(x.time)}</span><h3>${esc(x.name)}</h3></div><label class="seen-toggle"><input type="checkbox" data-machu-stop="${esc(x.id)}" ${saved.route?.[x.id]?'checked':''}><span>${saved.route?.[x.id]?'Zaliczone':'Odhacz'}</span></label></div>${photoFigure('Machu Picchu', x.id, true)}<p><strong>Na co patrzeć:</strong> ${esc(x.look)}</p><p class="muted"><strong>Zdjęcie:</strong> ${esc(x.photo)}</p></div></article>`).join('')}</div></section>

      <section class="section"><div class="section-head"><div><h2>Sześć rzeczy, które większość ludzi przegapia</h2><p>Macie patrzeć nie tylko na „ładne ruiny”, ale na system.</p></div></div><div class="machu-focus-grid">${M.focusCards.map((x,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('')}</div></section>

      <section class="section" id="machu-route2"><div class="section-head"><div><h2>Ruta 2-A i 2-B — pełny przewodnik</h2><p>Obie należą do Circuito 2 Machupicchu Clásico. Oficjalne mapy podają maksymalnie ${esc(M.route2.maxStay)} pobytu. Różnica dotyczy przede wszystkim początku i wysokości klasycznego punktu widokowego; po Foso Seco trasy mają bardzo podobny rdzeń miejski.</p></div><span class="machu-progress-pill">2 oficjalne warianty</span></div>
        <div class="grid-2 machu-route2"><div class="panel"><h3>Status zakupu 19.09</h3><label class="field-label"><span>Co się udało?</span><select id="machuRoute2Status"><option value="not-tried" ${saved.route2Status==='not-tried'?'selected':''}>Jeszcze nie próbowano</option><option value="queue" ${saved.route2Status==='queue'?'selected':''}>W kolejce / procedura w toku</option><option value="bought" ${saved.route2Status==='bought'?'selected':''}>Bilet kupiony</option><option value="unavailable" ${saved.route2Status==='unavailable'?'selected':''}>Brak biletu</option></select></label><label class="field-label"><span>Wybrana ruta i godzina</span><input id="machuRoute2Choice" value="${esc(saved.route2Choice || '')}" placeholder="np. 2-B · 13:00"></label><div class="priority-stack">${M.route2.priority.map((x,i)=>`<div><b>${i+1}</b><span>${esc(x)}</span></div>`).join('')}</div><div class="callout"><strong>Zasada</strong>${esc(M.route2.rule)}</div></div><div class="panel"><h3>Najkrótsza odpowiedź</h3>${M.route2.differences.map(x=>`<article class="route2-card"><span>${esc(x.verdict)}</span><h3>${esc(x.name)}</h3><p>${esc(x.text)}</p></article>`).join('')}<p class="muted small route2-verified">${esc(M.route2.verified)}</p></div></div>

        <div class="route2-compare-wrap"><table class="route2-compare"><thead><tr><th>Porównanie</th><th>Ruta 2-A</th><th>Ruta 2-B</th></tr></thead><tbody>${M.route2.compare.map(row=>`<tr><th>${esc(row.label)}</th><td>${esc(row.a)}</td><td>${esc(row.b)}</td></tr>`).join('')}</tbody></table></div>

        <div class="section-head route2-subhead"><div><h2>Co Ruta 2 daje po porannej 3-A?</h2><p>To nie jest bezsensowne powtarzanie. Poranna 3-A koncentruje się na sektorze królewskim i Waynapicchu, a Circuito 2 dokłada klasyczną panoramę i ceremonialno-miejski rdzeń.</p></div></div><div class="route2-gain-grid">${M.route2.after3A.map((x,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('')}</div>

        <div class="section-head route2-subhead"><div><h2>Przebieg krok po kroku</h2><p>Czasy przy punktach są orientacyjnym podziałem waszego limitu, a nie oficjalnymi limitami etapów. Nie cofajcie się pod prąd i zawsze wykonujcie polecenia obsługi.</p></div></div><div class="route2-details">${M.route2.routes.map(route=>route2Detail(route,saved)).join('')}</div>

        <div class="grid-2 route2-bottom"><div class="panel"><h3>Słownik na trasie</h3><div class="route2-glossary">${M.route2.glossary.map(([term,text])=>`<div><strong>${esc(term)}</strong><span>${esc(text)}</span></div>`).join('')}</div></div><div class="panel"><h3>Notatka po drugim wejściu</h3><p class="muted small">Zapis lokalny pozostaje razem z godzinami i odhaczonymi punktami.</p><label class="field-label"><span>Co było najlepsze, co ominęliśmy, jaka była pogoda?</span><textarea data-machu-field="route2Notes" rows="9" placeholder="np. 2-B 13:00, mgła zeszła po 20 minutach, najlepsza była Plaza de los Templos…">${esc(saved.route2Notes || '')}</textarea></label></div></div>
      </section>

      <section class="section" id="machu-rules"><div class="section-head"><div><h2>Twarda checklista przed wyjściem</h2><p>Oficjalne zasady są restrykcyjne. Nie zabierajcie akcesoriów, które mogą zostać zatrzymane przy wejściu.</p></div></div><div class="grid-2"><div class="panel"><div class="checklist">${M.rules.map(x=>`<label class="task-check"><input type="checkbox" data-machu-check="${esc(x.id)}" ${saved.checks?.[x.id]?'checked':''}><span>${esc(x.text)}</span></label>`).join('')}</div></div><div class="panel"><h3>Zakazane lub ryzykowne</h3><div class="simple-list">${M.prohibited.map((x,i)=>`<div class="simple-item"><span>${String(i+1).padStart(2,'0')}</span><div>${esc(x)}</div></div>`).join('')}</div></div></div></section>

      <section class="section"><div class="section-head"><div><h2>Decyzja bezpieczeństwa</h2><p>Warunki na trasie są ważniejsze niż idealny plan.</p></div></div><div class="machu-risk-grid">${M.risk.map(x=>`<article class="risk-${esc(x.level)}"><span>${esc(x.level)}</span><h3>${esc(x.title)}</h3><p>${esc(x.action)}</p></article>`).join('')}</div></section>

      <section class="section grid-2"><div class="panel"><h3>Pełny rozdział historyczny</h3><p class="muted">Architektura, historia badań, hipotezy, Świątynia Słońca, Kondor i Circuito 2 są opisane w rozdziale książkowym.</p><button class="soft-btn" type="button" data-chapter="machu">Otwórz rozdział →</button></div><div class="panel"><h3>Dane i źródła</h3><div class="field-source-list">${M.sources.map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noreferrer">${esc(x.label)} ↗</a>`).join('')}</div><button class="soft-btn" type="button" id="exportMachu">Eksportuj zapis Machu</button></div></section>
    </main>`;
  }
  function payments() {
    return `
      <main class="page">
        <h1 class="page-title">Płatności i rozliczenia</h1>
        <p class="page-intro">Bez Tricounta i bez dokładnych kwot. Liczy się tylko: czy dostawca jest opłacony, kto wyłożył pieniądze i czy wydatek wymaga rozliczenia między wami.</p>
        <div class="table-wrap section"><table><thead><tr><th>Pozycja</th><th>Status wobec dostawcy</th><th>Zapłacił</th><th>Rozliczenie grupowe</th></tr></thead><tbody>${D.payments.map((payment) => `<tr><td><strong>${esc(payment.name)}</strong></td><td class="${payment.supplier === 'Zapłacone' ? 'pay-paid' : 'pay-unpaid'}">${esc(payment.supplier)}</td><td>${esc(payment.payer)}</td><td>${esc(payment.settlement)}</td></tr>`).join('')}</tbody></table></div>
        <div class="callout section"><strong>Zasada</strong>Dokładne kwoty i prywatne dane nie są potrzebne w publicznym przewodniku. Tutaj ma być natychmiast widać, co jest opłacone, co nadal trzeba zapłacić i co później rozliczyć.</div>
      </main>`;
  }

  function guideLanding() {
    return `
      <main class="page guide-page">
        <div class="guide-intro">
          <span class="eyebrow dark">DŁUGIE ROZDZIAŁY · GOTOWE</span>
          <h1 class="page-title">Przewodnik terenowy</h1>
          <p class="page-intro">Rozdziały podpięte do konkretnych dni. Każdy łączy historię, praktykę, „na co patrzeć”, zdjęcia i źródła.</p>
        </div>
        <section class="guide-grid section">
          ${(D.guides || []).map((chapter) => `
            <article class="guide-card">
              <button type="button" class="guide-image" data-chapter="${chapter.id}" aria-label="Otwórz rozdział ${esc(chapter.title)}">
                <img src="${esc(chapter.hero)}" alt="${esc(chapter.heroAlt)}" loading="lazy" onerror="this.closest('.guide-card').classList.add('photo-failed')">
              </button>
              <div class="guide-card-body">
                <div class="guide-meta"><span>${esc(chapter.kicker)}</span><span>${esc(chapter.readingTime)}</span></div>
                <h2>${esc(chapter.title)}</h2>
                <p>${esc(chapter.summary)}</p>
                <div class="guide-card-foot"><span>${chapter.sections.length} sekcji</span><button type="button" class="text-btn" data-chapter="${chapter.id}">Czytaj rozdział →</button></div>
              </div>
            </article>`).join('')}
        </section>
        <section class="section grid-2">
          <div class="panel"><h3>Moduły praktyczne</h3><p class="muted">Amazonia, Cusco, Ollantaytambo, Lima, Machu Picchu i Wildlife Tracker są dostępne osobno w menu. Nie są oznaczone jako „do opracowania”.</p></div>
          <div class="panel"><h3>Stan wydania</h3><p class="muted">Treść jest zamknięta. Wersja ${APP_VERSION} skupia się na stabilności, kopii danych, działaniu offline i wygodzie na iPhonie.</p></div>
        </section>
      </main>`;
  }

  function chapterPage() {
    const chapters = D.guides || [];
    const chapter = chapters.find((item) => item.id === chapterId);
    if (!chapter) return guideLanding();
    const index = chapters.findIndex((item) => item.id === chapter.id);
    const previous = chapters[index - 1];
    const next = chapters[index + 1];
    return `
      <main class="chapter-page">
        <section class="chapter-hero">
          <img src="${esc(chapter.hero)}" alt="${esc(chapter.heroAlt)}">
          <div class="chapter-hero-shade"></div>
          <div class="chapter-hero-content">
            <button type="button" class="chapter-back" data-route="guide">← Wszystkie rozdziały</button>
            <span class="eyebrow">${esc(chapter.kicker)}</span>
            <h1>${esc(chapter.title)}</h1>
            <p>${esc(chapter.summary)}</p>
            <div class="chapter-hero-meta"><span>${esc(chapter.readingTime)}</span><span>${chapter.sections.length} głównych sekcji</span><span>Dni: ${chapter.days.map(esc).join(', ')}</span></div>
          </div>
        </section>

        <div class="chapter-shell">
          <aside class="chapter-toc">
            <div class="chapter-toc-inner">
              <span class="toc-label">W tym rozdziale</span>
              ${chapter.sections.map((section, idx) => `<a href="#section-${idx + 1}">${esc(section.title)}</a>`).join('')}
              <a href="#teren">Przewodnik terenowy</a>
              <a href="#mity">Fakty i uproszczenia</a>
              <a href="#zrodla">Źródła i zdjęcia</a>
            </div>
          </aside>

          <article class="chapter-content">
            <section class="chapter-summary-grid">
              <div class="chapter-summary-card"><span>Najważniejsze fakty</span><ul>${chapter.keyFacts.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></div>
              <div class="chapter-summary-card"><span>Praktyka dla was</span><ul>${chapter.practical.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></div>
            </section>

            <section class="photo-strip" aria-label="Galeria rozdziału">
              ${chapter.gallery.map((image) => `<figure><img src="${esc(image.src)}" alt="${esc(image.alt)}" loading="lazy"><figcaption>${esc(image.caption)}</figcaption></figure>`).join('')}
            </section>

            ${chapter.sections.map((section, idx) => `
              <section class="book-section" id="section-${idx + 1}">
                <div class="section-number">${String(idx + 1).padStart(2, '0')}</div>
                <div><h2>${esc(section.title)}</h2>${section.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}</div>
              </section>`).join('')}

            <section class="field-section" id="teren">
              <span class="eyebrow dark">NA MIEJSCU</span>
              <h2>Przewodnik terenowy dla waszej trójki</h2>
              <div class="field-grid">${chapter.fieldGuide.map((item) => `<article><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div>
            </section>

            <section class="myth-section" id="mity">
              <span class="eyebrow dark">FAKT / UPROSZCZENIE</span>
              <h2>Co warto prostować</h2>
              <div class="myth-list">${chapter.myths.map((item) => `<article><div class="myth-claim">„${esc(item.claim)}”</div><div class="myth-reality">${esc(item.reality)}</div></article>`).join('')}</div>
            </section>

            <section class="sources-section" id="zrodla">
              <span class="eyebrow dark">BIBLIOGRAFIA ROZDZIAŁU</span>
              <h2>Źródła i prawa do zdjęć</h2>
              <p>Tekst jest syntezą przygotowaną pod wasz plan. Dane operacyjne trzeba sprawdzić ponownie przed wyjazdem. Zdjęcia Curassow pochodzą z oficjalnej strony i są używane na podstawie zgody Martina; pozostałe fotografie prowadzą do plików Wikimedia Commons i ich indywidualnych licencji.</p>
              <div class="source-list">${chapter.sources.map((source) => `<a href="${esc(source.url)}" target="_blank" rel="noreferrer">${esc(source.label)} ↗</a>`).join('')}</div>
            </section>

            <nav class="chapter-nav" aria-label="Nawigacja między rozdziałami">
              ${previous ? `<button type="button" data-chapter="${previous.id}"><span>← Poprzedni</span><strong>${esc(previous.title)}</strong></button>` : '<span></span>'}
              ${next ? `<button type="button" data-chapter="${next.id}" class="next"><span>Następny →</span><strong>${esc(next.title)}</strong></button>` : '<button type="button" data-route="guide" class="next"><span>Wróć</span><strong>Wszystkie rozdziały</strong></button>'}
            </nav>
          </article>
        </div>
      </main>`;
  }


  function journalStorage() {
    try { return JSON.parse(localStorage.getItem('peru2026_journal') || '{}'); }
    catch { return {}; }
  }
  function saveJournalStorage(data) { localStorage.setItem('peru2026_journal', JSON.stringify(data)); }
  function entryFor(day) {
    const all = journalStorage();
    return all[day] || { notes:'', weather:'', mood:'', food:'', animals:'', expenses:'', highlights:'', updatedAt:null };
  }
  function journalLanding() {
    const entries = journalStorage();
    const filled = Object.values(entries).filter((x) => x && Object.values(x).some((v) => typeof v === 'string' && v.trim())).length;
    return `<main class="page">
      <h1 class="page-title">Expedition Journal</h1>
      <p class="page-intro">Prywatny dziennik wyprawy zapisany lokalnie na urządzeniu. Dane nie opuszczają telefonu, dopóki sam ich nie wyeksportujesz.</p>
      <section class="metrics compact-metrics">
        <div class="metric"><span>Dni wyprawy</span><strong>${D.itinerary.length}</strong><small>04–26.09.2026</small></div>
        <div class="metric"><span>Uzupełnione wpisy</span><strong>${filled}</strong><small>zapisywane automatycznie lokalnie</small></div>
        <div class="metric"><span>Kopia bezpieczeństwa</span><strong>JSON</strong><small>eksport i import jednym plikiem</small></div>
      </section>
      <div class="journal-toolbar">
        <button class="primary-btn" id="exportJournal" type="button">Eksportuj dziennik</button>
        <label class="soft-btn file-btn">Importuj kopię<input id="importJournal" type="file" accept="application/json"></label>
      </div>
      <section class="journal-grid">${D.itinerary.map(day => {
        const e = entries[day.date]; const has = e && Object.values(e).some(v => typeof v === 'string' && v.trim());
        return `<button type="button" class="journal-card ${has ? 'has-entry' : ''}" data-journal-day="${esc(day.date)}">
          <span>${esc(day.date)}</span><strong>${esc(day.place)}</strong><small>${esc(day.title)}</small><em>${has ? 'Wpis zapisany' : 'Pusty wpis'}</em>
        </button>`;
      }).join('')}</section>
    </main>`;
  }

  function journalDay(dayId) {
    const day = D.itinerary.find(x => x.date === dayId) || D.itinerary[0];
    const e = entryFor(day.date);
    return `<main class="page">
      <button class="back-link" type="button" data-route="journal">← Wszystkie dni</button>
      <div class="journal-day-head"><div><span class="eyebrow dark">${esc(day.date)} · ${esc(day.place)}</span><h1>${esc(day.title)}</h1><p>${esc(day.body)}</p></div>${status(day.status)}</div>
      <section class="journal-editor" data-day="${esc(day.date)}">
        <label><span>Najważniejsze wydarzenia</span><textarea data-journal-field="highlights" placeholder="Co wydarzyło się tego dnia?">${esc(e.highlights)}</textarea></label>
        <label><span>Notatki</span><textarea data-journal-field="notes" placeholder="Wrażenia, ludzie, momenty, rzeczy do zapamiętania…">${esc(e.notes)}</textarea></label>
        <div class="journal-fields">
          <label><span>Pogoda</span><input data-journal-field="weather" value="${esc(e.weather)}" placeholder="np. 28°C, ulewa po południu"></label>
          <label><span>Nastrój / energia</span><input data-journal-field="mood" value="${esc(e.mood)}" placeholder="np. zmęczeni, ale zachwyceni"></label>
          <label><span>Jedzenie i miejsca</span><input data-journal-field="food" value="${esc(e.food)}" placeholder="co jedliśmy, co warto powtórzyć"></label>
          <label><span>Zwierzęta / rośliny</span><input data-journal-field="animals" value="${esc(e.animals)}" placeholder="co zobaczyliśmy"></label>
          <label><span>Wydatki</span><input data-journal-field="expenses" value="${esc(e.expenses)}" placeholder="np. taxi 45 PEN, kolacja 90 PEN"></label>
        </div>
        <div class="save-state" id="journalSaveState">${e.updatedAt ? `Ostatni zapis: ${esc(e.updatedAt)}` : 'Zmiany zapisują się automatycznie.'}</div>
      </section>
    </main>`;
  }

  function packPage() {
    const groups = [
      ['Dokumenty i pieniądze',['Paszport','Ubezpieczenie podróżne','Karty płatnicze + awaryjna gotówka','Bilety i potwierdzenia offline']],
      ['Amazonia',['Lekka odzież szybkoschnąca','Długi rękaw i długie spodnie','Środek na owady','Czołówka','Worki wodoszczelne / ziplocki']],
      ['Andy i Machu',['Warstwa termiczna','Kurtka przeciwdeszczowa','Buty z dobrą przyczepnością','Mały plecak zgodny z limitem','Butelka na wodę']],
      ['Elektronika',['iPhone + ładowarka','Powerbank','Kable zapasowe','Aparat / karty pamięci','Adapter podróżny']]
    ];
    const saved = (()=>{try{return JSON.parse(localStorage.getItem('peru2026_pack')||'{}')}catch{return {}}})();
    return `<main class="page"><h1 class="page-title">Expedition Pack</h1><p class="page-intro">Praktyczna lista pakowania. Zaznaczenia są zapisywane lokalnie i działają offline.</p>
      <section class="pack-grid">${groups.map(([title,items])=>`<article class="panel"><h3>${title}</h3><div class="checklist">${items.map((item,i)=>{const id=title+'_'+i;return `<label class="task-check"><input type="checkbox" data-pack="${esc(id)}" ${saved[id]?'checked':''}><span>${esc(item)}</span></label>`}).join('')}</div></article>`).join('')}</section>
    </main>`;
  }

  function emergencyPage() {
    return `<main class="page"><h1 class="page-title">Emergency</h1><p class="page-intro">Szybki plan działania. Numery i dane placówek trzeba zweryfikować ponownie przed wyjazdem i uzupełnić w prywatnym Notion.</p>
      <section class="emergency-grid">
        <article class="alert-card"><span>01</span><h3>Zagrożenie życia</h3><p>Poproś przewodnika, hotel lub kierowcę o natychmiastowe wezwanie pomocy. Podaj lokalizację, liczbę poszkodowanych i charakter zdarzenia.</p></article>
        <article class="alert-card"><span>02</span><h3>Utrata paszportu</h3><p>Zgłoś utratę na policji, zabezpiecz kopię dokumentu i skontaktuj się z polską placówką konsularną. Nie przechowuj jedynej kopii w tym samym miejscu co paszport.</p></article>
        <article class="alert-card"><span>03</span><h3>Utrata telefonu</h3><p>Włącz tryb utracony, zablokuj SIM, zmień kluczowe hasła i skorzystaj z kopii rezerwacji zapisanej offline na drugim urządzeniu.</p></article>
        <article class="alert-card"><span>04</span><h3>Problem wysokościowy</h3><p>Nie forsuj tempa. Odpoczynek, nawodnienie i zejście niżej są ważniejsze niż realizacja planu. Przy nasileniu objawów potrzebna jest ocena medyczna.</p></article>
      </section>
      <section class="panel phrase-panel"><h3>Najważniejsze zwroty</h3><div class="phrase-list">
        <div><strong>Necesitamos ayuda.</strong><span>Potrzebujemy pomocy.</span></div>
        <div><strong>Llame a una ambulancia.</strong><span>Proszę wezwać karetkę.</span></div>
        <div><strong>He perdido mi pasaporte.</strong><span>Zgubiłem paszport.</span></div>
        <div><strong>¿Dónde está el hospital más cercano?</strong><span>Gdzie jest najbliższy szpital?</span></div>
        <div><strong>Soy alérgico a…</strong><span>Jestem uczulony na…</span></div>
      </div></section>
    </main>`;
  }


  function amazonStorage() {
    try { return JSON.parse(localStorage.getItem('peru2026_amazon') || '{"seen":{},"notes":{},"checks":{}}'); }
    catch { return { seen:{}, notes:{}, checks:{} }; }
  }
  function saveAmazonStorage(value) { localStorage.setItem('peru2026_amazon', JSON.stringify(value)); }

  function amazonPage() {
    const A = window.PERU_AMAZON;
    if (!A) return `<main class="page"><h1 class="page-title">Amazonia</h1><p>Moduł nie został załadowany.</p></main>`;
    const saved = amazonStorage();
    const seenCount = Object.values(saved.seen || {}).filter(Boolean).length;
    const groups = [...new Set(A.species.map(x => x.group))];
    return `<main class="page amazon-page">
      <section class="amazon-hero"><div><span class="eyebrow">07–12.09 · Curassow Expedition</span><h1>Amazonia<br>Field Module</h1><p>Operacyjny moduł waszych sześciu dni: plan terenowy, środowiska, etyka obserwacji i atlas gatunków z własnym trackerem.</p><div class="hero-actions"><button type="button" class="primary-btn" data-amazon-scroll="days">Plan 6D/5N</button><button type="button" class="ghost-btn" data-amazon-scroll="species">Atlas gatunków</button></div></div></section>
      <section class="metrics compact-metrics"><div class="metric"><span>Dni w module</span><strong>${A.days.length}</strong><small>07–12.09</small></div><div class="metric"><span>Profile gatunków</span><strong>${A.species.length}</strong><small>pod wasz rejon i sposób obserwacji</small></div><div class="metric"><span>Oznaczone jako widziane</span><strong>${seenCount}</strong><small>zapis lokalny na urządzeniu</small></div><div class="metric"><span>Tryb</span><strong>Offline</strong><small>dane i tracker bez internetu</small></div></section>

      <section class="section" id="amazon-days"><div class="section-head"><div><h2>Wasze sześć dni w terenie</h2><p>Nie jest to sztywny rozkład lodge. To plan priorytetów, który można dopasować do pogody, tropów i poziomu wody.</p></div></div><div class="amazon-days">${A.days.map((day,di)=>`<article class="amazon-day"><div class="amazon-day-head"><span>${esc(day.date)}</span><div><h3>${esc(day.title)}</h3><p>${esc(day.focus)}</p></div></div><div class="checklist">${day.checklist.map((item,ii)=>{const id=`${di}_${ii}`;return `<label class="task-check"><input type="checkbox" data-amazon-check="${id}" ${saved.checks?.[id]?'checked':''}><span>${esc(item)}</span></label>`}).join('')}</div><label class="amazon-note"><span>Notatka terenowa</span><textarea data-amazon-note="${esc(day.date)}" placeholder="Warunki, miejsce, tropy, decyzje przewodnika…">${esc(saved.notes?.[day.date] || '')}</textarea></label></article>`).join('')}</div></section>

      <section class="section"><div class="section-head"><div><h2>Jak czytać środowisko</h2><p>Amazonia jest mozaiką. To, gdzie jesteście, wpływa na sposób poruszania się i realne szanse obserwacji.</p></div></div><div class="habitat-grid">${A.habitats.map(x=>`<article class="habitat-card"><h3>${esc(x.name)}</h3><p>${esc(x.text)}</p></article>`).join('')}</div></section>

      <section class="section" id="amazon-species"><div class="section-head"><div><h2>Atlas obserwacji</h2><p>Oznacz gatunek dopiero po potwierdzeniu przez przewodnika. Tracker działa lokalnie i offline.</p></div><div class="species-tools"><input id="speciesSearch" type="search" placeholder="Szukaj gatunku…"><select id="speciesGroup"><option value="all">Wszystkie grupy</option>${groups.map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join('')}</select></div></div><div class="species-grid" id="speciesGrid">${A.species.map(x=>speciesCard(x, saved)).join('')}</div></section>

      <section class="section grid-2"><div class="panel"><h3>Pięć zasad terenowych</h3><div class="simple-list">${A.fieldRules.map((x,i)=>`<div class="simple-item"><span>${String(i+1).padStart(2,'0')}</span><div>${esc(x)}</div></div>`).join('')}</div></div><div class="panel"><h3>Jak korzystać z modułu</h3><p class="muted">Przed wyjściem otwórz plan dnia. Po powrocie oznacz potwierdzone gatunki, dopisz warunki i najważniejsze tropy. Po wyprawie te dane zostaną na urządzeniu jako terenowy zapis Amazonii.</p><button class="soft-btn" type="button" id="exportAmazon">Eksportuj obserwacje JSON</button></div></section>
    </main>`;
  }

  function speciesCard(x, saved) {
    const seen = !!saved.seen?.[x.id];
    return `<article class="species-card ${seen?'seen':''}" data-species-card data-name="${esc((x.name+' '+x.group).toLowerCase())}" data-group="${esc(x.group)}">${photoFigure('Zwierzęta', x.id, true)}<div class="species-top"><span class="species-group">${esc(x.group)}</span><label class="seen-toggle"><input type="checkbox" data-seen-species="${esc(x.id)}" ${seen?'checked':''}><span>${seen?'Widziane':'Oznacz jako widziane'}</span></label></div><h3>${esc(x.name)}</h3><dl><div><dt>Szansa</dt><dd>${esc(x.chance)}</dd></div><div><dt>Sygnał</dt><dd>${esc(x.signal)}</dd></div><div><dt>Gdzie</dt><dd>${esc(x.where)}</dd></div><div><dt>Etyka</dt><dd>${esc(x.ethics)}</dd></div><div><dt>Zdjęcie</dt><dd>${esc(x.photo)}</dd></div></dl></article>`;
  }


  function wildlifeStorage() {
    try {
      const raw = localStorage.getItem('peru2026_wildlife_v11');
      if (raw) return JSON.parse(raw);
      const legacy = amazonStorage();
      const initial = { records:[], manualSeen:{...(legacy.seen || {})}, customSpecies:[], migratedFromAmazon:true };
      localStorage.setItem('peru2026_wildlife_v11', JSON.stringify(initial));
      return initial;
    } catch { return { records:[], manualSeen:{}, customSpecies:[] }; }
  }
  function saveWildlifeStorage(value) { localStorage.setItem('peru2026_wildlife_v11', JSON.stringify(value)); }
  function wildlifeSpecies(data = wildlifeStorage()) {
    const W = window.PERU_WILDLIFE || { species:[] };
    return [...W.species, ...(data.customSpecies || [])];
  }
  function wildlifeSpeciesName(id, data) { return wildlifeSpecies(data).find(x => x.id === id)?.name || 'Nieznany gatunek'; }
  function compressWildlifeImage(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve('');
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Nie udało się odczytać zdjęcia.'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Nie udało się otworzyć zdjęcia.'));
        img.onload = () => {
          const max = 720; const scale = Math.min(1, max / Math.max(img.width, img.height));
          const canvas = document.createElement('canvas'); canvas.width = Math.round(img.width * scale); canvas.height = Math.round(img.height * scale);
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', .68));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function wildlifePage() {
    const W = window.PERU_WILDLIFE;
    if (!W) return `<main class="page"><h1 class="page-title">Wildlife Tracker</h1><p>Moduł nie został załadowany.</p></main>`;
    const saved = wildlifeStorage(); const species = wildlifeSpecies(saved); const records = [...(saved.records || [])].sort((a,b)=>String(b.date+b.time).localeCompare(String(a.date+a.time)));
    const counts = {}; const individuals = {}; const last = {}; const photos = {};
    records.forEach(r => { counts[r.speciesId]=(counts[r.speciesId]||0)+1; individuals[r.speciesId]=(individuals[r.speciesId]||0)+(Number(r.count)||0); if(!last[r.speciesId] || String(r.date+r.time)>String(last[r.speciesId].date+last[r.speciesId].time)) last[r.speciesId]=r; if(r.photo) photos[r.speciesId]=r.photo; });
    const seenIds = new Set([...Object.keys(saved.manualSeen || {}).filter(x=>saved.manualSeen[x]), ...Object.keys(counts)]);
    const totalIndividuals = records.reduce((sum,r)=>sum+(Number(r.count)||0),0); const groups = new Set(species.filter(s=>seenIds.has(s.id)).map(s=>s.group)).size;
    const groupOptions = [...new Set(species.map(x=>x.group))].sort();
    return `<main class="page wildlife-page">
      <section class="wildlife-hero"><div><span class="eyebrow">07–12.09 · osobisty rejestr Amazonii</span><h1>Wildlife<br>Tracker</h1><p>Widziane i niewidziane gatunki, każde spotkanie z datą, godziną, miejscem, liczbą osobników, notatką oraz opcjonalną miniaturą zdjęcia.</p><div class="hero-actions"><button class="primary-btn" type="button" data-wildlife-scroll="add">Dodaj obserwację</button><button class="ghost-btn" type="button" data-wildlife-scroll="species">Lista gatunków</button><button class="ghost-btn" type="button" data-wildlife-scroll="log">Dziennik spotkań</button></div></div></section>

      <section class="metrics compact-metrics"><div class="metric"><span>Gatunki widziane</span><strong>${seenIds.size}/${species.length}</strong><small>${Math.round(seenIds.size/species.length*100)||0}% listy</small></div><div class="metric"><span>Spotkania</span><strong>${records.length}</strong><small>oddzielne obserwacje</small></div><div class="metric"><span>Osobniki</span><strong>${totalIndividuals}</strong><small>wartość szacunkowa</small></div><div class="metric"><span>Grupy</span><strong>${groups}</strong><small>ssaki, ptaki, gady itd.</small></div></section>

      <section class="section" id="wildlife-add"><div class="section-head"><div><h2>Dodaj spotkanie</h2><p>Formularz działa offline. Zdjęcie jest zmniejszane do lekkiej miniatury; oryginał pozostaje w telefonie.</p></div></div><form class="wildlife-form panel" id="wildlifeObservationForm"><label><span>Gatunek</span><select name="speciesId" required><option value="">Wybierz…</option>${species.map(x=>`<option value="${esc(x.id)}">${esc(x.name)} · ${esc(x.group)}</option>`).join('')}</select></label><label><span>Data</span><input name="date" type="date" value="2026-09-08" required></label><label><span>Godzina</span><input name="time" type="time"></label><label><span>Miejsce</span><select name="location"><option value="">Wybierz…</option>${W.locations.map(x=>`<option>${esc(x)}</option>`).join('')}</select></label><label><span>Liczba osobników</span><input name="count" type="number" min="1" max="999" value="1"></label><label><span>Pewność</span><select name="confidence">${W.confidence.map(x=>`<option value="${esc(x.id)}">${esc(x.label)}</option>`).join('')}</select></label><label class="span-2"><span>Notatka</span><textarea name="notes" placeholder="Zachowanie, kierunek ruchu, pogoda, kto potwierdził identyfikację…"></textarea></label><label class="span-2 wildlife-photo-input"><span>Opcjonalna miniatura zdjęcia</span><input name="photo" type="file" accept="image/*"><small>Najlepiej jedno zdjęcie identyfikacyjne. Aplikacja skompresuje je przed zapisem.</small></label><div class="span-2 form-actions"><button class="primary-btn" type="submit">Zapisz obserwację</button><span id="wildlifeFormState" class="muted small"></span></div></form></section>

      <section class="section" id="wildlife-species"><div class="section-head"><div><h2>Widziane / niewidziane</h2><p>Spotkanie zapisane w dzienniku automatycznie oznacza gatunek jako widziany. Można też oznaczyć ręcznie stare obserwacje z pierwszego modułu Amazonii.</p></div><div class="species-tools"><input id="wildlifeSearch" type="search" placeholder="Szukaj gatunku…"><select id="wildlifeGroup"><option value="all">Wszystkie grupy</option>${groupOptions.map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join('')}</select><select id="wildlifeSeenFilter"><option value="all">Wszystkie</option><option value="seen">Tylko widziane</option><option value="unseen">Tylko niewidziane</option></select></div></div><div class="wildlife-species-grid">${species.map(x=>{const seen=seenIds.has(x.id);const l=last[x.id];return `<article class="wildlife-species-card ${seen?'seen':''}" data-wildlife-card data-name="${esc((x.name+' '+x.group).toLowerCase())}" data-group="${esc(x.group)}" data-seen="${seen?'yes':'no'}">${photos[x.id]?`<img src="${esc(photos[x.id])}" alt="Miniatura obserwacji: ${esc(x.name)}">`:(photoThumb('Zwierzęta', x.id, x.name) || `<div class="wildlife-placeholder">${esc(x.group.slice(0,1).toUpperCase())}</div>`)}<div class="wildlife-species-body"><div class="species-top"><span class="species-group">${esc(x.group)}</span><label class="seen-toggle"><input type="checkbox" data-wildlife-seen="${esc(x.id)}" ${seen?'checked':''}><span>${seen?'Widziane':'Niewidziane'}</span></label></div><h3>${esc(x.name)}</h3><div class="wildlife-counts"><span><b>${counts[x.id]||0}</b> spotkań</span><span><b>${individuals[x.id]||0}</b> osobników</span></div>${l?`<p class="muted small">Ostatnio: ${esc(l.date)} ${esc(l.time||'')} · ${esc(l.location||'bez miejsca')}</p>`:`<p class="muted small">Brak zapisanej obserwacji.</p>`}${x.signal?`<p class="wildlife-signal"><strong>Sygnał:</strong> ${esc(x.signal)}</p>`:''}</div></article>`}).join('')}</div></section>

      <section class="section" id="wildlife-log"><div class="section-head"><div><h2>Dziennik spotkań</h2><p>${records.length ? 'Każdy wiersz to osobne spotkanie.' : 'Pierwsza obserwacja pojawi się tutaj po zapisaniu formularza.'}</p></div></div>${records.length?`<div class="wildlife-log">${records.map(r=>`<article>${r.photo?`<img src="${esc(r.photo)}" alt="Miniatura obserwacji">`:'<div class="wildlife-log-noimage">◉</div>'}<div><span>${esc(r.date)} ${esc(r.time||'')} · ${esc(r.location||'miejsce niepodane')}</span><h3>${esc(wildlifeSpeciesName(r.speciesId,saved))}</h3><p>${esc(r.notes||'Bez notatki.')}</p><div class="wildlife-record-meta"><b>${esc(r.count||1)} os.</b><b>${esc(W.confidence.find(x=>x.id===r.confidence)?.label||r.confidence||'')}</b></div></div><button type="button" class="wildlife-delete" data-wildlife-delete="${esc(r.id)}" aria-label="Usuń obserwację">×</button></article>`).join('')}</div>`:`<div class="empty-state">Brak obserwacji. Tracker jest gotowy na pierwszy poranek w Curassow.</div>`}</section>

      <section class="section grid-2"><div class="panel"><h3>Dodaj gatunek spoza listy</h3><form id="wildlifeCustomForm" class="custom-species-form"><label><span>Nazwa</span><input name="name" required placeholder="np. saki mnich"></label><label><span>Grupa</span><input name="group" required placeholder="np. naczelne"></label><button class="soft-btn" type="submit">Dodaj do trackera</button></form>${(saved.customSpecies||[]).length?`<div class="custom-list">${saved.customSpecies.map(x=>`<span>${esc(x.name)} <button type="button" data-custom-delete="${esc(x.id)}">×</button></span>`).join('')}</div>`:''}</div><div class="panel"><h3>Zasady zapisu</h3><div class="simple-list">${W.rules.map((x,i)=>`<div class="simple-item"><span>${String(i+1).padStart(2,'0')}</span><div>${esc(x)}</div></div>`).join('')}</div></div></section>

      <section class="section panel wildlife-data"><div><h3>Backup danych</h3><p class="muted">Eksport zawiera spotkania, własne gatunki i skompresowane miniatury. Plik może być większy, jeśli dodacie dużo zdjęć.</p></div><div class="wildlife-data-actions"><button class="soft-btn" type="button" id="exportWildlife">Eksportuj JSON</button><label class="soft-btn file-button">Importuj JSON<input id="importWildlife" type="file" accept="application/json"></label><button class="soft-btn danger-btn" type="button" id="clearWildlife">Wyczyść tracker</button></div></section>
    </main>`;
  }

  function cuscoStorage() {
    try { return JSON.parse(localStorage.getItem('peru2026_cusco') || '{"visited":{},"checks":{},"notes":{},"altitude":{},"routes":{}}'); }
    catch { return { visited:{}, checks:{}, notes:{}, altitude:{}, routes:{} }; }
  }
  function saveCuscoStorage(value) { localStorage.setItem('peru2026_cusco', JSON.stringify(value)); }

  function cuscoPage() {
    const C = window.PERU_CUSCO;
    if (!C) return `<main class="page"><h1 class="page-title">Cusco</h1><p>Moduł nie został załadowany.</p></main>`;
    const saved = cuscoStorage();
    const visited = Object.values(saved.visited || {}).filter(Boolean).length;
    const mustCount = C.places.filter(x => x.priority === 'must').length;
    return `<main class="page cusco-page">
      <section class="cusco-hero" style="--cusco-hero:url('${esc(C.hero)}')"><div><span class="eyebrow">14–17.09 · aklimatyzacja i stolica Inków</span><h1>Cusco<br>Field Module</h1><p>Rozszerzony plan waszych dni: dwie gotowe trasy, historia czytana w terenie, wysokość, bilety, jedzenie i tracker odwiedzonych miejsc.</p><div class="hero-actions"><button type="button" class="primary-btn" data-cusco-scroll="days">Plan dni</button><button type="button" class="ghost-btn" data-cusco-scroll="routes">Gotowe trasy</button><button type="button" class="ghost-btn" data-cusco-scroll="places">Miejsca</button></div></div></section>

      <section class="metrics compact-metrics"><div class="metric"><span>Dni w Cusco</span><strong>${C.days.length}</strong><small>${esc(C.dates)}</small></div><div class="metric"><span>Wysokość</span><strong>3 400 m</strong><small>tempo zależne od samopoczucia</small></div><div class="metric"><span>Odwiedzone</span><strong>${visited}/${C.places.length}</strong><small>${mustCount} punkty obowiązkowe</small></div><div class="metric"><span>Gotowe trasy</span><strong>${C.routes.length}</strong><small>pełna, terenowa i lekka</small></div></section>

      <section class="section"><div class="section-head"><div><h2>Moja decyzja dla was</h2><p>Najważniejsze wybory, żeby nie planować Cusco od nowa na miejscu.</p></div></div><div class="cusco-verdict-grid">${Object.entries(C.quickVerdict).map(([key,value])=>`<article><span>${esc(({base:'Baza',day15:'15.09',day16:'16.09',ticket:'Bilet',rule:'Zasada'})[key]||key)}</span><p>${esc(value)}</p></article>`).join('')}</div></section>

      <section class="section" id="cusco-days"><div class="section-head"><div><h2>Wasz plan 14–17.09</h2><p>Każdy dzień ma wariant decyzyjny. Nie musicie realizować całego programu, żeby dzień był udany.</p></div></div><div class="cusco-days">${C.days.map((day,di)=>`<article class="cusco-day"><div class="cusco-day-date">${esc(day.date)}</div><div class="cusco-day-body"><div class="cusco-day-top"><div><span>${esc(day.pace)}</span><h3>${esc(day.title)}</h3></div></div><div class="cusco-time-blocks">${day.blocks.map(x=>`<div><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('')}</div><div class="cusco-route"><strong>Trasa:</strong> ${esc(day.route)}</div><div class="cusco-warning"><strong>Decyzja:</strong> ${esc(day.decision)}</div><div class="checklist">${day.checklist.map((item,ii)=>{const id=`${di}_${ii}`;return `<label class="task-check"><input type="checkbox" data-cusco-check="${id}" ${saved.checks?.[id]?'checked':''}><span>${esc(item)}</span></label>`}).join('')}</div><label class="amazon-note"><span>Notatka z dnia</span><textarea data-cusco-note="${esc(day.date)}" placeholder="Samopoczucie, pogoda, decyzje, co warto zapamiętać…">${esc(saved.notes?.[day.date] || '')}</textarea></label></div></article>`).join('')}</div></section>

      <section class="section" id="cusco-routes"><div class="section-head"><div><h2>Trzy gotowe trasy</h2><p>Wybierzcie jedną zgodnie z energią. Każda ma sens jako kompletna całość.</p></div></div><div class="cusco-route-grid">${C.routes.map(x=>`<article class="cusco-route-card ${saved.routes?.[x.id]?'selected':''}"><div class="cusco-place-top"><div><span>${esc(x.ideal)} · ${esc(x.duration)}</span><h3>${esc(x.name)}</h3></div><label class="seen-toggle"><input type="checkbox" data-cusco-route="${esc(x.id)}" ${saved.routes?.[x.id]?'checked':''}><span>${saved.routes?.[x.id]?'Wybrana':'Wybierz trasę'}</span></label></div><div class="route-sequence">${x.sequence.map((step,i)=>`<span><b>${i+1}</b>${esc(step)}</span>`).join('')}</div><p>${esc(x.point)}</p><a class="field-link" href="${esc(x.map)}" target="_blank" rel="noreferrer">Otwórz trasę w mapie ↗</a></article>`).join('')}</div></section>

      <section class="section" id="cusco-places"><div class="section-head"><div><h2>Miejsca, które mają sens dla was</h2><p>Priorytety są dopasowane do dwóch spokojnych dni, a nie do maksymalnego zaliczania atrakcji.</p></div></div><div class="cusco-place-grid">${C.places.map(x=>`<article class="cusco-place priority-${esc(x.priority)} ${saved.visited?.[x.id]?'visited':''}">${photoFigure('Cusco', x.id, true)}<div class="cusco-place-top"><div><span>${esc(x.zone)} · ${esc(x.time)} · wysiłek: ${esc(x.effort)}</span><h3>${esc(x.name)}</h3><div class="place-priority">${esc(({must:'must see',recommended:'warto',optional:'opcjonalnie',conditional:'tylko przy dobrej formie'})[x.priority]||x.priority)}</div></div><label class="seen-toggle"><input type="checkbox" data-cusco-visited="${esc(x.id)}" ${saved.visited?.[x.id]?'checked':''}><span>${saved.visited?.[x.id]?'Odwiedzone':'Oznacz jako odwiedzone'}</span></label></div><p>${esc(x.why)}</p><dl><div><dt>Kontekst</dt><dd>${esc(x.history)}</dd></div><div><dt>Zwróć uwagę</dt><dd>${esc(x.notice)}</dd></div><div><dt>Zdjęcie</dt><dd>${esc(x.photo)}</dd></div></dl><a class="field-link" href="${esc(x.map)}" target="_blank" rel="noreferrer">Mapa ↗</a></article>`).join('')}</div></section>

      <section class="section grid-2"><div class="panel"><h3>Boleto Turístico bez przepłacania</h3><div class="simple-list">${C.ticketNotes.map((x,i)=>`<div class="simple-item"><span>${String(i+1).padStart(2,'0')}</span><div>${esc(x)}</div></div>`).join('')}</div></div><div class="panel"><h3>Dziennik wysokości</h3><p class="muted">Zapisz samopoczucie rano i wieczorem. To ma prowadzić do decyzji o tempie, nie do bicia rekordu atrakcji.</p><div class="altitude-log">${['14.09','15.09','16.09'].map(date=>`<label><span>${date}</span><input data-cusco-altitude="${date}" value="${esc(saved.altitude?.[date] || '')}" placeholder="np. rano 7/10, lekki ból głowy"></label>`).join('')}</div><button class="soft-btn" type="button" id="exportCusco">Eksportuj dane Cusco</button></div></section>

      <section class="section"><div class="section-head"><div><h2>Jak reagować na wysokość</h2><p>Prosty system decyzji — nie diagnoza medyczna.</p></div></div><div class="altitude-cards">${C.altitudeGuide.map(x=>`<article class="altitude-${esc(x.level.toLowerCase())}"><h3>${esc(x.level)}</h3><p>${esc(x.symptoms)}</p><strong>${esc(x.action)}</strong></article>`).join('')}</div></section>

      <section class="section grid-2"><div class="panel"><h3>Jedzenie bez przeciążenia</h3><div class="simple-list">${C.food.map(x=>`<div class="simple-item"><span>◉</span><div><strong>${esc(x.name)} · ${esc(x.budget)}</strong><div class="muted small">${esc(x.items)}</div><div class="small">${esc(x.note)}</div></div></div>`).join('')}</div></div><div class="panel"><h3>Jak czytać Cusco</h3><div class="simple-list">${C.fieldNotes.map((x,i)=>`<div class="simple-item"><span>${String(i+1).padStart(2,'0')}</span><div>${esc(x)}</div></div>`).join('')}</div></div></section>

      <section class="section"><div class="panel"><h3>Źródła i aktualność</h3><p class="muted">Bilety, godziny i zasady wejścia mogą zmienić się do września 2026. Historia i układ trasy bazują na źródłach instytucjonalnych; przed wejściem sprawdźcie aktualne informacje.</p><div class="field-source-list">${C.sources.map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noreferrer">${esc(x.label)} ↗</a>`).join('')}</div></div></section>
    </main>`;
  }

  function ollantaStorage() {
    try { return JSON.parse(localStorage.getItem('peru2026_ollanta') || '{"visited":{},"checks":{},"notes":{},"shortlist":{}}'); }
    catch { return { visited:{}, checks:{}, notes:{}, shortlist:{} }; }
  }
  function saveOllantaStorage(value) { localStorage.setItem('peru2026_ollanta', JSON.stringify(value)); }

  function ollantaSaveButton(id, saved) {
    const active = !!saved.shortlist?.[id];
    return `<label class="seen-toggle"><input type="checkbox" data-ollanta-shortlist="${esc(id)}" ${active?'checked':''}><span>${active?'W planie':'Dodaj do planu'}</span></label>`;
  }

  function ollantaPage() {
    const O = window.PERU_OLLANTA;
    if (!O) return `<main class="page"><h1 class="page-title">Ollantaytambo</h1><p>Moduł nie został załadowany.</p></main>`;
    const saved = ollantaStorage();
    const visited = Object.values(saved.visited || {}).filter(Boolean).length;
    return `<main class="page ollanta-page">
      <section class="ollanta-hero" style="--ollanta-hero:url('${esc(O.hero)}')"><div><span class="eyebrow">17–20.09 · żywe miasto Inków i baza przed Machu</span><h1>Ollantaytambo<br>Field Module</h1><p>Pełny, ale nieprzeładowany plan: ruiny na otwarcie, stare miasto, Pinkuylluna tylko opcjonalnie, jedzenie i twarda logistyka pociągu.</p><div class="hero-actions"><button type="button" class="primary-btn" data-ollanta-scroll="days">Plan dni</button><button type="button" class="ghost-btn" data-ollanta-scroll="places">Co zobaczyć</button><button type="button" class="ghost-btn" data-ollanta-scroll="train">Pociąg</button></div></div></section>

      <section class="metrics compact-metrics"><div class="metric"><span>Pobyt</span><strong>3 noce</strong><small>${esc(O.dates)}</small></div><div class="metric"><span>Wysokość</span><strong>2 860 m</strong><small>niżej niż Cusco</small></div><div class="metric"><span>Odwiedzone</span><strong>${visited}/${O.places.length}</strong><small>tracker lokalny</small></div><div class="metric"><span>Pociąg</span><strong>12:55</strong><small>na stacji około 12:25</small></div></section>

      <section class="section"><div class="section-head"><div><h2>Najważniejsze decyzje</h2><p>To wystarczy, żeby Ollantaytambo działało jako odpoczynek i mocny historyczny dzień.</p></div></div><div class="ollanta-verdict-grid">${Object.entries(O.quickVerdict).map(([key,value])=>`<article><span>${esc(({stay:'Hotel',ruins:'Ruiny',town:'Miasto',pinkuylluna:'Pinkuylluna',train:'Pociąg'})[key]||key)}</span><p>${esc(value)}</p></article>`).join('')}</div></section>

      <section class="section" id="ollanta-days"><div class="section-head"><div><h2>Wasz plan 17–20.09</h2><p>18.09 jest jedynym pełnym dniem. 19.09 ma pozostać spokojny przed pociągiem i zakupem Ruty 2 w Aguas.</p></div></div><div class="ollanta-days">${O.days.map((day,di)=>`<article class="ollanta-day"><div class="ollanta-day-date">${esc(day.date)}</div><div class="ollanta-day-body"><span>${esc(day.pace)}</span><h3>${esc(day.title)}</h3><div class="ollanta-time-blocks">${day.blocks.map(x=>`<div><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('')}</div><div class="ollanta-warning"><strong>Decyzja:</strong> ${esc(day.decision)}</div><div class="checklist">${day.checklist.map((item,ii)=>{const id=`${di}_${ii}`;return `<label class="task-check"><input type="checkbox" data-ollanta-check="${id}" ${saved.checks?.[id]?'checked':''}><span>${esc(item)}</span></label>`}).join('')}</div><label class="amazon-note"><span>Notatka</span><textarea data-ollanta-note="${esc(day.date)}" placeholder="Hotel, pogoda, decyzje, bagaż, godzina wyjścia…">${esc(saved.notes?.[day.date] || '')}</textarea></label></div></article>`).join('')}</div></section>

      <section class="section"><div class="ollanta-ticket"><div><span>${esc(O.ticket.product)}</span><h2>${esc(O.ticket.title)}</h2><p>${esc(O.ticket.current)}</p></div><div class="ticket-includes">${O.ticket.includes.map(x=>`<b>${esc(x)}</b>`).join('')}</div><p><strong>Strategia:</strong> ${esc(O.ticket.strategy)}</p><p class="muted">${esc(O.ticket.warning)}</p></div></section>

      <section class="section" id="ollanta-places"><div class="section-head"><div><h2>Co zobaczyć</h2><p>Park archeologiczny i stare miasto są obowiązkowe. Pinkuylluna i Most Inków są dodatkami, nie testem ambicji.</p></div></div><div class="ollanta-place-grid">${O.places.map(x=>`<article class="ollanta-place priority-${esc(x.priority)} ${saved.visited?.[x.id]?'visited':''}">${photoFigure('Ollantaytambo', x.id, true)}<div class="cusco-place-top"><div><span>${esc(x.zone)} · ${esc(x.time)} · wysiłek: ${esc(x.effort)}</span><h3>${esc(x.name)}</h3><div class="place-priority">${esc(({must:'must see',recommended:'warto',optional:'opcjonalnie'})[x.priority]||x.priority)}</div></div><label class="seen-toggle"><input type="checkbox" data-ollanta-visited="${esc(x.id)}" ${saved.visited?.[x.id]?'checked':''}><span>${saved.visited?.[x.id]?'Odwiedzone':'Odwiedź'}</span></label></div><p>${esc(x.why)}</p><dl><div><dt>Prosta trasa</dt><dd>${esc(x.route)}</dd></div><div><dt>Zwróć uwagę</dt><dd>${esc(x.notice)}</dd></div><div><dt>Zdjęcie</dt><dd>${esc(x.photo)}</dd></div></dl><a class="field-link" href="${esc(x.map)}" target="_blank" rel="noreferrer">Mapa ↗</a></article>`).join('')}</div></section>

      <section class="section"><div class="section-head"><div><h2>Gdzie zjeść</h2><p>Jedno lepsze miejsce, jedna praktyczna opcja przy stacji i normalny tani obiad — więcej nie potrzebujecie.</p></div></div><div class="ollanta-food-grid">${O.food.map(x=>`<article class="ollanta-food ${saved.shortlist?.[x.id]?'selected':''}"><div class="cusco-place-top"><div><span>${esc(x.type)} · ${esc(x.budget)}</span><h3>${esc(x.name)}</h3></div>${ollantaSaveButton(x.id,saved)}</div><p><strong>Po co:</strong> ${esc(x.bestFor)}</p><p><strong>Zamówcie:</strong> ${esc(x.order)}</p><p class="muted">${esc(x.note)}</p><div class="lima-links"><a href="${esc(x.map)}" target="_blank" rel="noreferrer">Mapa ↗</a><a href="${esc(x.source)}" target="_blank" rel="noreferrer">Źródło ↗</a></div></article>`).join('')}</div></section>

      <section class="section grid-2" id="ollanta-train"><div class="panel"><h3>Hotel — pięć warunków</h3><div class="simple-list">${O.hotelCriteria.map((x,i)=>`<div class="simple-item"><span>${String(i+1).padStart(2,'0')}</span><div>${esc(x)}</div></div>`).join('')}</div></div><div class="panel"><h3>Reguły pociągu i bagażu</h3><div class="simple-list">${O.trainRules.map((x,i)=>`<div class="simple-item"><span>${String(i+1).padStart(2,'0')}</span><div>${esc(x)}</div></div>`).join('')}</div><button class="soft-btn" type="button" id="exportOllanta">Eksportuj dane Ollantaytambo</button></div></section>

      <section class="section"><div class="panel"><h3>Źródła i aktualność</h3><p class="muted">Oficjalna DDC Cusco podaje obecnie dla parku godziny 07:00–16:30, ale sprawdźcie je ponownie przed wyjazdem. Ceny, dostęp do Pinkuylluny i zasady bagażu kolejowego mogą się zmienić.</p><div class="field-source-list">${O.sources.map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noreferrer">${esc(x.label)} ↗</a>`).join('')}</div></div></section>
    </main>`;
  }

  function limaStorage() {
    try { return JSON.parse(localStorage.getItem('peru2026_lima') || '{"visited":{},"shortlist":{},"checks":{},"notes":{}}'); }
    catch { return { visited:{}, shortlist:{}, checks:{}, notes:{} }; }
  }
  function saveLimaStorage(value) { localStorage.setItem('peru2026_lima', JSON.stringify(value)); }

  function limaShortlistButton(id, saved) {
    const active = !!saved.shortlist?.[id];
    return `<label class="lima-save"><input type="checkbox" data-lima-shortlist="${esc(id)}" ${active?'checked':''}><span>${active?'W planie':'Dodaj do planu'}</span></label>`;
  }

  function limaPage() {
    const L = window.PERU_LIMA;
    if (!L) return `<main class="page"><h1 class="page-title">Lima</h1><p>Moduł nie został załadowany.</p></main>`;
    const saved = limaStorage();
    const visited = Object.values(saved.visited || {}).filter(Boolean).length;
    const shortlisted = Object.values(saved.shortlist || {}).filter(Boolean).length;
    return `<main class="page lima-page">
      <section class="lima-hero" style="--lima-hero:url('${esc(L.hero)}')"><div><span class="eyebrow">04–07.09 + 21–26.09 · start i finał wyprawy</span><h1>Lima<br>City Module</h1><p>Nie lista stu lokali. Gotowy plan odpoczynku, spacerów, niedrogiego jedzenia, rooftopów, pubów, klubu i sensownego basenu pod wasze konkretne dni.</p><div class="hero-actions"><button type="button" class="primary-btn" data-lima-scroll="days">Plan dni</button><button type="button" class="ghost-btn" data-lima-scroll="night">Jedzenie i noc</button></div></div></section>

      <section class="metrics compact-metrics"><div class="metric"><span>Dni w Limie</span><strong>${L.days.length}</strong><small>dwa osobne pobyty</small></div><div class="metric"><span>Wybrane lokale</span><strong>${shortlisted}</strong><small>własna krótka lista</small></div><div class="metric"><span>Odwiedzone miejsca</span><strong>${visited}/${L.sights.length}</strong><small>tracker lokalny</small></div><div class="metric"><span>Najlepsza baza</span><strong>Miraflores</strong><small>Barranco na popołudnie i noc</small></div></section>

      <section class="section"><div class="section-head"><div><h2>Moja rekomendacja dla was</h2><p>Pięć decyzji bez dalszego googlowania.</p></div></div><div class="lima-verdict-grid">
        <article><span>Baza</span><p>${esc(L.quickVerdict.stay)}</p></article>
        <article><span>Rooftop</span><p>${esc(L.quickVerdict.rooftop)}</p></article>
        <article><span>Klub</span><p>${esc(L.quickVerdict.club)}</p></article>
        <article><span>Jedzenie</span><p>${esc(L.quickVerdict.food)}</p></article>
        <article><span>Basen</span><p>${esc(L.quickVerdict.pool)}</p></article>
      </div></section>

      <section class="section" id="lima-days"><div class="section-head"><div><h2>Plan pod wasze daty</h2><p>Początek ma być regeneracyjny. Dopiero po powrocie z Andów Lima dostaje pełniejsze dni.</p></div></div><div class="lima-days">${L.days.map((day,di)=>`<article class="lima-day"><div class="lima-day-head"><div><span>${esc(day.phase)} · energia: ${esc(day.energy)}</span><h3>${esc(day.date)} — ${esc(day.title)}</h3></div></div><ol>${day.plan.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><div class="lima-day-meta"><div><b>Jedzenie</b>${esc(day.food)}</div><div><b>Wieczór</b>${esc(day.evening)}</div></div><div class="lima-warning">${esc(day.warning)}</div><div class="checklist">${day.plan.map((item,ii)=>{const id=`${di}_${ii}`;return `<label class="task-check"><input type="checkbox" data-lima-check="${id}" ${saved.checks?.[id]?'checked':''}><span>${esc(item)}</span></label>`}).join('')}</div><label class="amazon-note"><span>Notatka z dnia</span><textarea data-lima-note="${esc(day.date)}" placeholder="Co wybraliśmy, rezerwacja, godzina, samopoczucie…">${esc(saved.notes?.[day.date] || '')}</textarea></label></article>`).join('')}</div></section>

      <section class="section"><div class="section-head"><div><h2>Zwiedzanie bez przeładowania</h2><p>Te miejsca wystarczą. Centrum historyczne jest opcją, a nie obowiązkiem.</p></div></div><div class="lima-place-grid">${L.sights.map(x=>`<article class="lima-place ${saved.visited?.[x.id]?'visited':''}">${photoFigure('Lima', x.id, true)}<div class="lima-card-top"><div><span>${esc(x.zone)} · ${esc(x.time)} · ${esc(x.cost)}</span><h3>${esc(x.name)}</h3></div><label class="lima-save"><input type="checkbox" data-lima-visited="${esc(x.id)}" ${saved.visited?.[x.id]?'checked':''}><span>${saved.visited?.[x.id]?'Odwiedzone':'Odwiedź'}</span></label></div><p>${esc(x.why)}</p><dl><div><dt>Prosta trasa</dt><dd>${esc(x.route)}</dd></div><div><dt>Zwróć uwagę</dt><dd>${esc(x.notice)}</dd></div><div><dt>Zdjęcie</dt><dd>${esc(x.photo)}</dd></div></dl><a class="lima-map" href="${esc(x.map)}" target="_blank" rel="noreferrer">Otwórz mapę ↗</a></article>`).join('')}</div></section>

      <section class="section" id="lima-night"><div class="section-head"><div><h2>Gdzie zjeść bez rozbijania budżetu</h2><p>Budżety są orientacyjne na 2026. W ruchliwych cevicheríach warto dzielić duże porcje.</p></div></div><div class="lima-venue-grid">${L.food.map(x=>`<article class="lima-venue ${saved.shortlist?.[x.id]?'saved':''}"><div class="lima-card-top"><div><span>${esc(x.zone)} · ${esc(x.type)}</span><h3>${esc(x.name)}</h3></div>${limaShortlistButton(x.id,saved)}</div><div class="lima-price">${esc(x.budget)}</div><p><strong>Po co:</strong> ${esc(x.bestFor)}</p><p><strong>Zamówcie:</strong> ${esc(x.order)}</p><p class="muted">${esc(x.note)}</p><div class="lima-links"><a href="${esc(x.map)}" target="_blank" rel="noreferrer">Mapa ↗</a><a href="${esc(x.source)}" target="_blank" rel="noreferrer">Źródło ↗</a></div></article>`).join('')}</div></section>

      <section class="section"><div class="section-head"><div><h2>Rooftop, pub czy klub?</h2><p>Najpierw wybierzcie charakter wieczoru. Nie próbujcie zaliczyć trzech dzielnic podczas jednej nocy.</p></div></div><div class="lima-night-grid">${L.nightlife.map(x=>`<article class="lima-night-card ${saved.shortlist?.[x.id]?'saved':''}"><div class="lima-card-top"><div><span>${esc(x.zone)}</span><h3>${esc(x.name)}</h3></div>${limaShortlistButton(x.id,saved)}</div><div class="lima-mode">${esc(x.mode)}</div><p>${esc(x.verdict)}</p><dl><div><dt>Kiedy</dt><dd>${esc(x.bestTime)}</dd></div><div><dt>Budżet</dt><dd>${esc(x.budget)}</dd></div><div><dt>Sprawdź</dt><dd>${esc(x.warning)}</dd></div></dl><div class="lima-links"><a href="${esc(x.map)}" target="_blank" rel="noreferrer">Mapa ↗</a><a href="${esc(x.source)}" target="_blank" rel="noreferrer">Oficjalna strona ↗</a></div></article>`).join('')}</div></section>

      <section class="section"><div class="section-head"><div><h2>Basen — realne opcje</h2><p>Najważniejszy wniosek: nie kupować drogiego day passa, zanim nie sprawdzicie hotelu z basenem w cenie noclegu.</p></div></div><div class="lima-pool-grid">${L.pools.map(x=>`<article class="lima-pool ${saved.shortlist?.[x.id]?'saved':''}"><div class="lima-card-top"><div><span>${esc(x.price)}</span><h3>${esc(x.name)}</h3></div>${limaShortlistButton(x.id,saved)}</div><p><strong>${esc(x.verdict)}</strong></p><p class="muted">${esc(x.details)}</p><a class="lima-map" href="${esc(x.source)}" target="_blank" rel="noreferrer">Sprawdź aktualnie ↗</a></article>`).join('')}</div></section>

      <section class="section grid-2"><div class="panel"><h3>Kryteria końcowego hotelu</h3><div class="simple-list">${L.bookingCriteria.map((x,i)=>`<div class="simple-item"><span>${String(i+1).padStart(2,'0')}</span><div>${esc(x)}</div></div>`).join('')}</div></div><div class="panel"><h3>Bezpieczeństwo i higiena nocy</h3><div class="simple-list">${L.safety.map((x,i)=>`<div class="simple-item"><span>${String(i+1).padStart(2,'0')}</span><div>${esc(x)}</div></div>`).join('')}</div><button class="soft-btn" type="button" id="exportLima">Eksportuj wybory Limy</button></div></section>

      <section class="section"><div class="panel"><h3>Źródła i aktualność</h3><p class="muted">Lokale, godziny i wydarzenia mogą się zmienić do września 2026. Moduł bazuje głównie na oficjalnych stronach lokali. Przed konkretnym wyjściem kliknijcie źródło i sprawdźcie wydarzenie, rezerwację oraz dostęp do basenu.</p><div class="lima-source-list">${L.sources.map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noreferrer">${esc(x.label)} ↗</a>`).join('')}</div></div></section>
    </main>`;
  }


  function mediaCoverage() {
    const groups = [
      ['Zwierzęta', (window.PERU_AMAZON?.species || []).map(x => x.id)],
      ['Rośliny', ['ceiba','rubber-tree','cacao','aguaje','victoria-amazonica','heliconia']],
      ['Amazonia i Iquitos', ['curassow','canoe','river','wildlife','forest','lodge','habitat','bungalow','iquitos','port','iquitos-sunset','iquitos-centre']],
      ['Cusco', (window.PERU_CUSCO?.places || []).map(x => x.id)],
      ['Sacred Valley', ['pisac','moray','maras','chinchero']],
      ['Lima', (window.PERU_LIMA?.sights || []).map(x => x.id)],
      ['Ollantaytambo', (window.PERU_OLLANTA?.places || []).map(x => x.id)],
      ['Machu 3-A', (window.PERU_MACHU?.route3 || []).map(x => x.id)],
      ['Machu 2-A', window.PERU_MACHU?.route2?.routes?.find(x => x.id === '2a')?.steps?.map(x => x.id) || []],
      ['Machu 2-B', window.PERU_MACHU?.route2?.routes?.find(x => x.id === '2b')?.steps?.map(x => x.id) || []]
    ];
    return groups.map(([name, ids]) => {
      const category = name.startsWith('Machu') ? 'Machu Picchu' : name;
      const covered = ids.filter(id => photoFor(category, id));
      return { name, total: ids.length, covered: covered.length, missing: ids.filter(id => !photoFor(category, id)) };
    });
  }

  function photosPage() {
    const categories = ['Amazonia i Iquitos', 'Zwierzęta', 'Rośliny', 'Machu Picchu', 'Cusco', 'Ollantaytambo', 'Sacred Valley', 'Lima'];
    const totalAnimals = PH.items.filter(x => x.category === 'Zwierzęta').length;
    const coverage = mediaCoverage();
    const covered = coverage.reduce((sum, x) => sum + x.covered, 0);
    const expected = coverage.reduce((sum, x) => sum + x.total, 0);
    return `<main class="page photos-page">
      <section class="photos-hero"><div><span class="eyebrow">v15 · fotografie dokumentalne · bez generatorów AI</span><h1>Zdjęcia<br>terenowe</h1><p>Niewielki, celowy zestaw prawdziwych fotografii. Każdy z 20 gatunków trackera i każdy strukturalnie opisany punkt Cusco, Limy, Ollantaytambo oraz tras Machu Picchu ma przypisane zdjęcie.</p><div class="hero-actions"><button type="button" class="primary-btn" id="downloadPhotoPack">Pobierz zdjęcia offline</button><button type="button" class="ghost-btn" id="clearPhotoPack">Usuń pakiet offline</button></div><div id="photoPackStatus" class="photo-pack-status">${photoPackState().savedAt ? `Ostatni zapis: ${esc(new Date(photoPackState().savedAt).toLocaleString('pl-PL'))} · ${esc(photoPackState().ok || 0)}/${PH.items.length}` : 'Najlepiej pobrać przy Wi‑Fi przed wyjazdem.'}</div></div></section>
      <section class="metrics compact-metrics"><div class="metric"><span>Fotografie</span><strong>${PH.items.length}</strong><small>celowo wybrane, bez zapychania aplikacji</small></div><div class="metric"><span>Zwierzęta</span><strong>${totalAnimals}/20</strong><small>każdy gatunek z trackera</small></div><div class="metric"><span>Pokrycie modułów</span><strong>${covered}/${expected}</strong><small>${expected ? Math.round(covered / expected * 100) : 0}% opisanych punktów</small></div><div class="metric"><span>Grafiki AI</span><strong>0</strong><small>twarda zasada projektu</small></div></section>
      <section class="panel photo-policy"><h3>Zasada zdjęć</h3><p>${esc(PH.policy)}</p><p class="muted small">${esc(PH.offlineNote)}</p></section>
      <section class="section media-audit"><div class="section-head"><div><h2>Audyt pokrycia</h2><p>To jest automatyczne sprawdzenie bieżących danych aplikacji, nie ręczna deklaracja.</p></div></div><div class="media-audit-grid">${coverage.map(x => `<article class="${x.covered === x.total ? 'complete' : 'incomplete'}"><span>${esc(x.name)}</span><strong>${x.covered}/${x.total}</strong><small>${x.missing.length ? `Brak: ${esc(x.missing.join(', '))}` : 'Komplet zdjęć'}</small></article>`).join('')}</div></section>
      ${categories.map(category => { const items = PH.items.filter(x => x.category === category); if (!items.length) return ''; return `<section class="section"><div class="section-head"><div><h2>${esc(category)}</h2><p>${category === 'Zwierzęta' ? 'Każdy profil z Amazonia Field Module i Wildlife Trackera ma fotografię identyfikacyjną.' : category === 'Rośliny' ? 'Mały zestaw najważniejszych roślin, nie pełny atlas botaniczny.' : 'Punkty, które realnie znajdują się na waszej trasie.'}</p></div><span class="photo-count">${items.length}</span></div><div class="photo-gallery">${items.map(item => `<figure class="photo-card"><a href="${esc(item.source)}" target="_blank" rel="noreferrer"><img src="${esc(item.image)}" alt="${esc(item.title)} — fotografia dokumentalna" loading="lazy" decoding="async" onerror="this.closest('figure').classList.add('photo-failed')"></a><figcaption><h3>${esc(item.title)}</h3><p>${esc(item.caption)}</p><a href="${esc(item.source)}" target="_blank" rel="noreferrer">Autor, oryginał i licencja ↗</a></figcaption></figure>`).join('')}</div></section>`; }).join('')}
    </main>`;
  }

  function systemPage() {
    const size = storageSize();
    const media = mediaIntegrity();
    const pack = photoPackState();
    const coverage = mediaCoverage();
    const covered = coverage.reduce((sum, item) => sum + item.covered, 0);
    const expected = coverage.reduce((sum, item) => sum + item.total, 0);
    return `<main class="page system-page">
      <section class="system-hero"><div><span class="eyebrow">${APP_VERSION} · kontrola przed podróżą</span><h1>Offline i kopia danych</h1><p>Jedno miejsce do aktualizacji aplikacji, pobrania zdjęć, wykonania pełnego backupu i sprawdzenia stanu instalacji.</p></div></section>
      <section class="metrics compact-metrics">
        <div class="metric"><span>Połączenie</span><strong id="systemOnline">${navigator.onLine ? 'Online' : 'Offline'}</strong><small>aktualizowane automatycznie</small></div>
        <div class="metric"><span>Dane lokalne</span><strong>${esc(size.label)}</strong><small>${size.keys} zestawów zapisu</small></div>
        <div class="metric"><span>Zdjęcia</span><strong id="cachedPhotoCount">…/${PH.items.length}</strong><small>pamięć offline urządzenia</small></div>
        <div class="metric"><span>Pokrycie mediów</span><strong>${covered}/${expected}</strong><small>${media.ok ? 'katalog spójny' : `${media.issues.length} problemów`}</small></div>
      </section>
      <section class="section system-grid">
        <article class="system-card"><span class="system-card-icon">↻</span><h2>Aktualizacja i instalacja</h2><p>Sprawdź nową wersję service workera. Na iPhonie instalacja odbywa się przez Udostępnij → Dodaj do ekranu początkowego.</p><div class="system-actions"><button class="primary-btn" id="checkUpdate" type="button">Sprawdź aktualizację</button><button class="soft-btn" id="installApp" type="button">Instrukcja instalacji</button></div><div class="system-state" id="swState">Sprawdzanie service workera…</div></article>
        <article class="system-card"><span class="system-card-icon">▣</span><h2>Pakiet zdjęć offline</h2><p>Fotografie pozostają zewnętrzne, ale mogą być zapisane w pamięci Cache Storage telefonu. Pobieraj przy stabilnym Wi‑Fi.</p><div class="system-actions"><button class="primary-btn" id="systemDownloadPhotos" type="button">Pobierz / uzupełnij</button><button class="soft-btn" id="systemClearPhotos" type="button">Usuń pakiet</button></div><div class="system-state" id="systemPhotoState">${pack.savedAt ? `Ostatni zapis: ${esc(new Date(pack.savedAt).toLocaleString('pl-PL'))}` : 'Pakiet nie został jeszcze zapisany.'}</div></article>
        <article class="system-card"><span class="system-card-icon">⇩</span><h2>Pełna kopia danych</h2><p>Eksport obejmuje wszystkie checklisty, notatki, Journal, Wildlife Tracker, Machu, Limę, Cusco i pozostałe moduły zapisane lokalnie.</p><div class="system-actions"><button class="primary-btn" id="exportFullBackup" type="button">Eksportuj pełny backup</button><label class="soft-btn file-button">Importuj backup<input id="importFullBackup" type="file" accept="application/json"></label></div><div class="system-state">Przed aktualizacją i przed wyjazdem zachowaj plik w iCloud Drive.</div></article>
        <article class="system-card danger-card"><span class="system-card-icon">!</span><h2>Reset danych aplikacji</h2><p>Usuwa wyłącznie zapisy z prefiksem Peru 2026 na tym urządzeniu. Nie usuwa kodu aplikacji ani plików na GitHubie.</p><button class="danger-btn" id="resetAppData" type="button">Usuń wszystkie dane lokalne</button></article>
      </section>
      <section class="section grid-2">
        <div class="panel"><h3>Diagnostyka wydania</h3><div class="diagnostic-list">
          <div><span>Trasy aplikacji</span><strong>27 sprawdzonych</strong></div>
          <div><span>Katalog zdjęć</span><strong>${media.ok ? 'Spójny' : 'Wymaga uwagi'}</strong></div>
          <div><span>Źródła mediów</span><strong>Commons / Curassow</strong></div>
          <div><span>Grafiki wygenerowane przez AI</span><strong>Nie dodano</strong></div>
          <div><span>Publiczne kody i telefony</span><strong>Brak</strong></div>
        </div></div>
        <div class="panel"><h3>Ograniczenie audytu</h3><p class="muted">Aplikacja weryfikuje strukturę katalogu, domeny źródłowe, oznaczenie materiału jako fotografii i kompletność przypisań. Ostateczna informacja o autorze i licencji znajduje się na podlinkowanej stronie pliku.</p>${media.issues.length ? `<div class="diagnostic-errors">${media.issues.map(item => `<div>${esc(item)}</div>`).join('')}</div>` : '<div class="callout"><strong>Wynik</strong>Nie wykryto problemów strukturalnych w katalogu mediów.</div>'}</div>
      </section>
    </main>`;
  }

  function content() {
    switch (route) {
      case 'plan': return plan();
      case 'bookings': return bookings();
      case 'tasks': return tasks();
      case 'machu': return machu();
      case 'payments': return payments();
      case 'journal': return selectedDay ? journalDay(selectedDay) : journalLanding();
      case 'pack': return packPage();
      case 'emergency': return emergencyPage();
      case 'amazon': return amazonPage();
      case 'wildlife': return wildlifePage();
      case 'photos': return photosPage();
      case 'cusco': return cuscoPage();
      case 'ollanta': return ollantaPage();
      case 'lima': return limaPage();
      case 'guide': return chapterId ? chapterPage() : guideLanding();
      case 'settings': return systemPage();
      default: return dashboard();
    }
  }

  function navigate(target, chapter = null) {
    filter = 'all';
    location.hash = chapter ? `#/${target}/${chapter}` : `#/${target}`;
  }

  async function migrateLegacyPhotoCache() {
    if (!('caches' in window)) return;
    const legacy = 'peru-2026-photo-pack-v14';
    const keys = await caches.keys();
    if (!keys.includes(legacy)) return;
    const oldCache = await caches.open(legacy); const newCache = await caches.open(PHOTO_CACHE);
    const requests = await oldCache.keys();
    for (const request of requests) { const response = await oldCache.match(request); if (response) await newCache.put(request, response); }
    await caches.delete(legacy);
    const legacyState = safeJSON(localStorage.getItem('peru2026_photo_pack_v14') || '{}', {});
    if (legacyState.savedAt && !localStorage.getItem(PHOTO_STATE_KEY)) localStorage.setItem(PHOTO_STATE_KEY, JSON.stringify(legacyState));
    localStorage.removeItem('peru2026_photo_pack_v14');
  }

  async function cachedPhotoCount() {
    if (!('caches' in window)) return 0;
    await migrateLegacyPhotoCache();
    const cache = await caches.open(PHOTO_CACHE);
    let count = 0;
    for (const item of PH.items) if (await cache.match(item.image)) count += 1;
    return count;
  }

  async function downloadPhotoPack(statusNode, button) {
    if (!('caches' in window)) { if (statusNode) statusNode.textContent = 'Ta przeglądarka nie udostępnia Cache Storage.'; return; }
    await migrateLegacyPhotoCache();
    if (button) button.disabled = true;
    const cache = await caches.open(PHOTO_CACHE); let ok = 0; let failed = 0; let processed = 0;
    const queue = [...PH.items];
    const worker = async () => {
      while (queue.length) {
        const item = queue.shift(); processed += 1;
        if (statusNode) statusNode.textContent = `Pobieranie ${processed}/${PH.items.length}: ${item.title}`;
        try {
          const existing = await cache.match(item.image);
          if (!existing) {
            const request = new Request(item.image, { mode: 'no-cors', cache: 'reload' });
            const response = await fetch(request);
            await cache.put(request, response.clone());
          }
          ok += 1;
        } catch { failed += 1; }
      }
    };
    await Promise.all(Array.from({ length: Math.min(4, PH.items.length) }, worker));
    const state = { savedAt: new Date().toISOString(), ok, failed, total: PH.items.length };
    localStorage.setItem(PHOTO_STATE_KEY, JSON.stringify(state));
    if (statusNode) statusNode.textContent = failed ? `Zapisano ${ok}/${PH.items.length}. ${failed} zdjęć wymaga ponownej próby online.` : `Gotowe: ${ok}/${PH.items.length} zdjęć zapisanych offline.`;
    if (button) button.disabled = false;
    showToast(failed ? `Zdjęcia: ${ok}/${PH.items.length}` : 'Pakiet zdjęć gotowy', failed ? 'warn' : 'ok');
    const counter = $('#cachedPhotoCount'); if (counter) counter.textContent = `${await cachedPhotoCount()}/${PH.items.length}`;
  }

  async function clearPhotoPack(statusNode) {
    if ('caches' in window) await caches.delete(PHOTO_CACHE);
    localStorage.removeItem(PHOTO_STATE_KEY); localStorage.removeItem('peru2026_photo_pack_v14');
    if (statusNode) statusNode.textContent = 'Pakiet zdjęć offline został usunięty.';
    const counter = $('#cachedPhotoCount'); if (counter) counter.textContent = `0/${PH.items.length}`;
    showToast('Usunięto pakiet zdjęć', 'warn');
  }

  function updateConnectionIndicator() {
    const online = navigator.onLine !== false;
    const badge = $('#connectionBadge');
    if (badge) { badge.textContent = online ? '● Online' : '● Offline'; badge.className = `connection-badge ${online ? 'online' : 'offline'}`; }
    const system = $('#systemOnline'); if (system) system.textContent = online ? 'Online' : 'Offline';
  }

  async function refreshSystemStatus() {
    updateConnectionIndicator();
    const counter = $('#cachedPhotoCount'); if (counter) counter.textContent = `${await cachedPhotoCount()}/${PH.items.length}`;
    const swState = $('#swState');
    if (swState) {
      if (!('serviceWorker' in navigator)) swState.textContent = 'Service worker nie jest obsługiwany w tej przeglądarce.';
      else {
        const registration = await navigator.serviceWorker.getRegistration();
        swState.textContent = registration ? 'Service worker aktywny. Aplikacja może działać offline po pierwszym pełnym otwarciu.' : 'Service worker jeszcze nieaktywny — odśwież stronę po publikacji przez HTTPS.';
      }
    }
  }


  function bind() {
    $$('[data-route]').forEach((button) => button.addEventListener('click', () => navigate(button.dataset.route)));
    $$('[data-chapter]').forEach((button) => button.addEventListener('click', () => navigate('guide', button.dataset.chapter)));
    $$('[data-filter]').forEach((button) => button.addEventListener('click', () => { filter = button.dataset.filter; render(); }));

    $$('[data-journal-day]').forEach((button) => button.addEventListener('click', () => navigate('journal', button.dataset.journalDay)));
    $$('[data-journal-field]').forEach((field) => field.addEventListener('input', () => {
      const wrapper = field.closest('[data-day]'); if (!wrapper) return;
      const all = journalStorage(); const current = entryFor(wrapper.dataset.day);
      current[field.dataset.journalField] = field.value; current.updatedAt = new Date().toLocaleString('pl-PL');
      all[wrapper.dataset.day] = current; saveJournalStorage(all);
      const state = $('#journalSaveState'); if (state) state.textContent = `Zapisano: ${current.updatedAt}`;
    }));
    $('#exportJournal')?.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(journalStorage(), null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='Peru_2026_Expedition_Journal.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),500);
    });
    $('#importJournal')?.addEventListener('change', async (event) => {
      const file = event.target.files?.[0]; if (!file) return;
      try { const parsed = JSON.parse(await file.text()); saveJournalStorage(parsed); render(); }
      catch { alert('Nie udało się zaimportować pliku dziennika.'); }
    });
    $$('[data-pack]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      let saved={}; try{saved=JSON.parse(localStorage.getItem('peru2026_pack')||'{}')}catch{}
      saved[checkbox.dataset.pack]=checkbox.checked; localStorage.setItem('peru2026_pack',JSON.stringify(saved));
    }));


    $$('[data-amazon-check]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = amazonStorage(); saved.checks ||= {}; saved.checks[checkbox.dataset.amazonCheck] = checkbox.checked; saveAmazonStorage(saved);
    }));
    $$('[data-amazon-note]').forEach((field) => field.addEventListener('input', () => {
      const saved = amazonStorage(); saved.notes ||= {}; saved.notes[field.dataset.amazonNote] = field.value; saveAmazonStorage(saved);
    }));
    $$('[data-seen-species]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = amazonStorage(); saved.seen ||= {}; saved.seen[checkbox.dataset.seenSpecies] = checkbox.checked; saveAmazonStorage(saved); render();
    }));
    const filterSpecies = () => {
      const q = ($('#speciesSearch')?.value || '').toLowerCase(); const g = $('#speciesGroup')?.value || 'all';
      $$('[data-species-card]').forEach(card => { card.hidden = !(card.dataset.name.includes(q) && (g === 'all' || card.dataset.group === g)); });
    };
    $('#speciesSearch')?.addEventListener('input', filterSpecies); $('#speciesGroup')?.addEventListener('change', filterSpecies);
    $$('[data-amazon-scroll]').forEach(button => button.addEventListener('click', () => document.querySelector(button.dataset.amazonScroll==='days'?'#amazon-days':'#amazon-species')?.scrollIntoView({behavior:'smooth'})));
    $('#exportAmazon')?.addEventListener('click', () => { const blob = new Blob([JSON.stringify(amazonStorage(), null, 2)], {type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='Peru_2026_Amazonia_Observations.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),500); });


    $$('[data-machu-check]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = machuStorage(); saved.checks ||= {}; saved.checks[checkbox.dataset.machuCheck] = checkbox.checked; saveMachuStorage(saved); render();
    }));
    $$('[data-machu-stop]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = machuStorage(); saved.route ||= {}; saved.route[checkbox.dataset.machuStop] = checkbox.checked; saveMachuStorage(saved); render();
    }));
    $$('[data-machu-route2-stop]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = machuStorage(); saved.route2Progress ||= {}; saved.route2Progress[checkbox.dataset.machuRoute2Stop] = checkbox.checked; saveMachuStorage(saved); render();
    }));
    $$('[data-machu-actual]').forEach((field) => field.addEventListener('input', () => {
      const saved = machuStorage(); saved.actual ||= {}; saved.actual[field.dataset.machuActual] = field.value; saveMachuStorage(saved);
    }));
    $$('[data-machu-field]').forEach((field) => field.addEventListener('input', () => {
      const saved = machuStorage(); saved[field.dataset.machuField] = field.value; saveMachuStorage(saved);
    }));
    $('#machuRoute2Status')?.addEventListener('change', (event) => { const saved=machuStorage(); saved.route2Status=event.target.value; saveMachuStorage(saved); render(); });
    $('#machuRoute2Choice')?.addEventListener('input', (event) => { const saved=machuStorage(); saved.route2Choice=event.target.value; saveMachuStorage(saved); });
    $$('[data-machu-scroll]').forEach(button => button.addEventListener('click', () => document.querySelector(`#machu-${button.dataset.machuScroll}`)?.scrollIntoView({behavior:'smooth'})));
    $('#exportMachu')?.addEventListener('click', () => { const blob=new Blob([JSON.stringify(machuStorage(),null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='Peru_2026_Machu_Mission_Data.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),500); });

    $('#wildlifeObservationForm')?.addEventListener('submit', async (event) => {
      event.preventDefault(); const form=event.currentTarget; const state=$('#wildlifeFormState'); if(state) state.textContent='Zapisywanie…';
      try {
        const data=wildlifeStorage(); const fd=new FormData(form); const file=form.elements.photo?.files?.[0]; const photo=await compressWildlifeImage(file);
        const record={ id:`obs_${Date.now()}_${Math.random().toString(36).slice(2,7)}`, speciesId:String(fd.get('speciesId')||''), date:String(fd.get('date')||''), time:String(fd.get('time')||''), location:String(fd.get('location')||''), count:Math.max(1,Number(fd.get('count'))||1), confidence:String(fd.get('confidence')||'confirmed'), notes:String(fd.get('notes')||''), photo, createdAt:new Date().toISOString() };
        if(!record.speciesId) throw new Error('Wybierz gatunek.'); data.records ||= []; data.records.push(record); data.manualSeen ||= {}; data.manualSeen[record.speciesId]=true; saveWildlifeStorage(data); render();
      } catch(error) { if(state) state.textContent=error.message || 'Nie udało się zapisać.'; }
    });
    $$('[data-wildlife-seen]').forEach((checkbox) => checkbox.addEventListener('change', () => { const data=wildlifeStorage(); data.manualSeen ||= {}; data.manualSeen[checkbox.dataset.wildlifeSeen]=checkbox.checked; saveWildlifeStorage(data); render(); }));
    const filterWildlife=()=>{ const q=($('#wildlifeSearch')?.value||'').toLowerCase(); const g=$('#wildlifeGroup')?.value||'all'; const seen=$('#wildlifeSeenFilter')?.value||'all'; $$('[data-wildlife-card]').forEach(card=>{ card.hidden=!(card.dataset.name.includes(q)&&(g==='all'||card.dataset.group===g)&&(seen==='all'||card.dataset.seen===seen)); }); };
    $('#wildlifeSearch')?.addEventListener('input',filterWildlife); $('#wildlifeGroup')?.addEventListener('change',filterWildlife); $('#wildlifeSeenFilter')?.addEventListener('change',filterWildlife);
    $$('[data-wildlife-delete]').forEach(button => button.addEventListener('click', () => { const data=wildlifeStorage(); data.records=(data.records||[]).filter(x=>x.id!==button.dataset.wildlifeDelete); saveWildlifeStorage(data); render(); }));
    $('#wildlifeCustomForm')?.addEventListener('submit', (event) => { event.preventDefault(); const fd=new FormData(event.currentTarget); const name=String(fd.get('name')||'').trim(); const group=String(fd.get('group')||'').trim().toLowerCase(); if(!name||!group)return; const data=wildlifeStorage(); data.customSpecies ||= []; data.customSpecies.push({id:`custom_${Date.now()}`,name,group,chance:'nieustalona',signal:'dodane ręcznie',where:'do uzupełnienia',ethics:'obserwować bez ingerencji',photo:'zachować bezpieczny dystans'}); saveWildlifeStorage(data); render(); });
    $$('[data-custom-delete]').forEach(button => button.addEventListener('click', () => { const data=wildlifeStorage(); data.customSpecies=(data.customSpecies||[]).filter(x=>x.id!==button.dataset.customDelete); data.records=(data.records||[]).filter(x=>x.speciesId!==button.dataset.customDelete); delete data.manualSeen?.[button.dataset.customDelete]; saveWildlifeStorage(data); render(); }));
    $$('[data-wildlife-scroll]').forEach(button => button.addEventListener('click', () => document.querySelector(`#wildlife-${button.dataset.wildlifeScroll}`)?.scrollIntoView({behavior:'smooth'})));
    $('#exportWildlife')?.addEventListener('click', () => { const blob=new Blob([JSON.stringify(wildlifeStorage(),null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='Peru_2026_Wildlife_Tracker.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),500); });
    $('#importWildlife')?.addEventListener('change', async(event)=>{ const file=event.target.files?.[0]; if(!file)return; try{ const data=JSON.parse(await file.text()); if(!Array.isArray(data.records))throw new Error(); saveWildlifeStorage(data); render(); }catch{ alert('Nieprawidłowy plik trackera.'); } });
    $('#clearWildlife')?.addEventListener('click',()=>{ if(confirm('Usunąć wszystkie obserwacje Wildlife Trackera z tego urządzenia?')){ localStorage.removeItem('peru2026_wildlife_v11'); render(); } });


    $$('[data-cusco-check]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = cuscoStorage(); saved.checks ||= {}; saved.checks[checkbox.dataset.cuscoCheck] = checkbox.checked; saveCuscoStorage(saved);
    }));
    $$('[data-cusco-note]').forEach((field) => field.addEventListener('input', () => {
      const saved = cuscoStorage(); saved.notes ||= {}; saved.notes[field.dataset.cuscoNote] = field.value; saveCuscoStorage(saved);
    }));
    $$('[data-cusco-visited]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = cuscoStorage(); saved.visited ||= {}; saved.visited[checkbox.dataset.cuscoVisited] = checkbox.checked; saveCuscoStorage(saved); render();
    }));
    $$('[data-cusco-altitude]').forEach((field) => field.addEventListener('input', () => {
      const saved = cuscoStorage(); saved.altitude ||= {}; saved.altitude[field.dataset.cuscoAltitude] = field.value; saveCuscoStorage(saved);
    }));
    $$('[data-cusco-scroll]').forEach(button => button.addEventListener('click', () => { const target=button.dataset.cuscoScroll; document.querySelector(target==='days'?'#cusco-days':target==='routes'?'#cusco-routes':'#cusco-places')?.scrollIntoView({behavior:'smooth'}); }));
    $('#exportCusco')?.addEventListener('click', () => { const blob = new Blob([JSON.stringify(cuscoStorage(), null, 2)], {type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='Peru_2026_Cusco_Field_Data.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),500); });

    $$('[data-cusco-route]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = cuscoStorage(); saved.routes ||= {}; saved.routes[checkbox.dataset.cuscoRoute] = checkbox.checked; saveCuscoStorage(saved); render();
    }));

    $$('[data-ollanta-check]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = ollantaStorage(); saved.checks ||= {}; saved.checks[checkbox.dataset.ollantaCheck] = checkbox.checked; saveOllantaStorage(saved);
    }));
    $$('[data-ollanta-note]').forEach((field) => field.addEventListener('input', () => {
      const saved = ollantaStorage(); saved.notes ||= {}; saved.notes[field.dataset.ollantaNote] = field.value; saveOllantaStorage(saved);
    }));
    $$('[data-ollanta-visited]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = ollantaStorage(); saved.visited ||= {}; saved.visited[checkbox.dataset.ollantaVisited] = checkbox.checked; saveOllantaStorage(saved); render();
    }));
    $$('[data-ollanta-shortlist]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = ollantaStorage(); saved.shortlist ||= {}; saved.shortlist[checkbox.dataset.ollantaShortlist] = checkbox.checked; saveOllantaStorage(saved); render();
    }));
    $$('[data-ollanta-scroll]').forEach(button => button.addEventListener('click', () => {
      const target = button.dataset.ollantaScroll;
      document.querySelector(target==='days'?'#ollanta-days':target==='places'?'#ollanta-places':'#ollanta-train')?.scrollIntoView({behavior:'smooth'});
    }));
    $('#exportOllanta')?.addEventListener('click', () => { const blob = new Blob([JSON.stringify(ollantaStorage(), null, 2)], {type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='Peru_2026_Ollantaytambo_Field_Data.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),500); });


    $$('[data-lima-check]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = limaStorage(); saved.checks ||= {}; saved.checks[checkbox.dataset.limaCheck] = checkbox.checked; saveLimaStorage(saved);
    }));
    $$('[data-lima-note]').forEach((field) => field.addEventListener('input', () => {
      const saved = limaStorage(); saved.notes ||= {}; saved.notes[field.dataset.limaNote] = field.value; saveLimaStorage(saved);
    }));
    $$('[data-lima-visited]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = limaStorage(); saved.visited ||= {}; saved.visited[checkbox.dataset.limaVisited] = checkbox.checked; saveLimaStorage(saved); render();
    }));
    $$('[data-lima-shortlist]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const saved = limaStorage(); saved.shortlist ||= {}; saved.shortlist[checkbox.dataset.limaShortlist] = checkbox.checked; saveLimaStorage(saved); render();
    }));
    $$('[data-lima-scroll]').forEach(button => button.addEventListener('click', () => document.querySelector(button.dataset.limaScroll==='days'?'#lima-days':'#lima-night')?.scrollIntoView({behavior:'smooth'})));
    $('#exportLima')?.addEventListener('click', () => { const blob = new Blob([JSON.stringify(limaStorage(), null, 2)], {type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='Peru_2026_Lima_Selections.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),500); });

    $('#downloadPhotoPack')?.addEventListener('click', () => downloadPhotoPack($('#photoPackStatus'), $('#downloadPhotoPack')));
    $('#clearPhotoPack')?.addEventListener('click', () => clearPhotoPack($('#photoPackStatus')));
    $('#systemDownloadPhotos')?.addEventListener('click', () => downloadPhotoPack($('#systemPhotoState'), $('#systemDownloadPhotos')));
    $('#systemClearPhotos')?.addEventListener('click', () => clearPhotoPack($('#systemPhotoState')));
    $('#exportFullBackup')?.addEventListener('click', () => { downloadJSON(`Peru_2026_full_backup_${new Date().toISOString().slice(0,10)}.json`, fullBackup()); showToast('Pełny backup zapisany'); });
    $('#importFullBackup')?.addEventListener('change', async (event) => {
      const file = event.target.files?.[0]; if (!file) return;
      try {
        const parsed = JSON.parse(await file.text());
        if (parsed?.kind !== 'peru-2026-full-backup' || !parsed.localStorage || typeof parsed.localStorage !== 'object') throw new Error('Nieprawidłowy format');
        if (!confirm('Import zastąpi bieżące dane aplikacji zapisami z pliku. Kontynuować?')) return;
        Object.keys(appStorageSnapshot()).forEach(key => localStorage.removeItem(key));
        Object.entries(parsed.localStorage).forEach(([key, value]) => { if (key.startsWith(STORAGE_PREFIX) && typeof value === 'string') localStorage.setItem(key, value); });
        showToast('Backup został przywrócony'); render();
      } catch { alert('Nie udało się zaimportować pełnego backupu.'); }
    });
    $('#resetAppData')?.addEventListener('click', () => {
      if (!confirm('Usunąć wszystkie checklisty, notatki, obserwacje i ustawienia Peru 2026 z tego urządzenia?')) return;
      Object.keys(appStorageSnapshot()).forEach(key => localStorage.removeItem(key)); showToast('Dane lokalne usunięte', 'warn'); render();
    });
    $('#checkUpdate')?.addEventListener('click', async () => {
      const state = $('#swState');
      if (!('serviceWorker' in navigator)) { if (state) state.textContent = 'Brak obsługi service workera.'; return; }
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) { if (state) state.textContent = 'Brak rejestracji. Otwórz aplikację przez HTTPS i odśwież.'; return; }
      if (state) state.textContent = 'Sprawdzanie nowej wersji…'; await registration.update();
      if (registration.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      if (state) state.textContent = registration.waiting ? 'Nowa wersja gotowa — odświeżam.' : 'Masz najnowszą dostępną wersję.';
      if (registration.waiting) setTimeout(() => location.reload(), 700);
    });
    $('#installApp')?.addEventListener('click', async () => {
      if (deferredInstallPrompt) { deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt = null; return; }
      alert('Na iPhonie: otwórz aplikację w Safari → Udostępnij → Dodaj do ekranu początkowego. Potem uruchamiaj ją z ikony.');
    });


    $$('[data-task]').forEach((checkbox) => checkbox.addEventListener('change', () => {
      const done = localDone();
      done[checkbox.dataset.task] = checkbox.checked;
      setDone(done);
      render();
    }));
    const toggleMenu = () => { const open = $('.sidebar')?.classList.toggle('open'); $('.mobile-overlay')?.classList.toggle('show', !!open); $('.menu-btn')?.setAttribute('aria-expanded', open ? 'true' : 'false'); };
    $('.menu-btn')?.addEventListener('click', toggleMenu);
    $('#mobileMore')?.addEventListener('click', toggleMenu);
    $('.mobile-overlay')?.addEventListener('click', () => {
      $('.sidebar')?.classList.remove('open');
      $('.mobile-overlay')?.classList.remove('show'); $('.menu-btn')?.setAttribute('aria-expanded', 'false');
    });
    $('#printBtn')?.addEventListener('click', () => print());
    refreshSystemStatus().catch(() => {});
    updateReadingProgress();
  }

  function updateReadingProgress() {
    const bar = $('#readingProgress');
    if (!bar) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? Math.min(100, Math.max(0, scrollY / max * 100)) : 0;
    bar.style.width = `${pct}%`;
  }

  function render() {
    document.body.innerHTML = shell(content());
    bind();
  }

  addEventListener('hashchange', () => {
    parseHash();
    filter = 'all';
    render();
    scrollTo(0, 0);
  });
  addEventListener('scroll', updateReadingProgress, { passive: true });
  addEventListener('online', updateConnectionIndicator);
  addEventListener('offline', updateConnectionIndicator);
  addEventListener('beforeinstallprompt', (event) => { event.preventDefault(); deferredInstallPrompt = event; });

  render();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js').catch(() => {});
})();
