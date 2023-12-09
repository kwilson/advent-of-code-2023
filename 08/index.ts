import fs from 'node:fs';
import path from 'node:path';
import { parseInput } from './parseInput';
import { getSteps } from './getSteps';

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
  const map = parseInput(await getData());
  const steps = getSteps('AAA', 'ZZZ', map);

  console.log({ steps: steps.length - 1 });
}

main();
