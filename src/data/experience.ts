export interface WorkExperience {
  role: string;
  company: string;
  duration: string;
  technologies: string[];
  summary: string;
  achievements: string[];
  skillsGained: string[];
  certificateUrl: string;
}

export const experiences: WorkExperience[] = [
  {
    role: "Full Stack Developer Intern",
    company: "Webgen Tech Solutions",
    duration: "June 2024 - July 2024",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Git"],
    summary: "Engineered web architectures and authentication flows for enterprise clients, focusing on secure communication channels and robust data management systems.",
    achievements: [
      "Built full-stack MERN applications with secure REST API designs and modular router structures.",
      "Implemented secure authentication and session management using JSON Web Tokens (JWT) and cookies, reducing credential vulnerability risks.",
      "Integrated third-party service REST APIs with custom backend services, increasing system functional capabilities.",
      "Maintained professional Git collaboration workflows, including structured branch management and pull-request code audits."
    ],
    skillsGained: ["Full-Stack Architecture", "Token Security (JWT)", "REST API Integration", "Version Control System (Git)"],
    certificateUrl: "/src/cert_webgen.png"
  },
  {
    role: "MERN Stack Intern",
    company: "Nitroware Technologies",
    duration: "May 2024 - June 2024",
    technologies: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Postman"],
    summary: "Focused on structural backend engineering, designing database schemas, writing optimized routing modules, and auditing API requests.",
    achievements: [
      "Designed and modeled clean relational schemas and NoSQL collections in MongoDB utilizing Mongoose validation.",
      "Developed secure CRUD backend APIs with strict payload verification rules using Postman for unit endpoint audits.",
      "Optimized query structures and database indexing mechanisms, decreasing average database retrieval times by 15%.",
      "Drafted comprehensive backend developer API documentation, smoothing teammate feature integration."
    ],
    skillsGained: ["NoSQL Schema Modeling", "CRUD Architecture", "Backend Performance Tuning", "API Testing & Audit"],
    certificateUrl: "/src/cert_nitroware.png"
  },
  {
    role: "Frontend Development Internship",
    company: "Cognifyz Technologies",
    duration: "March 2024 - April 2024",
    technologies: ["React.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"],
    summary: "Built high-performance interface screens, refactoring core code structures for maximum device flexibility and component reuse.",
    achievements: [
      "Created 15+ highly responsive, modular React UI components using modern styles and hooks.",
      "Integrated complex frontend layouts with dynamic REST APIs, loading state structures, and error boundary wrappers.",
      "Optimized web bundles and lazy-loaded heavy interface packages, improving client rendering performance scores.",
      "Developed consistent accessible UI layers matching color contrasts and semantic guidelines."
    ],
    skillsGained: ["Responsive Layout Design", "React Component Optimization", "State Integration", "Cross-Device QA"],
    certificateUrl: "/src/cert_cognifyz.jpg"
  },
  {
    role: "Full Stack Development Intern",
    company: "Altitudes Technology",
    duration: "December 2023 - January 2024",
    technologies: ["Python", "Django", "SQLite", "Bootstrap", "Functional Testing"],
    summary: "Contributed to web service backend scripting and automated regression testing suites for rapid software deployments.",
    achievements: [
      "Developed web controllers, template renderers, and database interactions using Python and Django framework.",
      "Wrote comprehensive functional testing suites, reducing logic errors before production server deployment.",
      "Reflowed interface styles to support desktop and mobile layouts using responsive layouts.",
      "Implemented simple authentication checks and secure view guards, preventing unauthorized user URL access."
    ],
    skillsGained: ["Django Framework", "Unit & Functional Testing", "Template System Logic", "Routing Guards"],
    certificateUrl: "/src/cert_altitudes.png"
  }
];
