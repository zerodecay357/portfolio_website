"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import Headline from "@/components/ui/Headline";
import Label from "@/components/ui/Label";
import InViewVideo from "@/components/work/InViewVideo";
import HeroSceneLoader from "@/components/three/HeroSceneLoader";
import { Z } from "@/lib/z";

const EASE = [0.16, 1, 0.3, 1] as const;
const FIELDS = ["Robotics", "Game theory", "Systems", "Quant"];

export default function Hero() {
  const reduce = useReducedMotion();
  // One page-load sequence: eyebrow, headline lines, copy, CTAs, then the
  // studio lights up behind them and the side details settle in last.
  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  // Masked line reveal for the two headline lines.
  const line = (delay: number, children: ReactNode) => (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col overflow-hidden border-b border-hairline lg:block"
    >
      {/* Engineering grid behind the copy, masked to a soft pool */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_50%_55%_at_12%_42%,black,transparent)]"
      />

      <div
        className="relative mx-auto flex w-full max-w-[1400px] flex-col px-5 pb-10 pt-12 sm:px-8 sm:pt-16 lg:min-h-[calc(100dvh-64px)] lg:px-12 lg:py-8 [@media(min-height:800px)]:lg:py-12"
        style={{ zIndex: Z.raised }}
      >
        <div className="my-auto max-w-[640px]">
          <motion.p
            {...rise(0.05)}
            className="flex items-center gap-4 font-body text-[14px] leading-snug text-steel"
          >
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-hairline-2" />
            <span>
              CS undergraduate, IIT Delhi. Incoming intern at{" "}
              <a
                href="https://www.peakxv.com/"
                target="_blank"
                rel="noopener"
                className="text-chrome underline decoration-hairline-2 underline-offset-4 transition-colors hover:decoration-chrome"
              >
                Peak XV Partners
              </a>
            </span>
          </motion.p>

          <Headline
            as="h1"
            size="hero"
            className="mt-7"
            lead={line(0.15, <span id="hero-title" className="text-metal">Shivanshu Aryan</span>)}
            follow={line(0.27, <span className="block text-balance">Build it, then prove it.</span>)}
          />

          <motion.p
            {...rise(0.5)}
            className="mt-6 max-w-[40ch] font-body text-[16px] leading-relaxed text-steel sm:text-[17px]"
          >
            I build things across robotics, game theory, systems, and quantitative finance.
          </motion.p>

          <motion.div {...rise(0.6)} className="mt-8 flex flex-wrap gap-3">
            <Button href="/#work">View projects</Button>
            <Button href="/cv/Shivanshu_Aryan_CV.pdf" variant="ghost">
              Download CV
            </Button>
          </motion.div>
        </div>

        {/* Field list: inline under the copy on small screens, a vertical
            hairline list on the right edge on desktop (one element). */}
        <motion.ul
          {...rise(0.85)}
          aria-label="Fields"
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 lg:absolute lg:right-12 lg:top-12 lg:mt-0 lg:flex-col lg:gap-y-1.5 lg:border-l lg:border-hairline-2 lg:pl-4"
        >
          {FIELDS.map((f) => (
            <li key={f}>
              <Label as="span">{f}</Label>
            </li>
          ))}
        </motion.ul>

        {/* Inset card: the real robot, next to its render */}
        <motion.div
          {...rise(0.95)}
          className="absolute bottom-12 right-12 hidden w-[220px] lg:block [@media(max-height:760px)]:lg:bottom-8"
        >
          <div className="ticks glass p-2">
            <InViewVideo
              src="/media/hexabot/hexabot-real-walk.mp4"
              label="Hexabot V2, the real hexapod, walking on a lab floor"
              className="block aspect-[832/464] w-full bg-obsidian object-cover [filter:grayscale(0.35)_brightness(0.92)]"
              threshold={0.2}
            />
            <Link
              href="/projects/hexabot-v2"
              className="group flex items-center justify-between gap-3 px-1 pb-1 pt-3"
            >
              <Label as="span" className="text-chrome">
                On real hardware
              </Label>
              <ArrowUpRight
                size={14}
                weight="regular"
                aria-hidden="true"
                className="text-steel transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
              />
            </Link>
          </div>
        </motion.div>

        {/* Indicator row, desktop and tall enough viewports only */}
        <motion.div
          {...rise(1.05)}
          aria-hidden="true"
          className="hidden items-center gap-4 pt-8 [@media(min-height:800px)]:lg:flex"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-hairline-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          </span>
          <span className="font-mono text-[12px] text-steel">01</span>
          <span className="h-px w-20 bg-hairline-2" />
          <Label as="span">Sense. Plan. Act.</Label>
        </motion.div>
      </div>

      {/* The studio: below the copy on small screens, the right of the
          panel on desktop, fading into obsidian toward the copy. */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
        className="relative h-[62vh] min-h-[340px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:min-h-0 lg:w-[68%]"
      >
        <HeroSceneLoader />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[42%] bg-gradient-to-r from-obsidian via-obsidian/75 to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-obsidian to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-obsidian to-transparent"
        />
      </motion.div>
    </section>
  );
}
