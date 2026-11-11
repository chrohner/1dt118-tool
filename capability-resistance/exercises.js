/* exercises.js - exercise bank for the calculator (plain data, loaded with <script>, no fetch, works offline).

   One exercise = one object. Fields:
     id        short unique key (also usable in the URL: index.html#ex=raise-resistance)
     title     card heading
     blurb     one line on the card (optional; default: first sentence of the prompt)
     level     'warm-up' | 'core' | 'stretch'  (label only)
     tab       'success' (capability against resistance), 'control' (control may fail), or one of the lecture 4 tabs:
               'lifecycle' (state S.life), 'search' (S.search), 'backlog' (S.queue), 'prioritise' (S.prio)
     setup     the starting state, merged into the defaults: { c:{med,sigma}, r:{med,sigma}, fail:{med}, q } (medians in hours of a reference adversary),
               or for the lecture 4 tabs e.g. { life:{ rho:80 } } (flat parameter names, see DEFAULTS in tabs4.js)
     locked    ids of controls the student may not change: 'c.med' 'c.sigma' 'r.med' 'r.sigma' 'fail.med' 'q', 'life.rho' 'search.k' 'queue.cF' 'prio.pi3' ...
     prompt    HTML shown in the banner
     kind      'target' (default) or 'predict'
     check(S, CR)      -> { ok:boolean, msg:string }   S is the current state; targets are inequalities, never exact values
     hint      HTML (optional)
     solution(S, CR)   -> { text:HTML, apply:{ 'r.med':745, ... } }   computed with CR, never typed in; apply sets controls
   For kind 'predict' add (answer() sees the state before the reveal, explain() the state after it):
     question  HTML, options [strings], answer(S, CR) -> index of the correct option, reveal:{ 'c.sigma':2 }, explain(S, CR) -> HTML
*/
(function (root) {
  'use strict';
  const pct = x => (100 * x).toPrecision(2).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '') + ' %';
  const num = x => +x.toPrecision(3);
  const int = x => Math.round(x).toLocaleString('en');
  const base = { c: { med: 3, sigma: 1.0 }, r: { med: 40, sigma: 0.7 }, fail: { med: 4 }, q: 0.85 };
  const clone = o => JSON.parse(JSON.stringify(o));
  const contIds = ['cont.cMed', 'cont.cSigma', 'cont.rSigma', 'cont.m1', 'cont.m2', 'cont.m3', 'cont.m4', 'cont.o1', 'cont.o2', 'cont.o3', 'cont.o4', 'cont.L', 'cont.h', 'cont.qc', 'cont.N', 'cont.esc', 'cont.tdMed', 'cont.tdSigma', 'cont.tpMed', 'cont.tpSigma'];
  const contLock = free => contIds.filter(id => !free.includes(id));
  const sci = x => x === 0 ? '0' : x >= 0.01 ? pct(x) : x.toExponential(1).replace('e-', ' \u00D7 10\u207B').replace(/\u207B(\d)(\d?)/, (m, a, b) => '\u207B' + (a + b).split('').map(d => '\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079'[+d]).join(''));
  const openMeds = S => [1, 2, 3, 4].map(k => S.cont['o' + k] ? S.cont['m' + k] : 0);
  const pathsOf = (S, CR) => CR.cont.paths({ med: S.cont.cMed, sigma: S.cont.cSigma }, openMeds(S), S.cont.rSigma);

  root.CR_EXERCISES = [
    {
      id: 'raise-resistance', title: 'Raise the resistance', blurb: 'A targeted adversary breaks the login in 77 % of attempts. How strong must the defence be?', level: 'warm-up', tab: 'success',
      setup: Object.assign(clone(base), { c: { med: 100, sigma: 1.0 } }),
      locked: ['c.med', 'c.sigma', 'r.sigma'],
      prompt: 'A <b>targeted</b> adversary (median capability 100 h) attacks a login whose resistance has median 40 h. ' +
              'Change <b>only the median of the resistance</b> so that the success probability <i>p</i> is at most <b>5 %</b>.',
      hint: 'You need <i>z</i> = &minus;1.645 or lower. Remember that <i>z</i> = (&mu;<sub>c</sub> &minus; &mu;<sub>r</sub>) / &radic;(&sigma;<sub>c</sub>&sup2; + &sigma;<sub>r</sub>&sup2;).',
      check(S, CR) { const k = CR.margin(S.c, S.r);
        return { ok: k.p <= 0.05, msg: 'p = ' + pct(k.p) + (k.p <= 0.05 ? '. Resistance median ' + num(S.r.med) + ' h is enough.' : ': still above 5 %.') }; },
      solution(S, CR) { const sd = Math.hypot(S.c.sigma, S.r.sigma), z = CR.PhiInv(0.05), med = Math.exp(Math.log(S.c.med) - z * sd);
        return { text: 'p &le; 5 % needs <i>z</i> &le; ' + num(z) + ', so &mu;<sub>r</sub> &ge; &mu;<sub>c</sub> + ' + num(-z) + ' &middot; ' + num(sd) +
                       ' = ' + num(Math.log(med)) + ', a median resistance of about <b>' + num(med) + ' h</b>, ' + num(med / S.c.med) + ' times the adversary’s median.',
                 apply: { 'r.med': med } }; }
    },
    {
      id: 'spread-predict', title: 'Same medians, less certainty', blurb: 'Predict first: what does more uncertainty about the adversary do to p?', level: 'core', tab: 'success',
      setup: clone(base), locked: ['c.med', 'r.med', 'r.sigma', 'c.sigma'], kind: 'predict',
      prompt: 'Opportunistic adversary (median 3 h) against the login (median 40 h): <i>p</i> is about 1.7 %.',
      question: 'We admit that we know less about the adversary: the spread &sigma;<sub>c</sub> goes from 1.0 to 2.0, the medians stay. What happens to <i>p</i>?',
      options: ['p goes down', 'p stays the same', 'p goes up'],
      answer(S, CR) { const a = CR.margin(S.c, S.r).p, b = CR.margin({ med: S.c.med, sigma: 2 }, S.r).p; return b > a ? 2 : (b < a ? 0 : 1); },
      reveal: { 'c.sigma': 2.0 },
      explain(S, CR) { const b = CR.margin({ med: S.c.med, sigma: 2 }, S.r);
        return 'p becomes <b>' + pct(b.p) + '</b> (z = ' + b.z.toFixed(2) + '). The median is unchanged, but more spread puts more of the margin on the success side. ' +
               'A wider spread pulls <i>p</i> towards 50 %. Because <i>p</i> is a tail probability, an assumption about the spread can matter as much as one about the median.'; },
      check() { return { ok: true, msg: '' }; }
    },
    {
      id: 'control-reliability', title: 'How reliable must the control be?', blurb: 'A control that sometimes fails: how often may it fail before p exceeds 3 %?', level: 'core', tab: 'control',
      setup: clone(base), locked: ['c.med', 'c.sigma', 'r.med', 'r.sigma', 'fail.med'],
      prompt: 'The control works with probability <i>q</i>; if it fails, the resistance median drops from 40 h to 4 h. The adversary is opportunistic. ' +
              'Change <b>only <i>q</i></b> so that the overall success probability <i>p</i> is at most <b>3 %</b>.',
      hint: '<i>p</i> = <i>q</i> p<sub>eff</sub> + (1 &minus; <i>q</i>) p<sub>fail</sub>. Compute the two conditional probabilities first (they are shown below).',
      check(S, CR) { const m = CR.mixture(S.c, S.r, S.fail.med, S.q);
        return { ok: m.p <= 0.03, msg: 'p = ' + pct(m.p) + (m.p <= 0.03 ? ' with q = ' + S.q.toFixed(2) + '.' : ': above 3 %. The failed state carries ' + pct(m.failShare) + ' of it.') }; },
      solution(S, CR) { const m = CR.mixture(S.c, S.r, S.fail.med, 1), f = CR.margin(S.c, { med: S.fail.med, sigma: S.r.sigma }).p, e = m.p,
          qmin = 1 - (0.03 - e) / (f - e);
        return { text: 'p &le; 3 % needs (1 &minus; <i>q</i>) &le; (0.03 &minus; ' + pct(e) + ') / (' + pct(f) + ' &minus; ' + pct(e) + ') = ' + num(1 - qmin) + ', so <i>q</i> &ge; <b>' + num(qmin) +
                       '</b>. Even a few percent of control failure matter, because the failed state is so much more likely to be beaten.',
                 apply: { q: Math.min(1, Math.ceil(qmin * 100) / 100) } }; }
    },
    {
      id: 'knowledge-shift', title: 'How big a knowledge shift?', blurb: 'A public exploit lifts the whole adversary class. How far until p reaches 50 %?', level: 'stretch', tab: 'success',
      setup: clone(base), locked: ['c.sigma', 'r.med', 'r.sigma'],
      prompt: 'A public exploit raises the efficiency of the whole opportunistic class, so the median capability moves up. ' +
              'Change <b>only the median of the capability</b> until <i>p</i> is between <b>45 % and 55 %</b>. By what factor did the median grow from 3 h?',
      hint: 'What is <i>z</i> when <i>p</i> = 50 %? Then what must be true of the two medians?',
      check(S, CR) { const p = CR.margin(S.c, S.r).p;
        return { ok: p >= 0.45 && p <= 0.55, msg: 'p = ' + pct(p) + '; the median capability grew by a factor ' + num(S.c.med / 3) + (p >= 0.45 && p <= 0.55 ? '.' : '.') }; },
      solution(S, CR) { return { text: '<i>p</i> = 50 % means <i>z</i> = 0, that is &mu;<sub>c</sub> = &mu;<sub>r</sub>: the medians are equal. The capability median must reach <b>' + S.r.med +
                       ' h</b>, a factor <b>' + num(S.r.med / 3) + '</b> over 3 h. The knowledge shift moves the whole distribution; only the margin counts.',
                 apply: { 'c.med': S.r.med } }; }
    }
  ];

  /* ------------------------------------------------------------------------------------------------
     LECTURE 4 exercises. Maths from CR.life, CR.search, CR.queue, CR.prio (calc.js); nothing is typed in.
     ------------------------------------------------------------------------------------------------ */
  const L4 = [
    /* ---- lifecycle clock ---- */
    {
      id: 'which-moves-the-race', title: 'What moves the race?', blurb: 'Predict first: n-days sooner, installation faster, or a longer time to use the exploit?', level: 'warm-up', tab: 'lifecycle',
      setup: {}, locked: ['life.zdShare', 'life.zdMed', 'life.nMed', 'life.nSigma', 'life.tauMed', 'life.iMed', 'life.iSigma', 'life.shape', 'life.base'], kind: 'predict',
      prompt: 'Today the attacker is first in about 72 % of the cases in which an exploit exists (the race frame): zero-days 25 %, n-days a median of 25 days after the patch, installation after a median of 43 days, <i>&tau;</i> a median of 1 day.',
      question: 'Which single change moves that chance the most?',
      options: ['The n-day exploits arrive 5 times sooner (AI patch diffing)', 'Installation is twice as fast', 'The time <i>&tau;</i> to use the exploit is 3 times longer', 'All three move it about the same'],
      answer(S, CR) { const P = CR.life.fromFlat(S.life), p0 = CR.life.prob(P, 120).p, d = [{ nMed: P.nMed / 5 }, { i: { med: P.i.med / 2 } }, { tauMed: P.tauMed * 3 }].map(ch => Math.abs(CR.life.prob(CR.life.with(P, ch), 120).p - p0));
        return d.indexOf(Math.max(...d)); },
      reveal: { 'life.nMed': 5 },
      explain(S, CR) { const P0 = CR.life.fromFlat(Object.assign({}, S.life, { nMed: CR.life.DEFAULT.nMed })), p0 = CR.life.prob(P0, 120).p, f = ch => CR.life.prob(CR.life.with(P0, ch), 120).p;
        const a = f({ nMed: P0.nMed / 5 }), b = f({ i: { med: P0.i.med / 2 } }), c = f({ tauMed: P0.tauMed * 3 });
        return 'From <b>' + pct(p0) + '</b>: n-days 5 times sooner gives <b>' + pct(a) + '</b>, installation twice as fast <b>' + pct(b) + '</b>, <i>&tau;</i> three times longer <b>' + pct(c) + '</b>. ' +
               'The race is between <i>X</i> and <i>I</i>: the time to use the exploit is short next to the window, so it hardly matters. See the bars at the bottom of the tab.'; },
      check() { return { ok: true, msg: '' }; }
    },
    {
      id: 'ai-diffing', title: 'How much sooner must n-days arrive?', blurb: 'AI patch diffing: find the n-day median that puts the attacker first in 85 % of the cases.', level: 'core', tab: 'lifecycle',
      setup: {}, locked: ['life.zdShare', 'life.zdMed', 'life.nSigma', 'life.tauMed', 'life.iMed', 'life.iSigma', 'life.shape', 'life.base'],
      prompt: 'AI patch diffing makes every n-day exploit arrive sooner. Change <b>only the median of the n-days</b> (today 25 days after the patch) so that the attacker is first in at least <b>85 %</b> of the cases (today: 72 %).',
      hint: 'A smaller median moves every n-day sooner. Watch how the filled dots grow to the right of day 0, and compare with the zero-day share of 25 %.',
      check(S, CR) { const p = CR.life.prob(CR.life.fromFlat(S.life)).p;
        return { ok: p >= 0.85, msg: 'The attacker is first in ' + pct(p) + (p >= 0.85 ? ' with an n-day median of ' + num(S.life.nMed) + ' days, ' + num(CR.life.DEFAULT.nMed / S.life.nMed) + ' times sooner than today.' : ': below 85 %.') }; },
      solution(S, CR) { const m = CR.life.solveN(CR.life.fromFlat(S.life), 0.85), d = CR.life.DEFAULT.nMed;
        return { text: 'A median of about <b>' + num(m) + ' days</b> instead of ' + d + ', <b>' + num(d / m) + ' times sooner</b>: this brings the attacker from 72 % to 85 %. The n-days that were slow, weeks after the patch, are the ones that move into the window.', apply: { 'life.nMed': m } }; }
    },
    {
      id: 'keep-up', title: 'Keep up with AI patch diffing', blurb: 'The n-days arrive 5 times sooner: how much faster must installation be to hold today\'s 72 %?', level: 'core', tab: 'lifecycle',
      setup: { life: { nMed: 5 } }, locked: ['life.zdShare', 'life.zdMed', 'life.nMed', 'life.nSigma', 'life.tauMed', 'life.iSigma', 'life.shape', 'life.base'],
      prompt: 'N-day exploits arrive 5 times sooner, a median of 5 days after the patch (the attacker is first in 93 %). Change <b>only the median installation time</b> so that the attacker is first in at most <b>73 %</b> of the cases, as today.',
      hint: 'The window is I &minus; X. When X moves towards 0 the window grows by the same amount, so the installation clock has to shrink by more than the speed-up looks like.',
      check(S, CR) { const p = CR.life.prob(CR.life.fromFlat(S.life)).p;
        return { ok: p <= 0.73, msg: 'The attacker is first in ' + pct(p) + (p <= 0.73 ? ' with an installation median of ' + num(S.life.iMed) + ' days.' : ': still above 73 %.') }; },
      solution(S, CR) { const m = CR.life.solveI(CR.life.fromFlat(S.life), 0.73);
        return { text: 'About <b>' + num(m) + ' days</b> instead of 43, <b>' + num(43 / m) + ' times faster</b>: the n-days became 5 times sooner, and the defender has to become almost as many times faster just to stand still. That is the pressure on installation that more patches and faster exploits put together.', apply: { 'life.iMed': m } }; }
    },
    {
      id: 'tau-late', title: 'When does the time to use the exploit matter?', blurb: 'Find the median time τ that brings the attacker down to 60 %.', level: 'core', tab: 'lifecycle',
      setup: {}, locked: ['life.zdShare', 'life.zdMed', 'life.nMed', 'life.nSigma', 'life.iMed', 'life.iSigma', 'life.shape', 'life.base'],
      prompt: 'Inside the window the margin of resources over resistance is wide and <i>&tau;</i> is short. Change <b>only the median <i>&tau;</i></b> so that the attacker is first in at most <b>60 %</b> of the cases (today: 72 %).',
      hint: 'Compare <i>&tau;</i> with the window: the median installation time is 43 days. A control that works, or a target that is hard, makes <i>&tau;</i> long.',
      check(S, CR) { const p = CR.life.prob(CR.life.fromFlat(S.life)).p;
        return { ok: p <= 0.6, msg: 'The attacker is first in ' + pct(p) + (p <= 0.6 ? ' with <i>&tau;</i> = ' + num(S.life.tauMed) + ' days.' : ': still above 60 %.') }; },
      solution(S, CR) { const t = CR.life.solveTau(CR.life.fromFlat(S.life), 0.6);
        return { text: 'About <b>' + num(t) + ' days</b>, ' + Math.round(100 * t / S.life.iMed) + ' % of the installation median: <i>&tau;</i> matters only when it is long, which is where a working control (tab 2) puts the adversary.', apply: { 'life.tauMed': t } }; }
    },
    {
      id: 'zero-day-share', title: 'More zero-days', blurb: 'How large must the zero-day share be for the attacker to be first in 90 % of the cases?', level: 'core', tab: 'lifecycle',
      setup: {}, locked: ['life.zdMed', 'life.nMed', 'life.nSigma', 'life.tauMed', 'life.iMed', 'life.iSigma', 'life.shape', 'life.base'],
      prompt: 'AI-assisted discovery could put more exploits before the patch. Change <b>only the zero-day share</b> so that the attacker is first in at least <b>90 %</b> of the cases (today: a share of 25 % gives 72 %).',
      hint: 'A zero-day has a window longer than the installation time, so nearly every zero-day case is a case for the attacker. The rest of the cases are n-days.',
      check(S, CR) { const p = CR.life.prob(CR.life.fromFlat(S.life)).p;
        return { ok: p >= 0.9, msg: 'The attacker is first in ' + pct(p) + (p >= 0.9 ? ' with a zero-day share of ' + pct(S.life.zdShare) + '.' : ': below 90 %.') }; },
      solution(S, CR) { const P = CR.life.fromFlat(S.life), w = CR.life.solveW0(P, 0.9), pn = CR.life.prob(CR.life.with(P, { w0: 0 })).p;
        return { text: 'About <b>' + pct(w) + '</b> of the cases would have to be zero-days. The attacker is first in a zero-day case almost always and in ' + pct(pn) + ' of the n-day cases, so the share moves the result linearly between those two.', apply: { 'life.zdShare': w } }; }
    },
    {
      id: 'base-rate', title: 'The base rate', blurb: 'Predict first: how many of 10 000 disclosed vulnerabilities see an attacker first?', level: 'warm-up', tab: 'lifecycle',
      setup: {}, locked: ['life.zdShare', 'life.zdMed', 'life.nMed', 'life.nSigma', 'life.tauMed', 'life.iMed', 'life.iSigma', 'life.shape', 'life.base'], kind: 'predict',
      prompt: 'The race describes the cases in which an exploit exists: the attacker is first in 72 % of them. Most vulnerabilities never get an exploit: Google counted 0.23 % of the 2026 disclosures as seen exploited, a lower bound.',
      question: 'Among 10 000 newly disclosed vulnerabilities, in how many is the attacker first?',
      options: ['About 17', 'About 170', 'About 1 700', 'About 7 200'],
      answer(S, CR) { const v = 1e4 * 0.0023 * CR.life.prob(CR.life.fromFlat(S.life)).p, t = [17, 170, 1700, 7200]; return t.reduce((b, x, i) => Math.abs(Math.log(x / v)) < Math.abs(Math.log(t[b] / v)) ? i : b, 0); },
      reveal: { 'life.base': 0.0023 },
      explain(S, CR) { const R = CR.life.prob(CR.life.fromFlat(S.life));
        return 'About <b>' + int(R.per10k) + '</b>: 0.23 % of 10 000 is 23 vulnerabilities with an exploit, and the attacker is first in ' + pct(R.p) + ' of them. The base rate matters far more than the race: doubling the disclosures doubles this number, speeding up the n-days 5 times raises it by only about ' + Math.round(100 * (CR.life.prob(CR.life.with(CR.life.fromFlat(S.life), { nMed: S.life.nMed / 5 })).p / R.p - 1)) + ' %. See the last line of the calculation.'; },
      check() { return { ok: true, msg: '' }; }
    },
    {
      id: 'shape-of-clocks', title: 'Does the Poisson assumption matter here?', blurb: 'Predict first: an exponential installation clock instead of a lognormal one, same median.', level: 'warm-up', tab: 'lifecycle',
      setup: {}, locked: ['life.zdShare', 'life.zdMed', 'life.nMed', 'life.nSigma', 'life.tauMed', 'life.iMed', 'life.iSigma', 'life.shape', 'life.base'], kind: 'predict',
      prompt: 'The installation clock is lognormal with a median of 43 days, and the attacker is first in 72 % of the cases.',
      question: 'Replace it by an exponential clock with the same median (a constant rate, as in the Poisson assumption of lecture 2). How far does the answer move?',
      options: ['More than 10 percentage points', 'Less than 5 percentage points', 'It drops below 50 %'],
      answer(S, CR) { const P = CR.life.fromFlat(S.life), d = Math.abs(CR.life.prob(P, 120).p - CR.life.prob(CR.life.with(P, { shape: 'exponential' }), 120).p); return d < 0.05 ? 1 : 0; },
      reveal: { 'life.shape': 'exponential' },
      explain(S, CR) { const P = CR.life.fromFlat(Object.assign({}, S.life, { shape: 'lognormal' })), E = CR.life.with(P, { shape: 'exponential' }), q = (X, u) => CR.life.quantile(X, 'i', u);
        const pe = CR.life.prob(E, 120).p, pl = CR.life.prob(P, 120).p;
        return 'It moves to <b>' + pct(pe) + '</b>, about ' + num(100 * (pl - pe)) + ' points: with the exploit mostly early and <i>&tau;</i> short, the median of <i>I</i> carries the answer. The shape matters for the tail: the 90th percentile of <i>I</i> is ' + int(q(P, 0.9)) + ' days for the lognormal clock and ' + int(q(E, 0.9)) + ' days for the exponential one, and the lecture 0 data show a fast cohort and a long tail that neither describes well.'; },
      check() { return { ok: true, msg: '' }; }
    },
    /* ---- search ---- */
    {
      id: 'half-the-candidates', title: 'Half of the candidates', blurb: 'Predict first: 5,000 attempts among 10,000 candidates, independent draws against systematic search.', level: 'warm-up', tab: 'search',
      setup: { search: { M: 1e4, rate: 100, days: 1, k: 1 } }, locked: ['search.M', 'search.rate', 'search.days', 'search.k'], kind: 'predict',
      prompt: 'A target hides among 10,000 equally likely candidates. At the moment the attacker makes 100 attempts.',
      question: 'Now the attacker makes 5,000 attempts, half of the candidates. What is the probability that the target has been found?',
      options: ['50 % with either strategy', '39 % with independent draws, 50 % without repetition', '63 % with independent draws, 50 % without repetition'],
      answer(S, CR) { const a = CR.search.indep(5000, S.search.M), b = CR.search.syst(5000, S.search.M); return Math.abs(a - 0.393) < 0.01 && Math.abs(b - 0.5) < 1e-9 ? 1 : 0; },
      reveal: { 'search.rate': 5000 },
      explain(S, CR) { return 'Independent draws repeat candidates, so 5,000 draws find the target with probability 1 &minus; (1 &minus; 1/<i>M</i>)<sup><i>N</i></sup> = <b>' + pct(CR.search.indep(5000, S.search.M)) + '</b>; trying each candidate once gives <b>50 %</b>. Independent draws reach 63 % only after <i>N</i> = <i>M</i> attempts, and are never certain; systematic search is certain at <i>N</i> = <i>M</i>.'; },
      check() { return { ok: true, msg: '' }; }
    },
    {
      id: 'knowledge-pays', title: 'How sharp must the knowledge be?', blurb: 'A prior that finds the target with probability 50 % within the first 10 % of the candidates.', level: 'core', tab: 'search',
      setup: { search: { M: 1e4, rate: 100, days: 10, k: 1 } }, locked: ['search.M', 'search.rate', 'search.days'],
      prompt: 'The attacker makes <i>N</i> = 1,000 attempts, 10 % of the 10,000 candidates, in a guided search. Change <b>only the prior exponent <i>k</i></b> so that the guided search has found the target with probability at least <b>50 %</b>.',
      hint: 'The first <i>N</i> candidates hold the share (<i>N</i>/<i>M</i>)<sup><i>k</i></sup> of the probability. Which <i>k</i> makes 0.1<sup><i>k</i></sup> equal to 0.5?',
      check(S, CR) { const p = CR.search.guided(S.search.rate * S.search.days, S.search.M, S.search.k);
        return { ok: p >= 0.5, msg: 'Guided search finds it with probability ' + pct(p) + (p >= 0.5 ? ' (k = ' + S.search.k.toFixed(2) + ').' : ': below 50 %.') }; },
      solution(S, CR) { const r = (S.search.rate * S.search.days) / S.search.M, k = Math.log(0.5) / Math.log(r);
        return { text: '0.1<sup><i>k</i></sup> &ge; 0.5 needs <i>k</i> &le; ln 0.5 / ln 0.1 = <b>' + num(k) + '</b>. The knowledge must put half of the probability in the first tenth of the candidates, a strong prior; independent draws need ' + num(CR.search.need(0.5, S.search.M, 1).indep) + ' attempts for the same result.',
                 apply: { 'search.k': Math.floor(k * 100) / 100 } }; }
    },
    {
      id: 'wrong-prior', title: 'A prior that misleads', blurb: 'Predict first: what does a wrong heuristic cost?', level: 'core', tab: 'search',
      setup: { search: { M: 1e4, rate: 500, days: 10, k: 1 } }, locked: ['search.M', 'search.rate', 'search.days', 'search.k'], kind: 'predict',
      prompt: 'After 5,000 attempts among 10,000 candidates, a search with no knowledge (<i>k</i> = 1) has found the target with probability 50 %.',
      question: 'The attacker follows a heuristic that is wrong: the target is in fact among the candidates it tries last (<i>k</i> = 3). Probability of having found the target after the same 5,000 attempts?',
      options: ['Still 50 %: attempts are attempts', 'Below 50 %: a wrong heuristic is worse than no knowledge', 'Above 50 %: more structure always helps'],
      answer() { return 1; },
      reveal: { 'search.k': 3 },
      explain(S, CR) { return 'It falls to <b>' + pct(CR.search.guided(5000, S.search.M, 3)) + '</b>. Knowledge is a bet: it reorders the search, and when it is wrong the attacker pays for it. This is why the strength of a heuristic is itself uncertain, and why a cheap, reliable check of the result matters.'; },
      check() { return { ok: true, msg: '' }; }
    },
    {
      id: 'runs-to-ninety', title: 'How many parallel runs?', blurb: 'One run finds the flaw with 1 %. How many independent runs reach 90 %?', level: 'core', tab: 'search',
      setup: {}, locked: ['search.rp', 'search.rq', 'search.M', 'search.rate', 'search.days', 'search.k'],
      prompt: 'One run of an agent finds the flaw with probability <b>1 %</b>. Change <b>only the number of parallel runs</b> so that <b>independent</b> runs (a run may repeat another) reach at least <b>90 %</b>.',
      hint: 'The chance that all <i>n</i> runs fail is (1 &minus; <i>p</i>)<sup><i>n</i></sup>. Compare the three curves at your number: what would the other two models need?',
      check(S, CR) { const v = CR.runs.indep(Math.round(S.search.rn), S.search.rp);
        return { ok: v >= 0.9, msg: 'Independent runs reach ' + pct(v) + (v >= 0.9 ? ' with ' + int(S.search.rn) + ' runs.' : ': below 90 %.') }; },
      solution(S, CR) { const k = CR.runs.need(0.9, S.search.rp, S.search.rq), n = Math.ceil(k.indep);
        return { text: 'About <b>' + int(n) + ' runs</b> for independent runs, <b>' + int(Math.ceil(k.part)) + '</b> if every run covers a new slice (partitioned), and <b>never</b> for runs that repeat each other: they stop at ' + pct(S.search.rq) + '. The number of runs is the budget; what turns it into coverage is how different the runs are.', apply: { 'search.rn': n } }; }
    },
    {
      id: 'runs-plateau', title: 'Why more runs stop helping', blurb: 'Predict first: runs that share a prior and a method, from 100 to 10 000 runs.', level: 'warm-up', tab: 'search',
      setup: {}, locked: ['search.rp', 'search.rq', 'search.rn', 'search.M', 'search.rate', 'search.days', 'search.k'], kind: 'predict',
      prompt: 'Runs that share the same prior and the same method fail on the same targets. In the picture a fifth of the targets are reachable, with 5 % per run. At 100 runs the chance is 20 %.',
      question: 'You raise the number of runs from 100 to 10 000. What happens to the chance for runs that repeat each other?',
      options: ['It rises to about 63 %', 'It rises to nearly 100 %', 'It hardly changes: it stays at about 20 %'],
      answer(S, CR) { const a = CR.runs.rep(Math.round(S.search.rn), S.search.rp, S.search.rq), b = CR.runs.rep(10000, S.search.rp, S.search.rq); return b - a < 0.03 ? 2 : (b < 0.9 ? 0 : 1); },
      reveal: { 'search.rn': 10000 },
      explain(S, CR) { const s = S.search;
        return 'It stays at <b>' + pct(CR.runs.rep(s.rn, s.rp, s.rq)) + '</b>. The plateau is the share <i>Q</i> of targets that this kind of run can reach: for the other targets the chance per run is zero, however many runs there are. Independent runs would reach ' + pct(CR.runs.indep(s.rn, s.rp)) + '. Budget buys coverage only as far as the runs differ.'; },
      check() { return { ok: true, msg: '' }; }
    },
    {
      id: 'runs-diversity', title: 'How diverse must the runs be?', blurb: 'Change the share of reachable targets Q so that runs that repeat each other reach 50 % at 100 runs.', level: 'core', tab: 'search',
      setup: {}, locked: ['search.rp', 'search.rn', 'search.M', 'search.rate', 'search.days', 'search.k'],
      prompt: 'With 100 runs of success 1 % each, runs that repeat each other reach 20 %. Change <b>only the share <i>Q</i> of reachable targets</b> (the diversity of prior and method) so that they reach at least <b>50 %</b>.',
      hint: 'Q is the plateau, so it must be above 50 %. At Q = 1 the runs behave like independent runs and reach 63 %.',
      check(S, CR) { const v = CR.runs.rep(Math.round(S.search.rn), S.search.rp, S.search.rq);
        return { ok: v >= 0.5, msg: 'Runs that repeat each other reach ' + pct(v) + (v >= 0.5 ? ' with Q = ' + pct(S.search.rq) + '.' : ': below 50 %.') }; },
      solution(S, CR) { const Q = CR.runs.solveQ(Math.round(S.search.rn), S.search.rp, 0.5);
        return { text: '<i>Q</i> must be about <b>' + pct(Q) + '</b>: the runs have to be able to reach most of the targets before budget helps. Diversity of prior, method and starting point is what turns runs into coverage.', apply: { 'search.rq': Math.min(1, Q) } }; }
    },
    /* ---- backlog ---- */
    {
      id: 'where-it-piles', title: 'Where does the backlog pile up?', blurb: 'Predict first: finding triples in week 12, capacities unchanged.', level: 'core', tab: 'backlog',
      setup: { queue: { mult: 1 } }, locked: ['queue.a0', 'queue.mult', 'queue.week', 'queue.cF', 'queue.cI'], kind: 'predict',
      prompt: 'Ten verified findings per week; the vendor can fix 15 per week and this organisation can install 25 per week. Nothing waits.',
      question: 'From week 12 AI triples the findings to 30 per week. Capacities do not change. Where does the backlog grow?',
      options: ['In front of fixing', 'In front of installing', 'Nowhere: the capacity is enough'],
      answer(S, CR) { const r = CR.queue.sim(Object.assign({}, S.queue, { mult: 3 })); return r.BF[51] > r.BI[51] ? 0 : (r.BI[51] > 0 ? 1 : 2); },
      reveal: { 'queue.mult': 3 },
      explain(S, CR) { const r = CR.queue.sim(S.queue); return 'In front of fixing: <b>' + int(r.BF[51]) + '</b> findings after a year, because 30 arrive and 15 leave per week. Installing sees only the 15 that get fixed, below its capacity of 25, so it stays empty. The queue appears at the first overloaded stage, and it adds about ' + int(r.waitF * 7) + ' days to the fix time of a new finding.'; },
      check() { return { ok: true, msg: '' }; }
    },
    {
      id: 'raise-fix-capacity', title: 'Raise the fixing capacity', blurb: 'Bring the fix backlog under 100, then look at the installing stage.', level: 'core', tab: 'backlog',
      setup: { queue: { mult: 3 } }, locked: ['queue.a0', 'queue.mult', 'queue.week', 'queue.cI'],
      prompt: 'Findings are 30 per week from week 12. Change <b>only the fixing capacity</b> so that the backlog in front of fixing is at most <b>100</b> after 52 weeks. Then look at what happens in front of installing.',
      hint: 'The backlog grows by (arrivals &minus; capacity) per week for the 40 weeks after week 12.',
      check(S, CR) { const r = CR.queue.sim(S.queue); const ok = r.BF[51] <= 100;
        return { ok, msg: 'Fix backlog ' + int(r.BF[51]) + (ok ? ' with a capacity of ' + S.queue.cF + ' per week. Installing now has a backlog of ' + int(r.BI[51]) + ': the bottleneck moved.' : ': still above 100. Installing: ' + int(r.BI[51]) + '.') }; },
      solution(S, CR) { let c = 1; while (c < 80 && CR.queue.sim(Object.assign({}, S.queue, { cF: c })).BF[51] > 100) c++;
        const r = CR.queue.sim(Object.assign({}, S.queue, { cF: c }));
        return { text: 'A fixing capacity of <b>' + c + ' per week</b> is enough (backlog ' + int(r.BF[51]) + '). But then ' + c + ' fixes arrive per week in front of installing, whose capacity is ' + S.queue.cI + ', and the backlog there is ' + int(r.BI[51]) + ': the bottleneck moves, it does not vanish.', apply: { 'queue.cF': c } }; }
    },
    {
      id: 'move-the-bottleneck', title: 'Both backlogs under control', blurb: 'Keep both backlogs under 100 with as little total capacity as you can.', level: 'stretch', tab: 'backlog',
      setup: { queue: { mult: 3 } }, locked: ['queue.a0', 'queue.mult', 'queue.week'],
      prompt: 'Findings are 30 per week from week 12. Change the <b>fixing and installing capacities</b> so that <b>both</b> backlogs are at most <b>100</b> after 52 weeks, using as little total capacity (fixing + installing) as you can.',
      hint: 'A stage that receives <i>c</i> per week and can process <i>c</i><sub>I</sub> builds a backlog only if <i>c</i> exceeds <i>c</i><sub>I</sub>.',
      check(S, CR) { const r = CR.queue.sim(S.queue), ok = r.BF[51] <= 100 && r.BI[51] <= 100, tot = S.queue.cF + S.queue.cI;
        return { ok, msg: 'Backlogs: fixing ' + int(r.BF[51]) + ', installing ' + int(r.BI[51]) + '; total capacity ' + tot + (ok ? '.' : ': one of them is still above 100.') }; },
      solution(S, CR) { let best = null; for (let a = 1; a <= 80; a++) for (let b = 1; b <= 80; b++) { const r = CR.queue.sim(Object.assign({}, S.queue, { cF: a, cI: b })); if (r.BF[51] <= 100 && r.BI[51] <= 100 && (!best || a + b < best[0] + best[1])) best = [a, b]; }
        return { text: 'The smallest total is about <b>' + (best[0] + best[1]) + '</b> per week (fixing ' + best[0] + ', installing ' + best[1] + '). Both stages must be able to take what the finding stage delivers: useful throughput is the minimum of the three, so capacity added in one place helps only up to the next stage.', apply: { 'queue.cF': best[0], 'queue.cI': best[1] } }; }
    },
    /* ---- prioritise ---- */
    {
      id: 'one-patch-set', title: 'Which patches within the capacity?', blurb: 'Predict first: capacity for 3 person-days, which choice removes the most expected loss?', level: 'warm-up', tab: 'prioritise',
      setup: { prio: { cap: 1 } }, locked: ['prio.pi1', 'prio.pi2', 'prio.pi3', 'prio.L1', 'prio.L2', 'prio.L3', 'prio.e1', 'prio.e2', 'prio.e3', 'prio.cap'], kind: 'predict',
      prompt: 'Three vulnerabilities (see the table; the fixing effort is V1 2, V2 1 and V3 3 person-days). With one person-day only V2 fits.',
      question: 'Capacity rises to 3 person-days. Which choice removes the most expected loss?',
      options: ['V1: it has the highest severity score', 'V2 and V1 together: both fit in 3 days', 'V3 alone: it uses all 3 days'],
      answer(S, CR) { const o = CR.prio(CR.prio.items(Object.assign({}, S.prio, { cap: 3 })), 3); return o.best.set.length === 1 && o.best.set[0] === 2 ? 2 : (o.best.set.includes(0) && o.best.set.includes(1) ? 1 : 0); },
      reveal: { 'prio.cap': 3 },
      explain(S, CR) { return 'V3 alone removes <b>1.5</b> MSEK of expected loss; V2 + V1 together remove 1.2 + 0.01 = 1.21. The best ratio of loss to effort (V2) is not the best set: the order by value per person-day is not the best choice when what fits is limited.'; },
      check() { return { ok: true, msg: '' }; }
    },
    {
      id: 'flip-v3', title: 'What flips the order?', blurb: 'How low can the exploit probability of V3 fall before V2 should be fixed first?', level: 'core', tab: 'prioritise',
      setup: {}, locked: ['prio.pi1', 'prio.pi2', 'prio.L1', 'prio.L2', 'prio.L3', 'prio.e1', 'prio.e2', 'prio.e3', 'prio.cap'],
      prompt: 'V3 has the largest expected loss. Change <b>only <i>&pi;</i><sub>3</sub></b> so that V2 has a larger expected loss than V3.',
      hint: 'The expected loss of V3 is 5&pi;<sub>3</sub> and that of V2 is 0.6 &times; 2 = 1.2.',
      check(S, CR) { const o = CR.prio(CR.prio.items(S.prio), S.prio.cap), ok = o.E[1] > o.E[2];
        return { ok, msg: 'V3: ' + num(o.E[2]) + ' MSEK against V2: ' + num(o.E[1]) + (ok ? ': V2 comes first.' : ': V3 still comes first.') }; },
      solution(S, CR) { const be = CR.prio.breakEven(CR.prio.items(S.prio), 2);
        return { text: 'V2 overtakes V3 when <i>&pi;</i><sub>3</sub> &lt; 1.2/5 = <b>' + num(be) + '</b>. The assumed value is 0.3, so the margin is small: an estimate of 0.3 &plusmn; 0.1 does not settle the order.', apply: { 'prio.pi3': Math.floor(be * 100 - 1) / 100 } }; }
    },
    {
      id: 'what-would-you-believe', title: 'What would you have to believe?', blurb: 'Make V1, the highest severity, the first priority by changing what you believe about it.', level: 'stretch', tab: 'prioritise',
      setup: {}, locked: ['prio.pi2', 'prio.pi3', 'prio.L2', 'prio.L3', 'prio.e1', 'prio.e2', 'prio.e3', 'prio.cap'],
      prompt: 'V1 is an internal test server that is not reachable from the internet. Change <b><i>&pi;</i><sub>1</sub> and <i>L</i><sub>1</sub></b> so that V1 has the <b>largest expected loss</b> of the three.',
      hint: 'V3 has 1.5 MSEK. What product of probability and loss beats that? Then ask whether you would believe the numbers you chose.',
      check(S, CR) { const o = CR.prio(CR.prio.items(S.prio), S.prio.cap), ok = o.order[0] === 0;
        return { ok, msg: 'V1: ' + num(o.E[0]) + ' MSEK (' + num(S.prio.pi1) + ' &times; ' + num(S.prio.L1) + '), the largest of the other two is ' + num(Math.max(o.E[1], o.E[2])) + (ok ? '. Is that believable for a server that is not reachable? This is an open question for the uncertainty ledger.' : '.') }; },
      solution(S, CR) { const need = Math.max(S.prio.pi2 * S.prio.L2, S.prio.pi3 * S.prio.L3), L = need / 0.3 * 1.05;
        return { text: 'V1 needs <i>&pi;</i><sub>1</sub><i>L</i><sub>1</sub> &gt; ' + num(need) + ' MSEK: for example <i>&pi;</i><sub>1</sub> = 0.3 and <i>L</i><sub>1</sub> = ' + num(L) + ' MSEK. With the unreachable server that is a probability 15 times the stated value and a loss 100 times the stated loss: the order is robust against all but extreme beliefs.', apply: { 'prio.pi1': 0.3, 'prio.L1': L } }; }
    },
    /* ---- containment (lecture 4b) ---- */
    {
      id: 'close-the-cheapest', title: 'Close the cheapest way out', blurb: 'Predict first: what happens to the sandbox when its cheapest way out is closed?', level: 'warm-up', tab: 'containment',
      setup: {}, locked: contLock([]), kind: 'predict',
      prompt: 'A sandbox has four ways out with median efforts of 20, 60, 150 and 400 hours. The model brings a median of 50 hours (spread 1). It gets out in about 80 % of the cases; the median resistance of the sandbox is about 19 hours, below the cheapest way, because any of the ways may turn out cheap.',
      question: 'Close the cheapest way out (20 hours). What happens to the median resistance of the sandbox?',
      options: ['It jumps to 60 hours, the median of the next way', 'It rises, but to less than 60 hours', 'It hardly changes'],
      answer(S, CR) { const a = pathsOf(S, CR).median, b = CR.cont.paths({ med: S.cont.cMed, sigma: S.cont.cSigma }, [0, S.cont.m2, S.cont.m3, S.cont.m4], S.cont.rSigma).median; return b < S.cont.m2 && b > 1.5 * a ? 1 : (b >= S.cont.m2 ? 0 : 2); },
      reveal: { 'cont.o1': 0 },
      explain(S, CR) { const st = pathsOf(S, CR), all = CR.cont.paths({ med: S.cont.cMed, sigma: S.cont.cSigma }, [S.cont.m1, S.cont.m2, S.cont.m3, S.cont.m4], S.cont.rSigma);
        return 'The median resistance becomes <b>' + num(st.median) + ' hours</b> (it was ' + num(all.median) + ') and the success falls from ' + pct(all.p) + ' to <b>' + pct(st.p) + '</b>. Closing a way raises the resistance, but only to the minimum over the ways that remain, and the other ways can still be the cheap ones. Close them one by one and watch the numbers.'; },
      check() { return { ok: true, msg: '' }; }
    },
    {
      id: 'weakest-path', title: 'How many ways must be closed?', blurb: 'Close ways out, cheapest first, until the model gets out in at most 20 % of the cases.', level: 'core', tab: 'containment',
      setup: {}, locked: contLock(['cont.o1', 'cont.o2', 'cont.o3', 'cont.o4']),
      prompt: 'The model gets out in about 80 % of the cases. Tick off ways out (<b>close the cheapest first</b>) until the success probability is at most <b>20 %</b>. How many ways have to be closed?',
      hint: 'The resistance is the minimum over the open ways, so only closing the cheapest ones raises it. Closing the most expensive way first changes almost nothing.',
      check(S, CR) { const st = pathsOf(S, CR), n = [1, 2, 3, 4].filter(k => !S.cont['o' + k]).length;
        return { ok: st.p <= 0.2, msg: 'Success ' + pct(st.p) + ' with ' + n + ' way' + (n === 1 ? '' : 's') + ' closed' + (st.p <= 0.2 ? '.' : ': above 20 %.') }; },
      solution(S, CR) { const order = [1, 2, 3, 4].sort((a, b) => S.cont['m' + a] - S.cont['m' + b]), apply = {}; let n = 0, ok = false;
        const c = { med: S.cont.cMed, sigma: S.cont.cSigma };
        for (let k = 0; k <= 4 && !ok; k++) { const meds = [1, 2, 3, 4].map(w => order.slice(0, k).includes(w) ? 0 : S.cont['m' + w]); if (CR.cont.paths(c, meds, S.cont.rSigma).p <= 0.2) { ok = true; n = k; order.slice(0, k).forEach(w => apply['cont.o' + w] = 0); } }
        return { text: 'Closing the <b>' + n + ' cheapest ways</b> brings the success down to 20 % or less; one way is not enough, because the next way is still cheap enough for a strong model. Every path that is permitted is a path.', apply }; }
    },
    {
      id: 'floor-or-scale', title: 'Floor or scale?', blurb: 'Predict first: three layers and a shared misconfiguration; which cause dominates at 10^3, 10^5 and 10^7 attempts?', level: 'core', tab: 'containment',
      setup: {}, locked: contLock([]), kind: 'predict',
      prompt: 'Three layers; an attempt passes each with probability 10<sup>&minus;3</sup>, independently. One misconfiguration that disables all three exists in the deployment with probability 10<sup>&minus;4</sup>, and if it exists the agent finds it.',
      question: 'For 10<sup>3</sup>, 10<sup>5</sup> and 10<sup>7</sup> attempts: which cause dominates the chance of a breach?',
      options: ['The independent layers, at all three', 'The shared misconfiguration at 10<sup>3</sup>, equal at 10<sup>5</sup>, the independent layers at 10<sup>7</sup>', 'The shared misconfiguration, at all three'],
      answer(S, CR) { const L = n => CR.cont.layers(n, S.cont.h, S.cont.L, S.cont.qc); return L(1e3).shared > L(1e3).ind && Math.abs(Math.log10(L(1e5).shared / L(1e5).ind)) < 0.1 && L(1e7).ind > L(1e7).shared ? 1 : 0; },
      reveal: { 'cont.N': 1e7 },
      explain(S, CR) { const L = n => CR.cont.layers(n, S.cont.h, S.cont.L, S.cont.qc);
        return 'At 10<sup>3</sup> attempts the independent part is ' + sci(L(1e3).ind) + ' against ' + sci(L(1e3).shared) + '; at 10<sup>5</sup> they are equal; at 10<sup>7</sup> it is ' + sci(L(1e7).ind) + '. The shared cause is drawn once, so it is a floor whatever the number of attempts; the layers are tried again every time, so their part grows with <i>N</i>. The product of the marginals, 10<sup>&minus;9</sup>, is wrong by five orders of magnitude at a thousand attempts.'; },
      check() { return { ok: true, msg: '' }; }
    },
    {
      id: 'crossover', title: 'Add layers: where does the crossover move?', blurb: 'Change the number of layers so that the independent layers overtake the shared cause only after 10^8 attempts.', level: 'core', tab: 'containment',
      setup: {}, locked: contLock(['cont.L']),
      prompt: 'The independent layers overtake the shared cause after about 10<sup>5</sup> attempts. Change <b>only the number of layers</b> so that this happens only after at least <b>10<sup>8</sup> attempts</b>.',
      hint: 'The independent part per attempt is <i>h</i><sup><i>L</i></sup>. The crossover is where <i>N</i> <i>h</i><sup><i>L</i></sup> equals the shared cause <i>q</i>.',
      check(S, CR) { const Nx = CR.cont.crossover(S.cont.h, S.cont.L, S.cont.qc);
        return { ok: Nx >= 1e8, msg: 'With ' + S.cont.L + ' layers they cross at N = ' + int(Nx).replace(/,/g, ' ') + (Nx >= 1e8 ? '.' : ': below 10^8.') }; },
      solution(S, CR) { let L = 1; while (L < 6 && CR.cont.crossover(S.cont.h, L, S.cont.qc) < 1e8) L++;
        return { text: '<b>' + L + ' layers</b>. But the floor does not move: the breach chance never falls below the shared cause, ' + sci(S.cont.qc) + '. More layers buy attempts, not independence from the misconfiguration.', apply: { 'cont.L': L } }; }
    },
    {
      id: 'floor-at-scale', title: 'Fix the floor at scale', blurb: 'Predict first: at 10^7 attempts the shared cause is cut by a factor 100.', level: 'core', tab: 'containment',
      setup: { cont: { N: 1e7 } }, locked: contLock([]), kind: 'predict',
      prompt: 'At 10<sup>7</sup> attempts the breach chance is about 1 %, almost all of it from the independent layers.',
      question: 'You remove the shared misconfiguration almost completely: its probability falls from 10<sup>&minus;4</sup> to 10<sup>&minus;6</sup>. By how much does the breach chance fall?',
      options: ['By a factor of about 100', 'By about 1 %: it hardly changes', 'It is halved'],
      answer(S, CR) { const a = CR.cont.layers(S.cont.N, S.cont.h, S.cont.L, S.cont.qc).total, b = CR.cont.layers(S.cont.N, S.cont.h, S.cont.L, 1e-6).total; return a / b > 50 ? 0 : (a / b < 1.05 ? 1 : 2); },
      reveal: { 'cont.qc': 1e-6 },
      explain(S, CR) { const a = CR.cont.layers(S.cont.N, S.cont.h, S.cont.L, 1e-4).total, b = CR.cont.layers(S.cont.N, S.cont.h, S.cont.L, S.cont.qc).total;
        return 'From <b>' + sci(a) + '</b> to <b>' + sci(b) + '</b>. At machine scale the independent layers dominate, so fixing the floor changes little. What helps now is a lower pass rate per layer, more layers, or fewer attempts: the effort has to go where the chance comes from.'; },
      check() { return { ok: true, msg: '' }; }
    },
    {
      id: 'response-time', title: 'How fast must the response be?', blurb: 'Change the detection-and-response time so that at least 99 % of the escapes are interrupted before the loss.', level: 'core', tab: 'containment',
      setup: { cont: { tdMed: 8 } }, locked: contLock(['cont.tdMed']),
      prompt: 'After an escape the loss needs a median of 30 hours. Detection and response now take a median of 8 hours (both spreads 0.8), and 88 % of the escapes are interrupted first. Change <b>only the median detection-and-response time</b> so that at least <b>99 %</b> are interrupted before the loss.',
      hint: 'This is the margin formula of lecture 2 with two times: the defender wins when detection and response are shorter than the progression. You need <i>z</i> = 2.33 or more.',
      check(S, CR) { const M = CR.cont.monitor({ esc: S.cont.esc, tdMed: S.cont.tdMed, tdSigma: S.cont.tdSigma, tpMed: S.cont.tpMed, tpSigma: S.cont.tpSigma });
        return { ok: M.interrupt >= 0.99, msg: 'Interrupted first: ' + pct(M.interrupt) + (M.interrupt >= 0.99 ? ' with a response median of ' + num(S.cont.tdMed) + ' hours.' : ': below 99 %.') }; },
      solution(S, CR) { const t = CR.cont.solveTd({ tpMed: S.cont.tpMed, tpSigma: S.cont.tpSigma, tdSigma: S.cont.tdSigma }, 0.99);
        return { text: 'About <b>' + num(t) + ' hours</b>: four times faster than 8. Going from 88 % to 99 % interrupted takes a response four times as fast, and each further step costs more. The loss is the escape chance times what is left over, ' + pct(S.cont.esc) + ' &times; 1 %.', apply: { 'cont.tdMed': t } }; }
    },
    {
      id: 'result-expires', title: 'A containment result expires', blurb: 'Predict first: the budget of the agent rises a thousand-fold.', level: 'stretch', tab: 'containment',
      setup: { cont: { N: 1e4 } }, locked: contLock([]), kind: 'predict',
      prompt: 'A test with 10<sup>4</sup> attempts against the three layers and the shared cause gives a breach chance of about 1 &times; 10<sup>&minus;4</sup>. A containment result holds for this model, these tools, this budget and this system.',
      question: 'The budget of the agent rises a thousand-fold, to 10<sup>7</sup> attempts. What happens to the breach chance?',
      options: ['It stays at about 10<sup>&minus;4</sup>', 'It rises about 90-fold, to about 10<sup>&minus;2</sup>', 'It rises a thousand-fold, to about 10<sup>&minus;1</sup>'],
      answer(S, CR) { const a = CR.cont.layers(S.cont.N, S.cont.h, S.cont.L, S.cont.qc).total, b = CR.cont.layers(1e7, S.cont.h, S.cont.L, S.cont.qc).total, r = b / a; return r < 2 ? 0 : (r < 300 ? 1 : 2); },
      reveal: { 'cont.N': 1e7 },
      explain(S, CR) { const a = CR.cont.layers(1e4, S.cont.h, S.cont.L, S.cont.qc).total, b = CR.cont.layers(S.cont.N, S.cont.h, S.cont.L, S.cont.qc).total;
        return 'From <b>' + sci(a) + '</b> to <b>' + sci(b) + '</b>, about ' + int(b / a) + ' times more: the shared cause is a floor and only the independent part grew. A result that was true at ten thousand attempts says little at ten million, so it expires when the budget, the model, the tools or the system change.'; },
      check() { return { ok: true, msg: '' }; }
    }
  ];
  root.CR_EXERCISES = root.CR_EXERCISES.concat(L4);
})(typeof self !== 'undefined' ? self : this);
