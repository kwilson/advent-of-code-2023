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

test.each<{ hand: string; expected: number }>([
  { hand: 'AAAAA', expected: handType.fiveOfKind },
  { hand: 'AA8AA', expected: handType.fourOfKind },
  { hand: '23332', expected: handType.fullHouse },
  { hand: 'TTT98', expected: handType.threeOfKind },
  { hand: '23432', expected: handType.twoPair },
  { hand: 'A23A4', expected: handType.pair },
  { hand: '23456', expected: handType.highCard },
  { hand: 'T55J5', expected: handType.fourOfKind },
  { hand: 'KTJJT', expected: handType.fourOfKind },
  { hand: 'QQQJA', expected: handType.fourOfKind },
  { hand: 'JJ87K', expected: handType.threeOfKind },
  { hand: 'JJJJJ', expected: handType.fiveOfKind },
  { hand: 'JJKJJ', expected: handType.fiveOfKind },
  { hand: 'JJKQJ', expected: handType.fourOfKind },

  { hand: 'T33AA', expected: handType.twoPair },
  { hand: 'J5JJ5', expected: handType.fiveOfKind },
  { hand: 'J4444', expected: handType.fiveOfKind },
  { hand: 'T5K98', expected: handType.highCard },
  { hand: '7Q6K2', expected: handType.highCard },
  { hand: '772T2', expected: handType.twoPair },
  { hand: '23228', expected: handType.threeOfKind },
  { hand: 'T254A', expected: handType.highCard },
  { hand: 'TJ584', expected: handType.pair },
  { hand: '5T555', expected: handType.fourOfKind },

  { hand: '5A5A5', expected: handType.fullHouse },
  { hand: '66K55', expected: handType.twoPair },
  { hand: '7TJK2', expected: handType.pair },
  { hand: 'Q9999', expected: handType.fourOfKind },
  { hand: '555J7', expected: handType.fourOfKind },
  { hand: 'A2Q22', expected: handType.threeOfKind },
  { hand: '699J6', expected: handType.fullHouse },
  { hand: 'QQQ66', expected: handType.fullHouse },
  { hand: 'K9KKK', expected: handType.fourOfKind },
  { hand: 'Q646Q', expected: handType.twoPair },
])(
  'for hand $hand, returns value of $expected when using wildcards',
  ({ hand, expected }) => {
    const result = getHandType(hand.split(''), 'J');
    expect(result).toBe(expected);
  },
);
