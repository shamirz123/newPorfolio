import {
  FaReact,
  FaNodeJs,
  FaFire,
  FaBootstrap,
  FaChartBar,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiDotnet,
  SiPostgresql,
  SiRedux,
} from "react-icons/si";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { skills } from "../../data/content";

const iconMap = {
  "React.js": FaReact,
  "Next.js": SiNextdotjs,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: FaBootstrap,
  "Redux Toolkit": SiRedux,
  "Node.js": FaNodeJs,
  "Express.js": SiExpress,
  ".NET / ASP.NET": SiDotnet,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Firebase: FaFire,
  "Chart.js": FaChartBar,
};

const groups = ["Frontend", "Backend", "Tools"];

export default function Skills() {
  return (
    <section id="skills" className="section-pad border-t border-[rgb(var(--color-line)/var(--line-opacity))]">
      <div className="site-container">
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills & tools I use to ship."
          description="A focused stack for building dynamic, scalable, and responsive web applications — refined across 50+ projects."
        />

        <div className="space-y-12">
          {groups.map((group, gi) => {
            const items = skills.filter((s) => s.group === group);
            if (!items.length) return null;
            return (
              <div key={group}>
                <Reveal delay={gi * 0.05}>
                  <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                    {group}
                  </p>
                </Reveal>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {items.map((skill, i) => {
                    const Icon = iconMap[skill.name];
                    return (
                      <Reveal key={skill.name} delay={0.04 * i + gi * 0.05}>
                        <div className="group relative flex flex-col gap-4 border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)]/50 p-5 backdrop-blur-sm transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_0_28px_-10px_rgb(var(--color-accent)/0.4)]">
                          {Icon && (
                            <Icon className="h-7 w-7 text-accent transition-transform duration-500 group-hover:scale-110" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-[var(--fg)]">
                              {skill.name}
                            </p>
                            <div className="mt-3 h-px w-full overflow-hidden bg-[rgb(var(--color-line)/var(--line-opacity))]">
                              <div
                                className="h-full bg-accent transition-all duration-700 ease-out-expo group-hover:opacity-100"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                            <p className="mt-2 text-xs text-[var(--fg-muted)]">
                              {skill.level}%
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
