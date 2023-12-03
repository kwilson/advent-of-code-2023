import path from 'node:path';
import { readFile } from '../common/readFile';
import { getPartNumbers } from './getPartNumbers';

async function main() {
  const data = await readFile(path.resolve(__dirname, './input.txt'));
  const parts = getPartNumbers(data);
  const sum = parts.reduce((total, part) => total + part, 0);
  console.log({ sum });
}

main();
