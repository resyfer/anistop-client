const ROOT = "http://localhost:5000/api/v1";

const COUNTRY_OPTIONS: {
  [key: string]: string;
}[] = [{ Japan: "JAPAN" }, { China: "CHINA" }, { Korea: "KOREA" }];

const GENRE_OPTIONS: {
  [key: string]: string;
}[] = [
  { Action: "ACTION" },
  { Adevnture: "ADVENTURE" },
  { "Avant Garde": "AVANT_GARDE" },
  { "Boy's Love": "BOYS_LOVE" },
  { Cars: "CARS" },
  { Comedy: "COMEDY" },
  { Dementia: "DEMENTIA" },
  { Demons: "DEMONS" },
  { Drama: "DRAMA" },
  { Ecchi: "ECCHI" },
  { Fantasy: "FANTASY" },
  { game: "GAME" },
  { "Gender Bender": "GENDER_BENDER" },
  { "Girl's Love": "GIRLS_LOVE" },
  { Gourmet: "GOURMET" },
  { Harem: "HAREM" },
  { Historical: "HISTORICAL" },
  { Horror: "HORROR" },
  { Josei: "JOSEI" },
  { Kids: "KIDS" },
  { Magic: "MAGIC" },
  { "Martial Arts": "MARTIAL_ARTS" },
  { Mecha: "MECCHA" },
  { Military: "MILITARY" },
  { Music: "MUSIC" },
  { Mystery: "MYSTERY" },
  { Parody: "PARODY" },
  { Police: "POLICE" },
  { Psychological: "PSYCHOLOGICAL" },
  { Romance: "ROMANCE" },
  { Samurai: "SAMURAI" },
  { School: "SCHOOL" },
  { "Sci Fi": "SCI_FI" },
  { Seinen: "SEINEN" },
  { Shoujo: "SHOUJO" },
  { "Shoujo Ai": "SHOUJO_AI" },
  { Shounen: "SHOUNEN" },
  { "Slice of Life": "SLICE_OF_LIFE" },
  { Space: "SPACE" },
  { Sports: "SPORTS" },
  { "Super Power": "SUPER_POWER" },
  { Supernatural: "SUPERNATURAL" },
  { Suspense: "SUSPENSE" },
  { Thriller: "THRILLER" },
  { Vampire: "VAMPIRE" },
];

const ANIME_SEASON_OPTIONS: {
  [key: string]: string;
}[] = [
  { Winter: "WINTER" },
  { Spring: "SPRING" },
  { Summer: "SUMMER" },
  { Fall: "FALL" },
];

const EPISODE_TYPE_OPTIONS: {
  [key: string]: string;
}[] = [{ Sub: "SUB" }, { Dub: "DUB" }];

const SEASON_TYPE_OPTIONS: {
  [key: string]: string;
}[] = [
  { "TV Series": "TV_SERIES" },
  { OVA: "OVA" },
  { ONA: "ONA" },
  { Movie: "MOVIE" },
  { Special: "SPECIAL" },
];

const RATING_OPTIONS: {
  [key: string]: string;
}[] = [
  { "10 (Masteripiece)": "10" },
  { "9 (Great)": "9" },
  { "8 (Very Good)": "8" },
  { "7 (Good)": "7" },
  { "6 (Fine)": "6" },
  { "5 (Average)": "5" },
  { "4 (Bad)": "4" },
  { "3 (Very Bad)": "3" },
  { "2 (Horrible)": "2" },
  { "1 (Appaling)": "1" },
];

export {
  ROOT,
  COUNTRY_OPTIONS,
  GENRE_OPTIONS,
  ANIME_SEASON_OPTIONS,
  EPISODE_TYPE_OPTIONS,
  SEASON_TYPE_OPTIONS,
  RATING_OPTIONS,
};
