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

test.each([
  { a: '32T3K', b: 'KK677', wildcard: 'J', expected: -1 },
  { a: 'KK677', b: 'T55J5', wildcard: 'J', expected: -1 },
  { a: 'T55J5', b: 'QQQJA', wildcard: 'J', expected: -1 },
  { a: 'QQQJA', b: 'KTJJT', wildcard: 'J', expected: -1 },
  { a: 'AAAAA', b: 'AAAAA', wildcard: 'J', expected: 0 },
])(
  '$a compared to $b returns $expected with wildcard $wildcard',
  ({ a, b, expected, wildcard }) => {
    const result = compareHands(a.split(''), b.split(''), wildcard);
    expect(result).toBe(expected);
  },
);
