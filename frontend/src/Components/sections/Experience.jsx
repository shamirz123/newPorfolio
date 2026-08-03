import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { experiences } from "../../data/content";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-pad border-t border-[rgb(var(--color-line)/var(--line-opacity))]"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="Journey"
          title="Experience that shaped the craft."
          description="Roles across product teams and agencies — always focused on clean code, performance, and collaboration."
        />

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 hidden w-px bg-[rgb(var(--color-line)/var(--line-opacity))] md:left-1/2 md:block" />

          <div className="space-y-10 md:space-y-0">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <Reveal
                  key={exp.id}
                  delay={index * 0.06}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 md:pb-16 ${
                    index === experiences.length - 1 ? "md:pb-0" : ""
                  }`}
                >
                  <div
                    className={`hidden md:block ${
                      isLeft ? "text-right pr-12" : "col-start-2 pl-12"
                    }`}
                  >
                    {!isLeft && <ExperienceBody exp={exp} />}
                    {isLeft && <ExperienceBody exp={exp} align="right" />}
                  </div>
                  {isLeft && (
                    <div className="hidden md:block" aria-hidden />
                  )}

                  <div className="absolute left-0 top-2 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-copper bg-[var(--bg)] md:left-1/2 md:block" />

                  <div className="border-l-2 border-copper/40 pl-6 md:hidden">
                    <ExperienceBody exp={exp} />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceBody({ exp, align = "left" }) {
  return (
    <div className={align === "right" ? "md:text-right" : ""}>
      <p className="text-xs uppercase tracking-[0.18em] text-copper">
        {exp.date}
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-[var(--fg)] md:text-2xl">
        {exp.title}
      </h3>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">{exp.company}</p>
      <ul
        className={`mt-5 space-y-2 text-sm leading-relaxed text-[var(--fg-muted)] ${
          align === "right" ? "md:ml-auto md:max-w-md" : "md:max-w-md"
        }`}
      >
        {exp.points.map((point) => (
          <li key={point} className="flex gap-2 md:block">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper md:hidden" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
