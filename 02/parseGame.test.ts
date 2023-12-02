import { expect, test } from 'vitest';
import { Game, parseGame } from './parseGame';

test.each<{ input: string; expected: Game }>([
  {
    input:
      'Game 1: 8 green; 5 green, 6 blue, 1 red; 2 green, 1 blue, 4 red; 10 green, 1 red, 2 blue; 2 blue, 3 red',
    expected: {
      id: 1,
      sets: [
        { blue: 0, green: 8, red: 0 },
        { blue: 6, green: 5, red: 1 },
        { blue: 1, green: 2, red: 4 },
        { blue: 2, green: 10, red: 1 },
        { blue: 2, green: 0, red: 3 },
      ],
    },
  },
])('when input is $input, result is correct', ({ input, expected }) => {
  const result = parseGame(input);
  expect(result).toEqual(expected);
});
