"use client";

import { motion } from "framer-motion";
import { staggerContainer, scrollAnimationProps } from "@/lib/animations";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}

export function AnimatedSection({
  id,
  children,
  className = "",
  stagger = true,
}: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      variants={stagger ? staggerContainer : undefined}
      {...scrollAnimationProps}
    >
      {children}
    </motion.section>
  );
}
