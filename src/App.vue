<script setup lang="ts">
import Flash from "./components/Flash.vue";
</script>

<template>
  <Flash />
  <router-view></router-view>
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
</style>
