import { ref } from "vue";
import { getGamesFromIds } from "../apiInteractions/boardGameAtlas";
import axios from "axios";
import { activeUserState } from "./activeUser";

export const gamesListState = {
  gameList: ref([]),
  async loadGamesForUser() {
    var gameIds = [];
    axios.get(this.buildRouteString()).then((res) => {
      const idStr = res.data.gamesList;
      if (idStr) {
        gameIds = JSON.parse(idStr);
        if (gameIds.length > 0) {
          getGamesFromIds(gameIds).then((res) => {
            this.gameList.value = res;
          });
        }
      } else {
        this.gameList.value = [];
      }
    });
  },
  removeGameAtIndex(index) {
    this.gameList.value.splice(index, 1);
    this.saveGamesForUser();
  },
  addGameIfNotExists(newGame) {
    const duplicate = this.gameList.value.some(
      (game) => game.id === newGame.id
    );
    if (duplicate) {
      return { error: true, msg: "Game already in list" };
    } else {
      this.gameList.value.push(newGame);
      this.saveGamesForUser();
      return { error: false, msg: "Game added successfully" };
    }
  },
  saveGamesForUser() {
    const gameIds = this.gameList.value.map((obj) => obj.id);
    const gameIdStr = JSON.stringify(gameIds);
    axios
      .put(this.buildRouteString(), { gameIdStr })
      .catch((err) => console.log(err));
  },
  clearGamesList() {
    this.gameList.value = [];
  },

  //Used for reactivity
  buildRouteString() {
    const BASE_ROUTE = `/api/games/`;
    const usernameWrapper = activeUserState.activeUser;
    const gameListName = activeUserState.isWishList.value
      ? "wishlist"
      : "ownedlist";
    return BASE_ROUTE + "/" + gameListName + "/" + usernameWrapper.value;
  },
};
