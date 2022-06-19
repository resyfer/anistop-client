<script setup lang="ts">
import Flash from "./components/Flash.vue";
import router from "./router";
import auth from "./store/auth";
import { onBeforeMount } from "vue";
import { getData } from "./helpers/fetch";
import { ROOT } from "./helpers/constants";
import { User } from "./types/user";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";

const publicRoutes = ["Home", "Login", "Signup", "OTP"];
const route = useRoute();

router.beforeEach(async (to, _) => {
  window.scrollTo(0, 0); // To go to start on changing pages

  if (auth.isLoggedIn == null) {
    return true;
  } else if (
    auth.isLoggedIn === false &&
    publicRoutes.indexOf(to.name as string) !== -1
  ) {
    return true;
  } else if (
    auth.isLoggedIn &&
    publicRoutes.indexOf(to.name as string) === -1
  ) {
    return true;
  } else if (
    auth.isLoggedIn &&
    publicRoutes.indexOf(to.name as string) !== -1
  ) {
    return "/dashboard";
  } else {
    return "/";
  }
});

onBeforeMount(async () => {
  const response = await getData<User>(`${ROOT}/user`);

  if (response.success) {
    auth.isLoggedIn = true;
    auth.user = response.message!;

    if (publicRoutes.indexOf(route.name as string) !== -1) {
      router.push("/dashboard");
    }
  } else {
    router.push("/");
  }
});
</script>

<template>
  <Flash />
  <Navbar />
  <router-view :key="route.fullPath"></router-view>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");

:root {
  --primary-100: #5edce5;
  --primary-40: rgba(94, 220, 229, 0.4);
  --background-100: #2c2c32;
  --secondary-100: #f5f9ff;

  --success-100: rgba(0, 204, 0, 1);
  --success-60: rgba(0, 204, 0, 0.6);

  --error-100: rgba(255, 0, 0, 1);
  --error-60: rgba(255, 0, 0, 0.6);
}

* {
  padding: 0;
  margin: 0;
  font-family: "Nunito", sans-serif;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

html,
body {
  background-color: var(--background-100);
  color: var(--secondary-100);
}

/**Scrollbar**/
::-webkit-scrollbar {
  width: 1vh;
}

::-webkit-scrollbar-track {
  background: var(--background-100);
}

::-webkit-scrollbar-thumb {
  border-radius: 3vh;
  background: var(--primary-100);
}

.bold {
  font-weight: bold;
  color: var(--primary-100);
}

div.background-tint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  height: 100%;
  width: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.25) 75%
  );
}

div.page-title {
  padding-left: 4vh;
  margin: 2vh 0;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  color: var(--primary-100);
  font-weight: bold;
}

div.sub-title {
  padding-left: 4vh;
  border-bottom: 0.2vh solid var(--primary-100);
  margin: 2vh;
  font-size: 1.2rem;
}

.helper-txt {
  font-style: italic;
  text-decoration: underline;
  margin: 0 auto;
  cursor: pointer;
  width: fit-content;
  padding: 2vh;

  &:hover {
    color: var(--primary-100);
  }
}

.info-txt {
  font-style: italic;
  text-decoration: underline;
  margin: 0 auto;
  width: fit-content;
  padding: 2vh;
}
</style>
