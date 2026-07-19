import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[#A8A8A8] select-none">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          data-cursor="text"
          className={cn(
            "min-h-12 h-12 w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-[#F8F8F8] font-sans text-base sm:text-sm outline-none transition-all duration-300 placeholder-[#A8A8A8]/30 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] disabled:opacity-50",
            error && "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]",
            className
          )}
          {...props}
        />
        {error && (
          <span role="alert" className="text-xs text-[#EF4444] mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
