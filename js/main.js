/* Green Expo Journeys
   Shared by every page. Each feature only runs if its elements are on the page.
   GSAP + ScrollTrigger for motion, Lenis for smooth scrolling (desktop only). Data lives in data.js. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();

  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } },
  };
  const REGIONS = window.REGIONS || [];
  const PLACES = window.PLACES || [];
  const SEASONS = window.SEASONS || [];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  /* ---------- Smooth scroll (mouse/trackpad only; phones keep native scrolling) ---------- */
  let lenis = null;
  if (!reduce && !touch && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.12 });
    if (hasGsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  const nav = $('#nav');
  const navH = () => nav.offsetHeight;
  const scrollToY = (y) => {
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  };
  const scrollToEl = (el, extra = 0) => scrollToY(el.getBoundingClientRect().top + window.scrollY - navH() - extra);

  /* ---------- Nav ---------- */
  const toggle = $('#navToggle');
  const hero = $('.hero, .page-hero');
  const setSolid = () => nav.classList.toggle('is-solid', !hero || window.scrollY > hero.offsetHeight - nav.offsetHeight - 10);
  setSolid();
  window.addEventListener('scroll', setSolid, { passive: true });
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  // Same-page anchors scroll smoothly; links to other pages behave normally.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const el = a.getAttribute('href').length > 1 && document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    scrollToEl(el);
  });

  /* ---------- Current section highlight ---------- */
  const sections = $$('main > section');
  const markCurrent = () => {
    const line = window.innerHeight * 0.4;
    let cur = sections[0];
    sections.forEach((s) => { if (s.getBoundingClientRect().top <= line) cur = s; });
    sections.forEach((s) => s.classList.toggle('is-current', s === cur));
  };
  if (sections.length) { window.addEventListener('scroll', markCurrent, { passive: true }); markCurrent(); }

  /* ---------- Back to top ---------- */
  const toTop = $('#toTop');
  if (toTop) {
    const showTop = () => toTop.classList.toggle('is-shown', window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', showTop, { passive: true });
    showTop();
    toTop.addEventListener('click', () => { scrollToY(0); $('.nav__brand').focus({ preventScroll: true }); });
  }

  /* ---------- Hero motion ---------- */
  if (hasGsap && !reduce) {
    gsap.from(['.hero__hello', '.hero__title', '.hero__lede', '.hero .hero__actions', '.page-hero__inner > *'], { y: 20, opacity: 0, duration: 0.9, ease: 'power2.out', stagger: 0.08, delay: 0.1 });
    if (window.ScrollTrigger && window.innerWidth > 760 && hero) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(hero.querySelector('.hero__media img'), { yPercent: -10, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    }
  }

  /* ---------- Trip (shared across pages) ---------- */
  const picked = new Set(store.get('gx-trip', []).filter((id) => PLACES.some((p) => p.id === id)));
  const tripListeners = [];
  const tray = $('#tray');
  const onPlanPage = document.body.dataset.page === 'plan';
  const renderTrip = () => {
    const chosen = PLACES.filter((p) => picked.has(p.id));
    if (tray) {
      tray.hidden = chosen.length === 0 || onPlanPage;
      $('#trayCount').textContent = chosen.length;
      $('#trayWord').textContent = chosen.length === 1 ? 'place' : 'places';
    }
    tripListeners.forEach((fn) => fn(chosen));
    store.set('gx-trip', [...picked]);
  };
  const togglePlace = (id) => { picked.has(id) ? picked.delete(id) : picked.add(id); renderTrip(); };
  if (tray) $('#trayClear').addEventListener('click', () => { picked.clear(); renderTrip(); });

  const smooth = (pts) => {
    if (pts.length < 2) return '';
    let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2, t = 6;
      d += ` C${(p1.x + (p2.x - p0.x) / t).toFixed(1)},${(p1.y + (p2.y - p0.y) / t).toFixed(1)} ${(p2.x - (p3.x - p1.x) / t).toFixed(1)},${(p2.y - (p3.y - p1.y) / t).toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return d;
  };

  /* ---------- Places page: map + list ---------- */
  const list = $('#placesList');
  if (list) {
    // Mercator projection fitted to the island outline (same as the SVG path).
    const S = 8426.545965812791, TX = -11669.51180434274, TY = 1472.8176306169091;
    const project = (lon, lat) => [S * lon * Math.PI / 180 + TX, -S * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360)) + TY];
    PLACES.forEach((p) => { [p.x, p.y] = project(p.lon, p.lat); });
    // Label position around each pin, from data.js: l(eft), r(ight), t(op) or b(ottom).
    const LABEL = { l: [-10, 4.5, 'end'], r: [10, 4.5, 'start'], t: [0, -11, 'middle'], b: [0, 19, 'middle'], bl: [-4, 17, 'end'], br: [4, 17, 'start'] };
    const svg = $('#map');
    const NS = 'http://www.w3.org/2000/svg';
    $('#mapLoop').setAttribute('d', smooth(PLACES));
    const mapcol = $('.places__mapcol');
    const cardOffset = () => (window.innerWidth <= 1000 ? mapcol.offsetHeight + 12 : 20);

    const pins = {};
    PLACES.forEach((p) => {
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'mstop');
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', `${p.name}: show details`);
      const [lx, ly, anchor] = LABEL[p.label] || LABEL.r;
      g.innerHTML = `<circle r="5"/><text x="${lx}" y="${ly}" text-anchor="${anchor}">${p.name}</text>`;
      const go = () => {
        const card = document.getElementById(`place-${p.id}`);
        scrollToEl(card, cardOffset());
        card.classList.remove('flash'); void card.offsetWidth; card.classList.add('flash');
      };
      g.addEventListener('click', go);
      g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
      $('#mapStops').appendChild(g);
      pins[p.id] = g;
    });

    // The region and place cards are written into places.html by the build script (better for search engines).
    list.addEventListener('click', (e) => { const b = e.target.closest('.add'); if (b) togglePlace(b.dataset.id); });

    const regionNav = $('#regionNav');
    regionNav.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (b) scrollToEl(document.getElementById(`region-${b.dataset.region}`), 20);
    });

    // Zoom the map to a region
    const FULL = { x: 0, y: 0, w: 420, h: 620 };
    const vb = { ...FULL };
    const applyVB = () => {
      svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
      const r = svg.getBoundingClientRect();
      const k = r.width ? Math.max(vb.w / r.width, vb.h / r.height) * 1.25 : vb.w / 420;
      PLACES.forEach((p) => pins[p.id].setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) scale(${k.toFixed(3)})`));
    };
    const boxFor = (regionId) => {
      if (!regionId) return { ...FULL };
      const pts = PLACES.filter((p) => p.region === regionId);
      const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y);
      const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
      let w = Math.max(x1 - x0, 90) + 200, h = Math.max(y1 - y0, 90) + 160;
      const r = svg.getBoundingClientRect();
      const a = r.width && r.height ? r.width / r.height : 420 / 620;
      if (w / h < a) w = h * a; else h = w / a;
      return { x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - h / 2, w, h };
    };
    let activeRegion = null;
    const setRegion = (id) => {
      if (id === activeRegion) return;
      activeRegion = id;
      PLACES.forEach((p) => pins[p.id].classList.toggle('in-region', p.region === id));
      $$('button', regionNav).forEach((b) => b.setAttribute('aria-current', String(b.dataset.region === id)));
      const target = boxFor(id);
      if (hasGsap && !reduce) gsap.to(vb, { ...target, duration: 0.9, ease: 'power2.inOut', overwrite: true, onUpdate: applyVB });
      else { Object.assign(vb, target); applyVB(); }
    };
    applyVB();
    window.addEventListener('resize', () => { Object.assign(vb, boxFor(activeRegion)); applyVB(); });

    const chapters = $$('.chapter', list);
    const pickRegion = () => {
      const line = window.innerHeight * (window.innerWidth <= 1000 ? 0.62 : 0.5);
      let current = null;
      chapters.forEach((c) => { if (c.getBoundingClientRect().top < line) current = c.dataset.region; });
      setRegion(current);
    };
    window.addEventListener('scroll', pickRegion, { passive: true });
    pickRegion();

    tripListeners.push((chosen) => {
      $('#mapTrip').setAttribute('d', smooth(chosen));
      PLACES.forEach((p) => pins[p.id].classList.toggle('is-picked', picked.has(p.id)));
      $$('.add', list).forEach((b) => {
        const on = picked.has(b.dataset.id);
        b.setAttribute('aria-pressed', String(on));
        b.textContent = on ? 'Added ✓' : 'Add to my trip';
      });
    });

    // Arriving from another page with #region-… or #place-…
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) setTimeout(() => scrollToEl(target, target.classList.contains('place') ? cardOffset() : 20), 300);
    }
  }

  /* ---------- Home: this month ---------- */
  const thisMonth = $('#thisMonth');
  if (thisMonth) {
    const mi = new Date().getMonth();
    $('#monthTitle').textContent = `Going in ${MONTHS[mi]}?`;
    const VERDICT = ['Rainy', 'Fine', 'Best time'];
    thisMonth.innerHTML = [...SEASONS].sort((a, b) => b.m[mi] - a.m[mi]).slice(0, 4).map((r) => {
      const text = (r.label && r.label(mi)) || VERDICT[r.m[mi]];
      return `<li class="l${r.m[mi]}"><strong>${r.name}</strong><span>${text}</span></li>`;
    }).join('');
  }

  /* ---------- Rails: swipe rows with arrows and dots on smaller screens ---------- */
  $$('[data-rail]').forEach((rail) => {
    const track = $('.rail__track', rail);
    const items = [...track.children];
    const dots = $('.rail__dots', rail);
    const prev = $('.rail__prev', rail);
    const next = $('.rail__next', rail);
    if (!items.length) return;
    dots.innerHTML = items.map(() => '<i></i>').join('');
    const step = () => items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 16);
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const i = max <= 2 ? 0 : Math.round(track.scrollLeft / step());
      [...dots.children].forEach((d, k) => d.classList.toggle('is-on', k === Math.min(i, items.length - 1)));
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }));
    track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    window.addEventListener('resize', update);
    update();
  });
  {
  }

  /* ---------- When to go: month picker ---------- */
  const monthsEl = $('#months');
  if (monthsEl) {
    const VERDICT = ['Rainy', 'Fine', 'Best time'];
    const tableEl = $('#seasonTable');
    const renderSeason = (mi) => {
      [...monthsEl.children].forEach((b, k) => { b.setAttribute('aria-selected', String(k === mi)); b.tabIndex = k === mi ? 0 : -1; });
      tableEl.innerHTML = SEASONS.map((r) => {
        const v = r.m[mi];
        const text = (r.label && r.label(mi)) || VERDICT[v];
        return `<div class="srow">
          <p class="srow__name"><strong>${r.name}</strong><small>${r.where}</small></p>
          <div class="srow__bar" aria-hidden="true">${r.m.map((x, k) => `<i class="l${x}${k === mi ? ' is-sel' : ''}"></i>`).join('')}</div>
          <p class="srow__verdict l${v}">${text}</p>
        </div>`;
      }).join('');
    };
    MONTHS.forEach((m, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'tab'); b.textContent = m.slice(0, 3);
      b.setAttribute('aria-label', m);
      b.addEventListener('click', () => renderSeason(i));
      monthsEl.appendChild(b);
    });
    monthsEl.addEventListener('keydown', (e) => {
      const i = [...monthsEl.children].findIndex((b) => b.getAttribute('aria-selected') === 'true');
      const next = e.key === 'ArrowRight' ? (i + 1) % 12 : e.key === 'ArrowLeft' ? (i + 11) % 12 : null;
      if (next === null) return;
      e.preventDefault(); renderSeason(next); monthsEl.children[next].focus();
    });
    renderSeason(new Date().getMonth());
  }

  /* ---------- Plan page: picked places + form ---------- */
  const pickedList = $('#pickedList');
  if (pickedList) {
    tripListeners.push((chosen) => {
      pickedList.innerHTML = chosen.length
        ? chosen.map((p) => `<li>${p.name}<button type="button" data-id="${p.id}" aria-label="Remove ${p.name}">×</button></li>`).join('')
        : '<li class="picked__empty">None yet. <a href="places.html">Add places from the map</a>, or just tell us what you like below.</li>';
    });
    pickedList.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) togglePlace(b.dataset.id); });
  }
  const form = $('#planForm');
  if (form) {
    const err = $('#formError');
    const tripParam = new URLSearchParams(location.search).get('trip');
    if (tripParam && [...form.trip.options].some((o) => o.value === tripParam)) form.trip.value = tripParam;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      form.name.setAttribute('aria-invalid', String(!name));
      form.email.setAttribute('aria-invalid', String(!emailOk));
      if (!name || !emailOk) {
        err.textContent = !name ? 'Add your name so we know who to reply to.' : 'Enter an email address like name@example.com.';
        (!name ? form.name : form.email).focus();
        return;
      }
      err.textContent = '';
      const places = PLACES.filter((p) => picked.has(p.id)).map((p) => p.name).join(', ') || 'None picked yet';
      const body = [
        `Name: ${name}`, `Email: ${email}`, `Month: ${form.month.value}`, `Days: ${form.days.value}`,
        `Starting point: ${form.trip.selectedOptions[0].text}`, `Places: ${places}`, '', form.message.value.trim(),
      ].join('\n');
      window.location.href = `mailto:info@greenexpolk.com?subject=${encodeURIComponent(`Trip enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    });
  }

  renderTrip();
})();
