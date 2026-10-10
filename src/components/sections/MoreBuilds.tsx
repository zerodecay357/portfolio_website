import Image from "next/image";
import { moreBuilds } from "@/lib/projects";
import Pill from "@/components/Pill";
import Label from "@/components/ui/Label";

// Compact band: a tall graded image panel on the left, the side builds as
// hairline-divided rows on the right. Not a card grid.
export default function MoreBuilds() {
  return (
    <section id="builds" className="relative border-t border-hairline">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="ticks grid border border-hairline md:grid-cols-12">
          <div className="relative min-h-[220px] overflow-hidden border-b border-hairline md:col-span-4 md:min-h-0 md:border-b-0 md:border-r">
            <Image
              src="/media/stock/robot-arm.jpg"
              alt="Robotic arm in a dark workshop, lit from the side"
              width={1600}
              height={1067}
              sizes="(min-width: 768px) 34vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: "grayscale(1) brightness(0.55) contrast(1.1)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-obsidian/20 md:to-obsidian/80"
            />
            <Label className="absolute bottom-6 left-6 text-chrome/85">Also built</Label>
          </div>

          <ul className="md:col-span-8">
            {moreBuilds.map((b) => (
              <li
                key={b.title}
                className="border-b border-hairline px-6 py-8 last:border-b-0 sm:px-10 sm:py-9"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                  <div className="max-w-[60ch]">
                    <h3 className="font-display text-[22px] font-400 leading-tight tracking-[-0.015em] text-chrome">
                      {b.title}
                    </h3>
                    <p className="mt-2 font-body text-[15px] leading-relaxed text-steel sm:text-[16px]">
                      {b.oneLiner}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2 lg:justify-end lg:pt-1">
                    {b.tags.map((t) => (
                      <Pill key={t} tone="neutral">
                        {t}
                      </Pill>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
