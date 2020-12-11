import { ref } from "vue";
import { gamesListState } from "./gameListManager";

export const activeUserState = {
  activeUser: ref(""),
  isWishList: ref(false),
  setActiveUserAndListMode(newUser, newMode = false) {
    this.activeUser.value = newUser;
    this.isWishList.value = newMode;
    if (newUser) {
      gamesListState.loadGamesForUser();
    } else {
      gamesListState.clearGamesList();
    }
  },
};
