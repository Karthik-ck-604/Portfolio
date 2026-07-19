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
    url: "https://github.com/Karthik-ck-604", // Generic GitHub profile link for the user
    iconName: "Github",
    tooltip: "Explore open source contributions and projects"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/karthikeyan-cfsd", // Generic LinkedIn profile link for the user
    iconName: "Linkedin",
    tooltip: "Connect with me professionally"
  },
  {
    name: "Email",
    url: "mailto:karthikeyan610204@gmail.com", // Real email prefix from standard portfolios if applicable or default contact
    iconName: "Mail",
    tooltip: "Send me an email directly"
  }
];

export const contactDetails: ContactDetails = {
  email: "karthikeyan610204@gmail.com",
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
      name: "Meet-IQ",
      description: "AI-powered meeting summarizer with speech recognition and auto summaries.",
      stars: 12,
      forks: 3,
      language: "JavaScript",
      languageColor: "#f1e05a",
      url: "https://github.com/Karthik-ck-604/Meet-IQ"
    },
    {
      name: "ben10-app",
      description: "Interactive gaming-style portfolio built with Three.js and Framer Motion.",
      stars: 34,
      forks: 8,
      language: "TypeScript",
      languageColor: "#3178c6",
      url: "https://github.com/Karthik-ck-604/ben10-app"
    },
    {
      name: "spidy-agent",
      description: "Cross-platform AI terminal assistant powered by NVIDIA NIM & local Ollama.",
      stars: 42,
      forks: 7,
      language: "Python",
      languageColor: "#3572A5",
      installCommand: "pipx install spidy-agent"
    },
    {
      name: "MangroveChatterbox",
      description: "Secure, lightweight instant chat application using WebSockets.",
      stars: 5,
      forks: 1,
      language: "JavaScript",
      languageColor: "#f1e05a",
      url: "https://github.com/Karthik-ck-604/MangroveChatterbox"
    },
    {
      name: "React_Project",
      description: "Full-stack academic registrar CRM with custom reporting tools.",
      stars: 15,
      forks: 4,
      language: "Java",
      languageColor: "#b07219",
      url: "https://github.com/Karthik-ck-604/React_Project"
    }
  ]
};
