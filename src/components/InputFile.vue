<script lang="ts" setup>
import { ref } from "vue";

interface Emits {
  "update:modelValue": string;
}

interface Props {
  placeholder: string;
  video?: boolean;
}

const { placeholder, video } = defineProps<Props>();
defineEmits<Emits>();

const file = ref(`Upload ${placeholder}`);
const inputElement = ref<HTMLInputElement | string>("");

function updateName(event: Event) {
  file.value = (event.target as HTMLInputElement).files![0].name;
}

function selectFile() {
  (inputElement.value as HTMLInputElement).click();
}
</script>

<template>
  <div class="input">
    <input
      type="file"
      :accept="
        video
          ? 'video/mp4, video/mov, video/mkv'
          : 'image/jpeg, image/png, image/jpg, image/svg'
      "
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).files![0])"
      @change="updateName"
      ref="inputElement" />
    <div
      :class="['file', { placeholder: file === `Upload ${placeholder}` }]"
      @click="selectFile">
      {{ file }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.input {
  position: relative;
  width: 100%;
  height: 6.5vh;
  margin: 1vh auto;

  input {
    display: none;
  }

  div.file {
    background-color: var(--background-100);
    height: 100%;
    width: 100%;
    border: 0.2vh solid var(--primary-40);
    padding: 0 6vh 0 2vh;
    color: var(--primary-100);
    border-radius: 1vh;
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  div.placeholder {
    color: var(--primary-40);
  }
}
</style>
