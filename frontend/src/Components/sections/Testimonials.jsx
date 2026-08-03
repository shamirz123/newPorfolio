import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { testimonials } from "../../data/content";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  const prev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section
      id="testimonials"
      className="section-pad border-t border-[rgb(var(--color-line)/var(--line-opacity))]"
    >
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-end">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Testimonials"
              title="Words from people I've worked with."
              description="Trusted by clients who value reliability, clarity, and craft."
              className="mb-0"
            />
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative min-h-[220px] border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)]/55 p-8 backdrop-blur-sm md:p-10">
              <span className="font-display text-5xl leading-none text-accent/35">
                &ldquo;
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="mt-2 font-display text-xl leading-snug tracking-tight text-[var(--fg)] md:text-2xl text-balance">
                    {active.quote}
                  </p>
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-[var(--fg)]">
                        {active.author}
                      </p>
                      <p className="text-xs text-[var(--fg-muted)]">
                        {active.role}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous testimonial"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--color-line)/var(--line-opacity))] text-[var(--fg-muted)] transition-colors hover:border-copper/40 hover:text-copper"
                      >
                        <HiChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        aria-label="Next testimonial"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--color-line)/var(--line-opacity))] text-[var(--fg-muted)] transition-colors hover:border-copper/40 hover:text-copper"
                      >
                        <HiChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-4 flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1 flex-1 transition-colors ${
                    i === index ? "bg-copper" : "bg-[rgb(var(--color-line)/var(--line-opacity))]"
                  }`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
