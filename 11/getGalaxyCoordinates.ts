import { Universe } from './types';

export function getGalaxyCoordinates(universe: Universe): [number, number][] {
  return universe.reduce<[number, number][]>((galaxies, row, rowIndex) => {
    row.forEach((character, columnIndex) => {
      if (character === '#') {
        galaxies.push([rowIndex, columnIndex]);
      }
    });
    return galaxies;
  }, []);
}
