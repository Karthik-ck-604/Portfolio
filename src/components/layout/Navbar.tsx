import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollCollapse } from "@/hooks/useScrollCollapse";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/scrollToSection";
import { socialLinks } from "@/data/socials";

const logoImg = "/static/logo.png";

interface NavbarProps {
  isLoaded?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoaded = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  
  const sectionIds = ["hero", "about", "skills", "experience", "projects", "certifications", "publications", "contact"];
  const activeSection = useActiveSection(sectionIds);
  const githubUrl = socialLinks.find((link) => link.name === "GitHub")?.url;

  // Custom hook managing scroll threshold hysteresis (80px collapse / 40px expand) and debounced hover expansion
  const {
    isScrolled,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useScrollCollapse(80, 40);

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Certifications", id: "certifications" },
    { label: "Publications", id: "publications" },
    { label: "Contact", id: "contact" }
  ];

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Body scroll lock while mobile menu is open
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

  // Close mobile menu on Escape key press
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
    scrollToSection(id);
  };

  // Desktop states: "top" (Full-bleed liquid glass), "collapsed" (Compact Dynamic Island), "expandedPill" (Hover-expanded pill)
  const isDesktopCollapsed = isScrolled && !isHovered;
  const desktopState = !isLoaded
    ? "hidden"
    : !isScrolled
    ? "top"
    : isHovered
    ? "expandedPill"
    : "collapsed";

  const containerVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    // STATE 1: Fully transparent — no fill, no blur, no border, no shadow.
    // Only the logo/links/buttons are visible; the container itself is invisible.
    top: {
      y: 0,
      opacity: 1,
      width: "100%",
      maxWidth: "100%",
      borderRadius: "0px",
      paddingLeft: "32px",
      paddingRight: "32px",
      paddingTop: "16px",
      paddingBottom: "16px",
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(0px)",
      WebkitBackdropFilter: "blur(0px)",
      borderTopColor: "rgba(255, 255, 255, 0)",
      borderBottomColor: "rgba(255, 255, 255, 0)",
      borderLeftColor: "rgba(255, 255, 255, 0)",
      borderRightColor: "rgba(255, 255, 255, 0)",
      boxShadow: "0 0 0px rgba(0,0,0,0)",
    },
    // STATE 2: Compact pill. Small, tight & sleek capsule around contents.
    collapsed: {
      y: 12,
      opacity: 1,
      width: "176px",
      maxWidth: "184px",
      borderRadius: "9999px",
      paddingLeft: "12px",
      paddingRight: "12px",
      paddingTop: "6px",
      paddingBottom: "6px",
      backgroundColor: "rgba(5, 7, 10, 0.22)",
      backdropFilter: "blur(14px) saturate(160%)",
      WebkitBackdropFilter: "blur(14px) saturate(160%)",
      borderTopColor: "rgba(255, 255, 255, 0.15)",
      borderBottomColor: "rgba(255, 255, 255, 0.15)",
      borderLeftColor: "rgba(255, 255, 255, 0.15)",
      borderRightColor: "rgba(255, 255, 255, 0.15)",
      boxShadow: "0 8px 32px -8px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255,255,255,0.05) inset",
    },
    // STATE 3: Hover-expand pill. Same transparency + crimson-tinted border.
    expandedPill: {
      y: 12,
      opacity: 1,
      width: "92%",
      maxWidth: "1020px",
      borderRadius: "9999px",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "8px",
      paddingBottom: "8px",
      backgroundColor: "rgba(5, 7, 10, 0.22)",
      backdropFilter: "blur(14px) saturate(160%)",
      WebkitBackdropFilter: "blur(14px) saturate(160%)",
      borderTopColor: "rgba(220, 38, 38, 0.35)",
      borderBottomColor: "rgba(220, 38, 38, 0.35)",
      borderLeftColor: "rgba(220, 38, 38, 0.35)",
      borderRightColor: "rgba(220, 38, 38, 0.35)",
      boxShadow: "0 8px 32px -8px rgba(0, 0, 0, 0.45), 0 0 18px rgba(220, 38, 38, 0.18)",
    },
  };

  // Spring motion — same config drives both collapse and expand for symmetry.
  // Border color/opacity interpolates as part of the same spring, never snaps.
  const containerTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 30,
    // Tween overrides for color/filter so they interpolate smoothly
    backgroundColor: { type: "tween" as const, duration: 0.38, ease: "easeInOut" },
    backdropFilter: { type: "tween" as const, duration: 0.38, ease: "easeInOut" },
    borderTopColor: { type: "tween" as const, duration: 0.38, ease: "easeInOut" },
    borderBottomColor: { type: "tween" as const, duration: 0.38, ease: "easeInOut" },
    borderLeftColor: { type: "tween" as const, duration: 0.38, ease: "easeInOut" },
    borderRightColor: { type: "tween" as const, duration: 0.38, ease: "easeInOut" },
    boxShadow: { type: "tween" as const, duration: 0.38, ease: "easeInOut" },
  };

  return (
    <>
      {/* Outer fixed container anchored to top center */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none w-full">
        <motion.header
          ref={headerRef}
          layout
          variants={containerVariants}
          initial="hidden"
          animate={desktopState}
          transition={containerTransition}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={isScrolled ? 0 : undefined}
          className={cn(
            "relative flex items-center justify-between border border-solid pointer-events-auto transition-colors focus:outline-none",
            !isScrolled ? "w-full max-w-full" : "top-0"
          )}
        >
          {/* Logo Monogram */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "hero")}
            data-cursor="pointer"
            className="flex items-center shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-[#DC2626] rounded-md p-1 group"
            aria-label="Karthikeyan C Portfolio Home"
          >
            <img
              src={logoImg}
              alt="CK Logo"
              draggable={false}
              className={cn(
                "object-contain transition-all duration-300 group-hover:scale-105",
                isDesktopCollapsed ? "w-8 h-8 sm:w-8 sm:h-8" : "w-9 h-9 sm:w-10 sm:h-10"
              )}
            />
          </a>

          {/* Desktop Links — State 1 (Top Liquid Glass) & State 3 (Hover-Expanded Pill) */}
          <AnimatePresence mode="wait">
            {(!isScrolled || isHovered) && (
              <motion.nav
                key="desktop-links"
                initial={{ opacity: 0, scale: 0.92, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: "auto" }}
                exit={{ opacity: 0, scale: 0.92, width: 0 }}
                transition={{
                  duration: 0.28,
                  ease: "easeInOut",
                  delay: isScrolled ? 0.05 : 0, // Slight trailing delay to settle container first
                }}
                className="hidden lg:flex items-center gap-3 lg:gap-5 xl:gap-7 overflow-hidden whitespace-nowrap"
                aria-label="Main Navigation"
              >
                <LayoutGroup id="navUnderline">
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
                          "relative text-xs xl:text-sm font-semibold tracking-wide font-sans outline-none py-1.5 px-2.5 transition-colors focus-visible:ring-1 focus-visible:ring-[#DC2626] rounded-md",
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
                </LayoutGroup>
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Desktop Right CTA Button (GitHub Redirect) */}
          {githubUrl && (
            <div className="hidden lg:block shrink-0">
              <Button
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant={isDesktopCollapsed ? "primary" : "secondary"}
                size="sm"
                magnetic={true}
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                ariaLabel="Visit GitHub profile"
                data-cursor="pointer"
                className={cn(
                  "transition-all duration-300 min-h-[38px] px-4",
                  isDesktopCollapsed && "px-3 py-1.5 text-xs bg-[#DC2626] text-white hover:bg-[#EF4444] rounded-full min-h-[30px] h-[30px]"
                )}
              >
                GitHub
              </Button>
            </div>
          )}

          {/* Mobile Hamburger Button with Smooth Icon Morph */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-cursor="pointer"
            className="flex lg:hidden items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 text-[#F8F8F8] hover:text-[#DC2626] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] rounded-full z-50"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? "close-icon" : "menu-icon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-6 h-6 text-[#F8F8F8]" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </motion.header>
      </div>

      {/* PART A — FIX 3: MOBILE FULL-SCREEN TOP-TO-BOTTOM TAKEOVER MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100dvh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 left-0 w-screen h-screen h-[100dvh] bg-[#05070a]/95 backdrop-blur-2xl z-40 flex flex-col justify-between px-6 sm:px-10 pt-24 pb-12 lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Staggered Full-Screen Nav Links */}
            <nav className="flex flex-col gap-4 my-auto max-w-lg mx-auto w-full" aria-label="Mobile Links">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.12 + idx * 0.05, duration: 0.3, ease: "easeOut" }}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    data-cursor="pointer"
                    className={cn(
                      "text-2xl sm:text-3xl font-bold tracking-tight font-sans py-3 px-4 rounded-2xl outline-none transition-all flex items-center justify-between min-h-[52px] focus-visible:ring-2 focus-visible:ring-[#DC2626]",
                      isActive
                        ? "bg-[rgba(220,38,38,0.15)] text-[#DC2626]"
                        : "text-[#A8A8A8] hover:text-[#F8F8F8] hover:bg-[#161616]"
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse" />}
                  </motion.a>
                );
              })}
            </nav>

            {/* Bottom GitHub Button inside mobile full-screen overlay */}
            {githubUrl && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.12 + navLinks.length * 0.05, duration: 0.3 }}
                className="mt-6 pt-6 border-t border-[#2A2A2A] max-w-lg mx-auto w-full"
              >
                <Button
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="w-full min-h-[48px] text-base"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                  ariaLabel="Visit GitHub profile"
                  data-cursor="pointer"
                >
                  GitHub
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
