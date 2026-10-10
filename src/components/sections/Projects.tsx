import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Headline from "@/components/ui/Headline";
import Label from "@/components/ui/Label";
import Pill from "@/components/Pill";
import InViewVideo from "@/components/work/InViewVideo";
import { tier1Projects, tier2Projects, type Project } from "@/lib/projects";
import { Z } from "@/lib/z";

// Graded stock image per secondary write-up (see public/media/stock/CREDITS.md).
const TIER2_IMAGES: Record<string, { src: string; alt: string }> = {
  "riscv-simulator": {
    src: "/media/stock/riscv.jpg",
    alt: "Macro of a printed circuit board with integrated circuits",
  },
  "lidar-mapping": {
    src: "/media/stock/lidar.jpg",
    alt: "Close-up of a spinning LiDAR unit on top of a delivery robot",
  },
  "leveldb-range": {
    src: "/media/stock/leveldb.jpg",
    alt: "Row of server drive bays lit from within",
  },
  "qube-quant-strategy": {
    src: "/media/stock/quant.jpg",
    alt: "Candlestick price chart with moving averages on a dark screen",
  },
};

// Hairline grid between the featured tiles: 1 col, then 2x2 (md), then 4 across (xl).
const TILE_BORDERS = [
  "",
  "border-t md:border-t-0 md:border-l",
  "border-t xl:border-t-0 xl:border-l",
  "border-t md:border-l xl:border-t-0",
];

const IMAGE_GRADE = {
  filter: "grayscale(1) brightness(0.62) contrast(1.1)",
} as const;

// "Hexabot V2: 18-DOF Hexapod..." reads as "Hexabot V2" on a small tile.
function shortTitle(title: string) {
  const i = title.indexOf(":");
  return i > 0 ? title.slice(0, i) : title;
}

function TileMedia({ project }: { project: Project }) {
  const clip = project.video ?? project.algorithmVideo;
  if (clip) {
    return (
      <InViewVideo
        src={clip.src}
        label={clip.caption ?? `${shortTitle(project.title)}: project footage`}
        // Footage fills the tile; 16:9 diagram animations stay whole.
        className={`h-full w-full ${clip.src.includes("/hexabot/") ? "object-cover" : "object-contain"}`}
      />
    );
  }
  if (project.image) {
    return (
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
        className="h-full w-full object-cover"
        // A white diagram, inverted into the dark palette so it never glares.
        style={{
          filter:
            "invert(1) hue-rotate(180deg) grayscale(1) brightness(0.8) contrast(1.1)",
        }}
      />
    );
  }
  return null;
}

export default function Projects() {
  const fields = tier1Projects.map((p) => p.tags[0]);

  return (
    <section
      id="work"
      className="relative isolate scroll-mt-20 border-t border-hairline"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="bg-grid absolute inset-0 opacity-40"
          style={{
            maskImage:
              "radial-gradient(50% 40% at 20% 0%, black, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(50% 40% at 20% 0%, black, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 35% at 80% 30%, rgb(160 180 205 / 0.07), transparent 70%)",
          }}
        />
      </div>

      <div
        className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
        style={{ zIndex: Z.raised }}
      >
        <Label>Selected work</Label>
        <Headline
          lead="Four case studies."
          follow="Written up in full."
          className="mt-5"
        />

        <div className="mt-12 border border-hairline lg:mt-16">
          {/* Row 1: featured case studies as square-cornered tiles */}
          <ul className="grid md:grid-cols-2 xl:grid-cols-4">
            {tier1Projects.map((p, i) => (
              <li
                key={p.slug}
                className={`border-hairline ${TILE_BORDERS[i] ?? ""}`}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  aria-label={`Read case study: ${p.title}`}
                  className="ticks group flex h-full flex-col p-5 transition-colors duration-300 hover:bg-white/[0.02] sm:p-6"
                >
                  {/* Fixed height so media lines up across tiles when a title wraps */}
                  <div className="xl:min-h-[4.75rem]">
                    <h3 className="font-display text-[21px] font-400 leading-[1.15] tracking-[-0.015em] text-chrome">
                      {shortTitle(p.title)}
                    </h3>
                    <p className="mt-1.5 font-body text-[14px] text-steel">
                      {p.tags[0]}
                    </p>
                  </div>

                  <div className="relative mt-6 aspect-[4/3] overflow-hidden border border-hairline bg-obsidian">
                    <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
                      <TileMedia project={p} />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(80% 80% at 50% 50%, transparent 45%, rgb(5 7 10 / 0.7) 100%)",
                      }}
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline-2 text-chrome transition-colors duration-300 group-hover:border-chrome"
                  >
                    <ArrowUpRight
                      size={15}
                      weight="regular"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Banner: the reference's "Small modules. Bigger possibilities." panel */}
          <div className="relative flex min-h-[200px] items-end overflow-hidden border-t border-hairline">
            <Image
              src="/media/stock/dark-rock.jpg"
              alt="Dark fractured rock wall in low side light"
              width={1600}
              height={1067}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: "grayscale(1) brightness(0.55) contrast(1.15)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-obsidian/20"
            />
            <div className="relative flex w-full flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-end md:justify-between">
              <Label className="max-w-[16ch] text-chrome!">
                Four fields. One habit.
              </Label>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
                {fields.map((f) => (
                  <li key={f}>
                    <Label as="span">{f}</Label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 2: shorter write-ups, quieter wide tiles */}
          <div className="border-t border-hairline px-5 pb-1 pt-6 sm:px-6">
            <Label>Shorter write-ups</Label>
          </div>
          <ul className="grid md:grid-cols-2">
            {tier2Projects.map((p, i) => {
              const img = TIER2_IMAGES[p.slug];
              return (
                <li
                  key={p.slug}
                  className={`border-t border-hairline ${i % 2 === 1 ? "md:border-l" : ""}`}
                >
                  <Link
                    href={`/projects/${p.slug}`}
                    aria-label={`Read case study: ${p.title}`}
                    className="group flex h-full flex-col transition-colors duration-300 hover:bg-white/[0.02] sm:flex-row"
                  >
                    {img && (
                      <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-hairline sm:aspect-auto sm:w-1/3 sm:border-b-0 sm:border-r">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={1600}
                          height={1067}
                          sizes="(min-width: 768px) 16vw, (min-width: 640px) 33vw, 100vw"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                          style={IMAGE_GRADE}
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian/50"
                        />
                      </div>
                    )}
                    <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-[19px] font-400 leading-[1.2] tracking-[-0.01em] text-chrome">
                          {p.title}
                        </h3>
                        <ArrowUpRight
                          size={16}
                          weight="regular"
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-steel transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
                        />
                      </div>
                      <p className="mt-2 line-clamp-2 font-body text-[15px] leading-relaxed text-steel">
                        {p.oneLiner}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        {p.tags.map((t) => (
                          <Pill key={t}>{t}</Pill>
                        ))}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
