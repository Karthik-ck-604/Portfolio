import { createContext, useContext } from "react";
import type Lenis from "lenis";

export interface SmoothScrollContextValue {
  /** The live Lenis instance. Null before mount or when reduced-motion is on. */
  lenis: Lenis | null;
  /**
   * Scroll to a CSS selector, DOM element, or absolute pixel position using
   * Lenis — falls back gracefully if Lenis is not active (reduced-motion).
   */
  scrollTo: (
    target: string | HTMLElement | number,
    opts?: Parameters<Lenis["scrollTo"]>[1]
  ) => void;
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);
