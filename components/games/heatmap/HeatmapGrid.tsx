"use client";

import { HeatmapCell } from "./HeatmapCell";
import { HEATMAP_COLS, HEATMAP_ROWS } from "./useHeatmap";

export function HeatmapGrid({
  cells,
  onPaint,
}: {
  cells: Record<string, number>;
  onPaint: (row: number, col: number) => void;
}) {
  const items = [];
  for (let row = 0; row < HEATMAP_ROWS; row++) {
    for (let col = 0; col < HEATMAP_COLS; col++) {
      const key = `${row},${col}`;
      items.push(
        <HeatmapCell
          key={key}
          row={row}
          col={col}
          intensity={cells[key] ?? 0}
          onPaint={onPaint}
        />,
      );
    }
  }

  return (
    <div
      className="grid w-full gap-[2px]"
      style={{
        gridTemplateColumns: `repeat(${HEATMAP_COLS}, minmax(0, 1fr))`,
      }}
    >
      {items}
    </div>
  );
}

export default HeatmapGrid;
