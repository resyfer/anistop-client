<script lang="ts" setup>
import { onBeforeMount, reactive } from "vue";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import InputText from "../components/InputText.vue";
import InputNumber from "../components/InputNumber.vue";
import InputFile from "../components/InputFile.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";
import { useRoute } from "vue-router";

const route = useRoute();

const form = reactive({
  name: "",
  number: 1,
  videoUrl: "",
});

const seasonInfo = reactive({
  name: "",
  anime: {
    englishName: "",
  },
});

async function submitForm() {
  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("number", form.number.toString());
  formData.append("videoUrl", form.videoUrl, form.name);

  const response = await getData(
    `${ROOT}/anime/${route.params.animeId}/season/${route.params.seasonId}/episode/add`,
    "post",
    formData,
    {
      "Content-Type": "multipart/form-data",
    }
  );
  setFlashCard(response.success, response.message ?? response.error);
}

onBeforeMount(async () => {
  const seasonResponse = await getData<typeof seasonInfo>(
    `${ROOT}/anime/${route.params.animeId}/season/${route.params.seasonId}`
  );

  if (!seasonResponse.success) {
    setFlashCard(seasonResponse.success, seasonResponse.error);
  }
  Object.assign(seasonInfo, seasonResponse.message);
});
</script>

<template>
  <div class="episode-cont">
    <h1>Add Episode</h1>
    <div class="season-info">
      <div class="anime-name">
        Anime: <span class="bold">{{ seasonInfo.anime.englishName }}</span>
      </div>
      <div class="season-name">
        Season: <span class="bold">{{ seasonInfo.name }}</span>
      </div>
    </div>
    <div class="episode-input-cont">
      <InputText placeholder="Name *" v-model="form.name" />
      <InputNumber placeholder="Episode Number" v-model="form.number" />
      <InputFile video placeholder="Episode Video" v-model="form.videoUrl" />
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
  </div>
</template>

<style lang="scss" scoped>
div.episode-cont {
  position: absolute;
  width: 40%;
  height: 65%;
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

  .season-info {
    font-size: 1.1rem;
  }
}
</style>
