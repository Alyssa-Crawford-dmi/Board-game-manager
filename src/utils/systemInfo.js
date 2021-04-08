import { ref } from "vue";

export const systemInfo = {
  windowWidth: ref(window.innerWidth),
  isModalOpen: ref(false),
  updateWindowSize() {
    this.windowWidth.value = window.innerWidth;
  },
  setIsModalOpen(newState) {
    this.isModalOpen.value = newState;
  },
};
