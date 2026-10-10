"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Button from "@/components/ui/Button";
import { Z } from "@/lib/z";
import InViewVideo from "./InViewVideo";
import useIsDesktop from "./useIsDesktop";

type Props = {
  src: string;
  caption: string;
  caseStudyHref: string;
};

function Copy({ caption, caseStudyHref }: Omit<Props, "src">) {
  return (
    <div className="mx-auto w-full max-w-[1320px] px-5 pb-10 sm:px-8 md:pb-16 lg:px-12">
      <h2 className="max-w-[14ch] font-display text-[clamp(2.75rem,8vw,7rem)] font-800 uppercase leading-[0.9] tracking-[-0.01em] text-phosphor">
        It walks. On real hardware, untethered.
      </h2>
      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-[52ch] text-[15px] leading-relaxed text-phosphor/85 md:text-[17px]">
          {caption}
        </p>
        <Button href={caseStudyHref} variant="ghost" className="self-start sm:self-auto">
          Read case study
        </Button>
      </div>
    </div>
  );
}

/**
 * Zoom-parallax footage: the clip starts as an inset chamfered plate and grows
 * to full bleed while its tall parent scrolls past a sticky viewport.
 */
export default function ZoomFootage({ src, caption, caseStudyHref }: Props) {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const from = isDesktop ? 0.7 : 0.88;
  const scale = useTransform(scrollYProgress, [0, 0.65], [from, 1]);
  const cut = useTransform(scrollYProgress, [0, 0.65], [isDesktop ? 26 : 14, 0]);
  const clipPath = useMotionTemplate`polygon(${cut}px 0, 100% 0, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, 0 100%, 0 ${cut}px)`;
  const scrim = useTransform(scrollYProgress, [0, 0.3], [0.85, 1]);
  const copyY = useTransform(scrollYProgress, [0.1, 0.4], [32, 0]);

  const label = `Hexabot V2 footage: ${caption}`;

  if (reduce) {
    return (
      <div className="relative min-h-[80dvh] overflow-hidden bg-void">
        <InViewVideo
          src={src}
          label={label}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--color-void)_0%,rgb(8_11_16/0.85)_40%,rgb(8_11_16/0.3)_100%)]"
        />
        <div className="relative flex min-h-[80dvh] items-end" style={{ zIndex: Z.raised }}>
          <Copy caption={caption} caseStudyHref={caseStudyHref} />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[140vh] md:h-[200vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div aria-hidden className="bg-blueprint absolute inset-0 opacity-40" />
        <motion.div
          className="absolute inset-0 overflow-hidden bg-hull will-change-transform"
          style={{ scale, clipPath }}
        >
          <InViewVideo
            src={src}
            label={label}
            threshold={0.15}
            className="h-full w-full object-cover"
          />
          <motion.div
            aria-hidden
            style={{ opacity: scrim }}
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--color-void)_0%,rgb(8_11_16/0.88)_32%,rgb(8_11_16/0.45)_62%,transparent_100%)]"
          />
          <motion.div
            aria-hidden
            style={{ opacity: scrim }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void/70 via-void/25 to-transparent"
          />
        </motion.div>
        <motion.div
          className="absolute inset-x-0 bottom-0"
          style={{ y: copyY, zIndex: Z.raised }}
        >
          <Copy caption={caption} caseStudyHref={caseStudyHref} />
        </motion.div>
      </div>
    </div>
  );
}
