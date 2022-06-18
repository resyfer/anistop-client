<script lang="ts" setup>
import { onBeforeMount, reactive } from "vue";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import InputText from "../components/InputText.vue";
import InputFile from "../components/InputFile.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";
import { useRoute } from "vue-router";

interface Form {
  name: string;
}

const formData = reactive<Form>({
  name: "",
});

const route = useRoute();

async function submitForm() {
  const response = await getData(
    `${ROOT}/studio/${route.params.studioId}`,
    "patch",
    formData
  );
  setFlashCard(response.success, response.message ?? response.error);
}

onBeforeMount(async () => {
  const response = await getData(`${ROOT}/studio/${route.params.studioId}`);

  if (response.success) {
    Object.assign(formData, response.message);
  } else {
    setFlashCard(response.success, response.error);
  }
});
</script>

<template>
  <div class="studio-cont">
    <h1>Update Studio Details</h1>
    <div class="studio-input-cont">
      <InputText placeholder="Name *" v-model="formData.name" />
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
  </div>
</template>

<style lang="scss" scoped>
div.studio-cont {
  position: absolute;
  width: 40%;
  height: 50%;
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

  .helper-txt {
    font-style: italic;
    text-decoration: underline;
    margin: 1vh auto;
    cursor: pointer;
  }
}
</style>
