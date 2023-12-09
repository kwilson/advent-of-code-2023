export function getPrediction(input: number[]): number {
  const differences: number[] = []

  for (let i = 1; i < input.length; i++) {
    const prev = input[i - 1];
    const curr = input[i];
    
    differences.push(curr - prev);
  }

  if (differences.every((x) => x === differences[0])) {
    return (input.at(-1) ?? NaN) + differences[0];
  }

  return (input.at(-1) ?? NaN) + getPrediction(differences);
}
