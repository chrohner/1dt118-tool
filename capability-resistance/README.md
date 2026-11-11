# Capability against resistance: interactive calculator (lectures 2 and 4)

A single offline page for students (and for the lecturer in class) that shows the framework of lecture 2: the attack succeeds when the effort the adversary can bring, $c_A$, exceeds the effort the attack needs, $r_S$. Both are lognormal, so the success probability is $p=\Phi(z)$ with $z=(\mu_c-\mu_r)/\sqrt{\sigma_c^2+\sigma_r^2}$. Background and decisions: `foundations/RISK_FRAMEWORK.md`.

## Use

Open `index.html` in a browser (Chrome, Firefox, Safari). No server, no network, no build step, no downloads. The four files must stay together: `index.html`, `calc.js`, `exercises.js`, `tabs4.js`.

- **Tab 1, success probability.** Two effort densities on a log-hours axis (capability solid vermillion, resistance dashed blue); below them the log-margin $\ln c_A-\ln r_S$ with the success tail shaded (the shaded area is $p$, drawn with true densities); a step-by-step calculation; a chart of how $p$ moves if the spread is larger or smaller (logit scale). Drag the filled dot to move a median and the open diamond to change a spread, or use the sliders and number fields; arrow keys work on a focused handle (shift for bigger steps). A checkbox shows the overlap of the two curves, labelled as the misconception it is.
- **Tab 2, the control may fail.** The resistance is a mixture of an effective state (weight $q$) and a failed state; the two weighted tails add up to $p=q\,p_{\rm eff}+(1-q)\,p_{\rm fail}$.
- **Exercises.** Each exercise loads a starting situation, locks what the student may not change, and checks an inequality. Hint, computed solution and "apply" are available. A predict-first type reveals the effect after the student commits.

### Lecture 4 and 4b tabs (3 to 7)

Same framework, with time added (rewritten 2026-11-11 to follow the lecture 4 deck). Day 0 is the patch release; effort is in hours of a reference adversary. Capability never grows with time: time sets how many attacks there are and how long one takes.

- **Tab 3, lifecycle race.** $X$ is a mixture: a zero-day share (default 25 %, median 14 days before the patch) and n-days with the timing of Mandiant's 41 n-days of 2023 (12, 29, 56, 95 % within a day, a week, a month, six months), divided by an n-day speed factor (AI patch diffing). $I$ is lognormal (median 43 days, Verizon DBIR 2026) or exponential. $\tau$ is the time the adversary needs on the target, exponential with a median in days. The attacker is first when $X+\tau<I$; the probability is computed exactly by quadrature. Panels: the dates, the scatter of $X$ against $I$, and "what moves the race" (five single changes). A base-rate slider turns the result into cases per 10 000 disclosed vulnerabilities. Card export for the timeline card.
- **Tab 4, search.** $M$ candidates, $N$ attempts (= attempts per day times days): independent draws, systematic search, guided search by a prior. New: **parallel runs**, with one run succeeding with probability $p$: partitioned runs ($np$), independent runs ($1-(1-p)^n$) and runs that repeat each other (a share $Q$ of the targets is reachable, so the curve stops at $Q$).
- **Tab 5, backlog.** Finding, fixing and installing as stages in series, weekly fluid model, no randomness. AI multiplies the finding rate from a week. Backlog in front of fixing and installing, useful throughput = the smallest capacity.
- **Tab 6, prioritise.** The three vulnerabilities of the course case: expected loss $\pi L$, ranking by severity, by expected loss and by loss per person-day, the best set within a capacity, and the $\pi_3$ at which the order flips.
- **Tab 7, containment (4b).** Three panels. *The cheapest way out*: four ways out of a sandbox, each a lognormal effort, the resistance is the minimum over the open ways, ticks close ways; success against the capability of the model. *Layers and a shared cause*: breach $=1-(1-q)(1-h^L)^N$, the shared cause is a floor, the independent part grows with $N$, crossover at $N\approx q/h^L$. *Monitoring*: the margin formula of lecture 2 applied to two times, detection and response against progression to the loss; $\Pr(\text{loss})=\Pr(\text{escape})(1-\Pr(\text{interrupt}))$.

Exercises for these tabs are in the same bank (`tab: 'lifecycle' | 'search' | 'backlog' | 'prioritise' | 'containment'`; state in `S.life`, `S.search`, `S.queue`, `S.prio`, `S.cont`; hash links `#tab=lifecycle`, `#ex=keep-up`). There are 30 exercises; the ones for lecture 4 and 4b are: lifecycle `which-moves-the-race`, `ai-diffing`, `keep-up`, `tau-late`, `zero-day-share`, `base-rate`, `shape-of-clocks`; search `half-the-candidates`, `knowledge-pays`, `wrong-prior`, `runs-to-ninety`, `runs-plateau`, `runs-diversity`; backlog `where-it-piles`, `raise-fix-capacity`, `move-the-bottleneck`; prioritise `one-patch-set`, `flip-v3`, `what-would-you-believe`; containment `close-the-cheapest`, `weakest-path`, `floor-or-scale`, `crossover`, `floor-at-scale`, `response-time`, `result-expires`.
- **URL hash.** `index.html#tab=control` opens a tab; `#ex=raise-resistance` starts an exercise (also useful for links in slides or the course page).

Effort is in **hours of a reference adversary**, never person-hours. Colour is never the only carrier of meaning: solid against dashed lines, text labels, hatching. Design tokens (canvas, ink, accent, Okabe-Ito course colours) are those of the slide theme `minflat2` and `shared/common.tex`.

## Files

| File | Holds |
|---|---|
| `calc.js` | the maths (erfc, $\Phi$, its inverse, margin, mixture, risk chain; for lecture 4 `CR.life`, `CR.search`, `CR.queue`, `CR.prio`); no dependencies; runs in the browser and in node |
| `exercises.js` | the exercise bank as plain data (`window.CR_EXERCISES`), lectures 2 and 4 |
| `tabs4.js` | defaults, slider ranges and the four tabs of lecture 4 (drawing only; every number an exercise uses comes from `calc.js`) |
| `index.html` | page, styles and the interface code |
| `test.js` | acceptance tests; run `node test.js` |

`fetch()` is not used anywhere, because Chrome blocks it on `file://`; data is loaded with `<script src>`.

## Adding an exercise

Append an object to `CR_EXERCISES` in `exercises.js`. The format is documented at the top of that file: `id`, `title`, `blurb`, `level`, `tab` (`success` or `control`), `setup` (starting medians and spreads in hours, `fail`, `q`), `locked` (control ids), `prompt` (HTML), `check(S, CR)` returning `{ok, msg}`, optional `hint`, and `solution(S, CR)` returning `{text, apply}`. Express goals as inequalities (a dragged value never hits an exact number) and **compute** the solution with the functions in `calc.js` (`CR.PhiInv` is the inverse of $\Phi$), never type it. `kind: 'predict'` adds `question`, `options`, `answer`, `reveal`, `explain`. Control ids: `c.med`, `c.sigma`, `r.med`, `r.sigma`, `fail.med`, `q`.

## Tests and what has been checked

`node test.js` checks the slide numbers (z = -2.12 and p = 1.7 % for the opportunistic adversary, z = +0.75 and 77 % targeted, z = -0.24 and 41 % for the failed control, mixtures 3.6 % at q = 0.95 and 7.5 % at q = 0.85, with the tails 1.4 % + 6.1 %) and $\Phi$ against scipy from z = -6 to +6 (relative error below $10^{-13}$), the inverse, and the risk chain (0.644 and 0.475 of the exercise sheet).

The interface was checked in headless Chrome by screenshots of every tab, an exercise and a phone-width layout, and by synthetic pointer and keyboard events (drag of a median and a spread handle, locked handles, arrow keys, slider, all four exercises through check, solution and apply). **Not tested: dragging with a real mouse or finger** (pointer capture works only with real pointers), and Firefox and Safari.

**Lecture 4 and 4b tests.** `node test.js` also checks: the lifecycle race reproduces the race frame (72.5 % attacker first, 73.2 % with $\tau=0$; the same numbers as `computations/lecture4-lifecycle/race-x-against-i.js`), the n-day shares at 1, 7, 30 and 180 days, monotonicity in the speed factor, the installation time, $\tau$ and the zero-day share, no window when every exploit comes late, quadrature converged and the scatter agrees with the exact value; the parallel runs of the frame (100 / 63 / 20 % at $n=100$, 90 and 229 runs for 90 %, the plateau), the diversity $Q$; the containment numbers of 4b (crossover at $N=10^5$, $10^{-6}$ against $10^{-4}$ at $N=10^3$, the margin $z=3.0$ for the monitor, closing the cheapest way raises the median resistance, one open way equals the margin formula); and every exercise: the starting state is not solved, the computed solution reaches the target, every predict question has an answer and an explanation.

## Ideas for later

- Lecture 4 model note: the tool takes $\tau$ as a given median; a link from the margin of resources over resistance (tab 1) to $\tau$ is a possible next step (the lecture keeps it informal).

- (Done in lecture 4: the time-varying version, the simulation view and the exposure window; the likelihood and risk strip below is still open.)
- A likelihood and risk strip: $\lambda_a$, period $T$, $\Pr(N_T\ge1)=1-e^{-\lambda T}$, $R=\lambda\,\mathbb E[L]$, with a small simulation of attempts and successes (Poisson thinning).
- A simulation view: draw pairs $(c,r)$ and show the fraction above the diagonal converging to $p$.
- Tab for the attack-graph rules (edge probabilities, AND/OR, cheapest path), and for the time-varying version of lecture 4 ($p(t)$, exposure window).
- Exercise export: a printable sheet or a results code the student can hand in (the course does not collect cards; keep it optional).
- Language switch (Swedish).
