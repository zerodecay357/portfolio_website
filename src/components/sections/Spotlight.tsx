import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Button from "@/components/ui/Button";
import Headline from "@/components/ui/Headline";
import Label from "@/components/ui/Label";
import InViewVideo from "@/components/work/InViewVideo";
import { Z } from "@/lib/z";

// Facts from src/content/projects/hexabot-v2.ts and src/lib/projects.ts.
// dot = where the leader line starts, in % of the media wrapper (the video
// fills the left 60% of it, so x stays under 60). Lines end at 63%, labels start at 65%.
const CALLOUTS = [
  {
    title: "18-DOF legs",
    body: "Six coxa-femur-tibia legs on SC-15 servos.",
    dot: { x: 30, y: 44 },
  },
  {
    title: "Gait library",
    body: "Ten parametric gaits on closed-form IK.",
    dot: { x: 50, y: 63 },
  },
  {
    title: "Learned policy",
    body: "PPO over a 49-dimensional MDP, from a PyBullet twin.",
    dot: { x: 34, y: 82 },
  },
] as const;

const VIDEO_LABEL =
  "The physical Hexabot V2 hexapod walking untethered on its gait library, LCD face and all";

export default function Spotlight() {
  return (
    <section className="relative border-t border-hairline">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid border border-hairline xl:grid-cols-12">
          {/* Main panel */}
          <div className="relative isolate overflow-hidden xl:col-span-9 xl:border-r xl:border-hairline">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div
                className="bg-grid absolute inset-0 opacity-50"
                style={{
                  maskImage:
                    "radial-gradient(60% 70% at 68% 50%, black, transparent 75%)",
                  WebkitMaskImage:
                    "radial-gradient(60% 70% at 68% 50%, black, transparent 75%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(40% 55% at 62% 50%, rgb(170 190 215 / 0.10), transparent 70%)",
                }}
              />
            </div>

            <div
              className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-10 lg:p-12"
              style={{ zIndex: Z.raised }}
            >
              <div>
                <Label>Hexabot V2</Label>
                <Headline
                  lead="Eighteen servos."
                  follow="One learned gait."
                  className="mt-5"
                />
                <p className="mt-6 max-w-[42ch] font-body text-[15px] leading-relaxed text-steel sm:text-[16px]">
                  Hand-tuned gaits are robust but rigid. End-to-end RL is
                  flexible but brittle. Hexabot V2 keeps both: ten parametric
                  gaits on closed-form IK as the baseline, and a PPO policy that
                  learns to walk in joint-angle space.
                </p>
                <Button
                  href="/projects/hexabot-v2"
                  variant="text"
                  className="mt-7"
                >
                  Learn more
                </Button>
              </div>

              {/* Media with leader-line callouts */}
              <figure className="m-0">
                <div className="relative md:aspect-[4/3]">
                  <div className="relative aspect-square md:absolute md:inset-y-0 md:left-0 md:aspect-auto md:w-[60%]">
                    {/* .ticks forces position:relative, so it lives on a filling child */}
                    <div className="ticks h-full w-full border border-hairline bg-graphite">
                      <div className="absolute inset-0 overflow-hidden">
                        <InViewVideo
                          src="/media/hexabot/hexabot-real-walk.mp4"
                          label={VIDEO_LABEL}
                          className="h-full w-full object-cover object-[40%_50%]"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(75% 75% at 50% 55%, transparent 40%, rgb(5 7 10 / 0.75) 100%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Leader lines: desktop only, decorative */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 hidden md:block"
                  >
                    {CALLOUTS.map((c, i) => (
                      <div key={c.title}>
                        <span
                          className={`absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                            i === 0
                              ? "bg-ember shadow-[0_0_10px_rgb(255_106_43/0.7)]"
                              : "bg-chrome shadow-[0_0_10px_rgb(241_243_245/0.6)]"
                          }`}
                          style={{ left: `${c.dot.x}%`, top: `${c.dot.y}%` }}
                        />
                        <span
                          className="absolute h-px bg-gradient-to-r from-chrome/70 to-hairline-2"
                          style={{
                            left: `${c.dot.x}%`,
                            right: "37%",
                            top: `${c.dot.y}%`,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <ol className="mt-8 grid gap-5 sm:grid-cols-3 md:mt-0 md:block">
                    {CALLOUTS.map((c, i) => (
                      <li
                        key={c.title}
                        className="flex gap-3 md:absolute md:left-[65%] md:right-0 md:block md:-translate-y-[9px]"
                        style={{ top: `${c.dot.y}%` }}
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full md:hidden ${
                            i === 0 ? "bg-ember" : "bg-chrome"
                          }`}
                        />
                        <div>
                          <Label as="span" className="block text-chrome!">
                            {c.title}
                          </Label>
                          <p className="mt-1 font-body text-[13.5px] leading-snug text-steel">
                            {c.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </figure>
            </div>
          </div>

          {/* Narrow image panel */}
          <div className="relative min-h-[300px] overflow-hidden border-t border-hairline xl:col-span-3 xl:min-h-0 xl:border-t-0">
            <Image
              src="/media/stock/chrome-macro.jpg"
              alt="Close-up of a machined aluminium robot gripper, screws and linkages lit against black"
              width={1600}
              height={1067}
              sizes="(min-width: 1280px) 25vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: "grayscale(1) brightness(0.6) contrast(1.15)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/10"
            />
            <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
              <Label className="max-w-[20ch] text-chrome!">
                Tested on hardware, not only in sim.
              </Label>
              <Link
                href="/projects/hexabot-v2"
                aria-label="Read case study: Hexabot V2"
                className="group mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline-2 text-chrome transition-colors duration-300 hover:border-chrome"
              >
                <ArrowUpRight
                  size={15}
                  weight="regular"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
