<script lang="ts" setup>
import { reactive, onBeforeMount } from "vue";
import InputFile from "../components/InputFile.vue";
import Button from "../components/Button.vue";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import { useRoute } from "vue-router";
import { setFlashCard } from "../store/flash";

const vaData = reactive({
  name: "",
});

interface Form {
  logoUrl: string | File;
}

const form = reactive<Form>({
  logoUrl: "",
});

const route = useRoute();

async function submitForm() {
  const formData = new FormData();
  formData.append("imgUrl", form.logoUrl, vaData.name);

  const response = await getData(
    `${ROOT}/va/${route.params.vaId}/img`,
    "patch",
    formData,
    {
      "Content-Type": "multipart/form-data",
    }
  );
  setFlashCard(response.success, response.message ?? response.error);
}

onBeforeMount(async () => {
  const response = await getData(`${ROOT}/va/${route.params.vaId}`);

  if (response.success) {
    Object.assign(vaData, response.message);
  } else {
    setFlashCard(response.success, response.error);
  }
});
</script>

<template>
  <div class="page-title">Update Voice Actor Image</div>

  <div class="va-cont">
    <div class="sub-title">
      Voice Actor: <span class="bold">{{ vaData.name }}</span>
    </div>
    <div class="va-input-cont">
      <InputFile placeholder="Voice Actor Image *" v-model="form.logoUrl" />
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
  </div>
</template>

<style lang="scss" scoped>
div.va-cont {
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
