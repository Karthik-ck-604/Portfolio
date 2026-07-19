import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Eye } from "lucide-react";
import { additionalCertifications } from "@/data/certifications";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/common/Card";
import { DocumentViewerModal } from "@/components/common/DocumentViewerModal";
import { staggerContainer, fadeUp } from "@/utils/motion";

export const AdditionalCertifications: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<{ url: string; title: string } | null>(null);

  return (
    <section
      id="additional-certifications"
      className="relative py-20 md:py-24 px-6 md:px-12 lg:px-16 bg-[#050505] overflow-hidden"
    >
      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Courses & Learning"
          title="Additional certifications & technical learning"
          subtitle="Supporting certifications, university workshop participations, and programming assessment achievements."
        />

        {/* Compact Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-12"
        >
          {additionalCertifications.map((cert) => (
            <motion.div key={cert.name} variants={fadeUp}>
              <Card
                hoverGlow={true}
                borderAccentOnHover={true}
                translateOnHover={true}
                onClick={() => setSelectedDoc({ url: cert.credentialUrl, title: cert.name })}
                className="p-5 h-full flex flex-col justify-between bg-[#161616]/40 hover:bg-[#161616]/80 cursor-pointer border border-[#2A2A2A]/60"
                data-cursor="pointer"
              >
                <div className="flex flex-col gap-3">
                  {/* Category & Header */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#A8A8A8] select-none">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span>{cert.provider}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-xs sm:text-sm font-semibold text-[#F8F8F8] font-sans tracking-wide leading-snug line-clamp-2 min-h-[38px]">
                    {cert.name}
                  </h4>
                </div>

                {/* Footer issue year & quick preview indicator */}
                <div className="flex items-center justify-between border-t border-[#2A2A2A]/40 pt-3 mt-4 text-[10px] text-[#A8A8A8]/80 font-mono select-none">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#DC2626]/80" />
                    <span>{cert.year}</span>
                  </div>
                  
                  <span className="flex items-center gap-1 text-[#DC2626] font-semibold hover:text-[#EF4444] transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
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
