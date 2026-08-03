import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  const alignClass =
    align === "center" ? "mx-auto text-center items-center" : "items-start";

  return (
    <Reveal className={`mb-14 md:mb-20 flex flex-col max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="font-display text-display-md text-[var(--fg)] text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg md:text-xl leading-relaxed text-[var(--fg-muted)] text-balance">
          {description}
        </p>
      )}
    </Reveal>
  );
}
