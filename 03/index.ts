import path from 'node:path';
import { readFile } from '../common/readFile';
import { getPartNumbers } from './getPartNumbers';
import { getGearRatios } from './getGearRatios';

async function main() {
  const data = await readFile(path.resolve(__dirname, './input.txt'));

  const parts = getPartNumbers(data);
  const sum = parts.reduce((total, part) => total + part, 0);

  const gears = getGearRatios(data);
  const gearSum = gears.reduce((total, gear) => total + gear[0] * gear[1], 0);

  console.log({ sum, gearSum });
}

main();
