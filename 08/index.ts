import fs from 'node:fs';
import path from 'node:path';
import { parseInput } from './parseInput';
import { getSteps } from './getSteps';
import { getGhostSteps } from './getGhostSteps';

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
  const map = parseInput(await getData());
  const steps = getSteps('AAA', 'ZZZ', map);
  const ghostSteps = getGhostSteps('A', 'Z', map);

  console.log({
    steps: steps.length - 1,
    ghostSteps,
  });
}

main();
