import React, { useState, useEffect } from "react";
import { motion, useReducedMotion, TargetAndTransition } from "framer-motion";

const profileImg = "/assets/hero_section_profile.png";

interface HeroVisualProps {
  isLoaded?: boolean;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ isLoaded = true }) => {
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
      animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-xs sm:max-w-sm lg:max-w-[440px] mx-auto select-none flex items-center justify-center pointer-events-none"
    >
      {/* Soft red radial backlight glow with slow pulse breathing animation */}
      <motion.div
        animate={prefersReducedMotion ? {} : {
          opacity: [0.35, 0.5, 0.35],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[110%] aspect-square bg-[radial-gradient(circle_at_center,rgba(226,75,74,0.35)_0%,transparent_70%)] blur-[70px] sm:blur-[90px] z-0 pointer-events-none"
      />

      {/* Animated Image Wrapper (Floating + Parallax) */}
      <motion.div
        animate={{
          ...floatAnimation,
          x: prefersReducedMotion ? 0 : mouseOffset.x,
          y: prefersReducedMotion ? 0 : [mouseOffset.y, mouseOffset.y - 4, mouseOffset.y]
        } as TargetAndTransition}
        transition={prefersReducedMotion ? {} : {
          x: { type: "spring", stiffness: 80, damping: 25 },
          y: { type: "spring", stiffness: 80, damping: 25 }
        }}
        className="relative z-10 w-full"
      >
        {/* Viewfinder/HUD Style Corners - Inset by 12px */}
        <div className="absolute top-[12px] left-[12px] w-[20px] h-[20px] border-t-2 border-l-2 border-[#E24B4A] z-20 pointer-events-none" />
        <div className="absolute top-[12px] right-[12px] w-[20px] h-[20px] border-t-2 border-r-2 border-[#E24B4A] z-20 pointer-events-none" />
        <div className="absolute bottom-[12px] left-[12px] w-[20px] h-[20px] border-b-2 border-l-2 border-[#E24B4A] z-20 pointer-events-none" />
        <div className="absolute bottom-[12px] right-[12px] w-[20px] h-[20px] border-b-2 border-r-2 border-[#E24B4A] z-20 pointer-events-none" />

        {/* Floating pill badges matching the reference layout and text styling */}
        {/* Badge 1: MERN STACK (Top Right) */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, -4, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[10%] -right-2 sm:-right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111]/90 border border-[#2A2A2A] shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#E24B4A] animate-pulse shrink-0" />
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#E8E8E8] uppercase">MERN STACK</span>
        </motion.div>

        {/* Badge 2: REST APIs (Left Mid) */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-[48%] -left-4 sm:-left-6 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111]/90 border border-[#2A2A2A] shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#E24B4A] shrink-0" />
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#E8E8E8] uppercase">REST APIs</span>
        </motion.div>

        {/* Badge 3: SPRING BOOT (Bottom Right) */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-[16%] -right-4 sm:-right-6 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111]/90 border border-[#2A2A2A] shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#E24B4A] animate-pulse shrink-0" />
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#E8E8E8] uppercase">SPRING BOOT</span>
        </motion.div>

        {/* Badge 4: FULL STACK DEVELOPER (Bottom Center/Left Overlay) */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 3, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
          className="absolute bottom-[5%] left-[6%] sm:left-[8%] z-30 flex items-center gap-2 px-4 py-1.8 rounded-full bg-[#111111]/95 border border-[#2A2A2A] shadow-[0_8px_25px_rgba(0,0,0,0.8)]"
        >
          <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#E8E8E8] uppercase px-1">FULL STACK DEVELOPER</span>
        </motion.div>

        {/* Portrait image (kept in full color) */}
        <img
          src={profileImg}
          alt="Karthikeyan C Portrait"
          draggable={false}
          className="w-full h-auto object-contain select-none pointer-events-none"
          style={{
            filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 25px rgba(220, 38, 38, 0.25))",
            willChange: "transform, filter"
          }}
        />

        {/* Bottom fade — dissolves the hard bottom edge into the dark background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2/5 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #050505 0%, #050505 10%, rgba(5,5,5,0.7) 40%, transparent 100%)"
          }}
        />

        {/* Left edge fade */}
        <div
          className="absolute top-0 left-0 bottom-0 w-1/5 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #050505 0%, transparent 100%)"
          }}
        />

        {/* Right edge fade */}
        <div
          className="absolute top-0 right-0 bottom-0 w-1/5 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #050505 0%, transparent 100%)"
          }}
        />

        {/* Top edge — subtle fade so hair blends */}
        <div
          className="absolute top-0 left-0 right-0 h-1/6 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #050505 0%, transparent 100%)"
          }}
        />
      </motion.div>
    </motion.div>
  );
};
