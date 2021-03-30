<template>
  <div>
    <div id="scroll-marker"></div>
    <div class="search-bar">
      <div class="search-options">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            type="text"
            v-model="searchTerm"
            placeholder="Ticket to Ride"
            class="p-inputtext-lg bounded-width"
          />
        </span>
        <div class="p-field-checkbox">
          <Checkbox id="showExisting" v-model="showExisting" :binary="true" />
          <label for="showExisting">Show games already in the list</label>
        </div>
      </div>
      <Button
        @click="search"
        label="Search"
        class="p-button-raised p-button-text search-button p-button-lg"
        title="Search"
      />
    </div>
    <div class="modal-contents">
      <p
        v-if="searchResults.length === 0 && showNoResultsError && page === 0"
        class="p-error info-text"
      >
        No games found. Please try a different search
      </p>
      <p v-else-if="searchResults.length !== 0" class="info-text">
        Click on a game to see more information
      </p>
      <p v-else-if="searchResults.length === 0 && page > 0">End of results</p>
      <StatusMessage
        v-if="showStatus"
        :messageInfo="addStatus"
        @dismiss-message="showStatus = false"
      />
      <template v-for="game in searchResults" :key="game.id">
        <SearchListItem
          :gameData="game"
          @item-clicked="() => detail(game)"
          v-if="!(!showExisting && gamesListContains(game))"
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
      </template>
      <div class="action-buttons" v-if="searchResults.length !== 0 || page > 0">
        <Button
          @click="() => changePage(-1)"
          class="p-button-raised p-button-text"
          title="Previous"
          label="Previous"
          :disabled="page === 0"
        />
        <Button
          @click="() => changePage(1)"
          class="p-button-raised p-button-text"
          title="Next"
          label="Next"
          :disabled="searchResults.length !== 10"
        />
      </div>
    </div>
  </div>
</template>
<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { getGamesByName } from "../../apiInteractions/boardGameAtlas";
import SearchListItem from "../SearchListItem";
import StatusMessage from "../UI/StatusMessage";
import Checkbox from "primevue/checkbox";

export default {
  name: "AddModal",
  emits: ["add-game", "game-detail"],
  components: {
    InputText,
    Button,
    SearchListItem,
    StatusMessage,
    Checkbox,
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
      page: 0,
      showNoResultsError: false,
      showExisting: true,
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
      this.showNoResultsError = false;

      this.debounce = setTimeout(async () => {
        this.page = 0;
        await this.search();
        this.showNoResultsError = true;
      }, 500);
    },
  },
  methods: {
    async search() {
      this.searchResults = await getGamesByName(this.searchTerm, this.page);
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
    async changePage(change) {
      if (change === -1 && this.page === 0) {
        return;
      }
      this.page = this.page + change;
      await this.search();
      document.getElementById("scroll-marker").scrollIntoView();
    },
  },
};
</script>
<style scoped>
.search-button {
  margin-left: 1rem;
}
.search-bar {
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
.action-buttons {
  display: flex;
  justify-content: space-around;
  margin: 0rem;
}
#scroll-marker {
  padding: 0;
  margin: 0;
}
.p-field-checkbox {
  padding-top: 0.25rem;
}
.search-options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  margin: 0;
}
@media screen and (max-width: 700px) {
  .search-bar {
    flex-direction: column;
  }
}
</style>