import { reactive } from "vue";
import { User } from "../types/user";

interface Auth {
  isLoggedIn: boolean | null;
  user: User | null;
}

const auth = reactive<Auth>({
  isLoggedIn: null,
  user: null,
});

export default auth;
