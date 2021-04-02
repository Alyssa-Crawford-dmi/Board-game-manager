// import { ref } from "vue";
import { ref } from "vue";

export const windowState = {
  windowWidth: ref(window.innerWidth),
  updateWindowSize() {
    this.windowWidth.value = window.innerWidth;
  },
};
