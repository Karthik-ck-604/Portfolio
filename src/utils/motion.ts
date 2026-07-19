export const easeOutQuint: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: easeOutQuint,
    },
  }),
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration || 0.5,
      delay: custom.delay || 0,
      ease: "easeOut",
    },
  }),
};

export const blurReveal = {
  initial: { opacity: 0, filter: "blur(10px)", y: 20 },
  animate: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: custom.duration || 0.8,
      delay: custom.delay || 0,
      ease: easeOutQuint,
    },
  }),
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration || 0.5,
      delay: custom.delay || 0,
      ease: easeOutQuint,
    },
  }),
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: easeOutQuint,
    },
  }),
};

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: easeOutQuint,
    },
  }),
};

export const staggerContainer = {
  initial: {},
  animate: (custom: { staggerChildren?: number; delayChildren?: number } = {}) => ({
    transition: {
      staggerChildren: custom.staggerChildren || 0.1,
      delayChildren: custom.delayChildren || 0,
    },
  }),
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutQuint,
    },
  },
};

export const hoverSpring = {
  hover: {
    y: -4,
    scale: 1.01,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};
