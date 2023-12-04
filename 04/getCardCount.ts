import { getCardMatchingNumberCount } from './getCardMatchingNumberCount';
import { Card } from './parseLine';

export function getCardCount(cards: Card[]): number {
  const cardCounts = new Map<string, number>();

  function incrementCard(id: string, increment: number = 1) {
    cardCounts.set(id, (cardCounts.get(id) ?? 0) + increment);
  }

  for (let i = 0; i < cards.length; i++) {
    const { id, winningNumbers, yourNumbers } = cards[i];
    incrementCard(id);

    const score = getCardMatchingNumberCount(winningNumbers, yourNumbers);
    const cardCount = cardCounts.get(id) ?? 0;

    // If there are matches, push them
    for (let scoreIndex = 0; scoreIndex < score; scoreIndex++) {
      const nextCard = cards.at(i + scoreIndex + 1);
      if (nextCard) {
        incrementCard(nextCard.id, cardCount);
      }
    }
  }

  return [...cardCounts.values()].reduce((total, value) => total + value, 0);
}
