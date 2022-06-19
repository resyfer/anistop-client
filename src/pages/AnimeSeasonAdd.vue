<script lang="ts" setup>
import { reactive } from "vue";
import { getData } from "../helpers/fetch";
import { ROOT, ANIME_SEASON_OPTIONS } from "../helpers/constants";
import InputChoice from "../components/InputChoice.vue";
import InputNumber from "../components/InputNumber.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";

const formData = reactive({
  year: new Date().getFullYear(),
  seasonOfYear: "",
});

async function submitForm() {
  const response = await getData(`${ROOT}/anime_season/add`, "post", formData);
  setFlashCard(response.success, response.message ?? response.error);
}
</script>

<template>
  <div class="anime-season-cont">
    <h1>Add Anime Season of Year</h1>
    <div class="anime-season-input-cont">
      <InputNumber placeholder="Number" v-model="formData.year" />
      <InputChoice
        placeholder="Season *"
        :options="ANIME_SEASON_OPTIONS"
        v-model="formData.seasonOfYear" />
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
  </div>
</template>

<style lang="scss" scoped>
div.anime-season-cont {
  position: absolute;
  width: 40%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    color: var(--primary-100);
    margin: 1vh auto;
  }

  .submit-btn {
    margin: 1vh auto;
  }
}
</style>
