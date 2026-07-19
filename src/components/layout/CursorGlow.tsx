import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CursorGlow: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<string>("default");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springTransition = {
    type: "spring" as const,
    stiffness: 320,
    damping: 32,
    mass: 0.8,
  };

  const visibilityTransition = {
    duration: 0.24,
    ease: "easeOut" as const,
  };

  const centerGlyphTransition = {
    duration: 0.18,
    ease: "easeOut" as const,
  };

  // Background radial glow spring (loose for cinematic layered delay)
  const glowSpringX = useSpring(mouseX, { stiffness: 180, damping: 25 });
  const glowSpringY = useSpring(mouseY, { stiffness: 180, damping: 25 });

  // Shared cursor spring for the full cursor shape (dot + brackets move together)
  const cursorSpringX = useSpring(mouseX, { stiffness: 350, damping: 35 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 350, damping: 35 });

  // Snap instantly or trailing lag depending on reduced motion settings
  const currentGlowX = prefersReducedMotion ? mouseX : glowSpringX;
  const currentGlowY = prefersReducedMotion ? mouseY : glowSpringY;

  const currentCursorX = prefersReducedMotion ? mouseX : cursorSpringX;
  const currentCursorY = prefersReducedMotion ? mouseY : cursorSpringY;

  // Track both pointer and prefers-reduced-motion query listeners
  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handlePointerChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setEnabled(e.matches);
      if (e.matches) {
        document.body.classList.add("cursor-none");
      } else {
        document.body.classList.remove("cursor-none");
      }
    };

    const handleMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(e.matches);
    };

    // Run initial checks
    handlePointerChange(pointerQuery);
    handleMotionChange(motionQuery);

    // Event listeners registration
    if (pointerQuery.addEventListener) {
      pointerQuery.addEventListener("change", handlePointerChange);
      motionQuery.addEventListener("change", handleMotionChange);
    } else {
      // @ts-ignore
      pointerQuery.addListener(handlePointerChange);
      // @ts-ignore
      motionQuery.addListener(handleMotionChange);
    }

    return () => {
      document.body.classList.remove("cursor-none");
      if (pointerQuery.removeEventListener) {
        pointerQuery.removeEventListener("change", handlePointerChange);
        motionQuery.removeEventListener("change", handleMotionChange);
      } else {
        // @ts-ignore
        pointerQuery.removeListener(handlePointerChange);
        // @ts-ignore
        motionQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  // Track mouse coordinates and document hover attributes
  useEffect(() => {
    if (!enabled) return;

    const updateCursorType = (target: HTMLElement | null) => {
      if (target) {
        const cursorEl = target.closest("[data-cursor]");
        if (cursorEl) {
          const type = cursorEl.getAttribute("data-cursor");
          if (type) {
            setCursorType(type);
            return;
          }
        }
      }
      setCursorType("default");
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      updateCursorType(e.target as HTMLElement);
    };

    const handleMouseOver = (e: MouseEvent) => {
      updateCursorType(e.target as HTMLElement);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    // Listen to custom cursor changes fired programmatically (e.g., during active dragging)
    const handleCustomCursorChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setCursorType(customEvent.detail);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("cursorchange", handleCustomCursorChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("cursorchange", handleCustomCursorChange);
    };
  }, [enabled, isVisible]);

  // Text cursor observer removed

  if (!enabled) return null;

  // Bracket variants with clear 2px borders and full red #DC2626 opacity
  const topLeftVariants = {
    default: {
      top: "0px",
      left: "0px",
      width: "8px",
      height: "8px",
      borderTopWidth: "2px",
      borderLeftWidth: "2px",
      borderBottomWidth: "0px",
      borderRightWidth: "0px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 1,
    },
    pointer: {
      top: "-4px",
      left: "-4px",
      width: "12px",
      height: "12px",
      borderTopWidth: "2px",
      borderLeftWidth: "2px",
      borderBottomWidth: "0px",
      borderRightWidth: "0px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 1,
    },

    wait: {
      top: "0px",
      left: "0px",
      width: "8px",
      height: "8px",
      borderTopWidth: "2px",
      borderLeftWidth: "2px",
      borderBottomWidth: "0px",
      borderRightWidth: "0px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 1,
    },
    text: {
      top: "0px",
      left: "11px", // Centered inside 24px container
      width: "2px",
      height: "36px", // Full caret height
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderBottomWidth: "0px",
      borderRightWidth: "0px",
      borderColor: "transparent",
      backgroundColor: "#DC2626",
      borderRadius: "0px",
      opacity: 1,
    },
    crosshair: {
      top: "0px",
      left: "15px", // Centered inside 32px container
      width: "2px",
      height: "32px", // Full height vertical line of plus
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderBottomWidth: "0px",
      borderRightWidth: "0px",
      borderColor: "transparent",
      backgroundColor: "#DC2626",
      borderRadius: "0px",
      opacity: 1,
    },
    grab: {
      top: "0px",
      left: "0px",
      width: "10px",
      height: "10px",
      borderTopWidth: "2px",
      borderLeftWidth: "2px",
      borderBottomWidth: "0px",
      borderRightWidth: "0px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "4px",
      opacity: 1,
    },
    grabbing: {
      top: "2px",
      left: "2px",
      width: "6px",
      height: "6px",
      borderTopWidth: "2px",
      borderLeftWidth: "2px",
      borderBottomWidth: "0px",
      borderRightWidth: "0px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "4px",
      opacity: 1,
    },
    "not-allowed": {
      top: "0px",
      left: "0px",
      width: "8px",
      height: "8px",
      borderTopWidth: "2px",
      borderLeftWidth: "2px",
      borderBottomWidth: "0px",
      borderRightWidth: "0px",
      borderColor: "#737373", // Gray color
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 0.7,
    },
    help: {
      top: "0px",
      left: "0px",
      width: "8px",
      height: "8px",
      borderTopWidth: "2px",
      borderLeftWidth: "2px",
      borderBottomWidth: "0px",
      borderRightWidth: "0px",
      borderColor: "#737373",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 0.6,
    },
    "zoom-in": {
      top: "0px",
      left: "0px",
      width: "8px",
      height: "8px",
      borderTopWidth: "2px",
      borderLeftWidth: "2px",
      borderBottomWidth: "0px",
      borderRightWidth: "0px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 1,
    },
    "zoom-out": {
      top: "0px",
      left: "0px",
      width: "8px",
      height: "8px",
      borderTopWidth: "2px",
      borderLeftWidth: "2px",
      borderBottomWidth: "0px",
      borderRightWidth: "0px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 1,
    }
  };

  const bottomRightVariants = {
    default: {
      bottom: "0px",
      right: "0px",
      width: "8px",
      height: "8px",
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderBottomWidth: "2px",
      borderRightWidth: "2px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 1,
    },
    pointer: {
      bottom: "-4px",
      right: "-4px",
      width: "12px",
      height: "12px",
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderBottomWidth: "2px",
      borderRightWidth: "2px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 1,
    },
    text: {
      opacity: 0,
      width: "0px",
      height: "0px",
    },
    wait: {
      bottom: "0px",
      right: "0px",
      width: "8px",
      height: "8px",
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderBottomWidth: "2px",
      borderRightWidth: "2px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 1,
    },
    crosshair: {
      bottom: "15px", // Centered inside 32px container
      right: "0px",
      width: "32px", // Full width horizontal line of plus
      height: "2px",
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderBottomWidth: "0px",
      borderRightWidth: "0px",
      borderColor: "transparent",
      backgroundColor: "#DC2626",
      borderRadius: "0px",
      opacity: 1,
    },
    grab: {
      bottom: "0px",
      right: "0px",
      width: "10px",
      height: "10px",
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderBottomWidth: "2px",
      borderRightWidth: "2px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "4px",
      opacity: 1,
    },
    grabbing: {
      bottom: "2px",
      right: "2px",
      width: "6px",
      height: "6px",
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderBottomWidth: "2px",
      borderRightWidth: "2px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "4px",
      opacity: 1,
    },
    "not-allowed": {
      bottom: "0px",
      right: "0px",
      width: "8px",
      height: "8px",
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderBottomWidth: "2px",
      borderRightWidth: "2px",
      borderColor: "#737373",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 0.7,
    },
    help: {
      bottom: "0px",
      right: "0px",
      width: "8px",
      height: "8px",
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderBottomWidth: "2px",
      borderRightWidth: "2px",
      borderColor: "#737373",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 0.6,
    },
    "zoom-in": {
      bottom: "0px",
      right: "0px",
      width: "8px",
      height: "8px",
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderBottomWidth: "2px",
      borderRightWidth: "2px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 1,
    },
    "zoom-out": {
      bottom: "0px",
      right: "0px",
      width: "8px",
      height: "8px",
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderBottomWidth: "2px",
      borderRightWidth: "2px",
      borderColor: "#DC2626",
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "0px",
      opacity: 1,
    }
  };

  const isWait = cursorType === "wait" && !prefersReducedMotion;
  const shouldHideDot = cursorType === "text" || cursorType === "zoom-in" || cursorType === "zoom-out";
  const dotTransition = prefersReducedMotion ? { duration: 0 } : centerGlyphTransition;

  return (
    <>
      {/* Background Soft Ambient Radial Glow Spotlight */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: currentGlowX,
          y: currentGlowY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(220, 38, 38, 0.12) 0%, rgba(220, 38, 38, 0) 70%)",
          filter: "blur(16px)",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={visibilityTransition}
      />

      {/* Center dot anchored to the real pointer position */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: currentCursorX,
          y: currentCursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={visibilityTransition}
      >
        <motion.div
          animate={{
            opacity: shouldHideDot ? 0 : (cursorType === "not-allowed" ? 0.75 : 1),
            scale: cursorType === "not-allowed" ? 0.9 : 1,
            backgroundColor: cursorType === "not-allowed" ? "#737373" : "#DC2626",
          }}
          transition={dotTransition}
          className="h-[4px] w-[4px] rounded-full bg-[#DC2626]"
        />
      </motion.div>

      {/* Cinematic Brackets Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: currentCursorX,
          y: currentCursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={visibilityTransition}
      >
        <motion.div
          animate={{
            width: cursorType === "pointer" ? 48 : (cursorType === "text" ? 24 : (cursorType === "grabbing" ? 24 : (cursorType === "wait" || cursorType === "help" || cursorType === "zoom-in" || cursorType === "zoom-out" ? 36 : 32))),
            height: cursorType === "pointer" ? 48 : (cursorType === "text" ? 36 : (cursorType === "grabbing" ? 24 : (cursorType === "wait" || cursorType === "help" || cursorType === "zoom-in" || cursorType === "zoom-out" ? 36 : 32))),
            rotate: isWait ? [0, 360] : 0,
          }}
          transition={
            isWait
              ? {
                  rotate: { repeat: Infinity, ease: "linear", duration: 1.5 },
                  width: springTransition,
                  height: springTransition,
                }
              : springTransition
          }
          className="relative flex items-center justify-center"
        >
          {/* Top-left bracket */}
          <motion.div
            variants={topLeftVariants}
            animate={cursorType}
            transition={springTransition}
            className="absolute border-solid border-[#DC2626]"
          />

          {/* Bottom-right bracket */}
          <motion.div
            variants={bottomRightVariants}
            animate={cursorType}
            transition={springTransition}
            className="absolute border-solid border-[#DC2626]"
          />

          {/* Center slash for not-allowed state */}
          <motion.div
            animate={{
              opacity: cursorType === "not-allowed" ? 1 : 0,
              scale: cursorType === "not-allowed" ? 1 : 0,
            }}
            transition={centerGlyphTransition}
            className="absolute w-[120%] h-[2px] bg-[#DC2626] rotate-45 pointer-events-none origin-center"
          />

          {/* Center question mark for help state */}
          <motion.span
            animate={{
              opacity: cursorType === "help" ? 1 : 0,
              scale: cursorType === "help" ? 1 : 0,
            }}
            transition={centerGlyphTransition}
            className="absolute text-[11px] font-bold font-mono text-[#737373] pointer-events-none select-none"
          >
            ?
          </motion.span>

          {/* Center plus sign for zoom-in state */}
          <motion.span
            animate={{
              opacity: cursorType === "zoom-in" ? 1 : 0,
              scale: cursorType === "zoom-in" ? 1 : 0,
            }}
            transition={centerGlyphTransition}
            className="absolute text-[11px] font-bold font-mono text-[#DC2626] pointer-events-none select-none"
          >
            +
          </motion.span>

          {/* Center minus sign for zoom-out state */}
          <motion.span
            animate={{
              opacity: cursorType === "zoom-out" ? 1 : 0,
              scale: cursorType === "zoom-out" ? 1 : 0,
            }}
            transition={centerGlyphTransition}
            className="absolute text-[11px] font-bold font-mono text-[#DC2626] pointer-events-none select-none"
          >
            -
          </motion.span>
        </motion.div>


      </motion.div>
    </>
  );
};
