import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socials";
import { Button } from "@/components/common/Button";
import { HeroBackground } from "./HeroBackground";
import { HeroVisual } from "./HeroVisual";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { easeOutQuint, blurReveal, fadeUp, staggerContainer } from "@/utils/motion";

interface MetricCardProps {
  valueText: string;
  labelText: string;
  delayIndex: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ valueText, labelText, delayIndex }) => {
  // Parse numeric value if available to count up
  const numericPart = parseInt(valueText.replace(/\D/g, ""), 10);
  const prefixOrSuffix = valueText.replace(/\d/g, "");
  const animatedValue = useAnimatedCounter(0, numericPart || 0, 1.8, 0.9 + delayIndex * 0.1);

  // If the metric has non-numeric characters, render with counts
  const finalDisplay = numericPart ? `${animatedValue}${prefixOrSuffix}` : valueText;

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutQuint } }
      }}
      className="flex flex-col border border-[#2A2A2A]/40 bg-[#0F0F0F]/30 backdrop-blur-xs rounded-xl p-4 select-none"
    >
      <span className="text-2xl md:text-3xl font-bold font-mono text-[#F8F8F8] tracking-tight">{finalDisplay}</span>
      <span className="text-xs text-[#A8A8A8] font-sans mt-1">{labelText}</span>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("projects");
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("about");
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Splitting heading for character reveal
  const headingText = "Karthikeyan C";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Interactive canvas backdrop */}
      <HeroBackground />

      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Side Info Details */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            custom={{ delay: 0.2 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#DC2626] mb-4"
          >
            Full Stack Developer &bull; MERN &bull; Spring Boot &bull; AI
          </motion.span>

          {/* Heading with character reveal */}
          <h1 className="text-[#F8F8F8] font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-4 select-none">
            <span className="block text-xl sm:text-2xl font-semibold text-[#A8A8A8] tracking-normal font-sans mb-1">
              Hi, I'm
            </span>
            <span className="block">
              {headingText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.03,
                    ease: easeOutQuint
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="text-[#DC2626]"
              >
                .
              </motion.span>
            </span>
          </h1>

          {/* Subtitle description */}
          <motion.p
            variants={blurReveal}
            custom={{ delay: 0.5 }}
            className="text-[#A8A8A8] font-sans text-base sm:text-lg leading-relaxed max-w-[620px] mb-8"
          >
            {profile.description}
          </motion.p>

          {/* Mobile Portrait Visual */}
          <motion.div
            variants={fadeUp}
            custom={{ delay: 0.6 }}
            className="block lg:hidden w-full my-8 flex justify-center"
          >
            <HeroVisual />
          </motion.div>

          {/* CTA Row */}
          <motion.div
            variants={fadeUp}
            custom={{ delay: 0.7 }}
            className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
          >
            <Button
              href="#projects"
              onClick={handleScrollToProjects}
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              ariaLabel="View my featured projects"
              className="w-full sm:w-auto"
            >
              View Projects
            </Button>
            <Button
              href="/cert_oracle.png" // Resume path
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="md"
              ariaLabel="Download PDF resume"
              className="w-full sm:w-auto"
            >
              Download Resume
            </Button>
          </motion.div>

          {/* Social Icons row */}
          <motion.div
            variants={fadeUp}
            custom={{ delay: 0.85 }}
            className="flex items-center gap-5 mb-12"
          >
            {socialLinks.map((link) => {
              const Icon = link.name === "GitHub" ? Github : link.name === "LinkedIn" ? Linkedin : Mail;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-10 h-10 border border-[#2A2A2A] rounded-full text-[#A8A8A8] hover:text-[#F8F8F8] hover:border-[#DC2626] hover:bg-[rgba(220,38,38,0.05)] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                  aria-label={link.tooltip}
                >
                  <Icon className="w-4 h-4" />
                  
                  {/* Custom Tooltip */}
                  <span className="absolute bottom-full mb-2 scale-0 group-hover:scale-100 transition-all duration-200 origin-bottom bg-[#161616] border border-[#2A2A2A] text-[10px] text-[#F8F8F8] px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none select-none z-30">
                    {link.tooltip}
                  </span>
                </a>
              );
            })}
          </motion.div>

          {/* Metrics grids */}
          <motion.div
            variants={staggerContainer}
            custom={{ staggerChildren: 0.1, delayChildren: 0.9 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full"
          >
            {profile.metrics.map((metric, idx) => (
              <MetricCard
                key={metric.label}
                valueText={metric.value}
                labelText={metric.label}
                delayIndex={idx}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side Visual Illustration (Desktop only) */}
        <div className="hidden lg:flex lg:col-span-5 justify-center items-center lg:-translate-y-16">
          <HeroVisual />
        </div>
      </div>

      {/* Floating Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.0
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer select-none"
        onClick={handleScrollToAbout}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8]/60">Scroll Down</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#DC2626]" />
      </motion.div>
    </section>
  );
};
