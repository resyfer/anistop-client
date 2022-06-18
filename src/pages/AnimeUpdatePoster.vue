<script lang="ts" setup>
import { onBeforeMount, reactive } from "vue";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import InputFile from "../components/InputFile.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";
import { useRoute } from "vue-router";

const form = reactive({
  posterUrl: "",
});

const animeData = reactive({
  name: "",
});

const route = useRoute();

async function submitForm() {
  const formData = new FormData();
  formData.append("posterUrl", form.posterUrl, animeData.name);

  const response = await getData(
    `${ROOT}/anime/${route.params.animeId}/poster`,
    "patch",
    formData,
    {
      "Content-Type": "multipart/form-data",
    }
  );
  setFlashCard(response.success, response.message ?? response.error);
}

onBeforeMount(async () => {
  const response = await getData<{ englishName: string }>(
    `${ROOT}/anime/${route.params.animeId}`
  );

  if (response.success) {
    animeData.name = response.message!.englishName;
  } else {
    setFlashCard(response.success, response.error);
  }
});
</script>

<template>
  <div class="anime-cont">
    <h1>Update Anime Poster</h1>
    <div class="sub-title">
      Anime: <span class="bold">{{ animeData.name }}</span>
    </div>
    <div class="anime-input-cont">
      <InputFile placeholder="Poster Image *" v-model="form.posterUrl" />
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
  </div>
</template>

<style lang="scss" scoped>
div.anime-cont {
  position: absolute;
  width: 40%;
  height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2vh;

  h1 {
    color: var(--primary-100);
    margin: 1vh auto;
  }

  .submit-btn {
    margin: 1vh auto;
  }

  .helper-txt {
    font-style: italic;
    text-decoration: underline;
    margin: 1vh auto;
    cursor: pointer;
  }
}
</style>
