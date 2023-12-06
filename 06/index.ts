import path from 'node:path';
import { readFile } from '../common/readFile';
import { Race, getPermutations } from './getPermutations';

async function main() {
  const data = await readFile(path.resolve(__dirname, './input.txt'));

  const [times, distances] = data.map(
    (line) => line.split(':').at(1)?.trim().split(/\s+/).map(Number),
  );

  const races = times?.map<Race>((time, index) => ({
    time,
    distance: distances?.at(index) ?? -1,
  }));

  const permutations = races?.map(getPermutations);
  const product = permutations?.reduce((a, b) => a * b);
  console.log({ product });

  const [badKerningTime, badKermingDistance] = data.map((line) =>
    Number(line.split(':').at(1)?.trim().split(/\s+/).join('')),
  );

  const badKerningRace: Race = {
    distance: badKermingDistance,
    time: badKerningTime,
  };
  const badKerningPermutations = getPermutations(badKerningRace);

  console.log({ badKerningPermutations });
}

main();
