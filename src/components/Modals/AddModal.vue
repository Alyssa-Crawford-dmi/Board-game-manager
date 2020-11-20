<template>
  <div>
    <div class="search-bar">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          type="text"
          v-model="searchTerm"
          placeholder="Ticket to Ride"
          class="p-inputtext-lg bounded-width"
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
      <!-- <Message
        v-if="showStatus"
        :messageInfo="addStatus"
        @dismiss-message="showStatus = false"
      /> -->
      <Confused />
      <p v-if="searchResults.length === 0 && searchTerm !== ''">
        No games found. Please try a different search
      </p>
      <SearchListItem
        v-for="game in searchResults"
        :key="game.id"
        :gameData="game"
        @item-clicked="() => detail(game.id)"
      >
        <i
          v-if="gamesListContains(game)"
          class="pi pi-check green"
          title="Game already in list"
        />
        <Button
          v-else
          @click="(e) => addGame(game, e)"
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
// import Message from "../UI/Message";
import Confused from "../UI/Confused";

export default {
  name: "AddModal",
  emits: ["add-game", "game-detail"],
  components: {
    InputText,
    Button,
    SearchListItem,
    Confused,
    // Message,
  },
  props: {
    addStatus: Object,
    gamesList: { required: true, type: Array },
    lastSearch: { type: String, default: "" },
  },
  data: () => {
    return { searchTerm: "", searchResults: [], showStatus: false };
  },
  created() {
    this.searchTerm = this.lastSearch;
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
    addGame(game, e) {
      e.stopPropagation();
      this.$emit("add-game", game);
      this.showStatus = true;
    },
    gamesListContains(game) {
      return this.gamesList.some((gameInList) => game.id === gameInList.id);
    },
    detail(id) {
      this.$emit("game-detail", id, this.searchTerm);
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