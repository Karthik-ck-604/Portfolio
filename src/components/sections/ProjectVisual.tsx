import React from "react";
import { motion } from "framer-motion";
import {
  Terminal, Cpu, UtensilsCrossed, GitCommit, Mic,
  Layers, Zap, Search, Activity, Bot,
  MemoryStick, HardDrive, Wifi,
} from "lucide-react";

interface ProjectVisualProps {
  projectId: string;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ projectId }) => {
  const containerStyle =
    "relative w-full h-[240px] bg-[#0F0F0F] flex items-center justify-center overflow-hidden rounded-xl border border-[#2A2A2A]";

  /* ─────────────────────────────────────────────────────────────
     1. KOCHEN-MAINT  →  Recipe Card with radial ingredient chart
  ───────────────────────────────────────────────────────────── */
  if (projectId === "kochen-maint") {
    const ingredients = [
      { label: "Protein", pct: 35, color: "#F59E0B" },
      { label: "Veggies", pct: 28, color: "#22C55E" },
      { label: "Carbs",   pct: 22, color: "#818CF8" },
      { label: "Fat",     pct: 15, color: "#DC2626" },
    ];
    // SVG donut — r=28, circumference ≈ 175.9
    const R = 28;
    const C = 2 * Math.PI * R;
    let offset = 0;

    return (
      <div className={containerStyle}>
        <div className="absolute inset-0 bg-radial from-[#F59E0B]/8 to-transparent pointer-events-none" />
        <div className="relative z-10 w-full h-full flex flex-col px-5 py-4 gap-2">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
            <div className="flex items-center gap-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="text-[10px] font-mono text-[#F8F8F8] tracking-wider font-semibold">kochen-maint</span>
            </div>
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[8px] font-mono text-[#22C55E] border border-[#22C55E]/30 px-1.5 py-0.5 rounded-full"
            >
              ● Gemini live
            </motion.div>
          </div>

          {/* Body: donut chart + recipe card */}
          <div className="flex items-center gap-4 flex-1 min-h-0">
            {/* Donut */}
            <div className="relative shrink-0 flex items-center justify-center w-[76px] h-[76px]">
              <svg width="76" height="76" viewBox="0 0 76 76">
                {ingredients.map((seg, i) => {
                  const dashLen = (seg.pct / 100) * C;
                  const gap = C - dashLen;
                  const el = (
                    <motion.circle
                      key={i}
                      cx="38" cy="38" r={R}
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="10"
                      strokeDasharray={`${dashLen} ${gap}`}
                      strokeDashoffset={-(offset / 100) * C}
                      strokeLinecap="butt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15, duration: 0.5 }}
                    />
                  );
                  offset += seg.pct;
                  return el;
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[9px] font-mono text-[#F8F8F8] font-bold">480</span>
                <span className="text-[6px] font-mono text-[#A8A8A8]/60">kcal</span>
              </div>
            </div>

            {/* Legend + recipe name */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <p className="text-[10px] font-mono text-[#F8F8F8] font-semibold truncate">Chicken Palak</p>
              <p className="text-[8px] font-mono text-[#A8A8A8]/70 truncate">Low-carb · Dairy-free · 4/4 pantry ✓</p>
              <div className="flex flex-col gap-1 mt-1">
                {ingredients.map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-[7px] font-mono text-[#A8A8A8]/70 w-10">{s.label}</span>
                    <div className="flex-1 h-[3px] bg-[#2A2A2A] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.pct}%` }}
                        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                    </div>
                    <span className="text-[7px] font-mono shrink-0" style={{ color: s.color }}>{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer: grocery auto-list */}
          <div className="flex items-center justify-between bg-[#161616]/80 border border-[#2A2A2A] rounded-lg px-3 py-1.5">
            <div className="flex items-center gap-1.5">
              <Bot className="w-3 h-3 text-[#F59E0B]" />
              <span className="text-[8px] font-mono text-[#F59E0B]">Auto grocery list</span>
            </div>
            <div className="flex gap-1">
              {["Olive oil", "Cumin", "Cream"].map((item) => (
                <span key={item} className="text-[7px] font-mono bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] px-1 rounded">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     2. DEVSYNC-AI  →  Node / Flow pipeline diagram
  ───────────────────────────────────────────────────────────── */
  if (projectId === "devsync-ai") {
    const nodes = [
      { id: "gh", label: "GitHub", sub: "commits · tree", color: "#F8F8F8", icon: "⬡" },
      { id: "emb", label: "Embeddings", sub: "chunked · vector", color: "#818CF8", icon: "◈" },
      { id: "srch", label: "Sem. Search", sub: "NL query", color: "#22C55E", icon: "⊕" },
      { id: "summ", label: "Summary", sub: "action items", color: "#F59E0B", icon: "✦" },
    ];
    // Node centres sit at 12.5%, 37.5%, 62.5%, and 87.5% in the four-column grid.
    // Ending each connector 5.5% from a centre keeps a consistent clear gap around every icon.
    const edges = [
      { x1: "18%", x2: "32%", color: "#818CF8" },
      { x1: "43%", x2: "57%", color: "#22C55E" },
      { x1: "68%", x2: "82%", color: "#F59E0B" },
    ];

    return (
      <div className={containerStyle}>
        <div className="absolute inset-0 bg-radial from-[#818CF8]/8 to-transparent pointer-events-none" />
        <div className="relative z-10 w-full h-full flex flex-col px-5 py-4 gap-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
            <div className="flex items-center gap-1.5">
              <GitCommit className="w-3.5 h-3.5 text-[#818CF8]" />
              <span className="text-[10px] font-mono text-[#F8F8F8] tracking-wider font-semibold">DevSync-AI · Pipeline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[8px] font-mono text-[#22C55E]">live</span>
            </div>
          </div>

          {/* Flow diagram */}
          <div className="relative flex-1 min-h-[88px]">
            {/* SVG edges */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {edges.map((e, i) => (
                <motion.line
                  key={i}
                  x1={e.x1} y1="20px" x2={e.x2} y2="20px"
                  stroke={e.color}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
                />
              ))}
            </svg>

            {/* Nodes */}
            <div className="relative grid w-full grid-cols-4">
              {nodes.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  className="flex flex-col items-center gap-1 min-w-0"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border text-base"
                    style={{ borderColor: `${n.color}40`, background: `${n.color}12`, color: n.color }}
                  >
                    {n.icon}
                  </div>
                  <span className="text-[7px] font-mono font-bold text-center" style={{ color: n.color }}>{n.label}</span>
                  <span className="text-[6px] font-mono text-[#A8A8A8]/50 text-center leading-tight">{n.sub}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom: semantic search bar */}
          <div className="flex items-center gap-1.5 bg-[#161616] border border-[#818CF8]/30 rounded-lg px-2 py-1.5">
            <Search className="w-3 h-3 text-[#818CF8] shrink-0" />
            <span className="text-[8px] font-mono text-[#A8A8A8]/70 flex-1">where is auth middleware defined?</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-px h-3 bg-[#818CF8] shrink-0"
            />
            <span className="text-[7px] font-mono text-[#22C55E] shrink-0">3 results</span>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     3. MEET-IQ  →  Waveform + live transcription panel
  ───────────────────────────────────────────────────────────── */
  if (projectId === "meet-iq") {
    const speakers = [
      { name: "Sarah K.", color: "#DC2626", pct: 48 },
      { name: "Raj M.",   color: "#818CF8", pct: 34 },
      { name: "Alex T.",  color: "#F59E0B", pct: 18 },
    ];
    // 32 bars for the waveform
    const barHeights = [
      3,8,14,22,30,26,18,10,6,20,34,28,14,8,4,18,
      30,22,12,6,24,32,20,10,6,16,28,22,14,8,4,3,
    ];

    return (
      <div className={containerStyle}>
        <div className="absolute inset-0 bg-radial from-[#DC2626]/8 to-transparent pointer-events-none" />
        <div className="relative z-10 w-full h-full flex flex-col px-5 py-4 gap-2">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
            <div className="flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-[#DC2626]" />
              <span className="text-[10px] font-mono text-[#F8F8F8] font-semibold tracking-wider">Meet-IQ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"
              />
              <span className="text-[8px] font-mono text-[#DC2626]">REC 00:04:32</span>
            </div>
          </div>

          {/* Waveform */}
          <div className="flex items-end gap-[2px] h-9 px-1">
            {barHeights.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-full"
                style={{ backgroundColor: i % 3 === 0 ? "#DC2626" : i % 3 === 1 ? "#818CF8" : "#F59E0B", opacity: 0.7 }}
                animate={{ height: [`${h}px`, `${Math.min(h * 1.4, 36)}px`, `${h}px`] }}
                transition={{ duration: 0.6 + (i % 5) * 0.12, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
              />
            ))}
          </div>

          {/* Speaker breakdown */}
          <div className="flex gap-1.5 select-none">
            {speakers.map((s) => (
              <div key={s.name} className="flex-1 flex flex-col gap-0.5 bg-[#161616]/80 rounded px-1.5 py-1 border border-[#2A2A2A]">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-mono truncate" style={{ color: s.color }}>{s.name}</span>
                  <span className="text-[7px] font-mono" style={{ color: s.color }}>{s.pct}%</span>
                </div>
                <div className="w-full h-[3px] bg-[#2A2A2A] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Extracted actions */}
          <div className="flex flex-col gap-1 select-none mt-auto">
            <span className="text-[7px] font-mono text-[#A8A8A8]/50 uppercase tracking-widest">NLP · Extracted Actions</span>
            {[
              { priority: "P1", task: "QA pass before Friday release", owner: "Raj", color: "#DC2626" },
              { priority: "P2", task: "Update deployment checklist",    owner: "Sarah", color: "#F59E0B" },
            ].map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.15 }}
                className="flex items-center gap-1.5 bg-[#161616]/90 px-2 py-1 rounded border border-[#2A2A2A]"
              >
                <span className="text-[7px] font-mono px-1 rounded shrink-0" style={{ color: a.color, background: `${a.color}18`, border: `1px solid ${a.color}30` }}>{a.priority}</span>
                <span className="text-[8px] font-mono text-[#A8A8A8] truncate">{a.task}</span>
                <span className="ml-auto text-[7px] font-mono text-[#A8A8A8]/50 shrink-0">@{a.owner}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     4. BEN10-PORTFOLIO  →  Performance dashboard (FPS arc + CWV)
  ───────────────────────────────────────────────────────────── */
  if (projectId === "ben10-portfolio") {
    const cwv = [
      { label: "LCP",  value: "1.2s",  status: "Good",   color: "#22C55E" },
      { label: "CLS",  value: "0.04",  status: "Good",   color: "#22C55E" },
      { label: "INP",  value: "68ms",  status: "Good",   color: "#22C55E" },
    ];
    const assetChips = ["Three.js", "Framer", "SVG", "WebAudio"];
    // Arc gauge — 180° sweep for FPS 0–120 target 60
    const fps = 60;
    const R2 = 30;
    const startAngle = -180;
    const sweep = (fps / 120) * 180;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const arcPath = (angle: number) => {
      const x = 38 + R2 * Math.cos(toRad(angle));
      const y = 44 + R2 * Math.sin(toRad(angle));
      return `${x},${y}`;
    };
    const endAngle = startAngle + sweep;

    return (
      <div className={containerStyle}>
        <div className="absolute inset-0 bg-radial from-[#22C55E]/8 to-transparent pointer-events-none" />
        <div className="relative z-10 w-full h-full flex flex-col px-5 py-4 gap-2">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[10px] font-mono text-[#F8F8F8] font-semibold tracking-wider">Perf Monitor</span>
            </div>
            <span className="text-[8px] font-mono text-[#22C55E] border border-[#22C55E]/30 px-1.5 py-0.5 rounded-full">Ben10 Portfolio</span>
          </div>

          {/* Body: arc gauge + CWV metrics */}
          <div className="flex items-center gap-4 flex-1 min-h-0">
            {/* SVG arc gauge */}
            <div className="shrink-0 flex flex-col items-center">
              <svg width="76" height="52" viewBox="0 0 76 52">
                {/* Track */}
                <path
                  d={`M ${arcPath(startAngle)} A ${R2} ${R2} 0 0 1 ${arcPath(startAngle + 180)}`}
                  fill="none"
                  stroke="#2A2A2A"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Fill */}
                <motion.path
                  d={`M ${arcPath(startAngle)} A ${R2} ${R2} 0 ${sweep > 180 ? 1 : 0} 1 ${arcPath(endAngle)}`}
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                />
                <text x="38" y="44" textAnchor="middle" fontSize="10" fill="#F8F8F8" fontFamily="monospace" fontWeight="bold">60</text>
                <text x="38" y="52" textAnchor="middle" fontSize="6" fill="#A8A8A8" fontFamily="monospace">FPS</text>
              </svg>
              {/* Orbit ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 rounded-full border border-dashed border-[#22C55E]/40 flex items-center justify-center mt-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" style={{ position: "relative", top: "-6px" }} />
              </motion.div>
            </div>

            {/* CWV + asset chips */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <span className="text-[7px] font-mono text-[#A8A8A8]/50 uppercase tracking-widest">Core Web Vitals</span>
              {cwv.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                  className="flex items-center justify-between bg-[#161616]/70 border border-[#2A2A2A] rounded px-2 py-1"
                >
                  <span className="text-[8px] font-mono text-[#A8A8A8]">{m.label}</span>
                  <span className="text-[8px] font-mono font-bold" style={{ color: m.color }}>{m.value}</span>
                  <span className="text-[7px] font-mono px-1 rounded" style={{ color: m.color, background: `${m.color}18` }}>{m.status}</span>
                </motion.div>
              ))}
              <div className="flex gap-1 flex-wrap mt-1">
                {assetChips.map((c) => (
                  <span key={c} className="text-[6px] font-mono px-1.5 py-0.5 rounded bg-[#2A2A2A] text-[#A8A8A8]/70">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between select-none">
            <div className="flex items-center gap-1">
              <Activity className="w-2.5 h-2.5 text-[#A8A8A8]/50" />
              <span className="text-[7px] font-mono text-[#A8A8A8]/50">Three.js · physics cursor</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-[#22C55E]/70" />
              <span className="text-[7px] font-mono text-[#22C55E]/70">Sound FX active</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     5. SPIDY-AGENT  →  Full terminal session
  ───────────────────────────────────────────────────────────── */
  if (projectId === "spidy-agent") {
    const lines = [
      { type: "prompt", text: "$ spidy --news --locale=en-IN" },
      { type: "output", text: "› [AI] Tech: Google acquires Windsurf AI for $2.4B", color: "#A8A8A8" },
      { type: "prompt", text: "$ spidy --sys" },
      { type: "output", text: "  CPU  14%  ▓▓░░░░  RAM  62%  ▓▓▓▓▓░", color: "#F59E0B" },
      { type: "output", text: "  Disk 38%  ▓▓▓░░░  Net  88%  ▓▓▓▓▓▓▓▓", color: "#22C55E" },
      { type: "prompt", text: "$ spidy chat --lang=tanglish" },
      { type: "output", text: "› Vanakam da! Enna help venuma? 🙏", color: "#818CF8" },
      { type: "prompt", text: "$ spidy web --component=card" },
      { type: "output", text: "✓ Generated responsive card · card.html", color: "#22C55E" },
    ];
    const gauges = [
      { label: "CPU", value: 14, color: "#DC2626", icon: <Cpu className="w-2.5 h-2.5" /> },
      { label: "RAM", value: 62, color: "#F59E0B", icon: <MemoryStick className="w-2.5 h-2.5" /> },
      { label: "Disk", value: 38, color: "#818CF8", icon: <HardDrive className="w-2.5 h-2.5" /> },
      { label: "Net", value: 88, color: "#22C55E", icon: <Wifi className="w-2.5 h-2.5" /> },
    ];

    return (
      <div className={containerStyle}>
        <div className="absolute inset-0 bg-radial from-[#DC2626]/6 to-transparent pointer-events-none" />
        <div className="relative z-10 w-full h-full flex flex-col px-4 py-3 gap-0">
          {/* Terminal title bar */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#2A2A2A]">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#DC2626]" />
              <span className="text-[10px] font-mono text-[#F8F8F8] font-semibold tracking-wider">spidy-agent v2.1.0</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]/70" />
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]/70" />
              <span className="w-2 h-2 rounded-full bg-[#22C55E]/70" />
            </div>
          </div>

          {/* Terminal lines */}
          <div className="flex flex-col gap-[2px] flex-1 min-h-0 overflow-hidden">
            {lines.slice(0, 7).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.2 }}
                className="flex items-start gap-1"
              >
                {line.type === "prompt" ? (
                  <span className="text-[7.5px] font-mono text-[#DC2626] font-semibold whitespace-pre">{line.text}</span>
                ) : (
                  <span
                    className="text-[7.5px] font-mono whitespace-pre pl-1"
                    style={{ color: line.color ?? "#A8A8A8" }}
                  >
                    {line.text}
                  </span>
                )}
              </motion.div>
            ))}
            {/* Blinking cursor line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex items-center gap-0.5"
            >
              <span className="text-[7.5px] font-mono text-[#DC2626] font-semibold">$ </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[5px] h-[9px] bg-[#F8F8F8]"
              />
            </motion.div>
          </div>

          {/* Mini sys gauges */}
          <div className="grid grid-cols-4 gap-1 mt-2 pt-2 border-t border-[#2A2A2A]">
            {gauges.map((g) => (
              <div key={g.label} className="flex flex-col gap-0.5 bg-[#161616]/80 px-1.5 py-1 rounded border border-[#2A2A2A]">
                <div className="flex items-center gap-0.5" style={{ color: g.color }}>
                  {g.icon}
                  <span className="text-[6px] font-mono font-bold uppercase">{g.label}</span>
                </div>
                <div className="w-full h-[3px] bg-[#2A2A2A] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${g.value}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: g.color }}
                  />
                </div>
                <span className="text-[6px] font-mono" style={{ color: g.color }}>{g.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className={containerStyle}>
      <div className="absolute inset-0 bg-radial from-[#DC2626]/10 to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 w-28 sm:w-32 h-10 border border-[#2A2A2A] bg-[#161616] rounded-md px-3 justify-between">
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
