const TONES = {
  terracotta: "bg-terracotta/15 text-terracotta border-terracotta/30",
  sage: "bg-sage/15 text-sage border-sage/35",
  gold: "bg-gold/20 text-[#8a7645] border-gold/40",
  accent: "bg-accent-soft text-accent border-accent/40",
  neutral: "bg-white/5 text-dim border-noir-border",
} as const;

const SIZES = {
  sm: "px-3 py-1 text-[11px]",
  md: "px-4 py-1.5 text-[13px]",
} as const;

export default function Pill({
  children,
  tone = "neutral",
  size = "sm",
  className = "",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold uppercase tracking-wide font-heading ${SIZES[size]} ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
