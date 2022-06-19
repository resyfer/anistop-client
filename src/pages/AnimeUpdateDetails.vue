<script lang="ts" setup>
import { reactive, ref, onBeforeMount } from "vue";
import { getData } from "../helpers/fetch";
import { ROOT, COUNTRY_OPTIONS, GENRE_OPTIONS } from "../helpers/constants";
import InputText from "../components/InputText.vue";
import InputFile from "../components/InputFile.vue";
import InputArea from "../components/InputArea.vue";
import InputChoice from "../components/InputChoice.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";
import { useRoute } from "vue-router";

const route = useRoute();

interface Form {
  englishName: string;
  japaneseName: string;
  description: string;
  genres: string[];
  country: string;
  keywords: string[];
}

const formData = reactive<Form>({
  englishName: "",
  japaneseName: "",
  description: "",
  genres: [""],
  country: "JAPAN",
  keywords: [""],
});

async function submitForm() {
  const response = await getData(
    `${ROOT}/anime/${route.params.animeId}`,
    "patch",
    formData
  );
  setFlashCard(response.success, response.message ?? response.error);
}

onBeforeMount(async () => {
  const response = await getData(`${ROOT}/anime/${route.params.animeId}`);

  if (response.success) {
    Object.assign(formData, response.message);
  } else {
    setFlashCard(response.success, response.error);
  }
});

function addKeyword() {
  formData.keywords.push("");
}

function removeKeyword() {
  if (formData.keywords.length > 1) {
    formData.keywords.pop();
  }
}
</script>

<template>
  <div class="anime-cont">
    <h1>Update Anime Details</h1>
    <div class="anime-input-cont">
      <InputText placeholder="English Name *" v-model="formData.englishName" />
      <InputText
        placeholder="Japanese Name *"
        v-model="formData.japaneseName" />
      <InputArea placeholder="Description *" v-model="formData.description" />
      <InputChoice
        placeholder="Country *"
        :options="COUNTRY_OPTIONS"
        v-model="formData.country" />
      <InputChoice
        placeholder="Genre *"
        multiple
        :options="GENRE_OPTIONS"
        v-model="formData.genres" />
      <!-- <InputArea
        placeholder="Keywords * (separate with a comma)"
        v-model="formData.keywords" /> -->

      <div class="sub-title">Keywords</div>
      <div class="add-remove-btn-cont">
        <div class="add-remove-btn" @click="addKeyword">
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="add-remove-btn" @click="removeKeyword">
          <i class="fa-solid fa-minus"></i>
        </div>
      </div>
      <template v-for="(_, index) in formData.keywords">
        <InputText
          :placeholder="`Keyword ${index + 1} *`"
          v-model="formData.keywords[index]" />
      </template>
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
  </div>
</template>

<style lang="scss" scoped>
div.anime-cont {
  width: 40%;
  height: 90%;
  margin: 5vh auto 2vh auto;
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

  .helper-txt {
    font-style: italic;
    text-decoration: underline;
    margin: 1vh auto;
    cursor: pointer;
  }

  div.add-remove-btn-cont {
    display: flex;
    flex-direction: row;

    div.add-remove-btn {
      border: 0.2vh solid var(--primary-100);
      height: 5vh;
      aspect-ratio: 1/1;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1vh;
      cursor: pointer;

      &:hover {
        color: var(--background-100);
        background-color: var(--primary-100);
        transition: 0.2s ease-in-out;
      }
    }
  }
}
</style>
