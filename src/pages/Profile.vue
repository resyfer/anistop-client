<script lang="ts" setup>
import auth from "../store/auth";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
// import {computed} from "vue";
// import {toCapitalCase} from "../helpers/string";

// const role = computed(() => {
//   return toCapitalCase(auth.user!.role.toString());
// })

async function getUser() {
  const data = await getData(`${ROOT}/user`);
  console.log(data);
}
</script>

<template>
  <div class="profile">
    <img
      :src="auth.user!.imgUrl"
      :alt="auth.user!.username"
      class="profile-img" />
    <div class="name">{{auth.user!.name}}</div>
    <div class="username">{{auth.user!.username}}</div>
    <div class="hello" @click="getUser">Click</div>
  </div>
</template>

<style lang="scss">
div.profile {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50vh;
  width: 25%;
  box-shadow: 0 0 3vh 0vh black;
  border-radius: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img.profile-img {
    height: 30vh;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 0.5vh solid var(--primary-100);
  }

  div.name {
    font-size: 1.8rem;
    margin-top: 4vh;
  }

  div.username {
    font-size: 1.2rem;
    font-style: italic;
  }
}
</style>
