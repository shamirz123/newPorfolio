import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

/**
 * Cinematic ambient backdrop — drifting aurora orbs + soft grid.
 */
export default function AmbientBackground() {
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.35 });
  const isLight = theme === "light";

  useEffect(() => {
    if (reduce) return undefined;
    const onMove = (e) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  const parallaxX = (mouse.x - 0.5) * 48;
  const parallaxY = (mouse.y - 0.5) * 36;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[var(--bg)]" />

      <div
        className="absolute inset-0"
        style={{
          background: isLight
            ? "radial-gradient(ellipse 80% 70% at 50% 30%, transparent 30%, rgba(241,245,249,0.9) 100%)"
            : "radial-gradient(ellipse 80% 70% at 50% 30%, transparent 15%, rgba(3,7,18,0.8) 100%)",
        }}
      />

      {/* Teal orb */}
      <motion.div
        className={`absolute -left-[12%] top-[-8%] h-[58vh] w-[58vw] rounded-full blur-[110px] ${
          reduce ? "" : "animate-float"
        }`}
        style={{
          background: isLight
            ? "radial-gradient(circle, rgba(20,184,166,0.25) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(45,212,191,0.32) 0%, transparent 70%)",
        }}
        animate={reduce ? undefined : { x: parallaxX * 0.45, y: parallaxY * 0.3 }}
        transition={{ type: "spring", stiffness: 40, damping: 28 }}
      />

      {/* Sky orb */}
      <motion.div
        className={`absolute -right-[8%] top-[8%] h-[52vh] w-[48vw] rounded-full blur-[120px] ${
          reduce ? "" : "animate-float-slow"
        }`}
        style={{
          background: isLight
            ? "radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(56,189,248,0.26) 0%, transparent 70%)",
        }}
        animate={reduce ? undefined : { x: parallaxX * -0.4, y: parallaxY * 0.5 }}
        transition={{ type: "spring", stiffness: 35, damping: 30 }}
      />

      {/* Deep glow bottom */}
      <motion.div
        className={`absolute bottom-[-18%] left-[20%] h-[48vh] w-[65vw] rounded-full blur-[130px] ${
          reduce ? "" : "animate-pulse-soft"
        }`}
        style={{
          background: isLight
            ? "radial-gradient(circle, rgba(13,148,136,0.16) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(13,148,136,0.24) 0%, transparent 70%)",
        }}
        animate={reduce ? undefined : { x: parallaxX * 0.2, y: parallaxY * -0.25 }}
        transition={{ type: "spring", stiffness: 30, damping: 32 }}
      />

      {/* Soft horizon line */}
      <div
        className="absolute left-1/2 top-[40%] h-px w-[min(70%,42rem)] -translate-x-1/2"
        style={{
          background: isLight
            ? "linear-gradient(90deg, transparent, rgba(15,118,110,0.4), transparent)"
            : "linear-gradient(90deg, transparent, rgba(45,212,191,0.55), transparent)",
          boxShadow: isLight
            ? "0 0 48px 10px rgba(15,118,110,0.14)"
            : "0 0 70px 14px rgba(45,212,191,0.18)",
        }}
      />

      <div className="absolute inset-0 opacity-50 dot-grid" />

      <div
        className="absolute inset-x-0 bottom-0 h-[45%]"
        style={{
          background: isLight
            ? "linear-gradient(to top, #f1f5f9 10%, transparent)"
            : "linear-gradient(to top, #030712 10%, transparent)",
        }}
      />
    </div>
  );
}
