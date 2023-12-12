import fs from 'node:fs';
import path from 'node:path';
import { getExpandedUniverse } from './getExpandedUniverse';
import { getGalaxyCoordinates } from './getGalaxyCoordinates';
import { getDistanceBetweenPoints } from './getDistanceBetweenPoints';

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
  const universe = getExpandedUniverse(data.map((row) => row.trim().split('')));
  const galaxies = getGalaxyCoordinates(universe);

  let pairs = 0;
  const distances = galaxies.reduce((total, galaxy, index) => {
    const otherGalaxies = galaxies.slice(index + 1);

    otherGalaxies.forEach((otherGalaxy) => {
      total += getDistanceBetweenPoints(galaxy, otherGalaxy);
      pairs++;
    });

    return total;
  }, 0);

  console.log({
    galaxies,
    distances,
    pairs,
  });
}

main();
