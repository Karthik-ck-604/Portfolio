import { useCallback, useState, useEffect } from "react";
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
import { LoadingScreen } from "@/components/common/LoadingScreen";

// Session gate key — loader plays once per browser session, then skipped
// for every in-session route change. A new tab / reopened browser plays again.
const LOADER_SEEN_KEY = "ck-intro-seen";

export default function App() {
  // Always show loader on page load / refresh as requested
  const [showLoader, setShowLoader] = useState(true);

  // Once the loader is gone the whole page is "loaded" — hero + navbar drive
  // their own entrance animations off this flag.
  const isLoaded = !showLoader;

  useEffect(() => {
    // Lock scrolling while the cinematic intro plays.
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
  }, []);

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

  const handleAssetContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest("img, .document-viewer")) {
      event.preventDefault();
    }
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

      <AnimatePresence>
        {showLoader && <LoadingScreen onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <div className="min-h-screen bg-[#050505] text-[#F8F8F8] antialiased font-sans overflow-x-hidden" onContextMenu={handleAssetContextMenu}>
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
