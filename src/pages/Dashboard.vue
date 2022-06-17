<script lang="ts" setup>
import { ref } from "vue";
import InputText from "../components/InputText.vue";
import Button from "../components/Button.vue";
import router from "../router";

const searchParam = ref("");

async function sendSearchQuery() {
  router.push({ path: "/find", query: { anime: searchParam.value } });
}
</script>

<template>
  <div class="dashboard">
    <div class="logo">
      <img src="../assets/logo.svg" alt="Logo" loading="lazy" />
    </div>
    <div class="search-anime">
      <InputText placeholder="Search Anime" v-model="searchParam" />
    </div>
    <div class="btn-cont">
      <Button outline text="Recent" @click="router.push('/recent')" />
      <Button outline text="Profile" @click="router.push('/profile')" />
      <Button text="Search" @click="sendSearchQuery" />
    </div>
  </div>
</template>

<style lang="scss">
div.dashboard {
  display: flex;
  flex-direction: column;
  width: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  div.logo {
    height: 35vh;
    width: 35vh;
    margin: 1vh auto;
    position: relative;

    img {
      position: absolute;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  div.btn-cont {
    display: flex;
    justify-content: center;
  }
}
</style>
