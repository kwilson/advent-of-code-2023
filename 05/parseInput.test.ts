import { expect, test } from 'vitest';
import { parseInput } from './parseInput';
import { testData } from './testData';

test('maps as expected', () => {
  const result = parseInput(testData);
  expect(result).toEqual({
    inputs: {
      type: 'seed',
      values: [79, 14, 55, 13],
    },
    maps: {
      seed: {
        from: 'seed',
        to: 'soil',
        ranges: [
          { to: 50, from: 98, range: 2 },
          { to: 52, from: 50, range: 48 },
        ],
      },
      soil: {
        from: 'soil',
        to: 'fertilizer',
        ranges: [
          { to: 0, from: 15, range: 37 },
          { to: 37, from: 52, range: 2 },
          { to: 39, from: 0, range: 15 },
        ],
      },
      fertilizer: {
        from: 'fertilizer',
        to: 'water',
        ranges: [
          { to: 0, from: 11, range: 42 },
          { to: 42, from: 0, range: 7 },
          { to: 49, from: 53, range: 8 },
          { to: 57, from: 7, range: 4 },
        ],
      },
      water: {
        from: 'water',
        to: 'light',
        ranges: [
          { to: 18, from: 25, range: 70 },
          { to: 88, from: 18, range: 7 },
        ],
      },
      light: {
        from: 'light',
        to: 'temperature',
        ranges: [
          { to: 45, from: 77, range: 23 },
          { to: 68, from: 64, range: 13 },
          { to: 81, from: 45, range: 19 },
        ],
      },
      temperature: {
        from: 'temperature',
        to: 'humidity',
        ranges: [
          { to: 0, from: 69, range: 1 },
          { to: 1, from: 0, range: 69 },
        ],
      },
      humidity: {
        from: 'humidity',
        to: 'location',
        ranges: [
          { to: 56, from: 93, range: 4 },
          { to: 60, from: 56, range: 37 },
        ],
      },
    },
  });
});
