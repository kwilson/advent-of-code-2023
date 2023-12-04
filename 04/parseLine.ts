const lineRegex =
  /^Card\s+(?<id>\d+):\s+(?<winningNumbers>[\d\s]+)\s+\|\s+(?<yourNumbers>[\d\s]+)$/;

export type Card = {
  id: string;
  winningNumbers: number[];
  yourNumbers: number[];
};

function formatValues(value: string): number[] {
  try {
    return value.trim().split(' ').filter(Boolean).map(Number);
  } catch (e) {
    console.error('Cannot format value: ' + value);
    throw e;
  }
}

export function parseLine(line: string): Card {
  const { id, winningNumbers, yourNumbers } =
    lineRegex.exec(line.trim())?.groups ?? {};
  return {
    id,
    winningNumbers: formatValues(winningNumbers),
    yourNumbers: formatValues(yourNumbers),
  };
}
