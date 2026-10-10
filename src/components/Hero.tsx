"use client";

import { motion, useReducedMotion } from "motion/react";
import { DownloadSimple } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import HeroSceneLoader from "@/components/three/HeroSceneLoader";
import { Z } from "@/lib/z";

const EASE = [0.16, 1, 0.3, 1] as const;
const LINES = ["Shivanshu", "Aryan"];

// HUD corner brackets, drawn with borders. Inset past the 18px chamfer.
const BRACKETS = [
  "left-4 top-4 border-l-2 border-t-2",
  "right-4 top-4 border-r-2 border-t-2",
  "bottom-4 left-4 border-b-2 border-l-2",
  "bottom-4 right-4 border-b-2 border-r-2",
];

export default function Hero() {
  const reduce = useReducedMotion();
  // One page-load sequence: copy rises in, then the scan bay powers up.
  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-void">
      <div
        aria-hidden="true"
        className="bg-blueprint absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_20%_45%,black,transparent)]"
      />

      <div className="mx-auto grid min-h-[calc(100dvh-64px)] max-w-[1320px] grid-cols-1 content-center items-center gap-10 px-5 pb-10 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-12 lg:gap-6 lg:px-12 lg:pb-14 lg:pt-10">
        <div className="relative lg:col-span-5" style={{ zIndex: Z.raised }}>
          <motion.p {...rise(0.05)} className="flex items-center gap-3 font-body text-[15px] leading-snug text-fog">
            <span aria-hidden="true" className="h-[2px] w-6 shrink-0 bg-servo" />
            <span>
              CS undergraduate, IIT Delhi. Incoming intern at{" "}
              <a
                href="https://www.peakxv.com/"
                target="_blank"
                rel="noopener"
                className="text-phosphor underline decoration-servo decoration-2 underline-offset-4 transition-colors hover:text-servo"
              >
                Peak XV Partners
              </a>
            </span>
          </motion.p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(4rem,7.6vw,9.5rem)] font-800 uppercase leading-[0.86] tracking-[-0.01em] text-phosphor"
          >
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block whitespace-nowrap"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.12 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            {...rise(0.42)}
            className="mt-6 max-w-[42ch] font-body text-[17px] leading-relaxed text-fog sm:text-[18px]"
          >
            I build things across robotics, game theory, systems, and quantitative finance. One habit:
            build it, then prove it holds up.
          </motion.p>

          <motion.div {...rise(0.52)} className="mt-8 flex flex-wrap gap-3">
            <Button href="/#work">View projects</Button>
            <Button href="/cv/Shivanshu_Aryan_CV.pdf" variant="ghost">
              <DownloadSimple size={18} weight="bold" aria-hidden="true" />
              Download CV
            </Button>
          </motion.div>
        </div>

        {/* The scan bay: bleeds to the right viewport edge on desktop */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.65, ease: EASE }}
          className="relative -mx-5 h-[60vh] min-h-[340px] sm:-mx-8 lg:col-span-7 lg:mx-0 lg:mr-[calc(-1*max(0px,(100vw_-_1320px)/2)_-_3rem)] lg:h-[min(76dvh,740px)] lg:min-h-[480px]"
        >
          <div className="plate h-full">
            <div className="plate-inner relative overflow-hidden">
              <HeroSceneLoader />
              {BRACKETS.map((pos) => (
                <span
                  key={pos}
                  aria-hidden="true"
                  className={`pointer-events-none absolute h-6 w-6 border-servo/80 ${pos}`}
                />
              ))}
              <p className="pointer-events-none absolute bottom-6 left-12 font-mono text-[12px] tracking-[0.04em] text-fog">
                Hexabot V2 / 18 DOF
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
