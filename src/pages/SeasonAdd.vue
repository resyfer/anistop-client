<script lang="ts" setup>
import { reactive } from "vue";
import { getData } from "../helpers/fetch";
import {
  ROOT,
  EPISODE_TYPE_OPTIONS,
  SEASON_TYPE_OPTIONS,
  ANIME_SEASON_OPTIONS,
} from "../helpers/constants";
import InputText from "../components/InputText.vue";
import InputNumber from "../components/InputNumber.vue";
import InputChoice from "../components/InputChoice.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";
import { useRoute } from "vue-router";

const route = useRoute();

const formData = reactive({
  episodeType: "",
  name: "",
  seasonType: "",
  studios: [""],
  animeSeasons: [
    {
      year: new Date().getFullYear(),
      seasonOfYear: "",
    },
  ],
});

async function submitForm() {
  const response = await getData(
    `${ROOT}/anime/${route.params.animeId}/season/add`,
    "post",
    formData
  );
  setFlashCard(response.success, response.message ?? response.error);
}

function addStudio() {
  formData.studios.push("");
}

function removeStudio() {
  if (formData.studios.length > 1) {
    formData.studios.pop();
  }
}

function addSeasonOfYear() {
  formData.animeSeasons.push({
    year: new Date().getFullYear(),
    seasonOfYear: "WINTER",
  });
}

function removeSeasonOfYear() {
  if (formData.animeSeasons.length > 1) {
    formData.animeSeasons.pop();
  }
}
</script>

<template>
  <div class="season-cont">
    <h1>Add Season</h1>
    <div class="season-input-cont">
      <InputText placeholder="Name *" v-model="formData.name" />
      <InputChoice
        placeholder="Episode Type *"
        :options="EPISODE_TYPE_OPTIONS"
        v-model="formData.episodeType" />
      <InputChoice
        placeholder="Season Type *"
        :options="SEASON_TYPE_OPTIONS"
        v-model="formData.seasonType" />

      <div class="sub-title">Studios</div>
      <div class="add-remove-btn-cont">
        <div class="add-remove-btn" @click="addStudio">
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="add-remove-btn" @click="removeStudio">
          <i class="fa-solid fa-minus"></i>
        </div>
      </div>
      <template v-for="(_, index) in formData.studios">
        <InputText
          :placeholder="`Studio ${index + 1}*`"
          v-model="formData.studios[index]" />
      </template>

      <div class="sub-title">Seasons Of Year</div>
      <div class="add-remove-btn-cont">
        <div class="add-remove-btn" @click="addSeasonOfYear">
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="add-remove-btn" @click="removeSeasonOfYear">
          <i class="fa-solid fa-minus"></i>
        </div>
      </div>
      <template v-for="(_, index) in formData.animeSeasons">
        <div class="season-of-year-input-cont">
          <InputChoice
            :placeholder="`Season ${index + 1}*`"
            :options="ANIME_SEASON_OPTIONS"
            v-model="formData.animeSeasons[index].seasonOfYear" />
          <InputNumber
            :placeholder="`Year ${index + 1}*`"
            v-model="formData.animeSeasons[index].year" />
        </div>
      </template>
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
  </div>
</template>

<style lang="scss" scoped>
div.season-cont {
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

  div.season-input-cont {
    div.sub-title {
      margin: 2vh 0 0 0;
      font-size: 1.2rem;
      border-bottom: 0.1vh solid var(--primary-100);
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

    div.season-of-year-input-cont {
      display: flex;
      flex-direction: row;

      div {
        margin: 1vh;
      }
    }
  }
}
</style>
