import { ref } from "vue";
import { getGamesFromIds } from "../apiInteractions/boardGameAtlas";
import axios from "axios";

const ROUTE = `/api/games/`;

export const gamesListState = {
  gameList: ref([]),
  async loadGamesForUser(username) {
    var gameIds = [];
    axios.get(ROUTE + username).then((res) => {
      const idStr = res.data.gamesList;
      if (idStr) {
        gameIds = JSON.parse(idStr);
        if (gameIds.length > 0) {
          getGamesFromIds(gameIds).then((res) => {
            this.gameList.value = res;
          });
        }
      }
    });
  },
  removeGameAtIndex(index, username) {
    this.gameList.value.splice(index, 1);
    this.saveGamesForUser(username);
  },
  addGameIfNotExists(newGame, username) {
    const duplicate = this.gameList.value.some(
      (game) => game.id === newGame.id
    );
    if (duplicate) {
      return { error: true, msg: "Game already in list" };
    } else {
      this.gameList.value.push(newGame);
      this.saveGamesForUser(username);
      return { error: false, msg: "Game added successfully" };
    }
  },
  saveGamesForUser(username) {
    const gameIds = this.gameList.value.map((obj) => obj.id);
    const gameIdStr = JSON.stringify(gameIds);
    axios.put(ROUTE + username, { gameIdStr }).catch((err) => console.log(err));
  },
};
