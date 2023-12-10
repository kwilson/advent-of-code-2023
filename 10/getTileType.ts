const upTiles = ['L', 'J', '|'];
const downTiles = ['F', '7', '|'];
const rightTiles = ['F', 'L', '-'];
const leftTiles = ['7', 'J', '-'];

export function getTileType(
  currentPosition: [number, number],
  map: string[][],
): string {
  const [currentRow, currentColumn] = currentPosition;
  const currenTile = map[currentRow][currentColumn];

  if (currenTile === 'S') {
    const canGoUp = downTiles.includes(
      map.at(currentRow - 1)?.at(currentColumn) ?? '',
    );
    const canGoDown = upTiles.includes(
      map.at(currentRow + 1)?.at(currentColumn) ?? '',
    );
    const canGoLeft = rightTiles.includes(
      map.at(currentRow)?.at(currentColumn - 1) ?? '',
    );
    const canGoRight = leftTiles.includes(
      map.at(currentRow)?.at(currentColumn + 1) ?? '',
    );

    if (canGoUp && canGoDown) {
      return '|';
    }

    if (canGoUp && canGoRight) {
      return 'L';
    }

    if (canGoUp && canGoLeft) {
      return 'J';
    }

    if (canGoDown && canGoRight) {
      return 'F';
    }

    if (canGoDown && canGoLeft) {
      return '7';
    }

    if (canGoLeft && canGoRight) {
      return '-';
    }

    throw Error('unknown type at ' + JSON.stringify(currentPosition));
  }

  return currenTile;
}
