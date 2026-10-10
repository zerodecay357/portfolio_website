"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

// In frameloop="demand" (reduced motion), keep rendering for a few frames
// so the environment bake, contact shadows and reflector settle into the still.
export default function Settle({ active, frames = 20 }: { active: boolean; frames?: number }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!active) return;
    let n = 0;
    let id = 0;
    const tick = () => {
      invalidate();
      if (++n < frames) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [active, frames, invalidate]);
  return null;
}
