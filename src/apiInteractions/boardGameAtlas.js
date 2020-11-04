const axios = require('axios').default;

const getGameByName = async (name) => {
    var result;
    await axios.get(`https://api.boardgameatlas.com/api/search?name=${name}&client_id=9RLKyOd9MR`)
        .then(response => {
            result = response.data
        })
    return result
}

export {getGameByName, }