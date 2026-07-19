export interface Project {
  id: string;
  name: string;
  category: string;
  status: "Completed" | "In Development" | "Prototype";
  year: string;
  problem: string;
  solution: string;
  outcome: string;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  installCommand?: string;
  liveUrl?: string;
  pypiUrl?: string; // Dynamic or stock-based asset path
}

export const projects: Project[] = [
  {
    id: "meet-iq",
    name: "Meet-IQ",
    category: "AI & Full-Stack Productivity",
    status: "Completed",
    year: "2024",
    problem: "Recruiters and corporate team members spend up to 4 hours weekly transcribing meeting audio, filtering action items, and manual note logging.",
    solution: "Developed an AI-powered meeting summarizer that processes live audio streams, generates concise summaries via NLP models, and automatically categorizes notes.",
    outcome: "Reduced administrative meeting overhead by approximately 80% and automated post-meeting workflow generation for active teams.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "NLP APIs", "WebSockets"],
    highlights: [
      "Built audio ingestion endpoints supporting multi-speaker waveform rendering and real-time client audio streaming.",
      "Developed an LLM prompt middleware to extract structured JSON outputs (action items, owners, priorities).",
      "Created dynamic team workspaces where users share, edit, and push task cards directly to third-party dashboards.",
      "Implemented a secure WebSocket notification server delivering immediate email briefs after model run completion."
    ],
    githubUrl: "https://github.com/Karthik-ck-604/Meet-IQ",
  },
  {
    id: "ben10-portfolio",
    name: "Ben 10 Interactive Portfolio",
    category: "Creative Frontend & Graphics",
    status: "Completed",
    year: "2024",
    problem: "Standard web portfolios feel like rigid text documents, lacking visual interaction and storytelling element that captivates creative directors.",
    solution: "Designed a gamified, high-fidelity experience featuring character selection panels, custom vector animations, and smooth layout changes.",
    outcome: "Captured high engagement rates with an average visit duration exceeding 3.5 minutes and validated visual optimization techniques.",
    technologies: ["React.js", "Framer Motion", "Three.js", "Tailwind CSS", "Web Audio API"],
    highlights: [
      "Developed a custom asset loader showing exact load percentages to prevent Cumulative Layout Shift (CLS).",
      "Orchestrated complex timeline transitions and sound synthesis triggers for tactile hover feedback.",
      "Configured modular SVG character vectors with physics-based follow constraints for cursor interactions.",
      "Optimized Three.js lighting layers and polycount configurations, securing 60fps renders on mobile devices."
    ],
    githubUrl: "https://github.com/Karthik-ck-604/ben10-app",
    liveUrl: "https://ben10-app.vercel.app",
  },
  {
    id: "spidy-agent",
    name: "Spidy CLI (spidy-agent)",
    category: "AI & System Automation CLI",
    status: "Completed",
    year: "2024",
    problem: "Developers and system administrators need to constantly switch context between search engines, system stats monitors, security scanners, and terminal helper scripts.",
    solution: "Built a unified, cross-platform terminal assistant powered by local Ollama and cloud NVIDIA NIM models with capabilities ranging from news to systems checking.",
    outcome: "Created a zero-dependency CLI utility, easily installable via pip/pipx, offering secure local automation, custom Tamil-Tanglish NLP, and instant developer templates.",
    technologies: ["Python", "CLI", "NVIDIA NIM", "Ollama", "psutil"],
    highlights: [
      "Designed a cross-platform core supporting Linux, macOS, and Windows utilizing Python 3.10+ environments.",
      "Integrated real-time news retrieval with localization filters, psutil diagnostic logging (CPU/RAM/disk/battery), and heuristic vulnerability scanners.",
      "Created file-system navigator, maps route calculator, AI code debugger, and web mode generating responsive HTML/CSS/JS components.",
      "Implemented తమిళం (Tamil) & Tanglish chat capabilities with automated local JSONL chat logging with zero external database dependencies."
    ],
    installCommand: "pipx install spidy-agent",
    pypiUrl: "https://pypi.org/user/karthik-60204/",
  },
  {
    id: "student-management",
    name: "Student Management System",
    category: "Full-Stack CRM & Data Systems",
    status: "Completed",
    year: "2023",
    problem: "Academic centers struggle with scattered Excel sheets to track registration, scores, and parent notification lists.",
    solution: "Created a centralized web application managing student rosters, generating reports, and automating course scheduling.",
    outcome: "Active deployment within an academy, managing registrations and saving staff hours on paper grading audits.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "PDFKit"],
    highlights: [
      "Engineered clean database CRUD controls managing 10,000+ entries without performance degradation.",
      "Created advanced data grids with real-time text searches, multi-column filters, and paginated request pipelines.",
      "Developed a backend PDF generator compiling report cards with custom security watermarks.",
      "Implemented role-based access controls (Admin vs. Faculty vs. Student) with server-guarded API endpoints."
    ],
    githubUrl: "https://github.com/Karthik-ck-604/React_Project",
  },
];
