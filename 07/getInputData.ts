export type Hand = {
  cards: string[];
  rank: number;
};

export function getInputData(lines: string[]): Hand[] {
  return lines.map<Hand>((line) => {
    const [cardsValue, rank] = line.split(' ');
    return {
      cards: cardsValue.split(''),
      rank: Number(rank),
    };
  });
}
