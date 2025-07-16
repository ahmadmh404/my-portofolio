"use client";

import { motion } from "framer-motion";
import { textReveal } from "@/lib/animations";
import type { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export function AnimatedText({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: AnimatedTextProps) {
  if (stagger && typeof children === "string") {
    return (
      <div className={className}>
        {children.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={textReveal}
            custom={i}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    );
  }

  return (
    <motion.div className={className} variants={textReveal} custom={delay}>
      {children}
    </motion.div>
  );
}
