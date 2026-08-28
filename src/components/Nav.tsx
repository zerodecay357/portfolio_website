"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#builds", label: "More Builds" },
  { href: "/#cv", label: "CV" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Close on Escape, and whenever the viewport grows back to desktop width.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mql = window.matchMedia("(min-width: 640px)");
    const onResize = () => {
      if (mql.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    mql.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mql.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="h-[3px] w-full bg-gradient-to-b from-terracotta to-blush" />
      <nav className="mx-auto flex max-w-[1180px] items-center justify-center px-5 py-3 sm:px-10">
        <ul className="hidden items-center gap-6 sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-heading text-[13px] font-600 uppercase tracking-wide text-muted transition-colors hover:text-terracotta"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:text-terracotta sm:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 5H18M2 10H18M2 15H18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-black/5 sm:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2.5 font-heading text-[14px] font-600 uppercase tracking-wide text-muted transition-colors hover:bg-terracotta/10 hover:text-terracotta"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
