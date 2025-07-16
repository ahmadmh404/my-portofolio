"use client";

import { motion } from "framer-motion";
import { cardHover, staggerItem } from "@/lib/animations";
import type { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function AnimatedCard({
  children,
  className = "",
  hover = true,
  delay = 0,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      variants={staggerItem}
      whileHover={hover ? cardHover.hover : undefined}
      whileTap={hover ? cardHover.tap : undefined}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
