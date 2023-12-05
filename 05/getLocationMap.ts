import { Seeds, ValueMap } from './parseInput';

type Output = [string, number];

function getMapping(
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

    let found = false;

    for (let rangeIndex = 0; rangeIndex < map.ranges.length; rangeIndex++) {
      const { from, to, range } = map.ranges[rangeIndex];
      if (!found && currentValue >= from && currentValue < from + range) {
        currentValue = currentValue + to - from;
        found = true;
      }
    }

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
