const TONES = {
  servo: "bg-servo-soft text-servo",
  neutral: "bg-hull-2 text-fog",
  // Legacy tone names map onto the two above.
  accent: "bg-servo-soft text-servo",
  terracotta: "bg-servo-soft text-servo",
  sage: "bg-hull-2 text-fog",
  gold: "bg-hull-2 text-fog",
} as const;

const SIZES = {
  sm: "px-2.5 py-1 text-[12px]",
  md: "px-3 py-1.5 text-[13px]",
} as const;

// Small chamfered tag. Sentence case, Geist Mono: reads as a part label.
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
      className={`chamfer-sm inline-flex items-center font-mono ${SIZES[size]} ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
