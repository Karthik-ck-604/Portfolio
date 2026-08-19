/**
 * ScrollProgressButton.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Floating circular scroll-progress indicator + scroll-to-top button.
 *
 * Features:
 *  • Positioned fixed at bottom-right (bottom-6 right-6 z-40).
 *  • Bound to Lenis scroll position (`lenisScrollY`) for non-janky updates.
 *  • Thin SVG circular progress ring (#DC2626 accent) with rounded stroke ends,
 *    rotating -90° to fill clockwise from the 12 o'clock top position.
 *  • Faint low-opacity ring track behind the progress stroke.
 *  • Solid red circular button (#DC2626) centered inside with white ArrowUp icon.
 *  • Micro-interaction: scale hover effect (1.0 → 1.08) and red glow.
 *  • Fades and scales out completely when scrollY < 120px (at page top).
 *  • Click invokes Lenis smooth scroll to the top of the page.
 */

import React, { useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { lenisScrollY } from "@/providers/SmoothScrollProvider";
import { scrollToSection } from "@/lib/scrollToSection";

export const ScrollProgressButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // SVG Geometry metrics
  const size = 52;
  const strokeWidth = 2.5;
  const center = size / 2; // 26
  const radius = (size - strokeWidth) / 2 - 1; // ~23.75
  const circumference = 2 * Math.PI * radius; // ~149.22

  // Update progress percentage and visibility state on Lenis scroll tick
  useMotionValueEvent(lenisScrollY, "change", (latest) => {
    if (typeof window !== "undefined") {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        maxScroll > 0
          ? Math.min(100, Math.max(0, (latest / maxScroll) * 100))
          : 0;

      setScrollProgress(progress);
      setIsVisible(latest >= 120);
    }
  });

  const handleScrollToTop = () => {
    scrollToSection("hero", 0);
  };

  // stroke-dashoffset: 0% progress -> circumference (empty), 100% -> 0 (full)
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleScrollToTop}
          data-cursor="pointer"
          aria-label="Scroll to top of page"
          className="fixed bottom-6 right-6 z-40 p-0 bg-transparent border-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full group"
        >
          {/* Main outer wrapper with hover scale & shadow */}
          <div className="relative flex items-center justify-center w-[52px] h-[52px] transition-transform duration-250 ease-out group-hover:scale-108">
            {/* SVG Progress Ring */}
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Background Track Circle (Faint accent red) */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="rgba(220, 38, 38, 0.2)"
                strokeWidth={strokeWidth}
              />
              {/* Foreground Progress Circle (Dynamic fill) */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#DC2626"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(-90 ${center} ${center})`}
                className="transition-[stroke-dashoffset] duration-150 ease-out"
              />
            </svg>

            {/* Inner Solid Red Accent Button */}
            <div className="w-[41px] h-[41px] rounded-full bg-[#DC2626] group-hover:bg-[#EF4444] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(220,38,38,0.4)] group-hover:shadow-[0_6px_26px_rgba(220,38,38,0.6)] transition-all duration-250 z-10">
              <ArrowUp className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
