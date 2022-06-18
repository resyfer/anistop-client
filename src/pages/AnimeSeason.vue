<script lang="ts" setup>
import { onBeforeMount, reactive } from "vue";
import { useRoute } from "vue-router";
import { ROOT } from "../helpers/constants";
import { getData } from "../helpers/fetch";
import { setFlashCard } from "../store/flash";
import router from "../router";
import InputNumber from "../components/InputNumber.vue";
import InputChoice from "../components/InputChoice.vue";
import { ANIME_SEASON_OPTIONS } from "../helpers/constants";
import Button from "../components/Button.vue";

const route = useRoute();

const animes = reactive({
  search: [
    {
      id: 0,
      posterUrl: "",
      englishName: "",
    },
  ],
});

const search = reactive({
  year: 0,
  season: "",
});

onBeforeMount(async () => {
  const response = await getData(
    `${ROOT}/anime_season/${route.params.year}/${route.params.season
      .toString()
      .toUpperCase()}/anime`
  );

  if (response.success) {
    animes.search.pop();
    Object.assign(animes.search, response.message);
  } else {
    setFlashCard(response.success, response.error);
  }

  search.year = parseInt(route.params.year as string);
  search.season = route.params.season as string;
});
</script>

<template>
  <div class="page-title">
    {{ route.params.year }} {{ route.params.season.toString().toUpperCase() }}
  </div>

  <div class="search">
    <InputNumber placeholder="Year" v-model="search.year" />
    <InputChoice
      placeholder="Season of Year"
      :options="ANIME_SEASON_OPTIONS"
      v-model="search.season" />
    <Button
      text="Search"
      @click="
        router.replace(`/anime_season/${search.year}/${search.season}`)
      " />
  </div>

  <div class="search-results">
    <div class="sub-title">
      <span class="bold">{{ animes.search.length }}</span> Search Result(s)
    </div>
    <div class="anime-cont">
      <template v-for="anime in animes.search">
        <div class="anime" @click="router.push(`/anime/${anime.id}`)">
          <div class="img">
            <img :src="anime.posterUrl" :alt="anime.englishName" />
          </div>
          <div class="name">
            {{
              anime.englishName.length > 50
                ? anime.englishName.substring(0, 50) + "..."
                : anime.englishName
            }}
          </div>
        </div>
      </template>
    </div>
  </div>

  <div class="helper-txt" @click="router.push('/anime_season/add')">
    Add Anime Season
  </div>
</template>

<style lang="scss" scoped>
div.search {
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  div {
    margin: 1vh;
  }
}

div.search-results {
  width: 100%;
  div.anime-cont {
    position: relative;
    width: 100%;
    padding: 5vh;
    display: flex;
    flex-wrap: wrap;

    div.anime {
      width: 30vh;
      cursor: pointer;
      margin: 1vh 3vh;

      &:hover {
        div.img {
          box-shadow: 0 0 2vh var(--primary-100);
        }
      }

      div.img {
        position: relative;
        width: 100%;
        aspect-ratio: 3/4;
        z-index: 2;
        border-radius: 1vh;
        border: 0.5vh solid var(--primary-100);
        overflow: hidden;
        transition: 0.2s ease-in-out;

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
      }

      div.name {
        width: 100%;
        height: 7.5vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
