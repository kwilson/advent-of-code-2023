import { expect, test } from 'vitest';
import { testData } from './testData';
import { parseInput } from './parseInput';
import { getLocationMap } from './getLocationMap';

test('parses locations as expected', () => {
  const { inputs, maps } = parseInput(testData);
  const targetType = 'location';
  const result = getLocationMap(inputs, targetType, maps);

  expect(result).toEqual([
    [
      ['seed', 79],
      ['soil', 81],
      ['fertilizer', 81],
      ['water', 81],
      ['light', 74],
      ['temperature', 78],
      ['humidity', 78],
      ['location', 82],
    ],
    [
      ['seed', 14],
      ['soil', 14],
      ['fertilizer', 53],
      ['water', 49],
      ['light', 42],
      ['temperature', 42],
      ['humidity', 43],
      ['location', 43],
    ],
    [
      ['seed', 55],
      ['soil', 57],
      ['fertilizer', 57],
      ['water', 53],
      ['light', 46],
      ['temperature', 82],
      ['humidity', 82],
      ['location', 86],
    ],
    [
      ['seed', 13],
      ['soil', 13],
      ['fertilizer', 52],
      ['water', 41],
      ['light', 34],
      ['temperature', 34],
      ['humidity', 35],
      ['location', 35],
    ],
  ]);
});
