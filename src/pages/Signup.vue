<script lang="ts" setup>
import { reactive } from "vue";
import router from "../router";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import TextInput from "../components/TextInput.vue";
import DateInput from "../components/DateInput.vue";
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
  const response = await getData(`${ROOT}/auth/signup`, formData, "post");
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
      <TextInput placeholder="Name*" v-model="formData.name" />
      <TextInput placeholder="Username*" v-model="formData.username" />
      <TextInput placeholder="Email*" v-model="formData.email" />
      <TextInput
        placeholder="Password*"
        type="password"
        v-model="formData.password" />
      <DateInput v-model="formData.dob" />
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
    <div class="helper-txt" @click="router.push('/login')">
      Already registered? Login here
    </div>
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
