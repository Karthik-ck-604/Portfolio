import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";
import logoImg from "@/logo.png";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionIds = ["hero", "about", "skills", "experience", "projects", "certifications", "publications", "contact"];
  const activeSection = useActiveSection(sectionIds);

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Certifications", id: "certifications" },
    { label: "Publications", id: "publications" },
    { label: "Contact", id: "contact" }
  ];

  // Close drawer on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
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

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 bg-transparent"
      >
        {/* Logo Monogram */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "hero")}
          className="flex items-center outline-none focus-visible:ring-1 focus-visible:ring-[#DC2626] rounded-md p-1 group"
          aria-label="Karthikeyan C Portfolio Home"
        >
          <img
            src={logoImg}
            alt="KC Logo"
            className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Center Desktop Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={cn(
                  "relative text-sm font-semibold tracking-wide font-sans outline-none py-2 transition-colors focus-visible:ring-1 focus-visible:ring-[#DC2626] rounded-md px-2",
                  isActive ? "text-[#DC2626]" : "text-[#A8A8A8] hover:text-[#F8F8F8]"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#DC2626]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:block">
          <Button
            href="/cert_oracle.png" // Local certificate mapping as fallback download path
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="sm"
            magnetic={true}
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            ariaLabel="Download Resume PDF"
          >
            Resume
          </Button>
        </div>

        {/* Mobile Hamburguer */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden items-center justify-center w-10 h-10 text-[#F8F8F8] hover:text-[#DC2626] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] rounded-full"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#050505] z-50 md:hidden"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#0F0F0F] border-l border-[#2A2A2A] z-50 flex flex-col px-8 py-10 md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-heading font-bold text-[#F8F8F8]">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#A8A8A8] hover:text-[#F8F8F8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] rounded-full"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-6" aria-label="Mobile Links">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className={cn(
                        "text-lg font-semibold tracking-wide font-sans py-1 outline-none transition-colors focus-visible:text-[#DC2626]",
                        isActive ? "text-[#DC2626]" : "text-[#A8A8A8] hover:text-[#F8F8F8]"
                      )}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-auto">
                <Button
                  href="/cert_oracle.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="w-full"
                  ariaLabel="Download Resume PDF"
                >
                  Download Resume
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
