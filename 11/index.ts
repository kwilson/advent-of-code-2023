import fs from 'node:fs';
import path from 'node:path';
import { getExpandedUniverse } from './getExpandedUniverse';
import { getGalaxyCoordinates } from './getGalaxyCoordinates';
import { getDistanceBetweenPoints } from './getDistanceBetweenPoints';
import { Universe } from './types';
import { getAdjustedDistanceBetweenPoints } from './getAdjustedDistanceBetweenPoints';

async function getData(): Promise<string[]> {
  return new Promise((resolve) => {
    fs.readFile(path.resolve(__dirname, './input.txt'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      resolve(data.split('\n').filter(Boolean));
    });
  });
}

async function main() {
  const data = await getData();
  const initialUniverse: Universe = data.map((row) => row.trim().split(''));
  const { expandedUniverse, emptyRows, emptyColumns } =
    getExpandedUniverse(initialUniverse);

  const galaxies = getGalaxyCoordinates(initialUniverse);
  const expandedGalaxies = getGalaxyCoordinates(expandedUniverse);

  const distances = expandedGalaxies.reduce((total, galaxy, index) => {
    const otherGalaxies = expandedGalaxies.slice(index + 1);

    otherGalaxies.forEach((otherGalaxy) => {
      total += getDistanceBetweenPoints(galaxy, otherGalaxy);
    });

    return total;
  }, 0);

  const adjustedDistances = galaxies.reduce((total, galaxy, index) => {
    const otherGalaxies = galaxies.slice(index + 1);

    otherGalaxies.forEach((otherGalaxy) => {
      total += getAdjustedDistanceBetweenPoints(
        galaxy,
        otherGalaxy,
        emptyRows,
        emptyColumns,
        1_000_000,
      );
    });

    return total;
  }, 0);

  console.log({
    distances,
    adjustedDistances,
  });
}

main();
