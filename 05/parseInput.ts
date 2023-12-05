export type ValueMap = {
  from: string;
  to: string;
  ranges: ValueRange[];
};

type ValueRange = {
  from: number;
  to: number;
  range: number;
};

export type Seeds = {
  type: string;
  values: number[];
};

type Output = {
  inputs: Seeds;
  maps: Record<string, ValueMap>;
};

function mapInputType(value: string) {
  switch (value) {
    case 'seeds':
      return 'seed';
    default:
      return value;
  }
}

function processSeeds(line: string): Seeds {
  const [type, values] = line.split(':').map((x) => x.trim());
  return {
    type: mapInputType(type),
    values: values.split(' ').filter(Boolean).map(Number),
  };
}

function processGroup(group: string[]): ValueMap {
  const [values, ...rangeData] = group;
  const { from, to } = /^(?<from>\w+)-to-(?<to>\w+)/.exec(values)?.groups ?? {};

  const sortedRanges = [...rangeData].sort();

  const ranges = sortedRanges.map<ValueRange>((data) => {
    const [to, from, range] = data.split(' ').map(Number);
    return {
      from,
      to,
      range,
    };
  });

  return {
    from,
    to,
    ranges,
  };
}

export function parseInput(input: string[]): Output {
  let processingGroup: string[] = [];

  let seeds: Seeds | null = null;
  const maps: Record<string, ValueMap> = {};

  for (let index = 0; index < input.length; index++) {
    const line = input[index];

    if (index === 0) {
      seeds = processSeeds(line);
      continue;
    }

    if (line === '' && processingGroup.length) {
      const map = processGroup(processingGroup);
      maps[map.from] = map;
      processingGroup = [];
      continue;
    }

    if (line) {
      processingGroup.push(line);
    }
  }

  if (seeds) {
    return {
      inputs: seeds,
      maps,
    };
  }

  throw Error('failed parsing');
}
