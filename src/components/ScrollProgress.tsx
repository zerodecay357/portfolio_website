"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { Z } from "@/lib/z";

// Thin servo-yellow bar along the top edge showing how far down the page you are.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 h-[2px] origin-left bg-servo"
      style={{ scaleX, zIndex: Z.progress }}
    />
  );
}
