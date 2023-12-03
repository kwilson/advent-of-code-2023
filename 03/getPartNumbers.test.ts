import { expect, test } from 'vitest';
import { getPartNumbers } from './getPartNumbers';

test('returns expected output', () => {
  const input = `
    467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..
  `
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);

  const expected = [467, 35, 633, 617, 592, 755, 664, 598];

  const result = getPartNumbers(input);

  expect(result).toEqual(expected);
});
