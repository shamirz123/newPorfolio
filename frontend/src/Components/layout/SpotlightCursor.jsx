import { useEffect, useState } from "react";

/**
 * Soft teal spotlight that follows the cursor — premium “lit stage” feel.
 * Disabled on touch / reduced-motion.
 */
export default function SpotlightCursor() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return undefined;

    setEnabled(true);
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] mix-blend-screen transition-opacity duration-500 dark:opacity-100"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgb(var(--color-accent) / 0.12), transparent 42%)`,
      }}
    />
  );
}
