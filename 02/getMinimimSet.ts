import { GameSet } from './parseGame';

function getMaxForKey<T extends Record<string, number>>(
  key: keyof T,
  values: T[],
): number {
  return Math.max(...values.map<number>((x) => x[key]));
}

export function getMinimumSet(sets: GameSet[]): GameSet {
  return {
    red: getMaxForKey('red', sets),
    green: getMaxForKey('green', sets),
    blue: getMaxForKey('blue', sets),
  };
}
