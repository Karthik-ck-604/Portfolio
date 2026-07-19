export interface CertificateItem {
  name: string;
  provider: string;
  year: string;
  credentialUrl: string; // File path to local PNG/PDF
  logoName?: string; // Icon helper
}

export const professionalCertifications: CertificateItem[] = [
  {
    name: "Oracle OCI Generative AI Professional",
    provider: "Oracle Cloud Infrastructure",
    year: "2024",
    credentialUrl: "/src/cert_oracle.png"
  },
  {
    name: "AWS AI Practitioner Challenge",
    provider: "Amazon Web Services (Udacity)",
    year: "2024",
    credentialUrl: "/src/cert_aws_udacity.pdf"
  },
  {
    name: "IBM Enterprise Design Thinking Practitioner",
    provider: "IBM",
    year: "2023",
    credentialUrl: "/src/cert_ibm.png"
  },
  {
    name: "NPTEL Elite – Cloud Computing & Distributed Systems",
    provider: "NPTEL (IIT Kharagpur)",
    year: "2024",
    credentialUrl: "/src/cert_nptel.pdf"
  },
  {
    name: "Snowflake – Generative & Agentic AI for Executives",
    provider: "Snowflake",
    year: "2024",
    credentialUrl: "/src/cert_snowflake.pdf"
  },
  {
    name: "Deloitte Cyber Job Simulation",
    provider: "Deloitte (Forage)",
    year: "2023",
    credentialUrl: "/src/cert_deloitte.png"
  }
];

export const additionalCertifications: CertificateItem[] = [
  {
    name: "NASSCOM Digital Edge 101",
    provider: "NASSCOM",
    year: "2024",
    credentialUrl: "/src/cert_nasscom.pdf"
  },
  {
    name: "MeitY Cyber Hygiene Certificate",
    provider: "MeitY (Govt. of India)",
    year: "2023",
    credentialUrl: "/src/cert_meity.png"
  },
  {
    name: "BCBuzz Penetration Testing Workshop",
    provider: "BCBuzz Technologies",
    year: "2023",
    credentialUrl: "/src/cert_penetration_testing.png"
  },
  {
    name: "IIT Indore Fluxus Participation",
    provider: "IIT Indore",
    year: "2023",
    credentialUrl: "/src/cert_iit_fluxus.jpg"
  },
  {
    name: "LinkedIn Learning – What is Generative AI?",
    provider: "LinkedIn Learning (Microsoft)",
    year: "2023",
    credentialUrl: "/src/cert_generative_ai.pdf"
  },
  {
    name: "PrepInsta React.js Certification",
    provider: "PrepInsta",
    year: "2024",
    credentialUrl: "/src/cert_react.png"
  },
  {
    name: "PrepInsta GitHub Version Control Certificate",
    provider: "PrepInsta",
    year: "2024",
    credentialUrl: "/src/cert_github.png"
  },
  {
    name: "PrepInsta Power BI & Business Intelligence",
    provider: "PrepInsta",
    year: "2024",
    credentialUrl: "/src/cert_power_bi.png"
  },
  {
    name: "PrepInsta NLP & Deep Learning Certification",
    provider: "PrepInsta",
    year: "2024",
    credentialUrl: "/src/cert_nlp.png"
  },
  {
    name: "PrepInsta Intermediate Coding Assessment",
    provider: "PrepInsta",
    year: "2024",
    credentialUrl: "/src/cert_intermediate_coding.png"
  },
  {
    name: "PrepInsta Basic Coding Assessment",
    provider: "PrepInsta",
    year: "2024",
    credentialUrl: "/src/cert_basic_coding.png"
  }
];
