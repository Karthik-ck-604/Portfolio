import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, LayoutGroup } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";
import logoImg from "@/logo.png";

interface NavbarProps {
  isLoaded?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoaded = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const sectionIds = ["hero", "about", "skills", "experience", "projects", "certifications", "publications", "contact"];
  const activeSection = useActiveSection(sectionIds);
  const { scrollY } = useScroll();

  // Track scroll position dynamically with Framer Motion (optimized, updates state only on state changes)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldScroll = latest > 60;
    setIsScrolled((prev) => (prev !== shouldScroll ? shouldScroll : prev));
  });

  // Sync scroll state on mount (critical for page refreshes)
  useEffect(() => {
    setIsScrolled(window.scrollY > 60);
  }, []);

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
      if (window.innerWidth >= 1024) {
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

  // Explicit fluid variant configuration
  const headerVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    top: {
      y: 0,
      opacity: 1,
      width: "100%",
      maxWidth: "100%",
      borderRadius: "0px",
      height: "80px",
      paddingTop: "20px",
      paddingBottom: "20px",
      backgroundColor: "rgba(5, 5, 5, 0)", // mostly transparent
      backdropFilter: "blur(0px)",
      borderTopColor: "rgba(0, 0, 0, 0)",
      borderBottomColor: "rgba(26, 26, 26, 0.6)", // bottom hairline
      borderLeftColor: "rgba(0, 0, 0, 0)",
      borderRightColor: "rgba(0, 0, 0, 0)",
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
    scrolled: {
      y: 16, // top-4 equivalent
      opacity: 1,
      width: "90%",
      maxWidth: "1280px",
      borderRadius: "9999px", // rounded-full pill
      height: "64px",
      paddingTop: "10px",
      paddingBottom: "10px",
      backgroundColor: "rgba(15, 15, 15, 0.6)", // semi-transparent dark background
      backdropFilter: "blur(8px)",
      borderTopColor: "rgba(255, 255, 255, 0.06)", // 1px hairline border all-around
      borderBottomColor: "rgba(255, 255, 255, 0.06)",
      borderLeftColor: "rgba(255, 255, 255, 0.06)",
      borderRightColor: "rgba(255, 255, 255, 0.06)",
      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)", // subtle drop shadow
    }
  };

  const headerTransition = {
    // Layout properties use spring physics
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    // Styling properties use smooth tween
    backgroundColor: { type: "tween" as const, ease: "easeOut", duration: 0.35 },
    backdropFilter: { type: "tween" as const, ease: "easeOut", duration: 0.35 },
    borderTopColor: { type: "tween" as const, ease: "easeOut", duration: 0.35 },
    borderBottomColor: { type: "tween" as const, ease: "easeOut", duration: 0.35 },
    borderLeftColor: { type: "tween" as const, ease: "easeOut", duration: 0.35 },
    borderRightColor: { type: "tween" as const, ease: "easeOut", duration: 0.35 },
    boxShadow: { type: "tween" as const, ease: "easeOut", duration: 0.35 },
  };

  const animateState = !isLoaded ? "hidden" : (isScrolled ? "scrolled" : "top");

  return (
    <>
      {/* Outer fixed container to guarantee horizontal centering */}
      <div className="fixed top-3 left-0 right-0 z-50 flex justify-center pointer-events-none px-3 sm:px-4 md:px-6">
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate={animateState}
          transition={headerTransition}
          className="flex w-[calc(100%-0.75rem)] sm:w-[calc(100%-1.5rem)] max-w-7xl items-center justify-between px-3 sm:px-4 lg:px-6 py-3 md:py-4 border border-solid pointer-events-auto rounded-full"
        >
          {/* Logo Monogram */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "hero")}
            data-cursor="pointer"
            className="flex items-center outline-none focus-visible:ring-1 focus-visible:ring-[#DC2626] rounded-md p-1 group"
            aria-label="Karthikeyan C Portfolio Home"
          >
            <img
              src={logoImg}
              alt="CK Logo"
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Center Desktop Links - Wrapped in LayoutGroup to scope layoutId projection */}
          <LayoutGroup id="navUnderline">
            <nav className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    layout
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    data-cursor="pointer"
                    className={cn(
                      "relative text-sm font-semibold tracking-wide font-sans outline-none py-2 transition-colors focus-visible:ring-1 focus-visible:ring-[#DC2626] rounded-md px-2",
                      isActive ? "text-[#DC2626]" : "text-[#A8A8A8] hover:text-[#F8F8F8]"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeUnderline"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#DC2626] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>
          </LayoutGroup>

          {/* Right CTA Button */}
          <div className="hidden lg:block">
            <Button
              href="/cert_oracle.png" // Local certificate mapping as fallback download path
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              magnetic={true}
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              ariaLabel="Download Resume PDF"
              data-cursor="pointer"
            >
              Resume
            </Button>
          </div>

          {/* Mobile Hamburguer */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-cursor="pointer"
            className="flex lg:hidden items-center justify-center min-w-11 h-11 w-11 text-[#F8F8F8] hover:text-[#DC2626] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] rounded-full"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.header>
      </div>

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
              className="fixed inset-0 bg-[#050505] z-50 lg:hidden"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[min(88vw,320px)] max-w-[320px] bg-[#0F0F0F] border-l border-[#2A2A2A] z-50 flex flex-col px-5 py-8 sm:px-6 sm:py-10 lg:hidden overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-heading font-bold text-[#F8F8F8]">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  data-cursor="pointer"
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
                      data-cursor="pointer"
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

              <div className="mt-auto pt-4">
                <Button
                  href="/cert_oracle.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="w-full min-h-11"
                  ariaLabel="Download Resume PDF"
                  data-cursor="pointer"
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
