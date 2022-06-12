<script lang="ts" setup>
import { reactive } from "vue";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import InputText from "../components/InputText.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";

const formData = reactive({
  identifier: "",
  otp: "",
});

async function submitForm() {
  const response = await getData(`${ROOT}/otp/verify`, "post", formData);
  setFlashCard(response.success, response.message ?? response.error);
}

async function requestNewOtp() {
  const response = await getData(`${ROOT}/otp/new`, "post", formData);
  setFlashCard(response.success, response.message ?? response.error);
}
</script>

<template>
  <div class="otp-verify-cont">
    <h1>Verify OTP</h1>
    <div class="otp-verify-input-cont">
      <InputText placeholder="Username/Email *" v-model="formData.identifier" />
      <InputText placeholder="OTP *" v-model="formData.otp" />
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
    <div class="helper-txt" @click="requestNewOtp">
      OTP Expired? Request new OTP.
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.otp-verify-cont {
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
