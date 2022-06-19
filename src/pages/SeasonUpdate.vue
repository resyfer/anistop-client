<script lang="ts" setup>
import { reactive, onBeforeMount, ref } from "vue";
import { getData } from "../helpers/fetch";
import {
  ROOT,
  EPISODE_TYPE_OPTIONS,
  SEASON_TYPE_OPTIONS,
  ANIME_SEASON_OPTIONS,
  STATUS_OPTIONS,
} from "../helpers/constants";
import InputText from "../components/InputText.vue";
import InputNumber from "../components/InputNumber.vue";
import InputChoice from "../components/InputChoice.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";
import { useRoute } from "vue-router";
import router from "../router";

const route = useRoute();

interface SeasonData {
  episodeType: string;
  seasonType: string;
  status: string;
  studios: string[];
  animeSeasons: [
    {
      year: number;
      seasonOfYear: string;
    }
  ];
  name: string;
  anime: {
    englishName: string;
  };
}

const formData = reactive({
  episodeType: "",
  seasonType: "",
  status: "",
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
    `${ROOT}/anime/${route.params.animeId}/season/${route.params.seasonId}`,
    "patch",
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

const seasonName = ref("");
const animeName = ref("");

onBeforeMount(async () => {
  const response = await getData<SeasonData>(
    `${ROOT}/anime/${route.params.animeId}/season/${route.params.seasonId}`
  );

  if (response.success) {
    Object.assign(formData, response.message);
    seasonName.value = response.message!.name;
    animeName.value = response.message!.anime.englishName;
  } else {
    setFlashCard(response.success, response.error);
  }
});
</script>

<template>
  <div class="season-cont">
    <h1>Update Season</h1>
    <div class="sub-title">
      Season:
      <span
        class="bold"
        @click="
          router.push(
            `/anime/${route.params.animeId}/season/${route.params.seasonId}`
          )
        "
        >{{ seasonName }}</span
      >
      <br />
      Anime:
      <span
        class="bold"
        @click="router.push(`/anime/${route.params.animeId}`)"
        >{{ animeName }}</span
      >
    </div>
    <div class="season-input-cont">
      <InputChoice
        placeholder="Episode Type *"
        :options="EPISODE_TYPE_OPTIONS"
        v-model="formData.episodeType" />
      <InputChoice
        placeholder="Season Type *"
        :options="SEASON_TYPE_OPTIONS"
        v-model="formData.seasonType" />
      <InputChoice
        placeholder="Season Status *"
        :options="STATUS_OPTIONS"
        v-model="formData.status" />

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
      <template v-for="(season, index) in formData.animeSeasons">
        <div class="season-of-year-input-cont">
          <InputChoice
            :placeholder="`Season ${index + 1}*`"
            :options="ANIME_SEASON_OPTIONS"
            v-model="season.seasonOfYear" />
          <InputNumber
            :placeholder="`Year ${index + 1}*`"
            v-model="season.year" />
        </div>
      </template>
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
  </div>
</template>

<style lang="scss" scoped>
div.season-cont {
  width: 40%;
  margin: 5vh auto 2vh auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 4vh;

  div.sub-title {
    span {
      cursor: pointer;
    }
  }

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
      font-size: 1.1rem;
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
