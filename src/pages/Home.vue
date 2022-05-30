<script lang="ts" setup>
import router from "../router";
import Button from "../components/Button.vue";
</script>

<template>
  <div class="intro">
    <div class="logo">
      <img src="../assets/logo.svg" alt="Logo" />
    </div>
    <div class="title-cont">
      <h1>AniStop</h1>
      <h2>One stop for anime needs</h2>
    </div>
    <div class="auth-btn-cont">
      <Button text="Login" outline @click="router.push('/login')" />
      <Button text="Signup" @click="router.push('/signup')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.intro {
  position: absolute;
  height: 80vh;
  width: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  div.logo {
    height: 40%;
    aspect-ratio: 1/1;

    img {
      height: 100%;
      width: 100%;
    }
  }

  div.title-cont {
    text-align: center;
    margin: 2vh auto;

    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 1.5rem;
    }
  }

  div.auth-btn-cont {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
