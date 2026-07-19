export interface JournalPublication {
  title: string;
  journal: string;
  year: string;
  authors: string;
  summary: string;
  domain: string;
  badge: string;
}

export const publications: JournalPublication[] = [
  {
    title: "Design Thinking Based Accident Prevention System Using Eye Blink Sensor",
    journal: "Industrial Engineering Journal",
    year: "2023",
    authors: "Karthikeyan C",
    summary: "Engineered an embedded hardware module tracking driver blink durations to detect micro-sleep occurrences. Built a control algorithm integrating safety alarm triggers and deceleration mechanics.",
    domain: "IoT & Embedded Security Automation",
    badge: "Primary Publication",
  },
  {
    title: "Locating Smartphones Using Seeker Tool",
    journal: "YMER Journal",
    year: "2024",
    authors: "Karthikeyan C",
    summary: "Conducted networking research into remote device coordinate retrievals via Web APIs. Analyzed location handshake protocols and secure response structures for emergency recovery suites.",
    domain: "Networking, Web APIs & Cryptography",
    badge: "Secondary Publication",
  },
];
