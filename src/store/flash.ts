import { reactive } from "vue";

/**
 * @description Null success means flash
 * card won't be displayed.
 */
interface Flash {
  success: null | boolean;
  message: null | string;
  error: null | string;
}

const flash = reactive<Flash>({
  success: null,
  message: null,
  error: null,
});

function setFlashCard(success: null | boolean, data?: string) {
  flash.success = success;

  if (success === true) {
    flash.message = data!;
  } else {
    flash.error = data!;
  }
}

export { flash, setFlashCard };
