import React from "react";
import { cn } from "@/lib/utils";

interface TechChipProps {
  label: string;
  featured?: boolean;
}

export const TechChip: React.FC<TechChipProps> = ({ label, featured = false }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center h-8 px-4 rounded-full text-xs font-semibold font-sans tracking-wide transition-all duration-300 select-none border",
        featured
          ? "border-[#DC2626] bg-[rgba(220,38,38,0.05)] text-[#F8F8F8]"
          : "border-[#2A2A2A] bg-[#0F0F0F] text-[#A8A8A8] hover:border-[#DC2626] hover:text-[#F8F8F8]"
      )}
    >
      {label}
    </span>
  );
};
