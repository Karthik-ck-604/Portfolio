import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import logoImg from "@/logo.png";

// ─────────────────────────────────────────────────────────────────────────────
// Web Audio Synthesizer — fully synthesized, zero external assets
// Strategy: Create AudioContext immediately. Use ctx.onstatechange to detect
// when it becomes "running" (either via autoplay permission OR user gesture).
// Call ctx.resume() both on mount and on every user interaction to cover all cases.
// ─────────────────────────────────────────────────────────────────────────────
class CinematicSynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private humInterval: ReturnType<typeof setInterval> | null = null;
  private humStarted = false;
  private destroyed = false;

  constructor() {
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AC();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // onstatechange fires automatically when ctx transitions to "running".
      // This covers BOTH autoplay-allowed AND user-gesture scenarios —
      // we don't need to guess; the browser tells us exactly when audio is ready.
      this.ctx.onstatechange = () => {
        if (this.ctx?.state === "running" && !this.humStarted && !this.destroyed) {
          this.humStarted = true;
          this.fadeInAndStartHum();
        }
      };

      // Attempt immediate resume — resolves instantly if browser allows autoplay,
      // stays pending (but harmlessly) if blocked until a user gesture fires.
      this.ctx.resume().catch(() => {});
    } catch (e) {
      console.warn("Web Audio API not supported.", e);
    }
  }

  // Call this from ANY user gesture handler (click, keydown, touch).
  // Safe to call multiple times — idempotent.
  public resume() {
    if (this.destroyed || !this.ctx) return;
    // ctx.resume() called inside a user-gesture handler is GUARANTEED
    // to resolve and switch state to "running", which fires onstatechange.
    this.ctx.resume().catch(() => {});
  }

  private fadeInAndStartHum() {
    if (!this.ctx || !this.masterGain || this.destroyed) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(0.4, now + 0.6);
    this.startHumLoop();
  }

  private isReady(): boolean {
    return !!(this.ctx?.state === "running" && this.masterGain && this.humStarted && !this.destroyed);
  }

  // Ambient hum: overlapping 800ms drone chunks fired every 750ms via setInterval
  // so the loop continues smoothly without holding persistent oscillator nodes.
  private startHumLoop() {
    const playChunk = () => {
      if (!this.isReady() || !this.ctx || !this.masterGain) return;
      try {
        const dur = 0.8;
        const now = this.ctx.currentTime;

        const osc1 = this.ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(60, now);
        osc1.frequency.linearRampToValueAtTime(58, now + dur);

        const osc2 = this.ctx.createOscillator();
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(120, now);
        osc2.frequency.linearRampToValueAtTime(122, now + dur);

        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.09, now + 0.06);
        g.gain.setValueAtTime(0.09, now + dur - 0.06);
        g.gain.linearRampToValueAtTime(0, now + dur);

        const lpf = this.ctx.createBiquadFilter();
        lpf.type = "lowpass";
        lpf.frequency.setValueAtTime(200, now);

        osc1.connect(lpf); osc2.connect(lpf); lpf.connect(g); g.connect(this.masterGain);
        osc1.start(now); osc2.start(now);
        osc1.stop(now + dur); osc2.stop(now + dur);
      } catch (_) {}
    };

    playChunk();
    this.humInterval = setInterval(() => {
      if (this.destroyed) { clearInterval(this.humInterval!); return; }
      playChunk();
    }, 750);
  }

  // Terminal keyboard click — short percussive transient
  public playTick() {
    if (!this.isReady() || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = "square";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.035);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.08, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      const hpf = this.ctx.createBiquadFilter();
      hpf.type = "highpass";
      hpf.frequency.setValueAtTime(400, now);
      osc.connect(hpf); hpf.connect(g); g.connect(this.masterGain);
      osc.start(now); osc.stop(now + 0.045);
    } catch (_) {}
  }

  // Data sweep tone — upward sawtooth glide on milestone events
  public playSweep() {
    if (!this.isReady() || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);
      const sub = this.ctx.createOscillator();
      sub.type = "sine";
      sub.frequency.setValueAtTime(70, now);
      sub.frequency.exponentialRampToValueAtTime(300, now + 0.35);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.07, now + 0.04);
      g.gain.linearRampToValueAtTime(0.04, now + 0.2);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
      const bpf = this.ctx.createBiquadFilter();
      bpf.type = "bandpass";
      bpf.frequency.setValueAtTime(800, now);
      bpf.Q.setValueAtTime(1.5, now);
      osc.connect(bpf); sub.connect(g); bpf.connect(g); g.connect(this.masterGain);
      osc.start(now); sub.start(now);
      osc.stop(now + 0.4); sub.stop(now + 0.4);
    } catch (_) {}
  }

  // Success chime — C major arpeggio with vibrato
  public playChime() {
    if (!this.isReady() || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      [261.63, 329.63, 392.0, 493.88, 523.25].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        const lfo = this.ctx!.createOscillator();
        lfo.frequency.setValueAtTime(5, now);
        const lfoG = this.ctx!.createGain();
        lfoG.gain.setValueAtTime(2, now);
        lfo.connect(lfoG); lfoG.connect(osc.frequency);
        const g = this.ctx!.createGain();
        g.gain.setValueAtTime(0, now + i * 0.09);
        g.gain.linearRampToValueAtTime(0.14, now + i * 0.09 + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 1.6);
        osc.connect(g); g.connect(this.masterGain!);
        lfo.start(now + i * 0.09); osc.start(now + i * 0.09);
        lfo.stop(now + i * 0.09 + 1.7); osc.stop(now + i * 0.09 + 1.7);
      });
    } catch (_) {}
  }

  public stop() {
    this.destroyed = true;
    if (this.humInterval) clearInterval(this.humInterval);
    try { this.ctx?.close(); } catch (_) {}
  }
}



// React component to generate decryption effect on text updates
const DecryptedText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_@$%&*?#+-";

  useEffect(() => {
    let currentIteration = 0;
    const targetText = text;
    let interval: ReturnType<typeof setInterval>;

    interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < currentIteration) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (currentIteration >= targetText.length) {
        clearInterval(interval);
      }

      currentIteration += 1 / 2.5; // Decryption speed factor
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

interface DiagnosticLog {
  percentage: number;
  text: string;
  type: "info" | "success" | "warn";
}

const diagnosticLogSequence: DiagnosticLog[] = [
  { percentage: 0, text: "[SYS] Booting Portfolio Analytics Engine...", type: "info" },
  { percentage: 4, text: "[SYS] Allocating virtual viewport render-buffer...", type: "info" },
  { percentage: 8, text: "[SYS] System parameters validated. Canvas WebGL context: OK", type: "success" },
  { percentage: 12, text: "[IO] Accessing core profile database schema...", type: "info" },
  { percentage: 16, text: "[DATA] Record retrieved: 'Karthikeyan C' // Full Stack Developer", type: "success" },
  { percentage: 20, text: "[DATA] CGPA credentials resolved: 7.2 / 10.0 (SNS College of Engineering)", type: "success" },
  { percentage: 24, text: "[DATA] Graduation timeline set: Class of 2026", type: "info" },
  { percentage: 28, text: "[TRANS] Analyzing industry experience and internship logs...", type: "info" },
  { percentage: 32, text: "[DATA] Verified 4 professional internships successfully indexed", type: "success" },
  { percentage: 36, text: "[DATA] Processing roles: Web Developer, Full Stack Intern...", type: "info" },
  { percentage: 42, text: "[TRANS] Loading core academic skills metrics database...", type: "info" },
  { percentage: 46, text: "[SKILLS] Frontend Matrix: HTML5, CSS3, JS, React v19... CACHED", type: "success" },
  { percentage: 50, text: "[SKILLS] Backend Matrix: Node.js, Express, Java Spring Boot... CACHED", type: "success" },
  { percentage: 54, text: "[SKILLS] DB Matrix: MongoDB, SQL, PostgreSQL, Firebase... CACHED", type: "success" },
  { percentage: 60, text: "[SKILLS] AI & Cloud Matrix: Generative AI, Prompt Eng, AWS... CACHED", type: "success" },
  { percentage: 65, text: "[IO] Pulling certifications registry ledger...", type: "info" },
  { percentage: 70, text: "[CERT] Indexed 15+ credentials (Oracle, Udacity, Deloitte, etc.)", type: "success" },
  { percentage: 75, text: "[IO] Pulling research publications repository...", type: "info" },
  { percentage: 80, text: "[PUB] Loaded 3 research journal publications", type: "success" },
  { percentage: 84, text: "[DATA] Preloading metadata for 10+ engineering projects...", type: "info" },
  { percentage: 88, text: "[SYS] Compiling final presentation layout tree...", type: "info" },
  { percentage: 92, text: "[SYS] Optimizing asset rendering pipelines (Fetch Priority: High)", type: "info" },
  { percentage: 96, text: "[SYS] Viewport bounds synchronized. Portals loaded.", type: "success" },
  { percentage: 100, text: "[SYS] Analysis complete. Mounting portfolio interface...", type: "success" },
];

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [activeStageText, setActiveStageText] = useState("Initializing Engine");
  const [logs, setLogs] = useState<string[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);
  const [audioHintVisible, setAudioHintVisible] = useState(true);

  const prefersReducedMotion = useReducedMotion();
  const synthRef = useRef<CinematicSynth | null>(null);
  const progressRef = useRef(0);
  const lastLoggedRef = useRef<number>(-1);
  const logsContainerRef = useRef<HTMLDivElement | null>(null);
  const lastTickTimeRef = useRef<number>(0);
  const audioUnlockedRef = useRef(false);

  // Create synth on mount. The CinematicSynth:
  // (1) Creates AudioContext (starts suspended per browser autoplay policy)
  // (2) Sets ctx.onstatechange — fires automatically when ctx becomes "running"
  // (3) Attempts ctx.resume() immediately (works if browser allows autoplay)
  //
  // User gesture path: any click/touch/key on or off the loading screen
  // calls handleDocGesture → synth.resume() → ctx unlocks → onstatechange fires
  useEffect(() => {
    synthRef.current = new CinematicSynth();

    // Catch EVERY possible first gesture — capture phase runs before any child
    // can stopPropagation, ensuring we always get it even on busy UIs.
    const handleDocGesture = () => {
      synthRef.current?.resume();
      // Also update hint state
      if (!audioUnlockedRef.current) {
        audioUnlockedRef.current = true;
        setAudioHintVisible(false);
      }
    };

    document.addEventListener("click",       handleDocGesture, { capture: true });
    document.addEventListener("pointerdown", handleDocGesture, { capture: true });
    document.addEventListener("keydown",     handleDocGesture, { capture: true });
    document.addEventListener("touchstart",  handleDocGesture, { capture: true, passive: true });

    return () => {
      synthRef.current?.stop();
      document.removeEventListener("click",       handleDocGesture, { capture: true });
      document.removeEventListener("pointerdown", handleDocGesture, { capture: true });
      document.removeEventListener("keydown",     handleDocGesture, { capture: true });
      document.removeEventListener("touchstart",  handleDocGesture, { capture: true });
    };
  }, []);


  // Called when user clicks anywhere on the preloader — THIS is the user gesture
  // that satisfies Chrome's autoplay policy and unlocks AudioContext.
  const handleInteraction = () => {
    if (!audioUnlockedRef.current) {
      audioUnlockedRef.current = true;
      setAudioHintVisible(false);
    }
    // Always call resume — idempotent if already running
    synthRef.current?.resume();
  };

  // Determine stage text by progress
  const getStageTitle = (prog: number) => {
    if (prog >= 95) return "DEPLOYING PORTFOLIO SYSTEM";
    if (prog >= 80) return "OPTIMIZING PRESENTATION LAYOUT";
    if (prog >= 65) return "VERIFYING SCHOLASTIC CREDENTIALS";
    if (prog >= 40) return "PARSING TECHNICAL CAPABILITIES";
    if (prog >= 20) return "RETRIEVING PROFESSIONAL LOGS";
    return "INITIALIZING KNOWLEDGE MATRIX";
  };

  useEffect(() => {
    let frameId: number;
    const duration = 4000; // Smooth cinematic load time: ~4s
    const completionPause = 0;
    const startTime = performance.now();

    const runProgressLoop = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const computedProgress = Math.min((elapsed / duration) * 100, 100);
      const roundedProgress = Math.floor(computedProgress);

      if (roundedProgress > progressRef.current) {
        // Throttled ticks on progress increments — at most one click per 80ms
        const now = performance.now();
        if (synthRef.current && now - lastTickTimeRef.current > 80) {
          synthRef.current.playTick();
          lastTickTimeRef.current = now;
        }
        
        progressRef.current = roundedProgress;
        setProgress(roundedProgress);
        setActiveStageText(getStageTitle(roundedProgress));

        // Evaluate logs queue for matching progress markers
        diagnosticLogSequence.forEach((log) => {
          if (roundedProgress >= log.percentage && log.percentage > lastLoggedRef.current) {
            let iconText = "ℹ";
            if (log.type === "success") iconText = "✔";
            if (log.type === "warn") iconText = "⚠";

            const formattedTime = new Date().toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }) + `.${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;

            const fullLogLine = `[${formattedTime}] ${iconText} ${log.text}`;
            setLogs((prev) => [...prev, fullLogLine]);
            
            // Sweep sound on milestones (e.g. increments of 20% / 30%)
            if (log.percentage % 20 === 0 && log.percentage > 0 && log.percentage < 100) {
              if (synthRef.current) synthRef.current.playSweep();
            }

            lastLoggedRef.current = log.percentage;
          }
        });
      }

      if (computedProgress < 100) {
        frameId = requestAnimationFrame(runProgressLoop);
      } else {
        // Core cinematic complete state
        if (synthRef.current) {
          synthRef.current.playChime();
        }
        setIsFinishing(true);
        setTimeout(() => {
          onComplete();
        }, completionPause);
      }
    };

    frameId = requestAnimationFrame(runProgressLoop);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [onComplete]);

  // Keep console log scrolled to the bottom
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 bg-[#050505] z-[9999] flex flex-col items-center justify-center p-4 select-none overflow-hidden cursor-pointer"
      role="progressbar"
      aria-label="Analyzing Portfolio"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-busy={!isFinishing}
      onClick={handleInteraction}
    >
      {/* 1. Cinematic Ambient Background Layout */}
      {/* Sci-Fi Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Vignette Shadow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)] opacity-95 z-0 pointer-events-none" />

      {/* Audio unlock hint — stays visible until user clicks anywhere */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: audioHintVisible ? 1 : 0, y: audioHintVisible ? 0 : 8 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <motion.div
          animate={{ borderColor: ["rgba(220,38,38,0.15)", "rgba(220,38,38,0.45)", "rgba(220,38,38,0.15)"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#0A0A0A]/90 backdrop-blur-sm"
        >
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] text-[#DC2626]"
          >♪</motion.span>
          <span className="text-[9px] font-mono tracking-[0.18em] text-[#707070] uppercase">
            Tap anywhere · activate audio
          </span>
        </motion.div>
      </motion.div>


      {/* Atmospheric Crimson Haze Drift */}
      <motion.div
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.2, 0.35, 0.18, 0.2],
          x: [-20, 30, -10, -20],
          y: [20, -20, 30, 20],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[450px] md:w-[650px] h-[450px] md:h-[650px] rounded-full bg-[#DC2626]/4 blur-[110px] md:blur-[150px] z-0 pointer-events-none"
        style={{ top: "30%", left: "25%", transform: "translate(-50%, -50%)" }}
      />

      {/* Film Grain */}
      <div 
        className="absolute inset-0 z-1 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Crimson Horizontal Laser Scanning Beam */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{
            y: ["-5vh", "105vh"],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DC2626]/40 to-transparent z-10 pointer-events-none"
          style={{
            boxShadow: "0 0 8px rgba(220, 38, 38, 0.25), 0 0 16px rgba(220, 38, 38, 0.12)",
          }}
        />
      )}

      {/* 2. Top Header HUD Bar (Absolutely Positioned to prevent layout shifts) */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-25 border-b border-[#2A2A2A]/40 pb-2 sm:pb-3 select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#A8A8A8] uppercase">
            SECURE ANALYTICS TERMINAL // v4.26
          </span>
        </div>

        {/* Session timestamp badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 border border-[#2A2A2A] rounded-md bg-[#0F0F0F]/60 text-[#4A4A4A] select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[8px] font-mono tracking-widest uppercase text-[#A8A8A8]">SESSION LIVE</span>
        </div>
      </div>

      {/* 3. Centered Content Container */}
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 max-w-3xl w-full z-20">
        
        {/* Spinner Area */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 flex items-center justify-center">
          {/* Outer circle with ticks */}
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-[#2A2A2A] opacity-45"
          />

          {/* Glowing rotating bracket circle */}
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute inset-1.5 rounded-full border border-double border-t-[#DC2626]/40 border-b-[#DC2626]/40 border-l-transparent border-r-transparent"
          />

          {/* Inner ring */}
          <div className="absolute inset-5 rounded-full border border-[#2A2A2A]/40" />

          {/* Central Logo with breathing animation */}
          <motion.div
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.03, 1],
              filter: [
                "drop-shadow(0 0 8px rgba(220, 38, 38, 0.15))",
                "drop-shadow(0 0 18px rgba(220, 38, 38, 0.35))",
                "drop-shadow(0 0 8px rgba(220, 38, 38, 0.15))",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#0A0A0A] border border-[#2A2A2A] flex items-center justify-center p-3 shadow-inner"
          >
            <img
              src={logoImg}
              alt="KC Monogram"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain filter brightness-[1.1]"
            />
          </motion.div>

          {/* Absolute Center HUD Progress Label */}
          <div className="absolute bottom-[-12px] bg-[#050505] border border-[#2A2A2A] px-2.5 py-0.5 rounded-full z-20">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#F8F8F8]">
              {String(progress).padStart(3, "0")}%
            </span>
          </div>
        </div>

        {/* Dynamic Analyzing Title & Subtitle */}
        <div className="flex flex-col items-center gap-1 text-center px-4 max-w-lg min-h-[44px]">
          <span className="text-[9px] font-mono tracking-[0.35em] text-[#DC2626] uppercase font-bold">
            ANALYSIS STATUS
          </span>
          <h2 className="text-xs sm:text-sm font-heading font-semibold text-[#F8F8F8] tracking-widest uppercase">
            <DecryptedText text={activeStageText} />
          </h2>
        </div>

        {/* Diagnostic Console Logger */}
        <div className="w-full max-w-2xl flex flex-col bg-[#0F0F0F]/45 border border-[#2A2A2A]/40 rounded-xl p-3 sm:p-4 backdrop-blur-md">
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A]/40 pb-1.5 mb-2.5 select-none">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]/40" />
              </div>
              <span className="text-[8px] sm:text-[9px] font-mono tracking-wider text-[#A8A8A8] uppercase">
                PORTFOLIO_SYSTEM_AUDIT_LOG.LOG
              </span>
            </div>
            
            <span className="text-[8px] font-mono text-[#A8A8A8]/50 uppercase">
              LINES: {logs.length}
            </span>
          </div>

          {/* Scrollable Logs Console */}
          <div 
            ref={logsContainerRef}
            className="h-28 sm:h-36 overflow-y-auto font-mono text-[9px] sm:text-[10px] text-[#A8A8A8] space-y-1 custom-scrollbar pr-1 select-text scroll-smooth"
          >
            {logs.map((log, idx) => {
              const isSuccess = log.includes("✔") || log.includes("OK") || log.includes("CACHED");
              const isWarn = log.includes("⚠");
              const textClass = isSuccess 
                ? "text-[#22C55E]" 
                : isWarn 
                  ? "text-[#EAB308]" 
                  : "text-[#A8A8A8]";
              
              return (
                <div key={idx} className={`leading-normal ${textClass} break-all flex items-start gap-1`}>
                  <span className="text-[#DC2626]/60 shrink-0 select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              );
            })}
            {logs.length === 0 && (
              <div className="text-[#A8A8A8]/30 italic">Connecting compiler sockets...</div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Bottom Row HUD Details (Absolutely Positioned to prevent layout shifts) */}
      <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row items-center justify-between gap-4 z-25 border-t border-[#2A2A2A]/30 pt-3 select-none">
        {/* Portfolio Owner Identity Details */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-0.5">
          <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[#F8F8F8] tracking-widest uppercase">
            KARTHIKEYAN C
          </span>
          <span className="text-[8px] sm:text-[9px] font-mono text-[#A8A8A8] tracking-wider uppercase">
            CSE // IOT, CYBERSECURITY & BLOCKCHAIN
          </span>
        </div>

        {/* Main Linear Cinematic Progress Bar */}
        <div className="flex-1 max-w-xs sm:max-w-sm w-full h-[1.5px] bg-[#2A2A2A]/40 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#DC2626]/70 to-[#DC2626] rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ type: "tween", ease: "easeOut" }}
          />
          {progress > 0 && progress < 100 && !prefersReducedMotion && (
            <div
              className="absolute top-0 bottom-0 w-[4px] bg-[#F8F8F8] shadow-[0_0_8px_#F8F8F8] opacity-80 rounded-full"
              style={{
                left: `calc(${progress}% - 2px)`,
                transition: "left 0.05s ease-out",
              }}
            />
          )}
        </div>
      </div>

      {/* High-tech Custom Scrollbar CSS (inlined for zero dependencies) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(42, 42, 42, 0.15);
          border-radius: 9px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.3);
          border-radius: 9px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.6);
        }
      `}</style>
    </motion.div>
  );
};
