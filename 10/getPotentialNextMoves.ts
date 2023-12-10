import { getTileType } from './getTileType';

export function getPotentialNextMoves(
  currentPosition: [number, number],
  map: string[][],
): [number, number][] {
  const [currentRow, currentColumn] = currentPosition;
  const tileType = getTileType(currentPosition, map);

  switch (tileType) {
    case 'F': {
      return [
        [currentRow + 1, currentColumn],
        [currentRow, currentColumn + 1],
      ];
    }

    case '7': {
      return [
        [currentRow, currentColumn - 1],
        [currentRow + 1, currentColumn],
      ];
    }

    case '|': {
      return [
        [currentRow - 1, currentColumn],
        [currentRow + 1, currentColumn],
      ];
    }

    case 'L': {
      return [
        [currentRow - 1, currentColumn],
        [currentRow, currentColumn + 1],
      ];
    }

    case 'J': {
      return [
        [currentRow, currentColumn - 1],
        [currentRow - 1, currentColumn],
      ];
    }

    case '-': {
      return [
        [currentRow, currentColumn - 1],
        [currentRow, currentColumn + 1],
      ];
    }

    default:
      throw Error('unknow symbol - ' + tileType);
  }
}
