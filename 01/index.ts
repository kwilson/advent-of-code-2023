import fs from 'node:fs';
import path from 'node:path';
import { getLineValue } from './getLineValue';

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
  const total = data.reduce((total, line) => total + getLineValue(line), 0);
  console.log(total);
}

main();
