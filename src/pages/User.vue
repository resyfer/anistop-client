<script lang="ts" setup>
import auth from "../store/auth";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import { onBeforeMount, reactive } from "vue";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { setFlashCard } from "../store/flash";
import router from "../router";

const userData = reactive({
  id: 0,
  name: "",
  username: "",
  imgUrl: "",
  role: "",
  characterFavorites: [
    {
      character: {
        id: 0,
        name: "",
        imgUrl: "",
        animeId: 0,
      },
    },
  ],
  ratings: [
    {
      season: {
        id: 0,
        name: "",
        anime: {
          id: 0,
          englishName: "",
          posterUrl: "",
        },
        episodes: [
          {
            id: 0,
            views: [
              {
                id: 0,
              },
            ],
          },
        ],
      },
      rating: true,
    },
  ],
});

const route = useRoute();

const userId = computed(() => {
  return route.params.userId ? route.params.userId : auth.user!.id;
});

onBeforeMount(async () => {
  const response = await getData(`${ROOT}/user/${userId.value}`);

  if (response.success) {
    Object.assign(userData, response.message);
  } else {
    setFlashCard(response.success, response.error);
  }
});
</script>

<template>
  <div class="page-title">{{ userData.name }}</div>
  <div class="profile">
    <div class="img">
      <img :src="userData.imgUrl" :alt="userData.name" />
    </div>
    <div class="info">
      <div class="name">
        Name: <span class="bold">{{ userData.name }}</span>
      </div>
      <div class="username">
        Username: <span class="bold">{{ userData.username }}</span>
      </div>
      <div class="role" v-if="auth.user!.role.toString() !== 'USER'">
        Role: <span class="bold">{{ userData.role }}</span>
      </div>
    </div>
  </div>

  <div class="fav-characters">
    <div class="sub-title">Favorite Characters</div>
    <div class="fav-characters-cont">
      <template v-for="{ character } in userData.characterFavorites">
        <div
          class="character"
          @click="
            router.push(`/anime/${character.animeId}/character/${character.id}`)
          ">
          <div class="img">
            <img :src="character.imgUrl" :alt="character.name" />
          </div>
          <div class="name">
            <span class="bold">{{ character.name }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>

  <div class="ratings">
    <div class="sub-title">Ratings</div>
    <div class="rating-cont">
      <template v-for="{ season, rating } in userData.ratings">
        <div
          class="rating"
          @click="router.push(`/anime/${season.anime.id}/season/${season.id}`)">
          <div class="left">
            <div class="img">
              <img
                :src="season.anime.posterUrl"
                :alt="season.anime.englishName" />
            </div>
          </div>
          <div class="middle">
            <div class="season-name">
              Season: <span class="bold">{{ season.name }}</span>
            </div>
            <div class="anime-name">
              Anime: <span class="bold">{{ season.anime.englishName }}</span>
            </div>
            <div class="season-rating bold">{{ rating }} ⭐</div>
            <div class="watched">
              <span class="bold">{{
                season.episodes.filter((episode) => episode.views.length > 0)
                  .length
              }}</span>
              / {{ season.episodes.length }} Episode(s)
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
div.profile {
  display: flex;
  margin: 5vh auto;
  width: fit-content;

  div.img {
    height: 30vh;
    aspect-ratio: 1/1;
    border: 0.5vh solid var(--primary-100);
    border-radius: 50%;
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
    }
  }

  div.info {
    margin: 5vh;

    div.name {
      font-size: 1.3rem;
    }

    div.username {
      font-size: 1.2rem;
    }

    div.role {
      font-size: 1.1rem;
    }

    div {
      margin: 1vh auto;
    }
  }
}

div.fav-characters {
  div.fav-characters-cont {
    display: flex;
    flex-wrap: wrap;

    div.character {
      position: relative;
      margin: 4vh;
      width: 29%;
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

      div.name {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
      }
    }
  }
}

div.ratings {
  div.rating-cont {
    display: flex;
    flex-wrap: wrap;

    div.rating {
      position: relative;
      margin: 4vh;
      width: 29%;
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

      div.middle {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        div {
          margin: 1vh;
        }

        div.season-name {
          font-size: 1.1rem;
        }
      }
    }
  }
}
</style>
