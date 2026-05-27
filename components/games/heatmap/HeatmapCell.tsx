"use client";

const BACKGROUNDS = [
  "var(--color-surface-2)",
  "rgba(var(--color-accent-rgb), 0.3)",
  "rgba(var(--color-accent-rgb), 0.55)",
  "rgba(var(--color-accent-rgb), 0.8)",
  "rgba(var(--color-accent-rgb), 1)",
];

export function HeatmapCell({
  row,
  col,
  intensity,
  onPaint,
}: {
  row: number;
  col: number;
  intensity: number;
  onPaint: (row: number, col: number) => void;
}) {
  const level = Math.max(0, Math.min(4, intensity));
  return (
    <button
      type="button"
      aria-label={`Paint cell row ${row + 1}, column ${col + 1} (intensity ${level})`}
      onClick={() => onPaint(row, col)}
      className="aspect-square w-full min-w-0 rounded-[1px] transition-colors duration-150 ease-out hover:outline hover:outline-1 hover:outline-accent"
      style={{ backgroundColor: BACKGROUNDS[level] }}
    />
  );
}

export default HeatmapCell;
