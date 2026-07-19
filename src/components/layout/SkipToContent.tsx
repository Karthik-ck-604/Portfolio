import React from "react";

export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#DC2626] focus:text-[#F8F8F8] focus:border focus:border-[#DC2626] focus:rounded-full focus:font-semibold focus:outline-none focus:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300"
    >
      Skip to content
    </a>
  );
};
