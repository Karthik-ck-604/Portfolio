import { useState, useEffect } from "react";
import { animate } from "framer-motion";

export function useAnimatedCounter(from: number, to: number, duration = 1.5, delay = 0) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = animate(from, to, {
        duration,
        ease: [0.16, 1, 0.3, 1], // easeOutQuint equivalent
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [from, to, duration, delay]);

  return count;
}
