export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-noir-border bg-noir px-5 py-14 text-cream"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-xl font-800 tracking-tight text-cream">
            Let&rsquo;s talk.
          </h2>
          <p className="mt-2 max-w-md font-body text-sm text-dim">
            Open to research collaborations, internships, and anything in
            between robotics and quant.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:cs1240237@iitd.ac.in"
            className="rounded-md bg-accent px-4 py-2 font-heading text-[12px] font-700 uppercase tracking-wide text-noir transition-opacity hover:opacity-90"
          >
            Email
          </a>
          <a
            href="https://github.com/zerodecay357"
            target="_blank"
            rel="noopener"
            className="rounded-md border border-noir-border px-4 py-2 font-heading text-[12px] font-700 uppercase tracking-wide text-cream transition-colors hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/shivanshu-aryan"
            target="_blank"
            rel="noopener"
            className="rounded-md border border-noir-border px-4 py-2 font-heading text-[12px] font-700 uppercase tracking-wide text-cream transition-colors hover:border-accent hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-5xl font-body text-xs text-dim/70">
        © {new Date().getFullYear()} Shivanshu Aryan. Built with Next.js,
        Motion &amp; React Three Fiber.
      </p>
    </footer>
  );
}
