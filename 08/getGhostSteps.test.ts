import { expect, test } from 'vitest';
import { parseInput } from './parseInput';
import { getGhostSteps } from './getGhostSteps';

test('returns the expected steps', () => {
  const input = `
  LR

  11A = (11B, XXX)
  11B = (XXX, 11Z)
  11Z = (11B, XXX)
  22A = (22B, XXX)
  22B = (22C, 22C)
  22C = (22Z, 22Z)
  22Z = (22B, 22B)
  XXX = (XXX, XXX)
  `
    .split('\n')
    .slice(1)
    .map((x) => x.trim());

  const map = parseInput(input);
  const result = getGhostSteps('A', 'Z', map);

  expect(result).toEqual(6);
});
