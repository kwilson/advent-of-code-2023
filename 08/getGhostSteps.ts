import { DirectionMap } from './parseInput';

// gcd,lcm,lcmAll take from:
// https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
const gcd = (a: number, b: number): number => (b == 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;
const lcmAll = (ns: number[]) => ns.reduce(lcm, 1);

export function getGhostSteps(
  fromEndsWith: string,
  toEndsWith: string,
  { map, directions }: DirectionMap,
): number {
  let points = [...map.keys()].filter((key) => key.endsWith(fromEndsWith));
  const cycles: number[] = [];
  console.log('paths: ' + points.length);

  let cycle = 0;
  while (points.length > 0) {
    const directionIndex = cycle % directions.length;
    const directionKey = directions[directionIndex];

    for (let i = 0; i < points.length; i++) {
      const thisStep = map.get(points[i]);
      const nextKey = directionKey === 'L' ? thisStep?.left : thisStep?.right;
      if (!nextKey) {
        throw Error('missing key ' + thisStep);
      }

      points[i] = nextKey;
    }

    cycle++;
    const stillToProcess = points.filter(
      (point) => !point.endsWith(toEndsWith),
    );
    if (stillToProcess.length !== points.length) {
      cycles.push(cycle);
    }

    points = stillToProcess;
  }

  return lcmAll(cycles);
}
