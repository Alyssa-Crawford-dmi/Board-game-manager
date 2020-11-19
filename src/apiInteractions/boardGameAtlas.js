const axios = require("axios").default;

const getGamesByName = async (name) => {
  var result;
  await axios
    .get(
      `https://api.boardgameatlas.com/api/search?name=${name}&client_id=9RLKyOd9MR&limit=8`
    )
    .then((response) => {
      const removeEmptyGames = response.data.games.filter((game) => {
        if (Object.keys(game).length === 0) {
          return false;
        }
        return true;
      });
      result = removeEmptyGames.map((fullGame) => {
        if (Object.keys(fullGame).length === 0) {
          console.log("bad game");
          return;
        }
        return {
          id: fullGame.id,
          name: fullGame.name,
          min_players: fullGame.min_players,
          max_players: fullGame.max_players,
          min_playtime: fullGame.min_playtime,
          max_playtime: fullGame.max_playtime,
          min_age: fullGame.min_age,
          thumb_url: fullGame.images.small,
        };
      });
    });
  return result;
};

const getGamesFromIds = async (ids) => {
  var result;
  await axios
    .get(
      `https://api.boardgameatlas.com/api/search?ids=${ids}&client_id=9RLKyOd9MR`
    )
    .then((response) => {
      result = response.data.games.map((fullGame) => {
        return {
          id: fullGame.id,
          name: fullGame.name,
          min_players: fullGame.min_players,
          max_players: fullGame.max_players,
          min_playtime: fullGame.min_playtime,
          max_playtime: fullGame.max_playtime,
          min_age: fullGame.min_age,
          thumb_url: fullGame.images.small,
        };
      });
    });
  return result;
};
const getGameDetailsFromId = async (id) => {
  var result;
  await axios
    .get(
      `https://api.boardgameatlas.com/api/search?ids=${id}&client_id=9RLKyOd9MR`
    )
    .then((response) => {
      result = response.data.games[0];
    });
  return result;
};

export { getGamesByName, getGamesFromIds, getGameDetailsFromId };
