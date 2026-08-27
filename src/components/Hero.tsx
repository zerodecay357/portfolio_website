import Image from "next/image";
import Pill from "@/components/Pill";
import { SquiggleDoodle, SparkleDoodle } from "@/components/Doodles";

const TAGS = ["Robotics & RL", "Game Theory", "Systems", "Quant"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-dotgrid px-5 pb-20 pt-16 sm:px-10 sm:pt-20">
      {/* scattered doodles — kept sparse per the "restraint" principle */}
      <SquiggleDoodle className="pointer-events-none absolute left-4 top-10 hidden -rotate-3 sm:block" />
      <SparkleDoodle
        className="pointer-events-none absolute right-10 top-24 hidden rotate-12 sm:block"
        fill="var(--sage)"
      />

      <div className="relative mx-auto flex max-w-[1180px] flex-col-reverse items-center gap-14 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-[620px]">
          <p className="font-heading text-[13px] font-700 uppercase tracking-[3px] text-terracotta">
            CS Undergraduate, IIT Delhi
          </p>
          <h1
            className="mt-3 font-display text-[34px] font-800 leading-[0.95] text-ink sm:text-[56px]"
            style={{ transform: "rotate(-0.6deg)" }}
          >
            Shivanshu Aryan
          </h1>

          <a
            href="https://www.peakxv.com/"
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex items-center gap-3 rounded-r-md border-l-4 border-terracotta bg-terracotta/10 py-2.5 pl-4 pr-6 transition-colors hover:bg-terracotta/20"
            style={{ transform: "rotate(-0.4deg)" }}
          >
            <span className="font-heading text-[15px] font-700 uppercase tracking-[0.5px] text-terracotta">
              Incoming Intern &middot; Peak XV Partners
            </span>
          </a>
          <p className="mt-5 max-w-[480px] font-body text-[16px] font-500 leading-relaxed text-muted sm:text-[17px]">
            I build things across robotics, game theory, systems, and
            quantitative finance: an RL-trained hexapod, a proof about
            manipulating apportionment methods, an out-of-order CPU
            simulator, and a strategy that traded on a live book. Four
            fields, one habit: build it, then prove it holds up.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {TAGS.map((t) => (
              <Pill key={t} tone="terracotta" size="md">
                {t}
              </Pill>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-md bg-ink px-5 py-3 font-heading text-[13px] font-600 tracking-wide text-white transition-colors hover:bg-terracotta"
            >
              VIEW FEATURED WORK
            </a>
          </div>
        </div>

        {/* portrait — glows, doodled corners, no motion */}
        <div className="relative w-[250px] shrink-0 sm:w-[280px]" aria-hidden="false">
          <div className="absolute -inset-x-10 -inset-y-8 rounded-full bg-terracotta opacity-30 blur-3xl" />
          <div className="relative overflow-hidden rounded-[18px] shadow-[0_18px_36px_rgba(185,130,106,.28)]">
            <Image
              src="/portrait/zero-portrait-photo.jpg"
              alt="Portrait of Shivanshu &lsquo;Zero&rsquo; Aryan"
              width={700}
              height={859}
              priority
              className="block h-auto w-full"
            />
          </div>
          <div
            className="absolute -left-14 top-8 font-display text-[15px] font-700 text-muted"
            style={{ transform: "rotate(-10deg)" }}
          >
            me &#8600;
          </div>
          <SparkleDoodle className="absolute -right-3 -top-3 h-9 w-9 rotate-6" />
          <SquiggleDoodle className="absolute -bottom-6 -right-8 h-10 w-28 rotate-6 opacity-70" />
        </div>
      </div>
    </section>
  );
}
