<script lang="ts" setup>
interface Props {
  placeholder?: string;
  modelValue: string;
}

const { placeholder } = defineProps<Props>();
</script>

<template>
  <div class="text-area-cont">
    <textarea
      :placeholder="placeholder"
      rows="3"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"></textarea>
  </div>
</template>

<style lang="scss" scoped>
div.text-area-cont {
  margin: 1vh auto;

  textarea {
    outline: none;
    background-color: var(--background-100);
    width: 100%;
    border: 0.2vh solid var(--primary-40);
    padding: 2vh;
    color: var(--primary-100);
    border-radius: 1vh;
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    resize: vertical;

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
