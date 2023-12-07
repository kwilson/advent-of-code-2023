import { expect, test } from 'vitest';
import { getHandType, handType } from './getHandType';

test.each<{ hand: string; expected: number }>([
  { hand: 'AAAAA', expected: handType.fiveOfKind },
  { hand: 'AA8AA', expected: handType.fourOfKind },
  { hand: '23332', expected: handType.fullHouse },
  { hand: 'TTT98', expected: handType.threeOfKind },
  { hand: '23432', expected: handType.twoPair },
  { hand: 'A23A4', expected: handType.pair },
  { hand: '23456', expected: handType.highCard },
])('for hand $hand, returns value of $expected', ({ hand, expected }) => {
  const result = getHandType(hand.split(''));
  expect(result).toBe(expected);
});
