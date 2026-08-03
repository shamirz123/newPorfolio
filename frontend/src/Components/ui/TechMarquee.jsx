import { skills } from "../../data/content";

export default function TechMarquee() {
  const items = [...skills, ...skills];

  return (
    <div className="relative mt-16 overflow-hidden border-y border-[rgb(var(--color-line)/var(--line-opacity))] py-5 md:mt-20">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg)] to-transparent md:w-28"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg)] to-transparent md:w-28"
        aria-hidden
      />

      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {items.map((skill, i) => (
          <span
            key={`${skill.name}-${i}`}
            className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-[var(--fg-muted)] transition-colors hover:text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
