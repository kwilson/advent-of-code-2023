import { expect, test } from 'vitest';
import { getHistoricPrediction } from './getHistoricPrediction';

test.each([
  { input: '0 3 6 9 12 15', expected: -3 },
  { input: '1 3 6 10 15 21', expected: 0 },
  { input: '10 13 16 21 30 45', expected: 5 },
])('returns $expected for the input $input', ({ input, expected }) => {
  const result = getHistoricPrediction(input.split(' ').map(Number));
  expect(result).toEqual(expected);
});
