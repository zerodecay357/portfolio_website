import Pill from "@/components/Pill";

const TAGS = ["Robotics & RL", "Game Theory", "Systems", "Quant"];

const SPEC_ROWS = [
  { label: "Location", value: "New Delhi, IN — 28.54°N 77.19°E" },
  { label: "Institution", value: "IIT Delhi, CS — '24–'28" },
  { label: "Focus", value: "Robotics · Theory · Systems · Quant" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-dotgrid px-5 pb-20 pt-16 sm:px-10 sm:pt-20">
      <div className="relative mx-auto flex max-w-[1180px] flex-col items-start gap-12 sm:flex-row sm:justify-between sm:gap-14">
        <div className="max-w-[600px]">
          <p className="font-mono text-[11.5px] font-500 uppercase tracking-[0.15em] text-accent">
            CS Undergraduate — IIT Delhi
          </p>
          <h1 className="mt-4 font-display text-[44px] font-700 leading-[1.02] text-ink sm:text-[68px]">
            Shivanshu <span className="text-accent">&ldquo;Zero&rdquo;</span>
            <br />
            Aryan
          </h1>
          <p className="mt-5 max-w-[480px] font-body text-[17px] leading-relaxed text-muted sm:text-[18px]">
            I build things across robotics, game theory, systems, and
            quantitative finance — an RL-trained hexapod, a proof about
            manipulating apportionment methods, an out-of-order CPU
            simulator, and a strategy that traded live. Range is the point,
            not a lack of focus.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <Pill key={t} tone="terracotta">
                {t}
              </Pill>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-[3px] bg-ink px-6 py-3 font-mono text-[12px] font-500 uppercase tracking-[0.08em] text-paper transition-colors hover:bg-accent"
            >
              View featured work
            </a>
            <a
              href="/cv/Shivanshu_Aryan_CV.pdf"
              target="_blank"
              rel="noopener"
              className="rounded-[3px] border border-noir-border px-6 py-3 font-mono text-[12px] font-500 uppercase tracking-[0.08em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* spec-sheet callout — the recurring "dimension label" motif,
            standing in for a portrait */}
        <div className="tick-corners w-full shrink-0 border border-noir-border bg-noir-surface/60 p-6 sm:w-[300px]">
          <p className="font-mono text-[10px] font-500 uppercase tracking-[0.15em] text-schematic">
            spec &middot; 001
          </p>
          <dl className="mt-4 space-y-4">
            {SPEC_ROWS.map((row) => (
              <div key={row.label}>
                <dt className="font-mono text-[10px] font-500 uppercase tracking-[0.1em] text-muted-2">
                  {row.label}
                </dt>
                <dd className="mt-1 font-mono text-[13px] text-cream">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
