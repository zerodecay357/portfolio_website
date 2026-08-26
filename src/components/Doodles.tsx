export function SquiggleDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="150"
      height="60"
      viewBox="0 0 150 60"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 40 L26 12 L44 44 L64 10 L86 46 L108 12 L132 42"
        fill="none"
        stroke="var(--terracotta)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkleDoodle({ className = "", fill = "var(--terracotta)" }: { className?: string; fill?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className={className} aria-hidden="true">
      <path
        d="M22 2 L26 18 L42 22 L26 26 L22 42 L18 26 L2 22 L18 18 Z"
        fill={fill}
      />
    </svg>
  );
}

export function BlobDoodle({ className = "" }: { className?: string }) {
  return (
    <svg width="40" height="36" viewBox="0 0 40 36" className={className} aria-hidden="true">
      <path
        d="M20 34 C-6 16 6 -2 20 10 C34 -2 46 16 20 34 Z"
        fill="none"
        stroke="var(--terracotta)"
        strokeWidth="4"
      />
    </svg>
  );
}

export function WashiTape({
  className = "",
  color = "var(--gold)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={`absolute opacity-90 shadow-sm ${className}`}
      style={{ background: color }}
      aria-hidden="true"
    />
  );
}

export function WaveDoodle({ className = "" }: { className?: string }) {
  return (
    <svg width="120" height="56" viewBox="0 0 120 56" className={className} aria-hidden="true">
      <path
        d="M6 28 C26 -4 40 60 60 28 C80 -4 94 60 114 28"
        fill="none"
        stroke="var(--muted)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
