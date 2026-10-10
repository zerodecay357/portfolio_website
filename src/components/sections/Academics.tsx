import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import { Z } from "@/lib/z";

const achievements = [
  "NSEA & NSEC: national rank among top scorers",
  "Tech General Championship: 1st place, Robotics event",
  "ABU Robocon: national qualifier, DD Robocon 2026",
];

const mentors = [
  {
    name: "Prof. Rohit Vaish",
    note: "game theory & apportionment research",
    href: "https://rohitvaish.in/",
  },
];

// "Event: detail" -> title + sentence-cased detail, so each plate reads like a log entry.
function splitAchievement(a: string) {
  const i = a.indexOf(":");
  if (i === -1) return { title: a, detail: "" };
  const detail = a.slice(i + 1).trim();
  return {
    title: a.slice(0, i),
    detail: detail.charAt(0).toUpperCase() + detail.slice(1),
  };
}

function AchievementPlate({ text, tall = false }: { text: string; tall?: boolean }) {
  const { title, detail } = splitAchievement(text);
  return (
    <div className="plate h-full">
      <div
        className={`plate-inner flex flex-col justify-end p-6 sm:p-7 ${
          tall ? "min-h-[220px] md:min-h-[360px]" : "min-h-[160px]"
        }`}
      >
        <p
          className={`font-display font-700 uppercase leading-[0.95] tracking-tight text-phosphor ${
            tall ? "text-[40px] sm:text-[48px]" : "text-[30px] sm:text-[34px]"
          }`}
        >
          {title}
        </p>
        {detail && (
          <p className="mt-3 font-body text-[15px] leading-relaxed text-fog">{detail}</p>
        )}
      </div>
    </div>
  );
}

export default function Academics() {
  const [first, ...rest] = achievements;
  return (
    <section id="cv" className="relative isolate overflow-hidden bg-void">
      {/* Robot arm, heavily darkened, bleeding in from the right edge. */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-full md:w-[62%]">
        <Image
          src="/media/stock/robot-arm.jpg"
          alt=""
          width={1600}
          height={1067}
          sizes="(min-width: 768px) 62vw, 100vw"
          className="h-full w-full object-cover opacity-[0.18] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void" />
      </div>

      <div
        className="relative mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        style={{ zIndex: Z.raised }}
      >
        <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 lg:gap-20">
          {/* Readout panel */}
          <div>
            <p className="font-body text-[14px] text-servo">Record</p>
            <h2 className="mt-4 font-display text-[44px] font-800 uppercase leading-[0.92] tracking-tight text-phosphor sm:text-[56px] lg:text-[68px]">
              B.Tech, Computer Science &amp; Engineering
            </h2>
            <p className="mt-5 font-body text-[17px] text-phosphor">
              Indian Institute of Technology Delhi
            </p>
            <p className="mt-1 font-mono text-[15px] text-fog">2024-2028</p>

            <div className="mt-10 border-y border-conduit py-6">
              <p className="font-body text-[14px] text-fog">CGPA</p>
              <p className="mt-1 flex items-baseline gap-3 font-mono leading-none">
                <span className="text-[72px] font-500 tracking-tight text-servo sm:text-[96px]">
                  7.77
                </span>
                <span className="text-[24px] text-fog-2" aria-hidden="true">
                  /10
                </span>
              </p>
            </div>

            <div className="mt-10">
              <Button href="/cv/Shivanshu_Aryan_CV.pdf" variant="primary">
                Download CV
              </Button>
            </div>
          </div>

          {/* Achievements + mentor */}
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2">
              <Reveal className="md:row-span-2">
                <AchievementPlate text={first} tall />
              </Reveal>
              {rest.map((a, i) => (
                <Reveal key={a} delay={0.1 * (i + 1)}>
                  <AchievementPlate text={a} />
                </Reveal>
              ))}
            </div>

            {mentors.map((m) => (
              <Reveal key={m.name} delay={0.3}>
                <div className="plate">
                  <div className="plate-inner flex flex-col gap-2 p-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:p-7">
                    <div>
                      <p className="font-body text-[14px] text-fog">Mentor</p>
                      <a
                        href={m.href}
                        target="_blank"
                        rel="noopener"
                        className="mt-1 inline-flex items-center gap-1.5 font-display text-[30px] font-700 uppercase leading-none tracking-tight text-phosphor transition-colors hover:text-servo"
                      >
                        {m.name}
                        <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                      </a>
                    </div>
                    <p className="font-body text-[15px] text-fog">
                      {m.note.charAt(0).toUpperCase() + m.note.slice(1)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
