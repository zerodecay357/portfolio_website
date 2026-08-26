export default function Footer() {
  return (
    <footer
      id="contact"
      className="w-full bg-noir px-5 py-16 text-cream sm:px-10"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-800 uppercase tracking-wide text-cream">
            Let&rsquo;s talk
          </h2>
          <p className="mt-3 max-w-md text-sm text-dim">
            Open to research collaborations, internships, and anything that
            needs someone comfortable moving between hardware, theory, and
            production code.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:cs1240237@iitd.ac.in"
            className="rounded-md bg-accent px-4 py-2.5 font-heading text-[12px] font-600 tracking-wide text-noir transition-opacity hover:opacity-90"
          >
            EMAIL
          </a>
          <a
            href="https://github.com/zerodecay357"
            target="_blank"
            rel="noopener"
            className="rounded-md border border-noir-border px-4 py-2.5 font-heading text-[12px] font-600 tracking-wide text-cream transition-colors hover:border-accent hover:text-accent"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/shivanshu-aryan"
            target="_blank"
            rel="noopener"
            className="rounded-md border border-noir-border px-4 py-2.5 font-heading text-[12px] font-600 tracking-wide text-cream transition-colors hover:border-accent hover:text-accent"
          >
            LINKEDIN
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1180px] border-t border-noir-border pt-6 text-[12px] text-dim">
        © {new Date().getFullYear()} Shivanshu Aryan.
      </div>
    </footer>
  );
}
