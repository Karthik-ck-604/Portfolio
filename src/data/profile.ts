export interface Education {
  degree: string;
  institution: string;
  duration: string;
  metric: string;
}

export interface MetricStat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  aboutParagraphs: string[];
  education: Education;
  metrics: MetricStat[];
  resumeUrl: string;
}

export const profile: Profile = {
  name: "Karthikeyan C",
  title: "Full Stack Developer",
  subtitle: "Full Stack Developer | MERN Stack | Java Spring | AI & Cloud Enthusiast",
  description: "I'm a Full Stack Developer passionate about building scalable web applications and AI-powered solutions. Through multiple internships, research publications, and hands-on projects, I have gained practical experience in developing secure, responsive, and production-ready software using modern technologies.",
  aboutParagraphs: [
    "I am currently pursuing a Bachelor of Engineering in Computer Science and Engineering (specializing in IoT, Cybersecurity, and Blockchain) at SNS College of Engineering. My core drive is to bridge the gap between complex backend architectures and highly intuitive user interfaces.",
    "My journey started with designing algorithms and core logic in Python and Java, which quickly evolved into building full-stack web applications. Through successive industry internships, I transitioned my projects into professional, production-ready, client-facing software systems.",
    "I specialize in the MERN ecosystem (MongoDB, Express.js, React, Node.js) and Java Spring Boot. In addition, I have hands-on experience integrating cloud structures, setting up custom APIs, and embedding Generative AI logic using modern LLM wrappers.",
    "I aim to engineer digital experiences that solve real-world problems with simple, performant, and accessible code. I approach development with an emphasis on code quality, clean architecture, and continuous technical growth."
  ],
  education: {
    degree: "B.E. Computer Science & Engineering (IoT & Cybersecurity including Blockchain)",
    institution: "SNS College of Engineering",
    duration: "2022 - 2026",
    metric: "CGPA: 7.2/10"
  },
  metrics: [
    { value: "4", label: "Industry Internships" },
    { value: "15+", label: "Professional Certifications" },
    { value: "3", label: "Research Publications" },
    { value: "10+", label: "Completed Projects" },
    { value: "2026", label: "Graduate Year" }
  ],
  resumeUrl: "/assets/cert_generative_ai.pdf"
};
