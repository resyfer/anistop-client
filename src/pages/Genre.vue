<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { ROOT } from "../helpers/constants";
import { getData } from "../helpers/fetch";
import { setFlashCard } from "../store/flash";
import router from "../router";

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

onBeforeMount(async () => {
  const response = await getData(
    `${ROOT}/genre/${route.params.genre.toString().toUpperCase()}/anime`
  );

  if (response.success) {
    animes.search.pop();
    Object.assign(animes.search, response.message);
  } else {
    setFlashCard(response.success, response.error);
  }
});
</script>

<template>
  <div class="page-title">
    {{ route.params.genre.toString().toUpperCase() }}
  </div>
  <div class="search-results">
    <div class="sub-title">
      <span class="bold">{{ animes.search.length }}</span> Anime(s)
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
</template>

<style lang="scss" scoped>
div.anime-search {
  width: 100%;
  padding: 2vh 4vh;
  display: flex;
  align-items: center;
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
