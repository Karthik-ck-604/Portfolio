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
  pypiUrl?: string;
}

export const projects: Project[] = [
  {
    id: "kochen-maint",
    name: "Kochen Maint",
    category: "Full-Stack & AI/LLM Platform",
    status: "In Development",
    year: "2025",
    problem: "Households waste food and money because pantry contents are invisible to meal planning — people cook from memory, not from actual stock, while nutrition goals go untracked.",
    solution: "Built an AI kitchen platform where users manage smart pantries, scan barcodes, and receive Gemini-generated recipes matched to real stock while honoring dietary restrictions and auto-generating grocery lists.",
    outcome: "Delivered an offline-first monorepo spanning Next.js 14 and React Native with biometric auth, Stripe billing, BullMQ job processing, conflict-resolved mobile sync, and an admin dashboard with feature flags.",
    technologies: ["Next.js 14", "React Native", "Expo", "NestJS", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Google Gemini", "Stripe", "Docker", "GitHub Actions", "React Query", "Framer Motion", "Tailwind CSS", "JWT"],
    highlights: [
      "Engineered a Google Gemini–powered recipe engine that generates diet-aware meal suggestions from live pantry inventory and user nutrition profiles.",
      "Built barcode scanning and product ingestion pipeline in React Native (Expo) with offline-first sync and multi-device conflict resolution using vector clocks.",
      "Designed a NestJS microservice backend with Prisma ORM, PostgreSQL, Redis caching, and BullMQ queues handling grocery-list generation and scheduled meal-plan processing.",
      "Implemented Stripe subscription billing with webhook event processing, role-based access control via JWT, and a full admin dashboard featuring feature flags and audit logs."
    ],
    githubUrl: "https://github.com/Karthik-ck-604/kochen_maint",
  },
  {
    id: "devsync-ai",
    name: "DevSync-AI",
    category: "AI & Developer Productivity",
    status: "Completed",
    year: "2025",
    problem: "Developers lose hours context-switching between GitHub history, codebase Q&A, and meeting notes — no single tool connects commits, code search, and recorded decisions in one workflow.",
    solution: "Built an AI developer platform that links GitHub repos to generate commit summaries, enable natural-language codebase search, and transcribe meeting recordings into structured action items.",
    outcome: "Deployed a production full-stack app with frontend on Vercel, backend on Render, and PostgreSQL on Neon — giving developers a unified dashboard where code history and meeting intelligence converge.",
    technologies: ["React.js", "Node.js", "PostgreSQL", "Neon", "Vercel", "Render", "GitHub API", "OpenAI", "Whisper", "REST API", "JWT"],
    highlights: [
      "Integrated the GitHub API to fetch repository trees and commit histories, passing content through an LLM pipeline that generates concise per-PR and per-branch summaries.",
      "Implemented natural-language codebase Q&A by chunking and embedding repository files for semantic search and context-aware answers over the user's own codebase.",
      "Built a meeting-recording upload and transcription pipeline using Whisper, extracting action items, owners, and priorities into a structured dashboard view.",
      "Deployed a decoupled architecture — React frontend on Vercel, Node.js/Express backend on Render, PostgreSQL via Neon — with JWT-secured API routes and GitHub OAuth."
    ],
    githubUrl: "https://github.com/Karthik-ck-604/DevSync-AI",
    liveUrl: "https://dev-syncai.vercel.app",
  },
  {
    id: "meet-iq",
    name: "Meet-IQ",
    category: "AI & Full-Stack Productivity",
    status: "Completed",
    year: "2024",
    problem: "Recruiters and teams spend up to 4 hours weekly transcribing meeting audio, filtering action items, and logging notes — all manual, error-prone work that delays follow-through.",
    solution: "Developed an AI meeting summarizer that processes live audio streams, generates concise NLP summaries, and automatically categorizes action items with owners and priorities.",
    outcome: "Reduced administrative meeting overhead by ~80% and automated post-meeting workflow generation — cutting time-to-action-item from hours to seconds for active teams.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "NLP APIs", "WebSockets"],
    highlights: [
      "Built audio ingestion endpoints supporting multi-speaker waveform rendering and real-time client audio streaming via WebSocket connections.",
      "Developed an LLM prompt middleware to extract structured JSON outputs containing action items, assigned owners, and priority tiers.",
      "Created dynamic team workspaces where users share, edit, and push task cards directly to third-party project dashboards.",
      "Implemented a secure WebSocket notification server delivering immediate structured email briefs upon model run completion."
    ],
    githubUrl: "https://github.com/Karthik-ck-604/Meet-IQ",
  },
  {
    id: "ben10-portfolio",
    name: "Ben 10 Interactive Portfolio",
    category: "Creative Frontend & Graphics",
    status: "Completed",
    year: "2024",
    problem: "Standard web portfolios feel like static text documents — they lack the visual interaction and storytelling that captures creative directors and stands out in a competitive field.",
    solution: "Designed a gamified, high-fidelity experience with character selection panels, custom vector animations, physics-based cursor constraints, and layout changes triggered by user interaction.",
    outcome: "Achieved average visit durations exceeding 3.5 minutes and validated advanced visual optimization techniques including 60fps Three.js rendering on mobile devices.",
    technologies: ["React.js", "Framer Motion", "Three.js", "Tailwind CSS", "Web Audio API"],
    highlights: [
      "Developed a custom asset loader showing exact load percentages to prevent Cumulative Layout Shift (CLS) on initial render.",
      "Orchestrated complex timeline transitions and sound synthesis triggers for tactile hover feedback across the UI.",
      "Configured modular SVG character vectors with physics-based follow constraints responding to cursor interactions.",
      "Optimized Three.js lighting layers and polycount configurations, sustaining stable 60fps renders on mobile devices."
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
    problem: "Developers and sysadmins constantly context-switch between search engines, system monitors, security scanners, and terminal helper scripts — with no unified cross-platform automation tool.",
    solution: "Built a unified terminal assistant powered by local Ollama and cloud NVIDIA NIM with capabilities spanning news retrieval, system diagnostics, security scanning, and AI code debugging.",
    outcome: "Published a zero-dependency pip/pipx-installable CLI offering secure local automation, custom Tamil-Tanglish NLP chat, file-system navigation, and instant responsive HTML/CSS/JS generation.",
    technologies: ["Python", "CLI", "NVIDIA NIM", "Ollama", "psutil"],
    highlights: [
      "Designed a cross-platform core supporting Linux, macOS, and Windows utilizing Python 3.10+ environments with zero external database dependencies.",
      "Integrated real-time news retrieval with localization filters, psutil diagnostic logging (CPU/RAM/disk/battery), and heuristic vulnerability scanners.",
      "Created a file-system navigator, maps route calculator, AI code debugger, and web mode generating responsive HTML/CSS/JS components.",
      "Implemented Tamil & Tanglish chat capabilities with automated local JSONL chat logging and offline AI support via Ollama."
    ],
    installCommand: "pipx install spidy-agent",
    pypiUrl: "https://pypi.org/user/karthik-60204/",
  },
];
