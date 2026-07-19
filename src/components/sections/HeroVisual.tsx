import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import profileImg from "@/hero_section_profile.png";

export const HeroVisual: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  // Handle subtle cursor-based parallax effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Calculate delta relative to viewport center
      const x = (clientX - window.innerWidth / 2) / 40; // Subtle factor
      const y = (clientY - window.innerHeight / 2) / 40;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  // Floating animation settings
  const floatAnimation = prefersReducedMotion
    ? {}
    : {
        y: [0, -4, 0],
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[440px] mx-auto select-none flex items-center justify-center pointer-events-none"
    >
      {/* Background Soft Crimson Ambient Lighting */}
      <div className="absolute inset-0 bg-[#DC2626]/5 blur-[90px] rounded-full z-0 pointer-events-none scale-110" />

      {/* Atmospheric depth light behind the portrait */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-transparent via-[#DC2626]/3 to-[#DC2626]/10 blur-[50px] rounded-full z-0 pointer-events-none" />

      {/* Animated Image Wrapper (Floating + Parallax) */}
      <motion.div
        animate={{
          ...floatAnimation,
          x: prefersReducedMotion ? 0 : mouseOffset.x,
          y: prefersReducedMotion ? 0 : [mouseOffset.y, mouseOffset.y - 4, mouseOffset.y]
        }}
        // Apply smooth spring physics on transform transition
        transition={prefersReducedMotion ? {} : {
          x: { type: "spring", stiffness: 80, damping: 25 },
          y: { type: "spring", stiffness: 80, damping: 25 }
        }}
        className="relative z-10 w-full"
      >
        <img
          src={profileImg}
          alt="Karthikeyan C Portrait"
          className="w-full h-auto object-contain select-none pointer-events-none"
          // Applying filter: drop-shadow to contour around the alpha mask rather than rectangular boundaries
          style={{
            filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 25px rgba(220, 38, 38, 0.25))",
            willChange: "transform, filter"
          }}
        />
      </motion.div>
    </motion.div>
  );
};
