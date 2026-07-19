import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Cloud, ShieldAlert, Code2, Eye, Calendar, ArrowRight } from "lucide-react";
import { professionalCertifications } from "@/data/certifications";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { DocumentViewerModal } from "@/components/common/DocumentViewerModal";
import { staggerContainer, fadeUp } from "@/utils/motion";

const providerIconMap: Record<string, React.ReactNode> = {
  "Oracle Cloud Infrastructure": <Cloud className="w-6 h-6 text-[#DC2626]" />,
  "Amazon Web Services (Udacity)": <Cloud className="w-6 h-6 text-[#DC2626]" />,
  "IBM": <Award className="w-6 h-6 text-[#DC2626]" />,
  "NPTEL (IIT Kharagpur)": <Code2 className="w-6 h-6 text-[#DC2626]" />,
  "Snowflake": <Cloud className="w-6 h-6 text-[#DC2626]" />,
  "Deloitte (Forage)": <ShieldAlert className="w-6 h-6 text-[#DC2626]" />
};

export const ProfessionalCertifications: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<{ url: string; title: string } | null>(null);

  return (
    <section
      id="certifications"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#050505] overflow-hidden"
    >
      {/* Background soft ambient radial light */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#DC2626]/2 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Credentials"
          title="Professional certifications"
          subtitle="High-value industry-recognized credentials validating my expertise in AI models, Cloud engineering, and Security simulations."
        />

        {/* Premium Certifications Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 md:mt-24"
        >
          {professionalCertifications.map((cert, idx) => (
            <motion.div key={cert.name} variants={fadeUp}>
              <Card
                hoverGlow={true}
                borderAccentOnHover={true}
                translateOnHover={true}
                className="p-6 md:p-8 h-full flex flex-col justify-between border border-[#2A2A2A] bg-[#161616]/80 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] rounded-[20px]"
              >
                <div className="flex flex-col gap-6">
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#0F0F0F] border border-[#2A2A2A] flex items-center justify-center shrink-0">
                      {providerIconMap[cert.provider] || <Award className="w-6 h-6 text-[#DC2626]" />}
                    </div>
                    <Badge variant="primary" className="text-[8px] tracking-wider py-0.5 px-2">
                      Featured
                    </Badge>
                  </div>

                  {/* Title & Provider */}
                  <div>
                    <h3 className="text-base md:text-lg font-heading font-bold text-[#F8F8F8] leading-snug tracking-wide min-h-[52px]">
                      {cert.name}
                    </h3>
                    <span className="text-xs text-[#A8A8A8] mt-1.5 block">
                      {cert.provider}
                    </span>
                  </div>
                </div>

                {/* Footer Details & Action Button */}
                <div className="flex flex-col gap-5 border-t border-[#2A2A2A]/40 pt-5 mt-8">
                  <div className="flex items-center justify-between text-xs text-[#A8A8A8] font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span>Issue Date</span>
                    </div>
                    <span className="text-[#F8F8F8] font-semibold">{cert.year}</span>
                  </div>

                  <Button
                    onClick={() => setSelectedDoc({ url: cert.credentialUrl, title: cert.name })}
                    variant="secondary"
                    size="sm"
                    icon={<Eye className="w-4 h-4" />}
                    iconPosition="left"
                    ariaLabel={`Verify certification for ${cert.name}`}
                    className="w-full text-center group"
                  >
                    Preview Certificate
                  </Button>
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
