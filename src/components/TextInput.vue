<script lang="ts" setup>
import { ref } from "vue";

interface Props {
  placeholder?: string;
  modelValue: string;
  type?: "text" | "password";
}

interface Emits {
  "update:modelValue": string;
}

enum ViewState {
  TEXT,
  PASSWORD,
}

const { placeholder, type: initialType, modelValue } = defineProps<Props>();
defineEmits<Emits>();

let type = ref(initialType);

const view = ref(ViewState.PASSWORD);

function toggleView() {
  if (view.value === ViewState.PASSWORD) {
    view.value = ViewState.TEXT;
    type.value = "text";
  } else {
    view.value = ViewState.PASSWORD;
    type.value = "password";
  }
}
</script>

<template>
  <div class="input">
    <input
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />

    <template v-if="type === 'password' && view === ViewState.PASSWORD">
      <i class="fa-solid fa-eye" @click="toggleView"></i>
    </template>
    <template v-else-if="type === 'text' && view === ViewState.TEXT">
      <i class="fa-solid fa-eye-slash" @click="toggleView"></i>
    </template>
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
    padding-left: 2vh;
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
