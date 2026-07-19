import React from "react";
import { motion } from "framer-motion";
import { Mic, User, Terminal, Cpu } from "lucide-react";

interface ProjectVisualProps {
  projectId: string;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ projectId }) => {
  const containerStyle = "relative w-full h-full min-h-[220px] bg-[#0F0F0F] flex items-center justify-center overflow-hidden rounded-xl border border-[#2A2A2A]";

  if (projectId === "meet-iq") {
    return (
      <div className={containerStyle}>
        {/* Glowing backdrop spotlight */}
        <div className="absolute inset-0 bg-radial from-[#DC2626]/10 to-transparent pointer-events-none" />
        
        {/* Waveform graphic */}
        <div className="relative z-10 flex flex-col items-center gap-4 w-full px-6">
          <div className="flex items-center gap-2 px-3 py-1.5 border border-[#2A2A2A] rounded-full bg-[#161616] select-none">
            <Mic className="w-3.5 h-3.5 text-[#DC2626] animate-pulse" />
            <span className="text-[10px] font-mono text-[#F8F8F8] font-semibold uppercase tracking-wider">Audio Stream</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 w-full h-12">
            {[30, 60, 45, 80, 50, 95, 75, 40, 65, 85, 35, 55, 70, 45, 90, 60, 30].map((h, i) => (
              <motion.span
                key={i}
                animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
                transition={{
                  duration: 1.5 + (i % 3) * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1.5 bg-[#DC2626] rounded-full"
              />
            ))}
          </div>

          <div className="w-full bg-[#161616] border border-[#2A2A2A]/80 rounded-lg p-3 font-mono text-[9px] text-[#A8A8A8] text-left select-none">
            <span className="text-[#DC2626]">AI Summary:</span> Extracting active tasks and client targets.
          </div>
        </div>
      </div>
    );
  }

  if (projectId === "ben10-portfolio") {
    return (
      <div className={containerStyle}>
        <div className="absolute inset-0 bg-radial from-[#22C55E]/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* Custom omni circle dial */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="relative w-28 h-28 rounded-full border-2 border-dashed border-[#22C55E]/40 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full border border-[#22C55E]/60 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 border border-[#22C55E] flex items-center justify-center">
                <span className="text-[#22C55E] font-heading font-bold text-sm tracking-widest">10</span>
              </div>
            </div>
            {/* Tiny orbit nodes */}
            <span className="absolute top-0 w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]" />
            <span className="absolute bottom-0 w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]" />
          </motion.div>
          <span className="text-[10px] font-mono text-[#A8A8A8]/60 uppercase tracking-widest select-none">Interactive Omnitrix UI</span>
        </div>
      </div>
    );
  }

  if (projectId === "spidy-agent") {
    return (
      <div className={containerStyle}>
        <div className="absolute inset-0 bg-radial from-[#DC2626]/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col w-full px-5 py-4 gap-3 h-full justify-between">
          
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#DC2626]" />
              <span className="text-[10px] font-mono text-[#F8F8F8] tracking-wider font-semibold">spidy-agent@terminal</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]/60" />
            </div>
          </div>

          {/* Terminal Contents */}
          <div className="flex flex-col gap-2 font-mono text-[9px] text-[#A8A8A8] text-left select-none overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="text-[#DC2626] font-semibold">$</span>
              <span>pip install spidy-agent</span>
            </div>
            <div className="text-[8px] text-[#6A6A6A] -mt-1 pl-3">Installing dependencies... Successfully built spidy-agent</div>

            <div className="flex items-center gap-1 mt-1">
              <span className="text-[#DC2626] font-semibold">$</span>
              <span>spidy --status</span>
            </div>

            {/* Diagnostic stats container */}
            <div className="grid grid-cols-2 gap-2 bg-[#161616]/90 p-2 rounded-lg border border-[#2A2A2A] mt-1">
              <div className="flex items-center gap-1.5 border-r border-[#2A2A2A] pr-2">
                <Cpu className="w-3 h-3 text-[#DC2626]" />
                <div className="flex flex-col">
                  <span className="text-[7px] text-[#6A6A6A] uppercase font-bold">CPU Usage</span>
                  <span className="text-[#F8F8F8] font-bold">14.5%</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 pl-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[7px] text-[#6A6A6A] uppercase font-bold">Ollama / NIM</span>
                  <span className="text-[#22C55E] font-bold">ONLINE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Prompt input feedback */}
          <div className="flex items-center gap-1.5 font-mono text-[8px] text-left bg-[#161616] p-1.5 rounded border border-[#2A2A2A]/40 mt-1 select-none">
            <span className="text-[#22C55E]">Thanglish-NLP:</span>
            <span className="text-[#F8F8F8]">Vanakam friend</span>
          </div>

        </div>
      </div>
    );
  }

  if (projectId === "student-management") {
    return (
      <div className={containerStyle}>
        <div className="relative z-10 flex flex-col gap-3 w-full px-6 font-mono text-[9px] text-[#A8A8A8]">
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-2 text-[8px] text-[#A8A8A8]/60 font-semibold uppercase tracking-wider">
            <span>Roster Profile</span>
            <span>Grade metrics</span>
          </div>
          <div className="flex items-center justify-between bg-[#161616]/80 p-2 rounded border border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#DC2626]/80" />
              <span className="text-[#F8F8F8]">Karthik</span>
            </div>
            <span className="text-[#22C55E] font-semibold">92.5%</span>
          </div>
          <div className="flex items-center justify-between bg-[#161616]/80 p-2 rounded border border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#A8A8A8]/80" />
              <span>Padhmasri</span>
            </div>
            <span className="text-[#F59E0B]">87.2%</span>
          </div>
          <div className="flex items-center justify-between bg-[#161616]/80 p-2 rounded border border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#A8A8A8]/80" />
              <span>Abinaya</span>
            </div>
            <span className="text-[#22C55E] font-semibold">95.0%</span>
          </div>
        </div>
      </div>
    );
  }

  // Fallback / Portfolio Website
  return (
    <div className={containerStyle}>
      <div className="absolute inset-0 bg-radial from-[#DC2626]/10 to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 w-32 h-10 border border-[#2A2A2A] bg-[#161616] rounded-md px-3 justify-between">
          <span className="text-[10px] font-heading font-bold text-[#F8F8F8]">KC<span className="text-[#DC2626]">.</span></span>
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8A8A8]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8A8A8]/40" />
          </div>
        </div>
        <span className="text-[9px] font-mono text-[#A8A8A8]/60 uppercase tracking-widest select-none">100% Transparent Layout</span>
      </div>
    </div>
  );
};
