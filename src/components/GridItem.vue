<template>
  <div class="p-col-12 p-md-4 pointer" @click="loadDetails">
    <div class="game-grid-item card">
      <div class="game-grid-centered">
        <img :src="gameData.thumb_url" :alt="gameData.name" />
      </div>
      <h3>{{ gameData.name }}</h3>
      <div class="game-grid-details">
        <p>
          <strong>{{ players }}</strong> players
        </p>
        <p>
          <strong>{{ playtime }}</strong> mins
        </p>
        <p>
          <strong>{{ age }}</strong>
        </p>
      </div>
      <div class="game-grid-centered">
        <RemoveGameButton @delete-item="deleteItem" />
      </div>
    </div>
  </div>
</template>
<script>
import RemoveGameButton from "./UI/RemoveGameButton.vue";
import { rangeString, ageString } from "../utils/rangeString";

export default {
  name: "GridItem",
  props: { gameData: { required: true, type: Object } },
  emits: ["delete-item", "item-clicked"],
  components: {
    RemoveGameButton,
  },
  computed: {
    playtime() {
      return rangeString(
        this.gameData.min_playtime,
        this.gameData.max_playtime
      );
    },
    players() {
      return rangeString(this.gameData.min_players, this.gameData.max_players);
    },
    age() {
      return ageString(this.gameData.min_age);
    },
  },
  methods: {
    deleteItem() {
      this.$emit("delete-item");
    },
    loadDetails() {
      this.$emit("item-clicked");
    },
  },
};
</script>
<style scoped>
.game-grid-item {
  margin: 0.5rem;
  border: 1px solid #dee2e6;
  background-color: var(--very-light-grey);
}
img {
  height: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 1rem 0;
  max-height: 15rem;
}
h3 {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}
.game-grid-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.game-grid-centered {
  text-align: center;
}
strong {
  font-weight: 500;
}
</style>