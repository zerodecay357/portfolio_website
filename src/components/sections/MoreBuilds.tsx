import { moreBuilds } from "@/lib/projects";
import Pill from "@/components/Pill";

export default function MoreBuilds() {
  return (
    <section id="builds" className="bg-noir px-5 pb-24 sm:px-10">
      <div className="mx-auto max-w-[1180px] border-t border-noir-border pt-16">
        <p className="font-heading text-[11px] font-700 uppercase tracking-[3px] text-dim">
          More Builds
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {moreBuilds.map((b) => (
            <div
              key={b.title}
              className="rounded-lg border border-noir-border p-5"
            >
              <h3 className="font-heading text-[14px] font-700 text-cream">
                {b.title}
              </h3>
              <p className="mt-2 font-body text-[13px] leading-relaxed text-dim">
                {b.oneLiner}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {b.tags.map((t) => (
                  <Pill key={t} tone="neutral">
                    {t}
                  </Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
