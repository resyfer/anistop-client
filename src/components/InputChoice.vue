<script lang="ts" setup>
import { ref } from "vue";
import { toCapitalCase } from "../helpers/string";

interface Props {
  options: {
    [key: string]: string;
  }[];
  modelValue: string[] | string;
  multiple?: boolean;
  placeholder: string;
}

let { options, multiple, placeholder } = defineProps<Props>();
</script>

<template>
  <select
    :multiple="multiple"
    @input="$emit('update:modelValue', (multiple) ? [...($event.target as HTMLSelectElement).options].filter(option => option.selected).map(option => option.value) : ($event.target as HTMLSelectElement).value)"
    :class="{ multiple }">
    <option value="" selected disabled>{{ placeholder }}</option>
    <template v-for="option in options">
      <option :value="Object.values(option)[0]">
        {{ toCapitalCase(Object.keys(option)[0]) }}
      </option>
    </template>
  </select>
</template>

<style lang="scss" setup>
select {
  position: relative;
  width: 100%;
  height: 6.5vh;
  margin: 1vh auto;
  outline: none;
  border: 0.2vh solid var(--primary-40);
  background-color: var(--background-100);
  color: var(--primary-100);
  border-radius: 1vh;
  font-size: 0.9rem;
  padding: 0 6vh 0 2vh;

  &.multiple {
    height: 40.5vh;
  }
}
</style>
