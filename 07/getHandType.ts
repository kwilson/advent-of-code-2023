export const handType = {
  fiveOfKind: 6,
  fourOfKind: 5,
  fullHouse: 4,
  threeOfKind: 3,
  twoPair: 2,
  pair: 1,
  highCard: 0,
} as const;

export function getHandType(hand: string[], wildcard?: string): number {
  const valuesMap = new Map<string, number>();
  hand.forEach((card) => {
    valuesMap.set(card, (valuesMap.get(card) ?? 0) + 1);
  });

  const wildcardCount =
    (wildcard && valuesMap.has(wildcard) && Number(valuesMap.get(wildcard))) ||
    0;
  if (wildcard) {
    valuesMap.delete(wildcard);
  }

  const values = [...valuesMap.values()].sort().reverse();

  // If every card was a wildcard, prime the value
  if (values.length === 0) {
    values.push(0);
  }

  // distribute the wildcards
  values[0] = values[0] + wildcardCount;

  if (values.includes(5)) {
    return handType.fiveOfKind;
  }

  if (values.includes(4)) {
    return handType.fourOfKind;
  }

  if (values.includes(3) && values.includes(2)) {
    return handType.fullHouse;
  }

  if (values.includes(3)) {
    return handType.threeOfKind;
  }

  if (values.filter((x) => x === 2).length === 2) {
    return handType.twoPair;
  }

  if (values.includes(2)) {
    return handType.pair;
  }

  return handType.highCard;
}
