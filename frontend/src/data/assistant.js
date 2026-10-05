import { experiences, site, skills } from "./content";

// Each intent: keywords to match, a short "thinking" trace, the answer,
// optional actions (scroll/link) and follow-up suggestions.
export const intents = [
  {
    id: "hire",
    keywords: ["hire", "why you", "why should", "stand out", "different", "choose", "value", "fit"],
    trace: ["Reading experience timeline", "Weighing shipped products", "Summarizing"],
    answer: `Three reasons:

1. **Shipped, not sketched.** 3+ years putting real products in production — owner dashboards, POS checkout, ZATCA e-invoicing and bilingual RTL platforms.
2. **Frontend depth, full-stack range.** React/Next.js is home, but I'm comfortable wiring into .NET, Node.js/Express and MongoDB, so features don't stall at the API boundary.
3. **Performance-minded.** I've reduced load times by reworking frontend architecture and standardized state with Redux across 10+ products.`,
    actions: [
      { label: "See my work", section: "projects" },
      { label: "Get in touch", section: "contact" },
    ],
    followUps: ["What's your tech stack?", "Where do you work now?"],
  },
  {
    id: "stack",
    keywords: ["stack", "skill", "tech", "technolog", "tools", "language", "framework", "strength", "know"],
    trace: ["Loading skills index", "Ranking by proficiency"],
    answer: () => {
      const byGroup = skills.reduce((acc, s) => {
        (acc[s.group] ||= []).push(s);
        return acc;
      }, {});
      const lines = Object.entries(byGroup).map(
        ([group, list]) =>
          `**${group}:** ${list
            .sort((a, b) => (b.level ?? 0) - (a.level ?? 0))
            .map((s) => s.name)
            .join(", ")}`
      );
      return `Here's the toolkit, strongest first:\n\n${lines.join("\n")}\n\nIf I had to pick one: **React + JavaScript** is where I'm most fluent.`;
    },
    actions: [{ label: "Open skills", section: "skills" }],
    followUps: ["How do you handle state management?", "Do you do backend work?"],
  },
  {
    id: "current",
    keywords: ["current", "now", "immentia", "vendix", "zatca", "salon", "pos", "saudi", "job", "work at"],
    trace: ["Fetching latest role", "Extracting highlights"],
    answer: () => {
      const e = experiences[0];
      return `Right now I'm a **${e.title}** at **${e.company}** (${e.date}).\n\n${e.points
        .map((p) => `- ${p}`)
        .join("\n")}`;
    },
    actions: [{ label: "Full journey", section: "experience" }],
    followUps: ["What did you do before that?", "Why should we hire you?"],
  },
  {
    id: "history",
    keywords: ["experience", "before", "previous", "history", "career", "journey", "lala", "msk", "years", "background"],
    trace: ["Walking the timeline", "Compressing to highlights"],
    answer: () =>
      `The short version:\n\n${experiences
        .map((e) => `- **${e.date}** — ${e.title}, ${e.company}`)
        .join("\n")}\n\nStarted in pure frontend, grew into full-stack product work.`,
    actions: [{ label: "Open timeline", section: "experience" }],
    followUps: ["Where do you work now?", "What's your tech stack?"],
  },
  {
    id: "state",
    keywords: ["state", "redux", "api", "integration", "fetch", "data flow", "architecture", "rtk"],
    trace: ["Recalling patterns used in production"],
    answer: `My default setup:

- **Redux Toolkit** for shared app state — I rolled it out across 10+ products at LALA for consistency.
- **Server state stays close to the API layer**: a thin client, normalized responses, loading/error states handled once, not per component.
- **Local UI state stays local.** Not everything belongs in a global store.

The goal is predictable data flow that the next developer can follow without a tour.`,
    followUps: ["How do you approach performance?", "Do you do backend work?"],
  },
  {
    id: "perf",
    keywords: ["perform", "speed", "fast", "optimi", "load", "lighthouse", "slow"],
    trace: ["Checking optimization notes"],
    answer: `Performance is a habit, not a final pass:

- Code-split routes and lazy-load heavy views
- Keep bundles lean — question every dependency
- Cut request waterfalls with better API integration
- Measure first, then optimize what actually matters

At LALA this approach measurably reduced load times across products.`,
    followUps: ["How do you handle state management?", "Show me your projects"],
  },
  {
    id: "backend",
    keywords: ["backend", "full stack", "fullstack", "server", "node", "express", ".net", "asp", "database", "mongo", "sql", "postgres", "php"],
    trace: ["Scanning backend experience"],
    answer: `Yes — I'm frontend-focused but genuinely full-stack:

- **Node.js / Express** APIs with **MongoDB**
- **ASP.NET Core** backends at Immentia
- **PHP + SQL** on travel booking platforms at LALA Group
- **PostgreSQL / MySQL** for relational work
- **Firebase** when speed-to-market matters

This portfolio itself runs on an Express + MongoDB backend with an admin dashboard.`,
    actions: [{ label: "See projects", section: "projects" }],
    followUps: ["What's your tech stack?", "Where do you work now?"],
  },
  {
    id: "projects",
    keywords: ["project", "portfolio", "built", "build", "show", "demo", "example", "work"],
    trace: ["Querying project index"],
    answer: `Highlights from what I've built:

- **Vendix** — owner dashboard, POS checkout and ZATCA e-invoicing for salon SaaS
- **Bilingual RTL platforms** for the Saudi market
- **Dashboards & data viz** with Chart.js
- **This site** — React + Framer Motion frontend, Express/MongoDB admin backend

The Work section has live links and source for each.`,
    actions: [{ label: "Jump to Work", section: "projects" }],
    followUps: ["Do you do backend work?", "How do you approach performance?"],
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "call", "phone", "hire you", "available", "freelance", "talk"],
    trace: ["Looking up contact details"],
    answer: `Happy to talk:

- **Email:** ${site.email}
- **Phone:** ${site.phone}
- **Based in:** ${site.location}

Open to full-time roles and freelance projects.`,
    actions: [
      { label: "Send an email", href: `mailto:${site.email}` },
      { label: "Download resume", href: site.resumeUrl, download: site.resumeFilename },
    ],
    followUps: ["Why should we hire you?"],
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "pdf", "download"],
    trace: ["Locating resume"],
    answer: "Here's my resume — one page, everything that matters.",
    actions: [{ label: "Download resume", href: site.resumeUrl, download: site.resumeFilename }],
    followUps: ["How can I contact you?"],
  },
  {
    id: "greet",
    keywords: ["hi", "hello", "hey", "salam", "yo", "sup"],
    trace: [],
    answer: `Hey 👋 I'm a small assistant that knows ${site.name.split(" ")[0]}'s work. Ask about skills, experience, projects — or type **/help**.`,
    followUps: ["Why should we hire you?", "What's your tech stack?"],
  },
];

export const fallback = {
  id: "fallback",
  trace: ["No confident match"],
  answer: `Hmm, I'm not sure about that one — I'm best at questions about ${site.name.split(" ")[0]}'s work. Try asking about **skills**, **experience**, **projects**, **performance** or **contact** — or type **/help**.`,
  followUps: ["What's your tech stack?", "Show me your projects", "How can I contact you?"],
};

export const help = {
  id: "help",
  trace: [],
  answer: `Commands:

- **/help** — this list
- **/clear** — reset the conversation
- **/resume** — get the resume
- **/contact** — contact details

Or just ask in plain English.`,
  followUps: ["Why should we hire you?", "What's your tech stack?"],
};

export const starterPrompts = [
  "Why should we hire you?",
  "What's your tech stack?",
  "Where do you work now?",
  "How do you handle state management?",
  "Do you do backend work?",
  "How do you approach performance?",
];

export function resolveIntent(input) {
  const text = input.toLowerCase().trim();
  if (text === "/help") return help;
  if (text === "/resume") return intents.find((i) => i.id === "resume");
  if (text === "/contact") return intents.find((i) => i.id === "contact");

  let best = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      // short keywords must match whole words to avoid "hi" in "this"
      const hit =
        kw.length <= 3
          ? new RegExp(`\\b${kw}\\b`).test(text)
          : text.includes(kw);
      if (hit) score += kw.length > 4 ? 2 : 1;
    }
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  return best || fallback;
}
