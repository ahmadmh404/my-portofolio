"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import type { ReactNode } from "react";

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode;
  loading?: boolean;
  className?: string;
}

export function AnimatedButton({
  children,
  loading = false,
  className = "",
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate={loading ? "loading" : "rest"}
    >
      <Button
        {...props}
        variant={props.variant}
        onClick={props.onClick}
        className={className}
      >
        {children}
      </Button>
    </motion.div>
  );
}
