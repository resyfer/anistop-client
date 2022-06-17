<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { ROOT } from "../helpers/constants";
import { getData } from "../helpers/fetch";
import { useRoute } from "vue-router";
import { setFlashCard } from "../store/flash";
import Video from "../components/Video.vue";
import router from "../router";
import Dialogue from "../components/Dialogue.vue";
import auth from "../store/auth";

const route = useRoute();

const episodeData = reactive({
  number: 0,
  name: "",
  season: {
    id: 0,
    name: "",
    anime: {
      id: 0,
      englishName: "",
    },
  },
  viewCount: 0,
  url: "",
});

const episodeList = reactive({
  episodes: [
    {
      number: 0,
      views: [
        {
          id: 0,
          viewerId: 0,
        },
      ],
    },
  ],
});

onBeforeMount(async () => {
  const episodeInfo = await getData(
    `${ROOT}/anime/${route.params.animeId}/season/${route.params.seasonId}/episode/${route.params.episodeNumber}/details`
  );

  if (episodeInfo.success) {
    Object.assign(episodeData, episodeInfo.message);
  } else {
    setFlashCard(episodeInfo.success, episodeInfo.error);
  }

  const episodeVideoInfo = await getData<{ videoUrl: string }>(
    `${ROOT}/anime/${route.params.animeId}/season/${route.params.seasonId}/episode/${route.params.episodeNumber}/video`
  );
  if (episodeVideoInfo.success) {
    episodeData.url = episodeVideoInfo.message!.videoUrl;
  } else {
    setFlashCard(episodeVideoInfo.success, episodeVideoInfo.error);
  }

  const episodeListInfo = await getData<typeof episodeList.episodes>(
    `${ROOT}/anime/${route.params.animeId}/season/${route.params.seasonId}/episode/all`
  );
  if (episodeListInfo.success) {
    episodeList.episodes.pop();
    episodeListInfo.message!.forEach((episode) => {
      episodeList.episodes.push(episode);
    });
  } else {
    setFlashCard(episodeListInfo.success, episodeListInfo.error);
  }
});

const dialogueVisibility = ref(false);

async function deleteEpisode(val: boolean) {
  if (val) {
    const response = await getData(
      `${ROOT}/anime/${route.params.animeId}/season/${route.params.seasonId}/episode`,
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
    text="Are you sure you want to delete the season?"
    @dialogue="deleteEpisode" />
  <div class="episode">
    <div class="episode-info-top">
      <div class="episode-name">
        Episode #<span class="bold">{{ episodeData.number }}</span> :
        <span class="bold">{{ episodeData.name }}</span>
      </div>
      <div class="views">
        Views: <span class="bold">{{ episodeData.viewCount }}</span>
      </div>
    </div>
    <div class="episode-video">
      <Video :url="episodeData.url" />
    </div>
    <div class="episode-info-bottom">
      <div
        class="season-name"
        @click="
          router.push(
            `/anime/${route.params.animeId}/season/${route.params.seasonId}`
          )
        ">
        Season: <span class="bold">{{ episodeData.season.name }}</span>
      </div>
      <div
        class="anime-name"
        @click="router.push(`/anime/${route.params.animeId}`)">
        Anime:
        <span class="bold">{{ episodeData.season.anime.englishName }}</span>
      </div>
    </div>
    <div class="episode-list">
      <template v-for="episode in episodeList.episodes">
        <div
          :class="[
            'episode-short',
            { watched: episode.views.length > 0 },
            { active: episode.number === episodeData.number },
          ]"
          @click="
            router.push(
              `/anime/${route.params.animeId}/season/${route.params.seasonId}/episode/${episode.number}`
            )
          ">
          {{ episode.number }}
        </div>
      </template>
    </div>

    <div
      class="helper-txt"
      v-if="auth.user!.role.toString() !== 'USER'"
      @click="
        router.push(
          `${ROOT}/anime/${route.params.animeId}/season/${route.params.seasonId}/episode/${route.params.episodeNumber}/update`
        )
      ">
      Update Episode
    </div>
    <div
      class="helper-txt"
      v-if="auth.user!.role.toString() !== 'USER'"
      @click="dialogueVisibility = true">
      Delete Episode
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.episode {
  position: absolute;
  margin-top: 5vh;
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  div.episode-info-top {
    width: 100%;
    text-align: center;
    font-size: 1.3rem;

    div {
      width: 100%;
    }
  }
  div.episode-video {
    width: 60%;
  }

  div.episode-info-bottom {
    width: 100%;
    text-align: center;
    font-size: 1.1rem;

    div {
      width: 100%;
      cursor: pointer;
    }
  }

  div.episode-list {
    width: 80%;
    margin: 5vh auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-bottom: 5vh;
    div.episode-short {
      height: 7vh;
      aspect-ratio: 1/1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1vh;
      border-radius: 2vh;
      border: 0.2vh solid var(--primary-100);
      transition: 0.2s ease-in-out;
      cursor: pointer;

      &.watched {
        background-color: var(--primary-40);
      }

      &:hover {
        background-color: var(--primary-100);
        color: var(--background-100);
      }

      &.active {
        background-color: var(--primary-100);
        color: var(--background-100);
      }
    }
  }
}
</style>
