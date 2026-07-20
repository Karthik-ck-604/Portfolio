import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Github, Linkedin, Mail, ArrowRight, ArrowDown,
  Briefcase, Award, BookOpen, FolderGit2, GraduationCap
} from "lucide-react";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socials";
import { Button } from "@/components/common/Button";
import { DocumentViewerModal, downloadDocument } from "@/components/common/DocumentViewerModal";
import { HeroBackground } from "./HeroBackground";
import { HeroVisual } from "./HeroVisual";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { easeOutQuint, blurReveal, fadeUp, staggerContainer } from "@/utils/motion";

// Red accent icons mapped per metric by label keyword
const METRIC_ICONS: Record<string, React.ReactNode> = {
  internship:    <Briefcase className="w-3.5 h-3.5 text-[#DC2626]" />,
  certification: <Award className="w-3.5 h-3.5 text-[#DC2626]" />,
  publication:   <BookOpen className="w-3.5 h-3.5 text-[#DC2626]" />,
  project:       <FolderGit2 className="w-3.5 h-3.5 text-[#DC2626]" />,
  graduate:      <GraduationCap className="w-3.5 h-3.5 text-[#DC2626]" />,
};

const getMetricIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("internship"))    return METRIC_ICONS.internship;
  if (l.includes("certification")) return METRIC_ICONS.certification;
  if (l.includes("publication"))   return METRIC_ICONS.publication;
  if (l.includes("project"))       return METRIC_ICONS.project;
  return METRIC_ICONS.graduate;
};

interface MetricCardProps {
  valueText: string;
  labelText: string;
  delayIndex: number;
  isLoaded: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ valueText, labelText, delayIndex, isLoaded }) => {
  const numericPart = parseInt(valueText.replace(/\D/g, ""), 10);
  const suffixPart  = valueText.replace(/\d/g, "");
  const animatedValue = useAnimatedCounter(0, isLoaded ? (numericPart || 0) : 0, 1.8, 0.4 + delayIndex * 0.1);
  const finalDisplay = numericPart ? `${animatedValue}${suffixPart}` : valueText;

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutQuint } }
      }}
      className="flex flex-col border border-[#2A2A2A]/60 bg-[#0F0F0F]/50 hover:border-[#DC2626]/30 hover:bg-[#0F0F0F]/80 backdrop-blur-sm rounded-xl p-4 gap-2 select-none transition-all duration-300 group"
    >
      {/* Icon + value row */}
      <div className="flex items-center justify-between">
        <span className="text-2xl md:text-3xl font-bold font-mono text-[#F8F8F8] tracking-tight leading-none">
          <span className="text-[#DC2626]">{finalDisplay.replace(/[^0-9]/g, "")}</span>
          <span className="text-[#F8F8F8]">{suffixPart}</span>
        </span>
        <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          {getMetricIcon(labelText)}
        </span>
      </div>
      <span className="text-[11px] text-[#888888] font-sans leading-tight">{labelText}</span>
    </motion.div>
  );
};

interface HeroProps {
  isLoaded?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded = true }) => {
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);

  const handleResumeDownload = async () => {
    try {
      await downloadDocument(profile.resumeUrl);
    } catch (error) {
      console.error("Unable to download resume:", error);
    }
  };

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("projects");
    if (target) {
      const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("about");
    if (target) {
      const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const headingText = "Karthikeyan C";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Interactive canvas backdrop */}
      <HeroBackground />

      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center z-10">

        {/* ── Left Side ── */}
        <motion.div
          initial="initial"
          animate={isLoaded ? "animate" : "initial"}
          variants={staggerContainer}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            custom={{ delay: 0.2 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#DC2626] mb-5"
          >
            Full Stack Developer &bull; MERN &bull; Spring Boot &bull; AI
          </motion.span>

          {/* Heading with character reveal */}
          <h1 className="text-[#F8F8F8] font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-5 select-none break-words">
            <span className="block text-xl sm:text-2xl font-semibold text-[#A8A8A8] tracking-normal font-sans mb-1">
              Hi, I'm
            </span>
            <span className="block">
              {headingText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
                animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="text-[#DC2626]"
              >
                .
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={blurReveal}
            custom={{ delay: 0.5 }}
            className="text-[#A8A8A8] font-sans text-base sm:text-lg leading-relaxed max-w-2xl mb-10"
          >
            {profile.description}
          </motion.p>

          {/* Mobile Portrait */}
          <motion.div
            variants={fadeUp}
            custom={{ delay: 0.6 }}
            className="flex lg:hidden w-full my-8 justify-center"
          >
            <HeroVisual isLoaded={isLoaded} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            custom={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 w-full"
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
              type="button"
              onClick={() => setIsResumeViewerOpen(true)}
              variant="secondary"
              size="md"
              ariaLabel="View resume"
              className="w-full sm:w-auto"
            >
              View Resume
            </Button>

            {/* Download Resume — solid border for clear visibility on dark bg */}
            <button
              type="button"
              onClick={handleResumeDownload}
              aria-label="Download PDF resume"
              data-cursor="pointer"
              className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#3A3A3A] hover:border-[#DC2626] text-[#D0D0D0] hover:text-[#F8F8F8] bg-transparent hover:bg-[#DC2626]/8 text-sm font-semibold tracking-wide transition-all duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
            >
              Download Resume
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={fadeUp}
            custom={{ delay: 0.85 }}
            className="flex items-center gap-4 sm:gap-5 mb-10 md:mb-14"
          >
            {socialLinks.map((link) => {
              const Icon = link.name === "GitHub" ? Github : link.name === "LinkedIn" ? Linkedin : Mail;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="group relative flex items-center justify-center min-w-11 h-11 w-11 border border-[#2A2A2A] rounded-full text-[#A8A8A8] hover:text-[#F8F8F8] hover:border-[#DC2626] hover:bg-[rgba(220,38,38,0.08)] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                  aria-label={link.tooltip}
                >
                  <Icon className="w-4 h-4" />
                  <span className="absolute bottom-full mb-2 scale-0 group-hover:scale-100 transition-all duration-200 origin-bottom bg-[#161616] border border-[#2A2A2A] text-[10px] text-[#F8F8F8] px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none select-none z-30">
                    {link.tooltip}
                  </span>
                </a>
              );
            })}
          </motion.div>

          {/* ── Stats: 5-column grid, all in one row on desktop ── */}
          <motion.div
            variants={staggerContainer}
            custom={{ staggerChildren: 0.08, delayChildren: 0.9 }}
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full"
          >
            {profile.metrics.map((metric, idx) => (
              <MetricCard
                key={metric.label}
                valueText={metric.value}
                labelText={metric.label}
                delayIndex={idx}
                isLoaded={isLoaded}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right Side Portrait (Desktop) ── */}
        <div className="hidden lg:flex lg:col-span-5 justify-center items-center lg:-translate-y-10">
          <HeroVisual isLoaded={isLoaded} />
        </div>
      </div>

      {/* The PDF stays in an embedded viewer; downloading only occurs through the controlled button. */}
      <DocumentViewerModal
        isOpen={isResumeViewerOpen}
        onClose={() => setIsResumeViewerOpen(false)}
        fileUrl={profile.resumeUrl}
        title="Karthikeyan C Resume"
      />

      {/* Floating scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2.0 }}
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer select-none px-4"
        onClick={handleScrollToAbout}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8]/60">Scroll Down</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#DC2626]" />
      </motion.div>
    </section>
  );
};
