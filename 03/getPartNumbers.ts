function isNumber(character: string) {
  return !isNaN(Number(character));
}

function isSybmol(character: string = '') {
  return /\W/.test(character) && character !== '.';
}

function checkIsValid(
  input: string[],
  lineIndex: number,
  numberStartIndex: number,
  numberEndIndex: number,
) {
  const prevLine = lineIndex > 0 ? input.at(lineIndex - 1) : '';
  const currLine = input.at(lineIndex);
  const nextLine = input.at(lineIndex + 1) ?? '';

  for (let j = numberStartIndex - 1; j < numberEndIndex + 2; j++) {
    if (j > -1 && isSybmol(prevLine?.at(j))) {
      return true;
    }
    if (j > -1 && isSybmol(currLine?.at(j))) {
      return true;
    }
    if (j > -1 && isSybmol(nextLine?.at(j))) {
      return true;
    }
  }

  return false;
}

export function getPartNumbers(input: string[]): number[] {
  const valid: number[] = [];

  for (let lineIndex = 0; lineIndex < input.length; lineIndex++) {
    const line = input[lineIndex];

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
        if (
          checkIsValid(
            input,
            lineIndex,
            currentNumberStartIndex,
            currentNumberEndIndex,
          )
        ) {
          valid.push(Number(currentNumber.join('')));
        }

        currentNumber = [];
        currentNumberStartIndex = undefined;
        currentNumberEndIndex = undefined;
      }
    }
  }

  return valid;
}
