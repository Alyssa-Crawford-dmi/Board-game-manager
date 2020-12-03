<template>
  <div class="p-col-12 p-md-4 p-lg-3 pointer p-sm-6" @click="loadDetails">
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
        <p class="last-p">
          <strong>{{ age }}</strong>
        </p>
      </div>
      <div class="game-grid-centered">
        <RemoveGameButton @delete-item="deleteItem" :disabled="disabled" />
      </div>
    </div>
  </div>
</template>
<script>
import RemoveGameButton from "./UI/RemoveGameButton.vue";
import { rangeString, ageString } from "../utils/rangeString";

export default {
  name: "GridItem",
  props: {
    gameData: { required: true, type: Object },
    disabled: { type: Boolean, default: false },
  },
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
  padding: 1rem;
  height: 22rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
img {
  height: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  max-height: 15rem;
}
h3 {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}
.game-grid-details {
  display: flex;
  justify-content: space-between;
  height: min-content;
}
.game-grid-details p {
  padding-right: 1rem;
  margin: 0 0 0 0;
}
.game-grid-details .last-p {
  padding-right: 0rem;
}
.game-grid-centered {
  text-align: center;
}
strong {
  font-weight: 500;
}
</style>