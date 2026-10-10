"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import { Z } from "@/lib/z";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#builds", label: "Builds" },
  { href: "/#cv", label: "CV" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const CV_HREF = "/cv/Shivanshu_Aryan_CV.pdf";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Close on Escape, and whenever the viewport grows back to desktop width.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mql = window.matchMedia("(min-width: 768px)");
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
      className="sticky top-0 w-full border-b border-conduit bg-void/80 backdrop-blur-md"
      style={{ zIndex: Z.nav }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <Link
          href="/"
          aria-label="Zero, home"
          className="group flex items-center gap-2.5"
        >
          <span
            aria-hidden="true"
            className="block h-3 w-3 bg-servo transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45"
          />
          <span className="font-display text-[26px] font-800 uppercase leading-none tracking-tight text-phosphor">
            Zero
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6 lg:gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group relative inline-block py-1 font-heading text-[14px] text-fog transition-colors duration-200 hover:text-phosphor"
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-servo transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Button href={CV_HREF} variant="primary" className="px-4! py-2!">
            Download CV
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="chamfer-sm flex h-10 w-10 items-center justify-center bg-hull-2 text-phosphor transition-colors hover:text-servo md:hidden"
        >
          {open ? (
            <X size={20} weight="bold" aria-hidden="true" />
          ) : (
            <List size={20} weight="bold" aria-hidden="true" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full px-3 pt-2 md:hidden"
          >
            <div className="plate">
              <div className="plate-inner">
                <ul className="flex flex-col px-3 py-3">
                  {LINKS.map((l) => (
                    <li key={l.href} className="border-b border-conduit last:border-b-0">
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block px-3 py-3.5 font-display text-[24px] font-700 uppercase leading-none tracking-tight text-phosphor transition-colors hover:text-servo"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="px-6 pb-6 pt-2">
                  <Button href={CV_HREF} variant="primary" className="w-full">
                    Download CV
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
