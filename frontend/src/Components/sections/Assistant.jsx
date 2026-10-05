import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiArrowUpRight, HiCheck, HiOutlineArrowPath } from "react-icons/hi2";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { resolveIntent, starterPrompts } from "../../data/assistant";
import { site } from "../../data/content";
import { api } from "../../api/client";

const TRACE_STEP_MS = 420;
const STREAM_TICK_MS = 18;
const CHARS_PER_TICK = 3;

let nextId = 1;

const greeting = () => ({
  id: nextId++,
  role: "assistant",
  text: `Hi — I'm ${site.name.split(" ")[0]}'s portfolio assistant. Ask me about skills, experience or projects, or pick a prompt below. Type **/help** for commands.`,
  trace: [],
  traceStep: 0,
  shown: Infinity,
  phase: "done",
  actions: [],
  followUps: [],
});

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-[var(--fg)]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

function Markdown({ text }) {
  const blocks = text.split(/\n{2,}/);
  return blocks.map((block, bi) => {
    const lines = block.split("\n");
    const isList = lines.every((l) => /^(- |\d+\. )/.test(l));
    if (isList) {
      const ordered = /^\d+\. /.test(lines[0]);
      const List = ordered ? "ol" : "ul";
      return (
        <List
          key={bi}
          className={`my-2 space-y-1.5 pl-5 ${ordered ? "list-decimal" : "list-disc"} marker:text-accent`}
        >
          {lines.map((l, li) => (
            <li key={li}>{renderInline(l.replace(/^(- |\d+\. )/, ""))}</li>
          ))}
        </List>
      );
    }
    return (
      <p key={bi} className="my-2 first:mt-0 last:mb-0">
        {lines.map((l, li) => (
          <Fragment key={li}>
            {li > 0 && <br />}
            {renderInline(l)}
          </Fragment>
        ))}
      </p>
    );
  });
}

function Trace({ steps, current, done }) {
  if (!steps.length) return null;
  return (
    <ul className="mb-3 space-y-1 font-mono text-xs text-[var(--fg-muted)]">
      {steps.map((step, i) => {
        if (i > current) return null;
        const finished = done || i < current;
        return (
          <motion.li
            key={step}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            {finished ? (
              <HiCheck className="h-3.5 w-3.5 text-accent" />
            ) : (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border border-accent/30 border-t-accent" />
            )}
            <span className={finished ? "opacity-70" : ""}>{step}</span>
          </motion.li>
        );
      })}
    </ul>
  );
}

function AssistantMessage({ msg, onAsk, isLatest }) {
  const streaming = msg.phase !== "done";
  const pending = msg.phase === "thinking" || msg.phase === "waiting";
  let visible = pending ? "" : msg.text.slice(0, msg.shown);
  // Close a half-streamed **bold** so raw asterisks never flash on screen.
  if ((visible.match(/\*\*/g) || []).length % 2) visible += "**";

  const runAction = (action) => {
    if (action.section) {
      document.getElementById(action.section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex gap-3">
      <span className="mt-0.5 shrink-0 font-mono text-sm text-accent">◆</span>
      <div className="min-w-0 flex-1 text-[0.95rem] leading-relaxed text-[var(--fg-muted)]">
        <Trace
          steps={msg.trace}
          current={msg.traceStep}
          done={!pending}
        />
        {visible && (
          <div>
            <Markdown text={visible} />
            {streaming && (
              <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" />
            )}
          </div>
        )}

        {!streaming && (msg.actions.length > 0 || (isLatest && msg.followUps.length > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {msg.actions.map((a) =>
              a.href ? (
                <a
                  key={a.label}
                  href={a.href}
                  download={a.download}
                  className="inline-flex items-center gap-1.5 border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
                >
                  {a.label}
                  <HiArrowUpRight className="h-3 w-3" />
                </a>
              ) : (
                <button
                  key={a.label}
                  type="button"
                  onClick={() => runAction(a)}
                  className="inline-flex items-center gap-1.5 border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
                >
                  {a.label}
                  <HiArrowUpRight className="h-3 w-3" />
                </button>
              )
            )}
            {isLatest &&
              msg.followUps.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => onAsk(f)}
                  className="border border-dashed border-[rgb(var(--color-line)/0.2)] px-3 py-1.5 text-xs text-[var(--fg-muted)] transition-colors hover:border-accent/50 hover:text-[var(--fg)]"
                >
                  {f}
                </button>
              ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Assistant() {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState(() => [greeting()]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const latest = messages[messages.length - 1];
  const busy = latest.role === "assistant" && latest.phase !== "done";

  // Drive the latest assistant message through thinking → streaming → done.
  useEffect(() => {
    // "waiting" is driven by the network request in ask(), not a timer.
    if (latest.role !== "assistant" || latest.phase === "done" || latest.phase === "waiting") return;

    const update = (patch) =>
      setMessages((prev) =>
        prev.map((m) => (m.id === latest.id ? { ...m, ...patch(m) } : m))
      );

    if (latest.phase === "thinking") {
      const t = setTimeout(() => {
        update((m) =>
          m.traceStep + 1 >= m.trace.length
            ? { phase: "streaming", shown: 0 }
            : { traceStep: m.traceStep + 1 }
        );
      }, TRACE_STEP_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      update((m) => {
        const shown = m.shown + CHARS_PER_TICK;
        return shown >= m.text.length
          ? { shown: m.text.length, phase: "done" }
          : { shown };
      });
    }, STREAM_TICK_MS);
    return () => clearTimeout(t);
  }, [latest]);

  // Keep the transcript pinned to the bottom (scrolls the box, not the page).
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const ask = (raw) => {
    const question = raw.trim();
    if (!question || busy) return;
    setInput("");

    if (question.toLowerCase() === "/clear") {
      setMessages([greeting()]);
      return;
    }

    // Slash commands are answered locally; everything else goes to the AI.
    if (question.startsWith("/")) {
      answerLocally(question);
      return;
    }

    const history = messages
      .filter((m) => m.text && m.id !== messages[0].id)
      .map((m) => ({ role: m.role, content: m.text }));
    const replyId = nextId++;

    setMessages((prev) => [
      ...prev,
      { id: nextId++, role: "user", text: question },
      {
        id: replyId,
        role: "assistant",
        text: "",
        trace: ["Thinking…"],
        traceStep: 0,
        shown: 0,
        phase: "waiting",
        actions: [],
        followUps: [],
      },
    ]);

    api
      .chat(question, history)
      .then(({ reply }) => {
        patchMessage(replyId, {
          text: reply,
          shown: reduce ? reply.length : 0,
          phase: reduce ? "done" : "streaming",
        });
      })
      .catch(() => {
        // AI unavailable (no key, rate limit, network) — use the built-in answers.
        const intent = resolveIntent(question);
        const text = typeof intent.answer === "function" ? intent.answer() : intent.answer;
        patchMessage(replyId, {
          text,
          shown: reduce ? text.length : 0,
          phase: reduce ? "done" : "streaming",
          actions: intent.actions || [],
          followUps: intent.followUps || [],
        });
      });
  };

  const patchMessage = (id, patch) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const answerLocally = (question) => {
    const intent = resolveIntent(question);
    const text = typeof intent.answer === "function" ? intent.answer() : intent.answer;
    const skip = reduce || intent.trace.length === 0;

    setMessages((prev) => [
      ...prev,
      { id: nextId++, role: "user", text: question },
      {
        id: nextId++,
        role: "assistant",
        text,
        trace: intent.trace,
        traceStep: 0,
        shown: reduce ? text.length : 0,
        phase: reduce ? "done" : skip ? "streaming" : "thinking",
        actions: intent.actions || [],
        followUps: intent.followUps || [],
      },
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ask(input);
    inputRef.current?.focus();
  };

  const userCount = messages.filter((m) => m.role === "user").length;

  return (
    <section
      id="assistant"
      className="section-pad border-t border-[rgb(var(--color-line)/var(--line-opacity))]"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="Ask me anything"
          title="Skip the scrolling. Just ask."
          description="Curious about my skills, experience or projects? Ask my assistant and get a straight answer in seconds."
        />

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)]/60 shadow-[0_0_80px_-30px_rgb(var(--color-accent)/0.35)] backdrop-blur-md">
            {/* Title bar */}
            <div className="flex items-center justify-between gap-4 border-b border-[rgb(var(--color-line)/var(--line-opacity))] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                </div>
                <span className="font-mono text-xs text-[var(--fg-muted)]">
                  ~/shahmeer <span className="text-accent">›</span> ask
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--fg-muted)] sm:flex">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  {busy ? "thinking" : "online"}
                </span>
                {userCount > 0 && (
                  <button
                    type="button"
                    onClick={() => ask("/clear")}
                    disabled={busy}
                    aria-label="Reset conversation"
                    className="text-[var(--fg-muted)] transition-colors hover:text-accent disabled:opacity-40"
                  >
                    <HiOutlineArrowPath className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Transcript */}
            <div
              ref={scrollRef}
              className="h-[26rem] space-y-6 overflow-y-auto px-4 py-6 sm:px-6 md:h-[30rem]"
              aria-live="polite"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {msg.role === "user" ? (
                      <div className="flex gap-3 font-mono text-sm text-[var(--fg)]">
                        <span className="shrink-0 text-accent">›</span>
                        <span className="break-words">{msg.text}</span>
                      </div>
                    ) : (
                      <AssistantMessage
                        msg={msg}
                        onAsk={ask}
                        isLatest={msg.id === latest.id}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {userCount === 0 && (
                <div className="grid gap-2 pt-2 sm:grid-cols-2">
                  {starterPrompts.map((p, i) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => ask(p)}
                      className="group flex items-center gap-3 border border-[rgb(var(--color-line)/var(--line-opacity))] px-4 py-3 text-left text-sm text-[var(--fg-muted)] transition-colors hover:border-accent/40 hover:text-[var(--fg)]"
                    >
                      <span className="font-mono text-xs text-accent/70 group-hover:text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Prompt */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-3 border-t border-[rgb(var(--color-line)/var(--line-opacity))] px-4 py-3 sm:px-6"
            >
              <span className="font-mono text-accent">›</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={busy ? "Answering…" : "Ask a question or type /help"}
                aria-label="Ask the portfolio assistant"
                className="min-w-0 flex-1 bg-transparent py-2 font-mono text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="font-mono text-xs uppercase tracking-[0.16em] text-accent transition-opacity disabled:opacity-30"
              >
                Enter ↵
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
