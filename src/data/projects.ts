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
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string; // Dynamic or stock-based asset path
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
    githubUrl: "https://github.com/your-username/meet-iq",
    imageUrl: "/src/cert_webgen.png" // Using local certificate asset as visual backdrop fallback
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
    githubUrl: "https://github.com/your-username/ben10-portfolio",
    liveUrl: "https://ben10-app.vercel.app",
    imageUrl: "/src/cert_webgen.png"
  },
  {
    id: "car-ai-dashboard",
    name: "Car AI Dashboard",
    category: "Automotive UI & Telemetry",
    status: "Prototype",
    year: "2024",
    problem: "Connected vehicle interfaces need simple visual arrangements for metrics without distracting the driver or causing visual clutter.",
    solution: "Created a high-contrast automotive dashboard prototype displaying speed, fuel grids, warning states, and custom route maps.",
    outcome: "Served as a technical reference mockup proving feasibility of real-time client-side sensor rendering inside React containers.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Canvas API", "Ollama API"],
    highlights: [
      "Built a mock telemetric data stream pumping synthetic sensor updates at a steady 60hz interval.",
      "Programmed a high-performance circular speedometer dial drawing dynamically on HTML5 Canvas containers.",
      "Integrated a local LLM companion API (Ollama) responding to driver commands with immediate speech syntheses.",
      "Designed a pure dark UI panel layout with crimson danger triggers matching WCAG AA color rules."
    ],
    githubUrl: "https://github.com/your-username/car-ai-dashboard",
    imageUrl: "/src/cert_webgen.png"
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
    githubUrl: "https://github.com/your-username/student-management",
    imageUrl: "/src/cert_webgen.png"
  },
];
