<script lang="ts" setup>
interface Props {
  placeholder?: string;
  modelValue: string | number;
}

interface Emits {
  "update:modelValue": string;
}

const { placeholder, modelValue } = defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="input">
    <input
      type="number"
      :placeholder="placeholder"
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
}
</style>
