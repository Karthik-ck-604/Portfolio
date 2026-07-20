import React, { useState, useEffect } from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const logoImg = "/assets/logo.png";

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const footerLinks = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Publications", id: "publications" },
    { label: "Certifications", id: "certifications" },
    { label: "Contact", id: "contact" },
  ];

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/Karthik-ck-604",
      icon: <Github className="w-4 h-4" />,
      ariaLabel: "GitHub Profile",
    },
    {
      label: "LinkedIn",
      href: "https://https://linkedin.com/in/karthikeyan-cfsd",
      icon: <Linkedin className="w-4 h-4" />,
      ariaLabel: "LinkedIn Profile",
    },
    {
      label: "Email",
      href: "mailto:karthikeyan610204@gmail.com",
      icon: <Mail className="w-4 h-4" />,
      ariaLabel: "Send Email",
    },
  ];

  return (
    <footer className="relative border-t border-[#1E1E1E] bg-[#0D0D0D] overflow-hidden">

      {/* Subtle top gradient glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#DC2626]/30 to-transparent pointer-events-none" />

      {/* ── Main 3-column section ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-12 sm:pt-14 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8">

          {/* ── Column 1: Logo + tagline ── */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, "hero")}
              data-cursor="pointer"
              className="group flex items-center gap-2.5 outline-none focus-visible:ring-1 focus-visible:ring-[#DC2626] rounded-md p-1 -ml-1"
              aria-label="Scroll to top"
            >
              <img
                src={logoImg}
                alt="CK Logo"
                draggable={false}
                className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </a>

            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-[#F0F0F0] font-semibold text-sm tracking-wide">
                Karthikeyan C
              </span>
              <span className="text-[#888888] text-xs font-mono tracking-widest uppercase">
                Full-Stack Developer
              </span>
            </div>

            <p className="text-[#666666] text-[11px] leading-relaxed font-sans text-center md:text-left max-w-[200px]">
              Building robust web experiences with modern technologies.
            </p>
          </div>

          {/* ── Column 2: Navigation links ── */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-[#D0D0D0] text-xs font-semibold tracking-[0.2em] uppercase font-mono">
              Navigation
            </h3>
            {/* Two-column link grid */}
            <nav
              aria-label="Footer Navigation"
              className="grid grid-cols-2 gap-x-8 gap-y-2.5 w-full max-w-[260px]"
            >
              {footerLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  data-cursor="pointer"
                  className="group flex items-center gap-1.5 text-[#888888] hover:text-[#F0F0F0] transition-colors duration-200 outline-none focus-visible:text-[#DC2626] text-xs font-medium tracking-wide"
                >
                  {/* Red dot indicator */}
                  <span className="w-1 h-1 rounded-full bg-[#DC2626]/40 group-hover:bg-[#DC2626] transition-colors duration-200 shrink-0" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Column 3: Let's Connect ── */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-[#D0D0D0] text-xs font-semibold tracking-[0.2em] uppercase font-mono">
              Let's Connect
            </h3>
            <p className="text-[#666666] text-[11px] leading-relaxed font-sans text-center md:text-left">
              Open to opportunities, collaborations, and conversations.
            </p>

            {/* Social icons with labels */}
            <div className="flex flex-col gap-2.5 w-full">
              {socials.map(({ label, href, icon, ariaLabel }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={ariaLabel}
                  data-cursor="pointer"
                  className="group flex items-center gap-3 w-fit outline-none focus-visible:ring-1 focus-visible:ring-[#DC2626] rounded-md"
                >
                  <span className="w-8 h-8 flex items-center justify-center border border-[#2A2A2A] rounded-full text-[#888888] group-hover:text-[#F0F0F0] group-hover:border-[#DC2626] group-hover:bg-[#DC2626]/10 group-hover:scale-110 transition-all duration-250">
                    {icon}
                  </span>
                  <span className="text-[#888888] group-hover:text-[#F0F0F0] text-xs font-medium tracking-wide transition-colors duration-200">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div className="border-t border-[#1A1A1A] max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-[#707070] text-[11px] font-sans">
            &copy; {new Date().getFullYear()} Karthikeyan C. All Rights Reserved.
          </p>
          <p className="text-[#4A4A4A] text-[11px] font-sans">
            Designed &amp; Developed by Karthikeyan C.&nbsp;&nbsp;·&nbsp;&nbsp;Built with React + TypeScript + Tailwind
          </p>
        </div>
      </div>

      {/* ── Floating Back-to-Top Button ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.75, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleScrollToTop}
            data-cursor="pointer"
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 min-w-12 h-12 w-12 bg-[#DC2626] hover:bg-[#B91C1C] border border-[#DC2626] hover:border-[#B91C1C] rounded-full text-white flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(220,38,38,0.35)] hover:shadow-[0_6px_24px_rgba(220,38,38,0.5)] transition-all duration-250 z-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2 focus-visible:ring-offset-black group"
            aria-label="Scroll to top of the page"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
