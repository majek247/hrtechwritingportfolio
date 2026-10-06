"use client";

import { useEffect, useRef } from "react";

export type MakiCapgeminiCaseStudyProps = {
  demoHref?: string;
  sourceHref?: string;
  portfolioHref?: string;
  assetBasePath?: string;
};

const metrics = [
  ["90,000", "People hired each year"],
  ["200,000+", "Employees globally"],
  ["50+", "Countries planned by 2026"],
  ["Technology & digital", "Global professional services"],
];

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={back ? { transform: "rotate(180deg)" } : undefined}>
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

const flowStages = [
  {
    n: "1",
    title: "Initial screening",
    sub: "Broad assessment at scale",
    items: [
      ["Technical skills", <path key="a" d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />],
      ["Cognitive ability", <path key="a" d="M12 4v16M8.5 5.5A3 3 0 0 0 5.5 9a3 3 0 0 0-.5 5.5A3 3 0 0 0 8.5 19 3 3 0 0 0 12 20M15.5 5.5A3 3 0 0 1 18.5 9a3 3 0 0 1 .5 5.5A3 3 0 0 1 15.5 19 3 3 0 0 1 12 20" />],
      ["Language proficiency", <g key="a"><path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-8l-4 3.5V16H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" /></g>],
    ],
  },
  {
    n: "2",
    title: "In-depth assessment",
    sub: "Role-specific evaluation",
    items: [
      ["Functional competencies", <path key="a" d="M4 20h16M7 20v-6M12 20V8M17 20v-9" />],
      ["Behavioural traits", <g key="a"><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.5-3 2.7-5 5.5-5s5 2 5.5 5" /><circle cx="17" cy="9" r="2.3" /><path d="M16.5 14c2.3 0 3.6 1.7 4 4.5" /></g>],
      ["Situational judgement", <g key="a"><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M10 12h5M10 16h5" /></g>],
    ],
  },
] as const;

function SolutionFlow() {
  return (
    <div className="flow" role="img" aria-label="Two-stage assessment: initial screening then in-depth assessment">
      {flowStages.map((stage, i) => (
        <div className="flow-fragment" key={stage.n} style={{ display: "contents" }}>
          {i === 1 && (
            <div className="flow-link"><i><Arrow /></i></div>
          )}
          <div className="flow-stage">
            <div className="flow-head">
              <span className="flow-num">{stage.n}</span>
              <div><strong>{stage.title}</strong><small>{stage.sub}</small></div>
            </div>
            {stage.items.map(([label, icon]) => (
              <div className="flow-row" key={label as string}>
                <span className="flow-ico"><svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg></span>
                {label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MakiCapgeminiCaseStudy({
  demoHref = "https://www.makipeople.com/",
  sourceHref = "https://www.makipeople.com/customers/capgemini",
  portfolioHref = "https://www.seo-growup.com/writing-portfolio",
  assetBasePath = "/images",
}: MakiCapgeminiCaseStudyProps) {
  const root = useRef<HTMLElement>(null);
  const asset = (name: string) => `${assetBasePath}/${name}`;

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((item) => obs.observe(item));
    return () => obs.disconnect();
  }, []);

  return (
    <article className="maki-case" ref={root}>
      <style>{styles}</style>




<header className="hero">
  <div className="wrap hero-grid">
    <div className="hero-copy" data-reveal>
      <div className="brand-lockup">
        <strong>MakiPeople</strong>
        <span>×</span>
        <strong className="capgemini">Capgemini</strong>
      </div>

      <p className="eyebrow light">
        CUSTOMER STORY · ENTERPRISE HIRING
      </p>

      <h1>
        From fragmented screening to hire-ready candidates in under 10 days.
      </h1>

      <p className="deck">
        Capgemini replaced fragmented screening with MakiPeople’s AI-powered
        conversational assessments, giving recruiters one structured hiring
        flow while improving speed, candidate experience and consistency at scale.
      </p>

      <div className="actions">
        <a
          className="button"
          href={demoHref}
          target="_blank"
          rel="noreferrer"
        >
          Request a demo <Arrow />
        </a>

        <a className="text-link light-link" href="#challenge">
          Read the story <Arrow />
        </a>
      </div>
    </div>

<div className="hero-art" data-reveal>
  <img
    className="hero-visual"
    src={asset("maki-capgemini-hero-visual-clean.png")}
    alt="MakiPeople candidate dashboard with Capgemini global hiring visual"
  />
</div>
  </div>
</header>




      <section className="metric-strip">
        <div className="wrap metric-grid">
          {metrics.map(([value, label]) => (
            <div className="metric" key={label} data-reveal>
              <strong>{value}</strong><span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <main>
        <section className="section white" id="challenge">
          <div className="wrap challenge-grid">
            <div className="challenge-copy" data-reveal>
              <p className="eyebrow">01 / THE CHALLENGE</p>
              <h2>Global hiring demand. Fragmented processes.</h2>
              <p>In France alone, Capgemini was receiving roughly 8,000–10,000 applications every month, with around 90% of applicants not qualified for the role they had applied to.</p>
              <p>Manual screening, technical interviews and siloed assessment tools made it harder to identify strong candidates quickly. At enterprise volume, every extra handoff added more time, more admin and more inconsistency.</p>
            </div>
            <div className="challenge-visual" data-reveal>
              <img src={asset("challenge-image.png")} alt="Hiring challenge flow showing high application volume, manual screening, siloed tools and delayed feedback" />
            </div>
          </div>
        </section>

        <section className="section dark" id="solution">
          <div className="wrap two-col">
            <div data-reveal>
              <p className="eyebrow light">02 / THE SOLUTION</p>
              <h2>One assessment journey. Two levels of signal.</h2>
              <p className="dark-copy">Capgemini introduced a two-stage assessment model through MakiPeople. The first stage screens at scale across technical, cognitive and language skills. The second goes deeper into role-specific functional and behavioural competencies.</p>
              <p className="dark-copy">The important change was not simply adding another assessment. It was bringing different signals into one experience so recruiters could compare candidates consistently and make decisions earlier.</p>
              <a className="button" href={demoHref} target="_blank" rel="noreferrer">Explore the product <Arrow /></a>
            </div>
            <div data-reveal>
              <SolutionFlow />
            </div>
          </div>
        </section>

<section className="impact-section" id="impact">
  <div className="wrap impact-top">
    <div className="impact-copy" data-reveal>
      <p className="eyebrow">03 / THE IMPACT</p>

      <h2>
        Faster hiring.
        <br />
        Happier candidates.
        <br />
        A stronger employer brand.
      </h2>

      <p className="impact-intro">
        By streamlining assessment and screening with MakiPeople,
        Capgemini significantly reduced time to hire, improved candidate
        satisfaction and gave recruiters more time to focus on
        higher-value, strategic work.
      </p>
    </div>

    <div className="impact-grid">
      <div className="impact-card" data-reveal>
        <div className="impact-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="6" width="14" height="13" rx="2" />
            <path d="M8 3v5M16 3v5M5 10h14" />
          </svg>
        </div>

        <div className="impact-card-copy">
          <strong className="impact-value">&lt;10 days</strong>
          <span className="impact-label">Time to hire</span>
          <p>From several weeks</p>
        </div>

        <div className="impact-wave" />
      </div>

      <div className="impact-card" data-reveal>
        <div className="impact-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="9" cy="8" r="3" />
            <circle cx="16.5" cy="9" r="2.4" />
            <path d="M3.5 19c.7-3.5 2.8-5.5 5.5-5.5s4.8 2 5.5 5.5" />
            <path d="M14.5 14.5c2.8 0 4.8 1.7 5.7 4.5" />
          </svg>
        </div>

        <div className="impact-card-copy">
          <strong className="impact-value">95%</strong>
          <span className="impact-label">Candidate satisfaction</span>
          <p>Candidates rate their experience highly</p>
        </div>

        <div className="impact-wave" />
      </div>

      <div className="impact-card" data-reveal>
        <div className="impact-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 6h11M8 12h11M8 18h11" />
            <path d="M4 6h.01M4 12h.01M4 18h.01" />
          </svg>
        </div>

        <div className="impact-card-copy">
          <strong className="impact-value">96%</strong>
          <span className="impact-label">Completion rate</span>
          <p>Candidates complete the assessment</p>
        </div>

        <div className="impact-wave" />
      </div>

      <div className="impact-card" data-reveal>
        <div className="impact-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m12 3 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.4-4.2 6-.9L12 3z" />
          </svg>
        </div>

        <div className="impact-card-copy">
          <strong className="impact-value">94%</strong>
          <span className="impact-label">Improved brand perception</span>
          <p>Candidates have a more positive view of Capgemini</p>
        </div>

        <div className="impact-wave" />
      </div>
    </div>
  </div>

  <div className="impact-quote-row">
    <div className="wrap impact-quote-inner">
      <div className="quote-person" data-reveal>
        <div className="quote-avatar">
          <img
            src={asset("jihane-baciocchini.png")}
            alt="Jihane Baciocchini"
          />
        </div>
      </div>

      <blockquote className="impact-quote" data-reveal>
        <span className="quote-mark">“</span>

        <p>
          Assessing different competencies and skills through a single
          assessment is very important for us. We can pick and choose
          whatever assessments we need in a very agile way, while having
          something that looks like our experience.
        </p>

        <cite>
          <strong>Jihane Baciocchini</strong>
          <span>Global Head of Talent Acquisition, Capgemini</span>
        </cite>
      </blockquote>

      <div className="quote-building" data-reveal>
        <img
          src={asset("capgemini-building.png")}
          alt="Capgemini office building"
        />
      </div>
    </div>
  </div>
</section>

  


<section className="global-impact" id="global-impact">
  <div className="wrap global-impact-grid">
    <div className="global-impact-copy" data-reveal>
      <p className="eyebrow">GLOBAL IMPACT</p>

      <h2>
        Live in France.
        <br />
        Expanding to 50+ countries.
      </h2>

      <p>
        Following a successful rollout in France, Capgemini plans to expand
        MakiPeople’s assessment platform to more than 50 countries by 2026.
      </p>

      <a
        className="global-story-link"
        href={sourceHref}
        target="_blank"
        rel="noreferrer"
      >
        Read the original story <Arrow />
      </a>
    </div>

    <div className="global-map" data-reveal>
      <img
        src={asset("global-map.png")}
        alt="Map showing MakiPeople's planned global rollout across Capgemini"
      />
    </div>

    <div className="global-stats" data-reveal>
      <div className="global-stat">
        <strong>1</strong>
        <span>Country live</span>
        <small>France</small>
      </div>

      <div className="global-stat">
        <strong>50+</strong>
        <span>Countries planned</span>
        <small>by 2026</small>
      </div>
    </div>
  </div>
</section>

        <section className="closing">
          <div className="wrap closing-inner" data-reveal>
            <div><p className="eyebrow light">CUSTOMER STORY · CAPGEMINI</p><h2>See what MakiPeople can do at enterprise scale.</h2></div>
            <div className="actions">
              <a className="button" href={demoHref} target="_blank" rel="noreferrer">Request a demo <Arrow /></a>
              <a className="text-link light-link" href={demoHref} target="_blank" rel="noreferrer">Explore the product <Arrow /></a>
            </div>
          </div>
          <footer className="wrap footer">
            <p>Portfolio sample by GrowUp, based on MakiPeople’s published Capgemini customer story. Not published by or affiliated with MakiPeople or Capgemini.</p>
            <div><a href={portfolioHref}><Arrow back /> Back to portfolio</a><a href={sourceHref} target="_blank" rel="noreferrer">Original story <Arrow /></a></div>
          </footer>
        </section>
      </main>
    </article>
  );
}

const styles = `
.maki-case{--ink:#101714;--muted:#69736e;--line:#e5e9e6;--soft:#f4f7f4;--black:#06100c;--mint:#d9fae8;--mint2:#bff4d8;--green:#0e6b4e;background:#fff;color:var(--ink);font-family:Inter,"Helvetica Neue",Arial,sans-serif;line-height:1.65;-webkit-font-smoothing:antialiased}.maki-case,.maki-case *,.maki-case *:before,.maki-case *:after{box-sizing:border-box}.maki-case :where(h1,h2,p,figure,blockquote){margin:0}.maki-case a{text-decoration:none;color:inherit}.maki-case img{display:block;width:100%}.maki-case svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.wrap{width:min(1260px,calc(100% - 96px));margin-inline:auto}.maki-case h1,.maki-case h2{font-family:Georgia,"Times New Roman",serif;font-weight:400;letter-spacing:-.055em;text-wrap:balance}.maki-case h1{font-size:clamp(52px,5vw,78px);line-height:.98}.maki-case h2{font-size:clamp(38px,3.9vw,58px);line-height:1.03}.eyebrow{margin-bottom:18px!important;color:#728079!important;font-size:10px;font-weight:800;letter-spacing:.16em}.eyebrow.light{color:#a7e8c8!important}.section{padding:96px 0}.white{background:#fff}.soft{background:var(--soft)}.button{display:inline-flex;align-items:center;gap:18px;min-height:50px;padding:14px 19px;border:1px solid var(--mint2);border-radius:5px;background:var(--mint);color:#082019!important;font-size:13px;font-weight:750;transition:.2s ease}.button:hover{transform:translateY(-2px);background:#effff6}.text-link{display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:700}.text-link:hover{text-decoration:underline;text-underline-offset:5px}.light-link{color:#eff8f3!important}.actions{display:flex;align-items:center;gap:24px;margin-top:30px}


.hero{
  position:relative;
  z-index:2;
  overflow:hidden;
  background:#041b1c;
  color:#fff;
}

.hero:before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background-image:
    linear-gradient(rgba(255,255,255,.024) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.024) 1px,transparent 1px);
  background-size:64px 64px;
  mask-image:linear-gradient(
    to right,
    transparent 0%,
    #000 44%,
    #000 100%
  );
}

.hero:after{
  content:"";
  position:absolute;
  right:-8%;
  top:-20%;
  width:62%;
  height:125%;
  pointer-events:none;
  background:radial-gradient(
    ellipse at center,
    rgba(39,143,101,.13) 0%,
    rgba(15,70,51,.06) 42%,
    transparent 72%
  );
}

.hero-grid{
  position:relative;
  z-index:1;
  min-height:650px;
  display:grid;
  grid-template-columns:.88fr 1.12fr;
  gap:34px;
  align-items:center;
  padding:66px 0 22px;
}

.hero-copy{
  position:relative;
  z-index:4;
  max-width:620px;
}

.brand-lockup{
  display:flex;
  align-items:center;
  gap:12px;
  margin-bottom:40px;
  font-size:15px;
}

.brand-lockup span{
  color:#668078;
}

.capgemini{
  font-family:Georgia,"Times New Roman",serif;
  font-style:italic;
  font-weight:400;
}

.hero h1{
  max-width:650px;
  color:#fff;
  font-size:clamp(50px,4.25vw,66px);
  line-height:1;
  letter-spacing:-.055em;
}

.deck{
  max-width:590px;
  margin-top:25px!important;
  color:#b8c6bf!important;
  font-size:15px;
  line-height:1.75;
}

.hero-art{
  position:relative;
  z-index:1;
  align-self:stretch;
  min-height:610px;
  margin-right:-105px;
  pointer-events:none;
}

.hero-visual{
  position:absolute;
  z-index:2;
  top:-65px;
  right:-22px;
  width:118%;
  max-width:none!important;
  height:auto;
  object-fit:contain;
  filter:
    drop-shadow(0 38px 58px rgba(0,0,0,.22))
    drop-shadow(0 70px 110px rgba(0,0,0,.16));
}

.metric-strip{
  position:relative;
  z-index:3;
  padding-top:0;
  border-bottom:1px solid var(--line);
  background:#fff;
}.metric-grid{display:grid;grid-template-columns:repeat(4,1fr)}.metric{min-height:118px;display:grid;align-content:center;padding:26px 30px;border-left:1px solid var(--line)}.metric:first-child{border-left:0}.metric strong{font-family:Georgia,"Times New Roman",serif;font-size:30px;font-weight:400;letter-spacing:-.045em;line-height:1.05}.metric span{margin-top:7px;color:#6c7771;font-size:11px}.split-top{display:grid;grid-template-columns:.88fr 1.12fr;gap:78px;align-items:end}.challenge-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:50px;align-items:center}.challenge-copy p{font-size:15px;line-height:1.82;color:var(--muted);margin-top:18px}.challenge-visual img{width:120%;max-width:none;height:auto;background:transparent;border:none;box-shadow:none;margin-left:-10%}.body-copy{max-width:650px;color:var(--muted)}.body-copy p+ p{margin-top:18px}.body-copy p,.body-copy.solo{font-size:15px;line-height:1.82}.body-copy.solo{margin-top:24px}.visual-card{overflow:hidden;border:1px solid var(--line);border-radius:16px;background:#f9fbf9;box-shadow:0 28px 80px rgba(22,49,38,.08)}.visual-card.wide{margin-top:42px}.dark{background:radial-gradient(circle at 72% 45%,rgba(67,188,137,.12),transparent 30%),var(--black);color:#fff}.dark h2{color:#fff}.two-col{display:grid;grid-template-columns:.86fr 1.14fr;gap:72px;align-items:center}.dark-copy{margin-top:20px!important;color:#aebbb5!important;font-size:14px;line-height:1.82}.dark-card{border-color:rgba(255,255,255,.1);background:#0b1712;box-shadow:0 35px 90px rgba(0,0,0,.35)}
.flow{position:relative;overflow:hidden;display:grid;grid-template-columns:1fr 64px 1fr;align-items:center;padding:28px;border:1px solid rgba(255,255,255,.1);border-radius:20px;background:linear-gradient(160deg,#10211a,#09130f);box-shadow:0 35px 90px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.06)}
.flow:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 80% 20%,rgba(67,188,137,.14),transparent 45%)}
.flow-stage{position:relative;padding:22px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.025)}
.flow-head{display:flex;align-items:center;gap:14px;margin-bottom:12px}
.flow-num{width:38px;height:38px;flex:none;display:grid;place-items:center;border-radius:50%;background:var(--mint);color:#06281c;font-size:14px;font-weight:800;box-shadow:0 0 0 5px rgba(217,250,232,.08)}
.flow-head strong{display:block;color:#fff;font-size:15px;line-height:1.25}
.flow-head small{color:#8fa39a;font-size:11px}
.flow-row{display:flex;align-items:center;gap:14px;margin-top:10px;padding:13px 14px;border:1px solid rgba(255,255,255,.06);border-radius:10px;background:rgba(255,255,255,.035);color:#e4efe9;font-size:13px;font-weight:500;transition:.2s ease}
.flow-row:hover{transform:translateX(3px);border-color:rgba(167,232,200,.4);background:rgba(217,250,232,.06)}
.flow-ico{width:34px;height:34px;flex:none;display:grid;place-items:center;border-radius:8px;background:rgba(191,244,216,.1);color:#a7e8c8}
.flow-ico svg{width:18px;height:18px}
.flow-link{position:relative;display:grid;place-items:center;align-self:stretch}
.flow-link:before{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:linear-gradient(90deg,transparent,rgba(167,232,200,.45),transparent)}
.flow-link i{position:relative;width:42px;height:42px;display:grid;place-items:center;border:1px solid rgba(167,232,200,.55);border-radius:50%;background:#09130f;color:#d9fae8}
@media(max-width:1050px){.flow{grid-template-columns:1fr;gap:0}.flow-link{height:56px}.flow-link:before{left:50%;right:auto;top:0;bottom:0;width:1px;height:auto;background:linear-gradient(180deg,transparent,rgba(167,232,200,.45),transparent)}.flow-link i svg{transform:rotate(90deg)}}
@media(max-width:620px){.flow{padding:16px}.flow-stage{padding:16px}}.impact-section{
  background:#fff;
  overflow:hidden;
}

.impact-top{
  display:grid;
  grid-template-columns:.82fr 1.18fr;
  gap:82px;
  align-items:start;
  padding:92px 0 74px;
}

.impact-copy{
  max-width:500px;
  padding-top:12px;
}

.impact-copy h2{
  max-width:490px;
  font-size:clamp(42px,3.8vw,58px);
  line-height:1.01;
}

.impact-intro{
  max-width:470px;
  margin-top:24px!important;
  color:#606b66;
  font-size:15px;
  line-height:1.75;
}

.impact-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:18px;
  margin:0;
}

.impact-card{
  position:relative;
  isolation:isolate;
  overflow:hidden;
  min-height:148px;
  display:grid;
  grid-template-columns:58px 1fr;
  gap:20px;
  align-items:start;
  padding:24px 25px;
  border:1px solid #e0e7e3;
  border-radius:12px;
  background:#fff;
  box-shadow:
    0 1px 2px rgba(10,31,23,.02),
    0 12px 34px rgba(10,31,23,.025);
}

.impact-card:after{
  display:none;
}

.impact-icon{
  position:relative;
  z-index:2;
  width:48px;
  height:48px;
  display:grid;
  place-items:center;
  border-radius:10px;
  background:#dcf8e9;
  color:#18372b;
}

.impact-icon svg{
  width:23px;
  height:23px;
  stroke-width:1.65;
}

.impact-card-copy{
  position:relative;
  z-index:2;
  min-width:0;
}

.impact-value{
  display:block!important;
  margin:0!important;
  color:#101714;
  font-size:31px!important;
  font-weight:800!important;
  line-height:1;
  letter-spacing:-.05em;
}

.impact-label{
  display:block!important;
  margin-top:8px;
  color:#25312c!important;
  font-size:13px!important;
  font-weight:750;
  line-height:1.25;
  letter-spacing:0!important;
}

.impact-card p{
  max-width:210px;
  margin-top:5px!important;
  color:#6e7973;
  font-size:11px;
  line-height:1.45;
}

.impact-wave{
  position:absolute;
  z-index:0;
  left:43%;
  right:-9%;
  bottom:-42px;
  height:88px;
  border:2px solid rgba(81,183,137,.25);
  border-left-color:transparent;
  border-bottom-color:transparent;
  border-radius:58% 50% 0 0;
  transform:rotate(-3deg);
}

.impact-wave:after{
  content:"";
  position:absolute;
  inset:10px -20px -15px 12px;
  border-radius:50%;
  background:linear-gradient(
    180deg,
    rgba(217,250,232,.08),
    rgba(217,250,232,.62)
  );
}

.impact-quote-row{
  position:relative;
  overflow:hidden;
  min-height:288px;
  border-top:1px solid #edf0ee;
  background:
    linear-gradient(
      90deg,
      #fbfcfb 0%,
      #fbfcfb 54%,
      #f3f8f8 72%,
      #e4f1f7 100%
    );
}

.impact-quote-inner{
  min-height:288px;
  display:grid;
  grid-template-columns:150px minmax(0,1.1fr) minmax(330px,.9fr);
  gap:28px;
  align-items:center;
}

.quote-person{
  position:relative;
  z-index:3;
  display:flex;
  align-items:center;
  justify-content:center;
}

.quote-avatar{
  width:126px;
  height:126px;
  overflow:hidden;
  border-radius:50%;
  background:#e9ecea;
  box-shadow:0 0 0 10px rgba(255,255,255,.55);
}

.quote-avatar img{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center top;
}

.impact-quote{
  position:relative;
  z-index:3;
  padding:42px 0 38px;
}

.impact-quote .quote-mark{
  position:absolute;
  left:-34px;
  top:35px;
  color:#145f48;
  font-family:Georgia,"Times New Roman",serif;
  font-size:46px;
  line-height:1;
}

.impact-quote p{
  max-width:650px;
  color:#16201c;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(22px,2vw,30px);
  line-height:1.25;
  letter-spacing:-.035em;
}

.impact-quote cite{
  display:grid;
  gap:2px;
  margin-top:18px;
  font-style:normal;
}

.impact-quote cite strong{
  color:#27312d;
  font-size:11px;
  font-weight:800;
}

.impact-quote cite span{
  color:#727d77;
  font-size:9px;
}

.quote-building{
  position:relative;
  align-self:stretch;
  min-height:288px;
}

.quote-building:before{
  content:"";
  position:absolute;
  z-index:2;
  top:0;
  bottom:0;
  left:-2px;
  width:120px;
  background:linear-gradient(
    90deg,
    #f7faf9 0%,
    rgba(247,250,249,.74) 34%,
    rgba(247,250,249,0) 100%
  );
  pointer-events:none;
}

.quote-building img{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center 42%;
}.global-impact{
  position:relative;
  overflow:hidden;
  border-top:1px solid #edf0ee;
  background:#fff;
}

.global-impact-grid{
  min-height:360px;
  display:grid;
  grid-template-columns:
    minmax(300px,.84fr)
    minmax(480px,1.35fr)
    150px;
  gap:46px;
  align-items:center;
  padding:66px 0 56px;
}

.global-impact-copy{
  position:relative;
  z-index:3;
  max-width:430px;
}

.global-impact-copy .eyebrow{
  margin-bottom:15px!important;
}

.global-impact-copy h2{
  max-width:430px;
  font-size:clamp(38px,3.3vw,51px);
  line-height:1.03;
}

.global-impact-copy>p:not(.eyebrow){
  max-width:400px;
  margin-top:20px!important;
  color:#69736e;
  font-size:14px;
  line-height:1.72;
}

.global-story-link{
  display:inline-flex;
  align-items:center;
  gap:9px;
  margin-top:18px;
  color:#17231e;
  font-size:11px;
  font-weight:750;
}

.global-story-link svg{
  width:15px;
  height:15px;
  transition:transform .2s ease;
}

.global-story-link:hover svg{
  transform:translateX(3px);
}

.global-map{
  position:relative;
  z-index:1;
  min-width:0;
  align-self:stretch;
  display:flex;
  align-items:center;
  justify-content:center;
}

.global-map:before{
  content:"";
  position:absolute;
  inset:12% 3%;
  pointer-events:none;
  background:radial-gradient(
    ellipse at center,
    rgba(62,167,122,.07) 0%,
    rgba(62,167,122,.025) 44%,
    transparent 73%
  );
  filter:blur(14px);
}

.global-map img{
  position:relative;
  z-index:2;
  width:112%;
  max-width:none;
  height:auto;
  object-fit:contain;
  background:transparent;
  border:0;
  border-radius:0;
  box-shadow:none;
}

.global-stats{
  position:relative;
  z-index:3;
  align-self:center;
  display:grid;
  gap:48px;
  padding-left:12px;
}

.global-stat{
  display:grid;
  gap:1px;
}

.global-stat strong{
  color:#101714;
  font-family:Inter,"Helvetica Neue",Arial,sans-serif;
  font-size:31px;
  font-weight:800;
  line-height:1;
  letter-spacing:-.05em;
}

.global-stat span{
  margin-top:7px;
  color:#24302b;
  font-size:11px;
  font-weight:700;
  line-height:1.25;
}

.global-stat small{
  margin-top:2px;
  color:#78817c;
  font-size:10px;
  line-height:1.3;
}.closing{background:radial-gradient(circle at 83% 70%,rgba(99,227,166,.11),transparent 25%),var(--black);color:#fff}.closing-inner{display:flex;align-items:end;justify-content:space-between;gap:50px;padding:72px 0}.closing h2{max-width:700px;color:#fff}.footer{padding:24px 0 36px;border-top:1px solid rgba(255,255,255,.09)}.footer>p{max-width:760px;color:#708078;font-size:10px}.footer>div{display:flex;gap:30px;margin-top:22px}.footer a{display:inline-flex;align-items:center;gap:8px;color:#c7d6cf;font-size:11px}[data-reveal]{opacity:0;transform:translateY(18px);transition:opacity .65s ease,transform .65s cubic-bezier(.2,.7,.2,1)}[data-reveal].is-in{opacity:1;transform:translateY(0)}@media(max-width:1050px){
  .wrap{
    width:calc(100% - 64px);
  }

  .hero-grid,
  .split-top,
  .two-col,
  .quote-grid,
  .challenge-grid{
    grid-template-columns:1fr;
  }

  .challenge-visual img{
    width:100%;
    margin-left:0;
  }

  .hero-grid{
    min-height:auto;
    gap:12px;
    padding:64px 0 0;
  }

  .hero-copy{
    max-width:720px;
  }

  .hero h1{
    max-width:720px;
    font-size:clamp(48px,7vw,66px);
  }

  .hero-art{
    min-height:570px;
    margin-right:0;
    overflow:visible;
  }

  .hero-visual{
    top:-28px;
    left:50%;
    right:auto;
    width:min(920px,118%);
    max-width:none!important;
    transform:translateX(-50%);
  }

  .metric-grid,
  .impact-grid{
    grid-template-columns:1fr 1fr;
  }

  .metric:nth-child(3){
    border-left:0;
    border-top:1px solid var(--line);
  }

  .metric:nth-child(4){
    border-top:1px solid var(--line);
  }

  .quote-image{
    max-height:360px;
  }

  .closing-inner{
    align-items:flex-start;
    flex-direction:column;
  }

  .map-stat{
    right:16px;
  }
}@media(max-width:620px){
  .wrap{
    width:calc(100% - 30px);
  }

  .section{
    padding:68px 0;
  }

  .maki-case h1{
    font-size:44px;
  }

  .maki-case h2{
    font-size:38px;
  }

  .brand-lockup{
    margin-bottom:30px;
  }

  .deck{
    font-size:15px;
  }

  .actions{
    align-items:flex-start;
    flex-direction:column;
  }

  .hero-grid{
    gap:8px;
    padding:48px 0 0;
  }

  .hero-art{
    min-height:410px;
    margin-right:0;
    overflow:hidden;
  }

  .hero-visual{
    top:10px;
    left:53%;
    right:auto;
    width:158%;
    max-width:none!important;
    transform:translateX(-50%);
  }

  .metric-grid,
  .impact-grid{
    grid-template-columns:1fr;
  }

  .metric{
    border-left:0;
    border-top:1px solid var(--line);
  }

  .metric:first-child{
    border-top:0;
  }

  .quote-grid blockquote{
    padding:45px 0;
  }

  .quote-grid blockquote p{
    padding-left:34px;
    font-size:27px;
  }

  .quote-grid cite{
    margin-left:34px;
  }

  .candidate-row{
    grid-template-columns:34px 1fr 54px;
  }

  .candidate-row i,
  .candidate-row em{
    display:none;
  }

  .map-stat{
    position:static;
    display:inline-block;
    margin:14px 10px 0 0;
  }

  .footer>div{
    align-items:flex-start;
    flex-direction:column;
  }
}@media(prefers-reduced-motion:reduce){.maki-case *,.maki-case *:before,.maki-case *:after{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
`;
