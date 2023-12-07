import fs from 'node:fs';
import path from 'node:path';
import { Hand, getInputData } from './getInputData';
import { compareHands } from './compareHands';

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

function sortHands(a: Hand, b: Hand): number {
  return compareHands(a.cards, b.cards);
}

async function main() {
  const data = getInputData(await getData());
  const sorted = data.sort(sortHands);
  const result = sorted.reduce((total, hand, index) => {
    const rank = index + 1;
    return total + hand.rank * rank;
  }, 0);

  console.log(result);
}

main();
