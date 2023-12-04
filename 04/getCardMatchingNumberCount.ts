export function getCardMatchingNumberCount(
  winningNumbers: number[],
  yourNumbers: number[],
): number {
  return yourNumbers.reduce((total, value) => {
    if (winningNumbers.includes(value)) {
      return total + 1;
    }

    return total;
  }, 0);
}
