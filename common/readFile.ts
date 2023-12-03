import fs from 'node:fs';

export async function readFile(filename: string): Promise<string[]> {
  return new Promise((resolve) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      resolve(data.split('\n'));
    });
  });
}
