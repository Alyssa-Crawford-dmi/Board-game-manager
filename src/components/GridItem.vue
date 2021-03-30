<template>
  <div class="p-col-12 p-md-4 p-lg-3 pointer p-sm-6" @click="loadDetails">
    <div class="game-grid-item card">
      <div class="game-grid-centered image-box">
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
      <div class="game-grid-centered btn" @click="moveItem">
        <Button
          @click="moveItem"
          :label="isWishList ? 'Move to owned list' : 'Move to wish list'"
          class="p-button-text p-button-sm"
          :title="isWishList ? 'Move to owned list' : 'Move to wish list'"
        />
      </div>
      <div class="game-grid-centered btn" @click="deleteItem">
        <RemoveGameButton @delete-item="deleteItem" :disabled="disabled" />
      </div>
    </div>
  </div>
</template>
<script>
import RemoveGameButton from "./UI/RemoveGameButton.vue";
import { rangeString, ageString } from "../utils/rangeString";
import { activeUserState } from "../utils/activeUser";
import Button from "primevue/button";

export default {
  name: "GridItem",
  props: {
    gameData: { required: true, type: Object },
    disabled: { type: Boolean, default: false },
  },
  data: () => {
    return {
      isWishList: activeUserState.isWishList,
    };
  },
  emits: ["delete-item", "item-clicked", "unauthorized-action"],
  components: {
    RemoveGameButton,
    Button,
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
    deleteItem(event) {
      if (this.disabled) {
        this.$emit("unauthorized-action");
        event.stopPropagation();
        return;
      }
      this.$emit("delete-item");
    },
    moveItem(event) {
      if (this.disabled) {
        this.$emit("unauthorized-action");
        event.stopPropagation();
        return;
      }
      this.$emit("move-item");
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
  background-color: var(--very-light-gray);
  padding: 1rem;
  height: 22rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
img {
  height: 100%;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  object-fit: contain;
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
  margin: 0 auto;
  padding: 0;
  width: fit-content;
}
.image-box {
  max-width: 90%;
  max-height: 60%;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
}
strong {
  font-weight: 500;
}
/* .btn {
  border: 1px solid aqua;
  margin: 0;
  padding: 0;
} */
</style>