// Shared dot data — used by both LoadingOverlay (canvas) and DotBackground (DOM)
// Same seed = same positions, so the canvas animation lands exactly where the static dots are

export const COLORS = [
  "#e63312", "#f5821f", "#f9c623", "#1b2fa8",
  "#e8510a", "#ffd700", "#cc2200", "#ff4400",
  "#ffb347", "#4169e1", "#dc143c", "#ff6b00",
  "#ff8c00", "#1a0080", "#f0a500",
];

export const DOT_COUNT = 1100;

function makeRng(seed) {
  let s = seed | 0;
  return () => {
    s = Math.imul(48271, s) | 0;
    return (s >>> 0) / 0x80000000;
  };
}

export function generateDots() {
  const rng = makeRng(7391);
  return Array.from({ length: DOT_COUNT }, (_, i) => ({
    id: i,
    leftPct: rng() * 100,
    topPct: rng() * 100,
    size: rng() * 5 + 2,
    color: COLORS[Math.floor(rng() * COLORS.length)],
  }));
}
