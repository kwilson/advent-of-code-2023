export function getStartPoint(data: string[][]): [number, number] {
  for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
    const row = data[rowIndex];
    const columnIndex = row.findIndex((x) => x === 'S');

    if (columnIndex > -1) {
      return [rowIndex, columnIndex];
    }
  }

  throw Error('no start point found');
}
