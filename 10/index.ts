import fs from 'node:fs';
import path from 'node:path';
import { getStartPoint } from './getStartPoint';
import { getPotentialNextMoves } from './getPotentialNextMoves';

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

function parseData(lines: string[]): string[][] {
  return lines.map((line) => line.split(''));
}

async function main() {
  const map = parseData(await getData());
  const startPoint = getStartPoint(map);

  let currentPosition: typeof startPoint = [...startPoint];

  function getNextPoint() {
    const nextPoints = getPotentialNextMoves(currentPosition, map);
    return nextPoints.filter((x) => !visitedPoints.has(x.toString())).at(0);
  }

  const visitedPoints = new Set<string>();
  let nextPoint = getNextPoint();

  while (nextPoint) {
    currentPosition = nextPoint;
    visitedPoints.add(currentPosition.toString());
    nextPoint = getNextPoint();
  }

  console.log({
    currentPosition,
    count: visitedPoints.size,
    distance: visitedPoints.size / 2,
  });
}

main();
