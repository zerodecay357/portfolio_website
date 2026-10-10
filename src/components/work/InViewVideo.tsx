"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Muted, looping video that only plays while it is on screen.
 * Nothing downloads beyond metadata until the clip first scrolls into view,
 * so a page with several of these never fetches them all at once.
 * Under reduced motion it never autoplays and exposes native controls instead.
 */
export default function InViewVideo({
  src,
  label,
  className = "",
  threshold = 0.35,
  poster,
}: {
  src: string;
  poster?: string;
  label: string;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rejects if the browser blocks it; the poster frame stays.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.pause();
    };
  }, [reduce, threshold]);

  return (
    <video
      ref={ref}
      src={src}
      // Posters live at /media/posters/<clip name>.jpg, taken from a frame
      // mid-clip so tiles never sit on a black first frame.
      poster={poster ?? `/media/posters/${src.split("/").pop()!.replace(/\.mp4$/, ".jpg")}`}
      aria-label={label}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      controls={!!reduce}
    />
  );
}
