import { getHandType } from './getHandType';

const numeric = [2, 3, 4, 5, 6, 7, 8, 9].map<[string, number]>((value) => [
  value.toString(),
  value,
]);
const alpha: [string, number][] = [
  ['A', 14],
  ['K', 13],
  ['Q', 12],
  ['J', 0], // now a joker
  ['T', 10],
];

const valueMap = new Map<string, number>([...numeric, ...alpha]);

export function compareHands(
  a: string[],
  b: string[],
  wildcard?: string,
): number {
  const typeA = getHandType(a, wildcard);
  const typeB = getHandType(b, wildcard);

  if (typeA !== typeB) {
    return typeA - typeB > 0 ? 1 : -1;
  }

  for (let index = 0; index < a.length; index++) {
    const cardA = a[index];
    const cardB = b[index];

    if (cardA !== cardB) {
      return (valueMap.get(cardA) ?? 0) - (valueMap.get(cardB) ?? 0) > 0
        ? 1
        : -1;
    }
  }

  return 0;
}
