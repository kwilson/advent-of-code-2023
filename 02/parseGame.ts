export type Game = {
  id: number;
  sets: GameSet[];
};

export type GameSet = {
  blue: number;
  green: number;
  red: number;
};

const gameRegex = /^Game\s(?<id>\d+):\s(?<gameData>.+)$/;

function parseSet(game: string): GameSet {
  const cubeData = game.split(',').map((x) => x.trim());
  return cubeData.reduce(
    (sets, item) => {
      const [count, key] = item.split(' ');
      return {
        ...sets,
        [key]: Number(count),
      };
    },
    { red: 0, green: 0, blue: 0 },
  );
}

export function parseGame(data: string): Game {
  try {
    const { id, gameData } = gameRegex.exec(data)?.groups ?? {};
    const sets = gameData.split(';').map(parseSet);

    return {
      id: Number(id),
      sets,
    };
  } catch (e) {
    console.error('Error parsing ' + data, e);
    throw e;
  }
}
