import { expect, test } from 'vitest';
import { getPotentialNextMoves } from './getPotentialNextMoves';

const map = `
-L|F7
7S-7|
L|7||
-L-J|
L|-JF
`
  .split('\n')
  .filter(Boolean)
  .map((line) => line.split(''));

test.each([
  { start: '[1, 1]', expected: '[ [1, 2], [2, 1] ]' },
  { start: '[2, 1]', expected: '[ [1, 1], [3, 1] ]' },
  { start: '[3, 1]', expected: '[ [2, 1], [3, 2] ]' },
  { start: '[3, 2]', expected: '[ [3, 1], [3, 3] ]' },
  { start: '[3, 3]', expected: '[ [3, 2], [2, 3] ]' },
  { start: '[2, 3]', expected: '[ [3, 3], [1, 3] ]' },
  { start: '[1, 3]', expected: '[ [2, 3], [1, 2] ]' },
  { start: '[1, 2]', expected: '[ [1, 3], [1, 1] ]' },
])(
  'returns $expected when input is $start',
  ({ start: startString, expected: expectedString }) => {
    const start = JSON.parse(startString) as [number, number];
    const expected = JSON.parse(expectedString) as [number, number][];

    const result = getPotentialNextMoves(start, map);
    expect(result.sort()).toEqual(expected.sort());
  },
);
