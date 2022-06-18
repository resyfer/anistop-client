import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import OtpVerify from "./pages/OtpVerify.vue";
import Dashboard from "./pages/Dashboard.vue";
import Profile from "./pages/Profile.vue";

import Anime from "./pages/Anime.vue";
import AnimeAdd from "./pages/AnimeAdd.vue";
import AnimeUpdate from "./pages/AnimeUpdate.vue";

import Studio from "./pages/Studio.vue";
import StudioAdd from "./pages/StudioAdd.vue";

import VAAdd from "./pages/VAAdd.vue";

import AnimeSeason from "./pages/AnimeSeason.vue";
import AnimeSeasonAdd from "./pages/AnimeSeasonAdd.vue";

import Season from "./pages/Season.vue";
import SeasonAdd from "./pages/SeasonAdd.vue";
import SeasonUpdate from "./pages/SeasonUpdate.vue";

import Episode from "./pages/Episode.vue";
import EpisodeAdd from "./pages/EpisodeAdd.vue";

import Character from "./pages/Character.vue";
import CharacterAdd from "./pages/CharacterAdd.vue";
import CharacterUpdateDetails from "./pages/CharacterUpdateDetails.vue";

import Search from "./pages/Search.vue";

import Genre from "./pages/Genre.vue";

import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
  },
  {
    path: "/signup",
    component: Signup,
    name: "Signup",
  },
  {
    path: "/otp",
    component: OtpVerify,
    name: "OTP",
  },
  {
    path: "/dashboard",
    component: Dashboard,
    name: "Dashboard",
  },
  {
    path: "/profile",
    component: Profile,
    name: "Profile",
  },
  {
    path: "/anime/add",
    component: AnimeAdd,
  },
  {
    path: "/anime/:animeId/update/details",
    component: AnimeUpdate,
  },
  {
    path: "/anime/:animeId",
    component: Anime,
  },
  {
    path: "/anime/:animeId/season/add",
    component: SeasonAdd,
  },
  {
    path: "/anime/:animeId/season/:seasonId/update",
    component: SeasonUpdate,
  },
  {
    path: "/anime/:animeId/season/:seasonId",
    component: Season,
  },
  {
    path: "/anime/:animeId/season/:seasonId/episode/add",
    component: EpisodeAdd,
  },
  {
    path: "/anime/:animeId/season/:seasonId/episode/:episodeNumber",
    component: Episode,
  },
  {
    path: "/studio/add",
    component: StudioAdd,
  },
  {
    path: "/studio/:studioId",
    component: Studio,
  },
  {
    path: "/va/add",
    component: VAAdd,
  },
  {
    path: "/anime_season/:year/:season",
    component: AnimeSeason,
  },
  {
    path: "/anime_season/add",
    component: AnimeSeasonAdd,
  },
  {
    path: "/anime/:animeId/character/add",
    component: CharacterAdd,
  },
  {
    path: "/anime/:animeId/character/:characterId/update/details",
    component: CharacterUpdateDetails,
  },
  {
    path: "/anime/:animeId/character/:characterId",
    component: Character,
  },
  {
    path: "/find",
    component: Search,
  },
  {
    path: "/genre/:genre",
    component: Genre,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
