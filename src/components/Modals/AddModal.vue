<template>
  <div>
    <div class="search-bar">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          type="text"
          v-model="searchTerm"
          placeholder="Ticket to Ride"
          class="p-inputtext-lg"
        />
      </span>
      <Button
        @click="search"
        label="Search"
        class="p-button-raised p-button-text search-button p-button-lg"
        title="Search"
      />
    </div>
    <Message
      v-if="showStatus"
      :messageInfo="addStatus"
      @dismiss-message="showStatus = false"
    />
    <SearchListItem
      v-for="game in gamesList"
      :key="game.id"
      :gameData="game"
      @addGame="() => addGame(game)"
    />
  </div>
</template>
<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { getGamesByName } from "../../apiInteractions/boardGameAtlas";
import SearchListItem from "../SearchListItem";
import Message from "../UI/message";

export default {
  name: "AddModal",
  emits: ["add-game"],
  components: {
    InputText,
    Button,
    SearchListItem,
    Message,
  },
  props: ["addStatus"],
  data: () => {
    return { searchTerm: "tic", gamesList: [], showStatus: false };
  },
  methods: {
    async search() {
      this.gamesList = await getGamesByName(this.searchTerm);
      this.showStatus = false;
    },
    addGame(game) {
      this.$emit("add-game", game);
      this.showStatus = true;
    },
  },
};
</script>
<style scoped>
.search-button {
  margin-left: 1rem;
}
.search-bar {
  margin-top: 20px;
}
</style>