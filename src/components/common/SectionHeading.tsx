import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { blurReveal } from "@/utils/motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}) => {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={cn(
        "flex flex-col mb-12 md:mb-16",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
    >
      <motion.span
        variants={blurReveal}
        className="text-[#DC2626] font-sans text-sm font-semibold tracking-[0.3em] uppercase mb-3"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={blurReveal}
        className="text-[#F8F8F8] font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight max-w-4xl"
      >
        {title}
        {align === "left" && <span className="text-[#DC2626]">.</span>}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={blurReveal}
          className="text-[#A8A8A8] font-sans text-base sm:text-lg leading-relaxed mt-4 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
