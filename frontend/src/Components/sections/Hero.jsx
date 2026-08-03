import { motion } from "framer-motion";
import { HiArrowDown, HiArrowDownTray } from "react-icons/hi2";
import Button from "../ui/Button";
import TechMarquee from "../ui/TechMarquee";
import { site } from "../../data/content";

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-28 md:justify-center md:pb-16 md:pt-32"
    >
      <div className="site-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Available for select projects
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-xl font-semibold text-[var(--fg)]"
        >
          {site.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-xl leading-relaxed text-[var(--fg-muted)] md:text-2xl"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button onClick={scrollToContact}>Let&apos;s build together</Button>
          <Button
            variant="secondary"
            href={site.resumeUrl}
            download={site.resumeFilename}
          >
            <HiArrowDownTray className="h-4 w-4" />
            Download resume
          </Button>
          <p className="hidden text-xs text-[var(--fg-muted)] sm:block">
            Press{" "}
            <kbd className="rounded border border-[rgb(var(--color-line)/var(--line-opacity))] px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>{" "}
            to explore
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-16 flex items-center gap-6 border-t border-[rgb(var(--color-line)/var(--line-opacity))] pt-8 md:mt-20"
        >
          <p className="text-sm text-[var(--fg-muted)]">{site.role}</p>
          <span className="hidden h-px flex-1 bg-[rgb(var(--color-line)/var(--line-opacity))] sm:block" />
          <ul className="flex gap-4">
            {site.socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--fg-muted)] transition-colors hover:text-accent"
                  aria-label={social.name}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="relative z-10"
      >
        <TechMarquee />
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)] transition-colors hover:text-accent md:flex"
      >
        Scroll
        <HiArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </motion.a>
    </section>
  );
}
