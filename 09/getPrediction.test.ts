import { expect, test } from 'vitest';
import { getPrediction } from './getPrediction';

test.each([
  { input: '0 3 6 9 12 15', expected: 18 },
  { input: '1 3 6 10 15 21', expected: 28 },
  { input: '10 13 16 21 30 45', expected: 68 },
])('returns $expected for the input $input', ({ input, expected }) => {
  const result = getPrediction(input.split(' ').map(Number));
  expect(result).toEqual(expected);
});
