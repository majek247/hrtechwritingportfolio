"use client";

// npm i pptxgenjs
import { useEffect, useMemo, useRef, useState } from "react";

export type Props = { demoHref?: string; customersHref?: string; portfolioHref?: string };

type Scn = "conservative" | "base" | "ambitious";
// Placeholders. Ambitious mirrors Maki's published averages (45% faster hiring, 50% lower turnover).
const SCN: Record<Scn, { label: string; screen: number; time: number; attr: number }> = {
  conservative: { label: "Conservative", screen: 30, time: 15, attr: 15 },
  base: { label: "Base", screen: 50, time: 30, attr: 30 },
  ambitious: { label: "Ambitious", screen: 70, time: 45, attr: 50 },
};

const challenges = [
  { id: "time", name: "Slow time-to-hire", text: "Critical roles take too long, slowing down growth." },
  { id: "cost", name: "Rising cost per hire", text: "Manual screening and repetitive tasks increase operational costs." },
  { id: "quality", name: "Inconsistent quality", text: "Different hiring standards across teams and regions." },
  { id: "cx", name: "Poor candidate experience", text: "Top talent drops out due to slow and manual processes." },
];

// Published on makipeople.com/customers (reported by Maki)
const proof = [
  { id: "cap", name: "Capgemini", stat: "Under 10 days", line: "time to hire, from several weeks", stat2: "95%", line2: "candidate satisfaction" },
  { id: "del", name: "Deloitte France", stat: "94.2%", line: "positive candidate feedback", stat2: "Faster", line2: "recruiter shortlisting" },
  { id: "asos", name: "ASOS", stat: "93%+", line: "positive candidate feedback", stat2: "Skills", line2: "based, brand-led hiring" },
  { id: "trg", name: "The Restaurant Group", stat: "300+", line: "locations hiring at the frontline", stat2: "None", line2: "manual screening needed" },
];
const trusted = ["Capgemini", "Deloitte", "Nespresso", "ASOS", "Forvis Mazars", "Foundever"];

const faqs = [
  ["How should I estimate recruiter time savings?", "Start with what you can measure: applications per year multiplied by the minutes a recruiter spends on each first screen. Then apply a conservative share of that time that assessment would remove. Use the Conservative scenario for finance, and replace the placeholder minutes with figures from your ATS or a two-week time sample."],
  ["What if our hiring volumes change?", "Change the application and hire inputs and every figure updates. If volumes are seasonal, model the annual total and note the peak months separately, because the benefit is usually biggest when volume spikes."],
  ["How do I avoid overstating ROI?", "Use the Conservative scenario first, count only benefits you can trace to a budget line, and subtract the full annual cost of Maki. Customer results on this page are theirs, so treat them as reference points rather than promises."],
  ["What about implementation time and resources?", "This page can't answer that for you, and the model doesn't include it. Ask Maki for a rollout plan on a demo call, and add internal time for integration, role set-up and recruiter training to your own cost line."],
  ["Can we run a pilot first?", "Yes, and it's the safest ask. Capgemini went live in France first, with plans to expand to 50+ countries by 2026. Pick a few roles or one market, agree the success metrics up front, and use the pilot to replace the placeholders here with real data."],
];

const gbp = (n: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);
const num = (n: number) => new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(n);
const short = (n: number) => (n >= 1e6 ? `£${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `£${Math.round(n / 1e3)}K` : gbp(n));

type Slide = { title: string; big?: string; sub?: string; bullets: string[]; chart?: { labels: string[]; values: number[] } };

const Arrow = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>);
const Tick = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>);

function Row({ label, value, set, prefix, suffix }: { label: string; value: number; set: (n: number) => void; prefix?: string; suffix?: string }) {
  return (
    <label className="row">
      <span>{label}</span>
      <div>{prefix && <i>{prefix}</i>}<input type="number" min={0} value={value} onChange={(e) => set(Math.max(0, Number(e.target.value) || 0))} />{suffix && <i>{suffix}</i>}</div>
    </label>
  );
}

export default function MakiBusinessCaseBuilder({
  demoHref = "https://www.makipeople.com/demo",
  customersHref = "https://www.makipeople.com/customers",
  portfolioHref = "/",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const [scn, setScn] = useState<Scn>("base");
  const [apps, setApps] = useState(80000);
  const [hires, setHires] = useState(4200);
  const [mins, setMins] = useState(8);
  const [rate, setRate] = useState(42);
  const [days, setDays] = useState(45);
  const [attr, setAttr] = useState(18);
  const [replace, setReplace] = useState(8500);
  const [units, setUnits] = useState(12);
  const [vac, setVac] = useState(150);
  const [cost, setCost] = useState(0);
  const [chal, setChal] = useState<string[]>(["time", "cost", "cx"]);
  const [picked, setPicked] = useState<string[]>(["cap", "del", "asos"]);
  const [active, setActive] = useState(0);
  const [titles, setTitles] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-r]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { items.forEach((i) => i.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const s = SCN[scn];
  const c = useMemo(() => {
    const hours = ((apps * mins) / 60) * (s.screen / 100);
    const capacity = hours * rate;
    const daysSaved = days * (s.time / 100);
    const vacancy = hires * daysSaved * vac;
    const attrition = hires * (attr / 100) * (s.attr / 100) * replace;
    const annual = capacity + vacancy + attrition;
    return { hours, capacity, daysSaved, vacancy, attrition, annual, three: annual * 3, net3: annual * 3 - cost * 3, after: days - daysSaved };
  }, [apps, hires, mins, rate, days, attr, replace, vac, cost, s]);

  const chosen = proof.filter((p) => picked.includes(p.id));
  const pains = challenges.filter((x) => chal.includes(x.id)).map((x) => x.name.toLowerCase());
  const painText = pains.length ? pains.join(", ") : "hiring friction";

  const slides: Slide[] = [
    { title: "Executive summary: the case for assessing first", sub: `Maki business case, ${s.label.toLowerCase()} scenario`, bullets: [`Across ${units} markets or business units`, "All figures are estimates based on the inputs in this deck"] },
    { title: "The current state", big: num(apps), sub: "applications a year", bullets: [`${num(hires)} hires, with ${mins} minutes of recruiter screening per applicant`, `${days} days to hire and ${attr}% early attrition`, `Pressures: ${painText}`] },
    { title: `Projected impact (${s.label.toLowerCase()})`, big: gbp(c.annual), sub: "estimated annual benefit", bullets: [`${num(c.hours)} recruiter hours returned per year`, `${Math.round(c.daysSaved)} days faster time-to-hire`, cost > 0 ? `3-year benefit ${gbp(c.three)}, net ${gbp(c.net3)} after Maki cost` : `3-year benefit ${gbp(c.three)} before Maki cost`], chart: { labels: ["Recruiter capacity", "Vacancy days", "Early attrition", "Total"], values: [Math.round(c.capacity), Math.round(c.vacancy), Math.round(c.attrition), Math.round(c.annual)] } },
    { title: "What this looks like in practice", bullets: chosen.length ? chosen.map((p) => `${p.name}: ${p.stat} ${p.line}`) : ["Select customer examples in the builder"] },
    { title: "Key risks and how they are mitigated", bullets: ["Benefits overstated: validate the placeholder inputs with real volumes in a pilot", "Candidate experience: track completion and feedback from the first cohort", "Adoption: involve recruiters and hiring managers in role set-up", "Rollout effort: agree an implementation plan with Maki before committing"] },
    { title: "Recommended next steps", bullets: ["Approve a pilot to validate the impact with your own roles and teams", "Agree success metrics: hours returned, time-to-hire, early attrition", `Request a demo: ${demoHref.replace("https://", "")}`] },
  ];
  const sl = slides[active];
  const summary = slides.map((x, i) => `${titles[i] ?? x.title}\n${[x.big && `${x.big} ${x.sub ?? ""}`, ...x.bullets].filter(Boolean).join("\n")}`).join("\n\n");

  const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>, id: string) => set((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));

  async function copy() {
    try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
  }

  async function download() {
    setBusy(true);
    try {
      const P = (await import("pptxgenjs")).default;
      const p = new P();
      p.layout = "LAYOUT_WIDE";
      slides.forEach((x, i) => {
        const dark = i === 0 || i === slides.length - 1;
        const d = p.addSlide();
        d.background = { color: dark ? "041B1C" : "FFFFFF" };
        d.addText(titles[i] ?? x.title, { x: 0.7, y: 0.6, w: 11.9, h: 1.2, fontFace: "Arial", bold: true, fontSize: dark ? 36 : 28, color: dark ? "FFFFFF" : "0A2E26", valign: "top" });
        if (x.big) {
          d.addText(x.big, { x: 0.7, y: 2.2, w: 5.4, h: 1.4, fontFace: "Arial", bold: true, fontSize: 50, color: "167273" });
          d.addText(x.sub ?? "", { x: 0.7, y: 3.6, w: 5.4, h: 0.5, fontSize: 16, color: "4F6A63" });
        } else if (x.sub) d.addText(x.sub, { x: 0.7, y: 2.0, w: 11, h: 0.5, fontSize: 18, color: "7FD3D0" });
        const bx = x.big ? 0.7 : 0.7, by = x.big ? 4.3 : dark ? 3.0 : 2.1;
        d.addText(x.bullets.map((t) => ({ text: t, options: { bullet: true, breakLine: true } })), { x: bx, y: by, w: x.chart ? 5.4 : 11.5, h: x.chart ? 2.6 : 4, fontSize: 16, color: dark ? "D6ECEA" : "1F3A33", paraSpaceAfter: 10, valign: "top" });
        if (x.chart) d.addChart(p.charts.BAR, [{ name: "Annual impact", labels: x.chart.labels, values: x.chart.values }], { x: 6.5, y: 1.9, w: 6.2, h: 4.8, barDir: "col", chartColors: ["167273"], showValue: true, dataLabelFormatCode: "£#,##0", valAxisHidden: true, showLegend: false });
        d.addText("Independent portfolio concept by GrowUp. Customer results as published by Maki. Illustrative estimates, not guarantees.", { x: 0.7, y: 7.05, w: 11.9, h: 0.3, fontSize: 9, color: dark ? "7FA9A7" : "7A8C86" });
      });
      await p.writeFile({ fileName: "maki-executive-summary.pptx" });
    } finally { setBusy(false); }
  }

  const bars = [["Recruiter capacity", c.capacity], ["Vacancy days", c.vacancy], ["Early attrition", c.attrition], ["Total annual impact", c.annual]] as const;

  return (
    <article className="bc" ref={root}>
      <style>{css}</style>

      <header className="hero">
        <div className="wrap hgrid">
          <div className="hcopy">
            <p className="eye">BUSINESS CASE BUILDER</p>
            <h1>Pitching Maki to your VP: the ultimate budget justification builder.</h1>
            <p className="deck">Turn hiring friction into a clear, executive-ready business case. Use real customer results and your own assumptions to estimate the impact Maki could deliver for your organisation.</p>
            <div className="btns">
              <a className="btn" href="#model">Build your business case <Arrow /></a>
              <a className="btn ghost" href="#proof">See customer results</a>
            </div>
          </div>
          <div className="dash">
            <img
              className="heroimg"
              src="/images/maki-exec-summary.png"
              alt="Preview of the Maki executive summary generated by the business case builder"
              width={1200}
              height={800}
            />
          </div>
        </div>
        <div className="wrap trust"><p>TRUSTED BY GLOBAL ENTERPRISES</p><div>{trusted.map((t) => <span key={t}>{t}</span>)}</div></div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div data-r className="shead"><span className="num">01</span><h2>Start with the business challenge.</h2><p>Every organisation has the same pressure: hire faster, maintain quality and control costs. Pick the challenges that match yours and they carry through to your summary.</p></div>
          <div className="cards4">
            {challenges.map((x, i) => (
              <button key={x.id} data-r type="button" className="chal" aria-pressed={chal.includes(x.id)} onClick={() => toggle(setChal, x.id)}>
                <span className="ico">{i + 1}</span><h3>{x.name}</h3><p>{x.text}</p><i aria-hidden="true"><Tick /></i>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint" id="model">
        <div className="wrap">
          <div className="shead split" data-r>
            <div><span className="num">02</span><h2>Model the impact for your organisation.</h2><p>Enter a few details about your current hiring process. Defaults are illustrative placeholders, so replace them with your own numbers.</p></div>
            <div className="seg" role="tablist">{(Object.keys(SCN) as Scn[]).map((k) => <button key={k} role="tab" aria-selected={scn === k} onClick={() => setScn(k)}>{SCN[k].label}</button>)}</div>
          </div>
          <div className="mgrid">
            <div className="box" data-r>
              <h3>Your current hiring model</h3>
              <Row label="Annual applications" value={apps} set={setApps} />
              <Row label="Annual hires" value={hires} set={setHires} />
              <Row label="Screening minutes per applicant" value={mins} set={setMins} />
              <Row label="Loaded recruiter cost per hour" value={rate} set={setRate} prefix="£" />
              <Row label="Current time-to-hire" value={days} set={setDays} suffix="days" />
              <Row label="Early attrition rate" value={attr} set={(n) => setAttr(Math.min(100, n))} suffix="%" />
              <Row label="Replacement cost per failed hire" value={replace} set={setReplace} prefix="£" />
              <Row label="Cost of a vacant role per day" value={vac} set={setVac} prefix="£" />
              <Row label="Markets / business units" value={units} set={setUnits} />
              <Row label="Annual Maki cost (optional)" value={cost} set={setCost} prefix="£" />
            </div>
            <div className="box" data-r>
              <h3>Your potential impact <small>(illustrative)</small></h3>
              <div className="kpis">
                <div><b>{num(c.hours)}</b><span>Recruiter hours returned (per year)</span></div>
                <div><b>{gbp(c.vacancy)}</b><span>Vacancy capacity created (per year)</span></div>
                <div><b>{s.time}%</b><span>Faster time-to-hire ({days} → {Math.round(c.after)} days)</span></div>
                <div className="hi"><b>{gbp(cost > 0 ? c.net3 : c.three)}</b><span>{cost > 0 ? "Net benefit over 3 years" : "Total estimated benefit (over 3 years)"}</span></div>
              </div>
              <p className="cap">Illustrative annual financial impact</p>
              <div className="chart" role="img" aria-label="Bar chart of annual impact by category">
                {bars.map(([l, v], i) => (
                  <div key={l}><em>{short(v)}</em><i className={i === 3 ? "tot" : ""} style={{ height: `${Math.max(4, (v / Math.max(c.annual, 1)) * 100)}%` }} /><span>{l}</span></div>
                ))}
              </div>
              <p className="fine">Conservative and Base discount Maki's published averages (45% faster hiring, 50% lower turnover). Ambitious mirrors them. Savings are annual, flat for three years, and exclude implementation effort.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec dark" id="proof">
        <div className="wrap">
          <div className="shead split" data-r>
            <div><span className="num">03</span><h2>See what this looks like in practice.</h2><p>These results are published by Maki about real customers. Use them as reference points, and tick the ones to include in your summary.</p></div>
            <a className="tl" href={customersHref} target="_blank" rel="noreferrer">Explore all customer stories <Arrow /></a>
          </div>
          <div className="cards4">
            {proof.map((p) => (
              <button key={p.id} data-r type="button" className="pc" aria-pressed={picked.includes(p.id)} onClick={() => toggle(setPicked, p.id)}>
                <p className="who">{p.name}</p>
                <strong>{p.stat}</strong><span>{p.line}</span>
                <strong className="s2">{p.stat2}</strong><span>{p.line2}</span>
                <i aria-hidden="true"><Tick /></i>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="shead split" data-r>
            <div><span className="num">04</span><h2>Turn the numbers into an executive story.</h2><p>Use the key messages below to build a clear, concise narrative for your VP. Each point is driven by your model.</p></div>
            <button className="btn out" onClick={copy}>{copied ? "Copied" : "Copy executive summary"}</button>
          </div>
          <ol className="steps">
            {[
              ["The current state", `${num(apps)} applications a year, ${mins} minutes of screening each and ${days} days to hire. Pressures: ${painText}.`],
              ["The opportunity", "Maki automates screening, standardises assessment and improves decision quality."],
              ["The impact", `About ${gbp(c.annual)} a year (${s.label.toLowerCase()}): ${num(c.hours)} recruiter hours back and hiring ${Math.round(c.daysSaved)} days faster.`],
              ["The ask", "Approve a pilot to validate the impact with your own roles and teams."],
            ].map(([t, b], i) => (<li key={t} data-r><span>{i + 1}</span><h3>{t}</h3><p>{b}</p></li>))}
          </ol>
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap">
          <div className="shead" data-r><span className="num">05</span><h2>Customise your executive summary.</h2><p>Generate a ready-to-use deck with your numbers and selected customer evidence. Edit slide titles here, then edit everything else in PowerPoint.</p></div>
          <div className="egrid">
            <div className="prev" data-r>
              <div className="tabs" role="tablist">{slides.map((_, i) => <button key={i} role="tab" aria-selected={active === i} onClick={() => setActive(i)}>{i + 1}</button>)}</div>
              <div className="slide">
                <p className="brand">Maki · Executive summary</p>
                <input aria-label="Slide title" value={titles[active] ?? sl.title} onChange={(e) => setTitles({ ...titles, [active]: e.target.value })} />
                {sl.big && <div className="sbig">{sl.big}<small>{sl.sub}</small></div>}
                {!sl.big && sl.sub && <p className="ssub">{sl.sub}</p>}
                <ul>{sl.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              </div>
            </div>
            <div className="incl" data-r>
              <h3>Your executive summary will include:</h3>
              <ul>
                {["Current hiring challenges and cost", "Projected impact with Maki (based on your inputs)", "Relevant customer examples", "Key risks and how they are mitigated", "Recommended next steps"].map((t) => <li key={t}><Tick />{t}</li>)}
              </ul>
              <div className="btns">
                <button className="btn" onClick={download} disabled={busy}>{busy ? "Building…" : "Generate my executive summary"} <Arrow /></button>
                <a className="btn ghost" href={`mailto:?subject=${encodeURIComponent("Business case: Maki")}&body=${encodeURIComponent(summary)}`}>Share with Finance</a>
              </div>
              <small>Downloads an editable .pptx with native text and chart. Estimates only, not a promise of results.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="shead split" data-r><div><span className="num">06</span><h2>Common questions when building your case.</h2><p>Answers to the questions VPs, Finance and Procurement usually ask.</p></div></div>
          <div className="faq" data-r>
            {faqs.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap fgrid" data-r>
          <div>
            <p className="eye">READY TO MAKE YOUR CASE?</p>
            <h2>Build your Maki business case today.</h2>
            <p>Use your own data, explore real customer results and generate an executive-ready summary in minutes.</p>
            <div className="btns"><a className="btn" href="#model">Build the business case <Arrow /></a><a className="btn ghost" href={demoHref} target="_blank" rel="noreferrer">Request a demo</a></div>
          </div>
          <div className="tth"><p>Time-to-hire ({s.label.toLowerCase()})</p>
            <div><span><b>{days}</b> days today</span><Arrow /><span className="g"><b>{Math.round(c.after)}</b> days projected</span></div>
            <small>Capgemini published: under 10 days, from several weeks.</small></div>
        </div>
        <div className="wrap note">
          <p><b>Portfolio note.</b> An independent concept by GrowUp, not published by or affiliated with Maki. Customer results come from Maki's public customers page. Inputs and scenario assumptions are illustrative placeholders.</p>
          <a href={portfolioHref}>Back to writing portfolio</a>
        </div>
      </section>
    </article>
  );
}

const css = `
.bc{--deep:#041b1c;--teal:#167273;--mint:#7fd3d0;--ink:#0a2e26;--mute:#4f6a63;--line:#dfe7e2;--tint:#eef6f3;background:#fff;color:var(--ink);font-family:Inter,"Helvetica Neue",Arial,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased}
.bc,.bc *,.bc *:before,.bc *:after{box-sizing:border-box}.bc :where(h1,h2,h3,p,ul,ol){margin:0;padding:0}.bc ul,.bc ol{list-style:none}.bc a{color:inherit;text-decoration:none}.bc button{font-family:inherit}
.bc svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}
.bc .wrap{width:min(1240px,calc(100% - 64px));margin-inline:auto}
.bc h1,.bc h2{font-weight:700;letter-spacing:-.035em;text-wrap:balance}.bc h1{font-size:clamp(36px,4.2vw,60px);line-height:1.05}.bc h2{font-size:clamp(30px,3.2vw,44px);line-height:1.1}
.bc a:focus-visible,.bc button:focus-visible,.bc input:focus-visible,.bc summary:focus-visible{outline:3px solid var(--mint);outline-offset:3px}
.bc .eye,.bc .num{font-size:12px;font-weight:700;letter-spacing:.16em;color:var(--mint)}.bc .num{display:block;margin-bottom:10px;font-size:15px;letter-spacing:.04em;color:var(--teal)}
.bc .btn{display:inline-flex;align-items:center;gap:18px;min-height:48px;padding:13px 22px;border:1px solid var(--teal);border-radius:6px;background:var(--teal);color:#fff!important;font:700 14px Inter,Arial,sans-serif;cursor:pointer;transition:background .2s,transform .2s}
.bc .btn:hover{background:#1d8f90;transform:translateY(-2px)}.bc .btn:disabled{opacity:.6;cursor:wait}.bc .btn.ghost{background:transparent;border-color:rgba(255,255,255,.4)}.bc .btn.ghost:hover{background:rgba(255,255,255,.08)}
.bc .btn.out{background:#fff;color:var(--teal)!important}.bc .btns{display:flex;flex-wrap:wrap;gap:14px;margin-top:28px}.bc .tl{display:inline-flex;gap:8px;align-items:center;font-weight:600;color:var(--mint)}
/* hero */
.bc .hero{position:relative;overflow:hidden;color:#fff;background:radial-gradient(ellipse at 80% 15%,rgba(22,114,115,.45),transparent 55%),var(--deep);padding:124px 0 0}
.bc .hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(127,211,208,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(127,211,208,.06) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 70%);mask-image:linear-gradient(90deg,transparent,#000 70%)}
.bc .hgrid{position:relative;display:grid;grid-template-columns:1fr 1.05fr;gap:56px;align-items:center}.bc .hcopy h1{padding-top:20px}.bc .deck{max-width:520px;margin-top:22px;font-size:16px;color:#d6ecea}
.bc .hcopy>*{animation:rise .9s cubic-bezier(.22,1,.36,1) both}.bc .hcopy>:nth-child(2){animation-delay:.12s}.bc .hcopy>:nth-child(3){animation-delay:.24s}.bc .hcopy>:nth-child(4){animation-delay:.36s}
@keyframes rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.bc .dash{position:relative;top:30px;padding:0 0 56px 0}.bc .panel{padding:24px;border-radius:14px;background:#f6faf8;color:var(--ink);box-shadow:0 30px 70px rgba(0,0,0,.4);display:grid;grid-template-columns:1.2fr 1fr;gap:20px}
.bc .pt{grid-column:1/-1;font-weight:700;font-size:14px}.bc .pt small{font-weight:500;color:var(--mute)}
.bc .map{min-height:150px;border-radius:8px;background:radial-gradient(circle,rgba(22,114,115,.5) 2px,transparent 2.5px) 0 0/16px 16px,#e3efeb;-webkit-mask-image:radial-gradient(ellipse,#000 55%,rgba(0,0,0,.35));mask-image:radial-gradient(ellipse,#000 55%,rgba(0,0,0,.35))}
.bc .mini{display:grid;gap:10px}.bc .mini li{padding:10px 12px;border-radius:8px;background:#fff;border:1px solid var(--line);display:grid}.bc .mini span{font-size:11px;color:var(--mute)}.bc .mini b{font-size:20px;letter-spacing:-.03em;color:var(--teal)}
.bc .float{position:absolute;padding:14px 18px;border-radius:10px;background:#fff;color:var(--ink);box-shadow:0 18px 40px rgba(0,0,0,.35);display:grid;gap:2px}.bc .float span{font-size:11px;color:var(--mute)}.bc .float b{font-size:28px;letter-spacing:-.04em;color:var(--teal);line-height:1.1}.bc .float small{font-size:10px;color:var(--mute)}
.bc .f1{left:-24px;bottom:0}.bc .f2{right:-8px;bottom:14px}
.bc .trust{position:relative;padding:34px 0 38px;margin-top:8px}.bc .trust p{font-size:11px;font-weight:700;letter-spacing:.16em;color:#8fb5b2}.bc .trust div{display:flex;flex-wrap:wrap;gap:12px 40px;margin-top:14px}.bc .trust span{font-size:19px;font-weight:700;letter-spacing:-.03em;color:#e8f4f3;opacity:.85}
/* sections */
.bc .sec{padding:clamp(56px,6vw,88px) 0}.bc .tint{background:var(--tint)}.bc .dark{background:radial-gradient(ellipse at 15% 90%,rgba(22,114,115,.28),transparent 55%),var(--deep);color:#fff}.bc .dark .num{color:var(--mint)}
.bc .shead{max-width:760px;margin-bottom:36px}.bc .shead p{margin-top:12px;font-size:16px;color:var(--mute)}.bc .dark .shead p{color:#b9d6d4}
.bc .shead.split{max-width:none;display:flex;justify-content:space-between;align-items:flex-end;gap:32px}.bc .shead.split>div{max-width:720px}
.bc .cards4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.bc .chal,.bc .pc{position:relative;text-align:left;padding:26px;border:1px solid var(--line);border-radius:12px;background:#fff;color:inherit;cursor:pointer;transition:border-color .2s,box-shadow .2s}
.bc .chal h3{margin-top:18px;font-size:16px}.bc .chal p{margin-top:6px;font-size:13px;color:var(--mute)}.bc .ico{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:#dff1ee;color:var(--teal);font-weight:700}
.bc .chal i,.bc .pc i{position:absolute;top:16px;right:16px;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;border:1px solid #c9d8d2;color:transparent}
.bc [aria-pressed=true]{border-color:var(--teal);box-shadow:0 0 0 1px var(--teal)}.bc [aria-pressed=true] i{background:var(--teal);border-color:var(--teal);color:#fff}.bc i svg{width:13px;height:13px}
/* model */
.bc .seg{display:flex;padding:4px;border-radius:8px;background:#fff;border:1px solid var(--line)}.bc .seg button{padding:10px 20px;border:0;border-radius:6px;background:none;font-weight:600;font-size:14px;color:var(--mute);cursor:pointer}.bc .seg [aria-selected=true]{background:var(--teal);color:#fff}
.bc .mgrid{display:grid;grid-template-columns:.9fr 1.1fr;gap:24px}.bc .box{padding:28px;border-radius:12px;background:#fff;border:1px solid var(--line)}.bc .box h3{margin-bottom:18px;font-size:16px}.bc .box h3 small{font-weight:500;color:var(--mute)}
.bc .row{display:grid;grid-template-columns:1fr 150px;gap:16px;align-items:center;padding:7px 0}.bc .row>span{font-size:13px;color:#2f4a3f}.bc .row div{display:flex;align-items:center;gap:6px;padding:0 12px;border:1px solid var(--line);border-radius:6px;background:#fbfdfc}.bc .row div:focus-within{border-color:var(--teal)}
.bc .row input{width:100%;min-width:0;padding:10px 0;border:0;background:none;font:600 14px Inter,Arial,sans-serif;color:var(--ink)}.bc .row input:focus-visible{outline:0}.bc .row i{font-style:normal;font-size:12px;color:var(--mute)}
.bc .kpis{display:grid;grid-template-columns:1fr 1fr;gap:14px}.bc .kpis>div{padding:18px;border:1px solid var(--line);border-radius:10px}.bc .kpis b{display:block;font-size:clamp(24px,2.4vw,32px);letter-spacing:-.04em;line-height:1.1;color:var(--teal)}.bc .kpis span{font-size:12px;color:var(--mute)}.bc .kpis .hi{background:var(--teal);border-color:var(--teal)}.bc .kpis .hi b,.bc .kpis .hi span{color:#fff}
.bc .cap{margin:26px 0 8px;font-size:13px;font-weight:700}.bc .chart{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;height:210px;align-items:end;padding-bottom:30px;border-bottom:1px solid var(--line);position:relative}
.bc .chart>div{position:relative;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center}.bc .chart i{display:block;width:100%;max-width:90px;border-radius:4px 4px 0 0;background:#8fc9c6;transition:height .5s}.bc .chart i.tot{background:var(--teal)}
.bc .chart em{margin-bottom:6px;font-style:normal;font-size:12px;font-weight:700}.bc .chart span{position:absolute;bottom:-28px;font-size:11px;color:var(--mute);text-align:center;white-space:nowrap}
.bc .fine{margin-top:20px;font-size:12px;color:var(--mute)}
/* proof */
.bc .pc{background:#fff;color:var(--ink)}.bc .who{margin-bottom:22px;font-weight:700;color:var(--teal)}.bc .pc strong{display:block;font-size:clamp(26px,2.4vw,34px);letter-spacing:-.04em;line-height:1.1}.bc .pc span{display:block;margin-bottom:18px;font-size:13px;color:var(--mute)}.bc .pc .s2{margin-top:6px;color:var(--teal);font-size:24px}
/* steps */
.bc .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;counter-reset:s}.bc .steps li{position:relative;padding:24px;border:1px solid var(--line);border-radius:12px}.bc .steps li:not(:last-child):after{content:"→";position:absolute;right:-16px;top:50%;z-index:1;color:var(--teal);font-weight:700}
.bc .steps span{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--teal);color:#fff;font-weight:700;font-size:13px}.bc .steps h3{margin:14px 0 6px;font-size:16px}.bc .steps p{font-size:13px;color:var(--mute)}
/* summary */
.bc .egrid{display:grid;grid-template-columns:1.05fr .95fr;gap:36px;align-items:start}.bc .prev{padding:20px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid rgba(127,211,208,.22)}
.bc .tabs{display:flex;gap:8px;margin-bottom:14px}.bc .tabs button{width:34px;height:34px;border:1px solid rgba(127,211,208,.35);border-radius:6px;background:none;color:#d6ecea;font-weight:700;cursor:pointer}.bc .tabs [aria-selected=true]{background:var(--teal);border-color:var(--teal);color:#fff}
.bc .slide{min-height:330px;padding:28px;border-radius:8px;background:#fff;color:var(--ink)}.bc .brand{font-size:11px;font-weight:700;letter-spacing:.08em;color:var(--teal)}
.bc .slide input{width:100%;margin:12px 0 16px;padding:4px 0;border:0;border-bottom:1px dashed #b9cdc4;background:none;font:700 clamp(20px,2vw,26px) Inter,Arial,sans-serif;letter-spacing:-.03em;color:var(--ink)}
.bc .sbig{font-size:clamp(36px,4vw,52px);font-weight:700;letter-spacing:-.05em;line-height:1;color:var(--teal)}.bc .sbig small{display:block;margin-top:6px;font:500 13px Inter,Arial,sans-serif;letter-spacing:0;color:var(--mute)}.bc .ssub{font-weight:600;color:var(--teal)}
.bc .slide ul{display:grid;gap:9px;margin-top:18px;font-size:14px;color:#2f4a3f}.bc .slide li{position:relative;padding-left:18px}.bc .slide li:before{content:"";position:absolute;left:0;top:.6em;width:7px;height:7px;border-radius:50%;background:var(--teal)}
.bc .incl{padding:30px;border-radius:12px;background:#072426;border:1px solid rgba(127,211,208,.28)}.bc .incl h3{font-size:17px}.bc .incl ul{display:grid;gap:12px;margin:20px 0 4px}.bc .incl li{display:flex;gap:12px;align-items:center;font-size:14px;color:#d6ecea}.bc .incl li svg{color:var(--mint)}.bc .incl small{display:block;margin-top:16px;font-size:12px;color:#8fb5b2}
/* faq */
.bc .faq{max-width:none;border-top:1px solid var(--line)}.bc details{border-bottom:1px solid var(--line)}.bc summary{display:flex;justify-content:space-between;gap:20px;padding:20px 4px;font-weight:600;cursor:pointer;list-style:none}.bc summary::-webkit-details-marker{display:none}
.bc summary:after{content:"+";font-size:22px;line-height:1;color:var(--teal)}.bc details[open] summary:after{content:"−"}.bc details p{max-width:760px;padding:0 4px 22px;color:var(--mute)}
/* final */
.bc .final{background:radial-gradient(ellipse at 85% 50%,rgba(22,114,115,.4),transparent 55%),var(--deep);color:#fff;padding:clamp(64px,7vw,96px) 0 36px}
.bc .fgrid{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center}.bc .final p:not(.eye){max-width:520px;margin-top:16px;color:#d6ecea}
.bc .tth{padding:28px;border-radius:12px;background:#f6faf8;color:var(--ink);box-shadow:0 24px 60px rgba(0,0,0,.35)}.bc .tth>p{font-weight:700;font-size:14px;color:var(--ink)!important;margin:0!important}.bc .tth>div{display:flex;align-items:center;gap:18px;margin:20px 0 14px;color:var(--teal)}
.bc .tth b{display:block;font-size:44px;letter-spacing:-.05em;line-height:1}.bc .tth span{font-size:13px;color:var(--mute)}.bc .tth .g b{color:var(--teal)}.bc .tth small{font-size:12px;color:var(--mute)}
.bc .note{display:flex;justify-content:space-between;gap:24px;margin-top:56px;padding-top:22px;border-top:1px solid rgba(255,255,255,.15);font-size:12px;color:#a9c9c7}.bc .note p{max-width:780px}.bc .note a{color:#fff;font-weight:600;white-space:nowrap}
.bc [data-r]{opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}.bc [data-r].in{opacity:1;transform:none}
@media(max-width:1000px){.bc .hgrid,.bc .mgrid,.bc .egrid,.bc .fgrid{grid-template-columns:1fr}.bc .cards4,.bc .steps{grid-template-columns:1fr 1fr}.bc .steps li:after{display:none!important}.bc .shead.split{flex-direction:column;align-items:flex-start}.bc .f1{left:0}.bc .f2{right:0}}
@media(max-width:620px){.bc .wrap{width:calc(100% - 36px)}.bc .cards4,.bc .steps,.bc .kpis,.bc .panel{grid-template-columns:1fr}.bc .row{grid-template-columns:1fr 120px}.bc .box{padding:20px}.bc .note{flex-direction:column}.bc .chart span{font-size:10px;white-space:normal;width:70px}.bc .dash{padding-bottom:100px}.bc .f2{bottom:0;right:auto;left:140px}}
@media(prefers-reduced-motion:reduce){.bc *{animation:none!important;transition:none!important}}
`;