import { expect, test } from 'vitest';
import { Point, getDistanceBetweenPoints } from './getDistanceBetweenPoints';

test.each<{ a: Point; b: Point; expected: number }>([
  { a: [6, 1], b: [11, 5], expected: 9 },
  { a: [2, 0], b: [7, 12], expected: 17 },
  { a: [11, 0], b: [11, 5], expected: 5 },
  { a: [2, 0], b: [5, 8], expected: 11 },
  { a: [0, 4], b: [1, 9], expected: 6 },
  { a: [7, 12], b: [5, 8], expected: 6 },
  { a: [7, 12], b: [10, 9], expected: 6 },
])('distance between $a and $b is $expected', ({ a, b, expected }) => {
  expect(getDistanceBetweenPoints(a, b)).toBe(expected);
  expect(getDistanceBetweenPoints(b, a)).toBe(expected);
});
