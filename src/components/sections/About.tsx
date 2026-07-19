import React from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Database, Layout, Sparkles, Zap, Eye, BookOpen, GraduationCap, Calendar, Award } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/common/Card";
import { easeOutQuint, fadeUp, staggerContainer } from "@/utils/motion";

export const About: React.FC = () => {
  const highlights = [
    {
      icon: <Code className="w-5 h-5 text-[#DC2626]" />,
      title: "Full Stack Development",
      description: "Building end-to-end applications using MERN, Node.js engines, and Java Spring dependency injections."
    },
    {
      icon: <Database className="w-5 h-5 text-[#DC2626]" />,
      title: "REST API Design",
      description: "Structuring clean, parameterized endpoints, secure token auth filters, and collection operations."
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#DC2626]" />,
      title: "Cloud & AI Integrations",
      description: "Interfacing prompt structures with local/cloud LLMs and orchestrating Oracle OCI environments."
    },
    {
      icon: <Layout className="w-5 h-5 text-[#DC2626]" />,
      title: "Clean UI Engineering",
      description: "Developing semantic, responsive user experiences with smooth, hardware-accelerated micro-interactions."
    }
  ];

  const values = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#DC2626]" />,
      title: "Simplicity",
      description: "Writing self-documenting code and designing clean, intuitive interfaces that reduce user fatigue."
    },
    {
      icon: <Zap className="w-5 h-5 text-[#DC2626]" />,
      title: "Performance",
      description: "Optimizing render frames, bundling lightweight modules, and maintaining fast database operations."
    },
    {
      icon: <Eye className="w-5 h-5 text-[#DC2626]" />,
      title: "Accessibility",
      description: "Adhering strictly to WCAG standards, keyboard navigation accessibility, and screen reader labels."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#DC2626]" />,
      title: "Continuous Learning",
      description: "Expanding knowledge through industry credentials, research publications, and experimental products."
    }
  ];

  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#0F0F0F] border-y border-[#2A2A2A]/40 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#DC2626]/2 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="About"
          title="Building software with curiosity, structure, and purpose"
          subtitle="A summary of my educational background, internship progression, and engineering focus."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start mb-16 sm:mb-24">
          
          {/* Left Column: Education details mockup */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: easeOutQuint }}
              className="relative group bg-[#161616]/90 border border-[#2A2A2A] rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_16px_32px_rgba(0,0,0,0.6)] hover:border-[#DC2626] transition-all duration-500 overflow-hidden select-none"
            >
              {/* Radial ambient glow on hover */}
              <div className="absolute inset-0 bg-radial from-[#DC2626]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-12 h-12 rounded-xl bg-[#DC2626]/10 flex items-center justify-center border border-[#DC2626]/20">
                  <GraduationCap className="w-6 h-6 text-[#DC2626]" />
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#A8A8A8]/60 font-semibold block mb-1">Academic Status</span>
                  <h3 className="text-xl font-heading font-bold text-[#F8F8F8] leading-tight">
                    {profile.education.degree}
                  </h3>
                </div>

                <div className="flex flex-col gap-4 border-t border-[#2A2A2A]/60 pt-4 font-sans text-sm text-[#A8A8A8]">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#DC2626]/80" />
                    <span>{profile.education.institution} &bull; {profile.education.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-[#DC2626]/80" />
                    <span className="font-semibold text-[#F8F8F8]">{profile.education.metric}</span>
                  </div>
                </div>

                <div className="border-t border-[#2A2A2A]/60 pt-4 mt-2">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#A8A8A8]/50 font-semibold mb-2">
                    <span>Specializations Focus</span>
                    <span className="text-[#DC2626]">IoT & Cyber</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-mono border border-[#2A2A2A] rounded bg-[#0F0F0F] text-[#A8A8A8]">IoT Architecture</span>
                    <span className="px-2.5 py-1 text-[10px] font-mono border border-[#2A2A2A] rounded bg-[#0F0F0F] text-[#A8A8A8]">Network Cryptography</span>
                    <span className="px-2.5 py-1 text-[10px] font-mono border border-[#2A2A2A] rounded bg-[#0F0F0F] text-[#A8A8A8]">Blockchain Contracts</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio paragraphs & highlights grid */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Biography Copy */}
            <div className="flex flex-col gap-6 text-[#A8A8A8] font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
              {profile.aboutParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Highlights Grid */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4"
            >
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex gap-3 sm:gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#161616] border border-[#2A2A2A] flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-semibold text-[#F8F8F8] font-sans mb-1">{item.title}</h4>
                    <p className="text-xs text-[#A8A8A8] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Core Values Sub-section */}
        <div className="border-t border-[#2A2A2A]/60 pt-12 sm:pt-16">
          <SectionHeading
            eyebrow="Philosophy"
            title="Core values guide my code"
            subtitle="The principles I follow to verify and ship software."
            align="center"
          />

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((val, idx) => (
              <Card
                key={idx}
                hoverGlow={true}
                borderAccentOnHover={true}
                translateOnHover={true}
                animateIn={true}
                delay={idx * 0.1}
                className="p-6 flex flex-col gap-4 text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0F0F0F] border border-[#2A2A2A] flex items-center justify-center shrink-0">
                  {val.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base font-semibold text-[#F8F8F8] font-sans mb-2">{val.title}</h3>
                  <p className="text-xs text-[#A8A8A8] leading-relaxed">{val.description}</p>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
