<script lang="ts" setup>
interface Props {
  text: string;
  outline?: boolean;
}

const { text, outline } = defineProps<Props>();
</script>

<template>
  <div :class="{ btn: true, outline }">
    {{ text }}
  </div>
</template>

<style lang="scss" scoped>
div.btn {
  width: fit-content;
  padding: 2vh 4vh;
  border-radius: 1vh;
  margin: 1vh;
  text-transform: uppercase;
  font-size: 0.9rem;
  cursor: pointer;
  border: 0.2vh solid var(--primary-100);
  transition: 0.2s ease-in-out;

  background-color: var(--primary-100);
  color: var(--background-100);

  &:hover {
    background-color: var(--background-100);
    color: var(--primary-100);
  }

  &.outline {
    background-color: var(--background-100);
    color: var(--primary-100);
  }

  &.outline:hover {
    background-color: var(--primary-100);
    color: var(--background-100);
  }
}
</style>
