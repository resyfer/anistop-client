interface Character {
  id: number;
  name: string;
  imgUrl: string;
  description: string;
  animeId: number;
  _count: {
    characterFavorites: number;
  };
}

export type { Character };
