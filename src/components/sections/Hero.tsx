import React from "react";
import { motion } from "framer-motion";
import {
  Github, Linkedin, Mail, ArrowRight, ArrowDown,
  Briefcase, Award, BookOpen, FolderGit2, GraduationCap
} from "lucide-react";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socials";
import { Button } from "@/components/common/Button";
import { scrollToSection } from "@/lib/scrollToSection";
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
  const headingRef = React.useRef<HTMLSpanElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [fontScale, setFontScale] = React.useState(1);

  React.useLayoutEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const checkFit = () => {
      const parent = containerRef.current || el.parentElement;
      if (!parent) return;

      // Temporary reset scale to measure intrinsic scrollWidth
      el.style.transform = "none";
      const scrollW = el.scrollWidth;
      const parentW = parent.clientWidth;

      if (scrollW > parentW && parentW > 0) {
        const neededScale = Math.min(1, Math.floor((parentW / scrollW) * 1000) / 1000);
        setFontScale(neededScale);
      } else {
        setFontScale(1);
      }
    };

    checkFit();
    const ro = new ResizeObserver(checkFit);
    if (el.parentElement) ro.observe(el.parentElement);
    ro.observe(el);
    window.addEventListener("resize", checkFit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", checkFit);
    };
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("projects");
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("contact");
  };

  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("about");
  };

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
          ref={containerRef}
          initial="initial"
          animate={isLoaded ? "animate" : "initial"}
          variants={staggerContainer}
          className="lg:col-span-7 flex flex-col items-start w-full max-w-full overflow-hidden"
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            custom={{ delay: 0.2 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#DC2626] mb-5"
          >
            Full Stack Developer &bull; MERN &bull; Spring Boot &bull; AI
          </motion.span>

          {/* Heading with character reveal — single line guaranteed */}
          <h1 className="text-[#F8F8F8] font-heading font-bold mb-5 select-none w-full max-w-full">
            <span className="block text-xl sm:text-2xl font-semibold text-[#A8A8A8] tracking-normal font-sans mb-1">
              Hi, I'm
            </span>
            <span
              ref={headingRef}
              className="inline-block whitespace-nowrap origin-left"
              style={{
                fontSize: "clamp(1.6rem, 5.8vw, 4.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-heading)",
                transform: fontScale < 1 ? `scale(${fontScale})` : undefined,
              }}
            >
              {/* "Karthikeyan" */}
              {"Karthikeyan".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.03,
                    ease: easeOutQuint,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}

              {/* Space */}
              <span className="inline-block">&nbsp;</span>

              {/* "C." bound together */}
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + 12 * 0.03,
                  ease: easeOutQuint,
                }}
                className="inline-block"
              >
                C
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + 13 * 0.03,
                  ease: easeOutQuint,
                }}
                className="inline-block text-[#DC2626]"
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
              href="#contact"
              onClick={handleScrollToContact}
              variant="secondary"
              size="md"
              ariaLabel="Get in touch"
              className="w-full sm:w-auto"
            >
              Contact Me
            </Button>
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
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full"
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
