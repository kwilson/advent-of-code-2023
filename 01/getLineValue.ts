const lookups = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const;

const lookupKeys = Object.keys(lookups) as Array<keyof typeof lookups>;

function getValueFromBuffer(buffer: string) {
  const matchingLookupKey = lookupKeys.find((key) => buffer.includes(key));
  return matchingLookupKey;
}

function getFirstLineValue(line: string): string {
  let index = 0;

  let buffer = '';
  while (index < line.length) {
    const thisCharacter = line[index];

    // If this is a number, just return it
    if (!isNaN(Number(thisCharacter))) {
      return thisCharacter;
    }

    buffer += thisCharacter;

    const matchingLookupKey = getValueFromBuffer(buffer);
    if (matchingLookupKey) {
      return String(lookups[matchingLookupKey]);
    }

    index++;
  }

  throw Error('value not found for ' + line);
}

function geLastLineValue(line: string): string {
  let index = line.length - 1;

  let buffer = '';
  while (index > -1) {
    const thisCharacter = line[index];

    // If this is a number, just return it
    if (!isNaN(Number(thisCharacter))) {
      return thisCharacter;
    }

    buffer = thisCharacter + buffer;

    const matchingLookupKey = getValueFromBuffer(buffer);
    if (matchingLookupKey) {
      return String(lookups[matchingLookupKey]);
    }

    index--;
  }

  throw Error('value not found for ' + line);
}

export function getLineValue(line: string) {
  const first = getFirstLineValue(line);
  const last = geLastLineValue(line);

  const lineTotal = Number(first + last);
  if (isNaN(lineTotal)) {
    throw Error(`unable to calculate: ${first} + ${last} from ${line}`);
  }

  return lineTotal;
}
