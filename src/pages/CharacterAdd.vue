<script lang="ts" setup>
import { reactive } from "vue";
import { getData } from "../helpers/fetch";
import {
  ROOT,
  EPISODE_TYPE_OPTIONS,
  SEASON_TYPE_OPTIONS,
  ANIME_SEASON_OPTIONS,
} from "../helpers/constants";
import InputText from "../components/InputText.vue";
import InputFile from "../components/InputFile.vue";
import InputArea from "../components/InputArea.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";
import { useRoute } from "vue-router";

const route = useRoute();

const form = reactive({
  name: "",
  imgUrl: "",
  description: "",
  vas: [""],
});

async function submitForm() {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("imgUrl", form.imgUrl, form.name);
  formData.append("description", form.description);
  formData.append("vas", form.vas.join(","));

  const response = await getData(
    `${ROOT}/anime/${route.params.animeId}/character/add`,
    "post",
    formData,
    {
      "Content-Type": "multipart/form-data",
    }
  );
  setFlashCard(response.success, response.message ?? response.error);
}

function addVA() {
  form.vas.push("");
}

function removeVA() {
  if (form.vas.length > 1) {
    form.vas.pop();
  }
}
</script>

<template>
  <div class="season-cont">
    <h1>Add Character</h1>
    <div class="season-input-cont">
      <InputText placeholder="Name *" v-model="form.name" />
      <InputFile placeholder="Image *" v-model="form.imgUrl" />
      <InputArea placeholder="Description" v-model="form.description" />

      <div class="sub-title">Voice Actors</div>
      <div class="add-remove-btn-cont">
        <div class="add-remove-btn" @click="addVA">
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="add-remove-btn" @click="removeVA">
          <i class="fa-solid fa-minus"></i>
        </div>
      </div>
      <template v-for="(_, index) in form.vas">
        <InputText
          :placeholder="`Voice Actor ${index + 1}*`"
          v-model="form.vas[index]" />
      </template>
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
  </div>
</template>

<style lang="scss" scoped>
div.season-cont {
  position: absolute;
  width: 40%;
  height: 65%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
      font-size: 1.2rem;
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
