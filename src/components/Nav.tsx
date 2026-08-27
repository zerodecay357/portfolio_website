import Link from "next/link";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#builds", label: "More Builds" },
  { href: "/#cv", label: "CV" },
  { href: "/#about", label: "About" },
  { href: "/blog", label: "Blog", newTab: true },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="h-[3px] w-full bg-gradient-to-b from-terracotta to-blush" />
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-3 sm:px-10">
        <Link
          href="/"
          className="font-heading text-sm font-800 tracking-wide text-ink"
        >
          Shivanshu&nbsp;<span className="text-terracotta">Zero</span>
        </Link>
        <ul className="hidden items-center gap-6 sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target={l.newTab ? "_blank" : undefined}
                rel={l.newTab ? "noopener" : undefined}
                className="font-heading text-[13px] font-600 uppercase tracking-wide text-muted transition-colors hover:text-terracotta"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
