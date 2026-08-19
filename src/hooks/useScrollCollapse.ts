import { useState, useEffect, useRef } from "react";
import { useMotionValueEvent } from "framer-motion";
// Read from the Lenis-piped motionValue so the nav collapse/expand is always
// in sync with the smooth-scroll engine rather than raw window.scrollY.
// Falls back gracefully when Lenis is inactive (reduced-motion) because
// lenisScrollY is a plain motionValue that just stays at 0 if never updated —
// in that case the initial window.scrollY seed below keeps state correct.
import { lenisScrollY } from "@/providers/SmoothScrollProvider";

export function useScrollCollapse(collapseThreshold = 80, expandThreshold = 40) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ── Hysteresis-protected scroll collapse listener ─────────────────────────
  useMotionValueEvent(lenisScrollY, "change", (latest) => {
    setIsScrolled((prevScrolled) => {
      if (!prevScrolled && latest >= collapseThreshold) {
        setIsHovered(false);
        return true;
      }
      if (prevScrolled && latest <= expandThreshold) {
        setIsHovered(false);
        return false;
      }
      return prevScrolled;
    });
  });

  // ── Mount: seed state + track nav height CSS variable ─────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Seed from real scroll position in case page loaded mid-scroll or
      // Lenis is inactive (reduced-motion).
      const initialScrolled = window.scrollY >= collapseThreshold;
      setIsScrolled(initialScrolled);
      // Also sync the motionValue so the event listener starts in the right state
      lenisScrollY.set(window.scrollY);

      const updateNavHeightVar = () => {
        const header = document.querySelector("header");
        if (header) {
          const h = header.getBoundingClientRect().height;
          document.documentElement.style.setProperty(
            "--nav-height",
            `${Math.round(h)}px`
          );
        }
      };

      updateNavHeightVar();
      window.addEventListener("resize", updateNavHeightVar);
      return () => window.removeEventListener("resize", updateNavHeightVar);
    }
  }, [collapseThreshold]);

  // ── Hover support detection (desktop vs touch) ────────────────────────────
  const isHoverSupported = () => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(hover: hover)").matches;
  };

  const handleMouseEnter = () => {
    if (!isHoverSupported()) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isHoverSupported()) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    // 180ms delay to avoid flickering if cursor grazes edge
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 180);
  };

  const handleFocus = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleBlur = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 180);
  };

  return {
    isScrolled,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  };
}
