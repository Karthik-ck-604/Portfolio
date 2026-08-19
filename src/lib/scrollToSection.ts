/**
 * scrollToSection
 * ─────────────────────────────────────────────────────────────────────────────
 * Scrolls to a section by ID, using Lenis when active or falling back to
 * native window.scrollTo when Lenis is unavailable (reduced-motion).
 *
 * The nav-height offset is measured live from the rendered header so it stays
 * correct whether the nav is in its full-bar state or compact-pill state.
 *
 * `breathingRoomOffset` (default 20 px) adds a small gap below the nav so the
 * section heading never sits flush against the navbar edge.
 */

import { lenisScrollY } from "@/providers/SmoothScrollProvider";

// We access the Lenis instance via a module-level getter rather than context so
// this utility can be called from anywhere (hooks, handlers) without React.
let _lenisInstance: import("lenis").default | null = null;

/** Called once by SmoothScrollProvider to register the Lenis instance. */
export function registerLenis(lenis: import("lenis").default | null) {
  _lenisInstance = lenis;
}

export const scrollToSection = (id: string, breathingRoomOffset = 20) => {
  const element = document.getElementById(id);
  if (!element) return;

  // Live measurement of current rendered header height
  const header = document.querySelector("header");
  const navHeight = header ? header.getBoundingClientRect().height : 72;
  const totalOffset = navHeight + breathingRoomOffset;

  if (_lenisInstance) {
    // Lenis scrollTo: `offset` is applied relative to the element's top edge.
    _lenisInstance.scrollTo(element, {
      offset: -totalOffset,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    // Fallback: native smooth scroll (reduced-motion users get instant via CSS)
    const targetTop =
      element.getBoundingClientRect().top + window.scrollY - totalOffset;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  }
};
