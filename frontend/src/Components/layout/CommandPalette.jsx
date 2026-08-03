import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineBriefcase,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCodeBracket,
  HiOutlineCommandLine,
  HiOutlineEnvelope,
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineUser,
} from "react-icons/hi2";
import { navLinks, site } from "../../data/content";

const iconMap = {
  home: HiOutlineHome,
  about: HiOutlineUser,
  skills: HiOutlineSparkles,
  projects: HiOutlineBriefcase,
  experience: HiOutlineCodeBracket,
  testimonials: HiOutlineChatBubbleLeftRight,
  contact: HiOutlineEnvelope,
};

const actions = [
  { id: "home", label: "Go to Home", hint: "Hero", keywords: "top start" },
  ...navLinks.map((l) => ({
    id: l.id,
    label: `Go to ${l.label}`,
    hint: l.label,
    keywords: l.label.toLowerCase(),
  })),
  {
    id: "resume",
    label: "Download resume",
    hint: "PDF",
    keywords: "cv resume download",
    href: site.resumeUrl,
    download: site.resumeFilename,
  },
  {
    id: "email",
    label: "Email Shahmeer",
    hint: site.email,
    keywords: "mail contact email",
    href: `mailto:${site.email}`,
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.hint.toLowerCase().includes(q) ||
        a.keywords.includes(q)
    );
  }, [query]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  const run = useCallback((action) => {
    setOpen(false);
    setQuery("");
    if (!action) return;
    if (action.href) {
      if (action.download) {
        const a = document.createElement("a");
        a.href = action.href;
        a.download = action.download;
        a.click();
        return;
      }
      window.location.href = action.href;
      return;
    }
    const el = document.getElementById(action.id === "home" ? "home" : action.id);
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        run(filtered[active]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, run]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)]/80 px-3.5 py-2 text-xs text-[var(--fg-muted)] shadow-lg backdrop-blur-md transition-colors hover:border-accent/40 hover:text-accent md:flex"
        aria-label="Open command palette"
      >
        <HiOutlineCommandLine className="h-4 w-4" />
        <span>Quick nav</span>
        <kbd className="rounded border border-[rgb(var(--color-line)/var(--line-opacity))] px-1.5 py-0.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center bg-[var(--bg)]/70 px-4 pt-[12vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-[rgb(var(--color-line)/var(--line-opacity))] px-4">
                <HiOutlineCommandLine className="h-5 w-5 shrink-0 text-accent" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to a section, download resume…"
                  className="w-full bg-transparent py-4 text-base text-[var(--fg)] outline-none placeholder:text-[var(--fg-muted)]"
                />
                <kbd className="hidden rounded border border-[rgb(var(--color-line)/var(--line-opacity))] px-1.5 py-0.5 font-mono text-[10px] text-[var(--fg-muted)] sm:inline">
                  ESC
                </kbd>
              </div>

              <ul className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-6 text-center text-sm text-[var(--fg-muted)]">
                    No matches
                  </li>
                )}
                {filtered.map((action, i) => {
                  const Icon = iconMap[action.id] || HiOutlineSparkles;
                  const isActive = i === active;
                  return (
                    <li key={action.id + action.label}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => run(action)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          isActive
                            ? "bg-accent/15 text-[var(--fg)]"
                            : "text-[var(--fg-muted)] hover:bg-[rgb(var(--color-line)/0.04)]"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 shrink-0 ${
                            isActive ? "text-accent" : ""
                          }`}
                        />
                        <span className="flex-1 text-sm font-medium">
                          {action.label}
                        </span>
                        <span className="text-xs text-[var(--fg-muted)]">
                          {action.hint}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between border-t border-[rgb(var(--color-line)/var(--line-opacity))] px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                <span>Navigate ↑↓ · Open ↵</span>
                <span>Press Esc to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
