import { getProject } from "@/lib/projects";
import ZoomFootage from "@/components/work/ZoomFootage";

const SLUG = "hexabot-v2";

// The real hexapod walking untethered, between the hero and the project stack.
export default function FieldFootage() {
  const hexabot = getProject(SLUG);
  if (!hexabot?.video) return null;
  const video = hexabot.video;

  return (
    <section aria-label="Hexabot V2 field footage" className="relative bg-void">
      <ZoomFootage
        src={video.src}
        caption={video.caption ?? hexabot.oneLiner}
        caseStudyHref={`/projects/${SLUG}`}
      />
    </section>
  );
}
