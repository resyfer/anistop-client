<script lang="ts" setup>
import { ref } from "vue";
import auth from "../store/auth";
import router from "../router";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import { setFlashCard } from "../store/flash";

const navVisibility = ref(false);

async function logout() {
  const response = await getData(`${ROOT}/auth/signout`, "post");

  if (response.success) {
    auth.isLoggedIn = false;
    router.push("/login");
  }

  setFlashCard(response.success, response.message ?? response.error);
}
</script>

<template>
  <div class="navbar" v-if="auth.isLoggedIn">
    <div class="btn-cont" @click="navVisibility = !navVisibility">
      <i class="fa-solid fa-bars" v-if="!navVisibility"></i>
      <i class="fa-solid fa-xmark open" v-if="navVisibility"></i>
    </div>
  </div>

  <div class="nav-itm-cont" v-if="navVisibility">
    <div class="page-title">Navbar</div>
    <div class="nav-itm-body" @click="navVisibility = false">
      <div class="nav-itm" @click="router.push('/profile')">Profile</div>
      <div class="nav-itm" @click="router.push('/dashboard')">Dashboard</div>
      <div class="nav-itm" @click="logout">Logout</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.open {
  color: var(--primary-100);
}

div.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: +20;
  // pointer-events: none;

  div.btn-cont {
    position: absolute;
    top: 5vh;
    left: 5vh;
    transform: translate(-50%, -50%);

    width: fit-content;
    height: fit-content;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: +1;
  }
}

div.nav-itm-cont {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--background-100);
  z-index: 19;

  div.nav-itm-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 40%;

    div.nav-itm {
      cursor: pointer;
      width: 100%;
      padding: 2vh 4vh;
      border: 0.3vh solid var(--primary-100);
      color: var(--primary-100);
      transition: 0.2s ease-in-out;
      text-align: center;
      border-radius: 2vh;
      margin: 1vh;

      &:hover {
        background-color: var(--primary-100);
        color: var(--background-100);
      }
    }
  }
}
</style>
