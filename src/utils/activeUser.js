import { ref } from "vue";

export const activeUserState = {
  activeUser: ref("ac"),
  setActiveUser(newUser) {
    this.activeUser.value = newUser;
  },
};
