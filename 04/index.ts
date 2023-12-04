import path from 'node:path';
import { readFile } from '../common/readFile';
import { getCardScore } from './getCardScore';
import { parseLine } from './parseLine';
import { getCardCount } from './getCardCount';

async function main() {
  const data = await readFile(path.resolve(__dirname, './input.txt'));

  const inputs = data.filter(Boolean).map(parseLine);

  const scores = inputs.map(({ winningNumbers, yourNumbers }) =>
    getCardScore(winningNumbers, yourNumbers),
  );

  const sum = scores.reduce((total, value) => total + value, 0);
  const cardCount = getCardCount(inputs);

  console.log({ sum, cardCount });
}

main();
