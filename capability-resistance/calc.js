/* calc.js - the maths of the capability-resistance framework, shared by the page and the tests.
   No dependencies. Works in the browser (global CR) and in node (module.exports).
   Notation as in the lecture: efforts are lognormal, ln c_A ~ N(mu_c, sigma_c^2), ln r_S ~ N(mu_r, sigma_r^2),
   mu = ln(median in hours of a reference adversary). */
(function (root) {
  'use strict';
  const SQRT2 = Math.SQRT2, SQRTPI = Math.sqrt(Math.PI);

  // complementary error function, accurate in the tails (no 1 - erf cancellation)
  function erfSeries(x) {            // |x| < 2.5
    let term = x, sum = x, n = 0;
    const x2 = x * x;
    while (Math.abs(term) > 1e-17 * Math.abs(sum) && n < 200) {
      n++; term *= -x2 / n; sum += term / (2 * n + 1);
    }
    return 2 / SQRTPI * sum;
  }
  function erfc(x) {
    if (x < 0) return 2 - erfc(-x);
    if (x < 2.5) return 1 - erfSeries(x);
    let t = x;                       // continued fraction, backward evaluation
    for (let k = 120; k >= 1; k--) t = x + (k / 2) / t;
    return Math.exp(-x * x) / (SQRTPI * t);
  }
  const Phi = z => 0.5 * erfc(-z / SQRT2);               // standard normal distribution function
  function PhiInv(p) {                                   // inverse by bisection (monotone, robust)
    if (!(p > 0 && p < 1)) return p <= 0 ? -Infinity : Infinity;
    let lo = -40, hi = 40;
    for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (Phi(m) < p) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  const normPdf = (x, mu, s) => Math.exp(-0.5 * ((x - mu) / s) ** 2) / (s * Math.sqrt(2 * Math.PI));
  const mu = e => Math.log(e.med);                       // e = {med, sigma}

  // success probability of one attempt: Pr(c_A > r_S) for independent lognormal efforts
  function margin(c, r) {
    const muD = mu(c) - mu(r), sigD = Math.hypot(c.sigma, r.sigma), z = muD / sigD;
    return { muD, sigD, z, p: Phi(z) };
  }
  // the control works with probability q (resistance r) and fails otherwise (median rFailMed, same spread)
  function mixture(c, r, rFailMed, q) {
    const eff = margin(c, r), fail = margin(c, { med: rFailMed, sigma: r.sigma });
    const a = q * eff.p, b = (1 - q) * fail.p, p = a + b;
    return { eff, fail, a, b, p, failShare: p > 0 ? b / p : 0 };
  }
  // likelihood and risk: lambda = lambda_a p; Pr(N_T >= 1) = 1 - exp(-lambda T); R = lambda E[L]
  function risk(p, lambdaA, T, EL) {
    const lam = lambdaA * p;
    return { lambda: lam, atLeastOne: 1 - Math.exp(-lam * T), expEvents: lam * T, R: lam * EL,
             intervalShortcut: (1 - Math.exp(-lambdaA * T)) * p };
  }

  /* =====================================================================================================
     LECTURE 4: time, search, backlog and prioritisation. Everything below is deterministic (no random
     numbers in anything a check or a solution uses). Time is in days unless stated.
     ===================================================================================================== */
  const LN2 = Math.LN2;
  const clampN = (x, a, b) => Math.min(b, Math.max(a, x));

  /* ---- the lifecycle race (lecture 4) -------------------------------------------------------------------
     t = 0 is the patch release. X, the day a usable exploit exists, is a mixture:
       zero-day (weight w0):  X = -exp(ln zdMed + zdSigma z), z standard normal (an exploit before the patch);
       n-day (weight 1 - w0): X follows the Mandiant shares of 41 n-days of 2023 [V]: 12, 29, 56 and 95 % within 1 day, 1 week,
         1 month and 6 months, interpolated linearly in log time between these points, divided by the speed factor s
         (AI patch diffing: s > 1 makes every n-day exploit arrive s times sooner).
     I: the day this system installs the patch (lognormal, or exponential with the same median).
     tau: the time the adversary needs on this target after X: exponential with median tauMed (days). It is short when the margin
       of resources over resistance is wide (lecture 2 comparison); the tool takes it as a given.
     W = (I - X)^+ is the window and the attacker is first when X + tau < I:
       Pr = E[ 1{I > X} (1 - exp(-ln2 (I - X) / tauMed)) ].
     base: the share of vulnerabilities that ever get an exploit (1 = condition on an exploit existing, as on the race frame).
     P = { w0, zdMed, zdSigma, s, i:{med,sigma}, shape:'lognormal'|'exponential', tauMed, base } */
  const NDAY_KNOTS = [[1, 0.12], [7, 0.29], [30, 0.56], [180, 0.95], [365, 1]];
  function ndayQuantile(u) {                                             // days after the patch, u in (0,1)
    if (u <= NDAY_KNOTS[0][1]) return u / NDAY_KNOTS[0][1];
    for (let k = 1; k < NDAY_KNOTS.length; k++) {
      const a = NDAY_KNOTS[k - 1], b = NDAY_KNOTS[k];
      if (u <= b[1]) return Math.exp(Math.log(a[0]) + (u - a[1]) / (b[1] - a[1]) * (Math.log(b[0]) - Math.log(a[0])));
    }
    return NDAY_KNOTS[NDAY_KNOTS.length - 1][0];
  }
  function ndayCdf(t) {                                                  // inverse of ndayQuantile
    if (!(t > 0)) return 0;
    if (t <= NDAY_KNOTS[0][0]) return NDAY_KNOTS[0][1] * t;
    for (let k = 1; k < NDAY_KNOTS.length; k++) {
      const a = NDAY_KNOTS[k - 1], b = NDAY_KNOTS[k];
      if (t <= b[0]) return a[1] + (Math.log(t) - Math.log(a[0])) / (Math.log(b[0]) - Math.log(a[0])) * (b[1] - a[1]);
    }
    return 1;
  }
  const LIFE_DEFAULT = { w0: 0.25, zdMed: 14, zdSigma: 0.8, s: 1, i: { med: 43, sigma: 0.8 }, shape: 'lognormal', tauMed: 1, base: 1 };
  function condProb(P, w) {                                              // Pr(tau < w): the attack has worked within w days
    return w > 0 ? 1 - Math.exp(-w * LN2 / P.tauMed) : 0;
  }
  const iFromZ = (P, z) => P.shape === 'exponential' ? -(P.i.med / LN2) * Math.log(Math.max(Phi(-z), 1e-300)) : P.i.med * Math.exp(P.i.sigma * z);
  const _gridCache = {};
  function grid(n) {                                                     // midpoint nodes on the standard normal, weights sum to 1
    if (_gridCache[n]) return _gridCache[n];
    const h = 10 / n, z = [], w = []; let tot = 0;
    for (let k = 0; k < n; k++) { const zk = -5 + (k + 0.5) * h; z.push(zk); const wk = Math.exp(-0.5 * zk * zk); w.push(wk); tot += wk; }
    return (_gridCache[n] = { z, w: w.map(v => v / tot) });
  }
  // the nodes of X with their weights: zero-day branch on a normal grid, n-day branch on a uniform grid of the inverse cdf
  function xNodes(P, n) {
    const G = grid(n), m = Math.max(120, Math.round(n * 1.5)), xs = [], ws = [];
    if (P.w0 > 0) for (let a = 0; a < G.z.length; a++) { xs.push(-Math.exp(Math.log(P.zdMed) + P.zdSigma * G.z[a])); ws.push(P.w0 * G.w[a]); }
    if (P.w0 < 1) for (let k = 0; k < m; k++) { xs.push(ndayQuantile((k + 0.5) / m) / P.s); ws.push((1 - P.w0) / m); }
    return { xs, ws };
  }
  // exact (quadrature) Pr(attacker first) and the other readouts; n = nodes per dimension
  function lifeProb(P, n) {
    n = n || 160; const G = grid(n), XN = xNodes(P, n), I = G.z.map(z => iFromZ(P, z));
    let p = 0, p0 = 0, noWin = 0, meanW = 0;
    for (let a = 0; a < XN.xs.length; a++) {
      const x = XN.xs[a], wa = XN.ws[a];
      for (let b = 0; b < I.length; b++) {
        const W = I[b] - x, wt = wa * G.w[b];
        if (W > 0) { p += wt * condProb(P, W); p0 += wt; meanW += wt * W; } else noWin += wt;
      }
    }
    return { p, p0, noWindow: noWin, meanW, zeroShare: P.w0, per10k: 1e4 * P.base * p, per10kWindow: 1e4 * P.base * p0 };
  }
  // distribution function of X (for quantiles and the display)
  function xCdf(P, x) {
    const fz = x >= 0 ? 1 : 1 - Phi((Math.log(-x) - Math.log(P.zdMed)) / P.zdSigma);
    return P.w0 * fz + (1 - P.w0) * ndayCdf(x * P.s);
  }
  // quantile of one clock, u in (0,1): 'x', 'i' or 'tau'
  function lifeQuantile(P, which, u) {
    if (which === 'x') { let lo = -5000, hi = 5000; for (let k = 0; k < 90; k++) { const m = (lo + hi) / 2; if (xCdf(P, m) < u) lo = m; else hi = m; } return (lo + hi) / 2; }
    if (which === 'i') return P.shape === 'exponential' ? -(P.i.med / LN2) * Math.log(1 - u) : P.i.med * Math.exp(P.i.sigma * PhiInv(u));
    return -(P.tauMed / LN2) * Math.log(1 - u);
  }
  // deterministic scatter for display (Halton sequences, bases 2, 3, 5, 7), n points of (X, I) with the verdict
  function halton(i, b) { let f = 1, r = 0; while (i > 0) { f /= b; r += f * (i % b); i = Math.floor(i / b); } return r; }
  function lifeScatter(P, n) {
    const pts = [], cl = u => Math.min(Math.max(u, 1e-9), 1 - 1e-9);
    for (let k = 1; k <= n; k++) {
      const zero = halton(k, 2) < P.w0, ux = halton(k, 3), ui = cl(halton(k, 5)), ut = cl(halton(k, 7));
      const x = zero ? -Math.exp(Math.log(P.zdMed) + P.zdSigma * PhiInv(cl(ux))) : ndayQuantile(ux) / P.s;
      const i = iFromZ(P, PhiInv(ui)), tau = -(P.tauMed / LN2) * Math.log(1 - ut);
      pts.push({ X: x, I: i, zero, first: i - x > 0 && x + tau < i });
    }
    return pts;
  }
  const lifeWith = (P, ch) => Object.assign({}, P, ch, { i: Object.assign({}, P.i, ch.i || {}) });
  const _prob = (P, ch) => lifeProb(lifeWith(P, ch)).p;      // same node count as the checks of the exercises
  // largest median installation time giving Pr <= target (null if even a median of lo is too slow)
  function lifeSolveI(P, target, lo, hi) {
    lo = lo || 1; hi = hi || 365;
    const f = m => _prob(P, { i: { med: m } });
    if (f(lo) > target) return null; if (f(hi) <= target) return hi;
    for (let k = 0; k < 40; k++) { const mid = Math.sqrt(lo * hi); if (f(mid) <= target) lo = mid; else hi = mid; }
    return lo;
  }
  // smallest n-day speed factor giving Pr >= target (null if not reachable below hi)
  function lifeSolveSpeed(P, target, lo, hi) {
    lo = lo || 0.2; hi = hi || 200;
    const f = s => _prob(P, { s });
    if (f(lo) >= target) return lo; if (f(hi) < target) return null;
    for (let k = 0; k < 40; k++) { const mid = Math.sqrt(lo * hi); if (f(mid) >= target) hi = mid; else lo = mid; }
    return hi;
  }
  // smallest zero-day weight giving Pr >= target (null if not reachable)
  function lifeSolveW0(P, target) {
    const f = w => _prob(P, { w0: w });
    if (f(0) >= target) return 0; if (f(1) < target) return null;
    let lo = 0, hi = 1; for (let k = 0; k < 40; k++) { const mid = (lo + hi) / 2; if (f(mid) >= target) hi = mid; else lo = mid; }
    return hi;
  }
  // smallest median time to use the exploit giving Pr <= target (null if not reachable below hi)
  function lifeSolveTau(P, target, lo, hi) {
    lo = lo || 0.05; hi = hi || 400;
    const f = t => _prob(P, { tauMed: t });
    if (f(lo) <= target) return lo; if (f(hi) > target) return null;
    for (let k = 0; k < 40; k++) { const mid = Math.sqrt(lo * hi); if (f(mid) <= target) hi = mid; else lo = mid; }
    return hi;
  }

  /* ---- search: how the number of attempts becomes a probability of finding the target -----------------
     M candidates, one of them is the target, N attempts.
       independent draws with replacement: 1 - (1 - 1/M)^N   (the Poisson form of lecture 2: 1 - exp(-N/M))
       systematic search without repetition: N / M
       guided by a prior: the candidates are tried in order of prior probability; if the prior is right,
         the N most likely candidates hold the share (N/M)^k of the probability (k < 1: knowledge, k = 1: none,
         k > 1: a prior that misleads). */
  const searchIndep = (N, M) => N <= 0 ? 0 : 1 - Math.exp(N * Math.log1p(-1 / Math.max(M, 2)));
  const searchSyst = (N, M) => clampN(N / M, 0, 1);
  const searchGuided = (N, M, k) => N >= M ? 1 : (N <= 0 ? 0 : Math.pow(N / M, k));
  // attempts needed to reach probability q
  const searchNeed = (q, M, k) => ({ indep: -M * Math.log(1 - q), syst: q * M, guided: M * Math.pow(q, 1 / k) });

  /* ---- backlog: three stages in series, weekly fluid model --------------------------------------------
     a(t): verified findings per week (a0, times mult from week 'week'); fix stage with capacity cF, install
     stage with capacity cI. Backlog = what is waiting in front of a stage. Time unit: weeks. */
  function queueSim(Q, T) {
    T = T || 52; const BF = [], BI = [], outF = [], outI = [], inA = [];
    let bf = 0, bi = 0;
    for (let t = 0; t < T; t++) {
      const a = Q.a0 * (t >= Q.week ? Q.mult : 1);
      const availF = bf + a, of_ = Math.min(Q.cF, availF); bf = availF - of_;
      const availI = bi + of_, oi = Math.min(Q.cI, availI); bi = availI - oi;
      inA.push(a); outF.push(of_); outI.push(oi); BF.push(bf); BI.push(bi);
    }
    const a1 = Q.a0 * Q.mult, rates = [['finding', a1], ['fixing', Q.cF], ['installing', Q.cI]];
    const bottleneck = rates.slice(1).reduce((m, r) => r[1] < m[1] ? r : m, rates[1]);
    return { BF, BI, outF, outI, inA, steady: Math.min(a1, Q.cF, Q.cI), bottleneck: bottleneck[1] < a1 ? bottleneck[0] : 'none',
             waitF: BF[T - 1] / Q.cF, waitI: BI[T - 1] / Q.cI };
  }

  /* ---- prioritisation: expected loss pi * L, ranking, and the best set within a capacity -------------- */
  function prio(items, cap) {
    const E = items.map(v => v.pi * v.L);
    const order = E.map((e, i) => i).sort((a, b) => E[b] - E[a]);
    const bySeverity = items.map((v, i) => i).sort((a, b) => items[b].cvss - items[a].cvss);
    const perEffort = items.map((v, i) => i).sort((a, b) => E[b] / items[b].e - E[a] / items[a].e);
    let best = { set: [], gain: 0, effort: 0 };                          // exhaustive search over subsets (3 to 6 items)
    for (let m = 1; m < (1 << items.length); m++) {
      let eff = 0, gain = 0; const set = [];
      for (let i = 0; i < items.length; i++) if (m & (1 << i)) { eff += items[i].e; gain += E[i]; set.push(i); }
      if (eff <= cap + 1e-9 && gain > best.gain + 1e-12) best = { set, gain, effort: eff };
    }
    return { E, total: E.reduce((a, b) => a + b, 0), order, bySeverity, perEffort, best };
  }
  // the pi of item j at which it changes place with the strongest other item
  const prioBreakEven = (items, j) => Math.max(...items.map((v, i) => i === j ? 0 : v.pi * v.L)) / items[j].L;

  /* ---- parallel runs (lecture 4, the search chapter) ----------------------------------------------------
     One run succeeds with probability p; n runs in parallel.
       partitioned: each run covers a new slice (as systematic search): min(1, n p)
       independent: a run may repeat what another did (as independent draws): 1 - (1 - p)^n
       repeating:   the runs share prior and method, so they fail on the same targets: only a share Q of the targets is reachable,
                    with probability p/Q per run: Q (1 - (1 - p/Q)^n); the plateau is Q. */
  const runsPart = (n, p) => clampN(n * p, 0, 1);
  const runsIndep = (n, p) => n <= 0 ? 0 : 1 - Math.exp(n * Math.log1p(-Math.min(p, 0.999999)));
  const runsRep = (n, p, Q) => { const pr = Math.min(p / Math.max(Q, p), 0.999999); return n <= 0 ? 0 : Math.max(Q, p) * (1 - Math.exp(n * Math.log1p(-pr))); };
  const runsNeed = (target, p, Q) => ({ part: target / p, indep: Math.log(1 - target) / Math.log1p(-p),
    rep: target >= Math.max(Q, p) - 1e-12 ? Infinity : Math.log(1 - target / Math.max(Q, p)) / Math.log1p(-Math.min(p / Math.max(Q, p), 0.999999)) });
  // smallest share of reachable targets Q (the diversity of the runs) with the repeating curve at target for n runs
  function runsSolveQ(n, p, target) {
    if (runsRep(n, p, 1) < target) return null;
    let lo = Math.max(p, target), hi = 1;
    for (let k = 0; k < 60; k++) { const mid = (lo + hi) / 2; if (runsRep(n, p, mid) >= target) hi = mid; else lo = mid; }
    return hi;
  }

  /* ---- containment (lecture 4b) -------------------------------------------------------------------------
     Paths: a system with several ways out; the resistance is the cheapest open path, r_S = min of independent lognormals
       (medians in hours, common spread sigma); p = Pr(c_A > r_S), c_A lognormal. Closing a path removes it from the minimum.
     Layers and common cause: L layers, an attempt passes each with probability h independently; a shared misconfiguration that
       disables all layers exists with probability qc (a state of the deployment, drawn once): breach after N attempts
       = 1 - (1 - qc)(1 - h^L)^N. The independent part grows with N, the shared cause is a floor.
     Monitoring: after an escape the loss needs a progression time T_p (lognormal, hours); detection and response take T_d (lognormal);
       the defender wins if T_d < T_p, the margin formula of lecture 2 applied to two times; Pr(loss) = Pr(escape) (1 - Pr(interrupt)). */
  function pathsStats(c, meds, sigma, n) {
    n = n || 160; const open = meds.filter(m => m > 0), G = grid(n); let p = 0;
    if (!open.length) return { p: 0, median: Infinity, F: () => 0 };
    const F = x => { let prod = 1; for (const m of open) prod *= 1 - Phi((Math.log(x) - Math.log(m)) / sigma); return 1 - prod; };   // cdf of the minimum
    for (let k = 0; k < G.z.length; k++) p += G.w[k] * F(Math.exp(Math.log(c.med) + c.sigma * G.z[k]));
    let lo = 1e-3, hi = 1e7; for (let k = 0; k < 100; k++) { const mid = Math.sqrt(lo * hi); if (F(mid) < 0.5) lo = mid; else hi = mid; }
    return { p, median: Math.sqrt(lo * hi), F };
  }
  const layersParts = (N, h, L, qc) => { const ind = 1 - Math.exp(N * Math.log1p(-Math.pow(h, L))); return { ind, shared: qc, total: 1 - (1 - qc) * (1 - ind) }; };
  const layersCrossover = (h, L, qc) => Math.log1p(-qc) / Math.log1p(-Math.pow(h, L));          // N at which the independent part equals the shared cause
  function monitorStats(m) {                                              // m = { esc, tdMed, tdSigma, tpMed, tpSigma }
    const k = margin({ med: m.tpMed, sigma: m.tpSigma }, { med: m.tdMed, sigma: m.tdSigma });
    return { interrupt: k.p, loss: m.esc * (1 - k.p), z: k.z };
  }
  // the largest median detection-and-response time that still interrupts a share >= target of the escapes
  const monitorSolveTd = (m, target) => Math.exp(Math.log(m.tpMed) - PhiInv(target) * Math.hypot(m.tpSigma, m.tdSigma));

  // the page keeps its parameters flat (ids like life.xMean); these turn them into the objects above
  const lifeFromFlat = s => ({ w0:s.zdShare, zdMed:s.zdMed, zdSigma:0.8, s:s.nSpeed, i:{ med:s.iMed, sigma:s.iSigma }, shape:s.shape, tauMed:s.tauMed, base:s.base });
  const PRIO_CVSS = [9.8, 7.5, 5.3];
  const prioItems = s => [1, 2, 3].map(n => ({ cvss:PRIO_CVSS[n - 1], pi:s['pi' + n], L:s['L' + n], e:s['e' + n] }));
  const CR = { erfc, Phi, PhiInv, normPdf, mu, margin, mixture, risk,
    life: { DEFAULT: LIFE_DEFAULT, fromFlat: lifeFromFlat, condProb, prob: lifeProb, quantile: lifeQuantile, xCdf, scatter: lifeScatter, solveI: lifeSolveI, solveSpeed: lifeSolveSpeed, solveW0: lifeSolveW0, solveTau: lifeSolveTau, with: lifeWith, nday: { quantile: ndayQuantile, cdf: ndayCdf, KNOTS: NDAY_KNOTS } },
    runs: { part: runsPart, indep: runsIndep, rep: runsRep, need: runsNeed, solveQ: runsSolveQ },
    cont: { paths: pathsStats, layers: layersParts, crossover: layersCrossover, monitor: monitorStats, solveTd: monitorSolveTd },
    search: { indep: searchIndep, syst: searchSyst, guided: searchGuided, need: searchNeed },
    queue: { sim: queueSim },
    prio: Object.assign(prio, { breakEven: prioBreakEven, items: prioItems, CVSS: PRIO_CVSS }) };
  if (typeof module !== 'undefined' && module.exports) module.exports = CR; else root.CR = CR;
})(typeof self !== 'undefined' ? self : this);
