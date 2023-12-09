import { expect, test } from 'vitest';
import { parseInput } from './parseInput';
import { getSteps } from './getSteps';

test('returns the expected steps - example 1', () => {
  const input = `
  RL

  AAA = (BBB, CCC)
  BBB = (DDD, EEE)
  CCC = (ZZZ, GGG)
  DDD = (DDD, DDD)
  EEE = (EEE, EEE)
  GGG = (GGG, GGG)
  ZZZ = (ZZZ, ZZZ)
  `
    .split('\n')
    .slice(1)
    .map((x) => x.trim());

  const map = parseInput(input);
  const result = getSteps('AAA', 'ZZZ', map);

  expect(result).toEqual(['AAA', 'CCC', 'ZZZ']);
});

test('returns the expected steps - example 2', () => {
  const input = `
  LLR

  AAA = (BBB, BBB)
  BBB = (AAA, ZZZ)
  ZZZ = (ZZZ, ZZZ)
  `
    .split('\n')
    .slice(1)
    .map((x) => x.trim());

  const map = parseInput(input);

  const result = getSteps('AAA', 'ZZZ', map);

  expect(result).toEqual(['AAA', 'BBB', 'AAA', 'BBB', 'AAA', 'BBB', 'ZZZ']);
});
