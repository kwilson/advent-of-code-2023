import { expect, test } from 'vitest';
import { getLineValue } from './getLineValue';

test.each([
  { input: 'two1nine', expected: 29 },
  { input: 'eightwothree', expected: 83 },
  { input: 'abcone2threexyz', expected: 13 },
  { input: 'xtwone3four', expected: 24 },
  { input: '4nineeightseven2', expected: 42 },
  { input: 'zoneight234', expected: 14 },
  { input: '7pqrstsixteen', expected: 76 },
  { input: 'f3', expected: 33 },
  { input: '5n', expected: 55 },
])('when input is $input, result is $expected', ({ input, expected }) => {
  const result = getLineValue(input);
  expect(result).toBe(expected);
});
