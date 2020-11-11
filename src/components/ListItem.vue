<template>
  <div class="p-col-12 p-md-4">
    <div class="game-grid-item card">
      <div class="game-grid-centered">
        <img :src="gameData.thumb_url" :alt="gameData.name" />
      </div>
      <h3>{{ gameData.name }}</h3>
      <div class="game-grid-details">
        <p>{{ gameData.min_players }} - {{ gameData.max_players }} players</p>
        <p>{{ gameData.min_playtime }} - {{ gameData.max_playtime }} mins</p>
        <p>{{ gameData.min_age }}+</p>
      </div>
      <div class="game-grid-centered">
        <RemoveGameButton @delete-item="deleteItem" />
      </div>
    </div>
  </div>
</template>
<script>
import RemoveGameButton from "./UI/RemoveGameButton.vue";

export default {
  name: "GridItem",
  props: ["gameData"],
  components: {
    RemoveGameButton,
  },
  methods: {
    deleteItem() {
      this.$emit("delete-item");
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
  max-height: 20rem;
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
</style>