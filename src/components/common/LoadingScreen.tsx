import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScramble } from "@/hooks/useScramble";

// ─────────────────────────────────────────────────────────────────────────────
// TIMING / EASING CONSTANTS
// Longer, realistic cinematic timing for a high-craft intro sequence (~3.75s total)
// ─────────────────────────────────────────────────────────────────────────────
const NAME = "KARTHIKEYAN C";
const INITIALS = "CK";
const SUBTITLE = "ENTERING INTO PORTFOLIO";

// Frame 1 — Entry (0–400ms)
const ENTRY_DURATION_MS = 500; // "CK" scale and fade-in duration
const SCRAMBLE_START_MS = 400; // when the scramble decode begins

// Frame 2 — Scramble decode (400–2200ms)
const SCRAMBLE_STAGGER_MS = 90; // deliberate 90ms delay per character lock
const SCRAMBLE_CYCLE_MS = 450; // glyph churn duration per character
const LOCK_FLASH_MS = 250; // crimson glow flash duration after a letter locks

// Frame 3 — Subtitle (2200–3000ms)
const SUBTITLE_AT_MS = 2200; // when "ENTERING INTO PORTFOLIO" fades in
const SUBTITLE_DURATION_MS = 500; // 500ms ease-out slide & fade

// Frame 4 — Circular iris reveal (3000–3750ms)
const IRIS_AT_MS = 3000; // when the circular mask starts opening
const IRIS_DURATION_MS = 750; // 750ms aperture reveal to unmask hero section
// Fast start, slow cinematic settle — cubic-bezier(0.76, 0, 0.24, 1)
const IRIS_EASING: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Reduced Motion
const REDUCED_TOTAL_MS = 500; // total loader duration when prefers-reduced-motion is true

// Typography — fluid via clamp() for zero overflow / crisp display at all breakpoints
const NAME_FONT_SIZE = "clamp(1.75rem, 6.8vw, 5.5rem)";
const NAME_LETTER_SPACING = "0.12em";
const SUBTITLE_FONT_SIZE = "clamp(0.75rem, 2.2vw, 1.05rem)";

// Colors — carbon/black #050505, crimson red accent #DC2626, graphite secondary
const ACCENT = "#DC2626";
const BASE_TEXT = "#F8F8F8";
const SUBTITLE_COLOR = "#A8A8A8";

const FLASH_STYLE: React.CSSProperties = {
  color: ACCENT,
  textShadow: `0 0 16px rgba(220, 38, 38, 0.95), 0 0 32px rgba(220, 38, 38, 0.5)`,
};
const BASE_STYLE: React.CSSProperties = { color: BASE_TEXT };

type Phase = "entry" | "scramble" | "subtitle" | "iris";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const isReduced = !!prefersReducedMotion;

  const [phase, setPhase] = useState<Phase>("entry");
  const [reducedPhase, setReducedPhase] = useState<"in" | "out">("in");
  const [irisCenter, setIrisCenter] = useState(() => ({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  }));

  const nameRef = useRef<HTMLDivElement>(null);

  const { display, flashIndices } = useScramble(NAME, {
    startDelayMs: SCRAMBLE_START_MS,
    staggerMs: SCRAMBLE_STAGGER_MS,
    cycleMs: SCRAMBLE_CYCLE_MS,
    flashMs: LOCK_FLASH_MS,
    enabled: !isReduced,
  });

  // Timeline: advance frames on schedule (or reduced motion plain fade)
  useEffect(() => {
    if (isReduced) {
      const tOut = setTimeout(() => setReducedPhase("out"), REDUCED_TOTAL_MS / 2);
      const tDone = setTimeout(() => onComplete(), REDUCED_TOTAL_MS);
      return () => {
        clearTimeout(tOut);
        clearTimeout(tDone);
      };
    }

    const t1 = setTimeout(() => setPhase("scramble"), SCRAMBLE_START_MS);
    const t2 = setTimeout(() => setPhase("subtitle"), SUBTITLE_AT_MS);
    const t3 = setTimeout(() => setPhase("iris"), IRIS_AT_MS);
    const tDone = setTimeout(() => {
      onComplete();
    }, IRIS_AT_MS + IRIS_DURATION_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tDone);
    };
  }, [isReduced, onComplete]);

  // Measure name's actual rendered center point for iris reveal anchor
  useEffect(() => {
    const update = () => {
      const el = nameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setIrisCenter({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    };
    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    if (nameRef.current) ro.observe(nameRef.current);
    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  const showInitials = !isReduced && phase === "entry";

  // Iris mask shrinks circle from 150% (covering screen) to 0% (unmasking hero underneath)
  const wrapperAnimate = isReduced
    ? { opacity: reducedPhase === "out" ? 0 : 1 }
    : {
        opacity: 1,
        clipPath:
          phase === "iris"
            ? `circle(0% at ${irisCenter.x}px ${irisCenter.y}px)`
            : `circle(150% at ${irisCenter.x}px ${irisCenter.y}px)`,
      };

  const wrapperTransition = isReduced
    ? { duration: REDUCED_TOTAL_MS / 2000, ease: "easeOut" as const }
    : phase === "iris"
      ? { clipPath: { duration: IRIS_DURATION_MS / 1000, ease: IRIS_EASING } }
      : { duration: 0.2 };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] select-none overflow-hidden"
      style={{ willChange: "clip-path, opacity" }}
      initial={{ opacity: 1, clipPath: `circle(150% at ${irisCenter.x}px ${irisCenter.y}px)` }}
      animate={wrapperAnimate}
      transition={wrapperTransition}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      role="presentation"
      aria-hidden="true"
    >
      {/* Decorative cyber scanlines background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px]" />

      {/* Subtle static crimson glow centered at iris position */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at ${irisCenter.x}px ${irisCenter.y}px, rgba(220,38,38,0.14) 0%, transparent 50%)`,
        }}
      />

      <motion.div
        className="relative flex flex-col items-center px-4 max-w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: ENTRY_DURATION_MS / 1000, ease: "easeOut" }}
      >
        {/* Name — invisible spacer reserves width so layout remains zero-shift */}
        <div ref={nameRef} className="relative inline-block max-w-full">
          <span
            aria-hidden="true"
            className="invisible whitespace-nowrap block"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: NAME_FONT_SIZE,
              letterSpacing: NAME_LETTER_SPACING,
              fontWeight: 700,
            }}
          >
            {NAME}
          </span>
          <div
            className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: NAME_FONT_SIZE,
              letterSpacing: NAME_LETTER_SPACING,
              fontWeight: 700,
            }}
          >
            {showInitials ? (
              <span style={BASE_STYLE}>{INITIALS}</span>
            ) : (
              display.split("").map((ch, i) => {
                const isFlash = flashIndices.includes(i);
                return (
                  <span key={i} style={isFlash ? FLASH_STYLE : BASE_STYLE} className="transition-colors duration-150">
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                );
              })
            )}
          </div>
        </div>

        {/* Subtitle — "ENTERING INTO PORTFOLIO" with Space Grotesk font and pulsing crimson indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: !isReduced && (phase === "subtitle" || phase === "iris") ? 1 : 0,
            y: !isReduced && (phase === "subtitle" || phase === "iris") ? 0 : 10,
          }}
          transition={{ duration: SUBTITLE_DURATION_MS / 1000, ease: "easeOut" }}
          className="mt-7 flex items-center justify-center gap-2.5 max-w-[90vw]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse shrink-0" />
          <p
            className="text-center font-heading font-medium tracking-[0.22em] uppercase"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: SUBTITLE_FONT_SIZE,
              color: SUBTITLE_COLOR,
            }}
          >
            {SUBTITLE}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};