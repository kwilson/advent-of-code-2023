import { GameSet } from './parseGame';

export function isGamePossible(sets: GameSet[], available: GameSet) {
  return sets.every(({ red, green, blue }) => {
    return (
      green <= available.green && red <= available.red && blue <= available.blue
    );
  });
}
