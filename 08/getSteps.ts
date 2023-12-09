import { DirectionMap } from './parseInput';

export function getSteps(
  from: string,
  to: string,
  { map, directions }: DirectionMap,
): string[] {
  const steps = [from];
  let currentStep = from;

  while (currentStep !== to) {
    const thisStep = map.get(currentStep);

    const directionIndex = (steps.length - 1) % directions.length;
    const directionKey = directions[directionIndex];

    const nextKey = directionKey === 'L' ? thisStep?.left : thisStep?.right;
    if (!nextKey) {
      throw Error('missing key ' + thisStep);
    }

    steps.push(nextKey);
    currentStep = nextKey;
  }

  return steps;
}
