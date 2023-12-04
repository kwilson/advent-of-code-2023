function isNumber(character: string) {
  return !isNaN(Number(character));
}

function getGear(
  valueMap: (string | symbol)[][],
  numberMap: Map<symbol, number>,
  lineIndex: number,
  characterIndex: number,
): number[] | undefined {
  const prevLine = lineIndex > 0 ? valueMap.at(lineIndex - 1) : [];
  const currLine = valueMap.at(lineIndex) ?? [];
  const nextLine = valueMap.at(lineIndex + 1) ?? [];

  const matches = new Set<symbol>();

  for (let i = characterIndex - 1; i <= characterIndex + 1; i++) {
    const prevValue = prevLine?.at(i);
    if (i > -1 && typeof prevValue === 'symbol') {
      matches.add(prevValue);
    }

    const currValue = currLine?.at(i);
    if (i > -1 && typeof currValue === 'symbol') {
      matches.add(currValue);
    }

    const nextValue = nextLine?.at(i);
    if (i > -1 && typeof nextValue === 'symbol') {
      matches.add(nextValue);
    }
  }

  if (matches.size === 2) {
    return [...matches.values()].map((x) => numberMap.get(x) ?? -1);
  }

  return undefined;
}

export function getGearRatios(input: string[]): number[][] {
  const numberMap = new Map<symbol, number>();
  const valueMap: (string | symbol)[][] = [];

  for (let lineIndex = 0; lineIndex < input.length; lineIndex++) {
    const line = input[lineIndex];
    valueMap.push(line.split(''));

    let currentNumber: string[] = [];
    let currentNumberStartIndex: number | undefined = undefined;
    let currentNumberEndIndex: number | undefined = undefined;

    for (
      let characterIndex = 0;
      characterIndex < line.length;
      characterIndex++
    ) {
      const character = line[characterIndex];
      const characterIsNumber = isNumber(character);

      if (characterIsNumber) {
        currentNumber.push(character);

        if (currentNumberStartIndex === undefined) {
          currentNumberStartIndex = characterIndex;
        }

        currentNumberEndIndex = characterIndex;
      }

      if (
        (!characterIsNumber || characterIndex === line.length - 1) &&
        currentNumber.length &&
        currentNumberStartIndex !== undefined &&
        currentNumberEndIndex !== undefined
      ) {
        const id = Symbol();
        numberMap.set(id, Number(currentNumber.join('')));

        for (
          let writeIndex = currentNumberStartIndex;
          writeIndex <= currentNumberEndIndex;
          writeIndex++
        ) {
          valueMap[lineIndex][writeIndex] = id;
        }

        currentNumber = [];
        currentNumberStartIndex = undefined;
        currentNumberEndIndex = undefined;
      }
    }
  }

  // loop through and check the map
  const matches: number[][] = [];

  for (let lineIndex = 0; lineIndex < input.length; lineIndex++) {
    const line = input[lineIndex];

    for (
      let characterIndex = 0;
      characterIndex < line.length;
      characterIndex++
    ) {
      const character = line[characterIndex];

      if (character === '*') {
        const ratio = getGear(valueMap, numberMap, lineIndex, characterIndex);
        if (ratio) {
          matches.push(ratio);
        }
      }
    }
  }

  return matches;
}
