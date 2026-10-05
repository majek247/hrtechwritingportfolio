"use client";

import { useEffect, useRef, useState } from "react";

const sources = [
  ["Ben: global enterprise benefits platform", "https://www.thanksben.com/"],
  ["Ben: global benefits management", "https://www.thanksben.com/benefits-management"],
  ["Ben: how the platform works", "https://www.thanksben.com/how-it-works"],
  ["Benifex: OneHub platform", "https://benifex.com/onehub/"],
  ["Benifex: benefits features", "https://benifex.com/benefits-features"],
  ["Benifex: customer stories", "https://benifex.com/case-study"],
  ["Darwin by Mercer Marsh Benefits", "https://www.marsh.com/en/services/employee-health-benefits/expertise/darwin.html"],
  ["Darwin employee benefits software", "https://www.mercer.com/solutions/health-and-benefits/employee-benefits-technology-platforms/darwin-employee-benefits-software/"],
  ["Alight Worklife platform", "https://www.alight.com/platform/alight-worklife"],
  ["Alight benefits administration", "https://www.alight.com/solutions/health-benefits/benefits-administration"],
  ["Forma: flexible employee benefits", "https://www.joinforma.com/"],
  ["Forma: 2026 global lifestyle benefits research", "https://www.joinforma.com/resources/lifestyle-spending-accounts-benchmark-report"],
  ["Benepass: flexible benefits", "https://getbenepass.com/benefits"],
  ["Benepass: platform features", "https://getbenepass.com/features"],
  ["Reward Gateway | Edenred: employee engagement platform", "https://www.rewardgateway.com/"],
  ["Reward Gateway | Edenred: global platform", "https://www.rewardgateway.com/au/platform/global"],
] as const;

type Vendor = {
  id: string;
  name: string;
  tag: string;
  best: string;
  summary: string;
  priceShort: string;
  watch: string;
  intro: string[];
  features: [string, string][];
  pros: [string, string][];
  cons: [string, string][];
  pricing: string;
  review: {
    quote?: string;
    person?: string;
    role?: string;
    source: number;
    body: string;
  };
  verdict: string;
  refs: number[];
};

const vendors: Vendor[] = [
  {
    id: "ben",
    name: "Ben",
    tag: "Global benefits operations, employee experience and insights",
    best: "Global enterprises that want one benefits operating layer across markets, with local flexibility, payroll controls and a single view of spend and utilisation.",
    summary: "One platform for benefits management, employee experience and benefits insights across 140+ countries.",
    priceShort: "Request a quote",
    watch: "Implementation scope, local provider coverage and exactly which processes Ben will automate in each market.",
    intro: [
      "Yes, Ben is first in a guide written as a portfolio sample for Ben. I am not going to pretend that placement is neutral.",
      "The useful question is whether it deserves to stay first once you look past the homepage. For me, the answer comes down to the unglamorous parts of global benefits: eligibility changes, payroll reconciliation, country-by-country rules, employee questions and the reporting you need when Finance asks what all of this is actually buying you.",
      "That is where Ben is strongest. It is positioned less like a catalogue of perks and more like an operating layer for a global benefits programme. The platform brings benefits management, employee experience and reporting into the same system, while letting local programmes vary by country or entity.",
      "I would still make Ben prove the messy workflows in the demo. If your team has three payrolls, two employee populations without corporate email and benefits that change by grade, do not settle for a beautiful employee homepage. Ask them to run the actual rules."
    ],
    features: [
      ["Global benefits management", "Eligibility, enrolment, amendments, provider reconciliation, payroll deductions and audit trails can sit in the same operating model across markets."],
      ["Local flexibility", "Regional policies, benefit designs and eligibility rules can vary without forcing the business into separate country platforms."],
      ["Employee experience", "Mobile-first access, multilingual support and governed communications are designed to reduce the number of benefits questions landing back with HR."],
      ["Benefits insights", "Global spend, utilisation and segmented reporting give Reward teams a more defensible view of cost and programme performance."],
      ["AI-native operations", "Ben says AI is used to validate incoming data, spot discrepancies before payroll and support compliance checks rather than simply adding a chat layer on top."],
    ],
    pros: [
      ["The admin story is unusually concrete", "Ben talks about reconciliation, payroll, eligibility and auditability in detail. Those are the bits that usually decide whether a global platform genuinely removes work."],
      ["Global and local are designed to coexist", "A central team can keep one operating model without pretending every country should have the same benefits."],
      ["The reporting is built for a budget conversation", "Spend and utilisation are treated as core platform data, not an export you have to rebuild before the CFO meeting."],
    ],
    cons: [
      ["You still need to test market depth", "Supporting 140+ countries is not the same as every provider, payroll or statutory process being identical in depth. Bring your hardest markets to the demo."],
      ["It is aimed at enterprise complexity", "Ben says it typically works with organisations above 1,000 employees. Smaller teams may not need the governance and operating model the platform is built around."],
    ],
    pricing: "Ben publishes Scale and Enterprise plans but not a standard enterprise list price. I would ask for the platform fee, implementation, integrations, payment-card or allowance costs, support model and any market-specific services to be separated in the quote.",
    review: {
      source: 1,
      person: "Ben customer evidence",
      role: "Vendor-published",
      body: "Ben publishes customer examples including Sigma Connected managing 28 benefits across more than 28 countries, alongside implementation feedback from Pleo and other global teams. I would use those stories as a starting point for reference calls and ask specifically how much manual reconciliation disappeared after go-live."
    },
    verdict: "Ben is the one I would start with when the problem is not simply ‘employees need a nicer benefits portal’ but ‘our global programme is held together by spreadsheets, tickets and local workarounds’. The value case is strongest when administration, employee experience and reporting all need fixing together.",
    refs: [1, 2, 3],
  },
  {
    id: "benifex",
    name: "Benifex",
    tag: "Mature global benefits, reward and employee experience",
    best: "Large multinationals that want a broad benefits and reward ecosystem with global consistency, local configuration and a long track record of complex rollouts.",
    summary: "OneHub combines benefits, wallet, wellbeing, recognition, discounts, mobile and AI-powered benefits capabilities.",
    priceShort: "Request a quote",
    watch: "Which OneHub modules you actually need and how much configuration, administration and advisory support sits in the commercial scope.",
    intro: [
      "Benifex is the platform I would put on the shortlist when the brief contains the words ‘global consistency’ about twelve times and nobody is willing to sacrifice local nuance to get it.",
      "OneHub is broad. Benefits administration sits alongside wallet-based allowances, wellbeing, recognition, discounts, mobile and AI-powered benefits tools. That breadth is useful for enterprises that want one employee destination, but it also means you need to be disciplined about what problem you are buying it to solve.",
      "The customer evidence is stronger than most. Benifex publishes global rollouts for Salesforce, Microsoft, Snowflake, Baker Hughes and others. The Salesforce story is especially useful because it talks about the awkward reality: global programmes and local programmes living side by side, different IDs and rules by country, and automation improving market by market rather than arriving perfectly on day one."
    ],
    features: [
      ["Global benefits administration", "OneHub supports enrolment, benefit management and workflows across multinational populations."],
      ["Wallet and flexible allowances", "Card-based allowances give employees more freedom while keeping employer rules around eligible spending."],
      ["Total reward and insights", "Employees can see total reward while HR teams can analyse spend, take-up and engagement across markets."],
      ["Broader employee experience", "Wellbeing, recognition, discounts and mobile experiences can live alongside core benefits."],
    ],
    pros: [
      ["Strong proof at multinational scale", "There is useful customer evidence across large, complex employers rather than only small technology companies."],
      ["Broad platform coverage", "If your benefits strategy overlaps heavily with wellbeing, recognition and total reward, OneHub can reduce the number of separate employee destinations."],
    ],
    cons: [
      ["Breadth can make evaluation fuzzy", "Do not let a wide platform demo turn into a tour of everything. Pick the three workflows that are broken today and test those first."],
      ["Commercial scope needs unpacking", "A full-service global programme can include technology, administration and advisory work. Make sure the quote makes the boundary between those pieces obvious."],
    ],
    pricing: "Benifex does not publish standard enterprise pricing. Ask for a module-by-module view of OneHub, implementation, managed administration, wallet or payment costs, local-market work and any consulting support.",
    review: {
      source: 6,
      person: "Snowflake and Salesforce",
      role: "Vendor-published customer stories",
      body: "Benifex publishes detailed examples of global teams trying to solve a very real problem: one consistent experience without erasing local differences. That is the proof I would dig into on a reference call, especially around how much country-by-country configuration still sits with the internal team."
    },
    verdict: "Benifex is a serious option for multinational employers that want a mature, broad employee benefits ecosystem rather than a narrow point solution. I would shortlist it when benefits, reward, wellbeing and employee experience are all part of the same transformation programme.",
    refs: [4, 5, 6],
  },
  {
    id: "darwin",
    name: "Darwin",
    tag: "Global benefits technology with Mercer Marsh Benefits expertise",
    best: "Multinationals that want a proven global benefits platform and value having technology, benefits consulting and broking expertise in the same wider relationship.",
    summary: "Reward, administration and analytics centres covering enrolment, total reward, automation, governance and global reporting.",
    priceShort: "Request a quote",
    watch: "How much of your target operating model sits in Darwin itself versus Mercer Marsh Benefits services around it.",
    intro: [
      "Darwin is one of the names that makes a global benefits shortlist feel immediately more enterprise.",
      "That is partly scale and partly context. It sits inside Mercer Marsh Benefits, so the proposition is not just software. There is a broader advisory, broking and benefits-management machine around it, which can be a genuine advantage if you want one partner involved in both programme design and technology.",
      "The product itself is split sensibly: Reward Center for employees, Control Center for administrators and Analytics Center for decision-makers. I like that because it forces a useful demo question: can each audience actually do the job they came to the platform to do?"
    ],
    features: [
      ["Global enrolment", "Employees can access, enrol in and manage benefits through a consistent digital experience across markets."],
      ["Administration automation", "Control Center is built to reduce transactional work and manual data handling."],
      ["Analytics and cost control", "Analytics Center focuses on benefit spend, take-up and decision support for global teams."],
      ["Governance and security", "Darwin emphasises automated data transfers, audit tracking and enterprise-grade security."],
      ["Advisory ecosystem", "Mercer Marsh Benefits can support scheme design, broking, cost optimisation and related consulting around the platform."],
    ],
    pros: [
      ["A credible choice for complex global estates", "Darwin has long-running multinational deployments and is designed around global administration rather than only flexible allowances."],
      ["Technology and advisory can sit together", "That can simplify ownership when your benefits transformation involves provider strategy as well as software."],
    ],
    cons: [
      ["The service boundary matters", "Ask what your internal team can configure directly, what requires Mercer support and how changes are priced after go-live."],
      ["Do not buy heritage instead of fit", "A proven global platform can still be wrong for a team that mainly needs a lightweight flexible-benefits layer. Make the workflow, not the logo, decide."],
    ],
    pricing: "Darwin does not publish standard enterprise pricing. Ask for platform modules, implementation, integrations, managed services and any Mercer Marsh Benefits advisory or broking work to be shown separately.",
    review: {
      source: 8,
      person: "Darwin customer base",
      role: "Vendor-published evidence",
      body: "Mercer says Darwin supports millions of users across more than 100 countries and is used by major global employers. Scale is reassuring, but I would still ask for a reference that looks like your operating model: similar countries, payroll landscape and level of centralisation."
    },
    verdict: "Darwin belongs on the shortlist when you need serious global benefits infrastructure and you value the wider Mercer Marsh Benefits ecosystem. I would test it hardest on configuration ownership, data movement and the practical difference between what the platform does and what the service team does for you.",
    refs: [7, 8],
  },
  {
    id: "alight",
    name: "Alight Worklife",
    tag: "Health, wealth, leave and benefits administration at very large scale",
    best: "Very large employers that need to unify complex health, wealth, leave and benefits administration with personalised employee guidance and deep integration.",
    summary: "AI-powered benefits ecosystem connecting administration, health, wealth, leaves, navigation, communications and analytics.",
    priceShort: "Request a quote",
    watch: "Geographic fit, implementation model and whether you need Alight's full administration depth or a more focused global benefits platform.",
    intro: [
      "Alight is playing a slightly different game from several platforms on this list.",
      "If Ben or Forma can be evaluated around a relatively contained global benefits programme, Alight Worklife can sit across health, wealth, leaves, navigation and administration for employers with genuinely enormous populations.",
      "That makes it compelling for Fortune-scale complexity and potentially excessive if your actual problem is ‘we need one place to manage flexible benefits in 14 countries’. The important thing is not to confuse capability with fit."
    ],
    features: [
      ["Unified benefits ecosystem", "Worklife connects health, wealth, leaves and other benefits into one employee experience."],
      ["Large-scale administration", "Alight supports complex plan designs, enrolment and ongoing benefits administration for very large populations."],
      ["AI personalisation", "LumenAI is used to personalise guidance, content and employee journeys based on workforce data."],
      ["Integration layer", "Alight says Worklife can integrate hundreds of tools across an employer's HR and benefits ecosystem."],
      ["Analytics and ROI", "Employer dashboards focus on programme usage, value and operational outcomes."],
    ],
    pros: [
      ["Scale is a genuine differentiator", "Alight administers benefits for tens of millions of people and is built for employers where benefits complexity is an operating model in its own right."],
      ["Strong depth beyond a benefits portal", "Health, wealth, leave and navigation can sit in one broader ecosystem rather than being treated as unrelated destinations."],
    ],
    cons: [
      ["It may be more platform than you need", "If your main requirement is flexible benefits or global allowances, a narrower product can be easier to implement and govern."],
      ["Global does not mean identical everywhere", "Confirm which administration capabilities are available in your priority countries and which elements are strongest in the US versus international markets."],
    ],
    pricing: "Alight does not publish standard enterprise pricing for Worklife. Expect a scoped commercial model based on population, modules, administration services, integrations and implementation complexity.",
    review: {
      source: 9,
      person: "Alight Worklife",
      role: "Vendor-published platform evidence",
      body: "Alight publishes outcomes around programme utilisation, personalised messaging and healthcare navigation. The numbers are useful, but for this comparison I would care more about whether the same operating model can be delivered in the countries and benefit categories you actually need."
    },
    verdict: "Alight Worklife is the option I would look at when the benefits estate is huge, interconnected and already stretches well beyond perks or allowances. For a multinational with deep health, wealth and leave complexity, that breadth is a strength. For a simpler brief, it can be more machinery than the job requires.",
    refs: [9, 10],
  },
  {
    id: "forma",
    name: "Forma",
    tag: "Global lifestyle benefits and flexible spending accounts",
    best: "Global employers whose main problem is delivering equitable, locally useful lifestyle benefits and spending accounts without running separate reimbursement programmes by country.",
    summary: "Flexible global benefits infrastructure centred on LSAs, spending accounts and employee choice.",
    priceShort: "Request a quote",
    watch: "Whether your brief needs full core-benefits administration or primarily flexible spending and lifestyle benefits.",
    intro: [
      "Forma becomes interesting when ‘global benefits’ really means ‘we want employees in very different markets to get something equally useful without making the programme identical’. That is a slightly different problem from running every insured benefit in one platform.",
      "Its centre of gravity is Lifestyle Spending Accounts and flexible benefits. The 2026 research is useful here because it shows how global LSA programmes are becoming more common and how country-by-country funding, tax and spending behaviour change the design.",
      "I would not ask Forma to win a comparison on the number of traditional benefits workflows it can administer. I would ask whether it can replace a mess of reimbursements, point solutions and country-specific allowances with something employees will actually use."
    ],
    features: [
      ["Lifestyle Spending Accounts", "Employers can build flexible programmes around wellbeing, learning, family support, remote work and other categories."],
      ["Global programme design", "Forma focuses on currency, country-level nuance and consistent employee access across distributed teams."],
      ["Flexible funding", "Teams can design multiple account types and rules without giving every employee the same catalogue."],
      ["Utilisation data", "Admin reporting helps benefits teams see participation and spending patterns across programmes."],
    ],
    pros: [
      ["Very clear use case", "If LSAs and flexible benefits are the problem, Forma is easier to evaluate than a giant benefits suite because the workflow is specific."],
      ["Strong global LSA research", "Its benchmark data gives benefits leaders useful context for funding, utilisation and country differences rather than relying only on product claims."],
    ],
    cons: [
      ["It is not the same category as a full global administration platform", "Do not assume an excellent LSA layer replaces the system you need for insured benefits, complex enrolment or every local provider workflow."],
      ["The programme design still matters", "A beautifully flexible wallet will not fix an allowance that is badly funded or irrelevant in a particular market."],
    ],
    pricing: "Forma does not publish a simple enterprise list price. Ask for platform fees, card or payment costs, account types, international transaction treatment, implementation and any programme-design support.",
    review: {
      source: 11,
      person: "Forma customer evidence",
      role: "Vendor-published",
      body: "Forma publishes customer examples showing high participation, lower receipt-review workload and global rollouts. I would test those claims against the thing that matters most in an LSA programme: what employees can actually buy in your priority countries and how much admin remains when a transaction falls outside the happy path."
    },
    verdict: "Forma is a strong shortlist choice when global flexibility is the job to be done. If you are trying to give employees meaningful choice across countries and replace scattered reimbursement programmes, it is highly relevant. If you need end-to-end administration of a broad traditional benefits estate, compare it with a different lens.",
    refs: [11, 12],
  },
  {
    id: "benepass",
    name: "Benepass",
    tag: "Card-first flexible benefits for distributed teams",
    best: "Employers that want card-first flexible benefits, lifestyle spending accounts and configurable spending rules for a geographically distributed workforce.",
    summary: "One card and app for employer-funded spending programmes, with configurable rules, HRIS integrations and global usage.",
    priceShort: "Request a quote",
    watch: "Global tax handling, country-specific funding mechanics and how much of your wider core-benefits estate sits outside the platform.",
    intro: [
      "Benepass has a very understandable pitch: give employees one card, let the employer define the rules and stop forcing every flexible benefit through an expense process.",
      "That simplicity is a strength. The platform supports LSAs, wellness, food, family and childcare, professional development, remote work and several US pre-tax accounts. For distributed companies, the card-first model can make a global programme feel much more tangible than another reimbursement portal.",
      "The question I would keep asking is where the card stops. If your brief includes insured benefits, country-specific enrolment and complex provider administration, you may still need another system around it."
    ],
    features: [
      ["Card-first spending", "Physical and virtual cards let employees use employer-funded programmes without submitting every purchase through a traditional expense flow."],
      ["Configurable rules", "Employers define eligible categories and the platform can approve or decline transactions against those rules."],
      ["Global programmes", "Benepass supports global teams and says its client base spans more than 90 countries."],
      ["HRIS and payroll connections", "Integrations can automate enrolment and keep eligibility aligned with workforce data."],
      ["Engagement analytics", "Admin dashboards show spending and participation so teams can refine programme design."],
    ],
    pros: [
      ["Easy to explain to employees", "A card and app are more intuitive than a benefits experience that starts with a policy PDF and ends with a reimbursement form."],
      ["Flexible programme design", "It works well when the company wants one funding mechanism to cover very different employee needs."],
    ],
    cons: [
      ["Global spending is not the same as global benefits administration", "Make sure the shortlist separates card acceptance from local tax, payroll, provider and insured-benefit workflows."],
      ["The US pre-tax depth may not translate directly elsewhere", "International teams should test their own country rules rather than assuming every account type works the same way globally."],
    ],
    pricing: "Benepass does not publish standard enterprise pricing. Ask for platform costs, funding and card economics, international transaction fees, reimbursement handling, integrations and any fees by account type.",
    review: {
      source: 13,
      person: "Benepass customer evidence",
      role: "Vendor-published",
      body: "Benepass publishes examples of employers reducing LSA administration costs and driving high programme engagement. The best demo test is simple: give the platform five normal purchases and five awkward ones from different countries, then see what gets approved, what gets routed to review and what HR has to touch."
    },
    verdict: "Benepass is compelling when flexible spending is the centre of the benefits strategy. The card-first experience is easy to understand and the rules can carry a lot of operational weight. I would be more cautious if the real requirement is broad multinational administration rather than flexible benefits delivery.",
    refs: [13, 14],
  },
  {
    id: "reward-gateway",
    name: "Reward Gateway | Edenred",
    tag: "Benefits, discounts, recognition and employee engagement",
    best: "Global employers that care as much about everyday employee engagement, recognition and discounts as they do about putting benefits into one branded destination.",
    summary: "A global employee engagement platform spanning benefits, discounts, recognition, wellbeing, communications and analytics.",
    priceShort: "Request a quote",
    watch: "Whether you need deep core-benefits administration or primarily an employee engagement and benefits destination.",
    intro: [
      "Reward Gateway | Edenred is the one I would bring into the conversation when the benefits problem is partly an engagement problem.",
      "Its platform goes wider than benefits administration into recognition, discounts, wellbeing, communications and surveys. For a company trying to make the EVP visible every week rather than only during enrolment, that can be a much better fit than a platform optimised mainly for back-office benefits operations.",
      "The trade-off is equally clear: a brilliant engagement layer is not automatically the system you want running every complex eligibility, provider and payroll workflow. Decide which side of that line your project sits on."
    ],
    features: [
      ["Global employee hub", "Benefits, recognition, communications and other employee programmes can sit inside one branded, mobile-first destination."],
      ["Discounts and savings", "The platform offers local and global discounts across dozens of countries, with multi-currency and multilingual support."],
      ["Recognition and reward", "Peer and manager recognition can be combined with locally relevant reward options."],
      ["Communications and segmentation", "Teams can target different employee groups and regions with tailored content."],
      ["Engagement analytics", "Usage and engagement data help HR teams see which programmes employees are actually using."],
    ],
    pros: [
      ["Strong everyday employee proposition", "Discounts, recognition and communications give employees reasons to return outside annual benefits enrolment."],
      ["Good fit for a global EVP programme", "Regional content and local reward options can sit inside a more consistent global experience."],
    ],
    cons: [
      ["It is broader than a benefits administration tool", "If the buying brief is mainly payroll reconciliation, complex eligibility and provider operations, make sure those needs are not being overshadowed by engagement features."],
      ["Module scope can expand quickly", "Recognition, wellbeing, communications, discounts and benefits can all be bought into the story. Keep the commercial case tied to the outcomes you actually need."],
    ],
    pricing: "Reward Gateway | Edenred does not publish standard enterprise pricing. Ask for pricing by module, implementation, regional coverage, integrations, reward economics and support for the countries in your rollout.",
    review: {
      source: 15,
      person: "Reward Gateway | Edenred",
      role: "Vendor-published customer evidence",
      body: "Reward Gateway | Edenred publishes customer examples around platform activity, employee savings and recognition adoption. I would ask for a reference where benefits are part of a genuinely multinational EVP programme, not only a domestic discounts rollout."
    },
    verdict: "Reward Gateway | Edenred is strongest when the project is about making benefits and the wider EVP visible, useful and frequently visited. If your biggest pain sits in back-office benefits administration, I would pair it against a platform that goes deeper on global operations before deciding.",
    refs: [15, 16],
  },
];

const criteria = [
  [
    "Is ‘global’ actually one operating model?",
    "Ask the vendor to show one employee population in the UK, another in Germany and another in Singapore. Can the central team see all three while local rules, providers and eligibility stay different? If the answer involves three portals and an export, you have your answer.",
    "globe",
  ],
  [
    "What happens when eligibility changes on Thursday?",
    "Move an employee from one entity or grade to another, add a dependent and change a benefit rule. Then watch what happens to enrolment, provider data and payroll. I care much more about that workflow than a polished open-enrolment screen.",
    "rules",
  ],
  [
    "Can payroll close without a reconciliation spreadsheet?",
    "Follow one deduction from the benefit election through provider data and payroll. Which system catches a mismatch, who is alerted and what has to be fixed by hand? This is where ‘automation’ becomes measurable rather than decorative.",
    "payroll",
  ],
  [
    "Will employees outside HQ actually use it?",
    "Test mobile access, language, deskless employees, dependants and people without a corporate email address. Global consistency is not useful if the employee experience only really works for laptop users in the head office.",
    "mobile",
  ],
  [
    "Can you explain the spend to Finance?",
    "Ask for global cost, utilisation, take-up and segment reporting without an analyst rebuilding the story in Excel. Then ask what happens when Finance wants to know why one market costs more and whether the extra spend changed employee usage.",
    "chart",
  ],
  [
    "How much control stays with your team?",
    "Create a new market, change an eligibility rule and update a communication. If every change needs a vendor ticket, ask about turnaround times and fees. Enterprise flexibility is partly about what your own team can safely configure after go-live.",
    "sliders",
  ],
] as const;

const intro = [
  "The quickest way to make a global benefits shortlist useless is to compare whether each platform has analytics, integrations, a mobile app and ‘AI’. Seven green ticks later, you still have no idea which one will survive your actual benefits programme.",
  "I found it more useful to picture the mess instead: 6,000 employees, 18 countries, three payrolls, local providers that refuse to behave the same way, a new market going live next quarter and a CFO asking why benefits spend is up 11%.",
  "That is the standard I have used here.",
  "I looked at what each platform says it can run, the customer stories it publishes, how it handles global versus local configuration, where the employee experience starts and stops, and what I would make the vendor prove before signing anything.",
  "This is not a hands-on lab test, and I have not invented one. It is a buyer-style review of the public evidence available in October 2026, written around the workflows that tend to make enterprise benefits difficult in the first place.",
  "The seven platforms below are not interchangeable. That is the point of the guide.",
];

const choices = [
  ["Global benefits operations are held together by spreadsheets, tickets and manual payroll checks", "Ben", "Change an eligibility rule mid-cycle, move an employee between entities and show exactly how the provider and payroll records reconcile."],
  ["You want a mature global benefits and reward ecosystem with a long enterprise track record", "Benifex", "Show the same global benefit in three markets with different local rules, then show what the internal team can configure without professional services."],
  ["You want benefits technology and global consulting or broking in the same wider relationship", "Darwin", "Separate the platform workflow from the Mercer service layer so you can see who owns configuration, data and day-to-day change."],
  ["You are operating at Fortune-scale across health, wealth, leave and benefits administration", "Alight Worklife", "Map one complex employee journey across enrolment, leave and health support, including every system and handoff."],
  ["Your main problem is global lifestyle benefits, LSAs and equitable flexible funding", "Forma", "Build the same allowance in three countries and compare employee choice, tax treatment, utilisation reporting and exception handling."],
  ["You want a card-first flexible benefits experience for a distributed workforce", "Benepass", "Run normal and edge-case transactions in multiple countries and show which rules are automatic versus manually reviewed."],
  ["You want benefits to sit inside a broader engagement, recognition and EVP destination", "Reward Gateway | Edenred", "Show how benefits, discounts, recognition and communications work for one global campaign without creating separate regional experiences."],
] as const;

const iconPaths: Record<string, string[]> = {
  globe: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M2 12h20", "M12 2a15 15 0 0 1 0 20", "M12 2a15 15 0 0 0 0 20"],
  rules: ["M4 6h16", "M4 12h10", "M4 18h16", "M18 10v4", "M16 12h4"],
  payroll: ["M4 3h16v18H4z", "M8 7h8", "M8 11h3", "M8 15h8", "M15 10v3", "M13.5 11.5h3"],
  mobile: ["M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z", "M10 18h4"],
  chart: ["M4 20V10", "M10 20V4", "M16 20v-7", "M22 20H2"],
  sliders: ["M4 6h10", "M18 6h2", "M14 4v4", "M4 12h2", "M10 12h10", "M8 10v4", "M4 18h12", "M20 18h0", "M18 16v4"],
  spark: ["m12 3 1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3Z", "m5 16 .8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16Z"],
  check: ["m5 12 4 4L19 6"],
  alert: ["M12 3 2 21h20L12 3Z", "M12 9v5", "M12 18h.01"],
  arrow: ["M5 12h14", "m13 6 6 6-6 6"],
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths = iconPaths[name] || iconPaths.spark;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}

function HeroControlRoom() {
  const markets = [
    ["UK", "2,180", "Ready", "orange"],
    ["DE", "1,040", "Ready", "teal"],
    ["SG", "620", "2 checks", "pink"],
    ["US", "2,160", "Ready", "orange"],
  ] as const;

  return (
    <figure className="gb-hero-art" aria-label="Illustrative global employee benefits control room showing country populations, payroll checks and global spend visibility">
      <div className="gb-orbit-card gb-orbit-a"><span>18 markets</span><strong>One benefits view</strong></div>
      <div className="gb-orbit-card gb-orbit-b"><span>Payroll</span><strong>3 checks before close</strong></div>
      <div className="gb-control">
        <div className="gb-control-top">
          <div>
            <span className="gb-ben-switch">B</span>
            <div><small>GLOBAL BENEFITS</small><strong>Operations overview</strong></div>
          </div>
          <span className="gb-live"><i /> Live data</span>
        </div>
        <div className="gb-control-body">
          <div className="gb-control-kpis">
            <div><small>Employees</small><strong>6,000</strong><span>18 countries</span></div>
            <div><small>Monthly spend</small><strong>£1.42m</strong><span>+3.4% vs plan</span></div>
            <div><small>Utilisation</small><strong>78%</strong><span>Global average</span></div>
          </div>
          <div className="gb-map-shell">
            <div className="gb-map-head"><span>Market readiness</span><span>Payroll closes in 2d</span></div>
            <svg className="gb-map-lines" viewBox="0 0 520 180" aria-hidden="true">
              <path d="M260 86 C205 35 140 38 88 58" />
              <path d="M260 86 C230 55 210 65 184 70" />
              <path d="M260 86 C305 45 356 42 416 61" />
              <path d="M260 86 C330 112 382 124 445 134" />
              <circle cx="260" cy="86" r="8" />
              <circle cx="88" cy="58" r="5" />
              <circle cx="184" cy="70" r="5" />
              <circle cx="416" cy="61" r="5" />
              <circle cx="445" cy="134" r="5" />
            </svg>
            <div className="gb-map-core"><span>HQ</span><strong>Rules synced</strong><small>17 / 18 markets</small></div>
          </div>
          <div className="gb-market-grid">
            {markets.map(([country, people, status, tone]) => (
              <div className="gb-market" key={country}>
                <span className={`gb-dot is-${tone}`} />
                <div><strong>{country}</strong><small>{people} employees</small></div>
                <b>{status}</b>
              </div>
            ))}
          </div>
          <div className="gb-control-alert">
            <Icon name="alert" size={16} />
            <div><strong>Singapore payroll mismatch</strong><span>12 employees changed eligibility after provider file cut-off.</span></div>
            <button type="button">Review</button>
          </div>
        </div>
      </div>
    </figure>
  );
}

function StressTest() {
  const steps = [
    ["01", "New market", "Poland goes live in 30 days", "Who builds the rules?"],
    ["02", "Eligibility", "42 employees change grade", "What updates automatically?"],
    ["03", "Payroll", "One provider file is wrong", "Who catches it before close?"],
    ["04", "Finance", "Spend is 11% over plan", "Can you explain why?"],
  ] as const;

  return (
    <figure className="gb-stress" aria-label="Global benefits stress test showing four operational scenarios to use in vendor demos">
      <div className="gb-stress-head">
        <div><span className="gb-eyebrow">The demo I would actually run</span><h3>The 4:47pm Friday stress test</h3></div>
        <span className="gb-stress-tag">No perfect demo data</span>
      </div>
      <div className="gb-stress-grid">
        {steps.map(([n, title, event, question], i) => (
          <div className="gb-stress-card" key={n}>
            <div className="gb-stress-number">{n}</div>
            <span className={`gb-stress-accent is-${i % 3}`} />
            <strong>{title}</strong>
            <p>{event}</p>
            <small>{question}</small>
          </div>
        ))}
      </div>
      <figcaption>If a platform can only look good with tidy employee data and a pre-scripted enrolment flow, I would rather find that out before implementation.</figcaption>
    </figure>
  );
}

function VendorSignal({ vendor }: { vendor: Vendor }) {
  const signal = vendor.id === "ben" ? ["Global ops", "Payroll", "Insights"]
    : vendor.id === "benifex" ? ["Global", "Reward", "Experience"]
    : vendor.id === "darwin" ? ["Admin", "Advisory", "Analytics"]
    : vendor.id === "alight" ? ["Scale", "Health", "Leaves"]
    : vendor.id === "forma" ? ["LSA", "Global", "Flexibility"]
    : vendor.id === "benepass" ? ["Card-first", "LSA", "Rules"]
    : ["Engagement", "Discounts", "Recognition"];

  return (
    <div className="gb-signal" aria-label={`${vendor.name} positioning summary`}>
      <span className="gb-signal-label">Where it is strongest</span>
      <div>{signal.map((s, i) => <span className={`is-${i}`} key={s}>{s}</span>)}</div>
    </div>
  );
}

export type Props = {
  portfolioHref?: string;
  contactHref?: string;
};

const subheads = [["features", "Key capabilities"], ["pros", "Pros"], ["cons", "Limitations"], ["pricing", "Pricing"], ["reviews", "Customer evidence"]] as const;

export default function BestGlobalEmployeeBenefitsPlatforms2026({
  portfolioHref = "/#work",
  contactHref = "https://www.seo-growup.com/get-in-touch",
}: Props = {}) {
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const [copyStatus, setCopyStatus] = useState("Copy article link ↗");
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      const node = articleRef.current;
      if (!node) return;
      const top = node.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(1, node.offsetHeight - window.innerHeight);
      setProgress(Math.round(Math.max(0, Math.min(1, (window.scrollY - top) / distance)) * 100));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-12% 0px -72% 0px" }
    );

    articleRef.current?.querySelectorAll("section[id],h3[id]").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split("#")[0]);
      setCopyStatus("Link copied ✓");
    } catch {
      setCopyStatus("Copy the URL from your address bar");
    }
  };

  const sourceLink = (n: number) => sources[n - 1][1];
  const jump = (id: string, label: string) => (
    <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>
  );

  return (
    <div className="gb-page" id="gb-top">
      <style>{styles}</style>
      <a className="gb-skip" href="#introduction">Skip to article</a>
      <div className="gb-progress" style={{ width: `${progress}%` }} />

      <div className="gb-wrap">
        <main>
          <header className="gb-hero">
            <div className="gb-hero-main gb-container">
              <div className="gb-hero-copy">
                <div className="gb-eyebrow">HR tech writing sample</div>
                <h1>7 Best Global Employee Benefits Platforms <span>for Enterprise Teams in 2026</span></h1>
                <p className="gb-deck">A practical comparison of seven platforms across global administration, local flexibility, employee experience, payroll controls and the reporting Reward teams need to defend spend.</p>
                <div className="gb-meta">
                  <span>By GrowUp | For Ben</span>
                  <time dateTime="2026-10-05">Reviewed 5 October 2026</time>
                  <span>18 min read</span>
                </div>
                <a className="gb-jump" href="#shortlist">Compare the seven platforms <span>↓</span></a>
              </div>
              <HeroControlRoom />
            </div>
          </header>

          <div className="gb-strip">
            <span className="gb-eyebrow">In this guide</span>
            {vendors.map((v) => <a key={v.id} href={`#${v.id}`}>{v.name}</a>)}
          </div>

          <div className="gb-layout">
            <aside className="gb-toc">
              <div className="gb-eyebrow">On this page</div>
              <nav aria-label="Article contents">
                {jump("method", "How I compared them")}
                {jump("criteria", "What enterprise teams should test")}
                {jump("shortlist", "The seven platforms compared")}
                {vendors.map((v, i) => (
                  <details key={v.id} open={active.startsWith(v.id)}>
                    <summary>{i + 1}. {v.name}</summary>
                    {jump(v.id, "Overview")}
                    {subheads.map(([id, label]) => jump(`${v.id}-${id}`, label))}
                  </details>
                ))}
                {jump("choose", "Which platform should you choose?")}
                {jump("sources", "Sources & research")}
              </nav>
              <div className="gb-toc-foot">
                {progress}% of article read
                <button className="gb-copy-button" onClick={copyLink}>{copyStatus}</button>
                <span className="gb-sr-status" role="status" aria-live="polite">{copyStatus === "Link copied ✓" ? "Copied to clipboard" : ""}</span>
              </div>
            </aside>

            <article className="gb-article" ref={articleRef}>
              <details className="gb-mobile-toc">
                <summary>Explore this guide</summary>
                <nav aria-label="Mobile article contents">
                  {jump("method", "How I compared them")}
                  {jump("criteria", "What to test")}
                  {jump("shortlist", "Compare the platforms")}
                  {vendors.map((v) => jump(v.id, v.name))}
                  {jump("choose", "Choose your shortlist")}
                </nav>
              </details>

              <section id="introduction" className="gb-intro" style={{ paddingTop: 0 }} aria-label="Introduction">
                {intro.slice(0, 2).map((t) => <p key={t}>{t}</p>)}
                <StressTest />
                {intro.slice(2).map((t) => <p key={t}>{t}</p>)}
              </section>

              <section id="method">
                <h2>How I compared global employee benefits platforms</h2>
                <p>I did not give points for having a mobile app, dashboards or integrations. At enterprise level, those are table stakes. I looked for evidence that the platform can handle the operational joins where global programmes usually become painful.</p>
                <div className="gb-method-grid">
                  <div><span>01</span><strong>Global operating model</strong><p>Can one central team govern multiple markets without forcing every country into the same setup?</p></div>
                  <div><span>02</span><strong>Admin depth</strong><p>What happens to eligibility, enrolment, provider files, payroll and audit trails after the sales demo?</p></div>
                  <div><span>03</span><strong>Employee reality</strong><p>Does the experience work for deskless, mobile and multilingual populations, not only office workers?</p></div>
                  <div><span>04</span><strong>Decision quality</strong><p>Can Reward leaders explain spend, usage and exceptions without rebuilding the data elsewhere?</p></div>
                </div>
                <div className="gb-note"><Icon name="spark" /><div><strong>A note on ‘best’</strong><p>These platforms solve different versions of the problem. I have ranked them for a global enterprise buying brief, not claimed that one product is universally better for every company.</p></div></div>
              </section>

              <section id="criteria">
                <h2>What should enterprise teams look for in a global benefits platform?</h2>
                <p>The best global employee benefits platform is not the one with the longest feature list. It is the one that can keep global governance, local rules, payroll accuracy and employee usability intact at the same time.</p>
                <p style={{ marginTop: -5 }}>I would test those claims with scenarios that are deliberately a little inconvenient.</p>
                <div className="gb-crit">
                  {criteria.map(([title, body, icon], i) => (
                    <div className="gb-crit-row" key={title}>
                      <span className="gb-icon"><Icon name={icon} /></span>
                      <div className="gb-crit-text"><span className="gb-check-num">0{i + 1}</span><strong>{title}</strong><p>{body}</p></div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="shortlist">
                <h2>7 best global employee benefits platforms for enterprise teams in 2026</h2>
                <p>Use this as a shortlist, not a league table. The important column is the last one: it tells you what I would make each vendor prove before the buying process gets too far.</p>
                <div className="gb-table-shell gb-clean-shell">
                  <div className="gb-table-scroll" role="region" aria-label="Global employee benefits platform comparison table; scroll horizontally on smaller screens" tabIndex={0}>
                    <table className="gb-table gb-clean">
                      <thead><tr><th scope="col">Platform</th><th scope="col">Best for</th><th scope="col">Main distinction</th><th scope="col">Pricing / what to check</th></tr></thead>
                      <tbody>
                        {vendors.map((v) => (
                          <tr key={v.id}>
                            <td><a href={`#${v.id}`}>{v.name} ↗</a></td>
                            <td>{v.best}</td>
                            <td>{v.summary}</td>
                            <td><strong>{v.priceShort}.</strong><small>Check: {v.watch}</small></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="gb-table-footer">Product scope and public evidence reviewed on 5 October 2026. Enterprise pricing is generally quote-based and can change by population, market, modules and service scope.</p>
                </div>
              </section>

              {vendors.map((v, i) => (
                <section className="gb-tool" id={v.id} key={v.id} aria-labelledby={`${v.id}-title`}>
                  <div className="gb-tool-heading">
                    <span className="gb-rank">0{i + 1}</span>
                    <div><h2 id={`${v.id}-title`}>{v.name}</h2><div className="gb-eyebrow">{v.tag}</div></div>
                  </div>
                  <p className="gb-best"><strong>Best for: </strong>{v.best}</p>
                  <VendorSignal vendor={v} />
                  {v.intro.map((t) => <p key={t}>{t}</p>)}

                  <h3 id={`${v.id}-features`}>Key capabilities</h3>
                  <ul className="gb-feature-list">{v.features.map(([title, body]) => <li key={title}><strong>{title}</strong><span>{body}</span></li>)}</ul>

                  <div className="gb-balance">
                    <div><h3 id={`${v.id}-pros`}>+ Pros</h3><ul>{v.pros.map(([t, b]) => <li key={t}><strong>{t}</strong>{b}</li>)}</ul></div>
                    <div><h3 id={`${v.id}-cons`}>− Cons & limitations</h3><ul>{v.cons.map(([t, b]) => <li key={t}><strong>{t}</strong>{b}</li>)}</ul></div>
                  </div>

                  <div className="gb-price"><h3 id={`${v.id}-pricing`}>Pricing</h3><p>{v.pricing}</p></div>

                  <h3 id={`${v.id}-reviews`}>What does the customer evidence say about {v.name}?</h3>
                  <div className="gb-review">
                    <div className="gb-eyebrow">Customer evidence: what I could verify</div>
                    {v.review.quote && <blockquote>“{v.review.quote}”</blockquote>}
                    {v.review.person && <p className="gb-review-person">{v.review.person}<br /><span>{v.review.role}</span></p>}
                    <p>{v.review.body}</p>
                    <a href={sourceLink(v.review.source)} target="_blank" rel="noreferrer">Read the source ↗</a>
                  </div>

                  <div className="gb-verdict"><div className="gb-eyebrow">My take</div><p>{v.verdict}</p></div>
                  <div className="gb-sources-inline">{v.refs.map((n) => <a href={`#source-${n}`} key={n}>[{n}] {sources[n - 1][0]}</a>)}</div>
                </section>
              ))}

              <section id="choose">
                <h2>Which global employee benefits platform should you choose?</h2>
                <p>I would narrow the list by the operational problem you need the platform to own. That gives you a much better first demo than asking seven vendors to walk through the same generic feature checklist.</p>
                <div className="gb-table-shell gb-clean-shell">
                  <div className="gb-table-scroll" role="region" aria-label="Shortlist global employee benefits platforms by business need" tabIndex={0}>
                    <table className="gb-table gb-clean gb-choose-table">
                      <thead><tr><th scope="col">Where the friction shows up</th><th scope="col">Start with</th><th scope="col">What I would make them show you</th></tr></thead>
                      <tbody>{choices.map(([problem, tool, test]) => <tr key={problem}><td><strong>{problem}</strong></td><td>{tool}</td><td>{test}</td></tr>)}</tbody>
                    </table>
                  </div>
                </div>

                <div className="gb-ending">
                  <span className="gb-eyebrow">The bit I would not compromise on</span>
                  <p>A global benefits platform should make the programme easier to run when the data is late, the country rules differ and somebody changes eligibility two days before payroll. If the value only appears in the employee homepage, you are probably still buying yourself a lot of work behind it.</p>
                </div>

                <div className="gb-author">
                  <div className="gb-author-mark" aria-hidden="true"><span>G</span></div>
                  <div className="gb-author-body"><div className="gb-author-eyebrow">Written by</div><div className="gb-author-name">GrowUp</div><p className="gb-author-bio">GrowUp writes research-led content for complex B2B SaaS and HR technology products. This is a portfolio sample written for Ben; it is not published by or affiliated with Ben.</p></div>
                </div>
              </section>

              <section id="sources">
                <h2>Sources & research</h2>
                <p style={{ fontSize: 14, color: "#596a65" }}>Product facts, coverage claims and customer examples below come from vendor-published sources. They establish what each vendor publicly says and shows, not independently measured comparative performance. Public information was reviewed on 5 October 2026.</p>
                <ol className="gb-source-list">{sources.map(([title, url], i) => <li key={url} id={`source-${i + 1}`}><a href={url} target="_blank" rel="noreferrer">{title} ↗</a></li>)}</ol>
              </section>
            </article>
          </div>

          <section className="gb-cta">
            <div><div className="gb-eyebrow">GrowUp · HR tech content writing</div><h2>Content for complex HR technology.</h2><p>Buyer guides, research pieces and customer stories that explain the product properly, answer real buying questions and support search, sales and pipeline.</p></div>
            <div><a href={contactHref}>Commission an article like this <span>↗</span></a></div>
          </section>
        </main>

        <footer className="gb-footer"><a href={portfolioHref}>← Back to writing portfolio</a><a href="#gb-top">Back to top ↑</a></footer>
      </div>
    </div>
  );
}

const styles = String.raw`
.gb-page{--ink:#002924;--ink-2:#05382F;--muted:#596a65;--line:#d9dfd7;--paper:#F7F9F2;--paper-2:#F2F4EA;--orange:#FF6635;--pink:#FFA2A8;--teal:#6BB8A8;--teal-dark:#26797E;font-family:Inter,Arial,Helvetica,sans-serif;background:var(--paper);color:var(--ink);line-height:1.72;font-size:17px;-webkit-font-smoothing:antialiased}.gb-page *{box-sizing:border-box}.gb-page h1,.gb-page h2,.gb-page h3,.gb-page p,.gb-page figure,.gb-page blockquote{margin:0}.gb-page a{color:inherit;text-underline-offset:4px}.gb-page button,.gb-page input{font:inherit}.gb-page button,.gb-page summary{cursor:pointer}.gb-page :focus-visible{outline:3px solid var(--orange);outline-offset:5px}.gb-wrap{width:min(1320px,calc(100% - 96px));margin:auto}.gb-skip{position:fixed;left:18px;top:12px;z-index:90;background:#fff;padding:11px 16px;transform:translateY(-180%)}.gb-skip:focus{transform:none}.gb-progress{position:fixed;top:0;left:0;height:3px;background:var(--orange);z-index:80;transition:width .08s linear}.gb-eyebrow{text-transform:uppercase;letter-spacing:.15em;font-size:11px;font-weight:750;line-height:1.6}

.gb-hero{background:#041b1c;color:#f5f8f2;overflow:hidden;width:100vw;position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;padding-top:96px}.gb-hero:before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:54px 54px;mask-image:linear-gradient(to right,transparent,black 38%,black);pointer-events:none}.gb-container{width:min(1320px,calc(100% - 96px));margin:auto}.gb-hero-main{min-height:680px;display:grid;grid-template-columns:1.02fr .98fr;gap:34px;align-items:center;padding-block:44px 62px;position:relative;z-index:2}.gb-hero-copy{position:relative;z-index:2}.gb-hero .gb-eyebrow{color:var(--orange)}.gb-hero h1{color:#F7F9F2;font-size:clamp(39px,4.1vw,62px);line-height:1.06;font-weight:650;letter-spacing:-.052em;margin:20px 0 24px;max-width:720px}.gb-hero h1 span{display:block;color:#F7F9F2}.gb-deck{font-size:18px;line-height:1.65;max-width:650px;color:#eef2ea}.gb-meta{display:flex;gap:15px;flex-wrap:wrap;margin-top:27px;font-size:12px;color:#9db1a5}.gb-jump{display:inline-flex;gap:26px;align-items:center;text-decoration:none;margin-top:27px;font-size:14px;font-weight:750;border-bottom:1px solid var(--orange);padding:4px 0;color:var(--orange)!important}.gb-hero-art{position:relative;min-width:0;width:100%;padding:24px 4px 24px 22px}.gb-control{background:#F7F9F2;color:#002924;border:1px solid rgba(255,255,255,.25);box-shadow:0 36px 80px rgba(0,0,0,.28);border-radius:16px;overflow:hidden;transform:rotate(.35deg)}.gb-control-top{height:58px;padding:0 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #dfe5dc;background:#F2F4EA}.gb-control-top>div{display:flex;align-items:center;gap:11px}.gb-ben-switch{display:inline-flex;width:31px;height:31px;border-radius:50%;align-items:center;justify-content:center;background:#002924;color:#F7F9F2;font-weight:900;font-size:14px;box-shadow:inset 0 0 0 5px #05382F}.gb-control-top small{display:block;font-size:7px;letter-spacing:.15em;color:#6f7f79}.gb-control-top strong{display:block;font-size:11px;margin-top:1px}.gb-live{font-size:8px;text-transform:uppercase;letter-spacing:.12em;color:#4E7A70;display:flex;align-items:center;gap:6px}.gb-live i{width:6px;height:6px;background:#6BB8A8;border-radius:50%}.gb-control-body{padding:18px}.gb-control-kpis{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #dfe5dc;border-radius:10px;overflow:hidden;background:#fff}.gb-control-kpis>div{padding:14px 15px}.gb-control-kpis>div+div{border-left:1px solid #dfe5dc}.gb-control-kpis small{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.12em;color:#83908b}.gb-control-kpis strong{display:block;font-size:22px;line-height:1.1;margin:5px 0 3px;letter-spacing:-.04em}.gb-control-kpis span{font-size:8px;color:#66766f}.gb-map-shell{height:188px;position:relative;margin-top:14px;background:#002924;border-radius:11px;overflow:hidden}.gb-map-head{height:38px;padding:0 13px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.1);font-size:8px;color:#dbe6df}.gb-map-head span:last-child{color:#FFA2A8}.gb-map-lines{position:absolute;inset:40px 0 0;width:100%;height:148px}.gb-map-lines path{fill:none;stroke:#6BB8A8;stroke-width:1;stroke-dasharray:4 6;opacity:.55}.gb-map-lines circle{fill:#FF6635}.gb-map-lines circle:not(:first-of-type){fill:#F7F9F2}.gb-map-core{position:absolute;left:50%;top:53%;transform:translate(-50%,-50%);width:98px;height:76px;background:#F7F9F2;border:4px solid #05382F;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 9px 24px rgba(0,0,0,.25)}.gb-map-core span{font-size:7px;letter-spacing:.14em;color:#6f7f79}.gb-map-core strong{font-size:10px;margin:3px 0}.gb-map-core small{font-size:7px;color:#26797E}.gb-market-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.gb-market{display:grid;grid-template-columns:8px 1fr auto;gap:8px;align-items:center;padding:9px 10px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.gb-dot{width:7px;height:7px;border-radius:50%}.gb-dot.is-orange{background:#FF6635}.gb-dot.is-teal{background:#6BB8A8}.gb-dot.is-pink{background:#FFA2A8}.gb-market strong{display:block;font-size:9px}.gb-market small{display:block;font-size:7px;color:#88948f}.gb-market b{font-size:7px;font-weight:700;color:#4E7A70}.gb-control-alert{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;margin-top:10px;padding:11px 12px;background:#FFF4F0;border:1px solid #FFD5C8;border-radius:9px;color:#CA3A0C}.gb-control-alert strong{display:block;font-size:9px}.gb-control-alert span{display:block;font-size:7px;line-height:1.45;color:#8f4b39;margin-top:2px}.gb-control-alert button{border:0;background:#FF6635;color:#fff;border-radius:20px;font-size:7px;font-weight:800;padding:6px 9px}.gb-orbit-card{position:absolute;z-index:4;padding:10px 12px;border-radius:9px;box-shadow:0 16px 30px rgba(0,0,0,.22);min-width:122px}.gb-orbit-card span{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.13em}.gb-orbit-card strong{display:block;font-size:9px;margin-top:2px}.gb-orbit-a{left:-5px;top:4px;background:#FF6635;color:#fff;transform:rotate(-3deg)}.gb-orbit-b{right:-17px;bottom:5px;background:#FFA2A8;color:#002924;transform:rotate(2.5deg)}

.gb-strip{display:flex;align-items:center;gap:24px;padding:23px 0;border-block:1px solid var(--line);font-size:14px;flex-wrap:wrap}.gb-strip .gb-eyebrow{color:#66766f;margin-right:auto}.gb-strip a{font-weight:750;text-decoration:none}.gb-layout{display:grid;grid-template-columns:235px minmax(0,850px);gap:75px;justify-content:space-between;padding-top:60px;align-items:start}.gb-toc{position:sticky;top:26px;max-height:calc(100vh - 52px);overflow-y:auto;padding-right:16px}.gb-toc>.gb-eyebrow{color:var(--muted);margin-bottom:17px}.gb-toc nav>a,.gb-toc summary{display:block;text-decoration:none;font-size:13px;padding:9px 0;line-height:1.5}.gb-toc details{border-bottom:1px solid var(--line)}.gb-toc summary{font-weight:700;list-style:none;display:flex;justify-content:space-between;gap:10px}.gb-toc summary::after{content:'+';font-weight:400;color:#4E7A70}.gb-toc details[open] summary::after{content:'−'}.gb-toc details a{display:block;font-size:12px;color:var(--muted);padding:5px 0 5px 14px;text-decoration:none}.gb-toc a[aria-current='location']{color:#26797E;font-weight:850}.gb-toc-foot{font-size:12px;border-top:1px solid var(--line);margin-top:25px;padding-top:18px;color:var(--muted)}.gb-copy-button{display:block;background:transparent;border:0;color:#26797E;padding:12px 0 0;font-size:12px;font-weight:750}.gb-sr-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.gb-mobile-toc{display:none}.gb-article{min-width:0}.gb-article p{margin-bottom:21px}.gb-article section{scroll-margin-top:35px;padding-top:60px}.gb-intro p:first-child{font-size:29px;line-height:1.3;font-weight:650;letter-spacing:-.035em}.gb-article h2{font-size:36px;line-height:1.2;letter-spacing:-.045em;font-weight:650;margin-bottom:24px;text-wrap:balance}.gb-article h3{font-size:22px;line-height:1.3;letter-spacing:-.025em;margin:35px 0 18px;scroll-margin-top:35px}

.gb-stress{margin:34px 0 38px!important;padding:24px;border:1px solid #d9dfd7;border-radius:14px;background:#fff}.gb-stress-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:20px}.gb-stress-head .gb-eyebrow{color:#26797E;font-size:9px}.gb-stress-head h3{margin:5px 0 0;font-size:24px}.gb-stress-tag{font-size:9px;letter-spacing:.12em;text-transform:uppercase;border:1px solid #FF6635;color:#CA3A0C;border-radius:999px;padding:5px 10px;white-space:nowrap}.gb-stress-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.gb-stress-card{position:relative;min-height:168px;padding:16px;border:1px solid #dfe5dc;border-radius:10px;background:#F7F9F2;overflow:hidden}.gb-stress-number{font-size:10px;color:#73827c}.gb-stress-accent{position:absolute;right:14px;top:14px;width:11px;height:11px;border-radius:50%;background:#FF6635}.gb-stress-accent.is-1{background:#FFA2A8}.gb-stress-accent.is-2{background:#6BB8A8}.gb-stress-card strong{display:block;font-size:15px;margin:23px 0 5px}.gb-stress-card p{font-size:12px;line-height:1.5;margin:0 0 14px;color:#42554e}.gb-stress-card small{display:block;font-size:10px;line-height:1.45;color:#26797E;font-weight:700}.gb-stress figcaption{font-size:11px;color:#708079;border-top:1px solid #e2e7df;margin-top:18px;padding-top:14px;line-height:1.65}

.gb-method-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:28px 0}.gb-method-grid>div{padding:21px;border:1px solid #d9dfd7;background:#fff;border-radius:11px}.gb-method-grid span{font-size:10px;color:#26797E;font-weight:800}.gb-method-grid strong{display:block;font-size:16px;margin:11px 0 6px}.gb-article .gb-method-grid p{font-size:14px;line-height:1.6;color:var(--muted);margin:0}.gb-note{display:flex;gap:16px;align-items:flex-start;padding:21px 22px;background:#FFF4F0;border:1px solid #FFD5C8;border-radius:10px;margin-top:25px;color:#7c3c2a}.gb-note svg{margin-top:2px;color:#FF6635}.gb-note strong{display:block;font-size:15px;color:#7c3c2a;margin-bottom:5px}.gb-article .gb-note p{font-size:14px;line-height:1.65;margin:0;color:#7c3c2a}

.gb-crit{display:flex;flex-direction:column;gap:18px;margin-top:30px}.gb-crit-row{position:relative;display:flex;gap:20px;align-items:flex-start;padding:22px 24px;background:#fff;border:1px solid #d9dfd7;border-radius:10px}.gb-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;width:48px;height:48px;border-radius:50%;background:#E3F4E1;color:#26797E}.gb-crit-row:nth-child(3n+2) .gb-icon{background:#FFDDDF;color:#A4433D}.gb-crit-row:nth-child(3n) .gb-icon{background:#FFEBC6;color:#CA3A0C}.gb-crit-row:not(:last-child):after{content:'';position:absolute;left:47px;bottom:-18px;height:16px;border-left:1px dashed #b8c6bf}.gb-crit-text{min-width:0}.gb-check-num{display:block;font-size:11px;color:#7b8983;font-weight:650;margin-bottom:4px}.gb-crit-text strong{display:block;font-size:18px;margin-bottom:6px}.gb-article .gb-crit-text p{font-size:15px;line-height:1.65;margin:0;color:#263d36}

.gb-table-shell{margin:30px 0}.gb-table-scroll{overflow-x:auto}.gb-table-scroll:focus{outline-offset:-3px}.gb-table{width:100%;border-collapse:collapse;font-size:14px;min-width:760px;line-height:1.58}.gb-clean th{background:transparent;color:#76847f;font-size:10px;letter-spacing:.14em;text-transform:uppercase;font-weight:750;padding:0 20px 14px 0;border-bottom:1px solid #002924;text-align:left;vertical-align:bottom}.gb-clean th:first-child{width:16%}.gb-clean td{padding:24px 20px 24px 0;border-bottom:1px solid #d9dfd7;vertical-align:top;color:#586963}.gb-clean td:first-child a{font-size:16px;font-weight:800;color:#002924;text-decoration:none;letter-spacing:-.01em}.gb-clean td strong{display:block;font-size:14px;color:#002924;margin-bottom:2px}.gb-clean td small{font-size:12px;color:#7b8983;margin-top:2px;display:block}.gb-table-footer{font-size:12px!important;line-height:1.65;padding:16px 0 0;color:#7b8983;margin:0!important}

.gb-tool{border-top:1px solid #b9c6bf;margin-top:60px;padding-top:36px!important}.gb-tool-heading{display:flex;gap:20px;align-items:flex-start;margin-bottom:20px}.gb-rank{display:flex;align-items:center;justify-content:center;flex:none;height:54px;width:54px;border:1px solid #b9c6bf;background:#F2F4EA;font-size:18px;font-weight:700;border-radius:50%}.gb-tool-heading h2{font-size:44px;margin:1px 0 5px;line-height:1.1}.gb-tool-heading .gb-eyebrow{font-size:10px;color:#4E7A70}.gb-best{padding:18px 22px;background:#E3F4E1;border-radius:7px;font-size:16px;margin:25px 0!important}.gb-signal{display:flex;justify-content:space-between;align-items:center;gap:18px;border-block:1px solid #d9dfd7;padding:14px 0;margin:25px 0}.gb-signal-label{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#7c8a84;font-weight:750}.gb-signal>div{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.gb-signal>div span{font-size:10px;font-weight:750;border-radius:999px;padding:5px 9px;background:#FFEBC6;color:#8e4b18}.gb-signal>div span.is-1{background:#FFDDDF;color:#88484a}.gb-signal>div span.is-2{background:#E3F4E1;color:#26797E}.gb-feature-list{list-style:none;margin:0;padding:0}.gb-feature-list li{padding:17px 0;border-top:1px solid var(--line);display:grid;grid-template-columns:190px 1fr;gap:25px;font-size:16px}.gb-feature-list strong{font-size:15px}.gb-feature-list span{color:#18352d}.gb-balance{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin:30px 0}.gb-balance>div{padding:23px 25px;background:#E3F4E1;border-top:3px solid #6BB8A8}.gb-balance>div+div{background:#FFF4F0;border-color:#FF6635}.gb-balance h3{font-size:18px;margin:0 0 20px}.gb-balance ul{list-style:none;padding:0;margin:0}.gb-balance li{font-size:14px;line-height:1.7;margin-top:17px;color:#17372f}.gb-balance li strong{display:block;font-size:15px;color:#002924;margin-bottom:4px}.gb-price{border-block:1px solid var(--line);padding:22px 0;margin-top:30px}.gb-price h3{margin:0 0 10px}.gb-price p{margin:0;font-size:16px}.gb-review{margin:28px 0;padding:26px 30px;border:1px solid #d9dfd7;border-radius:10px;background:#fff}.gb-review .gb-eyebrow{font-size:10px;color:#4E7A70;margin-bottom:13px}.gb-review blockquote{font-size:25px;line-height:1.42;letter-spacing:-.028em;margin:14px 0 18px}.gb-review .gb-review-person{font-size:13px;font-weight:750;margin:0 0 17px}.gb-review .gb-review-person span{font-weight:400;color:var(--muted)}.gb-review p{font-size:15px;color:var(--muted);margin:0}.gb-review a{font-size:12px;display:inline-block;margin-top:15px;color:#26797E;font-weight:750}.gb-verdict{padding:23px 25px;background:#002924;color:#F7F9F2;border-radius:7px;margin-top:30px}.gb-verdict .gb-eyebrow{color:#FF6635;margin-bottom:10px}.gb-verdict p{font-size:16px;line-height:1.7;margin:0}.gb-sources-inline{display:flex;flex-wrap:wrap;gap:16px;margin-top:17px}.gb-sources-inline a{font-size:12px;color:#4E7A70}.gb-choose-table{font-size:15px}.gb-choose-table th{width:auto!important}.gb-ending{margin-top:36px;padding:28px 30px;background:#FFDDDF;border-left:4px solid #FF6635;border-radius:8px}.gb-ending .gb-eyebrow{font-size:9px;color:#A4433D}.gb-ending p{font-size:18px;line-height:1.65;margin:10px 0 0;color:#5d332f}.gb-author{margin-top:48px;padding:28px 30px;background:#fff;border:1px solid #e0e5df;border-radius:14px;display:flex;gap:28px;align-items:center}.gb-author-mark{flex:none;width:64px;height:64px;border-radius:50%;background:#002924;color:#F7F9F2;display:flex;align-items:center;justify-content:center}.gb-author-mark span{font-size:26px;font-weight:900}.gb-author-body{min-width:0;padding-left:28px;border-left:1px solid #e0e5df}.gb-author-eyebrow{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#7e8a85;font-weight:700}.gb-author-name{font-size:18px;font-weight:800;margin-top:4px}.gb-author-bio{font-size:13px!important;line-height:1.65!important;color:#697771;margin:6px 0 0!important}.gb-source-list{padding-left:23px}.gb-source-list li{padding:8px 0;font-size:13px;color:#50635b}.gb-source-list a{word-break:break-word}

.gb-cta{margin:80px 0 0;background:#002924;color:#F7F9F2;padding:48px 50px;border-radius:12px;display:grid;grid-template-columns:1.35fr .65fr;gap:50px;align-items:end}.gb-cta .gb-eyebrow{color:#FF6635}.gb-cta h2{font-size:38px;line-height:1.1;letter-spacing:-.045em;margin:10px 0 16px}.gb-cta p{font-size:15px;line-height:1.75;color:#d9e4df;max-width:650px}.gb-cta a{display:flex;align-items:center;justify-content:space-between;gap:24px;background:#FF6635;color:#fff;text-decoration:none;border-radius:100px;padding:17px 20px 17px 24px;font-size:13px;font-weight:800}.gb-footer{display:flex;justify-content:space-between;gap:30px;padding:28px 0 42px;font-size:13px}.gb-footer a{text-decoration:none}

@media(max-width:1100px){.gb-wrap,.gb-container{width:calc(100% - 40px)}.gb-hero-main{grid-template-columns:1fr;padding-inline:24px}.gb-hero-copy{max-width:760px}.gb-hero-art{max-width:760px;margin:auto}.gb-layout{display:block;padding-top:32px}.gb-toc{display:none}.gb-mobile-toc{display:block;border-bottom:1px solid var(--line);margin-bottom:32px;padding-bottom:15px}.gb-mobile-toc summary{font-size:14px;font-weight:750}.gb-mobile-toc nav{display:grid;grid-template-columns:1fr 1fr;padding-top:12px;gap:9px}.gb-mobile-toc a{font-size:13px;text-decoration:none}.gb-stress-grid{grid-template-columns:1fr 1fr}.gb-cta{grid-template-columns:1fr;gap:28px}.gb-cta a{max-width:340px}}
@media(max-width:700px){.gb-hero{padding-top:46px}.gb-hero h1{font-size:43px}.gb-deck{font-size:15px}.gb-control-kpis{grid-template-columns:1fr}.gb-control-kpis>div+div{border-left:0;border-top:1px solid #dfe5dc}.gb-market-grid{grid-template-columns:1fr}.gb-orbit-card{display:none}.gb-method-grid,.gb-balance{grid-template-columns:1fr}.gb-feature-list li{display:block}.gb-feature-list strong{display:block;margin-bottom:5px}.gb-signal{display:block}.gb-signal>div{justify-content:flex-start;margin-top:9px}.gb-cta{padding:34px 28px}}
@media(max-width:520px){.gb-page{font-size:16px}.gb-wrap,.gb-container{width:calc(100% - 32px)}.gb-hero-main{padding-inline:0}.gb-hero h1{font-size:38px}.gb-meta{font-size:11px}.gb-hero-art{padding:18px 0}.gb-control{border-radius:11px}.gb-map-shell{height:165px}.gb-stress{padding:18px}.gb-stress-head{display:block}.gb-stress-tag{display:inline-block;margin-top:10px}.gb-stress-grid{grid-template-columns:1fr}.gb-intro p:first-child{font-size:25px}.gb-article section{padding-top:45px}.gb-article h2{font-size:29px}.gb-tool-heading h2{font-size:36px}.gb-tool-heading{gap:13px}.gb-rank{width:46px;height:46px}.gb-review{padding:22px}.gb-ending{padding:23px}.gb-author{align-items:flex-start;padding:22px;gap:18px}.gb-author-mark{width:48px;height:48px}.gb-author-body{padding-left:18px}.gb-cta h2{font-size:31px}.gb-footer{gap:20px}.gb-crit-row{padding:18px;gap:14px}.gb-crit-row:not(:last-child):after{left:41px}}
@media(prefers-reduced-motion:reduce){.gb-page *{scroll-behavior:auto!important}}
@media print{.gb-toc,.gb-mobile-toc,.gb-progress,.gb-cta,.gb-footer,.gb-copy-button{display:none}.gb-layout{display:block}.gb-wrap{width:100%}.gb-hero{padding:15px 0}.gb-hero h1{font-size:34px}.gb-table{min-width:0}.gb-balance,.gb-review,.gb-verdict{break-inside:avoid}.gb-tool{break-before:page}.gb-page{font-size:12px}.gb-article h2{font-size:27px}}
`;
