import { ref } from "vue";
import { gamesListState } from "./gameListManager";

const actionTypes = {
  UPDATE_USER: "UPDATE_USER",
  UPDATE_LIST: "UPDATE_LIST",
  CLEAR_LIST: "CLEAR_LIST",
};

export const activeUserState = {
  activeUser: ref(""),
  isWishList: ref(true),
  setActiveUserAndListMode(newUser, newMode = true) {
    var action;
    if (!newUser) {
      action = actionTypes.CLEAR_LIST;
    } else if (newUser !== this.activeUser.value) {
      action = actionTypes.UPDATE_USER;
    } else if (newMode !== this.isWishList.value) {
      action = actionTypes.UPDATE_LIST;
    }
    this.activeUser.value = newUser;
    this.isWishList.value = newMode;
    switch (action) {
      case actionTypes.CLEAR_LIST:
        gamesListState.clearGamesList();
        break;
      case actionTypes.UPDATE_USER:
        gamesListState.loadGamesForUser();
        break;
      case actionTypes.UPDATE_LIST:
        gamesListState.switchActiveAndInactiveLists();
        break;
      default:
        break;
    }
  },
};
