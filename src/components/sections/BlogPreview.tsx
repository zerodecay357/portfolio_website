const posts: { title: string; excerpt: string; date: string }[] = [];

export default function BlogPreview() {
  return (
    <section id="writing" className="bg-noir px-5 pb-24 sm:px-10">
      <div className="mx-auto max-w-[1180px] border-t border-noir-border pt-16">
        <div className="flex items-end justify-between">
          <p className="font-heading text-[11px] font-700 uppercase tracking-[3px] text-dim">
            Writing
          </p>
          <a
            href="/blog"
            target="_blank"
            rel="noopener"
            className="font-heading text-[11px] font-700 uppercase tracking-[1px] text-accent transition-colors hover:text-cream"
          >
            View all &rarr;
          </a>
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {posts.length === 0 ? (
            <div className="flex w-full min-w-[260px] shrink-0 flex-col items-start justify-center rounded-lg border border-dashed border-noir-border bg-noir-surface/40 p-8 sm:w-[340px]">
              <p className="font-heading text-[13px] font-700 uppercase tracking-wide text-dim">
                Nothing here yet
              </p>
              <p className="mt-2 font-body text-[14px] text-dim">
                Will add or something. Check back later.
              </p>
            </div>
          ) : (
            posts.map((p) => (
              <a
                key={p.title}
                href="/blog"
                target="_blank"
                rel="noopener"
                className="flex w-[280px] shrink-0 flex-col rounded-lg border border-noir-border bg-noir-surface p-6 transition-colors hover:border-accent"
              >
                <p className="font-heading text-[11px] font-700 uppercase tracking-wide text-dim">
                  {p.date}
                </p>
                <h3 className="mt-2 font-heading text-base font-700 text-cream">
                  {p.title}
                </h3>
                <p className="mt-2 font-body text-[13.5px] leading-relaxed text-dim">
                  {p.excerpt}
                </p>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
