const TONES = {
  terracotta: "text-accent border-accent/35 bg-accent-soft",
  sage: "text-dim border-noir-border bg-white/[0.02]",
  gold: "text-accent border-accent/35 bg-accent-soft",
  accent: "text-accent border-accent/35 bg-accent-soft",
  neutral: "text-dim border-noir-border bg-white/[0.02]",
} as const;

export default function Pill({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[3px] border px-2.5 py-1 font-mono text-[10.5px] font-500 uppercase tracking-[0.06em] ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
