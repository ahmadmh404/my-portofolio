"use client";

import type { Variants, Transition } from "framer-motion";

// Animation timing configurations
export const animationTimings = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
};

// Easing configurations - using correct Framer Motion easing types
export const easings = {
  smooth: "easeInOut" as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  elastic: [0.175, 0.885, 0.32, 1.275] as const,
  sharp: [0.4, 0, 0.2, 1] as const,
};

// Base transition configurations
export const transitions: Record<string, Transition> = {
  smooth: {
    duration: animationTimings.normal,
    ease: easings.smooth,
  },
  bounce: {
    duration: animationTimings.slow,
    ease: easings.bounce,
  },
  elastic: {
    duration: animationTimings.slow,
    ease: easings.elastic,
  },
  spring: {
    type: "spring",
    stiffness: 100,
    damping: 15,
  },
  springBounce: {
    type: "spring",
    stiffness: 200,
    damping: 10,
  },
};

// Fade animations
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// Slide animations
export const slideVariants = {
  up: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  },
  down: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  },
  left: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },
  right: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },
};

// Scale animations
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// Rotation animations
export const rotateVariants: Variants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: 180 },
};

// Stagger container animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Card hover animations
export const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -5,
    transition: transitions.spring,
  },
  tap: { scale: 0.98 },
};

// Button animations
export const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  loading: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

// Text reveal animations
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: easings.smooth,
    },
  }),
};

// Typing animation
export const typingVariants: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "auto",
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

// Progress bar animation
export const progressVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: (progress: number) => ({
    scaleX: progress / 100,
    transition: {
      duration: 1,
      ease: easings.smooth,
    },
  }),
};

// Floating animation
export const floatingVariants: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

// Pulse animation
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

// Custom animation builder function
export interface AnimationConfig {
  type: "fade" | "slide" | "scale" | "rotate" | "custom";
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  stagger?: boolean;
  staggerDelay?: number;
  ease?: keyof typeof easings;
  spring?: boolean;
  hover?: boolean;
  tap?: boolean;
  custom?: Variants;
}

export const createAnimation = (config: AnimationConfig): Variants => {
  const {
    type,
    direction = "up",
    duration = animationTimings.normal,
    delay = 0,
    ease = "smooth",
    spring = false,
    hover = false,
    tap = false,
    custom,
  } = config;

  let baseVariants: Variants = {};

  // Select base animation type
  switch (type) {
    case "fade":
      baseVariants = fadeVariants;
      break;
    case "slide":
      baseVariants = slideVariants[direction];
      break;
    case "scale":
      baseVariants = scaleVariants;
      break;
    case "rotate":
      baseVariants = rotateVariants;
      break;
    case "custom":
      baseVariants = custom || fadeVariants;
      break;
    default:
      baseVariants = fadeVariants;
  }

  // Create transition with proper typing
  const transition: Transition = spring
    ? transitions.spring
    : {
        duration,
        delay,
        ease: easings[ease],
      };

  // Build final variants
  const variants: Variants = {
    ...baseVariants,
    visible: {
      ...baseVariants.visible,
      transition,
    },
  };

  // Add hover and tap states if requested
  if (hover) {
    variants.hover = scaleVariants.hover;
  }

  if (tap) {
    variants.tap = scaleVariants.tap;
  }

  return variants;
};

// Preset animation configurations
export const presetAnimations = {
  fadeIn: createAnimation({ type: "fade" }),
  slideUp: createAnimation({ type: "slide", direction: "up" }),
  slideDown: createAnimation({ type: "slide", direction: "down" }),
  slideLeft: createAnimation({ type: "slide", direction: "left" }),
  slideRight: createAnimation({ type: "slide", direction: "right" }),
  scaleIn: createAnimation({ type: "scale", spring: true }),
  rotateIn: createAnimation({
    type: "rotate",
    duration: animationTimings.slow,
  }),
  bounceIn: createAnimation({ type: "scale", ease: "bounce" }),
  elasticIn: createAnimation({
    type: "slide",
    direction: "up",
    ease: "elastic",
  }),
  cardHover: createAnimation({ type: "scale", hover: true, tap: true }),
};

// Animation hook for scroll-triggered animations
export const scrollAnimationProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-100px" },
};
