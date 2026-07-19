import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverGlow?: boolean;
  borderAccentOnHover?: boolean;
  translateOnHover?: boolean;
  animateIn?: boolean;
  delay?: number;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      children,
      hoverGlow = true,
      borderAccentOnHover = true,
      translateOnHover = true,
      animateIn = false,
      delay = 0,
      ...props
    },
    ref
  ) => {
    const cardStyles = cn(
      "relative bg-[rgba(22,22,22,0.7)] backdrop-blur-md border border-[#2A2A2A] rounded-[20px] transition-all duration-300 ease-out overflow-hidden",
      borderAccentOnHover && "hover:border-[#DC2626]",
      translateOnHover && "hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)]",
      hoverGlow && "hover:shadow-[0_0_30px_0px_rgba(220,38,38,0.08)]",
      className
    );

    if (animateIn) {
      return (
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
          className={cardStyles}
          {...(props as any)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={cardStyles} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
