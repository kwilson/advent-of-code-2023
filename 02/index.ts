import fs from 'node:fs';
import path from 'node:path';
import { GameSet, parseGame } from './parseGame';
import { isGamePossible } from './isGamePossible';

async function getData(): Promise<string[]> {
  return new Promise((resolve) => {
    fs.readFile(path.resolve(__dirname, './input.txt'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      resolve(data.split('\n'));
    });
  });
}

async function main() {
  const data = await getData();
  const games = data.filter(Boolean).map(parseGame);

  const available: GameSet = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const sumOfInvalidIds = games
    .filter((game) => isGamePossible(game.sets, available))
    .reduce((total, { id }) => total + id, 0);

  console.log({ sumOfInvalidIds });
}

main();
