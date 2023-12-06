export type Race = {
  distance: number;
  time: number;
};

const speedPerDuration = 1;

export function getPermutations(race: Race) {
  let total = 0;

  for (
    let timeButtonPressed = 0;
    timeButtonPressed < race.time;
    timeButtonPressed++
  ) {
    const speedGathered = timeButtonPressed * speedPerDuration;
    const remainingTime = race.time - timeButtonPressed;

    const distance = remainingTime * speedGathered;

    if (distance > race.distance) {
      total++;
    }
  }

  return total;
}
