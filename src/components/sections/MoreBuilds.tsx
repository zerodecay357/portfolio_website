import { moreBuilds } from "@/lib/projects";
import Pill from "@/components/Pill";
import Reveal from "@/components/Reveal";

// Index list: big rows separated by single conduit hairlines, no cards.
export default function MoreBuilds() {
  return (
    <section id="builds" className="relative bg-void">
      {/* The page's only hazard band: marks the shift from case studies to side builds. */}
      <div aria-hidden="true" className="bg-hazard h-[10px] w-full opacity-90" />

      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="font-display text-[48px] font-800 uppercase leading-[0.92] tracking-tight text-phosphor sm:text-[64px] lg:text-[80px]">
              More builds
            </h2>
          </div>

          <ul>
            {moreBuilds.map((b, i) => (
              <li key={b.title} className="border-b border-conduit">
                <Reveal delay={i * 0.08}>
                  <div className="group relative py-8 pl-6 pr-2 sm:py-10 sm:pl-8">
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-servo transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    />
                    <h3 className="font-display text-[36px] font-700 uppercase leading-[0.95] tracking-tight text-phosphor transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-servo sm:text-[48px]">
                      {b.title}
                    </h3>
                    <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10">
                      <p className="max-w-[60ch] font-body text-[16px] leading-relaxed text-fog">
                        {b.oneLiner}
                      </p>
                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        {b.tags.map((t) => (
                          <Pill key={t} tone="neutral">
                            {t}
                          </Pill>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
