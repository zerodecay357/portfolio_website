import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog · Shivanshu Aryan",
  description: "Writing, coming soon.",
};

export default function BlogPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-dotgrid px-5 py-24 text-center sm:px-10">
      <div>
        <p className="font-heading text-[11px] font-700 uppercase tracking-[3px] text-terracotta">
          Blog
        </p>
        <h1 className="mt-3 font-display text-4xl font-800 text-ink sm:text-5xl">
          Will add soon
        </h1>
        <p className="mt-4 font-body text-[16px] text-muted">
          Nothing here yet, check back later.
        </p>
      </div>
    </section>
  );
}
