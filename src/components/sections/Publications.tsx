import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, User, Calendar, Award } from "lucide-react";
import { publications } from "@/data/publications";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { DocumentViewerModal } from "@/components/common/DocumentViewerModal";
import { staggerContainer, fadeUp } from "@/utils/motion";

// Import publication certificates as static assets
import certYMER from "@/cert_YMER .jpg";
import certIEJ from "@/cert_Industrial Engineering Journal .png";

// Map each publication to its certificate image
const pubCertMap: Record<string, { img: string; label: string }> = {
  "Locating Smartphones Using Seeker Tool": {
    img: certYMER,
    label: "YMER Certificate of Publication",
  },
  "Design Thinking Based Accident Prevention System Using Eye Blink Sensor": {
    img: certIEJ,
    label: "Industrial Engineering Journal Certificate",
  },
};

// ── Main Publications Section ────────────────────────────────────────────────
export const Publications: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<{ url: string; title: string } | null>(null);

  return (
    <section
      id="publications"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#0F0F0F] border-b border-[#2A2A2A]/40 overflow-hidden"
    >
      <div className="relative w-full max-w-7xl mx-auto z-10">

        {/* Section Header */}
        <SectionHeading
          eyebrow="Research"
          title="Research publications"
          subtitle="Peer-reviewed engineering papers published in industrial journals exploring IoT control automations and smartphone geolocation tools."
        />

        {/* Publication Cards */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col gap-8 sm:gap-10 md:gap-12 mt-12 sm:mt-16 md:mt-24"
        >
          {publications.map((pub) => {
            const isPrimary = pub.badge === "Primary Publication";
            const cert = pubCertMap[pub.title];

            return (
              <motion.div key={pub.title} variants={fadeUp}>
                <Card
                  hoverGlow={true}
                  borderAccentOnHover={true}
                  translateOnHover={false}
                  className="p-6 sm:p-8 md:p-12 bg-[#161616]/65 border border-[#2A2A2A] rounded-[24px] relative"
                >
                  {/* Red accent bar for primary publication */}
                  {isPrimary && (
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#DC2626] rounded-l-[24px]" />
                  )}

                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between items-start">

                    {/* ── Left: Metadata ── */}
                    <div className="flex-1 flex flex-col gap-4">
                      {/* Badge + Domain */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge
                          variant={isPrimary ? "primary" : "secondary"}
                          className="tracking-widest uppercase text-[9px] py-1 px-3"
                        >
                          {pub.badge}
                        </Badge>
                        <span className="text-[10px] font-mono text-[#A8A8A8] bg-[#050505] px-3 py-1 rounded-full border border-[#2A2A2A]/40">
                          {pub.domain}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-[#F8F8F8] tracking-wide leading-tight mt-2 hover:text-[#DC2626] transition-colors duration-300">
                        "{pub.title}"
                      </h3>

                      {/* Editorial Metadata Block */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-[#2A2A2A]/30 py-4 my-2 text-xs text-[#A8A8A8] font-sans">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-[#DC2626]" />
                          <div>
                            <p className="text-[10px] text-gray-500 font-mono uppercase">Journal</p>
                            <span className="text-[#F8F8F8] font-semibold">{pub.journal}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#DC2626]" />
                          <div>
                            <p className="text-[10px] text-gray-500 font-mono uppercase">Author</p>
                            <span className="text-[#F8F8F8] font-semibold">{pub.authors}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#DC2626]" />
                          <div>
                            <p className="text-[10px] text-gray-500 font-mono uppercase">Published</p>
                            <span className="text-[#F8F8F8] font-semibold">{pub.year}</span>
                          </div>
                        </div>
                      </div>

                      {/* Abstract */}
                      <p className="text-sm text-[#A8A8A8] leading-relaxed max-w-3xl">
                        {pub.summary}
                      </p>
                    </div>

                    {/* ── Right: Certificate Thumbnail ── */}
                    {cert && (
                      <div className="lg:shrink-0 w-full sm:w-44 lg:w-52 mt-4 lg:mt-0">
                        <p className="text-[9px] font-mono text-[#4A4A4A] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Award className="w-3 h-3 text-[#DC2626]" />
                          Certificate of Publication
                        </p>
                        <button
                          onClick={() => setSelectedDoc({ url: cert.img, title: cert.label })}
                          aria-label={`View ${cert.label}`}
                          data-cursor="pointer"
                          className="group relative w-full overflow-hidden rounded-xl border border-[#2A2A2A] hover:border-[#DC2626]/60 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                        >
                          <img
                            src={cert.img}
                            alt={cert.label}
                            className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#DC2626] text-white text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full">
                              View Certificate
                            </div>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Shared document viewer */}
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
