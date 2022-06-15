<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { ROOT } from "../helpers/constants";
import { getData } from "../helpers/fetch";
import { setFlashCard } from "../store/flash";
import router from "../router";
import { toCapitalCase } from "../helpers/string";
import { radioGroupInjectionKey } from "naive-ui/es/radio/src/use-radio";

const route = useRoute();

interface SeasonData {
  id: number;
  name: string;
  seasonType: string;
  episodeType: string;
  views: number;
  status: string;
  animeId: number;
  anime: {
    englishName: string;
    japaneseName: string;
    posterUrl: string;
    backgroundImgUrl: string;
  };
  episodes: {
    id: number;
    name: string;
    number: number;
    viewCount: number;
    views: {
      id: number;
      viewerId: number;
      episodeId: number;
    }[];
  }[];
  _sum: {
    rating: number | null;
  };
  _count: {
    rating: number;
  };
}

let seasonData = reactive<SeasonData>({
  id: 0,
  name: "",
  seasonType: "",
  episodeType: "",
  views: 0,
  status: "",
  animeId: 0,
  anime: {
    englishName: "",
    japaneseName: "",
    posterUrl: "",
    backgroundImgUrl: "",
  },
  episodes: [
    {
      id: 0,
      name: "",
      number: 0,
      viewCount: 0,
      views: [
        {
          id: 0,
          viewerId: 0,
          episodeId: 0,
        },
      ],
    },
  ],
  _sum: {
    rating: 0,
  },
  _count: {
    rating: 0,
  },
});

onBeforeMount(async () => {
  const response = await getData<SeasonData>(
    `${ROOT}/anime/${route.params.animeId}/season/${route.params.seasonId}`
  );

  if (response.success && response.message) {
    Object.assign(seasonData, response.message);
  } else {
    setFlashCard(response.success, response.error);
  }
});
</script>

<template>
  <div class="season">
    <div class="background">
      <div class="background-pic-cont">
        <div class="background-tint"></div>
        <img
          class="background-pic"
          :src="seasonData.anime.backgroundImgUrl"
          :alt="seasonData.anime.englishName"
          loading="lazy" />
      </div>

      <div class="intro">
        <div class="poster-pic">
          <img
            :src="seasonData.anime.posterUrl"
            :alt="seasonData.anime.englishName"
            loading="lazy" />
        </div>
        <div class="anime-intro-info">
          <div class="name">
            <div class="bold season-name">{{ seasonData.name }}</div>
            <div
              class="anime-name"
              @click="router.push(`/anime/${route.params.animeId}`)">
              Anime:
              <span class="bold"
                >{{ seasonData.anime.englishName }} ({{
                  seasonData.anime.japaneseName
                }})</span
              >
            </div>
          </div>
          <div class="rating">
            Rating:
            <span class="bold">{{
              seasonData._sum.rating == null
                ? "N/A"
                : seasonData._sum.rating / seasonData._count.rating
            }}</span>
          </div>
          <div class="views">
            Page Views: <span class="bold">{{ seasonData.views }}</span>
          </div>
        </div>
      </div>

      <div class="episodes">
        <div class="sub-title">Episodes</div>
        <div class="episode-cont">
          <template v-for="episode in seasonData.episodes">
            <div
              :class="['episode', { watched: episode.views.length > 0 }]"
              @click="
                router.push(
                  `/anime/${route.params.animeId}/season/${route.params.seasonId}/episode/${episode.number}`
                )
              ">
              <div class="number">{{ episode.number }}</div>
              <div class="name">{{ episode.name }}</div>
              <div class="views">{{ episode.viewCount }} View(s)</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.season {
  width: 100%;

  div.background {
    position: relative;
    width: 100%;
    height: 50vh;

    div.background-pic-cont {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;

      img.background-pic {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 0;
        width: 100%;
      }
    }

    div.intro {
      position: absolute;
      z-index: 2;
      width: 80%;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 0);
      display: flex;
      align-items: flex-end;
      justify-content: space-around;

      div.poster-pic {
        position: relative;
        height: 100%;
        aspect-ratio: 3/4;
        z-index: 2;
        border-radius: 1vh;
        border: 0.5vh solid var(--primary-100);
        overflow: hidden;

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
      }

      div.anime-intro-info {
        height: 50%;
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        div {
          width: 100%;
          padding-left: 2vh;
          font-size: 1.1rem;
        }
        div.name {
          font-size: 1.3rem;
          margin: 1vh;
          display: flex;
          flex-direction: column;

          div {
            margin: 1vh;
          }

          div.anime-name {
            font-size: 1.2rem;
            cursor: pointer;
          }

          div.season-name {
            font-size: 1.5rem;
          }
        }

        div.country {
          width: 100%;
          margin-top: 5vh;
        }
      }
    }
  }

  div.episodes {
    margin-top: 30vh;

    div.episode-cont {
      padding-bottom: 4vh;

      div.episode {
        position: relative;
        margin: 3vh auto;
        padding: 2vh;
        width: 90%;
        display: flex;
        border-radius: 2vh;
        border: 0.2vh solid var(--primary-100);
        cursor: pointer;
        font-size: 1.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.2s ease-in-out;

        &.watched {
          background-color: var(--primary-40);
        }

        &:hover {
          background-color: var(--primary-100);
          color: var(--background-100);
        }

        div {
          text-align: center;
        }

        div.number {
          width: 5%;
          height: 100%;
        }

        div.name {
          width: 80%;
        }

        div.views {
          width: 10%;
        }
      }
    }
  }
}
</style>
