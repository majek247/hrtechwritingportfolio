"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Self-contained React + TypeScript portfolio article.
 * No Tailwind, charting library, image asset or icon package required.
 * Route suggestion: /writing-portfolio/ai-employee-lifecycle-2026
 * Set showNavigation={false} if your app already renders a global header.
 */

type Props = {
  portfolioHref?: string;
  contactHref?: string;
  showNavigation?: boolean;
};

type IconName =
  | "arrow"
  | "back"
  | "spark"
  | "person"
  | "search"
  | "chat"
  | "calendar"
  | "check"
  | "book"
  | "chart"
  | "shield"
  | "brain"
  | "door"
  | "link"
  | "chevron"
  | "briefcase"
  | "nodes"
  | "clock"
  | "flag";

const contents = [
  ["at-a-glance", "The lifecycle in one view"],
  ["meet-maya", "Meet Maya"],
  ["candidate", "Candidate and hiring"],
  ["interview", "Interview and selection"],
  ["onboarding", "Onboarding"],
  ["performance", "Performance"],
  ["development", "Development and mobility"],
  ["retention", "Retention and experience"],
  ["exit", "Exit and offboarding"],
  ["chro", "What CHROs should build"],
] as const;

const sources = [
  {
    name: "Microsoft",
    title: "2026 Work Trend Index: Agents, human agency, and opportunity",
    date: "5 May 2026",
    url: "https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization",
  },
  {
    name: "IBM Institute for Business Value",
    title: "2026 CHRO Study: Designing the Thinking Organization",
    date: "2026",
    url: "https://www.ibm.com/thought-leadership/institute-business-value/c-suite-study/chro",
  },
  {
    name: "CHRO Association",
    title: "2026 CHRO Survey: Key Findings",
    date: "2026",
    url: "https://www.chro.org/w/2026-chro-survey-key-findings-1",
  },
  {
    name: "LinkedIn Talent Solutions",
    title: "AI in Hiring: Why Speed Isn’t the Real Outcome. Quality Is.",
    date: "22 July 2026",
    url: "https://www.linkedin.com/business/talent/blog/talent-acquisition/ai-in-hiring",
  },
  {
    name: "International Labour Organization",
    title: "The messy business of managing people at work: Is AI the solution?",
    date: "15 May 2026",
    url: "https://www.ilo.org/resource/article/messy-business-managing-people-work-ai-solution",
  },
  {
    name: "International Labour Organization",
    title: "AI in human resource management: The limits of empiricism",
    date: "11 November 2025",
    url: "https://www.ilo.org/publications/ai-human-resource-management-limits-empiricism",
  },
  {
    name: "European Union",
    title: "Regulation (EU) 2024/1689 — Artificial Intelligence Act",
    date: "Consolidated version, 27 July 2026",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng",
  },
  {
    name: "World Economic Forum",
    title: "The Future of Jobs Report 2025",
    date: "7 January 2025",
    url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
  },
  {
    name: "PwC",
    title: "Global Workforce Hopes and Fears Survey 2026",
    date: "29 September 2026",
    url: "https://www.pwc.com/gx/en/issues/workforce/hopes-and-fears.html",
  },
  {
    name: "SAGE / IOS Press",
    title: "Demystifying how AI Transforms HRM Practices through the Lens of Employee Life Cycle",
    date: "19 August 2026",
    url: "https://journals.sagepub.com/doi/full/10.3233/FAIA260577",
  },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    back: <><path d="M19 12H5m6-6-6 6 6 6" /></>,
    spark: <><path d="m12 3 1.2 4.2L17 9l-3.8 1.8L12 15l-1.2-4.2L7 9l3.8-1.8L12 3Z" /><path d="m5 15 .7 2.3L8 18l-2.3.7L5 21l-.7-2.3L2 18l2.3-.7L5 15Zm14-9 .7 2.3L22 9l-2.3.7L19 12l-.7-2.3L16 9l2.3-.7L19 6Z" /></>,
    person: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    chat: <><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9h8M8 12h5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v18H7.5A3.5 3.5 0 0 0 4 23V5.5Z" /><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H12v18h4.5A3.5 3.5 0 0 1 20 23V5.5Z" /></>,
    chart: <><path d="M4 20V9m6 11V4m6 16v-7m4 7H2" /></>,
    shield: <><path d="M12 3 20 6v6c0 5-3.3 8.1-8 10-4.7-1.9-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    brain: <><path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-2 2.8A3.2 3.2 0 0 0 6 14v1a3 3 0 0 0 3 3" /><path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 2 2.8A3.2 3.2 0 0 1 18 14v1a3 3 0 0 1-3 3M12 3v18M8 9h4m0 6h4" /></>,
    door: <><path d="M5 21V4a1 1 0 0 1 1-1h10v18" /><path d="M3 21h18M12 12h.01" /></>,
    link: <><path d="m10 14 4-4m-5 6-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m0 10a4 4 0 0 0 6 0l4-4a4 4 0 0 0-6-6l-1 1" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-12 5h18M10 12v2h4v-2" /></>,
    nodes: <><circle cx="5" cy="12" r="2" /><circle cx="12" cy="5" r="2" /><circle cx="19" cy="12" r="2" /><circle cx="12" cy="19" r="2" /><path d="m6.5 10.5 4-4m3 0 4 4m0 3-4 4m-3 0-4-4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    flag: <><path d="M5 21V4m0 1h11l-2 4 2 4H5" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Section({ id, number, heading, children }: { id: string; number: string; heading: string; children: ReactNode }) {
  return <section className="lc-section" id={id} aria-labelledby={`${id}-heading`}>
    {number && <div className="lc-section-kicker"><span>{number}</span><span /></div>}
    <h2 id={`${id}-heading`}>{heading}</h2>
    {children}
  </section>;
}

function P({ children, lead = false }: { children: ReactNode; lead?: boolean }) {
  return <p className={lead ? "lc-lead" : undefined}>{children}</p>;
}

function Cite({ n }: { n: number }) {
  return <sup><a className="lc-cite" href={`#lc-source-${n}`} aria-label={`Source ${n}`}>{n}</a></sup>;
}

function Quote({ label = "The CHRO takeaway", children }: { label?: string; children: ReactNode }) {
  return <blockquote className="lc-quote"><span className="lc-label">{label}</span><p>{children}</p></blockquote>;
}

function Note({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="lc-note"><Icon name="shield" /><div><span className="lc-label">{title}</span><p>{children}</p></div></aside>;
}

function HeroJourney() {
  const steps = [
    ["01", "Candidate", "Matched to role", "search"],
    ["02", "Interview", "Notes structured", "chat"],
    ["03", "Onboard", "Plan personalised", "calendar"],
    ["04", "Perform", "Evidence surfaced", "chart"],
    ["05", "Develop", "Skills mapped", "book"],
    ["06", "Exit", "Knowledge handed over", "door"],
  ] as const;
  return <div className="lc-hero-ui" aria-label="Illustrative employee lifecycle interface">
    <div className="lc-hero-window">
      <div className="lc-window-bar"><i /><i /><i /><span>peopleOS / maya.chen</span><b>AI assist: on</b></div>
      <div className="lc-hero-profile">
        <div className="lc-avatar">MC</div>
        <div><small>Employee journey</small><strong>Maya Chen</strong><span>Product Operations · London</span></div>
        <div className="lc-profile-status"><i />Active journey</div>
      </div>
      <div className="lc-journey-line">
        {steps.map(([n, title, text, icon], i) => <div className="lc-journey-step" key={title}>
          <div className="lc-journey-node"><Icon name={icon as IconName} size={15} /></div>
          <small>{n}</small><strong>{title}</strong><span>{text}</span>
          {i < steps.length - 1 && <em />}
        </div>)}
      </div>
      <div className="lc-hero-insight">
        <span className="lc-ai-badge"><Icon name="spark" size={13} />AI moment</span>
        <p><strong>Next best action:</strong> give Maya the product analytics module before her first quarterly review.</p>
        <button type="button">Why this suggestion? <Icon name="arrow" size={14} /></button>
      </div>
    </div>
    <div className="lc-float-card is-a"><span>Human decision</span><strong>Offer approved by recruiter</strong></div>
    <div className="lc-float-card is-b"><span>AI assist</span><strong>3 hours of admin removed</strong></div>
  </div>;
}



function CandidateFigure() {
  const candidates = [
    ["Maya Chen", "Product ops · SaaS", "92", "5/6 skill signals", true],
    ["Elliot Reed", "RevOps · Fintech", "86", "4/6 skill signals", false],
    ["Priya Shah", "Customer ops · SaaS", "84", "4/6 skill signals", false],
  ] as const;
  return <figure className="lc-figure lc-candidate">
    <div className="lc-figure-head"><span className="lc-label">Illustrative talent search</span><span className="lc-small-tag">Filter in, then review</span></div>
    <div className="lc-window">
      <div className="lc-window-bar"><i /><i /><i /><span>talent / product-ops</span><b>286 applicants</b></div>
      <div className="lc-window-body">
        <div className="lc-query-row"><Icon name="spark" size={15} /><span>Find people who can improve cross-functional product operations, not just people with “Product Ops” in the title.</span></div>
        <div className="lc-candidate-head"><span>Candidate</span><span>Match</span><span>Evidence</span></div>
        {candidates.map(([name, role, score, evidence, active]) => <div className={`lc-candidate-row${active ? " is-active" : ""}`} key={name}>
          <div className="lc-mini-person"><span>{name.split(" ").map(v => v[0]).join("")}</span><div><strong>{name}</strong><small>{role}</small></div></div>
          <div className="lc-match"><strong>{score}</strong><span>/100</span></div>
          <div className="lc-evidence"><span>{evidence}</span><small>Open evidence →</small></div>
        </div>)}
      </div>
      <div className="lc-window-foot"><span><Icon name="shield" size={13} />Ranking is a starting point</span><strong>Recruiter reviews the evidence before shortlist</strong></div>
    </div>
    <figcaption>Illustrative interface and made-up candidates. A score is only useful if the recruiter can inspect the evidence and challenge the assumptions behind it.</figcaption>
  </figure>;
}

function InterviewFigure() {
  const transcript = [
    ["12:14", "Hiring manager", "Tell me about a time a launch got messy."],
    ["13:02", "Maya", "We had product, sales and CS using three different definitions of ‘ready’. I mapped the handoffs first..."],
    ["14:08", "AI note", "Evidence detected: process design, stakeholder alignment, operating cadence."],
  ];
  return <figure className="lc-figure lc-interview">
    <div className="lc-figure-head"><span className="lc-label">Interview intelligence</span><span className="lc-small-tag">Remember more. Infer less.</span></div>
    <div className="lc-interview-grid">
      <div className="lc-window">
        <div className="lc-window-bar"><i /><i /><i /><span>interview / live notes</span></div>
        <div className="lc-window-body">
          <div className="lc-call-head"><div className="lc-avatar sm">MC</div><div><strong>Maya Chen</strong><small>Structured interview · 31:42</small></div><span className="lc-live"><i />Live</span></div>
          <div className="lc-transcript">{transcript.map(([time, who, text]) => <div key={time}><span>{time}</span><p><strong>{who}</strong>{text}</p></div>)}</div>
        </div>
      </div>
      <div className="lc-score-card">
        <span className="lc-label">What the panel sees</span>
        <h3>Evidence, not vibes.</h3>
        <div className="lc-signal"><span>Systems thinking</span><strong>3 examples</strong></div>
        <div className="lc-signal"><span>Stakeholder management</span><strong>2 examples</strong></div>
        <div className="lc-signal"><span>Role-specific gap</span><strong>Data modelling</strong></div>
        <div className="lc-do-not"><Icon name="shield" size={16} /><div><strong>Do not score</strong><span>facial expression · accent · “enthusiasm” · personality guessed from video</span></div></div>
      </div>
    </div>
    <figcaption>Illustrative workflow. The stronger use case is retrieving job-relevant evidence from a structured interview, not converting human behaviour into a pseudo-scientific personality score.</figcaption>
  </figure>;
}

function OnboardingFigure() {
  const days = [
    ["Day 1", "Settle the basics", "Access, payroll, laptop, team map", "4/4"],
    ["Day 3", "Understand the work", "Product tour, customer calls, metrics", "3/4"],
    ["Day 7", "Start contributing", "Shadow launch review, first small project", "2/3"],
    ["Day 14", "Check the fit", "Manager check-in, blockers, role clarity", "0/3"],
  ];
  return <figure className="lc-figure lc-onboard">
    <div className="lc-figure-head"><span className="lc-label">Maya’s first two weeks</span><span className="lc-small-tag">Personalised, not improvised</span></div>
    <div className="lc-onboard-grid">
      <div className="lc-onboard-plan">
        {days.map(([day, title, text, count], i) => <div className={i < 2 ? "is-done" : ""} key={day}><span className="lc-day">{day}</span><span className="lc-check"><Icon name={i < 2 ? "check" : "clock"} size={14} /></span><div><strong>{title}</strong><p>{text}</p></div><b>{count}</b></div>)}
      </div>
      <div className="lc-assistant-card">
        <div className="lc-assistant-head"><span><Icon name="spark" size={15} /></span><div><strong>Ask People Ops</strong><small>Uses approved policy + onboarding data</small></div></div>
        <div className="lc-bubble is-user">Can I expense the train to the customer workshop?</div>
        <div className="lc-bubble is-ai">Yes. Your UK travel policy covers standard rail for customer travel. Keep the receipt and code it to <strong>Customer research</strong>.</div>
        <div className="lc-source-chip"><Icon name="book" size={13} />Travel policy · updated 12 Sep 2026</div>
      </div>
    </div>
    <figcaption>Illustrative onboarding plan. The AI answer is only as trustworthy as the policy source, permissions and escalation path behind it.</figcaption>
  </figure>;
}

function PerformanceFigure() {
  const evidence = [
    ["Launch readiness", "Reduced unresolved handoffs from 14 to 4 before release", "+"],
    ["Operating rhythm", "Introduced weekly cross-functional review used by 3 teams", "+"],
    ["Analytics depth", "Still relies on analyst support for complex SQL questions", "gap"],
  ];
  return <figure className="lc-figure lc-performance">
    <div className="lc-figure-head"><span className="lc-label">Quarterly review workspace</span><span className="lc-small-tag">Separate evidence from interpretation</span></div>
    <div className="lc-window">
      <div className="lc-window-bar"><i /><i /><i /><span>performance / q4 check-in</span><b>Draft, not submitted</b></div>
      <div className="lc-window-body">
        <div className="lc-review-head"><div><small>Employee</small><strong>Maya Chen</strong></div><div><small>Manager</small><strong>Alex Morgan</strong></div><div><small>Cycle</small><strong>Q4 2026</strong></div></div>
        <div className="lc-evidence-list">{evidence.map(([title, text, kind]) => <div key={title}><span className={`lc-evidence-mark is-${kind}`}><Icon name={kind === "+" ? "check" : "flag"} size={14} /></span><div><strong>{title}</strong><p>{text}</p></div></div>)}</div>
        <div className="lc-ai-draft"><span><Icon name="spark" size={14} />AI draft</span><p>Maya improved launch coordination and created a repeatable operating rhythm. The strongest development opportunity is building more independent analytics capability.</p><button type="button">Edit before using</button></div>
      </div>
    </div>
    <figcaption>Illustrative review. AI can compress a quarter of notes into a usable starting point; the manager still owns context, weighting, fairness and the conversation itself.</figcaption>
  </figure>;
}

function SkillsFigure() {
  const skills = [
    ["Cross-functional operations", 92, "strong"],
    ["Launch management", 86, "strong"],
    ["Product analytics", 61, "build"],
    ["SQL", 42, "build"],
  ] as const;
  return <figure className="lc-figure lc-skills">
    <div className="lc-figure-head"><span className="lc-label">Skills passport</span><span className="lc-small-tag">What can Maya do next?</span></div>
    <div className="lc-skills-grid">
      <div className="lc-skill-panel"><div className="lc-skill-title"><div className="lc-avatar sm">MC</div><div><small>Current role</small><strong>Product Operations Manager</strong></div></div>{skills.map(([name, value, cls]) => <div className="lc-skill" key={name}><div><span>{name}</span><strong>{value}%</strong></div><div className="lc-skill-track"><i className={`is-${cls}`} style={{ width: `${value}%` }} /></div></div>)}</div>
      <div className="lc-next-role"><span className="lc-label">Possible internal move</span><div className="lc-role-match"><span>81%</span><div><strong>Senior Product Operations</strong><small>3 strengths transfer · 2 gaps to close</small></div></div><div className="lc-gap"><span>01</span><div><strong>Product analytics</strong><small>Recommended: cohort analysis project + mentor review</small></div></div><div className="lc-gap"><span>02</span><div><strong>SQL</strong><small>Recommended: intermediate query pathway</small></div></div><button type="button">Build 90-day development plan <Icon name="arrow" size={14} /></button></div>
    </div>
    <figcaption>Illustrative skills model. Development recommendations become more useful when they connect a real next role to observable skill evidence, not a generic course catalogue.</figcaption>
  </figure>;
}

function RetentionFigure() {
  const signals = [
    ["Role clarity", "Down", "Two priorities changed this month"],
    ["Manager connection", "Healthy", "1:1 cadence is consistent"],
    ["Internal opportunity", "Open", "Senior role is a plausible next move"],
    ["Workload", "Watch", "Late-meeting load increased for 3 weeks"],
  ];
  return <figure className="lc-figure lc-retention">
    <div className="lc-figure-head"><span className="lc-label">Experience signals</span><span className="lc-small-tag">Ask before you predict</span></div>
    <div className="lc-retention-wrap">
      <div className="lc-pulse"><small>Team pulse</small><strong>Something changed.</strong><p>Do not jump straight to “Maya is a 73% flight risk.” Start with the observable signals and give the manager something humane to do with them.</p></div>
      <div className="lc-signal-list">{signals.map(([name, status, text]) => <div key={name}><span className={`lc-status is-${status.toLowerCase()}`}>{status}</span><div><strong>{name}</strong><small>{text}</small></div></div>)}</div>
      <div className="lc-next-conversation"><Icon name="chat" size={18} /><div><small>Suggested manager action</small><strong>Ask whether the recent priority changes are making the role feel less clear.</strong><span>Not: “Our model says you might leave.”</span></div></div>
    </div>
    <figcaption>Illustrative signals. This is intentionally not a predictive attrition score: observable patterns are easier to challenge, explain and use responsibly.</figcaption>
  </figure>;
}

function ExitFigure() {
  const cards = [
    ["01", "Access", "Revoke systems, transfer owners, close permissions", "shield"],
    ["02", "Knowledge", "Turn project notes into a clean handover", "book"],
    ["03", "Experience", "Summarise exit themes without flattening nuance", "chat"],
    ["04", "Alumni", "Keep consented contact and possible rehire signals", "person"],
  ] as const;
  return <figure className="lc-figure lc-exit">
    <div className="lc-figure-head"><span className="lc-label">The last day still matters</span><span className="lc-small-tag">Leave cleanly</span></div>
    <div className="lc-exit-grid">{cards.map(([n, title, text, icon]) => <div key={title}><span>{n}</span><span className="lc-exit-icon"><Icon name={icon as IconName} size={18} /></span><strong>{title}</strong><p>{text}</p></div>)}</div>
    <div className="lc-handover"><div><small>AI-assisted handover</small><strong>Launch operations · what the next owner needs</strong></div><span>7 decisions</span><span>4 recurring meetings</span><span>3 open risks</span><button type="button">Review with Maya</button></div>
    <figcaption>Illustrative offboarding. Automating access and documentation is useful. The exit conversation itself is still a place for trust, context and judgment.</figcaption>
  </figure>;
}

function DecisionRightsFigure() {
  const rows = [
    ["Draft a job description", "AI can do", "Human checks role reality and requirements"],
    ["Recommend candidates to inspect", "AI can do", "Human validates evidence and shortlist"],
    ["Reject a candidate automatically", "High-stakes", "Require clear policy, legal review and human oversight"],
    ["Summarise an interview", "AI can do", "Human verifies the source before scoring"],
    ["Draft a performance review", "AI can assist", "Manager owns judgment and wording"],
    ["Recommend learning", "AI can do", "Employee and manager choose the path"],
    ["Predict who will leave", "Use with care", "Prefer team-level signals and explainability"],
    ["Terminate employment", "Human decision", "AI should never become the accountable party"],
  ];
  return <figure className="lc-figure lc-rights">
    <div className="lc-figure-head"><span className="lc-label">Decision-rights map</span><span className="lc-small-tag">Write this before buying tools</span></div>
    <div className="lc-rights-table"><div className="lc-rights-head"><span>Moment</span><span>AI role</span><span>Who owns the decision?</span></div>{rows.map(([moment, ai, owner]) => <div className="lc-rights-row" key={moment}><strong>{moment}</strong><span>{ai}</span><p>{owner}</p></div>)}</div>
    <figcaption>GrowUp decision-rights framework. Exact controls should be adapted to your jurisdiction, workforce, risk profile and the specific AI system in use.</figcaption>
  </figure>;
}

const guardrails = [
  { title: "Start with the decision, not the demo", text: "Write down what the system will influence: who gets seen, who gets interviewed, what a manager reads, what learning gets recommended, or what action HR takes. Risk becomes much easier to govern when the decision is explicit." },
  { title: "Separate evidence from inference", text: "A transcript, completed course or missed deadline is evidence. ‘Low leadership potential’ is an inference. Make the interface show which is which, and let people inspect the underlying record." },
  { title: "Give employees a way to challenge the machine", text: "If an AI output can affect someone’s opportunity, pay, performance or employment, the person needs a sensible path to question bad data, missing context or an incorrect conclusion." },
  { title: "Design the human handoff before you automate", text: "Who reviews the shortlist? Who handles an answer the HR agent cannot support? Who can override a recommendation? If the answer is ‘someone will notice’, the workflow is not ready." },
  { title: "Measure the people outcome, not AI usage", text: "More prompts are not an HR outcome. Better quality of hire, faster time to productivity, more internal moves, stronger manager conversations and fewer avoidable tickets are outcomes you can defend." },
  { title: "Keep a record of what changed", text: "Models, prompts, policies and integrations change. If AI touches employment decisions, keep versioning, audit trails and ownership clear enough that you can reconstruct why a recommendation appeared." },
];

function BuildList({ items }: { items: { title: string; text: string }[] }) {
  return <div className="lc-build-list">{items.map((x, i) => <div key={x.title}><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{x.title}</h3><p>{x.text}</p></div><Icon name="arrow" size={18} /></div>)}</div>;
}

export default function AIEmployeeLifecycle2026({
  portfolioHref = "/#work",
  contactHref = "https://www.seo-growup.com/get-in-touch",
  showNavigation = false,
}: Props = {}) {
  const articleRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>(contents[0][0]);
  const [progress, setProgress] = useState(0);
  const [minutes, setMinutes] = useState(15);
  const [shareStatus, setShareStatus] = useState("");
  const shareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;
    const text = article.querySelector(".lc-editorial")?.textContent || "";
    setMinutes(Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 230)));
    let frame: number | null = null;
    const update = () => {
      const rect = article.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.max(0, Math.min(100, (-rect.top / travel) * 100)));
      let current: string = contents[0][0];
      for (const [id] of contents) {
        const section = article.querySelector<HTMLElement>(`#${id}`);
        if (section && section.getBoundingClientRect().top <= 170) current = id;
      }
      setActive(current);
      frame = null;
    };
    const queue = () => { if (frame === null) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => () => { if (shareTimer.current) clearTimeout(shareTimer.current); }, []);

  async function copyLink() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("Link copied");
      } else if (navigator.share) {
        await navigator.share({ title: "How AI Is Changing the Employee Lifecycle in 2026", url: window.location.href });
        setShareStatus("Shared");
      } else setShareStatus("Copy the URL from your address bar");
    } catch {
      setShareStatus("Copy the URL from your address bar");
    }
    if (shareTimer.current) clearTimeout(shareTimer.current);
    shareTimer.current = setTimeout(() => setShareStatus(""), 4000);
  }

  const tocLinks = contents.map(([id, label], i) => <a key={id} href={`#${id}`} className={active === id ? "is-active" : undefined} aria-current={active === id ? "location" : undefined}><span>{String(i + 1).padStart(2, "0")}</span>{label}</a>);

  return <div className="lc-page" data-article-slug="ai-employee-lifecycle-2026">
    <style>{styles}</style>
    <a className="lc-skip" href="#lc-article">Skip to article</a>
    <div className="lc-progress" aria-hidden="true"><div style={{ width: `${progress}%` }} /></div>

    <header className="lc-hero">
      {showNavigation && <nav className="lc-nav lc-container" aria-label="Main navigation">
        <a className="lc-logo" href="https://www.seo-growup.com/" aria-label="GrowUp home"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true"><path d="M5 22 18 5M10 15C2 14 4 5 4 5s10 1 6 10Zm3-5C12 1 23 2 23 2s1 10-10 8Zm1 7c1-8 10-7 10-7s-1 10-10 7Z" fill="currentColor" /></svg>GrowUp<span>®</span></a>
        <div className="lc-nav-links"><a href="https://www.seo-growup.com/">Home</a><a href={portfolioHref} className="is-current">Writing portfolio</a><a href="https://www.seo-growup.com/b2b-saas-copywriting-agency">Our services</a><a href="https://www.seo-growup.com/web-design-portfolio">Our work</a></div>
        <a className="lc-button lc-button-accent" href={contactHref}>Let’s talk <Icon name="arrow" size={17} /></a>
      </nav>}
      <div className="lc-hero-main lc-container">
        <div className="lc-hero-copy">
          <div className="lc-category"><span />HR tech writing sample</div>
          <h1>How AI Is Changing the Employee Lifecycle in 2026</h1>
          <p className="lc-deck">Follow one employee from first application to final handover, and see where AI removes work, changes decisions and creates entirely new questions for HR.</p>
          <div className="lc-hero-meta"><span>GrowUp Editorial</span><span>{minutes} min read</span><time dateTime="2026-10-05">October 2026</time></div>
          <a className="lc-read-link" href="#lc-article">Follow the journey <Icon name="arrow" size={18} /></a>
        </div>
        <div className="lc-hero-art"><HeroJourney /></div>
      </div>
    </header>

    <main className="lc-container lc-main">
      <section className="lc-overview" aria-labelledby="lc-overview-heading">
        <h2 className="lc-label" id="lc-overview-heading">Article overview</h2>
        <dl>{[
          { icon: "book" as const, label: "Content type", value: "Research-led industry guide" },
          { icon: "person" as const, label: "Primary reader", value: "CHROs and people leaders" },
          { icon: "nodes" as const, label: "Narrative device", value: "One employee lifecycle" },
          { icon: "shield" as const, label: "Commercial angle", value: "AI value, trust and governance" },
        ].map(item => <div key={item.label}><span className="lc-icon-tile"><Icon name={item.icon} size={18} /></span><div><dt>{item.label}</dt><dd>{item.value}</dd></div></div>)}</dl>
      </section>

      <div className="lc-reading-layout">
        <aside className="lc-toc"><div className="lc-label">In this article</div><nav aria-label="Article contents">{tocLinks}</nav><div className="lc-toc-footer"><span>{Math.round(progress)}% read</span><button onClick={copyLink} type="button"><Icon name="link" size={15} />Copy link</button></div><p role="status" className="lc-share-status">{shareStatus}</p></aside>
        <details className="lc-mobile-toc"><summary>In this article <Icon name="chevron" size={18} /></summary><nav aria-label="Article contents on mobile">{tocLinks}</nav></details>

        <article className="lc-article" id="lc-article" ref={articleRef} aria-label="How AI Is Changing the Employee Lifecycle in 2026">
          <div className="lc-editorial">
            <Section id="at-a-glance" number="" heading="A few years ago, if I applied for a job, I could roughly picture what happened next.  ">
              <P lead>Someone opened my CV. A recruiter decided whether to call me. A manager interviewed me. If I joined, HR handled the paperwork and my manager took it from there.</P>
              <P lead>In 2026, there can be a lot more happening in between.</P>
              <P lead>AI might help decide which vacancy I see, pull skills from my CV, summarise my interview, answer my first-week questions, prepare material for my performance review, recommend training and flag that I might be ready for another role.</P>
             
               <P lead>No single step feels revolutionary. But follow the same employee for long enough and the change becomes obvious.</P>
             
               <P lead>So rather than talking about “AI in HR” in the abstract, this guide follows one fictional employee through the entire lifecycle, from candidate and hiring through onboarding, performance and development to exit and offboarding, showing what AI looks like at each stage.</P>
             
     
         
            </Section>

            <Section id="meet-maya" number="01" heading="AI in Hiring Now Starts Before the Application">
              <P>Meet Maya.</P>
              <P>It is 8:43 on a Tuesday morning and she is doing what I suspect a lot of people do when they’re not <em>really</em> job hunting: drinking coffee, scrolling LinkedIn and occasionally clicking a role that looks interesting.</P>
              <P>One of them is a <strong>Product Operations Manager position.</strong></P>
       


  <figure className="lc-maya-search">
  <img
    src="/images/maya-linkedin-search.png"
    alt="AI recommending a role to Maya based on her transferable skills."
    width={1200}
    height={750}
    loading="lazy"
    decoding="async"
  />
  <figcaption className="lc-maya-caption">AI recommending a role to Maya based on her transferable skills.</figcaption>
</figure>

         <p style={{ paddingTop: 10 }}>The odd thing is, Maya has never been a Product Operations Manager. Her current title is Customer Operations Lead. Before that, she worked on product launches, fixed messy internal processes and somehow became the person everyone called when a new tool needed rolling out.</p>

             <P>On paper, she is not the obvious match.</P>
             <P>But look at the work underneath the titles and it starts to make more sense: stakeholder management, process design, product analytics, launches, systems implementation.</P>
             
             
             <P>That is one of the ways AI is changing the employee lifecycle.</P>
          



 <P>Instead of matching people to jobs mainly through titles and keywords, AI can use the skills and experience underneath them to work out which roles might be relevant.</P>

             <P>So Maya does not need to know that “Product Operations Manager” is a job she should be searching for. The platform can make that connection first and put the role in front of her. </P>

<P>That matters for employers too.</P>

<P>A Product Operations vacancy no longer has to compete only for people who already call themselves Product Operations Managers. It can also reach candidates in customer operations, implementation, programme management or other adjacent roles whose experience overlaps with the work. </P>
    
            </Section>

            <Section id="candidate" number="03" heading="Hiring: AI can widen the search and flood it at the same time">
              <P>Recruitment is the obvious place to start because both sides now have AI.</P>
              <P>Maya can use it to sharpen her CV, rewrite a cover letter and prepare for the interview. The company can use it to draft the job description, search for candidates, parse applications, rank skills, personalise outreach and summarise the pipeline.</P>
              <P>The result is slightly awkward: AI makes it easier to apply and easier to process applications at exactly the same time.</P>
              <P>LinkedIn’s 2026 analysis puts the new bottleneck neatly: recruiters are dealing with more applications, but the harder problem is <strong>signal quality</strong>. Two-thirds of recruiters in its research said finding qualified talent had become harder than a year earlier. LinkedIn also reports that organizations using its Hiring Assistant made 11% more “quality hires” on its defined measure and hired 18% more high-demand talent than organizations using traditional recruiting workflows.<Cite n={4} /></P>
              <CandidateFigure />
              <h3>The interesting shift is from filtering out to finding evidence</h3>
              <P>A basic ATS asks whether Maya has the right words on her CV. A stronger AI-assisted workflow can look for the underlying evidence: she ran launch retrospectives, rebuilt handoffs between teams, worked with product analytics and reduced operational errors.</P>
              <P>That can be genuinely useful. It can also create a false sense of precision. A match score of 92 looks wonderfully objective until you ask what was weighted, what was missing and whether the model has simply learned to prefer candidates who resemble previous hires.</P>
              <P>The ILO’s 2025 review of AI in HR makes this point more sharply. It argues that many problems start with three things: the objective a system is asked to optimize, the data used to represent people and the way the system is programmed.<Cite n={6} /></P>
              <Quote label="What I would test">Can the recruiter open the recommendation and see why Maya surfaced? If not, the AI has made the shortlist faster but made the hiring decision harder to defend.</Quote>
            </Section>

            <Section id="interview" number="04" heading="Interviewing: let AI remember the conversation, not invent a personality">
              <P>Maya gets the interview.</P>
              <P>This is where AI can be incredibly useful in a very boring way. It can schedule the call, build a structured interview pack, transcribe the conversation, pull out examples against the role criteria and give the panel a clean record of what was actually said.</P>
              <P>That matters because human interviewers are not perfect note-taking machines. We remember the great anecdote, forget the second candidate’s detail and occasionally let “I liked them” do more work than we admit.</P>
              <InterviewFigure />
              <P>The line I would draw is simple: use AI to help the panel <strong>retrieve evidence</strong>; be much more sceptical when it claims to infer things the interview never directly established.</P>
              <P>The ILO warns that algorithmic management systems can turn messy management questions into apparently neat technical outputs without fixing the underlying problem.<Cite n={5} /> “Leadership potential”, “culture fit” and “engagement” become especially risky when the system is reading proxies rather than job-relevant evidence.</P>
              <P>And regulation is catching up. Under the EU AI Act, certain AI systems used for recruitment, selection, promotion, termination, task allocation, monitoring and evaluation in employment are classified as high-risk.<Cite n={7} /></P>
              <Quote>A transcript is evidence. A score is an opinion wearing a decimal. Treat them differently.</Quote>
            </Section>

            <Section id="onboarding" number="05" heading="Onboarding: the best AI may feel like a very patient colleague">
              <P>Maya accepts the offer. Now the glamorous AI future meets the first week of employment: payroll forms, laptop access, acronyms nobody explained and a calendar full of meetings she does not yet understand.</P>
              <P>This is one of the places I think AI can be quietly excellent.</P>
              <P>An onboarding agent can answer “Where is the travel policy?”, explain which team owns a system, surface the right product walkthrough for Maya’s role and nudge her manager when a human conversation is overdue. It can also personalise the sequence instead of giving every employee the same 47-link onboarding portal.</P>
              <OnboardingFigure />
              <h3>The real value is not answering more questions</h3>
              <P>It is reducing the number of tiny dead ends that make a new hire feel stupid for asking.</P>
              <P>But an HR agent only earns trust if it knows where its answer came from. The employee should be able to see the source policy, its date and what to do when the situation is not covered. “I don’t know — ask People Ops” is a feature, not a failure.</P>
              <P>That matters because the wider 2026 data says the environment around AI is doing a huge amount of the work. Microsoft found that organizational factors including culture, manager support and talent practices accounted for more than twice the reported AI impact of individual factors in its model.<Cite n={1} /></P>
              <Quote>Do not use AI to make onboarding feel automated. Use it to remove the admin so the human parts of onboarding happen sooner.</Quote>
            </Section>

            <Section id="performance" number="06" heading="Performance: AI can assemble the evidence. Managers still have to make sense of it">
              <P>Three months in, Maya is doing well. Six months in, her manager has a more familiar problem: the quarter happened faster than the notes.</P>
              <P>AI can pull together goals, project updates, feedback, recognition and prior check-ins. It can draft a review and remind the manager that the launch process Maya rebuilt cut unresolved handoffs before release.</P>
              <P>That is useful. It is also the point where convenience can become authority very quickly.</P>
              <PerformanceFigure />
              <P>If the model drafts “Maya needs to be more strategic”, where did that come from? A manager note? A missed meeting? The language of her Slack messages? The fact that she did not speak much in a call?</P>
              <P>IBM’s 2026 CHRO study found that only 26% of organizations clearly define work across human-led, AI-assisted and AI-executed activities, while 72% of HR organizations remain in an experimentation phase with AI.<Cite n={2} /> That is the operating-model gap hiding underneath a lot of HR tech.</P>
              <P>The better design is to let AI assemble the record and make the interpretation visibly editable. The manager should be able to inspect the evidence, add context and own the final language.</P>
              <Quote>AI can help a manager remember the quarter. It should not become the manager of record.</Quote>
            </Section>

            <Section id="development" number="07" heading="Development: AI gets more interesting when it can see the next role">
              <P>Maya’s strongest development question is not “Which course should I take?” It is “What could I realistically do next here?”</P>
              <P>That is where the skills layer becomes more useful than the LMS catalogue.</P>
              <P>If the organization understands the skills inside Maya’s current work, the skills required by a senior role and the projects that could close the gap, AI can connect those three things. Suddenly development becomes less about content consumption and more about movement.</P>
              <SkillsFigure />
              <P>The timing matters. The World Economic Forum says employers expect 39% of workers’ core skills to change by 2030, while skills gaps are the most commonly cited barrier to business transformation in its survey.<Cite n={8} /></P>
              <P>Microsoft’s 2026 data shows the employee side too: 66% of surveyed AI users said AI lets them spend more time on high-value work, and 58% said they are producing work they could not have produced a year earlier.<Cite n={1} /></P>
              <P>That means the role itself is moving while Maya is learning it.</P>
              <P>The smart development system is not simply recommending “AI fundamentals”. It is noticing that the job now requires more judgment, quality control, data literacy or workflow design, then connecting those changes to real work.</P>
              <Quote>The course catalogue is the least interesting part of AI-driven development. The interesting part is seeing capability, opportunity and work change in the same view.</Quote>
            </Section>

            <Section id="retention" number="08" heading="Retention: the difference between a useful signal and creepy surveillance is smaller than it looks">
              <P>A year in, Maya’s role starts wobbling.</P>
              <P>Two priorities change in a month. Her manager is pulled into a reorganisation. Late meetings creep up. An internal role opens that fits where she wants to go.</P>
              <P>A people analytics platform can spot some of those changes. The temptation is to turn them into a single number: <strong>flight risk, 73%.</strong></P>
              <P>I would resist that.</P>
              <RetentionFigure />
              <P>At team level, patterns can be extremely useful. A spike in regrettable attrition after manager changes, a department with unusually low internal mobility, or a cohort whose workload is climbing faster than its engagement can all give HR somewhere intelligent to look.</P>
              <P>At individual level, prediction gets much more sensitive because the same signal can mean completely different things. Fewer messages might mean disengagement. It might also mean Maya finally has a quiet week.</P>
              <P>PwC’s 2026 workforce survey found nearly two-thirds of workers now use AI, but it also describes a two-speed workforce: 56% sit in an “engine room” group with less access to AI, learning and opportunity than the front-runners.<Cite n={9} /> Retention strategy therefore cannot just ask who might leave. It has to ask who is getting the tools, development and opportunity to stay relevant.</P>
              <Quote>Use AI to tell managers where to look. Be very careful about letting it tell them what an employee feels.</Quote>
            </Section>

            <Section id="exit" number="09" heading="Exit: AI can make the handover cleaner without pretending departure is just a workflow">
              <P>Eventually Maya leaves. Maybe for a bigger role. Maybe because the company changed. Maybe because the internal move never happened.</P>
              <P>AI is useful here too: pull together open projects, identify recurring meetings, suggest new owners, summarise documentation gaps, close access and group exit-interview themes across a cohort.</P>
              <ExitFigure />
              <P>What it should not do is flatten an exit conversation into a neat reason code and call the job done.</P>
              <P>“Better opportunity” can hide compensation, manager quality, career ceiling, workload and timing. The value comes from combining structured themes with the messy context the person actually gave you.</P>
              <P>There is also an overlooked upside: a good offboarding system preserves enough context for the relationship to continue. Alumni networks, boomerang hires and referrals all depend on leaving with the same care you wanted when the employee joined.</P>
              <Quote>The lifecycle does not end when the account is deactivated. The person leaves with a story about what it was like to work there.</Quote>
            </Section>

            <Section id="chro" number="10" heading="What I would want written down before scaling AI across HR">
              <P lead>By the end of Maya’s journey, AI has touched almost every major HR system without ever needing to become “the HR department”.</P>
              <P>That is the point.</P>
              <P>The strongest use cases are often practical: find evidence faster, reduce admin, personalise the next step, connect fragmented information and make a human decision easier to make well.</P>
              <P>The risk arrives when the system quietly crosses from <strong>supporting a decision</strong> to <strong>becoming the reason for it</strong>.</P>
              <DecisionRightsFigure />
              <h3>Then build the operating rules around those decisions</h3>
              <BuildList items={guardrails} />
              <P>The CHRO Association’s 2026 survey says AI and workplace digitization have become dominant priorities, with organizations using AI in areas including talent acquisition, service delivery and learning while wrestling with readiness, governance and workforce concerns.<Cite n={3} /></P>
              <P>IBM’s warning is even more strategic: 46% of organizations in its study do not involve the CHRO when AI strategy is defined.<Cite n={2} /></P>
              <P>That feels backwards. If AI is changing how people are found, assessed, managed, developed and moved through the organization, HR is not downstream from AI strategy. HR is sitting in the middle of it.</P>
              <Quote label="The final takeaway">The best AI in HR is boring in the right places. It fills the form, finds the policy, remembers the evidence and removes the handoff. The dangerous version turns messy human context into a neat score and nobody asks what the score actually means.</Quote>
            </Section>
          </div>

          <section className="lc-sources" aria-labelledby="lc-sources-heading">
            <div className="lc-label">Research &amp; references</div>
            <h2 id="lc-sources-heading">The research behind the journey.</h2>
            <p>Research checked for this October 2026 portfolio sample. Product screens, Maya’s journey and all example values are illustrative. Market figures are attributed to the original publishers below. Legal classifications are included as editorial context, not legal advice.</p>
            <ol>{sources.map((s, i) => <li key={s.url} id={`lc-source-${i + 1}`}><span>{String(i + 1).padStart(2, "0")}</span><a href={s.url} target="_blank" rel="noopener noreferrer"><small>{s.name} · {s.date}</small><strong>{s.title}</strong></a><Icon name="arrow" size={17} /></li>)}</ol>
          </section>

          <section className="lc-cta">
            <div className="lc-label">GrowUp · HR tech content writing</div>
            <h2>Make the product easier to understand <em>before sales has to explain it.</em></h2>
            <p>Research-led articles, buyer guides and customer stories for HR tech teams selling products that need more than feature copy to make sense.</p>
            <a className="lc-button lc-button-accent" href={contactHref}>Talk about your next piece <Icon name="arrow" size={17} /></a>
          </section>

          <div className="lc-article-end"><a href={portfolioHref}><Icon name="back" size={17} />Back to writing portfolio</a><a href="#lc-article">Back to the article ↑</a></div>
        </article>
      </div>
    </main>
  </div>;
}

const styles = String.raw`
.lc-page{--ink:#0b1020;--ink-2:#151c31;--paper:#f7f5ef;--card:#fbfaf6;--text:#262b35;--muted:#6f7480;--line:#ddd9cf;--violet:#7b68ee;--violet-2:#a89bf6;--mint:#d8f4ad;--teal:#1F9FA1;--coral:#ff9e7a;--serif:Georgia,'Times New Roman',serif;--sans:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--paper);color:var(--text);font-family:var(--sans);font-size:16px;line-height:1.5;isolation:isolate}
.lc-page *{box-sizing:border-box}.lc-page a{color:inherit;text-decoration:none}.lc-page button{font:inherit;cursor:pointer}.lc-page svg{flex-shrink:0}.lc-page figure,.lc-page blockquote,.lc-page h1,.lc-page h2,.lc-page h3,.lc-page p,.lc-page dl,.lc-page dd{margin:0}.lc-page a:focus-visible,.lc-page button:focus-visible,.lc-page summary:focus-visible{outline:2px solid var(--violet);outline-offset:5px}.lc-container{width:min(1240px,calc(100% - 96px));margin-inline:auto}.lc-label{font-size:10px;line-height:1.5;font-weight:700;letter-spacing:.17em;text-transform:uppercase}.lc-skip{position:fixed;left:20px;top:12px;z-index:80;background:#fff;padding:12px 20px;transform:translateY(-160%)}.lc-skip:focus{transform:none}.lc-progress{height:3px;position:fixed;inset:0 0 auto;z-index:70;pointer-events:none}.lc-progress>div{height:100%;background:linear-gradient(90deg,var(--violet),#b69cff,#79e5c4)}
.lc-hero{background:#041b1c;color:#f5f8f2;overflow:hidden;padding-top:96px;position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw}.lc-hero:before{content:'';position:absolute;width:720px;height:720px;border-radius:50%;background:radial-gradient(circle,rgba(31,159,161,.15),rgba(31,159,161,0) 68%);right:-180px;top:-180px;pointer-events:none}.lc-nav{width:min(1240px,calc(100% - 96px));margin-inline:auto;min-height:92px;display:flex;align-items:center;gap:30px;border-bottom:1px solid rgba(255,255,255,.1);position:relative;z-index:3}.lc-logo{font-weight:680;font-size:24px;letter-spacing:-.07em;display:flex;gap:6px;align-items:center}.lc-logo svg{color:var(--mint)}.lc-logo>span{font-size:9px;align-self:flex-start;margin-top:5px;letter-spacing:0}.lc-nav-links{display:flex;gap:29px;align-items:center;margin-inline:auto;font-size:12px;color:#aeb4c7}.lc-nav-links a{padding-block:8px;border-bottom:1px solid transparent}.lc-nav-links a:hover,.lc-nav-links .is-current{color:#fff;border-color:var(--violet-2)}.lc-button{display:inline-flex;align-items:center;justify-content:center;gap:16px;padding:13px 21px;border-radius:100px;font-size:12px;font-weight:700;min-height:45px;transition:transform .18s,background .18s}

.lc-button-accent{background:#1F9FA1;color:#fff!important}
.lc-button-accent:hover{transform:translateY(-1px);background:#178a8c}
.lc-hero-main{width:min(1240px,calc(100% - 96px));margin-inline:auto;display:grid;grid-template-columns:.92fr 1.08fr;gap:46px;min-height:660px;align-items:center;padding-block:54px 64px;position:relative;z-index:2}.lc-category{display:flex;align-items:center;gap:8px;color:#1F9FA1;font-size:10px;letter-spacing:.16em;text-transform:uppercase;width:fit-content;border:1px solid rgba(31,159,161,.4);padding:6px 12px;border-radius:30px;margin-bottom:23px}.lc-category>span{width:4px;height:4px;background:currentColor;border-radius:50%}.lc-hero h1{font-family:var(--serif);font-size:clamp(43px,4.6vw,68px);font-weight:400;letter-spacing:-.052em;line-height:1.035;max-width:660px;text-wrap:balance;color:#f5f8f2}.lc-deck{max-width:525px;font-size:16px;line-height:1.75;color:#fafafa;margin-top:26px!important}.lc-hero-meta{display:flex;flex-wrap:wrap;font-size:12px;color:#8f96aa;margin-top:25px}.lc-hero-meta>*+*::before{content:'·';padding-inline:12px;color:#5e6579}.lc-read-link{display:flex;align-items:center;gap:14px;width:fit-content;font-size:13px;color:#1F9FA1!important;margin-top:28px}.lc-hero-art{min-width:0;position:relative}
.lc-hero-ui{position:relative;padding:42px 12px 34px}.lc-hero-window{background:#f9fafc;color:#1c2332;border:1px solid rgba(255,255,255,.22);border-radius:18px;box-shadow:0 32px 80px rgba(0,0,0,.36);overflow:hidden;transform:rotate(.4deg)}.lc-window-bar{height:44px;border-bottom:1px solid #e7e8ee;display:flex;align-items:center;gap:6px;padding:0 15px;background:#f1f2f6;font-size:9px;color:#7b8190}.lc-window-bar i{width:7px;height:7px;border-radius:50%;background:#cfd2db}.lc-window-bar i:first-child{background:#ffac93}.lc-window-bar i:nth-child(2){background:#f3d77b}.lc-window-bar i:nth-child(3){background:#a7dfc6}.lc-window-bar span{margin-left:7px}.lc-window-bar b{margin-left:auto;font-size:8px;background:#d9ede2;color:#167273;border-radius:20px;padding:4px 8px;font-weight:700}.lc-hero-profile{display:flex;align-items:center;gap:13px;padding:21px 22px 17px;border-bottom:1px solid #ececf0}.lc-avatar{width:47px;height:47px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#d5d0ff,#a7e5d2);font-size:13px;font-weight:800;color:#2b3150;flex-shrink:0}.lc-avatar.sm{width:34px;height:34px;font-size:10px}.lc-hero-profile>div:nth-child(2){min-width:0}.lc-hero-profile small{display:block;font-size:8px;color:#999eaa;text-transform:uppercase;letter-spacing:.13em}.lc-hero-profile strong{display:block;font-size:15px;margin-top:3px}.lc-hero-profile div>span{font-size:9px;color:#7c8290}.lc-profile-status{margin-left:auto!important;font-size:8px!important;color:#3e7a68!important;display:flex;gap:6px;align-items:center;white-space:nowrap}.lc-profile-status i{width:6px;height:6px;background:#64c49f;border-radius:50%}.lc-journey-line{display:grid;grid-template-columns:repeat(6,1fr);padding:26px 18px 23px;gap:4px}.lc-journey-step{position:relative;text-align:center;min-width:0}.lc-journey-node{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#eeebff;color:#6253c7;margin:0 auto 9px;position:relative;z-index:2;border:4px solid #fafaff}.lc-journey-step small{display:block;font-size:7px;color:#b0b4bf;letter-spacing:.1em}.lc-journey-step strong{display:block;font-size:9px;margin-top:2px}.lc-journey-step>span{display:block;font-size:7px;color:#8f94a0;line-height:1.35;margin-top:3px;padding-inline:2px}.lc-journey-step em{position:absolute;top:16px;left:64%;width:78%;height:1px;background:#d9d7e4;z-index:1}.lc-hero-insight{margin:0 20px 21px;padding:15px;border:1px solid #ded9fb;border-radius:11px;background:#f5f3ff;display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center}.lc-ai-badge{font-size:8px;font-weight:750;color:#167273;display:flex;align-items:center;gap:5px;white-space:nowrap}.lc-hero-insight p{font-size:9px;line-height:1.55;color:#515868}.lc-hero-insight p strong{color:#262d3c}.lc-hero-insight button{background:transparent;border:0;color:#167273;font-size:8px;font-weight:700;display:flex;align-items:center;gap:5px;padding:0}.lc-float-card{position:absolute;background:#11182b;border:1px solid rgba(255,255,255,.12);box-shadow:0 17px 34px rgba(0,0,0,.26);border-radius:10px;padding:11px 13px;color:#fff;z-index:4}.lc-float-card span{display:block;color:#939bb2;font-size:7px;text-transform:uppercase;letter-spacing:.12em}.lc-float-card strong{font-size:9px;display:block;margin-top:3px;font-weight:650}.lc-float-card.is-a{left:-19px;top:18px;transform:rotate(-3deg)}.lc-float-card.is-b{right:-5px;bottom:3px;transform:rotate(2.5deg)}
.lc-main{padding-bottom:48px}.lc-overview{padding:42px 0 46px;border-bottom:1px solid var(--line)}.lc-overview>h2{color:#232838;font-size:11px;letter-spacing:.22em;font-weight:700;margin-bottom:30px}.lc-overview dl{display:grid;grid-template-columns:repeat(4,1fr);gap:30px}.lc-overview dl>div{display:flex;align-items:center;gap:16px;min-width:0}.lc-overview dl>div+div{border-left:1px solid #e4e0d7;padding-left:30px}.lc-icon-tile{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid #cfe2d6;color:#1f6b4f;background:#f2f8f4;flex-shrink:0}.lc-overview dt{font-size:9px;color:#9b978f;letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin-bottom:7px}.lc-overview dd{font-size:13px;font-weight:600;line-height:1.45;color:#272c38}.lc-reading-layout{display:grid;grid-template-columns:240px minmax(0,790px);gap:72px;padding-top:58px;justify-content:space-between;align-items:start}.lc-toc{position:sticky;top:40px}.lc-toc>.lc-label{color:#88847e;font-size:11px;padding-bottom:18px}.lc-toc nav{display:flex;flex-direction:column}.lc-toc nav a,.lc-mobile-toc nav a{display:flex;gap:13px;font-size:13px;padding:11px 0;color:#73757e;line-height:1.45;border-bottom:1px solid #e8e4dc}.lc-toc nav a>span,.lc-mobile-toc nav a>span{font-size:10px;font-variant-numeric:tabular-nums;color:#aaa59c;min-width:20px;padding-top:2px}

.lc-toc nav a.is-active,.lc-mobile-toc nav a.is-active{color:#167273;font-weight:700}
.lc-toc nav a.is-active>span{color:#1F9FA1}
.lc-toc-footer{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#969087;margin-top:26px}.lc-toc-footer button{background:transparent;border:0;padding:4px 0;color:#167273;display:flex;gap:7px;align-items:center;font-size:11px;font-weight:650}.lc-share-status{font-size:10px;color:#858078;min-height:2em;margin-top:8px!important}.lc-mobile-toc{display:none}.lc-article{min-width:0;scroll-margin-top:35px}
.lc-editorial p{font-family:var(--serif);font-size:17px;line-height:1.86;letter-spacing:.001em;margin-bottom:21px}.lc-editorial p.lc-lead{font-size:22px;line-height:1.62;letter-spacing:-.016em;color:#252939}.lc-editorial p strong{font-weight:700;color:#171c29}.lc-editorial a.lc-cite{font-family:var(--sans);font-size:9px;color:#167273;padding:0 3px;font-weight:750}.lc-editorial sup{line-height:0}.lc-section{padding-top:58px;scroll-margin-top:35px}.lc-section:first-child{padding-top:0}.lc-section-kicker{display:flex;gap:16px;align-items:center;margin-bottom:17px}.lc-section-kicker>span:first-child{font-size:9px;font-variant-numeric:tabular-nums;color:#167273;letter-spacing:.12em;font-weight:700}.lc-section-kicker>span:last-child{height:1px;flex:1;background:var(--line)}.lc-section h2{font-family:var(--serif);font-weight:400;font-size:36px;line-height:1.18;letter-spacing:-.038em;color:#202533;margin-bottom:24px;max-width:700px;text-wrap:balance}.lc-section h3{font-family:var(--sans);font-size:16px;font-weight:700;color:#272c39;line-height:1.45;margin:30px 0 10px;letter-spacing:-.01em}

.lc-quote{border-left:2px solid #1F9FA1;padding:5px 0 5px 28px;margin:34px 0!important}
.lc-quote>.lc-label{font-size:9px;color:#167273}
.lc-editorial .lc-quote p{font-size:27px;line-height:1.43;letter-spacing:-.028em;color:#0f3d3a;margin:11px 0 0}

.lc-note{display:flex;gap:15px;background:#e6f1ea;border-top:1px solid #cfe2d6;padding:23px 24px;margin:30px 0}
.lc-note>svg{color:#1f6b4f;margin-top:2px}
.lc-note .lc-label{color:#167273;font-size:9px}
.lc-editorial .lc-note p{font-family:var(--sans);font-size:12px;line-height:1.75;margin:8px 0 0;color:#545264}.lc-figure{border:1px solid var(--line);background:#f3f1ea;border-radius:15px;padding:24px;margin:30px 0!important;overflow:hidden}.lc-figure-head{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:25px}.lc-figure-head>.lc-label{color:#77726a;font-size:9px}.lc-small-tag{font-size:8px;color:#857f77;border:1px solid #d8d3ca;border-radius:20px;padding:4px 9px;white-space:nowrap}.lc-figure figcaption{font-family:var(--sans);font-size:9px;line-height:1.75;color:#8c877f;padding-top:18px;margin-top:20px;border-top:1px solid #ddd8cf}.lc-window{background:#fff;border:1px solid #dfdfe4;border-radius:12px;overflow:hidden}

.lc-maya-search{margin:30px 0}
.lc-maya-search img{display:block;width:100%;height:auto}
.lc-maya-caption{text-align:center;font-size:10px;line-height:1.7;color:#011522;padding-top:12px;max-width:640px;margin-inline:auto}

.lc-window-body{padding:18px}.lc-window-foot{padding:12px 16px;background:#20263a;color:#edf0f7;display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:9px}.lc-window-foot span{display:flex;gap:6px;align-items:center;color:#b9bfd0}.lc-window-foot strong{font-size:9px;font-weight:650}
.lc-map{background:#12182a;border-color:#262e45;color:#fff}.lc-map .lc-label{color:#a9a1da}.lc-map .lc-small-tag{border-color:#343c55;color:#9ea6ba}.lc-map-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#2b3349;border:1px solid #2b3349;border-radius:12px;overflow:hidden}.lc-map-card{background:#171e32;padding:20px}.lc-map-top{display:flex;align-items:center;justify-content:space-between}.lc-map-top>span{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#2b2750;color:#b7acf9}.lc-map-top>b{font-size:9px;color:#636c82;letter-spacing:.1em}.lc-section .lc-map-card h3{color:#fff;font-size:15px;margin:17px 0 16px}.lc-map-card>div:not(.lc-map-top){border-top:1px solid #293148;padding-top:12px;margin-top:11px}.lc-map-card small{font-size:8px;color:#7f879b;text-transform:uppercase;letter-spacing:.1em}.lc-editorial .lc-map-card p{font-family:var(--sans);font-size:10px;line-height:1.55;color:#c0c5d2;margin:4px 0 0}.lc-map figcaption{border-color:#2a3246;color:#7e879a}
.lc-glance-figure{margin:30px 0!important}.lc-glance{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#ded9d0;border:1px solid #ded9d0;border-radius:14px;overflow:hidden}.lc-glance>div{background:#f5f3ed;padding:23px 20px;display:flex;flex-direction:column;gap:9px}.lc-glance strong{font-family:var(--serif);font-size:34px;font-weight:400;letter-spacing:-.045em;color:#4b3fac}.lc-glance span{font-family:var(--sans);font-size:10px;line-height:1.7;color:#4f515b}.lc-glance-figure figcaption{font-family:var(--sans);font-size:9px;line-height:1.8;color:#8b867e;margin-top:11px}
.lc-query-row{display:flex;align-items:center;gap:10px;background:#eef6f1;border:1px solid #cfe2d6;border-radius:9px;padding:12px;color:#167273;font-size:10px;line-height:1.5}.lc-candidate-head{display:grid;grid-template-columns:1fr 72px 160px;color:#a1a4ad;font-size:8px;text-transform:uppercase;letter-spacing:.1em;padding:16px 8px 8px;border-bottom:1px solid #ececf0}.lc-candidate-row{display:grid;grid-template-columns:1fr 72px 160px;align-items:center;padding:13px 8px;border-bottom:1px solid #eeeef1}.lc-candidate-row.is-active{background:#faf9ff}.lc-mini-person{display:flex;align-items:center;gap:10px}.lc-mini-person>span{width:31px;height:31px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e6f1ea;color:#167273;font-size:8px;font-weight:750}.lc-mini-person strong{display:block;font-size:11px}.lc-mini-person small{display:block;font-size:8px;color:#9195a0;margin-top:2px}.lc-match strong{font-family:var(--serif);font-size:24px;font-weight:400;color:#167273}.lc-match span{font-size:8px;color:#a1a4ad}.lc-evidence span{display:block;font-size:9px;color:#525864}.lc-evidence small{display:block;font-size:8px;color:#7162ce;margin-top:3px}
.lc-interview-grid{display:grid;grid-template-columns:1.35fr .65fr;gap:14px}.lc-call-head{display:flex;align-items:center;gap:9px;padding-bottom:15px;border-bottom:1px solid #eeeef1}.lc-call-head strong{display:block;font-size:11px}.lc-call-head small{font-size:8px;color:#9297a3}.lc-live{margin-left:auto;font-size:8px;color:#3f806b;display:flex;align-items:center;gap:5px}.lc-live i{width:6px;height:6px;border-radius:50%;background:#61c59f}.lc-transcript>div{display:grid;grid-template-columns:38px 1fr;gap:8px;padding:11px 0;border-bottom:1px solid #eeeef1}.lc-transcript>div>span{font-size:8px;color:#a0a4ae}.lc-editorial .lc-transcript p{font-family:var(--sans);font-size:9px;line-height:1.55;color:#5e6370;margin:0}.lc-transcript p strong{display:block;font-size:8px;color:#303642;margin-bottom:3px}.lc-transcript>div:last-child p{color:#167273}.lc-score-card{background:#20263a;border-radius:12px;padding:20px;color:#fff}.lc-score-card>.lc-label{color:#9ea6ba;font-size:8px}.lc-section .lc-score-card h3{color:#fff;font-family:var(--serif);font-weight:400;font-size:25px;margin:9px 0 18px}.lc-signal{padding:10px 0;border-top:1px solid #353c50;display:flex;justify-content:space-between;gap:12px;font-size:9px}.lc-signal span{color:#aab0c0}.lc-signal strong{font-weight:650;color:#f4f5f9}.lc-do-not{display:flex;gap:9px;background:#302a43;border:1px solid #493d64;padding:12px;border-radius:9px;margin-top:14px;color:#e2c9ff}.lc-do-not strong{display:block;font-size:9px}.lc-do-not span{display:block;font-size:8px;line-height:1.45;color:#c3b7d3;margin-top:3px}
.lc-onboard-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:14px}.lc-onboard-plan{background:#fff;border:1px solid #dfdfe3;border-radius:12px;padding:5px 16px}.lc-onboard-plan>div{display:grid;grid-template-columns:46px 27px 1fr 32px;gap:9px;align-items:center;padding:15px 0;border-bottom:1px solid #eeeef1}.lc-onboard-plan>div:last-child{border-bottom:0}.lc-day{font-size:8px;color:#9599a4}.lc-check{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#f0eff4;color:#9b9daa}.lc-onboard-plan .is-done .lc-check{background:#dff5eb;color:#3b846d}.lc-onboard-plan strong{display:block;font-size:10px}.lc-editorial .lc-onboard-plan p{font-family:var(--sans);font-size:8px;line-height:1.45;color:#8c9099;margin:3px 0 0}.lc-onboard-plan b{font-size:8px;color:#8e929e}.lc-assistant-card{background:#191f32;border-radius:12px;padding:17px;color:#fff}.lc-assistant-head{display:flex;align-items:center;gap:9px;margin-bottom:15px}.lc-assistant-head>span{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#342c64;color:#b6aaff}.lc-assistant-head strong{display:block;font-size:10px}.lc-assistant-head small{display:block;color:#868ea4;font-size:7px;margin-top:2px}.lc-bubble{max-width:90%;padding:10px 11px;border-radius:10px;font-size:9px;line-height:1.55;margin-top:8px}.lc-bubble.is-user{background:#2a3147;margin-left:auto;color:#e8eaf0}


.lc-bubble.is-ai strong{color:#493fa2}.lc-source-chip{display:flex;align-items:center;gap:6px;font-size:7px;color:#98a0b3;margin-top:9px}
.lc-review-head{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding-bottom:14px;border-bottom:1px solid #eeeef1}.lc-review-head small{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.08em;color:#9da1aa}.lc-review-head strong{display:block;font-size:10px;margin-top:4px}.lc-evidence-list>div{display:flex;gap:10px;padding:13px 0;border-bottom:1px solid #eeeef1}.lc-evidence-mark{width:27px;height:27px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e6f7ef;color:#42856f}.lc-evidence-mark.is-gap{background:#fff0e9;color:#b76547}.lc-evidence-list strong{display:block;font-size:10px}.lc-editorial .lc-evidence-list p{font-family:var(--sans);font-size:9px;line-height:1.5;color:#7e838e;margin:3px 0 0}.lc-ai-draft{margin-top:15px;border:1px solid #dfd9fb;background:#f6f4ff;border-radius:10px;padding:13px}



.lc-editorial .lc-ai-draft p{font-family:var(--sans);font-size:9px;line-height:1.6;color:#535663;margin:8px 0}.lc-ai-draft button{background:#fff;border:1px solid #d8d1fb;color:#5f50be;font-size:8px;font-weight:700;border-radius:20px;padding:6px 10px}
.lc-skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#ddd9d1;border:1px solid #ddd9d1;border-radius:12px;overflow:hidden}.lc-skill-panel,.lc-next-role{background:#fff;padding:20px}.lc-skill-title{display:flex;gap:9px;align-items:center;padding-bottom:16px;border-bottom:1px solid #eeeef1}.lc-skill-title small{display:block;font-size:7px;color:#999da8}.lc-skill-title strong{font-size:10px}.lc-skill{padding-top:14px}.lc-skill>div:first-child{display:flex;justify-content:space-between;font-size:9px;color:#555a66}.lc-skill>div strong{font-size:8px}.lc-skill-track{height:5px;background:#efeff2;border-radius:10px;overflow:hidden;margin-top:6px}.lc-skill-track i{display:block;height:100%;background:#7d6bea;border-radius:10px}.lc-skill-track i.is-build{background:#d5aa59}.lc-next-role>.lc-label{font-size:8px;color:#8e899f}.lc-role-match{display:flex;gap:12px;align-items:center;padding:15px 0;border-bottom:1px solid #eeeef1}.lc-role-match>span{width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e6f1ea;color:#167273;font-family:var(--serif);font-size:17px}.lc-role-match strong{display:block;font-size:11px}.lc-role-match small{font-size:8px;color:#8d919c}.lc-gap{display:flex;gap:9px;padding:12px 0;border-bottom:1px solid #eeeef1}.lc-gap>span{font-size:8px;color:#9d99a8}.lc-gap strong{display:block;font-size:9px}.lc-gap small{font-size:8px;color:#92969f;line-height:1.4}.lc-next-role button{margin-top:14px;background:#201c3e;color:#fff;border:0;border-radius:20px;padding:8px 11px;font-size:8px;font-weight:700;display:flex;gap:6px;align-items:center}
.lc-retention-wrap{display:grid;grid-template-columns:.8fr 1.2fr;gap:14px}.lc-pulse{background:#201f37;color:#fff;border-radius:12px;padding:22px;grid-row:span 2}.lc-pulse small{font-size:8px;color:#9a98ad;text-transform:uppercase;letter-spacing:.1em}.lc-pulse strong{display:block;font-family:var(--serif);font-size:28px;font-weight:400;line-height:1.15;margin-top:9px;color:#ded8ff}.lc-editorial .lc-pulse p{font-family:var(--sans);font-size:10px;line-height:1.65;color:#aeb0c0;margin:13px 0 0}.lc-signal-list{background:#fff;border:1px solid #dfdfe3;border-radius:12px;padding:6px 15px}.lc-signal-list>div{display:grid;grid-template-columns:58px 1fr;gap:10px;align-items:center;padding:11px 0;border-bottom:1px solid #eeeef1}.lc-signal-list>div:last-child{border:0}.lc-status{font-size:7px;font-weight:750;border-radius:20px;text-align:center;padding:4px 6px;background:#efeff2;color:#777b86}.lc-status.is-down,.lc-status.is-watch{background:#fff0e9;color:#aa5d43}.lc-status.is-healthy{background:#e4f6ee;color:#43836e}.lc-status.is-open{background:#eeebff;color:#6152bd}.lc-signal-list strong{display:block;font-size:9px}.lc-signal-list small{display:block;font-size:8px;color:#8f939d;margin-top:2px}.lc-next-conversation{background:#e9e5ff;border:1px solid #dad3ff;border-radius:12px;padding:14px;display:flex;gap:10px;color:#5548ad}.lc-next-conversation small{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.08em}.lc-next-conversation strong{display:block;font-size:10px;line-height:1.45;margin-top:3px;color:#3e3769}.lc-next-conversation span{display:block;font-size:8px;margin-top:5px;color:#766d98}
.lc-exit-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#ddd9d1;border:1px solid #ddd9d1;border-radius:12px;overflow:hidden}.lc-exit-grid>div{background:#fff;padding:17px}.lc-exit-grid>div>span:first-child{font-size:8px;color:#aaa59e}.lc-exit-icon{width:31px;height:31px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#efecff;color:#6152c2;margin:17px 0 12px}.lc-exit-grid strong{display:block;font-size:10px}.lc-editorial .lc-exit-grid p{font-family:var(--sans);font-size:8px;line-height:1.5;color:#858992;margin:6px 0 0}.lc-handover{display:grid;grid-template-columns:1fr auto auto auto auto;align-items:center;gap:12px;background:#20263a;color:#fff;padding:14px 16px;border-radius:10px;margin-top:13px}.lc-handover small{display:block;font-size:7px;color:#929aae;text-transform:uppercase;letter-spacing:.08em}.lc-handover strong{display:block;font-size:9px;margin-top:2px}.lc-handover>span{font-size:8px;color:#b8becd}.lc-handover button{background:#b7efdd;border:0;color:#18221f;border-radius:20px;font-size:8px;font-weight:750;padding:7px 10px}
.lc-rights-table{background:#fff;border:1px solid #dedee3;border-radius:12px;overflow:hidden}.lc-rights-head,.lc-rights-row{display:grid;grid-template-columns:1.05fr .55fr 1.2fr;gap:16px;padding:12px 15px}.lc-rights-head{background:#20263a;color:#9fa7b8;font-size:8px;text-transform:uppercase;letter-spacing:.08em}.lc-rights-row{border-bottom:1px solid #eeeef1;align-items:center}.lc-rights-row:last-child{border-bottom:0}.lc-rights-row strong{font-size:9px}.lc-rights-row>span{font-size:8px;color:#5e50bc;background:#f0edff;border-radius:20px;padding:5px 8px;width:fit-content}.lc-editorial .lc-rights-row p{font-family:var(--sans);font-size:8px;line-height:1.45;color:#757a86;margin:0}.lc-build-list{margin:8px 0 28px}.lc-build-list>div{display:flex;gap:19px;align-items:flex-start;padding:24px 0;border-bottom:1px solid var(--line)}.lc-build-list>div>span{font-size:11px;color:#99938a;padding-top:4px}.lc-build-list>div>svg{color:#8474dd;margin-left:auto;margin-top:5px}.lc-build-list>div>div{flex:1}.lc-section .lc-build-list h3{margin:0 0 8px;font-size:15px}.lc-editorial .lc-build-list p{font-family:var(--sans);font-size:13px;line-height:1.7;color:#5d6069;margin:0}
.lc-sources{margin-top:56px;padding-top:31px;border-top:1px solid var(--line)}.lc-sources>.lc-label{color:#827d75;font-size:11px}.lc-sources h2{font-family:var(--serif);font-size:34px;line-height:1.2;letter-spacing:-.03em;font-weight:400;color:#272b36;margin-top:13px}.lc-sources>p{font-size:12px;color:#676a72;line-height:1.75;margin-top:12px;max-width:760px}.lc-sources ol{list-style:none;padding:0;margin:22px 0 0}.lc-sources li{display:flex;gap:17px;align-items:center;border-bottom:1px solid var(--line);padding:19px 0;scroll-margin-top:40px}.lc-sources li>span{font-size:10px;color:#99938a}.lc-sources li>a{flex:1}.lc-sources small{font-size:10px;color:#8b867e;display:block;margin-bottom:4px}.lc-sources strong{font-size:13px;font-weight:650;color:#343844;line-height:1.4}.lc-sources li svg{color:#8272da}.lc-sources li:hover strong{color:#594bb8}.lc-cta{margin-top:50px;background:radial-gradient(circle at 90% 10%,rgba(123,104,238,.35),transparent 36%),var(--ink);padding:42px;border-radius:16px;color:#f4f3f9}.lc-cta .lc-label{color:#a99ef0;font-size:9px}.lc-cta h2{font-family:var(--serif);font-size:41px;font-weight:400;line-height:1.12;letter-spacing:-.037em;margin-top:19px;max-width:670px}.lc-cta h2 em{color:#b7efdd;font-style:italic}.lc-cta p{font-size:12px;line-height:1.8;color:#adb2c1;max-width:520px;margin-top:18px}.lc-cta .lc-button{margin-top:23px}.lc-article-end{display:flex;justify-content:space-between;gap:20px;padding-block:25px;font-size:10px;color:#8c877f}.lc-article-end>a:first-child{display:flex;gap:8px;align-items:center}
@media(min-width:1500px){.lc-hero-main{min-height:700px}.lc-hero h1{font-size:69px}}
@media(max-width:1100px){.lc-container{width:calc(100% - 64px)}.lc-nav-links{gap:20px;font-size:10px}.lc-hero-main{gap:24px}.lc-hero h1{font-size:50px}.lc-reading-layout{gap:44px;grid-template-columns:185px minmax(0,1fr)}.lc-overview dl{gap:18px}.lc-overview dl>div+div{padding-left:18px}.lc-map-grid{grid-template-columns:repeat(2,1fr)}.lc-handover{grid-template-columns:1fr auto auto}.lc-handover button{grid-column:3}.lc-handover>span:nth-of-type(3){display:none}}
@media(max-width:820px){.lc-container{width:calc(100% - 44px)}.lc-nav{min-height:78px}.lc-nav-links{display:none}.lc-nav>.lc-button{margin-left:auto;padding:10px 17px;min-height:39px;font-size:10px}.lc-hero-main{grid-template-columns:1fr;padding-top:38px;padding-bottom:42px}.lc-hero-copy{max-width:680px}.lc-hero h1{font-size:clamp(42px,8vw,62px);max-width:700px}.lc-deck{max-width:600px}.lc-hero-art{max-width:680px;width:100%;margin-inline:auto}.lc-overview dl{grid-template-columns:1fr 1fr;gap:25px}.lc-overview dl>div+div{border:0;padding-left:0}.lc-reading-layout{display:block;padding-top:28px}.lc-toc{display:none}.lc-mobile-toc{display:block;border-block:1px solid var(--line);margin-bottom:30px;padding:14px 0}.lc-mobile-toc summary{list-style:none;display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#5c50af;font-weight:650;cursor:pointer}.lc-mobile-toc summary::-webkit-details-marker{display:none}.lc-mobile-toc nav{padding-top:10px}.lc-editorial p{font-size:17px}.lc-editorial p.lc-lead{font-size:21px}.lc-section h2{font-size:33px}.lc-section{padding-top:43px}.lc-map-grid{grid-template-columns:repeat(2,1fr)}.lc-glance{grid-template-columns:repeat(2,1fr)}.lc-interview-grid,.lc-onboard-grid,.lc-skills-grid,.lc-retention-wrap{grid-template-columns:1fr}.lc-pulse{grid-row:auto}.lc-exit-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.lc-container{width:calc(100% - 34px)}.lc-hero{padding-top:68px}.lc-logo{font-size:21px}.lc-category{font-size:9px}.lc-hero h1{font-size:40px;line-height:1.08}.lc-deck{font-size:13px;line-height:1.8}.lc-hero-meta{font-size:9px}.lc-hero-meta>*+*::before{padding-inline:8px}.lc-hero-ui{padding:24px 0 28px}.lc-float-card{display:none}.lc-journey-line{grid-template-columns:repeat(3,1fr);row-gap:17px}.lc-journey-step em{display:none}.lc-hero-insight{grid-template-columns:1fr;gap:8px}.lc-hero-insight button{width:fit-content}.lc-overview{padding:28px 0}.lc-overview dl{gap:22px 12px}.lc-overview dd{font-size:11px}.lc-overview dl>div{gap:11px}.lc-icon-tile{width:36px;height:36px}.lc-editorial p.lc-lead{font-size:20px}.lc-section h2{font-size:29px}.lc-editorial .lc-quote p{font-size:24px}.lc-figure{padding:17px}.lc-figure-head{align-items:flex-start;flex-wrap:wrap;margin-bottom:19px}.lc-map-grid{grid-template-columns:1fr}.lc-glance{grid-template-columns:1fr 1fr}.lc-glance>div{padding:17px 14px}.lc-glance strong{font-size:27px}.lc-glance span{font-size:9px}.lc-candidate-head,.lc-candidate-row{grid-template-columns:1fr 55px}.lc-candidate-head span:last-child,.lc-candidate-row>.lc-evidence{display:none}.lc-review-head{grid-template-columns:1fr}.lc-exit-grid{grid-template-columns:1fr 1fr}.lc-handover{grid-template-columns:1fr 1fr}.lc-handover>div{grid-column:1/-1}.lc-handover button{grid-column:2}.lc-rights-head{display:none}.lc-rights-row{grid-template-columns:1fr auto;padding:14px}.lc-rights-row>p{grid-column:1/-1}.lc-cta{padding:31px 24px}.lc-cta h2{font-size:35px}.lc-article-end{flex-direction:column;gap:15px}.lc-build-list>div{gap:13px}}
@media(prefers-reduced-motion:no-preference){.lc-page{scroll-behavior:smooth}.lc-page a,.lc-page button{transition:color .18s,background .18s,transform .18s}}
@media print{.lc-page{background:#fff;color:#000}.lc-progress,.lc-nav,.lc-toc,.lc-mobile-toc,.lc-cta,.lc-article-end,.lc-read-link{display:none!important}.lc-hero{background:#fff;color:#000;padding-top:0}.lc-hero-main{min-height:0;padding-block:20px;grid-template-columns:1fr}.lc-hero-art{display:none}.lc-deck,.lc-hero-meta{color:#333}.lc-container{width:100%}.lc-reading-layout{display:block;padding-top:20px}.lc-section{break-inside:auto}.lc-figure,.lc-quote,.lc-note{break-inside:avoid}.lc-hero h1{font-size:36px}.lc-section h2{font-size:26px}.lc-editorial p{font-size:12px;line-height:1.6}.lc-sources a::after{content:' (' attr(href) ')';font-size:8px;overflow-wrap:anywhere}}
`;
