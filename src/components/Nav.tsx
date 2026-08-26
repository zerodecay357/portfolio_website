import Link from "next/link";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#builds", label: "Builds" },
  { href: "/#cv", label: "Academics" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-noir-border bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3.5 sm:px-10">
        <Link href="/" className="font-heading text-lg font-700 text-ink">
          Zero<span className="text-accent">.</span>
        </Link>
        <nav className="hidden items-center gap-7 sm:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[11.5px] font-500 uppercase tracking-[0.08em] text-dim transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <a
          href="/cv/Shivanshu_Aryan_CV.pdf"
          download
          className="rounded-[3px] border border-noir-border px-4 py-2 font-mono text-[11px] font-500 uppercase tracking-[0.08em] text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
