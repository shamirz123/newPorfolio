// Facts the AI assistant is allowed to talk about. Keep in sync with
// frontend/src/data/content.js when the portfolio content changes.
export const profile = {
  name: "Shahmeer Zubair",
  role: "Full Stack Developer (frontend-focused)",
  location: "Taramri, Islamabad, Pakistan",
  email: "rajashamir383@gmail.com",
  phone: "+92 3115386005",
  summary:
    "Full-stack developer (MERN) with 3+ years building production web apps across React.js/Next.js, Node.js and ASP.NET Core — dashboards, e-invoicing, POS systems, and bilingual RTL platforms — plus AI-powered features and workflow automation. Has served clients in several countries. Open to full-time roles and freelance projects.",
  links: {
    github: "https://github.com/shamirz123",
    linkedin: "https://www.linkedin.com/in/shahmeer-zubair-3590a0273/",
    portfolio: "https://shahmeer-zubair-portfolio.vercel.app",
  },
  skills: {
    Frontend: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Bootstrap", "Redux Toolkit"],
    Backend: ["Node.js", "Express.js", ".NET / ASP.NET Core", "MongoDB", "PostgreSQL", "MySQL", "REST APIs with JWT authentication"],
    "AI & Integration": ["RAG", "Google Gemini API", "Embeddings & Semantic Search", "SSE Streaming", "n8n"],
    "Other Tools": ["Git", "GitHub", "GitHub Actions (CI)", "Vitest", "Postman", "Vercel", "Figma", "Agile/Scrum"],
  },
  experience: [
    {
      title: "Full Stack Developer",
      company: "Immentia SMC Private Ltd",
      date: "Nov 2025 — Present",
      points: [
        "Developing React.js frontends connected to .NET and Node.js/MongoDB backends",
        "Built owner dashboard, POS checkout, and ZATCA e-invoicing panel for Vendix",
        "Delivering client-facing features for salon SaaS in the Saudi market",
      ],
    },
    {
      title: "React.js Developer",
      company: "LALA Group of Companies",
      date: "Jul 2023 — Nov 2025",
      points: [
        "Built and maintained scalable React apps integrated with Node.js and PHP APIs",
        "Contributed to PHP backend features and wrote SQL queries for travel booking platforms",
        "Optimized frontend architecture and API integration to reduce load times",
        "Implemented Redux across 10+ products for consistent state management",
      ],
    },
    {
      title: "Front-End Developer",
      company: "MSK Software House",
      date: "Jan 2023 — Jul 2023",
      points: [
        "Built responsive React.js web apps with third-party API integrations",
        "Delivered scalable layouts focused on performance and UX",
      ],
    },
  ],
};
