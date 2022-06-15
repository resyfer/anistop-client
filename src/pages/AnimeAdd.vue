<script lang="ts" setup>
import { reactive, ref } from "vue";
import { getData } from "../helpers/fetch";
import { ROOT, COUNTRY_OPTIONS, GENRE_OPTIONS } from "../helpers/constants";
import InputText from "../components/InputText.vue";
import InputFile from "../components/InputFile.vue";
import InputArea from "../components/InputArea.vue";
import InputChoice from "../components/InputChoice.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";

interface Form {
  englishName: string;
  japaneseName: string;
  description: string;
  genres: string[];
  country: string;
  keywords: string; //split later
  posterUrl: string;
  backgroundImgUrl: string;
}

const form = reactive<Form>({
  englishName: "",
  japaneseName: "",
  description: "",
  genres: [],
  country: "JAPAN",
  keywords: "",
  posterUrl: "",
  backgroundImgUrl: "",
});

const genres = ref<string[]>([]);

async function submitForm() {
  const formData = new FormData();

  formData.append("englishName", form.englishName);
  formData.append("japaneseName", form.japaneseName);
  formData.append("description", form.description);
  formData.append("genres", form.genres.join(","));
  formData.append("country", form.country);
  formData.append("keywords", form.keywords);
  formData.append("posterUrl", form.posterUrl, form.englishName);
  formData.append("backgroundImgUrl", form.backgroundImgUrl, form.englishName);

  const response = await getData(`${ROOT}/anime/add`, "post", formData, {
    "Content-Type": "multipart/form-data",
  });
  setFlashCard(response.success, response.message ?? response.error);
}
</script>

<template>
  <div class="anime-cont">
    <h1>Add Anime</h1>
    <div class="anime-input-cont">
      <InputText placeholder="English Name *" v-model="form.englishName" />
      <InputText placeholder="Japanese Name *" v-model="form.japaneseName" />
      <InputArea placeholder="Description *" v-model="form.description" />
      <InputChoice
        placeholder="Country *"
        :options="COUNTRY_OPTIONS"
        v-model="form.country" />
      <InputChoice
        placeholder="Genre *"
        multiple
        :options="GENRE_OPTIONS"
        v-model="form.genres" />
      <InputArea
        placeholder="Keywords * (separate with a comma)"
        v-model="form.keywords" />
      <InputFile placeholder="Poster Image *" v-model="form.posterUrl" />
      <InputFile
        placeholder="Background Image *"
        v-model="form.backgroundImgUrl" />
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
