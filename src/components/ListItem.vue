<template>
  <div class="game-list-item pointer" @click="loadDetails">
    <div class="image-box">
      <img :src="gameData.thumb_url" :alt="gameData.name" />
    </div>
    <div class="game-text">
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
      <!-- <div class="temp"> -->
      <GameActionBtns
        @delete-item="deleteItem"
        @move-item="moveItem"
        :disabled="disabled"
        :showMoveText="showActionBtnMoveText"
        :centerText="false"
      />
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import GameActionBtns from "./UI/GameActionBtns.vue";
import { rangeString, ageString } from "../utils/rangeString";

export default {
  name: "listItem",
  props: {
    gameData: { required: true, type: Object },
    disabled: { type: Boolean, default: false },
  },
  emits: ["delete-item", "item-clicked", "unauthorized-action", "move-item"],
  components: {
    GameActionBtns,
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
    showActionBtnMoveText() {
      return window.innerWidth > 700;
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
p {
  font-weight: 300;
  margin: 0;
}
strong {
  font-weight: 400;
}
.game-list-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  background-color: var(--very-light-gray);
  height: 10rem;
}
img {
  height: 100%;
  width: 10rem;
  object-fit: contain;
}
h3 {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  /* text-overflow: ellipsis; */
}
.game-list-details {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
}
.image-box {
  height: 100%;
  margin: 0 2rem 0 1rem;
}
.game-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
}
@media screen and (max-width: 700px) {
  .game-list-item {
    padding: 0.2rem;
  }
  .game-text {
    flex-direction: column;
    align-items: flex-start;
  }
  .image-box {
    margin: 0 0.5rem 0 0;
  }
  img {
    width: 7rem;
  }
}
@media screen and (max-width: 375px) {
  .game-list-item {
    padding: 0.2rem;
  }
  .game-text {
    flex-direction: column;
    align-items: flex-start;
  }
  .image-box {
    margin: 0 0.5rem 0 0;
  }
  img {
    width: 5rem;
  }
}
</style>