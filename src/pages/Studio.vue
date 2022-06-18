<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { ROOT } from "../helpers/constants";
import { useRoute } from "vue-router";
import { getData } from "../helpers/fetch";
import { setFlashCard } from "../store/flash";
import router from "../router";
import Dialogue from "../components/Dialogue.vue";
import auth from "../store/auth";

const route = useRoute();

const studioData = reactive({
  id: 0,
  name: "",
  logoUrl: "",
  anime: [
    {
      id: 0,
      englishName: "",
      posterUrl: "",
    },
  ],
});

onBeforeMount(async () => {
  const response = await getData<typeof studioData>(
    `${ROOT}/studio/${route.params.studioId}`
  );

  if (response.success) {
    Object.assign(studioData, response.message);
  } else {
    setFlashCard(response.success, response.error);
  }
});

const dialogueVisibility = ref(false);

async function deleteStudio(val: boolean) {
  if (val) {
    const response = await getData(
      `${ROOT}/studio/${route.params.studioId}`,
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
    text="Are you sure you want to delete the studio?"
    @dialogue="deleteStudio" />
  <div class="page-title">Studio</div>
  <div class="studio-intro">
    <div class="info-cont">
      <div class="left poster-pic">
        <img :src="studioData.logoUrl" :alt="studioData.name" />
      </div>
      <div class="name">
        {{ studioData.name }}
      </div>
    </div>
  </div>

  <div class="animes">
    <div class="sub-title">Animes</div>
    <div class="anime-cont">
      <template v-for="anime in studioData.anime">
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

  <!--TODO: Update-->

  <div
    class="helper-txt"
    v-if="auth.user!.role.toString() !== 'USER'"
    @click="router.push(`/studio/${route.params.studioId}/update/details`)">
    Update Studio Details
  </div>

  <div
    class="helper-txt"
    v-if="auth.user!.role.toString() !== 'USER'"
    @click="router.push(`/studio/${route.params.studioId}/update/logo`)">
    Update Studio Logo
  </div>

  <div
    class="helper-txt"
    v-if="auth.user!.role.toString() !== 'USER'"
    @click="dialogueVisibility = true">
    Delete Studio
  </div>
</template>

<style lang="scss" scoped>
div.info-cont {
  position: relative;
  height: 50vh;
  margin: 5vh auto 7.5vh auto;
  display: flex;
  justify-content: center;
  align-items: center;

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

  div.name {
    font-size: 1.7rem;
    color: var(--primary-100);
    font-weight: bold;
    margin: 5vh 2vh 5vh 10vh;
  }
}

div.animes {
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
