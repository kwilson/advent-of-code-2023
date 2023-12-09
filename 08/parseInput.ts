export type DirectionMap = {
  directions: string[];
  map: Map<string, { left: string; right: string }>;
};

const lineRegex = /^(?<key>\w+)\s*=\s*\((?<left>\w+),\s*(?<right>\w+)\)$/i;

function getLineValue(line: string) {
  const { key, left, right } = lineRegex.exec(line)?.groups ?? {};
  return { key, left, right };
}

export function parseInput(lines: string[]): DirectionMap {
  const [directionValue, , ...mapLines] = lines;

  const directions = directionValue.split('');
  const map: DirectionMap['map'] = new Map();

  for (let i = 0; i < mapLines.length; i++) {
    const line = mapLines[i];
    if (line) {
      const { key, left, right } = getLineValue(line);
      map.set(key, { left, right });
    }
  }

  return {
    directions,
    map,
  };
}
