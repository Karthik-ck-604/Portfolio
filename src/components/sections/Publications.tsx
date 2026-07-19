import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, User, Calendar, Award, ExternalLink, ArrowUpRight } from "lucide-react";
import { publications } from "@/data/publications";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { DocumentViewerModal } from "@/components/common/DocumentViewerModal";
import { staggerContainer, fadeUp } from "@/utils/motion";

export const Publications: React.FC = () => {
  const [selectedPub, setSelectedPub] = useState<{ token: string; title: string } | null>(null);

  // Map publication titles to mock tokens
  const getPubToken = (title: string) => {
    if (title.toLowerCase().includes("accident")) {
      return "mock-pub-accident";
    }
    return "mock-pub-seeker";
  };

  return (
    <section
      id="publications"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#0F0F0F] border-b border-[#2A2A2A]/40 overflow-hidden"
    >
      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Research"
          title="Research publications"
          subtitle="Peer-reviewed engineering papers published in industrial journals exploring IoT control automations and smartphone geolocation tools."
        />

        {/* Editorial Layout */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col gap-12 mt-16 md:mt-24"
        >
          {publications.map((pub) => {
            const isPrimary = pub.badge === "Primary Publication";
            
            return (
              <motion.div key={pub.title} variants={fadeUp}>
                <Card
                  hoverGlow={true}
                  borderAccentOnHover={true}
                  translateOnHover={false}
                  className="p-8 md:p-12 bg-[#161616]/65 border border-[#2A2A2A] rounded-[24px] relative"
                >
                  {/* Decorative glowing line for primary publication */}
                  {isPrimary && (
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#DC2626] rounded-l-[24px]" />
                  )}

                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between items-start">
                    
                    {/* Left details */}
                    <div className="flex-1 flex flex-col gap-4">
                      {/* Badge / Category Metadata */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant={isPrimary ? "primary" : "secondary"} className="tracking-widest uppercase text-[9px] py-1 px-3">
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

                      {/* Abstract Snippet */}
                      <p className="text-sm text-[#A8A8A8] leading-relaxed max-w-3xl">
                        {pub.summary}
                      </p>
                    </div>

                    {/* Right action controls */}
                    <div className="lg:shrink-0 flex sm:flex-row lg:flex-col gap-4 w-full lg:w-auto mt-4 lg:mt-0">
                      <Button
                        onClick={() => setSelectedPub({ token: getPubToken(pub.title), title: pub.title })}
                        variant="primary"
                        size="md"
                        icon={<BookOpen className="w-4 h-4" />}
                        ariaLabel={`Read abstract for ${pub.title}`}
                        className="flex-1 lg:w-48 text-center"
                      >
                        Read Publication
                      </Button>

                      {pub.doiLink && (
                        <Button
                          href={pub.doiLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="secondary"
                          size="md"
                          icon={<ArrowUpRight className="w-4 h-4" />}
                          ariaLabel={`Open external DOI link for ${pub.title}`}
                          className="flex-1 lg:w-48 text-center"
                        >
                          DOI Reference
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Scholarly Document Reader Modal */}
      {selectedPub && (
        <DocumentViewerModal
          isOpen={!!selectedPub}
          onClose={() => setSelectedPub(null)}
          fileUrl={selectedPub.token}
          title={selectedPub.title}
        />
      )}
    </section>
  );
};
