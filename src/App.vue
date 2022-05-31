<script setup lang="ts"></script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");

:root {
  --primary-100: #5edce5;
  --primary-40: rgba(94, 220, 229, 0.4);
  --background-100: #2c2c32;
  --secondary-100: #f5f9ff;
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
