import "dotenv/config";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";
import { Project } from "./models/Project.js";

const seedProjects = [
  {
    title: "Vendix",
    subtitle: "Salon SaaS · Saudi market",
    description:
      "Salon SaaS platform for the Saudi market — owner dashboard with KPI cards & Chart.js analytics, POS checkout module, and ZATCA e-invoicing compliance panel.",
    image: "/assets/img/vendix-sr.png",
    liveUrl: "https://pilot.vendix.com.sa/",
    githubUrl: "",
    tech: ["ASP.NET Core MVC", "JavaScript", "Chart.js"],
    accent: "#C9A27A",
    order: 1,
  },
  {
    title: "BizProbe",
    subtitle: "Business review platform",
    description:
      "Business review platform featuring a dynamic reviews page, homepage recent-reviews section, and hero search UI with tab filtering.",
    image: "/assets/img/bizprobe-sr.png",
    liveUrl: "https://bizprobe.com/",
    githubUrl: "",
    tech: ["ASP.NET Core", "JavaScript", "HTML/CSS"],
    accent: "#8B9A7D",
    order: 2,
  },
  {
    title: "EmployerNext",
    subtitle: "Global job search",
    description:
      "Global job search platform — navbar, hero upload validation, and scroll-behavior improvements for a smoother candidate experience.",
    image: "/assets/img/employrernext-sr.png",
    liveUrl: "https://employernext.com/",
    githubUrl: "",
    tech: ["ASP.NET Core MVC", "Razor", "JavaScript"],
    accent: "#7A8FA8",
    order: 3,
  },
  {
    title: "Falak Software",
    subtitle: "Software agency site",
    description:
      "Software agency website with core homepage sections — hero, services carousel, testimonials slider, and portfolio showcase.",
    image: "/assets/img/falaksoftware-sr.png",
    liveUrl: "https://falaksoftware.com/",
    githubUrl: "",
    tech: ["ASP.NET Core MVC", "Razor", "JavaScript"],
    accent: "#A88B7A",
    order: 4,
  },
  {
    title: "ScamSoldier",
    subtitle: "Essay service reviews",
    description:
      "Essay writing service review platform with .NET backend and vanilla JavaScript frontend interactions.",
    image: "/assets/img/scam-sr.png",
    liveUrl: "https://scamsoldier.com/",
    githubUrl: "",
    tech: [".NET", "JavaScript", "HTML/CSS"],
    accent: "#9A7A8B",
    order: 5,
  },
  {
    title: "TripPlannerPK",
    subtitle: "Pakistan travel booking",
    description:
      "Pakistan travel booking platform for flights, hotels, visas, and Hajj & Umrah packages — PHP backend with React.js frontend.",
    image: "/assets/img/tripplanner-sr.png",
    liveUrl: "https://tripplannerpk.com/",
    githubUrl: "",
    tech: ["React.js", "PHP", "JavaScript"],
    accent: "#7A9A8B",
    order: 6,
  },
  {
    title: "Jamia Sohan",
    subtitle: "Islamic seminary · RTL",
    description:
      "Islamic seminary platform with Arabic/Urdu localization, custom RTL layout, and tailored font integration.",
    image: "/assets/img/jamia-sr.png",
    liveUrl: "https://jamiasohan.org/",
    githubUrl: "",
    tech: ["JavaScript", "RTL", "Localization"],
    accent: "#8B8A7A",
    order: 7,
  },
  {
    title: "Expense Tracker",
    subtitle: "Personal MERN project",
    description:
      "Full-stack expense tracker built with React.js, Node.js, and MongoDB — personal project deployed on Vercel.",
    image: "/assets/img/expense-sr.png",
    liveUrl: "https://expense-tracker-front-end-seven.vercel.app/",
    githubUrl: "",
    tech: ["React.js", "Node.js", "MongoDB", "Express"],
    accent: "#A27A6A",
    order: 8,
  },
  {
    title: "ShahmirBot",
    subtitle: "Gemini-powered AI chatbot",
    description:
      "Personal AI chatbot powered by Gemini with SSE streaming — modern chat UI for real-time conversational responses.",
    image: "/assets/img/chtbot-sr.png",
    liveUrl: "https://shahmir.vercel.app",
    githubUrl: "",
    tech: ["React.js", "Gemini AI", "SSE"],
    accent: "#8B7AA8",
    order: 9,
  },
];

async function seed() {
  await connectDB(process.env.MONGODB_URI);

  const email = (process.env.ADMIN_EMAIL || "admin@portfolio.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const existingAdmin = await User.findOne({ email });
  if (!existingAdmin) {
    await User.create({ email, password });
    console.log(`Admin created: ${email}`);
  } else {
    console.log(`Admin already exists: ${email}`);
  }

  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany(seedProjects);
    console.log(`Seeded ${seedProjects.length} projects`);
  } else {
    console.log(`Projects already exist (${count}) — skipped seeding`);
  }

  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
