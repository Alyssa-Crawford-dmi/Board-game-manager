<template>
  <div class="container" @click="loadDetails">
    <i
      v-if="isGamesList"
      class="pi pi-times-circle custom-btn pointer danger"
      title="Remove game"
      @click="deleteItem"
      style="font-size: 1.5rem"
    />
    <div class="game-list-item pointer">
      <div class="image-box">
        <img :src="gameData.thumb_url" :alt="gameData.name" />
      </div>
      <div class="game-text">
        <div class="game-list-details">
          <div class="header-container">
            <h3>{{ gameData.name }}</h3>
          </div>
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
        <Button
          v-if="isGamesList"
          @click="moveItem"
          :class="[
            'p-button-rounded',
            'p-button-outlined',
            windowWidth < 850 ? 'p-button-sm' : '',
            'move-btn',
          ]"
          :title="moveBtnText"
          :label="moveBtnText"
          :disabled="disabled"
        />
        <slot v-else></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { rangeString, ageString } from "../utils/rangeString";
import { systemInfo } from "../utils/systemInfo";
import { activeUserState } from "../utils/activeUser";
import Button from "primevue/button";

export default {
  name: "listItem",
  props: {
    gameData: { required: true, type: Object },
    disabled: { type: Boolean, default: false },
    isGamesList: { type: Boolean, default: true },
  },
  emits: ["delete-item", "item-clicked", "unauthorized-action", "move-item"],
  components: {
    Button,
  },
  data() {
    return {
      isWishList: activeUserState.isWishList,
      windowWidth: systemInfo.windowWidth,
    };
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
    moveBtnText() {
      return this.isWishList ? "Move to owned list" : "Move to wish list";
    },
  },
  methods: {
    deleteItem(event) {
      event.stopPropagation();
      if (this.disabled) {
        this.$emit("unauthorized-action");
        return;
      }
      this.$emit("delete-item");
    },
    moveItem(event) {
      event.stopPropagation();
      if (this.disabled) {
        this.$emit("unauthorized-action");
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
.container {
  position: relative;
  width: 100%;
}
p {
  font-weight: 300;
  margin: 0;
}
.custom-btn {
  color: #e56c77;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 10px;
  right: 10px;
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
}
.header-container {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 1.5rem;
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
.move-btn {
  min-width: max-content;
}
.slot-wrapper {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
@media screen and (max-width: 700px) {
  .game-list-item {
    padding: 0.2rem;
  }
  .image-box {
    margin: 0 5% 0 0;
  }
  img {
    width: 7rem;
  }
  .custom-btn {
    top: 5px;
    right: 5px;
  }
}
@media screen and (max-width: 550px) {
  .game-list-item {
    height: 12rem;
  }
  .game-text {
    flex-direction: column;
    align-items: flex-start;
    margin-right: 1.5rem;
  }
  .move-btn {
    margin-bottom: 0.5rem;
  }
}
@media screen and (max-width: 375px) {
  img {
    width: 5rem;
  }
}
</style>