<script lang="ts" setup>
import { reactive } from "vue";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import InputText from "../components/InputText.vue";
import InputFile from "../components/InputFile.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";

interface Form {
  name: string;
  logoUrl: string | File;
}

const form = reactive<Form>({
  name: "",
  logoUrl: "",
});

async function submitForm() {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("logoUrl", form.logoUrl, form.name);

  const response = await getData(`${ROOT}/studio/add`, "post", formData, {
    "Content-Type": "multipart/form-data",
  });
  setFlashCard(response.success, response.message ?? response.error);
}
</script>

<template>
  <div class="studio-cont">
    <h1>Add Studio</h1>
    <div class="studio-input-cont">
      <InputText placeholder="Name *" v-model="form.name" />
      <InputFile placeholder="Logo *" v-model="form.logoUrl" />
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
