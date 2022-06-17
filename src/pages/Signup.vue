<script lang="ts" setup>
import { reactive } from "vue";
import router from "../router";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import InputText from "../components/InputText.vue";
import InputDate from "../components/InputDate.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";

const formData = reactive({
  name: "",
  username: "",
  email: "",
  password: "",
  dob: "",
});

async function submitForm() {
  const response = await getData(`${ROOT}/auth/signup`, "post", formData);
  setFlashCard(response.success, response.message ?? response.error);

  if (response.success) {
    router.push("/otp");
  }
}
</script>

<template>
  <div class="signup-cont">
    <h1>Signup</h1>
    <div class="signup-input-cont">
      <InputText placeholder="Name *" v-model="formData.name" />
      <InputText placeholder="Username *" v-model="formData.username" />
      <InputText placeholder="Email *" v-model="formData.email" />
      <InputText
        placeholder="Password *"
        type="password"
        v-model="formData.password" />
      <InputDate v-model="formData.dob" />
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
    <div class="helper-txt" @click="router.push('/login')">
      Already registered? Login here
    </div>
    <div class="helper-txt" @click="router.push('/otp')">Verify OTP here</div>
  </div>
</template>

<style lang="scss" scoped>
div.signup-cont {
  position: absolute;
  width: 40%;
  height: 70%;
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
