import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Button from "@/components/ui/Button";
import Headline from "@/components/ui/Headline";
import Label from "@/components/ui/Label";
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

// "Event: detail" -> title + sentence-cased detail.
function splitAchievement(a: string) {
  const i = a.indexOf(":");
  if (i === -1) return { title: a, detail: "" };
  const detail = a.slice(i + 1).trim();
  return {
    title: a.slice(0, i),
    detail: detail.charAt(0).toUpperCase() + detail.slice(1),
  };
}

function AchievementTile({ text, wide = false }: { text: string; wide?: boolean }) {
  const { title, detail } = splitAchievement(text);
  return (
    <div
      className={`ticks flex h-full flex-col justify-end border border-hairline bg-obsidian/55 p-6 backdrop-blur-sm sm:p-7 ${
        wide ? "min-h-[200px] md:min-h-[240px]" : "min-h-[170px]"
      }`}
    >
      <p
        className={`font-display font-300 leading-[1.08] tracking-[-0.02em] text-chrome ${
          wide ? "text-[30px] sm:text-[36px]" : "text-[24px] sm:text-[26px]"
        }`}
      >
        {title}
      </p>
      {detail && (
        <p className="mt-2 font-body text-[15px] leading-relaxed text-steel">{detail}</p>
      )}
    </div>
  );
}

export default function Academics() {
  const [first, ...rest] = achievements;
  return (
    <section id="cv" className="relative isolate overflow-hidden border-t border-hairline">
      {/* Chrome gripper, graded, fading into obsidian from the right edge. */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-full md:w-[55%]">
        <Image
          src="/media/stock/chrome-gripper.jpg"
          alt=""
          width={1600}
          height={1067}
          sizes="(min-width: 768px) 55vw, 100vw"
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(0.9) brightness(0.45) contrast(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-obsidian/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
      </div>

      <div
        className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
        style={{ zIndex: Z.raised }}
      >
        <div className="grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
          <div className="md:col-span-5">
            <Label>Record</Label>
            <Headline
              lead="B.Tech, Computer Science & Engineering"
              follow={<>IIT Delhi, <span className="whitespace-nowrap">2024-2028</span></>}
              className="mt-5"
            />
            <div className="mt-10">
              <Button href="/cv/Shivanshu_Aryan_CV.pdf" variant="primary">
                Download CV
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:col-span-7">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <AchievementTile text={first} wide />
              </div>
              {rest.map((a) => (
                <AchievementTile key={a} text={a} />
              ))}
            </div>

            {mentors.map((m) => (
              <div
                key={m.name}
                className="ticks flex flex-col gap-2 border border-hairline bg-obsidian/55 p-6 backdrop-blur-sm sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:p-7"
              >
                <div>
                  <Label>Mentor</Label>
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener"
                    className="group mt-2 inline-flex items-center gap-2 font-display text-[24px] font-300 leading-none tracking-[-0.02em] text-chrome transition-colors hover:text-white"
                  >
                    {m.name}
                    <ArrowUpRight
                      size={16}
                      weight="regular"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
                    />
                  </a>
                </div>
                <p className="font-body text-[15px] text-steel">
                  {m.note.charAt(0).toUpperCase() + m.note.slice(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
