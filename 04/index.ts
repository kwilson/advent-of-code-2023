import path from 'node:path';
import { readFile } from '../common/readFile';
import { getCardScore } from './getCardScore';

const lineRegex =
  /^Card\s+(?<id>\d+):\s+(?<winningNumbers>[\d\s]+)\s+\|\s+(?<yourNumbers>[\d\s]+)$/;

function formatValues(value: string): number[] {
  try {
    return value.trim().split(' ').filter(Boolean).map(Number);
  } catch (e) {
    console.error('Cannot format value: ' + value);
    throw e;
  }
}

async function main() {
  const data = await readFile(path.resolve(__dirname, './input.txt'));

  const inputs = data.filter(Boolean).map((line) => {
    const { id, winningNumbers, yourNumbers } =
      lineRegex.exec(line)?.groups ?? {};
    return {
      id,
      winningNumbers: formatValues(winningNumbers),
      yourNumbers: formatValues(yourNumbers),
    };
  });

  const scores = inputs.map(({ winningNumbers, yourNumbers }) =>
    getCardScore(winningNumbers, yourNumbers),
  );

  const sum = scores.reduce((total, value) => total + value, 0);

  console.log({ sum });
}

main();
