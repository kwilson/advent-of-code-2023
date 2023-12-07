export type Race = {
  distance: number;
  time: number;
};

function solveUsingQuadraticEquation(
  raceTime: number,
  speedPerDurationValue: number,
  distance: number,
) {
  const discriminant =
    Math.pow(-raceTime, 2) - 4 * speedPerDurationValue * (distance + 1);

  if (discriminant >= 0) {
    const positiveRoot =
      (raceTime + Math.sqrt(discriminant)) / (2 * speedPerDurationValue);
    const negativeRoot =
      (raceTime - Math.sqrt(discriminant)) / (2 * speedPerDurationValue);

    return [positiveRoot, negativeRoot].filter((root) => root > 0);
  }

  return [];
}

export function getPermutations(race: Race) {
  const speedPerDuration = 1;
  const [upper, lower] = solveUsingQuadraticEquation(
    race.time,
    speedPerDuration,
    race.distance,
  );
  return Math.floor(upper) - Math.ceil(lower) + 1; // +1 because inclusive of the values e.g. [1,3] is 3 because [1,2,3]
}
