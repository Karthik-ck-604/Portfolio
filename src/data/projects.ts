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
    id: "kochen-maint",
    name: "Kochen Maint",
    category: "Full-Stack & AI/LLM Platform",
    status: "In Development",
    year: "2025",
    problem: "Households waste food and money because pantry contents are invisible to meal planning — people cook what they remember having, not what's actually there, while dietary rules and nutrition goals go untracked.",
    solution: "Built a full-stack AI-powered kitchen platform where users manage smart pantries, scan barcodes, and receive Google Gemini–generated recipes matched to real pantry stock while honoring dietary restrictions, nutrition targets, and auto-generated grocery lists from meal plans.",
    outcome: "Delivered an offline-first monorepo spanning a Next.js 14 web app and React Native (Expo) mobile client with biometric auth, barcode scanning, Stripe subscription billing, a diet-coach module, conflict-resolved mobile sync, background job processing with BullMQ, and an admin dashboard with feature flags, audit logs, and analytics.",
    technologies: ["Next.js 14", "React Native", "Expo", "NestJS", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Google Gemini", "Stripe", "Docker", "GitHub Actions", "React Query", "Framer Motion", "Tailwind CSS", "JWT", "Monorepo"],
    highlights: [
      "Engineered a Google Gemini–powered recipe engine that generates contextual, diet-aware meal suggestions by reading live pantry inventory and user nutrition profiles.",
      "Built barcode scanning and product ingestion pipeline in React Native (Expo) with offline-first sync and multi-device conflict resolution using vector clocks.",
      "Designed a NestJS microservice backend with Prisma ORM, PostgreSQL, Redis caching, and BullMQ job queues handling grocery-list generation and scheduled meal-plan processing.",
      "Implemented Stripe subscription billing with webhook event processing, role-based access control via JWT, and a full admin dashboard featuring feature flags, audit logs, and real-time analytics."
    ],
    githubUrl: "https://github.com/Karthik-ck-604/kochen_maint",
  },
  {
    id: "devsync-ai",
    name: "DevSync-AI",
    category: "AI & Developer Productivity",
    status: "Completed",
    year: "2025",
    problem: "Developers lose hours context-switching between GitHub history, codebase Q&A sessions, and meeting notes — there is no single tool that connects commits, code understanding, and recorded decisions in one developer workflow.",
    solution: "Built an AI-powered developer productivity platform that connects GitHub repositories to provide instant AI-generated commit summaries, natural-language codebase search and Q&A over any repo, and meeting-recording uploads that are transcribed and summarized into structured action items.",
    outcome: "Deployed a production-ready full-stack app with the frontend on Vercel, backend on Render, and PostgreSQL on Neon — giving developers a unified dashboard where code history, semantic search, and meeting intelligence converge in one workflow.",
    technologies: ["React.js", "Node.js", "PostgreSQL", "Neon", "Vercel", "Render", "GitHub API", "OpenAI", "Whisper", "REST API", "JWT"],
    highlights: [
      "Integrated the GitHub API to fetch repository trees and commit histories, passing content through an LLM pipeline that generates concise, structured commit summaries per PR and branch.",
      "Implemented natural-language codebase Q&A by chunking and embedding repository files, enabling semantic search and context-aware answers over the user's own codebase.",
      "Built a meeting-recording upload and transcription pipeline using Whisper, with a follow-up summarization step that extracts action items, owners, and priorities into a structured dashboard view.",
      "Deployed a decoupled architecture — React frontend on Vercel, Node.js/Express backend on Render, and PostgreSQL via Neon — with JWT-secured API routes and GitHub OAuth integration."
    ],
    githubUrl: "https://github.com/Karthik-ck-604/DevSync-AI",
    liveUrl: "https://dev-sync-ai.vercel.app",
  },
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
