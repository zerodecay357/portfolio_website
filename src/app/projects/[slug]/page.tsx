import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { projects, getProject } from "@/lib/projects";
import Pill from "@/components/Pill";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import InViewVideo from "@/components/work/InViewVideo";
import ProjectSceneLoader from "@/components/three/ProjectSceneLoader";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Shivanshu Aryan`,
    description: project.oneLiner,
  };
}

// Square hairline frame with corner ticks for every figure on the page.
// `pad` puts bright diagrams on a dark panel so they read as figures, not glare.
function Frame({
  children,
  caption,
  pad = false,
}: {
  children: ReactNode;
  caption?: string;
  pad?: boolean;
}) {
  return (
    <figure className="ticks border border-hairline bg-graphite">
      <div className={pad ? "bg-panel p-4 sm:p-8" : "overflow-hidden"}>{children}</div>
      {caption && (
        <figcaption className="border-t border-hairline px-5 py-4 font-body text-[14px] leading-relaxed text-steel">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function LoopVideo({ src, caption, label }: { src: string; caption?: string; label: string }) {
  return (
    <Frame caption={caption}>
      <InViewVideo src={src} label={caption ?? label} className="block h-auto w-full bg-obsidian" />
    </Frame>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="max-w-[68ch] space-y-5">
      {items.map((p, i) => (
        <p key={i} className="font-body text-[16px] leading-relaxed text-chrome/85 sm:text-[17px]">
          {p}
        </p>
      ))}
    </div>
  );
}

function ProseBlock({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <section className="grid gap-5 border-t border-hairline pt-10 md:grid-cols-[minmax(0,200px)_minmax(0,1fr)] md:gap-12">
      <h2 className="md:sticky md:top-24 md:self-start">
        <Label as="span">{heading}</Label>
      </h2>
      <Paragraphs items={paragraphs} />
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="relative isolate">
      {/* Faint studio light at the top, plus a masked hairline grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px]">
        <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgb(160_180_205/0.12),transparent_70%)]" />
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_80%_at_50%_0%,black,transparent)]" />
      </div>

      <header className="border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-5 pb-14 pt-12 sm:px-8 lg:px-12 lg:pb-20 lg:pt-16">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-body text-[14px] text-steel transition-colors hover:text-chrome"
          >
            <ArrowLeft size={16} weight="regular" aria-hidden="true" />
            Back to projects
          </Link>

          <h1 className="mt-10 max-w-[22ch] font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-300 leading-[1.04] tracking-[-0.03em] text-chrome">
            {project.title}
          </h1>
          <p className="mt-6 max-w-[62ch] font-body text-[17px] leading-relaxed text-steel sm:text-[19px]">
            {project.oneLiner}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Pill key={t} tone="neutral" size="md">
                {t}
              </Pill>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1040px]">
          <div className="space-y-8">
            {project.threeD && (
              <div className="ticks overflow-hidden border border-hairline">
                <ProjectSceneLoader kind={project.threeD} />
              </div>
            )}

            {project.image && (
              <Frame caption={project.image.caption} pad>
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes="(min-width: 1100px) 980px, 100vw"
                  className="block h-auto w-full"
                />
              </Frame>
            )}

            {project.video && (
              <LoopVideo
                src={project.video.src}
                caption={project.video.caption}
                label={`${project.title}, demo clip`}
              />
            )}

            {project.problemStatement && (
              <div className="ticks border border-hairline bg-graphite/70 p-6 sm:p-10">
                <h2>
                  <Label as="span">Problem statement</Label>
                </h2>
                <div className="mt-5">
                  <Paragraphs items={project.problemStatement} />
                </div>
                {project.rulebook && (
                  <div className="mt-8">
                    <Button href={project.rulebook.href} variant="primary">
                      {project.rulebook.label}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {project.algorithmVideo && (
              <LoopVideo
                src={project.algorithmVideo.src}
                caption={project.algorithmVideo.caption}
                label={`${project.title}, algorithm clip`}
              />
            )}
          </div>

          <div className="mt-20 space-y-16">
            {project.sections ? (
              <>
                <ProseBlock heading="Motivation" paragraphs={project.sections.motivation} />
                <ProseBlock heading="Approach" paragraphs={project.sections.approach} />
                <ProseBlock heading="What didn't work" paragraphs={project.sections.tradeoffs} />
                <ProseBlock heading="Result" paragraphs={project.sections.result} />
              </>
            ) : (
              project.summary && <ProseBlock heading="Overview" paragraphs={project.summary} />
            )}
          </div>

          {project.gallery && (
            <div className="mt-20 grid gap-6 md:grid-cols-2">
              {project.gallery.map((g, i) => (
                <div
                  key={g.src}
                  className={i === 0 && project.gallery!.length % 2 === 1 ? "md:col-span-2" : ""}
                >
                  <Frame caption={g.caption} pad>
                    <Image
                      src={g.src}
                      alt={g.caption}
                      width={g.width}
                      height={g.height}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="block h-auto w-full"
                    />
                  </Frame>
                </div>
              ))}
            </div>
          )}

          {project.links.length > 0 && (
            <div className="mt-20 flex flex-col gap-3 border-t border-hairline pt-10 sm:flex-row sm:flex-wrap">
              {project.links.map((l) => (
                <Button key={l.href} href={l.href} variant="ghost">
                  {l.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
