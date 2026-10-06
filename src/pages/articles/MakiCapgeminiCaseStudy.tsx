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
          <div className="wrap split-top">
            <div data-reveal>
              <p className="eyebrow">01 / THE CHALLENGE</p>
              <h2>Global hiring demand. Fragmented processes.</h2>
            </div>
            <div className="body-copy" data-reveal>
              <p>In France alone, Capgemini was receiving roughly 8,000–10,000 applications every month, with around 90% of applicants not qualified for the role they had applied to.</p>
              <p>Manual screening, technical interviews and siloed assessment tools made it harder to identify strong candidates quickly. At enterprise volume, every extra handoff added more time, more admin and more inconsistency.</p>
            </div>
          </div>
          <div className="wrap visual-card wide" data-reveal>
            <img src={asset("challenge-flow.png")} alt="Hiring challenge flow showing high application volume, manual screening, siloed tools and delayed feedback" />
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
            <div className="visual-card dark-card" data-reveal>
              <img src={asset("solution-journey.png")} alt="Two-stage MakiPeople assessment journey" />
            </div>
          </div>
        </section>

        <section className="section white" id="impact">
          <div className="wrap split-top">
            <div data-reveal>
              <p className="eyebrow">03 / THE IMPACT</p>
              <h2>Faster hiring. Happier candidates. Stronger employer brand.</h2>
            </div>
            <div className="body-copy" data-reveal>
              <p>The hiring cycle moved from several weeks to under ten days. Candidate satisfaction stayed high at 95%, completion reached 96% at the in-depth assessment stage, and Capgemini reported a 94% improvement in brand perception among applicants.</p>
            </div>
          </div>

          <div className="wrap impact-grid">
            {[
              ["<10 days", "Time to hire", "Reduced from several weeks."],
              ["95%", "Candidate satisfaction", "Candidates rated the experience highly."],
              ["96%", "Completion rate", "Candidates completed the in-depth assessment."],
              ["94%", "Improved brand perception", "Applicants left with a stronger view of Capgemini."],
            ].map(([value, title, copy]) => (
              <div className="impact-card" key={title} data-reveal>
                <span>{value}</span><strong>{title}</strong><p>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="quote-band">
          <div className="wrap quote-grid">
            <blockquote data-reveal>
              <span className="quote-mark">“</span>
              <p>Assessing different competencies and skills through a single assessment is very important for us. We can pick and choose whatever assessments we need in a very agile way while having something that looks like our experience.</p>
              <cite><strong>Jihane Baciocchini</strong><span>Global Head of Talent Acquisition, Capgemini</span></cite>
            </blockquote>
            <div className="quote-image" data-reveal>
              <img src={asset("capgemini-building.png")} alt="Capgemini office building" />
            </div>
          </div>
        </section>

        <section className="section white" id="candidate-experience">
          <div className="wrap two-col reverse-on-mobile">
            <div data-reveal>
              <p className="eyebrow">04 / CANDIDATE EXPERIENCE</p>
              <h2>Instant feedback replaced a 48-hour wait.</h2>
              <p className="body-copy solo">Candidates received feedback immediately after completing the assessment rather than waiting around two days. They could see where they performed well and where they could improve, making the process more useful even for people who were not selected.</p>
            </div>
            <div className="visual-card" data-reveal>
              <img src={asset("assessment-results.png")} alt="Candidate assessment results interface with score, strengths and development areas" />
            </div>
          </div>
        </section>

        <section className="section soft" id="recruiter-experience">
          <div className="wrap two-col recruiter-grid">
            <div className="recruiter-board" data-reveal>
              <div className="board-head"><span>Recruiter view</span><strong>Software Engineer Assessment</strong></div>
              {[
                ["Marie Dupont","92%","Strong match"],
                ["Thomas Bernard","78%","Review"],
                ["Sofia Almeida","66%","Developing"],
                ["James Okafor","88%","Strong match"],
              ].map(([name, score, label]) => (
                <div className="candidate-row" key={name}>
                  <div className="avatar">{name.split(" ").map((n) => n[0]).join("")}</div>
                  <strong>{name}</strong>
                  <i><span style={{ width: score }} /></i>
                  <b>{score}</b><em>{label}</em>
                </div>
              ))}
            </div>
            <div data-reveal>
              <p className="eyebrow">05 / RECRUITER EXPERIENCE</p>
              <h2>From admin work to higher-value decisions.</h2>
              <p className="body-copy solo">Recruiters gained one structured view of candidate performance instead of piecing together evidence from separate tools and manual interviews. Maki reports that this shifted more recruiter time away from repetitive administration and towards deciding who should move forward.</p>
            </div>
          </div>
        </section>

        <section className="section white" id="global-impact">
          <div className="wrap two-col">
            <div data-reveal>
              <p className="eyebrow">06 / GLOBAL IMPACT</p>
              <h2>Live in France. Expanding to 50+ countries.</h2>
              <p className="body-copy solo">Following the rollout in France, Capgemini said it planned to expand MakiPeople’s assessment platform across more than 50 countries by 2026. That is the enterprise test: whether one assessment model can scale across roles, business lines and hiring volumes without recreating the process market by market.</p>
              <a className="text-link" href={sourceHref} target="_blank" rel="noreferrer">Read the original story <Arrow /></a>
            </div>
            <div className="map-wrap" data-reveal>
              <img src={asset("global-map.png")} alt="Global rollout map" />
              <div className="map-stat a"><strong>1</strong><span>Country live</span><small>France</small></div>
              <div className="map-stat b"><strong>50+</strong><span>Countries planned</span><small>by 2026</small></div>
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
  background:
    radial-gradient(circle at 79% 20%,rgba(65,188,136,.15),transparent 31%),
    radial-gradient(circle at 94% 65%,rgba(21,105,76,.12),transparent 28%),
    linear-gradient(120deg,#020705 0%,#06100c 55%,#091710 100%);
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
}.metric-grid{display:grid;grid-template-columns:repeat(4,1fr)}.metric{min-height:118px;display:grid;align-content:center;padding:26px 30px;border-left:1px solid var(--line)}.metric:first-child{border-left:0}.metric strong{font-family:Georgia,"Times New Roman",serif;font-size:30px;font-weight:400;letter-spacing:-.045em;line-height:1.05}.metric span{margin-top:7px;color:#6c7771;font-size:11px}.split-top{display:grid;grid-template-columns:.88fr 1.12fr;gap:78px;align-items:end}.body-copy{max-width:650px;color:var(--muted)}.body-copy p+ p{margin-top:18px}.body-copy p,.body-copy.solo{font-size:15px;line-height:1.82}.body-copy.solo{margin-top:24px}.visual-card{overflow:hidden;border:1px solid var(--line);border-radius:16px;background:#f9fbf9;box-shadow:0 28px 80px rgba(22,49,38,.08)}.visual-card.wide{margin-top:42px}.dark{background:radial-gradient(circle at 72% 45%,rgba(67,188,137,.12),transparent 30%),var(--black);color:#fff}.dark h2{color:#fff}.two-col{display:grid;grid-template-columns:.86fr 1.14fr;gap:72px;align-items:center}.dark-copy{margin-top:20px!important;color:#aebbb5!important;font-size:14px;line-height:1.82}.dark-card{border-color:rgba(255,255,255,.1);background:#0b1712;box-shadow:0 35px 90px rgba(0,0,0,.35)}.impact-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:48px}.impact-card{position:relative;overflow:hidden;min-height:190px;padding:28px;border:1px solid var(--line);border-radius:14px;background:#fff}.impact-card:after{content:"";position:absolute;left:-10%;right:-10%;bottom:-48px;height:100px;border-radius:50%;background:linear-gradient(180deg,rgba(217,250,232,0),rgba(191,244,216,.72))}.impact-card span{display:block;color:#11251d;font-size:34px;font-weight:800;letter-spacing:-.05em}.impact-card strong{display:block;margin-top:16px;font-size:13px}.impact-card p{margin-top:6px!important;color:#6c7771;font-size:11px;line-height:1.55}.quote-band{border-block:1px solid var(--line);background:#fbfcfb}.quote-grid{min-height:320px;display:grid;grid-template-columns:1.08fr .92fr}.quote-grid blockquote{position:relative;align-self:center;padding:54px 64px 54px 0}.quote-mark{position:absolute;left:-5px;top:40px;color:var(--green);font-family:Georgia,serif;font-size:58px;line-height:1}.quote-grid blockquote p{padding-left:46px;color:#17211d;font-family:Georgia,serif;font-size:clamp(24px,2.2vw,34px);line-height:1.22;letter-spacing:-.035em}.quote-grid cite{display:grid;gap:2px;margin:22px 0 0 46px;font-style:normal}.quote-grid cite strong{font-size:12px}.quote-grid cite span{color:#748079;font-size:10px}.quote-image{overflow:hidden;min-height:320px}.quote-image img{height:100%;object-fit:cover}.recruiter-grid{grid-template-columns:1.12fr .88fr}.recruiter-board{padding:28px;border:1px solid var(--line);border-radius:16px;background:#fff;box-shadow:0 30px 80px rgba(23,54,42,.08)}.board-head{display:grid;gap:3px;margin-bottom:18px}.board-head span{color:#718078;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.board-head strong{font-family:Georgia,serif;font-size:25px;font-weight:400;letter-spacing:-.03em}.candidate-row{display:grid;grid-template-columns:34px minmax(120px,1fr) 1.4fr 48px 92px;gap:12px;align-items:center;padding:13px 0;border-top:1px solid var(--line);font-size:11px}.avatar{width:32px;height:32px;display:grid;place-items:center;border-radius:50%;background:var(--mint);color:#0b5a40;font-size:9px;font-weight:800}.candidate-row i{height:6px;overflow:hidden;border-radius:999px;background:#edf1ee}.candidate-row i span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#0b6a4c,#79d6ae)}.candidate-row em{color:#607068;font-size:9px;font-style:normal;text-align:right}.map-wrap{position:relative}.map-wrap>img{border:1px solid var(--line);border-radius:16px;background:#fff}.map-stat{position:absolute;right:-20px;min-width:130px;padding:16px 18px;border:1px solid var(--line);border-radius:12px;background:#fff;box-shadow:0 16px 50px rgba(0,0,0,.08)}.map-stat.a{top:24%}.map-stat.b{top:56%}.map-stat strong{display:block;font-size:26px;letter-spacing:-.05em}.map-stat span,.map-stat small{display:block;color:#68736d;font-size:9px}.closing{background:radial-gradient(circle at 83% 70%,rgba(99,227,166,.11),transparent 25%),var(--black);color:#fff}.closing-inner{display:flex;align-items:end;justify-content:space-between;gap:50px;padding:72px 0}.closing h2{max-width:700px;color:#fff}.footer{padding:24px 0 36px;border-top:1px solid rgba(255,255,255,.09)}.footer>p{max-width:760px;color:#708078;font-size:10px}.footer>div{display:flex;gap:30px;margin-top:22px}.footer a{display:inline-flex;align-items:center;gap:8px;color:#c7d6cf;font-size:11px}[data-reveal]{opacity:0;transform:translateY(18px);transition:opacity .65s ease,transform .65s cubic-bezier(.2,.7,.2,1)}[data-reveal].is-in{opacity:1;transform:translateY(0)}@media(max-width:1050px){
  .wrap{
    width:calc(100% - 64px);
  }

  .hero-grid,
  .split-top,
  .two-col,
  .quote-grid{
    grid-template-columns:1fr;
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
