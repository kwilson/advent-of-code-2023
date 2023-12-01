import fs from 'node:fs';
import path from 'node:path';

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

const matchFirst = /^\D*(?<first>\d)/;
const matchLast = /(?<last>\d)\D*$/;

function getLineValue(line: string) {
  const { first } = matchFirst.exec(line)?.groups ?? {};
  const { last } = matchLast.exec(line)?.groups ?? {};

  const lineTotal = Number(first + last);
  if (isNaN(lineTotal)) {
    throw Error(`unable to calculate: ${first} + ${last} from ${line}`);
  }

  return lineTotal;
}

async function main() {
  const data = await getData();
  const total = data.reduce((total, line) => total + getLineValue(line), 0);
  console.log(total);
}

main();
