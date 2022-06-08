import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import OtpVerify from "./pages/OtpVerify.vue";
import Dashboard from "./pages/Dashboard.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
