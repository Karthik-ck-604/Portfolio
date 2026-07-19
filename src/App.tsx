import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { ProfessionalCertifications } from "@/components/sections/ProfessionalCertifications";
import { Publications } from "@/components/sections/Publications";
import { AdditionalCertifications } from "@/components/sections/AdditionalCertifications";
import { GitHub } from "@/components/sections/GitHub";
import { Contact } from "@/components/sections/Contact";
import { Preloader } from "@/components/common/Preloader";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Lock scrolling while loading
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Karthikeyan C",
    "jobTitle": "Full Stack Developer",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "SNS College of Engineering"
    },
    "knowsAbout": [
      "Software Engineering",
      "Full Stack Development",
      "MERN Stack",
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Java Spring Boot",
      "Cloud Computing",
      "Artificial Intelligence"
    ]
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest("#contact input, #contact textarea, #contact select, #contact [contenteditable='true']")) {
      return;
    }
    e.preventDefault();
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Karthikeyan C | Full Stack Developer | MERN & Spring Boot</title>
        <meta name="description" content="Professional portfolio of Karthikeyan C, a Full Stack Developer specializing in MERN stack, Java Spring Boot, AI integration, and cloud technologies." />
        <meta name="robots" content="index, follow" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Karthikeyan C | Full Stack Developer Portfolio" />
        <meta property="og:description" content="MERN & Spring Boot developer specializing in high-performance web products, AI integrations, and cloud architectures." />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Karthikeyan C | Full Stack Developer" />
        <meta name="twitter:description" content="MERN & Spring Boot portfolio featuring cloud, AI, and full-stack software products." />
        
        {/* Inject JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      <AnimatePresence mode="wait">
        {!isLoaded && (
          <Preloader onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      <div
        className="min-h-screen bg-[#050505] text-[#F8F8F8] antialiased font-sans overflow-x-hidden"
        onContextMenu={handleContextMenu}
      >
        <SkipToContent />
        <ScrollProgress />
        <CursorGlow />
        <Navbar isLoaded={isLoaded} />
        
        <main id="main-content" className="outline-none overflow-x-hidden">
          <Hero isLoaded={isLoaded} />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <ProfessionalCertifications />
          <Publications />
          <AdditionalCertifications />
          <GitHub />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
}
