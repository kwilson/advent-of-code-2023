export type Point = [number, number];

export function getDistanceBetweenPoints(
  [xa, ya]: Point,
  [xb, yb]: Point,
): number {
  return Math.abs(xb - xa) + Math.abs(yb - ya);
}
