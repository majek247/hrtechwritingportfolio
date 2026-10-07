"use client";

// npm i pptxgenjs
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type Props = {
  demoHref?: string;
  customersHref?: string;
  portfolioHref?: string;
};

type Scn = "conservative" | "base" | "ambitious";
type StepId = 1 | 2 | 3 | 4;
type IconName =
  | "people"
  | "hires"
  | "clock"
  | "money"
  | "calendar"
  | "trend"
  | "refresh"
  | "coins"
  | "globe"
  | "spark"
  | "bolt"
  | "chart"
  | "target"
  | "check"
  | "briefcase"
  | "layers"
  | "arrow";

const SCN: Record<
  Scn,
  { label: string; screen: number; time: number; attr: number }
> = {
  conservative: { label: "Conservative", screen: 30, time: 15, attr: 15 },
  base: { label: "Base", screen: 50, time: 30, attr: 30 },
  ambitious: { label: "Ambitious", screen: 70, time: 45, attr: 50 },
};

// Published on makipeople.com/customers (reported by Maki)
const proof = [
  {
    id: "cap",
    name: "Capgemini",
    stat: "Under 10 days",
    line: "time to hire, from several weeks",
    stat2: "95%",
    line2: "candidate satisfaction",
  },
  {
    id: "del",
    name: "Deloitte France",
    stat: "94.2%",
    line: "positive candidate feedback",
    stat2: "Faster",
    line2: "recruiter shortlisting",
  },
  {
    id: "asos",
    name: "ASOS",
    stat: "93%+",
    line: "positive candidate feedback",
    stat2: "Skills",
    line2: "based, brand-led hiring",
  },
  {
    id: "trg",
    name: "The Restaurant Group",
    stat: "300+",
    line: "locations hiring at the frontline",
    stat2: "None",
    line2: "manual screening needed",
  },
];

const trusted = [
  { name: "Capgemini",       src: "/images/logos/capgemini.svg",           invert: true  },
  { name: "Deloitte",        src: "/images/logos/deloitte-white.svg",      invert: false },
  { name: "Nespresso",       src: "/images/logos/nespresso.svg",           invert: true  },
  { name: "ASOS",            src: "/images/logos/asos-white.svg",          invert: false },
  { name: "Grant Thornton",  src: "/images/logos/grant-thornton-light.svg", invert: false },
  { name: "Foundever",       src: "/images/logos/foundever.svg",           invert: true  },
];

const faqs = [
  [
    "How should I estimate recruiter time savings?",
    "Start with what you can measure: applications per year multiplied by the minutes a recruiter spends on each first screen. Then apply a conservative share of that time that assessment would remove. Use the Conservative scenario for finance, and replace the placeholder minutes with figures from your ATS or a two-week time sample.",
  ],
  [
    "What if our hiring volumes change?",
    "Change the application and hire inputs and every figure updates. If volumes are seasonal, model the annual total and note the peak months separately, because the benefit is usually biggest when volume spikes.",
  ],
  [
    "How do I avoid overstating ROI?",
    "Use the Conservative scenario first, count only benefits you can trace to a budget line, and subtract the full annual cost of Maki. Customer results on this page are theirs, so treat them as reference points rather than promises.",
  ],
  [
    "What about implementation time and resources?",
    "This page can't answer that for you, and the model doesn't include it. Ask Maki for a rollout plan on a demo call, and add internal time for integration, role set-up and recruiter training to your own cost line.",
  ],
  [
    "Can we run a pilot first?",
    "Yes, and it's the safest ask. Capgemini went live in France first, with plans to expand to 50+ countries by 2026. Pick a few roles or one market, agree the success metrics up front, and use the pilot to replace the placeholders here with real data.",
  ],
];

const steps: Array<{
  id: StepId;
  title: string;
  description: string;
  icon: IconName;
}> = [
  {
    id: 1,
    title: "Hiring volume",
    description: "Tell us about your current hiring activity.",
    icon: "people",
  },
  {
    id: 2,
    title: "Recruiter effort",
    description: "How much time and resource goes into hiring today?",
    icon: "clock",
  },
  {
    id: 3,
    title: "Cost impact",
    description: "What does slow hiring and attrition cost your business?",
    icon: "money",
  },
  {
    id: 4,
    title: "Review",
    description: "Check your inputs and final impact.",
    icon: "target",
  },
];



const stepTips: Record<StepId, Array<{ title: string; text: string }>> = {
  1: [
    {
      title: "Use current ATS data",
      text: "Use the latest 12 months of completed applications from the roles included in scope.",
    },
    {
      title: "Keep scope consistent",
      text: "Include the same roles, markets and business units across every input in the model.",
    },
    {
      title: "Default to conservative",
      text: "Use the lower defensible estimate whenever your source data is incomplete or inconsistent.",
    },
  ],
  2: [
    {
      title: "Count screening work",
      text: "Include CV review, eligibility checks, admin and first-screen decision-making before any interview.",
    },
    {
      title: "Use loaded recruiter cost",
      text: "Include salary, employer costs and overhead when calculating recruiter cost per working hour.",
    },
    {
      title: "Match reporting periods",
      text: "Use time-to-hire data from the same roles and 12-month period as application volumes.",
    },
  ],
  3: [
    {
      title: "Use Finance definitions",
      text: "Match the early attrition period already used in your workforce or finance reporting.",
    },
    {
      title: "Count supported costs",
      text: "Include replacement, onboarding and training costs only where internal data clearly supports them.",
    },
    {
      title: "Use defensible vacancy cost",
      text: "Base daily vacancy cost on lost productivity, cover, overtime or delayed commercial output.",
    },
  ],
  4: [
    {
      title: "Validate before sharing",
      text: "Reconcile final assumptions with ATS, HRIS and Finance data before circulating the model.",
    },
    {
      title: "Lead with Conservative",
      text: "Present Conservative as the planning case, then use Base to show credible upside.",
    },
    {
      title: "Include Maki investment",
      text: "Enter the expected annual Maki cost before presenting any three-year net benefit figure.",
    },
  ],
};
const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);

const num = (n: number) =>
  new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(
    Number.isFinite(n) ? n : 0,
  );

const short = (n: number) =>
  n >= 1e6
    ? `£${(n / 1e6).toFixed(1)}M`
    : n >= 1e3
      ? `£${Math.round(n / 1e3)}K`
      : gbp(n);

const parseField = (raw: string) => {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
};

type SlideLayout = "cover" | "current" | "impact" | "proof" | "risks" | "next";

type Slide = {
  layout: SlideLayout;
  kicker: string;
  title: string;
  big?: string;
  sub?: string;
  bullets: string[];
  visual: string;
  chart?: { labels: string[]; values: number[] };
};

const deckAssets = {
  logo: "/images/maki-logo-black.png",
  cover: "/images/01-assess-first.png",
  current: "/images/02-current-state.png",
  impact: "/images/03-projected-impact.png",
  proof: "/images/04-customer-proof.png",
  risks: "/images/05-risk-controls.png",
  next: "/images/06-next-steps.png",
} as const;

async function imageUrlToDataUri(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load image: ${url}`);
  const blob = await response.blob();

  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2" />
        <path d="M3.5 19c.5-4 2.5-6 5.5-6s5 2 5.5 6" />
        <path d="M14 14c3 0 5 1.7 5.5 5" />
      </>
    ),
    hires: (
      <>
        <rect x="6" y="4" width="12" height="16" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    money: (
      <>
        <path d="M15 5c-1-.7-2-.9-3.2-.9-2.3 0-4 1.4-4 3.4 0 2.1 1.7 3 4.2 3.5 2.2.3 3.6 1.1 3.6 3.1 0 2.1-1.8 3.7-4.4 3.7-1.5 0-3-.4-4.2-1.3" />
        <path d="M12 2v20" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M8 3v6M16 3v6M4 10h16M8 14h2M14 14h2" />
      </>
    ),
    trend: (
      <>
        <path d="M4 7l5 5 3-3 6 6" />
        <path d="M15 15h3v-3" />
      </>
    ),
    refresh: (
      <>
        <path d="M19 7v5h-5" />
        <path d="M5 17v-5h5" />
        <path d="M18 12a7 7 0 0 0-12-4L5 9" />
        <path d="M6 12a7 7 0 0 0 12 4l1-1" />
      </>
    ),
    coins: (
      <>
        <ellipse cx="12" cy="7" rx="6" ry="3" />
        <path d="M6 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7" />
        <path d="M6 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4c2 2.2 3 4.9 3 8s-1 5.8-3 8M12 4c-2 2.2-3 4.9-3 8s1 5.8 3 8" />
      </>
    ),
    spark: (
      <>
        <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" />
        <path d="M18 15l.8 1.8L21 18l-2.2 1.2L18 21l-.8-1.8L15 18l2.2-1.2L18 15Z" />
      </>
    ),
    bolt: <path d="M13 2L5 13h6l-1 9 9-13h-6V2Z" />,
    chart: (
      <>
        <path d="M5 19V9M12 19V5M19 19v-7" />
        <path d="M3 19h18" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 12 19 5M16 5h3v3" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    briefcase: (
      <>
        <rect x="4" y="7" width="16" height="12" rx="2" />
        <path d="M9 7V5h6v2M4 12h16M10 12v2h4v-2" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 8 4-8 4-8-4 8-4Z" />
        <path d="m4 12 8 4 8-4M4 17l8 4 8-4" />
      </>
    ),
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  };

  return (
    <span className={`mi ${className}`.trim()}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {paths[name]}
      </svg>
    </span>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12h15m-6-6 6 6-6 6" />
  </svg>
);

const Tick = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m5 12 4 4L19 6" />
  </svg>
);

function Field({
  label,
  help,
  value,
  set,
  prefix,
  suffix,
  max,
}: {
  label: string;
  help: string;
  value: number;
  set: (n: number) => void;
  icon: IconName;
  prefix?: string;
  suffix?: string;
  max?: number;
}) {
  return (
    <label className="calcField">
      <span className="fieldCopy">
        <span className="fieldLabel">
          {label}
          <span
            className="tipIcon"
            tabIndex={0}
            role="button"
            aria-label={`${label}: ${help}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5M12 7.5v.01" />
            </svg>
            <span className="tipBubble" role="tooltip">
              {help}
            </span>
          </span>
        </span>
      </span>
      <span className="fieldControl">
        {prefix && <i>{prefix}</i>}
        <input
          inputMode="decimal"
          value={num(value)}
          aria-label={label}
          onFocus={(e) => e.currentTarget.select()}
          onChange={(e) => {
            const next = parseField(e.target.value);
            set(max !== undefined ? Math.min(max, next) : next);
          }}
        />
        {suffix && <i>{suffix}</i>}
      </span>
    </label>
  );
}

function ReviewLine({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="reviewLine">
      <span>{label}</span>
      <strong>{value}</strong>
      <button type="button" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
}

export default function MakiBusinessCaseBuilder({
  demoHref = "https://www.makipeople.com/demo",
  customersHref = "https://www.makipeople.com/customers",
  portfolioHref = "/",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const [scn, setScn] = useState<Scn>("base");
  const [step, setStep] = useState<StepId>(1);

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

  const [picked, setPicked] = useState<string[]>(["cap", "del", "asos"]);
  const [active, setActive] = useState(0);
  const [titles, setTitles] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-r]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );

    items.forEach((item) => io.observe(item));
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
    const three = annual * 3;
    const net3 = three - cost * 3;
    const after = Math.max(0, days - daysSaved);

    return {
      hours,
      capacity,
      daysSaved,
      vacancy,
      attrition,
      annual,
      three,
      net3,
      after,
    };
  }, [apps, hires, mins, rate, days, attr, replace, vac, cost, s]);

  const chosen = proof.filter((p) => picked.includes(p.id));

  const slides: Slide[] = [
    {
      layout: "cover",
      kicker: "Executive summary",
      title: "The case for assessing first.",
      sub: `Maki business case · ${s.label.toLowerCase()} scenario`,
      bullets: [
        `Across ${num(units)} markets or business units`,
        "Built from your hiring inputs and selected customer evidence",
      ],
      visual: deckAssets.cover,
    },
    {
      layout: "current",
      kicker: "Current state",
      title: "What hiring costs today.",
      big: num(apps),
      sub: "applications per year",
      bullets: [
        `${num(hires)} hires across the roles in scope`,
        `${mins} minutes of recruiter screening per applicant`,
        `${days} days to hire · ${attr}% early attrition`,
      ],
      visual: deckAssets.current,
    },
    {
      layout: "impact",
      kicker: "Projected impact",
      title: "What changes with Maki.",
      big: gbp(c.annual),
      sub: "estimated annual benefit",
      bullets: [
        `${num(c.hours)} recruiter hours returned per year`,
        `${Math.round(c.daysSaved)} fewer days to hire`,
        cost > 0
          ? `${gbp(c.net3)} net estimated benefit over three years`
          : `${gbp(c.three)} estimated benefit over three years before Maki cost`,
      ],
      visual: deckAssets.impact,
      chart: {
        labels: ["Recruiter capacity", "Vacancy days", "Early attrition"],
        values: [
          Math.round(c.capacity),
          Math.round(c.vacancy),
          Math.round(c.attrition),
        ],
      },
    },
    {
      layout: "proof",
      kicker: "Customer evidence",
      title: "Evidence your VP can point to.",
      sub: "Selected Maki customer outcomes",
      bullets: chosen.length
        ? chosen.map((p) => `${p.name}: ${p.stat} ${p.line}`)
        : ["Select customer examples in the builder"],
      visual: deckAssets.proof,
    },
    {
      layout: "risks",
      kicker: "Validation",
      title: "What needs validating before rollout.",
      bullets: [
        "Benefits: replace illustrative assumptions with pilot data",
        "Candidate experience: track completion and feedback",
        "Adoption: involve recruiters and hiring managers in role set-up",
        "Rollout effort: agree implementation ownership and resourcing",
      ],
      visual: deckAssets.risks,
    },
    {
      layout: "next",
      kicker: "Recommended next step",
      title: "Move from estimate to evidence.",
      sub: "Pilot → measure → expand",
      bullets: [
        "Approve a focused pilot for a defined role group or market",
        "Agree success measures before launch",
        `Request a Maki demo: ${demoHref.replace("https://", "")}`,
      ],
      visual: deckAssets.next,
    },
  ];

  const sl = slides[active];
  const summary = slides
    .map((x, i) =>
      `${titles[i] ?? x.title}\n${[
        x.big && `${x.big} ${x.sub ?? ""}`,
        ...x.bullets,
      ]
        .filter(Boolean)
        .join("\n")}`,
    )
    .join("\n\n");

  const toggle = (
    set: Dispatch<SetStateAction<string[]>>,
    id: string,
  ) =>
    set((value) =>
      value.includes(id)
        ? value.filter((item) => item !== id)
        : [...value, id],
    );

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function download() {
    setBusy(true);

    try {
      const P = (await import("pptxgenjs")).default;
      const p = new P();

      p.layout = "LAYOUT_WIDE";
      p.author = "Maki";
      p.company = "Maki";
      p.subject = "Executive hiring business case";
      p.title = "Maki executive summary";
      p.lang = "en-GB";
      p.theme = {
        headFontFace: "Georgia",
        bodyFontFace: "Arial",
        lang: "en-GB",
      };

      const assetEntries = await Promise.all(
        Object.entries(deckAssets).map(async ([key, url]) => [
          key,
          await imageUrlToDataUri(url),
        ] as const),
      );

      const assets = Object.fromEntries(assetEntries) as Record<
        keyof typeof deckAssets,
        string
      >;

      const C = {
        deep: "041B1C",
        deep2: "082F30",
        teal: "087675",
        mint: "7FD3D0",
        cream: "F8F7F2",
        cream2: "EEEDE7",
        white: "FFFFFF",
        ink: "0A2628",
        muted: "647A78",
        line: "D9E4E0",
        pale: "EEF6F3",
      };

      const addTopBrand = (
        d: any,
        slideNumber: number,
        dark = false,
      ) => {
        if (dark) {
          d.addShape(p.ShapeType.roundRect, {
            x: 0.68,
            y: 0.43,
            w: 1.28,
            h: 0.46,
            rectRadius: 0.06,
            line: { color: C.white, transparency: 100 },
            fill: { color: C.white },
          });
          d.addImage({
            data: assets.logo,
            x: 0.82,
            y: 0.53,
            w: 0.98,
            h: 0.295,
          });
        } else {
          d.addImage({
            data: assets.logo,
            x: 0.7,
            y: 0.5,
            w: 1.05,
            h: 0.316,
          });
        }

        d.addText("CONFIDENTIAL · ILLUSTRATIVE", {
          x: 9.8,
          y: 0.55,
          w: 2.1,
          h: 0.22,
          fontFace: "Arial",
          fontSize: 8.5,
          bold: true,
          charSpacing: 0.8,
          color: dark ? "C8DEDB" : "526B68",
          align: "right",
          margin: 0,
        });

        d.addText(`${slideNumber} / ${slides.length}`, {
          x: 12.05,
          y: 0.55,
          w: 0.55,
          h: 0.22,
          fontFace: "Arial",
          fontSize: 8.5,
          bold: true,
          color: dark ? C.white : C.ink,
          align: "right",
          margin: 0,
        });
      };

      const addFooter = (
        d: any,
        slideNumber: number,
        dark = false,
      ) => {
        d.addShape(p.ShapeType.line, {
          x: 0.7,
          y: 7.03,
          w: 11.9,
          h: 0,
          line: {
            color: dark ? "315355" : "DCE5E2",
            transparency: dark ? 20 : 0,
            width: 0.8,
          },
        });

        d.addText(
          new Date().toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          }),
          {
            x: 0.7,
            y: 7.1,
            w: 1.6,
            h: 0.18,
            fontFace: "Arial",
            fontSize: 8,
            color: dark ? "8FB2AF" : "788A87",
            margin: 0,
          },
        );

        d.addText("Maki · Executive summary", {
          x: 5.0,
          y: 7.1,
          w: 3.3,
          h: 0.18,
          fontFace: "Arial",
          fontSize: 8,
          color: dark ? "8FB2AF" : "788A87",
          align: "center",
          margin: 0,
        });

        d.addText(String(slideNumber).padStart(2, "0"), {
          x: 12.0,
          y: 7.1,
          w: 0.6,
          h: 0.18,
          fontFace: "Arial",
          fontSize: 8,
          bold: true,
          color: dark ? C.white : C.ink,
          align: "right",
          margin: 0,
        });
      };

      const addKicker = (d: any, text: string, dark = false) => {
        d.addText(text.toUpperCase(), {
          x: 0.72,
          y: 1.3,
          w: 4.2,
          h: 0.22,
          fontFace: "Arial",
          fontSize: 9,
          bold: true,
          charSpacing: 1.6,
          color: dark ? C.mint : C.teal,
          margin: 0,
        });
      };

      const addBullets = (
        d: any,
        bullets: string[],
        x: number,
        y: number,
        w: number,
        dark = false,
        fontSize = 13,
      ) => {
        bullets.forEach((bullet, index) => {
          const yy = y + index * 0.48;

          d.addShape(p.ShapeType.ellipse, {
            x,
            y: yy + 0.075,
            w: 0.11,
            h: 0.11,
            line: {
              color: dark ? C.mint : C.teal,
              transparency: 100,
            },
            fill: { color: dark ? C.mint : C.teal },
          });

          d.addText(bullet, {
            x: x + 0.24,
            y: yy,
            w: w - 0.24,
            h: 0.29,
            fontFace: "Arial",
            fontSize,
            color: dark ? "E3F0EE" : "304C49",
            margin: 0,
            breakLine: false,
            valign: "mid",
          });
        });
      };

      slides.forEach((x, i) => {
        const d = p.addSlide();
        const dark = x.layout === "impact" || x.layout === "next";
        d.background = { color: dark ? C.deep : C.cream };

        addTopBrand(d, i + 1, dark);
        addKicker(d, x.kicker, dark);

        if (x.layout === "cover") {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.75,
            w: 5.25,
            h: 1.55,
            fontFace: "Georgia",
            fontSize: 37,
            bold: true,
            color: C.ink,
            margin: 0,
            breakLine: false,
            valign: "mid",
          });

          d.addText(x.sub ?? "", {
            x: 0.74,
            y: 3.45,
            w: 4.9,
            h: 0.35,
            fontFace: "Arial",
            fontSize: 15,
            color: "304A48",
            margin: 0,
          });

          d.addShape(p.ShapeType.line, {
            x: 0.74,
            y: 4.03,
            w: 4.2,
            h: 0,
            line: { color: "D8E2DF", width: 1 },
          });

          addBullets(d, x.bullets, 0.75, 4.28, 4.9, false, 12.5);

          d.addShape(p.ShapeType.roundRect, {
            x: 6.15,
            y: 1.18,
            w: 6.48,
            h: 5.38,
            rectRadius: 0.08,
            line: { color: "DDE7E3", width: 1 },
            fill: { color: "F0F4F1" },
          });

          d.addImage({
            data: assets.cover,
            x: 6.2,
            y: 1.22,
            w: 6.38,
            h: 5.28,
          });
        }

        if (x.layout === "current") {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.68,
            w: 5.3,
            h: 0.8,
            fontFace: "Georgia",
            fontSize: 32,
            bold: true,
            color: C.ink,
            margin: 0,
          });

          d.addText(x.big ?? "", {
            x: 0.72,
            y: 2.72,
            w: 3.8,
            h: 0.72,
            fontFace: "Georgia",
            fontSize: 46,
            bold: true,
            color: C.teal,
            margin: 0,
          });

          d.addText(x.sub ?? "", {
            x: 0.74,
            y: 3.5,
            w: 3.4,
            h: 0.28,
            fontFace: "Arial",
            fontSize: 13,
            color: C.muted,
            margin: 0,
          });

          addBullets(d, x.bullets, 0.76, 4.12, 5.0, false, 12.2);

          d.addImage({
            data: assets.current,
            x: 6.15,
            y: 1.35,
            w: 6.2,
            h: 5.1,
          });
        }

        if (x.layout === "impact") {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.67,
            w: 5.3,
            h: 0.8,
            fontFace: "Georgia",
            fontSize: 32,
            bold: true,
            color: C.white,
            margin: 0,
          });

          d.addText(x.big ?? "", {
            x: 0.72,
            y: 2.7,
            w: 5.1,
            h: 0.8,
            fontFace: "Georgia",
            fontSize: 42,
            bold: true,
            color: C.mint,
            margin: 0,
          });

          d.addText(x.sub ?? "", {
            x: 0.74,
            y: 3.5,
            w: 4.2,
            h: 0.28,
            fontFace: "Arial",
            fontSize: 13,
            color: "B5CECB",
            margin: 0,
          });

          addBullets(d, x.bullets, 0.76, 4.08, 5.15, true, 11.8);

          if (x.chart) {
            d.addShape(p.ShapeType.roundRect, {
              x: 6.15,
              y: 1.46,
              w: 6.45,
              h: 4.95,
              rectRadius: 0.08,
              line: { color: "31595A", width: 1 },
              fill: { color: "0A3334" },
            });

            d.addChart(
              p.charts.BAR,
              [
                {
                  name: "Annual impact",
                  labels: x.chart.labels,
                  values: x.chart.values,
                },
              ],
              {
                x: 6.45,
                y: 1.9,
                w: 5.82,
                h: 4.05,
                barDir: "col",
                chartColors: ["7FD3D0"],
                showValue: true,
                showLegend: false,
                showTitle: false,
                catAxisLabelColor: "D7E8E5",
                valAxisLabelColor: "9AB9B6",
                valGridLine: { color: "31595A", transparency: 20 },
                chartLineColor: "31595A",
                dataLabelColor: "FFFFFF",
                dataLabelPosition: "outEnd",
                dataLabelFormatCode: "£0.0,,\"M\"",
                valAxisMinVal: 0,
              },
            );
          }
        }

        if (x.layout === "proof") {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.68,
            w: 6.0,
            h: 0.8,
            fontFace: "Georgia",
            fontSize: 32,
            bold: true,
            color: C.ink,
            margin: 0,
          });

          d.addText(x.sub ?? "", {
            x: 0.74,
            y: 2.55,
            w: 4.6,
            h: 0.3,
            fontFace: "Arial",
            fontSize: 13,
            color: C.muted,
            margin: 0,
          });

          const cards = chosen.length ? chosen.slice(0, 3) : proof.slice(0, 3);

          cards.forEach((item, index) => {
            const yy = 3.12 + index * 1.02;

            d.addShape(p.ShapeType.roundRect, {
              x: 0.72,
              y: yy,
              w: 5.45,
              h: 0.83,
              rectRadius: 0.06,
              line: { color: "DCE6E3", width: 1 },
              fill: { color: "FFFFFF" },
            });

            d.addText(item.name, {
              x: 0.96,
              y: yy + 0.16,
              w: 1.85,
              h: 0.22,
              fontFace: "Arial",
              fontSize: 10,
              bold: true,
              color: C.teal,
              margin: 0,
            });

            d.addText(item.stat, {
              x: 2.75,
              y: yy + 0.1,
              w: 1.25,
              h: 0.27,
              fontFace: "Georgia",
              fontSize: 16,
              bold: true,
              color: C.ink,
              margin: 0,
            });

            d.addText(item.line, {
              x: 4.0,
              y: yy + 0.14,
              w: 1.85,
              h: 0.36,
              fontFace: "Arial",
              fontSize: 9.5,
              color: C.muted,
              margin: 0,
            });
          });

          d.addImage({
            data: assets.proof,
            x: 6.35,
            y: 1.5,
            w: 6.1,
            h: 5.0,
          });
        }

        if (x.layout === "risks") {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.68,
            w: 6.0,
            h: 0.85,
            fontFace: "Georgia",
            fontSize: 31,
            bold: true,
            color: C.ink,
            margin: 0,
          });

          x.bullets.forEach((item, index) => {
            const [risk, action] = item.split(":");
            const yy = 2.85 + index * 0.83;

            d.addText(String(index + 1).padStart(2, "0"), {
              x: 0.74,
              y: yy + 0.02,
              w: 0.42,
              h: 0.22,
              fontFace: "Arial",
              fontSize: 9,
              bold: true,
              color: C.teal,
              margin: 0,
            });

            d.addText(risk ?? item, {
              x: 1.25,
              y: yy,
              w: 1.7,
              h: 0.25,
              fontFace: "Arial",
              fontSize: 11,
              bold: true,
              color: C.ink,
              margin: 0,
            });

            d.addText(action?.trim() ?? "", {
              x: 2.95,
              y: yy,
              w: 3.05,
              h: 0.42,
              fontFace: "Arial",
              fontSize: 10.2,
              color: C.muted,
              margin: 0,
            });

            d.addShape(p.ShapeType.line, {
              x: 0.74,
              y: yy + 0.55,
              w: 5.25,
              h: 0,
              line: { color: "DEE7E4", width: 0.8 },
            });
          });

          d.addImage({
            data: assets.risks,
            x: 6.35,
            y: 1.5,
            w: 6.1,
            h: 5.0,
          });
        }

        if (x.layout === "next") {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.7,
            w: 5.8,
            h: 0.9,
            fontFace: "Georgia",
            fontSize: 34,
            bold: true,
            color: C.white,
            margin: 0,
          });

          d.addText(x.sub ?? "", {
            x: 0.74,
            y: 2.67,
            w: 4.6,
            h: 0.32,
            fontFace: "Arial",
            fontSize: 14,
            bold: true,
            color: C.mint,
            margin: 0,
          });

          x.bullets.forEach((item, index) => {
            const yy = 3.35 + index * 0.86;

            d.addShape(p.ShapeType.ellipse, {
              x: 0.75,
              y: yy - 0.02,
              w: 0.38,
              h: 0.38,
              line: { color: C.mint, width: 1.2 },
              fill: { color: C.deep },
            });

            d.addText(String(index + 1).padStart(2, "0"), {
              x: 0.75,
              y: yy + 0.085,
              w: 0.38,
              h: 0.12,
              fontFace: "Arial",
              fontSize: 7.8,
              bold: true,
              color: C.mint,
              align: "center",
              margin: 0,
            });

            d.addText(item, {
              x: 1.35,
              y: yy,
              w: 4.45,
              h: 0.38,
              fontFace: "Arial",
              fontSize: 12,
              color: "E0EFEC",
              margin: 0,
            });
          });

          d.addImage({
            data: assets.next,
            x: 6.35,
            y: 1.4,
            w: 6.05,
            h: 5.05,
          });
        }

        addFooter(d, i + 1, dark);
      });

      await p.writeFile({ fileName: "maki-executive-summary.pptx" });
    } finally {
      setBusy(false);
    }
  }

  const bars = [
    ["Recruiter capacity", c.capacity],
    ["Faster time to hire", c.vacancy],
    ["Total annual benefit", c.annual],
  ] as const;

  const chartMax = Math.max(
    3_000_000,
    Math.ceil(Math.max(c.annual, 1) / 3_000_000) * 3_000_000,
  );

  const chartTicks = [1, 0.75, 0.5, 0.25, 0];

  const nextStep = () => setStep((current) => Math.min(4, current + 1) as StepId);
  const previousStep = () => setStep((current) => Math.max(1, current - 1) as StepId);

  return (
    <article className="bc" ref={root}>
      <style>{css}</style>

      <header className="hero">
        <div className="wrap hgrid">
          <div className="hcopy">
            <p className="eye">01 / BUSINESS CASE BUILDER</p>
            <h1>Pitching Maki to your VP: the ultimate budget justification builder.</h1>
            <p className="deck">
              Turn hiring friction into a clear, executive-ready business case.
              Use real customer results and your own assumptions to estimate the
              impact Maki could deliver for your organisation.
            </p>
            <div className="btns">
              <a className="btn" href="#model">
                Build your business case <Arrow />
              </a>
              <a className="btn ghost" href="#proof">
                See customer results
              </a>
            </div>
 
          </div>

          <div className="dash" aria-hidden="true">
            <div className="heroFrame">
              <img
                className="heroimg"
                src="/images/maki-exec-summary.png"
                alt=""
                width={1200}
                height={800}
              />
            </div>
 
          </div>
        </div>

        <div className="wrap trust">
          <p>TRUSTED BY GLOBAL ENTERPRISES</p>
          <div>
            {trusted.map((brand) => (
              <span key={brand.name}>
                {brand.src ? (
                  <img
                    src={brand.src}
                    alt={brand.name}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  brand.name
                )}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="sec modelSec" id="model">
        <div className="wrap">
          <div className="modelTop" data-r>
            <div className="modelIntro">
              <div className="modelTitleRow">
                <span className="modelNumber">02</span>
                <h2>
                  Model the impact for
                  <br />
                  your organisation.
                </h2>
              </div>
              <p>
                Answer a few questions about your current hiring process. We’ll
                estimate the time, cost and capacity gains Maki could deliver.
              </p>
            </div>

          </div>

          <div className="calculator" data-r>
            <nav className="stepRail" aria-label="Business case steps">
              <div className="stepTrack" aria-hidden="true" />
              {steps.map((item) => {
                const isActive = step === item.id;
                const isDone = step > item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`railStep ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                    onClick={() => setStep(item.id)}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span className="railNumber">
                      {isDone ? <Tick /> : item.id}
                    </span>
                    <span className="railCopy">
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="stepCard" aria-live="polite">
              <div className="stepCardTop">
                <p>STEP {step} OF 4</p>
                <div className="stepProgress" aria-hidden="true">
                  <i style={{ width: `${step * 25}%` }} />
                </div>
               </div>

              <div className="stepCardBody">
                <div className="stepMain">

              {step === 1 && (
                <div className="stepPanel" key="step-1">
                  <div className="stepHeading">
                    <h3>Hiring volume</h3>
                    <p>Start with a few key numbers about your current hiring.</p>
                  </div>

                 <div className="fieldStack">
  <Field
    icon="hires"
    label="Annual applications"
    help="The total number of completed applications received for roles in scope over a 12-month period. Use your ATS total and exclude job views, abandoned applications and obvious duplicates."
    value={apps}
    set={setApps}
  />

  <Field
    icon="people"
    label="Annual hires"
    help="The total number of candidates hired into roles in scope over the same 12-month period. Use accepted offers or employee starts, whichever your organisation reports most consistently."
    value={hires}
    set={setHires}
  />

  <Field
    icon="globe"
    label="Markets / business units"
    help="The number of distinct countries, regions or business units included in the hiring model. Count separate hiring operations where process, ownership, language or assessment requirements materially differ."
    value={units}
    set={setUnits}
  />
</div>

                  <div className="stepInsight">
                    <Icon name="spark" />
                    <p>
                      These numbers help us estimate the scale of hiring activity
                      Maki can support across your organisation.
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="stepPanel" key="step-2">
                  <div className="stepHeading">
                    <h3>Recruiter effort</h3>
                    <p>Now quantify the work tied up in screening and open roles.</p>
                  </div>

                 <div className="fieldStack">
  <Field
    icon="clock"
    label="Screening minutes per applicant"
    help="The average recruiter time spent reviewing and deciding whether one applicant should progress past the initial screening stage. Include CV review, basic eligibility checks and first-screen admin, but exclude interviews."
    value={mins}
    set={setMins}
    suffix="mins"
  />

  <Field
    icon="money"
    label="Loaded recruiter cost per hour"
    help="The estimated hourly cost of the recruiter time used for screening. Include salary, employer costs and relevant overhead, then divide the annual loaded cost by productive working hours."
    value={rate}
    set={setRate}
    prefix="£"
  />

  <Field
    icon="calendar"
    label="Current time-to-hire"
    help="The average number of calendar days it takes to fill a role, measured from the role opening to an accepted offer. Use your ATS average for the same roles and 12-month period used elsewhere in the model."
    value={days}
    set={setDays}
    suffix="days"
  />
</div>

                  <div className="stepInsight">
                    <Icon name="clock" />
                    <p>
                      We use these inputs to model recruiter capacity and the cost
                      of roles staying vacant for longer.
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="stepPanel" key="step-3">
                  <div className="stepHeading">
                    <h3>Cost impact</h3>
                    <p>Put a value on attrition, vacancy time and the investment.</p>
                  </div>
<div className="fieldStack">
  <Field
    icon="trend"
    label="Early attrition rate"
    help="The percentage of new hires who leave within your organisation’s defined early-tenure period, such as the first 90 days, six months or first year. Use the same definition and reporting window your HR or Finance team already tracks."
    value={attr}
    set={setAttr}
    suffix="%"
    max={100}
  />

  <Field
    icon="refresh"
    label="Replacement cost per failed hire"
    help="The average cost of replacing a new hire who leaves during the early-tenure period. Include repeat recruitment, onboarding and training costs, plus any external agency or assessment spend you normally attribute to replacement."
    value={replace}
    set={setReplace}
    prefix="£"
  />

  <Field
    icon="coins"
    label="Cost of a vacant role per day"
    help="The estimated business cost for each day a role remains unfilled. This can include lost productivity, overtime, contractor cover or delayed revenue; use a figure your Finance team can reasonably defend."
    value={vac}
    set={setVac}
    prefix="£"
  />

  <Field
    icon="spark"
    label="Annual Maki cost (optional)"
    help="The expected annual cost of Maki for the roles, markets or business units included in this model. Add your quoted or budgeted annual cost to calculate the net three-year benefit after platform spend."
    value={cost}
    set={setCost}
    prefix="£"
  />
</div>
                </div>
              )}

              {step === 4 && (
                <div className="stepPanel reviewPanel" key="step-4">
                  <div className="stepHeading">
                    <h3>Review your model</h3>
                    <p>Check the assumptions before using the numbers internally.</p>
                  </div>

                  <div className="reviewGroups">
                    <div className="reviewGroup">
                      <p>Hiring volume</p>
                      <ReviewLine
                        label="Annual applications"
                        value={num(apps)}
                        onEdit={() => setStep(1)}
                      />
                      <ReviewLine
                        label="Annual hires"
                        value={num(hires)}
                        onEdit={() => setStep(1)}
                      />
                      <ReviewLine
                        label="Markets / business units"
                        value={num(units)}
                        onEdit={() => setStep(1)}
                      />
                    </div>

                    <div className="reviewGroup">
                      <p>Recruiter effort</p>
                      <ReviewLine
                        label="Screening"
                        value={`${num(mins)} mins / applicant`}
                        onEdit={() => setStep(2)}
                      />
                      <ReviewLine
                        label="Recruiter cost"
                        value={`${gbp(rate)} / hour`}
                        onEdit={() => setStep(2)}
                      />
                      <ReviewLine
                        label="Time-to-hire"
                        value={`${num(days)} days`}
                        onEdit={() => setStep(2)}
                      />
                    </div>

                    <div className="reviewGroup">
                      <p>Cost impact</p>
                      <ReviewLine
                        label="Early attrition"
                        value={`${num(attr)}%`}
                        onEdit={() => setStep(3)}
                      />
                      <ReviewLine
                        label="Replacement cost"
                        value={gbp(replace)}
                        onEdit={() => setStep(3)}
                      />
                      <ReviewLine
                        label="Vacant role / day"
                        value={gbp(vac)}
                        onEdit={() => setStep(3)}
                      />
                    </div>
                  </div>
                </div>
              )}
                </div>

                <aside className="quickTips">
                  <div>
                    <div className="quickTipsHead">
                      <span>QUICK TIPS</span>
                      <h4>Build A Defensible Model</h4>
                    </div>

                    <div className="tipList">
                      {stepTips[step].map((tip, i) => (
                        <div className="tipItem" key={tip.title}>
                          <span className="tipNum">0{i + 1}</span>
                          <div>
                            <strong>{tip.title}</strong>
                            <p>{tip.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="quickTipsFooter">
                    <div className="stepActions">
                      {step > 1 ? (
                        <button
                          className="backBtn"
                          type="button"
                          onClick={previousStep}
                        >
                          ← Back
                        </button>
                      ) : (
                        <span />
                      )}

                      {step < 4 ? (
                        <button
                          className="nextBtn"
                          type="button"
                          onClick={nextStep}
                        >
                          Next: {steps[step].title} <Arrow />
                        </button>
                      ) : (
                        <a className="nextBtn" href="#proof">
                          Use this model <Arrow />
                        </a>
                      )}
                    </div>

                    <span className="stepCount">
                      Step {step} of 4
                    </span>
                  </div>
                </aside>
              </div>
            </div>




<aside className="impactPanel">
  <div className="impactHead">
    <div>
      <h3>Your potential impact</h3>
      <p>
        Based on your inputs, here’s what Maki could deliver for your organisation.
      </p>
    </div>

    <div className="seg" role="group" aria-label="Impact scenario">
      {(Object.keys(SCN) as Scn[]).map((key) => (
        <button
          key={key}
          type="button"
          aria-pressed={scn === key}
          onClick={() => setScn(key)}
        >
          {SCN[key].label}
        </button>
      ))}
    </div>
  </div>

  <div className="kpis">
    <div className="kpi">
      <span className="kpiLabel">
        Recruiter hours saved
        <span className="tipIcon" tabIndex={0} role="button" aria-label="How recruiter hours saved is calculated">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 7.5v.01" />
          </svg>
      <span className="tipBubble" role="tooltip">
  Estimated recruiter capacity returned each year. Calculated as {num(apps)} applications × {mins} minutes of screening ÷ 60, then reduced by {s.screen}% under the {s.label} scenario.
</span>
        </span>
      </span>

      <b className="kpiValue">
        {num(c.hours)}
      </b>

      <p className="kpiDescription">
        Recruiter hours saved
        <br />
        per year.
      </p>
    </div>

    <div className="kpi">
      <span className="kpiLabel">
        Vacancy capacity created
        <span className="tipIcon" tabIndex={0} role="button" aria-label="How vacancy capacity created is calculated">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 7.5v.01" />
          </svg>
   <span className="tipBubble" role="tooltip">
  Estimated value created by filling roles sooner. Calculated as {num(hires)} hires × {Math.round(c.daysSaved)} fewer vacant days × {gbp(vac)} per vacant day. This represents business capacity created, not guaranteed cash savings.
</span>
        </span>
      </span>

      <b className="kpiValue">
        {gbp(c.vacancy)}
      </b>

      <p className="kpiDescription">
        Vacancy capacity created
        <br />
        per year.
      </p>
    </div>

    <div className="kpi">
      <span className="kpiLabel">
        Faster time-to-hire
        <span className="tipIcon" tabIndex={0} role="button" aria-label="How faster time-to-hire is calculated">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 7.5v.01" />
          </svg>
     <span className="tipBubble" role="tooltip">
  Estimated reduction in your hiring cycle. The {s.label} scenario applies a {s.time}% improvement to your current {num(days)}-day time-to-hire, reducing it to about {num(Math.round(c.after))} days.
</span>
        </span>
      </span>

      <b className="kpiValue">
        {days ? Math.round((c.daysSaved / days) * 100) : 0}%
      </b>

      <p className="kpiDescription">
        Faster time-to-hire
        <br />
        <span>
          {num(days)} → {num(Math.round(c.after))} days.
        </span>
      </p>
    </div>

    <div className="kpi hi">
      <span className="kpiLabel">
        {cost > 0 ? "Net estimated benefit" : "Total estimated benefit"}
        <span className="tipIcon" tabIndex={0} role="button" aria-label="How the total estimated benefit is calculated">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 7.5v.01" />
          </svg>
      <span className="tipBubble" role="tooltip">
  {cost > 0
    ? `Three-year estimated benefit from recruiter capacity, fewer vacancy days and reduced early attrition. The annual benefit is multiplied by three, then ${gbp(cost)} of Maki cost per year is deducted across the same period.`
    : `Three-year estimated benefit from recruiter capacity, fewer vacancy days and reduced early attrition. The annual benefit is multiplied by three. Maki cost is not deducted because no annual cost has been entered.`}
</span>
        </span>
      </span>

      <b className="kpiValue">
        {gbp(cost > 0 ? c.net3 : c.three)}
      </b>

      <p className="kpiDescription">
        {cost > 0 ? "Net estimated benefit" : "Total estimated benefit"}
        <br />
        over 3 years.
      </p>
    </div>
  </div>

  <div className="impactChartArea">
    <div className="chartTitleRow">
      <p>Illustrative annual financial impact</p>

      <span
        className="infoDot"
        title="Estimated from the inputs and scenario assumptions above"
      >
        i
      </span>
    </div>

    <div
      className="chartShell"
      role="img"
      aria-label={`Annual impact: recruiter capacity ${gbp(c.capacity)}; faster hiring ${gbp(c.vacancy)}; total ${gbp(c.annual)}, including ${gbp(c.attrition)} in early attrition benefit.`}
    >
      <div className="axis">
        {chartTicks.map((tick) => (
          <span key={tick}>
            {tick === 0 ? "£0" : short(chartMax * tick)}
          </span>
        ))}
      </div>

      <div className="chartPlot">
        <div className="gridLines">
          {chartTicks.map((tick) => (
            <i key={tick} />
          ))}
        </div>

        <div className="chart">
          {bars.map(([label, value], i) => (
            <div
              className="barItem"
              key={label}
              style={
                {
                  "--bar-height": `${(value / chartMax) * 100}%`,
                } as CSSProperties
              }
            >
              <em>{short(value)}</em>

              <i
                className={
                  i === bars.length - 1
                    ? "bar tot"
                    : i === 0
                      ? "bar light"
                      : "bar"
                }
                style={{
                  height: `${(value / chartMax) * 100}%`,
                }}
              />

              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="impactNote">
      <span className="impactNoteMark" aria-hidden="true" />

      <p>
        Conservative and Base discount Maki&apos;s published averages
        (45% faster hiring, 50% lower turnover). Ambitious mirrors
        them. Savings are annual, flat for three years, and exclude
        implementation effort.
      </p>
    </div>
  </div>
</aside>


          </div>
        </div>
      </section>

      <section className="sec proofSec" id="proof">
        <div className="wrap">
          <div className="sectionEyebrow" data-r>
            <span>03</span>
            <i />
            CUSTOMER EVIDENCE
          </div>

          <div className="shead split proofHead" data-r>
            <div>
              <h2>Use evidence your VP can actually point to.</h2>
              <p>
                These results are published by Maki about real customers. Select
                the examples most relevant to your case and they’ll be pulled
                into the executive summary.
              </p>
            </div>
            <a className="tl" href={customersHref} target="_blank" rel="noreferrer">
              Explore all customer stories <Arrow />
            </a>
          </div>

          <div className="proofGrid">
            {proof.map((item) => {
              const selected = picked.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`proofCard ${selected ? "selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => toggle(setPicked, item.id)}
                  data-r
                >
                  <div className="proofCardTop">
                    <span className="proofCompany">{item.name}</span>
                    <span className="selectMark">
                      <Tick />
                    </span>
                  </div>

                  <div className="proofPrimary">
                    <strong>{item.stat}</strong>
                    <p>{item.line}</p>
                  </div>

                  <div className="proofDivider" />

                  <div className="proofSecondary">
                    <strong>{item.stat2}</strong>
                    <p>{item.line2}</p>
                  </div>

                  <span className="includeLabel">
                    {selected ? "Included in summary" : "Add to summary"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec storySec">
        <div className="wrap storyLayout">
          <div className="storyIntro" data-r>
            <div className="sectionEyebrow lightEye">
              <span>04</span>
              <i />
              EXECUTIVE NARRATIVE
            </div>
            <h2>Turn the model into a four-part decision story.</h2>
            <p>
              The numbers matter, but the internal pitch still needs a clean
              sequence: what is happening now, what changes, what it is worth,
              and what you want approved.
            </p>
            <button className="btn out" type="button" onClick={copy}>
              {copied ? "Copied to clipboard" : "Copy executive summary"}
              <Arrow />
            </button>
          </div>

          <ol className="storySteps">
            {[
              {
                kicker: "Current state",
                title: "Make the hiring friction visible.",
                body: `${num(apps)} applications a year, ${mins} minutes of screening each, ${days} days to hire and ${attr}% early attrition.`,
                metric: `${num(apps)} applications`,
              },
              {
                kicker: "Opportunity",
                title: "Show exactly what changes with Maki.",
                body: "Automate high-volume screening, standardise assessment and give recruiters structured evidence earlier in the process.",
                metric: `${num(c.hours)} hours returned`,
              },
              {
                kicker: "Commercial impact",
                title: "Translate the change into money and time.",
                body: `In the ${s.label.toLowerCase()} scenario, the model estimates ${gbp(c.annual)} of annual benefit and a ${Math.round(c.daysSaved)}-day reduction in time-to-hire.`,
                metric: gbp(c.annual),
              },
              {
                kicker: "The ask",
                title: "Make the next decision feel low-risk.",
                body: "Approve a focused pilot, agree the success measures before launch, then use the results to replace the illustrative assumptions with your own evidence.",
                metric: "Pilot → proof → rollout",
              },
            ].map((item, i) => (
              <li key={item.kicker} data-r>
                <span className="storyNum">0{i + 1}</span>
                <div className="storyBody">
                  <p className="storyKicker">{item.kicker}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <strong className="storyMetric">{item.metric}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>


      <section className="sec summarySec">
        <div className="wrap">
          <div className="sectionEyebrow" data-r>
            <span>05</span>
            <i />
            EXECUTIVE SUMMARY
          </div>

          <div className="summaryHead" data-r>
            <h2>Finish with a deck you can actually send.</h2>
            <p>
              Your inputs, scenario and selected customer evidence are turned into
              a six-slide executive summary. Edit the slide titles here, then
              generate the native PowerPoint when you&apos;re ready.
            </p>
          </div>

          <div className="deckWrap" data-r>
            <div
              className="deckThumbs"
              role="tablist"
              aria-label="Executive summary slides"
            >
              {slides.map((x, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  className="deckThumb"
                  onClick={() => setActive(i)}
                >
                  <span className="thumbNum">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="thumbCard">
                    <img src={x.visual} alt="" aria-hidden="true" />
                    <span className="thumbShade" />
                    <span className="thumbMeta">
                      <small>{x.kicker}</small>
                      <b>{titles[i] ?? x.title}</b>
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="deckStage">
              <div className="deckFrame">
                <div className={`deckSlide slide-${sl.layout}`}>
                  <div className="dsTop">
                    <img
                      className="dsLogo"
                      src={deckAssets.logo}
                      alt="Maki"
                    />

                    <div className="dsTopRight">
                      <span>Confidential · Illustrative</span>
                      <span>{active + 1} / {slides.length}</span>
                    </div>
                  </div>

                  <div className="dsBody">
                    <div className="dsMain">
                      <span className="dsKicker">{sl.kicker}</span>

                      <textarea
                        aria-label="Slide title"
                        rows={2}
                        value={titles[active] ?? sl.title}
                        onChange={(e) =>
                          setTitles({ ...titles, [active]: e.target.value })
                        }
                      />

                      {sl.sub && !sl.big && (
                        <p className="dsSub">
                          {sl.sub}
                        </p>
                      )}

                      {sl.layout === "current" && (
                        <p className="dsLead">
                          Hiring isn&apos;t just recruitment fees. It&apos;s team time, slow time to fill and the cost of lost productivity.
                        </p>
                      )}

                      {sl.big && sl.layout !== "current" && (
                        <div className="dsBig">
                          <strong>{sl.big}</strong>
                          {sl.sub && <span>{sl.sub}</span>}
                        </div>
                      )}

                      {sl.layout === "current" ? null : sl.layout === "proof" && chosen.length > 0 ? (
                        <div className="dsProof">
                          {chosen.slice(0, 3).map((item) => (
                            <div className="dsProofRow" key={item.id}>
                              <span>{item.name}</span>
                              <strong>{item.stat}</strong>
                              <small>{item.line}</small>
                            </div>
                          ))}
                        </div>
                      ) : sl.layout === "risks" ? (
                        <div className="dsRiskList">
                          {sl.bullets.map((bullet, index) => {
                            const [label, detail] = bullet.split(":");
                            return (
                              <div className="dsRiskRow" key={bullet}>
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <strong>{label}</strong>
                                <p>{detail?.trim()}</p>
                              </div>
                            );
                          })}
                        </div>
                      ) : sl.layout === "next" ? (
                        <div className="dsSteps">
                          {sl.bullets.map((bullet, index) => (
                            <div key={bullet}>
                              <span>{String(index + 1).padStart(2, "0")}</span>
                              <p>{bullet}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="dsList">
                          {sl.bullets.map((bullet) => (
                            <li key={bullet}>
                              <span />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {sl.layout === "current" ? (
                      <div className="dsCards">
                        {[
                          ["clock", "Screening effort", num(Math.round((apps * mins) / 60)), "recruiter hours per year"],
                          ["people", "Hires", num(hires), "across the roles in scope"],
                          ["calendar", "Time to hire", `${num(days)} days`, "from role open to accepted offer"],
                          ["refresh", "Early attrition", `${attr}%`, "of new hires leave early"],
                        ].map(([icon, label, value, note]) => (
                          <div className="dsCard" key={label}>
                            <Icon name={icon as IconName} />
                            <small>{label}</small>
                            <strong>{value}</strong>
                            <p>{note}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="dsVisual" aria-hidden="true">
                        <div className="dsVisualGlow" />
                        <img src={sl.visual} alt="" />
                      </div>
                    )}
                  </div>

                  <div className="dsFoot">
                    <span>
                      {new Date().toLocaleDateString("en-GB", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>

                    <span>Maki · Executive summary</span>

                    <strong>
                      {String(active + 1).padStart(2, "0")}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="deckBar">
                <div className="deckNav">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    disabled={active === 0}
                    onClick={() =>
                      setActive((v) => Math.max(0, v - 1))
                    }
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m15 6-6 6 6 6" />
                    </svg>
                  </button>

                  <span>
                    Slide {active + 1} of {slides.length}
                  </span>

                  <button
                    type="button"
                    aria-label="Next slide"
                    disabled={active === slides.length - 1}
                    onClick={() =>
                      setActive((v) => Math.min(slides.length - 1, v + 1))
                    }
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </button>
                </div>

                <div className="deckActions">
                  <button
                    className="deckBtn primary"
                    type="button"
                    onClick={download}
                    disabled={busy}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
                    </svg>

                    {busy
                      ? "Building your deck…"
                      : "Generate executive summary"}
                  </button>

                  <a
                    className="deckBtn ghost"
                    href={`mailto:?subject=${encodeURIComponent(
                      "Business case: Maki",
                    )}&body=${encodeURIComponent(summary)}`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="6" cy="12" r="2.5" />
                      <circle cx="18" cy="6" r="2.5" />
                      <circle cx="18" cy="18" r="2.5" />
                      <path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" />
                    </svg>

                    Share with Finance
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec faqSec">
        <div className="wrap faqLayout">
          <div className="faqIntro" data-r>
            <div className="sectionEyebrow lightEye">
              <span>06</span>
              <i />
              FAQ
            </div>
            <h2>Questions Finance is likely to ask next.</h2>
            <p>
              Use these as the checks around the model before you circulate it
              internally.
            </p>
            <a className="textAction darkLink" href={demoHref} target="_blank" rel="noreferrer">
              Ask Maki about your rollout <Arrow />
            </a>
          </div>

          <div className="faq" data-r>
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>
                  <span>{question}</span>
                  <i />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap finalCard" data-r>
          <div className="finalCopy">
            <p className="eye">READY TO MAKE YOUR CASE?</p>
            <h2>Take the model into the meeting.</h2>
            <p>
              Replace the placeholders with your own data, choose the scenario
              you can defend, and walk in with an executive summary built around
              the questions Finance will actually ask.
            </p>
            <div className="btns">
              <a className="btn" href="#model">
                Refine the business case <Arrow />
              </a>
              <a className="btn ghost" href={demoHref} target="_blank" rel="noreferrer">
                Request a Maki demo
              </a>
            </div>
          </div>

          <div className="finalImpact">
            <div className="finalImpactTop">
              <span>{s.label} scenario</span>
              <Icon name="chart" />
            </div>
            <strong>{gbp(cost > 0 ? c.net3 : c.three)}</strong>
            <p>{cost > 0 ? "Net estimated benefit" : "Estimated benefit"} over 3 years</p>
            <div className="finalStats">
              <span>
                <b>{num(c.hours)}</b>
                recruiter hours / year
              </span>
              <span>
                <b>{num(Math.round(c.after))} days</b>
                projected time-to-hire
              </span>
            </div>
          </div>
        </div>

        <div className="wrap note">
          <p>
            <b>Portfolio note.</b> An independent concept by GrowUp, not
            published by or affiliated with Maki. Customer results come from
            Maki&apos;s public customers page. Inputs and scenario assumptions are
            illustrative placeholders.
          </p>
          <a href={portfolioHref}>Back to writing portfolio</a>
        </div>
      </section>
    </article>
  );
}

const css = `






.bc{
  --deep:#041b1c;
  --deep-2:#072426;
  --teal:#167273;
  --teal-2:#0d8585;
  --mint:#7fd3d0;
  --mint-soft:#eef8f6;
  --ink:#082b2b;
  --ink-2:#173b38;
  --mute:#5c7672;
  --line:#dfe9e6;
  --line-dark:rgba(127,211,208,.18);
  --shadow:0 18px 50px rgba(6,47,45,.07);
  background:#fff;
  color:var(--ink);
  font-family:Inter,"Helvetica Neue",Arial,sans-serif;
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
}
.bc,.bc *,.bc *:before,.bc *:after{box-sizing:border-box}
.bc :where(h1,h2,h3,p,ul,ol){margin:0;padding:0}
.bc ul,.bc ol{list-style:none}
.bc a{color:inherit;text-decoration:none}
.bc button,.bc input{font-family:inherit}
.bc button{color:inherit}
.bc svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}
.bc .wrap{width:min(1380px,calc(100% - 64px));margin-inline:auto}
.bc h1,.bc h2{font-family:Georgia,"Times New Roman",serif;font-weight:700;letter-spacing:-.047em;text-wrap:balance}
.bc h1{font-size:clamp(42px,5vw,72px);line-height:1.01}
.bc h2{font-size:clamp(34px,3.4vw,52px);line-height:1.04}
.bc h3{letter-spacing:-.025em}
.bc a:focus-visible,.bc button:focus-visible,.bc input:focus-visible,.bc summary:focus-visible{outline:3px solid var(--mint);outline-offset:3px}
.bc .eye{font-size:11px;font-weight:800;letter-spacing:.18em;color:var(--mint)}
.bc .btn{display:inline-flex;align-items:center;justify-content:center;gap:20px;min-height:54px;padding:14px 30px;border:1px solid var(--teal);border-radius:8px;background:var(--teal);color:#fff!important;font:750 14px Inter,Arial,sans-serif;letter-spacing:.02em;cursor:pointer;transition:transform .2s ease,background .2s ease,border-color .2s ease,box-shadow .2s ease}
.bc .btn:hover{background:#1b8586;border-color:#1b8586;transform:translateY(-2px);box-shadow:0 10px 24px rgba(22,114,115,.2)}
.bc .btn:disabled{opacity:.58;cursor:wait;transform:none;box-shadow:none}
.bc .btn.ghost{background:transparent;border-color:rgba(255,255,255,.3)}
.bc .btn.ghost:hover{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.5)}
.bc .btn.out{background:#fff;color:var(--teal)!important;border-color:#cfe0dc;box-shadow:none}
.bc .btn.out:hover{background:#f7fbfa;border-color:var(--teal)}
.bc .btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
.bc .tl,.bc .textAction{display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:750;color:var(--mint)}
.bc .tl:hover,.bc .textAction:hover{gap:13px}
.bc .tl,.bc .textAction{transition:gap .2s ease}

/* HERO */
.bc .hero{position:relative;overflow:hidden;padding:118px 0 0;color:#fff;background:#041b1c}
.bc .hgrid{position:relative;z-index:1;display:grid;grid-template-columns:.92fr 1.08fr;gap:68px;align-items:center}
.bc .hcopy{max-width:660px;padding-bottom:38px}
.bc .hcopy h1{padding-top:18px}
.bc .deck{max-width:620px;margin-top:22px;color:#cae2df;font-size:18px;line-height:1.75;letter-spacing:.01em}
.bc .hcopy>*{animation:rise .8s cubic-bezier(.22,1,.36,1) both}
.bc .hcopy>:nth-child(2){animation-delay:.08s}.bc .hcopy>:nth-child(3){animation-delay:.16s}.bc .hcopy>:nth-child(4){animation-delay:.24s}.bc .hcopy>:nth-child(5){animation-delay:.32s}
@keyframes rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.bc .heroMicro{display:flex;flex-wrap:wrap;gap:12px 18px;margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,.12);color:#9fc2bf;font-size:11px}
.bc .heroMicro span{display:flex;align-items:center;gap:7px}.bc .heroMicro svg{width:13px;height:13px;color:var(--mint)}
.bc .dash{position:relative;min-width:0;padding:32px 0 56px}
   
   .bc .heroimg{display:block;width:100%;height:auto;border-radius:11px;object-fit:contain}
  
 .bc .trust{position:relative;z-index:1;padding:32px 0 38px; margin-top: -10px; border-top:1px solid rgba(255,255,255,.08)}
.bc .trust p{font-size:10px;font-weight:800;letter-spacing:.18em;color:#7da9a6}
.bc .trust div{display:grid;grid-template-columns:repeat(6,1fr);gap:22px;margin-top:17px}
.bc .trust span{display:flex;align-items:center;height:30px;font-size:17px;font-weight:750;letter-spacing:-.025em;color:#dbecea;opacity:.86}
.bc .trust img{display:block;height:26px;width:auto;max-width:160px;object-fit:contain;filter:brightness(0) invert(1)}

/* SHARED SECTION */
.bc .sec{padding:clamp(72px,7vw,108px) 0}
.bc .shead{max-width:780px}.bc .shead p{margin-top:14px;color:var(--mute);font-size:15px;line-height:1.7}
.bc .shead.split{max-width:none;display:flex;justify-content:space-between;align-items:flex-end;gap:34px}.bc .shead.split>div{max-width:760px}
.bc .sectionEyebrow{display:flex;align-items:center;gap:12px;margin-bottom:20px;color:var(--mint);font-size:10px;font-weight:800;letter-spacing:.17em}
.bc .sectionEyebrow span{display:grid;place-items:center;width:32px;height:32px;border:1px solid rgba(127,211,208,.25);border-radius:8px;background:rgba(127,211,208,.07);color:var(--mint);font-size:12px;letter-spacing:0}
.bc .sectionEyebrow i{display:block;width:30px;height:1px;background:rgba(127,211,208,.35)}
.bc .lightEye{color:var(--teal)}.bc .lightEye span{border-color:#d8ebe8;background:#eff8f6;color:var(--teal)}.bc .lightEye i{background:#c6dfdb}

/* PROOF */
.bc .proofSec{position:relative;overflow:hidden;color:#fff;background:radial-gradient(ellipse at 10% 100%,rgba(22,114,115,.35),transparent 50%),var(--deep)}
.bc .proofSec:after{content:"";position:absolute;inset:auto -180px -260px auto;width:620px;height:620px;border:1px solid rgba(127,211,208,.08);border-radius:50%;box-shadow:0 0 0 85px rgba(127,211,208,.018),0 0 0 170px rgba(127,211,208,.012)}
.bc .proofSec .wrap{position:relative;z-index:1}.bc .proofHead h2{max-width:760px}.bc .proofHead p{color:#abc9c6}.bc .proofGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:38px}
.bc .proofCard{position:relative;min-height:330px;padding:22px;border:1px solid rgba(127,211,208,.18);border-radius:12px;background:rgba(255,255,255,.045);color:#fff;text-align:left;cursor:pointer;transition:.22s ease;backdrop-filter:blur(4px)}.bc .proofCard:hover{transform:translateY(-3px);border-color:rgba(127,211,208,.36);background:rgba(255,255,255,.065)}.bc .proofCard.selected{border-color:rgba(127,211,208,.58);background:linear-gradient(180deg,rgba(22,114,115,.2),rgba(255,255,255,.045));box-shadow:inset 0 0 0 1px rgba(127,211,208,.08)}
.bc .proofCardTop{display:flex;align-items:center;justify-content:space-between;gap:12px}.bc .proofCompany{font-size:12px;font-weight:800;color:#d9ecea}.bc .selectMark{display:grid;place-items:center;width:24px;height:24px;border:1px solid rgba(127,211,208,.35);border-radius:50%;color:transparent}.bc .selected .selectMark{background:var(--teal);border-color:var(--teal);color:#fff}.bc .selectMark svg{width:12px;height:12px}
.bc .proofPrimary{margin-top:34px}.bc .proofPrimary strong{display:block;font-family:Georgia,"Times New Roman",serif;color:#fff;font-size:30px;line-height:1.04;letter-spacing:-.035em}.bc .proofPrimary p,.bc .proofSecondary p{margin-top:6px;color:#9fbfbc;font-size:11px;line-height:1.45}.bc .proofDivider{height:1px;margin:25px 0 18px;background:rgba(127,211,208,.14)}.bc .proofSecondary strong{color:var(--mint);font-size:20px;line-height:1.1}.bc .includeLabel{position:absolute;left:22px;bottom:18px;color:#7fa8a4;font-size:9px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.bc .selected .includeLabel{color:var(--mint)}

/* STORY */
.bc .storySec{background:#fff}.bc .storyLayout{display:grid;grid-template-columns:.72fr 1.28fr;gap:78px;align-items:start}.bc .storyIntro{position:sticky;top:32px}.bc .storyIntro h2{max-width:540px}.bc .storyIntro>p{max-width:520px;margin-top:16px;color:var(--mute);font-size:14px;line-height:1.7}.bc .storyIntro .btn{margin-top:28px}
.bc .storySteps{border-top:1px solid var(--line)}.bc .storySteps li{display:grid;grid-template-columns:50px minmax(0,1fr) 160px;gap:22px;align-items:start;padding:27px 0;border-bottom:1px solid var(--line)}.bc .storyNum{color:#8ca39f;font-size:11px;font-weight:800;letter-spacing:.06em}.bc .storyKicker{color:var(--teal)!important;font-size:9px!important;font-weight:850!important;letter-spacing:.12em;text-transform:uppercase}.bc .storyBody h3{margin-top:6px;color:#193b38;font-size:18px;line-height:1.25}.bc .storyBody>p:last-child{margin-top:8px;color:#687f7b;font-size:12px;line-height:1.6}.bc .storyMetric{align-self:center;color:#0e6564;font-family:Georgia,"Times New Roman",serif;font-size:18px;line-height:1.2;text-align:right}

/* SUMMARY */
.bc .summarySec{position:relative;overflow:hidden;color:#fff;background:radial-gradient(ellipse at 80% 10%,rgba(22,114,115,.3),transparent 45%),var(--deep)}
.bc .summaryHead{max-width:760px}.bc .summaryHead p{color:#a9c9c6}.bc .egrid{display:grid;grid-template-columns:1.08fr .92fr;gap:26px;align-items:start;margin-top:38px}
.bc .prev{padding:17px;border:1px solid rgba(127,211,208,.18);border-radius:13px;background:rgba(255,255,255,.035)}
.bc .previewTop{display:flex;justify-content:space-between;gap:18px;align-items:center;margin-bottom:14px}.bc .previewTop>div:first-child span{display:block;color:var(--mint);font-size:8px;font-weight:850;letter-spacing:.14em}.bc .previewTop>div:first-child p{margin-top:3px;color:#8fb1ae;font-size:9px}
.bc .tabs{display:flex;gap:6px}.bc .tabs button{display:grid;place-items:center;width:30px;height:30px;border:1px solid rgba(127,211,208,.24);border-radius:6px;background:transparent;color:#b4cecb;font-size:10px;font-weight:800;cursor:pointer}.bc .tabs button:hover{border-color:rgba(127,211,208,.5)}.bc .tabs [aria-selected=true]{background:var(--teal);border-color:var(--teal);color:#fff}
.bc .slide{position:relative;min-height:390px;padding:30px 32px 38px;border-radius:9px;background:#fff;color:var(--ink);overflow:hidden}.bc .slide:after{content:"";position:absolute;right:-90px;bottom:-130px;width:280px;height:280px;border-radius:50%;border:1px solid #e3efec;box-shadow:0 0 0 54px #f8fbfa,0 0 0 108px #fbfdfc;pointer-events:none}.bc .slideDark{background:linear-gradient(140deg,#062527,#041b1c);color:#fff}.bc .slideDark:after{border-color:rgba(127,211,208,.1);box-shadow:0 0 0 54px rgba(127,211,208,.025),0 0 0 108px rgba(127,211,208,.015)}
.bc .slideBrandRow{position:relative;z-index:1;display:flex;justify-content:space-between;gap:14px}.bc .brand{color:var(--teal);font-size:9px;font-weight:850;letter-spacing:.08em}.bc .slideDark .brand{color:var(--mint)}.bc .slideBrandRow>span{padding:4px 7px;border-radius:5px;background:#edf7f5;color:var(--teal);font-size:8px;font-weight:800}.bc .slideDark .slideBrandRow>span{background:rgba(127,211,208,.09);color:var(--mint)}
.bc .slide input{position:relative;z-index:1;width:92%;margin:18px 0 20px;padding:3px 0 7px;border:0;border-bottom:1px dashed #bfd2ce;outline:0;background:none;color:inherit;font:700 clamp(22px,2.5vw,34px) Georgia,"Times New Roman",serif;line-height:1.08;letter-spacing:-.04em}.bc .slideDark input{border-bottom-color:rgba(127,211,208,.28)}
.bc .sbig{position:relative;z-index:1;color:var(--teal);font-size:clamp(38px,4vw,58px);font-weight:800;letter-spacing:-.05em;line-height:1}.bc .slideDark .sbig{color:var(--mint)}.bc .sbig small{display:block;margin-top:7px;color:#6b817d;font:500 11px Inter,Arial,sans-serif;letter-spacing:0}.bc .slideDark .sbig small{color:#9fc0bd}.bc .ssub{position:relative;z-index:1;color:var(--teal);font-size:12px;font-weight:700}.bc .slideDark .ssub{color:var(--mint)}
.bc .slide ul{position:relative;z-index:1;display:grid;gap:9px;max-width:76%;margin-top:18px;color:#496762;font-size:11px}.bc .slideDark ul{color:#bed6d3}.bc .slide li{position:relative;padding-left:17px}.bc .slide li:before{content:"";position:absolute;left:0;top:.6em;width:6px;height:6px;border-radius:50%;background:var(--teal)}.bc .slideDark li:before{background:var(--mint)}
.bc .slideFooter{position:absolute;z-index:1;left:32px;right:32px;bottom:18px;display:flex;justify-content:space-between;padding-top:10px;border-top:1px solid #edf2f0;color:#8da09d;font-size:8px}.bc .slideDark .slideFooter{border-color:rgba(127,211,208,.14);color:#7da39f}
.bc .incl{padding:30px;border:1px solid rgba(127,211,208,.18);border-radius:13px;background:linear-gradient(160deg,rgba(255,255,255,.055),rgba(255,255,255,.028))}.bc .inclEye{color:var(--mint);font-size:8px;font-weight:850;letter-spacing:.15em}.bc .incl h3{max-width:430px;margin-top:10px;font-family:Georgia,"Times New Roman",serif;font-size:25px;line-height:1.18}.bc .incl ul{display:grid;gap:12px;margin:24px 0}.bc .incl li{display:flex;gap:11px;align-items:center;color:#c5dbd8;font-size:11px}.bc .tickCircle{display:grid;place-items:center;width:22px;height:22px;flex:0 0 22px;border-radius:50%;background:rgba(127,211,208,.08);color:var(--mint)}.bc .tickCircle svg{width:12px;height:12px}
.bc .summaryValue{padding:18px;border-top:1px solid rgba(127,211,208,.14);border-bottom:1px solid rgba(127,211,208,.14);background:rgba(0,0,0,.06)}.bc .summaryValue span{display:block;color:#88aaa6;font-size:9px}.bc .summaryValue strong{display:block;margin-top:5px;color:#fff;font-family:Georgia,"Times New Roman",serif;font-size:34px;line-height:1.05;letter-spacing:-.04em}.bc .summaryValue small{display:block;margin-top:5px;color:#7fa6a2;font-size:8px}
.bc .summaryActions{display:grid;gap:13px;margin-top:22px}.bc .summaryActions .btn{width:100%}.bc .summaryActions .textAction{justify-content:center;color:var(--mint)}.bc .downloadNote{display:block;margin-top:15px;color:#769b97;font-size:8px;line-height:1.45}

/* FAQ */
.bc .faqSec{background:#fff}.bc .faqLayout{display:grid;grid-template-columns:.72fr 1.28fr;gap:82px;align-items:start}.bc .faqIntro{position:sticky;top:32px}.bc .faqIntro h2{max-width:500px}.bc .faqIntro>p{max-width:430px;margin-top:16px;color:var(--mute);font-size:14px;line-height:1.7}.bc .darkLink{margin-top:24px;color:var(--teal)}
.bc .faq{border-top:1px solid var(--line)}.bc details{border-bottom:1px solid var(--line)}.bc summary{display:flex;justify-content:space-between;gap:24px;align-items:center;padding:23px 3px;color:#1f403d;font-size:14px;font-weight:750;cursor:pointer;list-style:none}.bc summary::-webkit-details-marker{display:none}.bc summary i{position:relative;width:28px;height:28px;flex:0 0 28px;border:1px solid #d5e4e0;border-radius:50%}.bc summary i:before,.bc summary i:after{content:"";position:absolute;left:50%;top:50%;width:9px;height:1px;background:var(--teal);transform:translate(-50%,-50%)}.bc summary i:after{transform:translate(-50%,-50%) rotate(90deg);transition:transform .2s}.bc details[open] summary i:after{transform:translate(-50%,-50%) rotate(0)}.bc details p{max-width:760px;padding:0 48px 24px 3px;color:#667f7a;font-size:12px;line-height:1.7}

/* FINAL */
.bc .final{position:relative;overflow:hidden;padding:86px 0 34px;color:#fff;background:linear-gradient(135deg,#031819,#062629)}
.bc .final:before{content:"";position:absolute;width:540px;height:540px;right:-140px;top:-260px;border-radius:50%;border:1px solid rgba(127,211,208,.1);box-shadow:0 0 0 80px rgba(127,211,208,.02),0 0 0 160px rgba(127,211,208,.014)}
.bc .finalCard{position:relative;z-index:1;display:grid;grid-template-columns:1.05fr .95fr;gap:72px;align-items:center;padding:46px;border:1px solid rgba(127,211,208,.16);border-radius:18px;background:rgba(255,255,255,.035)}
.bc .finalCopy h2{margin-top:12px}.bc .finalCopy>p:not(.eye){max-width:600px;margin-top:16px;color:#b7d0cd;font-size:14px;line-height:1.7}
.bc .finalImpact{padding:28px;border-radius:14px;background:#f7fbfa;color:var(--ink);box-shadow:0 28px 60px rgba(0,0,0,.22)}.bc .finalImpactTop{display:flex;justify-content:space-between;align-items:center;gap:12px}.bc .finalImpactTop>span{padding:5px 8px;border-radius:5px;background:#eaf6f4;color:var(--teal);font-size:9px;font-weight:800}.bc .finalImpactTop .mi{width:36px;height:36px;border-radius:50%}.bc .finalImpact>strong{display:block;margin-top:20px;color:#0b7272;font-family:Georgia,"Times New Roman",serif;font-size:42px;line-height:1;letter-spacing:-.05em}.bc .finalImpact>p{margin-top:7px!important;color:#5c7672!important;font-size:11px!important}.bc .finalStats{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:24px;padding-top:18px;border-top:1px solid #dde9e6}.bc .finalStats span{color:#6b827e;font-size:9px;line-height:1.45}.bc .finalStats b{display:block;color:#173b38;font-size:13px}
.bc .note{position:relative;z-index:1;display:flex;justify-content:space-between;gap:24px;margin-top:46px;padding-top:20px;border-top:1px solid rgba(255,255,255,.11);color:#7fa4a0;font-size:9px}.bc .note p{max-width:820px}.bc .note a{color:#d6e9e7;font-weight:700;white-space:nowrap}

/* REVEAL */
.bc [data-r]{opacity:0;transform:translateY(18px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}.bc [data-r].in{opacity:1;transform:none}

@media(max-width:1280px){




}
@media(max-width:1080px){
  .bc .hgrid,.bc .storyLayout,.bc .egrid,.bc .faqLayout,.bc .finalCard{grid-template-columns:1fr}
  .bc .dash{max-width:760px}.bc .heroFloatA{left:10px}.bc .heroFloatB{right:10px}
  .bc .trust div{grid-template-columns:repeat(3,1fr)}
  .bc .modelTop{grid-template-columns:1fr;gap:24px;align-items:start}

  .bc .proofGrid{grid-template-columns:1fr 1fr}
  .bc .storyIntro,.bc .faqIntro{position:relative;top:auto}.bc .storySteps li{grid-template-columns:44px minmax(0,1fr) 150px}
}
@media(max-width:760px){
  .bc .wrap{width:calc(100% - 34px)}
  .bc .hero{padding-top:82px}.bc .hcopy{padding-bottom:10px}.bc .heroFloat{display:none}.bc .trust div{grid-template-columns:1fr 1fr;gap:12px}.bc .trust span{font-size:14px}




  .bc .proofGrid{grid-template-columns:1fr}.bc .proofCard{min-height:280px}
  .bc .storySteps li{grid-template-columns:34px 1fr;gap:14px}.bc .storyMetric{grid-column:2;text-align:left;font-size:16px}
  .bc .previewTop{align-items:flex-start;flex-direction:column}.bc .tabs{flex-wrap:wrap}.bc .slide{min-height:420px;padding:24px 20px 38px}.bc .slide ul{max-width:100%}.bc .slideFooter{left:20px;right:20px}
  .bc .finalCard{padding:28px 20px;gap:38px}.bc .finalImpact>strong{font-size:34px}.bc .finalStats{grid-template-columns:1fr}.bc .note{flex-direction:column}
}
@media(max-width:460px){
  .bc h1{font-size:40px}.bc h2{font-size:34px}.bc .heroMicro{display:grid}.bc .trust div{grid-template-columns:1fr 1fr}



}
@media(prefers-reduced-motion:reduce){.bc *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}

/* Calculator: isolated spacing, typography and icon layout. */
.bc .modelSec{background:#fff;padding:88px 0 96px;font-family:Inter,"Helvetica Neue",Arial,sans-serif}
.bc .modelSec .wrap{width:min(1380px,calc(100% - 64px));margin-inline:auto}
.bc .modelTop{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;margin-bottom:36px}
.bc .modelIntro{max-width:740px}
.bc .modelTitleRow{display:flex;align-items:flex-start;gap:20px}
.bc .modelNumber{display:grid;place-items:center;flex:0 0 42px;width:42px;height:42px;margin-top:5px;border-radius:10px;background:#eef7f5;color:#087675;font-size:13px;font-weight:700}
.bc .modelTitleRow h2{font-size:clamp(34px,3.6vw,52px);line-height:1.06;letter-spacing:-.045em}
.bc .modelIntro>p{margin:16px 0 0 62px;max-width:610px;font-size:15px;line-height:1.65;color:#011522}
.bc .scenarioArea{flex:none;width:340px;min-width:0;margin:0;padding:0}
.bc .seg{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;padding:3px;border:1px solid #e3ebe8;border-radius:8px;background:transparent;box-shadow:none}
.bc .seg button{min-height:34px;border:0;border-radius:6px;background:transparent;color:#647674;font:600 12px Inter,Arial,sans-serif;cursor:pointer;padding:0 10px;box-shadow:none;transition:color .2s ease,background .2s ease,box-shadow .2s ease}
.bc .seg button[aria-pressed=true]{background:#087675;border:0;color:#fff;font-weight:600}
.bc .seg button:not([aria-pressed=true]):hover{color:#087675}
.bc .scenarioNote{display:none}
.bc .calculator{display:grid;grid-template-columns:228px minmax(0,1fr);gap:24px;align-items:start}
.bc .modelSec .mi{display:grid;place-items:center;flex:0 0 48px;width:48px;height:48px;margin:0;padding:0;border:0;border-radius:50%;background:#e8f5f2;color:#087c78;line-height:0}
.bc .modelSec .mi svg{display:block;width:24px;height:24px;margin:0;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}
.bc .stepRail{position:relative;display:grid;gap:18px;padding:18px 0;overflow:visible;margin:0}
.bc .stepTrack{position:absolute;top:44px;bottom:66px;left:17px;border-left:1px dashed #caddd9;width:0}
.bc .railStep{position:relative;display:grid;grid-template-columns:36px 44px minmax(0,1fr);align-items:start;gap:10px;width:100%;min-height:91px;padding:8px 0;border:0;background:transparent;text-align:left;cursor:pointer;border-radius:12px;color:#183735}
.bc .railNumber{display:grid;place-items:center;width:34px;height:34px;margin-top:5px;border:1px solid #dce7e5;border-radius:50%;background:#fff;color:#527975;font-size:13px;font-weight:700;z-index:1}
.bc .railNumber svg{width:15px;height:15px}
.bc .railStep.active .railNumber,.bc .railStep.done .railNumber{background:#087675;border-color:#087675;color:white}
.bc .modelSec .railStep>.mi{width:44px;height:44px;display:grid}
.bc .railCopy{padding:4px 4px 0 0}
.bc .railCopy strong{display:block;font-size:13px;line-height:1.35;font-weight:700}
.bc .railCopy small{display:block;margin-top:6px;color:#011522;font-size:12px;line-height:1.55}
.bc .railStep.active .railCopy strong{color:#087675}
.bc .stepCard{min-width:0;min-height:0;padding:28px;border:1px solid #eaeeed;border-radius:12px;background:#fff;box-shadow:0 1px 2px rgba(16,40,36,.03)}
.bc .stepCardTop{display:flex;align-items:center;justify-content:space-between;gap:20px;width:calc(54% - 16px);margin-bottom:18px}
.bc .stepCardTop p{font-size:11px;letter-spacing:.13em;font-weight:750;color:#087675}
.bc .stepProgress{width:116px;height:5px;border-radius:9px;background:#e6ebed;overflow:hidden}
.bc .stepProgress i{display:block;height:100%;border-radius:9px;background:#087675;transition:width .2s}
.bc .stepCardBody{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,1fr);gap:28px;align-items:stretch}
.bc .stepMain,.bc .stepPanel{min-width:0}
.bc .stepHeading{padding:0;margin:0 0 24px;border:0}
.bc .stepHeading h3{font:700 34px/1.15 Georgia,"Times New Roman",serif;letter-spacing:-.04em;color:#152e2e}
.bc .stepHeading p{margin-top:10px;font-size:13px;line-height:1.6;color:#011522}
.bc .fieldStack{display:grid;gap:12px;border:0}
.bc .calcField{display:grid;grid-template-columns:44px minmax(0,1fr) 112px;align-items:center;gap:12px;min-height:98px;margin:0;padding:16px 14px;background:#f5f9f8;border:1px solid transparent;border-radius:15px}
.bc .modelSec .calcField>.mi{width:44px;height:44px}
.bc .fieldCopy{min-width:0}
.bc .fieldLabel{display:block;font-size:13px;line-height:1.4;font-weight:650;color:#243c3b}
.bc .fieldCopy small{display:block;margin-top:5px;font-size:12px;line-height:1.45;color:#011522}
.bc .calcField .infoDot{display:none}
.bc .fieldControl{display:flex;align-items:center;gap:4px;grid-column:auto;width:100%;min-width:0;margin:0;padding:0 10px;min-height:46px;border:1px solid #d5dfdf;border-radius:9px;background:#fff;box-shadow:0 1px 2px #123e3605}
.bc .fieldControl:focus-within{border-color:#087675;box-shadow:0 0 0 3px #08767515}
.bc .fieldControl input{width:100%;min-width:0;padding:10px 0;border:0;outline:none;background:transparent;text-align:right;color:#172e2e;font:650 16px/1.3 Inter,Arial,sans-serif;font-variant-numeric:tabular-nums}
.bc .fieldControl i{font-style:normal;font-size:11px;color:#80918f}
.bc .stepInsight{display:none}
.bc .quickTips{display:flex;flex-direction:column;justify-content:space-between;min-width:0;margin-top:-41px;padding:22px;background:#eff7f5;border:0;border-radius:17px;gap:24px}
.bc .quickTipsHead{display:flex;align-items:center;gap:12px;margin-bottom:18px}
.bc .quickTipsHead span{display:none}
.bc .quickTipsHead h4{font:700 16px/1.3 Inter,Arial,sans-serif;color:#20423e}
.bc .tipList{display:grid;gap:12px}
.bc .tipItem{display:flex;align-items:center;gap:12px;min-height:78px;padding:14px;border:0;border-radius:12px;background:#ffffffd9}
.bc .modelSec .tipItem>.mi{width:38px;height:38px;flex-basis:38px}
.bc .modelSec .tipItem>.mi svg{width:21px;height:21px}
.bc .tipItem p{font-size:12px;line-height:1.65;color:#687b80;margin:0}
.bc .quickTipsFooter{margin:0;padding:0;border:0}
.bc .stepActions{display:flex;flex-direction:column;gap:10px;border:0;padding:0;margin:0}
.bc .stepActions>span:empty{display:none}
.bc .nextBtn{display:flex;align-items:center;justify-content:center;gap:15px;min-height:50px;width:100%;padding:12px 16px;border:0;border-radius:9px;background:#087675;color:#fff;font:600 13px/1.4 Inter,Arial,sans-serif;text-decoration:none;cursor:pointer;order:0;box-shadow:0 3px 8px #08767512}
.bc .nextBtn:hover{background:#056360}
.bc .nextBtn svg{width:19px;height:19px}
.bc .backBtn{order:1;align-self:center;background:none;border:0;padding:5px 12px;color:#557770;font-size:12px;cursor:pointer}
.bc .stepCount{display:block;margin-top:12px;text-align:right;font-size:11px;color:#768a87}
.bc .reviewGroups{display:grid;gap:18px}.bc .reviewGroup>p{font-size:12px;font-weight:750;color:#087675;margin-bottom:6px}
.bc .reviewLine{display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid #e7efec;font-size:12px;color:#6d807c}
.bc .reviewLine strong{color:#243f3b;font-size:12px}.bc .reviewLine button{border:0;background:none;color:#087675;font-size:11px;cursor:pointer}





/* -----------------------------------------
   PREMIUM IMPACT / RESULTS PANEL
----------------------------------------- */

.bc .impactPanel{
  grid-column:1/-1;
  position:relative;
  display:grid;
  grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);
  grid-template-rows:auto 1fr;
  gap:30px 38px;

  margin-top:2px;
  padding:42px 44px 40px;

  border:1px solid #d4e1de;
  border-radius:20px;
  background:#fff;

  box-shadow:
    0 1px 2px rgba(12,54,48,.02),
    0 14px 38px rgba(12,54,48,.025);
}


/* Header */

.bc .impactHead{
  grid-column:1/-1;

  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:30px;

  margin:0;
}

.bc .impactHead h3{
  color:#102d2d;

  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(34px,3vw,44px);
  font-weight:700;
  line-height:1.02;

  letter-spacing:-.045em;
}

.bc .impactHead p{
  max-width:640px;

  margin-top:10px;

  color:#708186;
  font-size:13px;
  line-height:1.6;
}

.bc .impactBadge{
  flex:none;

  display:inline-flex;
  align-items:center;
  justify-content:center;

  min-height:42px;
  margin-top:1px;
  padding:0 17px;

  border-radius:10px;
  background:#eef7f5;

  color:#087675;
  font-size:11px;
  font-weight:750;
  line-height:1;
}


/* KPI grid */

.bc .kpis{
  grid-column:1;
  grid-row:2;

  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:14px;

  margin:0;
}

.bc .kpi{
  position:relative;

  display:flex;
  flex-direction:column;
  justify-content:flex-start;

  min-width:0;
  min-height:214px;

  padding:30px 30px 27px;

  border:1px solid #dbe6e3;
  border-radius:16px;

  background:#fff;

  transition:
    border-color .2s ease,
    box-shadow .2s ease,
    transform .2s ease;
}

.bc .kpi:hover{
  border-color:#c8dbd6;

  box-shadow:
    0 8px 24px rgba(12,54,48,.035);

  transform:translateY(-1px);
}


/* Small uppercase category */

.bc .kpiLabel{
  display:block;

  margin-bottom:20px;

  color:#687d82;

  font-family:Inter,"Helvetica Neue",Arial,sans-serif;
  font-size:10px;
  font-weight:800;
  line-height:1.2;

  letter-spacing:.16em;
  text-transform:uppercase;
}


/* IMPORTANT:
   Same serif treatment as the mockup */
.bc .kpiValue{
  display:block;

  color:#102a2b;

  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(34px,3vw,46px);
  font-weight:700;
  line-height:.98;

  letter-spacing:-.045em;

  font-variant-numeric:lining-nums tabular-nums;

  overflow-wrap:anywhere;
}


/* Bottom description */

.bc .kpiDescription{
  margin-top:17px;

  color:#687c81;

  font-family:Georgia,"Times New Roman",serif;
  font-size:15px;
  font-weight:400;
  line-height:1.38;

  letter-spacing:-.01em;
}

.bc .kpiDescription span{
  color:#819095;
}


/* Highlighted total card */

.bc .kpi.hi{
  border-color:#087675;
  background:#087675;
  box-shadow:none;
}

.bc .kpi.hi:hover{
  border-color:#087675;

  box-shadow:
    0 10px 28px rgba(8,118,117,.10);

  transform:translateY(-1px);
}

.bc .kpi.hi .kpiLabel{
  color:#e9fbf7;
}

.bc .kpi.hi .kpiValue{
  color:#fff;
}

.bc .kpi.hi .kpiDescription{
  color:#fff;
}

.bc .kpi.hi .kpiDescription span{
  color:#d8efeb;
}


/* Right chart area */

.bc .impactChartArea{
  grid-column:2;
  grid-row:2;

  display:flex;
  flex-direction:column;

  min-width:0;
  padding:3px 0 0;
}

.bc .chartTitleRow{
  display:flex;
  align-items:center;
  gap:10px;

  margin:0 0 25px;
}

.bc .chartTitleRow p{
  color:#183333;

  font-family:Georgia,"Times New Roman",serif;
  font-size:16px;
  font-weight:700;
  line-height:1.3;

  letter-spacing:-.02em;
}

.bc .infoDot{
  display:inline-grid;
  place-items:center;

  width:19px;
  height:19px;

  border:1px solid #aebfbd;
  border-radius:50%;

  color:#788d89;

  font-family:Inter,Arial,sans-serif;
  font-size:10px;
  font-weight:700;
  line-height:1;
}


/* Chart */

.bc .chartShell{
  display:grid;
  grid-template-columns:54px minmax(0,1fr);
  gap:12px;

  width:100%;
  height:285px;
}

.bc .axis{
  display:flex;
  flex-direction:column;
  justify-content:space-between;

  padding-bottom:44px;
}

.bc .axis span{
  color:#788c91;

  font-family:Inter,"Helvetica Neue",Arial,sans-serif;
  font-size:10px;
  line-height:1;

  text-align:right;
}

.bc .chartPlot{
  position:relative;
  min-width:0;
}

.bc .gridLines{
  position:absolute;
  inset:0 0 44px;

  display:flex;
  flex-direction:column;
  justify-content:space-between;
}

.bc .gridLines i{
  width:100%;

  border-top:1px dashed #dce6e4;
}

.bc .chart{
  position:relative;
  z-index:1;

  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:28px;

  height:100%;

  padding:0 14px 44px;
}


/* Individual bar */

.bc .barItem{
  position:relative;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-end;

  min-width:0;
  height:100%;
}

.bc .barItem em{
  position:absolute;
  bottom:calc(var(--bar-height) + 10px);

  color:#172e2e;

  font-family:Georgia,"Times New Roman",serif;
  font-size:13px;
  font-weight:700;
  font-style:normal;
  line-height:1;

  letter-spacing:-.02em;

  white-space:nowrap;
}

.bc .barItem .bar{
  display:block;
  flex:none;

  width:68%;
  max-width:112px;

  border-radius:8px 8px 0 0;

  background:
    linear-gradient(
      180deg,
      #95cec6 0%,
      #7fc2b9 100%
    );

  transition:height .25s ease;
}

.bc .barItem .bar.light{
  background:
    linear-gradient(
      180deg,
      #e4f1ee 0%,
      #cde5df 100%
    );
}

.bc .barItem .bar.tot{
  background:
    linear-gradient(
      180deg,
      #108784 0%,
      #087675 100%
    );
}

.bc .barItem>span{
  position:absolute;
  top:calc(100% + 13px);

  width:125%;

  color:#74868a;

  font-family:Inter,"Helvetica Neue",Arial,sans-serif;
  font-size:10px;
  line-height:1.35;

  text-align:center;
}


/* Assumption note */

.bc .impactNote{
  display:grid;
  grid-template-columns:18px 1px minmax(0,1fr);
  align-items:center;
  gap:16px;

  margin-top:25px;
  padding:19px 22px;

  border:0;
  border-radius:12px;

  background:#f2f7f6;
}

.bc .impactNoteMark{
  order:1;
  display:block;

  width:12px;
  height:12px;

  border-radius:50%;

  background:#087675;
}

.bc .impactNote:before{
  order:2;
  content:"";

  width:1px;
  height:42px;

  background:#cfddda;
}

.bc .impactNote p{
  order:3;
  margin:0;

  color:#718287;

  font-family:Inter,"Helvetica Neue",Arial,sans-serif;
  font-size:10px;
  line-height:1.6;
}



.bc .modelSec button:focus-visible,.bc .modelSec a:focus-visible{outline:3px solid #84c9bf;outline-offset:4px}
@media(max-width:1180px){
 .bc .modelTop{align-items:flex-start;flex-direction:column}.bc .scenarioArea{margin-left:62px}
 .bc .calculator{grid-template-columns:190px minmax(0,1fr);gap:20px}.bc .railStep{grid-template-columns:32px 36px 1fr;gap:8px}.bc .modelSec .railStep>.mi{width:36px;height:36px}.bc .railCopy strong{font-size:12px}.bc .railCopy small{font-size:11px}
 .bc .stepCard{padding:22px}.bc .stepCardBody{gap:20px}.bc .calcField{grid-template-columns:36px minmax(0,1fr);gap:10px;padding:14px}.bc .modelSec .calcField>.mi{width:36px;height:36px}.bc .fieldControl{grid-column:2}.bc .quickTips{padding:18px}.bc .kpi{gap:10px;padding:16px 12px}.bc .modelSec .kpi>.mi{width:38px;height:38px;flex-basis:38px}
}
@media(max-width:900px){
 .bc .modelSec .wrap{width:calc(100% - 40px)}.bc .calculator{grid-template-columns:1fr}
 .bc .stepRail{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:0}.bc .stepTrack{display:none}.bc .railStep{display:flex;align-items:center;gap:9px;min-height:58px;padding:9px;border:1px solid #e2ece8;border-radius:12px}.bc .railNumber{flex:none;margin:0}.bc .modelSec .railStep>.mi,.bc .railCopy small{display:none}.bc .railCopy{padding:0}.bc .railStep.active{background:#f1f8f5;border-color:#a8cec3}
 .bc .stepCardBody{grid-template-columns:1.1fr 1fr}.bc .impactPanel{grid-template-columns:1fr;gap:0;padding:24px}.bc .kpis{grid-column:1;grid-row:auto;margin-bottom:28px}.bc .chartTitleRow,.bc .chartShell,.bc .impactNote{grid-column:1;grid-row:auto}.bc .chartShell{height:240px}.bc .kpi b{font-size:29px}
}
@media(max-width:600px){
 .bc .modelSec{padding:56px 0}.bc .modelSec .wrap{width:calc(100% - 28px)}.bc .modelTitleRow{gap:12px}.bc .modelNumber{width:32px;height:32px;flex-basis:32px}.bc .modelTitleRow h2{font-size:34px}.bc .modelIntro>p{margin:16px 0 0;font-size:14px}.bc .scenarioArea{width:100%;margin:0}.bc .seg{grid-template-columns:repeat(3,1fr)}.bc .seg button{font-size:11px;padding:0 6px}
 .bc .stepRail{grid-template-columns:repeat(2,minmax(0,1fr))}.bc .railStep{padding:8px 10px}.bc .stepCard{padding:20px 16px;border-radius:18px}.bc .stepCardTop{width:100%;margin-bottom:20px}.bc .stepCardBody{grid-template-columns:1fr;gap:22px}.bc .stepHeading h3{font-size:30px}.bc .calcField{grid-template-columns:38px minmax(0,1fr) 100px;gap:9px;padding:12px 10px}.bc .fieldControl{grid-column:auto}.bc .fieldLabel{font-size:12px}.bc .fieldCopy small{font-size:11px}.bc .quickTips{margin:0;padding:18px}.bc .tipItem{min-height:64px}.bc .stepActions{display:flex}.bc .stepCount{display:block}
 .bc .impactPanel{padding:20px 16px;border-radius:18px}.bc .impactHead{display:block}.bc .impactHead h3{font-size:30px}.bc .impactBadge{display:inline-block;margin-top:12px}.bc .kpis{grid-template-columns:1fr;gap:10px}.bc .kpi{min-height:110px;align-items:center;padding:18px;gap:16px}.bc .kpi>div{padding:0}.bc .kpi b{font-size:29px}.bc .modelSec .kpi>.mi{width:48px;height:48px;flex-basis:48px}.bc .chart{gap:14px}.bc .chartShell{height:210px;grid-template-columns:40px 1fr}.bc .barItem>span{font-size:9px}.bc .barItem em{font-size:10px}
}
@media(max-width:380px){.bc .calcField{grid-template-columns:36px 1fr}.bc .fieldControl{grid-column:2}.bc .modelTitleRow h2{font-size:30px}}

/* ---- clean calculator overrides ---- */
.bc .railStep{grid-template-columns:36px minmax(0,1fr);gap:14px}
.bc .railCopy strong{font-size:15px}
.bc .railCopy small{font-size:13px}

.bc .calcField{grid-template-columns:minmax(0,1fr) 170px;min-height:92px;padding:16px 18px;border-radius:8px}

.bc .fieldLabel{font-size:15px;font-weight:700;color:#152e2e}
.bc .fieldCopy small{font-size:13px}
.bc .fieldControl{grid-column:auto}

.bc .quickTips{padding:26px;background:#f4f8f7;border-radius:10px;gap:20px}
.bc .quickTipsHead{display:block;margin:0 0 18px;padding-bottom:16px;border-bottom:1px solid #d9e7e3}
.bc .quickTipsHead span{display:block;margin-bottom:8px;font-size:10px;font-weight:700;letter-spacing:.16em;color:#087675}
.bc .quickTipsHead h4{font:700 26px/1.15 Georgia,"Times New Roman",serif;letter-spacing:-.04em;color:#152e2e}
.bc .tipItem{align-items:center;gap:16px;min-height:0;padding:16px 18px;background:#fff;border-radius:12px}
.bc .tipNum{display:grid;place-items:center;flex:0 0 40px;width:40px;height:40px;border-radius:50%;background:#e8f2ef;color:#087675;font-size:12px;font-weight:700}
.bc .tipItem strong{display:block;font-size:14px;font-weight:700;color:#152e2e}
.bc .tipItem p{margin-top:3px;font-size:12.5px;line-height:1.5;color:#011522}
.bc .stepCount{display:none}

@media(max-width:600px){
  .bc .calcField{grid-template-columns:minmax(0,1fr) 120px}
}
@media(max-width:380px){
  .bc .calcField{grid-template-columns:1fr}
}

/* ---- bigger, sharper body text ---- */
.bc .modelSec{text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}

/* intro + scenario toggle */
.bc .modelIntro>p{font-size:18px;line-height:1.65;max-width:680px}
.bc .scenarioArea{width:380px}
.bc .seg button{min-height:42px;font-size:14px;font-weight:600}

/* step rail */
.bc .railCopy strong{font-size:18px;font-weight:700}
.bc .railCopy small{font-size:15px;line-height:1.55}
.bc .railStep{min-height:104px}

/* step card */
.bc .stepCardTop p{font-size:13px}
.bc .stepHeading p{font-size:16px}

/* fields */
.bc .fieldLabel{font-size:18px}
.bc .fieldCopy small{font-size:15px}
.bc .fieldControl input{font-size:19px;font-weight:700}
.bc .calcField{min-height:104px}

/* quick tips */
.bc .quickTipsHead span{font-size:12px}
.bc .quickTipsHead h4{font-size:30px}
.bc .tipNum{flex:0 0 44px;width:44px;height:44px;font-size:14px}
.bc .tipItem strong{font-size:17px}
.bc .tipItem p{font-size:15px;line-height:1.5}
.bc .nextBtn{font-size:16px;min-height:54px}

@media(max-width:600px){
  .bc .modelIntro>p{font-size:16px}
  .bc .scenarioArea{width:100%}
  .bc .railCopy strong{font-size:15px}
  .bc .fieldLabel{font-size:16px}
  .bc .fieldCopy small{font-size:13px}
  .bc .tipItem strong{font-size:15px}
  .bc .tipItem p{font-size:13.5px}
}

/* ---- tooltip icons on field labels ---- */
.bc .fieldLabel{display:flex;align-items:center;gap:8px}
.bc .calcField{min-height:84px}

.bc .tipIcon{position:relative;display:inline-grid;place-items:center;flex:none;width:20px;height:20px;border-radius:50%;color:#6f8a86;cursor:help;outline:none;transition:color .2s ease}
.bc .tipIcon svg{width:18px;height:18px;stroke-width:1.7}
.bc .tipIcon:hover,.bc .tipIcon:focus-visible{color:#087675}

.bc .tipBubble{position:absolute;left:-10px;bottom:calc(100% + 10px);z-index:20;width:270px;padding:12px 14px;border-radius:8px;background:#011522;color:#fff;font:500 13px/1.5 Inter,Arial,sans-serif;letter-spacing:0;text-align:left;box-shadow:none;opacity:0;visibility:hidden;transform:translateY(4px);pointer-events:none;transition:opacity .18s ease,transform .18s ease,visibility .18s}
.bc .tipBubble:after{content:"";position:absolute;top:100%;left:16px;border:6px solid transparent;border-top-color:#011522}
.bc .tipIcon:hover .tipBubble,
.bc .tipIcon:focus .tipBubble,
.bc .tipIcon:focus-visible .tipBubble{opacity:1;visibility:visible;transform:none}

@media(max-width:600px){
  .bc .tipBubble{width:220px}
}

/* ---- field label: smaller, lighter ---- */
.bc .fieldLabel{font-size:16px;font-weight:600}
.bc .tipIcon svg{width:17px;height:17px}

@media(max-width:600px){
  .bc .fieldLabel{font-size:15px}
}


/* ---- review step: bigger text ---- */
.bc .reviewGroups{gap:26px}
.bc .reviewGroup>p{font-size:15px;font-weight:700;margin-bottom:6px}
.bc .reviewLine{padding:14px 0;gap:16px;font-size:15px;color:#011522}
.bc .reviewLine strong{font-size:16px;font-weight:700;color:#011522}
.bc .reviewLine button{font-size:14px;font-weight:600;padding:4px 2px}
.bc .reviewLine button:hover{text-decoration:underline}

@media(max-width:600px){
  .bc .reviewLine{font-size:14px}
  .bc .reviewLine strong{font-size:15px}
}

/* ---- impact panel: single-line values, consistent copy ---- */

/* KPI values: smaller, always on one line */
.bc .kpiValue{
  font-size:clamp(26px,2.3vw,34px);
  white-space:nowrap;
  overflow-wrap:normal;
  letter-spacing:-.04em;
}

/* Subtitle under "Your potential impact": same as the model intro */
.bc .impactHead p{
  max-width:680px;
  margin-top:12px;
  font-size:18px;
  line-height:1.65;
  color:#011522;
}

/* Footnote: darker, same colour, easier to read */
.bc .impactNote p{
  font-size:12px;
  line-height:1.65;
  color:#011522;
}

@media(max-width:900px){
  .bc .kpiValue{font-size:clamp(24px,5vw,32px)}
}
@media(max-width:600px){
  .bc .impactHead p{font-size:16px}
  .bc .kpiValue{font-size:28px}
}

/* ---- impact panel: even padding, smaller radius ---- */

/* KPI cards: size to content, same padding top and bottom */
.bc .kpis{align-self:start;align-content:start}
.bc .kpi{
  min-height:0;
  justify-content:flex-start;
  padding:28px 30px;
  border-radius:8px;
}
.bc .kpiLabel{margin-bottom:18px}
.bc .kpiDescription{margin-top:14px}

/* Outer panel */
.bc .impactPanel{border-radius:10px}

/* Badge, chart note */
.bc .impactBadge{border-radius:6px}
.bc .impactNote{border-radius:8px}

/* Bars */
.bc .barItem .bar{border-radius:4px 4px 0 0}

@media(max-width:600px){
  .bc .kpi{padding:22px 20px;border-radius:8px}
  .bc .impactPanel{border-radius:10px}
}



/* ---- toggle inside impact panel ---- */
.bc .impactHead .seg{flex:none;width:380px}

/* ---- chart text: bigger, same colour ---- */
.bc .chartShell{grid-template-columns:60px minmax(0,1fr)}
.bc .axis span{font-size:13px;color:#011522}
.bc .barItem em{font-size:16px;color:#011522}
.bc .barItem>span{font-size:14px;line-height:1.35;color:#011522}

@media(max-width:600px){
  .bc .impactHead .seg{width:100%;margin-top:16px}
  .bc .chartShell{grid-template-columns:48px minmax(0,1fr)}
  .bc .axis span{font-size:11px}
  .bc .barItem em{font-size:13px}
  .bc .barItem>span{font-size:11px}
}

/* ---- KPI card tooltips ---- */
.bc .kpiLabel{display:flex;align-items:center;gap:8px}
.bc .kpi:hover{z-index:5}

.bc .kpiLabel .tipIcon{position:static;width:18px;height:18px;color:#7a8f8b}
.bc .kpiLabel .tipIcon svg{width:16px;height:16px}

/* bubble spans the full card width so it never spills into the chart */
.bc .kpiLabel .tipBubble{left:0;right:0;width:auto;bottom:calc(100% + 8px);text-transform:none;letter-spacing:0;font-size:13px;font-weight:500;line-height:1.5}
.bc .kpiLabel .tipBubble:after{display:none}

/* light icon on the teal card */
.bc .kpi.hi .kpiLabel .tipIcon{color:#cfe9e4}
.bc .kpi.hi .kpiLabel .tipIcon:hover,
.bc .kpi.hi .kpiLabel .tipIcon:focus-visible{color:#fff}


/* ---- executive summary: deck viewer ---- */
.bc .summaryHead{max-width:none}
.bc .summaryHead h2{max-width:none;text-wrap:wrap;font-size:clamp(34px,4vw,60px)}
.bc .summaryHead p{max-width:none;margin-top:18px;color:#c3dad7;font-size:18px;line-height:1.65}

.bc .deckWrap{display:grid;grid-template-columns:170px minmax(0,1fr);gap:24px;align-items:start;margin-top:44px}

/* thumbnails */
.bc .deckThumbs{display:grid;gap:10px}
.bc .deckThumb{display:grid;grid-template-columns:18px minmax(0,1fr);align-items:center;gap:8px;padding:7px 8px;border:1px solid rgba(127,211,208,.14);border-radius:8px;background:rgba(255,255,255,.03);color:#9fc0bd;text-align:left;cursor:pointer;transition:border-color .2s ease,background .2s ease,color .2s ease}
.bc .deckThumb:hover{border-color:rgba(127,211,208,.4)}
.bc .deckThumb[aria-selected=true]{border-color:#7fd3d0;background:rgba(127,211,208,.07);color:#fff}
.bc .thumbNum{font-size:12px;font-weight:700;text-align:center}
.bc .thumbCard{display:block;aspect-ratio:16/10;padding:7px 8px;border-radius:4px;background:#fbfaf7;overflow:hidden}
.bc .thumbCard b{display:block;max-height:2.4em;overflow:hidden;font:700 7px/1.2 Georgia,"Times New Roman",serif;letter-spacing:-.02em;color:#102d2d}
.bc .thumbCard i{display:block;height:2px;margin-top:4px;border-radius:2px;background:#d9e3e0}
.bc .thumbCard i:nth-of-type(2){width:72%}
.bc .thumbCard i:nth-of-type(3){width:48%}

/* stage */
.bc .deckStage{min-width:0}
.bc .deckFrame{padding:36px 42px;border:1px solid rgba(127,211,208,.16);border-radius:10px;background:rgba(255,255,255,.03)}
.bc .deckSlide{display:flex;flex-direction:column;aspect-ratio:16/8.6;padding:28px 40px 26px;border-radius:6px;background:#fbfaf7;color:#011522}
.bc .dsTop{display:flex;align-items:center;font-size:11px;font-weight:500;letter-spacing:.06em;color:#011522}
.bc .dsTop span:first-child{margin-right:auto;font-weight:700}
.bc .dsTop span:nth-child(2){margin-right:56px}
.bc .dsBody{flex:1;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:32px;min-height:0}
.bc .dsMain{min-width:0;max-width:560px}
.bc .deckSlide textarea{display:block;width:100%;padding:0;border:0;border-bottom:1px dashed transparent;outline:0;resize:none;overflow:hidden;background:transparent;color:#011522;font:700 clamp(28px,3.6vw,52px)/1.04 Georgia,"Times New Roman",serif;letter-spacing:-.045em;field-sizing:content}
.bc .deckSlide textarea:hover,.bc .deckSlide textarea:focus{border-bottom-color:#bfd2ce}
.bc .dsSub{margin-top:16px;font-size:17px;color:#011522}
.bc .dsList{display:grid;gap:12px;margin-top:22px;padding-top:20px;border-top:1px solid #e3e1da}
.bc .dsList li{display:flex;align-items:center;gap:14px;font-size:14px;line-height:1.45;color:#011522}
.bc .dsList .mi{display:inline-grid;flex:none;color:#4b6b66}
.bc .dsList .mi svg{width:20px;height:20px;stroke-width:1.6}
.bc .dsStat{text-align:right}
.bc .dsStat strong{display:block;color:#087675;font:700 clamp(34px,4vw,60px)/1 Georgia,"Times New Roman",serif;letter-spacing:-.045em}
.bc .dsStat span{display:block;margin-top:8px;font-size:14px;color:#011522}
.bc .dsFoot{display:flex;justify-content:space-between;align-items:flex-end;font-size:12px;color:#5f716e}
.bc .dsFoot strong{color:#011522;font-size:28px;font-weight:600;letter-spacing:-.04em}

/* nav + actions */
.bc .deckBar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:22px}
.bc .deckNav{display:flex;align-items:center;gap:18px;color:#dbecea;font-size:15px}
.bc .deckNav button{display:grid;place-items:center;width:46px;height:46px;border:1px solid rgba(127,211,208,.24);border-radius:10px;background:rgba(255,255,255,.04);color:#fff;cursor:pointer;transition:border-color .2s ease}
.bc .deckNav button:hover{border-color:rgba(127,211,208,.6)}
.bc .deckNav svg{width:20px;height:20px}
.bc .deckActions{display:flex;flex-wrap:wrap;gap:12px}
.bc .deckBtn{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:52px;padding:0 26px;border-radius:10px;font:650 15px Inter,Arial,sans-serif;color:#fff;cursor:pointer;transition:background .2s ease,border-color .2s ease}
.bc .deckBtn svg{width:19px;height:19px}
.bc .deckBtn.primary{border:1px solid #0e8b87;background:#0e8b87}
.bc .deckBtn.primary:hover{background:#12a09b;border-color:#12a09b}
.bc .deckBtn.primary:disabled{opacity:.6;cursor:wait}
.bc .deckBtn.ghost{border:1px solid rgba(255,255,255,.45);background:transparent}
.bc .deckBtn.ghost:hover{background:rgba(255,255,255,.07);border-color:#fff}

@media(max-width:1080px){
  .bc .deckWrap{grid-template-columns:1fr}
  .bc .deckThumbs{grid-template-columns:repeat(6,minmax(0,1fr))}
  .bc .deckThumb{grid-template-columns:1fr;justify-items:center;padding:10px 0}
  .bc .thumbCard{display:none}
}
@media(max-width:700px){
  .bc .deckFrame{padding:14px}
  .bc .deckSlide{aspect-ratio:auto;min-height:420px;padding:22px 20px}
  .bc .dsBody{grid-template-columns:1fr;gap:20px;padding:24px 0}
  .bc .dsStat{text-align:left}
  .bc .dsTop span:nth-child(2){display:none}
  .bc .deckBar{flex-direction:column;align-items:stretch}
  .bc .deckActions{flex-direction:column}
  .bc .deckBtn{width:100%}
}


/* =========================================================
   EXECUTIVE SUMMARY — PREMIUM DECK VIEWER
   ========================================================= */

.bc .summarySec{
  position:relative;
  overflow:hidden;
  padding:104px 0 112px;
  color:#fff;
  background:
    radial-gradient(circle at 72% 12%,rgba(22,114,115,.22),transparent 32%),
    radial-gradient(circle at 15% 90%,rgba(127,211,208,.07),transparent 28%),
    #041b1c;
}

.bc .summarySec:before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px);
  background-size:48px 48px;
  mask-image:linear-gradient(to bottom,transparent,rgba(0,0,0,.45),transparent);
}

.bc .summarySec .wrap{
  position:relative;
  z-index:1;
}

.bc .summaryHead{
  max-width:980px;
}

.bc .summaryHead h2{
  max-width:980px;
  font-size:clamp(42px,5vw,68px);
  line-height:1.01;
  letter-spacing:-.05em;
}

.bc .summaryHead p{
  max-width:760px;
  margin-top:18px;
  color:#b6cfcc;
  font-size:16px;
  line-height:1.7;
}

.bc .deckWrap{
  display:grid;
  grid-template-columns:164px minmax(0,1fr);
  gap:28px;
  align-items:start;
  margin-top:48px;
}

/* slide thumbnails */
.bc .deckThumbs{
  display:grid;
  gap:10px;
}

.bc .deckThumb{
  display:grid;
  grid-template-columns:22px minmax(0,1fr);
  align-items:center;
  gap:8px;
  width:100%;
  padding:6px;
  border:1px solid rgba(127,211,208,.12);
  border-radius:10px;
  background:rgba(255,255,255,.025);
  color:#8faaa7;
  text-align:left;
  cursor:pointer;
  transition:
    border-color .2s ease,
    background .2s ease,
    transform .2s ease;
}

.bc .deckThumb:hover{
  border-color:rgba(127,211,208,.34);
  background:rgba(255,255,255,.04);
}

.bc .deckThumb[aria-selected=true]{
  border-color:#58c2bd;
  background:rgba(127,211,208,.06);
  box-shadow:0 0 0 1px rgba(127,211,208,.08);
}

.bc .thumbNum{
  display:block;
  color:#9eb9b5;
  font-size:9px;
  font-weight:800;
  letter-spacing:.08em;
  text-align:center;
}

.bc .deckThumb[aria-selected=true] .thumbNum{
  color:#dff5f1;
}

.bc .thumbCard{
  position:relative;
  display:block;
  aspect-ratio:16/9;
  overflow:hidden;
  border-radius:6px;
  background:#f8f7f2;
}

.bc .thumbCard>img{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:contain;
  opacity:.72;
  transform:scale(.94);
}

.bc .thumbShade{
  position:absolute;
  inset:0;
  background:linear-gradient(
    180deg,
    rgba(248,247,242,.08) 0%,
    rgba(4,27,28,.12) 50%,
    rgba(4,27,28,.76) 100%
  );
}

.bc .thumbMeta{
  position:absolute;
  left:8px;
  right:7px;
  bottom:7px;
  z-index:2;
}

.bc .thumbMeta small{
  display:block;
  margin-bottom:2px;
  color:#b9d6d2;
  font-size:5.5px;
  font-weight:800;
  letter-spacing:.1em;
  text-transform:uppercase;
}

.bc .thumbMeta b{
  display:-webkit-box;
  overflow:hidden;
  color:#fff;
  font:700 7px/1.15 Georgia,"Times New Roman",serif;
  letter-spacing:-.02em;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}

/* main stage */
.bc .deckStage{
  min-width:0;
}

.bc .deckFrame{
  padding:26px;
  border:1px solid rgba(127,211,208,.18);
  border-radius:16px;
  background:
    linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.018));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.025),
    0 24px 70px rgba(0,0,0,.12);
}

.bc .deckSlide{
  position:relative;
  display:flex;
  flex-direction:column;
  aspect-ratio:16/9;
  min-height:0;
  overflow:hidden;
  padding:26px 32px 22px;
  border-radius:10px;
  background:#f8f7f2;
  color:#092526;
  box-shadow:0 24px 60px rgba(0,0,0,.2);
}

.bc .deckSlide.slide-impact,
.bc .deckSlide.slide-next{
  background:
    radial-gradient(circle at 78% 46%,rgba(22,114,115,.22),transparent 35%),
    #061f20;
  color:#fff;
}

.bc .dsTop{
  position:relative;
  z-index:3;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:24px;
  min-height:28px;
}

.bc .dsLogo{
  display:block;
  width:92px;
  height:auto;
  object-fit:contain;
}

.bc .slide-impact .dsLogo,
.bc .slide-next .dsLogo{
  padding:7px 10px;
  width:105px;
  border-radius:7px;
  background:#fff;
}

.bc .dsTopRight{
  display:flex;
  align-items:center;
  gap:28px;
  color:#526d69;
  font-size:8px;
  font-weight:700;
  letter-spacing:.04em;
}

.bc .slide-impact .dsTopRight,
.bc .slide-next .dsTopRight{
  color:#9fbebb;
}

.bc .dsBody{
  position:relative;
  z-index:2;
  flex:1;
  display:grid;
  grid-template-columns:minmax(0,.96fr) minmax(300px,1.04fr);
  gap:28px;
  align-items:center;
  min-height:0;
  padding:22px 0 12px;
}

.bc .dsMain{
  min-width:0;
  max-width:none;
}

.bc .dsKicker{
  display:block;
  margin-bottom:10px;
  color:#087675;
  font-size:7.5px;
  font-weight:850;
  letter-spacing:.18em;
  text-transform:uppercase;
}

.bc .slide-impact .dsKicker,
.bc .slide-next .dsKicker{
  color:#7fd3d0;
}

.bc .deckSlide textarea{
  display:block;
  width:100%;
  min-height:0;
  padding:0;
  border:0;
  border-bottom:1px dashed transparent;
  outline:0;
  resize:none;
  overflow:hidden;
  background:transparent;
  color:#0a2728;
  font:700 clamp(27px,3.35vw,50px)/1.02 Georgia,"Times New Roman",serif;
  letter-spacing:-.045em;
  field-sizing:content;
}

.bc .slide-impact textarea,
.bc .slide-next textarea{
  color:#fff;
}

.bc .deckSlide textarea:hover,
.bc .deckSlide textarea:focus{
  border-bottom-color:#a9c5c0;
}

.bc .dsSub{
  max-width:470px;
  margin-top:12px;
  color:#46615e;
  font-size:12px;
  line-height:1.45;
}

.bc .slide-impact .dsSub,
.bc .slide-next .dsSub{
  color:#b8d1ce;
}

.bc .dsBig{
  margin-top:17px;
}

.bc .dsBig strong{
  display:block;
  color:#087675;
  font:700 clamp(30px,3.3vw,48px)/1 Georgia,"Times New Roman",serif;
  letter-spacing:-.045em;
}

.bc .slide-impact .dsBig strong{
  color:#7fd3d0;
}

.bc .dsBig span{
  display:block;
  margin-top:5px;
  color:#71837f;
  font-size:9px;
}

.bc .slide-impact .dsBig span{
  color:#9fbebb;
}

.bc .dsList{
  display:grid;
  gap:9px;
  max-width:520px;
  margin-top:18px;
  padding:16px 0 0;
  border-top:1px solid #dfe6e2;
}

.bc .slide-impact .dsList,
.bc .slide-next .dsList{
  border-top-color:rgba(127,211,208,.18);
}

.bc .dsList li{
  display:grid;
  grid-template-columns:7px minmax(0,1fr);
  align-items:start;
  gap:10px;
  color:#36524f;
  font-size:10px;
  line-height:1.45;
}

.bc .slide-impact .dsList li,
.bc .slide-next .dsList li{
  color:#d8e9e6;
}

.bc .dsList li>span{
  width:6px;
  height:6px;
  margin-top:.45em;
  border-radius:50%;
  background:#087675;
}

.bc .slide-impact .dsList li>span,
.bc .slide-next .dsList li>span{
  background:#7fd3d0;
}

/* visuals */
.bc .dsVisual{
  position:relative;
  display:grid;
  place-items:center;
  min-width:0;
  height:100%;
}

.bc .dsVisualGlow{
  position:absolute;
  inset:12% 6%;
  border-radius:50%;
  background:rgba(127,211,208,.11);
  filter:blur(34px);
}

.bc .dsVisual>img{
  position:relative;
  z-index:1;
  display:block;
  width:100%;
  height:100%;
  max-height:330px;
  object-fit:contain;
}

.bc .slide-current .dsVisual>img,
.bc .slide-risks .dsVisual>img{
  transform:scale(.96);
}

.bc .slide-impact .dsVisualGlow,
.bc .slide-next .dsVisualGlow{
  background:rgba(127,211,208,.12);
}

/* proof slide */
.bc .dsProof{
  display:grid;
  gap:7px;
  margin-top:16px;
}

.bc .dsProofRow{
  display:grid;
  grid-template-columns:1.1fr .75fr 1.4fr;
  gap:10px;
  align-items:center;
  padding:9px 10px;
  border:1px solid #dce5e2;
  border-radius:8px;
  background:rgba(255,255,255,.62);
}

.bc .dsProofRow span{
  color:#087675;
  font-size:8px;
  font-weight:800;
}

.bc .dsProofRow strong{
  color:#0a2728;
  font:700 12px Georgia,"Times New Roman",serif;
}

.bc .dsProofRow small{
  color:#697d79;
  font-size:7.5px;
  line-height:1.3;
}

/* risk slide */
.bc .dsRiskList{
  display:grid;
  gap:0;
  margin-top:16px;
  border-top:1px solid #dce5e2;
}

.bc .dsRiskRow{
  display:grid;
  grid-template-columns:27px 105px minmax(0,1fr);
  gap:8px;
  align-items:start;
  padding:10px 0;
  border-bottom:1px solid #dce5e2;
}

.bc .dsRiskRow>span{
  color:#087675;
  font-size:7px;
  font-weight:850;
}

.bc .dsRiskRow strong{
  color:#173734;
  font-size:8px;
}

.bc .dsRiskRow p{
  color:#6b7f7b;
  font-size:7.5px;
  line-height:1.35;
}

/* next steps slide */
.bc .dsSteps{
  display:grid;
  gap:10px;
  margin-top:18px;
}

.bc .dsSteps>div{
  display:grid;
  grid-template-columns:30px minmax(0,1fr);
  gap:10px;
  align-items:center;
}

.bc .dsSteps span{
  display:grid;
  place-items:center;
  width:26px;
  height:26px;
  border:1px solid rgba(127,211,208,.44);
  border-radius:50%;
  color:#7fd3d0;
  font-size:7px;
  font-weight:850;
}

.bc .dsSteps p{
  color:#d8e9e6;
  font-size:9px;
  line-height:1.4;
}

/* slide footer */
.bc .dsFoot{
  position:relative;
  z-index:3;
  display:grid;
  grid-template-columns:1fr auto 1fr;
  align-items:center;
  gap:18px;
  padding-top:10px;
  border-top:1px solid #dde5e1;
  color:#778984;
  font-size:7px;
}

.bc .dsFoot span:nth-child(2){
  text-align:center;
}

.bc .dsFoot strong{
  color:#0a2728;
  font-size:7px;
  text-align:right;
}

.bc .slide-impact .dsFoot,
.bc .slide-next .dsFoot{
  border-top-color:rgba(127,211,208,.17);
  color:#7fa5a1;
}

.bc .slide-impact .dsFoot strong,
.bc .slide-next .dsFoot strong{
  color:#dff1ee;
}

/* controls */
.bc .deckBar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:20px;
  margin-top:18px;
}

.bc .deckNav{
  display:flex;
  align-items:center;
  gap:12px;
  color:#a8c4c0;
  font-size:10px;
  font-weight:700;
}

.bc .deckNav button{
  display:grid;
  place-items:center;
  width:38px;
  height:38px;
  border:1px solid rgba(127,211,208,.17);
  border-radius:9px;
  background:rgba(255,255,255,.035);
  color:#d2e7e4;
  cursor:pointer;
  transition:background .2s ease,border-color .2s ease;
}

.bc .deckNav button:hover:not(:disabled){
  border-color:rgba(127,211,208,.42);
  background:rgba(127,211,208,.07);
}

.bc .deckNav button:disabled{
  opacity:.32;
  cursor:default;
}

.bc .deckNav button svg{
  width:16px;
  height:16px;
}

.bc .deckActions{
  display:flex;
  align-items:center;
  gap:10px;
}

.bc .deckBtn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  min-height:46px;
  padding:0 22px;
  border-radius:999px;
  color:#fff;
  font-size:11px;
  font-weight:750;
  cursor:pointer;
  transition:
    transform .18s ease,
    background .18s ease,
    border-color .18s ease;
}

.bc .deckBtn svg{
  width:15px;
  height:15px;
}

.bc .deckBtn.primary{
  min-width:245px;
  border:1px solid #159b98;
  background:linear-gradient(135deg,#18a9a5,#087675);
  box-shadow:0 9px 24px rgba(8,118,117,.18);
}

.bc .deckBtn.primary:hover{
  transform:translateY(-1px);
  background:linear-gradient(135deg,#1cb5b0,#0a8582);
}

.bc .deckBtn.primary:disabled{
  opacity:.6;
  cursor:wait;
  transform:none;
}

.bc .deckBtn.ghost{
  min-width:180px;
  border:1px solid rgba(255,255,255,.36);
  background:transparent;
}

.bc .deckBtn.ghost:hover{
  border-color:rgba(255,255,255,.7);
  background:rgba(255,255,255,.05);
}

@media(max-width:1080px){
  .bc .deckWrap{
    grid-template-columns:1fr;
  }

  .bc .deckThumbs{
    grid-template-columns:repeat(6,minmax(0,1fr));
  }

  .bc .deckThumb{
    grid-template-columns:1fr;
    padding:5px;
  }

  .bc .thumbNum{
    display:none;
  }

  .bc .thumbMeta{
    display:none;
  }
}

@media(max-width:760px){
  .bc .summarySec{
    padding:72px 0 80px;
  }

  .bc .summaryHead h2{
    font-size:40px;
  }

  .bc .summaryHead p{
    font-size:14px;
  }

  .bc .deckThumbs{
    grid-template-columns:repeat(3,minmax(0,1fr));
  }

  .bc .deckFrame{
    padding:12px;
  }

  .bc .deckSlide{
    aspect-ratio:auto;
    min-height:570px;
    padding:20px 18px;
  }

  .bc .dsBody{
    grid-template-columns:1fr;
    gap:14px;
    padding:22px 0 12px;
  }

  .bc .dsVisual{
    min-height:180px;
  }

  .bc .dsVisual>img{
    max-height:200px;
  }

  .bc .dsTopRight span:first-child{
    display:none;
  }

  .bc .dsFoot span:nth-child(2){
    display:none;
  }

  .bc .dsFoot{
    grid-template-columns:1fr auto;
  }

  .bc .deckBar{
    flex-direction:column;
    align-items:stretch;
  }

  .bc .deckNav{
    justify-content:center;
  }

  .bc .deckActions{
    flex-direction:column;
  }

  .bc .deckBtn{
    width:100%;
  }
}


/* current-state stat cards */
.bc .dsCards{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-self:center}
.bc .dsCard{position:relative;display:flex;flex-direction:column;padding:20px 20px 18px;border:1px solid #dfe8e5;border-radius:10px;background:#fff;overflow:hidden;box-shadow:0 1px 2px rgba(8,43,43,.03),0 14px 30px rgba(8,43,43,.05)}
.bc .dsCard:before{content:"";position:absolute;left:0;top:0;right:0;height:2px;background:linear-gradient(90deg,#087675,#7fd3d0)}
.bc .dsCard .mi{display:grid;place-items:center;width:34px;height:34px;margin-bottom:16px;border-radius:50%;background:#e8f5f2;color:#087675}
.bc .dsCard .mi svg{width:17px;height:17px;stroke-width:1.8}
.bc .dsCard small{font-size:8px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#5f7773}
.bc .dsCard strong{margin-top:8px;font:700 clamp(24px,2.6vw,36px)/1 Georgia,"Times New Roman",serif;letter-spacing:-.045em;color:#0a2728;white-space:nowrap}
.bc .dsCard p{margin-top:10px;font-size:10px;line-height:1.4;color:#5f7773}


/* current-state cards: soft green, no border */
.bc .dsCards{gap:14px}
.bc .dsCard{padding:22px 22px 20px;border:0;border-radius:12px;background:#eaf3f0;box-shadow:none}
.bc .dsCard:before{display:none}
.bc .dsCard .mi{width:42px;height:42px;margin-bottom:18px;border-radius:10px;background:#d9ece6;color:#087675}
.bc .dsCard .mi svg{width:21px;height:21px}
.bc .dsCard small{font-size:11px;font-weight:700;letter-spacing:0;text-transform:none;color:#0a2728}
.bc .dsCard strong{margin-top:6px;font-size:clamp(22px,2.3vw,32px)}
.bc .dsCard p{margin-top:8px;font-size:9.5px;color:#5f7773}

/* paragraph under the title */
.bc .dsLead{max-width:340px;margin-top:18px;font-size:13px;line-height:1.65;color:#4b625f}


`;
