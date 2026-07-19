import React from "react";
import { cn } from "@/lib/utils";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[#A8A8A8] select-none">
          {label}
        </label>
        <textarea
          id={id}
          ref={ref}
          data-cursor="text"
          className={cn(
            "w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg p-4 text-[#F8F8F8] font-sans text-base sm:text-sm min-h-[8rem] sm:min-h-[7.5rem] outline-none transition-all duration-300 placeholder-[#A8A8A8]/30 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] disabled:opacity-50 resize-y",
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

TextArea.displayName = "TextArea";
