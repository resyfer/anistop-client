<script lang="ts" setup>
import { onBeforeMount, reactive } from "vue";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import InputText from "../components/InputText.vue";
import InputDate from "../components/InputDate.vue";
import InputArea from "../components/InputArea.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";
import { useRoute } from "vue-router";
import { JP_TIMEZONE_OFFSET } from "../helpers/constants";

const formData = reactive({
  name: "",
  dob: "",
  more: "",
});

const route = useRoute();

async function submitForm() {
  const response = await getData(
    `${ROOT}/va/${route.params.vaId}`,
    "patch",
    formData
  );
  setFlashCard(response.success, response.message ?? response.error);
}

onBeforeMount(async () => {
  const response = await getData<typeof formData>(
    `${ROOT}/va/${route.params.vaId}`
  );

  if (response.success) {
    Object.assign(formData, response.message);

    let startTime = new Date(response.message!.dob);
    formData.dob = new Date(
      startTime.getTime() +
        (JP_TIMEZONE_OFFSET - startTime.getTimezoneOffset()) * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
    console.log(startTime.getTime());
  } else {
    setFlashCard(response.success, response.error);
  }
});
</script>

<template>
  <div class="va-cont">
    <h1>Update Voice Actor Details</h1>
    <div class="va-input-cont">
      <InputText placeholder="Name *" v-model="formData.name" />
      <InputDate v-model="formData.dob" />
      <span class="info-txt">Date in Japanese TimeZone (UTC +0900)</span>
      <br />
      <br />
      <InputArea placeholder="More" v-model="formData.more" />
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
