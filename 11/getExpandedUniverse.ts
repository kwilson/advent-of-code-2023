import { Universe } from './types';

const empty = '.';

export function getExpandedUniverse(universe: Universe) {
  const emptyRows = universe.reduce<number[]>((emptyRows, row, rowIndex) => {
    if (row.every((x) => x === empty)) {
      emptyRows.push(rowIndex);
    }

    return emptyRows;
  }, []);

  const emptyColumns: number[] = [];
  for (let columnIndex = 0; columnIndex < universe[0].length; columnIndex++) {
    const allColumnValue = universe.map((row) => row[columnIndex]);
    if (allColumnValue.every((x) => x === empty)) {
      emptyColumns.push(columnIndex);
    }
  }

  const expandedUniverse = universe.reduce<Universe>(
    (expandedUniverse, row, rowIndex) => {
      const expandedRow = row.reduce<Universe[0]>(
        (expandedColumn, column, columnIndex) => {
          // Push the original
          expandedColumn.push(column);

          // Push the duplicate
          if (emptyColumns.includes(columnIndex)) {
            expandedColumn.push(column);
          }

          return expandedColumn;
        },
        [],
      );

      expandedUniverse.push(expandedRow);

      if (emptyRows.includes(rowIndex)) {
        expandedUniverse.push(expandedRow);
      }

      return expandedUniverse;
    },
    [],
  );

  return { expandedUniverse, emptyRows, emptyColumns };
}
