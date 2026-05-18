// Shared UI primitives used across multiple sections

export function Squiggle({ width = 120, strokeWidth = 1.2, opacity = 0.5, className = '', ...props }) {
  const height = (width * 18) / 120
  return (
    <svg
      viewBox="0 0 120 18"
      width={width}
      height={height}
      className={`block ${className}`}
      style={{ opacity }}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2 9 Q 12 1, 22 9 T 42 9 T 62 9 T 82 9 T 102 9 T 118 9"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SmallDot({ color = 'var(--accent)' }) {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full align-middle mx-2 shrink-0"
      style={{ background: color }}
    />
  )
}

export function Kicker({ children, ...props }) {
  return (
    <p {...props} className="inline-flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--ink-soft)] m-0 mb-[18px]">
      {children}
    </p>
  )
}

export function SectionTitle({ children, className = '', ...props }) {
  return (
    <h2 {...props} className={`font-[family-name:var(--font-display)] font-normal text-[clamp(48px,6vw,88px)] leading-[1.02] tracking-[-0.02em] m-0 mb-12 text-[var(--ink)] ${className}`}>
      {children}
    </h2>
  )
}
