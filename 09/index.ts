import fs from 'node:fs';
import path from 'node:path';
import { getPrediction } from './getPrediction';
import { getHistoricPrediction } from './getHistoricPrediction';

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
  const data = await getData();

  const predictions = data.map((line) =>
    getPrediction(line.split(' ').map(Number)),
  );
  const predictionsSum = predictions.reduce((sum, value) => sum + value, 0);

  const historicPredictions = data.map((line) =>
    getHistoricPrediction(line.split(' ').map(Number)),
  );
  const historicPredictionsSum = historicPredictions.reduce(
    (sum, value) => sum + value,
    0,
  );

  console.log({
    predictionsSum,
    historicPredictionsSum,
  });
}

main();
