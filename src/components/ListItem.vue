<template>
  <div class="p-col-12 pointer" @click="loadDetails">
    <div class="game-list-item">
      <div class="game-list-centered">
        <img :src="gameData.thumb_url" :alt="gameData.name" />
      </div>
      <div class="game-list-details">
        <h3>{{ gameData.name }}</h3>
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
      <div class="game-list-centered" @click="deleteItem">
        <RemoveGameButton @delete-item="deleteItem" :disabled="disabled" />
      </div>
    </div>
  </div>
</template>
<script>
import RemoveGameButton from "./UI/RemoveGameButton.vue";
import { rangeString, ageString } from "../utils/rangeString";

export default {
  name: "listItem",
  props: {
    gameData: { required: true, type: Object },
    disabled: { type: Boolean, default: false },
  },
  emits: ["delete-item", "item-clicked", "unauthorized-action"],
  components: {
    RemoveGameButton,
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
  methods: {
    deleteItem(event) {
      if (this.disabled) {
        this.$emit("unauthorized-action");
        event.stopPropagation();
        return;
      }
      this.$emit("delete-item");
    },
    loadDetails() {
      this.$emit("item-clicked");
    },
  },
};
</script>
<style scoped>
p {
  font-weight: 300;
}
strong {
  font-weight: 400;
}
.game-list-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;
  background-color: var(--very-light-gray);
}
img {
  height: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 0 2rem;
  max-height: 15rem;
}
h3 {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}
.game-list-details {
  flex: 1 1 0;
}
@media screen and (max-width: 600px) {
  .game-list-item {
    flex-direction: column;
    align-items: center;
  }
  .game-list-detail {
    text-align: center;
  }
}
</style>