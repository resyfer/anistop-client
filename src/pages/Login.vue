<script lang="ts" setup>
import { reactive } from "vue";
import router from "../router";
import { getData } from "../helpers/fetch";
import { ROOT } from "../helpers/constants";
import InputText from "../components/InputText.vue";
import Button from "../components/Button.vue";
import { setFlashCard } from "../store/flash";
import auth from "../store/auth";
import { User } from "../types/user";

const formData = reactive({
  identifier: "",
  password: "",
});

async function submitForm() {
  const response = await getData(`${ROOT}/auth/login`, "post", formData);
  setFlashCard(response.success, response.message ?? response.error);

  if (response.success) {
    const userResponse = await getData<User>(`${ROOT}/user`);

    if (userResponse.success) {
      auth.isLoggedIn = true;
      auth.user = userResponse.message!;

      router.push("/dashboard");
    }
  }
}
</script>

<template>
  <div class="login-cont">
    <h1>Login</h1>
    <div class="login-input-cont">
      <InputText placeholder="Username/Email*" v-model="formData.identifier" />
      <InputText
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
