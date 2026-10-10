import { tier1Projects, type Project } from "@/lib/projects";
import DossierStack, { type Dossier, type DossierMedia } from "@/components/work/DossierStack";

// The Hexabot's real-hardware clip already plays full-bleed in FieldFootage
// directly above, so its dossier shows the simulation twin instead.
const PREFER_ALGORITHM_VIDEO = new Set(["hexabot-v2"]);

function mediaFor(p: Project): DossierMedia | null {
  const preferred = PREFER_ALGORITHM_VIDEO.has(p.slug)
    ? (p.algorithmVideo ?? p.video)
    : (p.video ?? p.algorithmVideo);
  if (preferred) {
    return {
      kind: "video",
      src: preferred.src,
      label: preferred.caption ? `${p.title}: ${preferred.caption}` : `${p.title}, project video`,
      caption: preferred.caption,
    };
  }
  if (p.image) {
    return { kind: "image", ...p.image };
  }
  return null;
}

export default function Projects() {
  const dossiers: Dossier[] = tier1Projects.flatMap((p) => {
    const media = mediaFor(p);
    return media
      ? [{ slug: p.slug, title: p.title, oneLiner: p.oneLiner, tags: p.tags, media }]
      : [];
  });

  return (
    <section id="work" className="relative scroll-mt-20 bg-void pt-24 pb-16 md:pt-32 md:pb-10">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-800 uppercase leading-[0.92] tracking-[-0.01em] text-phosphor">
            Four projects, written up in full
          </h2>
          <p className="max-w-[46ch] text-[16px] leading-relaxed text-fog">
            Each one has a case study covering the motivation, the approach, the
            trade-offs and the result.
          </p>
        </div>
        <div className="mt-14 md:mt-6">
          <DossierStack dossiers={dossiers} />
        </div>
      </div>
    </section>
  );
}
