<script lang="ts" setup>
interface Props {
  modelValue: string;
  type?: "text" | "password";
}

interface Emits {
  "update:modelValue": string;
}

const { modelValue } = defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="input">
    <input
      type="date"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
  </div>
</template>

<style lang="scss" scoped>
div.input {
  position: relative;
  width: 100%;
  height: 6.5vh;
  margin: 1vh auto;

  input {
    outline: none;
    background-color: var(--background-100);
    height: 100%;
    width: 100%;
    border: 0.2vh solid var(--primary-40);
    padding: 0 6vh 0 2vh;
    color: var(--primary-100);
    border-radius: 1vh;
    font-size: 0.9rem;

    &:focus,
    &:hover {
      border: 0.2vh solid var(--primary-100);
    }

    &::placeholder {
      color: var(--primary-40);
    }
  }

  i {
    position: absolute;
    color: var(--primary-40);
    z-index: 1;
    right: 2vh;
    top: 50%;
    transform: translate(0, -50%);
  }
}
</style>
