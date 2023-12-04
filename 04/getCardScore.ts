export function getCardScore(
  winningNumbers: number[],
  yourNumbers: number[],
): number {
  return yourNumbers.reduce((score, value) => {
    if (winningNumbers.includes(value)) {
      return score + (score || 1);
    }

    return score;
  }, 0);
}
