<template>
  <div class="pointer outer-container" @click="loadDetails">
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
      <div class="">
        <GameActionBtns
          @delete-item="deleteItem"
          :disabled="disabled"
          @move-item="moveItem"
        />
      </div>
    </div>
  </div>
</template>
<script>
import GameActionBtns from "./UI/GameActionBtns.vue";
import { rangeString, ageString } from "../utils/rangeString";
import { activeUserState } from "../utils/activeUser";

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
  emits: ["delete-item", "item-clicked", "unauthorized-action", "move-item"],
  components: {
    GameActionBtns,
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
.outer-container {
  width: 16.6%; /*6 across**/
}
.game-grid-item {
  margin: 0.5rem;
  border: 1px solid #dee2e6;
  background-color: var(--very-light-gray);
  padding: 1rem;
  height: 25rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
img {
  height: 100%;
  width: 100%;
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

@media screen and (max-width: 1500px) {
  .outer-container {
    width: 20%; /*5 across**/
  }
}
@media screen and (max-width: 1200px) {
  .outer-container {
    width: 25%; /*4 across**/
  }
}
@media screen and (max-width: 900px) {
  .outer-container {
    width: 33.33%; /*3 across**/
  }
}
@media screen and (max-width: 700px) {
  .outer-container {
    width: 50%; /*2 across**/
  }
}
@media screen and (max-width: 500px) {
  .outer-container {
    width: 100%; /*1 across**/
  }
}
</style>