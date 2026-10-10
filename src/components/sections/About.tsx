"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/Reveal";

const BRACKET = "absolute h-6 w-6 border-phosphor/70";

// Portrait treated as a scan-bay capture: grayscale, servo duotone, scanlines,
// HUD corner brackets, and a single sweep line when it first enters view.
function ScanPortrait() {
  const reduce = useReducedMotion();
  return (
    <figure className="relative">
      <div className="relative isolate overflow-hidden chamfer">
        <Image
          src="/portrait/zero-portrait-photo.jpg"
          alt="Portrait of Shivanshu Aryan"
          width={700}
          height={859}
          sizes="(min-width: 768px) 40vw, 100vw"
          className="block h-auto w-full"
          style={{ filter: "grayscale(1) contrast(1.25) brightness(0.92)" }}
        />
        {/* Servo duotone */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-servo opacity-25 mix-blend-multiply"
        />
        {/* Shadow lift so the darks stay inky, not muddy */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent"
        />
        {/* Scanlines */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgb(8 11 16 / 0.35) 0 1px, transparent 1px 4px)",
          }}
        />
        {/* One-time sweep: reads as the capture being taken */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            initial={{ y: "-2%", opacity: 0 }}
            whileInView={{ y: "100%", opacity: [0, 1, 1, 0] }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="h-[2px] w-full bg-phosphor shadow-[0_0_18px_4px_rgb(244_208_18/0.55)]" />
          </motion.div>
        )}
      </div>

      {/* HUD corner brackets */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-3">
        <span className={`${BRACKET} left-0 top-0 border-l border-t`} />
        <span className={`${BRACKET} right-0 top-0 border-r border-t`} />
        <span className={`${BRACKET} bottom-0 left-0 border-b border-l`} />
        <span className={`${BRACKET} bottom-0 right-0 border-b border-r`} />
      </div>

      <figcaption className="mt-6 font-body text-[14px] text-fog">
        Shivanshu &ldquo;Zero&rdquo; Aryan, IIT Delhi
      </figcaption>
    </figure>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-conduit bg-void">
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid items-start gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 lg:gap-24">
          <div className="mx-auto w-full max-w-[420px] px-3 md:mx-0 md:mt-28 md:max-w-none">
            <ScanPortrait />
          </div>

          <Reveal>
            <h2 className="font-display text-[48px] font-800 uppercase leading-[0.92] tracking-tight text-phosphor sm:text-[64px] lg:text-[84px]">
              Why the range, not the niche
            </h2>
            <div className="mt-10 max-w-[65ch] space-y-6">
              <p className="font-body text-[17px] leading-relaxed text-fog sm:text-[18px]">
                I&rsquo;m a CS undergraduate at IIT Delhi, and I lead hardware and
                controls work for the Robotics Club, where Hexabot and the
                LiDAR-mapping stack both came out of the same team. The apportionment
                proof, the hexapod&rsquo;s gait policy, the out-of-order simulator, and the
                equity strategy all sit on the same underlying skill: modeling a system
                precisely enough that you can predict, and sometimes exploit, how it
                behaves at the edges. Robotics gives that model hardware to fail
                against; game theory gives it a proof; markets give it a P&amp;L. Different
                domains, same instinct.
              </p>
              <p className="font-body text-[17px] leading-relaxed text-fog sm:text-[18px]">
                None of this is random. I want to build a deep-tech company
                eventually, and deep tech is unforgiving about the part most
                startups skip: whether the underlying system actually works before
                any of the business around it matters. So I&rsquo;ve been deliberately
                testing myself against different corners of computer science,
                hardware, theory, systems, and markets, to find out where the hard
                problems actually are and whether I can solve them, not just talk
                about them. Every project here is that stress test running in
                public.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
