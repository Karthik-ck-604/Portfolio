import React from "react";
import { motion } from "framer-motion";
import { Mic, User } from "lucide-react";

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

  if (projectId === "car-ai-dashboard") {
    return (
      <div className={containerStyle}>
        <div className="absolute inset-0 bg-radial from-[#DC2626]/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          {/* Speed dial */}
          <div className="relative w-24 h-24 rounded-full border border-[#2A2A2A] flex flex-col items-center justify-center">
            <span className="text-2xl font-bold font-mono text-[#F8F8F8] tracking-tighter">120</span>
            <span className="text-[8px] uppercase tracking-wider text-[#A8A8A8]/60">KM/H</span>
            
            {/* Speed line indicator */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                className="stroke-[#DC2626] fill-none"
                strokeWidth="2.5"
                strokeDasharray="251"
                strokeDashoffset="120"
              />
            </svg>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 text-[8px] font-mono border border-[#DC2626]/40 rounded bg-[rgba(220,38,38,0.05)] text-[#DC2626] font-semibold animate-pulse">LIDAR ACTIVE</span>
            <span className="px-2 py-0.5 text-[8px] font-mono border border-[#2A2A2A] rounded bg-[#161616] text-[#A8A8A8]">AUTOPILOT</span>
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
              <span className="text-[#F8F8F8]">Karthikeyan C</span>
            </div>
            <span className="text-[#22C55E] font-semibold">92.5%</span>
          </div>
          <div className="flex items-center justify-between bg-[#161616]/80 p-2 rounded border border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#A8A8A8]/80" />
              <span>Adithya Sharma</span>
            </div>
            <span className="text-[#F59E0B]">87.2%</span>
          </div>
          <div className="flex items-center justify-between bg-[#161616]/80 p-2 rounded border border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#A8A8A8]/80" />
              <span>Priya Nair</span>
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
