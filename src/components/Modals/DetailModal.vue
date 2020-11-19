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
        <PreviewText :text="gameData.description_preview" />
      </div>
    </div>
    <h4>Details:</h4>
    <div class="bounded-width">
      <DetailTable :gameData="gameData" />
    </div>
  </div>
</template>

<script>
import { getGameDetailsFromId } from "../../apiInteractions/boardGameAtlas";
import { rangeString, ageString } from "../../utils/rangeString";
import DetailTable from "../DetailTable.vue";
import PreviewText from "../PreviewText";

export default {
  name: "DetailModal",
  props: { gameId: { type: String, required: true } },
  components: {
    DetailTable,
    PreviewText,
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
  margin-bottom: 1rem;
}
.game-details p {
  margin-right: 1rem;
}
h4 {
  text-align: center;
}
.limit-length {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
@media screen and (max-width: 700px) {
  .main-info {
    flex-direction: column;
    align-items: center;
  }
  .container {
    padding: 0;
  }
  .game-details {
    flex-direction: column;
  }
  .game-details p {
    padding: 0;
    margin: 0;
  }
  img {
    margin: 0;
  }
}
</style>