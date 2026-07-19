import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, CheckCircle2, FileText } from "lucide-react";
import { experiences } from "@/data/experience";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { easeOutQuint } from "@/utils/motion";
import { DocumentViewerModal } from "@/components/common/DocumentViewerModal";

interface ExperienceCardProps {
  exp: typeof experiences[0];
  idx: number;
  onViewCertificate: (url: string, title: string) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, idx, onViewCertificate }) => {
  const isEven = idx % 2 === 0;

  // Slide left or right based on index
  const cardVariants = {
    initial: { opacity: 0, x: isEven ? -50 : 50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: easeOutQuint }
    }
  };

  return (
    <div className={`relative flex flex-col md:flex-row w-full mb-12 last:mb-0 ${isEven ? "md:justify-start" : "md:justify-end"}`}>
      
      {/* Connector Node / Dot */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-4 w-4 h-4 rounded-full bg-[#050505] border-[3px] border-[#DC2626] z-10 shadow-[0_0_12px_rgba(220,38,38,0.5)]" />

      {/* Actual Card container wrapper */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardVariants}
        className={`w-full md:w-[46%] pl-10 sm:pl-12 md:pl-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}
      >
        <Card
          hoverGlow={true}
          borderAccentOnHover={true}
          translateOnHover={true}
          className="p-6 md:p-8 bg-[#161616]/80 hover:bg-[#161616]/95 border border-[#2A2A2A]"
        >
          {/* Header role & date details */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#2A2A2A]/40 pb-4 mb-4 select-none">
            <div>
              <span className="text-[#DC2626] text-xs font-mono tracking-widest uppercase block font-semibold">
                {exp.company}
              </span>
              <h3 className="text-lg md:text-xl font-heading font-bold text-[#F8F8F8] tracking-wide mt-1">
                {exp.role}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#A8A8A8] font-mono shrink-0">
              <Calendar className="w-3.5 h-3.5" />
              <span>{exp.duration}</span>
            </div>
          </div>

          {/* Description summary */}
          <p className="text-sm text-[#A8A8A8] leading-relaxed mb-6">
            {exp.summary}
          </p>

          {/* Core accomplishment checkmarks */}
          <ul className="flex flex-col gap-3 mb-6">
            {exp.achievements.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5 text-xs text-[#E8E8E8] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Technologies used chips */}
          <div className="flex flex-wrap gap-2 mb-6 border-t border-[#2A2A2A]/20 pt-4">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono tracking-wider font-semibold text-[#DC2626] bg-[#050505] border border-[#DC2626]/20 py-1 px-3.5 rounded-full select-none"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Verification Link button */}
          {exp.certificateUrl && (
            <div className="flex pt-2">
              <Button
                onClick={() => onViewCertificate(exp.certificateUrl, `${exp.role} - ${exp.company}`)}
                variant="secondary"
                size="sm"
                icon={<FileText className="w-3.5 h-3.5" />}
                iconPosition="left"
                ariaLabel={`View certificate for my role at ${exp.company}`}
              >
                Verification Certificate
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export const Experience: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<{ url: string; title: string } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track viewport scroll of experience section to grow timeline connection line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section
      id="experience"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#050505] overflow-hidden"
    >
      {/* Background soft ambient radial light */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#DC2626]/2 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Credentials"
          title="Practical industry exposure"
          subtitle="Timeline of my professional growth, technical duties, and internship contributions."
        />

        {/* Timeline wrapper */}
        <div ref={containerRef} className="relative w-full mt-16 md:mt-24">
          
          {/* Scroll-Linked Connection line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-8 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-[#DC2626] origin-top z-0"
          />

          {/* Static gray backing guide line */}
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-[#2A2A2A]/40 z-0" />

          {/* Timeline Cards Container */}
          <div className="relative flex flex-col w-full">
            {experiences.map((exp, idx) => (
              <ExperienceCard
                key={exp.company}
                exp={exp}
                idx={idx}
                onViewCertificate={(url, title) => setSelectedDoc({ url, title })}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Accessible Document Viewer Modal */}
      {selectedDoc && (
        <DocumentViewerModal
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          fileUrl={selectedDoc.url}
          title={selectedDoc.title}
        />
      )}
    </section>
  );
};
