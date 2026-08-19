import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ShieldCheck, HelpCircle, Lightbulb, TrendingUp, Terminal, Check, AlertCircle } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/common/Card";
import { TechChip } from "@/components/common/TechChip";
import { Button } from "@/components/common/Button";
import { ProjectVisual } from "./ProjectVisual";
import { easeOutQuint } from "@/utils/motion";

interface ProjectCardProps {
  project: typeof projects[0];
  idx: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, idx }) => {
  const isEven = idx % 2 === 0;
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (copyStatus !== "idle") {
      const timer = setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copyStatus]);

  const handleCopyCmd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!project.installCommand) return;
    try {
      await navigator.clipboard.writeText(project.installCommand);
      setCopyStatus("copied");
      window.dispatchEvent(new CustomEvent("cursor-success", { detail: { duration: 900 } }));
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopyStatus("error");
    }
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutQuint } }
      }}
      // Sticky card stacking effect on desktop scroll
      className="lg:sticky lg:top-[100px] w-full mb-10 sm:mb-16 last:mb-0"
    >
      <Card
        hoverGlow={true}
        borderAccentOnHover={true}
        translateOnHover={false} // Disabled since sticky coordinates stack
        className="p-6 md:p-10 bg-[#161616]/95 shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
      >
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[540px] lg:min-h-[460px]`}>
          
          {/* Mock Visual representation of project */}
          <div className={`lg:col-span-6 w-full ${isEven ? "lg:order-2" : ""}`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: easeOutQuint }}
              className="w-full relative group cursor-pointer"
            >
              <ProjectVisual projectId={project.id} />
              
              {/* Overlay glow on hover */}
              <div className="absolute inset-0 border border-[#DC2626]/0 group-hover:border-[#DC2626]/40 rounded-xl transition-colors duration-500 pointer-events-none" />
            </motion.div>
          </div>

          {/* Details Content info */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-[10px] font-mono text-[#DC2626] uppercase font-bold tracking-widest">{project.category}</span>
              <span className="text-xs text-[#A8A8A8]/60">&bull;</span>
              <span className="text-xs text-[#A8A8A8] font-semibold">{project.year}</span>
              <span className="text-xs text-[#A8A8A8]/60">&bull;</span>
              <span className="px-2 py-0.5 text-[9px] border border-[#2A2A2A] rounded-full bg-[#0F0F0F] text-[#A8A8A8] font-bold uppercase">{project.status}</span>
            </div>

            <h3 className="text-2xl font-heading font-bold text-[#F8F8F8] mb-6 tracking-tight">{project.name}</h3>

            {/* Problem, Solution, Outcome blocks */}
            <div className="flex flex-col gap-3 font-sans text-xs text-[#A8A8A8] leading-relaxed mb-6 select-none">
              <div className="flex gap-2.5 items-start">
                <HelpCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <p><strong className="text-[#F8F8F8]">Problem:</strong> {project.problem}</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <Lightbulb className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                <p><strong className="text-[#F8F8F8]">Solution:</strong> {project.solution}</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <TrendingUp className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <p><strong className="text-[#F8F8F8]">Outcome:</strong> {project.outcome}</p>
              </div>
            </div>

            {/* Tech Chips — capped at 8 for consistent card height */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.slice(0, 8).map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </div>

            {/* Highlights bullets list — capped at 4 for consistent card height */}
            <div className="flex flex-col gap-2.5 mb-8 w-full border-t border-[#2A2A2A]/40 pt-5">
              <span className="text-[10px] uppercase tracking-widest text-[#A8A8A8]/60 font-semibold block mb-1">Technical Contributions</span>
              {project.highlights.slice(0, 4).map((bullet, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs text-[#A8A8A8] leading-relaxed select-none">
                  <ShieldCheck className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <p>{bullet}</p>
                </div>
              ))}
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full">
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                  icon={<Github className="w-4 h-4" />}
                  iconPosition="left"
                  ariaLabel={`View ${project.name} code on GitHub`}
                  className="w-full sm:w-auto"
                >
                  GitHub
                </Button>
              )}
              {project.installCommand && !project.githubUrl && (
                <div className="relative w-full sm:w-auto">
                  <Button
                    onClick={handleCopyCmd}
                    variant="secondary"
                    size="sm"
                    icon={
                      copyStatus === "copied" ? (
                        <Check className="w-4 h-4 text-[#22C55E]" />
                      ) : copyStatus === "error" ? (
                        <AlertCircle className="w-4 h-4 text-[#EF4444]" />
                      ) : (
                        <Terminal className="w-4 h-4" />
                      )
                    }
                    iconPosition="left"
                    ariaLabel={`Copy install command for ${project.name}`}
                    className="w-full sm:w-auto group"
                    title="Click to copy command"
                    data-cursor="pointer"
                  >
                    {copyStatus === "copied" ? "Copied!" : copyStatus === "error" ? "Failed to Copy" : "Copy Install Cmd"}
                  </Button>

                  {/* Tooltip */}
                  {copyStatus !== "idle" && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#161616] border border-[#2A2A2A] text-[10px] text-[#F8F8F8] px-2.5 py-1 rounded shadow-lg pointer-events-none select-none z-30 whitespace-nowrap animate-in fade-in zoom-in duration-200">
                      {copyStatus === "copied" ? "Copied to clipboard!" : "Error copying command"}
                    </div>
                  )}
                </div>
              )}
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                  iconPosition="right"
                  ariaLabel={`Launch ${project.name} live deployment`}
                  className="w-full sm:w-auto"
                >
                  Live Demo
                </Button>
              )}
              {project.pypiUrl && (
                <Button
                  href={project.pypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                  iconPosition="right"
                  ariaLabel={`View ${project.name} on PyPI`}
                  className="w-full sm:w-auto"
                >
                  PyPI
                </Button>
              )}
            </div>
          </div>

        </div>
      </Card>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#050505] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#DC2626]/2 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured engineering projects"
          subtitle="Selected full-stack and creative projects demonstrating database structure, prompt engineering, and UI design."
        />

        {/* Sticky Cards Deck Wrapper */}
        <div className="relative flex flex-col gap-8 sm:gap-12 w-full mt-12 sm:mt-16 md:mt-24">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>

        {/* Project Gallery CTA */}
        <div className="flex justify-center mt-14 sm:mt-20 border-t border-[#2A2A2A]/40 pt-12 sm:pt-16">
          <Card
            hoverGlow={true}
            borderAccentOnHover={true}
            translateOnHover={true}
            className="p-8 w-full max-w-[640px] flex flex-col sm:flex-row items-center justify-between gap-6 text-left"
          >
            <div className="flex flex-col">
              <h4 className="text-base font-semibold text-[#F8F8F8] font-sans mb-1">Want to see more repositories?</h4>
              <p className="text-xs text-[#A8A8A8] leading-relaxed">
                Check my Github coordinates directly to audit additional repositories, contributions, and open-source activities.
              </p>
            </div>
            <Button
              href="https://github.com/Karthik-ck-604" // Pointers to Github profile
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
              icon={<Github className="w-4 h-4" />}
              iconPosition="left"
              ariaLabel="Visit my full GitHub profile"
              className="shrink-0 w-full sm:w-auto"
            >
              GitHub Profile
            </Button>
          </Card>
        </div>

      </div>
    </section>
  );
};