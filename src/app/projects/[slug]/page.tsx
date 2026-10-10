import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { projects, getProject } from "@/lib/projects";
import Pill from "@/components/Pill";
import Button from "@/components/ui/Button";
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
    title: `${project.title} · Shivanshu Aryan`,
    description: project.oneLiner,
  };
}

// Bordered chamfer frame for every figure on the page.
function Frame({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <figure className="plate">
      <div className="plate-inner overflow-hidden">
        {children}
        {caption && (
          <figcaption className="border-t border-conduit px-5 py-4 font-body text-[14px] leading-relaxed text-fog">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

function LoopVideo({ src, caption }: { src: string; caption?: string }) {
  return (
    <Frame caption={caption}>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={caption}
        className="block h-auto w-full bg-void"
      />
    </Frame>
  );
}

function ProseBlock({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <section className="grid gap-5 border-t border-conduit pt-10 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:gap-12">
      <h2 className="font-display text-[32px] font-700 leading-none tracking-tight text-phosphor md:sticky md:top-24 md:self-start">
        <span aria-hidden="true" className="mb-4 block h-[2px] w-8 bg-servo" />
        {heading}
      </h2>
      <div className="max-w-[68ch] space-y-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="font-body text-[17px] leading-relaxed text-phosphor/85">
            {p}
          </p>
        ))}
      </div>
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
    <article className="bg-void">
      {/* Header plate over a fading blueprint grid */}
      <header className="relative isolate overflow-hidden border-b border-conduit">
        <div
          aria-hidden="true"
          className="bg-blueprint absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <div className="mx-auto max-w-[1320px] px-5 pb-14 pt-12 sm:px-8 lg:px-12 lg:pb-20 lg:pt-16">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-body text-[14px] text-fog transition-colors hover:text-servo"
          >
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            Back to projects
          </Link>

          <h1 className="mt-10 max-w-[18ch] font-display text-[48px] font-800 uppercase leading-[0.92] tracking-tight text-phosphor sm:text-[68px] lg:text-[88px]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-[62ch] font-body text-[18px] leading-relaxed text-fog sm:text-[20px]">
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

      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1040px]">
          <div className="space-y-8">
            {project.threeD && (
              <div className="plate">
                <div className="plate-inner overflow-hidden">
                  <ProjectSceneLoader kind={project.threeD} />
                </div>
              </div>
            )}

            {project.image && (
              <Frame caption={project.image.caption}>
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes="(min-width: 1100px) 1040px, 100vw"
                  className="block h-auto w-full"
                />
              </Frame>
            )}

            {project.video && (
              <LoopVideo src={project.video.src} caption={project.video.caption} />
            )}

            {project.problemStatement && (
              <div className="plate">
                <div className="plate-inner p-6 sm:p-10">
                  <h2 className="font-display text-[32px] font-700 leading-none tracking-tight text-phosphor">
                    Problem statement
                  </h2>
                  <div className="mt-5 max-w-[68ch] space-y-4">
                    {project.problemStatement.map((p, i) => (
                      <p key={i} className="font-body text-[17px] leading-relaxed text-phosphor/85">
                        {p}
                      </p>
                    ))}
                  </div>
                  {project.rulebook && (
                    <div className="mt-8">
                      <Button href={project.rulebook.href} variant="primary">
                        {project.rulebook.label}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {project.algorithmVideo && (
              <LoopVideo
                src={project.algorithmVideo.src}
                caption={project.algorithmVideo.caption}
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
                  <Frame caption={g.caption}>
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
            <div className="mt-20 flex flex-col gap-3 border-t border-conduit pt-10 sm:flex-row sm:flex-wrap">
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
