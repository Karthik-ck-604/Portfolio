import React from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "style"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string; // Renders as anchor if provided
  target?: string;
  rel?: string;
  download?: boolean | string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  magnetic?: boolean;
  ariaLabel: string;
  style?: React.CSSProperties;
}

export const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      target,
      rel,
      download,
      icon,
      iconPosition = "right",
      loading = false,
      magnetic = true,
      ariaLabel,
      children,
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    // Enable magnetic effect for non-disabled buttons
    const isMagneticEnabled = magnetic && !disabled && !loading;
    const { ref: magneticRef, position } = useMagnetic(isMagneticEnabled);

    // Combine refs (since ref could be forwarded)
    const setRefs = (node: any) => {
      magneticRef.current = node;
      if (forwardedRef) {
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else {
          (forwardedRef as any).current = node;
        }
      }
    };

    const variantStyles = {
      primary:
        "bg-[#DC2626] hover:bg-[#EF4444] text-[#F8F8F8] border border-[#DC2626] shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:-translate-y-0.5",
      secondary:
        "border border-[#2A2A2A] bg-transparent text-[#F8F8F8] hover:border-[#DC2626] hover:bg-[rgba(220,38,38,0.05)]",
      ghost:
        "bg-transparent text-[#A8A8A8] hover:text-[#F8F8F8] hover:bg-[rgba(255,255,255,0.05)]",
    };

    const sizeStyles = {
      sm: "h-9 px-4 text-xs font-semibold rounded-full",
      md: "h-11 px-6 text-sm font-semibold rounded-full",
      lg: "h-14 px-8 text-base font-semibold rounded-full",
    };

    const baseStyles =
      "inline-flex items-center justify-center gap-2 select-none outline-none transition-all duration-300 font-sans tracking-wide cursor-pointer focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === "left" && (
          <span className="flex items-center transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>
        )}
        <span>{children}</span>
        {!loading && icon && iconPosition === "right" && (
          <span className="flex items-center transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>
        )}
      </>
    );

    const animateProps = isMagneticEnabled
      ? {
          animate: { x: position.x, y: position.y },
          transition: { type: "spring" as const, stiffness: 300, damping: 20 },
        }
      : {};

    if (href) {
      return (
        <motion.a
          ref={setRefs}
          href={href}
          target={target}
          rel={rel}
          download={download}
          aria-label={ariaLabel}
          className={cn(baseStyles, variantStyles[variant], sizeStyles[size], "group", className)}
          {...animateProps}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={setRefs}
        type="button"
        disabled={disabled || loading}
        aria-label={ariaLabel}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], "group", className)}
        {...animateProps}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
