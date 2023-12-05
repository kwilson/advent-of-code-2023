import path from 'node:path';
import { readFile } from '../common/readFile';
import { parseInput } from './parseInput';
import { getLocationMap } from './getLocationMap';

async function main() {
  const data = await readFile(path.resolve(__dirname, './input.txt'));

  const { inputs, maps } = parseInput(data);
  const result = getLocationMap(inputs, 'location', maps);

  const locations = result
    .map((line) => line.filter(([type]) => type === 'location'))
    .map(([value]) => value)
    .map(([, value]) => value);

  console.log(Math.min(...locations));
}

main();
