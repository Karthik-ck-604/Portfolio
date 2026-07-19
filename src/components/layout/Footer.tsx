import React, { useState, useEffect } from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import logoImg from "@/logo.png";

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const footerLinks = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Publications", id: "publications" },
    { label: "Certifications", id: "certifications" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <footer className="relative border-t border-[#2A2A2A] bg-[#050505] py-12 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        
        {/* Top Logo & Links */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "hero")}
            className="flex items-center outline-none focus-visible:ring-1 focus-visible:ring-[#DC2626] rounded-md p-1 group"
          >
            <img
              src={logoImg}
              alt="KC Logo"
              className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer Secondary Links">
            {footerLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="text-xs font-semibold tracking-wider font-sans uppercase text-[#A8A8A8] hover:text-[#F8F8F8] outline-none transition-colors focus-visible:text-[#DC2626]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Middle Social Icons */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-[#2A2A2A] rounded-full text-[#A8A8A8] hover:text-[#F8F8F8] hover:border-[#DC2626] hover:bg-[rgba(220,38,38,0.05)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#DC2626] outline-none"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-[#2A2A2A] rounded-full text-[#A8A8A8] hover:text-[#F8F8F8] hover:border-[#DC2626] hover:bg-[rgba(220,38,38,0.05)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#DC2626] outline-none"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:karthikeyanc.cse@gmail.com"
            className="w-10 h-10 flex items-center justify-center border border-[#2A2A2A] rounded-full text-[#A8A8A8] hover:text-[#F8F8F8] hover:border-[#DC2626] hover:bg-[rgba(220,38,38,0.05)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#DC2626] outline-none"
            aria-label="Email Address"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Bottom copyright details */}
        <div className="w-full border-t border-[#2A2A2A]/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-xs text-[#A8A8A8] font-sans">
            &copy; {new Date().getFullYear()} Karthikeyan C. All Rights Reserved.
          </p>
          <p className="text-xs text-[#A8A8A8]/60 font-sans">
            Designed & Developed by Karthikeyan C. Built with React + TypeScript + Tailwind.
          </p>
        </div>
      </div>

      {/* Floating Scroll to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 w-11 h-11 bg-[#161616] border border-[#2A2A2A] rounded-full text-[#F8F8F8] hover:text-[#F8F8F8] hover:bg-[#DC2626] hover:border-[#DC2626] flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
            aria-label="Scroll to top of the page"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
