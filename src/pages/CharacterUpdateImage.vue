<script lang="ts" setup>
import { onBeforeMount, reactive } from "vue";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import InputFile from "../components/InputFile.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";
import { useRoute } from "vue-router";

const form = reactive({
  imgUrl: "",
});

const characterData = reactive({
  name: "",
  anime: {
    englishName: "",
  },
});

const route = useRoute();

async function submitForm() {
  const formData = new FormData();
  formData.append("imgUrl", form.imgUrl, characterData.name);

  const response = await getData(
    `${ROOT}/anime/${route.params.animeId}/character/${route.params.characterId}/img`,
    "patch",
    formData,
    {
      "Content-Type": "multipart/form-data",
    }
  );
  setFlashCard(response.success, response.message ?? response.error);
}

onBeforeMount(async () => {
  const response = await getData<typeof characterData>(
    `${ROOT}/anime/${route.params.animeId}/character/${route.params.characterId}`
  );

  if (response.success) {
    Object.assign(characterData, response.message);
  } else {
    setFlashCard(response.success, response.error);
  }
});
</script>

<template>
  <div class="anime-cont">
    <h1>Update Character Image</h1>
    <div class="sub-title">
      Character: <span class="bold">{{ characterData.name }}</span
      ><br />
      Anime: <span class="bold">{{ characterData.anime.englishName }}</span>
    </div>
    <div class="anime-input-cont">
      <InputFile placeholder="Image *" v-model="form.imgUrl" />
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
