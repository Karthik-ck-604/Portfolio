import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, LayoutGroup, useReducedMotion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// TIMING & EASING CONSTANTS (~7.6s realistic cinematic sequence)
// ─────────────────────────────────────────────────────────────────────────────
const LOADER_TIMING = {
  FRAME1_ENTRY_MS: 700,         // 0–700ms: Initials "CK" scale & fade in
  FRAME2_MORPH_START_MS: 700,   // 700ms: Unhurried layout morph begins ("CK" -> "KARTHIKEYAN C")
  FRAME2_LETTER_STAGGER_MS: 65, // ~65ms stagger per unfolding letter
  FRAME2_LOCK_FLASH_MS: 2700,   // 2700–3300ms: Crimson #DC2626 flash on K & C
  FRAME3_ROLES_SHOW_MS: 3300,   // 3300ms: Roles text reveals left to right (held until 4800ms)
  FRAME3_ROLES_HIDE_MS: 4800,   // 4800ms: Roles text wipes right to left
  FRAME3_ENTERING_MS: 5700,     // 5700ms: "ENTERING INTO PORTFOLIO" fades in
  FRAME4_IRIS_START_MS: 6600,   // 6600ms: Circular iris reveal unmasks hero
  IRIS_DURATION_MS: 1000,       // 1000ms smooth cinematic aperture reveal
  REDUCED_MOTION_MS: 400,       // Duration for prefers-reduced-motion
} as const;

const IRIS_EASING: [number, number, number, number] = [0.76, 0, 0.24, 1];
const ACCENT_COLOR = "#DC2626"; // Crimson red matching home screen accent

// Typography — Royal Space Grotesk font with fluid clamp sizing
const NAME_FONT_SIZE = "clamp(1.35rem, 5.5vw, 5.25rem)";
const SUBTITLE_FONT_SIZE = "clamp(0.75rem, 2vw, 0.95rem)";

export interface LetterItem {
  key: string;
  char: string;
  layoutId?: string;
  isAnchor: boolean;
}

// Initial state (Frame 1): "C" and "K" centered as initials
const INITIAL_LETTERS: LetterItem[] = [
  { key: "letter-C", char: "C", layoutId: "letter-C", isAnchor: true },
  { key: "letter-K", char: "K", layoutId: "letter-K", isAnchor: true },
];

// Resolved state (Frame 2): "KARTHIKEYAN C" (NO trailing period at the end)
const FULL_NAME_LETTERS: LetterItem[] = [
  { key: "letter-K", char: "K", layoutId: "letter-K", isAnchor: true },
  { key: "letter-A-1", char: "A", isAnchor: false },
  { key: "letter-R-2", char: "R", isAnchor: false },
  { key: "letter-T-3", char: "T", isAnchor: false },
  { key: "letter-H-4", char: "H", isAnchor: false },
  { key: "letter-I-5", char: "I", isAnchor: false },
  { key: "letter-K-6", char: "K", isAnchor: false },
  { key: "letter-E-7", char: "E", isAnchor: false },
  { key: "letter-Y-8", char: "Y", isAnchor: false },
  { key: "letter-A-9", char: "A", isAnchor: false },
  { key: "letter-N-10", char: "N", isAnchor: false },
  { key: "letter-space-11", char: " ", isAnchor: false },
  { key: "letter-C", char: "C", layoutId: "letter-C", isAnchor: true },
];

const ROLES_TEXT = "FULL STACK DEVELOPER // MERN · SPRING BOOT · AI";
const ENTERING_TEXT = "ENTERING INTO PORTFOLIO";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const isReduced = !!prefersReducedMotion;

  // Timeline phase states
  const [phase, setPhase] = useState<"entry" | "morph" | "subtitle" | "iris">("entry");
  const [subtitleStage, setSubtitleStage] = useState<"hidden" | "roles-show" | "roles-hide" | "entering">("hidden");
  const [anchorFlashing, setAnchorFlashing] = useState(false);

  // Measure rendered name element's center point for iris reveal anchor
  const nameRef = useRef<HTMLDivElement>(null);
  const [irisCenter, setIrisCenter] = useState(() => ({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  }));

  const updateIrisCenter = useCallback(() => {
    const el = nameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setIrisCenter({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }, []);

  useEffect(() => {
    updateIrisCenter();
    window.addEventListener("resize", updateIrisCenter);
    const ro = new ResizeObserver(updateIrisCenter);
    if (nameRef.current) ro.observe(nameRef.current);
    return () => {
      window.removeEventListener("resize", updateIrisCenter);
      ro.disconnect();
    };
  }, [updateIrisCenter]);

  // Main timeline runner
  useEffect(() => {
    if (isReduced) {
      const tDone = setTimeout(() => onComplete(), LOADER_TIMING.REDUCED_MOTION_MS);
      return () => clearTimeout(tDone);
    }

    const tMorph = setTimeout(() => setPhase("morph"), LOADER_TIMING.FRAME2_MORPH_START_MS);
    
    // Crimson flash on anchor letters K & C upon position lock
    const tFlash = setTimeout(() => {
      setAnchorFlashing(true);
      setTimeout(() => setAnchorFlashing(false), 500);
    }, LOADER_TIMING.FRAME2_LOCK_FLASH_MS);

    // Subtitle phase: Roles reveal left to right
    const tRolesShow = setTimeout(() => {
      setPhase("subtitle");
      setSubtitleStage("roles-show");
    }, LOADER_TIMING.FRAME3_ROLES_SHOW_MS);

    // Subtitle phase: Roles hide right to left
    const tRolesHide = setTimeout(() => {
      setSubtitleStage("roles-hide");
    }, LOADER_TIMING.FRAME3_ROLES_HIDE_MS);

    // Subtitle phase: "ENTERING INTO PORTFOLIO" appears
    const tEntering = setTimeout(() => {
      setSubtitleStage("entering");
    }, LOADER_TIMING.FRAME3_ENTERING_MS);

    // Iris reveal phase
    const tIris = setTimeout(() => setPhase("iris"), LOADER_TIMING.FRAME4_IRIS_START_MS);
    
    const tComplete = setTimeout(() => {
      onComplete();
    }, LOADER_TIMING.FRAME4_IRIS_START_MS + LOADER_TIMING.IRIS_DURATION_MS);

    return () => {
      clearTimeout(tMorph);
      clearTimeout(tFlash);
      clearTimeout(tRolesShow);
      clearTimeout(tRolesHide);
      clearTimeout(tEntering);
      clearTimeout(tIris);
      clearTimeout(tComplete);
    };
  }, [isReduced, onComplete]);

  const isExpanded = phase !== "entry";

  const irisClipPath = phase === "iris"
    ? `circle(0% at ${irisCenter.x}px ${irisCenter.y}px)`
    : `circle(150% at ${irisCenter.x}px ${irisCenter.y}px)`;

  if (isReduced) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] select-none text-[#F8F8F8]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: LOADER_TIMING.REDUCED_MOTION_MS / 1000, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center gap-3">
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: NAME_FONT_SIZE,
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            KARTHIKEYAN C
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: SUBTITLE_FONT_SIZE,
              color: "#A8A8A8",
            }}
          >
            {ENTERING_TEXT}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] select-none overflow-hidden"
      initial={{ opacity: 1, clipPath: `circle(150% at ${irisCenter.x}px ${irisCenter.y}px)` }}
      animate={{ clipPath: irisClipPath }}
      transition={{
        clipPath: phase === "iris"
          ? { duration: LOADER_TIMING.IRIS_DURATION_MS / 1000, ease: IRIS_EASING }
          : { duration: 0.2 },
      }}
      role="presentation"
      aria-hidden="true"
    >
      {/* Cyber scanlines overlay matching home screen aesthetic */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px]" />

      {/* Crimson ambient glow centered behind name */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at ${irisCenter.x}px ${irisCenter.y}px, rgba(220,38,38,0.14) 0%, transparent 60%)`,
        }}
      />

      {/* Main content container */}
      <div className="relative flex flex-col items-center px-4 max-w-full z-10">
        
        {/* ── LETTER CONTINUITY MORPH ── */}
        <LayoutGroup id="loader-morph">
          <motion.div
            ref={nameRef}
            className="flex items-center justify-center whitespace-nowrap"
            style={{
              fontFamily: "'Cinzel', var(--font-heading)",
              fontSize: NAME_FONT_SIZE,
              fontWeight: 700,
              letterSpacing: isExpanded ? "0.14em" : "0.35em",
              color: "#F8F8F8",
            }}
            layout
            transition={{ type: "spring", stiffness: 130, damping: 22 }}
          >
            {(isExpanded ? FULL_NAME_LETTERS : INITIAL_LETTERS).map((item, index) => {
              const isAnchor = item.isAnchor;
              const isFlashing = isAnchor && anchorFlashing;

              // Non-anchor letters unfold outward with smooth stagger
              const nonAnchorDelay = isExpanded && !isAnchor
                ? (LOADER_TIMING.FRAME2_MORPH_START_MS + index * LOADER_TIMING.FRAME2_LETTER_STAGGER_MS) / 1000
                : 0;

              return (
                <motion.span
                  key={item.key}
                  layoutId={item.layoutId}
                  layout
                  initial={!isAnchor ? { opacity: 0, x: -12 } : { opacity: 0, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    color: isFlashing ? ACCENT_COLOR : "#F8F8F8",
                    textShadow: isFlashing
                      ? `0 0 24px rgba(220, 38, 38, 0.95), 0 0 48px rgba(220, 38, 38, 0.6)`
                      : "none",
                  }}
                  transition={{
                    layout: { type: "spring", stiffness: 130, damping: 22 },
                    opacity: { duration: 0.5, delay: nonAnchorDelay },
                    x: { duration: 0.5, delay: nonAnchorDelay },
                    color: { duration: 0.25 },
                    textShadow: { duration: 0.25 },
                  }}
                  className="inline-block"
                >
                  {item.char === " " ? "\u00A0" : item.char}
                </motion.span>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* ── SUBTITLE & ROLES SEQUENCE SECTION ── */}
        <div className="mt-7 min-h-[32px] flex items-center justify-center relative max-w-[92vw]">
          
          {/* Roles Text: Left-to-Right reveal, then Right-to-Left hide */}
          {(subtitleStage === "roles-show" || subtitleStage === "roles-hide") && (
            <motion.p
              initial={{ opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }}
              animate={{
                clipPath: subtitleStage === "roles-show" ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
              }}
              transition={{
                duration: subtitleStage === "roles-show" ? 1.1 : 0.85,
                ease: "easeInOut",
              }}
              className="text-center font-sans text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.12em] sm:tracking-[0.25em] uppercase text-[#DC2626] max-w-full px-2"
            >
              {ROLES_TEXT}
            </motion.p>
          )}

          {/* "ENTERING INTO PORTFOLIO": Fades & slides up smoothly */}
          {subtitleStage === "entering" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="flex items-center justify-center gap-2.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse shrink-0" />
              <p
                className="text-center font-heading font-medium tracking-[0.22em] uppercase text-[#A8A8A8]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: SUBTITLE_FONT_SIZE,
                }}
              >
                {ENTERING_TEXT}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};