const axios = require("axios").default;

const getGameByName = async (name) => {
  var result;
  await axios
    .get(
      `https://api.boardgameatlas.com/api/search?name=${name}&client_id=9RLKyOd9MR`
    )
    .then((response) => {
      result = response.data;
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
          thumb_url: fullGame.thumb_url,
        };
      });
    });
  return result;
};

export { getGameByName, getGamesFromIds };