/**
 * SmoothScrollProvider
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps the app root with Lenis smooth-scroll physics.
 *
 * Behaviours:
 *  • Cinematic glide with exponential ease-out deceleration (duration ~1.15 s).
 *  • Boundary resistance: the last ~120 px before top/bottom apply a ramp that
 *    reduces the effective scroll delta (1.0 → 0.35) for a "glide to a halt"
 *    feel without actual overscroll bounce.
 *  • prefers-reduced-motion → Lenis is NOT initialised; native scroll is kept.
 *  • Framer Motion bridge: Lenis scroll position is mirrored into a shared
 *    `lenisScrollY` motionValue so useScrollCollapse (and any other FM hook)
 *    reads the same authoritative scroll position.
 *  • All `scrollTo` calls are proxied through Lenis; falls back to
 *    `window.scrollTo` when Lenis is inactive.
 */

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { useMotionValue } from "framer-motion";
import {
  SmoothScrollContext,
  type SmoothScrollContextValue,
} from "@/context/SmoothScrollContext";

// ─── Shared Lenis motionValue ─────────────────────────────────────────────────
// Exported so useScrollCollapse can import it directly without going through
// the context (avoids a re-render cycle in the hook).
import { motionValue } from "framer-motion";
export const lenisScrollY = motionValue(0);

// ─── Boundary resistance ──────────────────────────────────────────────────────
const BOUNDARY_ZONE = 120; // px from top/bottom edge where resistance kicks in

function boundaryResistanceFactor(
  scrollY: number,
  maxScroll: number
): number {
  // Near the TOP
  if (scrollY < BOUNDARY_ZONE) {
    const t = scrollY / BOUNDARY_ZONE; // 0 at edge → 1 at zone end
    return 0.35 + 0.65 * t;            // 0.35 → 1.0
  }
  // Near the BOTTOM
  const distFromBottom = maxScroll - scrollY;
  if (distFromBottom < BOUNDARY_ZONE) {
    const t = distFromBottom / BOUNDARY_ZONE;
    return 0.35 + 0.65 * t;
  }
  return 1;
}

// ─── Provider ─────────────────────────────────────────────────────────────────
interface Props {
  children: ReactNode;
}

export const SmoothScrollProvider: React.FC<Props> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const scrollTo = useCallback<SmoothScrollContextValue["scrollTo"]>(
    (target, opts) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target as never, opts as never);
      } else {
        // Reduced-motion fallback
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" });
        } else if (typeof target === "string") {
          const el = document.querySelector(target);
          el?.scrollIntoView({ behavior: "smooth" });
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    []
  );

  useEffect(() => {
    // Respect prefers-reduced-motion — skip Lenis entirely.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // ── Initialise Lenis ──────────────────────────────────────────────────────
    const instance = new Lenis({
      duration: 1.15,
      // Exponential ease-out — smooth deceleration, cinematic feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      // Reduce touch multiplier on narrow viewports for more 1:1 feel
      // (applied dynamically via the wheel handler override below)
    } as ConstructorParameters<typeof Lenis>[0]);

    lenisRef.current = instance;
    setLenis(instance);

    // ── Boundary resistance wheel override ───────────────────────────────────
    // Lenis exposes a `wheel` event but the cleanest interception point is
    // wrapping its internal wheel handler via a native listener before Lenis
    // processes the event. We use a custom wheel listener that patches the
    // deltaY so Lenis sees a pre-attenuated value near boundaries.
    const wheelHandler = (e: WheelEvent) => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const factor = boundaryResistanceFactor(window.scrollY, maxScroll);
      if (factor < 1) {
        // We can't rewrite a native WheelEvent's deltaY, so instead we call
        // lenis.scrollTo() with a clamped target, which Lenis will ease to.
        const rawDelta = e.deltaY * factor;
        const target = Math.max(0, Math.min(maxScroll, window.scrollY + rawDelta));
        instance.scrollTo(target, { duration: 0.6 });
      }
    };
    // Listen at capture phase BEFORE Lenis's own wheel listener fires.
    // Only attach when near a boundary to minimise overhead.
    const checkAndAttach = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const near =
        window.scrollY < BOUNDARY_ZONE ||
        maxScroll - window.scrollY < BOUNDARY_ZONE;
      if (near) {
        window.addEventListener("wheel", wheelHandler, {
          passive: true,
          capture: true,
        });
      } else {
        window.removeEventListener("wheel", wheelHandler, { capture: true });
      }
    };

    // ── Sync Lenis scroll → Framer Motion motionValue ────────────────────────
    instance.on("scroll", ({ scroll }: { scroll: number }) => {
      lenisScrollY.set(scroll);
      checkAndAttach();
    });

    // ── RAF loop ──────────────────────────────────────────────────────────────
    function raf(time: number) {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", wheelHandler, { capture: true });
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  const ctxValue: SmoothScrollContextValue = { lenis, scrollTo };

  return (
    <SmoothScrollContext.Provider value={ctxValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
