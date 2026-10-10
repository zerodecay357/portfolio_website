"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Button from "@/components/ui/Button";
import Pill from "@/components/Pill";
import { Z } from "@/lib/z";
import InViewVideo from "./InViewVideo";
import useIsDesktop from "./useIsDesktop";

export type DossierMedia =
  | { kind: "video"; src: string; label: string; caption?: string }
  | { kind: "image"; src: string; alt: string; width: number; height: number; caption?: string };

export type Dossier = {
  slug: string;
  title: string;
  oneLiner: string;
  tags: string[];
  media: DossierMedia;
};

// Sticky offset: clears the nav, and each later plate sits a little lower so
// the top edges of the plates beneath stay visible as a stack.
const TOP = 80;
const STEP = 16;

function Media({ media }: { media: DossierMedia }) {
  return (
    <figure className="chamfer relative flex h-full min-h-[220px] flex-col overflow-hidden bg-void md:min-h-0">
      <div className="relative aspect-video md:aspect-auto md:flex-1">
        <div aria-hidden className="bg-blueprint absolute inset-0 opacity-50" />
        {media.kind === "video" ? (
          <InViewVideo
            src={media.src}
            label={media.label}
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <>
            <Image
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              sizes="(min-width: 1320px) 700px, (min-width: 768px) 55vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover object-[50%_12%]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void/80 to-transparent"
            />
          </>
        )}
      </div>
      {media.caption ? (
        <figcaption className="border-t border-conduit bg-hull-2 px-4 py-3 text-[13px] leading-snug text-fog">
          {media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Card({
  dossier,
  index,
  count,
  progress,
  animate,
}: {
  dossier: Dossier;
  index: number;
  count: number;
  progress: MotionValue<number>;
  animate: boolean;
}) {
  // This plate recedes while the next one slides up over it.
  const span = Math.max(count - 1, 1);
  const start = index / span;
  const end = (index + 1) / span;
  const isLast = index === count - 1;
  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.94]);
  const dim = useTransform(progress, [start, end], [0, isLast ? 0 : 0.6]);

  return (
    <div
      className="mb-6 last:mb-0 md:sticky md:top-0 md:mb-0 md:h-[100dvh] md:pt-[var(--dossier-top)]"
      style={{ "--dossier-top": `${TOP + index * STEP}px`, zIndex: Z.stack } as CSSProperties}
    >
      <motion.article
        className="plate relative flex flex-col md:min-h-[min(78dvh,calc(100dvh-170px))]"
        style={animate ? { scale, transformOrigin: "50% 0%" } : undefined}
      >
        <div className="plate-inner grid flex-1 gap-6 p-3 sm:p-4 md:grid-cols-12 md:gap-10 md:p-5">
          <div className="md:col-span-7">
            <Media media={dossier.media} />
          </div>
          <div className="flex flex-col justify-center gap-10 px-2 pb-3 md:col-span-5 md:px-0 md:py-6 md:pr-6">
            <div>
              <h3 className="font-display text-[clamp(2.1rem,3.4vw,3.4rem)] font-700 leading-[0.95] tracking-[-0.01em] text-phosphor">
                {dossier.title}
              </h3>
              <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-fog md:text-[16px]">
                {dossier.oneLiner}
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <ul className="flex flex-wrap gap-2" aria-label="Tags">
                {dossier.tags.map((t) => (
                  <li key={t}>
                    <Pill tone="neutral">{t}</Pill>
                  </li>
                ))}
              </ul>
              <Button href={`/projects/${dossier.slug}`} className="self-start">
                Read case study
              </Button>
            </div>
          </div>
        </div>
        {animate && !isLast ? (
          <motion.div
            aria-hidden
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 bg-void"
          />
        ) : null}
      </motion.article>
    </div>
  );
}

/**
 * Sticky stack of project dossiers. On md+ each plate pins below the nav and
 * the previous one scales back and dims as the next arrives (pinning stays
 * under reduced motion, the scale and dim do not). Below md it is a plain
 * column of plates.
 */
export default function DossierStack({ dossiers }: { dossiers: Dossier[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const animate = isDesktop && !reduce;

  return (
    <div ref={ref} className="relative">
      {dossiers.map((d, i) => (
        <Card
          key={d.slug}
          dossier={d}
          index={i}
          count={dossiers.length}
          progress={scrollYProgress}
          animate={animate}
        />
      ))}
    </div>
  );
}
