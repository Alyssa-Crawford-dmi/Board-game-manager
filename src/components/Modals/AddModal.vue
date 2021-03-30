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
      <p
        v-if="searchResults.length === 0 && searchTerm !== ''"
        class="p-error info-text"
      >
        No games found. Please try a different search
      </p>
      <p v-else class="info-text">Click on a game to see more information</p>
      <StatusMessage
        v-if="showStatus"
        :messageInfo="addStatus"
        @dismiss-message="showStatus = false"
      />
      <SearchListItem
        v-for="game in searchResults"
        :key="game.id"
        :gameData="game"
        @item-clicked="() => detail(game)"
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
import StatusMessage from "../UI/StatusMessage";

export default {
  name: "AddModal",
  emits: ["add-game", "game-detail"],
  components: {
    InputText,
    Button,
    SearchListItem,
    StatusMessage,
  },
  props: {
    addStatus: Object,
    gamesList: { required: true, type: Array },
    lastSearch: { type: String, default: "" },
  },
  data: () => {
    return {
      searchTerm: "",
      searchResults: [],
      showStatus: false,
      debounce: null,
    };
  },
  created() {
    this.searchTerm = this.lastSearch;
  },
  beforeUnmount() {
    clearTimeout(this.debounce);
  },
  watch: {
    searchTerm: function () {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.search();
      }, 500);
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
    detail(game) {
      this.$emit("game-detail", game, this.searchTerm);
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
  margin-bottom: 0.5rem;
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
.info-text {
  font-size: unset;
  text-align: left;
  margin-top: 0rem;
  padding-top: 0rem;
  padding-left: 1rem;
}
</style>