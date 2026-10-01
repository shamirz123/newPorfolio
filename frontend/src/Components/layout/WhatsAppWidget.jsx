import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiPaperAirplane, HiXMark } from "react-icons/hi2";
import { site } from "../../data/content";

const quickReplies = [
  `Hi ${site.name.split(" ")[0]}! I'd like to discuss a job opportunity.`,
  "Hi! I have a freelance project in mind.",
  "Hi! Can you share your availability and rates?",
];

const waLink = (text) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showTyping, setShowTyping] = useState(true);
  const inputRef = useRef(null);
  const firstName = site.name.split(" ")[0];

  // Brief "typing…" before the greeting appears each time the panel opens.
  useEffect(() => {
    if (!open) return;
    setShowTyping(true);
    const t = setTimeout(() => setShowTyping(false), 900);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (text) => {
    const body = text.trim();
    if (!body) return;
    window.open(waLink(body), "_blank", "noopener,noreferrer");
    setMessage("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(message);
  };

  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={`Chat with ${firstName} on WhatsApp`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => inputRef.current?.focus()}
            className="absolute bottom-16 right-0 w-[min(22rem,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-2xl border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
              <div className="relative">
                <img
                  src="/assets/img/profile.JPEG"
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#075e54] bg-[#25d366]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{site.name}</p>
                <p className="text-xs text-white/75">
                  {showTyping ? "typing…" : "Typically replies within an hour"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <HiXMark className="h-5 w-5" />
              </button>
            </div>

            {/* Conversation */}
            <div className="space-y-3 bg-[#efeae2] px-4 py-5 dark:bg-[#0b141a]">
              {showTyping ? (
                <div className="inline-flex gap-1 rounded-lg rounded-tl-none bg-white px-3 py-3 shadow-sm dark:bg-[#202c33]">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm text-gray-800 shadow-sm dark:bg-[#202c33] dark:text-gray-100"
                >
                  <p>
                    Hi there 👋 Thanks for stopping by! How can I help you? Pick a message below or type your own.
                  </p>
                  <p className="mt-1 text-right text-[0.65rem] text-gray-500 dark:text-gray-400">
                    {time}
                  </p>
                </motion.div>
              )}

              {!showTyping && (
                <div className="flex flex-col items-end gap-2 pt-1">
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="max-w-[90%] rounded-full border border-[#25d366]/50 bg-white/70 px-3 py-1.5 text-left text-xs text-[#075e54] transition-colors hover:bg-[#25d366] hover:text-white dark:bg-transparent dark:text-[#25d366] dark:hover:text-white"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)] px-3 py-2.5"
            >
              <input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                aria-label="Message"
                className="min-w-0 flex-1 rounded-full bg-[rgb(var(--color-line)/0.06)] px-4 py-2 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:ring-1 focus:ring-[#25d366]/60"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                aria-label="Send on WhatsApp"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white transition-opacity disabled:opacity-40"
              >
                <HiPaperAirplane className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close WhatsApp chat" : "Chat on WhatsApp"}
        aria-expanded={open}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-25" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "wa"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            {open ? <HiXMark className="h-6 w-6" /> : <FaWhatsapp className="h-7 w-7" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
