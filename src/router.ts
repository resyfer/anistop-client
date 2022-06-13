import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import OtpVerify from "./pages/OtpVerify.vue";
import Dashboard from "./pages/Dashboard.vue";
import Profile from "./pages/Profile.vue";
import AnimeAdd from "./pages/AnimeAdd.vue";
import StudioAdd from "./pages/StudioAdd.vue";
import VAAdd from "./pages/VAAdd.vue";
import AnimeSeasonAdd from "./pages/AnimeSeasonAdd.vue";
import SeasonAdd from "./pages/SeasonAdd.vue";
import CharacterAdd from "./pages/CharacterAdd.vue";

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
    path: "/anime/:animeId/season/add",
    component: SeasonAdd,
  },
  {
    path: "/studio/add",
    component: StudioAdd,
  },
  {
    path: "/va/add",
    component: VAAdd,
  },
  {
    path: "/anime_season/add",
    component: AnimeSeasonAdd,
  },
  {
    path: "/anime/:animeId/character/add",
    component: CharacterAdd,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
