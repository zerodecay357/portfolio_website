import type { ReactNode } from "react";

/**
 * Two-tone light headline (the reference's "Physical Intelligence /
 * Starts Here." treatment): the lead in chrome, the follow-on in steel.
 * Hanken Grotesk 300, tight tracking, sentence case.
 */
export default function Headline({
  lead,
  follow,
  as: Tag = "h2",
  size = "section",
  className = "",
}: {
  lead: ReactNode;
  follow?: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "hero" | "section" | "tile";
  className?: string;
}) {
  const sizes = {
    hero: "text-[clamp(3rem,6.4vw,6.25rem)] leading-[0.98] tracking-[-0.035em]",
    section: "text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.03em]",
    tile: "text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.08] tracking-[-0.02em]",
  } as const;
  return (
    <Tag className={`font-display font-300 text-chrome ${sizes[size]} ${className}`}>
      <span className="block">{lead}</span>
      {follow && <span className="block text-steel">{follow}</span>}
    </Tag>
  );
}
