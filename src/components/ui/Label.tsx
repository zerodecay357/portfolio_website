import type { ReactNode } from "react";

// Small tracked-out caps label (the reference's "OUR TECHNOLOGY" device).
// Rationed: use for section markers and HUD captions only, never above every heading.
export default function Label({
  children,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  // Default colour only when the caller did not pass one (a later-sorted
  // text-steel utility would otherwise silently win over overrides).
  const color = /(^|\s)text-(chrome|steel|ash|ember|white)/.test(className) ? "" : "text-steel";
  return (
    <Tag
      className={`font-body text-[11px] font-500 uppercase leading-[1.5] tracking-[0.22em] ${color} ${className}`}
    >
      {children}
    </Tag>
  );
}
