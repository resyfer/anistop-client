const ROOT = "http://localhost:5000/api/v1";

const COUNTRY_OPTIONS: {
  [key: string]: string;
}[] = [{ japan: "JAPAN" }, { china: "CHINA" }, { korea: "KOREA" }];

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

export { ROOT, COUNTRY_OPTIONS, GENRE_OPTIONS };
