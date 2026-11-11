/* tabs4.js - the four tabs of lecture 4 (lifecycle clock, search, backlog, prioritise), loaded by index.html.
   Plain script, no dependencies besides calc.js. The page hands over an `api` object (state access, helpers,
   drawing helpers) and gets back the tab modules. The maths is in calc.js (CR.life, CR.search, CR.queue, CR.prio);
   nothing in here computes a number that an exercise check uses.
   State lives inside the page state S: S.life, S.search, S.queue, S.prio (flat objects, ids like 'life.rho'). */
(function (root) {
  'use strict';

  const DEFAULTS = {
    life:   { zdShare: 0.25, zdMed: 14, nMed: 25, nSigma: 1.3, iMed: 43, iSigma: 0.8, tauMed: 1, base: 1, shape: 'lognormal' },
    search: { M: 1e4, rate: 100, days: 30, k: 0.5, rp: 0.01, rq: 0.2, rn: 100 },
    queue:  { a0: 10, mult: 3, week: 12, cF: 15, cI: 25 },
    cont:   { cMed: 50, cSigma: 1, rSigma: 0.7, m1: 20, m2: 60, m3: 150, m4: 400, o1: 1, o2: 1, o3: 1, o4: 1, L: 3, h: 1e-3, qc: 1e-4, N: 1e5, esc: 0.01, tdMed: 1, tdSigma: 0.8, tpMed: 30, tpSigma: 0.8 },
    prio:   { pi1: 0.02, pi2: 0.6, pi3: 0.3, L1: 0.5, L2: 2, L3: 5, e1: 2, e2: 1, e3: 3, cap: 3 }
  };

  // ranges of every slider on the four tabs (log: the slider is on a log10 scale)
  const PARAMS = {
    'life.zdShare': { label: 'zero-day share', min: 0, max: 1, step: 0.01, dec: 2 },
    'life.zdMed':   { label: 'zero-day median (days before the patch)', min: 1, max: 120, log: true },
    'life.nMed':    { label: 'n-day median (days)', min: 0.5, max: 400, log: true },
    'life.nSigma':  { label: 'n-day spread <i class="m">&sigma;</i>', min: 0.2, max: 2, step: 0.05, dec: 2 },
    'life.tauMed':  { label: 'median (days)', min: 0.05, max: 400, log: true },
    'life.iMed':    { label: 'median (days)', min: 1, max: 365, log: true },
    'life.iSigma':  { label: 'spread <i class="m">&sigma;</i>', min: 0.2, max: 2, step: 0.05, dec: 2 },
    'life.base':    { label: 'share with an exploit', min: 0.001, max: 1, log: true },
    'search.M':     { label: 'candidates <i class="m">M</i>', min: 10, max: 1e7, log: true },
    'search.rate':  { label: 'attempts per day', min: 1, max: 1e6, log: true },
    'search.days':  { label: 'window (days)', min: 1, max: 365, log: true },
    'search.rp':    { label: 'success of one run <i class="m">p</i>', min: 0.001, max: 0.5, log: true },
    'search.rq':    { label: 'reachable targets <i class="m">Q</i>', min: 0.02, max: 1, step: 0.01, dec: 2 },
    'search.rn':    { label: 'parallel runs <i class="m">n</i>', min: 1, max: 10000, log: true },
    'search.k':     { label: 'prior <i class="m">k</i>', min: 0.05, max: 3, step: 0.01, dec: 2 },
    'cont.cMed':    { label: 'median (h)', min: 1, max: 2000, log: true },
    'cont.cSigma':  { label: 'spread <i class="m">&sigma;</i>', min: 0.2, max: 2, step: 0.05, dec: 2 },
    'cont.rSigma':  { label: 'spread of every way <i class="m">&sigma;</i>', min: 0.2, max: 2, step: 0.05, dec: 2 },
    'cont.m1':      { label: 'way 1: median (h)', min: 2, max: 2000, log: true },
    'cont.m2':      { label: 'way 2: median (h)', min: 2, max: 2000, log: true },
    'cont.m3':      { label: 'way 3: median (h)', min: 2, max: 2000, log: true },
    'cont.m4':      { label: 'way 4: median (h)', min: 2, max: 2000, log: true },
    'cont.o1':      { label: 'way 1 open', min: 0, max: 1, step: 1, dec: 0 },
    'cont.o2':      { label: 'way 2 open', min: 0, max: 1, step: 1, dec: 0 },
    'cont.o3':      { label: 'way 3 open', min: 0, max: 1, step: 1, dec: 0 },
    'cont.o4':      { label: 'way 4 open', min: 0, max: 1, step: 1, dec: 0 },
    'cont.L':       { label: 'layers <i class="m">L</i>', min: 1, max: 6, step: 1, dec: 0 },
    'cont.h':       { label: 'pass rate per layer <i class="m">h</i>', min: 1e-6, max: 0.1, log: true },
    'cont.qc':      { label: 'shared cause <i class="m">q</i>', min: 1e-6, max: 0.1, log: true },
    'cont.N':       { label: 'attempts <i class="m">N</i>', min: 100, max: 1e9, log: true },
    'cont.esc':     { label: 'chance of an escape', min: 1e-4, max: 1, log: true },
    'cont.tdMed':   { label: 'detection and response: median (h)', min: 0.05, max: 200, log: true },
    'cont.tdSigma': { label: 'spread <i class="m">&sigma;</i>', min: 0.2, max: 2, step: 0.05, dec: 2 },
    'cont.tpMed':   { label: 'progression to the loss: median (h)', min: 0.5, max: 500, log: true },
    'cont.tpSigma': { label: 'spread <i class="m">&sigma;</i>', min: 0.2, max: 2, step: 0.05, dec: 2 },
    'queue.a0':     { label: 'findings / week', min: 1, max: 50, step: 1, dec: 0 },
    'queue.mult':   { label: 'AI factor', min: 1, max: 10, step: 0.5, dec: 1 },
    'queue.week':   { label: 'from week', min: 1, max: 52, step: 1, dec: 0 },
    'queue.cF':     { label: 'fixes / week', min: 1, max: 80, step: 1, dec: 0 },
    'queue.cI':     { label: 'installs / week', min: 1, max: 80, step: 1, dec: 0 },
    'prio.cap':     { label: 'capacity (person-days)', min: 1, max: 20, step: 0.5, dec: 1 }
  };
  [1, 2, 3].forEach(n => {
    PARAMS['prio.pi' + n] = { label: '<i class="m">&pi;</i> (in the period)', min: 0, max: 1, step: 0.01, dec: 2 };
    PARAMS['prio.L' + n]  = { label: '<i class="m">L</i> (MSEK)', min: 0.1, max: 200, log: true };
    PARAMS['prio.e' + n]  = { label: 'effort (person-days)', min: 1, max: 10, step: 0.5, dec: 1 };
  });

  // tab id -> state key
  const TABS = { lifecycle: 'life', search: 'search', backlog: 'queue', prioritise: 'prio', containment: 'cont' };

  function create(api) {
    const CR = root.CR, $ = api.$, S = () => api.S();

    /* ---------- small helpers ---------- */
    const days = x => api.medTxt(x);
    const int = x => Math.round(x).toLocaleString('en');
    const big = x => x >= 1e7 ? api.num(x / 1e6) + ' million' : int(x);
    const card = (id, color, title, gloss) => '<div class="card" id="' + id + '" style="color:' + color + '"><h2><span>' + title + '</span> <span class="gl">' + gloss + '</span></h2><div class="body"></div></div>';
    const calcLine = (what, eq, last) => '<div class="line"' + (last ? ' style="border:0"' : '') + '><span class="what">' + what + '</span><span class="eq">' + eq + '</span></div>';
    const panel = (id, heading, hint) => '<div class="panel"><h2>' + heading + '</h2><div id="' + id + '"></div>' + (hint ? '<p class="hint">' + hint + '</p>' : '') + '</div>';
    function addParam(host, id) {
      const P = PARAMS[id], row = document.createElement('div'); row.className = 'row';
      const lo = P.log ? Math.log10(P.min) : P.min, hi = P.log ? Math.log10(P.max) : P.max, step = P.log ? 0.005 : P.step;
      const plain = P.label.replace(/<[^>]+>/g, '');
      row.innerHTML = '<label for="n-' + id + '">' + P.label + '</label><input type="range" id="s-' + id + '" min="' + lo + '" max="' + hi + '" step="' + step + '" aria-label="' + plain + '">' +
                      '<input type="number" id="n-' + id + '" step="any" min="' + P.min + '" max="' + P.max + '">';
      host.appendChild(row);
      const sl = row.querySelector('input[type=range]'), nu = row.querySelector('input[type=number]');
      const toS = v => P.log ? Math.log10(v) : v, fromS = v => P.log ? Math.pow(10, v) : v;
      const fmt = v => P.log ? (v >= 100 ? String(Math.round(v)) : api.num(v)) : (+v).toFixed(P.dec);
      sl.addEventListener('input', () => { api.set(id, fromS(+sl.value)); api.render(); });
      nu.addEventListener('change', () => { if (nu.value !== '') api.set(id, +nu.value); api.render(); });
      api.ctl[id] = { sl, nu, sync() { const v = api.get(id); sl.value = toS(v); if (document.activeElement !== nu) nu.value = fmt(v); const lk = api.locked().has(id); sl.disabled = nu.disabled = lk; } };
    }
    function addParams(cardId, ids) { const host = $(cardId).querySelector('.body'); ids.forEach(id => addParam(host, id)); }
    function chips(hostId, list) {
      const host = $(hostId); host.innerHTML = '';
      list.forEach(([label, fn]) => { const b = document.createElement('button'); b.className = 'chip'; b.textContent = label; b.disabled = api.inEx();
        b.title = api.inEx() ? 'Presets are off during an exercise' : ''; b.addEventListener('click', () => { fn(); api.render(); }); host.appendChild(b); });
    }
    const foot = (shelf, takeaway, source) => '<div class="shelf">' + shelf + '</div><p class="takeaway">' + takeaway + '</p><p class="source">' + source + '</p>';
    const svgWrap = (f, g, label) => '<svg viewBox="0 0 ' + f.W + ' ' + f.H + '" width="' + f.W + '" height="' + f.H + '" role="img" aria-label="' + label + '">' + g + '</svg>';
    const axisLine = (f, x1, x2, y) => '<line x1="' + x1 + '" x2="' + x2 + '" y1="' + y + '" y2="' + y + '" stroke="#8a8a8a"/>';
    const tick = (x, y, label, anchor) => '<line x1="' + x + '" x2="' + x + '" y1="' + y + '" y2="' + (y + 4) + '" stroke="#8a8a8a"/><text x="' + x + '" y="' + (y + 17) + '" text-anchor="' + (anchor || 'middle') + '" class="t-muted">' + label + '</text>';
    const niceUp = (v, steps) => steps.find(s => s >= v) || steps[steps.length - 1];

    const sup = n => String(n).split('').map(d => d === '-' ? '\u207B' : '\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079'[+d]).join('');
    const mant = x => { let e = Math.floor(Math.log10(x)), m = +(x / Math.pow(10, e)).toPrecision(2); if (m >= 10) { m /= 10; e++; } return { m, e }; };
    const sciU = x => x === 0 ? '0' : x >= 0.01 ? api.pct(x) : (() => { const t = mant(x); return api.num(t.m) + ' \u00D7 10' + sup(t.e); })();
    const bigU = x => x >= 1e4 ? (() => { const t = mant(x); return (t.m === 1 ? '' : api.num(t.m) + ' \u00D7 ') + '10' + sup(t.e); })() : int(x);
    const dayW = x => days(x) + (Math.abs(x - 1) < 1e-9 ? ' day' : ' days');
    const modules = {};

    /* ===================================================================================================
       TAB 3: THE LIFECYCLE RACE (lecture 4): X, I and tau; the attacker is first when X + tau < I
       =================================================================================================== */
    const dnum = x => (x < 0 ? '−' : '') + (Math.abs(x) >= 100 ? String(Math.round(Math.abs(x))) : api.num(Math.abs(x)));
    modules.lifecycle = {
      key: 'life', title: 'Lifecycle race', sel: null, cur: null,
      mount(el) {
        el.innerHTML =
          `<div class="grid"><div>
            <p class="lede" style="margin-bottom:14px">A usable exploit exists from the day <i class="m">X</i>; this system installs the patch on day <i class="m">I</i>; after <i class="m">X</i> the adversary needs a time <i class="m">&tau;</i> on the target. The attacker is first when <i class="m">X</i> + <i class="m">&tau;</i> &lt; <i class="m">I</i>. Day 0 is the patch release, and <i class="m">X</i> is negative for a zero-day.</p>` +
            panel('lf-scatter', 'Exploit day against installation day <span class="gl">each dot is one case; click a dot</span>', 'Filled dots: the attacker is first. Open dots: the patch is installed first. Zero-days are the dots left of day 0. The ring marks the case shown below.') +
            panel('lf-case', 'One case <span class="gl" id="lf-casegl"></span>', 'Click another dot in the scatter to see that case. <button class="btn" id="lf-typ" style="margin-left:6px">typical case</button>') +
            panel('lf-moves', 'What moves the race? <span class="gl">chance that the attacker is first after one change at a time</span>', 'The dashed line is the setting as it stands.') +
            panel('lf-cdf', 'The two clocks <span class="gl">by day <i class="m">t</i>: the share of the cases that have an exploit, and the share that have installed the patch</span>', 'Each curve shows one clock on its own. The race itself is the scatter, because it compares <i class="m">X</i> and <i class="m">I</i> of the same case.') +
          `</div><aside>
            <div class="card" style="border-bottom:0;padding-bottom:6px"><h2>Start from a scenario <span class="gl">illustrative hypotheses, not measurements</span></h2><div class="chips" id="lf-chips"></div></div>` +
            card('lf-cx', 'var(--colA)', 'Exploit available <i class="m">X</i>', 'zero-days before the patch, n-days after it') +
            card('lf-ct', 'var(--colA)', 'Time to use the exploit <i class="m">&tau;</i>', 'short when the margin of resources over resistance is wide') +
            card('lf-ci', 'var(--colS)', 'Installation <i class="m">I</i> on this system', 'days after the patch release') +
            `<div class="card" style="color:var(--ink)"><h2><span>Shape of the installation clock</span> <span class="gl">same median in both</span></h2>
              <label class="toggle"><input type="radio" name="lf-shape" value="lognormal"> lognormal (as the efforts of lecture 2)</label>
              <label class="toggle"><input type="radio" name="lf-shape" value="exponential"> exponential (constant rate, Poisson)</label></div>` +
            card('lf-cb', 'var(--colH)', 'Base rate', 'share of vulnerabilities that ever get an exploit') +
            `<div class="card calc" style="border-bottom:0"><h2>Calculation</h2><div id="lf-calc"></div></div>
            <div class="card" style="border-bottom:0"><h2>Numbers for the timeline card <span class="gl">select and copy</span></h2><textarea id="lf-export" readonly rows="13" style="width:100%;font:12px/1.4 ui-monospace,Menlo,monospace;border:1px solid var(--rule);border-radius:6px;padding:8px;background:#fff"></textarea><button class="btn" id="lf-copy" style="margin-top:6px">Copy</button> <span id="lf-copied" class="t-muted t-small"></span></div>
          </aside></div>` +
          foot('<b>X</b>: with the zero-day share a case is a zero-day, an exploit before the patch (its timing is under &ldquo;more&rdquo;); otherwise an n-day, an exploit built after the patch, with a lognormal timing like the efforts of lecture 2. The default (median 25 days, spread 1.3) is chosen to resemble the 41 n-days of Mandiant 2023, where 12, 29, 56 and 95 % were exploited within a day, a week, a month and six months; it is not fitted to them, and the data are steeper in the first days. AI patch diffing: a smaller n-day median. <b>&tau;</b>: the time the adversary needs on this target; it is short when the margin of resources over resistance is wide (tab 1) and long when a control works. <b>Base rate</b>: most vulnerabilities never get an exploit; the race describes the ones that do.',
               'The race is mostly between <i class="m">X</i> and <i class="m">I</i>: the time to use the exploit matters only when it is long.',
               'Illustrative. n-day timing resembles Mandiant 2023 [V]; installation median 43 days: Verizon DBIR 2026 [V]. The zero-day share, the spreads and &tau; are assumptions; 0.23 % of 2026 disclosures were seen exploited (Google Threat Intelligence Group, 30 September 2026 [V]), a lower bound.');
        addParams('lf-cx', ['life.zdShare', 'life.nMed', 'life.nSigma']);
        const fold = document.createElement('details'); fold.style.marginTop = '4px';
        fold.innerHTML = '<summary class="t-muted t-small" style="cursor:pointer">more: when the zero-days come</summary><div></div>';
        $('lf-cx').querySelector('.body').appendChild(fold); addParam(fold.querySelector('div'), 'life.zdMed');
        addParams('lf-ct', ['life.tauMed']);
        addParams('lf-ci', ['life.iMed', 'life.iSigma']);
        addParams('lf-cb', ['life.base']);
        el.querySelectorAll('input[name=lf-shape]').forEach(r => r.addEventListener('change', () => { if (r.checked) { api.set('life.shape', r.value); api.render(); } }));
        $('lf-typ').addEventListener('click', () => { this.sel = null; api.render(); });
        $('lf-export').addEventListener('focus', e => e.target.select());
        $('lf-copy').addEventListener('click', () => { const t = $('lf-export'); t.focus(); t.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (_) {} $('lf-copied').textContent = ok ? 'copied' : 'select the text and copy it'; });
      },
      render() {
        const s = S().life, P = CR.life.fromFlat(s), R = CR.life.prob(P, 120);
        document.querySelectorAll('input[name=lf-shape]').forEach(r => { r.checked = r.value === s.shape; r.disabled = api.locked().has('life.shape'); });
        const D = DEFAULTS.life;
        chips('lf-chips', [
          ['Today (the race frame)', () => Object.assign(S().life, api.clone(D))],
          ['AI patch diffing: n-days 5 times sooner', () => Object.assign(S().life, api.clone(D), { nMed: D.nMed / 5 })],
          ['More zero-days: half of the cases', () => Object.assign(S().life, api.clone(D), { zdShare: 0.5 })],
          ['Installation twice as fast', () => Object.assign(S().life, api.clone(D), { iMed: D.iMed / 2 })],
          ['Installation twice as slow (more patches)', () => Object.assign(S().life, api.clone(D), { iMed: D.iMed * 2 })],
          ['A hardened target: &tau; = 30 days'.replace('&tau;', 'τ'), () => Object.assign(S().life, api.clone(D), { tauMed: 30 })],
          ['Only 0.23 % ever get an exploit', () => Object.assign(S().life, api.clone(D), { base: 0.0023 })]]);
        this.drawScatter(P, R); this.drawCase(P); this.drawMoves(P, R); this.drawCdf(P); this.drawCalc(P, s, R); $('lf-export').value = this.exportText(P, s, R);
      },
      drawScatter(P, R) {
        const host = $('lf-scatter'), N = 260, pts = CR.life.scatter(P, N), f0 = api.frame(host, 330, 46);
        const wide = f0.pw >= 560, side = Math.max(170, Math.min(wide ? f0.pw - 290 : f0.pw - 70, 290)), head = wide ? 0 : 80;
        const f = api.frame(host, side + 22 + 46 + head, 46), yb = f.T + head + side, x0 = f.L + 44;
        const lo = -60, ax = niceUp(Math.max(CR.life.quantile(P, 'i', 0.9), CR.life.quantile(P, 'x', 0.9)), [60, 100, 150, 250, 400, 600, 1000]);
        const xm = v => x0 + (v - lo) / (ax - lo) * side, ym = v => yb - v / ax * side;
        // the typical case is the dot nearest to the medians of X and I; a click on a dot selects another one
        const mX = CR.life.quantile(P, 'x', 0.5), mI = CR.life.quantile(P, 'i', 0.5);
        let typ = 0, best = Infinity; pts.forEach((p, k) => { const d = Math.hypot(p.X - mX, p.I - mI); if (d < best) { best = d; typ = k; } });
        const cur = this.sel != null && this.sel < pts.length ? this.sel : typ;
        this.cur = { k: cur, typical: this.sel == null || this.sel >= pts.length, pt: pts[cur] };
        let g = axisLine(f, xm(lo), xm(ax), yb) + '<line x1="' + xm(lo) + '" x2="' + xm(lo) + '" y1="' + ym(ax) + '" y2="' + yb + '" stroke="#8a8a8a"/>';
        const step = ax <= 100 ? 20 : ax <= 250 ? 50 : ax <= 600 ? 100 : 200;
        for (let v = 0; v <= ax; v += step) { g += tick(xm(v), yb, v); g += '<text x="' + (xm(lo) - 6) + '" y="' + (ym(v) + 4) + '" text-anchor="end" class="t-muted">' + v + '</text>'; }
        g += tick(xm(-30), yb, -30);
        g += '<text x="' + xm((lo + ax) / 2) + '" y="' + (f.H - 4) + '" text-anchor="middle" class="t-muted t-small">exploit available <tspan class="m">X</tspan>, days after the patch</text>';
        g += '<text x="' + (xm(lo) - 34) + '" y="' + (ym(ax) - 8) + '" class="t-muted t-small">installed <tspan class="m">I</tspan>, days</text>';
        g += '<path d="M' + xm(lo) + ' ' + yb + 'L' + xm(0) + ' ' + yb + 'L' + xm(ax) + ' ' + ym(ax) + 'L' + xm(lo) + ' ' + ym(ax) + 'Z" fill="var(--colA)" fill-opacity=".07"/>';
        g += '<line x1="' + xm(0) + '" y1="' + yb + '" x2="' + xm(ax) + '" y2="' + ym(ax) + '" stroke="#999" stroke-width="1.4"/><line x1="' + xm(0) + '" x2="' + xm(0) + '" y1="' + ym(ax) + '" y2="' + yb + '" stroke="#999" stroke-dasharray="4 3"/>';
        let off = 0, nfirst = 0, hit = '';
        pts.forEach((p, k) => { if (p.first) nfirst++; if (p.X > ax || p.I > ax || p.X < lo) { off++; return; }
          if (p.first) g += '<circle cx="' + xm(p.X) + '" cy="' + ym(p.I) + '" r="2.8" fill="var(--colA)" fill-opacity=".8"/>';
          else g += '<circle cx="' + xm(p.X) + '" cy="' + ym(p.I) + '" r="2.6" fill="none" stroke="var(--colS)" stroke-width="1.3"/>';
          hit += '<circle data-k="' + k + '" cx="' + xm(p.X) + '" cy="' + ym(p.I) + '" r="6" fill="transparent" style="cursor:pointer"/>'; });
        const c = pts[cur]; if (!(c.X > ax || c.I > ax || c.X < lo)) g += '<circle cx="' + xm(c.X) + '" cy="' + ym(c.I) + '" r="7" fill="none" stroke="#111" stroke-width="1.6"/>';
        g += hit;
        g += '<text x="' + (xm(ax) - 4) + '" y="' + (ym(0) - 6) + '" text-anchor="end" class="t-small" fill="var(--colS)" font-weight="700">patch first</text>';
        g += '<text x="' + (xm(lo) + 6) + '" y="' + (ym(ax) + 14) + '" class="t-small" fill="var(--colA)" font-weight="700">attacker first</text>';
        const tx = wide ? xm(ax) + 24 : x0, ty = wide ? ym(ax) + 22 : f.T + 14, dy = wide ? 28 : 22;
        g += '<text x="' + tx + '" y="' + ty + '" fill="var(--colA)" font-weight="700" font-size="14">Pr(<tspan class="m">X</tspan> + <tspan class="m">&tau;</tspan> &lt; <tspan class="m">I</tspan>) =</text>';
        if (wide) g += '<text x="' + tx + '" y="' + (ty + dy) + '" fill="var(--colA)" font-weight="700" font-size="26">' + api.pct(R.p) + '</text>';
        else g += '<text x="' + (tx + 150) + '" y="' + ty + '" fill="var(--colA)" font-weight="700" font-size="16">' + api.pct(R.p) + '</text>';
        g += '<text class="t-small t-muted" x="' + tx + '" y="' + (ty + (wide ? dy + 20 : 18)) + '">with <tspan class="m">&tau;</tspan> = 0: ' + api.pct(R.p0) + '</text>';
        g += '<text class="t-small t-muted" x="' + tx + '" y="' + (ty + (wide ? dy + 36 : 32)) + '">filled dots: ' + Math.round(100 * nfirst / N) + ' % of the ' + N + ' dots</text>';
        if (off) g += '<text class="t-small t-muted" x="' + tx + '" y="' + (ty + (wide ? dy + 52 : 46)) + '">' + off + ' dots are off the scale</text>';
        host.innerHTML = svgWrap(f, g, 'Scatter of exploit day against installation day; click a dot to see that case');
        host.onclick = e => { const t = e.target.closest ? e.target.closest('[data-k]') : null; if (t) { this.sel = +t.getAttribute('data-k'); api.render(); } };
        return pts;
      },
      drawCase(P) {
        const c = this.cur, pt = c.pt, host = $('lf-case'), f = api.frame(host, 116, 6);
        $('lf-casegl').textContent = c.typical ? 'the typical case: the dot nearest to the medians' : 'the case you clicked';
        const a = Math.min(0, pt.X) - 10, b = Math.max(pt.I, pt.X + pt.tau, 12) * 1.06 + 4;
        const step = niceUp((b - a) / 7, [5, 10, 20, 50, 100, 200, 500, 1000, 2000]), x0 = f.L + 16, xm = d => x0 + (d - a) / (b - a) * (f.pw - 32), ty = f.T + 38;
        let g = axisLine(f, xm(a), xm(b), ty);
        for (let v = Math.ceil(a / step) * step; v <= b; v += step) g += tick(xm(v), ty, v);
        g += '<line x1="' + xm(0) + '" x2="' + xm(0) + '" y1="' + (ty - 36) + '" y2="' + ty + '" stroke="#555" stroke-dasharray="5 4"/><text x="' + (xm(0) + 5) + '" y="' + (ty - 28) + '" class="t-small t-muted">patch</text>';
        g += '<line x1="' + xm(pt.X) + '" x2="' + xm(pt.X + pt.tau) + '" y1="' + ty + '" y2="' + ty + '" stroke="var(--colA)" stroke-width="7" stroke-opacity=".35" stroke-linecap="round"/>';
        const near = Math.abs(xm(pt.I) - xm(pt.X)) < 96;
        g += '<path d="M' + xm(pt.X) + ' ' + (ty - 7) + 'L' + (xm(pt.X) + 7) + ' ' + ty + 'L' + xm(pt.X) + ' ' + (ty + 7) + 'L' + (xm(pt.X) - 7) + ' ' + ty + 'Z" fill="var(--colA)"/>';
        g += '<text x="' + xm(pt.X) + '" y="' + (ty - 13) + '" text-anchor="middle" class="t-small" fill="var(--colA)" font-weight="700"><tspan class="m">X</tspan> = ' + dnum(pt.X) + ' days' + (pt.zero ? ' (zero-day)' : '') + '</text>';
        g += '<circle cx="' + xm(pt.I) + '" cy="' + ty + '" r="5.5" fill="var(--colS)"/>';
        g += '<text x="' + xm(pt.I) + '" y="' + (ty - (near ? 27 : 13)) + '" text-anchor="middle" class="t-small" fill="var(--colS)" font-weight="700"><tspan class="m">I</tspan> = ' + dnum(pt.I) + ' days</text>';
        if (pt.I > pt.X) {
          const x1 = xm(pt.X), x2 = xm(pt.I), yb = ty + 32;
          g += '<path d="M' + x1 + ' ' + (yb - 5) + 'L' + x1 + ' ' + yb + 'L' + x2 + ' ' + yb + 'L' + x2 + ' ' + (yb - 5) + '" fill="none" stroke="var(--colH)" stroke-width="1.6"/>';
          g += '<text x="' + ((x1 + x2) / 2) + '" y="' + (yb + 15) + '" text-anchor="middle" class="t-small" fill="var(--colH)" font-weight="700"><tspan class="m">W</tspan> = <tspan class="m">I</tspan> &minus; <tspan class="m">X</tspan> = ' + dnum(pt.I - pt.X) + ' days</text>';
        } else g += '<text x="' + ((xm(pt.X) + xm(pt.I)) / 2) + '" y="' + (ty + 47) + '" text-anchor="middle" class="t-small t-muted">no window: the patch is installed before an exploit exists</text>';
        const first = pt.first;
        g += '<text x="' + (f.W - f.R) + '" y="' + (f.T - 6) + '" text-anchor="end" class="t-small" fill="var(' + (first ? '--colA' : '--colS') + ')" font-weight="700">' + (first ? 'attacker first' : 'patch first') + ': <tspan class="m">X</tspan> + <tspan class="m">&tau;</tspan> = ' + dnum(pt.X + pt.tau) + (first ? ' &lt; ' : ' &ge; ') + dnum(pt.I) + '</text>';
        host.innerHTML = svgWrap(f, g, 'One case on the lifecycle: exploit day, time to use it, installation day and window');
      },
      drawMoves(P, R) {
        const host = $('lf-moves'), f = api.frame(host, 168, 30), xl = 232, base = 1;
        const rows = [
          ['n-days 5 times sooner (AI diffing)', { nMed: P.nMed / 5 }, 'var(--colA)'],
          ['zero-day share doubled', { w0: Math.min(1, P.w0 * 2) }, 'var(--colA)'],
          ['installation twice as fast', { i: { med: Math.max(1, P.i.med / 2) } }, 'var(--colS)'],
          ['installation twice as slow', { i: { med: P.i.med * 2 } }, 'var(--colS)'],
          ['time to use the exploit 3 times longer', { tauMed: P.tauMed * 3 }, 'var(--colH)']];
        const vals = rows.map(r => CR.life.prob(CR.life.with(P, r[1]), 90).p);
        const xm = p => f.L + xl + p * (f.pw - xl - 52), rh = (f.ph) / rows.length;
        let g = '';
        [0, 0.5, 1].forEach(p => g += '<line x1="' + xm(p) + '" x2="' + xm(p) + '" y1="' + f.T + '" y2="' + (f.T + f.ph) + '" stroke="#E6E6E2"/><text x="' + xm(p) + '" y="' + (f.H - 8) + '" text-anchor="middle" class="t-muted t-small">' + Math.round(100 * p) + ' %</text>');
        rows.forEach((r, k) => { const y = f.T + k * rh + rh / 2;
          g += '<text x="' + (f.L + xl - 8) + '" y="' + (y + 4) + '" text-anchor="end" class="t-small">' + r[0] + '</text>';
          g += '<rect x="' + xm(0) + '" y="' + (y - 7) + '" width="' + Math.max(1, xm(vals[k]) - xm(0)) + '" height="14" fill="' + r[2] + '" fill-opacity=".75"/>';
          g += '<text x="' + (xm(vals[k]) + 6) + '" y="' + (y + 4) + '" class="t-small" font-weight="700">' + api.pct(vals[k]) + '</text>'; });
        g += '<line x1="' + xm(R.p) + '" x2="' + xm(R.p) + '" y1="' + (f.T - 4) + '" y2="' + (f.T + f.ph + 2) + '" stroke="#333" stroke-dasharray="5 4" stroke-width="1.5"/><text x="' + xm(R.p) + '" y="' + (f.T - 7) + '" text-anchor="middle" class="t-small" font-weight="700">as set: ' + api.pct(R.p) + '</text>';
        host.innerHTML = svgWrap(f, g, 'Chance that the attacker is first after one change at a time');
      },
      drawCdf(P) {
        const host = $('lf-cdf'), f = api.frame(host, 176, 44), lo = -60, ml = 34;
        const hi = niceUp(Math.max(CR.life.quantile(P, 'i', 0.9), CR.life.quantile(P, 'x', 0.9)) * 1.4, [100, 150, 200, 250, 400, 600]);
        const xm = d => f.L + ml + (d - lo) / (hi - lo) * (f.pw - ml), yb = f.T + f.ph, ym = v => yb - v * f.ph;
        const xs = api.linspace(lo, hi, 360);
        let g = '';
        [0, 0.5, 1].forEach(v => g += '<line x1="' + xm(lo) + '" x2="' + xm(hi) + '" y1="' + ym(v) + '" y2="' + ym(v) + '" stroke="#E6E6E2"/><text x="' + (xm(lo) - 6) + '" y="' + (ym(v) + 4) + '" text-anchor="end" class="t-muted t-small">' + Math.round(100 * v) + ' %</text>');
        g += axisLine(f, xm(lo), xm(hi), yb);
        [-60, -30, 0, 50, 100, 150, 200, 250, 400, 600].filter(d => d >= lo && d <= hi).forEach(d => g += tick(xm(d), yb, d));
        g += '<text x="' + xm((lo + hi) / 2) + '" y="' + (f.H - 4) + '" text-anchor="middle" class="t-muted t-small">days after the patch release (0 = patch released)</text>';
        g += '<line x1="' + xm(0) + '" x2="' + xm(0) + '" y1="' + (f.T - 4) + '" y2="' + yb + '" stroke="#555" stroke-dasharray="5 4"/><text x="' + (xm(0) + 5) + '" y="' + (f.T + 4) + '" class="t-small t-muted">patch</text>';
        const line = (fn, color, dash) => '<path d="' + api.path(f, xs, fn, xm, 1, false) + '" fill="none" stroke="' + color + '" stroke-width="2.4"' + (dash ? ' stroke-dasharray="6 4"' : '') + '/>';
        g += line(d => CR.life.iCdf(P, d), 'var(--colS)', true) + line(d => CR.life.xCdf(P, d), 'var(--colA)', false);
        const lx = xm(hi) - 6;
        g += '<line x1="' + (lx - 230) + '" x2="' + (lx - 204) + '" y1="' + (f.T + 40) + '" y2="' + (f.T + 40) + '" stroke="var(--colA)" stroke-width="3"/><text x="' + (lx - 198) + '" y="' + (f.T + 44) + '" class="t-small" fill="var(--colA)">share with an exploit by day <tspan class="m">t</tspan> (<tspan class="m">X</tspan> &le; <tspan class="m">t</tspan>)</text>';
        g += '<line x1="' + (lx - 230) + '" x2="' + (lx - 204) + '" y1="' + (f.T + 58) + '" y2="' + (f.T + 58) + '" stroke="var(--colS)" stroke-width="3" stroke-dasharray="6 4"/><text x="' + (lx - 198) + '" y="' + (f.T + 62) + '" class="t-small" fill="var(--colS)">share patched by day <tspan class="m">t</tspan> (<tspan class="m">I</tspan> &le; <tspan class="m">t</tspan>)</text>';
        host.innerHTML = svgWrap(f, g, 'Share of the cases with an exploit and share patched, by day');
      },
      drawCalc(P, s, R) {
        const expo = P.shape === 'exponential', D = DEFAULTS.life, sooner = s.nMed < D.nMed * 0.999 ? ' (' + api.num(D.nMed / s.nMed) + ' times sooner than today)' : '';
        let h = calcLine('EXPLOIT DAY <i>X</i>', 'zero-day share ' + api.pct(P.w0) + ' (median ' + days(s.zdMed) + ' days before the patch); n-days: lognormal, median ' + days(s.nMed) + ' days after the patch' + sooner + ', spread &sigma; = ' + api.f2(s.nSigma) + '. Median <i>X</i> = <b>' + days(CR.life.quantile(P, 'x', 0.5)) + ' days</b>');
        h += calcLine('INSTALLATION <i>I</i>', (expo ? 'exponential' : 'lognormal') + ', median ' + days(s.iMed) + ' days' + (expo ? '' : ', spread &sigma; = ' + api.f2(s.iSigma)));
        h += calcLine('TIME TO USE THE EXPLOIT <i>&tau;</i>', 'exponential, median <b>' + dayW(s.tauMed) + '</b>: Pr(&tau; &lt; <i>W</i>) = 1 &minus; e<sup>&minus;<i>W</i> ln 2 / ' + days(s.tauMed) + '</sup>');
        h += calcLine('THE ATTACKER IS FIRST', '<span class="big" style="color:var(--colA)">Pr(<i>X</i> + &tau; &lt; <i>I</i>) = ' + api.pct(R.p) + '</span>; with &tau; = 0 it would be ' + api.pct(R.p0), false);
        h += '<div class="line" style="border:0"><span class="what">PER 10 000 DISCLOSED VULNERABILITIES</span><span class="eq" style="font-size:13px">If a share <b>' + api.pct(s.base) + '</b> ever gets an exploit: 10 000 &times; ' + api.num(s.base) + ' &times; ' + api.pct(R.p) + ' = <b>' + (R.per10k >= 10 ? Math.round(R.per10k).toLocaleString('en') : api.num(R.per10k)) + '</b> cases in which the attacker is first.</span></div>';
        $('lf-calc').innerHTML = h;
      },
      exportText(P, s, R) {
        const q = (w, u) => CR.life.quantile(P, w, u), r0 = x => Math.abs(x) >= 100 ? String(Math.round(x)) : api.num(x), rng = w => r0(q(w, 0.1)) + ' to ' + r0(q(w, 0.9));
        const pr = ch => api.pct(CR.life.prob(CR.life.with(P, ch), 90).p).replace(/\s*%/, '').padStart(4) + ' %', D = DEFAULTS.life;
        return ['TIMELINE CARD, numbers from the lifecycle race (illustrative unless you replace them with sourced values)',
          'exploit available X: zero-day share ' + api.pct(P.w0) + '; n-days lognormal, median ' + r0(s.nMed) + ' days after the patch' + (s.nMed < D.nMed * 0.999 ? ' (' + api.num(D.nMed / s.nMed) + ' times sooner than today)' : '') + '; median X ' + r0(q('x', 0.5)) + ' days (10 to 90 %: ' + rng('x') + ')',
          'installation I: ' + s.shape + ', median ' + r0(s.iMed) + ' days (10 to 90 %: ' + rng('i') + ')',
          'time to use the exploit tau: exponential, median ' + r0(s.tauMed) + (s.tauMed === 1 ? ' day' : ' days'),
          'exposure window W: mean ' + r0(R.meanW) + ' days; no window in ' + api.pct(R.noWindow),
          'Pr(attacker first) = ' + api.pct(R.p) + ' (with tau = 0: ' + api.pct(R.p0) + ')',
          'what-if, same settings except:',
          '  n-days 5 times sooner              ' + pr({ nMed: P.nMed / 5 }),
          '  zero-day share doubled             ' + pr({ w0: Math.min(1, P.w0 * 2) }),
          '  installation twice as fast         ' + pr({ i: { med: Math.max(1, P.i.med / 2) } }),
          '  installation twice as slow         ' + pr({ i: { med: P.i.med * 2 } }),
          '  time to use the exploit x3         ' + pr({ tauMed: P.tauMed * 3 })].join('\n');
      }
    };

    /* ===================================================================================================
       TAB 4: SEARCH
       =================================================================================================== */
    modules.search = {
      key: 'search', title: 'Search',
      mount(el) {
        el.innerHTML =
          '<div class="grid"><div>' +
            '<p class="lede" style="margin-bottom:14px">A target (a flaw, a key, a path out) hides among <i class="m">M</i> candidates and the attacker makes <i class="m">N</i> attempts. How many attempts are needed depends on <i>how</i> they are chosen, not only on how many there are.</p>' +
            panel('se-plot', 'Probability of having found the target <span class="gl">after <i class="m">N</i> attempts (log axis)</span>', 'Independent draws may repeat a candidate; systematic search never does; guided search tries the likeliest candidates first. If the prior is right, the first <i class="m">N</i> candidates hold the share (<i class="m">N</i>/<i class="m">M</i>)<sup><i class="m">k</i></sup> of the probability.') +
            panel('se-runs', 'Parallel runs <span class="gl">chance that at least one of <i class="m">n</i> runs of an agent finds the flaw (log axis)</span>', 'Partitioned: each run covers a new slice. Independent: a run may repeat another. Repeating: the runs share prior and method, so they fail on the same targets and the curve stops at the share <i class="m">Q</i> of reachable targets.') +
          '</div><aside>' +
            '<div class="card" style="border-bottom:0;padding-bottom:6px"><h2>Start from a case <span class="gl">illustrative</span></h2><div class="chips" id="se-chips"></div></div>' +
            card('se-c1', 'var(--colA)', 'Attacker: attempts', 'throughput of the search') +
            card('se-c3', 'var(--colA)', 'Parallel runs of an agent', 'one run succeeds with probability <i class="m">p</i>; a share <i class="m">Q</i> of the targets is reachable') +
            card('se-c2', 'var(--colH)', 'Knowledge: the prior', '<i class="m">k</i> &lt; 1: the target is likelier among the first candidates') +
            '<div class="card calc" style="border-bottom:0"><h2>Calculation</h2><div id="se-calc"></div></div>' +
          '</aside></div>' +
          foot('<b>Prior</b>: the probability we give each candidate before the first attempt. A heuristic is knowledge: a patch that points to a few functions, a password list, coverage feedback. <i class="m">k</i> = 1 means no knowledge; <i class="m">k</i> &gt; 1 is a prior that misleads and is worse than none.',
               'Throughput buys attempts; knowledge decides how many of them are useful.',
               'Illustrative. Independent draws: 1 &minus; (1 &minus; 1/<i class="m">M</i>)<sup><i class="m">N</i></sup> &asymp; 1 &minus; e<sup>&minus;<i class="m">N</i>/<i class="m">M</i></sup>, the Poisson form of lecture 2 with rate (attempts per day)/<i class="m">M</i>. The guided curve is the family used in the containment deck (right prior, none, wrong prior), a stylised choice, not a fitted model.');
        addParams('se-c1', ['search.M', 'search.rate', 'search.days']);
        addParams('se-c2', ['search.k']);
        addParams('se-c3', ['search.rp', 'search.rq', 'search.rn']);
        const d = document.createElement('p'); d.className = 'derived'; d.id = 'se-N'; d.style.margin = '2px 0 0 0'; $('se-c1').querySelector('.body').appendChild(d);
      },
      render() {
        const s = S().search, N = s.rate * s.days, M = s.M;
        $('se-N').innerHTML = '<i class="m">N</i> = ' + days(s.rate) + ' &times; ' + days(s.days) + ' = <b>' + big(N) + ' attempts</b> in the window';
        chips('se-chips', [
          ['No knowledge (k = 1)', () => { S().search.k = 1; }], ['A patch points to a few places (k = 0.3)', () => { S().search.k = 0.3; }], ['A misleading prior (k = 3)', () => { S().search.k = 3; }],
          ['Ten times more attempts per day', () => { S().search.rate = Math.min(1e6, S().search.rate * 10); }]]);
        const host = $('se-plot'), f = api.frame(host, 290, 44), xl = 42, lx0 = 0, lx1 = Math.log10(10 * M);
        const xm = n => f.L + xl + (Math.log10(Math.max(n, 1)) - lx0) / (lx1 - lx0) * (f.pw - xl - 10), ym = p => f.T + f.ph * (1 - p), yb = f.T + f.ph;
        const xs = api.linspace(lx0, lx1, 240).map(v => Math.pow(10, v));
        let g = '';
        [0, 0.5, 0.9, 1].forEach(p => g += '<line x1="' + (f.L + xl) + '" x2="' + (f.W - f.R) + '" y1="' + ym(p) + '" y2="' + ym(p) + '" stroke="' + (p === 0.5 ? '#999' : '#E6E6E2') + '" ' + (p === 0.5 ? 'stroke-dasharray="4 3"' : '') + '/><text x="' + (f.L + xl - 6) + '" y="' + (ym(p) + 4) + '" text-anchor="end" class="t-muted t-small">' + Math.round(p * 100) + ' %</text>');
        g += axisLine(f, f.L + xl, f.W - f.R, yb);
        const SUP = ['', '', '', '', '\u2074', '\u2075', '\u2076', '\u2077', '\u2078'];
        for (let e = 0; e <= lx1 + 1e-9; e++) g += tick(xm(Math.pow(10, e)), yb, e === 0 ? '1' : e <= 3 ? Math.pow(10, e) : '10' + (SUP[e] || '^' + e));
        g += '<text x="' + (f.W / 2 + xl / 2) + '" y="' + (f.H - 4) + '" text-anchor="middle" class="t-muted t-small">attempts <tspan class="m">N</tspan> (log scale)</text>';
        g += '<line x1="' + xm(M) + '" x2="' + xm(M) + '" y1="' + f.T + '" y2="' + yb + '" stroke="#bbb" stroke-dasharray="2 3"/><text x="' + (xm(M) - 4) + '" y="' + (f.T + 10) + '" text-anchor="end" class="t-muted t-small">N = M: every candidate tried</text>';
        const path = fn => '<path d="' + xs.map((n, i) => (i ? 'L' : 'M') + xm(n).toFixed(1) + ' ' + ym(fn(n)).toFixed(1)).join('') + '" fill="none" ';
        g += path(n => CR.search.indep(n, M)) + 'stroke="var(--colS)" stroke-width="2.4" stroke-dasharray="6 4"/>';
        g += path(n => CR.search.syst(n, M)) + 'stroke="var(--colA)" stroke-width="2.4"/>';
        g += path(n => CR.search.guided(n, M, s.k)) + 'stroke="var(--colE)" stroke-width="3.2"/>';
        const pi = CR.search.indep(N, M), ps = CR.search.syst(N, M), pg = CR.search.guided(N, M, s.k);
        g += '<line x1="' + xm(N) + '" x2="' + xm(N) + '" y1="' + f.T + '" y2="' + yb + '" stroke="#555" stroke-dasharray="5 4"/>';
        [[pi, 'var(--colS)'], [ps, 'var(--colA)'], [pg, 'var(--colE)']].forEach(([p, c]) => g += '<circle cx="' + xm(N) + '" cy="' + ym(p) + '" r="5.5" fill="' + c + '" stroke="#fff" stroke-width="2"/>');
        // legend
        [['independent draws', 'var(--colS)', '6 4'], ['systematic, each candidate once', 'var(--colA)', ''], ['guided by a prior, k = ' + api.f2(s.k), 'var(--colE)', '']].forEach(([t, c, d], i) => {
          const y = f.T + 14 + i * 16; g += '<line x1="' + (f.L + xl + 10) + '" x2="' + (f.L + xl + 36) + '" y1="' + y + '" y2="' + y + '" stroke="' + c + '" stroke-width="3"' + (d ? ' stroke-dasharray="' + d + '"' : '') + '/><text x="' + (f.L + xl + 42) + '" y="' + (y + 4) + '" class="t-small">' + t + '</text>'; });
        host.innerHTML = svgWrap(f, g, 'Probability of finding the target against the number of attempts');
        const need = q => CR.search.need(q, M, s.k), n5 = need(0.5), n9 = need(0.9), perDay = x => days(x / s.rate);
        $('se-calc').innerHTML =
          calcLine('ATTEMPTS IN THE WINDOW', '<i>N</i> = attempts per day &times; days = ' + days(s.rate) + ' &times; ' + days(s.days) + ' = <span class="res">' + big(N) + '</span> out of <i>M</i> = ' + big(M) + ' candidates (<i>N</i>/<i>M</i> = ' + api.pct(N / M) + ')') +
          calcLine('INDEPENDENT DRAWS', '1 &minus; (1 &minus; 1/<i>M</i>)<sup><i>N</i></sup> = <span class="res">' + api.pct(pi) + '</span> &nbsp; <span class="gl">(Poisson: 1 &minus; e<sup>&minus;<i>N</i>/<i>M</i></sup>)</span>') +
          calcLine('SYSTEMATIC', '<i>N</i>/<i>M</i> = <span class="res">' + api.pct(ps) + '</span>') +
          calcLine('GUIDED BY THE PRIOR', '(<i>N</i>/<i>M</i>)<sup><i>k</i></sup> = (' + api.num(Math.min(1, N / M)) + ')<sup>' + api.f2(s.k) + '</sup> = <span class="res">' + api.pct(pg) + '</span>') +
          '<div class="line" style="border:0"><span class="what">TIME TO REACH 50 % / 90 % (days at this rate)</span><span class="eq" style="font-size:13px">independent ' + perDay(n5.indep) + ' / ' + perDay(n9.indep) + '; systematic ' + perDay(n5.syst) + ' / ' + perDay(n9.syst) + '; guided ' + perDay(n5.guided) + ' / ' + perDay(n9.guided) + '</span></div>';
        this.drawRuns(s);
      },
      drawRuns(s) {
        const host = $('se-runs'), f = api.frame(host, 236, 44), xl = 42, lx1 = 4, p = s.rp, Q = Math.max(s.rq, p), n = Math.round(s.rn);
        const xm = v => f.L + xl + Math.log10(Math.max(v, 1)) / lx1 * (f.pw - xl - 10), ym = v => f.T + f.ph * (1 - v), yb = f.T + f.ph;
        const xs = api.linspace(0, lx1, 240).map(v => Math.pow(10, v));
        let g = '';
        [0, 0.5, 1].forEach(v => g += '<line x1="' + (f.L + xl) + '" x2="' + (f.W - f.R) + '" y1="' + ym(v) + '" y2="' + ym(v) + '" stroke="' + (v === 0.5 ? '#999' : '#E6E6E2') + '" ' + (v === 0.5 ? 'stroke-dasharray="4 3"' : '') + '/><text x="' + (f.L + xl - 6) + '" y="' + (ym(v) + 4) + '" text-anchor="end" class="t-muted">' + Math.round(100 * v) + ' %</text>');
        g += axisLine(f, f.L + xl, f.W - f.R, yb);
        [1, 10, 100, 1000, 10000].forEach(v => g += tick(xm(v), yb, v === 10000 ? '10 000' : v));
        g += '<text x="' + (f.W / 2 + xl / 2) + '" y="' + (f.H - 4) + '" text-anchor="middle" class="t-muted t-small">parallel runs <tspan class="m">n</tspan> (log scale)</text>';
        g += '<line x1="' + (f.L + xl) + '" x2="' + (f.W - f.R) + '" y1="' + ym(Q) + '" y2="' + ym(Q) + '" stroke="var(--colH)" stroke-dasharray="2 3"/><text x="' + (f.W - f.R - 4) + '" y="' + (ym(Q) - 5) + '" text-anchor="end" class="t-small" fill="var(--colH)"><tspan class="m">Q</tspan> = ' + api.pct(Q) + ' of the targets are reachable</text>';
        const path = fn => '<path d="' + xs.map((v, i) => (i ? 'L' : 'M') + xm(v).toFixed(1) + ' ' + ym(fn(v)).toFixed(1)).join('') + '" fill="none" ';
        g += path(v => CR.runs.indep(v, p)) + 'stroke="var(--colS)" stroke-width="2.4" stroke-dasharray="6 4"/>';
        g += path(v => CR.runs.part(v, p)) + 'stroke="var(--colA)" stroke-width="2.4"/>';
        g += path(v => CR.runs.rep(v, p, Q)) + 'stroke="var(--colH)" stroke-width="3.2"/>';
        const vals = [[CR.runs.part(n, p), 'var(--colA)'], [CR.runs.indep(n, p), 'var(--colS)'], [CR.runs.rep(n, p, Q), 'var(--colH)']];
        g += '<line x1="' + xm(n) + '" x2="' + xm(n) + '" y1="' + f.T + '" y2="' + yb + '" stroke="#555" stroke-dasharray="5 4"/>';
        vals.forEach(([v, c]) => g += '<circle cx="' + xm(n) + '" cy="' + ym(v) + '" r="5.5" fill="' + c + '" stroke="#fff" stroke-width="2"/>');
        [['partitioned: ' + api.pct(vals[0][0]), 'var(--colA)', ''], ['independent: ' + api.pct(vals[1][0]), 'var(--colS)', '6 4'], ['repeating each other: ' + api.pct(vals[2][0]), 'var(--colH)', '']].forEach(([t, c, d], i) => {
          const y = f.T + 14 + i * 16; g += '<line x1="' + (f.L + xl + 10) + '" x2="' + (f.L + xl + 36) + '" y1="' + y + '" y2="' + y + '" stroke="' + c + '" stroke-width="3"' + (d ? ' stroke-dasharray="' + d + '"' : '') + '/><text x="' + (f.L + xl + 42) + '" y="' + (y + 4) + '" class="t-small">' + t + ' at <tspan class="m">n</tspan> = ' + int(n) + '</text>'; });
        host.innerHTML = svgWrap(f, g, 'Chance that at least one of n parallel runs finds the flaw');
      }
    };

    /* ===================================================================================================
       TAB 5: BACKLOG
       =================================================================================================== */
    modules.backlog = {
      key: 'queue', title: 'Backlog',
      mount(el) {
        el.innerHTML =
          '<div class="grid"><div>' +
            '<p class="lede" style="margin-bottom:14px">Finding, fixing and installing are stages in series. A stage that receives more than its capacity builds a backlog, and the backlog is time: it lengthens the fix time <i class="m">F</i> and the installation time <i class="m">I</i> even if nobody works slower.</p>' +
            panel('bq-plot', 'Backlog in front of each stage <span class="gl">vulnerabilities waiting, by week</span>') +
            panel('bq-bars', 'Rates and capacities <span class="gl">per week; the useful throughput is the smallest</span>') +
          '</div><aside>' +
            '<div class="card" style="border-bottom:0;padding-bottom:6px"><h2>Start from a case <span class="gl">illustrative</span></h2><div class="chips" id="bq-chips"></div></div>' +
            card('bq-c1', 'var(--colA)', 'Finding', 'verified findings per week; AI raises them from a week on') +
            card('bq-c2', 'var(--colS)', 'Capacity of the defenders', 'what can be fixed and installed per week') +
            '<div class="card calc" style="border-bottom:0"><h2>Calculation</h2><div id="bq-calc"></div></div>' +
          '</aside></div>' +
          foot('<b>Backlog</b> = what waits in front of a stage; <b>capacity</b> = what a stage can process per week. The waiting time added by a queue is roughly backlog / capacity (Little). Different from the minimum over attack <i>paths</i>: here the minimum is over <i>stages in series</i>, and the weakest stage limits the whole pipeline.',
               'Faster finding moves the queue, not the risk: useful throughput is limited by the smallest of finding, fixing and installing.',
               'Illustrative rates, a weekly fluid model without randomness; no data are implied. Installation capacity stands for the patches this organisation can test and deploy per week.');
        addParams('bq-c1', ['queue.a0', 'queue.mult', 'queue.week']);
        addParams('bq-c2', ['queue.cF', 'queue.cI']);
      },
      render() {
        const Q = S().queue, r = CR.queue.sim(Q, 52);
        chips('bq-chips', [['Before AI (no increase)', () => { S().queue.mult = 1; }], ['Finding ×3 from week 12', () => Object.assign(S().queue, { mult: 3, week: 12 })],
          ['Fix capacity raised to 30', () => { S().queue.cF = 30; }], ['Fix and install both at 30', () => Object.assign(S().queue, { cF: 30, cI: 30 })]]);
        const host = $('bq-plot'), f = api.frame(host, 250, 44), xl = 46;
        const ymaxv = Math.max(10, ...r.BF, ...r.BI), ymax = niceUp(ymaxv * 1.08, [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000]);
        const xm = t => f.L + xl + t / 52 * (f.pw - xl - 10), ym = v => f.T + f.ph * (1 - v / ymax), yb = f.T + f.ph;
        let g = '';
        [0, 0.5, 1].forEach(p => g += '<line x1="' + (f.L + xl) + '" x2="' + (f.W - f.R) + '" y1="' + ym(p * ymax) + '" y2="' + ym(p * ymax) + '" stroke="#E6E6E2"/><text x="' + (f.L + xl - 6) + '" y="' + (ym(p * ymax) + 4) + '" text-anchor="end" class="t-muted t-small">' + int(p * ymax) + '</text>');
        g += axisLine(f, f.L + xl, f.W - f.R, yb);
        [0, 13, 26, 39, 52].forEach(t => g += tick(xm(t), yb, t));
        g += '<text x="' + (f.W / 2 + xl / 2) + '" y="' + (f.H - 4) + '" text-anchor="middle" class="t-muted t-small">week</text>';
        g += '<line x1="' + xm(Q.week) + '" x2="' + xm(Q.week) + '" y1="' + f.T + '" y2="' + yb + '" stroke="#999" stroke-dasharray="4 3"/><text x="' + (xm(Q.week) + 4) + '" y="' + (f.T + 10) + '" class="t-muted t-small">AI finding from week ' + Q.week + '</text>';
        const line = (arr, c, d) => '<path d="M' + xm(0) + ' ' + ym(0) + arr.map((v, i) => 'L' + xm(i + 1).toFixed(1) + ' ' + ym(v).toFixed(1)).join('') + '" fill="none" stroke="' + c + '" stroke-width="2.6"' + (d ? ' stroke-dasharray="6 4"' : '') + '/>';
        g += line(r.BF, 'var(--colA)', false) + line(r.BI, 'var(--colS)', true);
        g += '<text class="lbl" x="' + (xm(52) - 4) + '" y="' + (ym(r.BF[51]) - 7) + '" text-anchor="end" fill="var(--colA)" font-weight="700">in front of fixing: ' + int(r.BF[51]) + '</text>';
        g += '<text class="lbl" x="' + (xm(52) - 4) + '" y="' + (ym(r.BI[51]) - 7 + (Math.abs(ym(r.BF[51]) - ym(r.BI[51])) < 16 ? 22 : 0)) + '" text-anchor="end" fill="var(--colS)" font-weight="700">in front of installing: ' + int(r.BI[51]) + '</text>';
        host.innerHTML = svgWrap(f, g, 'Backlog in front of the fix stage and the install stage by week');
        // bars
        const hb = $('bq-bars'), fb = api.frame(hb, 150, 8), a1 = Q.a0 * Q.mult;
        const rows = [['finding before', Q.a0, 'var(--colA)'], ['finding with AI', a1, 'var(--colA)'], ['fixing capacity', Q.cF, 'var(--colS)'], ['installing capacity', Q.cI, 'var(--colS)'], ['useful throughput', r.steady, 'var(--colE)']];
        const vm = Math.max(...rows.map(x => x[1]), 1) * 1.1, lw = 130, bx = fb.L + lw, bw = fb.pw - lw - 50;
        let gb = '';
        rows.forEach(([n, v, c], i) => { const y = 8 + i * 27; gb += '<text x="' + (bx - 8) + '" y="' + (y + 14) + '" text-anchor="end" class="t-small">' + n + '</text><rect x="' + bx + '" y="' + y + '" width="' + (v / vm * bw) + '" height="19" fill="' + c + '" fill-opacity="' + (i === 4 ? .9 : .55) + '"/><text x="' + (bx + v / vm * bw + 6) + '" y="' + (y + 14) + '" class="t-small" font-weight="600">' + api.num(v) + '</text>'; });
        hb.innerHTML = svgWrap({ W: fb.W, H: 150 }, gb, 'Bars of the finding rate and the capacities');
        const dayF = r.waitF * 7, dayI = r.waitI * 7;
        $('bq-calc').innerHTML =
          calcLine('FINDING WITH AI', '<i>a</i> = ' + days(Q.a0) + ' &times; ' + api.num(Q.mult) + ' = <span class="res">' + days(a1) + '</span> per week from week ' + Q.week) +
          calcLine('USEFUL THROUGHPUT (steady state)', 'min(finding ' + days(a1) + ', fixing ' + days(Q.cF) + ', installing ' + days(Q.cI) + ') = <span class="res">' + days(r.steady) + '</span> per week; the limiting stage is <span class="res">' + (r.bottleneck === 'none' ? 'none: capacity is enough' : r.bottleneck) + '</span>') +
          calcLine('BACKLOG AFTER 52 WEEKS', 'in front of fixing <span class="res">' + int(r.BF[51]) + '</span>, in front of installing <span class="res">' + int(r.BI[51]) + '</span>') +
          '<div class="line" style="border:0"><span class="what">TIME ADDED BY THE QUEUES (backlog / capacity)</span><span class="eq">to the fix time <i>F</i>: <span class="res">' + (dayF >= 1 ? int(dayF) + ' days' : 'none') + '</span>; to the installation time <i>I</i>: <span class="res">' + (dayI >= 1 ? int(dayI) + ' days' : 'none') + '</span></span></div>';
      }
    };

    /* ===================================================================================================
       TAB 6: PRIORITISE
       =================================================================================================== */
    const VULN = [
      { id: 'V1', cvss: 9.8, text: 'Remote code execution on an internal test server; not reachable from the internet.' },
      { id: 'V2', cvss: 7.5, text: 'Flaw in the mail server, on the known-exploited list.' },
      { id: 'V3', cvss: 5.3, text: 'Information disclosure on the server that holds the research data.' }];
    modules.prioritise = {
      key: 'prio', title: 'Prioritise',
      mount(el) {
        el.innerHTML =
          '<div class="grid"><div>' +
            '<p class="lede" style="margin-bottom:14px">Capacity is limited, so something is fixed first. The severity score says how bad a flaw is in general; the expected loss <i class="m">&pi;L</i> adds how likely an exploit is in the period and what it would cost here. Every input is an estimate: change one and see whether the order changes.</p>' +
            '<div class="panel"><h2>Three vulnerabilities <span class="gl">ranked three ways</span></h2><div id="pr-table"></div></div>' +
            panel('pr-plot', 'Does the order depend on <i class="m">&pi;</i><sub>3</sub>? <span class="gl">expected loss of each vulnerability as the exploit probability of V3 changes</span>') +
          '</div><aside>' +
            '<div class="card" style="border-bottom:0;padding-bottom:6px"><h2>Start from a case <span class="gl">the course case, illustrative</span></h2><div class="chips" id="pr-chips"></div></div>' +
            VULN.map((v, i) => card('pr-c' + (i + 1), ['var(--colS)', 'var(--colA)', 'var(--colH)'][i], v.id + ' <span class="gl">CVSS ' + v.cvss + '</span>', v.text)).join('') +
            card('pr-cc', 'var(--ink)', 'Capacity this week', 'person-days available for fixing') +
            '<div class="card calc" style="border-bottom:0"><h2>Calculation</h2><div id="pr-calc"></div></div>' +
          '</aside></div>' +
          foot('<b>Expected loss</b> <i class="m">&pi;L</i>: the probability that the vulnerability is exploited in the stated period times the loss if it is. <b>Evidence</b> (known exploited, reachable from outside) bears on <i class="m">&pi;</i>; it does not give a formula for it. The best set is the one that removes the most expected loss within the capacity.',
               'The score says how bad the flaw is, not how likely an attack is or what it costs us: find the input that could flip the order.',
               'Illustrative numbers of the course case. Expected loss is one decision model, not the universal criterion; the period must be stated (the lecture uses one quarter). CVSS is the severity score of FIRST, a 0 to 10 scale.');
        VULN.forEach((v, i) => addParams('pr-c' + (i + 1), ['prio.pi' + (i + 1), 'prio.L' + (i + 1), 'prio.e' + (i + 1)]));
        addParams('pr-cc', ['prio.cap']);
      },
      render() {
        const s = S().prio, items = CR.prio.items(s), o = CR.prio(items, s.cap);
        chips('pr-chips', [['Course case', () => Object.assign(S().prio, api.clone(DEFAULTS.prio))], ['V3 less likely (π = 0.15)', () => { S().prio.pi3 = 0.15; }], ['V1 turns out reachable (π = 0.5)', () => { S().prio.pi1 = 0.5; }]]);
        const rk = (arr, i) => arr.indexOf(i) + 1, emax = Math.max(...o.E, 1e-9);
        let t = '<table style="border-collapse:collapse;width:100%;font-size:13px"><tr style="text-align:left;color:var(--secondary);font-size:11px;letter-spacing:.03em"><th></th><th>CVSS</th><th>rank by<br>severity</th><th>expected loss <i class="m">&pi;L</i> (MSEK)</th><th>rank by<br>loss</th><th>loss per<br>person-day</th><th>patch this week</th></tr>';
        items.forEach((v, i) => { const inSet = o.best.set.includes(i), col = ['var(--colS)', 'var(--colA)', 'var(--colH)'][i];
          t += '<tr style="border-top:1px solid var(--rule)"><td style="padding:8px 6px 8px 0;font-weight:700;color:' + col + '">' + VULN[i].id + '</td><td>' + v.cvss + '</td><td style="text-align:center">' + rk(o.bySeverity, i) + '</td>' +
               '<td style="min-width:200px"><div style="display:flex;align-items:center;gap:8px"><div style="height:16px;width:' + Math.max(1, o.E[i] / emax * 170) + 'px;background:' + col + ';opacity:.7"></div><b>' + api.num(o.E[i]) + '</b></div></td>' +
               '<td style="text-align:center;font-weight:700">' + rk(o.order, i) + '</td><td>' + api.num(o.E[i] / v.e) + ' <span class="gl" style="font-size:11px">(rank ' + rk(o.perEffort, i) + ')</span></td>' +
               '<td>' + (inSet ? '<span style="display:inline-block;padding:2px 8px;background:var(--ink);color:#fff;border-radius:2px">patch</span>' : '<span class="gl">wait</span>') + '</td></tr>'; });
        t += '</table><p class="hint">The set that removes the most expected loss within ' + api.num(s.cap) + ' person-days: <b>' + (o.best.set.length ? o.best.set.map(i => VULN[i].id).join(' + ') : 'none fits') + '</b> (' + api.num(o.best.effort) + ' person-days, removes ' + api.num(o.best.gain) + ' of ' + api.num(o.total) + ' MSEK).</p>';
        $('pr-table').innerHTML = t;
        // chart: expected loss against pi3
        const host = $('pr-plot'), f = api.frame(host, 210, 44), xl = 40, top = niceUp(Math.max(items[2].L, ...o.E.slice(0, 2)), [1, 2, 5, 10, 20, 50, 100, 200, 500]);
        const xm = p => f.L + xl + p * (f.pw - xl - 80), ym = v => f.T + f.ph * (1 - v / top), yb = f.T + f.ph;
        let g = '';
        [0, top / 2, top].forEach(v => g += '<line x1="' + (f.L + xl) + '" x2="' + (f.W - f.R - 80) + '" y1="' + ym(v) + '" y2="' + ym(v) + '" stroke="#E6E6E2"/><text x="' + (f.L + xl - 6) + '" y="' + (ym(v) + 4) + '" text-anchor="end" class="t-muted t-small">' + api.num(v) + '</text>');
        g += axisLine(f, f.L + xl, f.W - f.R - 80, yb);
        [0, 0.2, 0.4, 0.6, 0.8, 1].forEach(p => g += tick(xm(p), yb, p));
        g += '<text x="' + ((f.L + xl + f.W - f.R - 80) / 2) + '" y="' + (f.H - 4) + '" text-anchor="middle" class="t-muted t-small">exploit probability <tspan class="m">π</tspan><tspan dy="3" font-size="9">3</tspan> of V3 (MSEK expected loss on the vertical axis)</text>';
        g += '<line x1="' + xm(0) + '" y1="' + ym(0) + '" x2="' + xm(1) + '" y2="' + ym(items[2].L) + '" stroke="var(--colH)" stroke-width="2.6"/><text x="' + (xm(1) + 6) + '" y="' + (ym(items[2].L) + 4) + '" fill="var(--colH)" font-weight="700">V3</text>';
        g += '<line x1="' + xm(0) + '" y1="' + ym(o.E[1]) + '" x2="' + xm(1) + '" y2="' + ym(o.E[1]) + '" stroke="var(--colA)" stroke-width="2.6" stroke-dasharray="6 4"/><text x="' + (xm(1) + 6) + '" y="' + (ym(o.E[1]) + 4) + '" fill="var(--colA)" font-weight="700">V2</text>';
        g += '<line x1="' + xm(0) + '" y1="' + ym(o.E[0]) + '" x2="' + xm(1) + '" y2="' + ym(o.E[0]) + '" stroke="var(--colS)" stroke-width="2.6" stroke-dasharray="2 4"/><text x="' + (xm(1) + 6) + '" y="' + (ym(o.E[0]) - 6) + '" fill="var(--colS)" font-weight="700">V1</text>';
        const be = CR.prio.breakEven(items, 2);
        if (be > 0 && be < 1) g += '<line x1="' + xm(be) + '" x2="' + xm(be) + '" y1="' + f.T + '" y2="' + yb + '" stroke="#555" stroke-dasharray="4 3"/><text x="' + (xm(be) + 5) + '" y="' + (f.T + 12) + '" class="t-small">order changes at <tspan class="m">π</tspan><tspan dy="3" font-size="9">3</tspan><tspan dy="-3"> = ' + api.num(be) + '</tspan></text>';
        g += '<circle cx="' + xm(s.pi3) + '" cy="' + ym(o.E[2]) + '" r="6" fill="var(--colH)" stroke="#fff" stroke-width="2"/><text class="lbl t-small" x="' + (xm(s.pi3) - 9) + '" y="' + (ym(o.E[2]) - 9) + '" text-anchor="end" fill="var(--colH)" font-weight="700">now: ' + api.num(o.E[2]) + '</text>';
        host.innerHTML = svgWrap(f, g, 'Expected loss of the three vulnerabilities against the exploit probability of V3');
        const first = o.order[0];
        $('pr-calc').innerHTML =
          calcLine('EXPECTED LOSS (probability times loss)', items.map((v, i) => VULN[i].id + ': ' + api.num(v.pi) + ' &times; ' + api.num(v.L) + ' = <span class="res">' + api.num(o.E[i]) + '</span>').join(' &nbsp; ') + ' &nbsp; total ' + api.num(o.total) + ' MSEK') +
          calcLine('FIRST BY EXPECTED LOSS', '<span class="res">' + VULN[first].id + '</span>; first by severity: ' + VULN[o.bySeverity[0]].id) +
          '<div class="line" style="border:0"><span class="what">WHAT WOULD FLIP V3</span><span class="eq">V3 stays first while <i>&pi;</i><sub>3</sub> &gt; ' + api.num(be) + ' (or while <i>L</i><sub>3</sub> &gt; ' + api.num(Math.max(...o.E.slice(0, 2)) / Math.max(items[2].pi, 1e-9)) + ' MSEK at the present <i>&pi;</i><sub>3</sub>)</span></div>';
      }
    };

    /* ===================================================================================================
       TAB 7: CONTAINMENT (lecture 4b): the cheapest way out, layers and a shared cause, monitoring as a race
       =================================================================================================== */
    modules.containment = {
      key: 'cont', title: 'Containment',
      mount(el) {
        el.innerHTML =
          `<div class="grid"><div>
            <p class="lede" style="margin-bottom:14px">A model in a sandbox is an adversary with a capability, and the sandbox is a system with a resistance. Three questions from lecture 4b: the sandbox is as strong as its cheapest way out; layers help only as far as they fail independently; and monitoring is a race between what happens after an escape and the detection and response.</p>` +
            panel('ct-paths', 'The cheapest way out <span class="gl">efforts in hours on a log axis; the resistance is the minimum over the open ways</span>') +
            panel('ct-layers', 'Layers and a shared cause <span class="gl">chance of a breach against the number of attempts (log-log)</span>', 'The shared cause is drawn once for the deployment, so it is a floor; the independent layers are tried again at every attempt, so their part grows with the number of attempts.') +
            panel('ct-mon', 'Monitoring is a race <span class="gl">hours on a log axis</span>', 'The defender wins when detection and response come before the loss: the same margin formula as capability against resistance, applied to two times.') +
          `</div><aside>
            <div class="card" style="border-bottom:0;padding-bottom:6px"><h2>Start from a case <span class="gl">illustrative, not measurements</span></h2><div class="chips" id="ct-chips"></div></div>` +
            card('ct-cc', 'var(--colA)', 'The model: capability', 'median effort in hours of a reference adversary') +
            card('ct-cp', 'var(--colS)', 'Ways out of the sandbox', 'median effort of each way; tick = open') +
            card('ct-cl', 'var(--colH)', 'Layers and a shared cause', 'attempts, layers and probabilities') +
            card('ct-cm', 'var(--colE)', 'Monitoring', 'escape, detection and response, progression to the loss') +
            `<div class="card calc" style="border-bottom:0"><h2>Calculation</h2><div id="ct-calc"></div></div>
          </aside></div>` +
          foot('<b>Ways out</b>: each open way has an uncertain effort (lognormal, common spread); the system\'s resistance is the cheapest of them, so closing one way raises it only to the next. <b>Layers</b>: an attempt passes each of <i class="m">L</i> layers with probability <i class="m">h</i>, independently, and a shared misconfiguration that disables all layers exists with probability <i class="m">q</i>: breach = 1 &minus; (1 &minus; <i class="m">q</i>)(1 &minus; <i class="m">h</i><sup><i class="m">L</i></sup>)<sup><i class="m">N</i></sup>. <b>Monitoring</b>: Pr(loss) = Pr(escape) &times; Pr(no interruption | escape).',
               'Containment reduces the escape; layers help only as far as they are independent; monitoring decides what an escape costs.',
               'Illustrative values, as on the frames of lecture 4b; none is a measurement. In the July replay OpenAI reports an alert about 30 minutes after the escape and more than 30 hours before the real intrusion: vendor counterfactual evidence [V]. The shared cause is the control failure of lecture 2, a state of the deployment.');
        addParams('ct-cc', ['cont.cMed', 'cont.cSigma']);
        const host = $('ct-cp').querySelector('.body');
        addParam(host, 'cont.rSigma');
        [1, 2, 3, 4].forEach(k => { addParam(host, 'cont.m' + k); this.addToggle(host, 'cont.o' + k, 'way ' + k + ' is open'); });
        addParams('ct-cl', ['cont.L', 'cont.h', 'cont.qc', 'cont.N']);
        addParams('ct-cm', ['cont.esc', 'cont.tdMed', 'cont.tdSigma', 'cont.tpMed', 'cont.tpSigma']);
      },
      addToggle(host, id, label) {
        const row = document.createElement('label'); row.className = 'toggle'; row.innerHTML = '<input type="checkbox" id="t-' + id + '"> ' + label; host.appendChild(row);
        const cb = row.querySelector('input'); cb.addEventListener('change', () => { api.set(id, cb.checked ? 1 : 0); api.render(); });
        api.ctl[id] = { sync() { cb.checked = !!api.get(id); cb.disabled = api.locked().has(id); } };
      },
      render() {
        const s = S().cont, D = DEFAULTS.cont, set = ch => Object.assign(S().cont, api.clone(D), ch);
        chips('ct-chips', [
          ['Today (the numbers of 4b)', () => set({})],
          ['Close the cheapest way out', () => set({ o1: 0 })],
          ['Close the two cheapest', () => set({ o1: 0, o2: 0 })],
          ['A fourth layer', () => set({ L: 4 })],
          ['Ten times more attempts', () => set({ N: D.N * 10 })],
          ['Slow response: 8 hours', () => set({ tdMed: 8 })],
          ['Shared cause removed', () => set({ qc: 1e-6 })]]);
        this.drawPaths(s); this.drawLayers(s); this.drawMon(s); this.drawCalc(s);
      },
      drawPaths(s) {
        const host = $('ct-paths'), f = api.frame(host, 228, 56), lo = Math.log(2), hi = Math.log(5000), xl = 8;
        const xm = v => f.L + xl + (Math.log(v) - lo) / (hi - lo) * (f.pw - xl - 8), yb = f.T + f.ph, ymax = 1.2;
        const meds = [1, 2, 3, 4].map(k => s['o' + k] ? s['m' + k] : 0), c = { med: s.cMed, sigma: s.cSigma };
        const st = CR.cont.paths(c, meds, s.rSigma), xs = api.linspace(lo, hi, 300).map(Math.exp);
        const ln = (x, med, sg) => Math.exp(-0.5 * Math.pow((Math.log(x) - Math.log(med)) / sg, 2));
        const dmin = x => { const h = 0.02; return (st.F(x * Math.exp(h)) - st.F(x * Math.exp(-h))) / (2 * h); };
        const peak = isFinite(st.median) ? Math.max(...xs.map(dmin), 1e-9) : 1;
        let g = axisLine(f, f.L, f.W - f.R, yb);
        [10, 100, 1000].forEach(v => g += tick(xm(v), yb, v));
        g += '<text x="' + (f.W / 2) + '" y="' + (f.H - 3) + '" text-anchor="middle" class="t-muted t-small">effort in hours of a reference adversary (log scale); the numbers mark the median of each way out</text>';
        [1, 2, 3, 4].forEach(k => { const m = s['m' + k], open = !!s['o' + k], fn = x => ln(x, m, s.rSigma);
          g += '<path d="' + api.path(f, xs, fn, xm, ymax, false) + '" fill="none" stroke="' + (open ? 'var(--colS)' : '#bbb') + '" stroke-width="' + (open ? 1.6 : 1.2) + '" stroke-dasharray="' + (open ? '6 4' : '2 3') + '"/>';
          g += '<text x="' + xm(m) + '" y="' + (yb + 33) + '" text-anchor="middle" class="t-small" fill="' + (open ? 'var(--colS)' : '#aaa') + '" font-weight="700">' + k + (open ? '' : ' (closed)') + '</text>'; });
        if (isFinite(st.median)) g += '<path d="' + api.path(f, xs, x => dmin(x) / peak * 0.9, xm, ymax, true) + '" fill="var(--colS)" fill-opacity=".14"/><path d="' + api.path(f, xs, x => dmin(x) / peak * 0.9, xm, ymax, false) + '" fill="none" stroke="var(--colS)" stroke-width="3.2"/>';
        g += '<path d="' + api.path(f, xs, x => ln(x, c.med, c.sigma), xm, ymax, false) + '" fill="none" stroke="var(--colA)" stroke-width="2.6"/>';
        g += '<text x="' + xm(c.med) + '" y="' + (f.T + f.ph * (1 - 1.05 / ymax) - 3) + '" text-anchor="middle" class="t-small" fill="var(--colA)" font-weight="700">capability</text>';
        g += '<text x="' + (f.W - f.R - 4) + '" y="' + (f.T + 14) + '" text-anchor="end" class="t-small" fill="var(--colS)" font-weight="700">thick: resistance <tspan class="m">r</tspan><tspan class="m" dy="3" font-size="9">S</tspan><tspan dy="-3"> = cheapest open way</tspan></text>';
        g += '<text x="' + (f.W - f.R - 4) + '" y="' + (f.T + 32) + '" text-anchor="end" class="t-small" font-weight="700">' + (isFinite(st.median) ? 'median ' + days(st.median) + ' h, success ' + api.pct(st.p) : 'no way out is open: success 0') + '</text>';
        host.innerHTML = svgWrap(f, g, 'Efforts of the ways out, their minimum, and the capability');
      },
      drawLayers(s) {
        const host = $('ct-layers'), f = api.frame(host, 236, 44), xl = 42, ly0 = -7, ly1 = 0, lx0 = 2, lx1 = 9;
        const xm = n => f.L + xl + (Math.log10(Math.max(n, 100)) - lx0) / (lx1 - lx0) * (f.pw - xl - 10), yb = f.T + f.ph;
        const ym = v => f.T + f.ph * (1 - (Math.log10(Math.max(v, 1e-7)) - ly0) / (ly1 - ly0));
        const Ns = api.linspace(lx0, lx1, 180).map(v => Math.pow(10, v));
        let g = '';
        [1e-6, 1e-4, 1e-2, 1].forEach(v => g += '<line x1="' + (f.L + xl) + '" x2="' + (f.W - f.R) + '" y1="' + ym(v) + '" y2="' + ym(v) + '" stroke="#E6E6E2"/><text x="' + (f.L + xl - 6) + '" y="' + (ym(v) + 4) + '" text-anchor="end" class="t-muted">' + (v === 1 ? '1' : '10<tspan dy="-4" font-size="9">' + Math.round(Math.log10(v)) + '</tspan>') + '</text>');
        g += axisLine(f, f.L + xl, f.W - f.R, yb);
        for (let e = lx0; e <= lx1; e += 1) g += tick(xm(Math.pow(10, e)), yb, '10' + ['', '', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'][e]);
        g += '<text x="' + (f.W / 2 + xl / 2) + '" y="' + (f.H - 4) + '" text-anchor="middle" class="t-muted t-small">attempts <tspan class="m">N</tspan> (log scale)</text>';
        const line = (fn, col, w, dash) => '<path d="' + Ns.map((n, i) => (i ? 'L' : 'M') + xm(n).toFixed(1) + ' ' + ym(fn(n)).toFixed(1)).join('') + '" fill="none" stroke="' + col + '" stroke-width="' + w + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
        const part = n => CR.cont.layers(n, s.h, s.L, s.qc);
        g += line(n => part(n).shared, 'var(--colH)', 2.4, '6 4') + line(n => part(n).ind, 'var(--colS)', 2.4, '') + line(n => part(n).total, '#222', 3.4, '');
        const Nx = CR.cont.crossover(s.h, s.L, s.qc), now = part(s.N);
        if (Nx >= 100 && Nx <= 1e9) g += '<line x1="' + xm(Nx) + '" x2="' + xm(Nx) + '" y1="' + f.T + '" y2="' + yb + '" stroke="#bbb" stroke-dasharray="2 3"/><text x="' + (xm(Nx) + 5) + '" y="' + (f.T + 12) + '" class="t-muted t-small">they cross at <tspan class="m">N</tspan> \u2248 ' + bigU(Nx) + '</text>';
        g += '<line x1="' + xm(s.N) + '" x2="' + xm(s.N) + '" y1="' + f.T + '" y2="' + yb + '" stroke="#555" stroke-dasharray="5 4"/><circle cx="' + xm(s.N) + '" cy="' + ym(now.total) + '" r="5.5" fill="#222" stroke="#fff" stroke-width="2"/>';
        [['independent layers', 'var(--colS)', ''], ['shared cause (a floor)', 'var(--colH)', '6 4'], ['total', '#222', '']].forEach(([t, c, d], i) => { const y = f.T + 16 + i * 16;
          g += '<line x1="' + (f.L + xl + 10) + '" x2="' + (f.L + xl + 36) + '" y1="' + y + '" y2="' + y + '" stroke="' + c + '" stroke-width="3"' + (d ? ' stroke-dasharray="' + d + '"' : '') + '/><text x="' + (f.L + xl + 42) + '" y="' + (y + 4) + '" class="t-small">' + t + '</text>'; });
        host.innerHTML = svgWrap(f, g, 'Chance of a breach against the number of attempts');
      },
      drawMon(s) {
        const host = $('ct-mon'), f = api.frame(host, 168, 44), lo = Math.log(0.05), hi = Math.log(500), xl = 8;
        const xm = v => f.L + xl + (Math.log(v) - lo) / (hi - lo) * (f.pw - xl - 8), yb = f.T + f.ph, ymax = 1.2;
        const xs = api.linspace(lo, hi, 300).map(Math.exp), ln = (x, med, sg) => Math.exp(-0.5 * Math.pow((Math.log(x) - Math.log(med)) / sg, 2));
        const M = CR.cont.monitor({ esc: s.esc, tdMed: s.tdMed, tdSigma: s.tdSigma, tpMed: s.tpMed, tpSigma: s.tpSigma });
        let g = axisLine(f, f.L, f.W - f.R, yb);
        [0.1, 1, 10, 100].forEach(v => g += tick(xm(v), yb, v));
        g += '<text x="' + (f.W / 2) + '" y="' + (f.H - 4) + '" text-anchor="middle" class="t-muted t-small">hours after the escape (log scale)</text>';
        g += '<path d="' + api.path(f, xs, x => ln(x, s.tdMed, s.tdSigma), xm, ymax, true) + '" fill="var(--colS)" fill-opacity=".14"/><path d="' + api.path(f, xs, x => ln(x, s.tdMed, s.tdSigma), xm, ymax, false) + '" fill="none" stroke="var(--colS)" stroke-width="2.6" stroke-dasharray="6 4"/>';
        g += '<path d="' + api.path(f, xs, x => ln(x, s.tpMed, s.tpSigma), xm, ymax, true) + '" fill="var(--colA)" fill-opacity=".14"/><path d="' + api.path(f, xs, x => ln(x, s.tpMed, s.tpSigma), xm, ymax, false) + '" fill="none" stroke="var(--colA)" stroke-width="2.6"/>';
        g += '<text x="' + xm(s.tdMed) + '" y="' + (f.T + f.ph * (1 - 1.05 / ymax) - 3) + '" text-anchor="middle" class="t-small" fill="var(--colS)" font-weight="700">detection and response</text>';
        g += '<text x="' + xm(s.tpMed) + '" y="' + (f.T + f.ph * (1 - 1.05 / ymax) - 3) + '" text-anchor="middle" class="t-small" fill="var(--colA)" font-weight="700">progression to the loss</text>';
        g += '<text x="' + (f.W - f.R - 4) + '" y="13" text-anchor="end" class="t-small" font-weight="700">interrupted first: ' + api.pct(M.interrupt) + ';  loss = ' + api.pct(s.esc) + ' \u00D7 ' + api.pct(1 - M.interrupt) + ' = ' + sciU(M.loss) + '</text>';
        host.innerHTML = svgWrap(f, g, 'Detection and response against progression to the loss');
      },
      drawCalc(s) {
        const meds = [1, 2, 3, 4].map(k => s['o' + k] ? s['m' + k] : 0), c = { med: s.cMed, sigma: s.cSigma };
        const st = CR.cont.paths(c, meds, s.rSigma), all = CR.cont.paths(c, [1, 2, 3, 4].map(k => s['m' + k]), s.rSigma), part = CR.cont.layers(s.N, s.h, s.L, s.qc), Nx = CR.cont.crossover(s.h, s.L, s.qc);
        const M = CR.cont.monitor({ esc: s.esc, tdMed: s.tdMed, tdSigma: s.tdSigma, tpMed: s.tpMed, tpSigma: s.tpSigma }), sci = sciU;
        let h = calcLine('THE CHEAPEST WAY OUT', 'open ways: ' + [1, 2, 3, 4].filter(k => s['o' + k]).join(', ') + (isFinite(st.median) ? '; median <i>r</i><sub>S</sub> = <b>' + days(st.median) + ' h</b>; success <span class="res">' + api.pct(st.p) + '</span> (all open: ' + days(all.median) + ' h, ' + api.pct(all.p) + ')' : '; none open: success <span class="res">0</span>'));
        h += calcLine('LAYERS AND THE SHARED CAUSE', 'independent part 1 &minus; (1 &minus; <i>h</i><sup><i>L</i></sup>)<sup><i>N</i></sup> = ' + sci(part.ind) + '; shared cause <i>q</i> = ' + sci(part.shared) + '; breach <span class="res">' + sci(part.total) + '</span> after ' + big(s.N) + ' attempts; the two are equal at <i>N</i> &asymp; ' + bigU(Nx));
        h += '<div class="line" style="border:0"><span class="what">MONITORING</span><span class="eq" style="font-size:13px">margin <i>z</i> = ln(' + days(s.tpMed) + ' / ' + days(s.tdMed) + ') / &radic;(' + api.f2(s.tpSigma) + '&sup2; + ' + api.f2(s.tdSigma) + '&sup2;) = ' + api.f2(M.z) + '; interrupted before the loss <span class="res">' + api.pct(M.interrupt) + '</span>; Pr(loss) = Pr(escape) &times; (1 &minus; ' + api.pct(M.interrupt) + ') = <b>' + sci(M.loss) + '</b></span></div>';
        $('ct-calc').innerHTML = h;
      }
    };

    return { modules, TABS };
  }

  root.CR_TABS4 = { DEFAULTS, PARAMS, TABS, create };
})(typeof self !== 'undefined' ? self : this);
