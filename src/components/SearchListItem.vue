<template>
  <div class="game-list-item">
    <ListItem
      :gameData="gameData"
      @item-clicked="loadDetails"
      :isGamesList="false"
      ><div class="button-box">
        <slot></slot>
      </div>
    </ListItem>
    <hr />
  </div>
</template>
<script>
import { rangeString, ageString } from "../utils/rangeString";
import ListItem from "./ListItem.vue";

export default {
  name: "listItem",
  props: { gameData: { required: true, type: Object } },
  emits: ["item-clicked"],
  components: {
    ListItem,
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
    loadDetails() {
      this.$emit("item-clicked");
    },
  },
};
</script>
<style scoped>
.game-list-item {
  width: 100%;
  background-color: var(--very-light-gray);
  border-color: white;
  border-width: 0 0.3rem 0 0.3rem;
  border-style: solid;
}
</style>