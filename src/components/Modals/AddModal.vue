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
    <div class="modal-contents">
      <Message
        v-if="showStatus"
        :messageInfo="addStatus"
        @dismiss-message="showStatus = false"
      />
      <p v-if="searchResults.length === 0 && searchTerm !== ''">
        No games found. Please try a different search
      </p>
      <SearchListItem
        v-for="game in searchResults"
        :key="game.id"
        :gameData="game"
      >
        <i
          v-if="gamesListContains(game)"
          class="pi pi-check green"
          title="Game already in list"
        />
        <Button
          v-else
          @click="() => addGame(game)"
          icon="pi pi-plus"
          class="p-button-rounded"
          title="Add game"
        />
      </SearchListItem>
    </div>
  </div>
</template>
<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { getGamesByName } from "../../apiInteractions/boardGameAtlas";
import SearchListItem from "../SearchListItem";
import Message from "../UI/Message";

export default {
  name: "AddModal",
  emits: ["add-game"],
  components: {
    InputText,
    Button,
    SearchListItem,
    Message,
  },
  props: { addStatus: Object, gamesList: { required: true, type: Array } },
  data: () => {
    return { searchTerm: "", searchResults: [], showStatus: false };
  },
  watch: {
    searchTerm: function () {
      this.search();
    },
  },
  methods: {
    async search() {
      this.searchResults = await getGamesByName(this.searchTerm);
      this.showStatus = false;
    },
    addGame(game) {
      this.$emit("add-game", game);
      this.showStatus = true;
    },
    gamesListContains(game) {
      return this.gamesList.some((gameInList) => game.id === gameInList.id);
    },
  },
};
</script>
<style scoped>
.search-button {
  margin-left: 1rem;
}
.search-bar {
  margin-top: 1rem;
  text-align: center;
  margin-bottom: 1rem;
}
.modal-contents {
  padding: 0;
  margin: 0;
  width: 100%;
}
p {
  text-align: center;
  font-size: large;
}
.green {
  color: forestgreen;
  font-size: large;
}
</style>