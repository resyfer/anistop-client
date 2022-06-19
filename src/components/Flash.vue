<script lang="ts" setup>
import { flash, setFlashCard } from "../store/flash";
</script>

<template>
  <template v-if="flash.success !== null">
    <div
      :class="['flash', { success: flash.success }, { error: !flash.success }]">
      {{ flash.success ? flash.message : flash.error }}
      <div class="cross">
        <i class="fa-solid fa-xmark" @click="setFlashCard(null)"></i>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
div.flash {
  position: relative;
  height: 7.5vh;
  width: 99%;
  margin: 1vh auto;
  border-radius: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vh;

  &.success {
    background-color: var(--success-60);
    border: 0.5vh solid var(--success-100);
  }

  &.error {
    background-color: var(--error-60);
    border: 0.5vh solid var(--error-100);
  }
  div.cross {
    position: absolute;
    right: 2vh;
    top: 50%;
    transform: translate(0, -50%);
    cursor: pointer;
  }
}
</style>
