<script lang="ts" setup>
import Button from "./Button.vue";

interface Props {
  text: string;
}

interface Emits {
  (e: "dialogue", val: boolean): boolean;
}

const { text } = defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="cover">
    <div class="dialogue">
      <div class="text">{{ text }}</div>
      <div class="btn-cont">
        <Button text="No" @click="$emit('dialogue', false)" />
        <Button outline text="Yes" @click="$emit('dialogue', true)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.cover {
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 10;
  height: 100vh;
  width: 100%;

  div.dialogue {
    height: 40%;
    width: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2vh;
    background-color: var(--background-100);
    border: 0.5vh solid var(--primary-100);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div.text {
      text-align: center;
      font-size: 1.2rem;
      margin-bottom: 2vh;
    }

    div.btn-cont {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
