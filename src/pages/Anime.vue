<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { ROOT } from "../helpers/constants";
import { getData } from "../helpers/fetch";
import { setFlashCard } from "../store/flash";
import router from "../router";
import { toCapitalCase } from "../helpers/string";
import auth from "../store/auth";
import Dialogue from "../components/Dialogue.vue";

const route = useRoute();
let animeData = reactive({
  id: 0,
  englishName: "",
  japaneseName: "",
  description: "",
  posterUrl: "",
  backgroundImgUrl: "",
  genres: [""],
  characters: [
    {
      id: 0,
      name: "",
      vas: [
        {
          id: 0,
          name: "",
          imgUrl: "",
        },
      ],
      imgUrl: "",
      _count: {
        characterFavorites: 0,
      },
    },
  ],
  seasons: [
    {
      id: 0,
      name: "",
      episodeType: "",
      seasonType: "",
      _count: {
        episodes: 0,
      },
    },
  ],
});

onBeforeMount(async () => {
  const response = await getData<typeof animeData>(
    `${ROOT}/anime/${route.params.animeId}`
  );

  if (response.success && response.message) {
    Object.assign(animeData, response.message);
  } else {
    setFlashCard(response.success, response.error);
  }
});

const dialogueVisibility = ref(false);

async function deleteAnime(val: boolean) {
  if (val) {
    const response = await getData(
      `${ROOT}/anime/${route.params.animeId}`,
      "delete"
    );

    if (response.success) {
      router.go(-1);
    }

    setFlashCard(response.success, response.error ?? response.message);
  }

  dialogueVisibility.value = false;
}
</script>

<template>
  <Dialogue
    v-if="dialogueVisibility"
    text="Are you sure you want to delete the anime?"
    @dialogue="deleteAnime" />
  <div class="anime">
    <div class="background">
      <div class="background-pic-cont">
        <div class="background-tint"></div>
        <img
          class="background-pic"
          :src="animeData.backgroundImgUrl"
          :alt="animeData.englishName"
          loading="lazy" />
      </div>

      <div class="intro">
        <div class="poster-pic">
          <img
            :src="animeData.posterUrl"
            :alt="animeData.englishName"
            loading="lazy" />
        </div>
        <div class="anime-intro-info">
          <div class="name">
            <div class="bold name-eng">{{ animeData.englishName }}</div>
            <div class="bold name-jp">{{ animeData.japaneseName }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="seasons">
      <div class="sub-title">Seasons</div>

      <template v-for="season in animeData.seasons">
        <div
          class="season"
          @click="router.push(`/anime/${animeData.id}/season/${season.id}`)">
          <div class="name bold">{{ season.name }}</div>
          <div class="episodes">{{ season._count.episodes }} Episode(s)</div>

          <div class="type">
            <div class="season-type" v-if="season.seasonType !== 'TV_SERIES'">
              {{ season.seasonType }}
            </div>
            <div :class="['episode-type', season.episodeType.toLowerCase()]">
              {{ season.episodeType }}
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="description">
      <div class="sub-title">Description</div>
      {{ animeData.description }}
    </div>

    <div class="genres">
      <div class="sub-title">Genres</div>
      <div class="genre-cont">
        <template v-for="genre in animeData.genres">
          <div
            class="genre"
            @click="router.push(`/genre/${genre.toLowerCase()}`)">
            {{ toCapitalCase(genre) }}
          </div>
        </template>
      </div>
    </div>

    <div class="characters">
      <div class="sub-title">Characters</div>
      <div class="character-cont">
        <template v-for="character in animeData.characters">
          <div
            class="character"
            @click="
              router.push(`/anime/${animeData.id}/character/${character.id}`)
            ">
            <div class="left">
              <div class="character-img img">
                <img
                  :src="character.imgUrl"
                  :alt="character.name"
                  loading="lazy" />
              </div>
            </div>
            <div class="middle">
              <div class="character-name bold">
                {{ character.name }}
              </div>
              <div class="favorites">
                {{ character._count.characterFavorites }} Favorites
              </div>
              <div class="va-name">
                VA: <span class="bold">{{ character.vas[0].name }}</span>
              </div>
            </div>
            <div class="right">
              <div class="character-va img">
                <img
                  :src="character.vas[0].imgUrl"
                  :alt="character.name"
                  loading="lazy" />
              </div>
            </div>
          </div>
        </template>
      </div>

      <div
        v-if="auth.user?.role.toString() !== 'USER'"
        class="add-character helper-txt"
        @click="router.push(`/anime/${animeData.id}/character/add`)">
        Add Character
      </div>

      <div
        v-if="auth.user?.role.toString() !== 'USER'"
        class="add-va helper-txt"
        @click="router.push(`/va/add`)">
        Add Voice Actor
      </div>

      <div
        v-if="auth.user?.role.toString() !== 'USER'"
        class="update-anime helper-txt"
        @click="router.push(`/anime/${route.params.animeId}/update/details`)">
        Update Anime Details
      </div>

      <div
        v-if="auth.user?.role.toString() !== 'USER'"
        class="update-anime helper-txt"
        @click="router.push(`/anime/${route.params.animeId}/update/poster`)">
        Update Anime Poster
      </div>

      <div
        v-if="auth.user?.role.toString() !== 'USER'"
        class="update-anime helper-txt"
        @click="
          router.push(`/anime/${route.params.animeId}/update/background`)
        ">
        Update Anime Background
      </div>

      <div
        v-if="auth.user?.role.toString() !== 'USER'"
        class="delete-anime helper-txt"
        @click="dialogueVisibility = true">
        Delete Anime
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.anime {
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

        div.name {
          font-size: 1.3rem;
          margin: 1vh;
          width: 100%;
          display: flex;
          flex-direction: column;

          div {
            margin: 1vh;
          }

          div.name-eng {
            font-size: 1.5rem;
          }

          div.name-jp {
            font-size: 1.2rem;
          }
        }

        div.country {
          width: 100%;
          margin-top: 5vh;
        }
      }
    }
  }

  div.seasons {
    margin-top: 30vh;
    div.season {
      position: relative;
      margin: 4vh auto;
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

      &:hover {
        background-color: var(--primary-100);
        color: var(--background-100);

        div.bold {
          color: var(--background-100);
        }
      }

      div.name {
        width: 50%;
        text-align: center;
      }

      div.type {
        display: flex;

        div {
          margin: 0 1vh;
        }
      }

      div.episode-type {
        padding: 2vh;
        border-radius: 1vh;
      }

      div.sub {
        background-color: rgb(94, 255, 147);
        color: var(--background-100);
      }

      div.dub {
        background-color: rgb(255, 202, 30);
        color: var(--background-100);
      }

      div.season-type {
        padding: 2vh;
        border-radius: 1vh;
        background-color: rgb(255, 89, 47);
        color: var(--background-100);
      }
    }
  }

  div.description {
    padding: 2vh 4vh 2vh 4vh;
    white-space: pre-line;
    font-size: 0.9rem;
    text-align: justify;
  }

  div.genres {
    div.genre-cont {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      div.genre {
        margin: 0.5vh 1vh;
        padding: 1.5vh 2vh;
        border: 0.2vh solid var(--primary-100);
        border-radius: 1vh;
        transition: 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
          background-color: var(--primary-100);
          color: var(--background-100);
        }
      }
    }
  }

  div.characters {
    div.character-cont {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      div.character {
        display: flex;
        width: 45%;
        height: 30vh;
        justify-content: space-between;
        margin: 1vh;
        border-radius: 2vh;
        overflow: hidden;
        border: 0.2vh solid var(--primary-100);

        div.img {
          position: relative;
          height: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;

          img {
            position: absolute;
            top: 0;
            height: 100%;
          }
        }

        div.left img {
          left: 0;
        }

        div.right img {
          right: 0;
        }

        div.middle {
          width: calc(100% - 2 * (3 / 4 * 30vh));
          height: 100%;
          padding: 3vh 2vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          div {
            width: 100%;
          }

          div.character-name {
            font-size: 1.5rem;
          }

          div.va-name {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
