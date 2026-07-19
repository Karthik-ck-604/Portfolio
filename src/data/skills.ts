export interface SkillCategory {
  title: string;
  skills: string[];
  description: string;
  iconName: string;
}

export interface FeaturedTech {
  title: string;
  description: string;
  badgeText: string;
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Java", "Python", "PHP", "HTML5", "CSS3"],
    description: "Multi-paradigm language core enabling dynamic web scripting, type safety, and robust system programming.",
    iconName: "Code2"
  },
  {
    title: "Frontend Development",
    skills: ["React.js", "Vite", "Tailwind CSS", "Bootstrap", "Framer Motion", "Three.js"],
    description: "Creating highly interactive, Awwwards-inspired client interfaces with smooth micro-interactions and GPU-accelerated motion.",
    iconName: "Layout"
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "Java Spring Boot", "Django", "REST APIs", "JWT Auth"],
    description: "Engineering secure, scalable backend control systems, routing middleware, and optimized server controllers.",
    iconName: "Server"
  },
  {
    title: "Database Management",
    skills: ["MongoDB", "MySQL", "SQL", "NoSQL", "Mongoose"],
    description: "Designing database structures, collection models, write optimizations, and transactional databases.",
    iconName: "Database"
  },
  {
    title: "Testing & Quality",
    skills: ["Postman", "Selenium", "Playwright", "Jest", "Manual Testing"],
    description: "Running automated browser simulations and continuous integration endpoint assertions for zero-defect software release.",
    iconName: "ShieldAlert"
  },
  {
    title: "Cloud & AI Integrations",
    skills: ["Oracle OCI", "AWS AI", "Gemini API", "Ollama", "Snowflake AI"],
    description: "Leveraging cloud services and LLM wrappers to build generative-AI features, cloud data pipelines, and prompt architectures.",
    iconName: "Cloud"
  },
  {
    title: "Developer Tools",
    skills: ["Git", "GitHub", "npm", "Bun", "VS Code", "Vercel"],
    description: "Leveraging professional version control structures, lightning-fast bundlers, package managers, and automated deployment pipelines.",
    iconName: "Wrench"
  }
];

export const featuredTech: FeaturedTech[] = [
  {
    title: "MERN Ecosystem",
    description: "Full-stack javascript mastery building performant SPAs from high-speed Node engines down to MongoDB pipelines.",
    badgeText: "Core Stack"
  },
  {
    title: "Java Spring Boot",
    description: "Building production-grade enterprise microservices and secure dependency-injected MVC applications.",
    badgeText: "Enterprise Backend"
  },
  {
    title: "AI Integration",
    description: "Interfacing frontend clients with Gemini APIs and locally cached models for dynamic context summaries and analytics.",
    badgeText: "Cognitive Layer"
  },
  {
    title: "Cloud Infrastructures",
    description: "Configuring high-availability server zones, Oracle OCI setups, and automated serverless platforms.",
    badgeText: "Cloud Infrastructure"
  }
];
