import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CursorGlow: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const hasTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasTouch || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by radius (w-16 = 64px -> offset = -32px)
      mouseX.set(e.clientX - 32);
      mouseY.set(e.clientY - 32);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-16 h-16 rounded-full border border-[#DC2626]/30 bg-[#DC2626]/5 pointer-events-none z-[100] mix-blend-screen"
      style={{
        x: springX,
        y: springY,
      }}
    />
  );
};
