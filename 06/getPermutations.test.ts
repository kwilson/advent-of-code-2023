import { expect, test } from 'vitest';
import { Race, getPermutations } from './getPermutations';

test.each<{ race: Race; expected: number }>([
  { race: { time: 7, distance: 9 }, expected: 4 },
  { race: { time: 15, distance: 40 }, expected: 8 },
  { race: { time: 30, distance: 200 }, expected: 9 },
])(
  'for distance $race.distance and time $race.time, there are $expected permutations',
  ({ race, expected }) => {
    const result = getPermutations(race);
    expect(result).toBe(expected);
  },
);
