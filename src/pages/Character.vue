<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { ROOT } from "../helpers/constants";
import { getData } from "../helpers/fetch";
import { setFlashCard } from "../store/flash";
import router from "../router";
import auth from "../store/auth";
import Dialogue from "../components/Dialogue.vue";

const route = useRoute();
let characterData = reactive({
  id: 0,
  name: "",
  animeId: 0,
  description: "",
  imgUrl: "",
  _count: {
    characterFavorites: 0,
  },
  anime: {
    id: 0,
    englishName: "",
    posterUrl: "",
    backgroundImgUrl: "",
  },
  vas: [
    {
      id: 0,
      name: "",
      imgUrl: "",
    },
  ],
});

let favStatus = ref<boolean | null>(null);

onBeforeMount(async () => {
  const response = await getData<typeof characterData>(
    `${ROOT}/anime/${route.params.animeId}/character/${route.params.characterId}`
  );

  if (response.success && response.message) {
    Object.assign(characterData, response.message);

    favStatus.value = (
      await getData<boolean>(
        `${ROOT}/anime/${route.params.animeId}/character/${route.params.characterId}/fav`
      )
    ).message!;
  } else {
    setFlashCard(response.success, response.error);
  }
});

async function toggleFavorite() {
  const res1 = await getData(
    `${ROOT}/anime/${route.params.animeId}/character/${route.params.characterId}/fav_toggle`,
    "patch"
  );
  setFlashCard(res1.success, res1.message ?? res1.error);

  if (favStatus.value) {
    characterData._count.characterFavorites--;
  } else {
    characterData._count.characterFavorites++;
  }

  favStatus.value = !favStatus.value;
}

const dialogueVisibility = ref(false);

async function deleteCharacter(val: boolean) {
  if (val) {
    const response = await getData(
      `${ROOT}/anime/${route.params.animeId}/character/${route.params.characterId}`,
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
    text="Are you sure you want to delete the character?"
    @dialogue="deleteCharacter" />
  <div class="character">
    <div class="background">
      <div class="background-pic-cont">
        <div class="background-tint"></div>
        <img
          class="background-pic"
          :src="characterData.anime.backgroundImgUrl"
          :alt="characterData.name"
          loading="lazy" />
      </div>

      <div class="intro">
        <div class="profile-pic">
          <img
            :src="characterData.imgUrl"
            :alt="characterData.name"
            loading="lazy" />
        </div>
        <div class="character-intro-info">
          <div class="name">
            Name: <span class="bold">{{ characterData.name }}</span>
          </div>
          <div class="favorites">
            Favorites:
            <span class="bold">{{
              characterData._count.characterFavorites
            }}</span>
          </div>
          <div
            class="fav-toggle"
            v-if="favStatus !== null"
            @click="toggleFavorite">
            {{ favStatus ? "Remove from Favorites" : "Add to Favorites" }}
          </div>
        </div>
      </div>
    </div>

    <div class="description">
      <div class="sub-title">Description</div>
      <br />
      {{ characterData.description }}
    </div>

    <div class="anime">
      <div class="sub-title">Anime</div>
      <div
        class="anime-cont"
        @click="router.push(`/anime/${characterData.anime.id}`)">
        <div class="img">
          <img
            :src="characterData.anime.posterUrl"
            :alt="characterData.anime.englishName"
            loading="lazy" />
        </div>
        <div class="info">
          <span class="bold">{{ characterData.anime.englishName }}</span>
        </div>
      </div>
    </div>

    <div class="vas">
      <div class="sub-title">Voice Actors</div>

      <div class="va-cont">
        <template v-for="va in characterData.vas">
          <div class="va">
            <div class="img">
              <img :src="va.imgUrl" :alt="va.name" loading="lazy" />
            </div>
            <div class="info">
              <span class="bold">{{ va.name }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div
      v-if="auth.user?.role.toString() !== 'USER'"
      class="add-va helper-txt"
      @click="router.push(`/va/add`)">
      Add Voice Actor
    </div>

    <div
      class="helper-txt"
      v-if="auth.user!.role.toString() !== 'USER'"
      @click="
        router.push(
          `/anime/${route.params.animeId}/character/${route.params.characterId}/update/details`
        )
      ">
      Update Character Details
    </div>

    <div
      class="helper-txt"
      v-if="auth.user!.role.toString() !== 'USER'"
      @click="dialogueVisibility = true">
      Delete Character
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.character {
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

      div.profile-pic {
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

      div.character-intro-info {
        height: 50%;
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        div.name {
          font-size: 1.3rem;
          margin: 1vh;
        }

        div.favorites {
          font-size: 1.1rem;
        }

        div.fav-toggle {
          padding: 1vh;
          margin: 0.5vh;
          border-radius: 1vh;
          border: 0.2vh solid var(--primary-100);
          cursor: pointer;
          transition: 0.2s ease-in-out;

          &:hover {
            background-color: var(--primary-100);
            color: var(--background-100);
          }
        }
      }
    }
  }

  div.description {
    margin-top: 40vh;
    padding: 2vh 4vh 2vh 4vh;
    white-space: pre-line;
    font-size: 0.9rem;
    text-align: justify;
  }

  div.anime {
    div.anime-cont {
      position: relative;
      margin: 4vh;
      width: 40%;
      height: 30vh;
      display: flex;
      border-radius: 2vh;
      overflow: hidden;
      border: 0.2vh solid var(--primary-100);
      cursor: pointer;

      div.img {
        position: relative;
        height: 100%;
        aspect-ratio: 3/4;
        overflow: hidden;

        img {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
        }
      }

      div.info {
        display: flex;
        align-items: center;
        padding: 4vh;
      }
    }
  }

  div.vas {
    div.va-cont {
      display: flex;
      div.va {
        position: relative;
        margin: 4vh;
        width: 30%;
        height: 30vh;
        display: flex;
        border-radius: 2vh;
        overflow: hidden;
        border: 0.2vh solid var(--primary-100);
        cursor: pointer;

        div.img {
          position: relative;
          height: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;

          img {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
          }
        }

        div.info {
          display: flex;
          align-items: center;
          padding: 4vh;
        }
      }
    }
  }
}
</style>
