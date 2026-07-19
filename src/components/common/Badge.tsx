import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export const Badge: React.FC<BadgeProps> = ({ children, className, variant = "primary" }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border font-sans select-none",
        variant === "primary"
          ? "border-[#DC2626] bg-[rgba(220,38,38,0.1)] text-[#F8F8F8]"
          : "border-[#2A2A2A] bg-[#0F0F0F] text-[#A8A8A8]",
        className
      )}
    >
      {children}
    </span>
  );
};
