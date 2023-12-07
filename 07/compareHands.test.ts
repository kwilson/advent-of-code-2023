import { expect, test } from 'vitest';
import { compareHands } from './compareHands';

test.each([
  { a: '32T3K', b: 'KTJJT', expected: -1 },
  { a: 'KTJJT', b: 'KK677', expected: -1 },
  { a: 'KK677', b: 'T55J5', expected: -1 },
  { a: 'T55J5', b: 'QQQJA', expected: -1 },
  { a: 'AAAAA', b: 'AAAAA', expected: 0 },
])('$a compared to $b returns $expected', ({ a, b, expected }) => {
  const result = compareHands(a.split(''), b.split(''));
  expect(result).toBe(expected);
});
