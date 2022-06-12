<script lang="ts" setup>
import { reactive } from "vue";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import InputText from "../components/InputText.vue";
import InputDate from "../components/InputDate.vue";
import InputFile from "../components/InputFile.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";

interface Form {
  name: string;
  imgUrl: string | File;
  dob: "";
  more: string;
}

const form = reactive<Form>({
  name: "",
  imgUrl: "",
  dob: "",
  more: "",
});

async function submitForm() {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("dob", form.dob);
  formData.append("more", form.more);
  formData.append("imgUrl", form.imgUrl, form.name);

  const response = await getData(`${ROOT}/va/add`, "post", formData, {
    "Content-Type": "multipart/form-data",
  });
  setFlashCard(response.success, response.message ?? response.error);
}
</script>

<template>
  <div class="va-cont">
    <h1>Add Voice Actor</h1>
    <div class="va-input-cont">
      <InputText placeholder="Name*" v-model="form.name" />
      <InputDate v-model="form.dob" />
      <InputText placeholder="More" v-model="form.more" />
      <InputFile placeholder="Image" v-model="form.imgUrl" />
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
