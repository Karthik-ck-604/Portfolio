import React from "react";
import { motion } from "framer-motion";
import { Github, Star, GitBranch, Terminal, ExternalLink } from "lucide-react";
import { githubProfile } from "@/data/socials";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { staggerContainer, fadeUp } from "@/utils/motion";

export const GitHub: React.FC = () => {
  return (
    <section
      id="github"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#0F0F0F] border-b border-[#2A2A2A]/40 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#DC2626]/2 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Open Source"
          title="GitHub repositories & codebases"
          subtitle="Explore pinned repositories, open-source work, and project metrics on my profile."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-16 md:mt-24">
          
          {/* Left Column: Metrics & Summary */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4 text-[#A8A8A8] font-sans text-base sm:text-lg leading-relaxed">
              <p>{githubProfile.contributionSummary}</p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#2A2A2A]/60 pt-8 select-none">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#F8F8F8] tracking-tight">{githubProfile.totalRepos}</span>
                <span className="text-[10px] uppercase tracking-wider text-[#A8A8A8]/60 font-semibold mt-1">Total Repos</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#F8F8F8] tracking-tight">{githubProfile.featuredReposCount}</span>
                <span className="text-[10px] uppercase tracking-wider text-[#A8A8A8]/60 font-semibold mt-1">Featured</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#F8F8F8] tracking-tight">{githubProfile.technologiesCount}</span>
                <span className="text-[10px] uppercase tracking-wider text-[#A8A8A8]/60 font-semibold mt-1">Tech Used</span>
              </div>
            </div>

            {/* Profile CTA */}
            <div className="flex pt-4">
              <Button
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                icon={<Github className="w-5 h-5" />}
                iconPosition="left"
                ariaLabel="Visit my full GitHub profile"
                className="w-full sm:w-auto"
              >
                GitHub Profile
              </Button>
            </div>
          </div>

          {/* Right Column: Repository list */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {githubProfile.pinnedRepos.map((repo) => (
              <motion.div key={repo.name} variants={fadeUp}>
                <Card
                  hoverGlow={true}
                  borderAccentOnHover={true}
                  translateOnHover={true}
                  className="p-5 md:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    
                    {/* Repository title and language */}
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-[#DC2626]" />
                        <h4 className="text-sm font-semibold text-[#F8F8F8] font-sans tracking-wide">{repo.name}</h4>
                        <span className="text-[9px] border border-[#2A2A2A] rounded px-1.5 py-0.5 bg-[#0F0F0F] text-[#A8A8A8]/80 font-bold uppercase select-none">
                          Public
                        </span>
                      </div>
                      <p className="text-xs text-[#A8A8A8] mt-1.5 leading-relaxed text-left max-w-xl">
                        {repo.description}
                      </p>
                    </div>

                    {/* Language and stars summary */}
                    <div className="flex items-center gap-4 sm:shrink-0 text-xs text-[#A8A8A8] font-mono select-none">
                      {/* Language chip */}
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: repo.languageColor }}
                        />
                        <span>{repo.language}</span>
                      </div>
                      
                      {/* Stars */}
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>{repo.stars}</span>
                      </div>
                      
                      {/* Forks */}
                      <div className="flex items-center gap-1">
                        <GitBranch className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span>{repo.forks}</span>
                      </div>

                      {/* External Arrow link to repository code */}
                      {repo.url && (
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:text-[#DC2626] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#DC2626] rounded"
                          aria-label={`View code for ${repo.name} repository on GitHub`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {repo.installCommand && !repo.url && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(repo.installCommand!);
                          }}
                          className="p-1 hover:text-[#DC2626] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#DC2626] rounded"
                          aria-label={`Copy install command for ${repo.name}`}
                          title="Click to copy install command"
                        >
                          <Terminal className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
