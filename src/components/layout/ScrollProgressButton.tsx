/**
 * ScrollProgressButton.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Floating circular scroll-progress indicator + scroll-to-top button.
 *
 * Features:
 *  • Fixed bottom-right (bottom-6 right-6, z-50).
 *  • Binds to `lenisScrollY` motionValue — the ring progress is derived from a
 *    spring-smoothed motion value, so it tracks the scroll position precisely
 *    and smoothly (no re-render per scroll tick, no CSS-transition lag).
 *  • SVG two-circle ring: faint track + foreground progress arc (red accent),
 *    stroke-linecap round, starts filling at 12-o'clock via -90° rotation.
 *  • Outer wrapper: fully transparent — no background box behind the ring.
 *  • Fades out (opacity 0, scale 0.8) below 120 px scroll depth.
 *  • Click → Lenis scrollTo(0) with cinematic exponential ease-out (1.2 s),
 *    matching the same easing used in SmoothScrollProvider and scrollToSection.
 *  • Hover: scale 1 → 1.08, intensified red glow.
 *  • Touch target: 52 × 52 px (≥ 44 × 44 min).
 *  • z-50 — above page content, below modal overlays.
 */

import React, { useState } from "react";
import { ArrowUp } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";
import { lenisScrollY } from "@/providers/SmoothScrollProvider";
import { useSmoothScroll } from "@/context/SmoothScrollContext";

// Cinematic exponential ease-out — same curve used in SmoothScrollProvider
const cinematicEase = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

// SVG ring geometry
const SIZE = 52;
const STROKE_WIDTH = 2.5;
const CENTER = SIZE / 2; // 26
const RADIUS = (SIZE - STROKE_WIDTH) / 2 - 1; // ≈ 23.75
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 149.22

// Scroll depth (px) below which the button fades out.
const VISIBLE_THRESHOLD = 120;

export const ScrollProgressButton: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const [isVisible, setIsVisible] = useState(false);

  // ── Progress (0 → 100) mapped from Lenis scroll Y as a motionValue ─────────
  const maxScroll =
    typeof window !== "undefined"
      ? Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight
        )
      : 0;

  const progress = useTransform(lenisScrollY, (y) =>
    maxScroll > 0 ? Math.min(100, Math.max(0, (y / maxScroll) * 100)) : 0
  );

  // Gentle spring: relaxes toward the real progress but stays closely in sync.
  const smoothProgress = useSpring(progress, {
    stiffness: 220,
    damping: 45,
    restDelta: 0.0001,
  });

  // stroke-dashoffset maps progress 0% → circumference (empty ring)
  //                             100% → 0 (full ring)
  const strokeDashoffset = useTransform(
    smoothProgress,
    (p) => CIRCUMFERENCE - (p / 100) * CIRCUMFERENCE
  );

  // ── Visibility only — driven by Lenis scroll position ──────────────────────
  useMotionValueEvent(lenisScrollY, "change", (latest) => {
    if (typeof window === "undefined") return;
    const isMobileMenuOpen =
      document.body.style.overflow === "hidden" && window.innerWidth < 1024;
    setIsVisible(latest >= VISIBLE_THRESHOLD && !isMobileMenuOpen);
  });

  // ── Click → cinematic scroll to absolute top via Lenis ──────────────────────
  const handleScrollToTop = () => {
    scrollTo(0, {
      duration: 1.2,
      easing: cinematicEase,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-progress-btn"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleScrollToTop}
          data-cursor="pointer"
          aria-label="Scroll to top of page"
          className="fixed bottom-6 right-6 z-50 p-0 bg-transparent border-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full group"
        >
          {/* Outer wrapper — transparent, no background box */}
          <div className="relative flex items-center justify-center w-[52px] h-[52px] transition-transform duration-250 ease-out group-hover:scale-[1.08]">

            {/* ── SVG Progress Ring ─────────────────────────────────────────── */}
            <svg
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
            >
              {/* Track circle — faint accent red, always visible once button shows */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="rgba(220, 38, 38, 0.18)"
                strokeWidth={STROKE_WIDTH}
              />

              {/* Foreground progress arc — fills clockwise from 12 o'clock.
                  stroke-dashoffset is driven by a spring motionValue so the
                  fill tracks the real scroll position smoothly & accurately. */}
              <motion.circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="#DC2626"
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                style={{ strokeDashoffset }}
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
              />
            </svg>

            {/* ── Inner transparent button — only icon visible ──────────────── */}
            <div className="w-[41px] h-[41px] rounded-full bg-transparent flex items-center justify-center z-10">
              <ArrowUp
                className="w-4 h-4 text-white shrink-0 group-hover:-translate-y-0.5 transition-transform duration-200"
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
