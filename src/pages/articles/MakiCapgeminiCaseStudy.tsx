"use client";

import { useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";

export type MakiCapgeminiCaseStudyProps = {
  portfolioHref?: string;
  demoHref?: string;
  sourceHref?: string;
};

const sourceUrl = "https://www.makipeople.com/customers/capgemini";

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={back ? { transform: "rotate(180deg)" } : undefined}
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20c.8-4.1 3-6.1 6.5-6.1s5.7 2 6.5 6.1" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2Z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V10m6 10V4m6 16v-7m4 7H2" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 17.5 3 21l4.5-1.2A9 9 0 1 0 5 17.5Z" />
      <path d="M8 10h8M8 14h5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.4 3.8 5.4 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.4-3.8-9S9.5 5.4 12 3Z" />
    </svg>
  );
}

function MakiMark() {
  return (
    <span className="mcp-maki-mark" aria-label="Maki">
      <svg viewBox="0 0 42 42" aria-hidden="true">
        <rect x="1" y="1" width="40" height="40" rx="11" />
        <path d="M11 27V15h4.4l5.6 7.6 5.6-7.6H31v12h-4.5v-5.4l-5.5 7-5.5-7V27H11Z" />
      </svg>
    </span>
  );
}

const metrics = [
  {
    label: "TIME TO HIRE",
    value: "<10",
    suffix: "days",
    body: "Early-career hiring cycles were cut from several weeks to under ten days.",
  },
  {
    label: "CANDIDATE SATISFACTION",
    value: "95",
    suffix: "%",
    body: "of candidates reported being satisfied with the experience.",
  },
  {
    label: "BRAND PERCEPTION",
    value: "94",
    suffix: "%",
    body: "reported improved brand perception among applicants.",
  },
  {
    label: "ASSESSMENT COMPLETION",
    value: "96",
    suffix: "%",
    body: "completion rate for the in-depth assessment stage.",
  },
];

const skillChips = [
  "Technical skills",
  "Cognitive skills",
  "Language",
  "Functional skills",
  "Behavioural competencies",
];

const revealSingles = [
  ".mcp-scale-heading > div",
  ".mcp-scale-heading > p",
  ".mcp-scale-visual",
  ".mcp-scale-copy",
  ".mcp-problem-heading > div",
  ".mcp-problem-heading > p",
  ".mcp-before",
  ".mcp-after",
  ".mcp-quote",
  ".mcp-solution-heading > div",
  ".mcp-solution-heading > p",
  ".mcp-phase-board",
  ".mcp-experience-heading > div",
  ".mcp-experience-heading > p",
  ".mcp-feedback-board",
  ".mcp-results-heading > div",
  ".mcp-results-heading > p",
  ".mcp-time-card",
  ".mcp-result-stack",
  ".mcp-rollout-copy",
  ".mcp-rollout-visual",
  ".mcp-cta",
  ".mcp-portfolio-note",
  ".mcp-footer-links",
];

const revealGroups = [
  ".mcp-metric",
  ".mcp-tool",
  ".mcp-phase",
  ".mcp-signal-row",
  ".mcp-result-card",
  ".mcp-country-chip",
];

export default function MakiCapgeminiCaseStudy({
  portfolioHref = "https://www.seo-growup.com/writing-portfolio",
  demoHref = "https://www.makipeople.com/",
  sourceHref = sourceUrl,
}: MakiCapgeminiCaseStudyProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets: HTMLElement[] = [];

    root.querySelectorAll<HTMLElement>(revealSingles.join(",")).forEach((el) => {
      targets.push(el);
    });

    root.querySelectorAll<HTMLElement>(revealGroups.join(",")).forEach((el) => {
      const index = el.parentElement
        ? Array.from(el.parentElement.children).indexOf(el)
        : 0;
      el.style.setProperty("--d", `${Math.min(index, 6) * 95}ms`);
      targets.push(el);
    });

    targets.forEach((el) => el.setAttribute("data-reveal", ""));
    root.classList.add("mcp-anim");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <article className="mcp" id="mcp-top" ref={rootRef}>
      <style>{styles}</style>

      <a className="mcp-skip" href="#mcp-story">
        Skip to the story
      </a>

      <header className="mcp-hero">
        <div className="mcp-hero-grid mcp-container">
          <div className="mcp-hero-copy">
            <p className="mcp-eyebrow mcp-eyebrow--light">
              HR TECH CASE STUDY SAMPLE
            </p>

            <h1>
              How Capgemini cut hiring to under 10 days{" "}
              <em>while 95% of candidates stayed satisfied.</em>
            </h1>

            <p className="mcp-deck">
              With 8,000–10,000 applications arriving each month in France and
              90% of them unqualified, the problem was not attracting more
              candidates. It was finding the right people fast enough. Maki
              replaced fragmented screening with one two-stage assessment flow.
            </p>

            <div className="mcp-hero-links">
              <a className="mcp-button" href="#mcp-story">
                Read the story <Arrow />
              </a>
              <a
                className="mcp-text-link"
                href={demoHref}
                target="_blank"
                rel="noreferrer"
              >
                Explore Maki <Arrow />
              </a>
            </div>

            <div className="mcp-hero-meta">
              <span>By GrowUp | For Maki</span>
              <span>Reviewed 5 October 2026</span>
            </div>
          </div>

          <div className="mcp-hero-visual" aria-label="Maki-style hiring workflow mockup">
            <div className="mcp-orbit mcp-orbit--one" />
            <div className="mcp-orbit mcp-orbit--two" />

            <div className="mcp-dashboard">
              <div className="mcp-dashboard-top">
                <div className="mcp-dashboard-brand">
                  <MakiMark />
                  <div>
                    <strong>Capgemini Graduate Hiring</strong>
                    <span>Assessment workflow</span>
                  </div>
                </div>
                <span className="mcp-live-pill">
                  <i /> Live
                </span>
              </div>

              <div className="mcp-dashboard-body">
                <aside className="mcp-dashboard-nav" aria-hidden="true">
                  <span className="is-active" />
                  <span />
                  <span />
                  <span />
                </aside>

                <div className="mcp-dashboard-main">
                  <div className="mcp-kicker">CANDIDATE PIPELINE</div>

                  <div className="mcp-candidate-card">
                    <div className="mcp-avatar">WH</div>
                    <div className="mcp-candidate-main">
                      <strong>William H.</strong>
                      <span>Research Engineer</span>
                    </div>
                    <span className="mcp-score">87%</span>
                  </div>

                  <div className="mcp-mini-progress">
                    <div>
                      <span>Screening</span>
                      <b>Complete</b>
                    </div>
                    <i><span style={{ width: "100%" }} /></i>
                  </div>

                  <div className="mcp-mini-progress">
                    <div>
                      <span>In-depth assessment</span>
                      <b>Complete</b>
                    </div>
                    <i><span style={{ width: "100%" }} /></i>
                  </div>

                  <div className="mcp-signal-grid">
                    <div>
                      <span>Technical</span>
                      <strong>91</strong>
                    </div>
                    <div>
                      <span>Reasoning</span>
                      <strong>84</strong>
                    </div>
                    <div>
                      <span>Language</span>
                      <strong>88</strong>
                    </div>
                  </div>

                  <div className="mcp-insight">
                    <SparkIcon />
                    <p>
                      <strong>Candidate insight</strong>
                      Strong technical signal with consistent performance across
                      the role-specific assessment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mcp-floating-card mcp-floating-card--feedback">
              <span>Candidate feedback</span>
              <strong>Ready instantly</strong>
              <small>Results available after completion</small>
            </div>

            <div className="mcp-floating-card mcp-floating-card--speed">
              <span>Time to hire</span>
              <strong>&lt;10 days</strong>
              <small>down from several weeks</small>
            </div>
          </div>
        </div>
      </header>

      <div id="mcp-story" className="mcp-container mcp-container--wide">
        <section className="mcp-metrics" aria-label="Results at a glance">
          {metrics.map((metric) => (
            <div className="mcp-metric" key={metric.label}>
              <span className="mcp-metric-label">{metric.label}</span>
              <strong>
                {metric.value}
                <span>{metric.suffix}</span>
              </strong>
              <p>{metric.body}</p>
            </div>
          ))}
        </section>

        <section className="mcp-scale mcp-section" id="mcp-scale">
          <div className="mcp-scale-heading">
            <div>
              <p className="mcp-eyebrow">01 / The scale</p>
              <h2>
                Capgemini did not have{" "}
                <em>an applicant-volume problem.</em>
              </h2>
            </div>

            <p>
              Globally, Capgemini hires up to 90,000 people a year. In France
              alone, the talent team was handling 8,000–10,000 applications
              every month, and roughly nine in ten were not qualified for the
              role they had applied to.
            </p>
          </div>

          <div className="mcp-scale-grid">
            <figure className="mcp-scale-visual">
              <div className="mcp-scale-number">
                <span>UP TO</span>
                <strong>90,000</strong>
                <p>hires globally each year</p>
              </div>

              <div className="mcp-funnel">
                <div className="mcp-funnel-head">
                  <span>FRANCE · MONTHLY APPLICATION FLOW</span>
                  <b>8,000–10,000</b>
                </div>

                <div className="mcp-people-grid" aria-hidden="true">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <span className={index === 0 ? "is-qualified" : ""} key={index}>
                      <UserIcon />
                    </span>
                  ))}
                </div>

                <div className="mcp-funnel-foot">
                  <strong>90%</strong>
                  <p>
                    of applications were unqualified, leaving recruiters to
                    find the useful signal inside a very large pile.
                  </p>
                </div>
              </div>
            </figure>

            <div className="mcp-scale-copy">
              <p className="mcp-pull">
                The number I keep coming back to is <strong>90%.</strong>
              </p>

              <p>
                If nine out of every ten applications are not a match, adding
                another recruiter to the queue only treats the symptom. The
                real job is to separate signal from noise early enough that
                recruiters can spend their time on people who deserve a closer
                look.
              </p>

              <p>
                That changes the question from “How do we process more CVs?” to
                “How do we identify relevant skills sooner, without making the
                candidate experience feel cold or disposable?”
              </p>

              <div className="mcp-source-chip">
                <span>Source context</span>
                <p>
                  Capgemini described high-volume hiring across roles,
                  geographies and seniority levels, with screening and
                  assessment work spread across disconnected tools.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mcp-problem" id="mcp-problem">
        <div className="mcp-container mcp-container--wide">
          <div className="mcp-problem-heading">
            <div>
              <p className="mcp-eyebrow mcp-eyebrow--light">02 / The bottleneck</p>
              <h2>
                Screening was spread across{" "}
                <em>too many steps and tools.</em>
              </h2>
            </div>

            <p>
              Recruiters were manually screening candidates, running technical
              interviews and moving between separate assessment systems. At
              Capgemini’s scale, every extra handoff became another place for
              the process to slow down.
            </p>
          </div>

          <div className="mcp-problem-compare">
            <div className="mcp-before">
              <p className="mcp-panel-label">Before Maki</p>
              <h3>Three decisions. Three separate workflows.</h3>

              <div className="mcp-tool-stack">
                <div className="mcp-tool">
                  <span className="mcp-tool-icon">
                    <UserIcon />
                  </span>
                  <div>
                    <strong>Manual CV screening</strong>
                    <p>Recruiters work through a high-volume applicant queue.</p>
                  </div>
                  <span className="mcp-tool-tag">Manual</span>
                </div>

                <div className="mcp-tool">
                  <span className="mcp-tool-icon">
                    <ChatIcon />
                  </span>
                  <div>
                    <strong>Technical interviews</strong>
                    <p>Recruiter and expert time is used before the shortlist is clear.</p>
                  </div>
                  <span className="mcp-tool-tag">Time-heavy</span>
                </div>

                <div className="mcp-tool">
                  <span className="mcp-tool-icon">
                    <ChartIcon />
                  </span>
                  <div>
                    <strong>Siloed assessments</strong>
                    <p>Different tools generate separate pieces of candidate evidence.</p>
                  </div>
                  <span className="mcp-tool-tag">Fragmented</span>
                </div>
              </div>

              <div className="mcp-bottleneck">
                <span />
                <p>
                  The result: hiring cycles stretched across several weeks and
                  early-career pipelines became a bottleneck.
                </p>
              </div>
            </div>

            <div className="mcp-after">
              <p className="mcp-panel-label">With Maki</p>
              <h3>One assessment flow, built around the role.</h3>

              <div className="mcp-maki-flow">
                <div className="mcp-flow-head">
                  <MakiMark />
                  <div>
                    <strong>Graduate Consultant</strong>
                    <span>Capgemini · France</span>
                  </div>
                  <small>Active</small>
                </div>

                <div className="mcp-flow-stage">
                  <span>01</span>
                  <div>
                    <strong>Initial screening</strong>
                    <p>Technical, cognitive and language skills</p>
                  </div>
                  <Tick />
                </div>

                <div className="mcp-flow-line" />

                <div className="mcp-flow-stage">
                  <span>02</span>
                  <div>
                    <strong>In-depth assessment</strong>
                    <p>Functional + behavioural competencies</p>
                  </div>
                  <Tick />
                </div>

                <div className="mcp-flow-output">
                  <SparkIcon />
                  <p>
                    Recruiter receives one structured view of the evidence
                    before deciding who moves forward.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <blockquote className="mcp-quote">
            <p>
              “Assessing different competencies and skills through a single
              assessment is very important for us.”
            </p>
            <cite>
              <strong>Jihane Baciocchini</strong>
              <span>Global Head of Talent Acquisition, Capgemini</span>
            </cite>
          </blockquote>
        </div>
      </section>

      <section className="mcp-solution mcp-section" id="mcp-solution">
        <div className="mcp-container mcp-container--wide">
          <div className="mcp-solution-heading">
            <div>
              <p className="mcp-eyebrow">03 / The new hiring flow</p>
              <h2>
                The clever bit was not{" "}
                <em>adding another assessment.</em>
              </h2>
            </div>

            <p>
              Maki let Capgemini combine different kinds of evidence inside one
              candidate experience. The first stage filtered at speed. The
              second stage went deeper and could be adapted to the business line
              and role.
            </p>
          </div>

          <div className="mcp-phase-board">
            <div className="mcp-phase-rail">
              <span className="mcp-phase-start">Application</span>
              <i />
              <span className="mcp-phase-end">Shortlist</span>
            </div>

            <div className="mcp-phases">
              <div className="mcp-phase">
                <div className="mcp-phase-head">
                  <span>PHASE 01</span>
                  <strong>Initial screening</strong>
                  <small>Fast first signal</small>
                </div>

                <p>
                  A short conversational pre-screen designed to identify the
                  candidates worth taking into a deeper assessment.
                </p>

                <div className="mcp-chip-row">
                  <span>Technical</span>
                  <span>Cognitive</span>
                  <span>Language</span>
                </div>

                <div className="mcp-phase-ui">
                  <div className="mcp-question">
                    <span>Question 04 / 08</span>
                    <strong>
                      Which approach would you take first in this client
                      scenario?
                    </strong>
                  </div>

                  <div className="mcp-answer is-selected">Clarify the objective</div>
                  <div className="mcp-answer">Build a quick solution</div>
                  <div className="mcp-answer">Escalate immediately</div>
                </div>
              </div>

              <div className="mcp-phase">
                <div className="mcp-phase-head">
                  <span>PHASE 02</span>
                  <strong>In-depth assessment</strong>
                  <small>Role-specific evidence</small>
                </div>

                <p>
                  Candidates who progress complete a deeper assessment combining
                  functional and behavioural competencies relevant to the
                  business line.
                </p>

                <div className="mcp-chip-row">
                  <span>Consulting</span>
                  <span>IT</span>
                  <span>Transformation</span>
                </div>

                <div className="mcp-radar">
                  <div className="mcp-radar-grid" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <svg viewBox="0 0 220 180" aria-hidden="true">
                    <polygon points="110,22 185,65 166,150 55,153 33,69" />
                  </svg>
                  <div className="mcp-radar-label l1">Problem solving</div>
                  <div className="mcp-radar-label l2">Communication</div>
                  <div className="mcp-radar-label l3">Technical</div>
                  <div className="mcp-radar-label l4">Collaboration</div>
                  <div className="mcp-radar-label l5">Reasoning</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mcp-signal-row">
            {skillChips.map((skill, index) => (
              <div key={skill}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{skill}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mcp-experience" id="mcp-experience">
        <div className="mcp-container mcp-container--wide">
          <div className="mcp-experience-heading">
            <div>
              <p className="mcp-eyebrow">04 / Candidate experience</p>
              <h2>
                Faster only matters if{" "}
                <em>the candidate does not feel rushed.</em>
              </h2>
            </div>

            <p>
              This is the part of the story I would not bury under the
              efficiency numbers. Before Maki, candidates could wait around 48
              hours for assessment feedback. With the new flow, they received
              results immediately and could see where they performed well and
              where they could improve.
            </p>
          </div>

          <div className="mcp-feedback-board">
            <div className="mcp-feedback-before">
              <span className="mcp-panel-label">Old feedback loop</span>
              <div className="mcp-clock">
                <div className="mcp-clock-face">
                  <i />
                  <b />
                </div>
                <strong>48h</strong>
                <p>before candidates received assessment feedback</p>
              </div>
            </div>

            <div className="mcp-feedback-arrow" aria-hidden="true">
              <Arrow />
            </div>

            <div className="mcp-feedback-after">
              <div className="mcp-feedback-window">
                <div className="mcp-feedback-top">
                  <div>
                    <MakiMark />
                    <span>Assessment complete</span>
                  </div>
                  <span className="mcp-ready">Results ready</span>
                </div>

                <div className="mcp-feedback-person">
                  <div className="mcp-avatar mcp-avatar--large">WH</div>
                  <div>
                    <span>Your result</span>
                    <strong>Nice work, William.</strong>
                  </div>
                </div>

                <div className="mcp-feedback-score">
                  <div>
                    <strong>87%</strong>
                    <span>Overall performance</span>
                  </div>
                  <div className="mcp-ring" style={{ "--score": "87%" } as CSSProperties}>
                    <span>87</span>
                  </div>
                </div>

                <div className="mcp-feedback-bars">
                  <div>
                    <span>Business strategy</span>
                    <i><b style={{ width: "84%" }} /></i>
                    <strong>84%</strong>
                  </div>
                  <div>
                    <span>English</span>
                    <i><b style={{ width: "91%" }} /></i>
                    <strong>91%</strong>
                  </div>
                  <div>
                    <span>Reasoning</span>
                    <i><b style={{ width: "86%" }} /></i>
                    <strong>86%</strong>
                  </div>
                </div>
              </div>

              <div className="mcp-feedback-note">
                <SparkIcon />
                <p>
                  Capgemini reported that candidates valued receiving detailed,
                  immediate feedback because it helped them understand their
                  strengths and areas to develop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mcp-results mcp-section" id="mcp-results">
        <div className="mcp-container mcp-container--wide">
          <div className="mcp-results-heading">
            <div>
              <p className="mcp-eyebrow">05 / What changed</p>
              <h2>
                The speed improved.{" "}
                <em>The experience improved with it.</em>
              </h2>
            </div>

            <p>
              The metric that makes the speed story believable is not the
              ten-day figure on its own. It is what happened around it:
              candidate satisfaction stayed high, brand perception improved and
              almost everyone who reached the deeper assessment completed it.
            </p>
          </div>

          <div className="mcp-results-grid">
            <div className="mcp-time-card">
              <div className="mcp-time-head">
                <span>TIME TO HIRE</span>
                <strong>Several weeks → under 10 days</strong>
              </div>

              <div className="mcp-time-track">
                <div className="mcp-time-before">
                  <span>BEFORE</span>
                  <i />
                  <b>Several weeks</b>
                </div>

                <div className="mcp-time-after">
                  <span>WITH MAKI</span>
                  <i />
                  <b>&lt;10 days</b>
                </div>
              </div>

              <div className="mcp-time-footer">
                <ChartIcon />
                <p>
                  Early-career hiring cycles moved from a multi-week process to
                  a sub-ten-day cycle.
                </p>
              </div>
            </div>

            <div className="mcp-result-stack">
              <div className="mcp-result-card">
                <span>95%</span>
                <div>
                  <strong>Candidate satisfaction</strong>
                  <p>
                    Candidates reported a positive experience despite the much
                    faster process.
                  </p>
                </div>
              </div>

              <div className="mcp-result-card">
                <span>94%</span>
                <div>
                  <strong>Improved brand perception</strong>
                  <p>
                    The hiring experience strengthened how applicants viewed
                    the employer brand.
                  </p>
                </div>
              </div>

              <div className="mcp-result-card">
                <span>96%</span>
                <div>
                  <strong>In-depth completion</strong>
                  <p>
                    Nearly every candidate reaching the deeper assessment
                    completed it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mcp-results-note">
            Maki also reports that recruiter time shifted away from repetitive
            administration and towards higher-value hiring decisions.
          </p>
        </div>
      </section>

      <section className="mcp-rollout" id="mcp-rollout">
        <div className="mcp-container mcp-container--wide mcp-rollout-grid">
          <div className="mcp-rollout-copy">
            <p className="mcp-eyebrow mcp-eyebrow--light">06 / What came next</p>
            <h2>
              The next step was{" "}
              <em>much bigger than France.</em>
            </h2>

            <p>
              Capgemini said it planned to expand Maki’s conversational
              assessments as part of an integrated talent-management rollout
              across more than 50 countries by 2026.
            </p>

            <p>
              That is the part that makes this more than a screening story.
              Once the assessment model works across different roles, business
              lines and hiring volumes, the same structure can become a common
              layer for how a global organisation evaluates talent.
            </p>

            <a
              className="mcp-text-link mcp-text-link--light"
              href={sourceHref}
              target="_blank"
              rel="noreferrer"
            >
              Read Maki’s original story <Arrow />
            </a>
          </div>

          <div className="mcp-rollout-visual">
            <div className="mcp-globe">
              <div className="mcp-globe-ring r1" />
              <div className="mcp-globe-ring r2" />
              <div className="mcp-globe-ring r3" />
              <div className="mcp-globe-axis a1" />
              <div className="mcp-globe-axis a2" />

              {[
                ["18%", "21%"],
                ["34%", "40%"],
                ["62%", "28%"],
                ["71%", "54%"],
                ["43%", "65%"],
                ["26%", "71%"],
                ["80%", "38%"],
              ].map(([left, top], i) => (
                <span
                  className="mcp-map-dot"
                  style={{ left, top }}
                  key={`${left}-${top}-${i}`}
                />
              ))}

              <div className="mcp-globe-center">
                <GlobeIcon />
                <strong>50+</strong>
                <span>countries in the stated rollout</span>
              </div>
            </div>

            <div className="mcp-country-row">
              {["France", "Europe", "Americas", "APAC"].map((country) => (
                <span className="mcp-country-chip" key={country}>
                  <i />
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mcp-container mcp-container--wide mcp-cta-section">
        <div className="mcp-cta">
          <div>
            <p className="mcp-eyebrow mcp-eyebrow--light">
              FOR ENTERPRISE TALENT TEAMS
            </p>

            <h2>
              Find the signal earlier.{" "}
              <em>Keep the candidate experience human.</em>
            </h2>

            <p>
              Maki brings skills screening and role-specific assessment into
              one hiring flow, so large applicant volumes do not automatically
              become large recruiter workloads.
            </p>

            <a
              className="mcp-button"
              href={demoHref}
              target="_blank"
              rel="noreferrer"
            >
              Explore Maki <Arrow />
            </a>
          </div>

          <div className="mcp-cta-side">
            <div className="mcp-cta-brand">
              <MakiMark />
              <span>Maki</span>
            </div>

            <ul>
              <li>
                <Tick /> Multi-skill screening in one flow
              </li>
              <li>
                <Tick /> Role-specific deeper assessment
              </li>
              <li>
                <Tick /> Immediate candidate feedback
              </li>
              <li>
                <Tick /> Structured evidence for recruiters
              </li>
            </ul>

            <span className="mcp-cta-caption">
              HIGH-VOLUME HIRING, WITH BETTER SIGNAL.
            </span>
          </div>
        </div>
      </section>

      <footer className="mcp-container mcp-container--wide mcp-footer">
        <div className="mcp-portfolio-note">
          <span className="mcp-portfolio-icon" aria-hidden="true">
            <SparkIcon />
          </span>

          <div className="mcp-portfolio-copy">
            <p className="mcp-portfolio-eyebrow">PORTFOLIO NOTE</p>
            <h3>An independent rewrite of Maki’s Capgemini customer story.</h3>
            <p>
              GrowUp writes and redesigns customer stories for B2B SaaS and HR
              technology companies. This portfolio sample reworks Maki’s
              existing Capgemini case study to show how we would approach the
              narrative, evidence and visual storytelling.
            </p>
          </div>

          <div className="mcp-portfolio-badge">
            <span className="mcp-portfolio-pill">INDEPENDENT CONCEPT</span>
            <p>Not published by or affiliated with Maki or Capgemini.</p>
          </div>
        </div>

        <div className="mcp-footer-links">
          <a href={portfolioHref}>
            <Arrow back /> Back to writing portfolio
          </a>

          <a href={sourceHref} target="_blank" rel="noreferrer">
            Read the original Maki story <Arrow />
          </a>
        </div>
      </footer>
    </article>
  );
}

const styles = `
.mcp {
  --ink: #162033;
  --muted: #667085;
  --line: #e3e8f0;
  --paper: #ffffff;
  --soft: #f6f8fc;
  --black: #050607;
  --black-2: #0b0d12;
  --maki: #2f6df6;
  --maki-dark: #1f50c7;
  --maki-soft: #dce8ff;
  --maki-pale: #eef4ff;
  --maki-sky: #bfe3ff;
  --maki-cyan: #87d8ff;
  --success: #29a66a;
  background: var(--paper);
  color: var(--ink);
  font-family: Inter, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  isolation: isolate;
}
.mcp,
.mcp *,
.mcp *::before,
.mcp *::after {
  box-sizing: border-box;
}
.mcp :where(h1,h2,h3,h4,p,figure,blockquote,ul,ol,dl,dd) {
  margin: 0;
}
.mcp :where(ul,ol) {
  padding: 0;
}
.mcp a {
  color: inherit;
  text-decoration: none;
}
.mcp img {
  display: block;
  max-width: 100%;
}
.mcp svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.65;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
}
.mcp h1,
.mcp h2 {
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  letter-spacing: -0.055em;
  text-wrap: balance;
}
.mcp h1 {
  font-size: clamp(44px, 4.45vw, 68px);
  line-height: 1.02;
}
.mcp h2 {
  font-size: clamp(36px, 3.45vw, 52px);
  line-height: 1.08;
}
.mcp h1 em,
.mcp h2 em {
  font-weight: 400;
  font-style: normal;
}
.mcp p {
  color: var(--muted);
}
.mcp [id] {
  scroll-margin-top: 80px;
}
.mcp-container {
  width: min(1200px, calc(100% - 96px));
  margin-inline: auto;
}
.mcp-container--wide {
  width: min(1340px, calc(100% - 96px));
}
.mcp-section {
  padding-block: 102px;
}
.mcp-eyebrow {
  margin-bottom: 21px !important;
  color: #6c7690 !important;
  font-size: 10px !important;
  font-weight: 760;
  letter-spacing: .16em;
  line-height: 1.5;
  text-transform: uppercase;
}
.mcp-eyebrow--light {
  color: #98a9d0 !important;
}
.mcp-button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  min-height: 52px;
  padding: 15px 22px;
  border: 1px solid #6e95ff;
  border-radius: 6px;
  background: var(--maki);
  color: #fff !important;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 12px 32px rgba(47,109,246,.24);
  transition: transform .2s ease, background .2s ease;
}
.mcp-button:hover {
  background: #3d78fb;
  transform: translateY(-2px);
}
.mcp-button svg,
.mcp-text-link svg {
  width: 17px;
  height: 17px;
}
.mcp-text-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 650;
}
.mcp-text-link:hover {
  text-decoration: underline;
  text-underline-offset: 5px;
}
.mcp-text-link--light {
  color: #dce8ff !important;
}
.mcp a:focus-visible {
  outline: 3px solid #6ea0ff;
  outline-offset: 5px;
}
.mcp-skip {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.mcp-skip:focus {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 99;
  width: auto;
  height: auto;
  clip-path: none;
  background: #fff;
  padding: 10px 18px;
}

/* Hero */
.mcp-hero {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 78% 32%, rgba(47,109,246,.15), transparent 28%),
    radial-gradient(circle at 60% 82%, rgba(135,216,255,.08), transparent 24%),
    var(--black);
  color: #fff;
}
.mcp-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to right, transparent 0%, #000 42%, #000 100%);
}
.mcp-hero-grid {
  position: relative;
  z-index: 1;
  min-height: 700px;
  display: grid;
  grid-template-columns: 1.02fr .98fr;
  gap: 72px;
  align-items: center;
  padding-block: 95px 76px;
}
.mcp-hero-copy {
  max-width: 680px;
}
.mcp-hero h1 {
  max-width: 720px;
  color: #fff;
}
.mcp-hero h1 em {
  color: #9dc0ff;
}
.mcp-deck {
  max-width: 650px;
  margin-top: 27px !important;
  color: #c0c8d7 !important;
  font-size: 17px;
  line-height: 1.75;
}
.mcp-hero-links {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-top: 31px;
}
.mcp-hero .mcp-text-link {
  color: #e3e9f4;
}
.mcp-hero-meta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 31px;
  color: #7f899e;
  font-size: 11px;
}
.mcp-hero-meta span + span::before {
  content: "•";
  margin-right: 16px;
  color: #3f4654;
}
.mcp-hero-visual {
  position: relative;
  min-height: 555px;
}
.mcp-orbit {
  position: absolute;
  border: 1px solid rgba(103,145,255,.2);
  border-radius: 50%;
  pointer-events: none;
}
.mcp-orbit--one {
  width: 580px;
  height: 580px;
  right: -110px;
  top: -15px;
}
.mcp-orbit--two {
  width: 420px;
  height: 420px;
  right: -30px;
  top: 65px;
}
.mcp-dashboard {
  position: absolute;
  left: 20px;
  top: 52px;
  width: min(560px, 94%);
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.11);
  border-radius: 17px;
  background: #f8faff;
  box-shadow: 0 48px 120px rgba(0,0,0,.5);
  transform: rotate(-2.4deg);
}
.mcp-dashboard-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 19px;
  border-bottom: 1px solid #e2e8f2;
  background: #fff;
}
.mcp-dashboard-brand {
  display: flex;
  align-items: center;
  gap: 11px;
}
.mcp-dashboard-brand > div {
  display: grid;
  gap: 1px;
}
.mcp-dashboard-brand strong {
  color: #172033;
  font-size: 11px;
}
.mcp-dashboard-brand span:not(.mcp-maki-mark) {
  color: #8790a2;
  font-size: 8px;
}
.mcp-maki-mark {
  display: inline-grid;
  width: 31px;
  height: 31px;
  place-items: center;
  flex: 0 0 auto;
}
.mcp-maki-mark svg {
  width: 100%;
  height: 100%;
  stroke: none;
}
.mcp-maki-mark svg rect {
  fill: #2f6df6;
}
.mcp-maki-mark svg path {
  fill: #fff;
}
.mcp-live-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  border-radius: 999px;
  background: #eaf8f0;
  color: #248158;
  font-size: 8px;
  font-weight: 700;
}
.mcp-live-pill i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2ca96e;
}
.mcp-dashboard-body {
  min-height: 410px;
  display: grid;
  grid-template-columns: 48px 1fr;
}
.mcp-dashboard-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 22px 14px;
  border-right: 1px solid #e4eaf4;
  background: #f1f5fb;
}
.mcp-dashboard-nav span {
  width: 18px;
  height: 18px;
  border: 1px solid #c9d2e2;
  border-radius: 5px;
  background: #fff;
}
.mcp-dashboard-nav span.is-active {
  border-color: #2f6df6;
  background: #dbe6ff;
  box-shadow: inset 0 0 0 4px #2f6df6;
}
.mcp-dashboard-main {
  padding: 22px 23px 25px;
}
.mcp-kicker {
  color: #8c95a7;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: .15em;
}
.mcp-candidate-card {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-top: 14px;
  padding: 13px;
  border: 1px solid #dfe6f2;
  border-radius: 10px;
  background: #fff;
}
.mcp-avatar {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  background: #dbe7ff;
  color: #2358c9;
  font-size: 9px;
  font-weight: 800;
}
.mcp-avatar--large {
  width: 45px;
  height: 45px;
  font-size: 11px;
}
.mcp-candidate-main {
  display: grid;
  flex: 1;
}
.mcp-candidate-main strong {
  color: #172033;
  font-size: 11px;
}
.mcp-candidate-main span {
  color: #8790a2;
  font-size: 8px;
}
.mcp-score {
  padding: 6px 8px;
  border-radius: 6px;
  background: #edf3ff;
  color: #2f6df6;
  font-size: 10px;
  font-weight: 800;
}
.mcp-mini-progress {
  margin-top: 17px;
}
.mcp-mini-progress > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #697386;
  font-size: 8px;
}
.mcp-mini-progress > div b {
  color: #2b7a54;
}
.mcp-mini-progress > i {
  display: block;
  height: 5px;
  margin-top: 7px;
  overflow: hidden;
  border-radius: 999px;
  background: #e7edf7;
}
.mcp-mini-progress > i span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: #2f6df6;
}
.mcp-signal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 18px;
}
.mcp-signal-grid > div {
  padding: 11px;
  border: 1px solid #e1e7f1;
  border-radius: 9px;
  background: #fff;
}
.mcp-signal-grid span {
  display: block;
  color: #8a93a4;
  font-size: 7px;
}
.mcp-signal-grid strong {
  display: block;
  margin-top: 3px;
  color: #1e2d4a;
  font-size: 17px;
}
.mcp-insight {
  display: flex;
  gap: 10px;
  margin-top: 17px;
  padding: 12px 13px;
  border: 1px solid #d8e4ff;
  border-radius: 9px;
  background: #edf4ff;
  color: #2f6df6;
}
.mcp-insight svg {
  width: 17px;
  height: 17px;
}
.mcp-insight p {
  color: #5470a8;
  font-size: 8px;
  line-height: 1.55;
}
.mcp-insight strong {
  display: block;
  color: #254eaa;
  font-size: 8px;
}
.mcp-floating-card {
  position: absolute;
  display: grid;
  gap: 2px;
  min-width: 180px;
  padding: 14px 16px;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 12px;
  background: rgba(14,18,26,.92);
  box-shadow: 0 28px 70px rgba(0,0,0,.36);
  backdrop-filter: blur(12px);
}
.mcp-floating-card span {
  color: #7f8ca6;
  font-size: 7px;
  font-weight: 750;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.mcp-floating-card strong {
  color: #fff;
  font-size: 17px;
  letter-spacing: -.03em;
}
.mcp-floating-card small {
  color: #93a0b6;
  font-size: 8px;
}
.mcp-floating-card--feedback {
  left: -18px;
  bottom: 40px;
  transform: rotate(2deg);
}
.mcp-floating-card--speed {
  right: -8px;
  top: 8px;
  transform: rotate(2.2deg);
}

/* Metrics */
.mcp-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  padding: 44px 0;
  border-bottom: 1px solid var(--line);
  background: #fff;
  box-shadow: 0 0 0 100vmax #fff;
  clip-path: inset(0 -100vmax);
}
.mcp-metric {
  padding-inline: 28px;
  border-left: 1px solid var(--line);
}
.mcp-metric:first-child {
  padding-left: 0;
  border-left: 0;
}
.mcp-metric:last-child {
  padding-right: 0;
}
.mcp-metric-label {
  color: #8290a7;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .13em;
}
.mcp-metric > strong {
  display: block;
  margin: 9px 0 8px;
  color: #172033;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 50px;
  font-weight: 400;
  letter-spacing: -.06em;
  line-height: 1.12;
}
.mcp-metric > strong span {
  margin-left: 3px;
  color: #3b69d5;
  font-size: .48em;
  letter-spacing: -.02em;
}
.mcp-metric p {
  max-width: 230px;
  color: #7b8495;
  font-size: 11px;
  line-height: 1.55;
}

/* Scale */
.mcp-scale-heading,
.mcp-problem-heading,
.mcp-solution-heading,
.mcp-experience-heading,
.mcp-results-heading {
  display: grid;
  grid-template-columns: 1.08fr .92fr;
  gap: 110px;
  align-items: end;
}
.mcp-scale-heading > p,
.mcp-problem-heading > p,
.mcp-solution-heading > p,
.mcp-experience-heading > p,
.mcp-results-heading > p {
  max-width: 500px;
  color: #68758c;
  font-size: 14px;
  line-height: 1.82;
}
.mcp-scale h2 em,
.mcp-solution h2 em,
.mcp-experience h2 em,
.mcp-results h2 em {
  color: #6080c7;
}
.mcp-scale-grid {
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 78px;
  align-items: center;
  margin-top: 67px;
}
.mcp-scale-visual {
  display: grid;
  grid-template-columns: .82fr 1.18fr;
  overflow: hidden;
  border: 1px solid #dde5f2;
  border-radius: 18px;
  background: #f7f9fd;
}
.mcp-scale-number {
  display: flex;
  min-height: 415px;
  flex-direction: column;
  justify-content: center;
  padding: 36px;
  background: #111827;
  color: #fff;
}
.mcp-scale-number > span {
  color: #8090af;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .15em;
}
.mcp-scale-number > strong {
  margin-top: 7px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(58px,6vw,88px);
  font-weight: 400;
  letter-spacing: -.08em;
  line-height: .96;
}
.mcp-scale-number p {
  max-width: 170px;
  margin-top: 18px !important;
  color: #9eabc1;
  font-size: 11px;
}
.mcp-funnel {
  padding: 32px;
}
.mcp-funnel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}
.mcp-funnel-head span {
  color: #8190a8;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: .13em;
}
.mcp-funnel-head b {
  color: #23304a;
  font-size: 14px;
}
.mcp-people-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-top: 34px;
}
.mcp-people-grid > span {
  display: grid;
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid #dfe5ef;
  border-radius: 10px;
  background: #fff;
  color: #b3bdcc;
}
.mcp-people-grid > span.is-qualified {
  border-color: #8eb1ff;
  background: #eaf1ff;
  color: #2f6df6;
}
.mcp-people-grid svg {
  width: 18px;
  height: 18px;
}
.mcp-funnel-foot {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: center;
  margin-top: 30px;
  padding-top: 22px;
  border-top: 1px solid #dfe5ef;
}
.mcp-funnel-foot strong {
  color: #2f6df6;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 48px;
  font-weight: 400;
  letter-spacing: -.06em;
}
.mcp-funnel-foot p {
  color: #778296;
  font-size: 10px;
  line-height: 1.6;
}
.mcp-scale-copy {
  max-width: 500px;
}
.mcp-scale-copy > p {
  margin-top: 17px !important;
  color: #5f6c80;
  font-size: 14px;
  line-height: 1.85;
}
.mcp-scale-copy > p:first-child {
  margin-top: 0 !important;
}
.mcp-scale-copy .mcp-pull {
  color: #1d2939;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 30px;
  line-height: 1.25;
  letter-spacing: -.035em;
}
.mcp-scale-copy .mcp-pull strong {
  color: #2f6df6;
  font-weight: 400;
}
.mcp-source-chip {
  margin-top: 28px;
  padding: 18px 19px;
  border-left: 3px solid #2f6df6;
  background: #f2f6ff;
}
.mcp-source-chip span {
  color: #2f6df6;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.mcp-source-chip p {
  margin-top: 7px !important;
  color: #62708a;
  font-size: 11px;
  line-height: 1.65;
}

/* Challenge */
.mcp-problem {
  position: relative;
  overflow: hidden;
  padding: 94px 0 100px;
  background:
    radial-gradient(circle at 80% 18%, rgba(47,109,246,.12), transparent 24%),
    #07090d;
  color: #fff;
}
.mcp-problem::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px);
  background-size: 18px 18px;
  opacity: .32;
  mask-image: linear-gradient(to bottom, #000, transparent 74%);
}
.mcp-problem > .mcp-container {
  position: relative;
  z-index: 1;
}
.mcp-problem h2 {
  color: #fff;
}
.mcp-problem h2 em {
  color: #91b5ff;
}
.mcp-problem-heading > p {
  color: #a9b3c7;
}
.mcp-problem-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 60px;
}
.mcp-before,
.mcp-after {
  padding: 35px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 18px;
  background: rgba(15,18,25,.88);
  backdrop-filter: blur(12px);
}
.mcp-after {
  background: #f8faff;
  color: #142039;
}
.mcp-panel-label {
  margin-bottom: 13px !important;
  color: #7f8aa1 !important;
  font-size: 8px !important;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.mcp-before h3,
.mcp-after h3 {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 27px;
  font-weight: 400;
  letter-spacing: -.04em;
}
.mcp-before h3 {
  color: #fff;
}
.mcp-after h3 {
  color: #1c2b48;
}
.mcp-tool-stack {
  display: grid;
  gap: 11px;
  margin-top: 28px;
}
.mcp-tool {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 15px;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 10px;
  background: rgba(255,255,255,.035);
}
.mcp-tool-icon {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 8px;
  color: #8b9ab6;
}
.mcp-tool-icon svg {
  width: 16px;
  height: 16px;
}
.mcp-tool strong {
  display: block;
  color: #e7ebf4;
  font-size: 11px;
}
.mcp-tool p {
  margin-top: 2px !important;
  color: #7f899d;
  font-size: 9px;
}
.mcp-tool-tag {
  padding: 5px 8px;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 999px;
  color: #768198;
  font-size: 7px;
}
.mcp-bottleneck {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,.09);
}
.mcp-bottleneck span {
  width: 9px;
  height: 9px;
  margin-top: 4px;
  border-radius: 50%;
  background: #ff6b6b;
  box-shadow: 0 0 0 5px rgba(255,107,107,.1);
}
.mcp-bottleneck p {
  max-width: 430px;
  color: #98a2b7;
  font-size: 10px;
}
.mcp-maki-flow {
  margin-top: 27px;
  overflow: hidden;
  border: 1px solid #dde6f5;
  border-radius: 13px;
  background: #fff;
}
.mcp-flow-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 17px;
  border-bottom: 1px solid #e6ebf3;
}
.mcp-flow-head > div {
  display: grid;
  flex: 1;
}
.mcp-flow-head strong {
  color: #17233a;
  font-size: 11px;
}
.mcp-flow-head span {
  color: #8a93a3;
  font-size: 8px;
}
.mcp-flow-head small {
  padding: 5px 8px;
  border-radius: 999px;
  background: #eaf8f1;
  color: #25835a;
  font-size: 7px;
  font-weight: 700;
}
.mcp-flow-stage {
  display: grid;
  grid-template-columns: 32px 1fr auto;
  gap: 12px;
  align-items: center;
  margin: 16px 17px 0;
  padding: 14px;
  border: 1px solid #e2e8f2;
  border-radius: 9px;
}
.mcp-flow-stage > span:first-child {
  display: grid;
  width: 31px;
  height: 31px;
  place-items: center;
  border-radius: 8px;
  background: #eaf1ff;
  color: #2f6df6;
  font-size: 8px;
  font-weight: 800;
}
.mcp-flow-stage strong {
  display: block;
  color: #1e293b;
  font-size: 11px;
}
.mcp-flow-stage p {
  margin-top: 2px !important;
  color: #8b93a2;
  font-size: 8px;
}
.mcp-flow-stage > svg {
  width: 15px;
  height: 15px;
  color: #2f9d69;
}
.mcp-flow-line {
  width: 1px;
  height: 14px;
  margin: 0 0 -16px 48px;
  background: #dbe4f2;
}
.mcp-flow-output {
  display: flex;
  gap: 10px;
  margin: 17px;
  padding: 13px;
  border-radius: 9px;
  background: #edf4ff;
  color: #2f6df6;
}
.mcp-flow-output svg {
  width: 17px;
  height: 17px;
}
.mcp-flow-output p {
  color: #5870a1;
  font-size: 9px;
  line-height: 1.55;
}
.mcp-quote {
  max-width: 860px;
  margin: 64px auto 0 !important;
  text-align: center;
}
.mcp-quote > p {
  color: #e9edf5;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(27px,3vw,39px);
  line-height: 1.3;
  letter-spacing: -.035em;
}
.mcp-quote cite {
  display: grid;
  gap: 2px;
  margin-top: 24px;
  color: #fff;
  font-style: normal;
}
.mcp-quote cite strong {
  font-size: 11px;
}
.mcp-quote cite span {
  color: #7f8da7;
  font-size: 9px;
}

/* Solution */
.mcp-solution {
  background: #fff;
}
.mcp-phase-board {
  margin-top: 63px;
}
.mcp-phase-rail {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 14px;
  align-items: center;
  color: #8390a7;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .11em;
  text-transform: uppercase;
}
.mcp-phase-rail i {
  position: relative;
  height: 1px;
  background: #dfe6f2;
}
.mcp-phase-rail i::after {
  content: "";
  position: absolute;
  right: 0;
  top: -3px;
  width: 7px;
  height: 7px;
  border-top: 1px solid #aab7cb;
  border-right: 1px solid #aab7cb;
  transform: rotate(45deg);
}
.mcp-phases {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  margin-top: 24px;
}
.mcp-phase {
  padding: 30px;
  border: 1px solid #dfe6f1;
  border-radius: 16px;
  background: #f8faff;
}
.mcp-phase:nth-child(2) {
  background: #111827;
  color: #fff;
}
.mcp-phase-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 13px;
  align-items: center;
}
.mcp-phase-head > span {
  color: #2f6df6;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .13em;
}
.mcp-phase:nth-child(2) .mcp-phase-head > span {
  color: #91b6ff;
}
.mcp-phase-head strong {
  color: #17243b;
  font-size: 16px;
  letter-spacing: -.02em;
}
.mcp-phase:nth-child(2) .mcp-phase-head strong {
  color: #fff;
}
.mcp-phase-head small {
  color: #8a94a6;
  font-size: 8px;
}
.mcp-phase > p {
  max-width: 500px;
  margin-top: 16px !important;
  color: #69758b;
  font-size: 11px;
  line-height: 1.7;
}
.mcp-phase:nth-child(2) > p {
  color: #98a6bc;
}
.mcp-chip-row {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  margin-top: 20px;
}
.mcp-chip-row span {
  padding: 6px 9px;
  border: 1px solid #d8e2f3;
  border-radius: 999px;
  background: #fff;
  color: #50617e;
  font-size: 7px;
}
.mcp-phase:nth-child(2) .mcp-chip-row span {
  border-color: #273751;
  background: #17233a;
  color: #91a2bf;
}
.mcp-phase-ui {
  margin-top: 26px;
  padding: 17px;
  border: 1px solid #dbe4f1;
  border-radius: 12px;
  background: #fff;
}
.mcp-question span {
  color: #95a0b2;
  font-size: 7px;
}
.mcp-question strong {
  display: block;
  margin-top: 6px;
  color: #1d2c46;
  font-size: 11px;
  line-height: 1.45;
}
.mcp-answer {
  margin-top: 9px;
  padding: 10px 11px;
  border: 1px solid #e2e8f1;
  border-radius: 8px;
  color: #728097;
  font-size: 8px;
}
.mcp-answer.is-selected {
  border-color: #79a1ff;
  background: #eef4ff;
  color: #2b5bc4;
}
.mcp-radar {
  position: relative;
  height: 250px;
  margin-top: 19px;
  overflow: hidden;
}
.mcp-radar::before,
.mcp-radar::after,
.mcp-radar-grid i {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 160px;
  height: 160px;
  border: 1px solid #263550;
  transform: translate(-50%,-50%) rotate(45deg);
}
.mcp-radar::after {
  width: 110px;
  height: 110px;
}
.mcp-radar-grid i:nth-child(1) {
  width: 210px;
  height: 210px;
}
.mcp-radar-grid i:nth-child(2) {
  width: 58px;
  height: 58px;
}
.mcp-radar-grid i:nth-child(3) {
  width: 1px;
  height: 215px;
  border: 0;
  background: #263550;
  transform: translate(-50%,-50%);
}
.mcp-radar svg {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 220px;
  height: 180px;
  transform: translate(-50%,-50%);
}
.mcp-radar svg polygon {
  fill: rgba(47,109,246,.24);
  stroke: #78a1ff;
  stroke-width: 2;
}
.mcp-radar-label {
  position: absolute;
  color: #74839d;
  font-size: 7px;
}
.mcp-radar-label.l1 { top: 4px; left: 39%; }
.mcp-radar-label.l2 { top: 47%; right: 2px; }
.mcp-radar-label.l3 { bottom: 7px; right: 28%; }
.mcp-radar-label.l4 { bottom: 11px; left: 12%; }
.mcp-radar-label.l5 { top: 48%; left: 0; }
.mcp-signal-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  margin-top: 22px;
  overflow: hidden;
  border: 1px solid #e0e6f0;
  border-radius: 12px;
  background: #e0e6f0;
}
.mcp-signal-row > div {
  display: flex;
  gap: 9px;
  align-items: center;
  padding: 14px 15px;
  background: #fff;
}
.mcp-signal-row span {
  color: #2f6df6;
  font-size: 8px;
  font-weight: 800;
}
.mcp-signal-row strong {
  color: #56647b;
  font-size: 9px;
}

/* Experience */
.mcp-experience {
  padding: 96px 0 103px;
  background: #f6f8fc;
}
.mcp-feedback-board {
  display: grid;
  grid-template-columns: .66fr auto 1.34fr;
  gap: 28px;
  align-items: center;
  margin-top: 63px;
}
.mcp-feedback-before {
  padding: 31px;
  border: 1px solid #dfe5ee;
  border-radius: 16px;
  background: #fff;
}
.mcp-clock {
  display: grid;
  place-items: center;
  padding-block: 26px 12px;
  text-align: center;
}
.mcp-clock-face {
  position: relative;
  width: 105px;
  height: 105px;
  border: 1px solid #d5dce8;
  border-radius: 50%;
  background: #f9fafc;
}
.mcp-clock-face::before {
  content: "";
  position: absolute;
  inset: 9px;
  border: 1px dashed #e0e5ec;
  border-radius: inherit;
}
.mcp-clock-face i,
.mcp-clock-face b {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2px;
  background: #59677e;
  transform-origin: bottom;
}
.mcp-clock-face i {
  height: 30px;
  transform: translate(-50%,-100%) rotate(90deg);
}
.mcp-clock-face b {
  height: 22px;
  transform: translate(-50%,-100%) rotate(10deg);
}
.mcp-clock > strong {
  margin-top: 20px;
  color: #222c3f;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 50px;
  font-weight: 400;
  letter-spacing: -.06em;
}
.mcp-clock > p {
  max-width: 200px;
  margin-top: 6px !important;
  color: #8993a4;
  font-size: 9px;
}
.mcp-feedback-arrow {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid #d7dfec;
  border-radius: 50%;
  background: #fff;
  color: #2f6df6;
}
.mcp-feedback-arrow svg {
  width: 17px;
}
.mcp-feedback-after {
  display: grid;
  grid-template-columns: 1fr .56fr;
  gap: 16px;
}
.mcp-feedback-window {
  overflow: hidden;
  border: 1px solid #dfe5ef;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 24px 55px rgba(42,58,90,.08);
}
.mcp-feedback-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #e6ebf2;
}
.mcp-feedback-top > div {
  display: flex;
  align-items: center;
  gap: 9px;
}
.mcp-feedback-top > div span {
  color: #59677e;
  font-size: 9px;
  font-weight: 650;
}
.mcp-ready {
  padding: 5px 7px;
  border-radius: 999px;
  background: #eaf8f1;
  color: #2d8d62;
  font-size: 7px;
  font-weight: 750;
}
.mcp-feedback-person {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 19px 20px 8px;
}
.mcp-feedback-person > div:last-child {
  display: grid;
}
.mcp-feedback-person span {
  color: #8c96a7;
  font-size: 7px;
}
.mcp-feedback-person strong {
  color: #1f2b40;
  font-size: 13px;
}
.mcp-feedback-score {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 14px 20px 17px;
}
.mcp-feedback-score > div:first-child strong {
  display: block;
  color: #1d2b44;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 44px;
  font-weight: 400;
  letter-spacing: -.05em;
}
.mcp-feedback-score > div:first-child span {
  color: #8d97a7;
  font-size: 8px;
}
.mcp-ring {
  --score: 87%;
  position: relative;
  display: grid;
  width: 64px;
  height: 64px;
  place-items: center;
  border-radius: 50%;
  background: conic-gradient(#2f6df6 var(--score), #e7edf7 0);
}
.mcp-ring::after {
  content: "";
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  background: #fff;
}
.mcp-ring span {
  position: relative;
  z-index: 1;
  color: #2f6df6;
  font-size: 11px;
  font-weight: 800;
}
.mcp-feedback-bars {
  padding: 0 20px 20px;
}
.mcp-feedback-bars > div {
  display: grid;
  grid-template-columns: 1fr 1.4fr 32px;
  gap: 9px;
  align-items: center;
  margin-top: 9px;
}
.mcp-feedback-bars span {
  color: #6e7a8e;
  font-size: 7px;
}
.mcp-feedback-bars i {
  height: 4px;
  overflow: hidden;
  border-radius: 999px;
  background: #e6edf7;
}
.mcp-feedback-bars i b {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: #2f6df6;
}
.mcp-feedback-bars strong {
  color: #35435a;
  font-size: 7px;
}
.mcp-feedback-note {
  display: flex;
  gap: 10px;
  align-self: stretch;
  padding: 18px;
  border-radius: 16px;
  background: #111827;
  color: #86aaff;
}
.mcp-feedback-note svg {
  margin-top: 2px;
}
.mcp-feedback-note p {
  color: #a9b5ca;
  font-size: 10px;
  line-height: 1.7;
}

/* Results */
.mcp-results {
  background: #fff;
}
.mcp-results-grid {
  display: grid;
  grid-template-columns: 1.18fr .82fr;
  gap: 26px;
  align-items: stretch;
  margin-top: 61px;
}
.mcp-time-card {
  padding: 34px;
  border: 1px solid #dfe6f1;
  border-radius: 17px;
  background: #f8faff;
}
.mcp-time-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;
}
.mcp-time-head span {
  color: #73819a;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .14em;
}
.mcp-time-head strong {
  max-width: 300px;
  color: #17233a;
  font-size: 19px;
  text-align: right;
}
.mcp-time-track {
  display: grid;
  gap: 24px;
  margin-top: 46px;
}
.mcp-time-before,
.mcp-time-after {
  display: grid;
  grid-template-columns: 80px 1fr 110px;
  gap: 15px;
  align-items: center;
}
.mcp-time-before > span,
.mcp-time-after > span {
  color: #8995aa;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .1em;
}
.mcp-time-before > i,
.mcp-time-after > i {
  display: block;
  height: 13px;
  border-radius: 999px;
}
.mcp-time-before > i {
  background: #dbe1eb;
}
.mcp-time-after > i {
  width: 37%;
  background: #2f6df6;
}
.mcp-time-before > b,
.mcp-time-after > b {
  color: #3d4b62;
  font-size: 11px;
}
.mcp-time-after > b {
  color: #2f6df6;
}
.mcp-time-footer {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  margin-top: 42px;
  padding-top: 24px;
  border-top: 1px solid #dde4ef;
  color: #2f6df6;
}
.mcp-time-footer p {
  max-width: 450px;
  color: #6f7c91;
  font-size: 10px;
}
.mcp-result-stack {
  display: grid;
  gap: 11px;
}
.mcp-result-card {
  display: grid;
  grid-template-columns: 95px 1fr;
  gap: 18px;
  align-items: center;
  padding: 20px;
  border: 1px solid #e0e6ef;
  border-radius: 14px;
  background: #fff;
}
.mcp-result-card > span {
  color: #2f6df6;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 42px;
  letter-spacing: -.06em;
}
.mcp-result-card strong {
  display: block;
  color: #25334b;
  font-size: 11px;
}
.mcp-result-card p {
  margin-top: 3px !important;
  color: #828da0;
  font-size: 9px;
  line-height: 1.55;
}
.mcp-results-note {
  max-width: 760px;
  margin-top: 24px !important;
  color: #8791a2;
  font-size: 10px;
}

/* Rollout */
.mcp-rollout {
  position: relative;
  overflow: hidden;
  padding: 92px 0;
  background:
    radial-gradient(circle at 78% 48%, rgba(47,109,246,.15), transparent 32%),
    #06080c;
  color: #fff;
}
.mcp-rollout-grid {
  display: grid;
  grid-template-columns: .85fr 1.15fr;
  gap: 95px;
  align-items: center;
}
.mcp-rollout-copy h2 {
  color: #fff;
}
.mcp-rollout-copy h2 em {
  color: #95b7ff;
}
.mcp-rollout-copy > p:not(.mcp-eyebrow) {
  max-width: 510px;
  margin-top: 21px !important;
  color: #a0abc0;
  font-size: 13px;
  line-height: 1.8;
}
.mcp-rollout-copy .mcp-text-link {
  margin-top: 28px;
}
.mcp-rollout-visual {
  position: relative;
  min-height: 470px;
}
.mcp-globe {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 410px;
  height: 410px;
  border: 1px solid #203253;
  border-radius: 50%;
  transform: translate(-50%,-50%);
}
.mcp-globe::before,
.mcp-globe::after {
  content: "";
  position: absolute;
  inset: 38px;
  border: 1px solid #1d2b45;
  border-radius: 50%;
}
.mcp-globe::after {
  inset: 92px;
}
.mcp-globe-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 1px solid #203253;
  border-radius: 50%;
  transform: translate(-50%,-50%);
}
.mcp-globe-ring.r1 { width: 145px; height: 410px; }
.mcp-globe-ring.r2 { width: 275px; height: 410px; }
.mcp-globe-ring.r3 { width: 410px; height: 150px; }
.mcp-globe-axis {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 410px;
  height: 1px;
  background: #203253;
  transform-origin: center;
}
.mcp-globe-axis.a1 { transform: translate(-50%,-50%) rotate(24deg); }
.mcp-globe-axis.a2 { transform: translate(-50%,-50%) rotate(-24deg); }
.mcp-map-dot {
  position: absolute;
  z-index: 2;
  width: 8px;
  height: 8px;
  border: 2px solid #111b2d;
  border-radius: 50%;
  background: #6f9aff;
  box-shadow: 0 0 0 6px rgba(47,109,246,.12);
}
.mcp-globe-center {
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 50%;
  display: grid;
  width: 150px;
  height: 150px;
  place-items: center;
  align-content: center;
  border: 1px solid #31476f;
  border-radius: 50%;
  background: #0c1220;
  transform: translate(-50%,-50%);
  text-align: center;
}
.mcp-globe-center svg {
  width: 22px;
  height: 22px;
  color: #6f9aff;
}
.mcp-globe-center strong {
  margin-top: 5px;
  color: #fff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 45px;
  font-weight: 400;
  letter-spacing: -.06em;
  line-height: 1;
}
.mcp-globe-center span {
  max-width: 95px;
  margin-top: 5px;
  color: #7e8ca6;
  font-size: 7px;
  line-height: 1.45;
}
.mcp-country-row {
  position: absolute;
  left: 50%;
  bottom: 0;
  display: flex;
  gap: 8px;
  transform: translateX(-50%);
}
.mcp-country-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border: 1px solid #1c2a43;
  border-radius: 999px;
  background: #0b101a;
  color: #8190aa;
  font-size: 7px;
  white-space: nowrap;
}
.mcp-country-chip i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #5d8cff;
}

/* CTA */
.mcp-cta-section {
  padding-block: 80px 48px;
}
.mcp-cta {
  display: grid;
  grid-template-columns: 1.18fr .82fr;
  gap: 70px;
  align-items: center;
  padding: 58px;
  overflow: hidden;
  border-radius: 18px;
  background:
    radial-gradient(circle at 92% 18%, rgba(47,109,246,.24), transparent 33%),
    #06080c;
  color: #fff;
}
.mcp-cta h2 {
  color: #fff;
  font-size: 44px;
}
.mcp-cta h2 em {
  color: #96b7ff;
}
.mcp-cta p:not(.mcp-eyebrow) {
  max-width: 500px;
  margin-top: 22px !important;
  color: #a2aec2;
  font-size: 13px;
  line-height: 1.78;
}
.mcp-cta .mcp-button {
  margin-top: 28px;
}
.mcp-cta-side {
  padding-left: 44px;
  border-left: 1px solid rgba(255,255,255,.11);
}
.mcp-cta-brand {
  display: flex;
  align-items: center;
  gap: 11px;
  color: #fff;
  font-size: 21px;
  font-weight: 650;
  letter-spacing: -.03em;
}
.mcp-cta-side ul {
  list-style: none;
  margin-top: 26px;
}
.mcp-cta-side li {
  display: flex;
  gap: 10px;
  align-items: center;
  padding-block: 12px;
  border-bottom: 1px solid rgba(255,255,255,.08);
  color: #c2ccdc;
  font-size: 10px;
}
.mcp-cta-side li svg {
  width: 13px;
  height: 13px;
  color: #7ea5ff;
}
.mcp-cta-caption {
  display: block;
  margin-top: 25px;
  color: #6d7c96;
  font-size: 7px;
  letter-spacing: .14em;
}

/* Footer / portfolio note */
.mcp-footer {
  padding-bottom: 38px;
}
.mcp-portfolio-note {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: start;
  padding: 24px 0;
  border-top: 1px solid #e3e8ef;
  border-bottom: 1px solid #e3e8ef;
}
.mcp-portfolio-icon {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid #dbe3ef;
  border-radius: 9px;
  color: #2f6df6;
}
.mcp-portfolio-copy {
  max-width: 690px;
}
.mcp-portfolio-eyebrow {
  color: #8691a3 !important;
  font-size: 7px !important;
  font-weight: 800;
  letter-spacing: .14em;
}
.mcp-portfolio-copy h3 {
  margin-top: 5px;
  color: #1f2b40;
  font-size: 14px;
}
.mcp-portfolio-copy > p:last-child {
  margin-top: 5px !important;
  color: #7a8495;
  font-size: 9px;
  line-height: 1.6;
}
.mcp-portfolio-badge {
  max-width: 210px;
  text-align: right;
}
.mcp-portfolio-pill {
  display: inline-flex;
  padding: 6px 9px;
  border-radius: 999px;
  background: #edf3ff;
  color: #2f6df6;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: .11em;
}
.mcp-portfolio-badge p {
  margin-top: 7px !important;
  color: #969fac;
  font-size: 8px;
}
.mcp-footer-links {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-top: 22px;
  font-size: 10px;
}
.mcp-footer-links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.mcp-footer-links svg {
  width: 14px;
  height: 14px;
}

/* Reveal */
.mcp-anim [data-reveal] {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity .7s ease var(--d, 0ms),
    transform .7s cubic-bezier(.2,.75,.25,1) var(--d, 0ms);
}
.mcp-anim [data-reveal].is-in {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 1120px) {
  .mcp-container {
    width: calc(100% - 64px);
  }
  .mcp-container--wide {
    width: calc(100% - 64px);
  }
  .mcp-hero-grid {
    gap: 36px;
  }
  .mcp-hero h1 {
    font-size: 50px;
  }
  .mcp-dashboard {
    left: 0;
    width: 100%;
  }
  .mcp-floating-card--speed {
    right: -6px;
  }
  .mcp-scale-heading,
  .mcp-problem-heading,
  .mcp-solution-heading,
  .mcp-experience-heading,
  .mcp-results-heading {
    gap: 55px;
  }
  .mcp-scale-grid {
    gap: 44px;
  }
  .mcp-scale-visual {
    grid-template-columns: 1fr;
  }
  .mcp-scale-number {
    min-height: 235px;
  }
  .mcp-results-grid {
    grid-template-columns: 1fr;
  }
  .mcp-rollout-grid {
    gap: 50px;
  }
}

@media (max-width: 850px) {
  .mcp-container,
  .mcp-container--wide {
    width: calc(100% - 44px);
  }
  .mcp-section {
    padding-block: 72px;
  }
  .mcp-hero-grid {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 35px;
    padding-block: 78px 55px;
  }
  .mcp-hero h1 {
    max-width: 680px;
    font-size: clamp(42px,8vw,60px);
  }
  .mcp-hero-visual {
    min-height: 520px;
  }
  .mcp-dashboard {
    left: 50%;
    top: 35px;
    width: min(560px, 100%);
    transform: translateX(-50%) rotate(-1.5deg);
  }
  .mcp-floating-card--feedback {
    left: 0;
  }
  .mcp-floating-card--speed {
    right: 0;
  }
  .mcp-metrics {
    grid-template-columns: 1fr 1fr;
  }
  .mcp-metric {
    padding: 24px;
    border-bottom: 1px solid var(--line);
  }
  .mcp-metric:nth-child(odd) {
    border-left: 0;
  }
  .mcp-metric:first-child {
    padding-left: 24px;
  }
  .mcp-scale-heading,
  .mcp-problem-heading,
  .mcp-solution-heading,
  .mcp-experience-heading,
  .mcp-results-heading,
  .mcp-rollout-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .mcp-scale-grid,
  .mcp-problem-compare,
  .mcp-phases,
  .mcp-feedback-board,
  .mcp-feedback-after,
  .mcp-cta {
    grid-template-columns: 1fr;
  }
  .mcp-feedback-arrow {
    transform: rotate(90deg);
    margin-inline: auto;
  }
  .mcp-signal-row {
    grid-template-columns: 1fr 1fr;
  }
  .mcp-rollout-visual {
    min-height: 470px;
  }
  .mcp-cta {
    gap: 38px;
    padding: 40px;
  }
  .mcp-cta-side {
    padding: 30px 0 0;
    border-top: 1px solid rgba(255,255,255,.11);
    border-left: 0;
  }
  .mcp-portfolio-note {
    grid-template-columns: auto 1fr;
  }
  .mcp-portfolio-badge {
    grid-column: 2;
    text-align: left;
  }
}

@media (max-width: 560px) {
  .mcp-container,
  .mcp-container--wide {
    width: calc(100% - 30px);
  }
  .mcp-hero-grid {
    padding-top: 58px;
  }
  .mcp-hero h1 {
    font-size: 42px;
  }
  .mcp-deck {
    font-size: 15px;
  }
  .mcp-hero-links {
    align-items: flex-start;
    flex-direction: column;
  }
  .mcp-hero-meta {
    display: grid;
    gap: 5px;
  }
  .mcp-hero-meta span + span::before {
    display: none;
  }
  .mcp-hero-visual {
    min-height: 460px;
  }
  .mcp-dashboard {
    top: 22px;
  }
  .mcp-dashboard-body {
    grid-template-columns: 38px 1fr;
  }
  .mcp-dashboard-nav {
    padding-inline: 10px;
  }
  .mcp-floating-card {
    min-width: 150px;
  }
  .mcp-floating-card--feedback {
    bottom: 8px;
  }
  .mcp-floating-card--speed {
    top: -2px;
  }
  .mcp-metrics {
    grid-template-columns: 1fr;
  }
  .mcp-metric,
  .mcp-metric:first-child,
  .mcp-metric:last-child {
    padding: 24px 0;
    border-left: 0;
  }
  .mcp-scale-grid {
    margin-top: 45px;
  }
  .mcp-scale-visual {
    border-radius: 12px;
  }
  .mcp-funnel {
    padding: 24px;
  }
  .mcp-before,
  .mcp-after,
  .mcp-phase,
  .mcp-time-card {
    padding: 24px;
  }
  .mcp-tool {
    grid-template-columns: auto 1fr;
  }
  .mcp-tool-tag {
    grid-column: 2;
    width: fit-content;
  }
  .mcp-phase-head {
    grid-template-columns: auto 1fr;
  }
  .mcp-phase-head small {
    grid-column: 2;
  }
  .mcp-signal-row {
    grid-template-columns: 1fr;
  }
  .mcp-feedback-board {
    margin-top: 45px;
  }
  .mcp-time-head {
    display: grid;
  }
  .mcp-time-head strong {
    text-align: left;
  }
  .mcp-time-before,
  .mcp-time-after {
    grid-template-columns: 67px 1fr 88px;
  }
  .mcp-result-card {
    grid-template-columns: 78px 1fr;
  }
  .mcp-rollout-visual {
    min-height: 360px;
  }
  .mcp-globe {
    width: 310px;
    height: 310px;
  }
  .mcp-globe-ring.r1 { width: 110px; height: 310px; }
  .mcp-globe-ring.r2 { width: 210px; height: 310px; }
  .mcp-globe-ring.r3 { width: 310px; height: 110px; }
  .mcp-globe-axis {
    width: 310px;
  }
  .mcp-globe-center {
    width: 125px;
    height: 125px;
  }
  .mcp-country-row {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
  .mcp-cta {
    padding: 30px 24px;
    border-radius: 12px;
  }
  .mcp-cta h2 {
    font-size: 36px;
  }
  .mcp-portfolio-note {
    grid-template-columns: 1fr;
  }
  .mcp-portfolio-icon {
    display: none;
  }
  .mcp-portfolio-badge {
    grid-column: auto;
  }
  .mcp-footer-links {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mcp *,
  .mcp *::before,
  .mcp *::after {
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  }
}
`;
