import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/lib/projects";
import Pill from "@/components/Pill";
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

function ProseBlock({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <div>
      <h2 className="font-heading text-[13px] font-700 uppercase tracking-[2px] text-accent">
        {heading}
      </h2>
      <div className="mt-4 space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="font-body text-[15.5px] leading-relaxed text-cream/90">
            {p}
          </p>
        ))}
      </div>
    </div>
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
    <article className="bg-noir">
      <div className="mx-auto max-w-[880px] px-5 py-16 sm:px-10 sm:py-24">
        <Link
          href="/#work"
          className="font-heading text-[12px] font-700 uppercase tracking-[1px] text-dim transition-colors hover:text-accent"
        >
          &larr; Back to projects
        </Link>

        <h1 className="mt-6 font-heading text-3xl font-800 leading-tight text-cream sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-[620px] font-body text-[16px] leading-relaxed text-dim sm:text-[18px]">
          {project.oneLiner}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Pill key={t} tone="neutral">
              {t}
            </Pill>
          ))}
        </div>

        {project.threeD && (
          <div className="mt-10">
            <ProjectSceneLoader kind={project.threeD} />
          </div>
        )}

        {project.video && (
          <div className="mt-10 overflow-hidden rounded-lg border border-noir-border bg-noir-surface">
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="block h-auto w-full"
            />
          </div>
        )}

        {project.problemStatement && (
          <div className="mt-10 rounded-lg border border-noir-border bg-noir-surface p-6">
            <h2 className="font-heading text-[13px] font-700 uppercase tracking-[2px] text-accent">
              Problem Statement
            </h2>
            <div className="mt-3 space-y-3">
              {project.problemStatement.map((p, i) => (
                <p key={i} className="font-body text-[15px] leading-relaxed text-cream/90">
                  {p}
                </p>
              ))}
            </div>
            {project.rulebook && (
              <a
                href={project.rulebook.href}
                target="_blank"
                rel="noopener"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 font-heading text-[12px] font-700 uppercase tracking-[1px] text-noir transition-opacity hover:opacity-90"
              >
                {project.rulebook.label} &rarr;
              </a>
            )}
          </div>
        )}

        {project.algorithmVideo && (
          <div className="mt-6 overflow-hidden rounded-lg border border-noir-border bg-noir-surface">
            <video
              src={project.algorithmVideo}
              autoPlay
              loop
              muted
              playsInline
              className="block h-auto w-full"
            />
          </div>
        )}

        <div className="mt-14 space-y-12">
          {project.sections ? (
            <>
              <ProseBlock heading="Motivation" paragraphs={project.sections.motivation} />
              <ProseBlock heading="Approach" paragraphs={project.sections.approach} />
              <ProseBlock
                heading="What Didn't Work / Trade-offs"
                paragraphs={project.sections.tradeoffs}
              />
              <ProseBlock heading="Result" paragraphs={project.sections.result} />
            </>
          ) : (
            project.summary && <ProseBlock heading="Overview" paragraphs={project.summary} />
          )}
        </div>

        <div className="mt-16 flex flex-wrap gap-3 border-t border-noir-border pt-8">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener"
              className="rounded-md border border-noir-border px-5 py-2.5 font-heading text-[12px] font-700 uppercase tracking-[1px] text-cream transition-colors hover:border-accent hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
