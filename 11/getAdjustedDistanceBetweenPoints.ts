export type Point = [number, number];

export function getAdjustedDistanceBetweenPoints(
  [xa, ya]: Point,
  [xb, yb]: Point,
  emptyRows: number[],
  emptyColumns: number[],
  emptySize: number,
): number {
  const [lowX, highX] = [Math.min(xa, xb), Math.max(xa, xb)];
  const [lowY, highY] = [Math.min(ya, yb), Math.max(ya, yb)];

  const xRange = range(lowX + 1, highX);
  const emptyX = emptyRows.filter((x) => xRange.includes(x)).length;
  const xSize = highX - lowX - emptyX + emptySize * emptyX;

  const yRange = range(lowY + 1, highY);
  const emptyY = emptyColumns.filter((y) => yRange.includes(y)).length;
  const ySize = highY - lowY - emptyY + emptySize * emptyY;

  return xSize + ySize;
}

function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill(null)
    .map((_, idx) => start + idx);
}
