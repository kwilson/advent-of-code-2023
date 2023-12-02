import { expect, test } from 'vitest';
import { getMinimumSet } from './getMinimimSet';
import { GameSet } from './parseGame';

// 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

// 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red

test.each<{ sets: GameSet[]; expected: GameSet }>([
  {
    // Game 1
    sets: [
      { red: 4, green: 0, blue: 3 },
      { red: 1, green: 2, blue: 6 },
      { red: 0, green: 2, blue: 0 },
    ],
    expected: { red: 4, green: 2, blue: 6 },
  },
  {
    // Game 2
    sets: [
      { red: 0, green: 2, blue: 1 },
      { red: 1, green: 3, blue: 4 },
      { red: 0, green: 1, blue: 1 },
    ],
    expected: { red: 1, green: 3, blue: 4 },
  },
  {
    // Game 3
    sets: [
      { red: 20, green: 8, blue: 6 },
      { red: 4, green: 13, blue: 5 },
      { red: 1, green: 5, blue: 0 },
    ],
    expected: { red: 20, green: 13, blue: 6 },
  },
  {
    // Game 4
    sets: [
      { red: 3, green: 1, blue: 6 },
      { red: 6, green: 3, blue: 0 },
      { red: 14, green: 3, blue: 15 },
    ],
    expected: { red: 14, green: 3, blue: 15 },
  },
  {
    // Game 5
    sets: [
      { red: 6, green: 3, blue: 1 },
      { red: 1, green: 2, blue: 2 },
    ],
    expected: { red: 6, green: 3, blue: 2 },
  },
])('when input is $sets, result is $expected', ({ sets, expected }) => {
  const result = getMinimumSet(sets);
  expect(result).toEqual(expected);
});
