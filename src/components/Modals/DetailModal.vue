<template>
  <div class="container">
    <div class="main-info">
      <img :src="gameData.images.large" :alt="gameData.name" />
      <div class="vertical-info">
        <h3>{{ gameData.name }}</h3>
        <div class="game-details">
          <p>
            Number of players:
            <strong>{{ players }} </strong>
          </p>
          <p>
            Time:
            <strong>{{ playtime }}</strong>
          </p>
          <p>
            Age: <strong>{{ age }}</strong>
          </p>
        </div>
        <p>{{ gameData.description_preview }}</p>
      </div>
    </div>
    <h4>Details:</h4>
    <DetailTable :gameData="gameData" />
  </div>
</template>

<script>
import { getGameDetailsFromId } from "../../apiInteractions/boardGameAtlas";
import { rangeString, ageString } from "../../utils/rangeString";
import DetailTable from "../DetailTable.vue";

export default {
  name: "DetailModal",
  props: { gameId: { type: String, required: true } },
  components: {
    DetailTable,
  },
  async setup(props) {
    const gameData = await getGameDetailsFromId(props.gameId);
    return { gameData };
  },
  computed: {
    playtime() {
      return rangeString(
        this.gameData.min_playtime,
        this.gameData.max_playtime,
        "mins"
      );
    },
    players() {
      return rangeString(this.gameData.min_players, this.gameData.max_players);
    },
    age() {
      return ageString(this.gameData.min_age);
    },
  },
};
</script>
<style scoped>
.container {
  padding: 0 2rem;
}
.main-info {
  display: flex;
  align-items: center;
}
img {
  width: 30%;
  margin: 0 2rem 0 0;
}
.game-details {
  display: flex;
  flex-direction: row;
}
.game-details p {
  margin-right: 1rem;
}
h4 {
  text-align: center;
}
</style>