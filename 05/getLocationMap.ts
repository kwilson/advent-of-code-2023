import { Seeds, ValueMap } from './parseInput';

type Output = [string, number];

function getMapValue(value: number, map: ValueMap): number {
  const thisRange = map.ranges.find(
    ({ from, range }) => value >= from && value < from + range,
  );
  if (thisRange) {
    return value + thisRange.to - thisRange.from;
  }

  return value;
}

export function getMapping(
  type: string,
  targetType: string,
  value: number,
  maps: Record<string, ValueMap>,
): Output[] {
  let currentType = type;
  let currentValue = value;

  const output: Output[] = [[currentType, currentValue]];

  while (currentType !== targetType) {
    const map = maps[currentType];

    currentType = map.to;
    currentValue = getMapValue(currentValue, map);

    output.push([currentType, currentValue]);
  }

  return output;
}

export function getLocationMap(
  inputs: Seeds,
  targetType: string,
  maps: Record<string, ValueMap>,
): Output[][] {
  return inputs.values.map((value) =>
    getMapping(inputs.type, targetType, value, maps),
  );
}
