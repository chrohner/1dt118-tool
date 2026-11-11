// Acceptance tests for calc.js. Run: node test.js   (reference values from scipy, see below)
const CR = require('./calc.js');
let fails = 0;
const near = (name, got, want, tol) => { const ok = Math.abs(got - want) <= tol; if (!ok) fails++; console.log((ok ? 'ok   ' : 'FAIL ') + name + ': ' + got + ' (want ' + want + ')'); };

// slide numbers
const r = { med: 40, sigma: 0.7 };
let k = CR.margin({ med: 3, sigma: 1 }, r);   near('opportunistic z', k.z, -2.12, 0.005);   near('opportunistic p', k.p, 0.017, 0.0005);
k = CR.margin({ med: 100, sigma: 1 }, r);     near('targeted z', k.z, 0.75, 0.005);        near('targeted p', k.p, 0.77, 0.005);
k = CR.margin({ med: 3, sigma: 1 }, { med: 4, sigma: 0.7 }); near('failed z', k.z, -0.24, 0.005); near('failed p', k.p, 0.41, 0.005);
let m = CR.mixture({ med: 3, sigma: 1 }, r, 4, 0.95); near('mixture q=0.95', m.p, 0.036, 0.0005);
m = CR.mixture({ med: 3, sigma: 1 }, r, 4, 0.85);     near('mixture q=0.85', m.p, 0.075, 0.0005); near('tails 1.4 %', m.a, 0.014, 0.0005); near('tails 6.1 %', m.b, 0.061, 0.0005);
near('mu_D', CR.margin({ med: 3, sigma: 1 }, r).muD, -2.59, 0.005);
near('equal medians p', CR.margin({ med: 40, sigma: 1 }, r).p, 0.5, 1e-12);

// risk chain: lambda_a = ln 5, p = 0.4001 gives 0.644 and 0.475 (exercise sheet)
const rk = CR.risk(0.4001, Math.log(5), 1, 1); near('lambda', rk.lambda, 0.644, 0.001); near('Pr(N>=1)', rk.atLeastOne, 0.475, 0.001);

// Phi against scipy, relative error, z from -6 to 6
const ref = { '-6': 9.865876450376946e-10, '-5': 2.866515718791939e-07, '-4': 3.167124183311992e-05, '-3': 0.0013498980316300946,
  '-2.5': 0.006209665325776132, '-2': 0.022750131948179195, '-1': 0.15865525393145707, '0': 0.5, '1': 0.8413447460685429,
  '2': 0.9772498680518208, '3': 0.9986501019683699, '4': 0.9999683287581669, '5': 0.9999997133484281, '6': 0.999999999013412 };
for (const z in ref) near('Phi(' + z + ') rel', Math.abs(CR.Phi(+z) / ref[z] - 1), 0, 1e-9);
// inverse
near('PhiInv(0.05)', CR.PhiInv(0.05), -1.6448536269514722, 1e-9);
near('PhiInv(Phi(1.234))', CR.PhiInv(CR.Phi(1.234)), 1.234, 1e-9);

// ---------------------------------------------------------------------------------------------------
// Lecture 4: lifecycle clock, search, backlog, prioritise (all deterministic)
// ---------------------------------------------------------------------------------------------------
{
  const L = CR.life, flat = { zdShare: 0.25, zdMed: 14, nSpeed: 1, iMed: 43, iSigma: 0.8, tauMed: 1, base: 1, shape: 'lognormal' };
  const P0 = L.fromFlat(flat), pr = (P, ch) => L.prob(ch ? L.with(P, ch) : P, 200);
  // the numbers of the race frame (computations/lecture4-lifecycle/race-x-against-i.js: 0.7248 and 0.7318)
  near('race: attacker first, today', pr(P0).p, 0.7248, 0.002);
  near('race: with tau = 0 (the window opens)', pr(P0, { tauMed: 1e-6 }).p0, 0.7318, 0.002);
  near('race: tau -> 0 equals Pr(window)', pr(P0, { tauMed: 1e-6 }).p, pr(P0).p0, 2e-4);
  near('zero-day share of the cases', pr(P0).zeroShare, 0.25, 1e-12);
  near('quantile of X at 0.5 (median, days)', L.quantile(P0, 'x', 0.5), 8.8, 0.15);
  near('quantile of I at 0.5 is the median', L.quantile(P0, 'i', 0.5), 43, 1e-6);
  near('n-day shares: 12 % within a day', L.nday.cdf(1), 0.12, 1e-12); near('n-day shares: 29 % within a week', L.nday.cdf(7), 0.29, 1e-12);
  near('n-day shares: 56 % within a month', L.nday.cdf(30), 0.56, 1e-12); near('n-day shares: 95 % within six months', L.nday.cdf(180), 0.95, 1e-12);
  near('n-day quantile inverts the cdf', L.nday.cdf(L.nday.quantile(0.4)), 0.4, 1e-12);
  // behaviour
  near('no window when every exploit comes long after the installation', L.prob(L.with(P0, { w0: 0, s: 1e-6 }), 120).p, 0, 1e-3);
  let prev = -1, mono = true; for (const s of [0.2, 0.5, 1, 2, 5, 20, 100]) { const p = pr(P0, { s }).p; if (p < prev) mono = false; prev = p; }
  near('Pr increases with the n-day speed factor', mono ? 1 : 0, 1, 0);
  prev = 2; mono = true; for (const t of [0.1, 1, 3, 10, 30, 100]) { const p = pr(P0, { tauMed: t }).p; if (p > prev) mono = false; prev = p; }
  near('Pr decreases with the time to use the exploit', mono ? 1 : 0, 1, 0);
  prev = -1; mono = true; for (const m of [5, 20, 43, 90, 200]) { const p = pr(P0, { i: { med: m } }).p; if (p < prev) mono = false; prev = p; }
  near('Pr increases with the installation time', mono ? 1 : 0, 1, 0);
  prev = -1; mono = true; for (const w of [0, 0.25, 0.5, 0.75, 1]) { const p = pr(P0, { w0: w }).p; if (p < prev) mono = false; prev = p; }
  near('Pr increases with the zero-day share', mono ? 1 : 0, 1, 0);
  near('quadrature 120 against 240 nodes', L.prob(P0, 120).p, L.prob(P0, 240).p, 2e-3);
  const sc = L.scatter(P0, 600); near('scatter share against exact', sc.filter(q => q.first).length / 600, pr(P0).p, 0.04);
  near('scatter zero-day share', sc.filter(q => q.zero).length / 600, 0.25, 0.03);
  // what moves the race (the numbers of the exercises)
  near('n-days 5 times sooner', pr(P0, { s: 5 }).p, 0.9325, 0.003); near('installation twice as fast', pr(P0, { i: { med: 21.5 } }).p, 0.6174, 0.003);
  near('tau 3 times longer', pr(P0, { tauMed: 3 }).p, 0.7076, 0.003); near('exponential installation clock', pr(P0, { shape: 'exponential' }).p, 0.7009, 0.003);
  near('keep up: installation median at 5 times sooner', L.solveI(L.with(P0, { s: 5 }), 0.73), 10.8, 0.5);
  near('ai diffing: the factor for 85 %', L.solveSpeed(P0, 0.85), 2.38, 0.05);
  near('tau: the median for 60 %', L.solveTau(P0, 0.6), 13.0, 0.4);
  near('zero-day share for 90 %', L.solveW0(P0, 0.9), 0.728, 0.01);
  near('per 10 000 at base rate 0.23 %', pr(L.with(P0, { base: 0.0023 })).per10k, 16.7, 0.3);
  // search
  near('independent draws N = M/2', CR.search.indep(5000, 1e4), 0.3935, 1e-3);
  near('independent draws at N = M', CR.search.indep(1e4, 1e4), 0.6321, 1e-3);
  near('independent against Poisson, large M', CR.search.indep(3e5, 1e7), 1 - Math.exp(-0.03), 1e-6);
  near('systematic N = M/2', CR.search.syst(5000, 1e4), 0.5, 1e-12); near('systematic certain at N = M', CR.search.syst(1e4, 1e4), 1, 1e-12);
  near('wrong prior k = 3, half of the candidates', CR.search.guided(5000, 1e4, 3), 0.125, 1e-12);
  near('right prior k = 0.30103: 50 % within 10 %', CR.search.guided(1000, 1e4, Math.log(0.5) / Math.log(0.1)), 0.5, 1e-9);
  near('attempts for 50 % (independent)', CR.search.need(0.5, 1e4, 1).indep, 1e4 * Math.LN2, 1e-6);
  // parallel runs (the frame: single-run success 1 %, a fifth of the targets reachable)
  near('runs: partitioned certain at n = 100', CR.runs.part(100, 0.01), 1, 1e-12); near('runs: independent 63.4 % at n = 100', CR.runs.indep(100, 0.01), 0.634, 1e-3);
  near('runs: repeating 19.9 % at n = 100', CR.runs.rep(100, 0.01, 0.2), 0.1988, 1e-3); near('runs: repeating plateau 20 %', CR.runs.rep(1e6, 0.01, 0.2), 0.2, 1e-6);
  near('runs: all three start together at n = 1', CR.runs.rep(1, 0.01, 0.2), CR.runs.indep(1, 0.01), 1e-9);
  near('runs for 90 %: independent 229', CR.runs.need(0.9, 0.01, 0.2).indep, 229.1, 0.2); near('runs for 90 %: partitioned 90', CR.runs.need(0.9, 0.01, 0.2).part, 90, 1e-9);
  near('runs for 90 %: repeating never', CR.runs.need(0.9, 0.01, 0.2).rep === Infinity ? 1 : 0, 1, 0);
  near('runs: diversity Q for 50 % at n = 100', CR.runs.rep(100, 0.01, CR.runs.solveQ(100, 0.01, 0.5)), 0.5, 1e-6);
  // containment (4b)
  near('layers: crossover at N = 1e5', CR.cont.crossover(1e-3, 3, 1e-4), 1e5, 20);
  near('layers: N = 1e3, shared cause dominates', CR.cont.layers(1e3, 1e-3, 3, 1e-4).ind, 1e-6, 1e-8); near('layers: N = 1e7, independent part 1e-2', CR.cont.layers(1e7, 1e-3, 3, 1e-4).ind, 1e-2, 1e-4);
  near('layers: total at N = 0 is the floor', CR.cont.layers(0, 1e-3, 3, 1e-4).total, 1e-4, 1e-12);
  near('monitor: z for 30 h against 1 h, sigma 0.8 both', CR.cont.monitor({ esc: 0.01, tdMed: 1, tdSigma: 0.8, tpMed: 30, tpSigma: 0.8 }).z, 3.006, 0.005);
  near('monitor: solved detection time reaches the target', CR.cont.monitor({ esc: 1, tdMed: CR.cont.solveTd({ tpMed: 30, tpSigma: 0.8, tdSigma: 0.8 }, 0.9), tdSigma: 0.8, tpMed: 30, tpSigma: 0.8 }).interrupt, 0.9, 1e-6);
  const cc = { med: 50, sigma: 1 };
  near('paths: closing the cheapest raises the median of r_S', CR.cont.paths(cc, [0, 60, 150, 400], 0.7).median > CR.cont.paths(cc, [20, 60, 150, 400], 0.7).median ? 1 : 0, 1, 0);
  near('paths: one path equals the margin formula', CR.cont.paths(cc, [40], 0.7).p, CR.margin(cc, { med: 40, sigma: 0.7 }).p, 2e-3);
  near('paths: no path open, no success', CR.cont.paths(cc, [0, 0, 0, 0], 0.7).p, 0, 0);
  // backlog
  const Q = { a0: 10, mult: 3, week: 12, cF: 15, cI: 25 };
  let q = CR.queue.sim(Q); near('backlog in front of fixing after 52 weeks', q.BF[51], 600, 1e-9); near('backlog in front of installing', q.BI[51], 0, 1e-9);
  q = CR.queue.sim(Object.assign({}, Q, { cF: 30 })); near('fix capacity 30: fix backlog', q.BF[51], 0, 1e-9); near('fix capacity 30: the bottleneck moves', q.BI[51], 200, 1e-9);
  q = CR.queue.sim(Object.assign({}, Q, { cF: 30, cI: 30 })); near('both 30: no backlog', q.BF[51] + q.BI[51], 0, 1e-9);
  near('steady state throughput', CR.queue.sim(Q).steady, 15, 1e-12);
  // prioritisation (the numbers of the lecture)
  const it = CR.prio.items({ pi1: .02, pi2: .6, pi3: .3, L1: .5, L2: 2, L3: 5, e1: 2, e2: 1, e3: 3 }), o = CR.prio(it, 3);
  near('expected loss V1', o.E[0], 0.01, 1e-12); near('expected loss V2', o.E[1], 1.2, 1e-12); near('expected loss V3', o.E[2], 1.5, 1e-12); near('total', o.total, 2.71, 1e-12);
  near('rank by severity starts with V1', o.bySeverity[0], 0, 0); near('rank by expected loss starts with V3', o.order[0], 2, 0);
  near('break-even pi3', CR.prio.breakEven(it, 2), 0.24, 1e-12);
  near('best set within 3 person-days is V3', o.best.set.length === 1 ? o.best.set[0] : -1, 2, 0); near('best set within 4 is V2 + V3', CR.prio(it, 4).best.gain, 2.7, 1e-12);
}

// ---------------------------------------------------------------------------------------------------
// Every exercise of the bank: the computed solution reaches its own target; every predict question has an answer
// ---------------------------------------------------------------------------------------------------
{
  global.self = global; global.CR = CR; require('./exercises.js'); require('./tabs4.js'); const TT = global.CR_TABS4;
  const clone = o => JSON.parse(JSON.stringify(o));
  const merge = (a, b) => { for (const k in b) { if (b[k] && typeof b[k] === 'object') a[k] = merge(a[k] || {}, b[k]); else a[k] = b[k]; } return a; };
  const base = Object.assign({ c: { med: 3, sigma: 1.0 }, r: { med: 40, sigma: 0.7 }, fail: { med: 4 }, q: 0.85 }, clone(TT.DEFAULTS));
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const setv = (S, id, v) => { const [a, b] = id.split('.'), P = TT.PARAMS[id]; if (P) v = clamp(v, P.min, P.max); if (b) S[a][b] = v; else S[a] = v; };
  for (const d of global.CR_EXERCISES) {
    const S = merge(clone(base), clone(d.setup));
    const unknown = (d.locked || []).filter(id => !(TT.PARAMS[id] || /^(c|r|fail)\./.test(id) || id === 'q' || id === 'life.shape'));
    near('exercise ' + d.id + ': locked ids exist', unknown.length, 0, 0);
    if (d.kind === 'predict') {
      const ans = d.answer(S, CR); near('exercise ' + d.id + ': answer is an option', ans >= 0 && ans < d.options.length ? 1 : 0, 1, 0);
      Object.keys(d.reveal).forEach(k => { const [a, b] = k.split('.'); if (b) S[a][b] = d.reveal[k]; else S[a] = d.reveal[k]; });
      near('exercise ' + d.id + ': explanation text', d.explain(S, CR).length > 20 ? 1 : 0, 1, 0);
    } else {
      near('exercise ' + d.id + ': not solved at the start', d.check(S, CR).ok ? 0 : 1, 1, 0);
      const sol = d.solution(S, CR); Object.keys(sol.apply).forEach(k => setv(S, k, sol.apply[k]));
      const r = d.check(S, CR); near('exercise ' + d.id + ': solution reaches the target (' + r.msg.replace(/<[^>]+>/g, '').slice(0, 70) + ')', r.ok ? 1 : 0, 1, 0);
    }
  }
}

console.log(fails ? fails + ' FAILED' : 'all passed');
process.exit(fails ? 1 : 0);
