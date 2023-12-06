import path from 'node:path';
import { readFile } from '../common/readFile';
import { parseInput } from './parseInput';
import { getLocationMap, getMapping } from './getLocationMap';

async function main() {
  const data = await readFile(path.resolve(__dirname, './input.txt'));

  const targetType = 'location';
  const { inputs, maps } = parseInput(data);
  const result = getLocationMap(inputs, targetType, maps);

  const locations = result
    .map((line) => line.filter(([type]) => type === targetType))
    .map(([value]) => value)
    .map(([, value]) => value);

  console.log({ min: Math.min(...locations) });

  const chunkSize = 2;
  const chunked: number[][] = [];
  for (let i = 0; i < inputs.values.length; i += chunkSize) {
    const chunk = inputs.values.slice(i, i + chunkSize);
    chunked.push(chunk);
  }

  let smallestLocation = Infinity;
  for (let i = 0; i < chunked.length; i++) {
    const [value, range] = chunked[i];
    console.log(`chunk ${i + 1} of ${chunked.length}`);

    for (let j = value; j < range + value; j++) {
      const thisValue = getMapping(inputs.type, targetType, j, maps);

      const target = thisValue.find((x) => x[0] === targetType)?.at(1);
      if (typeof target === 'number' && target < smallestLocation) {
        smallestLocation = target;
        console.log({ smallestLocation });
      }
    }
  }

  console.log({ smallestLocation });
}

main();
