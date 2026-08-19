import { useEffect, useRef, useState } from "react";

export const SCRAMBLE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=<>";

const randomGlyph = () =>
  SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];

const scrambleString = (target: string) =>
  [...target].map((ch) => (ch === " " ? " " : randomGlyph())).join("");

export interface UseScrambleOptions {
  /** Extra delay added after mount before the scramble begins (ms). */
  startDelayMs?: number;
  /** How long a locked character glows accent before settling (ms). */
  flashMs?: number;
  /** Stagger between consecutive letter locks (ms) — smaller = faster wave. */
  staggerMs?: number;
  /** How long each character cycles glyphs before locking (ms). */
  cycleMs?: number;
  /** When false (prefers-reduced-motion) the target resolves instantly. */
  enabled?: boolean;
}

export interface UseScrambleResult {
  display: string;
  /** Indices that locked within the last `flashMs` — caller tints these. */
  flashIndices: number[];
  /** True once every character has fully settled. */
  done: boolean;
}

export function useScramble(
  target: string,
  {
    startDelayMs = 0,
    flashMs = 150,
    staggerMs = 40,
    cycleMs = 320,
    enabled = true,
  }: UseScrambleOptions = {}
): UseScrambleResult {
  const [display, setDisplay] = useState(() =>
    enabled ? scrambleString(target) : target
  );
  const [flashIndices, setFlash] = useState<number[]>([]);
  const [done, setDone] = useState(() => !enabled);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) {
      setDisplay(target);
      setDone(true);
      return;
    }

    const start = performance.now() + Math.max(0, startDelayMs);

    // Indexes that actually resolve (spaces stay spaces forever).
    const letterIndices = [...target]
      .map((_, i) => i)
      .filter((i) => target[i] !== " ");
    const lastLockElapsed =
      letterIndices.length > 0
        ? letterIndices[letterIndices.length - 1] * staggerMs + cycleMs
        : 0;

    const tick = (now: number) => {
      const elapsed = now - start;

      // Still waiting for startDelay — hold the seeded scramble.
      if (elapsed < 0) {
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      let nextFlash: number[] = [];
      const nextDisplay = [...target]
        .map((ch, i) => {
          if (ch === " ") return " ";
          const lockStart = i * staggerMs;
          const lockEnd = lockStart + cycleMs;

          // Not yet this character's turn — keep cycling glyphs.
          if (elapsed < lockStart) return randomGlyph();

          // Mid-cycle — glyphs, with occasional glimpses of the real letter.
          if (elapsed < lockEnd) {
            return Math.random() < 0.12 ? ch : randomGlyph();
          }

          // Locked — glow accent for `flashMs`, then settle.
          if (elapsed < lockEnd + flashMs) nextFlash.push(i);
          return ch;
        })
        .join("");

      setDisplay(nextDisplay);
      setFlash(nextFlash);

      const fullyDone = elapsed >= lastLockElapsed + flashMs;
      if (fullyDone) {
        setDone(true);
        rafIdRef.current = 0;
      } else {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, [target, startDelayMs, flashMs, staggerMs, cycleMs, enabled]);

  return { display, flashIndices, done };
}