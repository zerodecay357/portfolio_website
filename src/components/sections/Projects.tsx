import Link from "next/link";
import { tier1Projects, tier2Projects } from "@/lib/projects";
import Pill from "@/components/Pill";
import Reveal from "@/components/Reveal";

export default function Projects() {
  return (
    <section id="work" className="bg-noir px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1180px]">
        <p className="font-heading text-[11px] font-700 uppercase tracking-[3px] text-dim">
          Featured Work
        </p>
        <h2 className="mt-3 font-heading text-3xl font-800 text-cream sm:text-4xl">
          Four projects, four registers
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {tier1Projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/projects/${p.slug}`}
                className="group relative block h-full overflow-hidden rounded-xl border border-noir-border bg-noir-surface p-7 transition-colors hover:border-accent"
              >
                <h3 className="font-heading text-xl font-700 text-cream sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 font-body text-[14px] leading-relaxed text-dim">
                  {p.oneLiner}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Pill key={t} tone="neutral">
                      {t}
                    </Pill>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 font-heading text-[12px] font-700 uppercase tracking-[1px] text-accent">
                  Read case study
                  <span className="transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-20 font-heading text-[11px] font-700 uppercase tracking-[3px] text-dim">
          Secondary Projects
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {tier2Projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group rounded-lg border border-noir-border p-5 transition-colors hover:border-accent"
            >
              <h3 className="font-heading text-base font-700 text-cream">
                {p.title}
              </h3>
              <p className="mt-2 font-body text-[13.5px] leading-relaxed text-dim">
                {p.oneLiner}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Pill key={t} tone="neutral">
                    {t}
                  </Pill>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
