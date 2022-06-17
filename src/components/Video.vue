<script lang="ts" setup>
interface Props {
  url: string;
}

const { url } = defineProps<Props>();
</script>

<template>
  <video :src="url" controls></video>
</template>

<style lang="scss" scoped>
video {
  width: 100%;
}
</style>
