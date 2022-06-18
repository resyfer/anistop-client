<script lang="ts" setup>
import { onBeforeMount, reactive } from "vue";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import InputText from "../components/InputText.vue";
import InputArea from "../components/InputArea.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";
import { useRoute } from "vue-router";

const route = useRoute();

const formData = reactive({
  name: "",
  imgUrl: "",
  description: "",
  vas: [""],
});

async function submitForm() {
  const response = await getData(
    `${ROOT}/anime/${route.params.animeId}/character/${route.params.characterId}`,
    "patch",
    formData
  );
  setFlashCard(response.success, response.message ?? response.error);
}

function addVA() {
  formData.vas.push("");
}

function removeVA() {
  if (formData.vas.length > 1) {
    formData.vas.pop();
  }
}

interface CharacterData {
  name: string;
  description: string;
  vas: {
    name: string;
  }[];
}

onBeforeMount(async () => {
  const response = await getData<CharacterData>(
    `${ROOT}/anime/${route.params.animeId}/character/${route.params.characterId}`
  );

  if (response.success) {
    Object.assign(formData, response.message);
    formData.vas = response.message!.vas.map((va) => va.name);
  } else {
    setFlashCard(response.success, response.error);
  }
});
</script>

<template>
  <div class="season-cont">
    <h1>Update Character Details</h1>
    <div class="season-input-cont">
      <InputText placeholder="Name *" v-model="formData.name" />
      <InputArea placeholder="Description" v-model="formData.description" />

      <div class="sub-title">Voice Actors</div>
      <div class="add-remove-btn-cont">
        <div class="add-remove-btn" @click="addVA">
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="add-remove-btn" @click="removeVA">
          <i class="fa-solid fa-minus"></i>
        </div>
      </div>
      <template v-for="(_, index) in formData.vas">
        <InputText
          :placeholder="`Voice Actor ${index + 1}*`"
          v-model="formData.vas[index]" />
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
