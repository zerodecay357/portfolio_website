import Image from "next/image";
import Link from "next/link";
import { tier2Projects } from "@/lib/projects";
import Pill from "@/components/Pill";

// Stock photos are mood backgrounds behind a linked title, so they are
// decorative (empty alt); the link is named by the project title and text.
type Cell = {
  slug: string;
  image: string;
  // Placement in the 6-column bento (md and up).
  area: string;
  sizes: string;
  big?: boolean;
};

// Two tall plates over a narrow + wide pair: 4|2 then 2|4.
const CELLS: Cell[] = [
  {
    slug: "lidar-mapping",
    image: "/media/stock/lidar.jpg",
    area: "md:col-span-4 md:row-span-2",
    sizes: "(min-width: 1320px) 820px, (min-width: 768px) 66vw, 100vw",
    big: true,
  },
  {
    slug: "riscv-simulator",
    image: "/media/stock/riscv.jpg",
    area: "md:col-span-2 md:row-span-2",
    sizes: "(min-width: 1320px) 420px, (min-width: 768px) 33vw, 100vw",
  },
  {
    slug: "leveldb-range",
    image: "/media/stock/leveldb.jpg",
    area: "md:col-span-2",
    sizes: "(min-width: 1320px) 420px, (min-width: 768px) 33vw, 100vw",
  },
  {
    slug: "qube-quant-strategy",
    image: "/media/stock/quant.jpg",
    area: "md:col-span-4",
    sizes: "(min-width: 1320px) 820px, (min-width: 768px) 66vw, 100vw",
  },
];

export default function Secondary() {
  const bySlug = new Map(tier2Projects.map((p) => [p.slug, p]));

  return (
    <section aria-labelledby="secondary-heading" className="relative bg-void py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <h2
          id="secondary-heading"
          className="max-w-[18ch] font-display text-[clamp(2.5rem,5vw,4.5rem)] font-800 uppercase leading-[0.92] tracking-[-0.01em] text-phosphor"
        >
          Simulators, maps, storage engines and a live strategy
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-6 md:grid-rows-[minmax(300px,auto)_minmax(300px,auto)_minmax(320px,auto)] md:gap-5">
          {CELLS.map((cell) => {
            const p = bySlug.get(cell.slug);
            if (!p) return null;
            return (
              <li key={cell.slug} className={`min-h-[340px] md:min-h-0 ${cell.area}`}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="plate group block h-full focus-visible:outline-none"
                >
                  <article className="plate-inner relative flex h-full flex-col justify-end overflow-hidden transition-shadow duration-300 group-focus-visible:shadow-[inset_0_0_0_2px_var(--servo)]">
                    <Image
                      src={cell.image}
                      alt=""
                      width={1600}
                      height={1067}
                      sizes={cell.sizes}
                      className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/20"
                    />
                    <div className={`relative flex flex-col gap-4 ${cell.big ? "p-6 md:p-10" : "p-6"}`}>
                      <h3
                        className={`font-display font-700 leading-[0.95] tracking-[-0.01em] text-phosphor transition-colors duration-300 group-hover:text-servo group-focus-visible:text-servo ${
                          cell.big ? "text-[clamp(2rem,3.4vw,3.25rem)]" : "text-[clamp(1.75rem,2.4vw,2.25rem)]"
                        }`}
                      >
                        {p.title}
                      </h3>
                      <p
                        className={`text-[14px] leading-relaxed text-phosphor/80 md:text-[15px] ${
                          cell.big ? "max-w-[52ch]" : "max-w-[44ch]"
                        }`}
                      >
                        {p.oneLiner}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <Pill key={t} tone="neutral">
                            {t}
                          </Pill>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
