import { reactive } from "vue";
import { User } from "../types/user";

interface Auth {
  isLoggedIn: boolean;
  user: User | null;
}

const auth = reactive<Auth>({
  isLoggedIn: false,
  user: null,
});

export default auth;
