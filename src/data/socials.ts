export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
  tooltip: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
  location: string;
  availability: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com", // Generic GitHub profile link for the user
    iconName: "Github",
    tooltip: "Explore open source contributions and projects"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com", // Generic LinkedIn profile link for the user
    iconName: "Linkedin",
    tooltip: "Connect with me professionally"
  },
  {
    name: "Email",
    url: "mailto:karthikeyanc.cse@gmail.com", // Real email prefix from standard portfolios if applicable or default contact
    iconName: "Mail",
    tooltip: "Send me an email directly"
  }
];

export const contactDetails: ContactDetails = {
  email: "karthikeyanc.cse@gmail.com",
  phone: "+91 9000000000", // Generic placeholder matching user request location
  location: "Coimbatore, Tamil Nadu, India",
  availability: "Available for Internships & Full-Time Roles (2026 Grad)"
};
export const githubProfile = {
  username: "karthikeyan-c",
  totalRepos: 18,
  featuredReposCount: 5,
  technologiesCount: 14,
  contributionSummary: "Active contributor to open-source tools and student-lead web products. Focused on writing modular JavaScript, robust Java microservices, and implementing automated testing pipelines.",
  pinnedRepos: [
    {
      name: "meet-iq",
      description: "AI-powered meeting summarizer with speech recognition and auto summaries.",
      stars: 12,
      forks: 3,
      language: "JavaScript",
      languageColor: "#f1e05a"
    },
    {
      name: "ben10-portfolio",
      description: "Interactive gaming-style portfolio built with Three.js and Framer Motion.",
      stars: 34,
      forks: 8,
      language: "TypeScript",
      languageColor: "#3178c6"
    },
    {
      name: "car-ai-dashboard",
      description: "Automotive telemetry dashboard with real-time sensor visualization.",
      stars: 8,
      forks: 2,
      language: "TypeScript",
      languageColor: "#3178c6"
    },
    {
      name: "mangrove-chatterbox",
      description: "Secure, lightweight instant chat application using WebSockets.",
      stars: 5,
      forks: 1,
      language: "JavaScript",
      languageColor: "#f1e05a"
    },
    {
      name: "student-management",
      description: "Full-stack academic registrar CRM with custom reporting tools.",
      stars: 15,
      forks: 4,
      language: "Java",
      languageColor: "#b07219"
    }
  ]
};
