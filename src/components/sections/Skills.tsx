import React from "react";
import { motion } from "framer-motion";
import { Code2, Layout, Server, Database, ShieldAlert, Cloud, Wrench, Sparkles } from "lucide-react";
import { skillCategories, featuredTech } from "@/data/skills";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/common/Card";
import { TechChip } from "@/components/common/TechChip";
import { Badge } from "@/components/common/Badge";
import { staggerContainer } from "@/utils/motion";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-[#DC2626]" />,
  Layout: <Layout className="w-5 h-5 text-[#DC2626]" />,
  Server: <Server className="w-5 h-5 text-[#DC2626]" />,
  Database: <Database className="w-5 h-5 text-[#DC2626]" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-[#DC2626]" />,
  Cloud: <Cloud className="w-5 h-5 text-[#DC2626]" />,
  Wrench: <Wrench className="w-5 h-5 text-[#DC2626]" />
};

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#0F0F0F] border-b border-[#2A2A2A]/40 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#DC2626]/2 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical ecosystem & tooling"
          subtitle="A catalog of my skills organized by categories, highlighting core developer competencies."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Introductions & featured badges */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4 text-[#A8A8A8] font-sans text-base sm:text-lg leading-relaxed">
              <p>
                My technical capabilities map to the MERN ecosystem and enterprise Java Spring architectures. I prioritize clean component structures, accessibility (WCAG AA), and secure authentication flows.
              </p>
              <p>
                Through various project cycles, I have worked with SQL and NoSQL data structures, automatic end-to-end regression tests, and Generative AI prompt routing.
              </p>
            </div>

            {/* Draggable/Scrollable Tech Stack Strip */}
            <div className="flex flex-col gap-4 border-t border-[#2A2A2A]/60 pt-6">
              <span className="text-[10px] uppercase tracking-widest text-[#A8A8A8]/60 font-semibold block mb-1">
                Ecosystem Tools (Scroll / Drag to explore)
              </span>
              <div
                data-cursor="grab"
                className="w-full overflow-x-auto flex gap-3 pb-3 pt-1 scrollbar-none cursor-grab active:cursor-grabbing select-none"
                style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
                onMouseDown={(e) => {
                  const el = e.currentTarget;
                  el.setAttribute("data-cursor", "grabbing");
                  const cursorEvent = new CustomEvent("cursorchange", { detail: "grabbing" });
                  window.dispatchEvent(cursorEvent);
                }}
                onMouseUp={(e) => {
                  const el = e.currentTarget;
                  el.setAttribute("data-cursor", "grab");
                  const cursorEvent = new CustomEvent("cursorchange", { detail: "grab" });
                  window.dispatchEvent(cursorEvent);
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.setAttribute("data-cursor", "grab");
                  const cursorEvent = new CustomEvent("cursorchange", { detail: "grab" });
                  window.dispatchEvent(cursorEvent);
                }}
              >
                {["React", "Node.js", "Express", "MongoDB", "Java", "Spring Boot", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion", "Docker", "Git", "Oracle OCI", "AWS"].map((tech) => (
                  <div
                    key={tech}
                    className="flex-shrink-0 px-4 py-2 bg-[#161616] border border-[#2A2A2A]/50 rounded-full text-xs text-[#F8F8F8] font-mono tracking-wide"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Badges Grid */}
            <div className="flex flex-col gap-4 border-t border-[#2A2A2A]/60 pt-8">
              <span className="text-[10px] uppercase tracking-widest text-[#A8A8A8]/60 font-semibold block mb-2">Core Strengths</span>
              
              <div className="flex flex-col gap-4">
                {featuredTech.map((tech) => (
                  <div
                    key={tech.title}
                    className="flex flex-col border border-[#2A2A2A]/50 bg-[#161616]/30 rounded-xl p-5 select-none hover:border-[#DC2626]/60 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h4 className="text-sm font-semibold text-[#F8F8F8] font-sans">{tech.title}</h4>
                      <Badge variant="primary" className="text-[8px] tracking-wider py-0.5 px-2">
                        {tech.badgeText}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#A8A8A8] leading-relaxed">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Grouped category cards */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {skillCategories.map((cat) => (
              <Card
                key={cat.title}
                hoverGlow={true}
                borderAccentOnHover={true}
                translateOnHover={true}
                className="p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3 border-b border-[#2A2A2A]/50 pb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0F0F0F] border border-[#2A2A2A] flex items-center justify-center shrink-0">
                    {iconMap[cat.iconName] || <Sparkles className="w-5 h-5 text-[#DC2626]" />}
                  </div>
                  <h3 className="text-sm font-semibold text-[#F8F8F8] font-sans tracking-wide">{cat.title}</h3>
                </div>

                <p className="text-xs text-[#A8A8A8] leading-relaxed min-h-[48px]">{cat.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {cat.skills.map((skill) => (
                    <TechChip key={skill} label={skill} />
                  ))}
                </div>
              </Card>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
