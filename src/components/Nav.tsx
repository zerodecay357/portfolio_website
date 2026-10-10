"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { Z } from "@/lib/z";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#builds", label: "Builds" },
  { href: "/#cv", label: "CV" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const EMAIL = "mailto:cs1240237@iitd.ac.in";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Close on Escape, and whenever the viewport grows to the desktop layout.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mql = window.matchMedia("(min-width: 1024px)");
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
    <header
      className="sticky top-0 w-full border-b border-hairline bg-obsidian/60 backdrop-blur-md"
      style={{ zIndex: Z.nav }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="Zero, home"
            className="font-display text-[22px] font-500 lowercase leading-none tracking-[-0.02em] text-chrome"
          >
            zero
          </Link>
          <span aria-hidden="true" className="hidden h-7 w-px bg-hairline-2 sm:block" />
          <Label as="div" className="hidden text-[9.5px]! leading-[1.35]! tracking-[0.2em]! sm:block">
            Robotics, theory
            <br />
            systems, markets
          </Label>
        </div>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-body text-[14px] text-chrome/70 transition-colors duration-200 hover:text-chrome"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button href={EMAIL} variant="primary" target="_self" className="hidden px-4! py-2! sm:inline-flex">
            Email me
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-chrome transition-colors hover:border-hairline-2 lg:hidden"
          >
            {open ? (
              <X size={18} weight="regular" aria-hidden="true" />
            ) : (
              <List size={18} weight="regular" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full px-3 pt-2 lg:hidden"
          >
            <div className="glass bg-obsidian/85!">
              <ul className="flex flex-col px-3 py-2">
                {LINKS.map((l) => (
                  <li key={l.href} className="border-b border-hairline last:border-b-0">
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-4 font-display text-[22px] font-300 leading-none tracking-[-0.02em] text-chrome/80 transition-colors hover:text-chrome"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="px-6 pb-6 pt-2">
                <Button href={EMAIL} variant="primary" target="_self" className="w-full">
                  Email me
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
