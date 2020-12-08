import { ref } from "vue";
import { getGamesFromIds } from "../apiInteractions/boardGameAtlas";
import axios from "axios";

export const gamesListState = {
  gameList: ref([]),
  async loadGamesForUser(username) {
    var gameIds = [];
    axios.get(`/api/games/${username}`).then((res) => {
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
  removeGameAtIndex(index) {
    this.gameList.value.splice(index, 1);
    this.saveGames();
  },
  addGameIfNotExists(newGame) {
    const duplicate = this.gameList.value.some(
      (game) => game.id === newGame.id
    );
    if (duplicate) {
      return { error: true, msg: "Game already in list" };
    } else {
      this.gameList.value.push(newGame);
      this.saveGames();
      return { error: false, msg: "Game added successfuly" };
    }
  },
  saveGames() {
    const gameIds = this.gameList.value.map((obj) => obj.id);
    localStorage.setItem("idList", JSON.stringify(gameIds));
  },
};
