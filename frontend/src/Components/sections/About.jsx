import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { aboutHighlights, site } from "../../data/content";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="site-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About me"
              title="Building products that feel fast, clear, and human."
              className="mb-0"
            />
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-xl leading-relaxed text-[var(--fg-muted)] md:text-2xl">
                Passionate MERN Stack Developer with a strong foundation in{" "}
                <span className="text-[var(--fg)]">
                  MongoDB, Express.js, React.js, and Node.js
                </span>
                . I specialize in high-performance, scalable applications that
                solve real problems — and look as good as they run.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 grid gap-3 sm:grid-cols-2">
              {aboutHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-l-2 border-copper/60 pl-4 py-1"
                >
                  <span className="text-sm text-[var(--fg)]">{item}</span>
                </div>
              ))}
            </Reveal>

            <Reveal
              delay={0.3}
              className="mt-12 flex flex-col gap-6 sm:flex-row sm:gap-12"
            >
              <a
                href={`mailto:${site.email}`}
                className="group flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--color-line)/var(--line-opacity))] text-copper transition-colors group-hover:border-copper/50">
                  <HiOutlineEnvelope className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                    Email
                  </span>
                  <span className="mt-1 block text-sm text-[var(--fg)] transition-colors group-hover:text-copper">
                    {site.email}
                  </span>
                </span>
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="group flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--color-line)/var(--line-opacity))] text-copper transition-colors group-hover:border-copper/50">
                  <HiOutlinePhone className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                    Call
                  </span>
                  <span className="mt-1 block text-sm text-[var(--fg)] transition-colors group-hover:text-copper">
                    {site.phone}
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
