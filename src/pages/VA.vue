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

const vaData = reactive({
  id: 0,
  name: "",
  dob: "1970-01-01T00:00:00.000Z",
  more: "",
  imgUrl: "",
  characters: [
    {
      id: 0,
      name: "",
      imgUrl: "",
      anime: {
        id: 0,
        englishName: "",
        posterUrl: "",
      },
      _count: {
        characterFavorites: 0,
      },
    },
  ],
});

onBeforeMount(async () => {
  const response = await getData<typeof vaData>(
    `${ROOT}/va/${route.params.vaId}`
  );

  if (response.success) {
    Object.assign(vaData, response.message);
  } else {
    setFlashCard(response.success, response.error);
  }
});

const dialogueVisibility = ref(false);

async function deleteVA(val: boolean) {
  if (val) {
    const response = await getData(`${ROOT}/va/${route.params.vaId}`, "delete");

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
    @dialogue="deleteVA" />
  <div class="page-title">Voice Actor</div>
  <div class="studio-intro">
    <div class="info-cont">
      <div class="left poster-pic">
        <img :src="vaData.imgUrl" :alt="vaData.name" />
      </div>
      <div class="right">
        <div class="name">
          {{ vaData.name }}
        </div>
        <div class="birthday">
          Birthday:
          <span class="bold">{{ new Date(vaData.dob).toLocaleString() }}</span
          ><br />(Date and time according to your timezone)
        </div>
      </div>
    </div>
  </div>

  <div class="more">
    <div class="sub-title">More</div>
    {{ vaData.more }}
  </div>

  <div class="characters">
    <div class="sub-title">Characters</div>
    <div class="character-cont">
      <template v-for="character in vaData.characters">
        <div
          class="character"
          @click="
            router.push(
              `/anime/${character.anime.id}/character/${character.id}`
            )
          ">
          <div class="left img">
            <img
              :src="character.imgUrl"
              :alt="character.name"
              class="character-img" />
          </div>
          <div class="middle">
            <div class="character-name bold">{{ character.name }}</div>
            <div class="anime">
              Anime: <span class="bold">{{ character.anime.englishName }}</span>
            </div>
            <div class="favorites">
              <span class="bold">{{
                character._count.characterFavorites
              }}</span>
              Favorite(s)
            </div>
          </div>
          <div class="right img">
            <img
              :src="character.anime.posterUrl"
              :alt="character.anime.englishName"
              class="anime-img" />
          </div>
        </div>
      </template>
    </div>
  </div>

  <div
    class="helper-txt"
    v-if="auth.user!.role.toString() !== 'USER'"
    @click="router.push(`/va/${route.params.vaId}/update/details`)">
    Update VA Details
  </div>

  <div
    class="helper-txt"
    v-if="auth.user!.role.toString() !== 'USER'"
    @click="router.push(`/va/${route.params.vaId}/update/img`)">
    Update VA Img
  </div>

  <div
    class="helper-txt"
    v-if="auth.user!.role.toString() !== 'USER'"
    @click="dialogueVisibility = true">
    Delete VA
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

  div.birthday {
    margin: 2vh 4vh;
  }
}

div.more {
  padding: 2vh;
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
      cursor: pointer;

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
          text-align: right;
        }

        div.character-name {
          font-size: 1.5rem;
          text-align: left;
        }

        div.va-name {
          text-align: right;
        }
      }
    }
  }
}
</style>
