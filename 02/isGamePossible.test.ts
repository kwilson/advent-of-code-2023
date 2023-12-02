import { expect, test } from 'vitest';
import { isGamePossible } from './isGamePossible';
import { GameSet } from './parseGame';

// 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

// 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red

test.each<{ sets: GameSet[]; available: GameSet; expected: boolean }>([
  {
    available: { red: 12, green: 13, blue: 14 },
    sets: [
      { red: 4, green: 0, blue: 3 },
      { red: 1, green: 2, blue: 6 },
      { red: 0, green: 2, blue: 0 },
    ],
    expected: true,
  },
  {
    available: { red: 12, green: 13, blue: 14 },
    sets: [
      { red: 0, green: 2, blue: 1 },
      { red: 1, green: 3, blue: 4 },
      { red: 0, green: 1, blue: 1 },
    ],
    expected: true,
  },
  {
    available: { red: 12, green: 13, blue: 14 },
    sets: [
      { red: 6, green: 3, blue: 1 },
      { red: 1, green: 2, blue: 2 },
    ],
    expected: true,
  },
  {
    available: { red: 12, green: 13, blue: 14 },
    sets: [
      { red: 20, green: 8, blue: 6 },
      { red: 4, green: 13, blue: 5 },
      { red: 1, green: 5, blue: 0 },
    ],
    expected: false,
  },
  {
    available: { red: 12, green: 13, blue: 14 },
    sets: [
      { red: 3, green: 1, blue: 6 },
      { red: 6, green: 3, blue: 0 },
      { red: 14, green: 3, blue: 15 },
    ],
    expected: false,
  },
])(
  'when input is $available, result is $expected',
  ({ sets, available, expected }) => {
    const result = isGamePossible(sets, available);
    expect(result).toEqual(expected);
  },
);
