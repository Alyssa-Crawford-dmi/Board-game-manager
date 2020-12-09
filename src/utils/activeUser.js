import { ref } from "vue";
import { gamesListState } from "./gameListManager";

export const activeUserState = {
  activeUser: ref("ac"),
  isWishList: ref(false),
  setActiveUserAndListMode(newUser, newMode = false) {
    this.activeUser.value = newUser;
    this.isWishList.value = newMode;
    gamesListState.loadGamesForUser();
  },
};
