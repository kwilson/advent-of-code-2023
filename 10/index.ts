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

const verticalPipes = /F-*J|L-*7|\|/g;

async function main() {
  const map = parseData(await getData());
  const startPoint = getStartPoint(map);

  let currentPosition: typeof startPoint = [...startPoint];

  function getNextPoint() {
    const nextPoints = getPotentialNextMoves(currentPosition, map);
    return nextPoints.filter((x) => !visitedPoints.has(x.toString())).at(0);
  }

  const visitedPoints = new Map<string, { char: string }>();
  let nextPoint = getNextPoint();

  while (nextPoint) {
    currentPosition = nextPoint;

    const char = map[currentPosition[0]][currentPosition[1]];
    visitedPoints.set(currentPosition.toString(), { char });
    nextPoint = getNextPoint();
  }

  // Look for enclosed areas
  let enclosedCount = 0;

  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const row = map[rowIndex];

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const currentPositionKey = [rowIndex, columnIndex].toString();
      const isWall = visitedPoints.has(currentPositionKey);

      // Ignore walls
      if (isWall) {
        continue;
      }

      // get all points from left to here
      const pointsToHere = row
        .slice(0, columnIndex + 1)
        .map((_, i) => [rowIndex, i]);

      // Then get the string path to here
      const pathToHere = pointsToHere.map((point) => {
        const value = visitedPoints.get(point.toString());
        if (value) {
          return value.char;
        }

        return '.';
      });

      // if points cross odd number of pipes, it's inside
      // https://en.wikipedia.org/wiki/Even%E2%80%93odd_rule
      const matches = [...pathToHere.join('').matchAll(verticalPipes)].length;

      if (matches % 2 === 1) {
        enclosedCount++;
      }
    }
  }

  console.log({
    currentPosition,
    count: visitedPoints.size,
    distance: visitedPoints.size / 2,
    enclosedCount,
  });
}

main();
