const TONES = {
  servo: "border-ember/40 text-chrome",
  neutral: "border-hairline-2 text-steel",
  // Legacy tone names
  accent: "border-ember/40 text-chrome",
  terracotta: "border-ember/40 text-chrome",
  sage: "border-hairline-2 text-steel",
  gold: "border-hairline-2 text-steel",
} as const;

const SIZES = {
  sm: "px-2.5 py-[3px] text-[11.5px]",
  md: "px-3 py-1 text-[12.5px]",
} as const;

// Hairline pill tag.
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
      className={`inline-flex items-center rounded-full border font-body font-500 tracking-[0.01em] ${SIZES[size]} ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
