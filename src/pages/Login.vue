<script lang="ts" setup>
import { reactive } from "vue";
import router from "../router";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { setFlashCard, flash } from "../store/flash";

const formData = reactive({
  identifier: "",
  password: "",
});

async function submitForm() {
  const response = await getData(`${ROOT}/auth/login`, formData, "post");
  setFlashCard(response.success, response.message ?? response.error);
}
</script>

<template>
  <div class="login-cont">
    <h1>Login</h1>
    <div class="login-input-cont">
      <TextInput placeholder="Username/Email*" v-model="formData.identifier" />
      <TextInput
        placeholder="Password*"
        type="password"
        v-model="formData.password" />
    </div>
    <Button text="Submit" class="submit-btn" @click="submitForm" />
    <div class="helper-txt" @click="router.push('/signup')">
      Haven't registered yet? Sign Up here
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.login-cont {
  position: absolute;
  width: 40%;
  height: 40%;
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
  }
}
</style>
