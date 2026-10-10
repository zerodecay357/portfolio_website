import Image from "next/image";
import Headline from "@/components/ui/Headline";
import Label from "@/components/ui/Label";
import { Z } from "@/lib/z";

// Paraphrases the owner's About text: model the system, give it something
// real to fail against, then prove it.
const STEPS = [
  { title: "Model", body: "Write the system down precisely enough to predict it." },
  { title: "Build", body: "Make the real thing: hardware, code, or a proof." },
  { title: "Break", body: "Push it to the edges where it fails." },
  { title: "Prove", body: "Show it holds up, with data or a theorem." },
];

export default function Process() {
  return (
    <section className="relative isolate overflow-hidden border-t border-hairline">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-full md:w-[60%]">
        <Image
          src="/media/stock/lab.jpg"
          alt=""
          width={1600}
          height={1067}
          sizes="(min-width: 768px) 60vw, 100vw"
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(1) brightness(0.32) contrast(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/75 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
      </div>

      <div
        className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
        style={{ zIndex: Z.raised }}
      >
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Label>How I work</Label>
            <Headline lead="From model" follow="to proof." className="mt-5" />
          </div>

          <ol className="relative grid gap-10 md:col-span-8 md:grid-cols-4 md:gap-6 md:self-end">
            {/* Horizontal hairline (desktop) / vertical hairline (mobile) */}
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-[15px] top-2 w-px bg-hairline-2 md:bottom-auto md:left-4 md:right-0 md:top-[15px] md:h-px md:w-auto"
            />
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 md:flex-col md:gap-0">
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline-2 bg-obsidian font-mono text-[11px] text-chrome">
                  {String(i + 1).padStart(2, "0")}
                  {i === 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-ember"
                    />
                  )}
                </span>
                <div className="md:mt-6">
                  <h3 className="font-display text-[20px] font-400 leading-tight tracking-[-0.01em] text-chrome">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[28ch] font-body text-[15px] leading-relaxed text-steel">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
