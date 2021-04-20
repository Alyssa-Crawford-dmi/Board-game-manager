import axios from "axios";
import { ref } from "vue";
import { getGamesFromIds } from "../apiInteractions/boardGameAtlas";
import { activeUserState } from "./activeUser";

export const gamesListState = {
  gameList: ref([]),
  inactiveGamesList: ref([]),
  isLoading: ref(false),
  async loadGamesForUser() {
    this.gameList.value = [];
    this.isLoading.value = true;
    this.inactiveGamesList.value = [];
    axios
      .get(this.buildRouteString())
      .then((res) => this.parseApiData(res, this.gameList, true));
    axios
      .get(this.buildRouteString(true))
      .then((res) => this.parseApiData(res, this.inactiveGamesList, false));
  },
  parseApiData(res, list, updateIsLoading) {
    const idStr = res.data.gamesList;
    if (idStr) {
      const gameIds = JSON.parse(idStr);
      if (gameIds.length > 0) {
        getGamesFromIds(gameIds).then((res) => {
          list.value = res.sort((a, b) => (a.name > b.name ? 1 : -1));
          if (updateIsLoading) {
            this.isLoading.value = false;
          }
        });
      } else {
        if (updateIsLoading) {
          this.isLoading.value = false;
        }
      }
    } else {
      list.value = [];
      if (updateIsLoading) {
        this.isLoading.value = false;
      }
    }
  },
  switchActiveAndInactiveLists() {
    const temp = this.gameList.value;
    this.gameList.value = this.inactiveGamesList.value;
    this.inactiveGamesList.value = temp;
  },
  removeGameAtIndex(index) {
    this.gameList.value.splice(index, 1);
    this.saveGamesForUser();
  },
  addGameIfNotExists(newGame, addToOtherList = false) {
    if (addToOtherList) {
      return this.addGameToList(newGame, this.inactiveGamesList);
    } else {
      return this.addGameToList(newGame, this.gameList);
    }
  },
  addGameToList(newGame, list) {
    const duplicate = list.value.some((game) => game.id === newGame.id);
    if (duplicate) {
      return { error: true, msg: "Game already in list" };
    } else {
      list.value.push(newGame);
      this.saveGamesForUser();
      return { error: false, msg: "Game added successfully" };
    }
  },
  moveGameToOtherList(index) {
    const game = this.gameList.value[index];
    this.addGameToList(game, this.inactiveGamesList);
    this.removeGameAtIndex(index);
  },
  saveGamesForUser() {
    const gameIds = this.gameList.value.map((obj) => obj.id);
    const gameIdStr = JSON.stringify(gameIds);
    axios
      .put(this.buildRouteString(), { gameIdStr })
      .catch((err) => console.error(err));
    const gameIdsInactive = this.inactiveGamesList.value.map((obj) => obj.id);
    const gameIdStrInactive = JSON.stringify(gameIdsInactive);
    axios
      .put(this.buildRouteString(true), { gameIdStr: gameIdStrInactive })
      .catch((err) => console.error(err));
  },
  clearGamesList() {
    this.gameList.value = [];
    this.inactiveGamesList.value = [];
  },

  //Used for reactivity
  buildRouteString(useOtherList = false) {
    const BASE_ROUTE = `/api/games/`;
    const usernameWrapper = activeUserState.activeUser;
    let gameListName;
    if (useOtherList) {
      gameListName = activeUserState.isWishList.value
        ? "ownedlist"
        : "wishlist";
    } else {
      gameListName = activeUserState.isWishList.value
        ? "wishlist"
        : "ownedlist";
    }
    return BASE_ROUTE + "/" + gameListName + "/" + usernameWrapper.value;
  },
};
